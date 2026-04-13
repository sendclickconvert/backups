# CRST.net — Forensic SEO Architecture Audit
**Compiled: April 2026 | Source: Full codebase inspection**

---

## Executive Overview

Cornerstone Services (crst.net) is a full-service direct mail company targeting the Hudson Valley, NY market. The site is purpose-built as an **SEO-first, lead-generation machine** with a secondary layer of local authority content. It uses Astro 4.16 in hybrid mode to ship prerendered static HTML at scale (500+ pages) while preserving server-side flexibility for redirects, API endpoints, and payment processing.

The architecture executes three interlocking strategies simultaneously:

1. **Topical authority** — 9 service pillars × ~5 articles each = 50+ cluster articles creating E-E-A-T depth on every service topic
2. **Geographic coverage** — 93 town pages × 2 services (EDDM + Direct Mail) = ~186 programmatic service-location pages, plus 93 traditional location pages = ~280 location URLs total
3. **Tool/resource pages** — Interactive calculators and reference guides that capture high-impression, high-dwell-time traffic from informational queries and funnel it toward estimate requests

Everything is tied together with a **hub-and-spoke internal linking model** that flows PageRank from supporting content to money pages to conversion points.

---

## 1. Tech Stack + Project Structure

### Framework
- **Astro 4.16** — hybrid output mode (`output: 'hybrid'` in `astro.config.mjs`)
- **@astrojs/node** adapter in standalone mode (for Replit autoscale deployment)
- **Tailwind CSS v3.4** + `@tailwindcss/typography` plugin
- **React v19** via `@astrojs/react` — used exclusively for interactive calculator components (`client:load`)
- **TypeScript** — strict mode throughout

### Build Configuration (`astro.config.mjs`)
```
site: 'https://crst.net'
output: 'hybrid'
trailingSlash: 'never'
adapter: node({ mode: 'standalone' })
integrations: [tailwind(), react(), sitemap({ filter: exclude /thank-you|/training })]
```

### File/Folder Architecture
```
src/
  pages/           ~156 route files
    index.astro              → /
    [...slug].astro          → SSR catch-all for 260+ redirects (prerender: false)
    services/
      direct-mail.astro      → /services/direct-mail   [MONEY PILLAR]
      eddm.astro             → /services/eddm
      printing.astro         → /services/printing
      mailing.astro          → /services/mailing
      non-profit-mailing.astro
      graphic-design.astro
      web-design.astro
      school-district-direct-mail.astro
      union-printing.astro
      data-lists.astro
      [+ 5 mailing list sub-pages]
      direct-mail/[slug].astro    → 13 DM cluster articles
      eddm/[slug].astro           → 6 EDDM cluster articles
      printing/[slug].astro       → 6 printing cluster articles
      non-profit-mailing/[slug].astro  → 6 NP articles
      mailing/[slug].astro        → 5 mailing articles
      graphic-design/[slug].astro → 5 GD articles
      web-design/[slug].astro     → 4 WD articles
      school-district-dm/[slug].astro  → 3 school articles
      union-printing/[slug].astro → 3 union articles
      [service]/[town].astro      → ~186 service×location pages
    service-areas/
      index.astro                 → /service-areas
      [county]/index.astro        → 3 county hub pages
      [county]/[location].astro   → 93 town pages
    direct-mail-tools/
      postage-rates.astro
      envelope-sizes.astro
      postal-dictionary.astro
      cornerstone-mailing-permits.astro
      address-change.astro
    resources/          editorial articles + guides
    case-studies/
      index.astro
      [slug].astro        → 11 case studies
    about.astro / about/memberships.astro
    estimate.astro        [PRIMARY CONVERSION PAGE]
    api/
      latest-posts.json.ts    → SSR blog feed endpoint (WordPress headless)
      create-payment-intent.ts → SSR Stripe endpoint

  layouts/
    BaseLayout.astro      → Master layout, canonical, schema, OG, GA4, GHL

  components/
    Header.astro          → Sticky nav + phone + CTA button + cart icon
    Footer.astro          → 4-column service/location map + NAP
    PageHero.astro        → Title + breadcrumbs + wave divider
    CTASection.astro      → Reusable bottom CTA (estimate + phone)
    AuthorByline.astro    → E-E-A-T byline (standard + compact variants)
    EstimateForm.astro    → GHL webhook form + honeypot
    ServiceCard.astro     → Card component for service grids
    calculators/
      DirectMailCostCalculator.tsx
      EDDMCalculator.tsx
      NonprofitSavingsCalculator.tsx
      PostageCalculator.tsx
      EnvelopeSizeSelector.tsx

  data/                   TypeScript data layer
    site.ts               → BUSINESS (NAP), NAV_ITEMS, SERVICES (268 lines)
    locations.ts          → COUNTIES_DATA with 97 geocoded towns (1,659 lines)
    service-location.ts   → SERVICE_CONFIGS, getTownStats(), templates (346 lines)
    town-unique-content.ts → Unique copy overrides for 17 flagged towns (863 lines)
    case-studies.ts       → 11 case study data objects

  content/                Markdown/MDX content collections
    config.ts             → Collection schema definitions
    dm-articles/          → 13 files
    eddm-articles/        → 6 files
    printing-articles/    → 6 files
    nonprofit-articles/   → 6 files
    mailing-articles/     → 5 files
    graphic-design-articles/ → 5 files
    web-design-articles/  → 4 files
    school-articles/      → 3 files
    union-articles/       → 3 files
    data-articles/        → data list articles

  styles/
    global.css            → Tailwind directives + custom utilities

public/
  images/                 WebP assets, testimonials, Sean Griffin photo, OG image
  images/wp/              Migrated WordPress assets
  videos/                 Hero video + 9 training modules
  robots.txt
```

