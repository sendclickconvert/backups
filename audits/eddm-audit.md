# EDDM Pages — SEO Audit
**Date:** May 2026  
**Auditor:** Agent (automated source analysis, git log, live-server char counts)  
**Scope:** All .astro, .md, .mdx, and .html files mentioning "EDDM" or "every door direct mail"  
**Result:** 10 primary EDDM pages, 43 additional files with passing mentions

---

## Rate Verification — Official Source

**EDDM Retail rate confirmed from USPS Notice 123 (pe.usps.com), accessed 2026-05-07:**

> "EDDM—Retail Flats up to 3.3 oz. **$0.247**"

Source URL: `https://pe.usps.com/text/dmm300/Notice123.htm`  
Verification date: 2026-05-07

**BMEU rate status: UNVERIFIED** — Notice 123 page did not return the BMEU/carrier route section via automated fetch. The `eddm-retail-vs-eddm-bmeu.md` comparison article has been intentionally left untouched pending manual verification. The current file incorrectly shows BMEU = $0.247 (same as Retail), which contradicts the article's own explanatory text that BMEU should be cheaper. The `eddm-guide.astro` pricing table shows BMEU = $0.242 — this figure is also unverified but left in place.

**Action required before next edit of `eddm-retail-vs-eddm-bmeu.md`:** Confirm the BMEU Marketing Mail Carrier Route Saturation rate (DDU entry) from Notice 123 PDF directly. Once confirmed, update both the comparison article table and the eddm-guide.astro BMEU row.

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

*Table reflects pre-fix state as found during audit. Fixes applied 2026-05-07 — see Fix Log below.*

---

## Table 2 — Primary EDDM Pages: Content Checks (pre-fix)

| # | URL | Postage Rate Cited | Rate Correct? | Rate Table Present | CTA to /contact or quote | dateModified in schema |
|---|-----|--------------------|:-------------:|:------------------:|:------------------------:|:----------------------:|
| 1 | `/services/eddm` | $0.247 | ✅ | ✅ (all-in cost table) | ✅ `/estimate` | ❌ static, not in schema |
| 2 | `/resources/eddm-guide` | $0.247 (Retail) / $0.242 (BMEU) | ✅ Retail / ⚠️ BMEU unverified | ✅ (postage table) | ✅ `/estimate` | ❌ none |
| 3 | `/services/direct-mail/eddm-every-door-direct-mail` | $0.223 | ❌ stale | ✅ (inline table) | via template CTASection | ✅ `updatedDate: 2026-04-01` |
| 4 | `/services/direct-mail/eddm-vs-targeted-direct-mail` | $0.22–$0.23 | ❌ stale | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-01` |
| 5 | `/services/eddm/how-much-does-eddm-cost` | $0.247 ("as of 2025" ❌) | ✅ rate / ❌ year qualifier | ✅ (cost breakdown) | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 6 | `/services/eddm/what-is-every-door-direct-mail` | $0.247 | ✅ | ✅ (comparison table) | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 7 | `/services/eddm/eddm-retail-vs-eddm-bmeu` | $0.247 both retail+BMEU | ✅ Retail / ❌ BMEU wrong | ✅ (comparison table) | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 8 | `/services/eddm/eddm-postcard-sizes-and-specs` | not rate-focused | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 9 | `/services/eddm/eddm-printing-requirements` | not rate-focused | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-09` |
| 10 | `/services/eddm/how-to-set-up-an-eddm-campaign` | not rate-focused | — | ❌ | via template CTASection | ✅ `updatedDate: 2026-04-09` |

---

## Rate Inconsistency (pre-fix) — Sitewide

The site had three different EDDM Retail rate citations before this fix pass:

| Rate | Occurrences | Status |
|------|:-----------:|--------|
| **$0.247** | 44 | ✅ Correct per Notice 123 — left in place |
| **$0.223** | 8 | ❌ Stale — corrected to $0.247 |
| **$0.242** | 1 | ⚠️ BMEU rate — unverified, left in place |

---

## Fix Log — Applied 2026-05-07

### Tier 1 — Full fix set (7 of 8 primary EDDM pages)

