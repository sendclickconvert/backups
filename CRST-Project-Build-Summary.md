# Cornerstone Services (CRST) Website — Complete Build Summary

**Project:** crst.net  
**Client:** Cornerstone Services, Inc.  
**Owner:** Sean Griffin  
**Location:** New Paltz, NY  
**Industry:** Direct Mail, Printing & Data Services  
**Platform:** Astro 4.16 + Tailwind CSS, deployed on Replit  

---

## 1. Site Architecture & Technology

### Tech Stack
- **Framework:** Astro 4.16 (hybrid output mode — static prerendering + server-side rendering)
- **Adapter:** @astrojs/node for Replit autoscale deployment
- **Styling:** Tailwind CSS with custom brand color configuration
- **Typography:** Google Fonts; Dancing Script for Sean Griffin's signature element
- **Favicon:** Custom white bird on blue circle (inverted from logo colors)

### Rendering Strategy
- Most pages are prerendered as static HTML at build time for fast load
- Server-rendered routes handle dynamic content (blog API, redirects)
- Catch-all `[...slug].astro` handles 130+ redirects server-side

### Component Architecture
- **BaseLayout.astro** — Global layout with meta tags, schema, scripts, header/footer
- **Header.astro** — Sticky header with top bar, desktop nav dropdowns, mobile hamburger menu
- **Footer.astro** — Clean footer (no map embed per client preference)
- **PageHero.astro** — Reusable hero banner for interior pages
- **CTASection.astro** — Reusable call-to-action block
- **ServiceCard.astro** — Card component for service listings
- **AuthorByline.astro** — Reusable author credit with Sean Griffin's headshot
- **EstimateForm.astro** — Estimate request form

---

## 2. Pages Built

### Homepage (`index.astro`)
- H1: "Direct Mail & Printing Services in New Paltz, NY"
- Hero section with desktop video (conditionally loaded, 768px+) and mobile Vimeo poster
- "Serving the Hudson Valley Since 1998" tagline
- "Who We Work With" section
- "Direct Mail, Printing, and Mailing Services" service overview
- Latest blog posts section (client-side fetch from WordPress API)
- LocalBusiness + Organization JSON-LD schema with AggregateRating (3 real reviews)

### 9 Service Pages (`/services/`)
1. **Direct Mail Campaigns** (`/services/direct-mail`)
2. **Data Lists** (`/services/data-lists`)
3. **Printing Services** (`/services/printing`)
4. **Mailing Services** (`/services/mailing`)
5. **Graphic Design** (`/services/graphic-design`)
6. **EDDM (Every Door Direct Mail)** (`/services/eddm`)
7. **Non-Profit Mailing** (`/services/non-profit-mailing`)
8. **Union Printing** (`/services/union-printing`)
9. **Web Design** (`/services/web-design`)

Each service page includes:
- CTR-optimized title tag (under 60 chars)
- Rewritten meta description (under 155 chars)
- Keyword-rich H1 and H2 headings
- Detailed service descriptions
- FAQ sections with visible accordions (details/summary)
- Service area links
- 3+ CTAs per page (hero sidebar + mid-page CTA band + bottom CTASection)
- Service schema + FAQPage schema + BreadcrumbList schema
- Internal links to resource pages for authority flow

### Services Index (`/services`)
- Overview page linking to all 9 service pages

### 93 Town Pages (`/service-areas/[county]/[location]`)
- **37 Ulster County** towns
- **27 Dutchess County** towns
- **29 Orange County** towns

Each town page includes:
- LocalBusiness schema (no AggregateRating)
- Google Map iframe
- Nearby area links
- Mid-page CTA
- County back link
- Geocoded coordinates (lat/lng)

**17 Unique Content Town Pages** (16 Dutchess + 1 Ulster):
- Unique metaTitle, metaDescription, H1, intro paragraph
- Local market profile
- EDDM strategy section
- Population notes
- Landmark context
- Town-specific FAQs (visible HTML + FAQPage schema)
- Related Services links
- Created to resolve Google Search Console duplicate canonical issues

### 3 County Hub Pages (`/service-areas/[county]`)
- **Ulster County** (`/service-areas/ulster-county`)
- **Dutchess County** (`/service-areas/dutchess-county`)
- **Orange County** (`/service-areas/orange-county`)

Each includes:
- Google Map embed (zoom level 11)
- Anchor city highlights
- Full alphabetical town listing with links
- Mid-page CTA
- CTR-optimized title and meta description

### Service Areas Index (`/service-areas`)
- Overview linking to all 3 county hubs

