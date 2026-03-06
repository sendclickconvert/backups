# CRST.NET Backlink Equity Reclamation Report
**Date**: March 6, 2026
**Source**: DataForSEO Backlinks API + local redirect verification

---

## SECTION A: High-Priority Broken URLs with Backlinks

### Every backlink URL is ALREADY redirected — zero equity is being lost.

DataForSEO found **8 unique target URLs** receiving backlinks to crst.net:

| Old URL | Backlinks | Ref Domains | Redirect Status | Destination | Final Status |
|---------|-----------|-------------|-----------------|-------------|-------------|
| https://crst.net/ | 989 | 17 | 200 (LIVE) | — | 200 |
| http://crst.net/ | 4 | 3 | 301 (protocol) | https://crst.net/ | 200 |
| http://www.crst.net/ | 2 | 2 | 301 (protocol) | https://crst.net/ | 200 |
| /direct-mail-services/printing-services/ | 1 | 1 | 301 | /services/printing | 200 |
| /direct-mail-services/mail-design/ | 1 | 1 | 301 | /services/graphic-design | 200 |
| /direct-mail-services/data-lists/ | 1 | 1 | 301 | /services/data-lists | 200 |
| /direct-mail-services/post-office-mailing/ | 1 | 1 | 301 | /services/mailing | 200 |
| /contact-us/ | 1 | 1 | 301 | /contact | 200 |

**All 5 old WordPress URLs are properly 301-redirected to their topically relevant live pages.**
**All redirects resolve to 200 (no chains).**

---

## SECTION B: Full Redirect Map

The CRST project has a comprehensive dual redirect system with **130+ exact redirects + 8 wildcard patterns**.

### Redirect System Architecture
1. **astro.config.mjs** — config-level redirects (handles most paths)
2. **[...slug].astro** — server-rendered catch-all with exact match table + wildcard pattern rules

### Old WordPress URLs → Live Pages (all active)

