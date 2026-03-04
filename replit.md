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
- **Location-Based Content**: Features dedicated pages for services and service areas, including county and town-specific content with geocoded coordinates.
- **SEO Optimization**: Implements JSON-LD schema (LocalBusiness, Service, FAQPage, Organization, Person, Review, WebPage, BreadcrumbList) for enhanced search engine visibility. AggregateRating is ONLY on the BBB page (reviewCount: 3 with real reviews + author fields) — removed sitewide elsewhere because reviewCount: 0 is invalid per Google's structured data requirements. E-E-A-T (Expertise, Authoritativeness, Trustworthiness) principles are applied through author bylines and detailed content.
- **Redirects**: Comprehensive 301 redirects are handled via `astro.config.mjs` and a dynamic catch-all `[...slug].astro` for legacy WordPress URLs and content migrations.
- **Hybrid Rendering**: Prerenders most pages as static HTML while server-rendering dynamic content and redirects for flexibility.
- **Internal Linking**: Strategically placed internal links across service pages, county hubs, and town pages to improve site navigation and SEO equity.
- **Call Tracking**: Integrates GHL call tracking scripts (`number_pool.js`, `user_session.js`) for phone number attribution.
- **Performance Optimizations**: Hero video conditionally loaded only on desktop (768px+) via JS to avoid 4.1MB download on mobile; logo served as WebP (12KB vs 180KB PNG); GHL chat widget deferred 3 seconds via setTimeout to avoid blocking initial page render.
- **Training Portal**: Includes a standalone, `noindex`/`nofollow` training portal (`/training/portal/`) with multi-module video lessons.

### Feature Specifications
- **Services Pages**: Nine dedicated service pages with detailed descriptions, FAQs, and service area links.
- **Service Areas**: Covers three counties (Ulster, Dutchess, Orange) with 92 town-specific pages (36 Ulster + 27 Dutchess + 29 Orange), including local business schema, nearby area links, Google Map embeds, mid-page CTAs, and county back links.
- **Resources/Tools**: A section for direct mail tools and resources, including guides on postage rates, mailing permits, and postal dictionaries.
- **Case Studies**: Features case studies with clickable industry filter tags.
- **BBB Trust Page**: A dedicated page showcasing BBB A+ rating with comprehensive schema and trust-building content.
- **Author Byline**: Reusable component for author information on key content pages.

## External Dependencies
- **Google Fonts**: For typography.
- **GoHighLevel (GHL)**: For call tracking and attribution.
- **USPS (United States Postal Service)**: Referenced for direct mail regulations (DMM citations), forms (PS Form 3500, PS Form 3533), and services like Informed Delivery.
- **WordPress**: Historical content migration and redirect management from a previous WordPress site.
- **BBB (Better Business Bureau)**: Integration of BBB A+ rating and credentials.
- **YouTube**: For embedding training videos in the internal portal.