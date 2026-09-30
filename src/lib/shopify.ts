import { createStorefrontClient } from './shopify-live-client.mjs';

export function getStorefrontToken(): string | undefined {
  return process.env.SHOPIFY_STOREFRONT_TOKEN ?? import.meta.env.SHOPIFY_STOREFRONT_TOKEN;
}

export function getStorefrontUrl(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN ?? import.meta.env.SHOPIFY_STORE_DOMAIN;
  if (!domain || !/^[a-z0-9-]+\.myshopify\.com$/i.test(domain)) {
    throw new Error('SHOPIFY_STORE_DOMAIN must be a valid myshopify.com domain.');
  }
  return `https://${domain}/api/2025-10/graphql.json`;
}

const client = createStorefrontClient({
  getConfig: () => ({
    domain: new URL(getStorefrontUrl()).hostname,
    token: getStorefrontToken(),
  }),
});

export async function storefrontFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  return await client.request(query, variables) as T;
}

export interface StorefrontProduct {
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  availableForSale: boolean;
}

export async function getStorefrontProducts(): Promise<StorefrontProduct[]> {
  return await client.products(ALL_PRODUCTS_QUERY) as StorefrontProduct[];
}

export const ALL_PRODUCTS_QUERY = `
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
