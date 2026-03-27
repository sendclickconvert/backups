# Cornerstone Services (CRST) Website

## Overview
This project is a full-service website for Cornerstone Services, Inc., a direct mail, printing, and data services company. The website aims to serve as a comprehensive online presence, showcasing their services, providing resources, and improving customer engagement. It targets businesses in Ulster, Dutchess, and Orange Counties, enhancing their digital footprint and market reach. Key capabilities include detailed service descriptions, location-specific content, case studies, and a robust resource section for direct mail tools and information.

## User Preferences
- Clean footer layout without map embed
- Shopping cart icon in header for order page access
- White bird on blue circular favicon (inverted from logo colors)

## System Architecture
The website is built with Astro 4.16 in a hybrid output mode, utilizing `@astrojs/node` adapter for deployment on Replit autoscale. Styling is managed with Tailwind CSS.

### UI/UX Decisions
- **Color Scheme**: Uses the brand's established colors.
- **Typography**: Employs Google Fonts for a consistent and professional look. Dancing Script font is used for specific elements like Sean Griffin's signature.
- **Design Patterns**: Incorporates components for reusability (e.g., `Header`, `Footer`, `PageHero`, `CTASection`).
- **Layouts**: A `BaseLayout.astro` defines the fundamental structure for all pages.
- **Accessibility**: Includes breadcrumb navigation for improved user experience and SEO.

### Technical Implementations
- **Dynamic Content**: Uses data files (`site.ts`, `case-studies.ts`, `locations.ts`) to manage content dynamically.
- **Location-Based Content**: Features dedicated pages for services and service areas, including county and town-specific content with geocoded coordinates (lat/lng on all 93+ locations). 17 flagged town pages (16 Dutchess + 1 Ulster) have unique content via `src/data/town-unique-content.ts` — unique metaTitle, metaDescription, H1, intro, local market profile, EDDM strategy, population notes, landmark context, town-specific FAQs (visible HTML + FAQPage schema), and Related Services links. Remaining ~78 towns use generic template content.
- **SEO Optimization**: Implements JSON-LD schema (LocalBusiness/ProfessionalService, Service, FAQPage, Organization, Person, Review, WebPage, BreadcrumbList) for enhanced search engine visibility. AggregateRating is ONLY on the BBB page (`crst-better-business-bureau-a-direct-mailer.astro`) with reviewCount: 3 and real review data — removed sitewide elsewhere because reviewCount: 0 is invalid per Google's structured data requirements. E-E-A-T (Expertise, Authoritativeness, Trustworthiness) principles are applied through author bylines and detailed content.
- **Redirects**: Comprehensive 301 redirects handled via dual system: `astro.config.mjs` (99 config-level redirects) + dynamic catch-all `[...slug].astro` (130+ exact redirects + 8 pattern-based wildcard rules). All redirect targets verified to resolve to live 200 pages. Redirect chain audit tool (`redirect-chain-check-v2.cjs`) installed in project root.
- **Trailing Slash / Canonicalization**: `trailingSlash: 'never'` enforced in astro.config.mjs. ALL internal `href` links, schema `url` fields, breadcrumb `href` values, NAV_ITEMS hrefs, and sitemap URLs use the no-trailing-slash format. Canonical tags are auto-generated from `Astro.url.pathname` in BaseLayout (6 pages pass explicit `canonical` props). NEVER add trailing slashes to internal links — Astro will 301-redirect them, wasting a round-trip and diluting link equity.
- **Hybrid Rendering**: Prerenders most pages as static HTML while server-rendering dynamic content and redirects via catch-all.
- **Internal Linking**: Strategically placed internal links across service pages, county hubs, town pages, and resource/tool pages to improve site navigation and SEO equity. Resource pages (USPS templates, envelope sizes, postage rates, EDDM guide, mail automation, periodicals, etc.) link contextually to relevant service pages for authority flow.
- **Call Tracking**: Integrates GHL call tracking scripts (`number_pool.js`, `user_session.js`) for phone number attribution. GA4 ID: `G-HRBG2H3FE7`.
- **Performance Optimizations**: Hero video conditionally loaded only on desktop (768px+) via JS matchMedia to avoid 4.1MB download on mobile; mobile shows Vimeo thumbnail poster (vimeocdn.com 640x360) with dark overlay + play button SVG; logo served as WebP (16KB vs 180KB PNG); GHL chat widget deferred 3 seconds via setTimeout to avoid blocking initial page render.
- **Training Portal**: Standalone `noindex`/`nofollow` training portal (`/training/portal/`) with multi-module video lessons (9 training videos in public/videos/).