| File | Title Updated | Desc Trimmed | dateModified | CTA Updated | Above-fold CTA | Notes |
|------|:---:|:---:|:---:|:---:|:---:|-------|
| `src/pages/services/eddm.astro` | ✅ 52 chars | ✅ 149 chars | ✅ WebPage schema `2026-05-07` | ✅ 3× → `/contact?service=eddm` | ✅ banner below hero | |
| `src/pages/resources/eddm-guide.astro` | ✅ 51 chars | ✅ 138 chars | ✅ `<time>` element | ✅ 1× → `/contact?service=eddm` | ✅ CTA band above "How EDDM Works" | |
| `eddm-articles/how-much-does-eddm-cost.md` | ✅ 60 chars | ✅ 141 chars | ✅ `updatedDate: 2026-05-07` | via template ✅ | ✅ template banner | "as of 2025" → "as of 2026" fixed |
| `eddm-articles/what-is-every-door-direct-mail.md` | ✅ 53 chars | ✅ 147 chars | ✅ `updatedDate: 2026-05-07` | via template ✅ | ✅ template banner | |
| `eddm-articles/eddm-postcard-sizes-and-specs.md` | ✅ 54 chars | ✅ 149 chars | ✅ `updatedDate: 2026-05-07` | via template ✅ | ✅ template banner | |
| `eddm-articles/eddm-printing-requirements.md` | ✅ 51 chars | ✅ 153 chars | ✅ `updatedDate: 2026-05-07` | via template ✅ | ✅ template banner | |
| `eddm-articles/how-to-set-up-an-eddm-campaign.md` | ✅ 56 chars | ✅ 149 chars | ✅ `updatedDate: 2026-05-07` | via template ✅ | ✅ template banner | |
| `eddm-articles/eddm-retail-vs-eddm-bmeu.md` | ⏸ HELD | ⏸ HELD | ⏸ HELD | ⏸ HELD | ⏸ HELD | **BMEU rate unverified — no edits made** |

### Tier 2 — Title + desc + rate correction (2 DM-cluster articles)

| File | Title Updated | Desc | Rate Fixed | Math Corrected | updatedDate |
|------|:---:|:---:|:---:|:---:|:---:|
| `dm-articles/eddm-every-door-direct-mail.md` | ✅ 53 chars | ✅ 137 chars | ✅ all $0.223 → $0.247 | ✅ postage $624→$692, total $2,644→$2,712, ROI 119%→113%, CPL $156→$160, all-in $0.66–$1.18→$0.69–$1.21 | ✅ 2026-05-07 |
| `dm-articles/eddm-vs-targeted-direct-mail.md` | ✅ 53 chars | ✅ 145 chars | ✅ $0.22–$0.23 → $0.247 | n/a | ✅ 2026-05-07 |

### Tier 3 — Rate correction only

| File | Rate Fixed | Math Corrected | updatedDate |
|------|:---:|:---:|:---:|
| `dm-articles/direct-mail-roi.md` | ✅ $0.223 → $0.247 | ✅ Ex.2: $2,230→$2,470, total $6,280→$6,520, CPD $1,570→$1,630; Ex.3: $3,345→$3,705, total $9,095→$9,455, ROI 66%→60% | ✅ 2026-05-07 |
| `dm-articles/how-much-does-direct-mail-cost.md` | ✅ $0.223 → $0.247 | ✅ postage $1,115→$1,235, total $3,190→$3,310, CPP $0.64→$0.66 | ✅ 2026-05-07 |
| `data-articles/saturation-vs-targeted-mailing-lists.md` | ✅ $0.223 → $0.247 | ✅ all-in range $0.44–$0.60→$0.48–$0.65 | ✅ 2026-05-07 |

### Template Change

| File | Change |
|------|--------|
| `src/pages/services/eddm/[slug].astro` | Added above-fold CTA banner (before TOC); all `/estimate` hrefs → `/contact?service=eddm` |

---

## Open Items

1. **`eddm-retail-vs-eddm-bmeu.md` — all 5 fixes held.** BMEU rate must be verified from USPS Notice 123 PDF before any edit to this file. Current file incorrectly shows BMEU = $0.247 (identical to Retail). Confirmed BMEU is lower — exact rate unknown until verification.

2. **`eddm-guide.astro` BMEU table row ($0.242)** — left in place, unverified. Could be close to correct but should be updated alongside the comparison article once BMEU rate is confirmed.

3. **`/contact?service=eddm` pre-fill** — the contact page does not currently parse the `?service=eddm` query parameter to pre-fill the form's service field. CTAs will route correctly but no auto-selection occurs. Consider adding query-param pre-fill to `EstimateForm` as a future improvement.

---

*End of audit. All changes tracked above were applied in one atomic pass on 2026-05-07.*
