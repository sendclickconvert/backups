// Server-only, short-lived query cache. Failed requests are never cached.
function createStorefrontClient({ getConfig, fetchImpl = fetch, ttlMs = 60_000, now = Date.now }) {
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

function getStorefrontToken() {
  return process.env.SHOPIFY_STOREFRONT_TOKEN ?? process.env.SHOPIFY_STOREFRONT_TOKEN;
}
function getStorefrontUrl() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN ?? process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain || !/^[a-z0-9-]+\.myshopify\.com$/i.test(domain)) {
    throw new Error("SHOPIFY_STORE_DOMAIN must be a valid myshopify.com domain.");
  }
  return `https://${domain}/api/2025-10/graphql.json`;
}
const client = createStorefrontClient({
  getConfig: () => ({
    domain: new URL(getStorefrontUrl()).hostname,
    token: getStorefrontToken()
  })
});
async function storefrontFetch(query, variables = {}) {
  return await client.request(query, variables);
}
async function getStorefrontProducts() {
  return await client.products(ALL_PRODUCTS_QUERY);
}
const ALL_PRODUCTS_QUERY = `
  query AllProducts($after: String) {
    products(first: 100, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          availableForSale
        }
      }
    }
  }
`;
const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      title
      handle
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      options {
        name
        values
      }
      variants(first: 250) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;
const PRODUCT_VARIANTS_PAGE_QUERY = `
  query ProductVariantsPage($handle: String!, $after: String!) {
    productByHandle(handle: $handle) {
      variants(first: 250, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export { PRODUCT_BY_HANDLE_QUERY as P, getStorefrontUrl as a, getStorefrontProducts as b, PRODUCT_VARIANTS_PAGE_QUERY as c, getStorefrontToken as g, storefrontFetch as s };