### 11 Case Studies (`/case-studies/[slug]`)
- Index page with clickable industry filter tags
- Individual case study pages with detailed content
- Dynamic routing via `[slug].astro`

### Resource & Tool Pages

**Direct Mail Tools (`/direct-mail-tools/`):**
1. **Postage Rates** (`/direct-mail-tools/postage-rates`) — Current USPS rate tables with author byline
2. **Envelope Sizes** (`/direct-mail-tools/envelope-sizes`) — 18-row reference table, #10 callout, USPS letter/flat size requirements, 10 FAQs, author byline
3. **Mailing Permits Guide** (`/direct-mail-tools/cornerstone-mailing-permits`)
4. **Postal Dictionary** (`/direct-mail-tools/postal-dictionary`) — Terms glossary with author byline
5. **Address Change/Forwarding** (`/direct-mail-tools/address-change`)

**Resources (`/resources/`):**
6. **EDDM Guide** (`/resources/eddm-guide`) — Comprehensive Every Door Direct Mail guide
7. **Mail Automation** (`/resources/mail-automation`) — Mail automation guide with internal links
8. **Informed Delivery Guide** (`/resources/informed-delivery-guide`) — Lead-gen page with GHL form gating 22-page PDF download, CSS document cover mockup, 5 contextual internal links, WebPage+BreadcrumbList schema
9. **Ancillary Service Endorsements** (`/resources/ancillary-service-endorsements`)
10. **Periodicals** (`/resources/periodicals`)
11. **Understanding Periodicals** (`/resources/understanding-periodicals`)
12. **Payments** (`/resources/payments`) — Payment processing page
13. **Non-Profit Mailing Application** (`/non-profit-mailing-application`)
14. **Resources Index** (`/resources`)

**Editorial/Educational Articles:**
15. **Direct Mail vs Email Marketing** (`/resources/direct-mail-vs-email-marketing`)
16. **Ship Potatoes Through USPS** (`/resources/ship-potatoes-through-usps`)
17. **Chicken Shipping 101** (`/resources/chicken-shipping-101`)
18. **Famous Postmasters** (`/resources/famous-postmasters-usps`)
19. **Point Roberts Post Office** (`/resources/point-roberts-post-office`)
20. **Friendraising Guide** (`/resources/complete-friendraising-guide`)
21. **Non-Profit Database Change Request** (`/resources/non-profit-database-change-request`)
22. **Lessons from Marketing Failure** (`/resources/lessons-from-marketing-failure`)
23. **Negative Yelp Review Response** (`/resources/how-to-respond-to-a-negative-yelp-review-a-true-story`)

All articles include Article + FAQPage + BreadcrumbList schema.

**USPS Templates Page** (`/usps-direct-mailer-templates`):
- 8 postcard templates (3.5x5 through 6x11)
- 3 EDDM flat card templates
- 6 brochure templates
- Clean card layout with template preview images
- PDF download buttons
- Author byline with Sean Griffin's photo

### Other Pages
- **About** (`/about`)
- **Contact** (`/contact`)
- **Estimate** (`/estimate`) — Estimate request form with GHL webhook
- **FAQ** (`/faq`)
- **BBB Trust Page** (`/crst-better-business-bureau-a-direct-mailer`) — BBB A+ rating with comprehensive schema (reviewCount: 3, real review data)
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)
- **Thank You** (`/thank-you`) — Post-form submission (excluded from sitemap)
- **Informed Delivery Review** (`/informed-delivery-review`)
- **Refund Guide** (`/how-to-get-a-refund-on-postage-a-guide-to-post-office-application-to-refund-postage`)

### Training Portal
- Standalone `noindex`/`nofollow` portal at `/training/portal/`
- Multi-module video lessons
- 9 training videos stored in `public/videos/`
- YouTube embeds
- Excluded from sitemap

### Blog Integration
- Homepage displays 3 latest posts via client-side fetch
- Server-rendered API endpoint at `/api/latest-posts.json`
- 10-minute in-memory cache
- 5-second AbortController timeout
- Posts sourced from `blog.crst.net` (WordPress)
- Skeleton loading placeholders with graceful fallback

---

## 3. SEO Implementation

### Title Tags & Meta Descriptions
- CTR-optimized titles (under 60 chars) on all 15 priority pages
- Meta descriptions rewritten (under 155 chars) for clarity and click appeal
- Priority pages: homepage, 9 service pages, postage rates, envelope sizes, EDDM guide, county hubs, BBB page

### Heading Optimization
- Descriptive, keyword-rich H1s and first H2s on all service pages + homepage
- Generic headings replaced with specific content-descriptive headings
- Examples: "Your Partner" → specific service descriptions; "The Foundation" → content-descriptive alternatives

