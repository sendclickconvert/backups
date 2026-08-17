/* empty css                                        */
import { f as createAstro, g as createComponent, m as maybeRenderHead, r as renderTemplate, j as renderComponent, k as Fragment, u as unescapeHTML, i as addAttribute } from '../../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_B4gpCp1X.mjs';
import { H as HUB_NAV_ITEMS, S as SPOKE_SLUGS, E as ENVELOPE_SPOKES, $ as $$EnvelopeHubNav } from '../../../chunks/EnvelopeHubNav_DWKSb2lq.mjs';
import 'clsx';
import { $ as $$AuthorByline } from '../../../chunks/AuthorByline_DNWN2IXS.mjs';
import { $ as $$CTASection } from '../../../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS } from '../../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://crst.net");
const $$SpecTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SpecTable;
  const { dimensionsInches, dimensionsMm, weightLimitOz, postageClass, primaryUseCases } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="overflow-x-auto rounded-xl border border-navy-100 mb-10"> <table class="w-full text-sm"> <thead> <tr class="bg-crst-primary text-white"> <th colspan="2" class="px-5 py-3 text-left font-heading font-semibold text-sm">Envelope Specifications</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white hover:bg-navy-50/30 transition-colors"> <td class="px-5 py-3 font-heading font-semibold text-navy-800 w-2/5">Dimensions (inches)</td> <td class="px-5 py-3 text-navy-600 font-mono text-xs">${dimensionsInches}</td> </tr> <tr class="bg-white hover:bg-navy-50/30 transition-colors"> <td class="px-5 py-3 font-heading font-semibold text-navy-800">Dimensions (mm)</td> <td class="px-5 py-3 text-navy-600 font-mono text-xs">${dimensionsMm}</td> </tr> <tr class="bg-white hover:bg-navy-50/30 transition-colors"> <td class="px-5 py-3 font-heading font-semibold text-navy-800">Weight Limit</td> <td class="px-5 py-3 text-navy-600">${weightLimitOz}</td> </tr> <tr class="bg-white hover:bg-navy-50/30 transition-colors"> <td class="px-5 py-3 font-heading font-semibold text-navy-800">USPS Postage Class</td> <td class="px-5 py-3 text-navy-600">${postageClass}</td> </tr> <tr class="bg-white hover:bg-navy-50/30 transition-colors"> <td class="px-5 py-3 font-heading font-semibold text-navy-800 align-top">Primary Uses</td> <td class="px-5 py-3"> <ul class="space-y-1"> ${primaryUseCases.map((use) => renderTemplate`<li class="flex items-start gap-2 text-navy-600"> <svg class="w-3.5 h-3.5 text-crst-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> ${use} </li>`)} </ul> </td> </tr> </tbody> </table> </div>`;
}, "/home/runner/workspace/src/components/guides/SpecTable.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
function getStaticPaths() {
  return SPOKE_SLUGS.map((slug) => ({
    params: { slug },
    props: { spoke: ENVELOPE_SPOKES[slug] }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { spoke } = Astro2.props;
  const { slug } = Astro2.params;
  const canonical = `https://crst.net/guides/envelope-sizes/${slug}`;
  const pubDate = spoke.lastUpdated;
  const seanGriffin = {
    "@type": "Person",
    "@id": "https://crst.net/about#sean-griffin",
    name: "Sean Griffin",
    jobTitle: "Owner & Mailpiece Design Professional",
    description: "Sean Griffin founded Cornerstone Services in 1998. He holds the USPS Mailpiece Design Professional (MDP) certification and has managed direct mail, printing, and mailing campaigns for businesses across Ulster, Dutchess, and Orange counties for over 28 years.",
    url: "https://crst.net/about",
    image: "https://crst.net/images/sean-griffin.png",
    sameAs: ["https://crst.net/about"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Mailpiece Design Professional (MDP)",
      credentialCategory: "Professional Certification",
      recognizedBy: { "@type": "Organization", name: "United States Postal Service" }
    },
    worksFor: {
      "@type": "Organization",
      "@id": "https://crst.net/#organization",
      name: "Cornerstone Services, Inc.",
      url: "https://crst.net",
      telephone: "+1-845-255-5722",
      foundingDate: "1998",
      address: {
        "@type": "PostalAddress",
        streetAddress: "387 Malden Turnpike",
        addressLocality: "Saugerties",
        addressRegion: "NY",
        postalCode: "12477",
        addressCountry: "US"
      }
    }
  };
  const graphItems = [
    {
      "@type": "Article",
      headline: spoke.title,
      description: spoke.metaDescription,
      url: canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      datePublished: pubDate,
      dateModified: pubDate,
      inLanguage: "en-US",
      author: seanGriffin,
      publisher: {
        "@type": "Organization",
        "@id": "https://crst.net/#organization",
        name: "Cornerstone Services, Inc.",
        url: "https://crst.net",
        logo: { "@type": "ImageObject", url: "https://crst.net/images/crst-logo.png", width: 200, height: 60 }
      },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".article-lead", ".prose h2"] }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://crst.net/guides" },
        { "@type": "ListItem", position: 3, name: "Envelope Sizes", item: "https://crst.net/guides/envelope-sizes" },
        { "@type": "ListItem", position: 4, name: spoke.h1, item: canonical }
      ]
    },
    {
      "@type": "FAQPage",
      mainEntity: spoke.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    }
  ];
  const relatedSpokes = HUB_NAV_ITEMS.filter((item) => item.slug !== slug).slice(0, 4);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": spoke.title, "description": spoke.metaDescription, "canonical": canonical }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="bg-crst-primary text-white py-12 lg:py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <nav class="text-sm text-white/50 mb-4" aria-label="Breadcrumb"> <a href="/" class="hover:text-white/80 transition-colors">Home</a><span class="mx-2">›</span> <a href="/guides" class="hover:text-white/80 transition-colors">Guides</a><span class="mx-2">›</span> <a href="/guides/envelope-sizes" class="hover:text-white/80 transition-colors">Envelope Sizes</a><span class="mx-2">›</span> <span class="text-white/70">${spoke.h1}</span> </nav> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-white mb-4">${spoke.h1}</h1> <p class="article-lead text-white/70 text-base max-w-2xl leading-relaxed"> ${spoke.metaDescription} </p> </div> </section> <section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <!-- Main content --> <div class="lg:col-span-2"> <!-- RETRIEVAL_PARAGRAPH:start --> <div class="bg-navy-50/60 border border-navy-100 rounded-xl p-5 mb-8 text-sm text-navy-700 leading-relaxed"> ${spoke.retrievalParagraph} </div> <!-- RETRIEVAL_PARAGRAPH:end --> <!-- Spec table — renders real data, do not placeholder --> ${renderComponent($$result2, "SpecTable", $$SpecTable, { "dimensionsInches": spoke.dimensionsInches, "dimensionsMm": spoke.dimensionsMm, "weightLimitOz": spoke.weightLimitOz, "postageClass": spoke.postageClass, "primaryUseCases": spoke.primaryUseCases })} <!-- Body content — reads from data file; placeholders render nothing until content lands --> <div class="prose prose-navy max-w-none prose-headings:font-display prose-headings:text-crst-primary prose-a:text-crst-accent hover:prose-a:text-crst-primary prose-strong:text-navy-800 prose-p:text-navy-600/80 prose-li:text-navy-600/80"> <!-- BODY_INTRO:start --> ${spoke.bodyIntro && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(spoke.bodyIntro)}` })}`} <!-- BODY_INTRO:end --> <!-- USE_CASES:start --> ${spoke.useCases && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(spoke.useCases)}` })}`} <!-- USE_CASES:end --> <!-- POSTAGE_NOTES:start --> ${spoke.postageNotes && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(spoke.postageNotes)}` })}`} <!-- POSTAGE_NOTES:end --> </div> <div class="not-prose mt-8"> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, {})} </div> <!-- FAQ_BLOCK:start --> <div class="mt-12"> <div class="section-divider mb-6"></div> <h2 class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-4"> ${spoke.faqs.map((item) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${item.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${unescapeHTML(item.a)}</p> </div>`)} </div> </div> <!-- FAQ_BLOCK:end --> <!-- Compare CTA --> <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 text-center mt-10"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Not sure this is the right size?</p> <p class="text-navy-600/70 text-sm mb-4">Compare all standard envelope sizes side-by-side, then call us. We help Hudson Valley businesses choose, print, and mail the right format every day.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/guides/envelope-sizes" class="btn-primary text-sm">Compare All Envelope Sizes →</a> <a href="/estimate" class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent border border-crst-primary/30 hover:border-crst-accent/40 rounded-lg px-4 py-2 transition-colors">
Get a Free Quote
</a> </div> </div> <!-- Related spokes --> <div class="mt-14"> <div class="section-divider mb-6"></div> <h2 class="text-xl font-display text-crst-primary mb-6">Other Envelope Sizes</h2> <div class="grid sm:grid-cols-2 gap-4"> ${relatedSpokes.map((item) => {
    const rel = ENVELOPE_SPOKES[item.slug];
    return renderTemplate`<a${addAttribute(`/guides/envelope-sizes/${item.slug}`, "href")} class="block p-4 bg-navy-50/40 rounded-xl border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <h3 class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors leading-snug mb-1">${rel.h1}</h3> <p class="text-xs text-navy-600/60 font-mono">${rel.dimensionsInches}</p> </a>`;
  })} </div> </div> </div> <!-- Sidebar --> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Print & Mail This Envelope</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">We print and mail all standard envelope formats from our Saugerties, NY facility. Get a quote within one business day.</p> <a href="/estimate" class="btn-accent w-full text-center text-sm">Request a Quote</a> <div class="mt-4 pt-4 border-t border-white/10 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-white/70 text-sm font-heading hover:text-white transition-colors">or call ${BUSINESS.phone}</a> </div> </div> ${renderComponent($$result2, "EnvelopeHubNav", $$EnvelopeHubNav, { "currentSlug": slug })} <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Related Services</h3> <div class="space-y-2"> ${[
    { label: "Direct Mail Campaigns", href: "/services/direct-mail" },
    { label: "Printing Services", href: "/services/printing" },
    { label: "Mailing Services", href: "/services/mailing" },
    { label: "USPS Postage Rates", href: "/direct-mail-tools/postage-rates" },
    { label: "Graphic Design", href: "/services/graphic-design" }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${link.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <a href="/guides/envelope-sizes" class="block p-4 bg-crst-primary/5 rounded-xl border border-crst-primary/15 hover:border-crst-primary/30 transition-all group"> <p class="font-heading font-semibold text-crst-primary text-sm group-hover:text-crst-accent transition-colors">← Compare All Envelope Sizes</p> <p class="text-xs text-navy-600/60 mt-1">Full chart with dimensions, postage class, and use cases</p> </a> </div> </aside> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({ "@context": "https://schema.org", "@graph": graphItems }))) })}` })}`;
}, "/home/runner/workspace/src/pages/guides/envelope-sizes/[slug].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/guides/envelope-sizes/[slug].astro";
const $$url = "/guides/envelope-sizes/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
