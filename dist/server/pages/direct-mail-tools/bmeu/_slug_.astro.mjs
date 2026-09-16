/* empty css                                        */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../../chunks/CTASection_CpJqys7-.mjs';
import { b as bmeus } from '../../../chunks/bmeu-data_B-4yahVI.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
async function getStaticPaths() {
  return bmeus.map((b) => ({ params: { slug: b.slug }, props: { bmeu: b } }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { bmeu } = Astro2.props;
  const canonical = `https://crst.net/direct-mail-tools/bmeu/${bmeu.slug}`;
  const hasAddress = bmeu.address.street !== "";
  const hasPhone = bmeu.phone !== null;
  const hasHours = bmeu.hours !== null;
  const hasClasses = bmeu.acceptedMailClasses.length > 0;
  const showCallAhead = bmeu.callAheadNote && !bmeu.callAheadNote.startsWith("PLACEHOLDER");
  `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-placeholder&q=${bmeu.coordinates.lat},${bmeu.coordinates.lng}&zoom=14`;
  const placeSchema = {
    "@type": "Place",
    name: bmeu.name,
    url: canonical
  };
  if (hasAddress) {
    placeSchema["address"] = {
      "@type": "PostalAddress",
      streetAddress: bmeu.address.street,
      addressLocality: bmeu.address.city,
      addressRegion: bmeu.address.state,
      postalCode: bmeu.address.zip,
      addressCountry: "US"
    };
  }
  if (hasPhone) {
    placeSchema["telephone"] = bmeu.phone;
  }
  placeSchema["geo"] = {
    "@type": "GeoCoordinates",
    latitude: bmeu.coordinates.lat,
    longitude: bmeu.coordinates.lng
  };
  const graphSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `${bmeu.name} \u2014 USPS Business Mail Entry Unit`,
        description: `Details, accepted mail classes, service area, and call-ahead guidance for the ${bmeu.name} in ${bmeu.address.city}, ${bmeu.address.state}.`,
        isPartOf: { "@id": "https://crst.net/#website" },
        breadcrumb: { "@id": `${canonical}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
          { "@type": "ListItem", position: 2, name: "Direct Mail Tools", item: "https://crst.net/direct-mail-tools" },
          { "@type": "ListItem", position: 3, name: "BMEU Locator", item: "https://crst.net/direct-mail-tools/bmeu" },
          { "@type": "ListItem", position: 4, name: bmeu.name, item: canonical }
        ]
      },
      placeSchema
    ]
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${bmeu.name} \u2014 USPS Business Mail Entry Unit`, "description": `Details, service area, accepted mail classes, and call-ahead guidance for the ${bmeu.name} in ${bmeu.address.city}, ${bmeu.address.state}. From Cornerstone Services.`, "schema": null }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": bmeu.name, "subtitle": `USPS Business Mail Entry Unit \u2014 ${bmeu.address.city}, ${bmeu.address.state}`, "breadcrumbs": [
    { label: "Direct Mail Tools", href: "/direct-mail-tools" },
    { label: "BMEU Locator", href: "/direct-mail-tools/bmeu" },
    { label: bmeu.name }
  ], "noSchema": true })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="max-w-3xl mx-auto"> <!-- Verification badge --> ${bmeu.verification.verified ? renderTemplate`<div class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full mb-8"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
Verified — ${bmeu.verification.verifiedBy}${bmeu.verification.verifiedOn ? `, ${bmeu.verification.verifiedOn}` : ""} </div>` : renderTemplate`<div class="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full mb-8"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path></svg>
Verification in progress — details may be incomplete
</div>`} <div class="section-divider mb-6"></div> <!-- Facility details grid --> <div class="grid sm:grid-cols-2 gap-6 mb-10"> <!-- Address --> <div class="bg-navy-50 rounded-xl p-6"> <h2 class="font-heading font-bold text-navy-800 mb-3">Facility Address</h2> ${hasAddress ? renderTemplate`<address class="not-italic text-navy-600/80 text-sm leading-relaxed"> ${bmeu.address.street}<br> ${bmeu.address.city}, ${bmeu.address.state} ${bmeu.address.zip} </address>` : renderTemplate`<p class="text-navy-500 text-sm italic">Address verification in progress</p>`} </div> <!-- Phone & Hours --> <div class="bg-navy-50 rounded-xl p-6"> <h2 class="font-heading font-bold text-navy-800 mb-3">Contact & Hours</h2> ${hasPhone ? renderTemplate`<p class="text-sm text-navy-600/80 mb-2"> <strong>Phone:</strong> <a${addAttribute(`tel:${bmeu.phone.replace(/\D/g, "")}`, "href")} class="text-crst-primary hover:underline">${bmeu.phone}</a> </p>` : renderTemplate`<p class="text-navy-500 text-sm italic mb-2">Phone — verification in progress</p>`} ${hasHours ? renderTemplate`<p class="text-sm text-navy-600/80"><strong>Hours:</strong> ${bmeu.hours}</p>` : renderTemplate`<p class="text-navy-500 text-sm italic">Hours — verification in progress</p>`} </div> <!-- Accepted Mail Classes --> <div class="bg-navy-50 rounded-xl p-6"> <h2 class="font-heading font-bold text-navy-800 mb-3">Accepted Mail Classes</h2> ${hasClasses ? renderTemplate`<ul class="space-y-1"> ${bmeu.acceptedMailClasses.map((mc) => renderTemplate`<li class="flex items-center gap-2 text-sm text-navy-600/80"> <span class="text-emerald-500">✓</span>${mc} </li>`)} </ul>` : renderTemplate`<p class="text-navy-500 text-sm italic">Mail class acceptance — verification in progress</p>`} </div> <!-- Service Area --> <div class="bg-navy-50 rounded-xl p-6"> <h2 class="font-heading font-bold text-navy-800 mb-3">Service Area</h2> ${bmeu.servingCounties.length > 0 && renderTemplate`<div class="mb-3"> <p class="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-1">Counties</p> <p class="text-sm text-navy-600/80">${bmeu.servingCounties.join(", ")}</p> </div>`} ${bmeu.servingZips.length > 0 && renderTemplate`<div> <p class="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-1">Confirmed ZIPs</p> <p class="text-sm text-navy-600/80 font-mono">${bmeu.servingZips.join(", ")}</p> </div>`} </div> </div> <!-- Call-ahead note --> ${showCallAhead && renderTemplate`<div class="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10"> <h2 class="font-heading font-bold text-amber-800 mb-2 flex items-center gap-2"> <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ahead first
</h2> <p class="text-sm text-amber-900/80 leading-relaxed">${bmeu.callAheadNote}</p> </div>`} <!-- Map --> <div class="mb-10"> <h2 class="text-xl font-display text-crst-primary mb-4">Location</h2> <div class="rounded-xl overflow-hidden border border-navy-200 bg-navy-50 flex items-center justify-center" style="height:300px;"> <div class="text-center p-6"> <p class="text-navy-600/70 text-sm mb-3">
Approximate location: ${bmeu.address.city}, ${bmeu.address.state} ${!hasAddress && " \u2014 exact facility address pending verification"} </p> <a${addAttribute(`https://www.google.com/maps/search/?api=1&query=${bmeu.coordinates.lat},${bmeu.coordinates.lng}`, "href")} target="_blank" rel="noopener noreferrer" class="btn-outline text-sm px-4 py-2">
Open in Google Maps →
</a> </div> </div> </div> <!-- Data source note --> <div class="bg-navy-50 rounded-xl p-5 mb-10 text-sm text-navy-500 leading-relaxed"> <strong class="text-navy-700">Data source:</strong> ${bmeu.verification.source}.
${bmeu.verification.notes && renderTemplate`<span class="block mt-1 italic">${bmeu.verification.notes}</span>`} </div> <!-- Navigation links --> <div class="flex flex-wrap gap-4 border-t border-navy-100 pt-8"> <a href="/direct-mail-tools/bmeu" class="text-sm text-crst-primary hover:underline">← Back to BMEU Locator</a> <a href="/direct-mail-tools/cornerstone-mailing-permits" class="text-sm text-crst-primary hover:underline">Mailing Permits Guide</a> <a href="/services/eddm" class="text-sm text-crst-primary hover:underline">EDDM Services</a> <a href="/services/direct-mail" class="text-sm text-crst-primary hover:underline">Direct Mail Services</a> </div> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(graphSchema)) })}` })}`;
}, "/home/runner/workspace/src/pages/direct-mail-tools/bmeu/[slug].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/direct-mail-tools/bmeu/[slug].astro";
const $$url = "/direct-mail-tools/bmeu/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
