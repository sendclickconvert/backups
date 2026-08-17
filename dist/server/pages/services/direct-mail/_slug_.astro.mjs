/* empty css                                        */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment$1, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../../chunks/_astro_content_DiiJMhjs.mjs';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$AuthorByline } from '../../../chunks/AuthorByline_DNWN2IXS.mjs';
import { $ as $$AnswerBlock } from '../../../chunks/AnswerBlock_C05MnarO.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as BUSINESS } from '../../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../../renderers.mjs';

const DirectMailCostCalculator = () => {
  const [quantity, setQuantity] = useState(5e3);
  const [mailPiece, setMailPiece] = useState("postcard-4x6");
  const [postageClass, setPostageClass] = useState("marketing");
  const [needsDesign, setNeedsDesign] = useState(false);
  const [result, setResult] = useState(null);
  const printingRates = {
    "postcard-4x6": 0.15,
    "postcard-6x9": 0.22,
    "postcard-6x11": 0.28,
    "letter-single": 0.18,
    "letter-double": 0.24,
    "self-mailer": 0.28,
    "bifold": 0.32,
    "catalog": 0.45
  };
  const postageRates = {
    "first-class": 0.78,
    "marketing": 0.4,
    "eddm": 0.26,
    "nonprofit": 0.338
  };
  const DESIGN_FEE = 350;
  useEffect(() => {
    calculateCost();
  }, [quantity, mailPiece, postageClass, needsDesign]);
  const calculateCost = () => {
    const printingCost = quantity * printingRates[mailPiece];
    const postageCost = quantity * postageRates[postageClass];
    const designCost = needsDesign ? DESIGN_FEE : 0;
    const totalCost = printingCost + postageCost + designCost;
    const costPerPiece = totalCost / quantity;
    setResult({
      printing: printingCost,
      postage: postageCost,
      design: designCost,
      total: totalCost,
      perPiece: costPerPiece
    });
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(amount);
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Direct Mail Cost Calculator",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate your direct mail campaign costs including printing, postage, and design",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "Cornerstone Services Inc"
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(calculatorSchema) }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl shadow-lg p-6 md:p-8 my-8 border border-blue-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Direct Mail Cost Calculator" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Get an instant estimate for your direct mail campaign" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "quantity", className: "block text-sm font-semibold text-gray-700 mb-2", children: "Quantity" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "quantity",
                min: "500",
                max: "100000",
                step: "500",
                value: quantity,
                onChange: (e) => setQuantity(Math.max(500, parseInt(e.target.value) || 500)),
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
              formatNumber(quantity),
              " pieces"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "mailPiece", className: "block text-sm font-semibold text-gray-700 mb-2", children: "Mail Piece Type" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "mailPiece",
                value: mailPiece,
                onChange: (e) => setMailPiece(e.target.value),
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "postcard-4x6", children: 'Postcard 4" × 6"' }),
                  /* @__PURE__ */ jsx("option", { value: "postcard-6x9", children: 'Postcard 6" × 9"' }),
                  /* @__PURE__ */ jsx("option", { value: "postcard-6x11", children: 'Postcard 6" × 11"' }),
                  /* @__PURE__ */ jsx("option", { value: "letter-single", children: "Letter (Single Sheet)" }),
                  /* @__PURE__ */ jsx("option", { value: "letter-double", children: "Letter (Double Sheet)" }),
                  /* @__PURE__ */ jsx("option", { value: "self-mailer", children: "Self-Mailer" }),
                  /* @__PURE__ */ jsx("option", { value: "bifold", children: "Bifold Brochure" }),
                  /* @__PURE__ */ jsx("option", { value: "catalog", children: "Catalog/Booklet" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "postageClass", className: "block text-sm font-semibold text-gray-700 mb-2", children: "Postage Class" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "postageClass",
                value: postageClass,
                onChange: (e) => setPostageClass(e.target.value),
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "first-class", children: "First Class ($0.78/piece)" }),
                  /* @__PURE__ */ jsx("option", { value: "marketing", children: "Marketing Mail ($0.40/piece)" }),
                  /* @__PURE__ */ jsx("option", { value: "eddm", children: "EDDM ($0.260/piece)" }),
                  /* @__PURE__ */ jsx("option", { value: "nonprofit", children: "Nonprofit ($0.338/piece)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Need Design Services?" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "design",
                    checked: !needsDesign,
                    onChange: () => setNeedsDesign(false),
                    className: "w-4 h-4 text-blue-600 focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: "No, I have artwork" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "design",
                    checked: needsDesign,
                    onChange: () => setNeedsDesign(true),
                    className: "w-4 h-4 text-blue-600 focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700", children: "Yes ($350)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-md border border-gray-200", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200", children: "Estimated Cost Breakdown" }),
          result && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
                "Printing (",
                formatNumber(quantity),
                " pcs)"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: formatCurrency(result.printing) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
                "Postage (",
                formatNumber(quantity),
                " pcs)"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: formatCurrency(result.postage) })
            ] }),
            needsDesign && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Design Services" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: formatCurrency(result.design) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-3 mt-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gray-900", children: "Total Campaign Cost" }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-blue-600", children: formatCurrency(result.total) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-2 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Cost per piece" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: formatCurrency(result.perPiece) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-gray-200", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `/contact?subject=Direct Mail Quote Request - ${formatNumber(quantity)} pieces&message=I'm interested in a quote for ${formatNumber(quantity)} ${mailPiece.replace("-", " ")} pieces using ${postageClass.replace("-", " ")} mail.`,
                  className: "block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md hover:shadow-lg",
                  children: "Get Custom Quote"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mt-2", children: "Final pricing may vary based on specific requirements" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border-l-4 border-blue-600 p-4 rounded", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-blue-900", children: "CRST Insider Tip" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-800 mt-1", children: "Marketing Mail requires a minimum of 500 pieces but offers significant postage savings compared to First Class. For campaigns over 5,000 pieces, ask about our presort discounts for additional savings." })
        ] })
      ] }) })
    ] })
  ] });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://crst.net");
