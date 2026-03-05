# CRST.NET — Complete Project Audit
**Date**: March 5, 2026
**Domain**: crst.net
**Stack**: Astro 4.16 + Tailwind CSS + @astrojs/node (hybrid rendering)
**Deployment**: Replit Autoscale

---

## 1. BUSINESS DATA (Single Source of Truth: `src/data/site.ts`)

| Field | Value |
|-------|-------|
| Business Name | Cornerstone Services, Inc. |
| Short Name | CRST |
| Owner | Sean Griffin |
| Display Phone | (845) 255-5722 |
| Tracking Phone (GHL) | (845) 393-6770 / 8453936770 |
| Email | info@crst.net |
| Address | 31 South Ohioville Road, New Paltz, NY 12561 |
| Founded | 1998 |
| Domain | crst.net |
| GA4 ID | G-HRBG2H3FE7 |
| GHL Tracking ID | tk_7f785045033a4132bec45bd33cffe9b4 |
| Chat Widget ID | 698f05276dc9bbabc4529ff6 |

**Rating data** in site.ts: `ratingValue: '5.0', reviewCount: '0'` — retained as data definition but NOT rendered in any schema except BBB page.

---

## 2. PAGE INVENTORY

### Static Pages (45 .astro files + 3 .ts API/sitemap endpoints)
| Section | Count | Files |
|---------|-------|-------|
| Homepage | 1 | index.astro |
| Service pages | 9 + index | direct-mail, data-lists, printing, mailing, graphic-design, eddm, non-profit-mailing, union-printing, web-design |
| Service area pages | 3 templates | [county]/index.astro (3 counties), [county]/[location].astro (98 towns), service-areas/index.astro |
| Case studies | 2 | index.astro + [slug].astro (11 case studies from data) |
| Resources | 7 | index + eddm-guide, mail-automation, ancillary-service-endorsements, periodicals, understanding-periodicals, payments |
| Direct mail tools | 5 | postage-rates, cornerstone-mailing-permits, envelope-sizes, postal-dictionary, address-change |
| Standalone pages | 10 | about, contact, estimate, faq, privacy, terms, thank-you, direct-mail-marketing, informed-delivery-review, non-profit-mailing-application, usps-direct-mailer-templates |
| BBB page | 1 | crst-better-business-bureau-a-direct-mailer.astro |
| API endpoints | 2 | api/latest-posts.json.ts, api/create-payment-intent.ts |
| Catch-all redirect | 1 | [...slug].astro |
| Sitemap generator | 1 | sitemap.xml.ts |

**Total prerendered HTML pages**: 146
**Total sitemap URLs**: 143 (excludes /thank-you and /training)

### Location Coverage
| County | Towns | Sample Locations |
|--------|-------|-----------------|
| Ulster | ~37 | New Paltz, Kingston, Saugerties, Woodstock, Highland, Gardiner, Rosendale, Hurley, Marlborough, Ellenville... |
| Dutchess | ~27 | Poughkeepsie, Beacon, Rhinebeck, Red Hook, Millbrook, Wappingers Falls, Fishkill, Hyde Park... |
| Orange | ~29 | Newburgh, Middletown, Monroe, Warwick, Cornwall, Goshen, Port Jervis, Montgomery, Walden... |
| **Total** | **~93** | All with unique content, FAQs, notableOrgs, clientTypes, lat/lng coordinates |

---

## 3. SCHEMA / STRUCTURED DATA

### Schema Types by Page Type

| Page Type | JSON-LD Blocks | Schema Types |
|-----------|---------------|--------------|
| Homepage | 1 | ProfessionalService, GeoCoordinates, PostalAddress, OpeningHoursSpecification |
| Service pages | 2 | Service + LocalBusiness, BreadcrumbList |
| County hubs | 2 | LocalBusiness + Service, BreadcrumbList, GeoCoordinates |
| Town pages | 2 | LocalBusiness + FAQPage, BreadcrumbList, GeoCoordinates |
| BBB page | 4+ | Organization, Person, Review, AggregateRating, WebPage, FAQPage, Service, LocalBusiness, EducationalOccupationalCredential |
| Case studies | 1 | ProfessionalService (default) |
| Resource/tool pages | 1-2 | FAQPage (where applicable) + ProfessionalService |