### Key Packages
| Package | Role |
|---|---|
| `@astrojs/sitemap` | Auto-generates sitemap-index.xml, 151 URLs |
| `sharp` | Image processing pipeline |
| `stripe` | Payment intent endpoint |
| `axios` | WordPress blog feed fetching |
| `csv-writer` | Internal auditing tools |
| React 19 | Calculator interactivity |

### Custom Brand Config (tailwind.config.mjs)
- **Colors:** `crst-primary` (navy), `crst-gold`, `crst-red`, `navy-*` scale
- **Fonts:** Plus Jakarta Sans (body), DM Serif Display (headings/display)
- **Typography plugin:** Configured for `.prose` article content

---

## 2. Full Site Architecture

### Page Inventory by Type

| Category | Count | URL Pattern | SEO Purpose |
|---|---|---|---|
| Service pillars | 9 | `/services/[service]` | Primary money pages |
| Service sub-pages | 5+ | `/services/[mailing-list-type]` | Keyword expansion |
| Cluster articles | 51 | `/services/[service]/[slug]` | Topical authority |
| Service×Location | ~186 | `/services/[service]/[town]` | Local + service intent |
| Town location pages | 93 | `/service-areas/[county]/[town]` | Local authority |
| County hubs | 3 | `/service-areas/[county]` | Regional authority |
| Tool/calculator pages | 5 | `/direct-mail-tools/[tool]` | Informational + tool intent |
| Case studies | 11 | `/case-studies/[slug]` | E-E-A-T + trust |
| Resource/guides | ~10 | `/resources/[article]` | Supporting content |
| Landing pages | 2 | `/full-service-...`, `/why-crst-...` | Long-tail commercial |
| Authority pages | 3 | `/about`, `/about/memberships`, `/crst-bbb...` | Trust signals |
| Conversion | 1 | `/estimate` | Lead capture |
| Utility | 5 | `/contact`, `/faq`, `/privacy`, `/terms`, `/thank-you` | Supporting |
| Redirects (SSR) | 260+ | `[...slug].astro` | Legacy URL management |

### Money Pages vs. Supporting Pages
**Primary money pages** (direct revenue intent):
- `/services/direct-mail` — highest-value pillar
- `/services/eddm` — second highest
- `/services/printing`
- `/services/non-profit-mailing`
- `/estimate` — the actual conversion point

**Supporting pages** (feed authority to money pages):
- All 51 cluster articles
- All 93+ location pages
- All tool/calculator pages
- All case studies
- All county hubs

---

## 3. On-Page SEO Implementation

### Metadata System
**BaseLayout.astro** is the single source of truth for all metadata:

```astro
// Title logic
const fullTitle = title === 'Home'
  ? `${BUSINESS.name} | Direct Mail & Printing | New Paltz, NY`
  : `${title} | CRST`;

// Canonical auto-generation
const canonicalUrl = canonical || new URL(Astro.url.pathname, BUSINESS.url).href;

// Default description fallback
const description = description ?? "Hudson Valley's trusted direct mail...since 1998."
```

**Pages override** via props:
```astro
<BaseLayout
  title="2026 USPS Postage Rates: First Class, Marketing Mail & EDDM"
  description="Every 2026 USPS rate in one table..."
  canonical="https://crst.net/direct-mail-tools/postage-rates"
/>
```

**Programmatic pages** use template functions from `service-location.ts`:
```typescript
metaTitleTemplate: (service, town) => `${service.name} in ${town.name}, NY | CRST`,
metaDescTemplate: (service, town) => `...`
```

