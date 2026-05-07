# Project Context for Agent

## Business
- **Name:** Cornerstone Services, Inc. (CRST)
- **Location:** New Paltz, NY — serves Ulster, Dutchess, Orange counties (Hudson Valley)
- **Since:** 1998
- **Services:** Full-service direct mail, printing, EDDM, data lists, graphic design, mail prep, fulfillment
- **Audience:** Businesses, nonprofits, political orgs, municipalities, real estate
- **Trust signals:** USPS-certified direct mail partner, BBB A+, 98% on-time, serves 47 municipalities

## Site
- **Stack:** Astro on Replit
- **Domain:** crst.net
- **Existing structure:**
  - Top nav: Services, Service Areas, Resources, Case Studies, Blog, About, Contact
  - Envelope sizes hub: /guides/envelope-sizes
  - 12 spokes: /guides/envelope-sizes/{no-10, no-9, a6, a7, a9, a10, 6x9, 9x12, legal, window, usps-minimum-maximum, business-envelope-types}
  - PS Form pages exist (3533, 3624) — performing well in GSC

## SEO Priorities (90-day GSC data)
- 118K impressions, 232 clicks, 0.20% sitewide CTR
- Envelope cluster: 49K impressions, 0.12% CTR — pillar exists, needs optimization
- EDDM cluster: 8.6K impressions, **0 clicks** — broken
- Year-pinned rate queries (2026): 13K impressions, 7 clicks — outdated/missing pages
- Forms cluster: 2.48% CTR — model to replicate

## Build Conventions
- Don't break existing routes or change URL slugs without flagging it
- Always preview changes before deploy
- Preserve existing component structure unless asked to refactor
- All meta titles ≤ 60 chars, meta descriptions ≤ 155 chars
- Use schema.org: Article + FAQPage where applicable, BreadcrumbList on all guide pages
- Show "Last updated [Month YYYY]" on time-sensitive pages with itemprop="dateModified"
- When editing any envelope spoke's body content, bump that spoke's `lastUpdated` field in `src/data/envelope-spokes.ts` as part of the same change (ISO format yyyy-mm-dd). Hub `lastUpdated` lives in `src/pages/guides/envelope-sizes/index.astro` as `const lastUpdated`.

---

# Cornerstone Services (CRST) Website

## Overview
This project is a full-service website for Cornerstone Services, Inc., specializing in direct mail, printing, and data services. Its primary goal is to establish a comprehensive online presence, detailing services, offering resources, and boosting customer engagement. The website targets businesses in Ulster, Dutchess, and Orange Counties, aiming to enhance their digital footprint and market reach. Key capabilities include detailed service descriptions, location-specific content, case studies, and a robust resource section for direct mail tools and information. The project seeks to improve Cornerstone Services' online visibility and provide valuable information to its target audience.

## User Preferences
- Clean footer layout without map embed
- Shopping cart icon in header for order page access
- White bird on blue circular favicon (inverted from logo colors)

## System Architecture
The website is developed using Astro 4.16 in a hybrid output mode, leveraging the `@astrojs/node` adapter for deployment on Replit autoscale. Tailwind CSS is used for styling. React (`@astrojs/react`) is integrated for interactive calculator components.

### UI/UX Decisions
- **Color Scheme**: Adheres to the brand's established color palette.
- **Typography**: Uses Google Fonts for a consistent and professional aesthetic, with Dancing Script for specific decorative elements.
- **Design Patterns**: Employs reusable components (e.g., `Header`, `Footer`, `PageHero`, `CTASection`).
- **Layouts**: `BaseLayout.astro` provides a consistent structural foundation for all pages.
- **Accessibility**: Includes breadcrumb navigation for improved user experience and SEO.

