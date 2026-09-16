/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$EstimateForm } from '../chunks/EstimateForm_Bs6Tp6Zn.mjs';
import { B as BUSINESS } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact Us", "description": `Contact ${BUSINESS.name} for direct mail, printing, and data services. Call ${BUSINESS.phone} or visit us at ${BUSINESS.address.full}.` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Contact Us", "subtitle": "Get in touch \u2014 we're here to help with your next mailing project.", "breadcrumbs": [{ label: "Contact" }] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid lg:grid-cols-5 gap-10 lg:gap-14"> <!-- Contact info --> <div class="lg:col-span-2"> <h2 class="text-xl font-display text-crst-primary mb-6">Get In Touch</h2> <div class="space-y-5"> <div> <div class="text-xs font-heading font-semibold text-navy-500 uppercase tracking-wider mb-1.5">Phone</div> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-lg font-heading font-semibold text-navy-800 hover:text-crst-primary transition-colors"> ${BUSINESS.phone} </a> <div class="text-sm text-navy-500 mt-0.5">
Alt: <a${addAttribute(`tel:${BUSINESS.altPhoneClean}`, "href")} class="hover:text-crst-primary transition-colors">${BUSINESS.altPhone}</a> </div> </div> <div> <div class="text-xs font-heading font-semibold text-navy-500 uppercase tracking-wider mb-1.5">Email</div> <a${addAttribute(`mailto:${BUSINESS.email}`, "href")} class="text-lg font-heading font-semibold text-navy-800 hover:text-crst-primary transition-colors"> ${BUSINESS.email} </a> </div> <div> <div class="text-xs font-heading font-semibold text-navy-500 uppercase tracking-wider mb-1.5">Address</div> <address class="not-italic text-navy-700 font-heading leading-relaxed"> ${BUSINESS.address.street}<br> ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip} </address> </div> <div> <div class="text-xs font-heading font-semibold text-navy-500 uppercase tracking-wider mb-1.5">Hours</div> <p class="text-navy-700 font-heading">Monday – Friday: 8:30 AM – 5:00 PM</p> <p class="text-navy-500 text-sm font-heading">Saturday & Sunday: Closed</p> </div> </div> <!-- Map --> <div class="mt-8 rounded-xl overflow-hidden border border-navy-100 aspect-[4/3]"> <iframe src="https://maps.google.com/maps?q=387+Malden+Turnpike,+Saugerties,+NY+12477&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"${addAttribute(`${BUSINESS.name} location map`, "title")}></iframe> </div> </div> <!-- Form --> <div class="lg:col-span-3"> <div class="bg-navy-50/40 rounded-xl p-6 lg:p-8 border border-navy-100"> <h2 class="text-xl font-display text-crst-primary mb-2">Send Us a Message</h2> <p class="text-sm text-navy-600/60 font-heading mb-6">
Fill out the form below and we'll get back to you within one business day.
</p> ${renderComponent($$result2, "EstimateForm", $$EstimateForm, {})} </div> </div> </div> </div> </section> ` })}`;
}, "/home/runner/workspace/src/pages/contact.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
