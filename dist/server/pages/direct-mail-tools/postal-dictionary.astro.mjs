/* empty css                                     */
import { g as createComponent, j as renderComponent, r as renderTemplate, k as Fragment, u as unescapeHTML, m as maybeRenderHead, i as addAttribute } from '../../chunks/astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_B4gpCp1X.mjs';
import { $ as $$PageHero } from '../../chunks/PageHero_DTn0WEdl.mjs';
import { $ as $$CTASection } from '../../chunks/CTASection_CpJqys7-.mjs';
import { B as BUSINESS } from '../../chunks/site_BORfRXu4.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$PostalDictionary = createComponent(($$result, $$props, $$slots) => {
  const lastUpdated = "2026-05-07";
  const lastUpdatedDisplay = "May 2026";
  const canonical = "https://crst.net/direct-mail-tools/postal-dictionary";
  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  const glossary = [
    { term: "AADC", definition: "Automated Area Distribution Center. A USPS processing facility where mail is sorted for delivery to individual post offices within a geographic area. Mailers who presort to the AADC level receive postage discounts. AADC appears in postage rate tables as one step above Mixed AADC and one step below 5-digit presort." },
    { term: "ACS", definition: "Address Change Service. An automated USPS system that provides electronic address correction notifications for undeliverable-as-addressed mail. Mailers receive digital records of address changes and non-deliverables instead of physical returned mail \u2014 faster, cheaper, and easier to process than physical returns." },
    { term: "Address Block", definition: `The area on a mail piece where the recipient's delivery address is printed. USPS requires the address block to be positioned within a specific "read area" for automated processing, with the delivery address on the last address line above the city, state, and ZIP.` },
    { term: "Address Service Requested", definition: "A USPS ancillary service endorsement. If the piece is undeliverable as addressed, USPS will attempt to forward it; if unforwardable, it is returned to the mailer with the new address or reason attached. A per-piece fee applies. Used by mailers who want both list correction and physical delivery attempts. See also: Ancillary Service Endorsement." },
    { term: "Ancillary Service Endorsement", definition: "A printed instruction on a mail piece directing USPS how to handle it if undeliverable as addressed. The four standard endorsements are: Address Service Requested, Forwarding Service Requested, Return Service Requested, and Change Service Requested. Each triggers different USPS handling and may generate an address correction notice or a per-piece fee. First-Class Mail is forwarded automatically without an endorsement." },
    { term: "Automation Rate", definition: "A discounted postage rate available to mailers who prepare mail to USPS automation standards \u2014 readable Intelligent Mail barcodes, properly formatted addresses, and correct presort levels. Automation rates are lower than presort-only (nonautomation) rates. Most professionally produced direct mail qualifies for automation rates." },
    { term: "Barcode Clear Zone", definition: 'The lower-right portion of the mail piece address side (4.5" from the right edge, 0.625" from the bottom) reserved exclusively for the Intelligent Mail barcode. No printing, color, or imagery is allowed in this area. Violations can disqualify a piece from automation rates.' },
    { term: "BMEU", definition: "Business Mail Entry Unit. A dedicated USPS acceptance facility where mail service providers and permit holders deposit presorted bulk mailings. Operates separately from retail post offices \u2014 staffed specifically for high-volume commercial entry with trained acceptance clerks. EDDM BMEU mailings use this channel for carrier route saturation distribution at a lower per-piece rate than EDDM Retail." },
    { term: "BRM", definition: "Business Reply Mail. Pre-addressed, postage-prepaid mail pieces that allow recipients to respond without paying postage. The mailer pays postage plus a per-piece fee only on pieces that are actually returned. Used for order forms, surveys, and donation envelopes." },
    { term: "Bulk Mail", definition: 'Mail submitted in volume at commercial presort rates. For Marketing Mail, the minimum is 200 pieces or 50 lbs per mailing. Requires a mailing permit and proper presort preparation. "Bulk mail" is a general term \u2014 the formal USPS mail class is Marketing Mail (formerly Standard Mail or Bulk Rate).' },
    { term: "Carrier Route", definition: "A specific delivery route assigned to a postal carrier, covering a defined geographic area. Each route has a unique identifier (e.g., C001, R001). Mailers who sort to the carrier route level receive the deepest presort discounts. EDDM uses carrier route selection to target neighborhoods." },
    { term: "CASS", definition: "Coding Accuracy Support System. A USPS program that certifies address-matching software. Addresses processed through CASS-certified software are verified against the USPS master address database for accuracy and deliverability. CASS certification is required for automation-rate mailings." },
    { term: "Change Service Requested", definition: "A USPS ancillary service endorsement directing USPS to discard the undeliverable piece and send the mailer an electronic ACS notification with the new address or reason for non-delivery. No physical return occurs. Lower per-piece cost than Forwarding or Return Service Requested \u2014 the standard choice for bulk list maintenance. See also: Ancillary Service Endorsement, ACS." },
    { term: "Commingling", definition: "Combining mail from multiple mailers or jobs into a single presorted mailing to achieve deeper presort levels and lower per-piece postage rates. Cornerstone commingles client mailings with compatible pieces to qualify for rates individual clients could not achieve alone." },
    { term: "Copalletization", definition: "Combining mail from different mailers on the same pallets to increase density and qualify for destination-entry postage discounts. Similar to commingling but focuses on container-level efficiency rather than presort level." },
    { term: "Courtesy Reply Mail", definition: "Pre-addressed return envelopes included in a mailing, but without prepaid postage \u2014 the recipient must apply their own stamp. Less expensive for the mailer than BRM since there is no per-piece postage fee. Common in billing statements and membership renewal mailings." },
    { term: "CRRT", definition: "Carrier Route Presort. Mail that is sorted down to individual carrier routes before submission. The deepest presort level for Marketing Mail and yields the lowest per-piece rate. CRRT mailings must meet density minimums (usually 10+ pieces per route) to qualify." },
    { term: "DAL", definition: "Delivery Address Line. The line of the address that contains the street address, PO Box, or rural route information \u2014 used by USPS for final delivery sorting. Correct DAL formatting is required for automation processing." },
    { term: "DMM", definition: "Domestic Mail Manual. The official USPS publication containing all rules and standards for domestic mail preparation, classification, and postage rates. The DMM is the authoritative reference for every presort requirement, size standard, and indicia specification. Available at pe.usps.com." },
    { term: "DPV", definition: "Delivery Point Validation. A USPS database check that confirms whether a specific address \u2014 including apartment and suite number \u2014 is a valid, deliverable point on a carrier route. DPV catches addresses where the street exists but the unit number is invalid." },
    { term: "Drop Ship", definition: "Delivering presorted mail directly to a destination USPS facility (SCF, NDC, or DDU) closer to the recipient, bypassing upstream processing centers and qualifying for destination-entry discounts. Drop-shipping can save $0.005\u2013$0.025+ per piece depending on entry level. Cornerstone offers drop-ship entry for qualifying campaigns." },
    { term: "EDDM", definition: 'Every Door Direct Mail. A USPS program that lets mailers deliver to every address on selected carrier routes without purchasing a mailing list. Available as EDDM Retail (up to 5,000 pieces per day at the post office, no permit required) and EDDM BMEU (bulk, no volume cap, requires a permit). EDDM pieces must meet minimum size requirements and be addressed to "Postal Customer."' },
    { term: "ECRWSS", definition: "Every Carrier Route Walk Sequence Saturation. The presort designation for saturation mail \u2014 pieces delivered to every address on every selected carrier route, sorted in the exact order a carrier walks their route. Printed on the indicia of EDDM and carrier route saturation mailings. Qualifies for the deepest Marketing Mail discounts. See also: Saturation Mail, Walk Sequence." },
    { term: "eDoc", definition: "Electronic Documentation. The electronic submission of mailing information (Mail.dat or Mail.xml format) required for Full-Service Intelligent Mail. Replaces paper postage statements for qualifying mailings and enables piece-level tracking and automated postage payment." },
    { term: "Flat", definition: 'A mail piece that exceeds letter dimensions (larger than 6.125" \xD7 11.5" or thicker than 0.25") but fits within flat size limits (max 12" \xD7 15" \xD7 0.75"). Catalogs, large envelopes, and oversized self-mailers are common flats. Flat postage rates are higher than letter rates.' },
    { term: "Forwarding Service Requested", definition: "A USPS ancillary service endorsement. If the recipient has filed a forwarding order, USPS forwards the piece to their new address and sends the mailer an address correction notice. If unforwardable, the piece is returned to the mailer. Applies to Marketing Mail and Periodicals \u2014 First-Class Mail is forwarded automatically without this endorsement. A per-piece fee applies to returned pieces. See also: Ancillary Service Endorsement." },
    { term: "Full-Service IMb", definition: "Full-Service Intelligent Mail. A USPS program where mailers provide complete electronic mailing documentation in exchange for additional postage discounts and end-to-end piece-level tracking data. Requires eDoc submission and compliant IMb barcodes on every piece, tray, and container." },
    { term: "IMb", definition: "Intelligent Mail Barcode. The 65-bar barcode printed in the lower right of automated mail pieces that encodes routing information, mailer ID, and a unique serial number. Required for automation-rate postage discounts. The IMb enables piece-level tracking through the postal network and is mandatory for Full-Service mailings." },
    { term: "Indicia", definition: 'A printed marking in the upper-right corner of a mail piece that serves as proof of postage payment in lieu of a stamp or postage meter. An indicia shows the mail class (e.g., PRSRT STD), the presort level (e.g., ECRWSS), the entry post office location and ZIP code, and the permit number. Cornerstone prints a properly formatted indicia on every piece we produce. See the "How to Read a Mail Indicia" section on this page for a labeled example.' },
    { term: "Inkjet Addressing", definition: "The process of printing recipient addresses directly onto mail pieces using high-speed industrial inkjet printers. Standard for bulk mail preparation. Produces cleaner, more consistent addressing than laser-printed labels and eliminates the label-application step." },
    { term: "LACS", definition: 'Locatable Address Conversion System. A USPS system that converts rural-style addresses to city-style formats (e.g., "RR 2 Box 45" \u2192 "123 Main St") for improved automated delivery. LACS processing is part of standard address hygiene for bulk mailings.' },
    { term: "Letter", definition: 'A mail piece that meets USPS letter-size dimensions: between 3.5" \xD7 5" (minimum) and 6.125" \xD7 11.5" (maximum), no thicker than 0.25", and weighing no more than 3.5 oz for First-Class or 3.3 oz for Marketing Mail. Letter-size pieces qualify for the lowest per-piece postage rates in each mail class.' },
    { term: "Machinable", definition: "A mail piece that meets all USPS requirements for automated processing \u2014 correct size, weight, flexibility, aspect ratio, and barcode readability. Non-machinable pieces cannot be run through USPS sorting equipment and incur a non-machinable surcharge ($0.30 for First-Class letters as of 2026)." },
    { term: "Mail.dat", definition: "A standardized electronic file format used to submit mailing documentation to USPS for Full-Service mailings. Contains header, detail, and container records for each mailing job. Required for large-volume mailers using Full-Service IMb." },
    { term: "Marketing Mail", definition: "A USPS mail class (formerly Standard Mail / Bulk Rate) for advertising, promotional, and catalog mailings. Requires a minimum of 200 pieces or 50 lbs and a mailing permit. Lower postage rates than First-Class but no forwarding or return service by default. Delivery is typically 3\u201310 business days." },
    { term: "Merge/Purge", definition: "The process of combining multiple mailing lists, removing duplicate records, and suppressing unwanted addresses (such as do-not-mail requests or deceased individuals) to produce a clean, unduplicated mailing file. Merge/purge runs before every campaign at Cornerstone." },
    { term: "NCOA", definition: "National Change of Address. A USPS database containing all permanent change-of-address orders filed in the past 48 months. Processing your mailing list through NCOA updates moved addresses before mailing, reducing undeliverable mail and qualifying for Move Update compliance \u2014 a USPS requirement for presort mailings. Cornerstone processes every list through NCOA before production." },
    { term: "NDC", definition: "Network Distribution Center. A major USPS hub facility that processes mail for a large geographic region. Dropping presorted mail at the NDC level qualifies for destination-entry discounts, though SCF and DDU entry earn deeper discounts." },
    { term: "Non-Machinable", definition: "A mail piece that cannot be processed on USPS automated sorting equipment due to size, shape, weight, or other physical characteristics (e.g., square envelopes, rigid contents, clasps). Non-machinable letters incur a $0.30 surcharge per piece in addition to base postage." },
    { term: "PARS", definition: "Presort Accuracy, Reliability, and Speed. The USPS verification process that checks whether a mailing meets presort and preparation standards before postal acceptance. PARS audits are conducted at the BMEU or post office at the time of mailing." },
    { term: "Periodicals", definition: "A USPS mail class for newspapers, magazines, and other publications mailed at regular intervals to subscribers. Requires USPS Periodicals authorization (application required) and offers lower rates than Marketing Mail for eligible publishers." },
    { term: "Permit Imprint", definition: "A printed postage marking (indicia) authorized by a USPS mailing permit. Shows the permit number, entry post office name and ZIP, and mail class. The most common form of bulk mail postage payment \u2014 avoids metering or stamping individual pieces. See also: Indicia, Permit Number." },
    { term: "Permit Number", definition: 'A unique identifier assigned by USPS to a bulk mail permit account at a specific entry post office. Printed on permit imprint indicia as "PERMIT NO. [number]." Permit numbers are local to the office of mailing \u2014 the same organization may hold permit 898 at one facility and a different number elsewhere. The permit number identifies both the paying mailer and the entry location. See also: Permit Imprint, BMEU.' },
    { term: "Postage Statement (PS Form 3602)", definition: "The form submitted to USPS with each presorted mailing reporting the number of pieces, weight, and postage due at each rate level. Required for postal acceptance. Electronic equivalents (eDoc) are used for Full-Service mailings." },
    { term: "Postcard", definition: 'A single-sheet, unfolded mail piece between 3.5" \xD7 5" and 4.25" \xD7 6", made of card stock at least 0.007" thick. Qualifies for the lowest First-Class ($0.65 retail) or Marketing Mail postage rates. Pieces exceeding postcard dimensions mail at letter or flat rates.' },
    { term: "Presort", definition: "The process of sorting mail by ZIP code, carrier route, or delivery sequence before submitting to USPS. Deeper presort levels earn greater postage discounts. Required for all bulk mail. Automation presort additionally requires IMb barcodes and address formatting compliance." },
    { term: "PRSRT STD", definition: "Presorted Standard. The mail class and presort designation printed on the indicia of Marketing Mail pieces \u2014 bulk advertising, promotional mail, coupons, and catalogs. Confirms the mailing was sorted to USPS presort requirements before submission and qualifies for bulk postage discounts. Appears in the upper-right corner of bulk mail in place of a stamp. See also: Indicia, Automation Rate." },
    { term: "PS Form 3624", definition: "The USPS application form for nonprofit mailing authorization. Organizations must document their nonprofit status to qualify for reduced nonprofit Marketing Mail rates. Cornerstone assists nonprofits in completing and submitting PS Form 3624." },
    { term: "Return Service Requested", definition: "A USPS ancillary service endorsement directing USPS to return the piece to the mailer if undeliverable, along with the reason and the new address if known. The mailer pays return postage. Used to verify mailing lists or recover moved recipients. More expensive than Change Service Requested but provides a physical piece with the correction attached. See also: Ancillary Service Endorsement." },
    { term: "Saturation Mail", definition: 'Mail delivered to at least 90% of all addresses (or 75% for enhanced carrier route) on a carrier route. Qualifies for the deepest Marketing Mail presort discounts. EDDM is a form of saturation mailing. Saturation campaigns require no individual addressing \u2014 pieces are addressed to "Postal Customer" or "Current Resident."' },
    { term: "SCF", definition: "Sectional Center Facility. A USPS mail processing plant that serves a specific group of ZIP codes sharing the same first three digits. Dropping presorted mail at the SCF earns a destination-entry discount. Abbreviated facility names appear on indicia and tray labels (e.g., SEPA for the Southeastern Pennsylvania SCF)." },
    { term: "Self-Mailer", definition: "A folded mail piece that is mailed without an envelope. Must be secured with tabs or wafer seals per USPS DMM 201.3 standards. Common formats include bi-fold, tri-fold, and booklet styles. Self-mailers are cost-effective for high-volume campaigns because they eliminate envelope and insertion costs." },
    { term: "SEPA", definition: 'Southeastern Pennsylvania. The abbreviated facility name identifying the USPS Sectional Center Facility that serves ZIP codes beginning with 190\u2013196 (Philadelphia metro and surrounding counties, including Chester, Delaware, and parts of Montgomery). Appears on permit imprint indicia and tray labels when a mailing was entered at this SCF. "SEPA 19399" on an indicia means the mailing was deposited at the West Chester, PA area postal facility. See also: SCF, Permit Number.' },
    { term: "Tabbing", definition: "Applying adhesive tabs or wafer seals to self-mailers to keep them closed during postal processing. Tab placement, quantity, and size are specified in USPS DMM 201.3 based on piece dimensions and fold type. Incorrect tabbing can cause pieces to open in processing, resulting in surcharges or refusal." },
    { term: "UAA", definition: "Undeliverable As Addressed. Mail that cannot reach the recipient because the address is invalid, the person has moved without filing a forwarding order, or the address is vacant. Marketing Mail is discarded by USPS when UAA \u2014 it is not forwarded or returned by default. Running NCOA and CASS certification before mailing significantly reduces UAA rates." },
    { term: "Union Bug", definition: "A small printed label or mark on printed materials indicating the piece was produced at a union print shop. Required by many labor organizations, political campaigns, and government entities. Cornerstone is a union printer and includes the union bug on all qualifying pieces." },
    { term: "Walk Sequence", definition: "The order in which a letter carrier physically delivers mail on their route \u2014 building by building, door by door, in sequence. Mail presorted in walk sequence (Delivery Point Sequence / DPS) qualifies for the deepest automation discounts and is the basis for ECRWSS saturation mailings." },
    { term: "Zone Chart", definition: "A USPS reference showing the zone (distance band) between an origin ZIP code and destination ZIP code. Zone affects postage for packages, Periodicals, and some drop-ship destination-entry calculations. Zones range from 1 (local) to 9 (most distant)." }
  ];
  const grouped = {};
  glossary.forEach((item) => {
    const letter = item.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(item);
  });
  const letters = Object.keys(grouped).sort();
  const org = {
    "@type": "Organization",
    "@id": "https://crst.net/#organization",
    name: "Cornerstone Services, Inc.",
    url: "https://crst.net",
    telephone: "+1-845-255-5722",
    foundingDate: "1998",
    address: {
      "@type": "PostalAddress",
      streetAddress: "387 Malden Turnpike",
      addressLocality: "Saugerties",
      addressRegion: "NY",
      postalCode: "12477",
      addressCountry: "US"
    }
  };
  const faqs = [
    {
      q: "What does PRSRT STD mean on mail?",
      a: "When you receive a piece of mail marked PRSRT STD, you're holding a bulk advertising mailer \u2014 a sale circular, coupon pack, promotional newsletter, or similar piece. PRSRT STD means the mailing was presorted to USPS requirements before submission, qualifying it for discounted bulk postage rates. It's the standard indicia marking for what USPS calls Marketing Mail (formerly Standard Mail or Bulk Rate). You'll often see it paired with ECRWSS (indicating neighborhood saturation delivery) and a permit number identifying the company that sent it."
    },
    {
      q: "What is a BMEU and how does EDDM BMEU work?",
      a: "A BMEU (Business Mail Entry Unit) is the USPS facility where mail service providers bring completed, presorted bulk mailings for acceptance \u2014 the commercial loading dock of the postal system. We arrive with pallets of sorted, barcoded mail, a postage statement, and a permit account number; USPS verifies and accepts the mailing before it enters distribution. EDDM BMEU specifically uses this channel for carrier route saturation mail. As of July 12, 2026, BMEU DDU entry costs $0.259/piece vs. EDDM Retail at $0.260 \u2014 a $0.001 difference. The primary advantage is operational: single induction point, no 5,000-piece-per-ZIP daily cap, permit-imprint billing."
    },
    {
      q: "What does ECRWSS mean on mail?",
      a: `ECRWSS on an indicia tells you the mailing went to every single address on selected carrier routes, sorted in the exact walk order of the carrier. It's the presort level used for EDDM and neighborhood saturation campaigns. If you're holding a piece marked ECRWSS, every household on your carrier route received the same piece on the same day. The full expansion is Every Carrier Route Walk Sequence Saturation \u2014 a mouthful that essentially means "everyone on every selected route, in delivery order."`
    },
    {
      q: 'What does "Forwarding Service Requested" mean on a piece of mail?',
      a: `"Forwarding Service Requested" is a printed instruction from the mailer telling USPS: if this person has moved, forward the piece to their new address and notify us of the change. If there's no forwarding address on file, return the piece to the mailer. It's most commonly printed on Marketing Mail pieces by mailers who want to keep their list current. One important note: First-Class Mail is automatically forwarded without any endorsement \u2014 "Forwarding Service Requested" only matters for Marketing Mail and Periodicals, which are not forwarded by default.`
    },
    {
      q: "What is an Intelligent Mail Barcode (IMb)?",
      a: "The IMb is the 65-bar barcode you see in the lower right of every automated mail piece. It encodes the mailer ID, serial number, routing ZIP code, and delivery point. It's required to qualify for automation-rate postage discounts. Beyond the rate discount, the IMb also enables piece-level tracking through the postal system \u2014 meaning we can verify that individual pieces passed through specific facilities. Full-Service IMb mailings include complete electronic documentation and earn the deepest available automation discounts."
    },
    {
      q: "What is NCOA and why is it required for bulk mail?",
      a: "NCOA (National Change of Address) is a USPS database containing all permanent address changes filed in the past 48 months. USPS requires that every presort mailing be processed through a Move Update method \u2014 NCOA is the standard one \u2014 within 95 days of mailing. Beyond compliance, the practical reason is simple: mailing to old addresses wastes postage and your budget. We run every list through NCOA before production, updating moved addresses and flagging undeliverables before a single piece is printed."
    },
    {
      q: "What is the difference between presort and automation rates?",
      a: "Presort rates are earned by sorting mail by ZIP code and carrier route before submission \u2014 deeper sort levels earn lower rates. Automation rates are an additional layer of discounts earned when mail also meets USPS machine-processing standards: readable IMb barcodes, correctly formatted addresses, and proper piece dimensions. You can have presort without automation (nonautomation presort \u2014 higher rates) or presort with automation (the standard for professional direct mail \u2014 lower rates). Most campaigns Cornerstone produces qualify for automation rates."
    },
    {
      q: "What does UAA mean in direct mail?",
      a: "UAA \u2014 Undeliverable As Addressed \u2014 is mail that can't reach the recipient because the address is wrong, the person has moved without leaving a forwarding order, or the location is vacant. For Marketing Mail, the consequence is usually silent: USPS simply discards UAA pieces without notifying the mailer or returning the piece. That's why list hygiene matters so much. Running NCOA, CASS certification, and suppression lists before a mailing is the difference between 2% UAA (normal) and 15%+ UAA (a wasted campaign). Cornerstone includes full address hygiene on every mailing we produce."
    }
  ];
  const graphItems = [
    {
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: "USPS Postal Dictionary: 58 Direct Mail Terms Defined",
      description: "Plain-English definitions for BMEU, PRSRT STD, ECRWSS, IMb, NCOA, and 53 more USPS mailing terms. Includes a labeled guide to reading a mail indicia.",
      datePublished: lastUpdated,
      dateModified: lastUpdated,
      inLanguage: "en-US",
      author: { "@type": "Person", "@id": "https://crst.net/about#sean-griffin", name: "Sean Griffin" },
      publisher: org,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://crst.net" },
        { "@type": "ListItem", position: 2, name: "Direct Mail Tools", item: "https://crst.net/direct-mail-tools" },
        { "@type": "ListItem", position: 3, name: "Postal Dictionary", item: canonical }
      ]
    },
    {
      "@type": "DefinedTermSet",
      "@id": `${canonical}#glossary`,
      name: "USPS Postal Dictionary",
      description: "Plain-English definitions for USPS mailing terms used in direct mail production.",
      url: canonical,
      hasDefinedTerm: glossary.map(({ term, definition }) => ({
        "@type": "DefinedTerm",
        name: term,
        "@id": `${canonical}#${slugify(term)}`,
        description: definition,
        inDefinedTermSet: `${canonical}#glossary`
      }))
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a }
      }))
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "USPS Postal Dictionary \u2014 58 Direct Mail Terms Defined", "description": "Plain-English definitions for BMEU, PRSRT STD, ECRWSS, IMb, NCOA, and 53 more USPS mailing terms. Includes a guide to reading a mail indicia. Built for business mailers.", "canonical": canonical }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageHero", $$PageHero, { "title": "Postal Dictionary", "subtitle": "Plain-English definitions for BMEU, PRSRT STD, ECRWSS, IMb, NCOA, and every USPS term you'll encounter in direct mail \u2014 including how to decode an indicia you're holding right now.", "breadcrumbs": [
    { label: "Direct Mail Tools", href: "/direct-mail-tools" },
    { label: "Postal Dictionary" }
  ] })} ${maybeRenderHead()}<section class="py-14 lg:py-20"> <div class="container-wide"> <div class="max-w-4xl mx-auto"> <div class="section-divider mb-6"></div> <div class="flex flex-wrap items-start justify-between gap-4 mb-8"> <p class="text-navy-600/80 leading-relaxed max-w-2xl">
