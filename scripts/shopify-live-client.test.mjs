import test from 'node:test';
import assert from 'node:assert/strict';
import { createStorefrontClient } from '../src/lib/shopify-live-client.mjs';

const QUERY = 'query { products(first: 100) { edges { node { id title } } } }';

function response(data, { ok = true, status = 200, errors } = {}) {
  return {
    ok,
    status,
    async json() {
      return { ...(data === undefined ? {} : { data }), ...(errors ? { errors } : {}) };
    },
  };
}

function product(id, price) {
  return { id, price };
}

function catalog(items, { hasNextPage = false, endCursor = null } = {}) {
  return {
    products: {
      edges: items.map(node => ({ node })),
      pageInfo: { hasNextPage, endCursor },
    },
  };
}

function makeClient(fetchImpl, options = {}) {
  return createStorefrontClient({
    getConfig: () => ({ domain: 'shop.example', token: 'token-a' }),
    fetchImpl,
    ...options,
  });
}

test('query cache reflects product additions, removals, and price changes after one minute', async () => {
  let time = 1_000;
  let liveCatalog = [product('A', '10.00'), product('B', '20.00')];
  let calls = 0;
  const client = makeClient(async () => {
    calls += 1;
    return response(catalog(liveCatalog));
  }, { now: () => time });

  assert.deepEqual(await client.products(QUERY), [product('A', '10.00'), product('B', '20.00')]);
  liveCatalog = [product('A', '12.00'), product('C', '30.00')];

  time += 59_999;
  assert.deepEqual(await client.products(QUERY), [product('A', '10.00'), product('B', '20.00')]);
  assert.equal(calls, 1);

  time += 1;
  assert.deepEqual(await client.products(QUERY), [product('A', '12.00'), product('C', '30.00')]);
  assert.equal(calls, 2);
});

test('concurrent identical queries share one in-flight request', async () => {
  let calls = 0;
  let resolveFetch;
  const client = makeClient(() => {
    calls += 1;
    return new Promise(resolve => {
      resolveFetch = resolve;
    });
  });

  const first = client.request(QUERY);
  const second = client.request(QUERY);
  assert.equal(calls, 1);

  resolveFetch(response({ products: [] }));
  assert.deepEqual(await Promise.all([first, second]), [{ products: [] }, { products: [] }]);
});

test('rotating the store domain or storefront token invalidates cached queries', async () => {
  let config = { domain: 'first.example', token: 'token-a' };
  const requests = [];
  const client = createStorefrontClient({
    getConfig: () => config,
    fetchImpl: async (url, options) => {
      requests.push({ url, token: options.headers['X-Shopify-Storefront-Access-Token'] });
      return response({ sequence: requests.length });
    },
  });

  assert.deepEqual(await client.request(QUERY), { sequence: 1 });
  config = { domain: 'second.example', token: 'token-a' };
  assert.deepEqual(await client.request(QUERY), { sequence: 2 });
  config = { domain: 'second.example', token: 'token-b' };
  assert.deepEqual(await client.request(QUERY), { sequence: 3 });
  assert.deepEqual(requests, [
    { url: 'https://first.example/api/2025-10/graphql.json', token: 'token-a' },
    { url: 'https://second.example/api/2025-10/graphql.json', token: 'token-a' },
    { url: 'https://second.example/api/2025-10/graphql.json', token: 'token-b' },
  ]);
});

test('failed query requests are not cached and can be retried', async () => {
  let calls = 0;
  const client = makeClient(async () => {
    calls += 1;
    return calls === 1
      ? response(undefined, { ok: false, status: 503 })
      : response({ recovered: true });
  });

  await assert.rejects(client.request(QUERY), /Storefront HTTP 503/);
  assert.deepEqual(await client.request(QUERY), { recovered: true });
  assert.deepEqual(await client.request(QUERY), { recovered: true });
  assert.equal(calls, 2);
});

test('mutations are never cached', async () => {
  let calls = 0;
  const client = makeClient(async () => response({ sequence: ++calls }));
  const mutation = 'mutation { cartCreate(input: {}) { cart { id } } }';

  assert.deepEqual(await client.request(mutation), { sequence: 1 });
  assert.deepEqual(await client.request(mutation), { sequence: 2 });
  assert.equal(calls, 2);
});

test('products follows pagination and returns more than 100 products', async () => {
  const firstPage = Array.from({ length: 100 }, (_, index) => product(`product-${index}`, '1.00'));
  const secondPage = [product('product-100', '2.00'), product('product-101', '3.00')];
  const variablesSeen = [];
  const client = makeClient(async (_url, options) => {
    const { variables } = JSON.parse(options.body);
    variablesSeen.push(variables);
    return response(variables.after === null
      ? catalog(firstPage, { hasNextPage: true, endCursor: 'cursor-1' })
      : catalog(secondPage));
  });

  const products = await client.products(QUERY);

  assert.equal(products.length, 102);
  assert.deepEqual(products.slice(-2), secondPage);
  assert.deepEqual(variablesSeen, [{ after: null }, { after: 'cursor-1' }]);
});

test('products rejects invalid pagination cursors', async t => {
  await t.test('missing next cursor', async () => {
    const client = makeClient(async () => response(catalog([product('A', '1.00')], {
      hasNextPage: true,
      endCursor: null,
    })));
    await assert.rejects(client.products(QUERY), /Invalid Shopify catalog pagination/);
  });

  await t.test('repeated cursor', async () => {
    const client = makeClient(async (_url, options) => {
      const { variables } = JSON.parse(options.body);
      return response(catalog([product('A', '1.00')], {
        hasNextPage: true,
        endCursor: variables.after === null ? 'cursor-1' : 'cursor-1',
      }));
    });
    await assert.rejects(client.products(QUERY), /Invalid Shopify catalog pagination/);
  });
});

test('products rejects a zero-product catalog', async () => {
  const client = makeClient(async () => response(catalog([])));
  await assert.rejects(client.products(QUERY), /Shopify returned zero storefront-visible products/);
});