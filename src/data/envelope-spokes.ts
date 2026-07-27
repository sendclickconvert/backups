// src/data/envelope-spokes.ts
// All 12 envelope spoke pages — complete data for /guides/envelope-sizes/[slug] routes
// Last verified: May 2026. Source: USPS Domestic Mail Manual 201 and 202.

export interface EnvelopeFaq {
  q: string;
  a: string;
}

export interface EnvelopeSpoke {
  title: string;
  metaDescription: string;
  h1: string;
  lastUpdated: string;
  dimensionsInches: string;
  dimensionsMm: string;
  weightLimitOz: number | string;
  postageClass: string;
  primaryUseCases: string[];
  retrievalParagraph: string;
  bodyIntro: string;
  useCases: string;
  postageNotes: string;
  faqs: EnvelopeFaq[];
}

export const ENVELOPE_SPOKES: Record<string, EnvelopeSpoke> = {

  // ============================================================
  // #10 — Standard US business envelope
  // ============================================================
  'no-10': {
    title: '#10 Envelope Size: 4.125 × 9.5 Inches | Dimensions & Uses',
    metaDescription: '#10 envelope is the standard business size: 4.125 × 9.5 inches (105 × 241 mm). The most common envelope for letters, invoices, and business correspondence.',
    h1: '#10 Envelope Size: 4.125 × 9.5 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '4.125" × 9.5"',
    dimensionsMm: '104.8mm × 241.3mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Business correspondence and cover letters',
      'Invoices and account statements (window varieties)',
      'Donation appeals and nonprofit direct mail',
      'Bills, notices, and account documents',
      'Sales and promotional letter mailings',
    ],
    retrievalParagraph: 'The #10 envelope is the standard US business envelope, measuring 4.125 by 9.5 inches (104.8 by 241.3 millimeters). It fits a standard 8.5 by 11 inch letter folded in thirds and is the default size for invoices, statements, business correspondence, and most direct mail letter campaigns. As a letter-size envelope under USPS rules, it qualifies for First-Class postage starting at $0.82 in 2026, with a maximum weight of 3.5 ounces at letter rate.',
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
<p>Invitations and announcements should use the A-series (<a href="/guides/envelope-sizes/a6">A6</a>, <a href="/guides/envelope-sizes/a7">A7</a>, or <a href="/guides/envelope-sizes/a9">A9</a> depending on card size). Unfolded documents like résumés or certificates should go in <a href="/guides/envelope-sizes/9x12">9×12</a> or larger. Pieces with bulky inserts thicker than 0.25 inches will exceed the letter-rate thickness limit and get reclassified as flats.</p>`,
    postageNotes: `<h2>#10 envelope postage and USPS rules</h2>

<p>A #10 envelope at standard weight falls within USPS letter-size limits, which keeps postage at the lowest available First-Class rate.</p>

<h3>2026 First-Class postage for a #10 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>Most #10 mailings land in the 1-ounce tier. A standard #10 envelope on 24 lb stock with a single trifolded 20 lb letter inside weighs roughly 0.5 ounces. Adding a reply envelope or a second sheet typically still keeps the piece under 1 ounce. Past 3.5 ounces, the piece is rated as a flat and postage jumps to $1.63 starting.</p>

<h3>Automation eligibility</h3>
<p>A #10 envelope's aspect ratio (length divided by height) is 2.30 — well within the USPS machinable range of 1.3 to 2.5. As long as the envelope is flexible, uniformly thick, and under 0.25 inches, it qualifies for full automation. Bulk mailings can earn presort and automation discounts of $0.10 or more per piece. We cover those discounts on our <a href="/services/direct-mail">direct mail services page</a>.</p>

<h3>What disqualifies a #10 from letter rate</h3>
<p>The most common surcharge triggers: rigid contents (a credit card, a key, a thick brochure), overweight pieces (more than 3.5 ounces), or lumpy contents that fail the uniform-thickness test. If you're mailing anything beyond paper and a thin reply card, weigh and flex-test a sample piece before committing to a print run.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201 and 202.</p>`,
    faqs: [
      { q: 'What are the dimensions of a #10 envelope?', a: 'A #10 envelope measures 4.125 inches high by 9.5 inches long (104.8 by 241.3 millimeters). It is the standard US business envelope size and has been the default for business correspondence in the United States for nearly a century.' },
      { q: 'Will an 8.5 by 11 inch letter fit in a #10 envelope?', a: 'Yes. The #10 envelope is sized specifically to fit a standard 8.5 by 11 inch letter folded in thirds. There is also room for a small reply slip, business card, or thin enclosure without exceeding the letter-rate thickness limit of 0.25 inches.' },
      { q: "What's the difference between a #10 and a #9 envelope?", a: 'A <a href="/guides/envelope-sizes/no-9">#9 envelope</a> (3.875" × 8.875") is slightly smaller than a #10 (4.125" × 9.5"). The #9 is most commonly used as a reply envelope tucked inside a #10 outer envelope — typical in donation appeals and billing mailings. Both qualify for letter-rate postage.' },
      { q: 'How much does it cost to mail a #10 envelope?', a: 'A 1-ounce #10 envelope costs $0.82 with a Forever stamp or $0.78 with metered postage in 2026. Each additional ounce up to 3.5 ounces adds $0.29. Bulk mailings with presort and automation can reduce per-piece postage by $0.10 or more.' },
      { q: 'Can a #10 envelope have a window?', a: 'Yes. Window #10 envelopes are standard for invoices, statements, and bills. The typical window is around 4.5 inches wide by 1 inch high, positioned in the lower-left of the envelope front. Double-window #10s are also common — one window for the recipient address and a second for return information.' },
      { q: 'Why is the #10 the standard business envelope?', a: 'The #10 was sized in the early 20th century to fit standard 8.5 by 11 inch business letterhead folded in thirds. Once typewriters and standardized letterhead became common, the #10 became the dominant choice for business correspondence and has remained the US standard ever since.' },
    ],
  },

  // ============================================================
  // #9 — Reply envelope, fits inside #10
  // ============================================================
  'no-9': {
    title: '#9 Envelope Size: 3.875 × 8.875 Inches | Dimensions & Uses',
    metaDescription: '#9 envelope size: 3.875 × 8.875 inches (98 × 225 mm). Standard reply envelope — fits inside a #10 outer. Dimensions, postage, BRM specs, and use cases.',
    h1: '#9 Envelope Size: 3.875 × 8.875 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '3.875" × 8.875"',
    dimensionsMm: '98.4mm × 225.4mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Reply envelopes inside #10 outer envelopes',
      'Business Reply Mail (BRM)',
      'Donation reply envelopes for nonprofits',
      'Order forms and remittance returns',
      'Survey response envelopes',
    ],
    retrievalParagraph: 'A #9 envelope measures 3.875 by 8.875 inches (98.4 by 225.4 millimeters), making it slightly smaller than a #10. It is the standard reply envelope used inside a #10 outer envelope for donation appeals, invoices, and remittances. The #9 qualifies for First-Class letter postage starting at $0.82 in 2026 and is also the most common envelope used for Business Reply Mail (BRM).',
    bodyIntro: `<p>The #9 envelope measures <strong>3.875 inches high by 8.875 inches long</strong> — about a quarter inch smaller in each dimension than a <a href="/guides/envelope-sizes/no-10">#10</a>. That sizing is deliberate: a #9 is designed to slip inside an unsealed #10 without folding.</p>

<p>If you've ever received a donation appeal, an invoice, or a charity solicitation, you've seen this pairing. The outer #10 carries the letter; the inner #9 carries the response. It's the default architecture for any mailing that asks for something back.</p>

<p>This page covers the exact dimensions, the #9's role as a reply envelope, Business Reply Mail (BRM) considerations, and when to choose a #9 over a postcard or a smaller envelope.</p>`,
    useCases: `<h2>When to use a #9 envelope</h2>

<p>Almost every #9 mailing falls into one of three patterns:</p>

<h3>Reply envelope inside a #10 outer</h3>
<p>This is the dominant use. A nonprofit sends an appeal letter in a #10. Inside, along with the letter and reply card, sits a pre-addressed #9 reply envelope. The donor fills out the card, places it in the #9, adds postage (or uses BRM if the organization pays), and drops it in a mailbox. The same pattern shows up in invoice mailings, pledge drives, and survey campaigns.</p>

<h3>Business Reply Mail (BRM)</h3>
<p>BRM lets the recipient mail back a reply at no cost to themselves — your organization pays postage only on pieces actually returned. The #9 is the most common BRM envelope size because it pairs cleanly with a #10 outer. BRM envelopes have specific design requirements: a permit number, FIM (facing identification mark), Intelligent Mail barcode, and the FACING IDENTIFICATION block on the front. Cornerstone designs and produces BRM envelopes to USPS specification — see our <a href="/services/direct-mail">direct mail services</a> for details.</p>

<h3>Stand-alone use</h3>
<p>Less common, but a #9 can be used as a primary mail envelope for short notes, single-sheet correspondence, or remittance slips. The size is somewhat undersized for a folded 8.5 by 11 letter — a #10 is better suited. The #9 is most at home as the reply piece in a paired mailing.</p>

<h3>What a #9 isn't designed for</h3>
<p>It's too small to comfortably hold a trifolded 8.5 by 11 letter without binding. Use a <a href="/guides/envelope-sizes/no-10">#10</a> for outgoing letter mail and reserve the #9 for replies.</p>`,
    postageNotes: `<h2>#9 envelope postage and USPS rules</h2>

<p>A #9 envelope falls comfortably within USPS letter-size limits and qualifies for First-Class letter rates.</p>

<h3>2026 First-Class postage for a #9 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>The #9's aspect ratio (length divided by height) is 2.29 — squarely inside the USPS machinable range of 1.3 to 2.5. Empty, a #9 weighs around 0.15 ounces, so even with a reply card and check enclosed, a #9 reply piece typically stays well under the 1-ounce tier.</p>

<h3>Business Reply Mail considerations</h3>
<p>BRM #9 envelopes require a USPS permit and have strict design rules: the words "BUSINESS REPLY MAIL," a permit number, the FIM-B mark in the upper-right corner, and the Intelligent Mail barcode in the address area. Pieces that don't meet design specs are returned by USPS or charged at full retail rates instead of the discounted BRM per-piece price.</p>

<p>BRM is paid on a return-only basis. You don't pay postage on the envelopes that don't come back, which is why it works well for response-rate-driven mailings like donation appeals and surveys.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201 and 505.</p>`,
    faqs: [
      { q: 'What are the dimensions of a #9 envelope?', a: 'A #9 envelope measures 3.875 inches high by 8.875 inches long (98.4 by 225.4 millimeters). It is approximately a quarter inch smaller than a #10 in each dimension.' },
      { q: 'What is a #9 envelope used for?', a: 'The #9 envelope is most commonly used as a reply envelope inside a #10 outer envelope for donation appeals, invoices, surveys, and remittance mailings. It is also the standard size for Business Reply Mail (BRM).' },
      { q: 'Does a #9 envelope fit inside a #10?', a: 'Yes. The #9 was specifically designed to slip inside a #10 envelope without folding. This pairing is the standard architecture for any mailing that includes a return reply piece.' },
      { q: 'How much does a #9 envelope cost to mail?', a: 'A 1-ounce #9 envelope costs $0.82 with a Forever stamp or $0.78 with metered postage in 2026 — the same letter rate as a #10. Each additional ounce up to 3.5 ounces adds $0.29.' },
      { q: 'Can I use a #9 envelope for outgoing business mail?', a: 'You can, but it is undersized for a trifolded 8.5 by 11 letter. For outgoing business correspondence, use a <a href="/guides/envelope-sizes/no-10">#10 envelope</a>. Reserve the #9 for reply use, where its smaller size keeps it from getting lost inside the outer envelope.' },
    ],
  },

  // ============================================================
  // A6 — Social/announcement
  // ============================================================
  'a6': {
    title: 'A6 Envelope Size: 4.75 × 6.5 Inches | Inches, MM & Mailing Guide',
    metaDescription: 'A6 envelope size: 4.75 × 6.5 inches (120 × 165 mm). Common uses, USPS mailing specs, and postage requirements for A6 envelopes.',
    h1: 'A6 Envelope Size: 4.75 × 6.5 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '4.75" × 6.5"',
    dimensionsMm: '120.7mm × 165.1mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Save-the-date cards',
      'Baby and bridal shower invitations',
      'Small wedding announcements',
      'Photo announcement cards',
      'Greeting card mailings',
    ],
    retrievalParagraph: 'An A6 envelope measures 4.75 by 6.5 inches (120.7 by 165.1 millimeters) and is part of the A-series of social and announcement envelopes. It is sized to fit standard A6 cards (4.5 by 6.25 inches) and is most commonly used for save-the-dates, shower invitations, photo announcements, and greeting cards. As a letter-size envelope, it qualifies for First-Class postage starting at $0.82 in 2026.',
    bodyIntro: `<p>The A6 envelope measures <strong>4.75 inches high by 6.5 inches long</strong>. It's the smallest of the A-series envelopes commonly used for social mailings — invitations, announcements, photo cards, and greeting cards.</p>

<p>The A-series is a sizing convention developed for the stationery industry, where each size is built to fit a specific card insert with a small margin around it. The A6 fits an A6 card, sized at 4.5 by 6.25 inches.</p>

<p>This page covers the exact dimensions, what cards fit inside, USPS rules for the size, and how the A6 compares to the larger <a href="/guides/envelope-sizes/a7">A7</a> and <a href="/guides/envelope-sizes/a9">A9</a>.</p>`,
    useCases: `<h2>When to use an A6 envelope</h2>

<p>The A6 is the go-to envelope for smaller social and announcement mailings.</p>

<h3>Save-the-dates</h3>
<p>The size has become a default for save-the-date cards because it pairs naturally with the 4.5 by 6.25 inch card stock that printers stock as A6 size. Send-outs typically arrive 6 to 12 months before a wedding and need to feel substantial without competing visually with the formal invitation that follows.</p>

<h3>Shower and party invitations</h3>
<p>Bridal showers, baby showers, birthday parties, and casual gatherings all use A6 envelopes routinely. The size signals "social" rather than "business," and the proportions read as personal correspondence.</p>

<h3>Photo announcement cards</h3>
<p>4 by 6 inch and 5 by 5 inch photo cards mail comfortably in an A6 with room for a return-address printed flap. Birth announcements, graduation announcements, and holiday photo cards are common formats.</p>

<h3>Greeting cards</h3>
<p>Many commercial greeting card lines are sized to fit A6 envelopes for shipping and retail packaging consistency.</p>

<h3>When the A6 isn't the right size</h3>
<p>Standard 5 by 7 invitation cards are slightly too large for an A6 — use an <a href="/guides/envelope-sizes/a7">A7 envelope</a> instead. For larger formal invitations, programs, or trifold materials, step up to <a href="/guides/envelope-sizes/a9">A9</a> or <a href="/guides/envelope-sizes/a10">A10</a>.</p>`,
    postageNotes: `<h2>A6 envelope postage and USPS rules</h2>

<p>The A6 falls within USPS letter-size limits and qualifies for the lowest First-Class postage rate.</p>

<h3>2026 First-Class postage for an A6 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>The A6's aspect ratio (length divided by height) is 1.37, which sits inside the USPS machinable range of 1.3 to 2.5. The piece is automation-eligible as long as it's flexible, uniformly thick, and under 0.25 inches.</p>

<h3>Watch the thickness</h3>
<p>Heavy cardstock, embellishments, vellum overlays, and ribbon ties can push an A6 piece beyond the 0.25 inch letter-rate thickness limit, which triggers the nonmachinable surcharge or moves the piece to flat rate. Test a fully assembled sample by sliding it between two flat surfaces 0.25 inches apart — if it doesn't slide freely, plan for the surcharge.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201.</p>`,
    faqs: [
      { q: 'What are the dimensions of an A6 envelope?', a: 'An A6 envelope measures 4.75 inches high by 6.5 inches long (120.7 by 165.1 millimeters). It fits standard A6 cards sized at 4.5 by 6.25 inches.' },
      { q: 'What size card fits in an A6 envelope?', a: 'A6 cards measure 4.5 by 6.25 inches and fit an A6 envelope with a small margin on each side. 4 by 6 inch photo cards and 5 by 5 inch square cards also fit comfortably.' },
      { q: "What's the difference between an A6 and an A7 envelope?", a: 'An <a href="/guides/envelope-sizes/a7">A7 envelope</a> (5.25" × 7.25") is larger than an A6 (4.75" × 6.5"). The A7 is sized for 5 by 7 inch invitation cards — the standard wedding invitation size. Use A6 for save-the-dates and smaller cards; use A7 for formal invitations.' },
      { q: 'Can A6 envelopes be mailed at letter rate?', a: 'Yes. The A6 falls within USPS letter-size limits and qualifies for First-Class letter postage starting at $0.82 in 2026, provided the piece is flexible, under 0.25 inches thick, and under 3.5 ounces.' },
      { q: 'Are A6 envelopes machinable?', a: 'Yes. The A6 aspect ratio of 1.37 sits within the USPS machinable range of 1.3 to 2.5. As long as the piece is flexible and uniformly thick, it qualifies for automation rates.' },
    ],
  },

  // ============================================================
  // A7 — Wedding invitation standard
  // ============================================================
  'a7': {
    title: 'A7 Envelope Size: 5.25 × 7.25 Inches | Dimensions, MM & Uses',
    metaDescription: 'A7 envelope size: 5.25 × 7.25 inches (133 × 184 mm). The standard for 5×7 wedding invitations, holiday photo cards, and formal announcements.',
    h1: 'A7 Envelope Size: 5.25 × 7.25 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '5.25" × 7.25"',
    dimensionsMm: '133.4mm × 184.2mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Wedding invitations (5×7 cards)',
      'Formal announcements',
      'Holiday photo cards',
      'Graduation invitations',
      'Photography prints (5×7)',
    ],
    retrievalParagraph: 'An A7 envelope measures 5.25 by 7.25 inches (133.4 by 184.2 millimeters) and is the standard envelope for 5 by 7 inch invitation cards — the most common wedding invitation size. It is also widely used for formal announcements, holiday photo cards, and 5 by 7 photography prints. The A7 qualifies for First-Class letter postage starting at $0.82 in 2026.',
    bodyIntro: `<p>The A7 envelope measures <strong>5.25 inches high by 7.25 inches long</strong> and is, by a wide margin, the most popular envelope size for wedding invitations in the United States.</p>

<p>The proportions exist to fit a 5 by 7 inch invitation card with about a quarter-inch margin on each side — the same 5 by 7 dimensions used for standard photo prints, formal announcements, and most premium greeting cards.</p>

<p>This page covers the exact dimensions, why A7 became the wedding-industry standard, USPS postage and machinability, and how the A7 compares to the smaller <a href="/guides/envelope-sizes/a6">A6</a> and larger <a href="/guides/envelope-sizes/a9">A9</a>.</p>`,
    useCases: `<h2>When to use an A7 envelope</h2>

<h3>Wedding invitations</h3>
<p>The A7 is the default. Couples ordering wedding invitations through stationers or online services almost always receive 5 by 7 inch invitation cards paired with A7 envelopes — typically two of them, one outer and one inner addressing envelope for formal weddings. The size signals formal, the proportions look balanced, and the dimensions fit cleanly within USPS letter-rate rules.</p>

<h3>Formal announcements</h3>
<p>Engagement announcements, graduation announcements, and milestone announcements (anniversaries, retirements, births of significant family events) are commonly printed at 5 by 7 and mailed in A7 envelopes.</p>

<h3>Holiday photo cards</h3>
<p>The 5 by 7 photo card is the dominant holiday format, and the A7 is its envelope. December is by volume the busiest month for A7 envelopes by a wide margin.</p>

<h3>Photography prints</h3>
<p>Photographers shipping 5 by 7 prints to clients use A7 envelopes — often with a rigid backer to prevent bending in transit. Note that adding rigid backers can disqualify the piece from machinable rates.</p>

<h3>When to choose a different size</h3>
<p>For smaller cards (4.5 by 6.25), use <a href="/guides/envelope-sizes/a6">A6</a>. For larger formal invitations or programs, step up to <a href="/guides/envelope-sizes/a9">A9</a>. For a less formal, business-feeling mailing, a <a href="/guides/envelope-sizes/no-10">#10</a> reads differently and is often a better fit.</p>`,
    postageNotes: `<h2>A7 envelope postage and USPS rules</h2>

<p>An A7 envelope falls inside USPS letter-size limits and qualifies for First-Class letter rates — but watch the surcharge triggers carefully on invitation mailings.</p>

<h3>2026 First-Class postage for an A7 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>The A7's aspect ratio (length divided by height) is 1.38, comfortably inside the USPS machinable range of 1.3 to 2.5.</p>

<h3>Wedding invitation surcharge risk</h3>
<p>Formal wedding invitations are notorious for triggering the $0.44 nonmachinable surcharge per piece. Common culprits:</p>
<ul>
  <li><strong>Multiple inserts</strong> — invitation, RSVP card, RSVP envelope, reception card, accommodations card, and tissue paper add up to over 1 ounce surprisingly fast</li>
  <li><strong>Heavy cardstock and embellishments</strong> — letterpress, foil stamping, and laser-cut details add weight and rigidity</li>
  <li><strong>Wax seals, ribbon ties, and embossed details</strong> — anything that creates uneven thickness or rigidity</li>
  <li><strong>Outer plus inner envelope sets</strong> — formal weddings double up, doubling envelope weight</li>
</ul>

<p>If you're sending wedding invitations, weigh a fully assembled sample at the post office before printing postage on the entire run. The cost difference between letter rate and the nonmachinable rate, multiplied by 200 invitations, is real money.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201.</p>`,
    faqs: [
      { q: 'What are the dimensions of an A7 envelope?', a: 'An A7 envelope measures 5.25 inches high by 7.25 inches long (133.4 by 184.2 millimeters). It fits 5 by 7 inch invitation cards with about a quarter-inch margin on each side.' },
      { q: 'Will a 5 by 7 invitation fit in an A7 envelope?', a: 'Yes. The A7 is sized specifically for 5 by 7 inch cards, which is the standard wedding invitation size in the United States.' },
      { q: 'Why are wedding invitations sent in A7 envelopes?', a: 'The A7 became the wedding standard because 5 by 7 inch invitation cards are the dominant format in the stationery industry, and the A7 fits them with appropriate margin. The proportions read formal, and the size sits within USPS letter-rate limits.' },
      { q: 'How much does it cost to mail an A7 wedding invitation?', a: 'Letter rate starts at $0.82 in 2026, but most wedding invitations exceed 1 ounce due to multiple inserts, heavy cardstock, and embellishments — adding $0.29 per additional ounce. Many invitations also trigger the $0.44 nonmachinable surcharge for thickness or rigidity. Weigh a complete sample at the post office before printing postage.' },
      { q: "What's the difference between A6 and A7 envelopes?", a: 'An <a href="/guides/envelope-sizes/a6">A6</a> (4.75" × 6.5") is smaller and fits 4.5 by 6.25 inch cards. An A7 (5.25" × 7.25") is larger and fits 5 by 7 inch cards. A6 is typical for save-the-dates and shower invitations; A7 is typical for formal wedding invitations.' },
    ],
  },

  // ============================================================
  // A9 — Larger announcement
  // ============================================================
  'a9': {
    title: 'A9 Envelope Size: 5.75 × 8.75 Inches | Inches, MM & Uses',
    metaDescription: 'A9 envelope size: 5.75 × 8.75 inches (146 × 222 mm). Fits half-page cards, folded brochures, and formal invitations. Dimensions, postage, and use cases.',
    h1: 'A9 Envelope Size: 5.75 × 8.75 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '5.75" × 8.75"',
    dimensionsMm: '146mm × 222.3mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Larger formal invitations',
      'Wedding programs',
      'Trifolded 8.5×11 brochures',
      'Half-page (5.5×8.5) booklets',
      'Premium announcements',
    ],
    retrievalParagraph: 'An A9 envelope measures 5.75 by 8.75 inches (146 by 222.3 millimeters). It is the larger end of the A-series and fits half-page 5.5 by 8.5 inch cards, programs, and trifolded 8.5 by 11 brochures. The A9 qualifies for First-Class letter postage starting at $0.82 in 2026 and is commonly used for premium event invitations and direct mail brochures.',
    bodyIntro: `<p>The A9 envelope measures <strong>5.75 inches high by 8.75 inches long</strong>. It sits at the upper end of the A-series and is the right choice when an <a href="/guides/envelope-sizes/a7">A7</a> is too small but a <a href="/guides/envelope-sizes/9x12">9×12 flat</a> is overkill.</p>

<p>The A9 fits the half-page format — 5.5 by 8.5 inch cards, brochures, and programs — with a comfortable margin. It also accommodates 8.5 by 11 inch sheets folded in half lengthwise (folded to 5.5 by 8.5), which makes it useful for direct mail brochures and event programs.</p>

<p>This page covers exact dimensions, common use cases, USPS rules, and how the A9 compares to the smaller <a href="/guides/envelope-sizes/a7">A7</a> and the larger <a href="/guides/envelope-sizes/a10">A10</a>.</p>`,
    useCases: `<h2>When to use an A9 envelope</h2>

<h3>Larger formal invitations</h3>
<p>Galas, charity benefits, and formal corporate events often use 5.5 by 8.5 inch invitation cards or fold-out invitation suites that exceed the A7 size. The A9 holds these without forcing a fold.</p>

<h3>Wedding programs and event programs</h3>
<p>Half-page programs handed out at ceremonies are often distributed pre-mailed in A9 envelopes for save-the-date packets, welcome kits, or informational mailings to out-of-town guests.</p>

<h3>Direct mail brochures</h3>
<p>An 8.5 by 11 inch brochure folded in half lengthwise (to 5.5 by 8.5) fits cleanly in an A9. This is a common format for premium direct mail pieces from financial services, real estate, and luxury brands — formats where the unfolded experience matters and a trifolded #10 mailing won't read as substantial.</p>

<h3>Half-page booklets and magazines</h3>
<p>Small-format publications and newsletters published at 5.5 by 8.5 inches mail in A9 envelopes when they're saddle-stitched and thin enough to qualify for letter rates.</p>

<h3>When to step up or down</h3>
<p>For a 5 by 7 invitation, drop to <a href="/guides/envelope-sizes/a7">A7</a>. For an unfolded 8.5 by 11 document or anything thicker than 0.25 inches, move to <a href="/guides/envelope-sizes/9x12">9×12 flat</a>.</p>`,
    postageNotes: `<h2>A9 envelope postage and USPS rules</h2>

<p>The A9 falls within USPS letter-size limits and qualifies for First-Class letter postage.</p>

<h3>2026 First-Class postage for an A9 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>The A9's aspect ratio is 1.52, well inside the machinable range of 1.3 to 2.5. The piece qualifies for automation as long as it's flexible, uniformly thick, and under 0.25 inches.</p>

<h3>Weight watch</h3>
<p>A9 mailings often hit the 2-ounce or 3-ounce tier because the contents — folded brochures, multi-page programs, premium cardstock — are heavier than typical letter-rate pieces. A 2-ounce A9 costs $1.07 (Forever stamp + additional ounce). At 3 ounces, it's $1.36. Run a full weight test on a finished sample piece before purchasing postage in bulk.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201.</p>`,
    faqs: [
      { q: 'What are the dimensions of an A9 envelope?', a: 'An A9 envelope measures 5.75 inches high by 8.75 inches long (146 by 222.3 millimeters). It is part of the A-series of social and announcement envelopes.' },
      { q: 'What fits in an A9 envelope?', a: 'A9 envelopes fit 5.5 by 8.5 inch half-page cards, programs, and brochures, as well as 8.5 by 11 sheets folded in half lengthwise. They are also used for some saddle-stitched booklets and small newsletters.' },
      { q: 'Is an A9 envelope letter rate or flat rate?', a: 'A9 envelopes qualify for First-Class letter postage starting at $0.82 in 2026, provided the piece is flexible, under 0.25 inches thick, and under 3.5 ounces.' },
      { q: "What's the difference between A9 and A7 envelopes?", a: 'An <a href="/guides/envelope-sizes/a7">A7</a> (5.25" × 7.25") fits 5 by 7 inch cards and is the standard wedding invitation envelope. An A9 (5.75" × 8.75") is larger and fits half-page formats including 5.5 by 8.5 cards and folded brochures.' },
      { q: 'Can I use an A9 for direct mail?', a: 'Yes. A9 envelopes are common for premium direct mail brochures, especially folded 8.5 by 11 pieces. The size reads more substantial than a #10 and works well for financial services, real estate, and luxury campaigns.' },
    ],
  },

  // ============================================================
  // A10 — Largest letter-rate A-series
  // ============================================================
  'a10': {
    title: 'A10 Envelope Size: 6 × 9.5 Inches | Dimensions & Uses',
    metaDescription: 'A10 envelope size: 6 × 9.5 inches (152 × 241 mm). Largest A-series envelope at letter rate. Dimensions, postage class, mailability rules, and use cases.',
    h1: 'A10 Envelope Size: 6 × 9.5 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '6" × 9.5"',
    dimensionsMm: '152.4mm × 241.3mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Oversized social announcements',
      'Photography prints (6×9 or smaller)',
      'Large premium invitations',
      'Promotional materials with substantial inserts',
      'Trifolded 8.5×11 marketing pieces',
    ],
    retrievalParagraph: 'An A10 envelope measures 6 by 9.5 inches (152.4 by 241.3 millimeters) and is the largest A-series envelope still classified as letter-rate by USPS — the height (6") sits just below the 6.125" letter-size maximum. The A10 qualifies for First-Class letter postage starting at $0.82 in 2026 and is used for oversized announcements, premium invitations, and substantial direct mail pieces.',
    bodyIntro: `<p>The A10 envelope measures <strong>6 inches high by 9.5 inches long</strong> and represents the upper boundary of letter-rate envelope mailing. At 6 inches high, it sits just below the USPS maximum letter height of 6.125 inches.</p>

<p>That tight margin matters. Manufacturing variance can push some A10 envelopes a hair over the 6.125 inch limit, which reclassifies them as flats and triples the postage. If you're running a large A10 mailing, measure the actual envelope dimensions — not just the spec sheet — before committing to letter-rate postage.</p>

<p>This page covers dimensions, the letter-rate boundary issue, common use cases, and how the A10 compares to the smaller <a href="/guides/envelope-sizes/a9">A9</a> and the larger <a href="/guides/envelope-sizes/9x12">9×12 flat</a>.</p>`,
    useCases: `<h2>When to use an A10 envelope</h2>

<h3>Premium and oversized announcements</h3>
<p>Corporate announcements, milestone celebrations, and high-end social invitations sometimes use A10 envelopes for the visual presence of a larger format while staying within letter rates. The size feels substantial in the recipient's hand without the cost of flat-rate postage.</p>

<h3>Photography deliveries</h3>
<p>Photographers shipping prints up to 6 by 9 inches use A10 envelopes when the order doesn't need a rigid backer. For prints requiring a flat shipping surface, a rigid mailer in 9×12 is typically a better choice.</p>

<h3>Substantial direct mail</h3>
<p>Real estate agents, financial advisors, and luxury brands sometimes mail in A10 envelopes to differentiate from the standard <a href="/guides/envelope-sizes/no-10">#10</a> business envelope flow. The format reads as more deliberate and premium without the cost of a 9×12 flat.</p>

<h3>Trifolded 8.5×11 pieces with bulk</h3>
<p>An 8.5 by 11 inch sheet folded in thirds (to roughly 3.67 by 8.5) fits inside an A10 with substantial room. This works for marketing pieces with multiple inserts that would feel cramped in a #10.</p>

<h3>The boundary problem</h3>
<p>If you're considering an A10, also consider whether a <a href="/guides/envelope-sizes/9x12">9×12 flat</a> is a better fit. The A10 saves on postage but sacrifices the unfolded 8.5×11 layout. Going to 9×12 means flat-rate postage but lets you mail an unfolded letter or document. Choose based on what the recipient experience needs to be.</p>`,
    postageNotes: `<h2>A10 envelope postage and USPS rules</h2>

<p>The A10 sits at the very top of the letter-rate range — close enough to the boundary that you should verify dimensions on actual envelope stock before committing to a mailing.</p>

<h3>2026 First-Class postage for an A10 envelope</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<p>The A10's aspect ratio is 1.58, comfortably inside the machinable range of 1.3 to 2.5.</p>

<h3>The 6.125 inch boundary</h3>
<p>USPS letter-rate maximum height is 6.125 inches. The A10 spec is 6.0 inches. That's a margin of 0.125 inches — narrow enough that any manufacturing inconsistency, slight cutting variance, or paper expansion can push the actual envelope over the limit. If a postal acceptance clerk measures a piece at 6.13 inches or more, it's reclassified as a flat — postage jumps from $0.82 to $1.63.</p>

<p>Before mailing a large A10 run: measure 5 to 10 random envelopes from your stock with a ruler. If any of them measure 6.10 inches or higher, plan for flat-rate postage or use a different envelope.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201.</p>`,
    faqs: [
      { q: 'What are the dimensions of an A10 envelope?', a: 'An A10 envelope measures 6 inches high by 9.5 inches long (152.4 by 241.3 millimeters). It is the largest A-series envelope still classified as letter-rate by USPS.' },
      { q: 'Is an A10 envelope letter rate?', a: 'Yes, but barely. The A10 is 6 inches high, just below the USPS letter-rate maximum of 6.125 inches. Manufacturing variance can occasionally push individual envelopes over the limit, reclassifying them as flats. Measure actual stock before committing.' },
      { q: 'What fits in an A10 envelope?', a: 'A10 envelopes fit prints up to 6 by 9 inches, large premium invitations, and trifolded 8.5 by 11 sheets with room for additional inserts. They are also used for oversized announcements and substantial direct mail.' },
      { q: 'How much does it cost to mail an A10 envelope?', a: 'Letter rate is $0.82 with a Forever stamp or $0.78 metered for 1 ounce in 2026. Each additional ounce up to 3.5 ounces adds $0.29. If the envelope is reclassified as a flat at the post office, postage jumps to $1.63 starting.' },
      { q: 'Should I use an A10 or a 9×12 envelope?', a: 'Use A10 when you want a larger envelope feel at letter-rate postage and an unfolded 8.5 by 11 document is not required. Use <a href="/guides/envelope-sizes/9x12">9×12</a> when the document needs to stay flat — A10 forces you to fold an 8.5 by 11 sheet.' },
    ],
  },

  // ============================================================
  // 6×9 — Booklet/catalog letter
  // ============================================================
  '6x9': {
    title: '6×9 Envelope Size: 6 × 9 Inches | Dimensions, Postage & Uses',
    metaDescription: '6×9 envelope size: 6 × 9 inches (152 × 229 mm). Booklet and catalog styles — letter rate when under 0.25" thick, flat rate when thicker. Full specs and uses.',
    h1: '6×9 Envelope Size: 6 × 9 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '6" × 9"',
    dimensionsMm: '152.4mm × 228.6mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter (rate dependent on thickness/contents)',
    primaryUseCases: [
      'Booklets and multi-page direct mail',
      'Photography submissions',
      'Trifolded 8.5×11 catalogs',
      'Document mailers with margin',
      'Premium product mailings',
    ],
    retrievalParagraph: 'A 6x9 envelope measures 6 by 9 inches (152.4 by 228.6 millimeters) and is commonly used for booklets, brochures, and multi-page direct mail. It can qualify for First-Class letter postage at $0.82 in 2026 if it stays under 0.25 inches thick and 3.5 ounces, but most 6x9 mailings are classified as flats due to thickness — flat rate starts at $1.63.',
    bodyIntro: `<p>The 6x9 envelope measures <strong>6 inches high by 9 inches long</strong> — the same height as an <a href="/guides/envelope-sizes/a10">A10</a>, but slightly shorter in length. It's commonly stocked as a "booklet" envelope (open-side) or "catalog" envelope (open-end), distinguished by which edge of the envelope opens.</p>

<p>The 6x9's relationship to USPS letter rates is more complicated than most envelope sizes. The dimensions technically fit within letter-rate maximums (6.125" × 11.5"), but most 6x9 mailings end up rated as flats anyway because of what's inside them — multi-page booklets, thick brochures, and bound documents that exceed the 0.25 inch thickness limit.</p>

<p>This page covers when a 6x9 stays at letter rate, when it crosses to flat rate, and what differentiates the booklet and catalog styles.</p>`,
    useCases: `<h2>When to use a 6x9 envelope</h2>

<h3>Booklets and multi-page direct mail</h3>
<p>Saddle-stitched booklets at 5.5 by 8.5 inches fit comfortably inside 6x9 envelopes with margin to spare. The format works for instruction booklets, product catalogs, donor reports, and multi-page sales pieces.</p>

<h3>Trifolded 8.5×11 catalogs</h3>
<p>An 8.5 by 11 inch piece folded in thirds (to about 3.67 by 8.5) fits a 6x9 with substantial extra space — useful when the marketing piece needs to feel substantial without the recipient having to extract a tightly-packed insert.</p>

<h3>Document mailers</h3>
<p>Folded contracts, signed paperwork, and multi-page document sets mail well in 6x9 envelopes when an unfolded 9×12 is unnecessary. The smaller size cuts postage when contents allow letter rates.</p>

<h3>Photography submissions</h3>
<p>Photographers and designers submitting portfolio prints up to 5.5 by 8.5 inches use 6x9 booklet envelopes for portfolio mailings. Rigid backers can be added but typically push the piece into nonmachinable territory.</p>

<h3>Booklet vs. catalog construction</h3>
<p>Booklet envelopes open on the long side (the 9 inch edge) and are easier to slide pre-printed contents into. Catalog envelopes open on the short side (the 6 inch edge) and are more common for thicker contents that need a side-loading orientation. Both share the same outer dimensions and postage rules.</p>`,
    postageNotes: `<h2>6x9 envelope postage and USPS rules</h2>

<p>This is where the 6x9 gets complicated. The envelope dimensions qualify for letter rate, but the contents often disqualify the piece.</p>

<h3>2026 letter-rate postage (if eligible)</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<h3>2026 flat-rate postage (if reclassified)</h3>
<ul>
  <li>1 ounce: <strong>$1.63</strong></li>
  <li>Each additional ounce: <strong>$0.20</strong></li>
</ul>

<h3>What pushes a 6x9 to flat rate</h3>
<ul>
  <li><strong>Thickness over 0.25 inches</strong> — the most common trigger; multi-page booklets, multiple inserts, and bound documents routinely cross this line</li>
  <li><strong>Weight over 3.5 ounces</strong> — automatic reclassification regardless of thickness</li>
  <li><strong>Rigidity</strong> — pieces that don't bend easily fail the flexibility test</li>
  <li><strong>Uneven thickness</strong> — bulky inserts, embellishments, or thick spine bindings</li>
</ul>

<p>For most 6x9 mailings, plan for flat rate from the start unless the contents are demonstrably thin (single sheets, thin brochures, postcards). Running a sample through a USPS flexibility test before committing to letter-rate postage prevents an expensive surprise at the BMEU.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201 and 301.</p>`,
    faqs: [
      { q: 'What are the dimensions of a 6x9 envelope?', a: 'A 6x9 envelope measures 6 inches high by 9 inches long (152.4 by 228.6 millimeters). The size is commonly stocked in two styles: booklet (opens on the long side) and catalog (opens on the short side).' },
      { q: 'Is a 6x9 envelope letter rate or flat rate?', a: 'It depends on what is inside. The envelope dimensions qualify for letter rate, but most 6x9 mailings are reclassified as flats because the contents (multi-page booklets, thick brochures, document sets) exceed the 0.25 inch thickness limit. Plan for flat rate by default unless contents are thin.' },
      { q: 'How much does it cost to mail a 6x9 envelope?', a: 'At letter rate (if eligible), $0.82 with a Forever stamp for 1 ounce in 2026. At flat rate (most common for 6x9), $1.63 for 1 ounce with $0.20 per additional ounce.' },
      { q: "What's the difference between booklet and catalog 6x9 envelopes?", a: 'Booklet envelopes open on the long (9 inch) side and slide contents in horizontally. Catalog envelopes open on the short (6 inch) side and load contents vertically. Both share the same outer dimensions and postage rules. Choose based on how your contents need to be inserted.' },
      { q: 'Will an 8.5 by 11 sheet fit in a 6x9 envelope?', a: 'Not unfolded. An 8.5 by 11 sheet folded in half is too large; folded in thirds, it fits comfortably. For unfolded 8.5 by 11 documents, use a <a href="/guides/envelope-sizes/9x12">9×12 envelope</a>.' },
    ],
  },

  // ============================================================
  // 9×12 — Standard flat
  // ============================================================
  '9x12': {
    title: '9×12 Envelope Size: 9 × 12 Inches | Dimensions, Postage & Uses',
    metaDescription: '9×12 envelope size: exactly 9 × 12 inches. Use for documents, catalogs, and marketing pieces. USPS postage requirements and mailing specs included.',
    h1: '9×12 Envelope Size: 9 × 12 Inches',
    lastUpdated: '2026-05-11',
    dimensionsInches: '9" × 12"',
    dimensionsMm: '228.6mm × 304.8mm',
    weightLimitOz: 13,
    postageClass: 'First-Class flat (large envelope)',
    primaryUseCases: [
      'Unfolded 8.5×11 documents',
      'Certificates and diplomas',
      'Photography prints up to 8×10',
      'Multi-page presentations',
      'Annual reports and brochures',
    ],
    retrievalParagraph: 'A 9x12 envelope measures 9 by 12 inches (228.6 by 304.8 millimeters) and is the standard large envelope (also called a flat) used to mail unfolded 8.5 by 11 documents. Because it exceeds USPS letter-size limits, the 9x12 is rated as a flat with First-Class postage starting at $1.63 for the first ounce in 2026, with $0.20 added per additional ounce up to 13 ounces.',
    bodyIntro: `<p>The 9x12 envelope measures <strong>9 inches high by 12 inches long</strong> and is the standard size for mailing unfolded 8.5 by 11 documents. It's classified by USPS as a flat (also called a large envelope), which means it operates under different postage rules than letter-size envelopes.</p>

<p>The 9x12 is what you reach for when contents must arrive uncreased: certificates, photography prints, signed contracts that can't be folded, multi-page presentations, annual reports, and any document where the recipient experience matters more than postage cost.</p>

<p>This page covers exact dimensions, flat-rate postage rules, the difference between booklet and catalog 9x12 styles, and when to choose 9x12 over a smaller letter-rate option like <a href="/guides/envelope-sizes/a10">A10</a>.</p>`,
    useCases: `<h2>When to use a 9x12 envelope</h2>

<h3>Unfolded 8.5×11 documents</h3>
<p>This is the dominant use. Tax forms, contracts, signed agreements, transcripts, certificates, diplomas, and any business document that should arrive uncreased mail in 9x12 envelopes. The 8.5 by 11 page sits inside with about 0.5 inches of margin on three sides and 1.5 inches on the long side.</p>

<h3>Photography and prints</h3>
<p>8 by 10 photography prints, framed photo deliveries (with rigid backers), and portfolio prints up to roughly 8.5 by 11.5 inches all fit. Most photographers add a chipboard backer to keep prints flat in transit, which makes the piece nonmachinable but still mailable at flat rates.</p>

<h3>Annual reports, brochures, and presentations</h3>
<p>Multi-page bound documents, board reports, investor presentations, and saddle-stitched marketing pieces fit 9x12 comfortably. The size signals "important" without the cost of a custom mailer.</p>

<h3>Premium direct mail</h3>
<p>Some high-end direct mail campaigns use 9x12 envelopes specifically to break out of inbox clutter — recipients open large envelopes at much higher rates than #10 envelopes. The trade-off is significantly higher postage, so the per-piece response value needs to justify it.</p>

<h3>Booklet vs. catalog 9x12</h3>
<p>Booklet 9x12 envelopes open on the long (12 inch) side; catalog 9x12 envelopes open on the short (9 inch) side. Booklet style is more common for unfolded documents that slide in flat. Catalog style is preferred for thicker contents and bulk mailings.</p>`,
    postageNotes: `<h2>9x12 envelope postage and USPS rules</h2>

<p>The 9x12 exceeds USPS letter-size limits in both height (9 inches > 6.125 maximum) and length (12 inches > 11.5 maximum), which classifies it as a flat. Flat-rate postage applies regardless of weight or thickness within the flat-size envelope.</p>

<h3>2026 First-Class flat rates</h3>
<ul>
  <li>1 ounce: <strong>$1.63</strong></li>
  <li>Each additional ounce: <strong>$0.20</strong></li>
  <li>Maximum weight at flat rate: <strong>13 ounces</strong></li>
</ul>

<p>A typical 9x12 mailing with a few sheets and a backer weighs 2 to 4 ounces. At 4 ounces, the postage is $2.23. At 8 ounces, $3.03. Pieces over 13 ounces ship as packages at significantly higher rates.</p>

<h3>Flat mailability requirements</h3>
<p>To qualify as a flat (rather than a parcel), a 9x12 piece must be:</p>
<ul>
  <li><strong>Flexible</strong> — bends easily; rigid backers reduce flexibility but don't automatically reclassify the piece</li>
  <li><strong>Uniformly thick</strong> — no bulky contents that create lumps</li>
  <li><strong>Under 0.75 inches thick</strong> — the maximum flat thickness</li>
  <li><strong>Under 13 ounces</strong> — beyond this, the piece is rated as a parcel</li>
</ul>

<h3>Bulk and presort discounts</h3>
<p>Flat-rate postage is more expensive than letter rate at retail, but presort and automation discounts on large flat mailings can be substantial — often $0.30 or more per piece below retail flat rates. For 9x12 direct mail at volume, working with a mail-prep partner is the only way to make the economics work.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201 and 301.</p>`,
    faqs: [
      { q: 'What are the dimensions of a 9x12 envelope?', a: 'A 9x12 envelope measures 9 inches high by 12 inches long (228.6 by 304.8 millimeters). It is the standard large envelope (flat) used for unfolded 8.5 by 11 documents.' },
      { q: 'Is a 9x12 envelope letter rate or flat rate?', a: 'A 9x12 is always rated as a flat. It exceeds USPS letter-size maximums in both height and length, so it cannot qualify for letter rates regardless of weight or thickness. First-Class flat postage starts at $1.63 in 2026.' },
      { q: 'How much does it cost to mail a 9x12 envelope?', a: 'In 2026, $1.63 for the first ounce, with $0.20 added for each additional ounce up to 13 ounces. A typical 4-ounce 9x12 costs $2.23 to mail at retail rates. Bulk and presort discounts can reduce costs significantly.' },
      { q: 'Will an 8.5 by 11 document fit in a 9x12 envelope?', a: 'Yes, with comfortable margin. The 8.5 by 11 page fits with about 0.5 inches of clearance on three sides. This is the standard envelope for mailing unfolded letter-size documents.' },
      { q: "What's the difference between booklet and catalog 9x12 envelopes?", a: 'Booklet 9x12 envelopes open on the long (12 inch) side and accept flat insertion of unfolded documents. Catalog 9x12 envelopes open on the short (9 inch) side and are typical for thicker bulk mailings. Both share the same outer dimensions and postage rules.' },
      { q: 'Can I send a 9x12 envelope by First-Class Mail?', a: 'Yes. 9x12 envelopes ship by First-Class Mail at flat rates ($1.63 for the first ounce in 2026, $0.20 each additional ounce up to 13 ounces). Maximum delivery time is similar to letter mail — typically 1 to 5 business days domestically.' },
    ],
  },

  // ============================================================
  // Legal — Long envelopes for legal-size documents
  // ============================================================
  'legal': {
    title: 'Legal Envelope Size: Dimensions, Postage & Uses Guide',
    metaDescription: 'Legal envelopes (#11, #12, #14) range from 4.5"×10.375" to 5"×11.5" and fit folded 8.5×14 legal-size paper. Get dimensions, postage, and which to use.',
    h1: 'Legal Envelope Sizes: Dimensions & Mailing Guide',
    lastUpdated: '2026-05-11',
    dimensionsInches: '5" × 11.5" (#14, most common)',
    dimensionsMm: '127mm × 292.1mm',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Mailing legal-size (8.5×14) documents folded',
      'Law firm correspondence',
      'Real estate closings and deeds',
      'Long-format contracts',
      'Court filings and legal notices',
    ],
    retrievalParagraph: 'Legal envelopes are sized to fit legal-size 8.5 by 14 inch paper folded once. The most common is the #14 envelope at 5 by 11.5 inches (127 by 292.1 millimeters), which fits 8.5 by 14 paper folded in half lengthwise. The #11 (4.5 by 10.375 inches) and #12 (4.75 by 11 inches) are smaller variants for trifolded legal paper. All three qualify for First-Class letter postage starting at $0.82 in 2026.',
    bodyIntro: `<p>"Legal envelope" doesn't refer to a single standardized size. It refers to a category of long, narrow envelopes designed to hold legal-size 8.5 by 14 inch paper either folded in half or folded in thirds.</p>

<p>The three most common legal envelope sizes:</p>

<ul>
  <li><strong>#14 envelope</strong> — 5 by 11.5 inches; fits 8.5 by 14 paper folded in half (the largest and most common)</li>
  <li><strong>#12 envelope</strong> — 4.75 by 11 inches; fits 8.5 by 14 paper folded in thirds</li>
  <li><strong>#11 envelope</strong> — 4.5 by 10.375 inches; fits 8.5 by 14 paper folded in thirds</li>
</ul>

<p>All three sit at letter rate as long as they're flexible and under 0.25 inches thick. This page covers which size to use for which use case, postage rules, and how legal envelopes compare to the more common <a href="/guides/envelope-sizes/no-10">#10</a>.</p>`,
    useCases: `<h2>When to use a legal envelope</h2>

<h3>Mailing legal-size documents folded</h3>
<p>Legal-size paper (8.5 by 14 inches) is still standard in law firms, real estate transactions, and certain government filings. When a document needs to mail folded but not trifolded — for example, a deed or contract that should remain readable with minimal handling — the #14 envelope at 5 by 11.5 inches is the right choice.</p>

<h3>Law firm correspondence</h3>
<p>Some firms use legal envelopes by tradition for outgoing correspondence, particularly for documents that pair with legal-size attachments. The #12 (4.75 × 11) is a common choice when the longer envelope is needed but the legal-paper insert is folded in thirds.</p>

<h3>Real estate closings</h3>
<p>Title companies and real estate attorneys mail closing documents in legal envelopes when the package includes deeds, settlement statements, or recorded documents on legal-size paper.</p>

<h3>Court filings and legal notices</h3>
<p>Courts that still accept paper filings often receive documents in legal envelopes addressed to the clerk of court. State and local government filings on legal paper similarly use these formats.</p>

<h3>When to choose #10 instead</h3>
<p>If your contents are 8.5 by 11 (letter-size) rather than 8.5 by 14 (legal-size), use a <a href="/guides/envelope-sizes/no-10">#10 envelope</a>. The #10 is more readily stocked, costs less, and is recognized at every postal facility. Legal envelopes are specialized stock and may need to be specially ordered.</p>`,
    postageNotes: `<h2>Legal envelope postage and USPS rules</h2>

<p>All three common legal envelope sizes (#11, #12, #14) qualify for First-Class letter postage as long as they meet standard letter-rate requirements.</p>

<h3>2026 First-Class postage for legal envelopes</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered postage: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 ounces: <strong>$0.29</strong></li>
</ul>

<h3>Aspect ratio check</h3>
<p>Legal envelopes are long and narrow, which puts them on the high end of the USPS aspect-ratio range:</p>
<ul>
  <li>#14 (5 × 11.5): aspect ratio 2.30 — within range</li>
  <li>#12 (4.75 × 11): aspect ratio 2.32 — within range</li>
  <li>#11 (4.5 × 10.375): aspect ratio 2.31 — within range</li>
</ul>
<p>All three sit safely inside the machinable range of 1.3 to 2.5.</p>

<h3>Common surcharge triggers</h3>
<p>Legal envelope mailings often trigger surcharges for two reasons:</p>
<ul>
  <li><strong>Multiple folded documents</strong> stacked together can exceed the 0.25 inch thickness limit</li>
  <li><strong>Multi-page filings</strong> often weigh more than 3.5 ounces, which moves the piece to flat rate</li>
</ul>
<p>For legal mailings with substantial paperwork, a <a href="/guides/envelope-sizes/9x12">9×12 flat envelope</a> at flat rate is often more economical than overweight letter rate plus the surcharge — and the documents arrive unfolded.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201.</p>`,
    faqs: [
      { q: 'What is the standard legal envelope size?', a: 'The most common legal envelope is the #14, measuring 5 by 11.5 inches (127 by 292.1 millimeters). It fits 8.5 by 14 inch legal-size paper folded in half lengthwise. Smaller variants include the #12 (4.75" × 11") and #11 (4.5" × 10.375").' },
      { q: 'What size envelope fits legal paper?', a: 'For 8.5 by 14 inch legal paper folded in half, use a #14 envelope (5 × 11.5). For legal paper folded in thirds, use a #12 (4.75 × 11) or #11 (4.5 × 10.375). For unfolded legal documents, use a 10×15 catalog envelope or larger.' },
      { q: 'Are legal envelopes letter rate or flat rate?', a: 'All three common legal envelope sizes (#11, #12, #14) qualify for First-Class letter postage at $0.82 in 2026, provided they are flexible, under 0.25 inches thick, and under 3.5 ounces.' },
      { q: "What's the difference between a legal envelope and a #10?", a: 'A <a href="/guides/envelope-sizes/no-10">#10 envelope</a> (4.125 × 9.5) fits 8.5 by 11 letter-size paper folded in thirds. Legal envelopes are longer (10.375 to 11.5 inches) and designed to fit 8.5 by 14 legal-size paper. Use #10 for letter-size correspondence; use legal envelopes for legal-size documents.' },
      { q: 'Where can I buy legal envelopes?', a: 'Legal envelopes are specialty stock — most office supply stores carry #14 envelopes, but #11 and #12 sizes are typically ordered through commercial printers or envelope specialists. Cornerstone stocks and prints all three sizes for client mailings.' },
    ],
  },

  // ============================================================
  // Window — Window envelope guide
  // ============================================================
  'window': {
    title: 'Window Envelope Sizes: #9, #10, and Double-Window Dimensions',
    metaDescription: 'Window envelope sizes, placement rules, and use cases — #9 and #10 windows, double-window envelopes, and USPS DMM 202 placement requirements.',
    h1: 'Window Envelope Sizes: Dimensions and Placement Rules',
    lastUpdated: '2026-05-05',
    dimensionsInches: 'Variable (#9, #10, A-series available)',
    dimensionsMm: 'Variable',
    weightLimitOz: 3.5,
    postageClass: 'First-Class letter',
    primaryUseCases: [
      'Invoices and account statements',
      'Bills and billing notices',
      'Payroll and employee mailings',
      'Insurance documents',
      'Government correspondence',
    ],
    retrievalParagraph: 'Window envelopes have a transparent panel cut into the front that displays the recipient address printed on the contents inside, eliminating the need for a separate addressing step. The most common window envelope is the #10 single-window at 4.125 by 9.5 inches, with a window typically around 4.5 by 1 inch. Double-window varieties show both the recipient address and an account number or return reference. All standard window envelopes qualify for First-Class letter postage at $0.82 in 2026.',
    bodyIntro: `<p>A window envelope has a transparent panel — usually a thin film of cellophane or glassine — cut into the front of the envelope. When a billing statement or invoice is folded and inserted correctly, the recipient's address printed on the document shows through the window. No labels, no separate addressing pass, no printer time spent on envelopes.</p>

<p>This is the format that drives nearly all consumer billing in the United States: utility bills, credit card statements, insurance invoices, medical billing, and bank statements. The window envelope architecture is built around volume mailing efficiency.</p>

<p>This page covers the sizes window envelopes are available in (most commonly <a href="/guides/envelope-sizes/no-10">#10</a> and <a href="/guides/envelope-sizes/no-9">#9</a>), single versus double-window varieties, USPS placement rules, and design considerations for billing-statement layouts.</p>`,
    useCases: `<h2>When to use a window envelope</h2>

<h3>Invoices and statements</h3>
<p>Single-window #10 envelopes are the dominant format for invoices, billing statements, and account summaries. The address prints in the upper-left of a folded statement; when the statement is trifolded with the address panel facing forward, it shows through the window in the lower-left of the envelope.</p>

<h3>Double-window for account references</h3>
<p>Double-window envelopes have two windows: the lower window shows the recipient address (same as single-window), and the upper window shows an account number, return-reply address, or transit-routing reference. Common in financial services and high-volume billing where the upper window helps with sortation or response handling.</p>

<h3>Payroll and employee mailings</h3>
<p>Window envelopes are common for paystubs (when paper checks are still mailed), W-2 forms, and HR correspondence. The format allows pre-printed forms to mail without manual addressing.</p>

<h3>Government and insurance correspondence</h3>
<p>Tax notices, benefits statements, insurance EOBs (explanations of benefits), and government program letters use window envelopes for the same reason commercial billing does: high volume, pre-printed addresses on the contents, no labeling step.</p>

<h3>When not to use a window envelope</h3>
<p>For personal correspondence, invitations, marketing letters where the envelope is meant to feel personal, or any mailing where the contents don't have the address pre-printed in the right position, a non-window envelope is the better choice.</p>`,
    postageNotes: `<h2>Window envelope postage and USPS placement rules</h2>

<h3>2026 First-Class postage</h3>
<p>Window envelopes follow standard letter-rate postage based on the underlying envelope size:</p>
<ul>
  <li>#10 window envelope, 1 ounce: <strong>$0.82</strong> Forever stamp / $0.78 metered</li>
  <li>#9 window envelope, 1 ounce: <strong>$0.82</strong> / $0.78 metered</li>
  <li>Each additional ounce up to 3.5 oz: <strong>$0.29</strong></li>
</ul>

<p>The window itself doesn't change the postage class — windows made of paper-compatible material (cellophane, glassine, or polypropylene film under USPS specs) keep the piece in letter-rate territory.</p>

<h3>USPS DMM 202 window placement rules</h3>
<p>USPS regulates where windows can sit on the envelope to ensure address barcodes print correctly and read accurately on automation equipment. Key rules:</p>
<ul>
  <li><strong>Address must show fully</strong> through the window even if the contents shift up to 0.25 inches in any direction</li>
  <li><strong>Clear space</strong> required around the address — no printed lines, logos, or graphics within the window or directly adjacent</li>
  <li><strong>Window film</strong> must be transparent enough for OCR scanners to read printed addresses through it</li>
  <li><strong>No reflective films</strong> — glossy or metallic windows interfere with USPS scanning equipment</li>
</ul>

<h3>Standard window dimensions and placement</h3>
<p>Common #10 single-window placement: window approximately 4.5 inches wide by 1 inch high, positioned 0.5 inches from the bottom edge and 0.875 inches from the left edge. These specs vary slightly by manufacturer and use case — confirm the exact window position on your envelope stock matches the address position on your printed contents before running a production batch.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 202.</p>`,
    faqs: [
      { q: 'What sizes do window envelopes come in?', a: 'The most common window envelope is the <a href="/guides/envelope-sizes/no-10">#10</a> (4.125" × 9.5"). Window <a href="/guides/envelope-sizes/no-9">#9</a> envelopes (3.875" × 8.875") are common for reply mail. A-series window envelopes exist but are less common. Larger windows are also available on 6×9 booklet envelopes for invoices and statements.' },
      { q: 'What is a double-window envelope?', a: 'A double-window envelope has two transparent panels: a lower window for the recipient address and an upper window for an account number, return-reply reference, or transit-routing number. Common in financial services billing and high-volume statements.' },
      { q: 'Are window envelopes more expensive to mail?', a: 'No. Window envelopes follow the same letter-rate postage as non-window envelopes of the same outer size — $0.82 for a #10 at 1 ounce in 2026. The window itself is made of USPS-compliant film and does not affect mailability or postage.' },
      { q: 'Where does the window go on a #10 envelope?', a: 'Standard #10 single-window placement is approximately 4.5 inches wide by 1 inch high, positioned 0.5 inches from the bottom edge and 0.875 inches from the left edge of the envelope front. Variations exist; confirm window placement against your printed contents before production.' },
      { q: 'Can I design my own window envelope?', a: 'Yes, but custom window placements must comply with USPS DMM 202 — the window must allow the address to show fully through, even if the contents shift slightly during mailing. For non-standard layouts, confirm specs with a USPS Mail Design Analyst or work with a print partner familiar with the rules.' },
    ],
  },

  // ============================================================
  // USPS minimum and maximum — mailability rules
  // ============================================================
  'usps-minimum-maximum': {
    title: 'USPS Minimum Envelope Size: 3.5 × 5 Inches (Plus Maximum)',
    metaDescription: 'USPS minimum envelope size is 3.5 × 5 inches. Maximum is 6.125 × 11.5 inches for letters. Complete size requirements, weight limits, and mailing rules.',
    h1: 'USPS Minimum & Maximum Envelope Sizes',
    lastUpdated: '2026-05-11',
    dimensionsInches: 'Min 3.5"×5"×0.007" / Max letter 6.125"×11.5"×0.25"',
    dimensionsMm: 'Min 88.9mm×127mm / Max letter 155.6mm×292.1mm',
    weightLimitOz: 3.5,
    postageClass: 'Varies — letter, flat, or parcel',
    primaryUseCases: [
      'Verifying envelope mailability before printing',
      'Designing custom envelopes',
      'Avoiding nonmachinable surcharges',
      'Sizing direct mail pieces correctly',
      'Understanding letter vs. flat boundaries',
    ],
    retrievalParagraph: 'USPS minimum mailable envelope size is 3.5 inches high by 5 inches long by 0.007 inches thick. Maximum letter-rate envelope size is 6.125 inches high by 11.5 inches long by 0.25 inches thick, with a maximum weight of 3.5 ounces and an aspect ratio (length divided by height) between 1.3 and 2.5. Pieces outside these letter-rate limits are reclassified as flats (up to 12"×15"×0.75") with postage starting at $1.63 in 2026.',
    bodyIntro: `<p>Every envelope mailed through USPS falls into one of three categories: letter, flat (also called a large envelope), or parcel. Which category a piece falls into determines what postage it costs, whether it qualifies for automation discounts, and in some cases whether it can be mailed at all.</p>

<p>The boundaries between categories are defined by physical measurements: height, length, thickness, and weight. This page covers the exact USPS minimum and maximum dimensions for each category, the aspect-ratio rule that catches most surprise surcharges, and how to verify your envelope is mailable before committing to a print run.</p>

<p>All rules sourced from USPS Domestic Mail Manual sections 101 and 201.</p>`,
    useCases: `<h2>USPS envelope size categories</h2>

<h3>Letter-size minimum</h3>
<p>Every mailable envelope or postcard must meet these absolute minimums:</p>
<ul>
  <li><strong>Height:</strong> 3.5 inches</li>
  <li><strong>Length:</strong> 5 inches</li>
  <li><strong>Thickness:</strong> 0.007 inches</li>
</ul>
<p>Anything smaller than 3.5 by 5 by 0.007 inches is not accepted by USPS. The minimum is the same for envelopes and postcards.</p>

<h3>Letter-size maximum</h3>
<p>To qualify for letter rates (the lowest postage tier), a piece must stay within all of these:</p>
<ul>
  <li><strong>Height:</strong> 6.125 inches maximum</li>
  <li><strong>Length:</strong> 11.5 inches maximum</li>
  <li><strong>Thickness:</strong> 0.25 inches maximum</li>
  <li><strong>Weight:</strong> 3.5 ounces maximum</li>
  <li><strong>Aspect ratio:</strong> length divided by height between 1.3 and 2.5</li>
</ul>
<p>Cross any one of these and the piece moves to flat rate (currently $1.63 starting versus $0.82 for letter rate).</p>

<h3>The aspect ratio rule</h3>
<p>Aspect ratio (length divided by height) must fall between 1.3 and 2.5 for a piece to be machinable at letter rate. A square envelope has an aspect ratio of 1.0 — automatically nonmachinable, with a $0.44 surcharge per piece in 2026. A very long, narrow envelope with an aspect ratio above 2.5 is also nonmachinable.</p>

<h3>Flat (large envelope) maximums</h3>
<p>If a piece exceeds letter-size limits but stays within these dimensions, it's a flat:</p>
<ul>
  <li><strong>Height:</strong> 12 inches maximum</li>
  <li><strong>Length:</strong> 15 inches maximum</li>
  <li><strong>Thickness:</strong> 0.75 inches maximum</li>
  <li><strong>Weight:</strong> 13 ounces maximum at First-Class flat rate</li>
</ul>
<p>Flat-rate postage starts at $1.63 for the first ounce in 2026, with $0.20 added per additional ounce.</p>

<h3>Beyond flat — parcel rates</h3>
<p>Pieces over 12 by 15 by 0.75 inches, or over 13 ounces, are rated as parcels and ship under USPS Ground Advantage or Priority Mail rates — significantly higher than flat rates, with separate dimensional rules.</p>

<h3>Postcard-specific minimums and maximums</h3>
<p>Postcards have their own size rules: minimum 3.5 by 5 inches, maximum at the postcard rate of 4.25 by 6 by 0.016 inches. Pieces between 4.25 by 6 and 6.125 by 11.5 inches are rated at letter rate (oversized postcards). Postcards thicker than 0.016 inches but within letter dimensions also rate at letter rate.</p>`,
    postageNotes: `<h2>2026 postage rates by size category</h2>

<h3>Letter rate</h3>
<ul>
  <li>1 ounce, Forever stamp: <strong>$0.82</strong></li>
  <li>1 ounce, metered: <strong>$0.78</strong></li>
  <li>Each additional ounce, up to 3.5 oz: <strong>$0.29</strong></li>
  <li>Postcard rate: <strong>$0.65</strong></li>
</ul>

<h3>Nonmachinable letter surcharge</h3>
<p>If a piece meets letter-size dimensions but fails machinability standards (aspect ratio outside 1.3–2.5, rigid contents, uneven thickness, etc.), the postage is letter rate plus a <strong>$0.44 nonmachinable surcharge per piece</strong>. For a 1-ounce nonmachinable letter, that's $0.82 + $0.44 = $1.26.</p>

<h3>Flat rate (large envelope)</h3>
<ul>
  <li>1 ounce: <strong>$1.63</strong></li>
  <li>Each additional ounce, up to 13 oz: <strong>$0.20</strong></li>
</ul>

<h3>Why these limits matter for direct mail</h3>
<p>The cost difference between letter rate and flat rate, multiplied across a 5,000-piece campaign, is significant: $0.85 per piece × 5,000 = $4,250. Designing direct mail pieces to stay just inside letter-rate limits is one of the highest-leverage decisions in mail-piece planning. We work through these tradeoffs on every campaign — see our <a href="/services/direct-mail">direct mail services</a>.</p>

<h3>How to verify your piece</h3>
<p>Before printing a run, measure a finished sample piece (envelope plus all contents):</p>
<ol>
  <li>Use a ruler, not the spec sheet — measure actual dimensions</li>
  <li>Weigh on a postal scale</li>
  <li>Calculate aspect ratio (length ÷ height)</li>
  <li>Test flexibility by bending around an 11-inch diameter object</li>
  <li>Test thickness by sliding through a 0.25 inch gauge</li>
</ol>
<p>If any measurement is at or near a limit, plan for the higher postage rate or redesign the piece.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 101 and 201.</p>`,
    faqs: [
      { q: 'What is the minimum envelope size USPS will mail?', a: 'The USPS minimum is 3.5 inches high by 5 inches long by 0.007 inches thick. Pieces smaller than this in any dimension are not accepted by USPS for mailing.' },
      { q: 'What is the maximum size for a first-class letter envelope?', a: 'The maximum letter-rate envelope is 6.125 inches high by 11.5 inches long by 0.25 inches thick, with a maximum weight of 3.5 ounces. Pieces exceeding any of these limits are reclassified as flats with higher postage.' },
      { q: 'How thick can an envelope be before it is rated as a flat?', a: 'Letter-rate envelopes can be up to 0.25 inches thick. Beyond 0.25 inches, the piece is rated as a flat, with postage starting at $1.63 versus $0.82 for letter rate. Flats can be up to 0.75 inches thick.' },
      { q: 'What is the aspect ratio rule for envelopes?', a: 'The aspect ratio (length divided by height) of a letter-rate envelope must fall between 1.3 and 2.5 to qualify for machinable rates. A square envelope has an aspect ratio of 1.0 and is automatically nonmachinable, triggering a $0.44 surcharge per piece in 2026.' },
      { q: 'What happens if my envelope is too big for letter rate?', a: 'If the envelope exceeds 6.125 by 11.5 by 0.25 inches or weighs over 3.5 ounces, it is reclassified as a flat. Flat-rate postage starts at $1.63 for the first ounce in 2026, more than double the letter rate of $0.82.' },
      { q: 'What is the maximum size for a flat envelope?', a: 'The maximum flat envelope is 12 inches high by 15 inches long by 0.75 inches thick, with a maximum weight of 13 ounces at First-Class flat rate. Pieces beyond these dimensions are rated as parcels.' },
    ],
  },

  // ============================================================
  // Business envelope types — comparison reference
  // ============================================================
  'business-envelope-types': {
    title: 'Business Envelope Sizes: Complete Comparison Chart',
    metaDescription: 'Compare every standard business envelope size — #10, #9, A-series, 6×9, 9×12, and legal. Choose the right envelope by use case and postage class.',
    h1: 'Business Envelope Sizes: Complete Comparison',
    lastUpdated: '2026-05-05',
    dimensionsInches: 'Various — see comparison',
    dimensionsMm: 'Various — see comparison',
    weightLimitOz: 3.5,
    postageClass: 'Varies by size',
    primaryUseCases: [
      'Choosing the right envelope for a campaign',
      'Comparing letter-rate options',
      'Understanding letter vs. flat tradeoffs',
      'Sizing decisions for printed mail pieces',
      'Reference for envelope ordering',
    ],
    retrievalParagraph: 'Standard business envelope sizes range from the #10 (4.125" × 9.5"), the dominant US business envelope, through the #9 reply envelope (3.875" × 8.875"), the A-series for invitations (A6, A7, A9, A10), legal envelopes for 8.5×14 documents (#11, #12, #14), and the larger 6×9 and 9×12 formats for booklets and unfolded documents. Letter-rate envelopes mail at $0.82 in 2026; flat-rate envelopes (typically 9×12 and larger) mail at $1.63 starting.',
    bodyIntro: `<p>Choosing a business envelope comes down to four questions: what's going inside, whether the piece needs letter rate or flat rate, whether the recipient should see the address through a window, and how formal the format needs to be.</p>

<p>This page is a comparison reference covering every standard business envelope size, organized by use case rather than by number. For deep-dive specs on any individual size, follow the link to the dedicated page for that envelope.</p>`,
    useCases: `<h2>Choosing a business envelope by use case</h2>

<h3>Standard letter mail (folded 8.5×11 documents)</h3>
<ul>
  <li><strong><a href="/guides/envelope-sizes/no-10">#10 envelope</a></strong> — 4.125" × 9.5" — the default for almost all business correspondence, invoices, and statements</li>
  <li><strong><a href="/guides/envelope-sizes/no-9">#9 envelope</a></strong> — 3.875" × 8.875" — the standard reply envelope inside a #10 outer (donation appeals, billing replies)</li>
</ul>

<h3>Invitations and announcements</h3>
<ul>
  <li><strong><a href="/guides/envelope-sizes/a6">A6 envelope</a></strong> — 4.75" × 6.5" — save-the-dates, shower invitations, photo announcements</li>
  <li><strong><a href="/guides/envelope-sizes/a7">A7 envelope</a></strong> — 5.25" × 7.25" — wedding invitations (the dominant choice), formal announcements, holiday photo cards</li>
  <li><strong><a href="/guides/envelope-sizes/a9">A9 envelope</a></strong> — 5.75" × 8.75" — larger formal invitations, programs, half-page brochures</li>
  <li><strong><a href="/guides/envelope-sizes/a10">A10 envelope</a></strong> — 6" × 9.5" — oversized announcements, premium direct mail (note: just under letter-rate maximum)</li>
</ul>

<h3>Legal-size document mailings</h3>
<ul>
  <li><strong><a href="/guides/envelope-sizes/legal">#14 legal envelope</a></strong> — 5" × 11.5" — fits 8.5 × 14 paper folded in half</li>
  <li><strong>#12 legal envelope</strong> — 4.75" × 11" — fits 8.5 × 14 paper folded in thirds</li>
  <li><strong>#11 legal envelope</strong> — 4.5" × 10.375" — smaller variant of trifolded legal</li>
</ul>

<h3>Booklets and multi-page documents</h3>
<ul>
  <li><strong><a href="/guides/envelope-sizes/6x9">6×9 envelope</a></strong> — booklets, brochures, multi-page direct mail (often reclassified as flat rate)</li>
</ul>

<h3>Unfolded letter-size and larger documents</h3>
<ul>
  <li><strong><a href="/guides/envelope-sizes/9x12">9×12 envelope</a></strong> — unfolded 8.5 × 11 documents, certificates, photography prints, annual reports — always flat rate</li>
</ul>

<h3>Window envelopes</h3>
<ul>
  <li><strong><a href="/guides/envelope-sizes/window">Window envelopes</a></strong> available in #9 and #10 (most common), with single-window and double-window varieties for billing, statements, and pre-addressed contents</li>
</ul>

<h3>Decision tree</h3>
<p>Start with the document. If it's an 8.5 × 11 letter folded in thirds, use a #10. If it's a 5 × 7 invitation, use an A7. If it's an unfolded 8.5 × 11 document, use a 9×12 flat. If it's an 8.5 × 14 legal document, use a #14. For everything else, check the comparison table above and consider the postage class first — letter rate at $0.82 versus flat rate at $1.63 is a meaningful cost difference at any volume.</p>`,
    postageNotes: `<h2>Postage classes by envelope type</h2>

<h3>Letter rate ($0.82 starting in 2026)</h3>
<p>All envelopes within USPS letter-size limits — 6.125" × 11.5" × 0.25", under 3.5 ounces, aspect ratio 1.3–2.5:</p>
<ul>
  <li>#10, #9, all A-series (A6, A7, A9, A10)</li>
  <li>Legal envelopes (#11, #12, #14)</li>
  <li>6×9 envelopes when contents are thin enough</li>
</ul>

<h3>Flat rate ($1.63 starting in 2026)</h3>
<p>Envelopes that exceed letter-size limits or contain bulky enough contents to be reclassified:</p>
<ul>
  <li>9×12 (always flat — exceeds letter dimensions)</li>
  <li>10×13 catalog envelopes</li>
  <li>6×9 envelopes with thick booklet or brochure inserts</li>
  <li>Any letter-size envelope reclassified due to thickness, weight, or rigidity</li>
</ul>

<h3>Nonmachinable surcharge ($0.44 in 2026)</h3>
<p>Letter-size envelopes that fail machinability standards — square envelopes, pieces with rigid contents, very thick or uneven pieces — are charged letter rate plus a $0.44 surcharge per piece.</p>

<h3>Volume discounts</h3>
<p>Bulk presort and automation discounts can reduce per-piece costs by $0.10–$0.30 below retail rates for letter-size pieces, and by larger amounts for flats. For mailings of 200 pieces or more, working with a print and mail partner that handles presort is the only way to capture these savings consistently. <a href="/services/direct-mail">Cornerstone direct mail</a> handles presort, automation, and full BMEU induction on every qualifying job.</p>

<p class="text-sm text-navy-600/50 not-italic">Last verified: May 2026. Source: USPS Domestic Mail Manual 201, 301, and current rate schedules.</p>`,
    faqs: [
      { q: 'What is the most common business envelope size?', a: 'The <a href="/guides/envelope-sizes/no-10">#10 envelope</a> (4.125" × 9.5") is by far the most common business envelope in the United States. It is the default for invoices, statements, business letters, and most direct mail.' },
      { q: 'Which business envelope is cheapest to mail?', a: 'Any letter-size envelope mails at the same First-Class letter rate of $0.82 in 2026 — #9, #10, A-series, and legal envelopes all share this rate. The cheapest practical option for personal-feeling mail is the #10 because it is widely stocked and machinable.' },
      { q: "What's the difference between a letter envelope and a flat envelope?", a: 'Letter envelopes are 6.125" × 11.5" × 0.25" or smaller, weigh under 3.5 ounces, and have an aspect ratio between 1.3 and 2.5. They mail at $0.82 starting. Flat envelopes (large envelopes) exceed letter-size limits, can be up to 12" × 15" × 0.75", weigh up to 13 ounces, and start at $1.63 postage.' },
      { q: 'When should I use a 9×12 envelope instead of a #10?', a: 'Use a <a href="/guides/envelope-sizes/9x12">9×12</a> when documents must arrive unfolded — certificates, contracts, photography prints, and important presentations. Use a <a href="/guides/envelope-sizes/no-10">#10</a> when contents can be folded and the lower postage cost ($0.82 vs $1.63) matters.' },
      { q: 'What size envelope do I need for wedding invitations?', a: 'For 5 by 7 inch wedding invitations (the standard size), use an <a href="/guides/envelope-sizes/a7">A7 envelope</a> (5.25" × 7.25"). This is the dominant wedding invitation envelope in the US.' },
      { q: 'Where can I order custom business envelopes?', a: 'Cornerstone Services prints custom envelopes in every standard size with your branding, return address, window placement, and security tints — and pairs envelope production with direct mail and printing services. <a href="/services/direct-mail">Get a quote</a>.' },
    ],
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
