import { g as getCollection } from '../../chunks/_astro_content_aIzOxVdh.mjs';
import { b as getStorefrontProducts } from '../../chunks/shopify_B5LulV77.mjs';
import { P as PRODUCT_META } from '../../chunks/products_xtWUVfSC.mjs';
import { i as isDraftProduct } from '../../chunks/product-content_CGIJuP1_.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const SITE_URL = "https://crst.net";
const BRAND = "Cornerstone Services";
function xmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function stripHtmlAndTruncate(value, maxLen = 5e3) {
  const plain = value.replace(/\s+/g, " ").trim();
  return plain.length > maxLen ? plain.slice(0, maxLen - 1) + "…" : plain;
}
const GET = async () => {
  let products = [];
  try {
    products = await getStorefrontProducts();
  } catch {
    return new Response("Product feed temporarily unavailable.", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" }
    });
  }
  const contentEntries = await getCollection("products");
  const contentByHandle = new Map(contentEntries.map((e) => [e.slug, e.data]));
  const items = products.map((product) => {
    const meta = PRODUCT_META[product.handle];
    if (!meta) return "";
    const content = contentByHandle.get(product.handle);
    if (!content || isDraftProduct(content)) return "";
    const link = `${SITE_URL}/shop/${product.handle}`;
    const title = xmlEscape(product.title);
    const description = xmlEscape(stripHtmlAndTruncate(product.description || product.title));
    const imageLink = product.featuredImage?.url ? xmlEscape(product.featuredImage.url) : "";
    const availability = product.availableForSale ? "in_stock" : "out_of_stock";
    const amount = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
    const currency = product.priceRange.minVariantPrice.currencyCode;
    const price = `${amount} ${currency}`;
    return `    <item>
      <g:id>${xmlEscape(product.handle)}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${xmlEscape(link)}</link>
      ${imageLink ? `<g:image_link>${imageLink}</g:image_link>` : ""}
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xmlEscape(BRAND)}</g:brand>
      <g:identifier_exists>false</g:identifier_exists>
      <g:google_product_category>${xmlEscape(meta.googleProductCategory)}</g:google_product_category>
      <g:product_type>${xmlEscape(meta.productType)}</g:product_type>
    </item>`;
  }).filter(Boolean).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Cornerstone Services — Product Feed</title>
    <link>${SITE_URL}/shop</link>
    <description>Google Merchant Center product feed for Cornerstone Services (crst.net).</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
