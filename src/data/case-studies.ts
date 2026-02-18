// CRST Case Study Data — Full content for case study pages
// Each case study generates a unique /case-studies/[slug]/ page

export interface CaseStudy {
  title: string;
  slug: string;
  client: string;
  location: string;
  industry: string;
  services: string[];
  image?: string;
  imageAlt?: string;
  challenge: string;
  solution: string;
  results: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  keyMetrics?: { label: string; value: string }[];
  servicesUsed: string[];
  relatedServices: string[];
}

export const CASE_STUDIES_FULL: CaseStudy[] = [
  {
    title: 'Niche Insurance Direct Mail Marketing',
    slug: 'niche-insurance',
    client: 'Tango, Tango & Tango Insurance',
    location: 'Hicksville, NY',
    industry: 'Insurance',
    services: ['Direct Mail', 'Data Lists', 'Graphic Design', 'Printing', 'Mailing'],
    image: '/images/wp/case-studies/tangologo.jpg',
    imageAlt: 'Tango Insurance logo',
    challenge: 'Tango, Tango & Tango Insurance needed to reach homeowners in specific Long Island ZIP codes with a highly targeted offer for bundled home and auto policies. Their previous digital campaigns were generating leads but at a high cost-per-acquisition, and they wanted a more tangible, trustworthy medium to reach an older demographic that was more responsive to physical mail.',
    solution: 'Cornerstone built a custom mailing list targeting homeowners aged 45+ within specific income ranges across Hicksville and surrounding Nassau County communities. We designed a professional 6" x 9" postcard with a clear call-to-action offering a free policy review. The mailing was presorted for maximum postal discounts and delivered via First-Class Mail for faster delivery and return service.',
    results: 'The campaign generated a strong response rate well above the industry average for insurance direct mail. Tango reported multiple new policy bundles directly attributable to the mailing, with a cost-per-acquisition significantly lower than their previous digital-only approach. They have since become a recurring client with quarterly mailings.',
    keyMetrics: [
      { label: 'Pieces Mailed', value: '8,500' },
      { label: 'Mail Class', value: 'First-Class' },
      { label: 'Format', value: '6" × 9" Postcard' },
      { label: 'Targeting', value: 'Homeowners 45+' },
    ],
    servicesUsed: ['Data Lists', 'Graphic Design', 'Printing', 'Mailing'],
    relatedServices: ['direct-mail', 'data-lists', 'graphic-design'],
  },
  {
    title: 'Republican Town Committee Electoral Cards',
    slug: 'republican-town-committee',
    client: 'Local Republican Town Committee',
    location: 'Hudson Valley, NY',
    industry: 'Political',
    services: ['Direct Mail', 'Union Printing', 'Data Lists', 'Mailing'],
    image: '/images/wp/case-studies/PLATTEKILLgop.jpg',
    imageAlt: 'Republican Town Committee logo',
    challenge: 'A Hudson Valley Republican Town Committee needed to produce and distribute palm cards and slate mailers for their full candidate roster ahead of a local election. The timeline was tight — less than three weeks from design approval to mailbox delivery — and the materials needed to be union-printed to satisfy party requirements.',
    solution: 'Cornerstone produced union-printed palm cards bearing the Allied Printing Trades Council label and designed a coordinated slate mailer featuring all candidates with their positions and qualifications. We pulled a targeted voter list from the county Board of Elections data, filtered for registered party members, and processed the mailing through our presort system for maximum postage savings.',
    results: 'All materials were designed, printed, and mailed within the 3-week window. The union bug was prominently displayed on all pieces, satisfying party requirements. The committee reported strong voter recognition at polling locations, with many voters specifically mentioning the mailer when speaking with candidates. The committee has used Cornerstone for subsequent election cycles.',
    keyMetrics: [
      { label: 'Turnaround', value: '< 3 Weeks' },
      { label: 'Piece Types', value: 'Palm Cards + Slate Mailer' },
      { label: 'Print Type', value: 'Union Printed (APTC Label)' },
      { label: 'Targeting', value: 'Registered Voters' },
    ],
    servicesUsed: ['Union Printing', 'Graphic Design', 'Data Lists', 'Mailing'],
    relatedServices: ['union-printing', 'direct-mail', 'data-lists'],
  },
  {
    title: 'Chinese Menu Misprint Emergency Fix',
    slug: 'chinese-menu-misprint',
    client: 'Local Chinese Restaurant',
    location: 'Hudson Valley, NY',
    industry: 'Restaurant',
    services: ['Printing', 'EDDM'],
    image: '/images/wp/case-studies/chineselogo.jpg',
    imageAlt: 'Chinese restaurant logo',
    challenge: 'A local Chinese restaurant had just received 10,000 takeout menus from an out-of-state online printer — only to discover that multiple prices were wrong and a key dish was misspelled. Their grand opening was days away and they needed corrected menus immediately. The online printer could not reprint in time.',
    solution: 'Cornerstone reprinted the corrected menus on our digital press within 48 hours. We matched the original paper stock and layout, corrected all pricing errors and the misspelling, and delivered the finished menus to the restaurant before their opening weekend. We also recommended an EDDM campaign to announce the grand opening to surrounding neighborhoods.',
    results: 'The restaurant opened on schedule with accurate menus. They subsequently ran an EDDM postcard campaign targeting 3,000 homes within a 3-mile radius, which they credited with driving a strong first month of business. The owner has since used Cornerstone for seasonal menu updates and ongoing EDDM promotions.',
    keyMetrics: [
      { label: 'Turnaround', value: '48 Hours' },
      { label: 'Quantity', value: '10,000 Menus' },
      { label: 'Issue', value: 'Pricing Errors + Misspelling' },
      { label: 'Follow-Up', value: '3,000-Piece EDDM' },
    ],
    servicesUsed: ['Printing', 'EDDM', 'Graphic Design'],
    relatedServices: ['printing', 'eddm', 'graphic-design'],
  },
  {
    title: 'National Magazine at Periodical Rate',
    slug: 'national-magazine-periodical',
    client: "O'Dwyer's Public Relations",
    location: 'National',
    industry: 'Publishing',
    services: ['Mailing', 'Data Lists'],
    image: '/images/wp/case-studies/odwyerslogo.jpg',
    imageAlt: "O'Dwyer's Public Relations logo",
    challenge: "O'Dwyer's, a well-known national public relations industry publication, needed a mailing partner who could handle their monthly magazine distribution at USPS Periodical rates. Periodical mail has strict USPS requirements around frequency, content ratios (advertising vs. editorial), and documentation that many mail houses find too complex to manage.",
    solution: 'Cornerstone took over all Periodical mail preparation for the monthly magazine. This included maintaining the subscriber database with regular NCOA processing, preparing Statement of Mailing (PS Form 3541) for each issue, calculating advertising-to-editorial content ratios for rate determination, presorting per Periodical mail regulations, and handling all USPS entry documentation.',
    results: "O'Dwyer's has relied on Cornerstone for their national magazine distribution for multiple years. Our handling of the complex Periodical mail requirements ensures every issue ships on time and at the lowest available postage rate. The relationship demonstrates Cornerstone's ability to handle specialized, regulation-heavy mail types that go well beyond standard Marketing Mail.",
    keyMetrics: [
      { label: 'Distribution', value: 'National' },
      { label: 'Frequency', value: 'Monthly' },
      { label: 'Mail Class', value: 'USPS Periodical' },
      { label: 'Compliance', value: 'PS Form 3541' },
    ],
    servicesUsed: ['Mailing', 'Data Lists'],
    relatedServices: ['mailing', 'data-lists'],
  },
  {
    title: 'Direct Mail Strategy for Lawrence Hearing',
    slug: 'lawrence-hearing',
    client: 'Lawrence Hearing',
    location: 'Orange County, NY',
    industry: 'Healthcare',
    services: ['Direct Mail', 'Data Lists', 'Graphic Design', 'Printing', 'Mailing'],
    image: '/images/wp/case-studies/Creating-a-unique-data-solution-768x778.jpg.webp',
    imageAlt: 'Lawrence Hearing direct mail campaign',
    challenge: 'Lawrence Hearing, an audiology practice in Orange County, needed to grow their patient base in a competitive healthcare market. They had previously relied on physician referrals and wanted to add direct-to-consumer marketing to reach adults over 55 who may be experiencing hearing loss but had not yet sought treatment.',
    solution: 'Cornerstone developed a targeted direct mail campaign using purchased data lists filtered for age (55+), household income, and homeownership in the Orange County area. We designed a professional oversized postcard highlighting free hearing assessments with a clear call-to-action. The campaign was repeated quarterly to reinforce awareness and build familiarity with the practice.',
    results: 'Lawrence Hearing reported a measurable increase in new patient appointments following each mailing. The quarterly cadence helped establish consistent brand recognition in the community. The direct mail program became a core part of their marketing strategy, complementing their existing referral network with a reliable patient acquisition channel.',
    keyMetrics: [
      { label: 'Target Demo', value: 'Adults 55+' },
      { label: 'Format', value: 'Oversized Postcard' },
      { label: 'Cadence', value: 'Quarterly' },
      { label: 'Area', value: 'Orange County, NY' },
    ],
    servicesUsed: ['Data Lists', 'Graphic Design', 'Printing', 'Mailing'],
    relatedServices: ['direct-mail', 'data-lists', 'graphic-design'],
  },
  {
    title: 'Waste Management Customer Notifications',
    slug: 'waste-management',
    client: 'Regional Waste Management Provider',
    location: 'Regional (Multi-County)',
    industry: 'Waste Management',
    services: ['Printing', 'Mailing', 'Data Lists'],
    image: '/images/wp/case-studies/Waste-Management-Logo-scaled-1.webp',
    imageAlt: 'Waste Management logo',
    challenge: 'A regional waste management company needed to notify thousands of residential customers across multiple counties about service schedule changes, rate adjustments, and new recycling program guidelines. The notifications needed to reach every customer household on time, with different versions for different service zones, and comply with regulatory notification requirements.',
    solution: 'Cornerstone handled the variable-data printing, producing customized letters for each service zone with zone-specific schedules and rate information. We processed the company\'s customer database through CASS/DPV validation and NCOA move-update to ensure maximum deliverability, then presorted the mailing for optimal postage rates across multiple ZIP codes and counties.',
    results: 'All notifications were delivered within the required notification window. The variable-data approach ensured each customer received accurate, zone-specific information rather than a generic notice. The waste management company has since used Cornerstone for all customer communications, including annual rate notices, service change alerts, and recycling education materials.',
    keyMetrics: [
      { label: 'Coverage', value: 'Multi-County' },
      { label: 'Type', value: 'Variable-Data Letters' },
      { label: 'Processing', value: 'CASS/DPV + NCOA' },
      { label: 'Compliance', value: 'Regulatory Notification' },
    ],
    servicesUsed: ['Printing', 'Mailing', 'Data Lists'],
    relatedServices: ['mailing', 'printing', 'data-lists'],
  },
  {
    title: 'Daughters of the American Revolution',
    slug: 'daughters-american-revolution',
    client: 'DAR (Daughters of the American Revolution)',
    location: 'National',
    industry: 'Non-Profit',
    services: ['Non-Profit Mailing', 'Printing', 'Data Lists', 'Mailing'],
    image: '/images/wp/case-studies/darlogo.jpg',
    imageAlt: 'Daughters of the American Revolution logo',
    challenge: 'The Daughters of the American Revolution, a national lineage-based membership organization, needed a mailing partner capable of handling large-volume membership communications and fundraising appeals at non-profit postage rates. Their mailings required precise list segmentation (active members, lapsed members, prospective members) and compliance with USPS non-profit content regulations.',
    solution: 'Cornerstone managed the full direct mail production for DAR — from list segmentation and data processing through printing, assembly, and non-profit presort mailing. We processed their membership database with NCOA updates, segmented by chapter and membership status, and printed personalized appeal letters with variable donation history. All mailings were entered under DAR\'s non-profit mailing permit at the lowest available rates.',
    results: 'DAR\'s mailings consistently achieved strong deliverability rates due to our NCOA processing and address validation. The organization benefited from significant postage savings through non-profit rates and our optimized presort processing. Cornerstone\'s ability to handle national-scale mailings with precise segmentation made them a reliable long-term partner for DAR\'s membership and development programs.',
    keyMetrics: [
      { label: 'Scope', value: 'National' },
      { label: 'Mail Class', value: 'Non-Profit Marketing Mail' },
      { label: 'Personalization', value: 'Variable Donation History' },
      { label: 'Segmentation', value: 'Chapter + Status' },
    ],
    servicesUsed: ['Non-Profit Mailing', 'Printing', 'Data Lists', 'Mailing'],
    relatedServices: ['non-profit-mailing', 'mailing', 'data-lists'],
  },
  {
    title: 'National Industrial Product Recall',
    slug: 'national-product-recall',
    client: 'Robertshaw Controls',
    location: 'Global',
    industry: 'Manufacturing',
    services: ['Printing', 'Mailing', 'Data Lists'],
    image: '/images/wp/case-studies/RobertShaw-Web-Preview.jpg.webp',
    imageAlt: 'Robertshaw Controls web preview',
    challenge: 'Robertshaw Controls, a global manufacturer of industrial thermostats and control devices, faced a mandatory product recall requiring urgent notification to thousands of customers, distributors, and end-users across the United States. The recall had regulatory deadlines, and every affected party needed to receive the notification within a strict timeline. Failure to meet the notification window could result in regulatory penalties and continued safety risk.',
    solution: 'Cornerstone executed a rapid-turnaround recall notification mailing. We processed Robertshaw\'s customer database (a mix of commercial distributors, retailers, and some end-consumers), validated addresses through CASS/DPV, and printed First-Class letters with enclosed recall instructions and response cards. The entire mailing — from data receipt to USPS entry — was completed on an accelerated schedule to meet the regulatory deadline.',
    results: 'All recall notifications were mailed within the required compliance window. First-Class Mail ensured fast delivery with return service for undeliverable addresses, allowing Robertshaw to track notification reach. The project demonstrated Cornerstone\'s ability to handle high-stakes, time-critical mailings where accuracy and speed are non-negotiable — a capability that goes well beyond typical marketing direct mail.',
    keyMetrics: [
      { label: 'Priority', value: 'Regulatory Deadline' },
      { label: 'Mail Class', value: 'First-Class' },
      { label: 'Scope', value: 'National' },
      { label: 'Turnaround', value: 'Accelerated' },
    ],
    servicesUsed: ['Printing', 'Mailing', 'Data Lists'],
    relatedServices: ['mailing', 'printing', 'data-lists'],
  },
  {
    title: 'British-American Collegiate Association',
    slug: 'british-american-collegiate',
    client: 'Winant-Clayton Volunteers',
    location: 'International',
    industry: 'Education / Non-Profit',
    services: ['Non-Profit Mailing', 'Printing', 'Mailing'],
    image: '/images/wp/case-studies/winantlogo.jpg',
    imageAlt: 'Winant-Clayton Volunteers logo',
    challenge: 'The Winant-Clayton Volunteers, a British-American exchange program that places young volunteers in community service projects, needed to produce and mail annual fundraising appeals and program updates to alumni, donors, and supporters both in the United States and the United Kingdom. International mailing added complexity in postal regulations, addressing formats, and postage rates.',
    solution: 'Cornerstone produced the fundraising appeals and program newsletters, handling the U.S. domestic mailing through standard non-profit presort channels and coordinating the international component for U.K. recipients. We managed address formatting for both USPS and Royal Mail standards, applied appropriate postage for international flats, and ensured all content met non-profit mailing regulations.',
    results: 'The organization successfully reached supporters on both sides of the Atlantic with a cohesive, professional appeal. The U.S. domestic portion benefited from non-profit postage rates, while the international component was handled efficiently through our postal logistics coordination. Winant-Clayton has continued their relationship with Cornerstone for annual mailings.',
    keyMetrics: [
      { label: 'Reach', value: 'US + UK' },
      { label: 'Domestic Rate', value: 'Non-Profit' },
      { label: 'International', value: 'Royal Mail Compliant' },
      { label: 'Frequency', value: 'Annual' },
    ],
    servicesUsed: ['Non-Profit Mailing', 'Printing', 'Mailing'],
    relatedServices: ['non-profit-mailing', 'mailing', 'printing'],
  },
  {
    title: 'Retail Furniture Store EDDM Campaign',
    slug: 'retail-furniture-store',
    client: 'Hudson Valley Furniture Retailer',
    location: 'Hudson Valley, NY',
    industry: 'Retail',
    services: ['EDDM', 'Graphic Design', 'Printing'],
    image: '/images/wp/case-studies/classicslogo.jpg',
    imageAlt: 'Retail furniture store logo',
    challenge: 'A Hudson Valley furniture store wanted to drive foot traffic during a seasonal clearance event. They had no existing mailing list and a limited marketing budget. They needed to reach as many local homeowners as possible within a tight radius of their showroom without the cost of purchasing a targeted data list.',
    solution: 'Cornerstone recommended an EDDM campaign as the most cost-effective approach. We selected carrier routes within a 10-mile radius of the store, focusing on residential routes with higher median household incomes. We designed an oversized 8.5" x 11" postcard featuring sale items, store hours, and a map to the showroom. The EDDM approach meant no list purchase was needed — every household on the selected routes received the piece.',
    results: 'The store reported a noticeable increase in showroom traffic during the sale event, with multiple customers specifically mentioning the postcard. The all-in cost per household reached was significantly lower than comparable digital advertising, and the physical postcard had staying power — some customers brought the card into the store days after receiving it. The retailer has since run EDDM campaigns for seasonal events throughout the year.',
    keyMetrics: [
      { label: 'Format', value: '8.5" × 11" Postcard' },
      { label: 'Radius', value: '10 Miles' },
      { label: 'Targeting', value: 'EDDM (No List Needed)' },
      { label: 'Result', value: 'Increased Foot Traffic' },
    ],
    servicesUsed: ['EDDM', 'Graphic Design', 'Printing'],
    relatedServices: ['eddm', 'graphic-design', 'printing'],
  },
  {
    title: 'Cintas EDDM Recruitment Campaign',
    slug: 'cintas-recruitment',
    client: 'Cintas Corporation',
    location: 'Ladson, SC',
    industry: 'Corporate / Recruitment',
    services: ['EDDM', 'Graphic Design', 'Printing'],
    image: '/images/wp/case-studies/cintaslogo-1-scaled-1.webp',
    imageAlt: 'Cintas Corporation logo',
    challenge: 'Cintas, a Fortune 500 uniform and workplace services company, needed to recruit hourly workers for a facility in Ladson, South Carolina. Their online job postings were not generating enough qualified local applicants, and they needed a way to reach residents in neighborhoods surrounding their facility who might not be actively searching job boards.',
    solution: 'Cornerstone designed and executed an EDDM recruitment campaign targeting carrier routes within commuting distance of the Cintas Ladson facility. We designed a professional recruitment postcard highlighting starting wages, benefits, and a QR code linking to the online application. The EDDM approach ensured every household in the target area received the opportunity — reaching passive job seekers who wouldn\'t have seen an online posting.',
    results: 'Cintas reported a measurable uptick in applications from the Ladson area following the mailing, with applicants specifically citing the postcard as their first awareness of the opportunity. The campaign demonstrated that EDDM is effective not just for consumer marketing but also for local recruitment — especially for hourly and skilled-trade positions where candidates may not be actively searching online.',
    keyMetrics: [
      { label: 'Client', value: 'Fortune 500 Company' },
      { label: 'Purpose', value: 'Recruitment' },
      { label: 'Format', value: 'EDDM Postcard + QR Code' },
      { label: 'Market', value: 'Ladson, SC' },
    ],
    servicesUsed: ['EDDM', 'Graphic Design', 'Printing'],
    relatedServices: ['eddm', 'graphic-design', 'printing'],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES_FULL.find(cs => cs.slug === slug);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return CASE_STUDIES_FULL.filter(cs => cs.industry === industry);
}
