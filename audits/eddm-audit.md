# EDDM Pages — SEO Audit
**Date:** May 2026  
**Auditor:** Agent (automated source analysis, git log, live-server char counts)  
**Scope:** All .astro, .md, .mdx, and .html files mentioning "EDDM" or "every door direct mail"  
**Result:** 10 primary EDDM pages, 43 additional files with passing mentions

---

## Scope Classification

| Category | Count | Treatment |
|----------|:-----:|-----------|
| **Primary EDDM pages** (EDDM is the main topic) | 10 | Full audit detail below |
| **Passing mentions — service/resource pages** | ~25 | Rate correction only if $0.247 appears |
| **Passing mentions — content articles (EDDM not the topic)** | ~18 | No-touch |

---

## Table 1 — Primary EDDM Pages: Meta / Title

| # | URL | File | Title | Title Chars | Year in Title/H1 | Desc Chars | Git Last Modified |
|---|-----|------|-------|:-----------:|:----------------:|:----------:|:-----------------:|
| 1 | `/services/eddm` | `src/pages/services/eddm.astro` | EDDM Services — Every Door Direct Mail \| Postage From $0.247/Piece | **66 ❌** | None | **189 ❌** | 2026-05-04 |
| 2 | `/resources/eddm-guide` | `src/pages/resources/eddm-guide.astro` | EDDM Guide — Every Door Direct Mail Explained | 45 ✅ | None | 146 ✅ | 2026-03-20 |
| 3 | `/services/direct-mail/eddm-every-door-direct-mail` | `src/content/dm-articles/eddm-every-door-direct-mail.md` | Every Door Direct Mail (EDDM): Saturate Hudson Valley Neighborhoods Without Buying Lists | **88 ❌** | None | **165 ❌** | 2026-04-01 |
| 4 | `/services/direct-mail/eddm-vs-targeted-direct-mail` | `src/content/dm-articles/eddm-vs-targeted-direct-mail.md` | EDDM vs. Targeted Direct Mail | 29 ✅ | None | 144 ✅ | 2026-04-01 |
| 5 | `/services/eddm/how-much-does-eddm-cost` | `src/content/eddm-articles/how-much-does-eddm-cost.md` | How Much Does EDDM Cost? A Real Pricing Breakdown | 49 ✅ | None | **218 ❌** | 2026-05-04 |
| 6 | `/services/eddm/what-is-every-door-direct-mail` | `src/content/eddm-articles/what-is-every-door-direct-mail.md` | What Is Every Door Direct Mail (EDDM)? | 38 ✅ | None | **223 ❌** | 2026-05-04 |
| 7 | `/services/eddm/eddm-retail-vs-eddm-bmeu` | `src/content/eddm-articles/eddm-retail-vs-eddm-bmeu.md` | EDDM Retail vs. EDDM BMEU: Which Do You Need? | 45 ✅ | None | **206 ❌** | 2026-05-04 |
| 8 | `/services/eddm/eddm-postcard-sizes-and-specs` | `src/content/eddm-articles/eddm-postcard-sizes-and-specs.md` | EDDM Postcard Sizes and Specs: The Complete USPS Guide | 54 ✅ | None | **225 ❌** | 2026-05-04 |
| 9 | `/services/eddm/eddm-printing-requirements` | `src/content/eddm-articles/eddm-printing-requirements.md` | EDDM Printing Requirements: What Every Printer Needs to Know | 60 ✅ | None | **202 ❌** | 2026-05-04 |
| 10 | `/services/eddm/how-to-set-up-an-eddm-campaign` | `src/content/eddm-articles/how-to-set-up-an-eddm-campaign.md` | How to Set Up an EDDM Campaign: A Step-by-Step Guide | 52 ✅ | None | **203 ❌** | 2026-05-04 |

