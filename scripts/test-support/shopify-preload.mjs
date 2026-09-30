// Isolated Shopify Storefront API fixture for the built-server integration test.
// The preload intentionally refuses every outbound request except the synthetic
// test domain, so a test can never contact a real Shopify store.
const TEST_DOMAIN = 'integration-test.myshopify.com';
const TEST_TOKEN = 'synthetic-only-test-token';
const originalDateNow = Date.now.bind(Date);
let clockOffset = 0;
let products = [];
let failureStatus = 0;
let cartUserError = '';
let cartFailureStatus = 0;

Date.now = () => originalDateNow() + clockOffset;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function productByHandle(handle) {
  const catalogProduct = products.find(product => product.handle === handle);
  if (!catalogProduct) return null;
  return {
    ...catalogProduct,
    descriptionHtml: `<p>${catalogProduct.description}</p>`,
    images: { edges: [] },
    options: [{ name: 'Size', values: ['Standard'] }],
    variants: {
      pageInfo: { hasNextPage: false, endCursor: null },
      edges: [{
        node: {
          id: `gid://shopify/ProductVariant/${handle}`,
          title: 'Standard',
          sku: `TEST-${handle}`,
          availableForSale: true,
          price: { amount: '12.00', currencyCode: 'USD' },
          selectedOptions: [{ name: 'Size', value: 'Standard' }],
        },
      }],
    },
  };
}

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);

  // Do not delegate unknown calls to the original fetch: that would make
  // accidental access to a developer's or production Shopify domain possible.
  if (url.hostname !== TEST_DOMAIN || url.pathname !== '/api/2025-10/graphql.json') {
    throw new Error(`Blocked outbound request in Shopify integration test: ${url.origin}`);
  }

  const headers = new Headers(init.headers ?? (input instanceof Request ? input.headers : undefined));
  if (headers.get('X-Shopify-Storefront-Access-Token') !== TEST_TOKEN) {
    throw new Error('Blocked Shopify test request with a non-synthetic access token.');
  }

  if (failureStatus) return json({ errors: [{ message: 'Synthetic Shopify outage' }] }, failureStatus);

  const body = JSON.parse(init.body ?? '{}');
  const query = body.query ?? '';
  const variables = body.variables ?? {};

  if (query.includes('AllProducts')) {
    const pageSize = 100;
    const start = variables.after === 'fixture-page-1' ? pageSize : 0;
    const page = products.slice(start, start + pageSize);
    const hasNextPage = start + page.length < products.length;
    return json({
      data: {
        products: {
          edges: page.map(node => ({ node })),
          pageInfo: {
            hasNextPage,
            endCursor: hasNextPage ? 'fixture-page-1' : null,
          },
        },
      },
    });
  }

  if (query.includes('CartCreate')) {
    if (cartFailureStatus) return json({ errors: [{ message: 'Synthetic cart outage' }] }, cartFailureStatus);
    if (cartUserError) {
      return json({
        data: {
          cartCreate: {
            cart: null,
            userErrors: [{ field: ['lines'], message: cartUserError }],
          },
        },
      });
    }
    return json({
      data: {
        cartCreate: {
          cart: {
            id: 'gid://shopify/Cart/synthetic-cart',
            checkoutUrl: 'https://checkout.integration-test.invalid/cart/synthetic-cart',
            totalQuantity: 1,
          },
          userErrors: [],
        },
      },
    });
  }

  if (query.includes('ProductVariantsPage')) {
    const product = productByHandle(variables.handle);
    return json({ data: { productByHandle: product && { variants: product.variants } } });
  }

  if (query.includes('ProductByHandle')) {
    return json({ data: { productByHandle: productByHandle(variables.handle) } });
  }

  throw new Error(`Unexpected synthetic Shopify GraphQL operation: ${query.slice(0, 80)}`);
};

process.on('message', message => {
  if (!message || message.type !== 'shopify-test-control') return;
  products = message.products ?? products;
  if (Object.hasOwn(message, 'failureStatus')) failureStatus = message.failureStatus;
  if (Object.hasOwn(message, 'cartUserError')) cartUserError = message.cartUserError;
  if (Object.hasOwn(message, 'cartFailureStatus')) cartFailureStatus = message.cartFailureStatus;
  if (Object.hasOwn(message, 'clockOffset')) clockOffset = message.clockOffset;
  process.send?.({ type: 'shopify-test-control-ack', id: message.id });
});