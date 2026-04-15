# eForestProducts.com — Build Blueprint
## Based on CRST.net Architecture | Forestry Services Vertical

---

## Executive Summary

This blueprint replicates the exact SEO architecture used at crst.net, adapted for a local forestry services business. Every pattern below is drawn directly from the CRST codebase — file structure, schema doctrine, linking model, content templates, and technical configuration are all proven in production.

**What stays identical:** Tech stack, BaseLayout system, schema doctrine, hub-and-spoke linking, pillar+cluster content model, programmatic location pages, conversion flow.

**What gets swapped:** Business NAP, service names, geographic data, author identity, tool calculators, industry-specific content.

---

## Part 1 — File Structure to Create

```
src/
  pages/
    index.astro                          → / (homepage)
    estimate.astro                       → /estimate (primary conversion)
    contact.astro                        → /contact
    about.astro                          → /about
    faq.astro                            → /faq
    thank-you.astro                      → /thank-you (noindex)
    privacy.astro / terms.astro
    [...slug].astro                      → SSR catch-all redirects (prerender: false)

    services/
      index.astro                        → /services
      tree-removal.astro                 → /services/tree-removal        [PILLAR]
      land-clearing.astro                → /services/land-clearing        [PILLAR]
      stump-grinding.astro               → /services/stump-grinding       [PILLAR]
      storm-damage-cleanup.astro         → /services/storm-damage-cleanup [PILLAR]
      forestry-mulching.astro            → /services/forestry-mulching    [PILLAR]
      logging.astro                      → /services/logging              [PILLAR]
      firewood-delivery.astro            → /services/firewood-delivery    [PILLAR]
      brush-clearing.astro               → /services/brush-clearing       [PILLAR]

      tree-removal/[slug].astro          → /services/tree-removal/:slug   [CLUSTER ARTICLES]
      land-clearing/[slug].astro         → /services/land-clearing/:slug
      stump-grinding/[slug].astro        → /services/stump-grinding/:slug
      [service]/[slug].astro             → repeat per pillar

      [service]/[town].astro             → /services/:service/:town       [SERVICE×LOCATION]

    service-areas/
      index.astro                        → /service-areas
      [county]/
        index.astro                      → /service-areas/:county
        [location].astro                 → /service-areas/:county/:town   [TOWN PAGES]

    forestry-tools/                      → replaces /direct-mail-tools/
      tree-removal-cost-calculator.astro → /forestry-tools/tree-removal-cost
      land-clearing-cost-guide.astro     → /forestry-tools/land-clearing-cost
      firewood-cord-calculator.astro     → /forestry-tools/firewood-calculator

    resources/
      index.astro
      [various guides].astro

    case-studies/
      index.astro
      [slug].astro

    api/
      latest-posts.json.ts               → SSR blog feed (if WordPress blog exists)

  layouts/
    BaseLayout.astro                     → ALL metadata, canonical, schema default, OG

  components/
    Header.astro
    Footer.astro
    PageHero.astro
    CTASection.astro
    AuthorByline.astro
    EstimateForm.astro
    ServiceCard.astro
    calculators/
      TreeRemovalCostCalculator.tsx      → React, client:load
      LandClearingCalculator.tsx
      FirewoodCordCalculator.tsx

  data/
    site.ts                              → BUSINESS NAP, NAV_ITEMS, SERVICES
    locations.ts                         → All geocoded towns with lat/lng
    service-location.ts                  → SERVICE_CONFIGS, getTownStats(), templates
    town-unique-content.ts               → Unique copy for top 20-30 towns
    case-studies.ts                      → Case study data objects

  content/
    config.ts                            → Collection schema definitions
    tree-removal-articles/               → 5-6 MDX files
    land-clearing-articles/              → 5-6 MDX files
    stump-grinding-articles/             → 4-5 MDX files
    storm-damage-articles/               → 4-5 MDX files
    forestry-mulching-articles/          → 4-5 MDX files
    logging-articles/                    → 3-4 MDX files
    firewood-articles/                   → 3-4 MDX files

  styles/
    global.css

public/
  robots.txt
  images/
  videos/
```

---

