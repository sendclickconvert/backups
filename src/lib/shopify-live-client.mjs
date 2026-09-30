// Server-only, short-lived query cache. Failed requests are never cached.
export function createStorefrontClient({ getConfig, fetchImpl = fetch, ttlMs = 60_000, now = Date.now }) {
  const cache = new Map();
  let activeConfig = '';

  async function request(query, variables = {}) {
    const { domain, token } = getConfig();
    if (!domain || !token) throw new Error('Shopify storefront is not configured.');
    const configKey = JSON.stringify([domain, token]);
    if (configKey !== activeConfig) {
      cache.clear();
      activeConfig = configKey;
    }
    const key = JSON.stringify([query, variables]);
    const cacheable = /^\s*query\b/.test(query);
    const existing = cache.get(key);
    if (cacheable && existing && existing.expires > now()) return existing.promise;

    const promise = (async () => {
      const res = await fetchImpl(`https://${domain}/api/2025-10/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(15_000),
      });
      if (!res.ok) throw new Error(`Storefront HTTP ${res.status}`);
      const json = await res.json();
      if (json.errors?.length) throw new Error(json.errors[0]?.message ?? 'Storefront API error');
      if (!json.data) throw new Error('Storefront returned no data.');
      return json.data;
    })();
    const entry = { promise, expires: now() + ttlMs };
    if (cacheable) {
      if (cache.size >= 200) cache.delete(cache.keys().next().value);
      cache.set(key, entry);
    }
    try {
      return await promise;
    } catch (err) {
      if (cache.get(key) === entry) cache.delete(key);
      throw err;
    }
  }

  async function products(query) {
    const nodes = [];
    let after = null;
    do {
      const data = await request(query, { after });
      const connection = data.products;
      if (!connection?.edges || !connection.pageInfo) throw new Error('Invalid Shopify catalog response.');
      nodes.push(...connection.edges.map(e => e.node));
      if (!connection.pageInfo.hasNextPage) break;
      const next = connection.pageInfo.endCursor;
      if (!next || next === after) throw new Error('Invalid Shopify catalog pagination.');
      after = next;
    } while (true);
    if (!nodes.length) throw new Error('Shopify returned zero storefront-visible products.');
    return nodes;
  }

  return { request, products };
}