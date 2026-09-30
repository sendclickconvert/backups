export const prerender = false;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getStorefrontProducts } from '../lib/shopify';
import { isDraftProduct } from '../lib/product-content';
import { BUSINESS } from '../data/site';

export const GET: APIRoute = async () => {
  try {
    const products = await getStorefrontProducts();
    const content = new Map((await getCollection('products')).map(e => [e.slug, e.data]));
    const urls = [`${BUSINESS.url}/shop`, ...products
      .filter(p => {
        const entry = content.get(p.handle);
        return entry && !isDraftProduct(entry);
      })
      .map(p => `${BUSINESS.url}/shop/${encodeURIComponent(p.handle)}`)];
    const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>`,
      { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-store' } },
    );
  } catch {
    return new Response('Product sitemap temporarily unavailable.', {
      status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' },
    });
  }
};