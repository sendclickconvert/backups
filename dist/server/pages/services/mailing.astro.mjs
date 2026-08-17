/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { $ as $$CaseStudyCallout } from '../../chunks/CaseStudyCallout_KvOZC1Gd.mjs';
import { $ as $$AuthorByline } from '../../chunks/AuthorByline_DNWN2IXS.mjs';
import { B as BUSINESS, C as COUNTIES } from '../../chunks/site_BORfRXu4.mjs';
import { g as getCollection } from '../../chunks/_astro_content_DiiJMhjs.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Mailing = createComponent(async ($$result, $$props, $$slots) => {
  const clusterArticles = await getCollection("mailing-articles");
  const mailingFaqs = [
    { q: "What postage class saves the most money on bulk mailings?", a: "USPS Marketing Mail (formerly Bulk Mail) with presort processing saves 30\u201350% compared to First-Class single-piece rates. For nonprofits, the nonprofit Marketing Mail authorization cuts costs even further \u2014 to as low as $0.132 per piece." },
    { q: "What is the minimum quantity for bulk mail?", a: "USPS Marketing Mail requires a minimum of 200 pieces or 50 pounds per mailing. EDDM mailings require a minimum of 200 pieces per carrier route selected. First-Class presort has no minimum, but the discount only applies when you hit the required quantity thresholds." },
    { q: "Can I bring my own printed pieces for mailing only?", a: "Yes. We offer mailing-only services. Deliver your printed pieces to our facility in Saugerties and we handle addressing, presorting, postage, and USPS induction. This is popular with organizations that print in-house but need postal expertise and presort discounts." },
    { q: "What does inkjet addressing mean?", a: "Inkjet addressing is the process of printing mailing addresses directly onto a mail piece using a high-speed inkjet printer \u2014 no labels required. It is required for most USPS automation discounts and produces a cleaner, more professional appearance than adhesive labels." },
    { q: "How long does mail processing take?", a: "Standard mail processing (addressing, barcoding, presorting, tray preparation, and USPS delivery) typically takes 2\u20133 business days after print is complete. We coordinate closely with the print schedule so mail prep does not add unnecessary delays." },
    { q: "What is CASS certification and why does it matter?", a: "CASS (Coding Accuracy Support System) is USPS-approved software that verifies every address against the official USPS delivery database. CASS-certified addresses qualify for automation postage discounts. Without CASS certification, mail cannot receive presort rates and may be rejected at the post office." },
    { q: "Do you have your own mailing permit?", a: "Yes. If your organization does not have a USPS mailing permit, you can mail under our permit. We can also help you obtain your own permit for long-term mailing programs. For nonprofits, we assist with the USPS nonprofit mailing authorization process." }
  ];
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Mailing Services",
        provider: { "@id": "https://crst.net/#organization" },
        areaServed: [
          { "@type": "County", name: "Ulster County, New York" },
          { "@type": "County", name: "Dutchess County, New York" },
          { "@type": "County", name: "Orange County, New York" }
        ],
        url: "https://crst.net/services/mailing"
      },
      {
        "@type": "FAQPage",
        mainEntity: mailingFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://crst.net/services" },
          { "@type": "ListItem", position: 3, name: "Mailing Services", item: "https://crst.net/services/mailing" }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://crst.net/services/mailing",
        name: "Mailing Services \u2014 USPS Presort & Postal Prep",
        url: "https://crst.net/services/mailing",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2"]
        }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Mailing Services \u2014 USPS Presort & Postal Prep", "description": "USPS mailing services \u2014 inkjet addressing, presorting, barcoding, and postal prep. Save 30\u201350% on postage with automation rates. Saugerties, NY.", "schema": null }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Mailing Services", "subtitle": "We prep your mail to USPS specs so it qualifies for the lowest postage rates. Addressing, sorting, barcoding, and delivery to the post office \u2014 handled.", "breadcrumbs": [
    { label: "Services", href: "/services" },
    { label: "Mailing Services" }
  ], "noSchema": true })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> <div class="section-divider mb-6"></div> <h2 class="text-2xl font-display text-crst-primary mb-4">How Our Mailing Process Works</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Cornerstone preps your mail to USPS specifications so your campaign qualifies for the lowest available postage rates. Mailing services cover everything between a finished mail piece and the recipient's mailbox — addressing, sorting, barcoding, presort, and physical USPS entry. We've been doing it for Hudson Valley businesses since 1998 with 2.3M+ pieces processed through the <a href="/direct-mail-tools/bmeu" class="text-crst-accent hover:crst-primary underline">Saugerties BMEU</a>.
