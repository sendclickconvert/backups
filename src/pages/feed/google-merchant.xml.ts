export const prerender = true;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { storefrontFetch, ALL_PRODUCTS_QUERY } from '../../lib/shopify';
import { PRODUCT_META } from '../../data/products';
import { isDraftProduct } from '../../lib/product-content';

interface ProductNode {
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  availableForSale: boolean;
}

const SITE_URL = 'https://crst.net';
const BRAND = 'Cornerstone Services';

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtmlAndTruncate(value: string, maxLen = 5000): string {
  const plain = value.replace(/\s+/g, ' ').trim();
  return plain.length > maxLen ? plain.slice(0, maxLen - 1) + '…' : plain;
}

export const GET: APIRoute = async () => {
  const token: string | undefined =
    import.meta.env.SHOPIFY_STOREFRONT_TOKEN ?? process.env.SHOPIFY_STOREFRONT_TOKEN;

  let products: ProductNode[] = [];

  if (token) {
    try {
      const data = await storefrontFetch<{ products: { edges: { node: ProductNode }[] } }>(
        ALL_PRODUCTS_QUERY,
        {},
        token
      );
      products = data.products.edges.map((e) => e.node);
    } catch {
      products = [];
    }
  }

  // Cross-reference the editorial content collection so the feed only ships
  // products whose specs/use-cases/how-to-order/FAQ content is real — see
  // src/lib/product-content.ts for the exact "draft" rule and the documented
  // deviation (turnaround/stock/inkFinish are excluded from this check).
  const contentEntries = await getCollection('products');
  const contentByHandle = new Map(contentEntries.map((e) => [e.slug, e.data]));

  const items = products
    .map((product) => {
      const meta = PRODUCT_META[product.handle];
      // A product missing from PRODUCT_META cannot be classified for the feed
      // (no googleProductCategory/productType) — skip it rather than emit an
      // incomplete <item>. All 20 current handles are mapped, so this should
      // not fire in practice; it's a guard against future unmapped products.
      if (!meta) return '';

      // No editorial content entry, or content is still a draft (placeholder
      // specs/use-cases/how-to-order/FAQ) — do not submit it to Google
      // Merchant Center yet.
      const content = contentByHandle.get(product.handle);
      if (!content || isDraftProduct(content)) return '';

      const link = `${SITE_URL}/shop/${product.handle}`;
      const title = xmlEscape(product.title);
      const description = xmlEscape(stripHtmlAndTruncate(product.description || product.title));
      const imageLink = product.featuredImage?.url ? xmlEscape(product.featuredImage.url) : '';
      const availability = product.availableForSale ? 'in_stock' : 'out_of_stock';
      const amount = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
      const currency = product.priceRange.minVariantPrice.currencyCode;
      const price = `${amount} ${currency}`;

      return `    <item>
      <g:id>${xmlEscape(product.handle)}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${xmlEscape(link)}</link>
      ${imageLink ? `<g:image_link>${imageLink}</g:image_link>` : ''}
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xmlEscape(BRAND)}</g:brand>
      <g:identifier_exists>false</g:identifier_exists>
      <g:google_product_category>${xmlEscape(meta.googleProductCategory)}</g:google_product_category>
      <g:product_type>${xmlEscape(meta.productType)}</g:product_type>
    </item>`;
    })
    .filter(Boolean)
    .join('\n');

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
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
