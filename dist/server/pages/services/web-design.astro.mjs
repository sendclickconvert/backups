/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { $ as $$AuthorByline } from '../../chunks/AuthorByline_DNWN2IXS.mjs';
import { B as BUSINESS, C as COUNTIES } from '../../chunks/site_BORfRXu4.mjs';
import { g as getCollection } from '../../chunks/_astro_content_CCCTsyOJ.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$WebDesign = createComponent(async ($$result, $$props, $$slots) => {
  const clusterArticles = await getCollection("web-design-articles");
  const webFaqs = [
    { q: "Do you only build websites for direct mail clients?", a: "We primarily build websites for businesses that also use our direct mail services, but we are open to standalone web projects. Our strongest work is when we can align the website with the mail campaign \u2014 same messaging, same offer, same landing page for the URL printed on the mail piece." },
    { q: "What platform do you build on?", a: "We build on WordPress for most client sites. It is manageable by non-technical staff, well-supported, and works with every major marketing tool. For smaller campaigns we also build simple static landing pages that load quickly and are easy to maintain." },
    { q: "Can you create a specific landing page for a mail campaign?", a: "Yes. Campaign-specific landing pages are one of the most effective ways to track mail response rates. The page URL goes on the mail piece, anyone who visits it came from the mailing, and you can measure exactly how many people responded." },
    { q: "Do you provide ongoing hosting and maintenance?", a: "Yes. We offer hosting and maintenance plans for sites we build. This includes security updates, plugin updates, uptime monitoring, and basic content changes. We do not host sites we did not build." },
    { q: "How long does a website take to build?", a: "A basic five-page WordPress site typically takes 4\u20136 weeks from kickoff to launch, assuming content and images are provided promptly. More complex sites with custom functionality, e-commerce, or member portals take longer." },
    { q: "What do you need from me to start?", a: "We need your logo (vector if available), your company colors and brand guidelines, the pages you want on the site, and your content (text and photos). If you need help with copy or photography, let us know and we can discuss options." }
  ];
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Web Design & Development Services",
        provider: { "@id": "https://crst.net/#organization" },
        areaServed: [
          { "@type": "County", name: "Ulster County, New York" },
          { "@type": "County", name: "Dutchess County, New York" },
          { "@type": "County", name: "Orange County, New York" }
        ],
        url: "https://crst.net/services/web-design"
      },
      {
        "@type": "FAQPage",
        mainEntity: webFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://crst.net/services" },
          { "@type": "ListItem", position: 3, name: "Web Design", item: "https://crst.net/services/web-design" }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://crst.net/services/web-design",
        name: "Web Design for Direct Mail Clients",
        url: "https://crst.net/services/web-design",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2"]
        }
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Web Design for Direct Mail Clients | Saugerties, NY", "description": "Website design and development for Hudson Valley businesses. WordPress sites that complete the marketing loop alongside your direct mail campaigns.", "schema": null }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Web Design & Development", "subtitle": "Direct mail drives people online. We build the website they land on \u2014 mobile-ready, fast, and designed to convert the traffic your mailers generate.", "breadcrumbs": [
    { label: "Services", href: "/services" },
    { label: "Web Design" }
  ], "noSchema": true })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-narrow"> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">Websites That Work With Your Direct Mail</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
When a direct mail piece lands in someone's mailbox, most recipients look up the sender online before responding. If your website is outdated or doesn't load on mobile, you lose the lead your mailer generated. We build WordPress websites for Hudson Valley businesses that complete the marketing loop — a landing page your mail recipients can actually use. Mobile-responsive, fast-loading, and designed to convert traffic from your direct mail campaigns into calls, form submissions, or orders.
</p> <p class="text-navy-600/80 leading-relaxed mb-6">
We handle design, development, content, hosting, and ongoing maintenance. Every site is built on WordPress with responsive design, on-page SEO, contact forms, and Google Analytics. We can add landing pages tied to specific mail campaigns so you can track response rates. Because we also handle the direct mail side, your printed piece and your website can share the same design language, messaging, and calls to action.
</p> <!-- What's Included --> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">What's Included</h2> <div class="grid sm:grid-cols-2 gap-4 mb-6"> ${[
    { title: "Custom Design", desc: "Unique layouts tailored to your brand \u2014 no cookie-cutter templates." },
    { title: "Mobile-Responsive", desc: "Every site adapts to phones, tablets, and desktop screens automatically." },
    { title: "Search Engine Optimization", desc: "On-page SEO, local schema markup, and Google Business integration." },
    { title: "Hosting & Maintenance", desc: "Reliable hosting, SSL certificates, backups, and ongoing updates." },
    { title: "Contact Forms & CTAs", desc: "Lead capture forms that feed directly into your CRM or email." },
    { title: "Analytics & Tracking", desc: "Google Analytics, conversion tracking, and monthly reporting." }
  ].map((item) => renderTemplate`<div class="flex items-start gap-3 p-4 bg-navy-50/40 rounded-lg border border-navy-100"> <svg class="w-5 h-5 text-crst-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> <div> <div class="font-heading font-semibold text-navy-800 text-sm">${item.title}</div> <div class="text-xs text-navy-600/60">${item.desc}</div> </div> </div>`)} </div> <!-- Integration callout --> <div class="bg-crst-primary rounded-xl p-6 lg:p-8 my-10"> <h3 class="font-display text-white text-xl mb-3">Direct Mail + Web = More Conversions</h3> <p class="text-white/70 text-sm leading-relaxed mb-4">