</p> <p class="text-navy-600/80 leading-relaxed mb-6">
You give us a print-ready file (or we print it in-house). We run your mailing list through NCOA and CASS processing to clean addresses and update moves. Then we inkjet-address each piece, apply <a href="/direct-mail-tools/usps-notice-67" class="text-crst-accent hover:crst-primary underline">IMb barcodes</a>, presort the entire job by ZIP code and carrier route, and package it into USPS trays and sacks. We generate the electronic postage statement and deliver the mailing to the post office. For EDDM jobs, we handle the route paperwork and facing slips too. Processing mail for Hudson Valley organizations since 1998 — in-house, not outsourced.
</p> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">What's Included</h3> <div class="grid sm:grid-cols-2 gap-3"> ${[
    { title: "Inkjet Addressing", desc: "High-speed addressing directly onto mail pieces or labels" },
    { title: "CASS/DPV Verification", desc: "Address standardization and deliverability validation against USPS databases" },
    { title: "Intelligent Mail Barcode", desc: "Required IMb barcoding for automation rate qualification and tracking" },
    { title: "Presort Processing", desc: "ZIP+4, carrier route, and walk-sequence sorting for maximum postage savings" },
    { title: "Tray/Sack Preparation", desc: "Mail bundled, trayed, and labeled per USPS specifications" },
    { title: "Postal Documentation", desc: "Completed postage statements, qualification reports, and electronic submission" }
  ].map((item) => renderTemplate`<div class="flex items-start gap-3 p-4 bg-navy-50/40 rounded-lg"> <svg class="w-5 h-5 text-crst-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> <div> <div class="font-heading font-semibold text-navy-800 text-sm">${item.title}</div> <div class="text-xs text-navy-600/60">${item.desc}</div> </div> </div>`)} </div> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">Postage Classes We Handle</h3> <div class="space-y-4"> ${[
    { title: "USPS Marketing Mail (Standard)", desc: "The most common class for direct mail campaigns. Minimum 200 pieces or 50 lbs. Lowest rates available through presort and automation. Typical delivery in 3\u201310 business days." },
    { title: "First-Class Presort", desc: "Faster delivery (1\u20135 business days) with forwarding and return services. Presort discounts reduce the per-piece cost below single-piece rates. Ideal for invoices, statements, and time-sensitive communications." },
    { title: "Non-Profit Marketing Mail", desc: 'Deeply discounted postage rates for qualified 501(c)(3) organizations. We help non-profits apply for and maintain their USPS non-profit mailing authorization. See our <a href="/services/non-profit-mailing" class="text-crst-accent hover:text-crst-primary underline">non-profit mailing services</a> for details.' },
    { title: "Every Door Direct Mail (EDDM)", desc: 'No mailing list required \u2014 reach every address on selected postal routes. Starting at just $0.260/piece for postage. See our <a href="/services/eddm" class="text-crst-accent hover:text-crst-primary underline">EDDM services</a> for details.' }
  ].map((item) => renderTemplate`<div class="p-4 bg-navy-50/30 rounded-lg border border-navy-100/50"> <h4 class="font-heading font-bold text-navy-800 mb-1">${item.title}</h4> <p class="text-sm text-navy-600/70 leading-relaxed">${unescapeHTML(item.desc)}</p> </div>`)} </div> <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 mt-10 text-center"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Ready to Save on Postage?</p> <p class="text-navy-600/70 text-sm mb-4">Get a quote on presort processing and see how much your organization can save.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/estimate" class="btn-primary text-sm">Get a Free Estimate</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">Bring Your Own Pieces</h3> <p class="text-navy-600/80 leading-relaxed mb-4">
