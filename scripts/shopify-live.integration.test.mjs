import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverScript = path.join(root, 'server.mjs');
const preloadScript = path.join(root, 'scripts/test-support/shopify-preload.mjs');
const SYNTHETIC_DOMAIN = 'integration-test.myshopify.com';
const SYNTHETIC_TOKEN = 'synthetic-only-test-token';

function fixtureProduct(handle, title = `Integration ${handle}`) {
  return {
    handle,
    title,
    description: `Synthetic description for ${handle}`,
    featuredImage: null,
    priceRange: { minVariantPrice: { amount: '12.00', currencyCode: 'USD' } },
    availableForSale: true,
  };
}

async function unusedPort() {
  const probe = createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const { port } = probe.address();
  await new Promise((resolve, reject) => probe.close(error => error ? reject(error) : resolve()));
  return port;
}

function waitForServer(child, port, getOutput) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Server did not start. ${getOutput()}`)), 20_000);
    timeout.unref();
    const check = async () => {
      if (child.exitCode !== null) {
        clearTimeout(timeout);
        reject(new Error(`server.mjs exited before becoming ready. ${getOutput()}`));
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:${port}/shop`);
        if (response.status > 0) {
          clearTimeout(timeout);
          resolve();
          return;
        }
      } catch {}
      setTimeout(check, 100).unref();
    };
    check();
  });
}

