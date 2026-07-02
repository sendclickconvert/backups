const STOREFRONT_URL = "https://cornerstone-services-i42crwvc.myshopify.com/api/2025-10/graphql.json";
async function storefrontFetch(query, variables = {}, token) {
  const res = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token
    },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(`Storefront HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0]?.message ?? "Storefront API error");
  return json.data;
}
const ALL_PRODUCTS_QUERY = `
  query AllProducts {
    products(first: 100) {
      edges {
        node {
          title
          handle
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

export { ALL_PRODUCTS_QUERY as A, PRODUCT_BY_HANDLE_QUERY as P, PRODUCT_VARIANTS_PAGE_QUERY as a, storefrontFetch as s };