### H1/H2/H3 Hierarchy
Every page maintains strict heading hierarchy:
- **H1**: Always in `PageHero` component or equivalent hero block. Dynamic pages use `h1Template` from data.
- **H2**: Major section breaks ("How It Works", "What's Included", "Service Area", "FAQs")
- **H3**: Sub-features and process steps

Example from `direct-mail.astro`:
```
H1: Direct Mail Services in Hudson Valley, NY
H2: Full-Service Direct Mail — Everything In-House
H2: EDDM vs. Targeted Direct Mail
H2: How Much Does Direct Mail Cost?
H2: Frequently Asked Questions
```

### FAQ Pattern
FAQs appear on virtually every page. They serve dual purpose:
1. Visible `<dl>` or `<div>` blocks in the DOM (no accordion hiding — required for Google to index)
2. `FAQPage` JSON-LD schema mapped from the same data array

Typical positioning: Near bottom of page, after process/pricing content. Captures long-tail featured-snippet queries.

### Content Section Sequencing (Service Pillar Template)
```
1. Thin author bar (Sean Griffin, MDP) — E-E-A-T signal before hero
2. PageHero — H1 + breadcrumbs
3. Intro paragraph — primary keyword + value prop
4. Stats grid — "2.3M pieces mailed", "Since 1998", "93 municipalities"
5. Mid-page CTA box — "Get a Free Estimate" + phone
6. Key Takeaway summary box — scannable value proposition
7. Deep-dive H2 sections — technical process detail
8. Comparison table — formats, postage classes, best-use
9. Numbered process steps — "How It Works"
10. Service area links — internal linking to location pages
11. Related articles grid — cluster articles pulled via getCollection()
12. FAQ section — 7-10 questions, full text visible
13. CTASection — final bottom CTA
```

### E-E-A-T Signals
- **Experience**: "Since 1998", "2.3 million mail pieces", "25+ years"
- **Expertise**: Sean Griffin's Mailpiece Design Professional (MDP) certification prominently displayed
- **Authority**: BBB A+ badge/page, memberships page, case studies with named clients
- **Trust**: Real address, real phone, real photo of Sean, real testimonials with names

---

## 4. Schema / Structured Data

### Schema Injection Architecture
```
BaseLayout.astro → Default WebPage schema (every page)
  ↓
Page-level override via schema prop → replaces WebPage
  ↓
Slot="head" additions → add secondary schemas alongside default
```

### Complete Schema Type Inventory

| Type | Where Used | Static/Dynamic | Why |
|---|---|---|---|
| `LocalBusiness` | `index.astro` ONLY | Static | Homepage-only per doctrine; full NAP + geo + service catalog |
| `Organization` | All other pages | Dynamic | Provider/publisher reference; `@id: https://crst.net/#organization` |
| `WebPage` | `BaseLayout.astro` (default) | Dynamic (from props) | Base coverage for every page |
| `Service` | All 9 service pillars + [service]/[town] | Mixed | Service offering signal |
| `FAQPage` | Service pages, location pages, articles | Dynamic (data arrays) | Featured snippet targeting |
| `Article` | All 51 cluster articles | Dynamic | Content signals + author |
| `BreadcrumbList` | Service pages, articles, location pages | Dynamic | Navigation path signal |
| `Person` | All article templates (Sean Griffin) | Static within template | Author entity; MDP credential via `hasCredential` |
| `SoftwareApplication` | 5 calculator components | Static | Calculator schema for tool pages |
| `Speakable` | Article templates | Static | Voice search optimization |

### Schema Doctrine (Critical Rules)
1. **`LocalBusiness` is homepage-only** — all other pages use `Organization`
2. **Single `@graph` array per page** — no duplicate context blocks
3. **`@id` consistency**: Organization is always `https://crst.net/#organization`, Sean Griffin is `https://crst.net/about#sean-griffin`
4. **No `AggregateRating`** — removed sitewide to comply with Google's review policy
5. **`WebPage` default from BaseLayout is overridden** (not duplicated) by page schemas

