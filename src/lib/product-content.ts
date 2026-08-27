// src/lib/product-content.ts
// Shared "is this real content or still a placeholder" logic for product
// editorial content (src/content/products/*.md). This is the single
// definition of "complete" used by the product page template, the
// Product/Offer/FAQPage JSON-LD builder, the Google Merchant feed, AND the
// sitemap/noindex filter in astro.config.mjs — so a product is never
// treated as complete on one surface and draft on another.
//
// The actual field-level rules live in src/lib/product-draft-rules.mjs (a
// plain-JS module with no astro:content import), because astro.config.mjs
// needs to read them at config-load time, before the Astro content
// pipeline exists. This file just re-exports that logic with the
// astro:content-derived TypeScript types layered on top.
//
// ── DEVIATION FLAGGED FOR REVIEW ──────────────────────────────────────────
// A fully literal reading of "any TODO_SPEC anywhere -> draft" would flag
// ALL 20 product content files as draft: every single one still has
// specs.turnaround: "TODO_SPEC" (see the "get real turnaround times" task).
// That would empty the Merchant feed to 0 items and blank the specs/use
// case/FAQ sections on every shop page — not what was meant by "6 complete
// products."
//
// So draft status here is based on the fields that are, in practice, either
// fully written or fully placeholder together in every current product file:
// intro, specs.sizes, specs.minQuantity, specs.quantityBreaks, useCases,
// howToOrder, and faqs. specs.stock, specs.inkFinish, and specs.turnaround
// are deliberately EXCLUDED from the draft determination and instead
// guarded per-row in the specs table (isPlaceholder below) so an unfilled
// spec field hides only that one row, not the whole page/feed entry.
//
// This makes exactly the 6 products with real editorial content non-draft
// (car-magnet, envelope, lawn-sign, palm-card, up-envelope, up-palm-card)
// and the other 14 (placeholder in every field) draft — matching the
// "6 complete products" framing. If a stricter literal reading is wanted
// instead (any TODO_SPEC anywhere -> draft), remove the exclusions above;
// that currently zeroes out the feed and drafts all 20 shop pages.
// ───────────────────────────────────────────────────────────────────────────

import type { CollectionEntry } from 'astro:content';
import {
  isPlaceholder as isPlaceholderRaw,
  hasRealFaqs as hasRealFaqsRaw,
  isDraftProduct as isDraftProductRaw,
} from './product-draft-rules.mjs';

export type ProductContent = CollectionEntry<'products'>['data'];

/** True when a string field is the literal unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return isPlaceholderRaw(value);
}

/** True when the FAQ list has at least one real (non-placeholder) entry. */
export function hasRealFaqs(content: Pick<ProductContent, 'faqs'>): boolean {
  return hasRealFaqsRaw(content);
}

/**
 * True when a product's core editorial content has not been written yet and
 * the page/feed entry should be treated as a draft: specs, use cases,
 * how-to-order, and FAQ sections are hidden (configurator, intro-if-real,
 * and CTAs still render); the item is excluded from the Merchant feed, the
 * sitemap, and carries noindex.
 */
export function isDraftProduct(content: ProductContent): boolean {
  return isDraftProductRaw(content);
}
