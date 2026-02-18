# CRST Website — Deployment Guide

## Quick Start (Replit)
1. Upload and unzip `crst-website.zip` into your Replit project
2. Run `npm install` in the shell
3. Click **Run** (or `npm run dev`) — site starts on port 4321
4. For production: `npm run build` → static output in `dist/`

## What's Included

### Pages (130+ total at build)
| Section | Count | Notes |
|---------|-------|-------|
| Core | 9 | Home, About, Contact, Estimate, FAQ, Thank You, Terms, Privacy, Services Hub |
| Services | 9 | Direct Mail, Printing, Mailing, Data Lists, Graphic Design, EDDM, Non-Profit, Union Printing, Web Design |
| Service Areas | 98 | Hub + 3 county hubs + 94 individual town/village pages |
| Resources | 11 | Hub + 10 resource pages (postage rates, EDDM guide, mail automation, etc.) |
| Case Studies | 12 | Hub + 11 individual case studies |
| Blog | 9 | Hub + 8 blog posts |

### Dynamic Routes (auto-generate from data files)
- `/service-areas/[county]/[location]/` → 97 location pages from `locations.ts`
- `/case-studies/[slug]/` → 11 case studies from `case-studies.ts`
- `/blog/[slug]/` → 8 blog posts from `blog.ts`

## Assets Needed (from Bryan)
Replace placeholder references with real files in `/public/`:
- `crst-logo.png` + `crst-logo-white.png`
- `favicon-32.png`
- `crst-og.jpg` (1200×630 social sharing image)
- Case study images
- Team photos (for About page)

## Configuration Needed
1. **Stripe** — Update `/resources/payments.astro` with actual Stripe payment link or embed
2. **GHL Tracking** — Verify pixel ID in BaseLayout.astro (currently set from site.ts)
3. **GA4** — Verify measurement ID in BaseLayout.astro

## Adding Content

### New Location
Add entry to `/src/data/locations.ts` — page auto-generates at build.

### New Blog Post
Add entry to `/src/data/blog.ts` — page auto-generates at build.

### New Case Study
Add entry to `/src/data/case-studies.ts` — page auto-generates at build.

## 301 Redirects
30+ redirects mapped in `astro.config.mjs` covering old WordPress and GHL URLs.