### AggregateRating Rule (CRITICAL)

**AggregateRating exists ONLY on the BBB page** (`crst-better-business-bureau-a-direct-mailer.astro`):
- `ratingValue: '5'`
- `reviewCount: '3'` (3 real reviews with author data)
- `bestRating: '5'`, `worstRating: '1'`

**NOT present on**: Homepage, any of the 9 service pages, 3 county hubs, ~93 town pages, or any other page.

**Reason**: `reviewCount: 0` is invalid per Google's structured data requirements. The BBB page is the only page with real, verifiable reviews.

### Verified (rendered output grep):
```
/ → clean
/services/direct-mail → clean
/services/printing → clean
/services/mailing → clean
/services/data-lists → clean
/services/eddm → clean
/services/graphic-design → clean
/services/non-profit-mailing → clean
/services/union-printing → clean
/services/web-design → clean
/service-areas/ulster-county → clean
/service-areas/dutchess-county → clean
/service-areas/orange-county → clean
/service-areas/ulster-county/new-paltz → clean
/service-areas/ulster-county/kingston → clean
/service-areas/dutchess-county/poughkeepsie → clean
/service-areas/orange-county/newburgh → clean
/crst-better-business-bureau-a-direct-mailer → FOUND (correct)
```

---

## 4. SEO CONFIGURATION

### Meta Tags
- Every page has unique `<title>` and `<meta name="description">`
- `<link rel="canonical">` on every page (auto-generated from URL, can be overridden per page)
- Open Graph tags: og:type, og:title, og:description, og:url, og:image, og:site_name
- Twitter card meta tags
- **All canonicals verified: NO trailing slashes** (matches `trailingSlash: 'never'`)

### Trailing Slash
```js
trailingSlash: 'never'  // in astro.config.mjs
```
All sitemap URLs, canonical URLs, and internal links use no trailing slash.

### Sitemap
- Generated by `@astrojs/sitemap` integration
- Filters out `/thank-you` and `/training` pages
- 143 URLs in sitemap-0.xml
- Referenced in robots.txt: `Sitemap: https://crst.net/sitemap-index.xml`

### robots.txt
```
User-agent: *
Allow: /
Disallow: /thank-you
Sitemap: https://crst.net/sitemap-index.xml
```

### Training Portal
- Located at `/training/portal/` (standalone HTML in public/training/)
- `noindex`/`nofollow` — excluded from search engines
- 9 training videos in public/videos/

---

## 5. REDIRECTS

### Dual Redirect System
1. **astro.config.mjs**: ~99 config-level 301 redirects (WordPress migration, GSC indexed URLs)
2. **[...slug].astro**: ~130+ exact redirects + 8 pattern-based wildcard rules (server-rendered catch-all)

### Pattern-Based Wildcard Rules (catch-all)
| Pattern | Target |
|---------|--------|
| `/crst-daily/*` | `https://blog.crst.net/` |
| `/tag/*` | `https://blog.crst.net/` |
| `/category/*` | `https://blog.crst.net/` |
| `/case-study/*` | `/case-studies/` |
| `/case-study-category/*` | `/case-studies/` |
| `/printing-partners/*` | `/about/` |
| `/direct-mail-services/*` | `/services/` |
| `/wp-content/*` | `/resources/` |

### Redirect Chain Audit Tool
- `redirect-chain-check-v2.cjs` in project root
- Run: `node redirect-chain-check-v2.cjs`
- Reads: `redirect-map.csv`
- Outputs: `redirect-chain-report.csv`
- BASE_DOMAIN: `crst.net`

### DataForSEO Backlink Audit (March 5, 2026)
- 2,398 dofollow backlinks analyzed
- 4 `/direct-mail-services/` URLs had 2-hop redirect chains → collapsed to 1-hop
- 72 trailing slashes stripped from astro.config targets
- Proof artifact: `backlink-urls-redirect-audit-2026-03-05.csv`

---

## 6. GOOGLE MAPS

### Coverage
| Page Type | Map Embed | Zoom Level |
|-----------|-----------|------------|
| County hubs (3) | Google Maps iframe | zoom 11 |
| Town pages (~93) | Google Maps iframe | zoom 13 |
| Service pages | None (by design) | — |