**Title summary:** 2 of 10 over 60 chars (#1, #3). **All 10 titles are year-free.**  
**Meta desc summary:** 7 of 10 over 155 chars (all eddm-articles cluster, #1, #3).

---

## Table 2 — Primary EDDM Pages: Content Checks

| # | URL | Postage Rate Cited | Rate Correct? | Rate Table Present | CTA to /contact or quote | dateModified in schema |
|---|-----|--------------------|:-------------:|:------------------:|:------------------------:|:----------------------:|
| 1 | `/services/eddm` | $0.247 | ⚠️ stale | ✅ (all-in cost table) | ✅ `/estimate` | ❌ static, not in schema |
| 2 | `/resources/eddm-guide` | $0.247 (Retail) / $0.242 (BMEU) | ⚠️ stale | ✅ (postage table) | ✅ `/estimate` | ❌ none |
| 3 | `/services/direct-mail/eddm-every-door-direct-mail` | $0.223 | ⚠️ stale | ✅ (inline table) | via template CTASection | ✅ `updatedDate: 2026-04-01` |
| 4 | `/services/direct-mail/eddm-vs-targeted-direct-mail` | not primary | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-01` |
| 5 | `/services/eddm/how-much-does-eddm-cost` | $0.247 ("as of 2025" ❌) | ❌ stale + wrong year | ✅ (cost breakdown) | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 6 | `/services/eddm/what-is-every-door-direct-mail` | $0.247 | ⚠️ stale | ✅ (comparison table) | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 7 | `/services/eddm/eddm-retail-vs-eddm-bmeu` | $0.247 both retail+BMEU | ⚠️ stale | ✅ (comparison table) | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 8 | `/services/eddm/eddm-postcard-sizes-and-specs` | not rate-focused | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 9 | `/services/eddm/eddm-printing-requirements` | not rate-focused | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 10 | `/services/eddm/how-to-set-up-an-eddm-campaign` | not rate-focused | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-09` |

**Notes:**  
- "via template CTASection" = the `[slug].astro` template includes a `<CTASection />` component at bottom; no above-fold CTA  
- `/services/eddm` and `/resources/eddm-guide` are `.astro` files with no `dateModified` in Article schema  
- The eddm-articles template already emits `dateModified: updatedDateISO` from frontmatter — updating `updatedDate` in the `.md` file is sufficient

---

## Rate Inconsistency — Sitewide

The site currently cites **three different EDDM Retail rates**, all stale relative to the 2026 rate of **$0.222/piece**:

| Rate | Occurrences | Files |
|------|:-----------:|-------|
| **$0.247** | 44 | `eddm.astro`, `eddm-guide.astro`, all 6 eddm-articles, `nonprofit-articles/eddm-vs-targeted-mail-for-nonprofits.md`, others |
| **$0.223** | 8 | `dm-articles/eddm-every-door-direct-mail.md`, `dm-articles/direct-mail-roi.md`, `dm-articles/how-much-does-direct-mail-cost.md`, `data-articles/saturation-vs-targeted-mailing-lists.md` |
| **$0.242** | 1 | `eddm-guide.astro` (BMEU row) |
| **$0.222** | 0 | Not yet present anywhere |

The BMEU rate (`$0.242` in eddm-guide) also needs verification — current BMEU rates are not consistently cited in any file.

---

## Passing Mentions (summary — not audited in detail)

Pages where EDDM appears contextually but is not the primary topic — rate correction applicable where $0.247 appears in body text:

- `src/pages/services/direct-mail.astro`, `src/pages/faq.astro`, `src/pages/index.astro`
- `src/content/dm-articles/` — 9 articles (direct-mail-roi.md, how-much-does-direct-mail-cost.md, postcard-marketing.md, etc.)
- `src/content/nonprofit-articles/` — 3 articles
- `src/content/printing-articles/` — 5 articles
- `src/content/mailing-articles/` — 3 articles
- `src/content/graphic-design-articles/eddm-design-requirements-and-specs.md`
- `src/content/school-articles/` — 2 articles
- Various service, resource, and location pages

---

## Key Gaps (ranked by SEO impact)

1. **Stale postage rate on all 10 primary pages** — $0.247 (2024/2025 rate) appears 44 times sitewide. The correct 2026 EDDM Retail rate is $0.222/piece. `how-much-does-eddm-cost` even says "as of 2025" explicitly — the highest-intent cost page on the site is labeling its rate data as last year's.

2. **No year in any title or H1** — All 10 primary pages have year-free titles. EDDM cost/rate queries ("eddm postage rates 2026", "how much does eddm cost 2026") drive the bulk of the 8.6K impressions. No page is surfacing "2026" in its title to match those queries.

3. **All 6 eddm-articles have meta descriptions 200–225 chars** — every cluster article description is severely over the 155-char limit (206–225 chars). These are truncated by Google mid-sentence.

4. **2 titles over 60 chars** — `/services/eddm` (66) and the DM-pillar EDDM article (88). The 88-char title is the worst in the cluster.

5. **No above-fold CTA on eddm-articles cluster** — The 6 cluster articles only have a `CTASection` at the very bottom. No above-fold quote/estimate prompt on any rate or cost page.

6. **`/services/eddm` pillar has no `Article` schema or `dateModified`** — The schema is `Service + FAQPage + BreadcrumbList + WebPage`. No Article schema, so Google has no freshness signal for the pillar page.

7. **`/resources/eddm-guide` has duplicate intent with `/services/eddm`** — Both are broad EDDM overview pages. The guide page has stale rates, no year, and was last touched in March 2026. It may be cannibalizing the pillar.

---

*End of audit. No page content was modified during this audit.*
