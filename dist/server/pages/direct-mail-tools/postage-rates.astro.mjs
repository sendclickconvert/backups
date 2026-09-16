/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment$1, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const PostageCalculator = () => {
  const [weight, setWeight] = useState(1);
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(0.25);
  const [mailClass, setMailClass] = useState("first-class");
  const [zone, setZone] = useState("local");
  const [result, setResult] = useState(null);
  const postageRates = {
    "first-class": {
      "local": 0.78,
      "zone1-3": 0.78,
      "zone4-6": 0.93,
      "zone7-8": 1.08
    },
    "marketing": {
      "local": 0.4,
      "zone1-3": 0.4,
      "zone4-6": 0.45,
      "zone7-8": 0.52
    },
    "eddm": {
      "local": 0.26,
      "zone1-3": 0.26,
      "zone4-6": 0.26,
      "zone7-8": 0.26
    }
  };
  const presortDiscounts = {
    "first-class": 0.058,
    "marketing": 0.034,
    "eddm": 0
  };
  useEffect(() => {
    calculatePostage();
  }, [weight, length, width, height, mailClass, zone]);
  const calculatePostage = () => {
    const baseRate = postageRates[mailClass]?.[zone] || 0.78;
    const weightSurcharge = weight > 1 ? (weight - 1) * 0.28 : 0;
    const basePostage = baseRate + weightSurcharge;
    const presortSavings = presortDiscounts[mailClass] || 0;
    const finalCost = basePostage - presortSavings;
    const savingsPercent = presortSavings > 0 ? presortSavings / basePostage * 100 : 0;
    setResult({
      basePostage,
      presortSavings,
      finalCost,
      savingsPercent
    });
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 3
    }).format(amount);
  };
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "USPS Postage Rate Calculator",
    "applicationCategory": "UtilityApplication",
    "description": "Calculate exact USPS postage rates for direct mail pieces",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
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
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "2026 USPS Postage Rate Calculator" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Calculate exact postage costs for your mail piece" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "weight", className: "block text-sm font-semibold text-gray-700 mb-2", children: "Weight (oz)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "weight",
                min: "0.1",
                max: "13",
                step: "0.1",
                value: weight,
                onChange: (e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1)),
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Dimensions (inches)" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "Length",
                    min: "3.5",
                    max: "15",
                    step: "0.1",
                    value: length,
                    onChange: (e) => setLength(parseFloat(e.target.value) || 6),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "L" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "Width",
                    min: "3.5",
                    max: "12",
                    step: "0.1",
                    value: width,
                    onChange: (e) => setWidth(parseFloat(e.target.value) || 4),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "W" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "Height",
                    min: "0.007",
                    max: "0.75",
                    step: "0.01",
                    value: height,
                    onChange: (e) => setHeight(parseFloat(e.target.value) || 0.25),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "H" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "mailClass", className: "block text-sm font-semibold text-gray-700 mb-2", children: "Mail Class" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "mailClass",
                value: mailClass,
                onChange: (e) => setMailClass(e.target.value),
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "first-class", children: "First Class Mail" }),
                  /* @__PURE__ */ jsx("option", { value: "marketing", children: "Marketing Mail" }),
                  /* @__PURE__ */ jsx("option", { value: "eddm", children: "EDDM (Every Door Direct Mail)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "zone", className: "block text-sm font-semibold text-gray-700 mb-2", children: "Destination Zone" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "zone",
                value: zone,
                onChange: (e) => setZone(e.target.value),
                className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "local", children: "Local (Same State)" }),
                  /* @__PURE__ */ jsx("option", { value: "zone1-3", children: "Zone 1-3 (Regional)" }),
                  /* @__PURE__ */ jsx("option", { value: "zone4-6", children: "Zone 4-6 (Cross-Country)" }),
                  /* @__PURE__ */ jsx("option", { value: "zone7-8", children: "Zone 7-8 (Coast to Coast)" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-md border border-gray-200", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200", children: "Postage Breakdown" }),
          result && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Base Postage Rate" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: formatCurrency(result.basePostage) })
            ] }),
            result.presortSavings > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-2 bg-green-50 px-3 rounded", children: [
              /* @__PURE__ */ jsx("span", { className: "text-green-700", children: "Presort Discount" }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-green-700", children: [
                "-",
                formatCurrency(result.presortSavings)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-3 mt-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gray-900", children: "Final Postage Cost" }),
                /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-blue-600", children: formatCurrency(result.finalCost) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Per piece" })
            ] }),
            result.savingsPercent > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-blue-900", children: [
                "Save ",
                result.savingsPercent.toFixed(1),
                "% with Our Presort Services"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-700 mt-1", children: "We handle USPS presort requirements so you pay the lowest rates" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-gray-200", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: "/services/mailing-services/presort-mail-discount-guide",
                className: "block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors shadow-md hover:shadow-lg",
                children: "Learn About Presort Discounts"
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border-l-4 border-blue-600 p-4 rounded", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-blue-900", children: "CRST Insider Tip" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-800 mt-1", children: "Postage rates shown include 2026 USPS increases. For mailings over 500 pieces, our presort services can save you 5-15% on postage costs. The larger your mailing, the more you save." })
        ] })
      ] }) })
    ] })
  ] });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$PostageRates = createComponent(($$result, $$props, $$slots) => {
  const YEAR = 2026;
  const lastUpdated = "2026-07-12";
  const lastUpdatedDisplay = "July 2026";
  const canonical = "https://crst.net/direct-mail-tools/postage-rates";
  const org = {
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
  };
  const faqs = [
    {
      q: `What is the ${YEAR} USPS postage rate for a standard letter?`,
      a: `The ${YEAR} USPS First-Class rate for a 1 oz metered letter is $0.78. Using a Forever stamp (stamped letter) costs $0.82. USPS raised First-Class retail rates on July 12, ${YEAR} \u2014 up from $0.74 (metered) and $0.78 (stamped). For bulk presorted First-Class mailings of 500+ pieces, automation rates start at $0.593 per piece at the 5-digit sort level.`
    },
    {
      q: `How much does EDDM postage cost in ${YEAR}?`,
      a: `EDDM (Every Door Direct Mail) Retail postage in ${YEAR} is $0.260 per piece \u2014 no permit required, limit 5,000 pieces per day per ZIP. EDDM Retail rose from $0.247 on July 12, ${YEAR}. EDDM BMEU (Business Mail Entry Unit) at DDU entry is $0.259 per piece; it requires a permit but removes the daily volume cap.`
    },
    {
      q: `What is the cheapest way to mail postcards in bulk?`,
      a: `The cheapest bulk postcard option is EDDM at $0.259\u2013$0.260 per piece, which requires no mailing list. For targeted list mailings, Marketing Mail carrier route saturation rates vary \u2014 contact us for current pricing. A single First-Class postcard costs $0.65 at retail in ${YEAR}. The right choice depends on whether you need targeted addressing or blanket neighborhood coverage.`
    },
    {
      q: `What are the USPS Nonprofit postage rates for ${YEAR}?`,
      a: `Qualifying 501(c)(3) organizations can mail Marketing Mail at automation 5-digit rates of $0.185 per piece for letters as of July 12, ${YEAR} \u2014 approximately 53% less than comparable commercial rates ($0.395). Carrier route saturation and 3-digit tier pricing varies; contact us for a per-piece quote. Nonprofit mailing authorization requires USPS PS Form 3624. Cornerstone helps nonprofits apply for and maintain their authorization.`
    },
    {
      q: `What is the difference between Marketing Mail and First-Class Mail?`,
      a: `Marketing Mail (formerly Standard Mail) is designed for advertising and bulk mailings. Automation 5-digit rates start at $0.395 per piece; carrier route saturation tiers are lower \u2014 contact us for current carrier-route pricing. Marketing Mail delivers in 3\u201310 business days with no forwarding or return service. First-Class Mail costs more \u2014 $0.593+ per piece in bulk or $0.78 at retail \u2014 but delivers in 1\u20133 days and includes address forwarding and return to sender. First-Class is best for invoices, statements, and time-sensitive mail. Marketing Mail is best for advertising campaigns, coupons, and newsletters.`
    },
    {
      q: `What is the minimum quantity for bulk mail postage rates?`,
      a: `USPS Marketing Mail requires a minimum of 200 pieces or 50 lbs per mailing, whichever comes first. First-Class presort discounts require a minimum of 500 pieces. EDDM Retail has a minimum of 200 pieces per mailing per ZIP code. To access bulk rates you need a valid USPS mailing permit \u2014 Cornerstone can mail under our permit on your behalf, so most clients never need to obtain their own.`
    },
    {
      q: `Did USPS raise postage rates in ${YEAR}?`,
      a: `Yes. USPS implemented two rate changes in ${YEAR}. The first took effect April 26 (Forever stamp: $0.73 \u2192 $0.78; metered: $0.73 \u2192 $0.74; postcard: $0.56 \u2192 $0.61). The second took effect July 12, ${YEAR}: Forever stamp rose from $0.78 to $0.82; metered letter rose from $0.74 to $0.78; First-Class postcards rose from $0.61 to $0.65. EDDM Retail rose from $0.247 to $0.260 on July 12; EDDM BMEU DDU entry rose from $0.242 to $0.259.`
    },
    {
      q: `How much does a USPS mailing permit cost?`,
      a: `A USPS bulk mail Permit Imprint requires an annual fee that varies by mail class and post office of mailing. Many businesses mail under a direct mail company's existing permit rather than obtaining their own \u2014 this is the standard arrangement for periodic mailers. Cornerstone Services mails under our own permit on behalf of clients, so you get access to bulk rates with no permit application required. Contact us for details on permit costs if you need your own account.`
    }
  ];
  const graphItems = [
    {
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: `USPS Postage Rates ${YEAR}: Complete Rate Chart`,
      description: `Current ${YEAR} USPS postage rates for First-Class Mail, postcards, large envelopes, EDDM, and Marketing Mail. Verified against USPS Notice 123, effective July 12, ${YEAR}.`,
      datePublished: lastUpdated,
      dateModified: lastUpdated,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        "@id": "https://crst.net/about#sean-griffin",
        name: "Sean Griffin"
      },
      publisher: org,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
        { "@type": "ListItem", position: 2, name: "Direct Mail Tools", item: "https://crst.net/direct-mail-tools" },
        { "@type": "ListItem", position: 3, name: `USPS Postage Rates ${YEAR}`, item: canonical }
      ]
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a }
      }))
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${YEAR} USPS Postage Rates: First Class, Marketing Mail & EDDM`, "description": `Current ${YEAR} USPS postage rates for First-Class, EDDM, Marketing Mail, and Nonprofit mail. Verified ${lastUpdatedDisplay} against USPS Notice 123 by CRST, certified direct mail experts.`, "canonical": canonical }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": `${YEAR} USPS Postage Rates`, "subtitle": `Current rates for Marketing Mail, EDDM, First-Class presort, and Nonprofit mail \u2014 plus automation discounts, presort minimums, and permit requirements. Verified ${lastUpdatedDisplay}.`, "breadcrumbs": [
    { label: "Direct Mail Tools", href: "/direct-mail-tools" },
    { label: "Postage Rates" }
  ] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="max-w-4xl mx-auto"> <div class="section-divider mb-6"></div> <!-- Last Updated + Source --> <div class="flex flex-wrap items-center justify-between gap-3 mb-8"> <p class="text-navy-600/80 leading-relaxed">
USPS postage rates change periodically — verify current rates before planning your budget. Cornerstone automatically applies the lowest qualifying rate to every campaign we process.
</p> <p class="text-xs text-navy-400 shrink-0">
Last updated: <time itemprop="dateModified"${addAttribute(lastUpdated, "datetime")}>${lastUpdatedDisplay}</time> ·
            Source: <a href="https://pe.usps.com/text/dmm300/Notice123.htm" target="_blank" rel="noopener noreferrer" class="underline hover:text-crst-primary">USPS Notice 123 (eff. Jul 12, ${YEAR})</a> </p> </div> <!-- Quick Answer Box --> <div id="quick-answer" class="bg-crst-primary/5 border-l-4 border-crst-primary rounded-r-xl p-6 mb-10"> <h2 class="font-display text-lg text-crst-primary mb-4">Quick Answer — Top ${YEAR} USPS Rates</h2> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="border-b border-crst-primary/20"> <th class="text-left pb-2 font-heading text-navy-700">Mail Type</th> <th class="text-left pb-2 font-heading text-navy-700">Rate</th> <th class="text-left pb-2 font-heading text-navy-700 hidden sm:table-cell">Notes</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr> <td class="py-2 font-semibold text-navy-800">Forever stamp (1 oz letter)</td> <td class="py-2 text-crst-primary font-bold">$0.82</td> <td class="py-2 text-navy-500 hidden sm:table-cell">Single piece, stamped retail</td> </tr> <tr> <td class="py-2 font-semibold text-navy-800">First-Class postcard</td> <td class="py-2 text-crst-primary font-bold">$0.65</td> <td class="py-2 text-navy-500 hidden sm:table-cell">Single piece, retail</td> </tr> <tr> <td class="py-2 font-semibold text-navy-800">Large envelope / flat (≤1 oz)</td> <td class="py-2 text-crst-primary font-bold">$1.63</td> <td class="py-2 text-navy-500 hidden sm:table-cell">First-Class, single piece</td> </tr> <tr> <td class="py-2 font-semibold text-navy-800">EDDM Retail (no permit)</td> <td class="py-2 text-crst-primary font-bold">$0.260/pc</td> <td class="py-2 text-navy-500 hidden sm:table-cell">Bulk, 200 min, no mailing list needed</td> </tr> <tr> <td class="py-2 font-semibold text-navy-800">Marketing Mail letter (bulk)</td> <td class="py-2 text-crst-primary font-bold">from $0.395/pc</td> <td class="py-2 text-navy-500 hidden sm:table-cell">Carrier route saturation, 200 min</td> </tr> </tbody> </table> </div> </div> <!-- Author / Byline --> <div class="flex items-start gap-4 bg-navy-50 rounded-xl p-5 mb-10 border border-navy-100"> <img src="/images/sean-griffin.png" alt="Sean Griffin, Owner of Cornerstone Services" class="shrink-0 w-12 h-12 rounded-full object-cover" width="48" height="48"> <div> <p class="text-sm font-heading font-semibold text-navy-800">Compiled by Sean Griffin, Owner — Cornerstone Services, Inc.</p> <p class="text-xs text-navy-500 mt-1">Sean has processed bulk mail campaigns for Hudson Valley businesses since 1998. The rates on this page are applied to every campaign Cornerstone produces. We update this guide every time USPS announces a rate change.</p> <p class="text-xs text-navy-400 mt-1">Last reviewed: ${lastUpdatedDisplay} · Source: <a href="https://pe.usps.com/text/dmm300/Notice123.htm" target="_blank" rel="noopener noreferrer" class="underline hover:text-crst-primary">USPS Notice 123 (eff. Jul 12, ${YEAR})</a></p> </div> </div> <!-- Calculator --> <div class="not-prose mb-12"> ${renderComponent($$result2, "PostageCalculator", PostageCalculator, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/runner/workspace/src/components/calculators/PostageCalculator", "client:component-export": "default" })} </div> <!-- What Changed in 2026 --> <div id="what-changed" class="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12"> <h2 class="font-display text-xl text-amber-900 mb-3">What Changed in ${YEAR}</h2> <p class="text-sm text-amber-800 mb-4">USPS implemented two rate changes in ${YEAR}. The most recent took effect <strong>July 12, ${YEAR}</strong>. Key increases for direct mail:</p> <ul class="space-y-1.5 text-sm text-amber-800"> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>Forever stamp (stamped letter):</strong> $0.78 → $0.82 (+$0.04, +5%) — eff. Jul 12</span></li> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>First-Class letter (metered):</strong> $0.74 → $0.78 (+$0.04, +5%) — eff. Jul 12</span></li> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>First-Class postcard:</strong> $0.61 → $0.65 (+$0.04, +7%) — eff. Jul 12</span></li> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>First-Class large envelope (≤1 oz):</strong> $1.63 — unchanged from Apr 26 update</span></li> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>April 26 change (reference):</strong> stamp $0.73 → $0.78; metered $0.73 → $0.74; postcard $0.56 → $0.61</span></li> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>EDDM Retail:</strong> $0.247 → $0.260 (+$0.013) — eff. Jul 12</span></li> <li class="flex gap-2"><span class="text-amber-600 font-bold shrink-0">↑</span> <span><strong>EDDM BMEU (DDU entry):</strong> $0.242 → $0.259 (+$0.017) — eff. Jul 12</span></li> </ul> </div> <!-- Marketing Mail --> <h2 id="marketing-mail" class="text-2xl font-display text-crst-primary mb-3">Marketing Mail Rates ${YEAR}</h2> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
Marketing Mail (formerly Standard Mail) is the most common class for <a href="/services/direct-mail" class="text-crst-primary underline hover:text-crst-gold">direct mail advertising</a>. Requires a minimum of 200 pieces or 50 lbs per mailing. Delivery is typically 3–10 business days. Cornerstone's <a href="/services/mailing" class="text-crst-primary underline hover:text-crst-gold">full-service mailing</a> automatically qualifies your campaign for the lowest applicable rate.
</p> <h3 class="text-base font-heading font-semibold text-navy-700 mb-2 mt-6">Marketing Mail — Letters (≤3.5 oz)</h3> <div class="overflow-x-auto mb-6"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Sort / Entry Level</th> <th class="text-left p-3 font-heading">Rate per Piece</th> <th class="text-left p-3 font-heading">Best For</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Carrier Route Saturation</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">Neighborhood coverage, EDDM-adjacent campaigns</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Carrier Route High Density Plus</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">Dense residential routes</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Automation 5-Digit</td> <td class="p-3 text-navy-600 font-bold">$0.395</td> <td class="p-3 text-navy-500">Targeted lists, IMb required</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Automation 3-Digit</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">Broader geographic lists</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Mixed</td> <td class="p-3 text-navy-600">$0.467</td> <td class="p-3 text-navy-500">Broadest automation sort level</td> </tr> </tbody> </table> </div> <h3 class="text-base font-heading font-semibold text-navy-700 mb-2">Marketing Mail — Flats / Self-Mailers (≤4 oz)</h3> <p class="text-navy-600/80 text-xs leading-relaxed mb-3">Flats include catalogs, booklets, oversized postcards, and self-mailers that exceed letter dimensions. Carrier route rates apply to saturation mailings; automation-sorted targeted flat campaigns are significantly higher.</p> <div class="overflow-x-auto mb-10"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Sort / Entry Level</th> <th class="text-left p-3 font-heading">Rate per Piece</th> <th class="text-left p-3 font-heading">Notes</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Carrier Route Saturation</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">Neighborhood saturation campaigns</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">EDDM (carrier route)</td> <td class="p-3 text-navy-600">$0.260</td> <td class="p-3 text-navy-500">Every Door Direct Mail flats</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Carrier Route High Density Plus</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">Dense residential routes</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Carrier Route Basic</td> <td class="p-3 text-navy-600">$0.501</td> <td class="p-3 text-navy-500">Lower-density carrier routes</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Automation 5-Digit (sorted flat)</td> <td class="p-3 text-navy-600">$0.770</td> <td class="p-3 text-navy-500">Targeted list + full automation sort</td> </tr> </tbody> </table> </div> <!-- EDDM --> <h2 id="eddm" class="text-2xl font-display text-crst-primary mb-3">EDDM Postage Rates ${YEAR}</h2> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
EDDM delivers to every address on selected <a href="/services/eddm" class="text-crst-primary underline hover:text-crst-gold">carrier routes</a> — no mailing list needed. Ideal for local businesses wanting blanket coverage. EDDM Retail postage rose to <strong>$0.260/piece</strong> on July 12, ${YEAR} — up from $0.247. EDDM BMEU DDU entry rose to $0.259/piece.
          See <a href="/services/eddm" class="text-crst-primary underline hover:text-crst-gold">our EDDM service page</a> for the full breakdown, or <a href="/services/eddm/how-much-does-eddm-cost" class="text-crst-primary underline hover:text-crst-gold">estimate your EDDM campaign cost</a>. You can also order a pre-configured <a href="/shop/eddm-card" class="text-crst-primary underline hover:text-crst-gold">EDDM postcard</a> directly from our shop.
</p> <div class="overflow-x-auto mb-10"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">EDDM Type</th> <th class="text-left p-3 font-heading">Rate per Piece</th> <th class="text-left p-3 font-heading">Permit Required?</th> <th class="text-left p-3 font-heading">Daily Limit</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">EDDM Retail</td> <td class="p-3 text-navy-600 font-bold">$0.260</td> <td class="p-3 text-navy-600">No</td> <td class="p-3 text-navy-500">5,000/day per ZIP</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">EDDM BMEU — DDU entry</td> <td class="p-3 text-navy-600 font-bold">$0.259</td> <td class="p-3 text-navy-600">Yes</td> <td class="p-3 text-navy-500">No limit</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">EDDM BMEU — DSCF entry</td> <td class="p-3 text-navy-600">$0.253</td> <td class="p-3 text-navy-600">Yes</td> <td class="p-3 text-navy-500">No limit</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">EDDM BMEU — Origin entry</td> <td class="p-3 text-navy-600">$0.291</td> <td class="p-3 text-navy-600">Yes</td> <td class="p-3 text-navy-500">No limit</td> </tr> </tbody> </table> </div> <!-- First-Class Mail --> <h2 id="first-class" class="text-2xl font-display text-crst-primary mb-3">First-Class Mail Rates ${YEAR}</h2> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
First-Class is faster (1–3 days) and includes forwarding and return service. Used for invoices, statements, and time-sensitive communications. Presort discounts are available for 500+ pieces with an <a href="/direct-mail-tools/postal-dictionary" class="text-crst-primary underline hover:text-crst-gold">Intelligent Mail barcode (IMb)</a>.
</p> <h3 class="text-base font-heading font-semibold text-navy-700 mb-2 mt-6">Single Piece — Retail</h3> <div class="overflow-x-auto mb-6"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Piece Type</th> <th class="text-left p-3 font-heading">Rate</th> <th class="text-left p-3 font-heading">Notes</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Letter, 1 oz — metered</td> <td class="p-3 text-navy-600 font-bold">$0.78</td> <td class="p-3 text-navy-500">Standard window envelope</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Letter, 1 oz — stamped (Forever)</td> <td class="p-3 text-navy-600 font-bold">$0.82</td> <td class="p-3 text-navy-500">Forever stamp price</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Letter, 2 oz</td> <td class="p-3 text-navy-600">$1.03</td> <td class="p-3 text-navy-500">Metered</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Letter, 3 oz</td> <td class="p-3 text-navy-600">$1.32</td> <td class="p-3 text-navy-500">Metered</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Postcard</td> <td class="p-3 text-navy-600 font-bold">$0.65</td> <td class="p-3 text-navy-500">Min 3.5″×5″, max 4.25″×6″</td> </tr> </tbody> </table> </div> <h3 class="text-base font-heading font-semibold text-navy-700 mb-2">Presorted / Bulk (500+ pieces)</h3> <div class="overflow-x-auto mb-10"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Sort Level</th> <th class="text-left p-3 font-heading">Rate per Piece</th> <th class="text-left p-3 font-heading">Min. Quantity</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Letters — Automation 5-Digit</td> <td class="p-3 text-navy-600 font-bold">$0.593</td> <td class="p-3 text-navy-500">500 pieces</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Letters — Automation 3-Digit</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">500 pieces</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Letters — Mixed</td> <td class="p-3 text-navy-600">$0.707</td> <td class="p-3 text-navy-500">500 pieces</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Postcards — Automation 5-Digit</td> <td class="p-3 text-navy-600 font-bold">$0.420</td> <td class="p-3 text-navy-500">500 pieces</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Postcards — Automation 3-Digit</td> <td class="p-3 text-navy-500 italic">Contact us for current rate</td> <td class="p-3 text-navy-500">500 pieces</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Postcards — Mixed</td> <td class="p-3 text-navy-600">$0.495</td> <td class="p-3 text-navy-500">500 pieces</td> </tr> </tbody> </table> </div> <!-- Postcard Postage --> <h2 id="postcard-postage" class="text-2xl font-display text-crst-primary mb-3">Postcard Postage ${YEAR}</h2> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
USPS defines a postcard as a single-sheet, unfolded piece between 3.5″×5″ and 4.25″×6″ (min), made of cardstock at least 0.007″ thick. Oversized cards that exceed postcard dimensions mail at letter or flat rates. Ready to order? Configure quantity and stock on our <a href="/shop/postcard" class="text-crst-primary underline hover:text-crst-gold">postcard printing</a> shop page and go straight to checkout.
</p> <div class="overflow-x-auto mb-10"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Service / Volume</th> <th class="text-left p-3 font-heading">Rate</th> <th class="text-left p-3 font-heading">Requirements</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">First-Class single piece</td> <td class="p-3 text-navy-600 font-bold">$0.65</td> <td class="p-3 text-navy-500">3.5″×5″ – 4.25″×6″ (USPS postcard dimensions)</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">First-Class bulk (automation 5-digit)</td> <td class="p-3 text-navy-600">$0.420</td> <td class="p-3 text-navy-500">500+ pieces, IMb, presorted</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Marketing Mail bulk (letter rate)</td> <td class="p-3 text-navy-600">from $0.395</td> <td class="p-3 text-navy-500">200+ pieces, automation 5-digit and above</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">EDDM (oversized postcard, ≥6.125″ long)</td> <td class="p-3 text-navy-600">$0.260</td> <td class="p-3 text-navy-500">200+ pieces, no permit, every address</td> </tr> </tbody> </table> </div> <!-- Large Envelope (Flats) --> <h2 id="large-envelope" class="text-2xl font-display text-crst-primary mb-3">Large Envelope (Flat) Rates ${YEAR}</h2> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
USPS classifies pieces larger than 6.125″ tall or 11.5″ long or 0.25″ thick as <em>large envelopes</em> (also called flats). Common formats include <a href="/guides/envelope-sizes/9x12" class="text-crst-primary underline hover:text-crst-gold">9×12 envelopes</a>, <a href="/guides/envelope-sizes/a10" class="text-crst-primary underline hover:text-crst-gold">A10 envelopes</a>, and catalog mailers. First-Class large envelope postage increased 21% on April 26, ${YEAR}.
</p> <div class="overflow-x-auto mb-10"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Weight (not over)</th> <th class="text-left p-3 font-heading">First-Class Retail</th> <th class="text-left p-3 font-heading">Notes</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"><td class="p-3 font-semibold text-navy-800">1 oz</td><td class="p-3 text-navy-600 font-bold">$1.63</td><td class="p-3 text-navy-500">Most 9×12 single-sheet mailings</td></tr> <tr class="bg-navy-50/50"><td class="p-3 font-semibold text-navy-800">2 oz</td><td class="p-3 text-navy-600">$1.90</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-white"><td class="p-3 font-semibold text-navy-800">3 oz</td><td class="p-3 text-navy-600">$2.17</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-navy-50/50"><td class="p-3 font-semibold text-navy-800">4 oz</td><td class="p-3 text-navy-600">$2.44</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-white"><td class="p-3 font-semibold text-navy-800">5 oz</td><td class="p-3 text-navy-600">$2.72</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-navy-50/50"><td class="p-3 font-semibold text-navy-800">6 oz</td><td class="p-3 text-navy-600">$3.00</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-white"><td class="p-3 font-semibold text-navy-800">7 oz</td><td class="p-3 text-navy-600">$3.28</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-navy-50/50"><td class="p-3 font-semibold text-navy-800">8 oz</td><td class="p-3 text-navy-600">$3.56</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-white"><td class="p-3 font-semibold text-navy-800">9 oz</td><td class="p-3 text-navy-600">$3.84</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-navy-50/50"><td class="p-3 font-semibold text-navy-800">10 oz</td><td class="p-3 text-navy-600">$4.14</td><td class="p-3 text-navy-500"></td></tr> <tr class="bg-white"><td class="p-3 font-semibold text-navy-800">13 oz</td><td class="p-3 text-navy-600">$5.04</td><td class="p-3 text-navy-500">Max First-Class flat weight</td></tr> </tbody> </table> </div> <!-- Non-Profit --> <h2 id="nonprofit" class="text-2xl font-display text-crst-primary mb-3">Non-Profit Mail Rates ${YEAR}</h2> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
Qualifying 501(c)(3) organizations receive significantly reduced USPS rates — typically 40–50% less than commercial Marketing Mail. Requires USPS nonprofit authorization via <a href="/non-profit-mailing-application" class="text-crst-primary underline hover:text-crst-gold">PS Form 3624</a>. See our <a href="/services/non-profit-mailing" class="text-crst-primary underline hover:text-crst-gold">nonprofit mailing services page</a> and <a href="/services/non-profit-mailing/nonprofit-postage-rates" class="text-crst-primary underline hover:text-crst-gold">savings calculator</a>.
</p> <div class="overflow-x-auto mb-4"> <table class="w-full text-sm border border-navy-200 rounded-lg overflow-hidden"> <thead> <tr class="bg-crst-primary text-white"> <th class="text-left p-3 font-heading">Mail Piece / Sort Level</th> <th class="text-left p-3 font-heading">Nonprofit Rate</th> <th class="text-left p-3 font-heading">vs. Commercial</th> <th class="text-left p-3 font-heading">Savings</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Letters — Carrier Route Saturation</td> <td class="p-3 text-navy-500 italic">Contact us</td> <td class="p-3 text-navy-500 italic">Contact us</td> <td class="p-3 text-navy-400">—</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Letters — Automation 5-Digit</td> <td class="p-3 text-navy-600 font-bold">$0.185</td> <td class="p-3 text-navy-600">$0.395</td> <td class="p-3 text-green-600 font-semibold">~53%</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Letters — Automation 3-Digit</td> <td class="p-3 text-navy-500 italic">Contact us</td> <td class="p-3 text-navy-500 italic">Contact us</td> <td class="p-3 text-navy-400">—</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Letters — Mixed</td> <td class="p-3 text-navy-600">$0.257</td> <td class="p-3 text-navy-600">$0.467</td> <td class="p-3 text-green-600 font-semibold">~45%</td> </tr> <tr class="bg-white"> <td class="p-3 font-semibold text-navy-800">Flats — Carrier Route Saturation</td> <td class="p-3 text-navy-500 italic">Contact us</td> <td class="p-3 text-navy-500 italic">Contact us</td> <td class="p-3 text-navy-400">—</td> </tr> <tr class="bg-navy-50/50"> <td class="p-3 font-semibold text-navy-800">Flats — EDDM / Carrier Route</td> <td class="p-3 text-navy-600">$0.181</td> <td class="p-3 text-navy-600">$0.291</td> <td class="p-3 text-green-600 font-semibold">~38%</td> </tr> </tbody> </table> </div> <p class="text-xs text-navy-400 mb-10">Rates effective July 12, 2026 · Source: USPS Notice 123. Shown at no entry discount. Presort and carrier-route pricing varies — <a href="/contact" class="text-crst-primary underline hover:text-crst-gold">contact us</a> for your exact per-piece rate. Nonprofit authorization is permanent once approved.</p> <!-- FAQ --> <h2 id="faq" class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-4 mb-12"> ${faqs.map(({ q, a }) => renderTemplate`<details class="group bg-navy-50/50 rounded-xl border border-navy-100 overflow-hidden"> <summary class="flex items-center justify-between p-4 cursor-pointer font-heading font-semibold text-navy-800 text-sm list-none hover:bg-navy-100/50 transition-colors"> ${q} <svg class="w-4 h-4 shrink-0 opacity-50 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg> </summary> <div class="px-4 pb-4 text-sm text-navy-600/80 leading-relaxed border-t border-navy-100 pt-3"> ${a} </div> </details>`)} </div> <!-- CTA --> <div class="bg-crst-primary/5 border border-crst-primary/20 rounded-xl p-6 mt-8"> <h3 class="font-heading font-bold text-crst-primary mb-2">Get an Exact Postage Quote</h3> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
Actual postage depends on your specific mail piece size, weight, presort level, and entry point. Let us analyze your campaign and provide an exact all-in cost — postage, printing, and mailing combined.
</p> <div class="flex flex-wrap gap-3"> <a href="/contact?service=direct-mail" class="btn-primary text-sm">Request a Free Quote</a> <a href="/guides/envelope-sizes" class="btn-secondary text-sm">Mail Piece Size Guide →</a> </div> </div> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graphItems
  }))) })}` })}`;
}, "/home/runner/workspace/src/pages/direct-mail-tools/postage-rates.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/direct-mail-tools/postage-rates.astro";
const $$url = "/direct-mail-tools/postage-rates";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PostageRates,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