## Part 2 — Technical Checklist

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eforestproducts.com',
  output: 'hybrid',
  trailingSlash: 'never',                         // ← CRITICAL. Never change.
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/training'),
    }),
  ],
  redirects: {
    // Add legacy URL redirects here as 301s
    // '/old-url': '/new-url',
  },
});
```

### Technical SEO Checklist
- [ ] `trailingSlash: 'never'` set in astro.config.mjs
- [ ] `site: 'https://eforestproducts.com'` set
- [ ] `output: 'hybrid'` — static for content pages, SSR for redirects + APIs
- [ ] `[...slug].astro` with `export const prerender = false` for redirect handling
- [ ] `robots.txt` — Allow: /, Sitemap: https://eforestproducts.com/sitemap-index.xml
- [ ] Sitemap excludes: /thank-you, /training (any noindex pages)
- [ ] `LocalBusiness` schema on homepage ONLY — all other pages use Organization @id
- [ ] No `AggregateRating` schema anywhere
- [ ] `noIndex: true` on /thank-you and any training/portal pages
- [ ] Canonical auto-generated in BaseLayout, manual override via `canonical` prop
- [ ] All internal links, schema URLs, sitemap entries: no trailing slash
- [ ] WebP images throughout, `loading="lazy"` on non-LCP images
- [ ] Hero video: desktop only, poster image for mobile
- [ ] React calculator components: `client:load` only (no SSR hydration)

---

## Part 3 — Data Layer (site.ts)

```typescript
// src/data/site.ts — SWAP ALL VALUES FOR EFORESTPRODUCTS

export const BUSINESS = {
  name: '[LEGAL BUSINESS NAME]',               // e.g., "eForest Products, Inc."
  shortName: '[SHORT NAME]',                   // e.g., "eForest" — used in title tags
  address: {
    street: '[STREET ADDRESS]',
    city: '[CITY]',
    state: '[STATE]',
    zip: '[ZIP]',
    full: '[FULL ADDRESS STRING]',
  },
  phone: '([XXX]) [XXX]-[XXXX]',
  email: 'info@eforestproducts.com',
  url: 'https://eforestproducts.com',
  founded: [YEAR],                             // e.g., 2005
  tagline: '[SHORT VALUE PROPOSITION]',        // e.g., "Hudson Valley's Forestry Experts"
};

export const SERVICES = [
  { name: 'Tree Removal', slug: 'tree-removal', href: '/services/tree-removal' },
  { name: 'Land Clearing', slug: 'land-clearing', href: '/services/land-clearing' },
  { name: 'Stump Grinding', slug: 'stump-grinding', href: '/services/stump-grinding' },
  { name: 'Storm Damage Cleanup', slug: 'storm-damage-cleanup', href: '/services/storm-damage-cleanup' },
  { name: 'Forestry Mulching', slug: 'forestry-mulching', href: '/services/forestry-mulching' },
  { name: 'Logging & Timber', slug: 'logging', href: '/services/logging' },
  { name: 'Firewood Delivery', slug: 'firewood-delivery', href: '/services/firewood-delivery' },
  { name: 'Brush Clearing', slug: 'brush-clearing', href: '/services/brush-clearing' },
];

export const COUNTIES = [
  { name: '[COUNTY 1]', slug: '[county-1-slug]', href: '/service-areas/[county-1-slug]' },
  { name: '[COUNTY 2]', slug: '[county-2-slug]', href: '/service-areas/[county-2-slug]' },
  { name: '[COUNTY 3]', slug: '[county-3-slug]', href: '/service-areas/[county-3-slug]' },
];

// GHL webhook URL for estimate form
export const GHL = {
  webhookUrl: '[GHL_WEBHOOK_URL]',
};
```

---

## Part 4 — Meta Title Formulas (By Page Type)

| Page Type | Formula | Example |
|---|---|---|
| Homepage | `[BUSINESS NAME] \| [Primary Service] \| [City], [State]` | `eForest Products \| Tree Removal & Land Clearing \| Albany, NY` |
| Service pillar | `[Service Name] in [Region] \| [SHORT NAME]` | `Tree Removal in Hudson Valley \| eForest` |
| Cluster article | `[Specific Topic]: [Qualifier] \| [SHORT NAME]` | `How Much Does Tree Removal Cost in 2026 \| eForest` |
| Service×Town | `[Service] in [Town], [State] \| [SHORT NAME]` | `Land Clearing in Kingston, NY \| eForest` |
| Town location | `[Service Type] Services in [Town], [State] \| [SHORT NAME]` | `Forestry Services in New Paltz, NY \| eForest` |
| Tool/calculator | `[Tool Name]: [Qualifier] \| [SHORT NAME]` | `Tree Removal Cost Calculator 2026 \| eForest` |
| Case study | `[Result] for [Client Type] \| [SHORT NAME]` | `2-Acre Land Clearing in 3 Days \| eForest` |

**BaseLayout title logic (identical to CRST):**
```astro
const fullTitle = title === 'Home'
  ? `${BUSINESS.name} | Tree Removal & Forestry Services | ${BUSINESS.address.city}, ${BUSINESS.address.state}`
  : `${title} | ${BUSINESS.shortName}`;
