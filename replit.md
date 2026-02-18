# Cornerstone Services (CRST) Website

## Overview
Full-service website for Cornerstone Services, Inc. — Hudson Valley's trusted direct mail, printing, and data services company since 1998. Built with Astro 4.16 + Tailwind CSS. BBB A+ rated, serving Ulster, Dutchess, and Orange Counties.

## Recent Changes
- **2026-02-15**: Deployed blog framework (8 existing posts + 31 Content Hub 1 posts = 39 total blog posts)
- **2026-02-15**: Integrated Postcard Printing Content Hub (1 pillar + 30 supporting articles, 5 clusters)
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
├── components/         # Astro components (Header, Footer, PageHero, CTASection, BlogPostHead, etc.)
├── data/              # Data files (site.ts, blog.ts, case-studies.ts, postcard-printing-hub.ts)
├── layouts/           # BaseLayout.astro (with head slot for blog SEO injection)
├── pages/             # Routes
│   ├── blog/          # Blog index + [slug].astro for all posts
│   ├── case-studies/  # Case studies index + [slug].astro
│   ├── services/      # Service pages
│   └── service-areas/ # Location pages
├── styles/            # global.css (Tailwind + Google Fonts)
└── types/             # TypeScript type definitions
public/
├── images/
│   ├── wp/            # WordPress media library (867 files, year-based subdirs)
│   ├── blog/          # Blog featured images (placeholder locations)
│   └── sean-griffen.jpg # Author photo
```

### Blog System
- **Interface**: BlogPost in src/data/blog.ts (title, slug, date, authorKey, category, tags, content, featuredImage, keyTakeaway, faqs, sources, etc.)
- **Author**: Sean Griffen (key: 'sean-griffen') in AUTHORS record
- **Hub 1**: Postcard Printing (31 posts) in src/data/postcard-printing-hub.ts
- **SEO**: BlogPosting schema, FAQPage schema, BreadcrumbList, OG tags, Twitter Cards, Speakable
- **Components**: BlogPostHead (schema/meta), TableOfContents (auto-generated), ReadingProgress (scroll bar)
- **Categories**: Direct Mail, Mailing, Printing, Data Lists, Graphic Design, How-To, Mailing Regulations, EDDM, Industry News

### Phone Numbers
- Display: (845) 255-5722
- Tracking (tel: links): 845-393-6770

### Key Technical Notes
- Astro 4.16 requires @astrojs/sitemap v3.2.0
- BaseLayout.astro has `<slot name="head" />` for blog SEO injection
- Dancing Script font loaded for Sean Griffin's signature on About page
- Blog featured images may not exist yet — template handles gracefully

## User Preferences
- Clean footer layout without map embed
- Shopping cart icon in header for order page access
- White bird on blue circular favicon (inverted from logo colors)
