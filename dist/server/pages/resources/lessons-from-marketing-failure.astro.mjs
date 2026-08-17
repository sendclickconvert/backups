/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { $ as $$AuthorByline } from '../../chunks/AuthorByline_DNWN2IXS.mjs';
import { B as BUSINESS } from '../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LessonsFromMarketingFailure = createComponent(($$result, $$props, $$slots) => {
  const title = "Tree Service Direct Mail \u2014 What Went Wrong";
  const description = "We received nearly identical EDDM mailers from three different tree services \u2014 same letter, same layout, different logos. Here's what every business can learn from this mistake.";
  const faqs = [
    {
      q: "What are the most common mistakes in direct mail design?",
      a: "The most common mistakes we see are using identical template designs that competitors also use (making your mailer indistinguishable), failing to include a clear call to action, using low-quality images, and not personalizing the message to the local area. This case study walks through real examples of each problem."
    },
    {
      q: "Does EDDM work for tree service and contractor marketing?",
      a: "Yes \u2014 EDDM is one of the most effective channels for tree services, landscapers, and contractors because it targets homeowners in specific neighborhoods. The key is differentiating your mailer from competitors who may be using the same template services. Cornerstone designs custom mailers that stand out."
    },
    {
      q: "How can I avoid looking like every other direct mail piece?",
      a: "Work with a printer who designs custom pieces rather than using a template service that sells the same layout to multiple businesses. In this case study, three different tree service companies sent virtually identical letters to the same carrier route \u2014 which undermined all of their credibility. Custom design from a local printer like Cornerstone prevents this."
    }
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://crst.net/resources/lessons-from-marketing-failure/#article",
    headline: "Lessons from Marketing Failure: A Tree Service Direct Mail Case Study",
    author: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
      logo: { "@type": "ImageObject", url: `${BUSINESS.url}/images/crst-logo.webp` }
    },
    datePublished: "2024-11-01",
    dateModified: "2026-03-16",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://crst.net/resources/lessons-from-marketing-failure"
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a }
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://crst.net/resources" },
      { "@type": "ListItem", position: 3, name: "Lessons from Marketing Failure", item: "https://crst.net/resources/lessons-from-marketing-failure" }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "schema": null }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Lessons from Marketing Failure: A Tree Service Direct Mail Case Study", "subtitle": "A real-world analysis of EDDM mailers from tree service companies \u2014 what worked, what failed, and what your business can learn.", "breadcrumbs": [
    { label: "Resources", href: "/resources" },
    { label: "Lessons from Marketing Failure" }
  ] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-3xl mx-auto"> <div class="section-divider mb-6"></div> <blockquote class="border-l-4 border-crst-gold pl-4 italic text-navy-600/80 mb-8">