### Verified:
```
/service-areas/ulster-county → 1 map embed
/service-areas/dutchess-county → 1 map embed
/service-areas/orange-county → 1 map embed
/service-areas/ulster-county/new-paltz → 1 map embed
/service-areas/ulster-county/kingston → 1 map embed
/service-areas/dutchess-county/poughkeepsie → 1 map embed
/service-areas/orange-county/newburgh → 1 map embed
/service-areas/orange-county/middletown → 1 map embed
```

All ~93 town pages use coordinates from `locations.ts` (lat/lng on every location).

---

## 7. CTA DENSITY

### Minimum 3 CTAs per page (service, county, town)

| Page | CTA Count |
|------|-----------|
| /services/direct-mail | 15 |
| /services/printing | 16 |
| /services/mailing | 17 |
| /services/data-lists | 16 |
| /services/eddm | 19 |
| /services/graphic-design | 16 |
| /services/non-profit-mailing | 14 |
| /services/union-printing | 13 |
| /services/web-design | 16 |
| /service-areas/ulster-county | 15 |
| /service-areas/ulster-county/new-paltz | 19 |

### CTA Pattern
- **Hero area**: sidebar CTA (phone + estimate link)
- **Mid-page CTA band**: blue-tinted band with phone + "Get a Free Estimate" button
- **Bottom**: `<CTASection />` component

---

## 8. BLOG INTEGRATION

### Architecture (Option B — Static homepage + client-side fetch)

```
Homepage (prerendered/static)
  └── Client-side JS fetch → /api/latest-posts.json
                                └── Server-rendered endpoint
                                    └── 10-min in-memory cache
                                    └── 5-second AbortController timeout
                                    └── Fetches from blog.crst.net/wp-json/wp/v2/posts
```

### Endpoint: `/api/latest-posts.json`
- **File**: `src/pages/api/latest-posts.json.ts`
- **Prerender**: false (server-rendered)
- **Cache headers**: `Cache-Control: public, max-age=0, s-maxage=600, stale-while-revalidate=60` + `Surrogate-Control: max-age=600, stale-while-revalidate=60`
- **Error cache**: `Cache-Control: no-store`
- **Server cache**: 10-minute in-memory TTL
- **Timeout**: 5-second AbortController on WP API fetch
- **Returns**: `{"ok":true,"posts":[{url, title, date}, ...]}` (6 posts)
- **Error returns**: `{"ok":false,"error":"FETCH_FAILED","posts":[]}`

### Homepage Blog Section
- Skeleton loading placeholders (3 cards with pulse animation)
- Client-side fetch replaces skeletons with real post cards
- `.slice(0, 3)` — renders 3 of the 6 returned posts
- Graceful fallback: "Unable to load posts right now. Visit the blog."
- "View all →" link to blog.crst.net

### Verified:
```
Endpoint: HTTP 200, Content-Type: application/json
Homepage: prerendered (ETag + Last-Modified headers)
Fetch reference: line 153 in rendered HTML
Posts: ok=True, 6 posts returned
```

---

## 9. PERFORMANCE OPTIMIZATIONS

| Optimization | Implementation |
|-------------|---------------|
| Hero video | Desktop-only (768px+ via `matchMedia`), avoids 4.1MB mobile download |
| Mobile hero | Vimeo CDN thumbnail (640x360) with dark overlay + play button SVG |
| Logo | WebP format (16KB vs 180KB PNG original) |
| GHL chat widget | Deferred 3 seconds via `setTimeout` |
| External tracking | Loaded on `window.addEventListener('load')` |
| Blog API | 10-min server cache + 5s timeout prevents WP hammering |

---

## 10. TRACKING & ANALYTICS

| System | ID/Config |
|--------|-----------|
| GA4 | G-HRBG2H3FE7 (loaded via gtag.js) |
| GHL call tracking | number_pool.js + user_session.js (via external-tracking.js) |
| GHL chat widget | Widget ID 698f05276dc9bbabc4529ff6 (3s deferred) |
| GHL webhook | services.leadconnectorhq.com endpoint |
| Phone attribution | Display: (845) 255-5722 / Dial: (845) 393-6770 (intentionally different) |

---

## 11. COMPONENTS

