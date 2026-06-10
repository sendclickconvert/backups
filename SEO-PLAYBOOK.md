# CRST.net SEO Playbook

The standing operating manual for all content and SEO work on the Cornerstone Services site. This is the *process and rules* — not a point-in-time audit. Audits, keyword research, and backlink reports live in their own dated files.

---

## 0. The Prime Directive

**Scan → Understand → Apply.** Never touch a page blind.

Before proposing or making *any* change, audit the existing page:
- Title, meta description, H1, current schema
- Word count, content gaps, inbound internal links
- Cross-check against GSC data (impressions, clicks, CTR, position)

Then act. This pattern has caught a scope error on every task it was applied to — would-have-been duplicate pages, stale rates shipped without verification, schema in the wrong place. **It is the default, not the exception.**

---

## 1. Improve In Place (Path A)

**Evergreen slugs win.** The existing URL has whatever authority, age, and links it has already earned. Throwing it away resets the clock.

- **Default:** improve the page that already ranks/exists.
- **Never** create a new page or change a URL slug without explicitly flagging it first and confirming the structural reason makes improve-in-place impossible.
- If a topic is fragmented across competing pages, **consolidate** into the strongest one and redirect the others — don't add a third.

### When consolidation is the answer
1. Pick the canonical winner (most links, best position, cleanest slug).
2. Merge the useful content into it.
3. `noindex` + canonical the losers to the winner *or* 301 them (see §6).
4. Remove the losers from the sitemap.

---

## 2. On-Page Conventions

| Element | Rule |
|---|---|
| Meta title | ≤ 60 characters |
| Meta description | ≤ 155 characters |
| H1 | Exactly one per page, keyword-led |
| Heading order | Never skip levels (H1 → H2 → H3) |
| Time-sensitive pages | Show "Last updated [Month YYYY]" with `itemprop="dateModified"` |
| Year-pinned queries (e.g. "2026 rates") | Keep the live page current; verify the number before shipping |

### FAQ pattern
- Real questions pulled from search intent, unique answers per page.
- Mirror every on-page FAQ into `FAQPage` schema (see §3).

### E-E-A-T
- Author byline (Sean Griffin Person entity) on substantive content.
- Real credentials, real address, real founding date — never invented.

---

## 3. Schema Doctrine (Critical Rules)

Structured data is centralized and deliberate. Breaking these rules creates duplicate or conflicting entities that dilute the signal.

1. **One JSON-LD graph per page.** A page either uses the `BaseLayout` default `WebPage` schema *or* injects its own via `<Fragment slot="head">` with `schema={null}` — never both.
   - `BaseLayout` logic: `schema === undefined ? defaultSchema : schema`. Passing `schema={null}` suppresses the default cleanly.
2. **`PageHero` BreadcrumbList** — when a page supplies its own complete `@graph` (which already contains a `BreadcrumbList`), pass `noSchema={true}` to `PageHero` so it doesn't inject a second, redundant breadcrumb block.
3. **`LocalBusiness` is homepage ONLY.** Every other page uses `Organization` (`@id: https://crst.net/#organization`) for provider/publisher/worksFor references.
4. **No `AggregateRating` anywhere.** Removed sitewide per doctrine.
5. **BreadcrumbList on all guide pages.** Use `Article + FAQPage` where applicable.
6. **Verify in rendered output**, not source. Grep the built HTML:
   ```
   grep -c "application/ld+json" dist/client/<path>/index.html   # expect 1
   ```

### Standard entity IDs
- Organization: `https://crst.net/#organization`
- Sean Griffin (Person): `https://crst.net/about#sean-griffin`
- Breadcrumb (per page): `<pageUrl>#breadcrumb`

---

## 4. Internal Linking — Hybrid Hub-and-Spoke

Authority flows through deliberate clusters, not random cross-links.

- **Pillar ↔ cluster is bidirectional.** Each pillar page renders a grid of its cluster articles; each article links back to its pillar and to siblings.
- **Silos stay clean.** EDDM articles link within the EDDM cluster + to the EDDM pillar; they don't bleed into unrelated silos without a contextual reason.
- **Service → County → Town** forms the local silo. Cross-link service pillars to relevant service-area pages and vice versa.
- Contextual in-content links beat footer-stuffing. Place links where the reader would actually want them.

---

## 5. Local SEO

- **NAP is single-source.** Name, address, phone live in `src/data/site.ts` — never hardcode them on a page.
- **Geographic data layer** drives town pages (`locations.ts`) with geocoded coordinates.
- **Unique content for flagged towns** lives in `town-unique-content.ts` — avoid thin, templated duplication across 90+ town pages.
- **County hubs** carry the map embed, anchor cities, and full town listings.
- **Computed stats** (population, households, carrier routes, distance, cost estimates) are derived per town to keep every page genuinely distinct.

---

## 6. Redirects

Dual system — know which tool to reach for:

1. **`astro.config.mjs`** — config-level redirects for known, static mappings.
2. **Catch-all `[...slug].astro`** — exact + pattern-based (wildcard) redirects at runtime.

### Gotchas
- **A physical page file always wins over a config redirect.** If you're redirecting `/old-page`, the file `src/pages/old-page.astro` must be *deleted* or the redirect silently never fires.
- Enforce `trailingSlash: 'never'` everywhere — internal links, schema URLs, sitemap entries, canonicals.
- Audit for redirect chains; collapse `A → B → C` into `A → C`.

### noindex / sitemap hygiene
- Thin, duplicate, or admin/internal pages get `noindex` **and** are dropped from the sitemap.
- A `noindex` page should not appear in `sitemap-index.xml` — the two signals must agree.

---

## 7. Deployment & Verification Doctrine (Reserved VM)

The production VM runs `node server.mjs` **only** — it does *not* build on startup. `dist/` ships as a pre-built, committed artifact.

**Before every Publish:**
1. Run `npm run build` explicitly in the workspace shell. (The dev server does *not* populate `dist/`.)
2. Verify the new content is actually in the artifact:
   ```
   grep -c "<phrase>" dist/client/<path>/index.html
   ```
3. Only then Publish.

**Verification rules:**
- Never trust `curl https://crst.net/` from the Replit shell to confirm production — it may resolve to the dev server.
- The only authoritative production check is the user's own browser (incognito).
- If `dist/` is stale at publish time, the VM serves stale content. There is no fallback build step.

---

## 8. Pre-Publish Checklist

- [ ] Page audited (title, meta, H1, schema, links, GSC) before changes
- [ ] Title ≤ 60 chars, description ≤ 155 chars
- [ ] Exactly one JSON-LD graph per page (verified in `dist/`)
- [ ] `LocalBusiness` only on homepage; `Organization` elsewhere
- [ ] No `AggregateRating` introduced
- [ ] BreadcrumbList present, not duplicated (`PageHero noSchema` where needed)
- [ ] Internal links wired both directions for any new cluster content
- [ ] `lastUpdated` / `dateModified` bumped on time-sensitive edits
- [ ] Any redirected slug has its physical page file deleted
- [ ] `noindex` pages dropped from sitemap
- [ ] `npm run build` run; new content grep-confirmed in `dist/`
- [ ] Production verified in incognito browser after Publish

---

## Reference Files (point-in-time, not playbook)

- `CRST-SEO-Architecture-Audit.md` — forensic architecture snapshot
- `crst-full-audit-2026-03-05.md` — complete project audit
- `crst_keyword_research_may2026.md` — keyword research
- `dataforseo-backlink-report-*.md` / `backlink-reclamation-report-*.md` — backlink data
- `CRST-SITE-BLUEPRINT.md` — full site blueprint
