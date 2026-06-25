/* empty css                                     */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CfPTFqt0.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DY-UkqRV.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_gDvPr2ru.mjs';
import { b as bmeus } from '../../chunks/bmeu-data_B-4yahVI.mjs';
import { createRequire } from 'module';
export { renderers } from '../../renderers.mjs';

const require$1 = createRequire(import.meta.url);
const zipcodes = require$1("zipcodes");
function getZipCoords(zip) {
  const normalized = zip.trim().replace(/\D/g, "").slice(0, 5).padStart(5, "0");
  if (normalized.length !== 5) return null;
  const result = zipcodes.lookup(normalized);
  if (!result || result.latitude == null || result.longitude == null) return null;
  return { lat: result.latitude, lng: result.longitude };
}
function haversineMiles(a, b) {
  const R = 3959;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const sin2 = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(sin2), Math.sqrt(1 - sin2));
}

function findBmeusForZip(zip, all) {
  const normalized = zip.trim().replace(/\D/g, "").slice(0, 5).padStart(5, "0");
  if (normalized.length !== 5 || !/^\d{5}$/.test(normalized)) return [];
  const authoritative = all.filter((b) => b.servingZips.includes(normalized));
  if (authoritative.length > 0) {
    return authoritative.map((b) => ({ ...b }));
  }
  const origin = getZipCoords(normalized);
  if (!origin) return [];
  const withDistance = all.filter((b) => b.coordinates).map((b) => ({
    ...b,
    distanceMiles: haversineMiles(origin, b.coordinates)
  })).sort((a, b) => (a.distanceMiles ?? Infinity) - (b.distanceMiles ?? Infinity));
  return withDistance;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const rawZip = Astro2.url.searchParams.get("zip") ?? "";
  const zip = rawZip.trim().replace(/\D/g, "").slice(0, 5);
  const searched = zip.length === 5;
  const results = searched ? findBmeusForZip(zip, bmeus) : [];
  const byState = {};
  for (const b of bmeus) {
    const s = b.address.state || "Unknown";
    if (!byState[s]) byState[s] = [];
    byState[s].push(b);
  }
  const sortedStates = Object.keys(byState).sort();
  const canonical = "https://crst.net/direct-mail-tools/bmeu";
  const graphSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "USPS Business Mail Entry Unit (BMEU) Locator",
        description: "Find the nearest USPS Business Mail Entry Unit (BMEU) by ZIP code. Distance-based lookup \u2014 returns the geographically closest unit, not the administrative district default.",
        isPartOf: { "@id": "https://crst.net/#website" },
        breadcrumb: { "@id": `${canonical}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
          { "@type": "ListItem", position: 2, name: "Direct Mail Tools", item: "https://crst.net/direct-mail-tools" },
          { "@type": "ListItem", position: 3, name: "BMEU Locator", item: canonical }
        ]
      },
      {
        "@type": "ItemList",
        name: "USPS Business Mail Entry Units",
        itemListElement: bmeus.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          url: `https://crst.net/direct-mail-tools/bmeu/${b.slug}`
        }))
      }
    ]
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "USPS BMEU Locator \u2014 Find Your Business Mail Entry Unit", "description": "Find the nearest USPS Business Mail Entry Unit (BMEU) by ZIP code. Distance-based lookup corrects the administrative routing errors in the USPS's own tool.", "schema": null }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "USPS BMEU Locator", "subtitle": "Find the correct Business Mail Entry Unit for your ZIP code \u2014 by actual distance, not USPS administrative district.", "breadcrumbs": [
    { label: "Direct Mail Tools", href: "/direct-mail-tools" },
    { label: "BMEU Locator" }
  ], "noSchema": true })}  ${maybeRenderHead()}<section class="py-10 bg-navy-50 border-b border-navy-100"> <div class="container-wide"> <div class="max-w-xl mx-auto"> <form method="get" action="/direct-mail-tools/bmeu" class="flex gap-3"> <label for="zip-input" class="sr-only">Enter ZIP code</label> <input id="zip-input" type="text" name="zip" inputmode="numeric" maxlength="5" placeholder="Enter ZIP code"${addAttribute(rawZip, "value")} class="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-navy-800 text-base focus:outline-none focus:ring-2 focus:ring-crst-primary placeholder:text-gray-400" aria-label="ZIP code"> <button type="submit" class="btn-primary px-6 py-3 text-sm whitespace-nowrap">
