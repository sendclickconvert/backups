/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS } from '../chunks/site_BORfRXu4.mjs';
import { C as CASE_STUDIES_FULL } from '../chunks/case-studies_BE2WQhD5.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const industries = [...new Set(CASE_STUDIES_FULL.map((cs) => cs.industry))];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Direct Mail Case Studies | Cornerstone Services", "description": "Real direct mail success stories from Cornerstone Services \u2014 insurance, healthcare, political, non-profit, retail, and corporate campaigns across the Hudson Valley and beyond." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Case Studies", "subtitle": `Real results from ${CASE_STUDIES_FULL.length} direct mail campaigns \u2014 local businesses, national organizations, and everything in between.`, "breadcrumbs": [
    { label: "Case Studies" }
  ] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-3xl mb-14"> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4"> ${BUSINESS.stats.piecesMailed} Pieces Mailed. Here Are Some of Our Favorites.
</h2> <p class="text-gray-700 leading-relaxed">
Every mailing has a story. From a Fortune 500 recruitment campaign in South Carolina to a neighborhood Chinese restaurant that needed menus reprinted in 48 hours, these case studies show the range of what Cornerstone delivers — and why clients come back.
</p> </div> <!-- Industry Filter Tags --> <div class="flex flex-wrap gap-2 mb-10"> <span class="text-sm font-semibold text-gray-500 mr-2 self-center">Industries:</span> ${industries.map((industry) => {
    const slug = industry.toLowerCase().replace(/[\s\/]+/g, "-");
    return renderTemplate`<a${addAttribute(`#${slug}`, "href")} class="text-xs bg-crst-light text-crst-primary px-3 py-1.5 rounded-full font-medium hover:bg-crst-primary hover:text-white transition-colors cursor-pointer"> ${industry} </a>`;
  })} </div> <!-- Case Study Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${CASE_STUDIES_FULL.map((cs) => {
    const industrySlug = cs.industry.toLowerCase().replace(/[\s\/]+/g, "-");
    return renderTemplate`<a${addAttribute(industrySlug, "id")}${addAttribute(`/case-studies/${cs.slug}`, "href")} class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"> <!-- Image area --> <div class="h-48 bg-gradient-to-br from-crst-primary/10 to-crst-accent/10 flex items-center justify-center overflow-hidden"> ${cs.image ? renderTemplate`<img${addAttribute(cs.image, "src")}${addAttribute(cs.imageAlt || cs.title, "alt")} class="w-full h-full object-contain p-4" loading="lazy">` : renderTemplate`<div class="text-center"> <div class="text-sm font-semibold text-crst-primary/60 uppercase tracking-wider">${cs.industry}</div> <div class="text-xs text-gray-400 mt-1">${cs.location}</div> </div>`} </div> <div class="p-6"> <h3 class="text-lg font-display font-bold text-gray-800 group-hover:text-crst-primary transition-colors mb-2 line-clamp-2"> ${cs.title} </h3> <div class="flex items-center gap-2 text-sm text-gray-500 mb-3"> <span>${cs.client}</span> <span>·</span> <span>${cs.location}</span> </div> <p class="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3"> ${cs.challenge} </p> <div class="flex flex-wrap gap-1.5 mb-4"> ${cs.servicesUsed.slice(0, 3).map((service) => renderTemplate`<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">${service}</span>`)} </div> <span class="text-sm text-crst-accent font-semibold group-hover:underline">
Read Case Study →
</span> </div> </a>`;
  })} </div> </div> </section>  <section class="py-14 bg-crst-primary"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"> <div> <div class="text-3xl font-display font-bold text-white">${BUSINESS.stats.piecesMailed}</div> <div class="text-sm text-white/70 mt-1">Pieces Mailed</div> </div> <div> <div class="text-3xl font-display font-bold text-white">${BUSINESS.stats.years}</div> <div class="text-sm text-white/70 mt-1">Years in Business</div> </div> <div> <div class="text-3xl font-display font-bold text-white">${BUSINESS.stats.onTime}</div> <div class="text-sm text-white/70 mt-1">On-Time Rate</div> </div> <div> <div class="text-3xl font-display font-bold text-white">BBB A+</div> <div class="text-sm text-white/70 mt-1">Rated Since 1998</div> </div> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, { "headline": "Have a Mailing Project in Mind?", "text": "Every case study starts with a conversation. Tell us about your goals and we'll recommend the right approach \u2014 whether it's targeted data lists, EDDM saturation, or a multi-touch campaign." })} ` })}`;
}, "/home/runner/workspace/src/pages/case-studies/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/case-studies/index.astro";
const $$url = "/case-studies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
