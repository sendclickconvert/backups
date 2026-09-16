/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      q: `What is the minimum order size for a direct mail campaign?`,
      a: `There's no strict minimum, but most campaigns start at 200 pieces to take advantage of presort postage discounts. For EDDM (Every Door Direct Mail), the minimum is typically one carrier route, which can be as few as 200\u2013500 addresses depending on the area.`
    },
    {
      q: `How long does a typical direct mail campaign take from start to finish?`,
      a: `A standard campaign takes 2\u20133 weeks from initial consultation to mailbox delivery. This includes data preparation (2\u20133 days), design (3\u20135 days if needed), printing (3\u20135 days), and mailing/delivery (3\u20137 business days depending on mail class). Rush timelines are available for urgent projects.`
    },
    {
      q: `Do I need to provide my own mailing list?`,
      a: `No. We can build a targeted mailing list for you using USPS carrier route data, consumer demographics, or business databases. Every list is NCOA-processed (National Change of Address) to ensure accurate delivery. You can also provide your own list and we'll clean and verify it.`
    },
    {
      q: `What is EDDM and how is it different from targeted direct mail?`,
      a: `EDDM (Every Door Direct Mail) delivers to every mailbox on selected postal carrier routes \u2014 no mailing list required. It's ideal for local businesses wanting to blanket a neighborhood. Targeted direct mail uses a specific mailing list filtered by demographics, geography, or other criteria. EDDM is typically cheaper per piece but less targeted.`
    },
    {
      q: `Can you help non-profit organizations get discounted postage rates?`,
      a: `Yes. Non-profit organizations can save significantly on postage through USPS non-profit rates. We guide you through the PS Form 3624 application process to get your non-profit mailing authorization. We also have an interactive tool on our website to help with the application.`
    },
    {
      q: `What types of mail pieces can you print?`,
      a: `We print postcards (4"\xD76" through 6"\xD711"), self-mailers, letters with envelopes, newsletters, brochures, business cards, booklets, and more. Both digital and offset printing are available depending on quantity and specifications.`
    },
    {
      q: `Do you handle the graphic design for mail pieces?`,
      a: `Yes. Our designers create mail pieces that are both visually effective and USPS-compliant. This includes proper barcode placement, indicia positioning, address block formatting, and automation compatibility. You can also provide print-ready artwork.`
    },
    {
      q: `What areas do you serve?`,
      a: `We're based in ${BUSINESS.address.city}, NY and primarily serve Ulster, Dutchess, and Orange Counties \u2014 that's over ${BUSINESS.stats.municipalities} municipalities across the Hudson Valley. We also handle national and international mailing projects.`
    },
    {
      q: `How do I track my mailing after it's sent?`,
      a: `Every mail piece we process includes an Intelligent Mail barcode (IMb) which allows USPS tracking. We provide delivery reports so you can see when your mail is arriving in mailboxes. For larger campaigns, we can provide detailed delivery analytics.`
    },
    {
      q: `What are your payment options?`,
      a: `We accept checks, ACH transfers, and credit card payments through our secure online payment portal. A 3% processing fee applies to credit card payments. Deposits may be required for large or first-time orders.`
    }
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Frequently Asked Questions", "description": "Common questions about direct mail services, EDDM, mailing lists, printing, non-profit mailing, and more from Cornerstone Services.", "schema": faqSchema }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Frequently Asked Questions", "subtitle": "Quick answers to common questions about our direct mail and printing services.", "breadcrumbs": [{ label: "FAQ" }] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-narrow"> <div class="space-y-4"> ${faqs.map((faq, i) => renderTemplate`<details class="group bg-white rounded-xl border border-navy-100 overflow-hidden"${addAttribute(i === 0, "open")}> <summary class="flex items-center justify-between cursor-pointer px-6 py-4 font-heading font-semibold text-navy-800 hover:text-crst-primary transition-colors list-none"> <span class="pr-4">${faq.q}</span> <svg class="w-5 h-5 shrink-0 text-navy-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-6 pb-5"> <p class="text-sm text-navy-600/80 leading-relaxed">${faq.a}</p> </div> </details>`)} </div> <div class="mt-10 text-center"> <p class="text-navy-600/60 font-heading text-sm mb-3">Don't see your question?</p> <a href="/contact" class="btn-secondary text-sm">Contact Us</a> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} ` })}`;
}, "/home/runner/workspace/src/pages/faq.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
