---
name: BaseLayout schema={null} pattern
description: How to suppress the default WebPage schema in BaseLayout when a page injects its own JSON-LD via Fragment slot="head"
---

# BaseLayout schema suppression

## The rule
Any page that injects its own JSON-LD via `<Fragment slot="head">` MUST also pass `schema={null}` to `<BaseLayout>`. Without it, BaseLayout renders its default WebPage schema in addition to the page's custom schema — producing two JSON-LD blocks in `<head>`.

**Why:** BaseLayout always renders a default WebPage schema unless `schema` is explicitly `null`. The `<Fragment slot="head">` is additive — it doesn't suppress the BaseLayout default.

**How to apply:** Any time a new page is built with custom schema injected via Fragment slot, add `schema={null}` to the BaseLayout call.

## Fixed in May 2026
All existing pages were fixed in one pass. The affected page types were:
- All `[slug].astro` article templates (eddm, printing, mailing, graphic-design, web-design, non-profit-mailing, school-district-direct-mail, union-printing, direct-mail, data-lists)
- Service pillar pages using Fragment for schema (eddm.astro, web-design.astro, school-district-direct-mail.astro, all data-list variants)
- Service-area templates ([county]/index.astro, [county]/[location].astro)
- Service×Town template ([service]/[town].astro)
- Resource standalone pages (friendraising, famous-postmasters, point-roberts, lessons-from-marketing-failure, non-profit-database-change-request, ship-potatoes, chicken-shipping-101, direct-mail-vs-email, informed-delivery-guide)

## BaseLayout implementation
`const pageSchema = schema === null ? null : (schema || defaultSchema);`
`{pageSchema && <script type="application/ld+json" ...>}`
