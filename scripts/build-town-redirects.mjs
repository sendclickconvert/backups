// Regenerates src/data/town-redirects.json from src/data/locations.ts (served as 301s by server.mjs).
// Run after changing FOCUS_TOWN_SLUGS or adding a town:  node scripts/build-town-redirects.mjs
//
// Retired in the Oct 2026 SEO release:
//   /services/{eddm,direct-mail}/{town}   templated grid (83% identical between towns)
//       -> /service-areas/{county}/{town} for a focus town, else the county hub
//   /service-areas/{county}/{town}        for every non-focus town -> the county hub
import fs from 'node:fs';

const src = fs.readFileSync(new URL('../src/data/locations.ts', import.meta.url), 'utf8');
const focus = [...src.match(/FOCUS_TOWN_SLUGS[^=]*=\s*\[([\s\S]*?)\]/)[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
const countySlug = { ulster: 'ulster-county', dutchess: 'dutchess-county', orange: 'orange-county' };

const towns = [...src.matchAll(/slug: '([a-z-]+)',\s*\n\s*type: '[a-z]+',\s*\n\s*county: '(ulster|dutchess|orange)'/g)]
  .map((m) => ({ slug: m[1], county: countySlug[m[2]] }));

const redirects = {};
for (const t of towns) {
  const keep = focus.includes(t.slug);
  const target = keep ? `/service-areas/${t.county}/${t.slug}` : `/service-areas/${t.county}`;
  redirects[`/services/eddm/${t.slug}`] = target;
  redirects[`/services/direct-mail/${t.slug}`] = target;
  if (!keep) redirects[`/service-areas/${t.county}/${t.slug}`] = target;
}

const missing = focus.filter((f) => !towns.some((t) => t.slug === f));
if (missing.length) throw new Error(`focus towns not in locations.ts: ${missing.join(', ')}`);
fs.writeFileSync(new URL('../src/data/town-redirects.json', import.meta.url), JSON.stringify(redirects, null, 1) + '\n');
console.log(`${towns.length} towns, ${focus.length} focus, ${Object.keys(redirects).length} redirects written`);
