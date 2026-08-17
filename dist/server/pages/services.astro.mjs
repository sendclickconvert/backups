/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$ServiceCard } from '../chunks/ServiceCard_Bmn_pxe2.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
import { S as SERVICES } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Services", "description": "Cornerstone Services offers direct mail campaigns, commercial printing, data lists, EDDM, graphic design, non-profit mailing, and web design for Hudson Valley businesses." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Our Services", "subtitle": "Everything you need for a successful direct mail campaign \u2014 under one roof.", "breadcrumbs": [{ label: "Services" }] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"> ${SERVICES.map((service) => renderTemplate`${renderComponent($$result2, "ServiceCard", $$ServiceCard, { "title": service.title, "slug": service.slug, "summary": service.description, "icon": service.icon })}`)} </div> </div> </section>  <section class="py-14 lg:py-18 bg-navy-50/50 bg-grid"> <div class="container-wide"> <div class="text-center mb-10"> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-3">Why Choose Cornerstone?</h2> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"> ${[
    { title: "One-Stop Shop", desc: "Strategy, Data, design, print, and mail \u2014 all handled in-house with a dedicated project manager." },
    { title: "Postal Expertise", desc: "Over 30 years of hands-on USPS experience equates to knowing what works, and, what doesn't work. (Spoiler: we go with what works)." },
    { title: "Local Knowledge", desc: "Huge mailing intelligence is now available. We read regional maps, review secondary wealth indices, know the lay-of-the-land local carrier routes, to target market effectively." },
    { title: "Proven Track Record", desc: "Most work is referral and most clients are returning. Our job is to get your mailing done on time, under budget and uneventfully." }
  ].map((item) => renderTemplate`<div class="text-center"> <div class="w-12 h-12 rounded-full bg-crst-primary/10 flex items-center justify-center mx-auto mb-3"> <svg class="w-5 h-5 text-crst-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> </div> <h3 class="font-heading font-bold text-navy-800 mb-1.5">${item.title}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.desc}</p> </div>`)} </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} ` })}`;
}, "/home/runner/workspace/src/pages/services/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/services/index.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
