/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$EstimateForm } from '../chunks/EstimateForm_Bs6Tp6Zn.mjs';
import { B as BUSINESS } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$Estimate = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Get a Free Estimate", "description": `Request a free estimate for your direct mail, printing, or data list project from ${BUSINESS.name}. Call ${BUSINESS.phone} or fill out our form.` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Get a Free Estimate", "subtitle": "Tell us about your project and we'll put together a detailed quote \u2014 usually within one business day.", "breadcrumbs": [{ label: "Get Estimate" }] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid lg:grid-cols-5 gap-10 lg:gap-14"> <!-- Form --> <div class="lg:col-span-3 order-2 lg:order-1"> <div class="bg-navy-50/40 rounded-xl p-6 lg:p-8 border border-navy-100"> <h2 class="text-xl font-display text-crst-primary mb-2">Request Your Estimate</h2> <p class="text-sm text-navy-600/60 font-heading mb-6">
Include as much detail as you can — mail piece type, quantity, target area, and timeline help us provide the most accurate quote.
</p> ${renderComponent($$result2, "EstimateForm", $$EstimateForm, {})} </div> </div> <!-- Sidebar info --> <div class="lg:col-span-2 order-1 lg:order-2"> <h2 class="text-xl font-display text-crst-primary mb-4">What to Include</h2> <p class="text-sm text-navy-600/70 font-heading leading-relaxed mb-6">
The more detail you provide, the faster and more accurate your estimate. Here's what helps:
</p> <div class="space-y-3"> ${[
    "Type of mail piece (postcard, letter, self-mailer, etc.)",
    "Approximate quantity",
    "Target area (ZIP codes, towns, carrier routes)",
    "Whether you have a mailing list or need one",
    "Whether you need design work",
    "Timeline or desired in-home date"
  ].map((item) => renderTemplate`<div class="flex items-start gap-3"> <svg class="w-4 h-4 text-crst-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> <span class="text-sm text-navy-700 font-heading">${item}</span> </div>`)} </div> <div class="mt-8 p-5 bg-crst-primary/5 rounded-lg border border-crst-primary/10"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-2">Prefer to call?</h3> <p class="text-sm text-navy-600/70 leading-relaxed mb-3">
We're happy to discuss your project over the phone and walk you through options.
</p> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="btn-secondary text-xs px-4 py-2"> <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> </div> </div> </section> ` })}`;
}, "/home/runner/workspace/src/pages/estimate.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/estimate.astro";
const $$url = "/estimate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Estimate,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
