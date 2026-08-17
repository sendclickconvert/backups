/* empty css                                        */
import { f as createAstro, g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS, C as COUNTIES } from '../../../chunks/site_BORfRXu4.mjs';
import { C as COUNTIES_DATA } from '../../../chunks/locations_D7Dz0HLI.mjs';
import { $ as $$NearbyTowns } from '../../../chunks/NearbyTowns_C9NWqjRh.mjs';
export { renderers } from '../../../renderers.mjs';

const NP_LAT = 41.7465;
const NP_LNG = -74.0913;
function haversineMiles(lat1, lng1, lat2, lng2) {
  const R = 3959;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function distFromNP(lat, lng) {
  return Math.round(haversineMiles(NP_LAT, NP_LNG, lat, lng));
}
function getTownStats(loc) {
  const pop = parseInt(loc.population.replace(/,/g, ""), 10) || 2e3;
  const households = Math.round(pop / 2.5);
  const carrierRoutes = Math.max(2, Math.round(households / 400));
  const distMiles = distFromNP(loc.lat, loc.lng);
  const driveMin = Math.max(10, Math.round(distMiles * 1.8));
  const eddmCostLow = Math.round(households * 0.34);
  const eddmCostHigh = Math.round(households * 0.42);
  const dmListCostLow = Math.round(households * 0.08);
  const dmListCostHigh = Math.round(households * 0.12);
  const bmeu = loc.county === "orange" ? "Newburgh" : "Saugerties";
  const sizeLabel = pop >= 2e4 ? "large" : pop >= 8e3 ? "mid-size" : pop >= 3e3 ? "small" : "rural";
  return { pop, households, carrierRoutes, distMiles, driveMin, eddmCostLow, eddmCostHigh, dmListCostLow, dmListCostHigh, bmeu, sizeLabel };
}
function formatNum(n) {
  return n.toLocaleString("en-US");
}
function pickOrgs(orgs, max) {
  const picked = orgs.slice(0, max);
  if (picked.length === 0) return "";
  if (picked.length === 1) return picked[0];
  if (picked.length === 2) return `${picked[0]} and ${picked[1]}`;
  return picked.slice(0, -1).join(", ") + ", and " + picked[picked.length - 1];
}
function pickClients(clients, max) {
  return pickOrgs(clients, max);
}
const SERVICE_CONFIGS = [
  {
    slug: "eddm",
    name: "EDDM",
    nameInline: "EDDM",
    pillarHref: "/services/eddm",
    h1Template: (town) => `EDDM in ${town}, NY`,
    metaTitleTemplate: (town) => `EDDM in ${town}, NY`,
    metaDescTemplate: (town, county) => `Every Door Direct Mail (EDDM) in ${town}, ${county}, NY. ${town} carrier route saturation — design, print, and deliver without a mailing list. Cornerstone Services.`,
    introTemplate: (loc, county) => {
      const s = getTownStats(loc);
      const zipList = loc.zip.join(", ");
      return `Every Door Direct Mail (EDDM) lets you reach every address on a postal carrier route in ${loc.name} without purchasing a mailing list. With a population of ${loc.population} and approximately ${formatNum(s.households)} households across ZIP ${zipList.includes(",") ? "codes" : "code"} ${zipList}, ${loc.name} offers ${s.sizeLabel === "large" ? "a substantial" : s.sizeLabel === "mid-size" ? "a well-sized" : s.sizeLabel === "small" ? "a focused" : "a tight-knit"} market for EDDM saturation campaigns. Cornerstone Services handles route selection, mail piece design, commercial printing, and all USPS paperwork from our facility in Saugerties — approximately ${s.driveMin} minutes from ${loc.name}. ${loc.intro.split(". ").slice(0, 2).join(". ")}.`;
    },
    features: [
      { title: "Route Selection via EDDM Online Tool", desc: "We use the USPS EDDM Online Tool to select carrier routes in and around your target area. The tool pulls U.S. Census demographics — household income, age, size — so we can target the routes most likely to respond. Cornerstone manages the entire route selection process through our Business Customer Gateway account." },
      { title: "Mail Piece Design & EDDM Retail Indicia", desc: 'USPS-compliant oversized postcards and flat-size mailers designed for maximum impact. Every piece includes the required EDDM Retail Indicia — the postal marking that replaces a standard stamp or meter mark on EDDM mail. Standard sizes: 6.5"×9", 8.5"×11", 6"×11".' },
      { title: "Commercial Printing", desc: "High-quality offset and digital printing on heavy card stock. Full color, both sides. Cornerstone is listed in the USPS Printer Directory as a qualified mail piece printer meeting USPS automation and design standards." },
      { title: "PS Form 3587 & Postal Delivery", desc: "We complete PS Form 3587 (the EDDM postage statement) for each mailing, prepare facing slips, bundle by route, and deliver to the destination post office or Business Mail Entry Unit (BMEU). Postage: $0.260/piece (Retail) or $0.259/piece (BMEU DDU entry)." }
    ],
    processContent: (loc, county) => {
      const s = getTownStats(loc);
      const zipList = loc.zip.join(", ");
      return [
        `The EDDM process for ${loc.name} starts with route selection using the USPS EDDM Online Tool, accessed through the USPS Business Customer Gateway. For ${loc.name}'s ${formatNum(s.households)} households spread across an estimated ${s.carrierRoutes} carrier routes in ZIP ${zipList.includes(",") ? "codes" : "code"} ${zipList}, the tool lets us filter by U.S. Census demographics — household income, age distribution, and household size — so your mail reaches the ${loc.name} neighborhoods most relevant to your business.`,
        `For a full-saturation campaign covering all ${loc.name} carrier routes, you're looking at approximately ${formatNum(s.households)} pieces at $0.260/piece (Retail) or $0.259/piece (BMEU DDU entry through the ${s.bmeu} facility). That puts the total postage cost between $${formatNum(Math.round(s.households * 0.259))} and $${formatNum(Math.round(s.households * 0.26))} — before printing and design. A complete all-in EDDM campaign for ${loc.name} typically runs $${formatNum(s.eddmCostLow)}–$${formatNum(s.eddmCostHigh)} including design, printing on heavy card stock, and postage. Most ${loc.name} businesses start with a partial-saturation campaign targeting ${Math.max(2, Math.round(s.carrierRoutes / 2))}–${s.carrierRoutes} routes closest to their location.`,
        `Once routes are selected, we design your mail piece to meet USPS Marketing Mail standards. Every EDDM piece must include the EDDM Retail Indicia — a printed marking in the upper-right corner that replaces traditional postage. For ${loc.name} businesses, we typically recommend the 6.5"×9" oversized postcard — it's large enough to stand out in the mailbox but keeps per-piece printing costs manageable for ${s.sizeLabel} market campaigns.`,
        `Before delivery, we complete PS Form 3587 — the official USPS postage statement for EDDM mailings. This form documents the number of pieces, carrier routes, and postage due. For ${loc.name} campaigns, we deliver to the ${s.bmeu} Business Mail Entry Unit (BMEU) for streamlined single-facility induction — BMEU DDU rate is $0.259/piece vs. Retail's $0.260/piece as of July 12, 2026. The primary BMEU advantage at scale is operational: one induction point, no per-ZIP daily cap, no counter drops at multiple post offices.`
      ];
    },
    localMarketContent: (loc, county) => {
      const s = getTownStats(loc);
      const orgs = pickOrgs(loc.notableOrgs, 4);
      const clients = pickClients(loc.clientTypes, 5);
      const paras = [];
      if (s.sizeLabel === "large") {
        paras.push(`${loc.name} is one of ${county}'s larger communities with ${loc.population} residents, making it a prime market for EDDM saturation campaigns. The ${formatNum(s.households)} households across ${loc.name}'s carrier routes represent a significant consumer base — large enough to support ongoing monthly or quarterly EDDM programs with different messaging each round.`);
      } else if (s.sizeLabel === "mid-size") {
        paras.push(`With ${loc.population} residents and approximately ${formatNum(s.households)} households, ${loc.name} sits in the EDDM sweet spot — large enough to generate meaningful business volume but small enough to saturate affordably. A full-town EDDM campaign reaches every household for roughly $${formatNum(s.eddmCostLow)}–$${formatNum(s.eddmCostHigh)} all-in, making monthly or quarterly mailings a realistic marketing budget line item.`);
      } else if (s.sizeLabel === "small") {
        paras.push(`${loc.name}'s ${loc.population} residents and approximately ${formatNum(s.households)} households make it one of the most cost-effective EDDM markets in ${county}. A full-town saturation mailing runs approximately $${formatNum(s.eddmCostLow)}–$${formatNum(s.eddmCostHigh)} all-in — affordable enough that many ${loc.name} businesses mail every month, building sustained visibility that larger-town businesses can't match at the same frequency.`);
      } else {
        paras.push(`${loc.name}'s compact community of ${loc.population} residents and approximately ${formatNum(s.households)} households is ideally suited for EDDM. The low piece count keeps costs minimal — a full-saturation mailing runs roughly $${formatNum(s.eddmCostLow)}–$${formatNum(s.eddmCostHigh)} all-in — allowing frequent mailings that build strong name recognition across the entire community.`);
      }
      if (orgs) {
        paras.push(`${loc.name} is home to ${orgs} — anchor institutions that shape the local economy and define the types of businesses that thrive here. EDDM campaigns targeting carrier routes near these organizations reach the households most likely to need related services, from restaurants and retail shops serving their visitors to contractors and service providers supporting their operations.`);
      }
      if (clients) {
        paras.push(`The most active EDDM users in ${loc.name} include ${clients}. These businesses benefit from EDDM's ability to reach every household on a carrier route without the cost of purchasing a targeted mailing list — particularly valuable in a ${s.sizeLabel} market where broad local awareness drives walk-in traffic and phone calls.`);
      }
      return paras;
    },
    industryContent: (loc, county) => {
      const s = getTownStats(loc);
      const paras = [];
      const ct = loc.clientTypes.map((c) => c.toLowerCase());
      const hasRestaurant = ct.some((c) => c.includes("restaurant") || c.includes("cafe") || c.includes("food") || c.includes("dining"));
      const hasRealEstate = ct.some((c) => c.includes("real estate"));
      const hasContractor = ct.some((c) => c.includes("contractor") || c.includes("home") || c.includes("construction") || c.includes("builder"));
      const hasRetail = ct.some((c) => c.includes("retail") || c.includes("shop") || c.includes("boutique") || c.includes("store"));
      const hasHealth = ct.some((c) => c.includes("health") || c.includes("medical") || c.includes("dental") || c.includes("wellness"));
      const hasFarm = ct.some((c) => c.includes("farm") || c.includes("agricultural") || c.includes("winery") || c.includes("orchard"));
      const hasNonprofit = ct.some((c) => c.includes("non-profit") || c.includes("nonprofit") || c.includes("community") || c.includes("church") || c.includes("organization"));
      const hasTourism = ct.some((c) => c.includes("tourism") || c.includes("hotel") || c.includes("vacation") || c.includes("b&b") || c.includes("lodging"));
      const hasAuto = ct.some((c) => c.includes("auto") || c.includes("car") || c.includes("dealer"));
      ct.some((c) => c.includes("legal") || c.includes("law") || c.includes("attorney"));
      const hasEducation = ct.some((c) => c.includes("school") || c.includes("education") || c.includes("college") || c.includes("university"));
      if (hasRestaurant) {
        paras.push(`Restaurants and food service businesses in ${loc.name} use EDDM to promote grand openings, seasonal menus, catering services, and weekly specials. An oversized postcard with appetizing food photography mailed to every household within a 2–3 mile radius of the restaurant generates immediate traffic. For ${loc.name} restaurants, we recommend starting with the ${Math.max(2, Math.round(s.carrierRoutes / 3))} carrier routes closest to the business location, then expanding to the full ${s.carrierRoutes} routes once response rates confirm the campaign is working.`);
      }
      if (hasRealEstate) {
        paras.push(`Real estate professionals farming the ${loc.name} market rely on EDDM to maintain consistent visibility with homeowners. A quarterly "just listed" or "just sold" postcard mailed to every household in target neighborhoods positions the agent as the local market expert. With ${formatNum(s.households)} households and a median home in the ${county} market, even a single listing generated from an EDDM campaign more than covers a full year of quarterly mailings.`);
      }
      if (hasContractor) {
        paras.push(`Home service contractors — HVAC, plumbing, electrical, roofing, landscaping, painting — are among the strongest EDDM performers in ${loc.name}. Homeowners in ${loc.name}'s approximately ${formatNum(s.households)} households need these services regularly, and a well-timed EDDM campaign (spring for landscaping, fall for heating, summer for AC) reaches every potential customer on the carrier route regardless of whether they're actively searching online.`);
      }
      if (hasRetail) {
        paras.push(`Retail shops and boutiques in ${loc.name} use EDDM to drive foot traffic for sales events, new product arrivals, and holiday promotions. The key advantage of EDDM for retail is saturation — every household on the route receives your postcard, including residents who might not follow your social media or visit your website. For ${loc.name} retailers, a pre-holiday mailing 2–3 weeks before major shopping periods consistently generates strong ROI.`);
      }
      if (hasHealth) {
        paras.push(`Healthcare and wellness providers in ${loc.name} — dentists, chiropractors, physical therapists, optometrists, veterinarians — use EDDM to announce new patient specials, expanded hours, and new services. Medical professionals benefit from EDDM's saturation approach because healthcare decisions are household-level decisions, and reaching every home on the route ensures you're visible to families actively looking for a new provider.`);
      }
      if (hasFarm) {
        paras.push(`Farms, orchards, wineries, and agricultural businesses in ${loc.name} use EDDM to promote seasonal openings, CSA memberships, harvest festivals, and farm-to-table events. For agricultural tourism businesses, the most effective approach combines local EDDM saturation (building a loyal customer base from surrounding households) with targeted list mailings to visitor-source markets in the NYC metro area. EDDM handles the local component affordably — a full ${loc.name} saturation mailing for a farm business runs under $${formatNum(s.eddmCostHigh)}.`);
      }
      if (hasNonprofit) {
        paras.push(`Non-profit organizations, churches, and community groups in ${loc.name} use EDDM for fundraising appeals, event announcements, membership drives, and community awareness campaigns. EDDM's flat per-piece postage rate makes it the most cost-effective way for ${loc.name} non-profits to reach every household in the community — far more affordable than purchasing a targeted mailing list for the same geographic area.`);
      }
      if (hasTourism) {
        paras.push(`Tourism businesses, hotels, B&Bs, and vacation rentals in ${loc.name} use EDDM in two ways: local mailings to build community relationships and awareness (important for word-of-mouth referrals), and targeted mailings to visitor-source markets promoting seasonal packages. For the local component, EDDM lets ${loc.name} hospitality businesses reach every household affordably — building the kind of local goodwill that generates referral traffic.`);
      }
      if (hasAuto) {
        paras.push(`Auto dealers and automotive service businesses in ${loc.name} use EDDM to promote inventory events, seasonal service specials, and tire/brake campaigns. Automotive businesses benefit from EDDM's broad reach — vehicle ownership is nearly universal in ${county} communities, making every household on the carrier route a potential customer.`);
      }
      if (hasEducation) {
        paras.push(`Educational institutions and tutoring services in ${loc.name} use EDDM to reach families with school-age children. Carrier route selection using the EDDM Online Tool's demographic filters lets us target routes with higher concentrations of family households — ensuring your education-related mailing reaches the most relevant audience.`);
      }
      if (paras.length === 0) {
        paras.push(`Businesses across ${loc.name} use EDDM to reach local households without the cost of purchasing a mailing list. Whether you're promoting a grand opening, seasonal sale, or ongoing services, EDDM puts your message in every mailbox on the carrier route — guaranteed delivery that digital advertising cannot match.`);
      }
      return paras;
    },
    faqsForTown: (loc, county) => {
      const s = getTownStats(loc);
      const zipList = loc.zip.join(", ");
      return [
        { q: `How many households can EDDM reach in ${loc.name}?`, a: `${loc.name} (ZIP ${zipList}) has approximately ${formatNum(s.households)} households spread across an estimated ${s.carrierRoutes} carrier routes. A full-saturation EDDM campaign reaching every household costs approximately $${formatNum(s.eddmCostLow)}–$${formatNum(s.eddmCostHigh)} all-in, including design, printing, and postage. You can also select individual routes to target specific ${loc.name} neighborhoods at a lower cost.` },
        { q: `What does an EDDM campaign cost in ${loc.name}?`, a: `For ${loc.name}'s approximately ${formatNum(s.households)} households, a full-saturation campaign runs $${formatNum(s.eddmCostLow)}–$${formatNum(s.eddmCostHigh)} including design, printing on heavy card stock, and USPS postage at $0.259–$0.260 per piece. Postage alone runs approximately $${formatNum(Math.round(s.households * 0.26))}. Partial-route campaigns targeting specific ${loc.name} neighborhoods cost proportionally less.` },
        { q: `How far is Cornerstone from ${loc.name}?`, a: `Our Saugerties facility is approximately ${s.distMiles} miles (about ${s.driveMin} minutes) from ${loc.name}. We handle all EDDM design, printing, and postal delivery from our facility and deliver finished mail to the ${s.bmeu} BMEU for entry into the USPS system. Most ${loc.name} clients work with us by phone and email — no in-person visits required.` },
        { q: "What is the EDDM Online Tool and do I need to use it myself?", a: `The EDDM Online Tool is a USPS web application accessed through the Business Customer Gateway that lets mailers select carrier routes by ZIP code and demographic filters. For ${loc.name} campaigns, Cornerstone handles the entire route selection process — you do not need a Business Customer Gateway account or access to the EDDM Online Tool. We select the routes, prepare PS Form 3587, and deliver to the ${s.bmeu} BMEU.` },
        { q: "What is PS Form 3587?", a: `PS Form 3587 is the USPS postage statement required for every EDDM mailing. It documents the number of mail pieces, selected carrier routes, and total postage due. For ${loc.name} mailings, Cornerstone completes and submits PS Form 3587 as part of our service — you do not need to fill it out yourself.` },
        { q: "What is the difference between EDDM Retail and BMEU entry?", a: `EDDM Retail ($0.260/piece as of July 12, 2026) allows drop-off at any post office with no permit required. BMEU DDU entry ($0.259/piece) requires delivery to the ${s.bmeu} Business Mail Entry Unit and a postal permit, but removes the 5,000-piece-per-ZIP daily cap. At $0.001/piece difference, the BMEU advantage is now primarily operational — single induction point for large or multi-ZIP campaigns. Cornerstone handles BMEU logistics using our existing permit.` },
        { q: `What EDDM mail piece sizes work best for ${loc.name} businesses?`, a: `The most popular EDDM formats for ${loc.name} businesses are the 6.5"×9" oversized postcard (cost-effective for ${s.sizeLabel} market saturation), the 8.5"×11" flat (maximum visual impact for menus, event promotions, and real estate), and the 6"×11" postcard (a balance of size and cost). All formats include the required EDDM Retail Indicia and are printed full-color on both sides on heavy card stock.` }
      ];
    },
    schemaServiceName: "Every Door Direct Mail (EDDM)",
    schemaDescription: "Every Door Direct Mail (EDDM) campaign services including route selection via EDDM Online Tool, PS Form 3587 preparation, EDDM Retail Indicia, commercial printing, and USPS delivery through BMEU."
  },
  {
    slug: "direct-mail",
    name: "Direct Mail",
    nameInline: "direct mail",
    pillarHref: "/services/direct-mail",
    h1Template: (town) => `Direct Mail in ${town}, NY`,
    metaTitleTemplate: (town) => `Direct Mail in ${town}, NY | Cornerstone Services`,
    metaDescTemplate: (town, county) => `Full-service direct mail in ${town}, ${county}, NY. Mailing lists, design, printing, and USPS delivery — all in-house since 1998. Cornerstone Services.`,
    introTemplate: (loc, county) => {
      const s = getTownStats(loc);
      const zipList = loc.zip.join(", ");
      return `Cornerstone Services provides full-service direct mail campaigns for businesses and organizations in ${loc.name}, NY. With ${loc.population} residents and approximately ${formatNum(s.households)} households in ZIP ${zipList.includes(",") ? "codes" : "code"} ${zipList}, ${loc.name} represents a ${s.sizeLabel === "large" ? "major" : s.sizeLabel === "mid-size" ? "solid" : s.sizeLabel === "small" ? "focused" : "targeted"} direct mail market within ${county}. From mailing list acquisition and NCOA data processing to graphic design, commercial printing, and USPS-compliant postal prep — everything is handled in-house at our facility in Saugerties, approximately ${s.driveMin} minutes from ${loc.name}. ${loc.intro.split(". ").slice(0, 2).join(". ")}.`;
    },
    features: [
      { title: "Targeted Mailing Lists", desc: "Consumer and business data targeting by geography, demographics, income, home value, and more. All lists are NCOA-processed for accurate delivery." },
      { title: "Mail Piece Design", desc: "USPS-compliant postcards, self-mailers, letters, and brochures designed for both visual impact and postal automation standards." },
      { title: "Commercial Printing", desc: "Offset and digital printing on premium stock. Variable data printing available for personalized campaigns." },
      { title: "Presort & Postal Delivery", desc: "CASS/DPV address verification, automation presort for maximum postage discounts, and USPS drop with delivery confirmation." }
    ],
    processContent: (loc, county) => {
      const s = getTownStats(loc);
      const zipList = loc.zip.join(", ");
      return [
        `Direct mail for ${loc.name} businesses starts with the right mailing list. Cornerstone pulls consumer or business records targeted by ZIP ${zipList.includes(",") ? "codes" : "code"} ${zipList}, carrier route, income, home value, or business type — whatever profile matches your best customer. For ${loc.name}'s approximately ${formatNum(s.households)} households, a full-market consumer list costs approximately $${formatNum(s.dmListCostLow)}–$${formatNum(s.dmListCostHigh)}. Every list is NCOA-processed through the National Change of Address database before your job goes to press, so you're not paying postage on addresses that have moved.`,
        `Once your list is confirmed, we design a mail piece that meets USPS Marketing Mail automation standards. Automation-compatible design is required to qualify for discounted postage rates — the layout, barcode placement, and address block all have to conform to USPS specifications. For ${loc.name} campaigns targeting ${s.sizeLabel} market audiences, we typically recommend starting with an oversized postcard for maximum impact per dollar, though letter packages and self-mailers are available for campaigns requiring more detailed messaging.`,
        `Printing is done in-house on offset and digital presses at our Saugerties facility, ${s.distMiles} miles from ${loc.name}. Variable data printing is available for campaigns where each piece is personalized — different names, offers, or property addresses printed inline without slowing the press run. For ${loc.name} campaigns, variable data printing is particularly effective for real estate prospecting (showing specific property values), insurance renewals (referencing policy details), and financial services outreach.`,
        `The final step is postal prep and delivery. We run your file through CASS (Coding Accuracy Support System) address verification, apply the automation presort barcodes, prepare the postage statement, and deliver to the ${s.bmeu} Business Mail Entry Unit. Automation-rate Marketing Mail postage runs $0.209–$0.236 per piece depending on sort level — for a ${formatNum(Math.min(s.households, 5e3))}-piece ${loc.name} campaign, that's approximately $${formatNum(Math.round(Math.min(s.households, 5e3) * 0.22))} in postage, saving $${formatNum(Math.round(Math.min(s.households, 5e3) * 0.14))} compared to First-Class rates.`
      ];
    },
    localMarketContent: (loc, county) => {
      const s = getTownStats(loc);
      const orgs = pickOrgs(loc.notableOrgs, 4);
      const clients = pickClients(loc.clientTypes, 5);
      const paras = [];
      if (s.sizeLabel === "large") {
        paras.push(`${loc.name}'s population of ${loc.population} makes it one of ${county}'s largest direct mail markets. With approximately ${formatNum(s.households)} households, ${loc.name} campaigns can range from highly targeted niche mailings (1,000–2,000 records filtered by income, age, or home value) to broad market saturation covering the full community. The diversity of ${loc.name}'s population supports multiple direct mail strategies running simultaneously — a dental practice targeting families, a roofer targeting homeowners, and a restaurant promoting to everyone can all mail the same week without overlap.`);
      } else if (s.sizeLabel === "mid-size") {
        paras.push(`With ${loc.population} residents and approximately ${formatNum(s.households)} households, ${loc.name} is well-suited for targeted direct mail campaigns. The market is large enough to support meaningful segmentation — filtering by income, home value, age, or household composition to reach your ideal customer — while keeping campaign costs manageable. A typical targeted campaign reaching 40–60% of ${loc.name} households runs $${formatNum(Math.round(s.households * 0.4 * 0.4))}–$${formatNum(Math.round(s.households * 0.6 * 0.5))} all-in.`);
      } else if (s.sizeLabel === "small") {
        paras.push(`${loc.name}'s ${loc.population} residents and approximately ${formatNum(s.households)} households represent a focused direct mail market where campaigns are affordable enough to run frequently. A targeted campaign reaching ${loc.name} homeowners costs approximately $${formatNum(Math.round(s.households * 0.7 * 0.4))}–$${formatNum(Math.round(s.households * 0.7 * 0.5))} all-in, making monthly or bi-monthly mailings a realistic marketing strategy for local businesses.`);
      } else {
        paras.push(`${loc.name}'s close-knit community of ${loc.population} residents and approximately ${formatNum(s.households)} households makes it one of the most affordable direct mail markets in ${county}. A full-market campaign reaching every household costs under $${formatNum(Math.round(s.households * 0.5))}, making direct mail accessible even for the smallest local businesses and organizations.`);
      }
      if (orgs) {
        paras.push(`The presence of ${orgs} anchors ${loc.name}'s local economy and creates opportunities for direct mail campaigns that speak directly to the community's character. Businesses that serve these institutions and their employees, visitors, and families can use targeted mailing lists to reach the right audience — rather than the broad saturation approach of EDDM, direct mail lets you select exactly which ${loc.name} households receive your message based on demographics that match your customer profile.`);
      }
      if (clients) {
        paras.push(`The most active direct mail users in ${loc.name} include ${clients}. Unlike EDDM (which mails to every household on a route), targeted direct mail lets these businesses select records by income, home value, age, business type, or dozens of other demographic filters — reaching only the households most likely to become customers and maximizing return on every dollar spent.`);
      }
      return paras;
    },
    industryContent: (loc, county) => {
      const s = getTownStats(loc);
      const paras = [];
      const ct = loc.clientTypes.map((c) => c.toLowerCase());
      const hasRestaurant = ct.some((c) => c.includes("restaurant") || c.includes("cafe") || c.includes("food") || c.includes("dining"));
      const hasRealEstate = ct.some((c) => c.includes("real estate"));
      const hasContractor = ct.some((c) => c.includes("contractor") || c.includes("home") || c.includes("construction") || c.includes("builder"));
      const hasRetail = ct.some((c) => c.includes("retail") || c.includes("shop") || c.includes("boutique") || c.includes("store"));
      const hasHealth = ct.some((c) => c.includes("health") || c.includes("medical") || c.includes("dental") || c.includes("wellness"));
      const hasFarm = ct.some((c) => c.includes("farm") || c.includes("agricultural") || c.includes("winery") || c.includes("orchard"));
      const hasNonprofit = ct.some((c) => c.includes("non-profit") || c.includes("nonprofit") || c.includes("community") || c.includes("church") || c.includes("organization"));
      const hasTourism = ct.some((c) => c.includes("tourism") || c.includes("hotel") || c.includes("vacation") || c.includes("b&b") || c.includes("lodging"));
      const hasLegal = ct.some((c) => c.includes("legal") || c.includes("law") || c.includes("attorney"));
      const hasFinancial = ct.some((c) => c.includes("financial") || c.includes("insurance") || c.includes("accounting"));
      const hasAuto = ct.some((c) => c.includes("auto") || c.includes("car") || c.includes("dealer"));
      if (hasRealEstate) {
        paras.push(`Real estate professionals in ${loc.name} use targeted direct mail to farm specific neighborhoods, announce listings, and reach potential sellers. Unlike EDDM (which mails to every household), targeted real estate mailings can be filtered by home value, length of residence, and equity — reaching homeowners most likely to list. For ${loc.name}'s approximately ${formatNum(s.households)} households, a filtered list of long-term homeowners with significant equity typically yields 30–50% of total households, keeping campaign costs focused on the highest-probability prospects.`);
      }
      if (hasContractor) {
        paras.push(`Home service contractors in ${loc.name} use targeted direct mail to reach homeowners filtered by home value, home age, and household income — demographics that predict spending on home improvement, HVAC, roofing, and landscaping. A targeted list of ${loc.name} homeowners with homes built before 2000 and values above the county median identifies the households most likely to need renovation, replacement, and upgrade services. Seasonal timing is critical: spring mailings for landscaping and exterior work, fall for heating and insulation, and year-round for emergency services.`);
      }
      if (hasRestaurant) {
        paras.push(`Restaurants and food service businesses in ${loc.name} combine direct mail with menu inserts, catering promotions, and grand opening announcements. For new restaurants, a saturation mailing to all ${formatNum(s.households)} ${loc.name} households builds immediate awareness. For established restaurants, a targeted mailing to households within a 10-minute drive radius — filtered by income level matching your average check size — generates repeat customers who become long-term regulars.`);
      }
      if (hasHealth) {
        paras.push(`Healthcare providers in ${loc.name} — dentists, chiropractors, physical therapists, optometrists, and veterinarians — use targeted direct mail to reach households by age, family composition, and insurance likelihood. A pediatric dentist targets families with children ages 2–12; an orthopedic practice targets adults 50+; a veterinarian targets homeowners (who are more likely to have pets). For ${loc.name}'s ${formatNum(s.households)} households, these demographic filters create highly efficient mailing lists of 800–${formatNum(Math.round(s.households * 0.6))} records.`);
      }
      if (hasRetail) {
        paras.push(`Retail businesses in ${loc.name} use direct mail for seasonal promotions, loyalty programs, and new customer acquisition. The advantage of targeted direct mail over EDDM for retail is the ability to select households by income and spending patterns — ensuring your promotional mailing reaches consumers who can afford your products. For specialty retailers, gift shops, and boutiques, a targeted list of higher-income households within a 15-minute drive radius of ${loc.name} concentrates your marketing spend on the most valuable prospects.`);
      }
      if (hasFarm) {
        paras.push(`Agricultural businesses, farms, and wineries in ${loc.name} use direct mail for CSA membership drives, seasonal event promotions, and holiday gift campaigns. Targeted mailing lists let farm businesses reach beyond the local ${loc.name} market to NYC metro area households — filtering by income, age, and lifestyle indicators that predict interest in farm-to-table products, agritourism experiences, and wine club memberships.`);
      }
      if (hasNonprofit) {
        paras.push(`Non-profit organizations in ${loc.name} use direct mail for fundraising appeals, capital campaigns, membership renewals, and event invitations. Direct mail consistently outperforms email for non-profit fundraising, with response rates 5–10x higher than digital appeals. For ${loc.name} non-profits, a targeted donor acquisition mailing to households filtered by income and philanthropic indicators generates first-time donors at a fraction of the cost of other acquisition channels.`);
      }
      if (hasTourism) {
        paras.push(`Tourism and hospitality businesses in ${loc.name} use targeted direct mail to reach visitor-source markets in the NYC metro area, Westchester County, and northern New Jersey. Unlike EDDM (which is limited to local carrier routes), targeted direct mail lets ${loc.name} tourism businesses build mailing lists of households in specific ZIP codes filtered by income, age, and lifestyle — reaching exactly the demographic profile that visits ${county} for weekend getaways, seasonal tourism, and destination events.`);
      }
      if (hasLegal) {
        paras.push(`Law firms and legal professionals in ${loc.name} use direct mail for practice area promotion, client acquisition, and community visibility. Targeted mailings can reach specific demographics — estate planning attorneys targeting homeowners 55+, family law attorneys targeting households with children, personal injury attorneys targeting a broad residential base. For ${loc.name}'s market, a quarterly mailing to a refined list maintains top-of-mind awareness without the per-click costs of digital advertising.`);
      }
      if (hasFinancial) {
        paras.push(`Financial services, insurance agencies, and accounting firms in ${loc.name} use direct mail for client acquisition, renewal notices, and educational content campaigns. Variable data printing allows each piece to be personalized with the recipient's name and relevant financial information, dramatically increasing response rates compared to generic mailings. For ${loc.name}'s ${formatNum(s.households)} households, a targeted list filtered by income and homeownership status identifies the highest-value prospects.`);
      }
      if (hasAuto) {
        paras.push(`Automotive dealerships and service centers in ${loc.name} use direct mail for inventory promotions, service specials, and lease expiration campaigns. Targeted mailing lists can be filtered by vehicle ownership data — reaching households with specific makes, models, or vehicle ages. For ${loc.name} auto businesses, a quarterly campaign to households with vehicles 5+ years old generates consistent service department traffic.`);
      }
      if (paras.length === 0) {
        paras.push(`Businesses across ${loc.name} use targeted direct mail to reach specific customer demographics with precision. Unlike EDDM saturation campaigns, targeted direct mail lets you select which ${loc.name} households receive your message — filtering by income, age, home value, business type, or dozens of other criteria. This precision targeting maximizes your return on every marketing dollar.`);
      }
      return paras;
    },
    faqsForTown: (loc, county) => {
      const s = getTownStats(loc);
      const zipList = loc.zip.join(", ");
      return [
        { q: `How many households can direct mail reach in ${loc.name}?`, a: `${loc.name} (ZIP ${zipList}) has approximately ${formatNum(s.households)} households. A full-market consumer mailing list costs approximately $${formatNum(s.dmListCostLow)}–$${formatNum(s.dmListCostHigh)} for the list data, plus design, printing, and postage. Most ${loc.name} businesses target a filtered subset — typically 40–70% of total households — based on demographics that match their ideal customer profile.` },
        { q: `What does a direct mail campaign cost in ${loc.name}?`, a: `A complete direct mail campaign for ${loc.name} — including mailing list, design, printing, and postage — typically runs $0.40–$0.55 per piece all-in for postcards at automation Marketing Mail rates. For a ${formatNum(Math.min(s.households, 5e3))}-piece ${loc.name} campaign, that's approximately $${formatNum(Math.round(Math.min(s.households, 5e3) * 0.4))}–$${formatNum(Math.round(Math.min(s.households, 5e3) * 0.55))}. Letter packages with personalized content cost more but generate higher response rates for complex offers.` },
        { q: `How far is Cornerstone from ${loc.name}?`, a: `Our Saugerties facility is approximately ${s.distMiles} miles (about ${s.driveMin} minutes) from ${loc.name}. We handle all list acquisition, design, printing, and postal delivery from our facility and deliver to the ${s.bmeu} BMEU for USPS entry. Most ${loc.name} clients work with us by phone and email — proofs are approved digitally and campaigns are managed without in-person visits.` },
        { q: "What is NCOA and why does it matter?", a: `NCOA (National Change of Address) is a USPS-licensed database that matches your mailing list against recorded address changes over the past 48 months. For ${loc.name} mailings, running your list through NCOA before printing eliminates undeliverable addresses and reduces wasted postage. Cornerstone processes every list through NCOA as a standard part of data preparation — ensuring your ${loc.name} campaign reaches current residents, not previous occupants.` },
        { q: `Can you target specific demographics within ${loc.name}?`, a: `Yes. Our mailing lists can be filtered by dozens of demographic criteria including household income, home value, home age, homeowner vs. renter, age, family composition, length of residence, and business type. For ${loc.name}'s ${formatNum(s.households)} households, these filters let you target exactly the slice of the market most likely to respond — a roofer targeting older homes, a financial advisor targeting higher-income households, or a pediatric dentist targeting families with young children.` },
        { q: "What postage discount does automation presort provide?", a: `Automation-rate Marketing Mail runs approximately $0.209–$0.236 per piece depending on piece size and sort level, compared to $0.358 for First-Class. For a ${formatNum(Math.min(s.households, 5e3))}-piece ${loc.name} mailing, automation presort saves approximately $${formatNum(Math.round(Math.min(s.households, 5e3) * 0.14))} in postage versus First-Class rates. Cornerstone handles all CASS certification and presort processing to qualify your campaign for the lowest available rate.` },
        { q: `How long does a direct mail campaign take for ${loc.name}?`, a: `A typical ${loc.name} direct mail project — list pull, design, print, and postal delivery — takes 10–15 business days from approved art. Rush timelines are available. After USPS acceptance at the ${s.bmeu} BMEU, delivery to ${loc.name} addresses is typically 3–5 business days for Marketing Mail.` }
      ];
    },
    schemaServiceName: "Direct Mail Services",
    schemaDescription: "Full-service direct mail campaigns including mailing lists, graphic design, commercial printing, and USPS postal delivery."
  }
];
const ENABLED_COUNTIES = ["ulster", "dutchess", "orange"];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://crst.net");
function getStaticPaths() {
  const paths = [];
  for (const svc of SERVICE_CONFIGS) {
    for (const county of COUNTIES_DATA) {
      if (!ENABLED_COUNTIES.includes(county.countyKey)) continue;
      for (const loc of county.locations) {
        paths.push({
          params: { service: svc.slug, town: loc.slug },
          props: { serviceSlug: svc.slug, location: loc, county }
        });
      }
    }
  }
  return paths;
}
const $$town = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$town;
  const { serviceSlug, location, county } = Astro2.props;
  const svc = SERVICE_CONFIGS.find((s) => s.slug === serviceSlug);
  const stats = getTownStats(location);
  const pageTitle = svc.metaTitleTemplate(location.name);
  const metaDesc = svc.metaDescTemplate(location.name, county.name);
  const h1 = svc.h1Template(location.name);
  const canonical = `https://crst.net/services/${svc.slug}/${location.slug}`;
  const introText = svc.introTemplate(location, county.name);
  const townPageHref = `/service-areas/${county.slug}/${location.slug}`;
  const processParas = svc.processContent(location, county.name);
  const localMarketParas = svc.localMarketContent(location, county.name);
  const industryParas = svc.industryContent(location, county.name);
  const faqs = svc.faqsForTown(location, county.name);
  const otherServiceSlug = svc.slug === "eddm" ? "direct-mail" : "eddm";
  const otherServiceName = svc.slug === "eddm" ? "Direct Mail" : "EDDM";
  const otherServiceHref = `/services/${otherServiceSlug}/${location.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.schemaServiceName,
    provider: { "@id": "https://crst.net/#organization" },
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${county.name}, NY`
      }
    },
    description: svc.schemaDescription,
    url: canonical
  };
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  } : null;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle.replace(" | Cornerstone Services", "").replace(" | Cornerstone", ""), "description": metaDesc, "canonical": canonical, "schema": null }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": h1, "subtitle": `${svc.name} services for businesses and organizations in ${location.name}, ${county.name}. In-house from our Saugerties facility since 1998.`, "breadcrumbs": [
    { label: "Services", href: "/services" },
    { label: svc.name, href: svc.pillarHref },
    { label: location.name }
  ], "noSchema": true })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="grid lg:grid-cols-3 gap-10 lg:gap-14"> <div class="lg:col-span-2"> <div class="section-divider mb-6"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">${svc.name} Services for ${location.name}</h2> <p class="text-navy-600/80 leading-relaxed mb-6">${introText}</p> ${location.notableOrgs.length > 0 && renderTemplate`<p class="text-navy-600/80 leading-relaxed mb-6"> ${location.name} is home to organizations like ${location.notableOrgs.slice(0, 3).join(", ")}${location.notableOrgs.length > 3 ? `, and ${location.notableOrgs[3]}` : ""} — the types of businesses and institutions that rely on professional ${svc.nameInline} services.
