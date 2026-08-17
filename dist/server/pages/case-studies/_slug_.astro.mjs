/* empty css                                     */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, i as addAttribute, k as Fragment, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { $ as $$AnswerBlock } from '../../chunks/AnswerBlock_C05MnarO.mjs';
import { S as SERVICES, B as BUSINESS } from '../../chunks/site_BORfRXu4.mjs';
import { C as CASE_STUDIES_FULL } from '../../chunks/case-studies_BE2WQhD5.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://crst.net");
function getStaticPaths() {
  return CASE_STUDIES_FULL.map((cs) => ({
    params: { slug: cs.slug },
    props: { caseStudy: cs }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { caseStudy } = Astro2.props;
  const relatedStudies = CASE_STUDIES_FULL.filter((cs) => cs.slug !== caseStudy.slug).sort((a, b) => {
    const aMatch = a.industry === caseStudy.industry ? 1 : 0;
    const bMatch = b.industry === caseStudy.industry ? 1 : 0;
    return bMatch - aMatch;
  }).slice(0, 3);
  const relatedServicePages = SERVICES.filter(
    (s) => caseStudy.relatedServices.includes(s.slug)
  );
  const title = `${caseStudy.title} | Case Study`;
  const description = `${caseStudy.client} \u2014 ${caseStudy.challenge.slice(0, 150)}... See how Cornerstone Services helped with ${caseStudy.servicesUsed.join(", ")}.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    author: {
      "@type": "Person",
      name: "Sean Griffin"
    },
    publisher: { "@id": "https://crst.net/#organization" },
    description,
    url: `https://crst.net/case-studies/${caseStudy.slug}`,
    about: caseStudy.client
  };
  const faqSchema = caseStudy.faqs && caseStudy.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: caseStudy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate(_b || (_b = __template([" ", ' <script type="application/ld+json">', "<\/script> ", "", '<section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-3 gap-12"> <!-- Main Content --> <div class="lg:col-span-2"> ', " <!-- Case Study Image --> ", " <!-- Key Metrics --> ", ' <!-- Challenge --> <div class="mb-10"> <div class="section-divider mb-4"></div> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">\nThe Challenge\n</h2> <p class="text-gray-700 leading-relaxed"> ', ' </p> </div> <!-- Solution --> <div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">\nOur Solution\n</h2> <p class="text-gray-700 leading-relaxed"> ', ' </p> </div> <!-- Results --> <div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">\nThe Results\n</h2> <p class="text-gray-700 leading-relaxed"> ', " </p> </div> ", " ", " ", " ", " ", " ", " ", " <!-- Testimonial --> ", ' <!-- Services Used --> <div class="mb-10"> <h3 class="text-lg font-display text-crst-primary mb-4">Services Used</h3> <div class="flex flex-wrap gap-2"> ', " </div> </div> <!-- Related Service Pages --> ", ' </div> <!-- Sidebar --> <div class="lg:col-span-1"> <!-- Project Details --> <div class="bg-crst-light rounded-xl p-6 mb-6 sticky top-24"> <h3 class="font-display font-bold text-crst-primary mb-4">Project Details</h3> <div class="space-y-3 text-sm"> <div class="flex justify-between border-b border-crst-primary/10 pb-2"> <span class="text-gray-600">Client</span> <span class="font-semibold text-gray-800 text-right">', '</span> </div> <div class="flex justify-between border-b border-crst-primary/10 pb-2"> <span class="text-gray-600">Location</span> <span class="font-semibold text-gray-800">', '</span> </div> <div class="flex justify-between border-b border-crst-primary/10 pb-2"> <span class="text-gray-600">Industry</span> <span class="font-semibold text-gray-800">', '</span> </div> <div class="flex justify-between"> <span class="text-gray-600">Services</span> <span class="font-semibold text-gray-800 text-right">', ' used</span> </div> </div> <div class="mt-6 space-y-3"> <a href="/estimate" class="btn-primary w-full text-center text-sm block">\nGet a Free Estimate\n</a> <a', ' class="btn-secondary w-full text-center text-sm block">\nCall ', ' </a> </div> </div> <!-- Related Case Studies --> <div class="bg-white border border-gray-200 rounded-xl p-6"> <h3 class="font-display font-bold text-crst-primary mb-4">More Case Studies</h3> <div class="space-y-4"> ', ' </div> <a href="/case-studies" class="mt-4 text-sm text-crst-accent font-semibold hover:underline block">\nView All Case Studies \u2192\n</a> </div> </div> </div> </div> </section> ', " "])), renderComponent($$result2, "PageHero", $$PageHero, { "title": caseStudy.title, "subtitle": `${caseStudy.client} \xB7 ${caseStudy.location} \xB7 ${caseStudy.industry}`, "breadcrumbs": [
    { label: "Case Studies", href: "/case-studies" },
    { label: caseStudy.client }
  ] }), unescapeHTML(JSON.stringify(schema)), faqSchema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(faqSchema))), maybeRenderHead(), caseStudy.leadAnswer && renderTemplate`${renderComponent($$result2, "AnswerBlock", $$AnswerBlock, { "answer": caseStudy.leadAnswer })}`, caseStudy.image && renderTemplate`<div class="mb-10 rounded-xl overflow-hidden bg-gradient-to-br from-crst-primary/5 to-crst-accent/5"> <img${addAttribute(caseStudy.image, "src")}${addAttribute(caseStudy.imageAlt || caseStudy.title, "alt")} class="w-full h-auto max-h-96 object-contain mx-auto p-4" loading="eager"> </div>`, caseStudy.keyMetrics && caseStudy.keyMetrics.length > 0 && renderTemplate`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"> ${caseStudy.keyMetrics.map((metric) => renderTemplate`<div class="bg-crst-light rounded-lg p-4 text-center"> <div class="text-lg font-display font-bold text-crst-primary">${metric.value}</div> <div class="text-xs text-gray-500 mt-1">${metric.label}</div> </div>`)} </div>`, caseStudy.challenge, caseStudy.solution, caseStudy.results, caseStudy.background && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">
Background
</h2> <p class="text-gray-700 leading-relaxed"> ${caseStudy.background} </p> </div>`, caseStudy.strategyDetails && caseStudy.strategyDetails.length > 0 && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">
Strategy & Execution
</h2> <div class="space-y-6"> ${caseStudy.strategyDetails.map((detail) => {
    const colonIndex = detail.indexOf(":");
    const hasLabel = colonIndex > 0 && colonIndex < 60;
    return renderTemplate`<div class="border-l-2 border-crst-gold pl-4"> ${hasLabel ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <h3 class="font-semibold text-gray-800 text-sm mb-2">${detail.slice(0, colonIndex)}</h3> <p class="text-gray-700 text-sm leading-relaxed">${detail.slice(colonIndex + 2)}</p> ` })}` : renderTemplate`<p class="text-gray-700 text-sm leading-relaxed">${detail}</p>`} </div>`;
  })} </div> </div>`, caseStudy.designApproach && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">
Design Approach
</h2> <p class="text-gray-700 leading-relaxed"> ${caseStudy.designApproach} </p> </div>`, caseStudy.postalStrategy && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">
Postal Strategy
</h2> <p class="text-gray-700 leading-relaxed"> ${caseStudy.postalStrategy} </p> </div>`, caseStudy.lessonsLearned && caseStudy.lessonsLearned.length > 0 && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">
Key Takeaways
</h2> <div class="space-y-4"> ${caseStudy.lessonsLearned.map((lesson) => renderTemplate`<div class="flex gap-3 items-start"> <div class="w-2 h-2 rounded-full bg-crst-accent mt-2 shrink-0"></div> <p class="text-gray-700 text-sm leading-relaxed">${lesson}</p> </div>`)} </div> </div>`, caseStudy.industryContext && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-4">
Industry Context
</h2> <p class="text-gray-700 leading-relaxed"> ${caseStudy.industryContext} </p> </div>`, caseStudy.faqs && caseStudy.faqs.length > 0 && renderTemplate`<div class="mb-10"> <h2 class="text-xl sm:text-2xl font-display text-crst-primary mb-6">
Frequently Asked Questions
</h2> <div class="space-y-4"> ${caseStudy.faqs.map((faq, i) => renderTemplate`<details class="group bg-white border border-gray-200 rounded-lg"${addAttribute(i === 0, "open")}> <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"> <h3 class="font-semibold text-gray-800 text-sm pr-4">${faq.question}</h3> <svg class="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"> ${faq.answer} </div> </details>`)} </div> </div>`, caseStudy.testimonialQuote && renderTemplate`<div class="bg-crst-primary/5 border-l-4 border-crst-gold rounded-r-xl p-6 mb-10"> <p class="text-gray-700 italic leading-relaxed mb-3">"${caseStudy.testimonialQuote}"</p> ${caseStudy.testimonialAuthor && renderTemplate`<p class="text-sm font-semibold text-crst-primary">— ${caseStudy.testimonialAuthor}</p>`} </div>`, caseStudy.servicesUsed.map((service) => renderTemplate`<span class="text-sm bg-crst-light text-crst-primary px-3 py-1.5 rounded-full font-medium"> ${service} </span>`), relatedServicePages.length > 0 && renderTemplate`<div class="mb-10"> <h3 class="text-lg font-display text-crst-primary mb-4">Learn More About These Services</h3> <div class="grid sm:grid-cols-2 gap-4"> ${relatedServicePages.map((service) => renderTemplate`<a${addAttribute(`/services/${service.slug}`, "href")} class="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-crst-primary/30 hover:bg-gray-50 transition-all group"> <div class="w-2 h-2 rounded-full bg-crst-gold mt-2 shrink-0"></div> <div> <div class="font-semibold text-sm text-gray-800 group-hover:text-crst-primary transition-colors"> ${service.title} </div> <div class="text-xs text-gray-500 mt-1">${service.summary}</div> </div> </a>`)} </div> </div>`, caseStudy.client, caseStudy.location, caseStudy.industry, caseStudy.servicesUsed.length, addAttribute(`tel:${BUSINESS.phoneClean}`, "href"), BUSINESS.phone, relatedStudies.map((related) => renderTemplate`<a${addAttribute(`/case-studies/${related.slug}`, "href")} class="block group"> <div class="font-semibold text-sm text-gray-800 group-hover:text-crst-primary transition-colors mb-1"> ${related.title} </div> <div class="text-xs text-gray-500"> ${related.client} · ${related.industry} </div> </a>`), renderComponent($$result2, "CTASection", $$CTASection, { "headline": `Need Results Like ${caseStudy.client}?`, "text": `Tell us about your ${caseStudy.industry.toLowerCase()} project. We'll recommend the right direct mail strategy for your goals and budget.` })) })}`;
}, "/home/runner/workspace/src/pages/case-studies/[slug].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/case-studies/[slug].astro";
const $$url = "/case-studies/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
