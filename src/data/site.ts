// CRST Site Data — Single source of truth for business info, navigation, services

export const BUSINESS = {
  name: 'Cornerstone Services, Inc.',
  shortName: 'CRST',
  tagline: 'Hudson Valley Direct Mail & Marketing Since 1998',
  phone: '(845) 255-5722',
  phoneClean: '8453936770',
  trackingPhone: '(845) 393-6770',
  altPhone: '(845) 393-6770',
  altPhoneClean: '8453936770',
  email: 'info@crst.net',
  address: {
    street: '31 South Ohioville Road',
    city: 'New Paltz',
    state: 'NY',
    zip: '12561',
    full: '31 South Ohioville Road, New Paltz, NY 12561',
  },
  owner: 'Sean Griffin',
  domain: 'crst.net',
  url: 'https://crst.net',
  founded: 1998,
  stats: {
    years: '25+',
    piecesMailed: '2.3M+',
    municipalities: '47',
    onTime: '98%',
  },
} as const;

export const NAV_ITEMS = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Direct Mail Campaigns', href: '/services/direct-mail/' },
      { label: 'Data Lists', href: '/services/data-lists/' },
      { label: 'Printing Services', href: '/services/printing/' },
      { label: 'Mailing Services', href: '/services/mailing/' },
      { label: 'Graphic Design', href: '/services/graphic-design/' },
      { label: 'EDDM', href: '/services/eddm/' },
      { label: 'Non-Profit Mailing', href: '/services/non-profit-mailing/' },
      { label: 'Union Printing', href: '/services/union-printing/' },
      { label: 'Web Design', href: '/services/web-design/' },
    ],
  },
  {
    label: 'Service Areas',
    href: '/service-areas/',
    children: [
      { label: 'Ulster County', href: '/service-areas/ulster-county/' },
      { label: 'Dutchess County', href: '/service-areas/dutchess-county/' },
      { label: 'Orange County', href: '/service-areas/orange-county/' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/',
    children: [
      { label: 'Mailing Permits Guide', href: '/resources/mailing-permits/' },
      { label: 'Postage Rates', href: '/resources/postage-rates/' },
      { label: 'Envelope Sizes', href: '/resources/envelope-sizes/' },
      { label: 'USPS Templates', href: '/usps-direct-mailer-templates/' },
      { label: 'Postal Dictionary', href: '/resources/postal-dictionary/' },
      { label: 'Non-Profit Mailing Tool', href: '/resources/non-profit-mailing/' },
      { label: 'Mail Automation', href: '/resources/mail-automation/' },
    ],
  },
  {
    label: 'Case Studies',
    href: '/case-studies/',
  },
  {
    label: 'About',
    href: '/about/',
  },
  {
    label: 'Contact',
    href: '/contact/',
  },
] as const;

export const SERVICES = [
  {
    title: 'Direct Mail Campaigns',
    slug: 'direct-mail',
    icon: 'mail',
    summary: 'Full-service direct mail — from data targeting through printing and postal delivery.',
    description: 'End-to-end direct mail marketing campaigns including audience targeting, graphic design, commercial printing, and USPS-compliant mailing. We handle every step so you can focus on your business.',
  },
  {
    title: 'Data Lists',
    slug: 'data-lists',
    icon: 'database',
    summary: 'Targeted mailing lists, saturation data, and NCOA processing for accurate delivery.',
    description: 'From unique niche business data, to specialty masterlists custom built for optimal success, to distilled real property info. to target hard-to-reach homeowners, all lists undergo robust address verification and householding measures to make the most of your mailing initiatives.',
  },
  {
    title: 'Printing Services',
    slug: 'printing',
    icon: 'printer',
    summary: 'Postcards, letters, brochures, newsletters, and more — commercial quality at competitive rates.',
    description: 'High-quality offset and digital printing for postcards, self-mailers, letters, newsletters, brochures, business cards, and more. Union printing available.',
  },
  {
    title: 'Mailing Services',
    slug: 'mailing',
    icon: 'send',
    summary: '100% USPS-compliant, full service automation presort addressing',
    description: 'Complete mail preparation including inkjet or digital addressing, delivery point address verification and automation presort to maximize postage discounts, folding/auto-inserting, tabbing, and the full range of lettershop services',
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    icon: 'palette',
    summary: 'USPS-standard mail piece design that gets noticed and meets postal requirements.',
    description: 'Professional mail piece design optimized for both visual impact and USPS compliance. We design postcards, self-mailers, letters, and envelopes that meet all postal automation requirements.',
  },
  {
    title: 'EDDM',
    slug: 'eddm',
    icon: 'map-pin',
    summary: 'Every Door Direct Mail — blanket your neighborhood without a mailing list.',
    description: 'USPS Every Door Direct Mail lets you target entire carrier routes without purchasing a mailing list. Ideal for local businesses, restaurants, and service providers looking to saturate their market area.',
  },
  {
    title: 'Non-Profit Mailing',
    slug: 'non-profit-mailing',
    icon: 'heart',
    summary: 'Discounted postage rates and PS Form 3624 guidance for qualifying organizations.',
    description: 'CRST assists 501(c)(3) organizations with all the paperwork to attain some of the lowest postage rates available via not-for-profit mailing privileges (free to apply!). Even some 501(c)(6) org\'s qualify for such privileges. No bulk mail permit necessary – we keep it simple and return the discounts.',
  },
  {
    title: 'Web Design',
    slug: 'web-design',
    icon: 'globe',
    summary: 'Professional websites, hosting, and SEO for small businesses.',
    description: 'Custom WordPress websites with built-in SEO, mobile responsiveness, and ongoing hosting. Designed to work alongside your direct mail campaigns for maximum marketing impact.',
  },
  {
    title: 'Union Printing',
    slug: 'union-printing',
    icon: 'shield',
    summary: 'Allied Printing Trades Council label on political and labor organization materials.',
    description: 'We often partner with qualified Union print shops so that the Union bug may be used for political campaigns and municipal purposes. Full commercial printing available, usually in hand with members of the Allied Printing Trades Council.',
  },
] as const;

export const CASE_STUDIES = [
  {
    title: 'Niche Insurance Direct Mail Marketing',
    slug: 'niche-insurance',
    client: 'Tango, Tango & Tango Insurance',
    location: 'Hicksville, NY',
    industry: 'Insurance',
  },
  {
    title: 'Republican Town Committee Electoral Cards',
    slug: 'republican-town-committee',
    client: 'Political Committee',
    location: 'Hudson Valley',
    industry: 'Political',
  },
  {
    title: 'Chinese Menu Misprint Fix',
    slug: 'chinese-menu-misprint',
    client: 'Restaurant',
    location: 'Hudson Valley',
    industry: 'Restaurant',
  },
  {
    title: 'National Magazine at Periodical Rate',
    slug: 'national-magazine-periodical',
    client: "O'Dwyers Public Relations",
    location: 'National',
    industry: 'Publishing',
  },
  {
    title: 'Direct Mail Strategy for Lawrence Hearing',
    slug: 'lawrence-hearing',
    client: 'Lawrence Hearing',
    location: 'Orange County, NY',
    industry: 'Healthcare',
  },
  {
    title: 'Waste Management Customer Notifications',
    slug: 'waste-management',
    client: 'Waste Management',
    location: 'Regional',
    industry: 'Waste Management',
  },
  {
    title: 'Daughters of the American Revolution',
    slug: 'daughters-american-revolution',
    client: 'DAR',
    location: 'National',
    industry: 'Non-Profit',
  },
  {
    title: 'National Industrial Product Recall',
    slug: 'national-product-recall',
    client: 'Robertshaw Controls',
    location: 'Global',
    industry: 'Manufacturing',
  },
  {
    title: 'British-American Collegiate Association',
    slug: 'british-american-collegiate',
    client: 'Winant-Clayton Volunteers',
    location: 'International',
    industry: 'Education',
  },
  {
    title: 'Retail Furniture Store EDDM',
    slug: 'retail-furniture-store',
    client: 'Furniture Store',
    location: 'Hudson Valley',
    industry: 'Retail',
  },
  {
    title: 'Cintas EDDM Recruitment Campaign',
    slug: 'cintas-recruitment',
    client: 'Cintas',
    location: 'Ladson, SC',
    industry: 'Corporate',
  },
] as const;

export const COUNTIES = {
  ulster: {
    name: 'Ulster County',
    slug: 'ulster-county',
    anchor: 'New Paltz',
    description: 'Home base for Cornerstone Services. We serve every town, village, and hamlet across Ulster County.',
  },
  dutchess: {
    name: 'Dutchess County',
    slug: 'dutchess-county',
    anchor: 'Poughkeepsie',
    description: 'From Beacon to Millerton, we provide full direct mail services throughout Dutchess County.',
  },
  orange: {
    name: 'Orange County',
    slug: 'orange-county',
    anchor: 'Newburgh',
    description: 'Serving businesses and organizations across Orange County from Newburgh to Port Jervis.',
  },
} as const;

// GHL Integration
export const GHL = {
  webhookUrl: 'https://services.leadconnectorhq.com/hooks/qS83M3cJvj01NjchLqjy/webhook-trigger/06294598-cdaf-4748-af4b-bbb89412e973',
  trackingId: 'tk_7f785045033a4132bec45bd33cffe9b4',
  chatWidgetId: '698f05276dc9bbabc4529ff6',
  ga4Id: 'G-HRBG2H3FE7',
} as const;