The mailing industry has its own language — and USPS has hundreds of specialized terms. This glossary covers every term you're likely to encounter when planning a <a href="/services/direct-mail" class="text-crst-primary underline hover:text-crst-gold">direct mail campaign</a>. Scroll alphabetically or use the letter navigation. Jump straight to <a href="#indicia-decoder" class="text-crst-primary underline hover:text-crst-gold">How to Read a Mail Indicia</a> if you're holding a piece of mail right now.
</p> <p class="text-xs text-navy-400 shrink-0">
Last updated: <time itemprop="dateModified"${addAttribute(lastUpdated, "datetime")}>${lastUpdatedDisplay}</time> ·
            Source: <a href="https://pe.usps.com/text/dmm300/dmm300_landing.htm" target="_blank" rel="noopener noreferrer" class="underline hover:text-crst-primary">USPS DMM</a> </p> </div> <!-- Author Byline --> <div class="flex items-start gap-4 bg-navy-50 rounded-xl p-5 mb-10 border border-navy-100"> <img src="/images/sean-griffin.png" alt="Sean Griffin, Owner of Cornerstone Services" class="shrink-0 w-12 h-12 rounded-full object-cover" width="48" height="48"> <div> <p class="text-sm font-heading font-semibold text-navy-800">Compiled by Sean Griffin, Owner — Cornerstone Services, Inc.</p> <p class="text-xs text-navy-500 mt-1">Sean has worked with USPS bulk mail systems since 1998. Every term in this glossary is one Cornerstone encounters in production — presort levels, barcode requirements, permit types, and rate classifications applied to real campaigns every week.</p> <p class="text-xs text-navy-400 mt-1">Last reviewed: ${lastUpdatedDisplay} · Source: <a href="https://pe.usps.com/text/dmm300/dmm300_landing.htm" target="_blank" rel="noopener noreferrer" class="underline hover:text-crst-primary">USPS Domestic Mail Manual (DMM)</a></p> </div> </div> <!-- ===== INDICIA DECODER ===== --> <div id="indicia-decoder" class="bg-navy-50 border border-navy-200 rounded-xl p-6 mb-12"> <h2 class="text-xl font-display text-crst-primary mb-2">How to Read a Mail Indicia</h2> <p class="text-sm text-navy-600/80 leading-relaxed mb-6">
