/* empty css                                  */
import { g as createComponent, m as maybeRenderHead, i as addAttribute, r as renderTemplate, j as renderComponent } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFB5IMP7.mjs';
import 'clsx';
import { B as BUSINESS, C as COUNTIES, a as CASE_STUDIES, S as SERVICES } from '../chunks/site_BORfRXu4.mjs';
import { $ as $$ServiceCard } from '../chunks/ServiceCard_Bmn_pxe2.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-crst-primary overflow-hidden"> <!-- Background layers --> <div class="absolute inset-0"> <div class="absolute inset-0 bg-gradient-to-br from-navy-900 via-crst-primary to-navy-700"></div> <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px;"></div> <!-- Geometric accents --> <div class="absolute top-20 right-0 w-96 h-96 rounded-full bg-crst-accent/10 blur-3xl"></div> <div class="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-crst-gold/8 blur-3xl"></div> </div> <div class="relative container-wide py-20 lg:py-28"> <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"> <!-- Text --> <div> <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-xs font-heading font-medium text-white/80 border border-white/10"> <span class="w-2 h-2 rounded-full bg-crst-gold animate-pulse"></span>
Serving the Hudson Valley since ${BUSINESS.founded} </div> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-[1.08] mb-6">
Direct Mail & Printing <br class="hidden sm:block"> <span class="text-crst-gold">Services in Saugerties, NY</span> </h1> <p class="text-lg text-white/70 font-heading leading-relaxed max-w-xl mb-8">
Cornerstone Services, Inc. (CRST), based in Saugerties, New York, is a full-service direct mail company serving Ulster, Dutchess, and Orange counties since 1998. CRST manages direct mail strategy, data lists, graphic design, printing, EDDM, mail preparation, and fulfillment in-house, with no outsourcing, for businesses, nonprofits, political organizations, municipalities, and real estate professionals across the Hudson Valley.
</p> <p class="text-base text-white/55 font-heading leading-relaxed max-w-xl mb-8">
As a USPS-certified direct mail partner, CRST helps clients plan, print, and deliver targeted mail campaigns from start to finish under one roof.
</p> <div class="flex flex-wrap gap-3"> <a href="/estimate" class="btn-accent text-sm px-7 py-3.5">
Get Free Estimate
<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> <a href="/services" class="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/20 text-white font-heading font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30">
Our Services
</a> </div> <!-- Trust signals --> <div class="flex items-center gap-6 mt-10 pt-8 border-t border-white/10"> <div class="flex items-center gap-2 text-xs text-white/50 font-heading"> <svg class="w-4 h-4 text-crst-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
BBB A+ Rated
</div> <div class="flex items-center gap-2 text-xs text-white/50 font-heading"> <svg class="w-4 h-4 text-crst-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> ${BUSINESS.stats.onTime} On-Time
</div> <div class="flex items-center gap-2 text-xs text-white/50 font-heading"> <svg class="w-4 h-4 text-crst-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> ${BUSINESS.stats.municipalities} Municipalities
</div> </div> </div> <!-- Hero video (desktop: local mp4) / (mobile: click-to-play Vimeo) --> <div> <div class="relative rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10" id="hero-media"> <div class="block md:hidden" id="hero-mobile-poster" style="padding:75% 0 0 0;position:relative;cursor:pointer;background:#000;"> <img src="https://i.vimeocdn.com/video/2129378406-f17d573e25d7a90240d1e513947dadcb4a41148b721a2661ad9f5016ec192a71-d_640x360" alt="Play video — Cornerstone Services" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;" loading="eager"> <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.25);"> <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="rgba(0,0,0,0.55)"></circle><polygon points="29,22 29,50 54,36" fill="white"></polygon></svg> </div> </div> </div>  <div class="mt-4 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-crst-accent hover:bg-crst-accent/90 text-white font-heading font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-crst-accent/25 hover:-translate-y-0.5"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path> </svg>
Call Us: ${BUSINESS.phone} </a> </div> </div> </div> </div> <!-- Bottom wave --> <div class="absolute bottom-0 left-0 right-0"> <svg viewBox="0 0 1440 48" fill="none" class="w-full h-auto"> <path d="M0 48h1440V24c-240 16-480 24-720 24S240 40 0 24v24z" fill="white"></path> </svg> </div> </section>`;
}, "/home/runner/workspace/src/components/Hero.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": "https://crst.net/#organization",
    name: "Cornerstone Services, Inc.",
    alternateName: "CRST",
    url: "https://crst.net",
    logo: "https://crst.net/images/crst-logo.webp",
    image: "https://crst.net/images/crst-logo.webp",
    description: "Full-service direct mail, printing, and mailing company serving the Hudson Valley since 1998. In-house data lists, graphic design, commercial printing, and USPS postal prep.",
    foundingDate: "1998",
    telephone: "+18452555722",
    email: "info@crst.net",
    address: {
      "@type": "PostalAddress",
      streetAddress: "387 Malden Turnpike",
      addressLocality: "Saugerties",
      addressRegion: "NY",
      postalCode: "12477",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.7476,
      longitude: -74.0871
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ulster County, NY" },
      { "@type": "AdministrativeArea", name: "Dutchess County, NY" },
      { "@type": "AdministrativeArea", name: "Orange County, NY" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Direct Mail & Printing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Direct Mail Campaigns", url: "https://crst.net/services/direct-mail" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Lists", url: "https://crst.net/services/data-lists" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Printing Services", url: "https://crst.net/services/printing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mailing Services", url: "https://crst.net/services/mailing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design", url: "https://crst.net/services/graphic-design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Every Door Direct Mail (EDDM)", url: "https://crst.net/services/eddm" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Non-Profit Mailing", url: "https://crst.net/services/non-profit-mailing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design", url: "https://crst.net/services/web-design" } }
      ]
    },
    sameAs: [
      "https://www.linkedin.com/company/crstnet/",
      "https://x.com/CRSTNET",
      "https://www.instagram.com/cornerstoneservicesinc/",
      "https://www.youtube.com/@CornerstoneServicesInc",
      "https://www.tiktok.com/@crst_net",
      "https://www.pinterest.com/CornerstoneServicesInc/",
      "https://www.facebook.com/CornerstoneServicesInc/"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Direct Mail & Printing Services | Saugerties, NY", "description": "Hudson Valley's USPS-certified direct mail partner since 1998. BBB A+, 98% on-time. Design, print, and mail under one roof \u2014 Ulster, Dutchess & Orange counties.", "schema": localBusinessSchema }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", "  ", `<section class="py-16 lg:py-20 bg-white"> <div class="container-wide"> <div class="text-center mb-12"> <div class="section-divider mx-auto mb-4"></div> <h2 class="text-3xl sm:text-4xl font-display text-crst-primary mb-3">
