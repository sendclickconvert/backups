# CRST Site Blueprint — Full Reverse-Engineering Document
**For use on new Replit/Astro builds. Hand this document to Claude or any agent before starting a new site.**
**Source site:** crst.net — Cornerstone Services, Inc., New Paltz, NY
**Stack:** Astro 4.16 · Tailwind CSS · @astrojs/node (hybrid) · @astrojs/react · @astrojs/sitemap

---

## Table of Contents
1. [Tech Stack & Configuration](#1-tech-stack--configuration)
2. [File & Folder Architecture](#2-file--folder-architecture)
3. [Data Layer — site.ts Pattern](#3-data-layer--sitets-pattern)
4. [BaseLayout — What Every Page Inherits](#4-baselayout--what-every-page-inherits)
5. [Schema Architecture — The Full Rulebook](#5-schema-architecture--the-full-rulebook)
6. [Page-Type Playbook](#6-page-type-playbook)
7. [Content Clustering Architecture](#7-content-clustering-architecture)
8. [Content Collections — MDX Article Pattern](#8-content-collections--mdx-article-pattern)
9. [Service × Location Dynamic Route](#9-service--location-dynamic-route)
10. [Redirect Management System](#10-redirect-management-system)
11. [SEO Conventions — Hard Rules](#11-seo-conventions--hard-rules)
12. [Rate & Date-Sensitive Content Conventions](#12-rate--date-sensitive-content-conventions)
13. [Form Security Stack](#13-form-security-stack)
14. [Performance Patterns](#14-performance-patterns)
15. [The SEO Playbook — 7 Steps Executed](#15-the-seo-playbook--7-steps-executed)
16. [Editorial Workflow — "Scan, Understand, Apply"](#16-editorial-workflow--scan-understand-apply)
17. [Reusable Component Inventory](#17-reusable-component-inventory)
18. [Build Checklist for a New Site](#18-build-checklist-for-a-new-site)

---

## 1. Tech Stack & Configuration

### `astro.config.mjs` — the critical settings
```js
export default defineConfig({
  site: 'https://yourdomain.com',
  output: 'hybrid',            // Most pages prerendered; API routes server-rendered
  trailingSlash: 'never',      // CRITICAL: enforced sitewide. All URLs, schema, sitemap = no trailing slash
  adapter: node({ mode: 'standalone' }),
  vite: { server: { allowedHosts: true } },  // Required for Replit preview iframe
  integrations: [
    tailwind(),
    react(),                   // Only for interactive calculator components
    sitemap({
      filter: (page) => !page.includes('/thank-you') && !page.includes('/training'),
    }),
  ],
  redirects: { /* see Section 10 */ },
});
```

### Key packages
- `astro` 4.16
- `@astrojs/tailwind` — styling
- `@astrojs/node` — SSR adapter for Replit autoscale
- `@astrojs/react` — interactive React components only (calculators)
- `@astrojs/sitemap` — auto-generates sitemap, filtered
- `astro:content` — content collections for MDX articles

### Deployment
- Platform: Replit autoscale (Node.js server)
- Build command: `npm run build` → `HOST=0.0.0.0 PORT=5000 node dist/server/entry.mjs`
- The `HOST=0.0.0.0` is required for Replit to expose the port

---

## 2. File & Folder Architecture

```
src/
├── layouts/
│   └── BaseLayout.astro          # Every page inherits this. Head, schema, GTM, GHL, fonts.
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro                # Homepage hero with video
│   ├── PageHero.astro            # Interior page hero — accepts title, subtitle, breadcrumbs[]
│   ├── CTASection.astro          # Reusable bottom CTA strip
│   ├── ServiceCard.astro
│   ├── AuthorByline.astro        # E-E-A-T author block
│   └── calculators/              # React components (client:load)
│       ├── DirectMailCostCalculator.tsx
│       ├── PostageCalculator.tsx
│       ├── EDDMCalculator.tsx
│       ├── NonprofitSavingsCalculator.tsx
│       └── EnvelopeSizeSelector.tsx
├── content/                      # Astro content collections (MDX articles)
│   ├── config.ts                 # Defines all collections + shared Zod schema
│   ├── dm-articles/              # Direct mail cluster (13 articles)
│   ├── eddm-articles/            # EDDM cluster (6 articles)
│   ├── printing-articles/        # Printing cluster (6 articles)
│   ├── nonprofit-articles/       # Non-profit mailing cluster (6 articles)
│   ├── mailing-articles/         # Mailing services cluster (5 articles)
│   ├── graphic-design-articles/  # Graphic design cluster (5 articles)
│   ├── web-design-articles/      # Web design cluster (4 articles)
│   ├── school-articles/          # School district direct mail cluster (3 articles)
│   └── union-articles/           # Union printing cluster (3 articles)
├── data/
│   ├── site.ts                   # Single source of truth: BUSINESS, NAV_ITEMS, SERVICES, GHL
│   ├── locations.ts              # 93 towns with lat/lng, population, county, ZIP, slug
│   ├── service-location.ts       # Dynamic route engine + getTownStats() helper
│   ├── envelope-spokes.ts        # 12 envelope size spokes with lastUpdated per spoke
│   ├── case-studies.ts           # 11 case study objects
│   └── town-unique-content.ts    # Unique content for 17 flagged town pages
├── pages/
│   ├── index.astro               # Homepage — LocalBusiness schema
│   ├── about.astro
│   ├── contact.astro
│   ├── estimate.astro
│   ├── faq.astro
│   ├── terms.astro
│   ├── thank-you.astro
│   ├── non-profit-mailing-application.astro
│   ├── how-to-get-a-refund-on-postage-[...].astro
│   ├── usps-direct-mailer-templates.astro
│   ├── [...slug].astro           # Catch-all redirect handler
│   ├── api/
│   │   ├── submit-form.ts        # Form endpoint: Turnstile verify → GHL webhook
│   │   └── latest-posts.json.ts  # Server-rendered blog post feed for homepage
│   ├── services/
│   │   ├── index.astro           # Services hub
│   │   ├── direct-mail.astro     # Pillar page
│   │   ├── direct-mail/
│   │   │   └── [slug].astro      # dm-articles collection renderer
│   │   ├── eddm.astro
│   │   ├── eddm/[slug].astro
│   │   ├── printing.astro
│   │   ├── printing/[slug].astro
│   │   ├── non-profit-mailing.astro
│   │   ├── non-profit-mailing/[slug].astro
│   │   ├── [service]/[town].astro  # Service × location dynamic route (~184 pages)
│   │   └── ... (other service pages + cluster [slug].astro templates)
│   ├── service-areas/
│   │   ├── index.astro
│   │   ├── ulster-county/
│   │   │   ├── index.astro       # County hub with map embed
│   │   │   └── [town].astro      # 93 town pages
│   │   ├── dutchess-county/...
│   │   └── orange-county/...
│   ├── guides/
│   │   └── envelope-sizes/
│   │       ├── index.astro       # Hub page (pillar)
│   │       └── [spoke].astro     # 12 spoke pages
│   ├── direct-mail-tools/
│   │   ├── postage-rates.astro
│   │   ├── postal-dictionary.astro
│   │   ├── cornerstone-mailing-permits.astro
│   │   ├── envelope-sizes.astro
│   │   ├── address-change.astro
│   │   └── eddm-guide.astro
│   ├── resources/
│   │   ├── index.astro
│   │   ├── periodicals.astro
│   │   ├── non-profit-database-change-request.astro
│   │   ├── informed-delivery-guide.astro
│   │   └── ... (editorial articles)
│   ├── case-studies/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── training/
│       └── portal/               # noindex — internal video training
├── styles/
│   └── global.css
audits/                           # Evidence trail files (not deployed)
│   ├── eddm-audit.md
│   ├── envelope-audit-2026.md
│   └── ps-form-3624-3533-audit-2026.md
```

---

## 3. Data Layer — `site.ts` Pattern

**Everything lives in one file. Never hardcode business data in pages.**

```ts
// src/data/site.ts — adapt for any new site

export const BUSINESS = {
  name: 'Business Name, Inc.',
  shortName: 'BNAME',          // Used in BaseLayout title suffix
  tagline: 'Tagline Since YYYY',
  phone: '(XXX) XXX-XXXX',
  phoneClean: 'XXXXXXXXXX',    // For tel: links
  trackingPhone: '...',        // GHL call tracking number (different from main)
  email: 'info@domain.com',
  address: {
    street: '123 Main St',
    city: 'City',
    state: 'NY',
    zip: '12345',
    full: '123 Main St, City, NY 12345',
  },
  owner: 'Owner Name',
  domain: 'domain.com',
  url: 'https://domain.com',
  founded: 1998,
  stats: { years: '25+', piecesMailed: '2.3M+', municipalities: '47', onTime: '98%' },
} as const;

// GHL integration IDs
export const GHL = {
  webhookUrl: 'https://services.leadconnectorhq.com/hooks/...',
  trackingId: 'tk_...',
  chatWidgetId: '...',
  ga4Id: 'G-...',
} as const;

// NAV_ITEMS drives both Header and structured nav — single source
export const NAV_ITEMS = [ /* ... see CRST example for shape */ ] as const;

// SERVICES drives services hub, service cards, schema offer catalog
export const SERVICES = [ /* slug, title, icon, summary, description */ ] as const;

// COUNTIES drives service area pages
export const COUNTIES = { /* name, slug, anchor, description */ } as const;
```

**The pattern:** Every page imports `{ BUSINESS, GHL, SERVICES }` from `'../data/site'`. The schema `@id: https://domain.com/#organization` always resolves to this object. Never duplicate business data.

---

## 4. BaseLayout — What Every Page Inherits

### What `BaseLayout.astro` does automatically:
1. Sets `<title>` as `"${pageTitle} | ${BUSINESS.shortName}"` (or full format for homepage)
2. Auto-generates canonical from `Astro.url.pathname` unless overridden via prop
3. Renders default `WebPage` schema with `Organization` publisher — **overridden by passing `schema` prop**
4. Injects Open Graph + Twitter cards
5. Loads Google Fonts (preconnect + non-blocking stylesheet)
6. Injects GTM `<script>` in head + noscript iframe in body
7. Deferred GHL tracking pixel (appended on `window.load`)
8. Deferred GHL chat widget (appended via `setTimeout 3000ms` for performance)
9. Exposes `<slot name="head" />` for page-specific schema via `<Fragment slot="head">`
10. Scroll animation observer (`IntersectionObserver` on `.animate-on-scroll`)

### Title formula
```ts
const fullTitle = title === 'Home'
  ? `${BUSINESS.name} | Direct Mail & Printing | ${BUSINESS.address.city}, NY`
  : `${title} | ${BUSINESS.shortName}`;
```
Pass just the page title — the layout handles the suffix. **Do not include "| CRST" in the title prop.**

### The `schema` prop override
```astro
<BaseLayout
  title="Page Title"
  description="Meta desc ≤155 chars"
  canonical="https://domain.com/slug"
  schema={myCustomSchema}   <!-- Replaces the default WebPage schema -->
>
```
For pages with multiple schema types (`@graph`), use `<Fragment slot="head">` instead — do NOT pass them via the `schema` prop (that only accepts a single object).

---

## 5. Schema Architecture — The Full Rulebook

### Rule 1: LocalBusiness schema is homepage ONLY
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "@id": "https://domain.com/#organization",
  "name": "...",
  "foundingDate": "1998",
  "telephone": "+1XXXXXXXXXX",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", "latitude": ..., "longitude": ... },
  "areaServed": [ { "@type": "AdministrativeArea", "name": "..." } ],
  "hasOfferCatalog": { "@type": "OfferCatalog", "itemListElement": [...] },
  "sameAs": ["https://www.bbb.org/..."]
}
```
Pass via `schema={localBusinessSchema}` to BaseLayout.

### Rule 2: All other pages reference Organization via @id (never re-declare LocalBusiness)
```json
{
  "@type": "Organization",
  "@id": "https://domain.com/#organization",
  "name": "...",
  "url": "https://domain.com",
  "telephone": "+1...",
  "foundingDate": "1998",
  "address": { "@type": "PostalAddress", ... }
}
```
This object is typically stored as `const org = { ... }` at the top of each page and reused across all schema items in the `@graph`.

### Rule 3: All multi-type schema pages use @graph via `<Fragment slot="head">`
```astro
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      articleSchema,
      breadcrumbSchema,
      faqSchema,
      howToSchema,   // optional
    ],
  })} />
</Fragment>
```
**Never put schema inline in the page body.** It renders after PageHero and confuses crawlers. Always in `<Fragment slot="head">`.

### Rule 4: BreadcrumbList on every guide/article/resource page
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://domain.com" },
    { "@type": "ListItem", "position": 2, "name": "Section", "item": "https://domain.com/section" },
    { "@type": "ListItem", "position": 3, "name": "Page Title", "item": "https://domain.com/section/slug" }
  ]
}
```

### Rule 5: Article schema requires these exact fields
```json
{
  "@type": "Article",
  "@id": "https://domain.com/slug#article",
  "headline": "Page H1 text",
  "description": "Meta description",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "inLanguage": "en-US",
  "author": {
    "@type": "Person",
    "@id": "https://domain.com/about#owner-name",
    "name": "Owner Name"
  },
  "publisher": { /* org object */ },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://domain.com/slug" }
}
```

### Rule 6: FAQPage structure
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Full question text?",
      "acceptedAnswer": { "@type": "Answer", "text": "Full answer text." }
    }
  ]
}
```
Minimum 4–6 questions. Match the visible `<details>` accordion questions exactly.

### Rule 7: HowTo schema — proper structure (Google requires this exact shape)
```json
{
  "@type": "HowTo",
  "@id": "https://domain.com/slug#howto",
  "name": "How to [Action]",
  "description": "Brief description of the process.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Step name",
      "text": "Full step description with enough detail to be useful as a standalone answer."
    }
  ]
}
```
Each step **must** have `position` (integer), `name` (string), and `text` (string). A wrapper HowTo with no step properties gets silently ignored by Google's rich result validator.

### Rule 8: dateModified in HTML as well as schema
```astro
const lastUpdated = '2026-05-07';
const lastUpdatedDisplay = 'May 2026';

<!-- In author block -->
Last reviewed: <time itemprop="dateModified" datetime={lastUpdated}>{lastUpdatedDisplay}</time>
```
Both the machine-readable `datetime` attribute and the human-readable text must be present.

### Rule 9: AggregateRating — do not use sitewide
Removed from all pages per SEO doctrine. Do not add AggregateRating to service pages or the homepage. Only allowable in very specific trust-page contexts with verified review counts.

### Rule 10: Person entity for E-E-A-T author references
```json
{
  "@type": "Person",
  "@id": "https://domain.com/about#owner-name",
  "name": "Owner Name",
  "jobTitle": "Owner",
  "worksFor": { "@type": "Organization", "@id": "https://domain.com/#organization" },
  "image": "https://domain.com/images/owner-photo.png"
}
```
The `@id` must be consistent across every page that references this person.

---

## 6. Page-Type Playbook

### Homepage (`index.astro`)
- Schema: `["LocalBusiness", "Organization"]` — passed via `schema` prop to BaseLayout
- Title: `"Business Name | Service Category | City, NY"` (homepage-only format)
- Hero: video background, conditional load on mobile
- Sections: Services grid, county map links, case study previews, blog feed (API-fetched)
- Blog feed: client-side `fetch('/api/latest-posts.json')` with cache header + fallback

### Service Pillar Pages (`/services/direct-mail`, etc.)
- Schema: `Service` + `FAQPage` + `BreadcrumbList` via `@graph` in `<Fragment slot="head">`
- H1: Service name prominently
- Must include: intro, features, process, FAQs, CTAs
- Must link to: all cluster articles (grid section above CTASection), service × location pages
- CTA href: `/contact?service=service-slug`

### Service Cluster Articles (`/services/direct-mail/[slug]`)
- Rendered from MDX via `getCollection('dm-articles')` in `[slug].astro`
- Schema: `Article` + `FAQPage` + optional `HowTo` + optional `ItemList` — all in `@graph`
- Layout: sticky TOC sidebar (desktop) + related articles grid + author byline
- Back-link to pillar required in sidebar
- Word count targets: pillar cluster articles 2,100–2,700 words; supporting articles 800–1,100 words

### Resource/Tool Pages (postage-rates, postal-dictionary, envelope-sizes, etc.)
- Schema: `Article` + `FAQPage` + `BreadcrumbList` in `@graph`
- Layout: 2-column `lg:grid-cols-[280px_1fr]` with sticky sidebar (related resources + CTA)
- Author block: `<time itemprop="dateModified">` + source citation links
- Rate/date-sensitive pages: `const YEAR = 2026` + `const lastUpdated = 'YYYY-MM-DD'`
- Source citations: always link to USPS Notice 123 PDF or DMM section
- CTA href: `/contact?service=direct-mail` or service-specific param

### USPS Form Guide Pages (PS Form 3624, PS Form 3533)
- Same layout as resource pages: 2-column with sticky sidebar
- Schema: `Article` + `BreadcrumbList` + `FAQPage` + `HowTo` (if application steps)
- Title format: "PS Form XXXX: [Action Verb] [Thing]" — always lead with form number
- Author block required with date and DMM source citation
- CTA: parameterized `/contact?service=relevant-service`

### Town/Location Pages (`/service-areas/ulster-county/new-paltz`)
- Schema: `LocalBusiness` (town-scoped) + `FAQPage` + `BreadcrumbList`
- H1: "[Service] in [Town], [County] County, NY"
- Unique content for flagged towns via `src/data/town-unique-content.ts`

### County Hub Pages (`/service-areas/ulster-county`)
- Google Map embed
- Anchor city highlights
- Full alphabetical town grid with links
- Schema: `Service` + `BreadcrumbList`

### Service × Location Pages (`/services/eddm/new-paltz`)
- See Section 9 for the full dynamic route architecture
- Word count: 3,000–3,440 words per page
- 7 FAQs with unique numbers/stats per town

### Pillar + Spoke Cluster (Envelope Sizes)
- Hub: `/guides/envelope-sizes` — overview table, links to all 12 spokes
- Spokes: `/guides/envelope-sizes/no-10`, etc.
- Data: `src/data/envelope-spokes.ts` — each spoke has `lastUpdated` field (ISO date)
- **Bump `lastUpdated` in data file whenever editing any spoke** — this propagates dateModified to schema

---

## 7. Content Clustering Architecture

### The pillar + cluster model
Every service has a pillar page and a cluster of supporting articles. The pillar ranks for head terms; the cluster ranks for long-tail and supports the pillar with internal links.

```
Pillar: /services/direct-mail        (head term: "direct mail")
  ├── /services/direct-mail/how-much-does-direct-mail-cost     (2,100–2,700 words)
  ├── /services/direct-mail/eddm-every-door-direct-mail        (2,100–2,700 words)
  ├── /services/direct-mail/postcard-marketing                 (2,100–2,700 words)
  ├── /services/direct-mail/direct-mail-vs-digital-marketing   (2,100–2,700 words)
  ├── /services/direct-mail/direct-mail-roi                    (2,100–2,700 words)
  ├── /services/direct-mail/direct-mail-response-rates         (800–1,100 words)
  ├── /services/direct-mail/how-to-build-a-mailing-list-...    (800–1,100 words)
  └── ... (8 supporting articles)
```

### Bidirectional linking rule
- Pillar page → links to every cluster article (rendered via `getCollection` article grid)
- Every cluster article → links back to pillar in sticky sidebar
- Every cluster article → links to 2–3 related cluster articles in "Related Articles" section

### 10 content collections currently deployed
```
dm-articles          → /services/direct-mail/[slug]
eddm-articles        → /services/eddm/[slug]
printing-articles    → /services/printing/[slug]
nonprofit-articles   → /services/non-profit-mailing/[slug]
mailing-articles     → /services/mailing/[slug]
graphic-design-articles → /services/graphic-design/[slug]
web-design-articles  → /services/web-design/[slug]
school-articles      → /services/school-district-direct-mail/[slug]
union-articles       → /services/union-printing/[slug]
data-articles        → /services/data-lists/[slug]
```

### Resource hub cluster (non-service content)
Envelope sizes hub + 12 spokes is a second cluster type — not an article collection but a data-driven pillar/spoke where all spoke content is derived from `envelope-spokes.ts`. Same bidirectional linking rule applies.

### USPS form cluster
```
/non-profit-mailing-application  (PS Form 3624)
/how-to-get-a-refund-on-postage-...(PS Form 3533)
```
These cross-link to each other, both appear in the 3533 page sidebar, and the 3624 page appears in 15+ inbound links sitewide.

---

## 8. Content Collections — MDX Article Pattern

### `src/content/config.ts` — shared Zod schema for all collections
```ts
import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  updatedDate: z.date(),
  author: z.string(),
  authorTitle: z.string(),
  authorLocation: z.string(),
  primaryKeyword: z.string(),
  pillar: z.string(),              // URL of the parent pillar page
  schemaFAQ: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  schemaHowTo: z.object({
    name: z.string(),
    steps: z.array(z.object({ name: z.string(), text: z.string() })),
  }).optional(),
  schemaItemList: z.array(z.object({ name: z.string() })).optional(),
});

// All collections use the same schema
const dmArticles = defineCollection({ type: 'content', schema: articleSchema });
// ... repeat for all 10 collections

export const collections = {
  'dm-articles': dmArticles,
  'eddm-articles': eddmArticles,
  // ...
};
```

### Article MDX frontmatter format
```md
---
title: "How Much Does Direct Mail Cost? (2026 Breakdown)"
description: "Complete 2026 direct mail cost breakdown..."
pubDate: 2026-01-15
updatedDate: 2026-05-07
author: "Sean Griffin"
authorTitle: "Owner, Cornerstone Services, Inc."
authorLocation: "New Paltz, NY"
primaryKeyword: "how much does direct mail cost"
pillar: "https://domain.com/services/direct-mail"
schemaFAQ:
  - q: "How much does direct mail cost per piece?"
    a: "Direct mail costs typically range from $0.30 to $3.00 per piece..."
schemaHowTo:
  name: "How to Calculate Direct Mail Costs"
  steps:
    - name: "Determine your mailing quantity"
      text: "..."
---

Article body content in Markdown/MDX...
```

### `[slug].astro` template pattern
```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const articles = await getCollection('dm-articles');
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

const { article } = Astro.props;
const { Content, headings } = await article.render();
const { title, description, author, pillar, schemaFAQ, schemaHowTo } = article.data;

// Build @graph
const graphItems = [
  { '@type': 'Article', headline: title, ... },
];
if (schemaFAQ?.length) graphItems.push({ '@type': 'FAQPage', mainEntity: [...] });
if (schemaHowTo) graphItems.push({ '@type': 'HowTo', step: [...] });
---

<BaseLayout title={title} description={description} canonical={canonical}>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graphItems,
    })} />
  </Fragment>
  <!-- 2-column layout: sidebar + main content -->
  <!-- Sidebar: TOC + related articles + back-to-pillar link + CTA -->
  <!-- Main: Content + author byline + related articles grid -->
</BaseLayout>
```

---

## 9. Service × Location Dynamic Route

**Path:** `src/pages/services/[service]/[town].astro`
**Generates:** ~184 pages (2 services × 92 towns = `/services/eddm/new-paltz`, `/services/direct-mail/kingston`, etc.)

### `src/data/service-location.ts` — the engine
```ts
// Helper: compute stats from location data
export function getTownStats(loc: Location) {
  const pop = parseInt(loc.population.replace(/,/g, ''), 10) || 2000;
  const households = Math.round(pop / 2.5);
  const carrierRoutes = Math.max(2, Math.round(households / 400));
  const distMiles = haversineMiles(NP_LAT, NP_LNG, loc.lat, loc.lng);
  const driveMin = Math.max(10, Math.round(distMiles * 1.8));
  const eddmCostLow = Math.round(households * 0.34);   // $0.34/piece × households
  const eddmCostHigh = Math.round(households * 0.42);
  const dmListCostLow = Math.round(households * 0.08);
  const dmListCostHigh = Math.round(households * 0.12);
  const bmeu = loc.county === 'orange' ? 'Newburgh' : 'New Paltz';
  const sizeLabel = pop >= 20000 ? 'large' : pop >= 8000 ? 'mid-size' : pop >= 3000 ? 'small' : 'rural';
  return { pop, households, carrierRoutes, distMiles, driveMin, eddmCostLow, eddmCostHigh, dmListCostLow, dmListCostHigh, bmeu, sizeLabel };
}

// ServiceConfig interface — one per service
export interface ServiceConfig {
  slug: string;
  name: string;
  pillarHref: string;
  h1Template: (town: string) => string;
  metaTitleTemplate: (town: string) => string;
  metaDescTemplate: (town: string, county: string) => string;
  introTemplate: (loc: Location, county: string) => string;
  features: { title: string; desc: string }[];
  processContent: (loc: Location, county: string) => string[];
  localMarketContent: (loc: Location, county: string) => string[];
  faqsForTown: (loc: Location, county: string) => { q: string; a: string }[];
  schemaServiceName: string;
}

// To add a new service × location type:
// 1. Add a ServiceConfig to SERVICE_CONFIGS array
// 2. Add the county to ENABLED_COUNTIES
// 3. The [service]/[town].astro dynamic route picks it up automatically
export const SERVICE_CONFIGS: ServiceConfig[] = [
  { slug: 'eddm', /* ... */ },
  { slug: 'direct-mail', /* ... */ },
];

export const ENABLED_COUNTIES = ['ulster', 'dutchess', 'orange'];
```

### What each service × location page contains
1. Localized H1 from `h1Template(town.name)`
2. Town-specific intro paragraph with computed stats (population, households, carrier routes, BMEU)
3. Market Profile section (content varies: `large`/`mid-size`/`small`/`rural` branch)
4. Features grid (service-level, same for all towns)
5. Town-specific process content with real cost/postage numbers
6. Industry Applications section
7. Who We Serve grid
8. Stats dashboard (population, households, carrier routes, ZIP, distance, BMEU)
9. 7 town-specific FAQs with unique numbers per town
10. Cross-link to other service + same town
11. Schema: `Service` + `FAQPage` + `BreadcrumbList`

---

## 10. Redirect Management System

### Dual system: config-level + catch-all

**`astro.config.mjs` redirects** — for exact slug-to-slug redirects that were WordPress URLs:
```js
redirects: {
  '/old-wp-slug/': '/new-astro-path',
  '/resources/postage-rates/': '/direct-mail-tools/postage-rates',
  // Pattern: always redirect trailing-slash versions too
}
```

**`src/pages/[...slug].astro` catch-all** — for pattern-based redirects, tag redirects, and fallbacks:
```ts
// Exact redirects map
const EXACT: Record<string, string> = {
  '/resources/non-profit-mailing': '/non-profit-mailing-application',
  '/how-to-get-a-refund-on-postage': '/how-to-get-a-refund-...',
};

// Returns 301 for matches, 404 for nothing
```

### Convention
- Always add both trailing-slash and non-trailing-slash versions of WP redirects
- WP taxonomy pages (tag/, category/, crst-daily/) → redirect to blog or homepage
- WP /wp-content/ PDFs → redirect to the relevant resource page
- Use `astro.config.mjs` for stable production redirects; use `[...slug].astro` for dynamic/pattern-based

---

## 11. SEO Conventions — Hard Rules

### Title tags
- **≤ 60 characters** — every page, no exceptions
- Format for interior pages: `"Descriptive Page Title"` — BaseLayout appends `" | SHORTNAME"` automatically
- Do NOT include "| SHORTNAME" in the `title` prop — it double-appends
- Lead with the primary keyword / form number / year where applicable
- For year-pinned content: `"2026 USPS Postage Rates: First Class, Marketing Mail & EDDM"`

### Meta descriptions
- **≤ 155 characters** — measure every time
- Must include the primary keyword
- Must include a year or freshness signal for rate/date-sensitive pages
- Must include a clear value proposition or action

### Canonical URLs
- Always set explicitly with `canonical="https://domain.com/slug"` (no trailing slash)
- Never rely on auto-generation for pages that have had URL changes or redirects
- All internal links, schema URLs, and sitemap entries use the canonical form

### H1
- One per page, always matches the intent of the title tag
- For form/tool pages: lead with the form name ("PS Form 3624: ...")
- For rate pages: include year ("2026 USPS Postage Rates")

### trailingSlash: 'never'
- Enforced at framework level in `astro.config.mjs`
- Every internal link, schema URL, and sitemap entry must omit the trailing slash
- Redirects catch trailing-slash variants from legacy WordPress URLs

### Internal linking
- Every service page links to all cluster articles
- Every cluster article links back to its pillar
- Resource pages cross-link to related tools and services
- CTAs always use parameterized URLs: `/contact?service=service-slug`

---

## 12. Rate & Date-Sensitive Content Conventions

### The pattern (used on postage-rates, nonprofit page, dictionary, etc.)
```astro
---
const YEAR = 2026;
const lastUpdated = '2026-05-07';         // ISO format for dateModified schema
const lastUpdatedDisplay = 'May 2026';    // Human-readable for author block

// Schema uses lastUpdated
const graphItems = [
  {
    '@type': 'Article',
    dateModified: lastUpdated,
    // ...
  }
];
---

<!-- In body: machine-readable + human-readable -->
Last reviewed: <time itemprop="dateModified" datetime={lastUpdated}>{lastUpdatedDisplay}</time>
```

### Rate source citation required
Any page with USPS postage rates must cite:
- **Primary source:** USPS Notice 123 PDF: `https://pe.usps.com/cpim/ftp/manuals/dmm300/notice123.pdf`
- **Effective date:** April 26, 2026 (current rate change)
- **Footnote format:** "Rates effective [Date] · Source: USPS Notice 123"

### Stale rate detection rule
- The old Marketing Mail letter 5-digit rate was $0.247 — **this is now the EDDM Retail rate**
- If you see $0.247 on a Marketing Mail letters page, it is wrong — correct to $0.372
- Always cross-check rate pages against the postage-rates.astro page as the verified reference

### Current verified rates (Notice 123, effective April 26, 2026)
| Class | Sort | Rate |
|---|---|---|
| First-Class Letter (metered) | Retail | $0.74 |
| First-Class Letter (stamp) | Retail | $0.78 |
| First-Class Postcard | Retail | $0.61 |
| First-Class Large Envelope | 1 oz retail | $1.63 |
| First-Class Bulk Automation | 5-digit | $0.593 |
| Marketing Mail Letter | Carrier Route Saturation | $0.244 |
| Marketing Mail Letter | Automation 5-digit | $0.372 |
| Marketing Mail Letter | Automation AADC | $0.407 |
| Marketing Mail Letter | Automation Mixed AADC | $0.433 |
| Marketing Mail Flat | Carrier Route Saturation | $0.290 |
| Marketing Mail Flat | Automation 5-digit | $0.770 |
| EDDM Retail | Flats up to 3.3 oz | $0.247 |
| EDDM BMEU (DDU) | | $0.242 |
| NP Letter | Carrier Route Saturation | $0.155 |
| NP Letter | Automation 5-digit | $0.178 |
| NP Letter | Automation AADC | $0.213 |
| NP Flat | Carrier Route Saturation | $0.180 |

---

## 13. Form Security Stack

Four layers on every contact/estimate form:

1. **Honeypot field** — `<input type="text" name="website" style="display:none" autocomplete="off" tabindex="-1">`. On submit: `if (honeypot.value) return;` — silently drop the submission.

2. **Cloudflare Turnstile widget** — invisible or one-click bot challenge on the client. Generates a signed token on human interaction. `@turnstile/web` or CDN script loads the widget.

3. **Server-side Turnstile verification** — in `src/pages/api/submit-form.ts`:
```ts
const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: JSON.stringify({ secret: secretKey, response: token, remoteip: clientIP }),
});
const { success } = await verifyRes.json();
if (!success) return 400 error;
```

4. **JSON body validation** — `request.json()` wrapped in try/catch, returns 400 for malformed payloads. Rejects raw HTTP spam tools.

After all four pass: forward to GHL webhook via `fetch(GHL.webhookUrl, { method: 'POST', body: JSON.stringify({ ...formData, source: 'website' }) })`.

**Environment secret needed:** `TURNSTILE_SECRET_KEY` — from Cloudflare dashboard. The code gracefully skips Turnstile verification in dev if the secret is not set.

---

## 14. Performance Patterns

### Hero video — conditional loading
```astro
<!-- Only load video on non-mobile (saves bandwidth) -->
{!Astro.request.headers.get('user-agent')?.includes('Mobile') && (
  <video autoplay muted loop playsinline class="...">
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>
)}
<!-- Vimeo CDN used for mobile poster thumbnail -->
<img src="https://i.vimeocdn.com/video/XXXX_1280.jpg" ... />
```

### GHL chat widget — deferred 3 seconds
```js
setTimeout(function() {
  var s = document.createElement('script');
  s.src = 'https://widgets.leadconnectorhq.com/loader.js';
  s.setAttribute('data-widget-id', chatWidgetId);
  document.body.appendChild(s);
}, 3000);
```

### GHL tracking pixel — deferred to window.load
```js
window.addEventListener('load', function() {
  var s = document.createElement('script');
  s.src = 'https://links.domain.net/js/external-tracking.js';
  s.setAttribute('data-tracking-id', trackingId);
  document.body.appendChild(s);
});
```

### Google Fonts — preconnect + non-blocking
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?..." />
```

### Images — WebP format throughout
All hero images, author photos, and logo variants are `.webp`. Fallback `.png` only for favicon.

### Hybrid rendering
- `export const prerender = false` on API routes
- All other pages prerender as static HTML at build time
- `sitemap()` filter excludes `/thank-you` and `/training`

---

## 15. The SEO Playbook — 7 Steps Executed

This is the specific playbook run on this site, documented as a replicable pattern.

**GSC baseline:** 118K impressions, 232 clicks, 0.20% sitewide CTR over 90 days.

### Step 1: Envelope Hub + 12 Spokes
- **Problem:** 49K impressions, 0.12% CTR — pillar existed but spokes were thin
- **Fix:** Audited every spoke, added Quick Answer tables, updated `lastUpdated` per spoke, moved FAQPage schema to `<Fragment slot="head">`, added BreadcrumbList, cross-linked all spokes bidirectionally
- **Data file:** `src/data/envelope-spokes.ts` — update `lastUpdated` field on every edit
- **Pattern:** Hub page → links to 12 spokes; each spoke → links back to hub + adjacent spokes

### Step 2: EDDM Page Cluster
- **Problem:** 8.6K impressions, 0 clicks — rate in title was stale, schema wrong
- **Fix:** Rate verification from Notice 123, title with year + correct rate, schema fixes, internal links from all 6 EDDM cluster articles to main pillar
- **Lesson:** 0 clicks despite 8.6K impressions = broken page, not weak page. Fix it.

### Step 3: Postage Rates Page
- **Problem:** 13K impressions on year-pinned queries, 7 clicks — rates from 2025
- **Fix:** 19 rates corrected from Notice 123 PDF, `const YEAR = 2026`, "What Changed in 2026" callout, BreadcrumbList, Article + FAQPage + BreadcrumbList schema in `@graph`, CTA parameterized
- **Rate source:** `https://pe.usps.com/cpim/ftp/manuals/dmm300/notice123.pdf`

### Step 4: Postal Dictionary
- **Problem:** 48 terms, no anchor IDs, no BreadcrumbList, FAQPage in wrong placement
- **Fix:** Expanded to 58 terms, `slugify()` function for per-term anchor IDs (`#prsrt-std`), DefinedTermSet schema with `@id` matching HTML anchor, indicia decoder section, BMEU/PRSRT STD promoted from FAQ to glossary entries
- **Key insight:** DefinedTermSet schema `@id` matching HTML anchor IDs enables Google deep-link results

### Steps 5 & 6: Two "improve in place" rescues
- Step 5 would have created `/guides/usps-postage-rates-2026` (duplicate) — audit caught it, improved existing page instead
- Step 6 would have created `/guides/mail-markings` (duplicate) — audit caught it, improved existing postal-dictionary instead
- **The "scan, understand, apply" discipline prevented both mistakes**

### Step 7: PS Form 3624 + 3533 Pair
- **Problem:** Form 3624 at 0.79% CTR vs. Form 3533 model at 3.3% CTR
- **Root causes:** Stale rates (7 wrong figures), $0.247 EDDM rate listed as Marketing Mail letter rate, no sidebar, no author block, FAQPage in body, no Article/BreadcrumbList schema, CTA to `/estimate` not parameterized
- **Fix:** Both pages lifted simultaneously — 2-column sidebar layout, author blocks, schema corrected, 7 rates updated, savings example corrected ($2,020 → $3,880/year), HowTo schema with proper step structure, CTAs parameterized
- **Hypothesis:** 4x CTR multiplier if 3624 reaches parity with 3533

---

## 16. Editorial Workflow — "Scan, Understand, Apply"

**This is the standing operating procedure. Never skip it.**

### The 3-step discipline
1. **Scan** — fully read the existing page(s), check title/meta/H1/schema/word count/inbound links
2. **Understand** — cross-reference against GSC data; identify the gap (stale rates? wrong schema placement? no sidebar? low FAQ count?)
3. **Apply** — implement only what the scan reveals is needed; don't create new pages unless you can prove an existing page cannot serve the intent

### Default: "improve in place"
- Evergreen slugs win. A page at `/postage-rates` that has inbound links, redirect equity, and GSC impression history is worth more than a new page at `/2026-postage-rates`
- Never create a new page or change a URL slug without flagging it explicitly and explaining why Path A (improve existing) is impossible
- This pattern caught 4/4 scope errors where the original prompt would have created duplicate pages

### Audit checklist for any page
- [ ] Title ≤ 60 chars? Leads with primary keyword?
- [ ] Meta desc ≤ 155 chars?
- [ ] H1 matches title intent?
- [ ] Canonical explicitly set?
- [ ] Schema types: what's present, what's missing, is FAQPage in `<Fragment slot="head">`?
- [ ] dateModified in both schema and visible `<time>` element?
- [ ] Author block present on guide/article pages?
- [ ] Rate/date figures verified against current official source?
- [ ] CTA points to `/contact?service=...`?
- [ ] Inbound link count (how many other pages link here)?
- [ ] Sidebar with related resources?

### Audit file convention
Write an audit file to `audits/page-name-YYYY.md` when making significant changes to a page. Include:
- Before/after table for title, meta, schema, layout
- Rate corrections with source URL and effective date
- Monitoring checklist (GSC re-index, rich results test URL, 4-6 week CTR check)

---

## 17. Reusable Component Inventory

| Component | File | Usage |
|---|---|---|
| `BaseLayout` | `layouts/BaseLayout.astro` | Every page — wraps HTML, head, GTM, GHL |
| `PageHero` | `components/PageHero.astro` | Interior page hero — props: `title`, `subtitle`, `breadcrumbs[]` |
| `CTASection` | `components/CTASection.astro` | Bottom CTA strip — used on every service/resource page |
| `ServiceCard` | `components/ServiceCard.astro` | Service grid cards on homepage and services hub |
| `AuthorByline` | `components/AuthorByline.astro` | E-E-A-T author block — props: `name`, `title`, `date`, `source` |
| `Header` | `components/Header.astro` | Nav from `NAV_ITEMS` in `site.ts` |
| `Footer` | `components/Footer.astro` | Clean footer (no map embed) |
| `Hero` | `components/Hero.astro` | Homepage video hero |
| `PostageCalculator` | `components/calculators/PostageCalculator.tsx` | React, `client:load` |
| `EDDMCalculator` | `components/calculators/EDDMCalculator.tsx` | React, `client:load` |
| `DirectMailCostCalculator` | `components/calculators/DirectMailCostCalculator.tsx` | React, `client:load` |
| `NonprofitSavingsCalculator` | `components/calculators/NonprofitSavingsCalculator.tsx` | React, `client:load` |
| `EnvelopeSizeSelector` | `components/calculators/EnvelopeSizeSelector.tsx` | React, `client:load` |

### Sidebar layout pattern (used on all guide/form/resource pages)
```astro
<div class="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
  <aside class="hidden lg:flex flex-col gap-6 sticky top-6">
    <!-- Back link -->
    <a href="/resources" class="inline-flex items-center ...">← View All Resources</a>
    <!-- CTA card -->
    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3>CTA Heading</h3>
      <a href="/contact?service=...">Primary CTA</a>
      <a href="tel:...">Phone</a>
    </div>
    <!-- Related resources nav -->
    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3>Related Resources</h3>
      <nav class="flex flex-col gap-2">
        {links.map(l => <a href={l.href} class="... border-l-[3px] border-crst-gold ...">{l.label}</a>)}
      </nav>
    </div>
  </aside>

  <main>
    <div class="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <!-- Page content -->
    </div>
    <!-- Mobile sidebar fallback -->
    <div class="lg:hidden mt-8 ...">
      <div class="grid grid-cols-2 gap-2">
        {links.map(l => <a href={l.href}>...</a>)}
      </div>
    </div>
  </main>
</div>
```

---

## 18. Build Checklist for a New Site

Use this when starting a fresh Replit site using this blueprint.

### Initial setup
- [ ] `npm create astro@latest` — hybrid mode, node adapter
- [ ] Install: `@astrojs/tailwind`, `@astrojs/react`, `@astrojs/sitemap`, `@astrojs/node`
- [ ] Set `output: 'hybrid'`, `trailingSlash: 'never'`, `site: 'https://domain.com'`
- [ ] Set `vite: { server: { allowedHosts: true } }` — required for Replit preview
- [ ] Configure workflow: `npm run build && HOST=0.0.0.0 PORT=5000 node dist/server/entry.mjs`

### Data layer first
- [ ] Create `src/data/site.ts` with BUSINESS, NAV_ITEMS, SERVICES, GHL constants
- [ ] Create `src/data/locations.ts` with town data (lat/lng, population, county, ZIP, slug)
- [ ] Create BaseLayout with auto-canonical, default WebPage schema, GTM, GHL slots

### Page architecture
- [ ] Homepage with LocalBusiness `@graph` schema — only page with LocalBusiness type
- [ ] Service pillar pages — one per service, Service + FAQPage + BreadcrumbList schema
- [ ] Create content collections in `src/content/config.ts` with shared Zod schema
- [ ] `[slug].astro` templates per service for article rendering
- [ ] Town pages under `service-areas/[county]/[town].astro`
- [ ] `[service]/[town].astro` dynamic route with `SERVICE_CONFIGS` + `getTownStats()`

### SEO infrastructure
- [ ] `robots.txt` with single sitemap reference
- [ ] `[...slug].astro` catch-all for redirect handling
- [ ] `audits/` directory for evidence trail files
- [ ] All redirects added with both trailing-slash and non-trailing-slash variants

### Content strategy
- [ ] Identify GSC clusters: impressions with low CTR = fix first; 0 clicks on impressions = broken
- [ ] Map pillar + cluster for each service (5 pillar articles + 8 supporting)
- [ ] Envelope/product size hub + spokes pattern for any dimensional reference content
- [ ] USPS form pages: one per form, sidebar layout, HowTo schema, rate verification

### Schema audit before launch
- [ ] Run every page type through Google Rich Results Test
- [ ] Confirm FAQPage is in `<Fragment slot="head">` — never inline in body
- [ ] Confirm BreadcrumbList on all non-homepage pages
- [ ] Confirm no duplicate LocalBusiness schema outside homepage
- [ ] Confirm `@id: https://domain.com/#organization` is consistent everywhere

---

*Generated from the CRST site build — crst.net — May 2026.*
*This document captures architecture, conventions, and the 7-step SEO playbook as executed.*
*To replicate: adapt Section 3 (site.ts) for the new business, then follow Section 18 build checklist.*