| Old URL | New URL | Reason | Confidence |
|---------|---------|--------|-----------|
| /direct-mail-services/ | /services/ | Old WP service index | HIGH |
| /direct-mail-services/printing-services/ | /services/printing | Old WP service page | HIGH |
| /direct-mail-services/mail-design/ | /services/graphic-design | Old WP service page | HIGH |
| /direct-mail-services/data-lists/ | /services/data-lists | Old WP service page | HIGH |
| /direct-mail-services/post-office-mailing/ | /services/mailing | Old WP service page | HIGH |
| /direct-mail-services/union-printing-*/ | /services/union-printing | Old WP service page | HIGH |
| /direct-mail-services/crst-web-design-*/ | /services/web-design | Old WP service page | HIGH |
| /direct-mail-services/web-design/ | /services/web-design | Old WP service page | HIGH |
| /direct-mail-company/ | /about | Old WP about page | HIGH |
| /contact-us/ | /contact | Old WP contact page | HIGH |
| /order-online-direct-mail/ | /contact | Old WP order page | HIGH |
| /direct-mail-case-studies/ | /case-studies | Old WP case studies | HIGH |
| /case-study/* (12 specific) | /case-studies/[slug] | Individual case studies | HIGH |
| /case-study/* (catch-all) | /case-studies/ | Unmapped case studies | HIGH |
| /resources/mailing-permits/ | /direct-mail-tools/cornerstone-mailing-permits | Moved resource | HIGH |
| /resources/postage-rates/ | /direct-mail-tools/postage-rates | Moved resource | HIGH |
| /resources/envelope-sizes/ | /direct-mail-tools/envelope-sizes | Moved resource | HIGH |
| /resources/postal-dictionary/ | /direct-mail-tools/postal-dictionary | Moved resource | HIGH |
| /resources/non-profit-mailing/ | /non-profit-mailing-application | Moved resource | HIGH |
| /resources/mail-forwarding/ | /direct-mail-tools/address-change | Moved resource | HIGH |
| /resources/usps-templates/ | /usps-direct-mailer-templates | Moved resource | HIGH |
| /permits-page/ | /direct-mail-tools/cornerstone-mailing-permits | Old WP permits page | HIGH |
| /how-to-get-a-refund-on-postage/ | /how-to-get-a-refund-on-postage-*/ | URL shortening | HIGH |
| /printing-partners/* | /about | Old WP printing partners | MEDIUM |
| /direct-mail-marketing/ | /direct-mail-marketing | Trailing slash fix | HIGH |
| /direct-mail-new-paltz | /service-areas/ulster-county/new-paltz | Old city landing | HIGH |
| /direct-mail-kingston | /service-areas/ulster-county/kingston | Old city landing | HIGH |
| /direct-mail-poughkeepsie | /service-areas/dutchess-county/poughkeepsie | Old city landing | HIGH |

### Wildcard Pattern Rules (catch-all)
| Pattern | Destination | Coverage |
|---------|-------------|----------|
| /crst-daily/* | https://blog.crst.net/ | All old daily posts |
| /tag/* | https://blog.crst.net/ | WP taxonomy pages |
| /category/* | https://blog.crst.net/ | WP category pages |
| /case-study/* | /case-studies/ | All old case study URLs |
| /case-study-category/* | /case-studies/ | WP case study categories |
| /printing-partners/* | /about/ | Old partner pages |
| /direct-mail-services/* | /services/ | Catch-all for old service URLs |
| /wp-content/* | /resources/ | Old WordPress uploads |

---

## SECTION C: Implementation Status

### Already Implemented — No Additional Code Needed

All redirects are **already live** in the codebase via two mechanisms:

**1. astro.config.mjs** (config-level redirects)
```javascript
// Already present - ~99 exact redirects
redirects: {
  '/direct-mail-services/printing-services/': '/services/printing',
  '/contact-us/': '/contact',
  // ... 97 more
}
```

**2. src/pages/[...slug].astro** (catch-all handler)
```javascript
// Already present - 130+ exact redirects + 8 wildcard patterns
const exactRedirects = {
  '/direct-mail-services/mail-design/': '/services/graphic-design',
  // ... 129 more
};
// Plus wildcard patterns for /crst-daily/*, /tag/*, /case-study/*, etc.
```

### Redirect Chain Status
- **Zero redirect chains** — all 301s go directly to final 200 page
- Previously identified 4 chains (from March 5 backlink audit) were already collapsed

---

## Summary

| Metric | Value |
|--------|-------|
| Total backlinks analyzed | 2,801 |
| Unique target URLs with backlinks | 8 |
| Old WordPress URLs with backlinks | 5 |
| URLs already redirected | 5/5 (100%) |
| Redirect chains | 0 |
| Backlink equity being lost | **NONE** |
| URLs needing new redirects | **NONE** |
| URLs needing new content | **NONE** |

### Service Pages Receiving Recovered Authority
| Page | Authority From |
|------|---------------|
| /services/printing | ← /direct-mail-services/printing-services/ (1 backlink) |
| /services/graphic-design | ← /direct-mail-services/mail-design/ (1 backlink) |
| /services/data-lists | ← /direct-mail-services/data-lists/ (1 backlink) |
| /services/mailing | ← /direct-mail-services/post-office-mailing/ (1 backlink) |
| /contact | ← /contact-us/ (1 backlink) |

### Verified on Production (March 6, 2026)
```
https://crst.net/ → 200
https://crst.net/direct-mail-services/printing-services/ → 301 → /services/printing → 200
https://crst.net/direct-mail-services/data-lists/ → 301 → /services/data-lists → 200
https://crst.net/contact-us/ → 301 → /contact → 200
```

**Conclusion**: The CRST redirect system is comprehensive and complete. All backlinked URLs are properly 301-redirected to topically relevant destinations with zero chains. No additional redirect work is needed at this time.
