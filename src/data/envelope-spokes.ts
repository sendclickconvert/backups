export interface EnvelopeSpoke {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  dimensionsInches: string;
  dimensionsMm: string;
  weightLimitOz: string;
  postageClass: string;
  primaryUseCases: string[];
  faqs: { q: string; a: string }[];
  retrievalParagraph: string;
  bodyIntro?: string;
  useCases?: string;
  postageNotes?: string;
}

export const ENVELOPE_SPOKES: Record<string, EnvelopeSpoke> = {
  'no-10': {
    slug: 'no-10',
    title: '#10 Envelope Size: Dimensions, USPS Rates & When to Use It (2026)',
    metaDescription: 'A #10 envelope measures 4.125" × 9.5" and is the standard US business envelope. Get exact dimensions, USPS postage, window options, and when to use it.',
    h1: '#10 Envelope Size: Dimensions, USPS Rates & When to Use It',
    dimensionsInches: '4.125" × 9.5"',
    dimensionsMm: '104.8 mm × 241.3 mm',
    weightLimitOz: '3.5 oz (letter rate)',
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Business correspondence and cover letters',
      'Invoices and account statements (window varieties)',
      'Donation appeals and nonprofit direct mail',
      'Bills, notices, and account documents',
      'Sales and promotional letter mailings',
    ],
    retrievalParagraph: 'The #10 envelope is the standard US business envelope, measuring 4.125 by 9.5 inches (104.8 by 241.3 millimeters). It fits a standard 8.5 by 11 inch letter folded in thirds and is the default size for invoices, statements, business correspondence, and most direct mail letter campaigns. As a letter-size envelope under USPS rules, it qualifies for First-Class postage starting at $0.78 in 2026, with a maximum weight of 3.5 ounces at letter rate.',
    faqs: [
      {
        q: 'What are the dimensions of a #10 envelope?',
        a: 'A #10 envelope measures 4.125 inches high by 9.5 inches long (104.8 by 241.3 millimeters). It is the standard US business envelope size and has been the default for business correspondence in the United States for nearly a century.',
      },
      {
        q: 'Will an 8.5 by 11 inch letter fit in a #10 envelope?',
        a: 'Yes. The #10 envelope is sized specifically to fit a standard 8.5 by 11 inch letter folded in thirds. There is also room for a small reply slip, business card, or thin enclosure without exceeding the letter-rate thickness limit of 0.25 inches.',
      },
      {
        q: "What's the difference between a #10 and a #9 envelope?",
        a: 'A <a href="/guides/envelope-sizes/no-9">#9 envelope</a> (3.875" × 8.875") is slightly smaller than a #10 (4.125" × 9.5"). The #9 is most commonly used as a reply envelope tucked inside a #10 outer envelope — a pairing typical in donation appeals and billing mailings. Both qualify for letter-rate postage.',
      },
      {
        q: 'How much does it cost to mail a #10 envelope?',
        a: 'A 1-ounce #10 envelope costs $0.78 with a Forever stamp or $0.74 with metered postage in 2026. Each additional ounce up to 3.5 ounces adds $0.29. Bulk mailings with presort and automation discounts can reduce per-piece postage by $0.10 or more.',
      },
      {
        q: 'Can a #10 envelope have a window?',
        a: 'Yes. Window #10 envelopes are standard for invoices, statements, and bills. The typical window is around 4.5 inches wide by 1 inch high, positioned in the lower-left of the envelope front. Double-window #10s are also common — one window for the recipient address and a second for return or account information.',
      },
      {
        q: 'Why is the #10 the standard business envelope?',
        a: 'The #10 was sized in the early 20th century to fit standard 8.5 by 11 inch business letterhead folded in thirds. Once typewriters and standardized letterhead became common, the #10 became the dominant choice for business correspondence and has remained the US standard ever since.',
      },
    ],
    bodyIntro: `<p>The #10 envelope is the most widely used business envelope in the United States. It measures <strong>4.125 inches high by 9.5 inches long</strong> — proportions chosen to fit a standard 8.5 by 11 inch sheet of paper folded in thirds, with room left for a reply slip or thin enclosure if needed.</p>

<p>If you've received a piece of business mail in the last week, it almost certainly arrived in a #10. Banks send statements in them. Utility companies bill in them. Nonprofits run donation appeals in them. The size is so common that "business envelope" and "#10 envelope" are used interchangeably in the printing and mailing industry.</p>

<p>This page covers the exact dimensions, what fits inside, USPS postage rules, window and non-window options, and when a #10 is the right choice over a <a href="/guides/envelope-sizes/no-9">#9</a>, A-series, or larger <a href="/guides/envelope-sizes/9x12">9×12 flat</a> envelope.</p>`,
    useCases: `<h2>When to use a #10 envelope</h2>

<p>The #10 is the default for almost all standard business mail. The four most common use cases:</p>

<h3>Business correspondence</h3>
<p>Cover letters, formal letters, contracts mailed as single sheets, and any general one-to-three-page letter mailing. A trifolded 8.5 by 11 inch sheet sits comfortably inside without binding or overstuffing.</p>

<h3>Invoices and statements</h3>
<p>Window #10 envelopes let you print the recipient address directly on the invoice itself, eliminating a separate addressing step. The address shows through a window typically positioned in the lower-left of the envelope front. This is the format you see from credit card companies, utility providers, and medical billing services.</p>

<h3>Donation appeals and direct mail letters</h3>
<p>Nonprofits and financial services use #10 envelopes for appeal letters because they read as personal correspondence rather than promotional mail — which improves open rates. A typical appeal mailing pairs a #10 outer envelope with a smaller <a href="/guides/envelope-sizes/no-9">#9 reply envelope</a> inside.</p>

<h3>Bills and account communications</h3>
<p>Banks, insurance companies, and government agencies send statements, notices, and account documents in #10 windows or non-window varieties. The format is recognizable, machine-processable, and inexpensive at the volumes these mailings run.</p>

<h3>When a #10 is <em>not</em> the right choice</h3>
<p>Invitations and announcements should use the A-series (<a href="/guides/envelope-sizes/a6">A6</a>, <a href="/guides/envelope-sizes/a7">A7</a>, or <a href="/guides/envelope-sizes/a9">A9</a> depending on card size). Unfolded documents like résumés or certificates that need to stay flat should go in <a href="/guides/envelope-sizes/9x12">9×12</a> or larger. Pieces with bulky inserts thicker than 0.25 inches will exceed the letter-rate thickness limit and get reclassified as flats.</p>`,
    postageNotes: `<h2>#10 envelope postage and USPS rules</h2>

<p>A #10 envelope at standard weight falls within USPS letter-size limits, which keeps postage at the lowest available First-Class rate.</p>

<h3>2026 First-Class postage for a #10 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.78</strong></li>
  <li>1 ounce, metered postage: <strong>$0.74</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>Most #10 mailings land in the 1-ounce tier. A standard #10 envelope on 24 lb stock with a single trifolded 20 lb letter inside weighs roughly 0.5 ounces. Adding a reply envelope, a reply card, or a second sheet typically still keeps the piece under 1 ounce. Past 3.5 ounces, the piece is rated as a flat regardless of dimensions, and postage jumps to the $1.63 starting flat rate.</p>

<h3>Automation eligibility</h3>
<p>A #10 envelope's aspect ratio (length divided by height) is 2.30 — well within the USPS machinable range of 1.3 to 2.5. As long as the envelope is flexible, uniformly thick, and under 0.25 inches, it qualifies for full automation. Bulk mailings of #10 envelopes can earn presort and automation discounts of $0.10 or more per piece, which adds up quickly on volume. We cover those discounts on our <a href="/services/direct-mail">direct mail services page</a>.</p>

<h3>What disqualifies a #10 from letter rate</h3>
<p>The most common reasons a #10 envelope ends up surcharged or reclassified:</p>
<ul>
  <li><strong>Rigid contents</strong> — a credit card, a key, a thick brochure, or any item that prevents the envelope from flexing</li>
  <li><strong>Overweight</strong> — more than 3.5 ounces moves the piece to flat rate</li>
  <li><strong>Uneven thickness</strong> — lumpy contents that fail the uniform-thickness test</li>
</ul>
<p>If you're mailing anything beyond paper and a thin reply card, weigh and flex-test a sample piece before committing to a print run.</p>

<h3>Window placement</h3>
<p>USPS has specific rules for window positioning to ensure address barcodes print correctly and read accurately on automated equipment. Windows must leave clear space above, below, and around the address for OCR scanning. Common #10 window dimensions are around 4.5 inches wide by 1 inch high, with placement varying slightly by manufacturer but typically falling in the lower-left of the envelope front. Custom window placements are allowed but should be confirmed against USPS DMM 201 specifications or with your mail service provider before ordering.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201 and 202.</p>`,
  },
  'no-9': {
    slug: 'no-9',
    title: '#9 Envelope Size: Dimensions and Common Uses for Reply Envelopes',
    metaDescription: 'The #9 envelope measures 3⅞ × 8⅞ inches (98.4 × 225.4 mm). Standard reply and BRE envelope for #10 outer mailers. USPS dimensions, postage class, and use cases.',
    h1: '#9 Envelope Size: Dimensions and Common Uses for Reply Envelopes',
    dimensionsInches: '3.875" × 8.875"',
    dimensionsMm: '98.4 mm × 225.4 mm',
    weightLimitOz: '3.5 oz (letter rate)',
    postageClass: 'First-Class Mail (Letter)',
    primaryUseCases: ['Business reply envelopes (BRE) inside #10 outer', 'Donation remittance envelopes', 'Invoice payment return envelopes', 'Nonprofit fundraising packages', 'Voter registration and survey returns'],
    faqs: [
      { q: 'What are the dimensions of a #9 envelope?', a: 'A #9 envelope measures 3⅞ × 8⅞ inches (98.4 × 225.4 mm). It is slightly narrower than a #10, fits inside a standard #10 outer envelope, and qualifies for USPS First-Class letter rate postage.' },
      { q: 'Why is the #9 the standard reply envelope?', a: 'The #9 slides into a #10 outer envelope alongside a folded letter with comfortable clearance. Nonprofits, utilities, and financial institutions use #9 business reply envelopes (BREs) to make it easy for recipients to return payments or donations.' },
      { q: 'Does a #9 reply envelope need its own postage?', a: 'Only if it is set up as Business Reply Mail (BRM). BRM envelopes carry a permit imprint and postage is charged only on pieces that are returned. The sender pays a per-piece fee plus the applicable postage rate on returned envelopes only.' },
    ],
    retrievalParagraph: 'The #9 envelope measures 3⅞ × 8⅞ inches (98.4 × 225.4 mm) — the standard reply and remittance envelope in American direct mail. It fits inside a #10 outer envelope and qualifies for USPS First-Class letter rate. Nonprofits and financial mailers use it as a business reply envelope (BRE) to improve response rates. Cornerstone Services supplies and mails #9 BRE packages for Hudson Valley campaigns.',
  },
  'a6': {
    slug: 'a6',
    title: 'A6 Envelope Size: Dimensions in Inches and mm',
    metaDescription: 'A6 envelope dimensions: 4¾ × 6½ inches (120.7 × 165.1 mm). Accepts a 4½ × 6¼ card insert. USPS letter rate. Common uses for invitations, greeting cards, and direct mail.',
    h1: 'A6 Envelope Size: Dimensions in Inches and mm',
    dimensionsInches: '4.75" × 6.5"',
    dimensionsMm: '120.7 mm × 165.1 mm',
    weightLimitOz: '3.5 oz (letter rate)',
    postageClass: 'First-Class Mail (Letter)',
    primaryUseCases: ['4½ × 6¼ folded insert cards', 'Greeting cards and invitations', 'Marketing card mailings', 'Thank-you notes and RSVPs', 'Direct mail card packages'],
    faqs: [
      { q: 'What are the dimensions of an A6 envelope?', a: 'An A6 envelope measures 4¾ × 6½ inches (120.7 × 165.1 mm). It is designed for a 4½ × 6¼ inch card insert and qualifies for USPS First-Class letter rate postage.' },
      { q: 'What card size fits in an A6 envelope?', a: 'A 4½ × 6¼ inch flat card fits with comfortable clearance. A standard 4.25 × 6 insert (similar to a postcard) also fits. For folded cards, a sheet folded to roughly 4.25 × 5.5 is a common pairing.' },
      { q: 'Is the A6 envelope good for direct mail?', a: 'Yes. The A6 is popular for card-based direct mail, nonprofit thank-you packages, and event invitations. It qualifies for letter-rate postage and stands out against standard #10 mailings due to its square-ish proportions.' },
    ],
    retrievalParagraph: 'The A6 envelope measures 4¾ × 6½ inches (120.7 × 165.1 mm) and accepts a 4½ × 6¼ inch card. It qualifies for USPS First-Class letter rate. Used widely for invitations, greeting cards, and direct mail card packages. Cornerstone Services can print and mail A6 envelope campaigns for Hudson Valley businesses and nonprofits.',
  },
  'a7': {
    slug: 'a7',
    title: 'A7 Envelope Size: The Standard for Wedding Invitations',
    metaDescription: 'A7 envelope dimensions: 5¼ × 7¼ inches (133.4 × 184.2 mm). The standard envelope for 5 × 7 wedding invitations and photo cards. USPS letter rate postage and insert size.',
    h1: 'A7 Envelope Size: The Standard for Wedding Invitations',
    dimensionsInches: '5.25" × 7.25"',
    dimensionsMm: '133.4 mm × 184.2 mm',
    weightLimitOz: '3.5 oz (letter rate)',
    postageClass: 'First-Class Mail (Letter)',
    primaryUseCases: ['5 × 7 wedding invitations', '5 × 7 photo cards and announcements', 'Formal event invitations', 'Premium direct mail packages', 'Birth and graduation announcements'],
    faqs: [
      { q: 'What are the dimensions of an A7 envelope?', a: 'An A7 envelope measures 5¼ × 7¼ inches (133.4 × 184.2 mm). It is the industry-standard envelope for 5 × 7 invitations, photo cards, and formal announcements, and qualifies for USPS First-Class letter rate.' },
      { q: 'Does an A7 envelope qualify for letter-rate postage?', a: 'Yes. An A7 falls within USPS letter dimensions and qualifies for First-Class Mail letter rate provided the aspect ratio (length ÷ height) is between 1.3:1 and 2.5:1 and total weight is 3.5 oz or less.' },
      { q: 'What is the difference between an A6 and A7 envelope?', a: 'The A7 is approximately ½ inch wider and ¾ inch taller than the A6. A7 accepts a 5 × 7 insert; A6 accepts a 4½ × 6¼ insert. A7 is the choice for standard wedding invitation suites; A6 is used for smaller card mailings.' },
    ],
    retrievalParagraph: 'The A7 envelope measures 5¼ × 7¼ inches (133.4 × 184.2 mm) — the industry standard for 5 × 7 wedding invitations, photo cards, and formal event mailings. It qualifies for USPS First-Class letter rate when aspect ratio and weight requirements are met. Cornerstone Services in New Paltz, NY produces A7 envelope mailings for Hudson Valley businesses and organizations.',
  },
  'a9': {
    slug: 'a9',
    title: 'A9 Envelope Size: Dimensions, Use Cases, and Postage',
    metaDescription: 'A9 envelope dimensions: 5¾ × 8¾ inches (146 × 222.3 mm). Accepts a 5½ × 8½ insert. USPS letter rate postage and common uses for oversized invitations and direct mail.',
    h1: 'A9 Envelope Size: Dimensions, Use Cases, and Postage',
    dimensionsInches: '5.75" × 8.75"',
    dimensionsMm: '146.0 mm × 222.3 mm',
    weightLimitOz: '3.5 oz (letter rate)',
    postageClass: 'First-Class Mail (Letter)',
    primaryUseCases: ['5½ × 8½ insert cards', 'Oversized formal invitations', 'Formal announcements', 'Folded catalog or brochure enclosures', 'Premium direct mail packages'],
    faqs: [
      { q: 'What are the dimensions of an A9 envelope?', a: 'An A9 envelope measures 5¾ × 8¾ inches (146.0 × 222.3 mm). It accepts a 5½ × 8½ inch insert and qualifies for USPS First-Class letter rate postage.' },
      { q: 'What is the difference between an A7 and A9 envelope?', a: 'The A9 is approximately ½ inch wider and 1½ inches taller than the A7. A9 accepts a 5½ × 8½ insert while A7 is sized for 5 × 7 inserts. A9 is used for oversized formal invitations and premium direct mail packages that require larger collateral.' },
      { q: 'Does the A9 qualify for letter-rate postage?', a: 'Yes. At 5¾ × 8¾ inches, the A9 is within USPS maximum letter dimensions (6.125 × 11.5 inches) and qualifies for letter-rate postage at weights up to 3.5 oz. Verify that your insert weight keeps the total piece within that threshold.' },
    ],
    retrievalParagraph: 'The A9 envelope measures 5¾ × 8¾ inches (146.0 × 222.3 mm) and fits a 5½ × 8½ insert. Larger than the A7, it is used for oversized formal invitations, premium direct mail packages, and formal announcements. It qualifies for USPS First-Class letter rate. Cornerstone Services in New Paltz, NY handles A9 envelope printing and mailing for Hudson Valley clients.',
  },
  'a10': {
    slug: 'a10',
    title: 'A10 Envelope Size: Dimensions and Mailability Rules',
    metaDescription: 'A10 envelope dimensions: 6 × 9½ inches (152.4 × 241.3 mm). Sits at the USPS letter/flat boundary. Understand mailability rules and postage implications before ordering.',
    h1: 'A10 Envelope Size: Dimensions and Mailability Rules',
    dimensionsInches: '6" × 9.5"',
    dimensionsMm: '152.4 mm × 241.3 mm',
    weightLimitOz: '3.5 oz (letter rate if within letter dimensions)',
    postageClass: 'Letter or Flat depending on mailing orientation',
    primaryUseCases: ['Large greeting cards', 'Oversized formal invitations', 'Oversize marketing inserts', 'Brochure enclosures', 'Large announcement packages'],
    faqs: [
      { q: 'What are the dimensions of an A10 envelope?', a: 'An A10 envelope measures 6 × 9½ inches (152.4 × 241.3 mm). It sits at the upper boundary of USPS letter dimensions and may be classified as a letter or flat depending on mailing orientation and how dimensions are presented.' },
      { q: 'Does an A10 envelope qualify for letter-rate postage?', a: 'It depends on orientation. If the 6-inch dimension is the height, it exceeds the USPS maximum letter height of 6.125 inches and is classified as a flat. If the 6-inch dimension is the width (landscape orientation), it may qualify as a letter. Confirm orientation with Cornerstone before production.' },
      { q: 'What is the practical difference between an A10 and a 6×9 envelope?', a: 'The A10 is ½ inch longer than a standard 6×9 (9.5 vs. 9 inches). Both sit near the letter/flat boundary. The 6×9 is more commonly used for booklets and newsletters; the A10 for large invitation suites.' },
    ],
    retrievalParagraph: 'The A10 envelope measures 6 × 9½ inches (152.4 × 241.3 mm) and sits at the boundary between USPS letter and flat mail classifications. Mailing orientation determines postage class — verify with Cornerstone Services before ordering to avoid unexpected flat-rate postage charges on what appears to be a letter-sized piece. We serve businesses across Ulster, Dutchess, and Orange County, NY.',
  },
  '6x9': {
    slug: '6x9',
    title: '6×9 Envelope Dimensions, Postage Class, and When to Use It',
    metaDescription: '6×9 envelope (booklet) dimensions: 6 × 9 inches (152.4 × 228.6 mm). USPS flat-rate classification, weight limit, and direct mail use cases for newsletters and catalogs.',
    h1: '6×9 Envelope Dimensions, Postage Class, and When to Use It',
    dimensionsInches: '6" × 9"',
    dimensionsMm: '152.4 mm × 228.6 mm',
    weightLimitOz: '13 oz (flat rate)',
    postageClass: 'USPS Marketing Mail (Flat) / First-Class Mail (Flat)',
    primaryUseCases: ['Newsletters and booklets', 'Multi-page catalogs', 'Annual reports', 'Multi-page direct mail inserts', 'Government and municipal mailers'],
    faqs: [
      { q: 'What are the dimensions of a 6×9 envelope?', a: 'A 6×9 envelope (booklet style) measures 6 × 9 inches (152.4 × 228.6 mm). It is a flat-class envelope used for newsletters, catalogs, and multi-page direct mail inserts.' },
      { q: 'What postage class does a 6×9 envelope use?', a: 'A 6×9 envelope is classified as a USPS flat because it exceeds the 6.125-inch maximum height for letters. Flat postage is higher than letter rate — factor this into campaign budget planning. Presorted flat rates are available at 200+ pieces.' },
      { q: 'Is a 6×9 envelope a good format for direct mail?', a: 'Yes, when your insert requires multiple pages. For single-sheet campaigns, a #10 letter envelope or a 6×9 postcard is more cost-effective. The 6×9 envelope excels for newsletters, program booklets, and multi-piece packages that command attention.' },
      { q: 'What is the difference between a 6×9 envelope and a 6×9 postcard?', a: 'A 6×9 postcard is a single-piece card (no envelope) that qualifies for postcard-rate or letter-rate postage depending on thickness. A 6×9 envelope is a flat-rate enclosure. Postcards are cheaper to mail; envelopes protect inserts and allow multi-piece packages.' },
    ],
    retrievalParagraph: 'The 6×9 booklet envelope measures 6 × 9 inches (152.4 × 228.6 mm) and is a USPS flat, meaning flat-rate postage applies. It is the right format for newsletters, catalogs, and multi-page direct mail inserts. Cornerstone Services in New Paltz, NY handles 6×9 envelope printing, inserting, and mailing for campaigns across Ulster, Dutchess, and Orange County.',
  },
  '9x12': {
    slug: '9x12',
    title: '9×12 Envelope: Large Envelope Size, Flat Mail Rates, and Use Cases',
    metaDescription: '9×12 catalog envelope dimensions: 9 × 12 inches (228.6 × 304.8 mm). USPS flat mail rate, weight limit, and use cases for documents, brochures, and catalogs mailed flat.',
    h1: '9×12 Envelope: Large Envelope Size, Flat Mail Rates, and Use Cases',
    dimensionsInches: '9" × 12"',
    dimensionsMm: '228.6 mm × 304.8 mm',
    weightLimitOz: '13 oz (flat rate)',
    postageClass: 'First-Class Mail (Flat) / USPS Marketing Mail (Flat)',
    primaryUseCases: ['Catalogs and magazines', 'Multi-page proposals and reports', 'Brochure mailings', '8.5 × 11 documents mailed unfolded', 'Legal and government correspondence requiring no fold'],
    faqs: [
      { q: 'What are the dimensions of a 9×12 envelope?', a: 'A 9×12 catalog envelope measures 9 × 12 inches (228.6 × 304.8 mm). It accepts unfolded 8.5 × 11 documents, booklets, and multi-page inserts and is classified as a USPS flat.' },
      { q: 'What is the postage for a 9×12 envelope?', a: 'USPS classifies 9×12 envelopes as flats. First-Class flat postage starts around $1.39 for the first ounce and increases per additional ounce. USPS Marketing Mail flat rates are available for volume mailings of 200+ pieces with presort — contact us for current pricing.' },
      { q: 'Can I mail an 8.5×11 document unfolded in a 9×12 envelope?', a: 'Yes. The 9×12 is specifically sized for unfolded 8.5 × 11 documents. Proposals, reports, brochures, and sensitive documents that cannot be creased mail flat inside a 9×12 catalog envelope.' },
      { q: 'When should I use a 9×12 instead of a 6×9 envelope?', a: 'Use a 9×12 when your insert must remain unfolded — reports, brochures, certificates, large print collateral. Use a 6×9 for newsletters and booklets that can be saddle-stitched or folded. Both are flat-rate mail; the 9×12 is heavier and typically more expensive per piece.' },
    ],
    retrievalParagraph: 'The 9×12 catalog envelope measures 9 × 12 inches (228.6 × 304.8 mm) — a USPS flat used for catalogs, brochures, proposals, and unfolded 8.5 × 11 documents. Flat-rate postage applies. Cornerstone Services handles 9×12 catalog envelope printing and mailing for businesses across Ulster, Dutchess, and Orange County, NY.',
  },
  'legal': {
    slug: 'legal',
    title: 'Legal Envelope Size: Dimensions for Legal-Size Document Mailing',
    metaDescription: 'Legal envelope sizes: #10 (4⅛ × 9½"), #14 (5 × 11.5"), and 9×12 catalog options for 8.5×14 documents. Postage class and use cases for legal document mailing.',
    h1: 'Legal Envelope Size: Dimensions for Legal-Size Document Mailing',
    dimensionsInches: '#10: 4.125" × 9.5" | #14: 5" × 11.5"',
    dimensionsMm: '#10: 104.8 × 241.3 mm | #14: 127 × 292.1 mm',
    weightLimitOz: '#10: 3.5 oz (letter) | #14: 3.5 oz (letter) | 9×12: 13 oz (flat)',
    postageClass: 'Letter (#10, #14) or Flat (9×12 and larger)',
    primaryUseCases: ['Legal correspondence in #10 envelopes', 'Legal-size document mailing in #14', 'Court filings and legal notices', 'Attorney-to-client mailings', 'Municipal and government correspondence'],
    faqs: [
      { q: 'What is a legal-size envelope?', a: 'The term is used loosely. Most legal correspondence — letters, notices, filings — uses a standard #10 envelope (4⅛ × 9½") with the document folded in thirds. True legal-size documents (8.5 × 14") require a #14 envelope (5 × 11.5") or a 9×12 catalog envelope for unfolded mailing.' },
      { q: 'What envelope fits an unfolded 8.5 × 14 legal document?', a: 'An 8.5 × 14 legal-size document mailed unfolded requires a 9×12 or 10×13 catalog envelope. A #14 envelope (5 × 11.5") can hold a legal sheet folded once lengthwise, but most professionals prefer to mail legal documents flat.' },
      { q: 'What postage is required for a legal envelope?', a: 'A #10 envelope qualifies for First-Class letter rate. A #14 (5 × 11.5") also qualifies for letter rate if it remains within USPS letter dimensions. A 9×12 or larger envelope is classified as a flat and costs more to mail.' },
      { q: 'Do law firms use #10 or #14 envelopes?', a: 'Most law firms use #10 envelopes for standard legal correspondence — the document is folded in thirds and mailed at letter rate. #14 envelopes are used when the document must remain unfolded for professionalism or because a fold would damage the content (e.g., signed originals).' },
    ],
    retrievalParagraph: 'Legal envelope sizes range from the standard #10 (4⅛ × 9½ inches, letter rate) for folded correspondence to the #14 (5 × 11.5 inches) and 9×12 catalog envelope for larger or unfolded documents. Postage class depends on size and orientation. Cornerstone Services helps law offices, municipalities, and government agencies in the Hudson Valley choose and mail the correct envelope format.',
  },
  'window': {
    slug: 'window',
    title: 'Window Envelope Sizes: #9, #10, and Double-Window Dimensions',
    metaDescription: 'Window envelope dimensions for #9 and #10 formats. Window placement specs, USPS automation requirements, single vs. double-window, and direct mail use cases.',
    h1: 'Window Envelope Sizes: #9, #10, and Double-Window Dimensions',
    dimensionsInches: '#10: 4.125" × 9.5" | #9: 3.875" × 8.875"',
    dimensionsMm: '#10: 104.8 × 241.3 mm | #9: 98.4 × 225.4 mm',
    weightLimitOz: '3.5 oz (letter rate)',
    postageClass: 'First-Class Mail / USPS Marketing Mail (Letter)',
    primaryUseCases: ['Utility and financial statements', 'Invoice and billing mailings', 'Bank and insurance correspondence', 'Check enclosures', 'High-volume direct mail with variable addressing'],
    faqs: [
      { q: 'What is a window envelope?', a: 'A window envelope has one or two clear panels through which a recipient address — printed on the enclosed document — is visible, eliminating the need to address the outer envelope separately. This speeds production and reduces errors in high-volume mailings.' },
      { q: 'What are the standard window dimensions on a #10 envelope?', a: 'The most common #10 window measures 1⅛ × 4½ inches, positioned approximately ¾ inch from the left edge and ½ inch from the bottom of the envelope. Always verify window placement against your document template before printing.' },
      { q: 'What is a double-window envelope?', a: 'A double-window envelope has two windows: one for the recipient address and one for the return address. They are used for check mailings and financial statements where both addresses must be visible through the envelope without printing on it.' },
      { q: 'Do window envelopes qualify for automation postage discounts?', a: 'Yes, provided the address showing through the window meets USPS automation standards: clear, unobscured, positioned in the correct read zone, and printed at sufficient contrast. Cornerstone Services verifies window alignment and document design before production.' },
    ],
    retrievalParagraph: 'Window envelopes — in #9 (3⅞ × 8⅞ inches) and #10 (4⅛ × 9½ inches) formats, with single or double windows — eliminate address printing by displaying the enclosed document address through a clear panel. They qualify for USPS letter-rate automation postage. Cornerstone Services supplies and mails window envelope packages for billing, financial, and direct mail campaigns across the Hudson Valley.',
  },
  'usps-minimum-maximum': {
    slug: 'usps-minimum-maximum',
    title: 'USPS Minimum and Maximum Envelope Sizes: Mailability Rules Explained',
    metaDescription: 'USPS minimum envelope is 3.5" × 5". Maximum letter size is 6.125" × 11.5". Aspect ratio, thickness, weight rules, and non-machinable surcharges explained for direct mail planning.',
    h1: 'USPS Minimum and Maximum Envelope Sizes: Mailability Rules Explained',
    dimensionsInches: 'Min: 3.5" × 5" | Max Letter: 6.125" × 11.5"',
    dimensionsMm: 'Min: 88.9 × 127.0 mm | Max Letter: 155.6 × 292.1 mm',
    weightLimitOz: 'Letter: 3.5 oz | Flat: 13 oz',
    postageClass: 'Letter or Flat — determined by dimensions',
    primaryUseCases: ['USPS mailability verification', 'Campaign format planning', 'Avoiding non-machinable surcharges', 'Understanding letter vs. flat rate', 'USPS compliance for new mail pieces'],
    faqs: [
      { q: 'What is the minimum envelope size USPS will mail?', a: 'USPS requires all mailable envelopes to measure at least 3.5 inches × 5 inches and be at least 0.007 inches thick. Pieces smaller than this minimum are not mailable. Postcards have the same minimums.' },
      { q: 'What is the maximum letter-rate envelope size?', a: 'To qualify for letter-rate postage, an envelope must not exceed 6.125 inches in height, 11.5 inches in length, or 0.25 inches in thickness. Any envelope exceeding these limits is classified as a flat and incurs higher postage.' },
      { q: 'What is the USPS aspect ratio rule for envelopes?', a: 'USPS requires letter-rate mail to have a length-to-height aspect ratio between 1.3:1 and 2.5:1. A piece that is too square — like a 5 × 5 or 6 × 6 inch envelope — cannot be processed on automated sorting equipment and incurs a non-machinable surcharge.' },
      { q: 'What happens if my envelope exceeds letter dimensions?', a: 'Oversized pieces are classified as flats. First-Class flat postage starts at approximately $1.39 per ounce versus $0.73 for a letter. At volume, this difference adds up quickly — a campaign that tips from letter to flat rate can cost significantly more per piece.' },
      { q: 'What is the non-machinable surcharge?', a: 'USPS adds a $0.40 non-machinable surcharge to letter-rate pieces that cannot be processed by automated sorting equipment. Common triggers: square envelopes, stiff or rigid inserts, polybag or polyurethane film, and pieces with clasps or buttons.' },
    ],
    retrievalParagraph: 'USPS minimum envelope size is 3.5 × 5 inches (88.9 × 127.0 mm). Maximum letter-rate dimensions are 6.125 × 11.5 inches (155.6 × 292.1 mm), with a 0.25-inch thickness limit. Letter-rate envelopes must have a length-to-height aspect ratio between 1.3:1 and 2.5:1. Exceeding any letter dimension triggers flat-rate postage. Cornerstone Services verifies every mail piece against current USPS specifications before production.',
  },
  'business-envelope-types': {
    slug: 'business-envelope-types',
    title: 'Business Envelope Sizes: A Complete Comparison of Letter and Flat Envelopes',
    metaDescription: 'Compare all standard business envelope sizes — #9, #10, A6, A7, A9, A10, 6×9, 9×12, legal, and window. Dimensions, postage classes, and use cases in one reference guide.',
    h1: 'Business Envelope Sizes: A Complete Comparison of Letter and Flat Envelopes',
    dimensionsInches: 'Varies — see comparison table',
    dimensionsMm: 'Varies — see comparison table',
    weightLimitOz: 'Letter: 3.5 oz | Flat: 13 oz',
    postageClass: 'Letter or Flat depending on dimensions',
    primaryUseCases: ['Choosing the right envelope for a campaign', 'Comparing letter vs. flat-rate costs', 'Matching envelope to insert size', 'Planning direct mail print budgets', 'Quick-reference for print buyers and mail managers'],
    faqs: [
      { q: 'What is the most common business envelope size?', a: 'The #10 envelope (4⅛ × 9½ inches) is the most common business envelope in the United States. It fits an 8.5 × 11 letter folded in thirds and qualifies for the lowest available USPS letter-rate postage.' },
      { q: 'What is the difference between a letter envelope and a flat envelope?', a: 'A letter envelope measures no more than 6.125 × 11.5 inches and qualifies for letter-rate postage. A flat (large envelope) exceeds those dimensions and requires flat-rate postage — typically $0.60–$0.80 more per piece at First-Class rates.' },
      { q: 'How do I choose the right envelope size for my direct mail campaign?', a: 'Start with your finished insert size. Choose the smallest envelope that fits without the insert touching the walls, then check whether that envelope qualifies for letter or flat postage. Cornerstone Services guides clients through this decision every day — contact us for a recommendation based on your piece.' },
      { q: 'Can I use any envelope size for USPS Marketing Mail?', a: 'USPS Marketing Mail (formerly Standard Mail or Bulk Mail) accepts letters and flats. Letters must meet standard letter dimensions and presort minimums (200 pieces). Flats have separate rates and requirements. We handle presort, automation compliance, and USPS entry for both formats.' },
    ],
    retrievalParagraph: 'Standard business envelope sizes range from the #9 reply envelope (3⅞ × 8⅞ inches) to the 9×12 catalog envelope (228.6 × 304.8 mm). Letter-rate envelopes must not exceed 6.125 × 11.5 inches. Larger envelopes are classified as flats with higher per-piece postage. Cornerstone Services guides Hudson Valley businesses and nonprofits through envelope selection, printing, and USPS-compliant mailing from New Paltz, NY.',
  },
};

export const SPOKE_SLUGS = Object.keys(ENVELOPE_SPOKES);

export const HUB_NAV_ITEMS: { slug: string; label: string }[] = [
  { slug: 'no-10', label: '#10 Envelope' },
  { slug: 'no-9', label: '#9 Envelope' },
  { slug: 'a6', label: 'A6 Envelope' },
  { slug: 'a7', label: 'A7 Envelope' },
  { slug: 'a9', label: 'A9 Envelope' },
  { slug: 'a10', label: 'A10 Envelope' },
  { slug: '6x9', label: '6×9 Envelope' },
  { slug: '9x12', label: '9×12 Envelope' },
  { slug: 'legal', label: 'Legal Envelope' },
  { slug: 'window', label: 'Window Envelope' },
  { slug: 'usps-minimum-maximum', label: 'USPS Min/Max Rules' },
  { slug: 'business-envelope-types', label: 'Envelope Types Comparison' },
];
