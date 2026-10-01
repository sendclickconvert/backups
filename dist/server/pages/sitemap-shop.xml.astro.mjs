import { g as getCollection } from '../chunks/_astro_content_DeKEqCDA.mjs';
import { b as getStorefrontProducts } from '../chunks/shopify_B5LulV77.mjs';
import { i as isDraftProduct } from '../chunks/product-content_CGIJuP1_.mjs';
import { B as BUSINESS } from '../chunks/site_Bvm2fFWv.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const GET = async () => {
  try {
    const products = await getStorefrontProducts();
    const content = new Map((await getCollection("products")).map((e) => [e.slug, e.data]));
    const urls = [`${BUSINESS.url}/shop`, ...products.filter((p) => {
      const entry = content.get(p.handle);
      return entry && !isDraftProduct(entry);
    }).map((p) => `${BUSINESS.url}/shop/${encodeURIComponent(p.handle)}`)];
    const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escape(url)}</loc></url>`).join("")}</urlset>`,
      { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" } }
    );
  } catch {
    return new Response("Product sitemap temporarily unavailable.", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