| Component | Purpose |
|-----------|---------|
| Header.astro | Navigation, mobile menu, phone, cart icon, Get Estimate CTA |
| Footer.astro | Business info, nav links, social (no map embed per user preference) |
| Hero.astro | Homepage hero with video (desktop) / poster (mobile) |
| PageHero.astro | Interior page hero with title, subtitle, breadcrumbs |
| CTASection.astro | Reusable bottom-of-page CTA block |
| ServiceCard.astro | Service listing cards for services index |
| AuthorByline.astro | Author info for E-E-A-T on content pages |
| EstimateForm.astro | Contact/estimate form |

---

## 12. DATA FILES

| File | Content |
|------|---------|
| site.ts | BUSINESS info, NAV_ITEMS, SERVICES array, CASE_STUDIES array, COUNTIES, GHL config |
| locations.ts | Location interface, COUNTIES_DATA with nested locations (~98 locations), getCountyBySlug/getLocationBySlug/getAllLocations helper functions |
| case-studies.ts | Case study data (11 studies) |
| media-manifest.json | Media asset references |

---

## 13. DEPENDENCIES

```json
{
  "@astrojs/node": "^8.3.4",
  "@astrojs/sitemap": "^3.2.0",
  "@astrojs/tailwind": "^5.1.0",
  "astro": "^4.16.0",
  "axios": "^1.13.5",
  "csv-writer": "^1.6.0",
  "sharp": "^0.33.0",
  "stripe": "^20.4.0",
  "tailwindcss": "^3.4.0"
}
```

---

## 14. ENVIRONMENT SECRETS

| Secret | Purpose |
|--------|---------|
| DATAFORSEO_LOGIN | DataForSEO API authentication |
| DATAFORSEO_PASSWORD | DataForSEO API authentication |
| STRIPE_SECRET_KEY | Stripe payment integration (future) |

---

## 15. FILE STRUCTURE

```
src/
├── components/     (8 components)
├── data/           (site.ts, locations.ts, case-studies.ts, media-manifest.json)
├── layouts/        (BaseLayout.astro)
├── styles/         (global.css — Tailwind directives + custom styles)
├── pages/
│   ├── services/           (9 service pages + index)
│   ├── service-areas/
│   │   ├── index.astro
│   │   └── [county]/
│   │       ├── index.astro  (3 county hubs)
│   │       └── [location].astro (generates ~93 town pages)
│   ├── case-studies/       (index + [slug] for 11 studies)
│   ├── resources/          (7 resource pages incl. index)
│   ├── direct-mail-tools/  (5 tool pages)
│   ├── api/                (latest-posts.json.ts, create-payment-intent.ts)
│   ├── [...slug].astro     (catch-all redirect handler)
│   └── sitemap.xml.ts      (sitemap generator)
public/
├── images/         (13 brand assets + wp/ migrated WordPress images)
├── videos/         (hero-video.mp4 + 9 training videos)
├── training/       (standalone HTML training portal)
├── sitemap-*.xml   (143 URLs)
├── robots.txt
├── favicon.ico / favicon.svg
```

---

## 16. KNOWN DECISIONS / INTENTIONAL CHOICES

1. **Display vs tracking phone numbers are intentionally different** — GHL call tracking
2. **No AggregateRating sitewide** — only on BBB page with real reviews
3. **No map embed in footer** — user preference
4. **Shopping cart icon in header** — links to order/estimate page
5. **White bird on blue circular favicon** — inverted from logo colors
6. **Dancing Script font** — used for Sean Griffin's signature element
7. **Blog on separate subdomain** (blog.crst.net) — WordPress, fetched via API
8. **Training portal is standalone HTML** — not part of Astro build, noindex/nofollow
9. **Hero video desktop-only** — bandwidth optimization for mobile users

---

## 17. PRODUCTION VERIFICATION (March 5, 2026)

### Schema Clean
- AggregateRating: ONLY on BBB page ✓
- All other pages: clean ✓

### API Endpoint Live
- /api/latest-posts.json: 200 OK ✓
- Content-Type: application/json ✓
- Cache-Control: public, max-age=0, s-maxage=600 ✓
- Returns ok:true with 6 posts ✓

### Homepage
- Prerendered/static ✓
- Client-side fetch to /api/latest-posts.json ✓
- Renders 3 posts with skeleton fallback ✓

### Canonicals
- All canonicals without trailing slashes ✓
- Matches trailingSlash: 'never' config ✓