</p>`} <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">${location.name} Market Profile</h2> ${localMarketParas.map((para) => renderTemplate`<p class="text-navy-600/80 leading-relaxed mb-4">${para}</p>`)} <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8"> <div class="bg-crst-primary/5 rounded-xl border border-crst-primary/10 p-5 text-center"> <p class="text-2xl font-display text-crst-primary">${location.population}</p> <p class="text-xs text-navy-600/60 mt-1">Population</p> </div> <div class="bg-crst-primary/5 rounded-xl border border-crst-primary/10 p-5 text-center"> <p class="text-2xl font-display text-crst-primary">~${stats.households.toLocaleString("en-US")}</p> <p class="text-xs text-navy-600/60 mt-1">Households</p> </div> <div class="bg-crst-primary/5 rounded-xl border border-crst-primary/10 p-5 text-center"> <p class="text-2xl font-display text-crst-primary">~${stats.carrierRoutes}</p> <p class="text-xs text-navy-600/60 mt-1">Carrier Routes</p> </div> <div class="bg-crst-primary/5 rounded-xl border border-crst-primary/10 p-5 text-center"> <p class="text-2xl font-display text-crst-primary">${location.zip.join(", ")}</p> <p class="text-xs text-navy-600/60 mt-1">ZIP ${location.zip.length > 1 ? "Codes" : "Code"}</p> </div> <div class="bg-crst-primary/5 rounded-xl border border-crst-primary/10 p-5 text-center"> <p class="text-2xl font-display text-crst-primary">~${stats.distMiles} mi</p> <p class="text-xs text-navy-600/60 mt-1">From Saugerties</p> </div> <div class="bg-crst-primary/5 rounded-xl border border-crst-primary/10 p-5 text-center"> <p class="text-2xl font-display text-crst-primary">${stats.bmeu}</p> <p class="text-xs text-navy-600/60 mt-1">BMEU Facility</p> </div> </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">What's Included</h2> <div class="grid sm:grid-cols-2 gap-4 mb-8"> ${svc.features.map((feat) => renderTemplate`<div class="bg-navy-50/40 rounded-xl border border-navy-100 p-5"> <h3 class="font-heading font-semibold text-navy-800 text-sm mb-2">${feat.title}</h3> <p class="text-sm text-navy-600/70 leading-relaxed">${feat.desc}</p> </div>`)} </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">How the ${svc.name} Process Works in ${location.name}</h2> ${processParas.map((para) => renderTemplate`<p class="text-navy-600/80 leading-relaxed mb-4">${para}</p>`)} <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">${svc.name} for ${location.name} Industries</h2> ${industryParas.map((para) => renderTemplate`<p class="text-navy-600/80 leading-relaxed mb-4">${para}</p>`)} ${location.clientTypes.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">Who We Serve in ${location.name}</h2> <div class="grid sm:grid-cols-2 gap-3 mb-8"> ${location.clientTypes.map((ct) => renderTemplate`<div class="flex items-start gap-3 p-3 bg-navy-50/40 rounded-lg"> <svg class="w-4 h-4 text-crst-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> <span class="text-sm text-navy-700">${ct}</span> </div>`)} </div> ` })}`} ${faqs.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-6">${svc.name} FAQ for ${location.name}</h2> <div class="space-y-4 mb-8"> ${faqs.map((faq, i) => renderTemplate`<details class="group bg-navy-50/40 rounded-xl border border-navy-100 overflow-hidden"${addAttribute(i === 0, "open")}> <summary class="flex items-center justify-between p-5 cursor-pointer font-heading font-semibold text-navy-800 text-sm hover:text-crst-primary transition-colors"> ${faq.q} <svg class="w-4 h-4 text-navy-400 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg> </summary> <div class="px-5 pb-5 text-sm text-navy-600/70 leading-relaxed">${faq.a}</div> </details>`)} </div> ` })}`} <div class="bg-crst-primary/5 border border-crst-primary/15 rounded-xl p-6 mt-10 text-center"> <p class="font-heading font-bold text-crst-primary text-lg mb-2">Ready to Get Started?</p> <p class="text-navy-600/70 text-sm mb-4">Get a free estimate for ${svc.nameInline} services in ${location.name}, NY.</p> <div class="flex flex-col sm:flex-row items-center justify-center gap-3"> <a href="/estimate" class="btn-primary text-sm">Get a Free Estimate</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="inline-flex items-center gap-2 text-sm font-heading font-semibold text-crst-primary hover:text-crst-accent transition-colors"> <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
Call ${BUSINESS.phone} </a> </div> </div> <div class="section-divider mb-6 mt-14"></div> <h2 class="text-2xl sm:text-3xl font-display text-crst-primary mb-4">Learn More</h2> <div class="space-y-3"> <a${addAttribute(svc.pillarHref, "href")} class="flex items-center gap-3 p-4 bg-navy-50/40 rounded-lg border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <svg class="w-5 h-5 text-crst-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> <div> <span class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors">${svc.name} Services Overview</span> <p class="text-xs text-navy-600/60">Full details on our ${svc.nameInline} capabilities</p> </div> </a> <a${addAttribute(otherServiceHref, "href")} class="flex items-center gap-3 p-4 bg-navy-50/40 rounded-lg border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <svg class="w-5 h-5 text-crst-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg> <div> <span class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors">${otherServiceName} in ${location.name}</span> <p class="text-xs text-navy-600/60">${otherServiceName} services for ${location.name} businesses</p> </div> </a> <a${addAttribute(townPageHref, "href")} class="flex items-center gap-3 p-4 bg-navy-50/40 rounded-lg border border-navy-100 hover:border-crst-primary/30 hover:shadow-sm transition-all group"> <svg class="w-5 h-5 text-crst-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <div> <span class="font-heading font-semibold text-navy-800 text-sm group-hover:text-crst-primary transition-colors">All Services in ${location.name}</span> <p class="text-xs text-navy-600/60">Direct mail, printing, data, and more for ${location.name}</p> </div> </a> </div> </div> <aside class="lg:col-span-1"> <div class="sticky top-28 space-y-6"> <div class="bg-crst-primary rounded-xl p-6 text-white"> <h3 class="font-display text-lg mb-2">Free Estimate</h3> <p class="text-white/60 text-sm leading-relaxed mb-4">
Get a quote for ${svc.nameInline} in ${location.name}, NY.
</p> <a href="/estimate" class="btn-accent w-full text-center text-sm">
Request Estimate
</a> <div class="mt-4 pt-4 border-t border-white/10 text-center"> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="text-white/70 text-sm font-heading hover:text-white transition-colors">
or call ${BUSINESS.phone} </a> </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Quick Stats: ${location.name}</h3> <div class="space-y-2 text-sm text-navy-600/80"> <div class="flex justify-between"><span>Population</span><strong>${location.population}</strong></div> <div class="flex justify-between"><span>Households</span><strong>~${stats.households.toLocaleString("en-US")}</strong></div> <div class="flex justify-between"><span>Carrier Routes</span><strong>~${stats.carrierRoutes}</strong></div> <div class="flex justify-between"><span>ZIP</span><strong>${location.zip.join(", ")}</strong></div> <div class="flex justify-between"><span>BMEU</span><strong>${stats.bmeu}</strong></div> <div class="flex justify-between"><span>Distance</span><strong>~${stats.driveMin} min</strong></div> </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Services</h3> <div class="space-y-2"> ${SERVICE_CONFIGS.map((s) => renderTemplate`<a${addAttribute(`/services/${s.slug}/${location.slug}`, "href")}${addAttribute(`flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors font-heading ${s.slug === svc.slug ? "text-crst-primary bg-white font-semibold" : "text-navy-700 hover:text-crst-primary hover:bg-white"}`, "class")}> ${s.name} in ${location.name} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> <div class="bg-navy-50/50 rounded-xl p-5 border border-navy-100"> <h3 class="font-heading font-bold text-navy-800 text-sm mb-3">Service Areas</h3> <div class="space-y-2"> ${Object.values(COUNTIES).map((c) => renderTemplate`<a${addAttribute(`/service-areas/${c.slug}`, "href")} class="flex items-center justify-between px-3 py-2 text-sm text-navy-700 hover:text-crst-primary hover:bg-white rounded-md transition-colors font-heading"> ${c.name} <svg class="w-3.5 h-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> </div> </div> </aside> </div> </div> </section> ${renderComponent($$result2, "NearbyTowns", $$NearbyTowns, { "currentSlug": location.slug, "countySlug": county.slug, "countyDisplayName": county.name, "basePath": `/services/${svc.slug}`, "serviceType": `${svc.nameInline} services` })} ${renderComponent($$result2, "CTASection", $$CTASection, { "headline": `Need ${svc.name} in ${location.name}?`, "text": `Contact Cornerstone Services for a free estimate on your next ${svc.nameInline} project in ${location.name}, ${county.name}.` })} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_b || (_b = __template([' <script type="application/ld+json">', "<\/script> ", ""])), unescapeHTML(JSON.stringify(schema)), faqSchema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(faqSchema)))) })}` })}`;
}, "/home/runner/workspace/src/pages/services/[service]/[town].astro", void 0);

const $$file = "/home/runner/workspace/src/pages/services/[service]/[town].astro";
const $$url = "/services/[service]/[town]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$town,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