"Only a fool learns from his own mistakes. The wise man learns from the mistakes of others." — Otto von Bismarck
</blockquote> <p class="text-navy-600/80 leading-relaxed mb-6">
Today's case study is about how NOT to do marketing. There are several image scans here, so it will be relevant and important for you to review all of them. They all pertain to the <a href="/services/direct-mail" class="text-crst-primary underline hover:text-crst-gold">direct mail marketing</a> of tree services (a.k.a. arborists, tree removal, or tree trimming).
</p> <p class="text-navy-600/80 leading-relaxed mb-8">
Direct mail is a great way of marketing tree services, and of course, it isn't wrong to go to a firm that purports to know something about your industry. We're going to look at these <a href="/services/eddm" class="text-crst-primary underline hover:text-crst-gold">EDDM</a> flat mailers we received and then talk about the good, the bad, and the ugly. Rarely is something all bad, and there are some overall positive things to say about the commercial EDDM mailers that we collected.
</p> <h2 class="text-2xl font-display text-crst-primary mb-4">What Went Right</h2> <div class="space-y-6 mb-10"> <div class="bg-green-50 border border-green-200 rounded-lg p-5"> <h3 class="font-semibold text-green-800 text-sm mb-2">Good Marketing Point #1: The mailers got noticed</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
We got these mailpieces, we saved them, and we're all talking about them. Job #1 of any mailing is to get the recipient to look at, and then if possible save, your mailer. Here, mission accomplished (although we saved all these for perhaps the wrong reasons). Bottom line: the mailers hit an intended target, and the recipient remembered.
</p> </div> <div class="bg-green-50 border border-green-200 rounded-lg p-5"> <h3 class="font-semibold text-green-800 text-sm mb-2">Good Marketing Point #2: Personalization attempt</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
There's an interesting attempt to personalize the marketing (albeit generically). This is an approach we like, and try to use often, although with images and not text/copy alone.
</p> </div> <div class="bg-green-50 border border-green-200 rounded-lg p-5"> <h3 class="font-semibold text-green-800 text-sm mb-2">Good Marketing Point #3: Clean and clear messaging</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
Generally speaking, these mailers are uncluttered and get to the point. There's a good use of white space (intentionally or unintentionally) and it's clear what the tree services are offering. Being clear and to the point IS the point because, in direct mail marketing, you are trying to purchase awareness in microseconds.
</p> </div> </div> <h2 class="text-2xl font-display text-crst-primary mb-4">What Went Wrong</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Now, let's look at what went wrong with all this. I bet you can spot some issues, but there's a whole mess of problems to unwrap here.
</p> <div class="space-y-6 mb-10"> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #1: Identical templates across competitors</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
If you compare the Top-Notch Tree Care & Removal LLC flyer with the Lemus Tree Service LLC flyers and Tree Pros Arborist Services, they are all the SAME letters. Undoubtedly, they went to the same tree service marketing "expert" who sold them not just the same style letter, but the same letter. At least the names and phone numbers were different, but assuredly, you wouldn't want your marketing campaign and branding to look similar, let alone identical, to some other firms.
</p> <div class="bg-gray-100 border border-gray-200 rounded-lg p-4 mt-3 text-sm italic text-gray-500">[Image: Side-by-side comparison of identical tree service mailer templates from three different companies]</div> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #2: Same mailer sent twice</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
Tree Pros used the same letter twice. Yes, they did this year-over-year. You run the risk of having someone throw out the second mailer because they likely think they already know what it says. When we do send the same mailer, we usually give at least a three-year break between cycles — we want the mailer to appear somewhat fresh upon arrival.
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #3: Everyone using the same format</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
All these letters are the same style — the perceived personal letter style. It's not wrong, but when everyone is engaging in the same marketing, it waters down the overall effectiveness for everyone. At Cornerstone, we do our best to "mix it up" with different mail piece colors, sizes, etc., but nobody asked the obvious question here: "who else regionally is using this format?"
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #4: No website listed</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
There are no websites listed, except for one mailer where it's only in small print at the bottom. This is a huge marketing failure because you can get "free" Google traffic (hence, higher ranking) if you make your web address loud and clear on your mailer. If they want to know more (because you can only fit so much on a letter), you make the recipient have to work to find you. Compare this with our recommendation in <a href="/resources/direct-mail-vs-email-marketing" class="text-crst-primary underline hover:text-crst-gold">direct mail vs. email marketing</a> — always drive recipients to your website.
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #5: Saturation mailing to wrong audience</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
This saturation mailing was sent to both commercial businesses and residential customers. We don't recommend sending tree service flyers to businesses and prefer to maximize the value of the outreach to residential recipients only. If 95% of your tree service customers are residential, then you might be throwing your marketing dollars away by including commercial destinations. Simply ask first and don't assume — there are two types of EDDM saturation: residential only, and residential and businesses.
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #6: Paper stock below USPS standards</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
Two of the 8.5" x 11" flyers were likely printed on 70 lb. paper stock, which is the minimum acceptable thickness for folded self-mailer flyers, but is against DMM USPS standards for EDDM. As per USPS Domestic Mail Manual (DMM) Section 201 "Physical Standards for Commercial Letters, Flats, and Parcels," Sub-Section 5.2.2 "<a href="https://pe.usps.com/cpim/ftp/manuals/dmm300/201.pdf" target="_blank" rel="noopener noreferrer" class="text-crst-primary underline hover:text-crst-gold">Dimensions for USPS Marketing Mail Flats with Simplified Addresses</a>," the minimum paper thickness for EDDM printing is 0.007 inches. Everything is fine until you get audited and your mailing gets rejected.
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #7: Same content on both sides</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
One mailer has the same letter on both sides (with a postal permit on one side, and even there, the return address is non-compliant with USPS DMM regulations for EDDM mail piece design). It's not a fatal flaw, but it distracts the recipient and makes them curious for the wrong reasons. You have only microseconds to deliver your message, so don't blow it with an odd approach.
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #8: Too much copy, no images</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
Long copy was used when icons or images representing services would have been far more effective. In an era of what Lord Maurice Saatchi called C.P.A. (Continuous Partial Attention), marketing could be reduced down to a single word — think: America has "Freedom" and Volvo, in automotive marketing, owned "Safety."
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #9: No service images</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
None of these mail pieces showed images that captured the services being promoted. This graphical loss makes the recipient "work" because long copy requires a mental process rather than allowing for an immediate intuiting of what is presented. We are all fatigued with promotional material, so having to read something non-essential becomes just that — non-essential.
</p> </div> <div class="bg-red-50 border border-red-200 rounded-lg p-5"> <h3 class="font-semibold text-red-800 text-sm mb-2">Problem #10: Wrong targeting for the market</h3> <p class="text-sm text-navy-600/80 leading-relaxed">
In a residential upstate market like New Paltz or Kingston or Red Hook and Rhinebeck where housing prices are high, the tree companies might wish to stay clear of hitting many city routes where there are many apartment dwellers and fewer homeowners. For marketing in city areas, Cornerstone usually recommends using homeowner data and not EDDM saturation so that we are reaching only the homeowners and not the renters.
</p> </div> </div> <h2 class="text-2xl font-display text-crst-primary mb-4">The Takeaway</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
We're left with a final question that even we could not answer — how did everyone, over just a few years, end up using the same format? We guess that there are niche marketing firms that must have been feeding their clients the same marketing approach, and for each tree service company, it must have looked good and tasted good.
</p> <p class="text-navy-600/80 leading-relaxed mb-8">
Yet, as Otto von Bismarck also once said, <em>"hounds follow those who feed them."</em> If you're a tree service provider (or landscaper, contractor, or similar service professional), in the hunt for solid direct mail marketing advice, we're not going to feed you the same thing that everyone else got. Please reach us at <a href="mailto:info@crst.net" class="text-crst-primary underline hover:text-crst-gold">info@crst.net</a> or call <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-crst-primary underline hover:text-crst-gold">${BUSINESS.phone}</a> and someone will call you back right away.
</p> <p class="text-navy-600/80 text-sm italic mb-10">
Want to see more examples of what works? Browse our <a href="/case-studies" class="text-crst-primary underline hover:text-crst-gold">case studies</a> for real-world campaigns across different industries. See also: <a href="/resources/direct-mail-vs-email-marketing" class="text-crst-primary underline hover:text-crst-gold">Direct Mail vs. Email Marketing</a> for data on response rates and ROI.
</p> <div class="bg-crst-primary/5 border border-crst-primary/20 rounded-xl p-6 mb-10"> <h3 class="font-heading font-bold text-crst-primary mb-2">Don't Be Another Template Mailer</h3> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
Cornerstone designs custom mail pieces that differentiate your business from the competition. No templates, no cookie-cutter layouts.
</p> <div class="flex flex-wrap gap-3"> <a href="/estimate" class="btn-primary text-sm">Get a Free Estimate</a> <a href="/services/eddm" class="btn-secondary text-sm">EDDM Services →</a> </div> </div> <h2 class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-6 mb-10"> ${faqs.map((faq) => renderTemplate`<div class="bg-white border border-gray-200 rounded-lg p-5"> <h3 class="font-semibold text-gray-800 text-sm mb-3">${faq.q}</h3> <p class="text-sm text-gray-600 leading-relaxed">${faq.a}</p> </div>`)} </div> ${renderComponent($$result2, "AuthorByline", $$AuthorByline, { "compact": true })} </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify(articleSchema)), unescapeHTML(JSON.stringify(faqSchema)), unescapeHTML(JSON.stringify(breadcrumbSchema))) })}` })}`;
}, "/home/runner/workspace/src/pages/resources/lessons-from-marketing-failure.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/resources/lessons-from-marketing-failure.astro";
const $$url = "/resources/lessons-from-marketing-failure";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LessonsFromMarketingFailure,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