async function getStaticPaths() {
  const articles = await getCollection("dm-articles");
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
  const canonical = `https://crst.net/services/direct-mail/${article.slug}`;
  const allArticles = await getCollection("dm-articles");
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "canonical": canonical, "schema": null }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-crst-primary text-white py-12 lg:py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <nav class="text-sm text-white/50 mb-4"> <a href="/" class="hover:text-white/80 transition-colors">Home</a> <span class="mx-2">›</span> <a href="/services" class="hover:text-white/80 transition-colors">Services</a> <span class="mx-2">›</span> <a href="/services/direct-mail" class="hover:text-white/80 transition-colors">Direct Mail</a> <span class="mx-2">›</span> <span class="text-white/70">${title}</span> </nav> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-white">${title}</h1> </div> </section> <section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> ${article.data.leadAnswer && renderTemplate`${renderComponent($$result2, "AnswerBlock", $$AnswerBlock, { "answer": article.data.leadAnswer })}`} ${tocHeadings.length > 0 && renderTemplate`<nav class="bg-navy-50/40 rounded-xl border border-navy-100 p-5 mb-10"> <p class="font-heading font-bold text-navy-800 text-sm mb-3">In This Article</p> <ul class="space-y-2"> ${tocHeadings.map((h) => renderTemplate`<li> <a${addAttribute(`#${h.slug}`, "href")} class="text-sm text-crst-accent hover:text-crst-primary transition-colors hover:underline">${h.text}</a> </li>`)} </ul> </nav>`} ${article.slug === "how-much-does-direct-mail-cost" && renderTemplate`<div class="not-prose mb-10"> ${renderComponent($$result2, "DirectMailCostCalculator", DirectMailCostCalculator, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/runner/workspace/src/components/calculators/DirectMailCostCalculator", "client:component-export": "default" })} </div>`} <div class="prose prose-navy max-w-none prose-headings:font-display prose-headings:text-crst-primary prose-a:text-crst-accent hover:prose-a:text-crst-primary prose-strong:text-navy-800 prose-p:text-navy-600/80 prose-li:text-navy-600/80 prose-td:text-navy-600/80 prose-th:text-navy-800 prose-th:font-heading"> ${renderComponent($$result2, "Content", Content, {})} </div> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, {})} ${schemaFAQ && schemaFAQ.length > 0 && renderTemplate`<div class="mt-12"> <div class="section-divider mb-6"></div> <h2 class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-4"> ${schemaFAQ.map((item) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${item.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.a}</p> </div>`)} </div> </div>`} <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 text-center mt-10"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Start Your Direct Mail Campaign</p> <p class="text-navy-600/70 text-sm mb-4">Get a free estimate — we'll have a quote back in one business day.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/estimate" class="btn-primary text-sm">Get a Free Estimate →</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> <div class="mt-14"> <div class="section-divider mb-6"></div> <h2 class="text-xl font-display text-crst-primary mb-6">Related Articles</h2> <div class="grid sm:grid-cols-3 gap-4"> ${related.map((r) => renderTemplate`<a${addAttribute(`/services/direct-mail/${r.slug}`, "href")} class="block p-4 bg-navy-50/40 rounded-xl border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <h3 class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors leading-snug">${r.data.title}</h3> <p class="text-xs text-navy-600/60 mt-2 line-clamp-2">${r.data.description}</p> </a>`)} </div> </div> </div> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Get a Free Estimate</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">
Tell us about your campaign and we'll provide a detailed quote — usually within one business day.
</p> <a href="/estimate" class="btn-accent w-full text-center text-sm">
Request Estimate
</a> <div class="mt-4 pt-4 border-t border-white/10 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-white/70 text-sm font-heading hover:text-white transition-colors">
or call ${BUSINESS.phone} </a> </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Direct Mail Resources</h3> <div class="space-y-2"> ${allArticles.map((a) => renderTemplate`<a${addAttribute(`/services/direct-mail/${a.slug}`, "href")}${addAttribute(`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors font-heading ${a.slug === article.slug ? "text-crst-primary bg-white font-semibold" : "text-navy-700 hover:text-crst-primary hover:bg-white"}`, "class")}> <span class="truncate mr-2">${a.data.title.replace(/ — .*$/, "").replace(/ in the Hudson Valley$/, "").replace(/ for Direct Mail$/, "")}</span> <svg class="w-3.5 h-3.5 opacity-40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <a href="/services/direct-mail" class="block p-4 bg-crst-primary/5 rounded-xl border border-crst-primary/15 hover:border-crst-primary/30 transition-all group"> <p class="font-heading font-semibold text-crst-primary text-sm group-hover:text-crst-accent transition-colors">← Back to Direct Mail Services</p> <p class="text-xs text-navy-600/60 mt-1">Full-service campaigns from list to mailbox</p> </a> </div> </aside> </div> </div> </section> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(graphSchema))) })}` })}`;
}, "/home/runner/workspace/src/pages/services/direct-mail/[slug].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/services/direct-mail/[slug].astro";
const $$url = "/services/direct-mail/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
