# The Property Father - Real Estate Lead Generation Website

## Overview

This is a real estate lead generation website for "The Property Father," a cash home buying business serving Long Island, NY (Suffolk and Nassau Counties). The application is a full-stack TypeScript project with a React frontend and Express backend. It allows potential home sellers to learn about the cash home buying process and submit their property information through contact forms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom CSS variables for theming (navy/gold color scheme)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with hot module replacement

The frontend follows a page-based structure under `client/src/pages/` with reusable components in `client/src/components/`. Each page uses a shared Layout component that includes Header, Footer, and SEO metadata. The site includes multiple landing pages for different situations (divorce, foreclosure, probate, etc.) and locations (Suffolk County, Nassau County, and 45 individual Nassau County town pages).

### Nassau County Town Pages (added 2026-02-11)
- 45 individual town landing pages under `/locations/nassau-county/[town-slug]`
- Data-driven: all content in `client/src/data/nassau-towns.ts`, rendered by single component `client/src/pages/locations/NassauTownPage.tsx`
- Each page has: unique SEO metadata, Service schema markup (JSON-LD), body content with H2 sections, CTA with phone/form, internal links
- Dynamic route in App.tsx: `/locations/nassau-county/:town`
- Nassau County parent page (`/locations/nassau-county`) links to all 45 town pages
- All 45 URLs added to `client/public/sitemap.xml`

### Suffolk County Town Pages (added 2026-02-11, updated 2026-02-26)
- 38 individual town landing pages under `/locations/suffolk-county/[town-slug]`
- Data-driven: all content in `client/src/data/suffolk-towns.ts`, rendered by single component `client/src/pages/locations/SuffolkTownPage.tsx`
- Each page has: unique SEO metadata, Service schema markup (JSON-LD), body content with H2 sections, CTA with phone/form, internal links
- Dynamic route in App.tsx: `/locations/suffolk-county/:town`
- Suffolk County parent page (`/locations/suffolk-county`) links to all 38 town pages
- All 38 URLs added to `client/public/sitemap.xml`
- **Added 2026-02-26**: Amityville (village in Town of Babylon, ZIP 11701) and Wyandanch (CDP in Town of Babylon, ZIP 11798)

### E-E-A-T & Schema Enhancements (updated 2026-02-26)
- **AggregateRating**: Added to LocalBusiness schema in `SchemaMarkup.tsx` (5.0 rating, 3 reviews)
- **BreadcrumbList Schema**: `BreadcrumbSchema` component in `SchemaMarkup.tsx`, added to all pages except Home
- **Visual Breadcrumbs**: Clickable breadcrumb navigation on all inner pages (Home > Section > Page)
- **Google Maps Embed**: iframe maps on all town pages (z=13) and county pages (z=11)
- **GeoCoordinates**: Added to Service schema on town pages via `nassauTownCoordinates` / `suffolkTownCoordinates`
- **Author Byline**: `AuthorByline.tsx` — "Written by Steven Santiago, CEO" displayed on town pages, county pages, and situation pages
- **FAQSchema**: FAQPage structured data on both county pages and town pages (where FAQ data exists)
- **County Pages (E-E-A-T Optimized)**: Both NassauCounty.tsx and SuffolkCounty.tsx rewritten with:
  - Why Homeowners Choose Cash Buyers (market data, local challenges)
  - How Cash Buying Process Works (6-step process, NY legal citations: § 462, § 240, § 484)
  - What Cash Buyers Pay (ARV formula, side-by-side comparison with traditional sale)
  - Situations section with internal links to blog posts at blog.thepropertyfather.com
  - Towns list with brief descriptions
  - Market Data section (median price, DOM, tax rate with sources)
  - FAQ accordion with 5 county-specific Q&As + FAQPage schema
  - Legal disclaimer footer
- **Town Page Templates Enhanced**: Both NassauTownPage.tsx and SuffolkTownPage.tsx now support:
  - Optional FAQ accordion with FAQPage schema (from `town.faqs`)
  - Optional neighborhoods/villages section (from `town.neighborhoods`)
  - ZIP codes, school district, LIRR station display
  - "Helpful Resources" section linking to blog posts
  - Legal disclaimer
- **TownData Interface Extended**: New optional fields: `faqs`, `neighborhoods`, `zipCodes`, `schoolDistrict`, `lirr`, `medianPrice`, `medianPriceSource`
- **All 83 Towns Fully Populated (updated 2026-02-26)**: Every town entry now has 3 FAQs, neighborhoods list, ZIP codes, school district, LIRR station (where applicable), median price range with Redfin/Homes.com citation. No thin pages remain. Total: 45 Nassau + 38 Suffolk = 83 town pages.
- **Blog Internal Links**: Verified blog URLs linked throughout (selling situations, process, comparisons, trust, locations)
- **Situation Links Fixed**: "Selling with Liens" and "Relocating" links on county pages now point to live blog URLs (blog.thepropertyfather.com) instead of href="#". External links render as `<a>` tags, internal links use wouter `<Link>`.
- **E-E-A-T Audit Tool**: Python script at `tools/eeat_extractor.py`

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints under `/api/` prefix
- **Development**: Vite dev server integration for HMR during development
- **Production**: Static file serving from built assets

The backend currently uses in-memory storage (`MemStorage` class) for contact form submissions. The codebase is prepared for PostgreSQL integration with Drizzle ORM schema definitions in `shared/schema.ts`.

### Data Storage
- **Current**: In-memory storage using JavaScript Maps
- **Prepared For**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines users table and contact form validation
- **Migrations**: Drizzle Kit configured to output to `./migrations` directory

The storage interface (`IStorage`) is abstracted to allow easy switching between memory and database implementations.

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- Database schema definitions (Drizzle ORM)
- Zod validation schemas for type-safe form handling
- TypeScript types exported for cross-boundary use

### Build System
- Development: `tsx` for running TypeScript directly
- Production build: Custom script using esbuild for server and Vite for client
- Output: `dist/` directory with `index.cjs` (server) and `public/` (client assets)

## External Dependencies

### UI/Component Libraries
- **Radix UI**: Headless component primitives for accessible UI
- **shadcn/ui**: Pre-built component library using Radix and Tailwind
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality

### Database & ORM
- **Drizzle ORM**: SQL query builder and schema management
- **Drizzle Zod**: Automatic Zod schema generation from Drizzle tables
- **pg**: PostgreSQL client (prepared for future use)
- **connect-pg-simple**: PostgreSQL session store (prepared for future use)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation and type inference
- **@hookform/resolvers**: Zod integration for React Hook Form

### Fonts & Styling
- **Google Fonts**: Poppins and Playfair Display fonts loaded via CDN
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management

### Development Tools
- **Vite**: Build tool and dev server
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner for Replit environment