### Schema Markup (JSON-LD)
- **Homepage:** Merged LocalBusiness + Organization schema with @id, address, geo coordinates, areaServed, foundingDate, logo, hasOfferCatalog (8 services), aggregateRating (reviewCount: 3), 3 real reviews, sameAs (BBB profile)
- **Default (all pages):** WebPage schema with Organization publisher (rendered by BaseLayout)
- **Service pages:** Service schema + FAQPage schema + BreadcrumbList
- **Town pages:** LocalBusiness schema (no AggregateRating) + BreadcrumbList
- **Articles:** Article + FAQPage + BreadcrumbList
- **BBB page:** Standalone schema with reviewCount: 3 and real review data
- **AggregateRating:** Only on homepage and BBB page (reviewCount: 0 is invalid per Google)

### Canonicalization
- `trailingSlash: 'never'` enforced in astro.config.mjs
- All internal hrefs, schema URLs, breadcrumbs, nav items, and sitemap use no-trailing-slash format
- Canonical tags auto-generated from Astro.url.pathname
- 6 pages pass explicit canonical props

### Sitemap
- Unified single system via @astrojs/sitemap
- 151 URLs in sitemap-0.xml
- Filtered to exclude /thank-you and /training pages
- robots.txt references `https://crst.net/sitemap-index.xml`

### Internal Linking Strategy
- Resource/tool pages link contextually to relevant service pages
- Service pages link to related resources
- County hubs link to all town pages
- Town pages link to county hub and nearby towns
- Cross-linking between service area pages and service pages

### E-E-A-T (Expertise, Authoritativeness, Trustworthiness)
- Author bylines with Sean Griffin's photo on key content pages
- Detailed, expert-level content on direct mail topics
- BBB A+ rating and credentials page
- Real customer reviews in schema
- "Since 1998" messaging throughout

---

## 4. Redirects

### Dual Redirect System
- **Config-level:** 99 redirects in `astro.config.mjs` (301 permanent)
- **Dynamic catch-all:** `[...slug].astro` handles 130+ exact redirects + 8 pattern-based wildcard rules
- All redirect targets verified to resolve to live 200 pages
- Migrated from previous WordPress site URL structure

### Redirect Audit Tool
- `redirect-chain-check-v2.cjs` + `redirect-map.csv` in project root
- Run `node redirect-chain-check-v2.cjs` to produce `redirect-chain-report.csv`
- BASE_DOMAIN set to `crst.net`

---

## 5. Performance Optimizations

- **Hero video:** Conditionally loaded only on desktop (768px+) via JS matchMedia to avoid 4.1MB download on mobile
- **Mobile hero:** Vimeo CDN thumbnail poster (640x360) with dark overlay + play button SVG
- **Logo:** Served as WebP (16KB vs 180KB PNG original)
- **GHL chat widget:** Deferred 3 seconds via setTimeout to avoid blocking initial render
- **Static prerendering:** Most pages built as static HTML at build time
- **Blog API caching:** 10-minute in-memory cache on server-rendered endpoint

---

## 6. Integrations & Tracking

### GoHighLevel (GHL)
- Call tracking scripts (`number_pool.js`, `user_session.js`) for phone attribution
- Chat widget (deferred loading)
- Webhook endpoints:
  - Estimate form: `06294598-cdaf-4748-af4b-bbb89412e973`
  - Informed Delivery form: `2339ccae-2d7c-4408-9869-a062e61bab8d`
  - Payment form: `2d374217-8302-4e79-95c9-4786777a4a29`

### Google Analytics
- GA4 ID: `G-HRBG2H3FE7`

### Phone Numbers
- Display: `(845) 255-5722`
- Tracking/dial (GHL): `(845) 393-6770`

### Stripe
- STRIPE_SECRET_KEY configured in Replit secrets (for payment processing)

### DataForSEO
- DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD configured in Replit secrets

---

## 7. UI/UX Features

### Header
- Sticky header with backdrop blur
- Top bar with phone, email, location
- Desktop nav with hover dropdowns for Services, Service Areas, Resources
- Shopping cart icon linking to payments/order page
- "Get Estimate" CTA button
- Mobile hamburger menu with collapsible sub-menus (tap to expand/collapse)
- Mobile menu scrollable (max 80vh with overflow)

### Mobile Navigation
- Hamburger toggle with open/close icon swap
- All top-level nav items visible immediately
- Collapsible sections for Services (9 items), Service Areas (3 counties), Resources (8 items)
- "All [Section]" links at top of each collapsible group
- "Get Free Estimate" button and contact links at bottom
- Scrollable container to prevent content overflow