```

---

## Part 5 — Page Templates

### 5a. Homepage Template
**Schema:** `LocalBusiness` + `Organization` (homepage ONLY)
**Word count:** 800–1,200 words visible content

```
Section 1: Hero
  - H1: "[TAGLINE] — [CITY], [STATE]"
  - Subheadline: value prop + service list
  - Primary CTA: "Get Free Estimate"
  - Secondary: phone number
  - Background: hero video (desktop) / poster image (mobile)

Section 2: Stats Grid (4 columns)
  - Jobs Completed / Years in Business / Response Time / Service Area (X counties)

Section 3: Services Grid
  - 6-8 ServiceCard components linking to each pillar

Section 4: Why Choose Us
  - 3-4 differentiators (licensed/insured, local crew, same-day response, etc.)

Section 5: Testimonials
  - 3 real customer quotes with names, photos, star ratings

Section 6: Latest Blog Posts (optional)
  - 3 cards from external blog or content collection

Section 7: Service Area Map / Counties
  - Links to county hub pages

Section 8: CTASection (component)
```

---

### 5b. Service Pillar Template
**Schema:** `@graph` [Service + Person(author) + FAQPage + BreadcrumbList]
**Word count:** 1,800–2,500 words
**URL pattern:** `/services/[service-slug]`

```
THIN AUTHOR BAR (above hero)
  "[OWNER NAME], [CREDENTIAL] — [BUSINESS NAME]"

PageHero
  H1: "[Service Name] in [Region], [State]"
  Breadcrumbs: Home > Services > [Service]

Section 1: Intro
  - Primary keyword paragraph
  - Stats: jobs completed, years experience, coverage area

Mid-page CTA Box
  - "Get Free Estimate" button + phone

Section 2: What's Included / How It Works
  H2: "Full-Service [Service Name] — What We Handle"
  H3 subsections per deliverable

Section 3: Process Steps (numbered)
  H2: "How Our [Service] Process Works"
  Steps 1–5 with icons

Section 4: Pricing / What to Expect
  H2: "How Much Does [Service] Cost?"
  Table: size/scope → price range
  Link to cost calculator tool page

Section 5: Why Choose [BUSINESS NAME]
  H2: "Why [Region] Homeowners Choose [BUSINESS NAME]"
  Differentiators: licensed, insured, local crew, cleanup included

Section 6: Service Area Links
  H2: "Serving [Region] — [Service] Near You"
  Links to top 8-10 service×town pages

Section 7: Related Guides (cluster articles grid)
  H2: "[Service] Resources & Guides"
  getCollection() grid — 3-6 article cards

Section 8: FAQ
  H2: "Frequently Asked Questions"
  7-10 questions, full text visible (NO accordion)

CTASection (component)
```

---

### 5c. Cluster Article Template
**Schema:** `@graph` [Article + Person(author) + FAQPage + BreadcrumbList + Speakable]
**Word count:** Pillar articles 2,000–2,500 | Supporting articles 800–1,100
**URL pattern:** `/services/[service]/[slug]`

```
PageHero
  H1: [Article Title]
  Breadcrumbs: Home > Services > [Service] > [Article Title]

TWO-COLUMN LAYOUT:
  LEFT COLUMN (main):
    TOC box ("In This Article" — anchor links to H2s)
    [OPTIONAL: Calculator component if relevant article]
    MDX article prose content
    AuthorByline (full version)
    Visible FAQ section
    Related Articles grid (3 cards, same collection)

  RIGHT COLUMN (sticky sidebar):
    CTA card: "Get Free Estimate" + phone
    Full article index (all articles in this cluster)
    Link back to parent service pillar
