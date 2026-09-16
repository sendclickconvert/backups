/* empty css                                  */
import { g as createComponent, j as renderComponent, r as renderTemplate, i as addAttribute, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../chunks/CTASection_CpJqys7-.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$InformedDeliveryReview = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      q: "What is USPS Informed Delivery?",
      a: "USPS Informed Delivery is a free consumer service that sends daily email and app notifications showing grayscale scans of incoming letter-sized mail pieces. Over 60 million Americans have enrolled. Businesses can pair physical mailings with a full-color digital campaign that appears alongside the grayscale scan."
    },
    {
      q: "Does Informed Delivery cost extra?",
      a: "For consumers, Informed Delivery is completely free. For businesses running an Informed Delivery campaign (adding digital content to a mailing), there is no additional USPS postage fee \u2014 you pay the standard postage for the mail class and set up the digital campaign at no added cost through the USPS Business Customer Gateway."
    },
    {
      q: "What mail classes are eligible for Informed Delivery campaigns?",
      a: "First-Class Mail letters, USPS Marketing Mail letters, and Nonprofit USPS Marketing Mail letters are eligible for Informed Delivery campaigns. The mailpiece must include an Intelligent Mail barcode (IMb) to be associated with the digital campaign."
    },
    {
      q: "What is Ride-Along content?",
      a: "Ride-Along content is the color image and clickable URL that appears in the Informed Delivery email alongside the grayscale scan of your mailpiece. It can be a full-color version of the mailpiece front, a promotional image, or a branded creative \u2014 giving recipients a reason to engage before the physical piece arrives."
    },
    {
      q: "How does Cornerstone help with Informed Delivery?",
      a: "Cornerstone handles the full mailing \u2014 design, printing, addressing with Intelligent Mail barcodes, presort, and postage. For Informed Delivery campaigns, we can coordinate Ride-Along creative specs, ensure your mailpiece qualifies (correct dimensions, IMb placement), and guide you through campaign setup in the USPS Business Customer Gateway."
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "USPS Informed Delivery for Businesses: Campaigns, Ride-Along & Setup Guide", "description": "USPS Informed Delivery lets businesses add a color digital image and clickable URL to their physical mail. Learn how Informed Delivery campaigns work, eligibility, and how to set one up." }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(['  <script type="application/ld+json">', "<\/script> ", " ", `<section class="py-14 lg:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="max-w-3xl mx-auto"> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">
What Is USPS Informed Delivery?
</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
USPS Informed Delivery is a free service that sends enrolled consumers a daily email \u2014 and mobile app notification \u2014 showing grayscale scans of letter-sized mail pieces scheduled for delivery that day. Over 60 million Americans have enrolled. For a direct mailer, that means your mail piece gets a digital preview before it even arrives in the mailbox.
</p> <p class="text-navy-600/80 leading-relaxed mb-8">
Beyond the consumer preview, USPS offers businesses a free <strong>Informed Delivery campaign</strong> feature: you can pair your physical mailing with a full-color image and clickable URL that appears alongside the grayscale scan in every enrolled recipient's inbox. It's essentially a free digital ad that rides alongside your <a href="/services/direct-mail" class="text-crst-primary underline hover:text-crst-gold">direct mail campaign</a> \u2014 delivered to people already expecting your piece.
</p> <div class="grid sm:grid-cols-2 gap-5 mb-10"> <div class="bg-navy-50 rounded-xl p-5"> <h3 class="font-heading font-bold text-navy-800 mb-2">The Consumer Side</h3> <p class="text-sm text-navy-600/80 leading-relaxed">Enrolled USPS customers receive a morning email showing grayscale scans of that day's incoming mail. They can see what's arriving before leaving for work \u2014 and interact with digital campaigns embedded in the email.</p> </div> <div class="bg-navy-50 rounded-xl p-5"> <h3 class="font-heading font-bold text-navy-800 mb-2">The Business Side</h3> <p class="text-sm text-navy-600/80 leading-relaxed">Mailers who run an Informed Delivery campaign add a color Ride-Along image and clickable URL to their mailing. Enrolled recipients see it in the daily email before the physical piece arrives \u2014 extending your reach to the digital channel at no added postage cost.</p> </div> </div> <h3 class="text-xl font-display text-crst-primary mb-4">How Informed Delivery Campaigns Work</h3> <p class="text-navy-600/80 leading-relaxed mb-5">
Setting up an Informed Delivery campaign requires coordinating the physical mailing with the USPS digital system. Here's how the process works:
</p> <div class="space-y-3 mb-10"> `, ` </div> <h3 class="text-xl font-display text-crst-primary mb-4">Eligibility Requirements</h3> <div class="space-y-4 mb-10"> <div class="bg-white border border-gray-200 rounded-xl p-5"> <h4 class="font-heading font-bold text-navy-800 mb-2">Eligible Mail Classes</h4> <ul class="text-sm text-navy-600/80 space-y-1.5"> <li class="flex items-start gap-2"><span class="text-crst-gold">\u2022</span> <strong>First-Class Mail</strong> letters and flats with IMb</li> <li class="flex items-start gap-2"><span class="text-crst-gold">\u2022</span> <strong>USPS Marketing Mail</strong> letters with IMb</li> <li class="flex items-start gap-2"><span class="text-crst-gold">\u2022</span> <strong>Nonprofit USPS Marketing Mail</strong> letters with IMb</li> </ul> <p class="text-xs text-gray-400 mt-3">Packages, flats without IMb, and EDDM Retail are not eligible for Informed Delivery campaigns.</p> </div> <div class="bg-white border border-gray-200 rounded-xl p-5"> <h4 class="font-heading font-bold text-navy-800 mb-2">Intelligent Mail Barcode (IMb)</h4> <p class="text-sm text-navy-600/80 leading-relaxed">
The IMb is a 65-bar barcode that encodes the mail class, mailing ID, serial number, and delivery point. It's required for automation pricing on Marketing Mail \u2014 and it's also what links your physical piece to the Informed Delivery campaign in the USPS system. Cornerstone applies IMb to all presorted mailings as standard. If you're printing in-house, verify your addressing software produces a valid, unique IMb sequence before submitting a campaign.
</p> </div> <div class="bg-white border border-gray-200 rounded-xl p-5"> <h4 class="font-heading font-bold text-navy-800 mb-2">Mailpiece Dimensions</h4> <p class="text-sm text-navy-600/80 leading-relaxed">
Informed Delivery scans letter-sized mail pieces. Your piece must fall within letter dimensions (min 3.5" x 5", max 6.125" x 11.5") to generate a grayscale scan. Oversized flats and self-mailers outside these dimensions may not generate a scan, reducing the visibility of your campaign. See our <a href="/guides/envelope-sizes" class="text-crst-primary underline hover:text-crst-gold">envelope and mailpiece size guide</a> for dimension reference.
</p> </div> </div> <h3 class="text-xl font-display text-crst-primary mb-4">Why Add Informed Delivery to Your Mailing?</h3> <div class="space-y-3 mb-10"> `, ' </div> <div class="bg-crst-gold/10 border border-crst-gold/30 rounded-xl p-6 mb-10"> <h4 class="font-heading font-bold text-crst-primary mb-2">Hudson Valley Use Case</h4> <p class="text-navy-600/80 text-sm leading-relaxed">\nA Kingston-area nonprofit running a fundraising appeal in Ulster County can pair their Marketing Mail mailing with an Informed Delivery campaign. Enrolled subscribers see a full-color version of the appeal and a donation link in their morning email \u2014 before the physical letter arrives. Cornerstone sets up IMb addressing, presorts the mailing, and coordinates timing so the digital campaign is live before the BMEU drop.\n</p> </div> <h3 class="text-xl font-display text-crst-primary mb-6">Frequently Asked Questions</h3> <div class="space-y-4 mb-10"> ', ` </div> <div class="flex items-center gap-3 bg-navy-50 rounded-xl p-4 mb-8"> <div class="w-10 h-10 rounded-full bg-crst-primary flex items-center justify-center shrink-0"> <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> </div> <div> <div class="font-heading font-bold text-navy-800 text-sm">Sean Griffin</div> <div class="text-xs text-navy-600/70">Owner, Cornerstone Services \xB7 Hudson Valley direct mail since 1998 \xB7 Reviewed February 2026</div> </div> </div> <p class="text-xs text-gray-400 leading-relaxed mb-8">
Informed Delivery campaign specifications and eligibility sourced from <a href="https://www.usps.com/business/informed-delivery.htm" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600">USPS Informed Delivery for Businesses</a> and the USPS Business Customer Gateway. Features subject to change.
</p> <div class="bg-crst-primary/5 border border-crst-primary/20 rounded-xl p-6"> <h4 class="font-heading font-bold text-crst-primary mb-2">Ready to Add Informed Delivery to Your Next Mailing?</h4> <p class="text-navy-600/80 text-sm leading-relaxed mb-4">
Cornerstone handles the full mailing \u2014 including IMb addressing, presort, and BMEU entry. We'll make sure your piece qualifies and coordinate timing so your Informed Delivery campaign is live before the mail drops.
</p> <div class="flex flex-wrap gap-3"> <a href="/estimate" class="btn-primary text-sm">Get a Free Estimate</a> <a href="/services/direct-mail" class="btn-secondary text-sm">Direct Mail Services \u2192</a> </div> </div> </div> </div> </section> `, " "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  })), renderComponent($$result2, "PageHero", $$PageHero, { "title": "USPS Informed Delivery for Businesses", "subtitle": "How direct mailers can pair physical mail with a free digital campaign \u2014 and why it works for Hudson Valley businesses.", "breadcrumbs": [
    { label: "Resources", href: "/resources" },
    { label: "Informed Delivery Guide" }
  ] }), maybeRenderHead(), [
    { step: "1", title: "Intelligent Mail Barcode (IMb)", desc: "Your mailpiece must include an Intelligent Mail barcode. The IMb links each physical mail piece to the digital campaign in the USPS system. Cornerstone includes IMb on all presorted mailings as standard practice." },
    { step: "2", title: "Create Your Campaign in USPS Business Customer Gateway", desc: "Log in to the USPS Business Customer Gateway and navigate to Informed Delivery. Create a new campaign, set the mailing date window, and upload your Ride-Along content \u2014 a color image (up to 200x200px for Representative Image, or a larger Supplemental Content image) and destination URL." },
    { step: "3", title: "Upload Ride-Along Creative", desc: "The Ride-Along image is the full-color version of your mailpiece front or a branded promotional image. USPS displays it directly below the grayscale scan in the daily digest email. A clickable URL drives recipients to your landing page, offer, or RSVP form." },
    { step: "4", title: "Submit Before Your Mail Drop Date", desc: "The campaign must be submitted and approved in the USPS system before your mailing is entered at the Business Mail Entry Unit (BMEU). Cornerstone coordinates timing so your campaign is live before the mail drops." },
    { step: "5", title: "Track Results", desc: "USPS provides campaign analytics: email delivery counts, click-through rates, and engagement data by day. This gives physical mail the kind of digital measurement marketers are accustomed to \u2014 something standard postage alone cannot offer." }
  ].map((item) => renderTemplate`<div class="flex gap-4 p-4 border border-gray-200 rounded-lg"> <div class="w-8 h-8 rounded-full bg-crst-primary text-white flex items-center justify-center text-sm font-bold shrink-0">${item.step}</div> <div> <div class="font-heading font-bold text-gray-800 text-sm">${item.title}</div> <div class="text-sm text-gray-600 mt-1">${item.desc}</div> </div> </div>`), [
    { icon: "\u{1F4EC}", title: "Pre-arrival touchpoint", desc: "Recipients see your mail in their email inbox before it arrives in their physical mailbox \u2014 a second brand impression at no additional postage cost." },
    { icon: "\u{1F5B1}\uFE0F", title: "Digital click tracking", desc: "The Ride-Along URL is tracked by USPS. You can measure click-through rates on your physical mailing, giving direct mail the analytics layer that email marketers expect." },
    { icon: "\u{1F3AF}", title: "Drives faster action", desc: "Recipients who see the digital preview and the physical piece convert at higher rates than physical mail alone. The dual-channel exposure \u2014 email then mailbox \u2014 reinforces your call to action." },
    { icon: "\u{1F4B0}", title: "Free with your existing mailing", desc: "Informed Delivery campaigns are offered by USPS at no additional postage. The only investment is the creative asset and 30 minutes to set up the campaign in the USPS portal." }
  ].map((item) => renderTemplate`<div class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"> <div class="text-2xl shrink-0">${item.icon}</div> <div> <div class="font-heading font-bold text-navy-800 text-sm">${item.title}</div> <div class="text-sm text-gray-600 mt-1">${item.desc}</div> </div> </div>`), faqs.map((faq, i) => renderTemplate`<details class="group bg-white border border-gray-200 rounded-lg"${addAttribute(i === 0, "open")}> <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"> <h4 class="font-semibold text-gray-800 text-sm pr-4">${faq.q}</h4> <svg class="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"> ${faq.a} </div> </details>`), renderComponent($$result2, "CTASection", $$CTASection, {})) })}`;
}, "/home/runner/workspace/src/pages/informed-delivery-review.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/informed-delivery-review.astro";
const $$url = "/informed-delivery-review";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$InformedDeliveryReview,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
