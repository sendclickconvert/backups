# Cornerstone Services (CRST) Website

## Overview
Full-service website for Cornerstone Services, Inc. — Hudson Valley's trusted direct mail, printing, and data services company since 1998. Built with Astro 4.16 + Tailwind CSS. BBB A+ rated, serving Ulster, Dutchess, and Orange Counties.

## Recent Changes
- **2026-02-23**: Major SEO batch — migrated 4 resource pages from /resources/ to /direct-mail-tools/ with full redirect chains: postage-rates (32K impressions), cornerstone-mailing-permits (8K, meta rewrite), postal-dictionary (30K), address-change (25K), envelope-sizes (54K). Created 2 new pages: /non-profit-mailing-application/ (moved from /resources/non-profit-mailing/, 9K impressions) and /how-to-get-a-refund-on-postage-a-guide-to-post-office-application-to-refund-postage/ (new page, 8.9K impressions, PS Form 3533 guide with sidebar layout). Added internal links across all 8 pages for SEO equity flow. Updated catch-all exceptions in [...slug].astro for all /direct-mail-tools/ static pages. Total: 8 pages optimized this session.
- **2026-02-21**: Renamed training page from /training/conversations-tab/ to /training/portal/. Updated title to "CRST Web Training Portal". Added 301 redirect from old URL (both in astro.config.mjs and static HTML redirect).
- **2026-02-21**: Expanded training page to full 10-module platform: M1 Conversations(8 lessons, MP4 video), M2 Pipelines(10 lessons, 1 YouTube + placeholders), M3 Workflows(7), M4 Calendars(7), M5 CRM(5), M6 Sites/Forms(5), M7 Payments(5), M8 Dashboards(4), M9 Reviews(3), M10 Settings(5). Total: 59 lessons. All white-labeled as "CRST Web". YouTube embed support + "Video Coming Soon" placeholder for lessons without videos.
- **2026-02-21**: Built standalone training page at /training/portal/ — Self-contained HTML (Tailwind CDN, vanilla JS). noindex/nofollow. Videos served from /videos/ directory. Each module has independent sidebar, progress tracking, lesson switcher, accordion reference guides.
- **2026-02-23**: Created /direct-mail-tools/envelope-sizes/ page (54K impressions, position 22.8). Duplicated content from /resources/envelope-sizes/ to its original WordPress URL. Set canonical to /direct-mail-tools/envelope-sizes/. Catch-all redirect doesn't override because prerendered pages take priority. Existing redirects from /tools/envelope-sizes/ and /direct-mail-tools/envelope now correctly land on the real page.
- **2026-02-22**: Created 3 new resource pages: ancillary-service-endorsements (5 endorsement types, comparison table), periodicals (eligibility, rates, requester pubs, nonprofit rates, vs Marketing Mail), understanding-periodicals (processing, zone pricing, ad/editorial split, markup rules, publisher tips). Added to resources index. Updated redirects from temp destinations to real pages. Added /resources/cornerstone-mailing-permits/ → /resources/mailing-permits/ redirect.
- **2026-02-22**: GSC-driven SEO fixes: Updated meta titles/descriptions for mailing-permits, postage-rates (→2026), mail-forwarding (address change keywords), envelope-sizes, postal-dictionary. Fixed double "| CRST" title suffix. Added 301 redirects for /direct-mail-tools/address-change/, /ancillary-service-endorsements/, /periodicals-complete-overview/, /understanding-periodicals/ to relevant resource/service pages.
- **2026-02-21**: Updated meta titles/descriptions for postage-rates and direct-mail pages. Added /non-profit-mailing-application redirect.
- **2026-02-19**: Switched to hybrid output mode with @astrojs/node adapter. Added dynamic catch-all [...slug].astro for runtime 301 redirects (blog patterns, case studies, printing partners, WP content, etc.). Comprehensive GSC-based redirect mapping added to astro.config.mjs.
- **2026-02-18**: Removed all blog content (blog moving to blog.crst.net subdomain). Deleted blog pages, data files, components. Updated legacy redirects to point to blog.crst.net. Removed Blog from navigation.
- **2026-02-18**: Accuracy audit — fixed Kerhonkson town assignment (Wawarsing, not Rochester), updated Rochester intro.
- **2026-02-15**: Added Sean Griffin's signature under photo on About page
- **2026-02-15**: Added Sean H. Griffin's professional photo to About page
- **2026-02-15**: Made industry filter tags clickable on case studies page
- **2026-02-15**: Integrated 867 WordPress media library files

## Project Architecture

### Tech Stack
- **Framework**: Astro 4.16 (hybrid mode — static pages + dynamic catch-all)
- **Adapter**: @astrojs/node v8.3.4 (standalone mode)
- **Styling**: Tailwind CSS
- **Deployment**: Replit autoscale (Node server)
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
├── training/          # Internal training pages (noindex)
│   └── portal/            # CRST Web Training Portal (10 modules, 59 lessons)
├── videos/            # Training video files (MP4)
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
- Legacy WordPress URLs handled via redirects in astro.config.mjs + dynamic catch-all in [...slug].astro
- Hybrid mode: all 134 pages prerendered as static HTML; [...slug].astro is server-rendered (prerender = false) for dynamic 301 redirects
- Workflow runs `npm run build && HOST=0.0.0.0 PORT=5000 node dist/server/entry.mjs`

## Content Queue (Pages to Build)
- /direct-mail-marketing/ — Position 48 with 15K impressions. Receiving inbound links from 6+ pages. Needs content audit next session (likely thin/misaligned with search intent). Not a link problem — page authority building via new internal links.

## SEO Migration Tracking
Pages moved from /resources/ to /direct-mail-tools/:
- envelope-sizes, postal-dictionary, address-change, cornerstone-mailing-permits, postage-rates
- Each has: catch-all exception in [...slug].astro, 301 redirects in both astro.config.mjs and [...slug].astro
- Catch-all line in [...slug].astro must list all /direct-mail-tools/ static pages as exceptions

## User Preferences
- Clean footer layout without map embed
- Shopping cart icon in header for order page access
- White bird on blue circular favicon (inverted from logo colors)
