# Replit Brief — Suffolk County Town Pages for The Property Father

## What This Is
36 individual town pages for thepropertyfather.com. Each page is a unique landing page for a Suffolk County town. All content is written and ready — see the attached file `suffolk-town-pages.md`.

## What Needs to Be Built

### Page Structure
- **URL pattern:** `thepropertyfather.com/locations/suffolk-county/[town-slug]`
- **Parent page:** `thepropertyfather.com/locations/suffolk-county` (already exists)
- Each town listed on the Suffolk County parent page should link to its dedicated town page

### For Each Page, Pull From the Document:
- **Title tag** (under "Title Tag:")
- **Meta description** (under "Meta Description:")
- **H1** (under "H1:")
- **Body content** — all paragraphs between the H1 and "Internal Links:"
- **Sub-headings** — lines in bold (between `**`) are H2s within the body content
- **Internal links** — listed at the bottom of each page entry

### Page Layout (match existing site design — same as Nassau County town pages)
- H1 at top
- Body content with H2 sub-sections
- CTA section at bottom: "Ready to sell your [Town] home?" with phone number (516) 548-6558 and link to the cash offer form
- Phone number should be a click-to-call link: `tel:5165486558`

### Schema Markup (add to each page)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "We Buy Houses for Cash in [Town], NY",
  "provider": {
    "@type": "LocalBusiness",
    "name": "The Property Father",
    "telephone": "(516) 548-6558",
    "url": "https://thepropertyfather.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "[Town]",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Suffolk County, NY"
    }
  },
  "description": "[Use the meta description for this town]"
}
```

### Sitemap
- Add all 36 new town page URLs to the sitemap
- Ensure sitemap is accessible at `thepropertyfather.com/sitemap.xml`
- Set `<lastmod>` to today's date
- Set `<changefreq>` to monthly
- Set `<priority>` to 0.7

### Suffolk County Parent Page Update
- Each town name button on `/locations/suffolk-county` should link to its corresponding town page
- Example: "Babylon" button → `/locations/suffolk-county/babylon`

## Town List (36 total)
1. Babylon
2. Brookhaven
3. East Hampton
4. Huntington
5. Islip
6. Riverhead
7. Shelter Island
8. Smithtown
9. Southampton
10. Southold
11. Patchogue
12. Bay Shore
13. Brentwood
14. Central Islip
15. Commack
16. Coram
17. Deer Park
18. East Northport
19. Farmingville
20. Hauppauge
21. Holbrook
22. Lake Grove
23. Lindenhurst
24. Medford
25. Middle Island
26. Miller Place
27. Mount Sinai
28. North Babylon
29. Port Jefferson
30. Ronkonkoma
31. Sayville
32. Selden
33. Shirley
34. Stony Brook
35. West Babylon
36. West Islip

## Files Attached
- `suffolk-town-pages.md` — all 36 pages of content, ready to copy