```

**Article index per service (replicate this count):**
| Service | Pillar Articles (2,000+ w) | Supporting Articles (800+ w) |
|---|---|---|
| Tree Removal | 2 | 3-4 |
| Land Clearing | 2 | 3-4 |
| Stump Grinding | 1 | 2-3 |
| Storm Damage | 1 | 2-3 |
| [others] | 1 | 2 |

**Suggested cluster article titles (tree removal example):**
- `how-much-does-tree-removal-cost` ← embed cost calculator here
- `when-to-remove-a-tree-vs-trim`
- `tree-removal-permits-[state]`
- `emergency-tree-removal-what-to-expect`
- `how-long-does-tree-removal-take`

---

### 5d. Service×Town Page Template
**Schema:** `@graph` [Service + Organization(areaServed:City) + FAQPage + BreadcrumbList]
**Word count:** 1,500–2,500 words
**URL pattern:** `/services/[service]/[town-slug]`

```
PageHero
  H1: "[Service Name] in [Town], [State]"
  Breadcrumbs: Home > Services > [Service] > [Town]

Section 1: Town Intro
  - "[Service Name] in [Town], [State]" — localized paragraph
  - Town stats: population, county, distance from HQ, drive time

Section 2: What We Do in [Town]
  - Service breakdown tailored to local context (terrain, zoning, etc.)

Section 3: [Town] Market Profile
  - Who typically needs this service here (homeowners, developers, towns)
  - Local data if available

Section 4: Features / What's Included
  - Bullet grid of deliverables

Section 5: Process for [Town] Jobs
  - Step-by-step with real local references (mention BMEU equivalent — local dump/recycling)

Section 6: Pricing for [Town] Area
  - Cost range based on computed stats

Section 7: FAQs (7 questions, town-specific numbers)
  - "How much does tree removal cost in [Town], NY?"
  - "Do I need a permit for tree removal in [Town]?"

Section 8: Stats Dashboard
  - Population | County | Distance from HQ | Typical Job Size | Local Disposal Site

Section 9: Cross-links
  - "Other services in [Town]" → sibling service×town pages
  - "All [Service] locations" → back to service pillar

CTASection
```

---

### 5e. Town Location Page Template
**Schema:** `@graph` [Organization(areaServed:City) + FAQPage + BreadcrumbList]
**Word count:** 800–1,200 words
**URL pattern:** `/service-areas/[county]/[town-slug]`

```
PageHero
  H1: "Forestry Services in [Town], [State]"
  Breadcrumbs: Home > Service Areas > [County] > [Town]

Section 1: Local Intro
  - Overview of services available in this town

Section 2: Services Available in [Town]
  - Grid linking to each service×town page for this location

Section 3: Local Context
  - Town type, population, notable areas (parks, developments, etc.)

Section 4: Why Local Matters
  - Proximity, response time, local permit knowledge

Section 5: FAQs

CTASection
```

---

## Part 6 — Schema Implementation Map

### Rule: LocalBusiness ONLY on Homepage
```json
// index.astro ONLY
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": "https://eforestproducts.com/#organization",
  "name": "[BUSINESS NAME]",
  "telephone": "[PHONE]",
  "email": "[EMAIL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[STREET]",
    "addressLocality": "[CITY]",
    "addressRegion": "[STATE]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": [LAT],
    "longitude": [LNG]
  },
  "url": "https://eforestproducts.com",
  "foundingDate": "[YEAR]",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "[County 1]" },
    { "@type": "AdministrativeArea", "name": "[County 2]" }
  ],
  "sameAs": ["[BBB URL]", "[Google Business URL]"]
}
```

### All Other Pages — Organization by @id Reference Only
```json
"provider": { "@id": "https://eforestproducts.com/#organization" }
```

### Service Pillar @graph Block
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "[Service Name] in [Region]",
      "provider": { "@id": "https://eforestproducts.com/#organization" },
      "areaServed": ["[County 1]", "[County 2]", "[County 3]"],
      "description": "[Service description]",
      "url": "https://eforestproducts.com/services/[service-slug]"
    },
    {
      "@type": "Person",
      "@id": "https://eforestproducts.com/about#[owner-slug]",
      "name": "[OWNER FULL NAME]",
      "jobTitle": "[TITLE/CREDENTIAL]",
      "image": "https://eforestproducts.com/images/[owner-photo].jpg",
      "worksFor": { "@id": "https://eforestproducts.com/#organization" },
      "sameAs": ["[LinkedIn URL]"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[Question text]",
          "acceptedAnswer": { "@type": "Answer", "text": "[Answer text]" }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eforestproducts.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://eforestproducts.com/services" },
        { "@type": "ListItem", "position": 3, "name": "[Service Name]" }
      ]
    }
  ]
}
```