Find BMEU
</button> </form> ${searched && zip.length !== 5 && renderTemplate`<p class="mt-3 text-sm text-red-600">Please enter a valid 5-digit ZIP code.</p>`} </div> </div> </section>  ${searched && renderTemplate`<section class="py-10 bg-white border-b border-navy-100"> <div class="container-wide"> <div class="max-w-3xl mx-auto"> ${results.length === 0 ? renderTemplate`<div class="bg-amber-50 border border-amber-200 rounded-xl p-6"> <h2 class="font-heading font-bold text-navy-800 mb-2">No results for ZIP ${zip}</h2> <p class="text-navy-600/80 text-sm">
We couldn't locate a BMEU for that ZIP code. Our directory is growing — browse the full listing below, or <a href="/contact" class="text-crst-primary underline hover:text-crst-gold">contact us</a> and we can point you to the right facility.
</p> </div>` : renderTemplate`<div> <h2 class="text-xl font-display text-navy-800 mb-5"> ${results.length === 1 ? "Nearest BMEU" : `${results.length} BMEUs`} for ZIP ${zip} </h2> <div class="space-y-4"> ${results.map((bmeu) => renderTemplate`<div class="bg-white border border-navy-200 rounded-xl p-6 shadow-sm"> <div class="flex items-start justify-between gap-4 flex-wrap"> <div> <div class="flex items-center gap-2 mb-1"> <h3 class="font-heading font-bold text-navy-800 text-lg">${bmeu.name}</h3> ${bmeu.verification.verified && renderTemplate`<span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"> <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
Verified
</span>`} </div> <p class="text-navy-600/70 text-sm"> ${bmeu.address.city}, ${bmeu.address.state} ${bmeu.distanceMiles != null && renderTemplate`<span class="ml-2 text-crst-primary font-semibold">~${Math.round(bmeu.distanceMiles)} mi away</span>`} ${bmeu.servingZips.includes(zip) && renderTemplate`<span class="ml-2 inline-flex items-center text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">Confirmed for ${zip}</span>`} </p> </div> <a${addAttribute(`/direct-mail-tools/bmeu/${bmeu.slug}`, "href")} class="btn-outline text-sm px-4 py-2 shrink-0">
View Details →
</a> </div> ${bmeu.phone && renderTemplate`<p class="mt-3 text-sm text-navy-600/80"><strong>Phone:</strong> <a${addAttribute(`tel:${bmeu.phone.replace(/\D/g, "")}`, "href")} class="text-crst-primary hover:underline">${bmeu.phone}</a></p>`} ${bmeu.hours && renderTemplate`<p class="mt-1 text-sm text-navy-600/80"><strong>Hours:</strong> ${bmeu.hours}</p>`} ${bmeu.callAheadNote && !bmeu.callAheadNote.startsWith("PLACEHOLDER") && renderTemplate`<div class="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4"> <p class="text-sm text-amber-800 font-semibold mb-1">⚡ Call ahead first</p> <p class="text-sm text-amber-900/80">${bmeu.callAheadNote}</p> </div>`} </div>`)} </div> </div>`} </div> </div> </section>`} <section class="py-14 lg:py-20"> <div class="container-wide"> <div class="max-w-3xl mx-auto"> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">What Is a Business Mail Entry Unit?</h2> <p class="text-navy-600/80 leading-relaxed mb-4">
A Business Mail Entry Unit (BMEU) is a USPS facility where commercial mailers deposit presorted bulk mail directly — bypassing the retail post office counter. Dropping at a BMEU qualifies mailings for BMEU-entry postage discounts and, for <a href="/services/eddm" class="text-crst-primary underline hover:text-crst-gold">EDDM BMEU campaigns</a>, removes the 5,000-piece-per-day limit that applies to EDDM Retail.
</p> <p class="text-navy-600/80 leading-relaxed mb-4">
Finding the right BMEU matters more than it should. The USPS's own search tool routes by administrative postal district — which doesn't always match geography. A mailer in Kingston, NY, for example, gets routed to Albany by the district tool, when the correct and closest entry point is the Mid-Hudson facility in Newburgh. This directory returns results by actual driving distance, not district assignment.
</p> <p class="text-navy-600/80 leading-relaxed mb-8">
Cornerstone Services has dropped client mailings at BMEUs across the Hudson Valley and Northeast for over 25 years. If you're unsure which facility to use, <a href="/contact" class="text-crst-primary underline hover:text-crst-gold">contact us</a> — or better, let us handle it. Our <a href="/services/direct-mail" class="text-crst-primary underline hover:text-crst-gold">full-service direct mail</a> includes entry.
</p> <div class="bg-navy-50 rounded-xl p-6 mb-10"> <h3 class="font-heading font-bold text-navy-800 mb-3">The five-minute call that saves two weeks</h3> <p class="text-navy-600/80 text-sm leading-relaxed">
BMEU hours, acceptance windows, and mail class restrictions change — and the USPS doesn't always update posted signage promptly. Before driving to any facility with a pallet, call ahead to confirm they're accepting your mail class that day. A five-minute call before submission reliably prevents a mailed denial two weeks later.
</p> </div> <h2 class="text-2xl font-display text-crst-primary mb-6">BMEU vs. DSCF vs. DDU</h2> <div class="space-y-4 mb-10"> <div class="bg-white border border-navy-200 rounded-xl p-5"> <h3 class="font-heading font-semibold text-navy-800 mb-1">BMEU (Business Mail Entry Unit)</h3> <p class="text-navy-600/80 text-sm leading-relaxed">Origin entry — you drop at the facility closest to where the mail originates. Qualifies for BMEU-entry rates on Marketing Mail and EDDM.</p> </div> <div class="bg-white border border-navy-200 rounded-xl p-5"> <h3 class="font-heading font-semibold text-navy-800 mb-1">DSCF (Destination Sectional Center Facility)</h3> <p class="text-navy-600/80 text-sm leading-relaxed">Drop at the SCF serving the destination ZIP codes. Earns a deeper discount than BMEU on Marketing Mail. Requires the mailing to be sorted to that SCF's service area.</p> </div> <div class="bg-white border border-navy-200 rounded-xl p-5"> <h3 class="font-heading font-semibold text-navy-800 mb-1">DDU (Destination Delivery Unit)</h3> <p class="text-navy-600/80 text-sm leading-relaxed">Drop at the local post office that delivers to the destination carrier routes. Deepest discount available for EDDM BMEU mailings. Requires delivering to each individual post office — practical only for very local or carrier-managed campaigns.</p> </div> </div> <p class="text-navy-600/80 leading-relaxed mb-4">
For most Hudson Valley businesses, BMEU entry at the Mid-Hudson facility covers the majority of campaigns. <a href="/direct-mail-tools/cornerstone-mailing-permits" class="text-crst-primary underline hover:text-crst-gold">Mailing permits</a> are required for BMEU entry — Cornerstone can mail under our permit on your behalf.
</p> </div> </div> </section>  <section class="py-14 bg-navy-50 border-t border-navy-100"> <div class="container-wide"> <div class="max-w-3xl mx-auto"> <h2 class="text-2xl font-display text-crst-primary mb-8">BMEU Directory</h2> ${sortedStates.map((state) => renderTemplate`<div class="mb-8"> <h3 class="text-sm font-heading font-bold text-navy-400 uppercase tracking-widest mb-3">${state}</h3> <div class="divide-y divide-navy-100 bg-white border border-navy-200 rounded-xl overflow-hidden"> ${byState[state].map((bmeu) => renderTemplate`<a${addAttribute(`/direct-mail-tools/bmeu/${bmeu.slug}`, "href")} class="flex items-center justify-between gap-4 px-5 py-4 hover:bg-navy-50 transition-colors group"> <div> <span class="font-heading font-semibold text-navy-800 group-hover:text-crst-primary transition-colors">${bmeu.name}</span> <span class="ml-2 text-navy-500 text-sm">${bmeu.address.city}, ${bmeu.address.state}</span> ${bmeu.verification.verified && renderTemplate`<span class="ml-2 text-xs text-emerald-600 font-semibold">✓ Verified</span>`} </div> <svg class="w-4 h-4 text-navy-400 group-hover:text-crst-primary transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div>`)} <p class="text-sm text-navy-500 mt-6">
Directory is expanding. If your region isn't listed, <a href="/contact" class="text-crst-primary underline hover:text-crst-gold">contact us</a> — we can point you to the right facility from our 25+ years of production experience.
</p> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(graphSchema)) })}` })}`;
}, "/home/runner/workspace/src/pages/direct-mail-tools/bmeu/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/direct-mail-tools/bmeu/index.astro";
const $$url = "/direct-mail-tools/bmeu";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
