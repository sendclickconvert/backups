export interface ServiceConfig {
  slug: string;
  name: string;
  nameInline: string;
  pillarHref: string;
  h1Template: (town: string) => string;
  metaTitleTemplate: (town: string) => string;
  metaDescTemplate: (town: string) => string;
  introTemplate: (town: string, county: string, localIntro: string) => string;
  features: { title: string; desc: string }[];
  processContent?: (town: string) => string[];
  faqs?: { q: string; a: string }[];
  schemaServiceName: string;
  schemaDescription: string;
}

export const SERVICE_CONFIGS: ServiceConfig[] = [
  {
    slug: 'eddm',
    name: 'EDDM',
    nameInline: 'EDDM',
    pillarHref: '/services/eddm',
    h1Template: (town) => `EDDM in ${town}, NY`,
    metaTitleTemplate: (town) => `EDDM in ${town}, NY | Every Door Direct Mail`,
    metaDescTemplate: (town) => `Every Door Direct Mail (EDDM) in ${town}, NY. Saturate carrier routes without a mailing list. Design, print, and deliver — all in-house. Cornerstone Services.`,
    introTemplate: (town, county, localIntro) =>
      `Every Door Direct Mail (EDDM) lets you reach every address on a postal carrier route in ${town} without purchasing a mailing list. Cornerstone Services handles route selection, design, printing, and USPS paperwork for EDDM campaigns targeting ${town} and surrounding ${county} communities. ${localIntro}`,
    features: [
      { title: 'Route Selection via EDDM Online Tool', desc: 'We use the USPS EDDM Online Tool to select carrier routes in and around your target area. The tool pulls U.S. Census demographics — household income, age, size — so we can target the routes most likely to respond. Cornerstone manages the entire route selection process through our Business Customer Gateway account.' },
      { title: 'Mail Piece Design & EDDM Retail Indicia', desc: 'USPS-compliant oversized postcards and flat-size mailers designed for maximum impact. Every piece includes the required EDDM Retail Indicia — the postal marking that replaces a standard stamp or meter mark on EDDM mail. Standard sizes: 6.5"×9", 8.5"×11", 6"×11".' },
      { title: 'Commercial Printing', desc: 'High-quality offset and digital printing on heavy card stock. Full color, both sides. Cornerstone is listed in the USPS Printer Directory as a qualified mail piece printer meeting USPS automation and design standards.' },
      { title: 'PS Form 3587 & Postal Delivery', desc: 'We complete PS Form 3587 (the EDDM postage statement) for each mailing, prepare facing slips, bundle by route, and deliver to the destination post office or Business Mail Entry Unit (BMEU). Postage: $0.247/piece (Retail) or $0.214/piece (BMEU entry).' },
    ],
    processContent: (town) => [
      `The EDDM process for ${town} starts with route selection using the USPS EDDM Online Tool, which is accessed through the USPS Business Customer Gateway. This tool lets us filter carrier routes by U.S. Census demographics including household income, age distribution, and household size — so your mail reaches the neighborhoods most relevant to your business.`,
      `Once routes are selected, we design your mail piece to meet USPS Marketing Mail standards. Every EDDM piece must include the EDDM Retail Indicia — a printed marking in the upper-right corner that replaces traditional postage. The indicia, facing slips, and route bundling are all handled by Cornerstone as part of the production process.`,
      `Before delivery, we complete PS Form 3587 — the official USPS postage statement for EDDM mailings. This form documents the number of pieces, carrier routes, and postage due. For larger volume campaigns, we enter mail directly at the Business Mail Entry Unit (BMEU) to take advantage of the lower $0.214/piece BMEU rate vs. the $0.247/piece retail rate.`,
      `For questions about EDDM regulations, mail piece specifications, or postage requirements, USPS maintains PostalPro — its technical resource site for commercial mailers. Cornerstone stays current with PostalPro guidelines so your ${town} EDDM campaign meets all current USPS requirements without delays or rejections at the post office.`,
    ],
    faqs: [
      { q: 'What is the EDDM Online Tool and do I need to use it myself?', a: 'The EDDM Online Tool is a USPS web application accessed through the Business Customer Gateway that lets mailers select carrier routes by ZIP code and demographic filters. Cornerstone handles the entire route selection process for you — you do not need a Business Customer Gateway account or access to the EDDM Online Tool.' },
      { q: 'What is the EDDM Retail Indicia?', a: 'The EDDM Retail Indicia is a printed postal marking that appears in the upper-right corner of every EDDM mail piece. It replaces a standard postage stamp or meter mark and is required on all EDDM mailings. Cornerstone includes the indicia automatically in the mail piece design.' },
      { q: 'What is PS Form 3587?', a: 'PS Form 3587 is the USPS postage statement required for every EDDM mailing. It documents the number of mail pieces, selected carrier routes, and total postage due. Cornerstone completes and submits PS Form 3587 as part of our EDDM service — you do not need to fill it out yourself.' },
      { q: 'What is the difference between EDDM Retail and BMEU entry?', a: 'EDDM Retail ($0.247/piece) allows drop-off at any post office. BMEU entry ($0.214/piece) requires delivery to a Business Mail Entry Unit — a USPS bulk mail acceptance facility. Cornerstone handles BMEU entry for larger campaigns to maximize your postage savings.' },
      { q: 'Does Cornerstone appear in the USPS Printer Directory?', a: 'Cornerstone is a qualified mail piece printer meeting USPS design and automation standards. The USPS Printer Directory is a resource maintained through PostalPro that lists printers capable of producing USPS-compliant mail pieces.' },
    ],
    schemaServiceName: 'Every Door Direct Mail (EDDM)',
    schemaDescription: 'Every Door Direct Mail (EDDM) campaign services including route selection via EDDM Online Tool, PS Form 3587 preparation, EDDM Retail Indicia, commercial printing, and USPS delivery through BMEU.',
  },
  {
    slug: 'direct-mail',
    name: 'Direct Mail',
    nameInline: 'direct mail',
    pillarHref: '/services/direct-mail',
    h1Template: (town) => `Direct Mail in ${town}, NY`,
    metaTitleTemplate: (town) => `Direct Mail in ${town}, NY | Cornerstone Services`,
    metaDescTemplate: (town) => `Full-service direct mail in ${town}, NY. Mailing lists, design, printing, and USPS delivery — all in-house. No outsourcing. Cornerstone Services since 1998.`,
    introTemplate: (town, county, localIntro) =>
      `Cornerstone Services provides full-service direct mail campaigns for businesses and organizations in ${town}, NY. From mailing list acquisition and data processing to graphic design, commercial printing, and USPS-compliant postal prep — everything is handled in-house at our facility in New Paltz, serving ${town} and ${county}. ${localIntro}`,
    features: [
      { title: 'Targeted Mailing Lists', desc: 'Consumer and business data targeting by geography, demographics, income, home value, and more. All lists are NCOA-processed for accurate delivery.' },
      { title: 'Mail Piece Design', desc: 'USPS-compliant postcards, self-mailers, letters, and brochures designed for both visual impact and postal automation standards.' },
      { title: 'Commercial Printing', desc: 'Offset and digital printing on premium stock. Variable data printing available for personalized campaigns.' },
      { title: 'Presort & Postal Delivery', desc: 'CASS/DPV address verification, automation presort for maximum postage discounts, and USPS drop with delivery confirmation.' },
    ],
    schemaServiceName: 'Direct Mail Services',
    schemaDescription: 'Full-service direct mail campaigns including mailing lists, graphic design, commercial printing, and USPS postal delivery.',
  },
  {
    slug: 'printing',
    name: 'Printing',
    nameInline: 'printing',
    pillarHref: '/services/printing',
    h1Template: (town) => `Printing Services in ${town}, NY`,
    metaTitleTemplate: (town) => `Printing Services in ${town}, NY | Cornerstone`,
    metaDescTemplate: (town) => `Commercial printing in ${town}, NY. Postcards, brochures, newsletters, letterhead, and envelopes. Press to post office under one roof. Cornerstone Services.`,
    introTemplate: (town, county, localIntro) =>
      `Cornerstone Services provides commercial printing for businesses and organizations in ${town}, NY. Postcards, brochures, self-mailers, newsletters, letterhead, envelopes, and variable data printing — produced in-house and ready for direct mail or pickup. Serving ${town} and ${county} since 1998. ${localIntro}`,
    features: [
      { title: 'Postcards', desc: 'Standard and oversized postcards from 4"×6" to 6"×11". Full color, heavy card stock, automation-compatible.' },
      { title: 'Self-Mailers & Brochures', desc: 'Tri-fold brochures, bi-fold mailers, and booklet-style pieces with tabbing for USPS compliance.' },
      { title: 'Letters & Envelopes', desc: '#10 envelopes, window envelopes, and matching letterhead. Variable data addressing available.' },
      { title: 'Variable Data Printing', desc: 'Personalized names, addresses, offers, and images printed inline. Each piece is unique to the recipient.' },
    ],
    schemaServiceName: 'Commercial Printing Services',
    schemaDescription: 'Commercial printing services including postcards, brochures, newsletters, letterhead, and variable data printing for direct mail.',
  },
  {
    slug: 'non-profit-mailing',
    name: 'Non-Profit Mailing',
    nameInline: 'non-profit mailing',
    pillarHref: '/services/non-profit-mailing',
    h1Template: (town) => `Non-Profit Mailing in ${town}, NY`,
    metaTitleTemplate: (town) => `Non-Profit Mailing in ${town}, NY | Discounted Rates`,
    metaDescTemplate: (town) => `Non-profit mailing services in ${town}, NY. Discounted USPS postage rates, PS Form 3624 guidance, fundraising appeals, and EDDM for nonprofits. Cornerstone Services.`,
    introTemplate: (town, county, localIntro) =>
      `Nonprofits in ${town}, NY qualify for the lowest USPS postage rates available. Cornerstone Services handles the permit paperwork, prints the fundraising appeal or newsletter, and preps the mailing — all in-house. We serve 501(c)(3) and qualifying 501(c)(6) organizations throughout ${town} and ${county}. ${localIntro}`,
    features: [
      { title: 'PS Form 3624 Assistance', desc: 'We guide your organization through the USPS non-profit authorization application. The application is free — we help you avoid common rejection reasons.' },
      { title: 'Discounted Postage', desc: 'Non-profit Marketing Mail rates start at $0.154/piece vs. $0.358 for First-Class. Significant savings on fundraising appeals and newsletters.' },
      { title: 'Appeal Design & Printing', desc: 'Fundraising letters, donation envelopes, event postcards, and newsletters designed for both impact and USPS compliance.' },
      { title: 'EDDM for Nonprofits', desc: 'Non-profit EDDM lets you blanket neighborhoods near your facility without a mailing list — ideal for event promotion and community outreach.' },
    ],
    schemaServiceName: 'Non-Profit Mailing Services',
    schemaDescription: 'Non-profit mailing services with discounted USPS postage rates, PS Form 3624 guidance, fundraising appeal design, and mail preparation.',
  },
];

export function getServiceConfig(slug: string): ServiceConfig | undefined {
  return SERVICE_CONFIGS.find(s => s.slug === slug);
}

export const ENABLED_COUNTIES = ['ulster', 'dutchess', 'orange'] as const;