### Article @graph Block (cluster articles)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "[Article title]",
      "author": { "@id": "https://eforestproducts.com/about#[owner-slug]" },
      "publisher": { "@id": "https://eforestproducts.com/#organization" },
      "datePublished": "[DATE]",
      "dateModified": "[DATE]",
      "inLanguage": "en-US"
    },
    {
      "@type": "Speakable",
      "cssSelector": ["h1", ".article-lead", ".prose h2"]
    },
    { "@type": "FAQPage", "mainEntity": [...] },
    { "@type": "BreadcrumbList", "itemListElement": [...] }
  ]
}
```

### Schema Types NOT Used
- ❌ `AggregateRating` — anywhere on the site
- ❌ `LocalBusiness` — any page except homepage
- ❌ `Review` — embedded in page schema
- ❌ Duplicate `@context` blocks on same page

---

## Part 7 — Internal Linking Model

### The Full Hub-and-Spoke Map
```
Homepage
  ├── Nav → all 8 service pillars
  ├── Nav → service areas (county hubs)
  ├── Body → services grid (ServiceCard components)
  └── Footer → all pillars + all counties (EVERY PAGE)

Service Pillar (/services/tree-removal)
  ├── → cluster articles (grid section, bidirectional)
  ├── → service×town pages (top 8-10 towns, in-content)
  ├── → related service pillar (contextual, 1-2)
  └── → estimate page (multiple CTAs)

Cluster Article (/services/tree-removal/how-much-does-it-cost)
  ├── → parent pillar (sidebar, "back to Tree Removal")
  ├── → 2-3 sibling articles (bottom related grid)
  ├── → tool/calculator page (contextual)
  └── → estimate page (sidebar CTA)

Service×Town (/services/tree-removal/kingston)
  ├── → parent service pillar (breadcrumb + body)
  ├── → sibling service×town (same town, different service)
  └── → town location page (/service-areas/[county]/kingston)

Town Location (/service-areas/ulster-county/kingston)
  ├── → county hub (breadcrumb)
  ├── → all service×town pages for this town (services grid)
  └── → service pillars (contextual)

County Hub (/service-areas/ulster-county)
  ├── → all town pages in county
  └── → service pillars (contextual)

Footer (every page)
  ├── → all 8 service pillars
  ├── → all 3 county hubs
  └── → estimate, contact, about
```

### Anchor Text Rules
| Link Target | Anchor Text Pattern |
|---|---|
| Service pillar | "[service name] services" or "[service] in [region]" |
| Cluster article | Descriptive ("how much does tree removal cost") |
| Service×Town | "[service] in [town]" |
| Estimate page | "get a free estimate" or "request a quote" |
| Tool page | "[tool name] calculator" or "cost guide" |
| County hub | "[county name] service area" |

---

## Part 8 — Content Production Rules

### E-E-A-T Required Elements (every service page + article)
- [ ] Author byline with owner photo, name, credential, and years of experience
- [ ] Specific operational stat ("X jobs completed", "serving [region] since [YEAR]")
- [ ] Credential callout (arborist cert, ISA membership, licensed & insured, etc.)
- [ ] "Last reviewed: [Month YEAR]" timestamp
- [ ] Real business address referenced in content
- [ ] External citation (state DOT, USDA forestry, ISA guidelines)

### "Insider Tip" Pattern (from CRST "CRST Insider Tip")
Replace with **"[BUSINESS SHORT NAME] Pro Tip"** callout boxes:
```html
<div class="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-5 mb-8">
  <p class="font-semibold text-green-800 mb-1">[SHORT NAME] Pro Tip</p>
  <p class="text-sm text-green-700">[Specific expert insight relevant to section]</p>
</div>
```

### Word Count Minimums
| Page Type | Minimum | Target |
|---|---|---|
| Service pillar | 1,800 | 2,200 |
| Long cluster article | 2,000 | 2,500 |
| Supporting cluster article | 800 | 1,100 |
| Service×Town | 1,500 | 2,000 |
| Town location | 800 | 1,200 |
| Homepage | 800 | 1,200 |
| Tool/calculator page | 1,000 | 1,500 |

### FAQ Rules
- 7–10 questions per service page
- 5–7 questions per cluster article
- 7 questions per service×town (include town name in at least 3)
- All FAQ text must be visible in DOM — no accordion hiding
- All FAQs must have `FAQPage` JSON-LD mapped from same array

---

## Part 9 — Conversion Configuration

### Primary CTA Throughout Site
- Button text: **"Get Free Estimate"**
- URL: `/estimate`
- Color: Brand primary (green or forestry-appropriate)

### Estimate Form (EstimateForm.astro)
```
Fields:
  First Name | Last Name
  Email | Phone
  Service Needed (dropdown — map to SERVICES array)
  Town/Location (free text)
  Brief Project Description (textarea)
  [HONEYPOT HIDDEN FIELD — spam protection]

