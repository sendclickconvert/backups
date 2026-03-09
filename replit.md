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
- **Location-Based Content**: Features dedicated pages for services and service areas, including county and town-specific content with geocoded coordinates (lat/lng on all 93+ locations).
- **SEO Optimization**: Implements JSON-LD schema (LocalBusiness/ProfessionalService, Service, FAQPage, Organization, Person, Review, WebPage, BreadcrumbList) for enhanced search engine visibility. AggregateRating is ONLY on the BBB page (`crst-better-business-bureau-a-direct-mailer.astro`) with reviewCount: 3 and real review data — removed sitewide elsewhere because reviewCount: 0 is invalid per Google's structured data requirements. E-E-A-T (Expertise, Authoritativeness, Trustworthiness) principles are applied through author bylines and detailed content.
- **Redirects**: Comprehensive 301 redirects handled via dual system: `astro.config.mjs` (99 config-level redirects) + dynamic catch-all `[...slug].astro` (130+ exact redirects + 8 pattern-based wildcard rules). All redirect targets verified to resolve to live 200 pages. Redirect chain audit tool (`redirect-chain-check-v2.cjs`) installed in project root.
- **Trailing Slash**: `trailingSlash: 'never'` enforced in astro.config.mjs; all sitemap URLs generated without trailing slashes.
- **Hybrid Rendering**: Prerenders most pages as static HTML while server-rendering dynamic content and redirects via catch-all.
- **Internal Linking**: Strategically placed internal links across service pages, county hubs, town pages, and resource/tool pages to improve site navigation and SEO equity. Resource pages (USPS templates, envelope sizes, postage rates, EDDM guide, mail automation, periodicals, etc.) link contextually to relevant service pages for authority flow.
- **Call Tracking**: Integrates GHL call tracking scripts (`number_pool.js`, `user_session.js`) for phone number attribution. GA4 ID: `G-HRBG2H3FE7`. GA4 `phone_call_click` event fires on all `tel:` link clicks sitewide (inline script in BaseLayout, sends phone_number, link_url, page_location).
- **Performance Optimizations**: Hero video conditionally loaded only on desktop (768px+) via JS matchMedia to avoid 4.1MB download on mobile; mobile shows Vimeo thumbnail poster (vimeocdn.com 640x360) with dark overlay + play button SVG; logo served as WebP (16KB vs 180KB PNG); GHL chat widget deferred 3 seconds via setTimeout to avoid blocking initial page render.
- **Training Portal**: Standalone `noindex`/`nofollow` training portal (`/training/portal/`) with multi-module video lessons (9 training videos in public/videos/).

### Feature Specifications
- **Services Pages**: Nine dedicated service pages with detailed descriptions, FAQs, service area links, and 3+ CTAs per page (hero sidebar + mid-page CTA band + bottom CTASection).
- **Service Areas**: Covers three counties (Ulster, Dutchess, Orange) with 93 town-specific pages (37 Ulster + 27 Dutchess + 29 Orange), including local business schema (no AggregateRating), nearby area links, Google Map iframes, mid-page CTAs, and county back links.
- **County Hub Pages**: 3 county index pages with Google Map embeds (zoom 11), anchor city highlights, full town listing with links, and mid-page CTAs.
- **Resources/Tools**: A section for direct mail tools and resources, including guides on postage rates, mailing permits, postal dictionaries, envelope sizes, address change/forwarding, USPS templates, EDDM guide, mail automation, ancillary service endorsements, periodicals, and a payments page.
- **Case Studies**: 11 case studies with clickable industry filter tags.
- **BBB Trust Page**: A dedicated page showcasing BBB A+ rating with comprehensive schema (reviewCount: 3 with real reviews) and trust-building content.
- **Author Byline**: Reusable component for author information on key content pages.
- **Redirect Chain Audit Tool**: `redirect-chain-check-v2.cjs` + `redirect-map.csv` in project root. Run `node redirect-chain-check-v2.cjs` to produce `redirect-chain-report.csv`. BASE_DOMAIN set to `crst.net`.
- **Sitemap**: Unified single system — `@astrojs/sitemap` is the only generator (removed duplicate `src/pages/sitemap.xml.ts` and stale `public/sitemap-*.xml` files). 143 URLs in sitemap-0.xml, filtered to exclude /thank-you and /training pages. `robots.txt` has single sitemap reference: `Sitemap: https://crst.net/sitemap-index.xml`. `/sitemap.xml` intentionally 404s.

### Key Phone Numbers
- **Display phone**: `(845) 255-5722` (BUSINESS.phone)
- **Tracking/dial phone**: `(845) 393-6770` (BUSINESS.trackingPhone / phoneClean: `8453936770`) — GHL call tracking number, intentionally different from display

### Schema Configuration
- **AggregateRating**: ONLY on the BBB page (`crst-better-business-bureau-a-direct-mailer.astro`) with `reviewCount: '3'` and real review data. NOT on any other page — not BaseLayout, not service pages, not county/town pages. `reviewCount: 0` is invalid per Google's structured data requirements.
- **BUSINESS.rating** in `site.ts`: `ratingValue: '5.0'`, `reviewCount: '0'`, `bestRating: '5'`, `worstRating: '1'` — data definition retained but NOT rendered in any schema except BBB page.

### SEO Optimization (March 2026)
- **Title Tags**: CTR-optimized titles on all service pages, tool pages, and resource pages with keyword-rich, natural language
- **Meta Descriptions**: Rewritten for clarity, usefulness, and click appeal on high-priority pages
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
├── data/           (site.ts, locations.ts, case-studies.ts, media-manifest.json)
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