### Footer
- Clean layout without map embed
- Contact information and navigation links

### CTAs
- 3+ CTAs per service page (hero sidebar, mid-page band, bottom section)
- Mid-page CTAs on county and town pages
- "Get Free Estimate" buttons throughout
- Phone call CTAs with tracking number

---

## 8. Content & Data Management

### Data Files
- **site.ts** — Business info, contact details, phone numbers, rating data, NAV_ITEMS
- **locations.ts** — 93+ locations with geocoded coordinates, county groupings
- **case-studies.ts** — 11 case study entries with industry tags
- **town-unique-content.ts** — Unique SEO content for 17 flagged town pages

### Content Corrections
- Owner name corrected: Sean **Griffin** (not Griffen) across 11 files
- Author byline photos updated from SVG icon to real headshot (`sean-griffin.png`)

---

## 9. File Structure

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── PageHero.astro
│   ├── CTASection.astro
│   ├── ServiceCard.astro
│   ├── AuthorByline.astro
│   └── EstimateForm.astro
├── data/
│   ├── site.ts
│   ├── locations.ts
│   ├── case-studies.ts
│   ├── town-unique-content.ts
│   └── media-manifest.json
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro (homepage)
│   ├── about.astro
│   ├── contact.astro
│   ├── estimate.astro
│   ├── faq.astro
│   ├── privacy.astro
│   ├── terms.astro
│   ├── thank-you.astro
│   ├── usps-direct-mailer-templates.astro
│   ├── non-profit-mailing-application.astro
│   ├── informed-delivery-review.astro
│   ├── crst-better-business-bureau-a-direct-mailer.astro
│   ├── [...slug].astro (catch-all redirects)
│   ├── services/
│   │   ├── index.astro
│   │   ├── direct-mail.astro
│   │   ├── data-lists.astro
│   │   ├── printing.astro
│   │   ├── mailing.astro
│   │   ├── graphic-design.astro
│   │   ├── eddm.astro
│   │   ├── non-profit-mailing.astro
│   │   ├── union-printing.astro
│   │   └── web-design.astro
│   ├── service-areas/
│   │   ├── index.astro
│   │   └── [county]/
│   │       ├── index.astro (3 county hubs)
│   │       └── [location].astro (93 town pages)
│   ├── case-studies/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── resources/
│   │   ├── index.astro
│   │   ├── payments.astro
│   │   ├── eddm-guide.astro
│   │   ├── mail-automation.astro
│   │   ├── informed-delivery-guide.astro
│   │   ├── ancillary-service-endorsements.astro
│   │   ├── periodicals.astro
│   │   ├── understanding-periodicals.astro
│   │   ├── direct-mail-vs-email-marketing.astro
│   │   ├── ship-potatoes-through-usps.astro
│   │   ├── chicken-shipping-101.astro
│   │   ├── famous-postmasters-usps.astro
│   │   ├── point-roberts-post-office.astro
│   │   ├── complete-friendraising-guide.astro
│   │   ├── non-profit-database-change-request.astro
│   │   ├── lessons-from-marketing-failure.astro
│   │   └── how-to-respond-to-a-negative-yelp-review-a-true-story.astro
│   ├── direct-mail-tools/
│   │   ├── postage-rates.astro
│   │   ├── envelope-sizes.astro
│   │   ├── cornerstone-mailing-permits.astro
│   │   ├── postal-dictionary.astro
│   │   └── address-change.astro
│   └── api/
│       └── latest-posts.json.ts
public/
├── images/
│   ├── crst-logo.webp
│   ├── sean-griffin.png
│   ├── templates/ (extracted template files)
│   └── wp/ (migrated WordPress images)
├── videos/
│   ├── hero-video.mp4
│   └── (9 training videos)
├── training/ (standalone HTML portal)
├── robots.txt
└── (sitemap generated at build)
```

---

## 10. Total Page Count

| Section | Count |
|---------|-------|
| Homepage | 1 |
| Service pages | 10 (9 + index) |
| Service area pages | 98 (93 towns + 3 county hubs + index + main index) |
| Case studies | 12 (11 + index) |
| Resource/tool pages | 23 |
| USPS Templates | 1 |
| Other pages (about, contact, estimate, FAQ, BBB, privacy, terms, thank-you, etc.) | 8 |
| Training portal | 1 |
| API endpoint | 1 |
| Catch-all redirect handler | 1 |
| **Total** | **~156 routes** |
| **Sitemap URLs** | **151** (excludes thank-you, training) |

---

*Document generated March 28, 2026*
