/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BFB5IMP7.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS } from '../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../renderers.mjs';

const $$Memberships = createComponent(($$result, $$props, $$slots) => {
  const bbbUrl = "https://www.bbb.org/us/ny/new-paltz/profile/direct-mail-advertising/cornerstone-services-inc-0121-87170789";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Direct Mail Associations, Memberships & Affiliations",
    url: "https://crst.net/about/memberships",
    description: "Cornerstone Services, Inc. holds memberships in Hudson Valley chambers of commerce, national postal associations, and maintains a BBB A+ rating.",
    publisher: {
      "@type": "Organization",
      name: "Cornerstone Services, Inc.",
      url: "https://crst.net",
      telephone: "+18452555722",
      address: {
        "@type": "PostalAddress",
        streetAddress: "387 Malden Turnpike",
        addressLocality: "Saugerties",
        addressRegion: "NY",
        postalCode: "12477"
      }
    }
  };
  const hvChambers = [
    { name: "Callicoon Business Association", address: "Callicoon, NY 12723", phone: "", logo: "callicoon-business.png" },
    { name: "Central Catskills Chamber of Commerce", address: "37965 State Highway 28, Margaretville, NY 12455", phone: "(845) 586-3300", logo: "central-catskills.png" },
    { name: "Cornwall Chamber of Commerce", address: "Cornwall, NY 12518", phone: "", logo: "cornwall-chamber.jpg" },
    { name: "Delaware County Chamber of Commerce", address: "5 \xBD Main Street, Delhi, NY 13753", phone: "(607) 746-2281", logo: "delaware-county-chamber.png" },
    { name: "Ellenville\u2013Wawarsing Chamber of Commerce", address: "124 Canal Street, Ellenville, NY 12428", phone: "(845) 647-4620", logo: "ellenville-wawarsing.png" },
    { name: "Gardiner Chamber of Commerce", address: "PO Box 452, Gardiner, NY 12525", phone: "", logo: "gardiner-chamber.png" },
    { name: "Goshen Chamber of Commerce", address: "Goshen, NY 10924", phone: "", logo: "goshen-chamber.jpg" },
    { name: "Greater Delhi Area Chamber of Commerce", address: "Delhi, NY 13753", phone: "", logo: "greater-delhi-chamber.png" },
    { name: "Livingston Manor Chamber of Commerce", address: "Livingston Manor, NY 12758", phone: "", logo: "livingston-manor-chamber.jpg" },
    { name: "Millerton Business Association", address: "Millerton, NY 12546", phone: "", logo: "millerton-business.jpg" },
    { name: "Narrowsburgh Chamber of Commerce", address: "Narrowsburgh, NY 12764", phone: "", logo: "narrowsburgh-chamber.png" },
    { name: "Orange County Chamber of Commerce", address: "30 Scott's Corners Drive, Montgomery, NY 12549", phone: "(845) 457-9700", logo: "orange-county-chamber.jpg" },
    { name: "Pawling Chamber of Commerce", address: "PO Box 19, Pawling, NY 12564", phone: "(845) 855-0500", logo: "pawling-chamber.jpg" },
    { name: "Pine Island Chamber of Commerce", address: "Pine Island, NY 10969", phone: "", logo: "pine-island-chamber.jpg" },
    { name: "Red Hook Area Chamber of Commerce", address: "PO Box 254, Red Hook, NY 12571", phone: "(845) 758-0824", logo: "red-hook-chamber.png" },
    { name: "Rhinebeck Area Chamber of Commerce", address: "PO Box 42, Rhinebeck, NY 12572", phone: "(845) 876-5904", logo: "rhinebeck-chamber.png" }
  ];
  const nationalAssociations = [
    { name: "Mail Systems Management Association (MSMA)", url: "https://www.msmanational.org", description: "National association for mail management professionals. MSMA certification validates expertise in mail operations, postal regulations, and mail center management.", logo: "msma.png" },
    { name: "Better Business Bureau (BBB)", url: bbbUrl, description: "Cornerstone holds an A+ rating with the BBB \u2014 the highest rating issued. Accredited since 1998 with no unresolved complaints.", logo: "bbb.png" },
    { name: "Greater Hudson Valley Postal Customer Council (GHV PCC)", url: "https://www.ghvpcc.org", description: "A partnership between the U.S. Postal Service and the mailing industry. The PCC provides education, networking, and direct access to USPS operational updates for commercial mailers.", logo: "ghv-pcc.png" }
  ];
  const extendedMemberships = [
    { name: "American Concrete Pavement Association (ACPA)", address: "", phone: "", logo: "acpa.jpg", description: "National trade association for the concrete pavement industry." },
    { name: "Commerce Chenango", address: "15 South Broad Street, Norwich, NY 13815", phone: "(607) 334-1400", logo: "commerce-chenango.jpg", description: "" },
    { name: "DelCo Business Alliance", address: "Delaware County, NY", phone: "", logo: "", description: "" },
    { name: "Eastern Contractors Association", address: "", phone: "", logo: "eastern-contractors.jpg", description: "Regional association serving contractors across eastern New York." },
    { name: "Empire State Energy Association (ESEA)", address: "", phone: "", logo: "esea.jpg", description: "New York State association advancing energy policy and industry interests." },
    { name: "Greater Afton Area Chamber of Commerce", address: "PO Box 243, Afton, NY 13730", phone: "(607) 639-1944", logo: "greater-afton.jpg", description: "" },
    { name: "Gouverneur Chamber of Commerce", address: "214 East Main Street, Gouverneur, NY 13642", phone: "(315) 287-0331", logo: "gouverneur-chamber.jpg", description: "" },
    { name: "Greenwood Lake Chamber of Commerce", address: "PO Box 36, Greenwood Lake, NY 10925", phone: "(845) 477-0739", logo: "greenwood-lake.jpg", description: "" },
    { name: "New York State Arborists (ISA-NYS)", address: "", phone: "", logo: "ny-arborists.jpg", description: "New York chapter of the International Society of Arboriculture." },
    { name: "New York State Association of Solid Waste Administrators (NYSASWA)", address: "", phone: "", logo: "nysaswa.jpg", description: "Professional association for solid waste management officials in New York State." },
    { name: "NWRA \u2014 National Waste & Recycling Association", address: "", phone: "", logo: "nwra.jpg", description: "National trade association representing the waste and recycling industry." },
    { name: "OESP \u2014 Oil & Energy Service Professionals", address: "", phone: "", logo: "oesp.jpg", description: "National association for heating oil dealers and energy service companies." },
    { name: "PHCC \u2014 Plumbing-Heating-Cooling Contractors Association", address: "", phone: "", logo: "phcc.jpg", description: "National trade association for plumbing, heating, and cooling contractors." },
    { name: "SWANA \u2014 Solid Waste Association of North America", address: "", phone: "", logo: "swana.jpg", description: "International association advancing sustainable solid waste management." },
    { name: "Watkins Glen Area Chamber of Commerce", address: "Watkins Glen, NY 14891", phone: "", logo: "watkins-glen-chamber.png", description: "" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Direct Mail Associations & Memberships", "description": "Cornerstone Services holds memberships in Hudson Valley chambers of commerce, the Greater Hudson Valley PCC, BBB A+ rating, MSMA, and national direct mail associations. Saugerties, NY. Est. 1998.", "canonical": "https://crst.net/about/memberships", "schema": schema }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Direct Mail Associations, Memberships & Affiliations", "subtitle": "Active memberships in Hudson Valley business organizations, national postal associations, and industry groups since 1998.", "breadcrumbs": [
    { label: "About", href: "/about" },
    { label: "Memberships" }
  ] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> <div class="bg-navy-50 border border-navy-100 rounded-lg p-4 mb-10 flex items-start gap-3"> <img src="/images/sean-griffin.png" alt="Sean Griffin" class="w-12 h-12 rounded-full shrink-0" loading="lazy"> <div class="text-sm"> <p class="font-semibold text-crst-primary">Sean Griffin</p> <p class="text-gray-600">President, Cornerstone Services, Inc. · USPS&reg; Mail Design Professional · MSMA&trade; Certified</p> <p class="text-gray-500 text-xs mt-1 italic">Cornerstone has maintained active memberships in Hudson Valley business and postal associations since 1998 as part of its commitment to regional community and industry standards.</p> </div> </div> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">BBB A+ Rating</h2> <div class="flex flex-col sm:flex-row gap-6 items-start mb-6"> <img src="/images/wp/Accredited-BBB-Logo.png" alt="BBB Accredited Business — A+ Rating" width="200" height="76" loading="lazy" class="shrink-0"> <div> <p class="text-navy-600/80 leading-relaxed mb-4">
Cornerstone Services, Inc. holds an A+ rating with the Better Business Bureau — the highest rating the BBB issues. We have maintained continuous BBB accreditation since 1998 with no unresolved complaints. The A+ rating reflects our commitment to transparent pricing, responsive service, and ethical business practices across every <a href="/services/direct-mail" class="text-crst-accent hover:underline">direct mail</a> and printing project we handle.
</p> <p class="text-navy-600/80 leading-relaxed mb-4">
BBB accreditation is not automatic — businesses must meet the BBB's Standards for Trust, which include commitment to making a good faith effort to resolve consumer complaints, honesty in advertising, and transparency in business dealings. Our 27-year track record with the BBB speaks directly to how we operate.
</p> <p class="text-sm"> <a${addAttribute(bbbUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-crst-accent hover:underline font-semibold">View our BBB profile &rarr;</a> </p> </div> </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">Hudson Valley Chamber of Commerce Memberships</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Cornerstone maintains memberships in chambers of commerce throughout the Hudson Valley, Catskill, Sullivan County, and Orange County regions. These memberships connect us with local businesses, municipalities, and <a href="/services/non-profit-mailing" class="text-crst-accent hover:underline">nonprofits</a> that rely on direct mail for community outreach, fundraising, and public communication.
</p> <div class="grid sm:grid-cols-2 gap-3 mb-8"> ${hvChambers.map((chamber) => renderTemplate`<div class="bg-navy-50/40 rounded-lg border border-navy-100 p-4 flex items-center gap-3"> ${chamber.logo ? renderTemplate`<img${addAttribute(`/images/memberships/${chamber.logo}`, "src")}${addAttribute(`${chamber.name} logo`, "alt")} class="w-14 h-10 object-contain shrink-0" loading="lazy">` : renderTemplate`<div class="w-14 h-10 shrink-0 bg-navy-100/40 rounded flex items-center justify-center"> <svg class="w-5 h-5 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"></path></svg> </div>`} <div class="min-w-0"> <h3 class="font-heading font-semibold text-navy-800 text-sm leading-snug">${chamber.name}</h3> <p class="text-xs text-navy-600/60 truncate">${chamber.address}</p> ${chamber.phone && renderTemplate`<p class="text-xs text-navy-600/60">${chamber.phone}</p>`} </div> </div>`)} </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">National and Industry Associations</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Beyond local chamber memberships, Cornerstone holds active memberships in national postal and industry organizations. These affiliations provide access to USPS regulatory updates, professional certification programs, and industry best practices that directly benefit our <a href="/services/eddm" class="text-crst-accent hover:underline">EDDM</a>, direct mail, and data services clients.
</p> <div class="space-y-4 mb-8"> ${nationalAssociations.map((assoc) => renderTemplate`<div class="bg-navy-50/40 rounded-lg border border-navy-100 p-4 flex items-start gap-4"> ${assoc.logo && renderTemplate`<img${addAttribute(`/images/memberships/${assoc.logo}`, "src")}${addAttribute(`${assoc.name} logo`, "alt")} class="w-20 h-14 object-contain shrink-0" loading="lazy">`} <div> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-1">${assoc.name}</h3> <p class="text-sm text-navy-600/70 leading-relaxed mb-2">${assoc.description}</p> ${assoc.url && renderTemplate`<a${addAttribute(assoc.url, "href")} target="_blank" rel="noopener noreferrer" class="text-xs text-crst-accent hover:underline">${assoc.url.replace("https://", "").replace("www.", "")} &rarr;</a>`} </div> </div>`)} </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">Extended Regional &amp; Industry Memberships</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Cornerstone's service area extends beyond the immediate Hudson Valley. We maintain memberships in chambers and professional organizations across upstate New York and national trade associations, reflecting the geographic and industry reach of our direct mail and printing services.
</p> <div class="grid sm:grid-cols-2 gap-3 mb-8"> ${extendedMemberships.map((org) => renderTemplate`<div class="bg-navy-50/40 rounded-lg border border-navy-100 p-4 flex items-center gap-3"> ${org.logo ? renderTemplate`<img${addAttribute(`/images/memberships/${org.logo}`, "src")}${addAttribute(`${org.name} logo`, "alt")} class="w-14 h-10 object-contain shrink-0" loading="lazy">` : renderTemplate`<div class="w-14 h-10 shrink-0 bg-navy-100/40 rounded flex items-center justify-center"> <svg class="w-5 h-5 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"></path></svg> </div>`} <div class="min-w-0"> <h3 class="font-heading font-semibold text-navy-800 text-sm leading-snug">${org.name}</h3> ${org.address && renderTemplate`<p class="text-xs text-navy-600/60 truncate">${org.address}</p>`} ${org.phone && renderTemplate`<p class="text-xs text-navy-600/60">${org.phone}</p>`} ${org.description && renderTemplate`<p class="text-xs text-navy-600/60 leading-relaxed mt-0.5">${org.description}</p>`} </div> </div>`)} </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">SUNY New Paltz and Local College Affiliations</h2> <p class="text-navy-600/80 leading-relaxed mb-6">
Cornerstone Services provides internship opportunities to SUNY New Paltz and other local college students in business, marketing, and computer science. Our facility gives students hands-on experience in direct mail production, data processing, and print operations — skills that complement their academic programs and prepare them for careers in marketing and communications.
</p> <div class="bg-navy-50 border border-navy-100 rounded-lg p-4 mt-10 flex items-start gap-3"> <svg class="w-5 h-5 text-crst-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> <div class="text-sm"> <p class="font-semibold text-crst-primary">Sean Griffin</p> <p class="text-gray-600">Owner, Cornerstone Services · Hudson Valley direct mail since 1998</p> </div> </div> </div> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Questions?</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">
Questions about our memberships or certifications? We're happy to help.
</p> <a href="/contact" class="btn-accent w-full text-center text-sm">
Contact Us
</a> <div class="mt-4 pt-4 border-t border-white/10 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-white/70 text-sm font-heading hover:text-white transition-colors">
Call ${BUSINESS.phone} </a> </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">About</h3> <div class="space-y-2"> ${[
    { label: "About Cornerstone", href: "/about" },
    { label: "Memberships", href: "/about/memberships", current: true },
    { label: "Contact", href: "/contact" }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors font-heading ${link.current ? "text-crst-primary bg-white font-semibold" : "text-navy-700 hover:text-crst-primary hover:bg-white"}`, "class")}> ${link.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Services</h3> <div class="space-y-2"> ${[
    { label: "Direct Mail", href: "/services/direct-mail" },
    { label: "EDDM", href: "/services/eddm" },
    { label: "Non-Profit Mailing", href: "/services/non-profit-mailing" }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${link.label} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> </div> </aside> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, { "headline": "Ready to Work With a Trusted Direct Mail Partner?", "text": "Contact Cornerstone Services for your next direct mail, printing, or EDDM project." })} ` })}`;
}, "/home/runner/workspace/src/pages/about/memberships.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/about/memberships.astro";
const $$url = "/about/memberships";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Memberships,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