Holding a piece of mail and wondering what those markings in the upper-right mean? Every element of a permit imprint indicia has a specific meaning. Here are the two most common types — each element links to its glossary definition below.
</p> <div class="grid md:grid-cols-2 gap-8"> <!-- Example 1: Marketing Mail / EDDM --> <div> <h3 class="text-sm font-heading font-semibold text-navy-700 mb-3">Marketing Mail — Permit Imprint (EDDM / Saturation)</h3> <div class="flex justify-center mb-4"> <div class="border-2 border-navy-400 bg-white px-5 py-3 font-mono text-center text-[11px] leading-snug tracking-wide min-w-[140px]"> <span class="block font-bold">PRSRT STD</span> <span class="block font-bold">ECRWSS</span> <span class="block">U.S. POSTAGE PAID</span> <span class="block">SEPA</span> <span class="block">19399</span> <span class="block">PERMIT NO. 898</span> </div> </div> <ol class="space-y-2 text-xs text-navy-700"> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">①</span> <span><a href="#prsrt-std" class="font-bold text-crst-primary underline">PRSRT STD</a> — Presorted Standard. This is Marketing Mail (bulk advertising). Not First-Class.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">②</span> <span><a href="#ecrwss" class="font-bold text-crst-primary underline">ECRWSS</a> — Every Carrier Route Walk Sequence Saturation. This was an EDDM or neighborhood saturation mailing delivered to every address on selected routes.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">③</span> <span><strong>U.S. POSTAGE PAID</strong> — The mailer prepaid all postage through their permit account. No stamp required.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">④</span> <span><a href="#sepa" class="font-bold text-crst-primary underline">SEPA</a> — Southeastern Pennsylvania. The abbreviated name of the <a href="#scf" class="text-crst-primary underline">SCF</a> that accepted this mailing (serves ZIP codes 190–196).</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">⑤</span> <span><strong>19399</strong> — The entry post office ZIP code (West Chester, PA area). Identifies exactly where this mailing was deposited.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">⑥</span> <span><a href="#permit-number" class="font-bold text-crst-primary underline">PERMIT NO. 898</a> — The mailer's USPS bulk mail permit number at that entry office. Uniquely identifies the account that paid postage.</span> </li> </ol> </div> <!-- Example 2: First-Class Presort --> <div> <h3 class="text-sm font-heading font-semibold text-navy-700 mb-3">First-Class Mail — Presorted Permit Imprint</h3> <div class="flex justify-center mb-4"> <div class="border-2 border-navy-400 bg-white px-5 py-3 font-mono text-center text-[11px] leading-snug tracking-wide min-w-[140px]"> <span class="block font-bold">PRESORTED</span> <span class="block font-bold">FIRST-CLASS MAIL</span> <span class="block">U.S. POSTAGE PAID</span> <span class="block">NEW PALTZ, NY</span> <span class="block">12477</span> <span class="block">PERMIT NO. 123</span> </div> </div> <ol class="space-y-2 text-xs text-navy-700"> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">①</span> <span><strong>PRESORTED / FIRST-CLASS MAIL</strong> — Two-line designation for First-Class presort. Higher rates than Marketing Mail; includes forwarding and return to sender.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">②</span> <span><strong>U.S. POSTAGE PAID</strong> — Postage prepaid by the mailer through a permit imprint account. No individual stamps or metering.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">③</span> <span><strong>SAUGERTIES, NY / 12477</strong> — City, state, and ZIP of the entry post office. Identifies where this mailing was accepted by USPS.</span> </li> <li class="flex gap-2"> <span class="shrink-0 font-bold text-crst-primary w-4">④</span> <span><a href="#permit-number" class="font-bold text-crst-primary underline">PERMIT NO. 123</a> — The mailer's First-Class presort permit number at this office. Separate from Marketing Mail permits — each class can have its own permit.</span> </li> <li class="flex gap-2 mt-1"> <span class="shrink-0 w-4"></span> <span class="text-navy-500 italic">Note: First-Class indicia never shows PRSRT STD or ECRWSS — those are Marketing Mail designations only.</span> </li> </ol> </div> </div> </div> <!-- ===== END INDICIA DECODER ===== --> <!-- Letter Navigation --> <div class="flex flex-wrap gap-1.5 mb-10 sticky top-20 bg-white py-3 z-10 border-b border-gray-100"> ${letters.map((letter) => renderTemplate`<a${addAttribute(`#letter-${letter}`, "href")} class="w-8 h-8 flex items-center justify-center rounded text-sm font-heading font-bold text-navy-600 hover:bg-crst-primary hover:text-white transition-colors"> ${letter} </a>`)} </div> <!-- Alphabetical Glossary --> <div class="space-y-10"> ${letters.map((letter) => renderTemplate`<div${addAttribute(`letter-${letter}`, "id")}> <h3 class="text-2xl font-display font-bold text-crst-primary border-b-2 border-crst-primary/20 pb-2 mb-4">${letter}</h3> <dl class="space-y-4"> ${grouped[letter].map((item) => renderTemplate`<div${addAttribute(slugify(item.term), "id")} class="pl-4 border-l-2 border-gray-200 scroll-mt-24"> <dt class="font-heading font-bold text-navy-800">${item.term}</dt> <dd class="text-sm text-navy-600/80 leading-relaxed mt-1">${item.definition}</dd> </div>`)} </dl> </div>`)} </div> <!-- FAQ Section --> <div id="faq" class="mt-14"> <h2 class="text-2xl font-display text-crst-primary mb-6">Frequently Asked Questions</h2> <div class="space-y-4"> ${faqs.map(({ q, a }) => renderTemplate`<details class="group bg-navy-50/50 rounded-xl border border-navy-100 overflow-hidden"> <summary class="flex items-center justify-between p-4 cursor-pointer font-heading font-semibold text-navy-800 text-sm list-none hover:bg-navy-100/50 transition-colors"> ${q} <svg class="w-4 h-4 shrink-0 opacity-50 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg> </summary> <div class="px-4 pb-4 text-sm text-navy-600/80 leading-relaxed border-t border-navy-100 pt-3"> ${a} </div> </details>`)} </div> </div> <!-- CTA --> <div class="bg-crst-primary/5 rounded-xl p-8 text-center mt-12"> <h3 class="text-xl font-display font-bold text-crst-primary mb-3">Still Have Questions?</h3> <p class="text-navy-600/80 text-sm mb-4 max-w-lg mx-auto">
Direct mail terminology can be confusing — that's what we're here for. Call or email us and we'll explain anything in plain English, from rate classifications to permit setup.
</p> <p class="text-navy-600/80 text-sm mb-5 max-w-lg mx-auto">
When you're ready to mail, we can set up a <a href="/direct-mail-tools/cornerstone-mailing-permits" class="text-crst-primary underline hover:text-crst-gold">bulk mailing permit</a>, qualify your organization for <a href="/non-profit-mailing-application" class="text-crst-primary underline hover:text-crst-gold">nonprofit postage rates</a>, and handle presort, printing, and USPS entry — with every term on this page applied correctly to your campaign.
</p> <div class="flex flex-wrap justify-center gap-3"> <a href="/contact?service=direct-mail" class="btn-primary">Get a Free Quote</a> <a${addAttribute(`tel:${BUSINESS.phoneClean}`, "href")} class="btn-secondary">Call ${BUSINESS.phone}</a> </div> </div> </div> </div> </section> ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graphItems
  }))) })}` })}`;
}, "/home/runner/workspace/src/pages/direct-mail-tools/postal-dictionary.astro", void 0);

const $$file = "/home/runner/workspace/src/pages/direct-mail-tools/postal-dictionary.astro";
const $$url = "/direct-mail-tools/postal-dictionary";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PostalDictionary,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