### Feature Specifications
- **Services Pages**: Nine dedicated service pages with detailed descriptions, FAQs, service area links, and 3+ CTAs per page (hero sidebar + mid-page CTA band + bottom CTASection).
- **Service Areas**: Covers three counties (Ulster, Dutchess, Orange) with 93 town-specific pages (37 Ulster + 27 Dutchess + 29 Orange), including local business schema (no AggregateRating), nearby area links, Google Map iframes, mid-page CTAs, and county back links. 17 pages have unique SEO-differentiated content (unique H1, meta, intro, local context, EDDM strategy, visible FAQs, Related Services) to resolve GSC duplicate canonical issues.
- **County Hub Pages**: 3 county index pages with Google Map embeds (zoom 11), anchor city highlights, full town listing with links, and mid-page CTAs.
- **Resources/Tools**: A section for direct mail tools and resources, including guides on postage rates, mailing permits, postal dictionaries, envelope sizes (restructured with 18-row reference table leading, #10 callout, USPS letter/flat size requirements, 10 FAQs), address change/forwarding, USPS templates, EDDM guide, mail automation, ancillary service endorsements, periodicals, payments page, Informed Delivery guide (lead-gen page with GHL form gating 22-page PDF download, CSS document cover mockup, 5 contextual internal links, WebPage+BreadcrumbList schema), and 8 editorial/educational articles (direct mail vs email marketing, ship potatoes through USPS, chicken shipping 101, famous postmasters, Point Roberts post office, friendraising guide, nonprofit database change request, lessons from marketing failure) with Article+FAQPage+BreadcrumbList schema.
- **Case Studies**: 11 case studies with clickable industry filter tags.
- **BBB Trust Page**: A dedicated page showcasing BBB A+ rating with comprehensive schema (reviewCount: 3 with real reviews) and trust-building content.
- **Author Byline**: Reusable component for author information on key content pages.
- **Redirect Chain Audit Tool**: `redirect-chain-check-v2.cjs` + `redirect-map.csv` in project root. Run `node redirect-chain-check-v2.cjs` to produce `redirect-chain-report.csv`. BASE_DOMAIN set to `crst.net`.
- **Sitemap**: Unified single system — `@astrojs/sitemap` is the only generator (removed duplicate `src/pages/sitemap.xml.ts` and stale `public/sitemap-*.xml` files). 151 URLs in sitemap-0.xml, filtered to exclude /thank-you and /training pages. `robots.txt` has single sitemap reference: `Sitemap: https://crst.net/sitemap-index.xml`. `/sitemap.xml` intentionally 404s.

### Key Phone Numbers
- **Display phone**: `(845) 255-5722` (BUSINESS.phone)
- **Tracking/dial phone**: `(845) 393-6770` (BUSINESS.trackingPhone / phoneClean: `8453936770`) — GHL call tracking number, intentionally different from display

### Schema Configuration
- **Homepage LocalBusiness**: `index.astro` passes a merged `["LocalBusiness", "Organization"]` JSON-LD schema via the `schema` prop to BaseLayout. This is the ONLY page with `@type: LocalBusiness` as its primary schema. Includes `@id: https://crst.net/#organization`, address, geo (41.7476, -74.0871), areaServed (AdministrativeArea), foundingDate, logo (crst-logo.webp), hasOfferCatalog (8 services with URLs), aggregateRating (reviewCount: 3), and 3 real reviews (McTigue, Yaston, Moudgil-Shah). No sameAs array (BBB URL TBD).
- **Default Schema**: `BaseLayout.astro` renders a `WebPage` schema (with `Organization` publisher) as the default for all pages that don't pass their own `schema` prop. This replaced the previous sitewide `ProfessionalService` to avoid competing LocalBusiness signals.
- **Service/Location Pages**: Inject their own page-specific schemas (Service, LocalBusiness for locations, FAQPage, BreadcrumbList) via `<Fragment slot="head">` — these render IN ADDITION to the default WebPage schema.
- **AggregateRating**: On the homepage (`index.astro`) LocalBusiness schema with `reviewCount: '3'` and 3 real reviews, AND on the BBB page (`crst-better-business-bureau-a-direct-mailer.astro`) with its own `reviewCount: '3'` and real review data. NOT on BaseLayout, not on service pages, not on county/town pages. `reviewCount: 0` is invalid per Google's structured data requirements.
- **BUSINESS.rating** in `site.ts`: `ratingValue: '5.0'`, `reviewCount: '0'`, `bestRating: '5'`, `worstRating: '1'` — data definition retained but NOT rendered in any schema except BBB page.

### SEO Optimization (March 2026)
- **Title Tags**: CTR-optimized titles (under 60 chars) on all 15 priority pages — homepage, 9 service pages, postage rates, envelope sizes, EDDM guide, county hubs, and BBB page
- **Meta Descriptions**: Rewritten (under 155 chars) for clarity, usefulness, and click appeal on all priority pages
- **H1/H2 Rewrites**: Descriptive, keyword-rich H1s and first H2s on all service pages + homepage. Generic headings ("Your Partner", "The Foundation") replaced with specific content-descriptive headings.
- **Homepage**: New H1 "Direct Mail & Printing Services in New Paltz, NY", added "Who We Work With" section, updated "Full-Service Direct Mail" → "Direct Mail, Printing, and Mailing Services", "Serving the Hudson Valley" → "Serving the Hudson Valley Since 1998"
- **Owner Name**: Sean **Griffin** (not Griffen) — corrected across all author bylines and page content (11 files)
- **Internal Linking**: Resource/tool pages contextually link to relevant service pages for authority flow
- **Mid-Page CTAs**: All 9 service pages have 3+ CTAs (sidebar, mid-page band, bottom CTASection)

### Blog Integration
- **Latest Articles**: Homepage displays 3 latest blog posts via client-side fetch from `/api/latest-posts.json` (server-rendered endpoint with 10-min in-memory cache, 5-second AbortController timeout). Posts sourced from `blog.crst.net/wp-json/wp/v2/posts`. Homepage remains prerendered/static. Skeleton loading placeholders with graceful fallback if API is unavailable.

## External Dependencies
- **Google Fonts**: For typography.
- **GoHighLevel (GHL)**: For call tracking, attribution, and chat widget.
- **USPS (United States Postal Service)**: Referenced for direct mail regulations (DMM citations), forms (PS Form 3500, PS Form 3533), and services like Informed Delivery.
- **WordPress**: Historical content migration and redirect management from a previous WordPress site.
- **BBB (Better Business Bureau)**: Integration of BBB A+ rating and credentials.
- **YouTube**: For embedding training videos in the internal portal.
- **Vimeo**: CDN used for mobile hero poster thumbnail.
- **Stripe**: STRIPE_SECRET_KEY in Replit secrets (for future payment integration).
- **DataForSEO**: DATAFORSEO_LOGIN/PASSWORD in Replit secrets (for keyword research).

## File Structure
```
src/
├── components/     (8 components: Header, Footer, Hero, PageHero, CTASection, ServiceCard, AuthorByline, EstimateForm)
├── data/           (site.ts, locations.ts, case-studies.ts, town-unique-content.ts, media-manifest.json)
├── layouts/        (BaseLayout.astro — global schema, meta, scripts)
├── pages/
│   ├── services/   (9 service pages + index)
│   ├── service-areas/
│   │   ├── index.astro
│   │   └── [county]/
│   │       ├── index.astro (3 county hubs)
│   │       └── [location].astro (93 town pages)
│   ├── case-studies/ (index + [slug] for 11 studies)
│   ├── resources/  (6 resource pages + index)
│   ├── direct-mail-tools/ (5 tool pages)
│   ├── api/            (latest-posts.json.ts — server-rendered blog endpoint)
│   └── [...slug].astro (catch-all redirect handler)
public/
├── images/         (brand assets + wp/ migrated WordPress images)
├── videos/         (hero-video.mp4 + 9 training videos)
├── training/       (standalone HTML training portal)
├── sitemap-*.xml   (134 URLs)
└── robots.txt
```
