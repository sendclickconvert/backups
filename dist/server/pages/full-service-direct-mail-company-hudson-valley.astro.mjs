/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
import { $ as $$AuthorByline } from '../chunks/AuthorByline_DNWN2IXS.mjs';
import { B as BUSINESS, C as COUNTIES } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$FullServiceDirectMailCompanyHudsonValley = createComponent(($$result, $$props, $$slots) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Full-Service Direct Mail",
    provider: {
      "@type": "Organization",
      "@id": "https://crst.net/#organization",
      name: BUSINESS.name,
      telephone: BUSINESS.phone
    },
    areaServed: [
      { "@type": "County", name: "Ulster County, New York" },
      { "@type": "County", name: "Dutchess County, New York" },
      { "@type": "County", name: "Orange County, New York" }
    ],
    url: "https://crst.net/full-service-direct-mail-company-hudson-valley"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Full-Service Direct Mail Company Hudson Valley", "description": "Cornerstone Services provides full-service direct mail in the Hudson Valley. In-house design, printing, EDDM, and fulfillment. Serving Ulster, Dutchess, and Orange counties since 1998." }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Full-Service Direct Mail Company | Hudson Valley, NY", "subtitle": "In-house design, printing, EDDM, data lists, and fulfillment \u2014 all under one roof in Saugerties, NY.", "breadcrumbs": [
    { label: "Services", href: "/services" },
    { label: "Full-Service Direct Mail" }
  ] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> <div class="section-divider mb-6"></div> <h2 class="text-2xl font-display text-crst-primary mb-4">Full-Service Direct Mail From One Location</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Cornerstone Services, Inc. (CRST) is a full-service direct mail company in the Hudson Valley, helping clients manage everything from audience targeting and creative design to printing, EDDM, mail prep, and fulfillment. Established in 1998 and based in Saugerties, NY, CRST serves Ulster, Dutchess, and Orange counties with in-house production and no outsourcing.
</p> <p class="text-navy-600/80 leading-relaxed mb-6">
When you work with CRST, every step of your direct mail campaign happens in one building with one team. We pull your <a href="/services/data-lists" class="text-crst-accent hover:underline">mailing lists</a>, design the piece, print it on our presses, prep it to USPS automation specs, and deliver it to the post office. No handoffs to third parties. No waiting on outside vendors. That single-source model is why organizations across the Hudson Valley — from municipal governments to real estate offices to nonprofit fundraisers — choose CRST for their mail campaigns.
</p> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">What Full-Service Means at CRST</h3> <div class="space-y-4 mb-8"> <div class="flex items-start gap-3"> <div class="shrink-0 w-8 h-8 rounded-full bg-crst-primary flex items-center justify-center text-white font-heading font-bold text-xs">1</div> <div> <h4 class="font-heading font-bold text-navy-800 mb-1">Audience Targeting & Data</h4> <p class="text-sm text-navy-600/70 leading-relaxed">We build targeted mailing lists using demographic, geographic, and behavioral data. Consumer lists, business lists, new movers, voter files — filtered to your exact audience.</p> </div> </div> <div class="flex items-start gap-3"> <div class="shrink-0 w-8 h-8 rounded-full bg-crst-primary flex items-center justify-center text-white font-heading font-bold text-xs">2</div> <div> <h4 class="font-heading font-bold text-navy-800 mb-1">Creative Design</h4> <p class="text-sm text-navy-600/70 leading-relaxed">Our <a href="/services/graphic-design" class="text-crst-accent hover:underline">in-house design team</a> creates postcards, letters, brochures, and self-mailers that meet USPS specs and get noticed in the mailbox.</p> </div> </div> <div class="flex items-start gap-3"> <div class="shrink-0 w-8 h-8 rounded-full bg-crst-primary flex items-center justify-center text-white font-heading font-bold text-xs">3</div> <div> <h4 class="font-heading font-bold text-navy-800 mb-1">Commercial Printing</h4> <p class="text-sm text-navy-600/70 leading-relaxed">Digital and offset <a href="/services/printing" class="text-crst-accent hover:underline">printing</a> for any run size. Postcards, letters, newsletters, catalogs — printed on-site with quality control at every stage.</p> </div> </div> <div class="flex items-start gap-3"> <div class="shrink-0 w-8 h-8 rounded-full bg-crst-primary flex items-center justify-center text-white font-heading font-bold text-xs">4</div> <div> <h4 class="font-heading font-bold text-navy-800 mb-1">EDDM & Mail Prep</h4> <p class="text-sm text-navy-600/70 leading-relaxed"><a href="/services/eddm" class="text-crst-accent hover:underline">Every Door Direct Mail</a> for saturation coverage, or addressed mail with presort automation for the lowest postage rates. We handle bundling, facing slips, and postal induction.</p> </div> </div> <div class="flex items-start gap-3"> <div class="shrink-0 w-8 h-8 rounded-full bg-crst-primary flex items-center justify-center text-white font-heading font-bold text-xs">5</div> <div> <h4 class="font-heading font-bold text-navy-800 mb-1">Fulfillment & Delivery</h4> <p class="text-sm text-navy-600/70 leading-relaxed">Your mail goes from our facility directly to the USPS. We track every drop and confirm delivery to the post office.</p> </div> </div> </div> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">Who We Work With</h3> <p class="text-navy-600/80 leading-relaxed mb-6">
CRST serves a wide range of organizations across the Hudson Valley. <a href="/services/non-profit-mailing" class="text-crst-accent hover:underline">Nonprofits</a> use us for fundraising appeals and donor newsletters. Political campaigns rely on us for voter contact mail. Municipalities send public notices, tax information, and community updates. Real estate agents use targeted postcards for farming campaigns. And local businesses of every size — from restaurants to medical practices — use direct mail to reach customers in their service area.
</p> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">Serving the Hudson Valley Since 1998</h3> <p class="text-navy-600/80 leading-relaxed mb-6">
Our facility in Saugerties, NY is centrally located to serve <a href="/service-areas/ulster-county" class="text-crst-accent hover:underline">Ulster County</a>, <a href="/service-areas/dutchess-county" class="text-crst-accent hover:underline">Dutchess County</a>, and <a href="/service-areas/orange-county" class="text-crst-accent hover:underline">Orange County</a>. We know the postal routes, the carrier delivery patterns, and the local markets. That knowledge translates into better targeting and fewer wasted impressions for every campaign we run.
</p> <div class="mt-8"> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, { "compact": true })} </div> </div> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="card p-6 text-center"> <h3 class="font-display font-bold text-crst-primary text-lg mb-3">Get a Free Estimate</h3> <p class="text-sm text-navy-600/70 mb-4">Tell us about your project and we'll put together a quote.</p> <a href="/estimate" class="btn-primary w-full text-sm">Request Estimate</a> </div> <div class="card p-6"> <h3 class="font-display font-bold text-crst-primary mb-3">Call Us</h3> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="flex items-center gap-2 text-navy-700 hover:text-crst-primary transition-colors font-heading font-semibold"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> ${BUSINESS.phone} </a> </div> <div class="card p-6"> <h3 class="font-display font-bold text-crst-primary mb-3">Service Areas</h3> <ul class="space-y-2 text-sm"> ${Object.values(COUNTIES).map((county) => renderTemplate`<li> <a${addAttribute(`/service-areas/${county.slug}`, "href")} class="text-navy-600 hover:text-crst-primary transition-colors">${county.name} &rarr;</a> </li>`)} </ul> </div> </div> </aside> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, { "headline": "Ready to Start Your Direct Mail Campaign?", "text": "Get a free estimate for your next mailing. We'll walk you through the process from data to delivery." })} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(schema))) })}` })}`;
}, "/home/runner/workspace/src/pages/full-service-direct-mail-company-hudson-valley.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/full-service-direct-mail-company-hudson-valley.astro";
const $$url = "/full-service-direct-mail-company-hudson-valley";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FullServiceDirectMailCompanyHudsonValley,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