### Example: Service Pillar `@graph` Block (direct-mail.astro)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [{ "@type": "Question", "name": "...", "acceptedAnswer": {...} }]
    },
    {
      "@type": "Service",
      "name": "Direct Mail Services Hudson Valley, NY",
      "provider": { "@id": "https://crst.net/#organization" },
      "areaServed": ["Ulster County", "Dutchess County", "Orange County"]
    },
    {
      "@type": "Person",
      "name": "Sean Griffin",
      "@id": "https://crst.net/about#sean-griffin",
      "jobTitle": "Mailpiece Design Professional",
      "hasCredential": { "@type": "EducationalOccupationalCredential", "credentialCategory": "MDP" },
      "worksFor": { "@id": "https://crst.net/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://crst.net" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://crst.net/services" },
        { "@type": "ListItem", "position": 3, "name": "Direct Mail" }
      ]
    }
  ]
}
```

### Example: LocalBusiness (index.astro only)
```json
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://crst.net/#organization",
  "name": "Cornerstone Services, Inc.",
  "telephone": "(845) 255-5722",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "31 South Ohioville Road",
    "addressLocality": "New Paltz",
    "addressRegion": "NY",
    "postalCode": "12561"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 41.7496, "longitude": -74.0832 },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Ulster County" },
    { "@type": "AdministrativeArea", "name": "Dutchess County" },
    { "@type": "AdministrativeArea", "name": "Orange County" }
  ],
  "foundingDate": "1998",
  "sameAs": ["https://www.bbb.org/..."]
}
```

---

## 5. Internal Linking Map

### The Model: Hybrid Hub-and-Spoke with Content Clustering

```
HOMEPAGE
    │
    ├── SERVICES HUB (/services)
    │       │
    │       ├── Service Pillar (/services/direct-mail)
    │       │       ├── Cluster Articles (13x) ← bidirectional links
    │       │       └── Service×Town Pages (92x) ← bidirectional links
    │       │
    │       ├── Service Pillar (/services/eddm)
    │       │       ├── Cluster Articles (6x)
    │       │       └── Service×Town Pages (92x)
    │       │
    │       └── [7 more pillars, same pattern]
    │
    ├── SERVICE AREAS HUB (/service-areas)
    │       ├── County Hub (3x) → lists all towns
    │       └── Town Pages (93x)
    │               └── Links back to Service×Town pages
    │
    ├── TOOLS HUB (/direct-mail-tools)
    │       └── Tool Pages (5x) → link to calculators on articles
    │
    └── CASE STUDIES HUB (/case-studies)
            └── Individual Studies (11x)
```

### Navigation Links (Header.astro)
- **Services** dropdown → `/services` + all 9 service pillars
- **Service Areas** dropdown → `/service-areas` + 3 county pages
- **Resources** dropdown → `/resources` + key tool pages
- **Case Studies** → `/case-studies`
- **Blog** → external `https://blog.crst.net`
- **About** → `/about`, `/about/memberships`, `/contact`

### Footer Links (Footer.astro) — 4-column grid
Every page carries footer links to:
- All 9 service pages
- 3 county pages
- Key tool pages
- Corporate pages (About, Contact, Privacy)
- Full NAP block

This ensures **every page passes link equity to all money pages**.

### Contextual In-Content Links

**Service pillars link to:**
- Their cluster articles ("Read our guide to...")
- Related service pages ("See also: Mailing List Services")
- Location pages ("Serving Kingston →")
- Tool pages ("Check postage rates →")

**Cluster articles link to:**
- Their parent pillar (pillar ↔ cluster is bidirectional)
- 2-3 related articles in same cluster
- Relevant tool/calculator pages
- Estimate page (CTA)

**Service×Town pages link to:**
- Parent service pillar
- Same town's other service×town page (cross-service)
- Parent town's service-areas page
- BMEU facility location

**Town location pages link to:**
- All service×town pages for that town
- County hub page
- Service pillars

### Silo Architecture
The site uses a **3-level silo per service**:
1. Service pillar (hub)
2. Cluster articles (support pillar, link up)
3. Service×Town pages (support pillar with local signal, link up)

Silos are deliberately "leaky" — cross-links between silos exist where contextually appropriate (e.g., EDDM article links to Direct Mail pricing article).

---

## 6. Local SEO Elements

### NAP (Name, Address, Phone) — Single Source of Truth
Defined once in `src/data/site.ts`:
```typescript
export const BUSINESS = {
  name: 'Cornerstone Services, Inc.',
  shortName: 'CRST',
  address: {
    street: '31 South Ohioville Road',
    city: 'New Paltz',
    state: 'NY',
    zip: '12561',
    full: '31 South Ohioville Road, New Paltz, NY 12561',
  },
  phone: '(845) 255-5722',
  email: 'info@crst.net',
  url: 'https://crst.net',
  founded: 1998,
};
```

NAP is injected into: BaseLayout (via schema), Header (phone), Footer (full NAP block), all JSON-LD schemas.

### Geographic Data Layer (`locations.ts` — 1,659 lines)
Each of 97 town objects contains:
```typescript
{
  name: 'Kingston',
  slug: 'kingston',
  county: 'ulster',
  type: 'city',           // city | town | village | hamlet
  zip: ['12401'],
  population: 23456,
  lat: 41.9270,
  lng: -73.9974,
  notableOrgs: ['...'],
  clientTypes: ['restaurants', 'healthcare', 'real-estate'],
}
```