### Technical Implementations
- **Dynamic Content**: Content is managed dynamically using data files such as `site.ts`, `case-studies.ts`, and `locations.ts`.
- **Location-Based Content**: Features dedicated pages for services and service areas, including county and town-specific content with geocoded coordinates. Unique content is provided for 17 flagged town pages via `src/data/town-unique-content.ts`.
- **SEO Optimization**: Incorporates extensive JSON-LD schema (LocalBusiness/ProfessionalService, Service, FAQPage, Organization, Person, Review, WebPage, BreadcrumbList) for enhanced search engine visibility. E-E-A-T principles are applied through author bylines and detailed content. AggregateRating is specifically implemented on the homepage and BBB page.
- **Redirects**: Manages 301 redirects through a dual system: `astro.config.mjs` for config-level redirects and a dynamic catch-all `[...slug].astro` for exact and pattern-based redirects.
- **Trailing Slash / Canonicalization**: Enforces `trailingSlash: 'never'` and ensures all internal links, schema URLs, and sitemap entries follow this format. Canonical tags are auto-generated.
- **Hybrid Rendering**: Prerenders most pages as static HTML while server-rendering dynamic content and redirects.
- **Internal Linking**: Strategically placed internal links across service, county, town, and resource pages to improve navigation and SEO equity.
- **Call Tracking**: Integrates GoHighLevel (GHL) call tracking scripts.
- **Performance Optimizations**: Implements conditional loading of hero video, optimized image formats (WebP), and deferred loading of the GHL chat widget.
- **Training Portal**: A `noindex`/`nofollow` training portal (`/training/portal/`) hosts multi-module video lessons.
- **Blog Integration**: The homepage displays the three latest blog posts via a client-side fetch from a server-rendered endpoint (`/api/latest-posts.json`), with caching and fallback mechanisms.

### Feature Specifications
- **Services Pages**: Nine dedicated service pages with detailed descriptions, FAQs, service area links, and multiple CTAs.
- **Service Areas**: Covers Ulster, Dutchess, and Orange counties with 93 town-specific pages, including local business schema and relevant local information.
- **County Hub Pages**: Three county index pages featuring Google Map embeds, anchor city highlights, and full town listings.
- **Resources/Tools**: A section providing direct mail tools and resources, including guides on postage rates, envelope sizes, EDDM, and various editorial articles.
- **Landing Pages**: Two SEO-focused landing pages (`/full-service-direct-mail-company-hudson-valley` and `/why-crst-for-direct-mail-in-the-hudson-valley`) with author bylines and service area links.
- **Specialized Service Pages**: Dedicated pages for "School District Direct Mail" and "Union Printing," incorporating specific strategies, E-E-A-T author blocks, and relevant schema.
- **Memberships Page**: `/about/memberships` — Association and chamber memberships page with custom WebPage schema (passed as prop to avoid duplicate with BaseLayout default). BBB A+ section with accredited logo, 7 Hudson Valley chambers, 3 national/industry associations (MSMA, BBB, GHV PCC), 10 extended regional memberships, SUNY New Paltz affiliations.
- **Service × Location Pages**: Dynamic route at `src/pages/services/[service]/[town].astro` generating pages like `/services/eddm/new-paltz`. Uses `src/data/service-location.ts` for service configs (currently EDDM + Direct Mail = 2 services × ~92 towns = ~184 pages) and `ENABLED_COUNTIES` to control rollout. All 3 counties enabled. Each page has: localized H1, town-specific intro with computed stats (population, households, carrier routes, distance from New Paltz, cost estimates), Market Profile section (content varies by town size: large/mid-size/small/rural), features grid, town-specific process content with real cost/postage numbers, Industry Applications section (dynamically generated from `clientTypes`), Who We Serve grid, 7 town-specific FAQs with unique numbers per town, stats dashboard (population, households, carrier routes, ZIP, distance, BMEU), cross-links to other service + town page, Service + FAQPage schema. Helper `getTownStats()` computes households, carrier routes, distance (haversine), drive time, EDDM costs, list costs, BMEU facility, and size label from location data. Word counts: 3,000–3,440 per page. To expand: add service configs to `SERVICE_CONFIGS` array in `service-location.ts`.
- **Case Studies**: Eleven case studies with industry filter tags.
- **BBB Trust Page**: A dedicated page showcasing the BBB A+ rating with comprehensive schema and trust-building content.
- **Author Byline**: A reusable component for author information on key content pages.
- **Interactive Calculators**: Five React-based calculators (`client:load`) in `src/components/calculators/`: DirectMailCostCalculator (on `how-much-does-direct-mail-cost` article), PostageCalculator (on `/direct-mail-tools/postage-rates`), EDDMCalculator (on `how-much-does-eddm-cost` article), NonprofitSavingsCalculator (on `nonprofit-postage-rates` article), EnvelopeSizeSelector (on `/direct-mail-tools/envelope-sizes`). Each includes SoftwareApplication schema and a CRST Insider Tip. Article-embedded calculators use slug-based conditional rendering in their `[slug].astro` templates.
- **Sitemap**: A unified sitemap generated by `@astrojs/sitemap`, filtered to exclude specific pages, with a single reference in `robots.txt`.
- **Content Collection — Direct Mail Articles**: 13 cluster articles under `src/content/dm-articles/` rendered via dynamic route `src/pages/services/direct-mail/[slug].astro`. Collection config at `src/content/config.ts`. Each article has: Article + FAQPage (+ optional HowTo/ItemList) @graph schema, TOC, author byline, sticky sidebar with all article links and back-to-pillar link, related articles grid, dual CTAs. Articles cross-link to each other and to the direct mail pillar at `/services/direct-mail`. Five pillar cluster pages at 2,100–2,700 words each (per spec): `how-much-does-direct-mail-cost`, `eddm-every-door-direct-mail`, `postcard-marketing`, `direct-mail-vs-digital-marketing`, `direct-mail-roi`. Eight supporting articles at 800–1,100 words each: `eddm-vs-targeted-direct-mail`, `direct-mail-response-rates`, `how-to-build-a-mailing-list-for-direct-mail`, `postcard-vs-letter-direct-mail`, `usps-informed-delivery-direct-mail-campaign`, `direct-mail-for-real-estate-agents-hudson-valley`, `how-long-does-direct-mail-take`.
- **38-Article Cluster Expansion (8 New Service Pillars)**: Full pillar+cluster architecture deployed across: EDDM (6 articles, `eddm-articles`), Printing (6, `printing-articles`), Non-Profit Mailing (6, `nonprofit-articles`), Mailing Services (5, `mailing-articles`), Graphic Design (5, `graphic-design-articles`), Web Design (4, `web-design-articles`), School District Direct Mail (3, `school-articles`), Union Printing (3, `union-articles`). Each `[slug].astro` template uses complete E-E-A-T schema: Sean Griffin Person entity (`@id: https://crst.net/about#sean-griffin`, MDP via `hasCredential`, `sameAs`), Organization `@id: https://crst.net/#organization` with full address/telephone/foundingDate, BreadcrumbList, Speakable on `['h1', '.article-lead', '.prose h2']`, `inLanguage: 'en-US'`. Each pillar page renders an article grid section (via `getCollection`) above the `<CTASection />`, creating bidirectional pillar↔cluster linking.

