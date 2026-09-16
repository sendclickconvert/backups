/* empty css                                        */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../../chunks/_astro_content_CCCTsyOJ.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$AuthorByline } from '../../../chunks/AuthorByline_DNWN2IXS.mjs';
import { $ as $$AnswerBlock } from '../../../chunks/AnswerBlock_C05MnarO.mjs';
import { B as BUSINESS } from '../../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
async function getStaticPaths() {
  const articles = await getCollection("data-articles");
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: { article }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { article } = Astro2.props;
  const { Content, headings } = await article.render();
  const { title, description, author, authorTitle, authorLocation, pillar, schemaFAQ, schemaHowTo, schemaItemList } = article.data;
  const pubDateISO = article.data.pubDate.toISOString().split("T")[0];
  const updatedDateISO = article.data.updatedDate.toISOString().split("T")[0];
  const canonical = `https://crst.net/services/data-lists/${article.slug}`;
  const allArticles = await getCollection("data-articles");
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const tocHeadings = headings.filter((h) => h.depth === 2);
  const graphItems = [
    {
      "@type": "Article",
      headline: title,
      description,
      author: {
        "@type": "Person",
        name: author,
        jobTitle: "Owner",
        worksFor: { "@id": "https://crst.net/#organization" },
        image: "https://crst.net/images/sean-griffin.png"
      },
      publisher: { "@id": "https://crst.net/#organization" },
      datePublished: pubDateISO,
      dateModified: updatedDateISO,
      mainEntityOfPage: canonical,
      isPartOf: { "@type": "WebPage", "@id": pillar },
      url: canonical
    }
  ];
  if (schemaFAQ && schemaFAQ.length > 0) {
    graphItems.push({
      "@type": "FAQPage",
      mainEntity: schemaFAQ.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a }
      }))
    });
  }
  if (schemaHowTo) {
    graphItems.push({
      "@type": "HowTo",
      name: schemaHowTo.name,
      step: schemaHowTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text
      }))
    });
  }
  if (schemaItemList && schemaItemList.length > 0) {
    graphItems.push({
      "@type": "ItemList",
      itemListElement: schemaItemList.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name
      }))
    });
  }
  const graphSchema = { "@context": "https://schema.org", "@graph": graphItems };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "canonical": canonical, "schema": null }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-crst-primary text-white py-12 lg:py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <nav class="text-sm text-white/50 mb-4"> <a href="/" class="hover:text-white/80 transition-colors">Home</a> <span class="mx-2">›</span> <a href="/services" class="hover:text-white/80 transition-colors">Services</a> <span class="mx-2">›</span> <a href="/services/data-lists" class="hover:text-white/80 transition-colors">Mailing Lists & Data</a> <span class="mx-2">›</span> <span class="text-white/70">${title}</span> </nav> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-white">${title}</h1> </div> </section> <section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> ${article.data.leadAnswer && renderTemplate`${renderComponent($$result2, "AnswerBlock", $$AnswerBlock, { "answer": article.data.leadAnswer })}`} ${tocHeadings.length > 0 && renderTemplate`<nav class="bg-navy-50/40 rounded-xl border border-navy-100 p-5 mb-10"> <p class="font-heading font-bold text-navy-800 text-sm mb-3">In This Article</p> <ul class="space-y-2"> ${tocHeadings.map((h) => renderTemplate`<li> <a${addAttribute(`#${h.slug}`, "href")} class="text-sm text-crst-accent hover:text-crst-primary transition-colors hover:underline">${h.text}</a> </li>`)} </ul> </nav>`} <div class="prose prose-navy max-w-none prose-headings:font-display prose-headings:text-crst-primary prose-a:text-crst-accent hover:prose-a:text-crst-primary prose-strong:text-navy-800 prose-p:text-navy-600/80 prose-li:text-navy-600/80 prose-td:text-navy-600/80 prose-th:text-navy-800 prose-th:font-heading"> ${renderComponent($$result2, "Content", Content, {})} </div> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, {})} ${schemaFAQ && schemaFAQ.length > 0 && renderTemplate`<div class="mt-12"> <div class="section-divider mb-6"></div> <h2 class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-4"> ${schemaFAQ.map((item) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${item.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.a}</p> </div>`)} </div> </div>`} <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 text-center mt-10"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Get a Targeted Mailing List</p> <p class="text-navy-600/70 text-sm mb-4">Tell us who you want to reach. We'll have a count and quote back in a few hours.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/estimate" class="btn-primary text-sm">Request a Free Quote →</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> <div class="mt-14"> <div class="section-divider mb-6"></div> <h2 class="text-xl font-display text-crst-primary mb-6">More Mailing List Guides</h2> <div class="grid sm:grid-cols-3 gap-4"> ${related.map((r) => renderTemplate`<a${addAttribute(`/services/data-lists/${r.slug}`, "href")} class="block p-4 bg-navy-50/40 rounded-xl border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <h3 class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors leading-snug">${r.data.title}</h3> <p class="text-xs text-navy-600/60 mt-2 line-clamp-2">${r.data.description}</p> </a>`)} </div> </div> </div> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Get a Free List Quote</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">
Tell us your target audience and geography. We'll pull a count and quote within a few hours — no obligation.
</p> <a href="/estimate" class="btn-accent w-full text-center text-sm">
Request a Quote
</a> <div class="mt-4 pt-4 border-t border-white/10 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-white/70 text-sm font-heading hover:text-white transition-colors">
or call ${BUSINESS.phone} </a> </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Mailing List Guides</h3> <div class="space-y-2"> ${allArticles.map((a) => renderTemplate`<a${addAttribute(`/services/data-lists/${a.slug}`, "href")}${addAttribute(`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors font-heading ${a.slug === article.slug ? "text-crst-primary bg-white font-semibold" : "text-navy-700 hover:text-crst-primary hover:bg-white"}`, "class")}> <span class="truncate mr-2">${a.data.title.replace(/ — .*$/, "").replace(/ for Direct Mail$/, "").replace(/\?$/, "")}</span> <svg class="w-3.5 h-3.5 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Related Services</h3> <div class="space-y-2"> ${[
    { label: "Mailing Lists & Data Hub", href: "/services/data-lists" },
    { label: "List Processing Services", href: "/services/mailing-list-services" },
    { label: "Consumer Mailing Lists", href: "/services/consumer-mailing-lists" },
    { label: "Business Mailing Lists", href: "/services/business-mailing-lists" },
    { label: "New Mover Lists", href: "/services/new-mover-mailing-lists" },
    { label: "Direct Mail Campaigns", href: "/services/direct-mail" },
    { label: "EDDM", href: "/services/eddm" }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${link.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <a href="/services/data-lists" class="block p-4 bg-crst-primary/5 rounded-xl border border-crst-primary/15 hover:border-crst-primary/30 transition-all group"> <p class="font-heading font-semibold text-crst-primary text-sm group-hover:text-crst-accent transition-colors">← Back to Mailing Lists & Data</p> <p class="text-xs text-navy-600/60 mt-1">Consumer, business, and specialty lists for Hudson Valley campaigns</p> </a> </div> </aside> </div> </div> </section> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(graphSchema))) })}` })}`;
}, "/home/runner/workspace/src/pages/services/data-lists/[slug].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/services/data-lists/[slug].astro";
const $$url = "/services/data-lists/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
