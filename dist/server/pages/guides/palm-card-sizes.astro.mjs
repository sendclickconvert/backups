/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { $ as $$AuthorByline } from '../../chunks/AuthorByline_DNWN2IXS.mjs';
import { B as BUSINESS } from '../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const canonical = "https://crst.net/guides/palm-card-sizes";
  const title = "Palm Card Sizes: Dimensions, Stock & Use Cases (2026 Guide)";
  const description = "Compare palm card sizes, paper stocks, and coatings for canvassing, campaign literature, and direct mail. Choose the right format for your message.";
  const lastUpdated = "2026-08-26";
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
  const sizes = [
    { size: "4 x 6", stock: "100#, 14pt AQ, 14pt UV" },
    { size: "4.5 x 6.5", stock: "14pt UV" },
    { size: "4 x 8.5", stock: "14pt AQ" },
    { size: "4 x 9", stock: "100#, 14pt AQ, 14pt UV" },
    { size: "4 x 11", stock: "14pt UV" },
    { size: "4.25 x 11", stock: "14pt AQ, 14pt UV" },
    { size: "4.5 x 11", stock: "14pt UV" }
  ];
  const faqs = [
    { q: "What is the most common palm card size?", a: "There is no single standard, but 4 x 9 is a popular all-purpose format. It gives a campaign room for a photo, short bio, key positions, and contact information while remaining easy for volunteers to carry and hand out. A 4 x 6 card is a better fit when the message needs to stay especially compact." },
    { q: "What stock should I choose for a palm card?", a: "For a durable campaign handout, 14pt card stock is a common choice. An aqueous coating (AQ) adds a practical protective finish, while UV coating creates a glossy, high-impact surface. A 100# option can work when you want a lighter paper feel. The best choice depends on how the card will be distributed, the look of the artwork, and your budget." },
    { q: "How many palm cards do I need for a canvassing campaign?", a: "Start with the number of doors, events, polling locations, or volunteers you plan to cover, then add a reasonable amount for handouts and reprints. A targeted door-to-door effort may need fewer cards than a campaign distributing at every event or polling place. If you share your audience and distribution plan, we can help turn it into a practical quantity." },
    { q: "Do palm cards need a union bug for political campaigns?", a: "Not every political campaign is subject to the same union-printing requirement. A party, labor organization, endorsement, contract, or campaign policy may call for a union-printed piece and its union bug. Confirm the requirement with the organization requesting it; when you need union printing, our Union Palm Card is produced at a union shop with the official union bug." }
  ];
  const graphItems = [
    {
      "@type": "Article",
      headline: title,
      description,
      url: canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      datePublished: lastUpdated,
      dateModified: lastUpdated,
      inLanguage: "en-US",
      author: seanGriffin,
      publisher: {
        "@type": "Organization",
        "@id": "https://crst.net/#organization",
        name: "Cornerstone Services, Inc.",
        url: "https://crst.net",
        logo: { "@type": "ImageObject", url: "https://crst.net/images/crst-logo.png", width: 200, height: 60 }
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://crst.net/guides" },
        { "@type": "ListItem", position: 3, name: "Palm Card Sizes", item: canonical }
      ]
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "canonical": canonical, "schema": null }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-crst-primary text-white py-12 lg:py-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <nav class="text-sm text-white/50 mb-4" aria-label="Breadcrumb"> <a href="/" class="hover:text-white/80 transition-colors">Home</a><span class="mx-2">›</span> <a href="/guides" class="hover:text-white/80 transition-colors">Guides</a><span class="mx-2">›</span> <span class="text-white/70">Palm Card Sizes</span> </nav> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-white mb-4">
Palm Card Sizes: Dimensions, Stock & Use Cases
</h1> <p class="article-lead text-white/70 text-lg max-w-2xl leading-relaxed">
Palm cards are compact campaign pieces, but the right size still depends on how people will read and use them. Compare common dimensions, available stocks, and finishes before you send your artwork to print.
</p> </div> </section> <section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> <div class="bg-navy-50/60 border border-navy-100 rounded-xl p-5 mb-8 text-navy-700 leading-relaxed">
Palm cards are commonly printed in sizes from 4 x 6 to 4.5 x 11 inches. Choose a smaller card for a focused handout, a 4 x 9 format for a balanced campaign piece, or a longer size when your message needs more room. Available options include 100# paper and 14pt card stock with AQ or UV coating.
</div> <h2 class="text-2xl font-display font-bold text-crst-primary mb-4">Palm Card Sizes at a Glance</h2> <div class="overflow-x-auto rounded-xl border border-navy-100 mb-10"> <table class="w-full text-sm"> <thead> <tr class="bg-crst-primary text-white"> <th class="px-4 py-3 text-left font-heading font-semibold">Size (inches)</th> <th class="px-4 py-3 text-left font-heading font-semibold">Available Stock</th> </tr> </thead> <tbody class="divide-y divide-navy-100"> ${sizes.map((row, i) => renderTemplate`<tr${addAttribute(`${i % 2 === 0 ? "bg-white" : "bg-navy-50/20"}`, "class")}> <td class="px-4 py-3 font-mono text-xs text-navy-700 font-semibold">${row.size}</td> <td class="px-4 py-3 text-navy-600/80 text-xs">${row.stock}</td> </tr>`)} </tbody> </table> </div> <div class="prose prose-navy max-w-none prose-headings:font-display prose-headings:text-crst-primary prose-a:text-crst-accent hover:prose-a:text-crst-primary prose-strong:text-navy-800 prose-p:text-navy-600/80 prose-li:text-navy-600/80"> <h2>Choosing the Right Palm Card Size</h2> <p>Think about the job the card has to do before choosing a dimension. A 4 x 6 card keeps a short message, contact details, or event information easy to scan. The 4 x 9 format gives most campaign handouts a useful balance of writing space and portability, while 4 x 11 and other longer formats accommodate more positions, endorsements, or candidate information. For door-to-door canvassing and events, consider how comfortably volunteers can carry the cards and how quickly recipients can read them. Keep important text and logos comfortably inside the trim area, and let the final size guide the hierarchy of your artwork.</p> <h2>Palm Card Stock Options Explained</h2> <p>Stock affects the feel, durability, and finish of the finished piece. The 100# option provides a lighter paper choice, while 14pt card stock feels more substantial in the hand and stands up well to repeated handling. AQ coating gives the surface a practical protective finish; UV coating produces a brighter gloss and helps images stand out. Choose the finish alongside your design: a highly photographic piece may benefit from gloss, while a simpler handout may call for a more understated surface. Quantity, artwork, and how the cards will be distributed also matter when comparing options.</p> <h2>Union-Printed Palm Cards</h2> <p>Campaigns and labor organizations that need a union-printed palm card can order our <a href="/shop/up-palm-card">Union Palm Card</a>, produced at a union shop with the official union bug. See our <a href="/guides/union-bug-printing">Union Bug Printing guide</a> for background on when a union label is required.</p> </div> <div class="not-prose mt-8"> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, {})} </div> <div class="mt-12"> <div class="section-divider mb-6"></div> <h2 class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-4"> ${faqs.map((item) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${item.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.a}</p> </div>`)} </div> </div> <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 text-center mt-10"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Ready to order palm cards?</p> <p class="text-navy-600/70 text-sm mb-4">Order online in minutes, or talk it through with us first.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/shop/palm-card" class="btn-primary text-sm">Shop Palm Cards →</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent transition-colors">
Call ${BUSINESS.phone} </a> </div> </div> </div> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Get a Print Quote</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">Tell us your size, quantity, and timeline. We'll send a detailed quote within one business day.</p> <a href="/estimate" class="btn-accent w-full text-center text-sm">Request a Quote</a> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Related Resources</h3> <div class="space-y-2"> ${[
    { label: "Shop Palm Cards", href: "/shop/palm-card" },
    { label: "Shop Union Palm Cards", href: "/shop/up-palm-card" },
    { label: "Union Bug Printing Guide", href: "/guides/union-bug-printing" },
    { label: "Printing Services", href: "/services/printing" },
    { label: "Union Printing", href: "/services/union-printing" }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${link.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> </div> </aside> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({ "@context": "https://schema.org", "@graph": graphItems }))) })}` })}`;
}, "/home/runner/workspace/src/pages/guides/palm-card-sizes/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/guides/palm-card-sizes/index.astro";
const $$url = "/guides/palm-card-sizes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