### Schema Configuration
- **Homepage LocalBusiness**: `index.astro` passes a merged `["LocalBusiness", "Organization"]` JSON-LD schema, including address, geo-coordinates, area served, founding date, logo, offer catalog, and `sameAs` links. **LocalBusiness schema is homepage ONLY** — all other pages use `Organization` for provider/publisher/worksFor references.
- **Default Schema**: `BaseLayout.astro` renders a `WebPage` schema (with `Organization` publisher) as the default for pages without explicit schema props.
- **Page-Specific Schemas**: Service and location pages inject their own specific schemas (Service, Organization for provider, FAQPage, BreadcrumbList) in addition to the default WebPage schema.
- **AggregateRating**: Removed sitewide per SEO doctrine. No AggregateRating on any page.

## External Dependencies
- **Google Fonts**: Used for typography.
- **GoHighLevel (GHL)**: Integrated for call tracking, attribution, and chat widget functionality.
- **USPS (United States Postal Service)**: Referenced for direct mail regulations, forms, and services.
- **WordPress**: Historical content migration and redirect management from a previous WordPress site.
- **BBB (Better Business Bureau)**: Integration for displaying BBB A+ rating and credentials.
- **YouTube**: Used for embedding training videos.
- **Vimeo**: CDN utilized for mobile hero poster thumbnails.
- **Stripe**: Configured for future payment integration.
- **DataForSEO**: Used for keyword research.
