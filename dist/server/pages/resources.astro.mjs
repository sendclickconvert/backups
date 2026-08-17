/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const resources = [
    {
      title: "Mailing Permits",
      slug: "/direct-mail-tools/cornerstone-mailing-permits",
      icon: "\u{1F4CB}",
      summary: "Understanding USPS permit types, indicia, EDDM requirements, and presort authorization for business mail.",
      external: true
    },
    {
      title: "Postage Rates",
      slug: "/direct-mail-tools/postage-rates",
      icon: "\u{1F4B0}",
      summary: "Current USPS postage rates for First-Class, Marketing Mail, Non-Profit, and EDDM \u2014 updated with the latest rate changes.",
      external: true
    },
    {
      title: "Envelope & Mail Piece Sizes",
      slug: "/direct-mail-tools/envelope-sizes",
      icon: "\u{1F4D0}",
      summary: "USPS size requirements for postcards, letters, and flats. Avoid surcharges by understanding minimum and maximum dimensions.",
      external: true
    },
    {
      title: "USPS Mail Templates",
      slug: "/usps-direct-mailer-templates",
      icon: "\u{1F4C4}",
      summary: "Free downloadable templates for postcards, letters, and self-mailers \u2014 pre-formatted to USPS automation specifications.",
      external: true
    },
    {
      title: "Postal Dictionary",
      slug: "/direct-mail-tools/postal-dictionary",
      icon: "\u{1F4D6}",
      summary: "A glossary of USPS terms, acronyms, and mailing industry jargon \u2014 from AADC to Zone Chart.",
      external: true
    },
    {
      title: "Mail Forwarding Guide",
      slug: "/direct-mail-tools/address-change",
      icon: "\u{1F4EC}",
      summary: "How USPS mail forwarding works, NCOA processing, and what it means for your mailing list accuracy.",
      external: true
    },
    {
      title: "Mail Automation & IMb",
      slug: "mail-automation",
      icon: "\u{1F916}",
      summary: "Intelligent Mail barcodes (IMb), automation rates, and how automation-compatible mail saves you money."
    },
    {
      title: "Non-Profit Mailing Guide",
      slug: "/non-profit-mailing-application",
      icon: "\u{1F3DB}\uFE0F",
      summary: "How to apply for non-profit mailing rates, PS Form 3624 requirements, eligibility rules, and rate savings.",
      external: true
    },
    {
      title: "Online Payments",
      slug: "payments",
      icon: "\u{1F4B3}",
      summary: "Pay your Cornerstone invoice online via credit card. Convenient and secure."
    },
    {
      title: "Ancillary Service Endorsements",
      slug: "ancillary-service-endorsements",
      icon: "\u{1F4E9}",
      summary: "What each USPS endorsement does \u2014 Address Service Requested, Return Service, Change Service \u2014 and when to use them."
    },
    {
      title: "Periodicals Mailing Class",
      slug: "periodicals",
      icon: "\u{1F4F0}",
      summary: "Who qualifies for Periodicals rates, how to apply, and how it compares to Marketing Mail for publishers."
    },
    {
      title: "Understanding Periodicals",
      slug: "understanding-periodicals",
      icon: "\u{1F4DA}",
      summary: "Zone pricing, ad/editorial splits, markup rules, and practical preparation tips for publishers."
    },
    {
      title: "EDDM Planning Guide",
      slug: "eddm-guide",
      icon: "\u{1F5FA}\uFE0F",
      summary: "How to plan an Every Door Direct Mail campaign \u2014 route selection, mail piece specs, pricing, and strategy."
    },
    {
      title: "Informed Delivery Guide",
      slug: "informed-delivery-guide",
      icon: "\u{1F4E7}",
      summary: "Free 22-page guide to USPS Informed Delivery \u2014 setup steps, ride-along image specs, case studies, and ROI measurement for businesses and nonprofits."
    },
    {
      title: "How to Respond to a Negative Yelp Review",
      slug: "how-to-respond-to-a-negative-yelp-review-a-true-story",
      icon: "\u2B50",
      summary: "Response frameworks, Yelp algorithm rules, and the real revenue impact of online reviews for small businesses."
    },
    {
      title: "Direct Mail vs. Email Marketing",
      slug: "direct-mail-vs-email-marketing",
      icon: "\u{1F4CA}",
      summary: "Open rates, response rates, ROI, and an honest comparison \u2014 after 30 years in the mailing business, here's what the data says."
    },
    {
      title: "Ship Potatoes Through USPS",
      slug: "ship-potatoes-through-usps",
      icon: "\u{1F954}",
      summary: "Yes, you can mail a potato through USPS \u2014 with or without packaging. Addressing, postage, perishability, and what to expect."
    },
    {
      title: "Chicken Shipping 101",
      slug: "chicken-shipping-101",
      icon: "\u{1F414}",
      summary: "Yes, USPS lets you mail live chickens. Approved containers, labeling rules, postage costs, and which post offices accept them."
    },
    {
      title: "Famous Postmasters at the USPS",
      slug: "famous-postmasters-usps",
      icon: "\u{1F3DB}\uFE0F",
      summary: "Abraham Lincoln, William Faulkner, Conrad Hilton, and Steve Carell all worked for the Postal Service. Here are the surprising names."
    },
    {
      title: "Point Roberts Post Office",
      slug: "point-roberts-post-office",
      icon: "\u{1F5FA}\uFE0F",
      summary: "To deliver mail to Point Roberts, WA 98281, USPS trucks drive through Canada \u2014 twice. America's most unusual post office."
    },
    {
      title: "Complete Friendraising Event Guide",
      slug: "complete-friendraising-guide",
      icon: "\u{1F91D}",
      summary: "A practical, experience-based guide to planning a friendraising event \u2014 from venue and invitations to follow-up checklists."
    },
    {
      title: "Nonprofit Database Change Request (Form 6015)",
      slug: "non-profit-database-change-request",
      icon: "\u{1F4CB}",
      summary: "Step-by-step guide to updating your nonprofit organization's information with the USPS using Form 6015."
    },
    {
      title: "Lessons from Marketing Failure",
      slug: "lessons-from-marketing-failure",
      icon: "\u{1F50D}",
      summary: "A real-world case study analyzing tree service EDDM mailers \u2014 what worked, what failed, and what your business can learn."
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Direct Mail Resources & Tools", "description": `Free mailing resources from ${BUSINESS.name} \u2014 postage rates, USPS templates, permit guides, postal dictionary, and tools to plan your direct mail campaign.` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Direct Mail Resources & Tools", "subtitle": "Everything you need to plan, prepare, and execute a successful direct mail campaign.", "breadcrumbs": [{ label: "Resources" }] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="max-w-3xl mb-12"> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">
Free Resources for Mailers
</h2> <p class="text-navy-600/80 leading-relaxed">
Whether you're planning your first mailing or your hundredth, these resources help you understand USPS requirements, compare postage options, and make informed decisions about your direct mail campaigns.
</p> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${resources.map((resource) => renderTemplate`<a${addAttribute(resource.external ? resource.slug : `/resources/${resource.slug}`, "href")} class="card group block"> <span class="text-3xl mb-3 block">${resource.icon}</span> <h3 class="font-heading font-bold text-navy-800 group-hover:text-crst-primary transition-colors mb-2"> ${resource.title} </h3> <p class="text-sm text-navy-600/70 leading-relaxed mb-4"> ${resource.summary} </p> <span class="inline-flex items-center gap-1 text-xs font-heading font-semibold text-crst-accent group-hover:text-crst-primary transition-colors">
View resource
<svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </span> </a>`)} </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} ` })}`;
}, "/home/runner/workspace/src/pages/resources/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/resources/index.astro";
const $$url = "/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
