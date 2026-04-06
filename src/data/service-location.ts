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
    processContent: (town) => [
      `Direct mail for ${town} businesses starts with the right mailing list. Cornerstone pulls consumer or business records targeted by ZIP code, carrier route, income, home value, or business type — whatever profile matches your best customer. Every list is NCOA-processed through the National Change of Address database before your job goes to press, so you're not paying postage on addresses that have moved.`,
      `Once your list is confirmed, we design a mail piece that meets USPS Marketing Mail automation standards. Automation-compatible design is required to qualify for discounted postage rates — the layout, barcode placement, and address block all have to conform to USPS specifications. Cornerstone handles the design with those requirements built in from the start, not added as an afterthought.`,
      `Printing is done in-house on offset and digital presses at our New Paltz facility. Variable data printing is available for campaigns where each piece is personalized — different names, offers, or property addresses printed inline without slowing the press run. For ${town} campaigns, this is particularly effective for real estate, insurance, and financial services outreach.`,
      `The final step is postal prep and delivery. We run your file through CASS (Coding Accuracy Support System) address verification, apply the automation presort barcodes, prepare the postage statement, and deliver to the USPS Business Mail Entry Unit. For ${town} and surrounding ${town.split(' ')[0]} area mailings, we use the Newburgh or New Paltz BMEUs depending on destination ZIP codes, ensuring the fastest delivery to your target area.`,
    ],
    faqs: [
      { q: 'What is NCOA and why does it matter for direct mail?', a: 'NCOA (National Change of Address) is a USPS-licensed database that matches your mailing list against recorded address changes over the past 48 months. Running your list through NCOA before a mailing eliminates undeliverable addresses and reduces wasted postage. Cornerstone processes every list through NCOA as a standard part of data preparation.' },
      { q: 'What postage discount does automation presort provide?', a: 'Automation-rate Marketing Mail runs approximately $0.209–$0.236 per piece depending on piece size and sort level, compared to $0.358 for First-Class. For a 5,000-piece mailing, automation presort typically saves $600–$800 in postage versus First-Class. The savings increase with volume.' },
      { q: 'What is CASS certification and do I need it?', a: 'CASS (Coding Accuracy Support System) is a USPS address standardization process that verifies and corrects delivery point barcodes on your mailing list. CASS certification is required to qualify for automation postage discounts. Cornerstone runs CASS on every list — you do not need to do anything separately.' },
      { q: 'Can Cornerstone handle variable data printing for personalized pieces?', a: 'Yes. Variable data printing (VDP) allows each mail piece to be individually personalized — different names, addresses, property values, offer amounts, or images printed inline during the press run. VDP is available for both postcard and letter campaigns and works with any targeted list we pull.' },
      { q: 'How long does a direct mail campaign take from start to delivery?', a: 'A typical direct mail project — list pull, design, print, and postal delivery — takes 10–15 business days from approved art. Rush timelines are available. Delivery after USPS acceptance is typically 3–5 business days for Marketing Mail.' },
    ],
    schemaServiceName: 'Direct Mail Services',
    schemaDescription: 'Full-service direct mail campaigns including mailing lists, graphic design, commercial printing, and USPS postal delivery.',
  },
];

export function getServiceConfig(slug: string): ServiceConfig | undefined {
  return SERVICE_CONFIGS.find(s => s.slug === slug);
}

export const ENABLED_COUNTIES = ['ulster', 'dutchess', 'orange'] as const;