test('built Astro SSR Shopify shop sync integration', { timeout: 120_000 }, async t => {
  const port = await unusedPort();
  const child = spawn(process.execPath, ['--import', preloadScript, serverScript], {
    cwd: root,
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: String(port),
      SHOPIFY_STORE_DOMAIN: SYNTHETIC_DOMAIN,
      SHOPIFY_STOREFRONT_TOKEN: SYNTHETIC_TOKEN,
    },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
  });

  let output = '';
  child.stdout.setEncoding('utf8').on('data', chunk => { output += chunk; });
  child.stderr.setEncoding('utf8').on('data', chunk => { output += chunk; });

  let controlId = 0;
  const acknowledgements = new Map();
  child.on('message', message => {
    if (message?.type !== 'shopify-test-control-ack') return;
    acknowledgements.get(message.id)?.();
    acknowledgements.delete(message.id);
  });

  async function configure(values) {
    const id = ++controlId;
    const acknowledged = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Shopify test preload did not acknowledge control message.')), 5_000);
      acknowledgements.set(id, () => {
        clearTimeout(timeout);
        resolve();
      });
    });
    child.send({ type: 'shopify-test-control', id, ...values });
    await acknowledged;
  }

  const baseProducts = [
    fixtureProduct('palm-card', 'Synthetic Palm Card'),
    fixtureProduct('brand-new-unpublished-handle', 'Synthetic New Product'),
    ...Array.from({ length: 99 }, (_, index) => fixtureProduct(`fixture-product-${index + 1}`)),
  ];

  t.after(async () => {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
      await Promise.race([once(child, 'exit'), delay(3_000)]);
      if (child.exitCode === null) child.kill('SIGKILL');
    }
  });

  await configure({ products: baseProducts, failureStatus: 0, cartUserError: '', cartFailureStatus: 0, clockOffset: 0 });
  await waitForServer(child, port, () => output);
  const origin = `http://127.0.0.1:${port}`;

  async function get(pathname) {
    return fetch(`${origin}${pathname}`, { redirect: 'manual' });
  }

  await t.test('shop catalog paginates beyond 100 and remains uncached by HTTP', async () => {
    const response = await get('/shop');
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(response.headers.get('cache-control') ?? '', /no-store/i);
    assert.match(html, /Synthetic New Product/);
    assert.match(html, /fixture-product-99/);
    assert.match(html, /palm-card/);
  });

  await t.test('new live handle without editorial content is configurable and noindex', async () => {
    const response = await get('/shop/brand-new-unpublished-handle');
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(response.headers.get('cache-control') ?? '', /no-store/i);
    assert.match(html, /name="robots" content="noindex, nofollow"/i);
    assert.match(html, /Synthetic New Product/);
    assert.match(html, /<select\b/i);
    assert.match(html, /Standard/);
  });

  await t.test('missing Shopify product is a no-store 404', async () => {
    const response = await get('/shop/not-in-shopify');
    assert.equal(response.status, 404);
    assert.match(response.headers.get('cache-control') ?? '', /no-store/i);
  });

  await t.test('complete editorial product is eligible for sitemap and merchant feed', async () => {
    const sitemap = await get('/sitemap-shop.xml');
    const sitemapXml = await sitemap.text();
    assert.equal(sitemap.status, 200);
    assert.match(sitemap.headers.get('cache-control') ?? '', /no-store/i);
    assert.match(sitemapXml, /https:\/\/crst\.net\/shop\/palm-card/);
    assert.doesNotMatch(sitemapXml, /brand-new-unpublished-handle/);

    const feed = await get('/feed/google-merchant.xml');
    const feedXml = await feed.text();
    assert.equal(feed.status, 200);
    assert.match(feed.headers.get('cache-control') ?? '', /no-store/i);
    assert.match(feedXml, /<g:id>palm-card<\/g:id>/);
    assert.doesNotMatch(feedXml, /brand-new-unpublished-handle/);
  });

  await t.test('Shopify outage surfaces as 503', async () => {
    // Expire the successful catalog cache first so the request actually reaches
    // the failing synthetic endpoint instead of being served from its TTL.
    await configure({ clockOffset: 60_001, failureStatus: 503 });
    try {
      const response = await get('/shop');
      assert.equal(response.status, 503);
      assert.match(response.headers.get('cache-control') ?? '', /no-store/i);
      assert.match(response.headers.get('retry-after') ?? '', /60/);
      for (const pathname of ['/shop/uncached-outage-handle', '/sitemap-shop.xml', '/feed/google-merchant.xml']) {
        const unavailable = await get(pathname);
        assert.equal(unavailable.status, 503, pathname);
        assert.match(unavailable.headers.get('cache-control') ?? '', /no-store/i);
      }
    } finally {
      await configure({ failureStatus: 0 });
    }
    const recovered = await get('/shop');
    assert.equal(recovered.status, 200);
  });

  await t.test('cart creation handles success and Shopify user errors', async () => {
    const success = await fetch(`${origin}/api/shop/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variantId: 'gid://shopify/ProductVariant/test-variant' }),
    });
    assert.equal(success.status, 200);
    assert.deepEqual(await success.json(), {
      checkoutUrl: 'https://checkout.integration-test.invalid/cart/synthetic-cart',
      cartId: 'gid://shopify/Cart/synthetic-cart',
    });

    await configure({ cartUserError: 'Synthetic invalid variant' });
    try {
      const failed = await fetch(`${origin}/api/shop/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: 'gid://shopify/ProductVariant/invalid' }),
      });
      assert.equal(failed.status, 422);
      assert.deepEqual(await failed.json(), { error: 'Synthetic invalid variant' });
    } finally {
      await configure({ cartUserError: '' });
    }
    await configure({ cartFailureStatus: 401 });
    try {
      const unavailable = await fetch(`${origin}/api/shop/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: 'gid://shopify/ProductVariant/test-variant' }),
      });
      assert.equal(unavailable.status, 503);
      assert.deepEqual(await unavailable.json(), { error: 'Storefront API unavailable.' });
    } finally {
      await configure({ cartFailureStatus: 0 });
    }
  });

  await t.test('trailing slash redirects and catalog reflects additions after the query TTL', async () => {
    const slash = await get('/shop/');
    assert.ok([301, 308].includes(slash.status), `Expected trailing-slash redirect, got ${slash.status}`);
    assert.equal(new URL(slash.headers.get('location'), origin).pathname, '/shop');

    const addedHandle = 'live-added-after-cache-ttl';
    await configure({ products: [...baseProducts, fixtureProduct(addedHandle, 'Added After Cache TTL')] });
    const cached = await get('/shop');
    const cachedHtml = await cached.text();
    assert.equal(cached.status, 200);
    assert.doesNotMatch(cachedHtml, /Added After Cache TTL/);

    // The server-side Storefront query cache has a 60-second TTL. Advance the
    // fixture clock rather than sleeping; no real environment or date is changed.
    await configure({ clockOffset: 120_002 });
    const refreshed = await get('/shop');
    const refreshedHtml = await refreshed.text();
    assert.equal(refreshed.status, 200);
    assert.match(refreshedHtml, /Added After Cache TTL/);
    const addedPage = await get(`/shop/${addedHandle}`);
    assert.equal(addedPage.status, 200);
    assert.match(await addedPage.text(), /Added After Cache TTL/);
  });
});