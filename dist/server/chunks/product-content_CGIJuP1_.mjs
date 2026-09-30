// src/lib/product-draft-rules.mjs
//
// Plain-JS core of the product "draft" determination — no astro:content
// import, so it can be loaded both from Astro/TS code (via
// src/lib/product-content.ts, which re-exports this with types) AND from
// astro.config.mjs at config-load time (to compute which /shop/<handle>
// pages must be excluded from the sitemap). Keeping ONE implementation
// means the page-render check, the schema builder, the Merchant feed
// filter, and the sitemap filter can never disagree about which products
// are draft.
//
// See the DEVIATION note in product-content.ts for the full rationale on
// which fields count toward draft status.

const PLACEHOLDER = 'TODO_SPEC';

/** True when a string field is the literal unfilled placeholder. */
function isPlaceholder$1(value) {
  return typeof value === 'string' && value.trim() === PLACEHOLDER;
}

/** True when the FAQ list has at least one real (non-placeholder) entry. */
function hasRealFaqs$1(content) {
  const faqs = content.faqs || [];
  return faqs.length > 0 && faqs.some((f) => !isPlaceholder$1(f.q) && !isPlaceholder$1(f.a));
}

/**
 * True when a product's core editorial content has not been written yet and
 * the page/feed entry should be treated as a draft: specs, use cases,
 * how-to-order, and FAQ sections are hidden (configurator, intro-if-real,
 * and CTAs still render); the item is excluded from the Merchant feed AND
 * the sitemap, and the page carries noindex.
 */
function isDraftProduct$1(content) {
  if (content.draft === true) return true;
  const specs = content.specs || {};
  const useCases = content.useCases || [];
  const howToOrder = content.howToOrder || [];
  return (
    isPlaceholder$1(content.intro) ||
    isPlaceholder$1(specs.sizes) ||
    isPlaceholder$1(specs.minQuantity) ||
    isPlaceholder$1(specs.quantityBreaks) ||
    useCases.length === 0 ||
    useCases.some(isPlaceholder$1) ||
    howToOrder.length === 0 ||
    howToOrder.some(isPlaceholder$1) ||
    !hasRealFaqs$1(content)
  );
}

function isPlaceholder(value) {
  return isPlaceholder$1(value);
}
function hasRealFaqs(content) {
  return hasRealFaqs$1(content);
}
function isDraftProduct(content) {
  return isDraftProduct$1(content);
}

export { isPlaceholder as a, hasRealFaqs as h, isDraftProduct as i };