We design your website and your mail pieces together so they share a consistent brand identity. When a prospect receives your postcard and visits your website, they see the same colors, messaging, and call-to-action — building trust and driving action.
</p> <a href="/services/direct-mail" class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-gold hover:text-white transition-colors">
Learn about our direct mail services
<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> </div> <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 mt-10 text-center"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Ready to Build Your Website?</p> <p class="text-navy-600/70 text-sm mb-4">Get a free consultation on your web design project.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/estimate" class="btn-primary text-sm">Get a Free Estimate</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> <!-- Portfolio domains --> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">Our Web Portfolio</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Cornerstone Services has designed and built websites for businesses across the Hudson Valley and beyond. Our sites range from simple informational pages for local service providers to multi-page sites with e-commerce, booking systems, and custom integrations.
</p> <p class="text-navy-600/80 leading-relaxed">
In addition to crst.net, we manage domains including crstweb.com and donerightmail.com. Contact us to discuss your website project and see examples of our work.
</p> </div> </section> <section class="py-14 bg-white"> <div class="container-narrow max-w-3xl mx-auto"> <h2 class="text-2xl font-display text-crst-primary mb-6">Web Design FAQ</h2> <div class="space-y-4"> ${webFaqs.map((item) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${item.q}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.a}</p> </div>`)} </div> </div> </section> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, {})} </div> <section class="py-10 bg-crst-primary/5 border-y border-crst-primary/10"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h3 class="text-xl font-display font-bold text-crst-primary mb-3">Ready to Build Your Website?</h3> <p class="text-gray-600 mb-6 max-w-2xl mx-auto">Get a free consultation on your web design project.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="btn-primary inline-flex items-center gap-2"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> <a href="/estimate" class="btn-accent inline-flex items-center gap-2">
Get a Free Estimate
<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> </div> </div> </section> <section class="py-14 bg-navy-50/50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-8"> <h2 class="text-2xl font-display font-bold text-crst-primary">Service Areas</h2> <p class="text-gray-600 mt-2">We serve businesses and organizations across three Hudson Valley counties.</p> </div> <div class="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"> ${Object.values(COUNTIES).map((county) => renderTemplate`<a${addAttribute(`/service-areas/${county.slug}`, "href")} class="flex items-center justify-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <svg class="w-5 h-5 text-crst-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> <span class="font-heading font-semibold text-gray-800 group-hover:text-crst-primary transition-colors">${county.name}</span> </a>`)} </div> </div> </section> <section class="py-16 bg-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-10"> <h2 class="text-2xl font-display font-bold text-crst-primary mb-3">Web Design Guides</h2> <p class="text-navy-600/70 max-w-2xl mx-auto">In-depth guides on small business website costs, local web designer vs. national agency, what to expect from a web design project, and what works for Hudson Valley business websites — written by Sean Griffin, owner of Cornerstone Services since 1998.</p> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"> ${clusterArticles.map((a) => renderTemplate`<a${addAttribute(`/services/web-design/${a.slug}`, "href")} class="block p-5 bg-navy-50/40 rounded-xl border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <h3 class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors leading-snug mb-2">${a.data.title}</h3> <p class="text-xs text-navy-600/60 line-clamp-2 leading-relaxed">${a.data.description}</p> </a>`)} </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, { "headline": "Need a Website That Converts?", "text": "Get a free consultation on your web design project. We build sites that work hand-in-hand with your direct mail campaigns." })} `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(graphSchema))) })}` })}`;
}, "/home/runner/workspace/src/pages/services/web-design.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/services/web-design.astro";
const $$url = "/services/web-design";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$WebDesign,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
