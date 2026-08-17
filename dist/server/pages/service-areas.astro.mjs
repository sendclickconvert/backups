/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS, C as COUNTIES } from '../chunks/site_BORfRXu4.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Service Areas", "description": `${BUSINESS.name} serves businesses and organizations across Ulster, Dutchess, and Orange Counties in the Hudson Valley \u2014 over ${BUSINESS.stats.municipalities} municipalities.` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Service Areas", "subtitle": `Based in ${BUSINESS.address.city}, NY \u2014 serving ${BUSINESS.stats.municipalities} municipalities across the Hudson Valley.`, "breadcrumbs": [{ label: "Service Areas" }] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid sm:grid-cols-3 gap-6"> ${Object.values(COUNTIES).map((county) => renderTemplate`<a${addAttribute(`/service-areas/${county.slug}`, "href")} class="card group block text-center"> <div class="w-16 h-16 rounded-full bg-crst-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-crst-primary transition-colors duration-300"> <svg class="w-7 h-7 text-crst-primary group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <h2 class="text-xl font-display text-navy-800 mb-2 group-hover:text-crst-primary transition-colors"> ${county.name} </h2> <p class="text-sm text-navy-600/60 leading-relaxed mb-3"> ${county.description} </p> <div class="text-xs font-heading font-semibold text-navy-500">
Anchor City: ${county.anchor} </div> </a>`)} </div> <!-- Map / description --> <div class="mt-14 bg-navy-50/50 rounded-xl p-8 border border-navy-100"> <div class="grid lg:grid-cols-2 gap-8 items-center"> <div> <h2 class="text-2xl font-display text-crst-primary mb-4">The Hudson Valley Region</h2> <p class="text-navy-600/80 font-heading leading-relaxed mb-4">
Cornerstone Services operates from our facility at ${BUSINESS.address.full}. From here, we serve businesses, non-profits, municipalities, and organizations throughout Ulster County, Dutchess County, and Orange County.
</p> <p class="text-navy-600/80 font-heading leading-relaxed mb-4">
Our four anchor cities — New Paltz, Kingston, Poughkeepsie, and Newburgh — give us deep coverage across the region. Each city page includes the towns, villages, and hamlets we serve within that area.
</p> <p class="text-navy-600/80 font-heading leading-relaxed">
We also handle national and international mailing projects. If you're outside the Hudson Valley, <a href="/contact" class="text-crst-accent hover:underline font-semibold">contact us</a> — we can help.
</p> </div> <div class="rounded-xl overflow-hidden border border-navy-200 aspect-[4/3]"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380000!2d-74.2!3d41.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHudson+Valley+NY!5e0!3m2!1sen!2sus!4v1" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" title="Hudson Valley service area map"></iframe> </div> </div> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} ` })}`;
}, "/home/runner/workspace/src/pages/service-areas/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/service-areas/index.astro";
const $$url = "/service-areas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