Submit → POST to [GHL_WEBHOOK_URL]
Success message: "We'll have a quote back to you within [X] business hours."
```

### CTA Placement Per Page
| Location | CTA Type |
|---|---|
| Header top bar | Phone number (click-to-call) |
| Header nav | "Get Estimate" button (sticky) |
| PageHero | "Get Free Estimate" + phone |
| Mid-page (service pages) | Estimate box with phone |
| Article sidebar | "Request a Quote" card (sticky) |
| Every page bottom | CTASection component |

### Trust Signals to Include
- Licensed & Insured badge
- Years in business ("Since [YEAR]")
- Jobs completed count
- Response time commitment ("Same-day response")
- County/region coverage ("Serving [X] counties")
- BBB or Angi profile link (if applicable)
- Real testimonials with names and towns

---

## Part 10 — Calculator Components (Swap for Forestry)

Replace CRST's direct mail calculators with:

| CRST Calculator | eForest Equivalent | Embed Location |
|---|---|---|
| DirectMailCostCalculator | TreeRemovalCostCalculator | `/forestry-tools/tree-removal-cost` + `how-much-does-tree-removal-cost` article |
| EDDMCalculator | LandClearingCostCalculator | `/forestry-tools/land-clearing-cost` + land clearing article |
| PostageCalculator | FirewoodCordCalculator | `/forestry-tools/firewood-calculator` |
| NonprofitSavingsCalculator | (optional: permit fee calculator) | — |
| EnvelopeSizeSelector | LogSize/BoardFeetCalculator (if logging service) | — |

**All calculators:** React `.tsx` components, `client:load`, wrapped in `<div class="not-prose">`, include `SoftwareApplication` JSON-LD schema + Pro Tip callout.

---

## Part 11 — Items Hardcoded to CRST That Must Be Swapped

| CRST-Specific | Replace With |
|---|---|
| "direct mail" / "printing" / "mailing" | forestry service names |
| Sean Griffin | [OWNER NAME] |
| "Mailpiece Design Professional (MDP)" | [OWNER CREDENTIAL] (ISA Arborist, etc.) |
| "2.3 million mail pieces" | "[X] jobs completed" or "[X] acres cleared" |
| USPS, postal rates, postage | state tree removal permits, OSHA, ISA standards |
| Hudson Valley, NY | [SERVICE AREA] |
| Ulster, Dutchess, Orange Counties | [COUNTIES] |
| GoHighLevel webhook URL | [NEW GHL WEBHOOK] or other CRM |
| `crst.net` | `eforestproducts.com` |
| `G-HRBG2H3FE7` (GA4 ID) | [NEW GA4 ID] |
| `/images/sean-griffin.png` | `/images/[owner-photo].jpg` |
| `/images/crst-og.jpg` | `/images/eforest-og.jpg` |
| Blog at `blog.crst.net` | [NEW BLOG URL or internal content collection] |
| USPS external citations | ISA, state DEC/DOT, USDA Forest Service citations |
| BBB profile URL | [NEW BBB URL] |

---

## Part 12 — Minimum Data Required Before First Build

You cannot scaffold this site without these. Fill in before opening Replit:

```
BUSINESS_NAME=
BUSINESS_SHORT_NAME=
OWNER_NAME=
OWNER_CREDENTIAL=         (e.g., "ISA Certified Arborist", "Licensed & Insured")
OWNER_PHOTO_FILE=
STREET_ADDRESS=
CITY=
STATE=
ZIP=
LAT=                      (Google Maps → right-click → "What's here")
LNG=
PHONE=
EMAIL=
FOUNDED_YEAR=
GA4_ID=
GHL_WEBHOOK_URL=
COUNTIES=[comma-separated list]
TOWNS=[comma-separated list with populations if possible]
SERVICES=[comma-separated list]
PRIMARY_COLOR_HEX=        (brand color)
SECONDARY_COLOR_HEX=
```

---

*Blueprint based on full forensic audit of crst.net codebase — April 2026.*
*Every pattern above is in production at crst.net. Zero theoretical recommendations.*