### Town Page Generation (`service-areas/[county]/[location].astro`)
`getStaticPaths()` iterates `COUNTIES_DATA` to generate all 93 location pages. Each page includes:
- Google Map embed centered on town coordinates
- Population, type, ZIP
- List of local industries
- Links to service×town pages for that location
- Local `Organization` schema with `areaServed: { @type: City, name: "[Town], NY" }`

### 17 Flagged Towns — Unique Content (`town-unique-content.ts`)
High-priority towns receive fully custom H1, intro paragraph, neighborhood notes, and FAQs — not generated from templates. This file is 863 lines.

### Service×Town Computed Stats (`service-location.ts`)
`getTownStats()` computes on-the-fly:
- Distance from New Paltz HQ (haversine formula)
- Drive time estimate
- Estimated carrier routes (population ÷ household size)
- EDDM cost range (routes × $0.242)
- List cost estimate
- Nearest BMEU facility
- Town size label (large/mid/small/rural) → controls content variant

### County Hub Pages
3 county pages (`ulster-county`, `dutchess-county`, `orange-county`) each feature:
- Google Maps embed
- Population statistics
- Anchor city highlights
- Complete town listing with links
- County-level `Service` schema with all towns in `areaServed`

---

## 7. Conversion Elements

### CTA Placement Strategy
| Placement | Component/Element | Every Page? |
|---|---|---|
| Header top bar | Phone number | Yes |
| Header nav | "Get Estimate" btn-primary | Yes |
| Hero section | CTA button | Most pages |
| Mid-page | Inline CTA box (estimate + phone) | Service pages |
| Bottom of page | `CTASection` component | All pages |
| Article sidebar | Sticky "Request Quote" card | All articles |

### Primary Conversion Flow
```
Entry (any page)
  → Trust signals (byline, stats, BBB)
  → Mid-page CTA or sidebar
  → /estimate
  → EstimateForm.astro (GHL webhook)
  → Thank you page (noindex)
```

### EstimateForm.astro
- Fields: First name, Last name, Email, Phone, Company, Project Details
- Spam protection: Honeypot hidden field
- Backend: POST to GoHighLevel webhook URL
- UX: Loading spinner, inline success message ("We'll have a quote back within one business day")
- No page reload — AJAX submission

### Header.astro — Sticky Conversion Bar
```
[Phone: (845) 255-5722]   [info@crst.net]      [New Paltz, NY]   ← Top bar
[Logo] [Services ▾] [Service Areas ▾] [Resources ▾] ... [🛒] [Get Estimate]  ← Sticky nav
```
- Sticky (`position: sticky; top: 0`)
- Cart icon → `/resources/payments` (for existing customers)
- Mobile: Hamburger → full-screen overlay with estimate CTA

### CTASection Component (every page bottom)
```html
<section class="bg-crst-primary text-white py-16">
  <h2>Ready to Start Your Next Mailing?</h2>
  <p>[value prop text]</p>
  <a href="/estimate" class="btn-primary">Get Free Estimate</a>
  <a href="tel:8452555722" class="btn-secondary">Call (845) 255-5722</a>
</section>
```

### Trust Signals
- Testimonials on homepage (3x with real names and photos)
- BBB A+ rating referenced in schema `sameAs`, on `/about/memberships`, and the dedicated `/crst-better-business-bureau-a-direct-mailer` page
- Case studies (11x) with named client types
- "2.3 million mail pieces" stat used sitewide
- "Since 1998" — 26 years of operation
- Sean Griffin's photo and MDP credential on all service/article pages

---

## 8. Content Strategy

### The Pillar + Cluster Model
Each of 9 services has:
- **1 pillar page** (the service hub at `/services/[service]`)
- **3-6 cluster articles** (at `/services/[service]/[slug]`)
- Bidirectional links between pillar ↔ all cluster articles

The pillar renders a grid of its cluster articles (via `getCollection()`), and every article links back to its pillar in the sidebar. This creates a tight topical authority signal for each service.

### Article Templates — All Cluster Articles
All 51 cluster articles follow a uniform structure:

```
PageHero with breadcrumbs
  ↓
Two-column layout:
  LEFT (main content):
    - TOC ("In This Article" box with H2 anchor links)
    - Slug-conditional calculator (where applicable)
    - Article prose (MDX rendered)
    - AuthorByline (full version)
    - Visible FAQ section (not accordion)
    - Related articles grid (3 cards, same collection)
  
  RIGHT (sticky sidebar):
    - CTA card ("Request Quote" + phone)
    - Complete article index (all articles in this cluster)
    - Link back to parent pillar
```

### Five Article Sizes (Spec)
- **Long pillar cluster articles**: 2,100–2,700 words (5 per service)
- **Supporting cluster articles**: 800–1,100 words (remaining articles)

