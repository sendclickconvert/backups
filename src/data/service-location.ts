export interface ServiceConfig {
  slug: string;
  name: string;
  pillarHref: string;
  h1Template: (town: string) => string;
  metaTitleTemplate: (town: string) => string;
  metaDescTemplate: (town: string) => string;
  introTemplate: (town: string, county: string, localIntro: string) => string;
  features: { title: string; desc: string }[];
  schemaServiceName: string;
  schemaDescription: string;
}

export const SERVICE_CONFIGS: ServiceConfig[] = [
  {
    slug: 'eddm',
    name: 'EDDM',
    pillarHref: '/services/eddm',
    h1Template: (town) => `EDDM in ${town}, NY`,
    metaTitleTemplate: (town) => `EDDM in ${town}, NY | Every Door Direct Mail`,
    metaDescTemplate: (town) => `Every Door Direct Mail (EDDM) in ${town}, NY. Saturate carrier routes without a mailing list. Design, print, and deliver — all in-house. Cornerstone Services.`,
    introTemplate: (town, county, localIntro) =>
      `Every Door Direct Mail (EDDM) lets you reach every address on a postal carrier route in ${town} without purchasing a mailing list. Cornerstone Services handles route selection, design, printing, and USPS paperwork for EDDM campaigns targeting ${town} and surrounding ${county} communities. ${localIntro}`,
    features: [
      { title: 'Route Selection', desc: 'We use the USPS EDDM mapping tool to select carrier routes in and around your target area based on demographics and household count.' },
      { title: 'Mail Piece Design', desc: 'USPS-compliant oversized postcards and flat-size mailers designed for maximum impact. Standard sizes: 6.5"×9", 8.5"×11", 6"×11".' },
      { title: 'Commercial Printing', desc: 'High-quality offset and digital printing on heavy card stock. Full color, both sides.' },
      { title: 'Bundling & Delivery', desc: 'We prepare facing slips, bundle by route, and deliver directly to the destination post office. Postage: $0.247/piece (Retail) or $0.214/piece (BMEU).' },
    ],
    schemaServiceName: 'Every Door Direct Mail (EDDM)',
    schemaDescription: 'Every Door Direct Mail (EDDM) campaign services including route selection, design, printing, and USPS delivery.',
  },
  {
    slug: 'direct-mail',
    name: 'Direct Mail',
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

export const ENABLED_COUNTIES = ['ulster'] as const;
