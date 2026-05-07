# Envelope Size Pages — SEO Audit
**Date:** May 2026  
**Auditor:** Agent (automated source + live-server analysis)  
**Scope:** 13 pages — 1 hub + 12 spokes  
**Methodology:** Source file analysis (`src/pages/guides/envelope-sizes/`, `src/data/envelope-spokes.ts`), live-server HTML word counts via `curl`, git log for last-modified dates.

> Word counts are **full-page HTML** (all text nodes stripped of tags, including nav, sidebar, footer, and CTASection). Subtract ~450 words for page chrome to approximate body-only word count.

---

## Table 1 — Meta / Title / H1

| # | Page URL | Title | Title Chars | Meta Description | Desc Chars | H1 |
|---|----------|-------|:-----------:|------------------|:----------:|----|
| 1 | `/guides/envelope-sizes` | Envelope Sizes Chart 2026: Complete Guide to Standard, Business & Mailing Envelope Dimensions | **93 ❌** | Every standard envelope size with exact dimensions, USPS rates, and use cases. Compare #10, A-series, 6×9, 9×12, legal, and window envelopes in one chart. | 154 ✅ | Envelope Sizes Chart 2026 |
| 2 | `/guides/envelope-sizes/no-10` | #10 Envelope Size: Dimensions, USPS Rates & When to Use It (2026) | **65 ❌** | A #10 envelope measures 4.125" × 9.5" and is the standard US business envelope. Get exact dimensions, USPS postage, window options, and when to use it. | 151 ✅ | #10 Envelope Size: Dimensions, USPS Rates & When to Use It |
| 3 | `/guides/envelope-sizes/no-9` | #9 Envelope Size: Dimensions and Common Uses for Reply Envelopes | **64 ❌** | A #9 envelope measures 3.875" × 8.875" and is the standard reply envelope that fits inside a #10 outer. Get dimensions, postage, and use cases. | 143 ✅ | #9 Envelope Size: Dimensions and Reply Envelope Uses |
| 4 | `/guides/envelope-sizes/a6` | A6 Envelope Size: Dimensions in Inches and Millimeters | 54 ✅ | An A6 envelope measures 4.75" × 6.5" and fits A6 cards, save-the-dates, and small invitations. Get dimensions, postage, and use cases. | 134 ✅ | A6 Envelope Size: Dimensions and Use Cases |
| 5 | `/guides/envelope-sizes/a7` | A7 Envelope Size: The Standard for 5×7 Wedding Invitations | 58 ✅ | An A7 envelope measures 5.25" × 7.25" and fits standard 5×7 invitations. The default envelope for wedding invitations, photo cards, and formal announcements. | **157 ❌** | A7 Envelope Size: The Standard for Wedding Invitations |
| 6 | `/guides/envelope-sizes/a9` | A9 Envelope Size: Dimensions, Use Cases, and Postage | 52 ✅ | An A9 envelope measures 5.75" × 8.75" and fits larger invitations, programs, and 5.5×8.5 cards. Get exact dimensions, postage, and when to use it. | 146 ✅ | A9 Envelope Size: Dimensions and Use Cases |
| 7 | `/guides/envelope-sizes/a10` | A10 Envelope Size: Dimensions and Mailability Rules | 51 ✅ | An A10 envelope measures 6" × 9.5" and is the largest A-series envelope still at letter rate. Get dimensions, postage, and mailability considerations. | 150 ✅ | A10 Envelope Size: Dimensions and Mailability Rules |
| 8 | `/guides/envelope-sizes/6x9` | 6x9 Envelope Dimensions, Postage Class, and When to Use It | 58 ✅ | A 6×9 envelope measures 6" × 9" and is commonly used for booklets, brochures, and multi-page direct mail. Get dimensions, postage rules, and mailability. | 153 ✅ | 6x9 Envelope: Dimensions, Postage, and Use Cases |
| 9 | `/guides/envelope-sizes/9x12` | 9x12 Envelope: Large Envelope Size, Flat Mail Rates, and Use Cases | **66 ❌** | A 9×12 envelope measures 9" × 12" and is the standard large envelope (flat) for unfolded 8.5×11 documents. Get dimensions, USPS flat rates, and use cases. | 154 ✅ | 9x12 Envelope: Dimensions, Flat Rates, and Use Cases |
| 10 | `/guides/envelope-sizes/legal` | Legal Envelope Size: Dimensions for Legal-Size Document Mailing | **63 ❌** | Legal envelopes (#11, #12, #14) range from 4.5"×10.375" to 5"×11.5" and fit folded 8.5×14 legal-size paper. Get dimensions, postage, and which to use. | 150 ✅ | Legal Envelope Size: Dimensions and Use Cases |
| 11 | `/guides/envelope-sizes/window` | Window Envelope Sizes: #9, #10, and Double-Window Dimensions | 60 ✅ | Window envelope sizes, placement rules, and use cases — #9 and #10 windows, double-window envelopes, and USPS DMM 202 placement requirements. | 141 ✅ | Window Envelope Sizes: Dimensions and Placement Rules |
| 12 | `/guides/envelope-sizes/usps-minimum-maximum` | USPS Minimum and Maximum Envelope Sizes: Mailability Rules Explained | **68 ❌** | USPS minimum envelope size is 3.5"×5"×0.007"; maximum letter-rate envelope is 6.125"×11.5"×0.25". Get the full mailability rules, aspect ratio limits, and what gets reclassified. | **178 ❌** | USPS Minimum and Maximum Envelope Sizes |
| 13 | `/guides/envelope-sizes/business-envelope-types` | Business Envelope Sizes: A Complete Comparison of Letter and Flat Envelopes | **75 ❌** | Compare every standard business envelope size — #10, #9, A-series, 6×9, 9×12, and legal. Choose the right envelope by use case, postage class, and document fit. | **160 ❌** | Business Envelope Sizes: Complete Comparison |

**Title summary:** 7 of 13 over 60 chars (hub, no-10, no-9, 9x12, legal, usps-minimum-maximum, business-envelope-types)  
**Meta desc summary:** 3 of 13 over 155 chars (a7, usps-minimum-maximum, business-envelope-types)

---

## Table 2 — Content & Schema Checks

| # | Page URL | Word Count (HTML) | Comparison Table | FAQ Section | FAQPage Schema | BreadcrumbList | Article + dateModified | Sibling Links | CTA to /services | Both in + mm | Git Last Modified |
|---|----------|:-----------------:|:----------------:|:-----------:|:--------------:|:--------------:|:---------------------:|:-------------:|:----------------:|:------------:|:-----------------:|
| 1 | `/guides/envelope-sizes` | 3,290 | ✅ full 10-row | ✅ 8 FAQs | ✅ | ✅ 3-level | ✅ `2026-05-04` | ✅ 12 spoke cards + nav | ✅ | ✅ | 2026-05-04 |
| 2 | `/guides/envelope-sizes/no-10` | 2,924 | ⚠️ spec only | ✅ 6 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 3 | `/guides/envelope-sizes/no-9` | 2,624 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 4 | `/guides/envelope-sizes/a6` | 2,466 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 5 | `/guides/envelope-sizes/a7` | 2,593 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 6 | `/guides/envelope-sizes/a9` | 2,439 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 7 | `/guides/envelope-sizes/a10` | 2,582 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 8 | `/guides/envelope-sizes/6x9` | 2,594 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 9 | `/guides/envelope-sizes/9x12` | 2,753 | ⚠️ spec only | ✅ 6 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 10 | `/guides/envelope-sizes/legal` | 2,644 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 11 | `/guides/envelope-sizes/window` | 2,700 | ⚠️ spec only | ✅ 5 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ⚠️ see note B | 2026-05-05 |
| 12 | `/guides/envelope-sizes/usps-minimum-maximum` | 2,869 | ⚠️ spec only | ✅ 6 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ✅ | 2026-05-05 |
| 13 | `/guides/envelope-sizes/business-envelope-types` | 2,777 | ⚠️ spec only | ✅ 6 FAQs | ✅ | ✅ 4-level | ✅ `2026-05-04` | ⚠️ see note A | ✅ | ⚠️ see note B | 2026-05-05 |

### Notes

**Note A — Sibling links bug (all 12 spoke pages):**  
`[slug].astro` line 94 reads:
```js
const relatedSpokes = HUB_NAV_ITEMS.filter((item) => item.slug !== spoke.slug).slice(0, 4);
```
`spoke.slug` is `undefined` — the `EnvelopeSpoke` interface does not include a `slug` property (the slug is the Record key, not stored on each object). Because `item.slug !== undefined` is always `true`, the filter never excludes anything, and `.slice(0, 4)` always returns the **same first four items**: `no-10`, `no-9`, `a6`, `a7`. Every spoke page shows these same four regardless of which page is current, and the current page is never excluded. The `/guides/envelope-sizes/no-10` page, for example, lists itself as a related page.  
**Fix:** Change `spoke.slug` → `slug` (the `Astro.params.slug` variable already destructured on line 21).

**Note B — mm dimensions (window, business-envelope-types):**  
The `SpecTable` component for `window` displays `dimensionsMm: 'Variable'` and for `business-envelope-types` displays `dimensionsMm: 'Various — see comparison'`. Neither surfaces a real mm value in the spec table. Body prose for both pages does reference specific sizes in inches inline, but mm equivalents are not explicitly stated for the primary subject of each page. All other 11 pages show real mm values in the SpecTable. _(window and business-envelope-types are inherently multi-size topics, so this is partially by design — but worth noting.)_

**Note C — `dateModified` is hardcoded:**  
All 13 pages emit `"dateModified": "2026-05-04"` in Article schema. The data file (`envelope-spokes.ts`) and spoke template (`[slug].astro`) were both last updated in git on 2026-05-05. The Article schema's `dateModified` is static (`const pubDate = '2026-05-04'`) and will not update automatically when content changes.

---

## Gaps Summary — Top 5 Issues by Likely SEO Impact

### 1. Seven titles exceed 60 characters (HIGH impact — CTR)

The seven over-length titles affect the highest-traffic pages in the cluster. Google truncates titles in SERPs around 60 characters; truncated titles lose the keyword tail that differentiates the page. The hub title at 93 characters is the most severe — the phrase "Business & Mailing Envelope Dimensions" (the most descriptive portion) is entirely cut off in search results.

**Pages affected:** hub (93), business-envelope-types (75), usps-minimum-maximum (68), 9x12 (66), no-10 (65), no-9 (64), legal (63)  
**Action:** Trim to ≤60 chars, keeping the size name and primary search intent word (dimensions/size/postage) within the visible range.

---

### 2. Broken `relatedSpokes` filter — all 12 spoke pages (HIGH impact — internal linking + UX)

Every spoke page's "Other Envelope Sizes" section is broken due to the `spoke.slug` → `undefined` issue (Note A above). The effect is twofold:

- **Internal linking equity is wasted:** 8 of the 12 possible sibling links are never shown (only the same first 4 hub items appear on every page, regardless of context).
- **Self-referential links:** The current page links to itself (e.g., the #10 page shows #10 as a related envelope). This is a crawl quality signal Google notices.

**Fix is a one-line change:** `spoke.slug` → `slug` on line 94 of `[slug].astro`.

---

### 3. Three meta descriptions exceed 155 characters (MEDIUM impact — CTR)

Long descriptions are truncated in SERPs. The `usps-minimum-maximum` description at 178 chars loses its final clause entirely; `business-envelope-types` at 160 chars and `a7` at 157 chars both truncate mid-sentence.

**Pages affected:** usps-minimum-maximum (178), business-envelope-types (160), a7 (157)  
**Action:** Trim to ≤155 chars, ending on a complete thought. For `usps-minimum-maximum`, the description should summarize the minimum and maximum rules in one sentence ≤155 chars.

---

### 4. `dateModified` hardcoded to `2026-05-04` on all 13 pages (MEDIUM impact — freshness signals)

The Article schema emits `"dateModified": "2026-05-04"` on all pages, including pages whose content was materially updated on 2026-05-05 (the full body content rewrite). For a cluster targeting year-pinned queries like "envelope sizes 2026," freshness signals matter. Google uses `dateModified` to score recency relevance.

**Action:** Either (a) update `pubDate` in both templates to `2026-05-05` to reflect the actual last content change, or (b) make `dateModified` a dynamic variable passed from the data file so future updates automatically propagate. Option (b) is preferred for maintainability.

---

### 5. Spoke pages have no inline cross-size comparison table (MEDIUM impact — dwell time + entity coverage)

The hub has a full 10-row comparison table. Each spoke page has a `SpecTable` for its own size only — there is no inline table showing "how this envelope compares to the next size up/down." Users landing on, say, the A7 spoke via search who want to confirm it's larger than A6 must navigate away to find the comparison. A 3-row inline comparison (the target size plus one size up and one size down) within the prose would:
- Increase dwell time and reduce bounce back to SERPs
- Provide additional keyword coverage for comparative queries ("a6 vs a7 envelope", "difference between a7 and a9")
- Make spoke pages more self-contained for featured snippet eligibility

**Pages most affected (highest comparison query volume expected):** a7, no-10, 9x12, a6

---

*End of audit. No page content was modified during this audit.*
