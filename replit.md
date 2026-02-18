# Cornerstone Services (CRST) Website

## Overview
Full-service website for Cornerstone Services, Inc. — Hudson Valley's trusted direct mail, printing, and data services company since 1998. Built with Astro 4.16 + Tailwind CSS. BBB A+ rated, serving Ulster, Dutchess, and Orange Counties.

## Recent Changes
- **2026-02-18**: Removed all blog content (blog moving to blog.crst.net subdomain). Deleted blog pages, data files, components. Updated legacy redirects to point to blog.crst.net. Removed Blog from navigation.
- **2026-02-18**: Accuracy audit — fixed Kerhonkson town assignment (Wawarsing, not Rochester), updated Rochester intro.
- **2026-02-15**: Added Sean Griffin's signature under photo on About page
- **2026-02-15**: Added Sean H. Griffin's professional photo to About page
- **2026-02-15**: Made industry filter tags clickable on case studies page
- **2026-02-15**: Integrated 867 WordPress media library files

## Project Architecture

### Tech Stack
- **Framework**: Astro 4.16 (static site generator)
- **Styling**: Tailwind CSS
- **Deployment**: Replit static hosting
- **Package Manager**: npm

### Key Directories
```
src/
├── components/         # Astro components (Header, Footer, PageHero, CTASection, etc.)
├── data/              # Data files (site.ts, case-studies.ts, locations.ts)
├── layouts/           # BaseLayout.astro
├── pages/             # Routes
│   ├── case-studies/  # Case studies index + [slug].astro
│   ├── resources/     # Resource/tool pages
│   ├── services/      # Service pages (9 services)
│   └── service-areas/ # Location pages (~97 locations across 3 counties)
├── styles/            # global.css (Tailwind + Google Fonts)
└── types/             # TypeScript type definitions
public/
├── images/
│   ├── wp/            # WordPress media library (867 files, year-based subdirs)
│   └── sean-griffen.jpg # Author photo
```

### Build Output
- **134 Astro pages** + redirect pages for legacy WordPress URLs
- Blog has been moved to blog.crst.net (separate subdomain)
- Legacy blog URLs redirect to blog.crst.net via astro.config.mjs redirects

### Phone Numbers
- Display: (845) 255-5722
- Tracking (tel: links): 845-393-6770
- Note: phoneClean in site.ts intentionally uses tracking number for tel: links

### Key Technical Notes
- Astro 4.16 requires @astrojs/sitemap v3.2.0
- Dancing Script font loaded for Sean Griffin's signature on About page
- Vite config has `allowedHosts: true` for Replit iframe compatibility
- Legacy WordPress URLs handled via redirects in astro.config.mjs

## User Preferences
- Clean footer layout without map embed
- Shopping cart icon in header for order page access
- White bird on blue circular favicon (inverted from logo colors)
