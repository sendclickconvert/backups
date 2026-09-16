export const prerender = false;

import type { APIRoute } from 'astro';
import { STOREFRONT_URL } from '../../../lib/shopify';

const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'Store not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { variantId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { variantId } = body;
  if (!variantId) {
    return new Response(JSON.stringify({ error: 'variantId is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: CART_CREATE,
        variables: {
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        },
      }),
    });

    const json = await res.json();
    const cart = json.data?.cartCreate?.cart;
    const userErrors = json.data?.cartCreate?.userErrors ?? [];

    if (!cart || userErrors.length > 0) {
      const msg = userErrors[0]?.message ?? 'Cart creation failed.';
      return new Response(JSON.stringify({ error: msg }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ checkoutUrl: cart.checkoutUrl, cartId: cart.id }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Storefront API unavailable.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