### Service×Location Template (`[service]/[town].astro`)
3,000–3,440 words per page, structured as:
1. Localized H1 ("EDDM in Kingston, NY")
2. Town intro with computed stats (pop, households, routes, distance)
3. Market Profile (variant based on town size: large/mid/small/rural)
4. Features grid
5. Process section with real cost numbers
6. Industry Applications (dynamically generated from `clientTypes`)
7. Who We Serve grid
8. 7 town-specific FAQs with unique numbers per town
9. Stats dashboard (pop, households, routes, ZIP, distance, BMEU)
10. Cross-link to sibling service+town page

### Programmatic SEO Controls
- `ENABLED_COUNTIES` array controls geographic rollout in `service-location.ts`
- Town size label (`large|mid|small|rural`) selects content variant
- `SERVICE_CONFIGS` array defines which services get ×location pages — adding a new service to this array auto-generates ~92 new pages

### Content Authority Signals
- **Named author** (Sean Griffin, MDP) on all articles and service pages
- **Specific credentials** cited (USPS MDP certification)
- **Specific operational data** cited ("2.3 million mail pieces", "31 S Ohioville Rd")
- **Date stamped** ("Last reviewed: January 2026")
- **External citations** (USPS DMM, BBB profile, industry associations)
- **Case studies** with measurable outcomes (real client results)

---

## 9. Technical SEO

### Canonicals
```astro
// BaseLayout.astro
const canonicalUrl = canonical || new URL(Astro.url.pathname, BUSINESS.url).href;
<link rel="canonical" href={canonicalUrl} />
```
- Auto-generated for every page
- Manual override available via `canonical` prop
- All internal links, schema URLs, and sitemap entries follow `trailingSlash: 'never'`

### Robots.txt (`public/robots.txt`)
```
User-agent: *
Allow: /
Sitemap: https://crst.net/sitemap-index.xml
```

### Sitemap (`@astrojs/sitemap`)
- Auto-generated as `sitemap-index.xml`
- Filter excludes: `/thank-you`, `/training`
- ~151 canonical URLs included (excludes programmatic duplicates)

### Redirect System — Two Layers

**Layer 1: `astro.config.mjs` static redirects**
260+ 301 redirects defined at config level:
```javascript
redirects: {
  '/direct-mail-new-paltz': '/service-areas/ulster-county/new-paltz',
  '/contact-us/': '/contact',
  '/crst-daily/some-post/': 'https://blog.crst.net/some-post/',
  // ...260+ more
}
```

**Layer 2: `[...slug].astro` catch-all SSR handler**
```javascript
export const prerender = false; // Must be SSR

// exactRedirects map for additional 301s
// Pattern matching for:
//   /category/* → 410 Gone
//   /tag/* → 410 Gone
//   /crst-daily/* → https://blog.crst.net (catch remaining)
//   Malformed URLs (trailing //1000 etc.) → cleaned redirect
```

### Open Graph / Social Meta
All in `BaseLayout.astro`:
```html
<meta property="og:type" content="website" />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content="{BUSINESS.url}/images/crst-og.jpg" />
<meta property="og:site_name" content="Cornerstone Services, Inc." />
<meta name="twitter:card" content="summary_large_image" />
```

### Image Optimization
- Primary format: WebP throughout `public/images/`
- Legacy: Some `.jpg/.png` remain (migrated WordPress assets)
- `loading="lazy"` on non-critical images (ServiceCard, testimonials)
- `loading="eager"` on LCP-critical images (case study hero)
- Alt text: Dynamically populated from data objects

### Hybrid Rendering / Prerender
- **SSG (default)**: All service pages, location pages, articles prerendered at build
- **SSR (explicit)**: `[...slug].astro` (`export const prerender = false`) for dynamic redirects
- **SSR API routes**: `/api/latest-posts.json.ts`, `/api/create-payment-intent.ts`

### Indexing Controls
- `noIndex` prop on BaseLayout → `<meta name="robots" content="noindex, nofollow" />`
- Applied to: `/thank-you`, `/training/portal/` and all training sub-pages
- Training portal also has no navigation links (crawl isolation)

### JavaScript Handling
- Astro ships zero JS by default (all static rendering)
- JS only loaded for: React calculators (`client:load`), GHL chat widget (deferred), hero video (conditional mobile/desktop), `animate-on-scroll` IntersectionObserver (in BaseLayout)
- No hydration overhead on non-calculator pages

---

## 10. Design Patterns That Support SEO

### Layout Width / Readability
- `container-wide` = max-w-7xl (content hub) with responsive padding
- Article content: `max-w-4xl` or two-column `prose` + sidebar layout
- Prose font size optimized for readability (Plus Jakarta Sans, comfortable line-height via typography plugin)

