/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B4gpCp1X.mjs';
import { B as BUSINESS } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$ThankYou = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Thank You", "noIndex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 lg:py-28"> <div class="container-narrow text-center"> <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"> <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-3xl sm:text-4xl font-display text-crst-primary mb-4">Thank You!</h1> <p class="text-lg text-navy-600/70 font-heading max-w-lg mx-auto mb-6">
We've received your message and will be in touch within one business day. If your project is urgent, don't hesitate to call us directly.
</p> <div class="flex flex-wrap items-center justify-center gap-4"> <a href="/" class="btn-primary text-sm">Back to Home</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="btn-secondary text-sm">
Call ${BUSINESS.phone} </a> </div> </div> </section> ` })}`;
}, "/home/runner/workspace/src/pages/thank-you.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThankYou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