Direct Mail, Printing, and Mailing Services
</h2> <p class="text-navy-600/70 font-heading text-lg max-w-2xl mx-auto">
Since 1998, Cornerstone has been Hudson Valley's full-service partner for <a href="/services/direct-mail" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">professional direct mail campaigns</a>, <a href="/services/eddm" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">Every Door Direct Mail services</a>, <a href="/services/non-profit-mailing" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">nonprofit fundraising and membership mailing</a>, <a href="/services/mailing" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">USPS-compliant high-volume mailing services</a>, <a href="/services/data-lists" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">targeted direct mail data lists</a>, <a href="/services/printing" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">commercial direct mail printing</a>, and <a href="/services/union-printing" class="text-crst-accent hover:text-crst-primary underline underline-offset-2">union printing for political and labor organizations</a>.
</p> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"> `, ' </div> <div class="text-center mt-8"> <a href="/services" title="View All Services" class="btn-secondary text-sm">\nView All Services\n<svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </a> </div> </div> </section>  <section class="py-16 lg:py-20 bg-navy-50/50 bg-grid"> <div class="container-wide"> <div class="text-center mb-12"> <div class="section-divider mx-auto mb-4"></div> <h2 class="text-3xl sm:text-4xl font-display text-crst-primary mb-3">\nHow It Works\n</h2> <p class="text-navy-600/70 font-heading text-lg max-w-2xl mx-auto">\nCornerstone uses a Project Management approach for all projects. Nothing is left to chance because we used rehearsed and reliable S.O.P. processes for printing and mail fulfillment. From your initial quote to the CRST Project Management desk, here are four straightforward steps that you could expect with your mailing.\n</p> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"> ', ` </div> </div> </section>  <section class="py-16 lg:py-20 bg-white"> <div class="container-wide"> <div class="text-center mb-12"> <div class="section-divider mx-auto mb-4"></div> <h2 class="text-3xl sm:text-4xl font-display text-crst-primary mb-3">
Who We Work With
</h2> <p class="text-navy-600/70 font-heading text-lg max-w-2xl mx-auto">
Local businesses, nonprofits, political campaigns, municipal governments, schools, fire departments, and PBA organizations. If you need something printed and mailed, we've probably done it for someone in your industry.
</p> </div> <div class="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"> `, ` </div> </div> </section>  <section class="py-16 lg:py-20 bg-navy-50/50 bg-grid"> <div class="container-wide"> <div class="text-center mb-12"> <div class="section-divider mx-auto mb-4"></div> <h2 class="text-3xl sm:text-4xl font-display text-crst-primary mb-3">
Proven Results
</h2> <p class="text-navy-600/70 font-heading text-lg max-w-2xl mx-auto">
Real campaigns. Real outcomes. See how we've helped businesses and organizations grow through direct mail.
</p> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"> `, ' </div> <div class="text-center mt-8"> <a href="/case-studies" title="View All Case Studies" class="btn-secondary text-sm">\nView All Case Studies\n</a> </div> </div> </section>  <section class="py-16 lg:py-20 bg-navy-50/50"> <div class="container-wide"> <div class="text-center mb-12"> <div class="section-divider mx-auto mb-4"></div> <h2 class="text-3xl sm:text-4xl font-display text-crst-primary mb-3">\nServing the Hudson Valley Since 1998\n</h2> <p class="text-navy-600/70 font-heading text-lg max-w-2xl mx-auto">\nOur facility is in Saugerties. We serve businesses and organizations across Ulster, Dutchess, and Orange Counties \u2014 ', ' municipalities total. Local means same-day pickups and face-to-face meetings when you need them.\n</p> </div> <div class="grid sm:grid-cols-3 gap-5"> ', ' </div> <div class="text-center mt-8"> <a href="/service-areas" title="View All Service Areas" class="btn-secondary text-sm">\nView All Service Areas\n</a> </div> </div> </section>  <section class="py-16 lg:py-20 bg-white"> <div class="container-wide"> <div class="text-center mb-12"> <div class="section-divider mx-auto mb-4"></div> <h2 class="text-3xl sm:text-4xl font-display text-crst-primary mb-3">\nWhat Our Clients Say\n</h2> </div> <div class="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto"> ', ` </div> </div> </section>  <section class="py-14 lg:py-20 bg-gray-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-10"> <div class="section-divider mx-auto mb-6"></div> <div class="flex items-center justify-center gap-4"> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary">Latest Articles</h2> </div> <p class="text-gray-600 mt-2">Insights and guides for smarter direct mail campaigns. <a href="https://blog.crst.net/" title="Cornerstone Services Blog" class="text-crst-accent hover:text-crst-primary underline text-sm">View all &rarr;</a></p> </div> <div id="latest-posts" class="grid md:grid-cols-3 gap-6"> <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse"> <div class="h-5 w-3/4 bg-gray-200 rounded mb-3"></div> <div class="h-3 w-1/3 bg-gray-200 rounded"></div> </div> <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse"> <div class="h-5 w-3/4 bg-gray-200 rounded mb-3"></div> <div class="h-3 w-1/3 bg-gray-200 rounded"></div> </div> <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse"> <div class="h-5 w-3/4 bg-gray-200 rounded mb-3"></div> <div class="h-3 w-1/3 bg-gray-200 rounded"></div> </div> </div> <script>
        (async function () {
          var root = document.getElementById('latest-posts');
          if (!root) return;
          try {
            var res = await fetch('/api/latest-posts.json');
            var data = await res.json();
            if (!data || !data.ok || !Array.isArray(data.posts) || data.posts.length === 0) {
              root.innerHTML = '<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-sm text-gray-600">No recent posts found. <a class="text-crst-accent hover:underline" href="https://blog.crst.net/">Visit the blog</a>.</div>';
              return;
            }
            root.innerHTML = data.posts.slice(0, 3).map(function (p) {
              var date = p.date ? new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
              var title = (p.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
              var url = (p.url || '').replace(/"/g, '&quot;');
              return '<a href="' + url + '" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group" target="_blank" rel="noopener">' +
                '<h3 class="text-lg font-display font-bold text-crst-primary group-hover:text-crst-accent transition-colors mb-2">' + title + '</h3>' +
                '<div class="text-xs text-gray-500">' + date + '</div>' +
                '</a>';
            }).join('');
          } catch (e) {
            root.innerHTML = '<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-sm text-gray-600">Unable to load posts right now. <a class="text-crst-accent hover:underline" href="https://blog.crst.net/">Visit the blog</a>.</div>';
          }
        })();
      <\/script> </div> </section> `, " "])), renderComponent($$result2, "Hero", $$Hero, {}), maybeRenderHead(), SERVICES.slice(0, 8).map((service) => renderTemplate`${renderComponent($$result2, "ServiceCard", $$ServiceCard, { "title": service.title, "slug": service.slug, "summary": service.summary, "icon": service.icon })}`), [
    { step: "01", title: "Target", desc: 'Our process starts uniquely with reverse-engineering. "What is the result you want to achieve?" and then we engage the data, design & mailing tools necessary to achieve that result.' },
    { step: "02", title: "Data", desc: `Good data = good results. Bad data = well\u2026 you don't have to guess. Many of our mailings amortize multiple data sets so that your mailings are not an "all chips on black" roulette wheel gamble. You also get free Data Quality Reports with in-house lists that you provide.` },
    { step: "03", title: "Design", desc: "We create simple, compelling and USPS-compliant mail pieces optimized for both visual impact and postal automation. We know that we only have 1 to 2 seconds to capture recipient attention." },
    { step: "04", title: "Mail", desc: 'There is no "one size fits all" approach. We generally work with automation mail due to integrity of process and statistical likelihood of on-time delivery, yet we also have unique strategies for EDDM mailings.' }
  ].map((item) => renderTemplate`<div class="animate-on-scroll"> <div class="text-5xl font-display text-crst-gold/30 mb-2">${item.step}</div> <h3 class="font-heading font-bold text-navy-800 text-lg mb-2">${item.title}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${item.desc}</p> </div>`), ["Local Businesses", "Restaurants", "Real Estate", "Healthcare", "Nonprofits", "Political Campaigns", "Municipalities", "Schools", "Fire Departments", "PBA Organizations", "Churches", "Contractors"].map((type) => renderTemplate`<span class="inline-block px-4 py-2 text-sm font-heading font-medium bg-navy-50 text-navy-600 rounded-full border border-navy-100"> ${type} </span>`), CASE_STUDIES.slice(0, 6).map((study) => renderTemplate`<a${addAttribute(`/case-studies/${study.slug}`, "href")}${addAttribute(study.title, "title")} class="card group block"> <div class="flex items-center gap-2 mb-3"> <span class="inline-block px-2 py-0.5 text-xs font-heading font-medium bg-navy-50 text-navy-600 rounded"> ${study.industry} </span> </div> <h3 class="font-heading font-semibold text-navy-800 group-hover:text-crst-primary transition-colors mb-2"> ${study.title} </h3> <p class="text-sm text-navy-600/60"> ${study.client} — ${study.location} </p> <span class="inline-flex items-center gap-1 mt-3 text-xs font-heading font-semibold text-crst-accent group-hover:text-crst-primary transition-colors">
Read case study
<svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> </span> </a>`), BUSINESS.stats.municipalities, Object.values(COUNTIES).map((county) => renderTemplate`<a${addAttribute(`/service-areas/${county.slug}`, "href")}${addAttribute(county.name, "title")} class="card group text-center block"> <div class="w-14 h-14 rounded-full bg-crst-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-crst-primary transition-colors duration-300"> <svg class="w-6 h-6 text-crst-primary group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <h3 class="font-heading font-bold text-navy-800 text-lg mb-2 group-hover:text-crst-primary transition-colors"> ${county.name} </h3> <p class="text-sm text-navy-600/60 leading-relaxed"> ${county.description} </p> </a>`), [
    { text: "Our agency uses Cornerstone for all our direct mail projects. They are super-responsive and meticulous in their work. Highly recommend.", name: "Marlene McTigue", role: "Marketing Agency Owner", image: "/images/testimonial-marlene.png", title: "Marlene McTigue \u2014 Marketing Agency Owner" },
    { text: "I'm always impressed with Sean and his team. They stay on top of the latest technology in mailing and data management. True professionals.", name: "James Yaston", role: "Business Owner", image: "/images/testimonial-james.png", title: "James Yaston \u2014 Business Owner" },
    { text: "I needed postcards printed and mailed fast. Cornerstone was knowledgeable, friendly, reliable, and delivered on time. Will use again.", name: "Sapna Moudgil-Shah", role: "Small Business Owner", image: "/images/testimonial-sapna.png", title: "Sapna Moudgil-Shah \u2014 Small Business Owner" }
  ].map((testimonial) => renderTemplate`<div class="bg-navy-50/60 rounded-xl p-6 border border-navy-100"> <div class="flex gap-0.5 mb-3"> ${[...Array(5)].map(() => renderTemplate`<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`)} </div> <svg class="w-8 h-8 text-crst-gold/40 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg> <p class="text-sm text-navy-700 leading-relaxed mb-4 italic">"${testimonial.text}"</p> <div class="flex items-center gap-3"> <img${addAttribute(testimonial.image, "src")}${addAttribute(testimonial.name, "alt")}${addAttribute(testimonial.title, "title")} class="w-10 h-10 rounded-full object-cover" loading="lazy"> <div> <div class="font-heading font-semibold text-navy-800 text-sm">${testimonial.name}</div> <div class="text-xs text-navy-500">${testimonial.role}</div> </div> </div> </div>`), renderComponent($$result2, "CTASection", $$CTASection, {})) })}`;
}, "/home/runner/workspace/src/pages/index.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
