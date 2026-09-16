export const SHOPIFY_STORE_DOMAIN =
  import.meta.env.SHOPIFY_STORE_DOMAIN ?? process.env.SHOPIFY_STORE_DOMAIN;

if (!SHOPIFY_STORE_DOMAIN) {
  throw new Error(
    'SHOPIFY_STORE_DOMAIN is not configured. Set it to the store myshopify.com domain.'
  );
}

export const STOREFRONT_URL =
  `https://${SHOPIFY_STORE_DOMAIN}/api/2025-10/graphql.json`;

export async function storefrontFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
  token: string
): Promise<T> {
  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Storefront HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0]?.message ?? 'Storefront API error');
  return json.data as T;
}

export const ALL_PRODUCTS_QUERY = `
  query AllProducts {
    products(first: 100) {
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

export const PRODUCT_BY_HANDLE_QUERY = `
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

export const PRODUCT_VARIANTS_PAGE_QUERY = `
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