### Section Hierarchy Pattern
Every page uses visual hierarchy to support E-E-A-T and user flow:
1. Dark navy hero (trust, authority)
2. Light gray section (content)
3. White section (data/tables)
4. Muted section (stats/callouts)
5. Dark navy `CTASection` (conversion)

### Trust-Building Design
- Author photo (real headshot, not stock) in byline
- Testimonials with real photos (not initials/avatars)
- BBB badge in footer
- "Since 1998" in stats grid
- Google Maps embed on county and town pages (verifies physical presence)
- Schema `geo` coordinates (lat/lng) on location pages

### Mobile Considerations
- Sticky header ensures phone number and CTA are always accessible
- Mobile menu: Full-screen overlay with "Get Free Estimate" as primary mobile CTA
- Hero video: Conditional — only loads on desktop (poster image on mobile, saves bandwidth)
- Tables: `overflow-x-auto` wrappers prevent horizontal scroll breaking layout
- Calculator components: Fully responsive React UI

### PageHero Component — Consistent Landing Signal
All interior pages use `PageHero.astro`:
- Navy gradient background matching home hero tone
- Subtle grid texture pattern
- Wave SVG divider at bottom (smooth content transition)
- Breadcrumbs automatically rendered if provided
- `BreadcrumbList` JSON-LD auto-generated

---

## 11. Replication Blueprint for a New Project

### What to Keep Exactly
1. **Astro + hybrid output + @astrojs/node** — This stack is perfect for this content type. Static builds of location/article pages, SSR for redirects and APIs.
2. **`BaseLayout.astro` pattern** — Single file managing all `<head>` metadata, canonical, OG, schema default. Every page inherits; specific pages override via props or `slot="head"`.
3. **Data-first architecture** (`src/data/`) — All business data, locations, and content templates in TypeScript files. Never hardcode business info in templates.
4. **`trailingSlash: 'never'` + canonical auto-generation** — Set once, enforced everywhere.
5. **Two-layer redirect system** — Config-level for clean legacy management, SSR catch-all for edge cases and 410 handling.
6. **Pillar + cluster bidirectional linking** — Every cluster article links to its pillar; every pillar renders its cluster grid.
7. **`CTASection`, `PageHero`, `AuthorByline`** as separate reusable components — Never embed CTA HTML inline.
8. **GHL webhook form** — Keep estimate form submission through GHL for CRM lead management.
9. **NAP in single `site.ts` file** — Import everywhere, never hardcode.
10. **`@graph` schema with consistent `@id` references** — The `Organization` entity as persistent `@id` is the right approach.

### What to Improve for the Next Build
1. **Town unique content coverage** — Currently only 17/93 towns have unique content. Expand to all high-value towns. Use AI-assisted generation with human review.
2. **Image handling** — Move to Astro's native `<Image />` component for automatic WebP conversion and `srcset` generation. Currently using manual WebP files.
3. **Blog integration** — The WordPress headless blog at `blog.crst.net` creates a domain split. Consider migrating blog content into Astro content collections for unified domain authority.
4. **Structured review data** — Currently no reviews in schema (removed AggregateRating). Consider a proper review schema strategy using verified third-party review sources.
5. **Core Web Vitals** — Add `<link rel="preconnect">` for Google Fonts in `BaseLayout`. Defer the GHL widget more aggressively.
6. **Calculator pricing constants** — Align calculator rates with the published rate tables on content pages to avoid user-facing inconsistencies.
7. **sitemap priority/changefreq** — Add explicit priority settings: money pages = 0.9, location pages = 0.7, articles = 0.6, utility = 0.3.

### What to Simplify
1. **The redirect system** — The `[...slug].astro` catch-all with 260+ entries should be documented in a separate CSV and loaded dynamically, not hardcoded in the file.
2. **The `locations.ts` file** — At 1,659 lines it's manageable but a JSON or database-backed approach would scale better for 200+ locations.
3. **The service×location template** — The computed stats logic could be extracted to a utility library for easier testing.

### Recommended Page Types for a New Build
| Priority | Page Type | URL Pattern | Notes |
|---|---|---|---|
| P0 | Homepage | `/` | LocalBusiness schema, hero video, testimonials, latest posts |
| P0 | Service pillars | `/services/[service]` | One per core service; full E-E-A-T template |
| P0 | Estimate/Contact | `/estimate` | GHL webhook form; honeypot; single CTA page |
| P1 | Cluster articles | `/services/[service]/[slug]` | 4-6 per service; TOC + sidebar + author byline |
| P1 | County hubs | `/service-areas/[county]` | Map embed + full town listing |
| P2 | Town pages | `/service-areas/[county]/[town]` | Programmatic; unique content for top 20 towns |
| P2 | Service×Town | `/services/[service]/[town]` | Programmatic; computed local stats |
| P3 | Tool pages | `/tools/[tool]` | Calculator + reference content |
| P3 | Case studies | `/case-studies/[slug]` | Article schema + industry filter |
| P4 | Authority pages | `/about`, `/about/memberships` | BBB, association memberships |

