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