Already have your mail pieces printed? We offer mailing-only services. Deliver your printed pieces to our facility and we'll handle addressing, presorting, postage, and USPS induction. This is popular with organizations that have in-house print capabilities but need postal expertise and presort discounts.
</p> <h3 class="text-xl font-display text-crst-primary mt-10 mb-4">Mailing Permits</h3> <p class="text-navy-600/80 leading-relaxed mb-4">
USPS requires a mailing permit for presorted and bulk mailings. If your organization doesn't have one, we can mail under our permit or help you obtain your own. We also assist non-profits in applying for the USPS non-profit authorization that unlocks the lowest available postage rates. Visit our <a href="/direct-mail-tools/cornerstone-mailing-permits" class="text-crst-accent hover:text-crst-primary underline">mailing permits guide</a> for more information.
</p> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl font-display text-crst-primary mb-3">Recent Campaigns</h2> <p class="text-navy-600/80 leading-relaxed mb-6">We've handled mailing services for businesses, nonprofits, publishers, and national organizations. A few recent examples:</p> <div class="grid sm:grid-cols-2 gap-4 mb-4"> ${renderComponent($$result2, "CaseStudyCallout", $$CaseStudyCallout, { "href": "/case-studies/national-magazine-periodical", "client": "O'Dwyer's PR Magazine \u2014 National", "summary": "We handle Periodical rate presort and USPS induction for O'Dwyer's PR magazine each month, including full compliance verification of indicia placement, content ratios, and documentation before every drop.", "anchor": "USPS periodical rate mailing for O'Dwyer's PR magazine" })} ${renderComponent($$result2, "CaseStudyCallout", $$CaseStudyCallout, { "href": "/case-studies/national-product-recall", "client": "Robertshaw Controls \u2014 Multi-State", "summary": "Robertshaw Controls needed to notify hundreds of thousands of appliance owners across multiple states of a product safety recall within a compressed legal timeline. We coordinated variable-data printing, presort, and USPS induction without outsourcing a single step.", "anchor": "national product recall notification mailing for Robertshaw Controls" })} ${renderComponent($$result2, "CaseStudyCallout", $$CaseStudyCallout, { "href": "/case-studies/waste-management", "client": "Multi-County Waste Management Provider", "summary": "A regional waste management company needed zone-specific customer notifications with variable data delivered within a required notification window. We produced customized pieces by service zone and completed distribution on schedule.", "anchor": "regional customer notification mailing for a multi-county waste management provider" })} </div> <h3 class="text-xl font-display text-crst-primary mt-10 mb-6">Mailing Services FAQ</h3> <div class="space-y-4"> ${mailingFaqs.map((item) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${item.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.a}</p> </div>`)} </div> </div> <!-- Sidebar --> <div class="lg:col-span-1"> <div class="sticky top-24 space-y-5"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Get a Mailing Quote</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">
Include your quantity, mail piece size, and target area. We'll quote postage and processing.
</p> <a href="/estimate" class="btn-accent w-full text-center text-sm">
Request Quote
</a> <div class="mt-4 pt-4 border-t border-white/10 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-white/70 text-sm font-heading hover:text-white transition-colors">
or call ${BUSINESS.phone} </a> </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Related Services</h3> <div class="space-y-2"> ${[
    { label: "Direct Mail Campaigns", href: "/services/direct-mail" },
    { label: "Data Lists", href: "/services/data-lists" },
    { label: "Printing Services", href: "/services/printing" },
    { label: "EDDM", href: "/services/eddm" },
    { label: "Non-Profit Mailing", href: "/services/non-profit-mailing" }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${link.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Postage Savings</h3> <div class="space-y-3 text-sm text-navy-600/70"> <p>Marketing Mail presort can save <strong class="text-navy-800">30–50%</strong> vs. single-piece rates.</p> <p>Non-profit rates are the <strong class="text-navy-800">lowest USPS offers</strong> — as low as $0.132/piece.</p> <p>EDDM postage starts at just <strong class="text-navy-800">$0.260/piece</strong> with no list needed.</p> </div> </div> </div> </div> </div> </div> </section> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, {})} </div> <section class="py-10 bg-crst-primary/5 border-y border-crst-primary/10"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h3 class="text-xl font-display font-bold text-crst-primary mb-3">Ready to Save on Postage?</h3> <p class="text-gray-600 mb-6 max-w-2xl mx-auto">Get a quote on presort processing and see how much your organization can save.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="btn-primary inline-flex items-center gap-2"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> <a href="/estimate" class="btn-accent inline-flex items-center gap-2">
Get a Free Estimate
<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> </div> </div> </section> <section class="py-14 bg-navy-50/50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-8"> <h2 class="text-2xl font-display font-bold text-crst-primary">Service Areas</h2> <p class="text-gray-600 mt-2">We serve businesses and organizations across three Hudson Valley counties.</p> </div> <div class="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"> ${Object.values(COUNTIES).map((county) => renderTemplate`<a${addAttribute(`/service-areas/${county.slug}`, "href")} class="flex items-center justify-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <svg class="w-5 h-5 text-crst-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span class="font-heading font-semibold text-gray-800 group-hover:text-crst-primary transition-colors">${county.name}</span> </a>`)} </div> </div> </section> <section class="py-16 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-10"> <h2 class="text-2xl font-display font-bold text-crst-primary mb-3">Mailing Services Guides</h2> <p class="text-navy-600/70 max-w-2xl mx-auto">In-depth guides on bulk mailing vs. First-Class, presort discounts, inkjet addressing, DIY vs. mail house, and what a lettershop actually does — written by Sean Griffin, MDP, owner of Cornerstone Services since 1998.</p> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"> ${clusterArticles.map((a) => renderTemplate`<a${addAttribute(`/services/mailing/${a.slug}`, "href")} class="block p-5 bg-navy-50/40 rounded-xl border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <h3 class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors leading-snug mb-2">${a.data.title}</h3> <p class="text-xs text-navy-600/60 line-clamp-2 leading-relaxed">${a.data.description}</p> </a>`)} </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(graphSchema))) })}` })}`;
}, "/home/runner/workspace/src/pages/services/mailing.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/services/mailing.astro";
const $$url = "/services/mailing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mailing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