### Recommended Schema Stack
```
Every page:    WebPage (BaseLayout default)
Homepage only: LocalBusiness (with geo + areaServed + offerCatalog)
All others:    Organization @id reference (not full object)
Service pages: @graph[Service + Person(author) + FAQPage + BreadcrumbList]
Articles:      @graph[Article + Person(author) + FAQPage + BreadcrumbList + Speakable]
Location pages:@graph[Service + Organization(areaServed:City) + FAQPage + BreadcrumbList]
Tools/Calc:    SoftwareApplication (in component, via script tag)
```

### Recommended Internal Linking Structure
```
Homepage → all service pillars (nav + body)
Service pillar → all cluster articles (grid section)
Cluster article → parent pillar (sidebar) + 2-3 related articles (bottom grid)
Service pillar → top 5 location pages (in-content)
Service×Town → parent pillar + sibling service×town + town location page
Town location → all service×town pages for that town + county hub
County hub → all towns in county + service pillars
Tool page → related service pillar + related calculators
Footer → all service pillars + all county hubs (on every page)
```

---

## 12. Final Deliverable — Step-by-Step Implementation Plan

### Phase 1: Foundation (Week 1)
1. Initialize Astro 4.x project with `output: 'hybrid'`, `@astrojs/node`, Tailwind
2. Create `src/data/site.ts` with BUSINESS NAP object and SERVICES array
3. Build `BaseLayout.astro` — title logic, canonical auto-gen, OG tags, default WebPage schema, `slot="head"`
4. Build `Header.astro` — sticky, phone in top bar, service dropdown nav, "Get Estimate" btn
5. Build `Footer.astro` — 4-column grid, all service + county links, full NAP
6. Build `PageHero.astro` — title/subtitle props, breadcrumbs, `BreadcrumbList` schema auto-gen, wave divider
7. Build `CTASection.astro` — navy background, estimate + phone CTAs
8. Build `AuthorByline.astro` — standard and compact variants
9. Set `trailingSlash: 'never'` and configure `robots.txt` + sitemap exclusions
10. Add `[...slug].astro` SSR catch-all with `prerender: false` and redirect map

### Phase 2: Money Pages (Week 2)
11. Build each service pillar page with full E-E-A-T template (stats, CTA, FAQ, process steps)
12. Implement `@graph` schema per service (Service + Person + FAQPage + BreadcrumbList)
13. Build `estimate.astro` with GHL webhook form + honeypot
14. Build homepage with LocalBusiness schema, hero, testimonials, services grid
15. Build `about.astro` and `about/memberships.astro`

### Phase 3: Content Architecture (Week 3)
16. Create content collections in `src/content/config.ts` — one collection per service
17. Write 4-6 cluster articles per priority service (MDX format)
18. Build `[slug].astro` template for each service — TOC, sidebar, author byline, related grid, FAQ, calculator injection
19. Add React integration (`@astrojs/react`) and build calculator components
20. Add `getCollection()` call to each pillar page to render cluster article grid

### Phase 4: Local SEO (Week 4)
21. Build `src/data/locations.ts` with all target towns (geocoded lat/lng, population, types)
22. Build `service-areas/[county]/index.astro` — county hubs with maps
23. Build `service-areas/[county]/[location].astro` — dynamic town pages via `getStaticPaths()`
24. Build `src/data/service-location.ts` with `getTownStats()` and content templates
25. Build `services/[service]/[town].astro` — service×location programmatic pages
26. Write `src/data/town-unique-content.ts` for top 20-30 priority towns

### Phase 5: Trust + Conversion (Week 5)
27. Build case studies — data file + `[slug].astro` template with Article schema
28. Build BBB/memberships authority page
29. Add testimonial section to homepage (real photos, real names)
30. Build tool/resource pages with calculator embeds

### Phase 6: Technical SEO Cleanup (Week 6)
31. Audit all canonical URLs — confirm no trailing slashes in any internal link
32. Add all legacy redirects to `astro.config.mjs`
33. Verify sitemap output — check all money pages included, utility pages excluded
34. Add `noIndex` to thank-you and training pages
35. Optimize images — WebP format, lazy loading, eager on LCP images
36. Add `<link rel="preconnect">` for external font/tracking domains in BaseLayout
37. Test Core Web Vitals — defer non-critical scripts, check hero image/video loading
38. Validate all schema with Google's Rich Results Test
39. Submit sitemap to Google Search Console

---

*This document reflects the exact implementation in the codebase as of April 2026.*
*Every claim is backed by inspection of specific files in `src/`.*
