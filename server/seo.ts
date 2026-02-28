interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  noscriptContent: string;
}

function noscriptShell(h1: string, paragraphs: string[], faqs: { q: string; a: string }[], links: { href: string; text: string }[]) {
  const faqHtml = faqs.length > 0
    ? `<h2>Frequently Asked Questions</h2>${faqs.map(f => `<h3>${f.q}</h3><p>${f.a}</p>`).join("\n")}`
    : "";
  const linkHtml = links.length > 0
    ? `<h2>Service Areas</h2><ul>${links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join("")}</ul>`
    : "";
  return `<div style="font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;">
<h1>${h1}</h1>
${paragraphs.map(p => `<p>${p}</p>`).join("\n")}
${faqHtml}
${linkHtml}
<p>Phone: <a href="tel:5165486558">(516) 548-6558</a> | Email: info@thepropertyfather.com</p>
<p>The Property Father LLC — 100 Washington Ave, Patchogue, NY 11772</p>
</div>`;
}

const defaultNoscript = noscriptShell(
  "The Property Father | We Buy Houses for Cash on Long Island",
  [
    "The Property Father LLC buys houses in any condition in Suffolk County and Nassau County, New York. No fees, no repairs, close in as few as 7 days.",
    "Whether you're facing foreclosure, going through a divorce, dealing with an inherited property, or just need to sell fast — we can help. We provide fair cash offers within 24 hours and can close on your timeline.",
    "We serve all of Long Island including every town in Nassau County and Suffolk County."
  ],
  [],
  [
    { href: "/locations/nassau-county", text: "Nassau County — We Buy Houses" },
    { href: "/locations/suffolk-county", text: "Suffolk County — We Buy Houses" },
    { href: "/situations/divorce", text: "Selling During Divorce" },
    { href: "/situations/pre-foreclosure", text: "Facing Pre-Foreclosure" },
    { href: "/situations/probate", text: "Probate Property Sales" },
    { href: "/situations/inherited-property", text: "Selling Inherited Property" },
    { href: "/situations/sell-as-is", text: "Sell Your House As-Is" }
  ]
);

const seoData: Record<string, PageSEO> = {
  "/": {
    title: "The Property Father | We Buy Houses for Cash in Long Island, NY",
    description: "Sell your Long Island house fast for cash. The Property Father buys houses in any condition in Suffolk and Nassau County. No fees, no repairs, close in 7 days. Call (516) 548-6558.",
    canonical: "https://thepropertyfather.com",
    noscriptContent: defaultNoscript
  },
  "/about": {
    title: "About The Property Father | Cash Home Buyers on Long Island",
    description: "Learn about The Property Father, a trusted cash home buying company serving Suffolk and Nassau County on Long Island, NY. Founded by Steven Santiago.",
    canonical: "https://thepropertyfather.com/about",
    noscriptContent: noscriptShell(
      "About The Property Father",
      [
        "The Property Father is a Long Island-based cash home buying company founded by Steven Santiago. We help homeowners sell their houses quickly for fair cash offers — no repairs, no agent fees, no hassle.",
        "We serve all of Suffolk County and Nassau County, working with homeowners in every situation including divorce, pre-foreclosure, probate, inherited properties, and homes that need major repairs."
      ],
      [],
      [
        { href: "/", text: "Home" },
        { href: "/how-it-works", text: "How It Works" },
        { href: "/contact", text: "Contact Us" }
      ]
    )
  },
  "/how-it-works": {
    title: "How It Works | Sell Your House for Cash in 3 Steps | The Property Father",
    description: "Selling your Long Island house for cash is simple: submit your property info, get a fair cash offer in 24 hours, and close in as few as 7 days. No repairs, no fees.",
    canonical: "https://thepropertyfather.com/how-it-works",
    noscriptContent: noscriptShell(
      "How It Works — Sell Your House for Cash in 3 Simple Steps",
      [
        "Step 1: Submit your property information. Tell us about your house — address, condition, and your timeline. Step 2: Get a fair cash offer within 24 hours. We evaluate your property and present a no-obligation cash offer. Step 3: Close on your schedule. Pick your closing date — as soon as 7 days or whenever works for you.",
        "No repairs needed. No agent commissions. No hidden fees. We buy houses in any condition across Long Island."
      ],
      [],
      [
        { href: "/contact", text: "Get Your Cash Offer" },
        { href: "/locations/nassau-county", text: "Nassau County" },
        { href: "/locations/suffolk-county", text: "Suffolk County" }
      ]
    )
  },
  "/contact": {
    title: "Contact Us | Get a Cash Offer | The Property Father",
    description: "Contact The Property Father for a free, no-obligation cash offer on your Long Island home. Call (516) 548-6558 or fill out our form for a response within 24 hours.",
    canonical: "https://thepropertyfather.com/contact",
    noscriptContent: noscriptShell(
      "Contact The Property Father",
      [
        "Ready to sell your Long Island house for cash? Contact us today for a free, no-obligation cash offer. We respond within 24 hours.",
        "Call us at (516) 548-6558 or submit your property details and we will get back to you with a fair cash offer."
      ],
      [],
      [
        { href: "/how-it-works", text: "How It Works" },
        { href: "/locations/nassau-county", text: "Nassau County" },
        { href: "/locations/suffolk-county", text: "Suffolk County" }
      ]
    )
  },
  "/faq": {
    title: "Frequently Asked Questions | The Property Father",
    description: "Common questions about selling your Long Island house for cash. Learn about our process, timeline, pricing, and what to expect when working with The Property Father.",
    canonical: "https://thepropertyfather.com/faq",
    noscriptContent: noscriptShell(
      "Frequently Asked Questions — Selling Your House for Cash",
      [
        "Get answers to common questions about selling your Long Island house for cash to The Property Father."
      ],
      [
        { q: "How does selling for cash work?", a: "You submit your property info, we evaluate it and make a fair cash offer within 24 hours. If you accept, we close at a local title company on your timeline — as soon as 7 days." },
        { q: "Do I need to make repairs?", a: "No. We buy houses in any condition — outdated, damaged, code violations, or tenant-occupied. You don't need to fix anything." },
        { q: "Are there any fees or commissions?", a: "No fees, no commissions, no closing costs for you. The offer we make is what you walk away with." },
        { q: "How quickly can you close?", a: "We can close in as few as 7 days. You pick the closing date that works for your schedule." }
      ],
      [
        { href: "/contact", text: "Get Your Cash Offer" },
        { href: "/how-it-works", text: "How It Works" }
      ]
    )
  },
  "/terms": {
    title: "Terms of Service | The Property Father",
    description: "Terms of Service for The Property Father LLC, a cash home buying service in Long Island, NY.",
    canonical: "https://thepropertyfather.com/terms",
    noscriptContent: noscriptShell("Terms of Service — The Property Father", ["Read the Terms of Service for The Property Father LLC."], [], [{ href: "/", text: "Home" }, { href: "/privacy", text: "Privacy Policy" }])
  },
  "/privacy": {
    title: "Privacy Policy | The Property Father",
    description: "Privacy Policy for The Property Father LLC, a cash home buying service in Long Island, NY.",
    canonical: "https://thepropertyfather.com/privacy",
    noscriptContent: noscriptShell("Privacy Policy — The Property Father", ["Read the Privacy Policy for The Property Father LLC."], [], [{ href: "/", text: "Home" }, { href: "/terms", text: "Terms of Service" }])
  },
  "/partners/realtors": {
    title: "Partner With Us - Realtors | The Property Father",
    description: "Real estate agents on Long Island — partner with The Property Father to help clients who need fast cash sales. Earn referral fees, serve more clients, and close deals that don't fit the traditional market.",
    canonical: "https://thepropertyfather.com/partners/realtors",
    noscriptContent: noscriptShell("Partner With The Property Father — Realtors", ["Real estate agents: partner with us to help clients who need to sell fast for cash. Earn referral fees on properties that don't fit the traditional sale model."], [], [{ href: "/contact", text: "Contact Us" }])
  },
  "/partners/lenders": {
    title: "Partner With Us - Lenders | The Property Father",
    description: "Private lenders and hard money lenders — partner with The Property Father for consistent deal flow on Long Island. Secured investments backed by real property with strong equity positions.",
    canonical: "https://thepropertyfather.com/partners/lenders",
    noscriptContent: noscriptShell("Partner With The Property Father — Lenders", ["Private lenders and hard money lenders: partner with us for consistent deal flow on Long Island. All financing is backed by real property with strong equity positions."], [], [{ href: "/contact", text: "Contact Us" }])
  },
  "/partners/contractors": {
    title: "Partner With Us - Contractors | The Property Father",
    description: "Contractors on Long Island — join The Property Father's preferred vendor list. Get consistent renovation work, prompt payment, and long-term partnership opportunities.",
    canonical: "https://thepropertyfather.com/partners/contractors",
    noscriptContent: noscriptShell("Partner With The Property Father — Contractors", ["Contractors: join our preferred vendor list for consistent renovation work on Long Island. We pay on time and build long-term partnerships."], [], [{ href: "/contact", text: "Contact Us" }])
  },

  "/situations/divorce": {
    title: "Sell Your House During Divorce on Long Island | The Property Father",
    description: "Going through a divorce on Long Island? We buy houses fast for cash so you can split the proceeds and move on. No repairs, no agents, close in 7 days. Call (516) 548-6558.",
    canonical: "https://thepropertyfather.com/situations/divorce",
    noscriptContent: noscriptShell(
      "Selling Your Long Island Home During Divorce",
      [
        "Divorce is one of the most stressful situations a homeowner can face. When the marital home is involved, the process gets even more complicated — especially on Long Island where property values are high and the traditional selling process can take months. The Property Father helps divorcing couples sell quickly for cash so both parties can move forward.",
        "New York is an equitable distribution state, which means courts divide marital property fairly — but not always 50/50. A cash sale simplifies the process: you get a clear number, divide the proceeds according to your agreement, and move on without waiting months for a traditional buyer.",
        "We work with divorce attorneys and can coordinate with both parties to ensure a smooth transaction. Our cash offers provide certainty and help you avoid lengthy negotiations over repairs, inspections, or listing prices. Close in as few as 7 days and divide the proceeds fairly.",
        "Whether one spouse wants to keep the house but can't buy out the other, or both parties want a clean break, selling for cash gives you control over the timeline and the outcome."
      ],
      [
        { q: "Can I sell my house before the divorce is finalized in New York?", a: "Yes, but both spouses typically need to agree to the sale and sign the deed. A cash sale with a flexible closing date makes this easier to coordinate." },
        { q: "Do I need a lawyer to sell my house during a divorce?", a: "While not legally required for the sale itself, most divorcing couples work with a real estate attorney to ensure the proceeds are properly allocated per the divorce agreement." },
        { q: "How quickly can we close if we're under a court deadline?", a: "The Property Father can close in as few as 7 days. We work with your attorneys and your timeline." },
        { q: "Will my soon-to-be ex have to be present at closing?", a: "In most cases, yes — both parties on the deed need to sign. We coordinate with both sides to make this as simple as possible." }
      ],
      [
        { href: "/locations/nassau-county", text: "We Buy Houses in Nassau County" },
        { href: "/locations/suffolk-county", text: "We Buy Houses in Suffolk County" },
        { href: "/contact", text: "Get Your Cash Offer" }
      ]
    )
  },
  "/situations/pre-foreclosure": {
    title: "Facing Pre-Foreclosure on Long Island? Sell Fast for Cash | The Property Father",
    description: "Behind on mortgage payments in Suffolk or Nassau County? The Property Father buys houses in pre-foreclosure fast. Stop the process, protect your credit, close in 7 days. Call (516) 548-6558.",
    canonical: "https://thepropertyfather.com/situations/pre-foreclosure",
    noscriptContent: noscriptShell(
      "Facing Pre-Foreclosure on Long Island? Here Are Your Options",
      [
        "Falling behind on mortgage payments is terrifying — but pre-foreclosure is not the end of the road. New York's foreclosure process moves slowly, which means Long Island homeowners in distress often have more time to act than they realize. The Property Father helps homeowners facing pre-foreclosure sell fast for cash, pay off the mortgage, and walk away with their dignity and credit score intact.",
        "Pre-foreclosure is when you've received a notice of default or lis pendens but the bank hasn't taken the property yet. You still own it and can sell it. New York is a judicial foreclosure state, meaning the bank must file a lawsuit — the process typically takes 18 to 36 months from the first missed payment to auction.",
        "When you sell during pre-foreclosure, the proceeds pay off the mortgage balance at closing. Any remaining equity goes to you. The foreclosure process stops immediately. A foreclosure stays on your credit for 7 years, but selling before completion reports as a standard sale — far less damaging.",
        "Cash buyers are the fastest solution because there's no bank approval needed, no financing contingencies, and we can close before your auction date. We've helped many Long Island homeowners avoid foreclosure and protect their financial future."
      ],
      [
        { q: "Can I sell my house if I've already received a lis pendens in New York?", a: "Yes. A lis pendens is a public notice that a lawsuit has been filed — it does not transfer ownership. You can still sell the property as long as you own it. The proceeds from the sale pay off the mortgage and any lis pendens is removed at closing." },
        { q: "What if I owe more than the house is worth?", a: "If you're underwater on the mortgage, we can discuss a short sale where the bank agrees to accept less than the full balance owed. This requires bank approval but is still far better than foreclosure on your credit report." },
        { q: "How quickly do you need to move?", a: "We can close in as few as 7 days. If you have a foreclosure auction date, tell us immediately and we'll prioritize your timeline." },
        { q: "Do I need to be current on payments to sell?", a: "No. We buy houses from homeowners in all stages of the pre-foreclosure process — whether you're 30 days behind or received a foreclosure filing." }
      ],
      [
        { href: "/locations/nassau-county", text: "We Buy Houses in Nassau County" },
        { href: "/locations/suffolk-county", text: "We Buy Houses in Suffolk County" },
        { href: "/contact", text: "Get Your Cash Offer" }
      ]
    )
  },
  "/situations/probate": {
    title: "Selling a Probate Property on Long Island | The Property Father",
    description: "Inherited a house going through probate in Suffolk or Nassau County? We buy probate properties for cash, work with estate attorneys, and close on your timeline. Call (516) 548-6558.",
    canonical: "https://thepropertyfather.com/situations/probate",
    noscriptContent: noscriptShell(
      "Selling a Probate Property on Long Island: What You Need to Know",
      [
        "When a loved one passes away and leaves behind a house, the property typically goes through probate before it can be sold. On Long Island, where property values are high and family dynamics can be complicated, navigating a probate sale without the right support is overwhelming. The Property Father works with estate attorneys and executors to simplify the process and close on your timeline.",
        "Probate is the legal process of validating a will and distributing assets, overseen by the Surrogate's Court. It typically takes 6 to 12 months, longer for contested estates. Once the executor is appointed and receives Letters Testamentary, they have the legal authority to sell the property.",
        "Cash buyers work well for probate sales because there are no repair contingencies, we can close quickly once the court approves, and we're flexible with dates to accommodate court scheduling. We work directly with estate attorneys and coordinate closing with Surrogate's Court requirements.",
        "We buy probate properties in as-is condition, contents and all. We handle the cleanout after closing. Property condition does not affect our ability to close."
      ],
      [
        { q: "Do all heirs have to agree to sell the house in probate?", a: "If there's a valid will naming an executor, that person has legal authority to sell. If there's no will (intestate), all heirs typically need to consent or the court can authorize the sale." },
        { q: "How long does it take to sell a probate property in New York?", a: "Once the executor is appointed, we can close in as few as 7-14 days depending on court scheduling. Total timeline from death to closing is typically 6-12 months, mostly waiting on court appointment." },
        { q: "Does the house need to be cleaned out before selling?", a: "No. We buy probate properties in as-is condition, contents and all. We handle the cleanout after closing." },
        { q: "What if the property has deferred maintenance or code violations?", a: "We buy as-is regardless of condition. Property condition does not affect our ability to close." }
      ],
      [
        { href: "/locations/nassau-county", text: "We Buy Houses in Nassau County" },
        { href: "/locations/suffolk-county", text: "We Buy Houses in Suffolk County" },
        { href: "/contact", text: "Get Your Cash Offer" }
      ]
    )
  },
  "/situations/inherited-property": {
    title: "Sell an Inherited House on Long Island | The Property Father",
    description: "Inherited a house in Suffolk or Nassau County that you don't want to keep? We buy inherited properties for cash, as-is, fast. No repairs, no estate sales. Call (516) 548-6558.",
    canonical: "https://thepropertyfather.com/situations/inherited-property",
    noscriptContent: noscriptShell(
      "Inherited a House on Long Island? Here's the Simplest Way to Sell It",
      [
        "Inheriting a house can feel like a gift and a burden at the same time. On Long Island, inherited properties often come with deferred maintenance, complicated family agreements, and carrying costs — property taxes, insurance, utilities — that start adding up immediately. The Property Father helps heirs sell inherited houses quickly for cash, without the stress of repairs, showings, or a lengthy market listing.",
        "Long Island property taxes are among the highest in the nation. Add insurance, utilities, and basic upkeep, and the monthly carrying cost of an inherited property can easily reach $3,000 to $4,000 or more. Every month you hold the property, you're spending money.",
        "Inherited properties receive a step-up in cost basis to fair market value at the date of death, which means most heirs owe little or no capital gains tax when selling quickly. Consult a tax advisor for your specific situation.",
        "We work with executors, attorneys, and multiple heirs. We buy inherited properties with all contents, in as-is condition. You take what you want and leave the rest — we handle everything else."
      ],
      [
        { q: "Can I sell an inherited house before probate is complete?", a: "In most cases, no — the estate needs to go through probate and the executor needs to be authorized to sell. However, if the property passed via a trust or joint tenancy with right of survivorship, it may transfer outside of probate." },
        { q: "What if my siblings and I all inherited the property together?", a: "All owners on the deed need to agree to sell and sign at closing. We work with multiple heirs regularly and can coordinate the process." },
        { q: "Do I need to clean out the house before selling?", a: "No. We buy inherited properties with all contents, as-is. You take what you want, leave the rest." },
        { q: "How is the sale price determined?", a: "We evaluate the property based on current condition, location, and comparable sales in the area. We provide a fair cash offer within 24 hours of submitting your property details." }
      ],
      [
        { href: "/locations/nassau-county", text: "We Buy Houses in Nassau County" },
        { href: "/locations/suffolk-county", text: "We Buy Houses in Suffolk County" },
        { href: "/contact", text: "Get Your Cash Offer" }
      ]
    )
  },
  "/situations/sell-as-is": {
    title: "Sell Your House As-Is on Long Island | No Repairs Needed | The Property Father",
    description: "Want to sell your Long Island house without making repairs? The Property Father buys houses as-is in any condition in Suffolk and Nassau County. Get a cash offer in 24 hours. Call (516) 548-6558.",
    canonical: "https://thepropertyfather.com/situations/sell-as-is",
    noscriptContent: noscriptShell(
      "Selling Your Long Island House As-Is: No Repairs, No Hassle",
      [
        "Not every homeowner has the time, money, or energy to prep a house for the traditional real estate market. Whether your property needs cosmetic updates, major repairs, or has been neglected for years, The Property Father buys Long Island houses as-is for cash — no repairs required, no staging, no open houses.",
        "Selling as-is legally means selling in current condition without making repairs. The buyer accepts the property as it stands. We buy houses with outdated kitchens, roof issues, foundation problems, water damage, mold, fire damage, code violations, hoarder situations, tenant-occupied properties, and inherited homes needing updating.",
        "Consider the math: a house worth $500K fully updated that needs $80K in repairs. A traditional sale nets roughly $500K minus $80K repairs, minus 6% commission ($30K), minus closing costs — about $385K to $390K after months of work. A cash as-is offer might be $400K to $415K with zero repair costs, no commissions, and closing in 7 to 21 days.",
        "After you accept our cash offer, we handle the title search, clear title, and close at a local title company or attorney's office — typically within 7 to 21 days."
      ],
      [
        { q: "Will you still buy my house if it has major structural issues?", a: "Yes. We buy houses with foundation issues, roof damage, fire damage, and other significant structural problems. We factor the repair costs into our offer." },
        { q: "Do I need to disclose known issues when selling as-is in New York?", a: "New York law requires sellers to disclose known material defects via a Property Condition Disclosure Statement, even in as-is sales. Alternatively, sellers can pay a $500 credit to the buyer in lieu of disclosure. Your attorney can advise on the right approach." },
        { q: "Can I sell as-is if I have tenants in the property?", a: "Yes. We buy tenant-occupied properties and handle the transition ourselves after closing." },
        { q: "How is the as-is cash offer calculated?", a: "We look at the after-repair value (what the house would sell for fully updated), subtract estimated repair costs and our profit margin, and present a fair cash offer. We walk you through the numbers so you understand how we got there." }
      ],
      [
        { href: "/locations/nassau-county", text: "We Buy Houses in Nassau County" },
        { href: "/locations/suffolk-county", text: "We Buy Houses in Suffolk County" },
        { href: "/contact", text: "Get Your Cash Offer" }
      ]
    )
  },

  "/locations/nassau-county": {
    title: "We Buy Houses for Cash in Nassau County, NY | The Property Father",
    description: "Sell your Nassau County house fast for cash. The Property Father buys homes in any condition across all Nassau County towns. No fees, no repairs, close in 7 days.",
    canonical: "https://thepropertyfather.com/locations/nassau-county",
    noscriptContent: noscriptShell(
      "We Buy Houses for Cash in Nassau County, NY",
      [
        "The Property Father buys houses for cash across all of Nassau County, New York. Whether your property is in Hempstead, North Hempstead, Oyster Bay, or any of the 45 towns and villages throughout the county, we can make you a fair cash offer.",
        "No repairs needed, no agent fees, no closing costs. We buy houses in any condition and can close in as few as 7 days."
      ],
      [],
      [
        { href: "/locations/suffolk-county", text: "Suffolk County" },
        { href: "/contact", text: "Get Your Cash Offer" },
        { href: "/how-it-works", text: "How It Works" }
      ]
    )
  },
  "/locations/suffolk-county": {
    title: "We Buy Houses for Cash in Suffolk County, NY | The Property Father",
    description: "Sell your Suffolk County house fast for cash. The Property Father buys homes in any condition across all Suffolk County towns. No fees, no repairs, close in 7 days.",
    canonical: "https://thepropertyfather.com/locations/suffolk-county",
    noscriptContent: noscriptShell(
      "We Buy Houses for Cash in Suffolk County, NY",
      [
        "The Property Father buys houses for cash across all of Suffolk County, New York. Whether your property is in Brookhaven, Islip, Babylon, Huntington, Smithtown, or any of the 38 towns throughout the county, we can make you a fair cash offer.",
        "No repairs needed, no agent fees, no closing costs. We buy houses in any condition and can close in as few as 7 days."
      ],
      [],
      [
        { href: "/locations/nassau-county", text: "Nassau County" },
        { href: "/contact", text: "Get Your Cash Offer" },
        { href: "/how-it-works", text: "How It Works" }
      ]
    )
  }
};

export function getPageSEO(urlPath: string): PageSEO | null {
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return seoData[cleanPath] || null;
}

export function generateDynamicSEO(urlPath: string): PageSEO | null {
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";

  const nassauTownMatch = cleanPath.match(/^\/locations\/nassau-county\/([^/]+)$/);
  if (nassauTownMatch) {
    const slug = nassauTownMatch[1];
    const townName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `We Buy Houses for Cash in ${townName}, Nassau County | The Property Father`,
      description: `Sell your ${townName} house fast for cash. The Property Father buys homes in any condition in ${townName}, Nassau County, NY. No fees, no repairs, close in 7 days.`,
      canonical: `https://thepropertyfather.com${cleanPath}`,
      noscriptContent: noscriptShell(
        `We Buy Houses for Cash in ${townName}, Nassau County, NY`,
        [
          `The Property Father buys houses for cash in ${townName}, Nassau County, New York. We make fair cash offers on homes in any condition — no repairs, no agent fees, no closing costs.`,
          `Whether you're facing foreclosure, going through a divorce, dealing with a probate or inherited property, or just need to sell fast, we can help homeowners in ${townName} close in as few as 7 days.`
        ],
        [],
        [
          { href: "/locations/nassau-county", text: "All Nassau County Towns" },
          { href: "/contact", text: "Get Your Cash Offer" }
        ]
      )
    };
  }

  const suffolkTownMatch = cleanPath.match(/^\/locations\/suffolk-county\/([^/]+)$/);
  if (suffolkTownMatch) {
    const slug = suffolkTownMatch[1];
    const townName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `We Buy Houses for Cash in ${townName}, Suffolk County | The Property Father`,
      description: `Sell your ${townName} house fast for cash. The Property Father buys homes in any condition in ${townName}, Suffolk County, NY. No fees, no repairs, close in 7 days.`,
      canonical: `https://thepropertyfather.com${cleanPath}`,
      noscriptContent: noscriptShell(
        `We Buy Houses for Cash in ${townName}, Suffolk County, NY`,
        [
          `The Property Father buys houses for cash in ${townName}, Suffolk County, New York. We make fair cash offers on homes in any condition — no repairs, no agent fees, no closing costs.`,
          `Whether you're facing foreclosure, going through a divorce, dealing with a probate or inherited property, or just need to sell fast, we can help homeowners in ${townName} close in as few as 7 days.`
        ],
        [],
        [
          { href: "/locations/suffolk-county", text: "All Suffolk County Towns" },
          { href: "/contact", text: "Get Your Cash Offer" }
        ]
      )
    };
  }

  const nassauVillageMatch = cleanPath.match(/^\/locations\/nassau-county\/([^/]+)\/([^/]+)$/);
  if (nassauVillageMatch) {
    const townSlug = nassauVillageMatch[1];
    const villageSlug = nassauVillageMatch[2];
    const villageName = villageSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const townName = townSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `We Buy Houses for Cash in ${villageName}, ${townName} | The Property Father`,
      description: `Sell your ${villageName} house fast for cash. The Property Father buys homes in any condition in ${villageName}, Town of ${townName}, Nassau County, NY.`,
      canonical: `https://thepropertyfather.com${cleanPath}`,
      noscriptContent: noscriptShell(
        `We Buy Houses for Cash in ${villageName}, Nassau County, NY`,
        [
          `The Property Father buys houses for cash in ${villageName}, located in the Town of ${townName}, Nassau County, New York. We make fair cash offers on homes in any condition.`,
          `No repairs needed, no agent fees. We can close in as few as 7 days.`
        ],
        [],
        [
          { href: `/locations/nassau-county/${townSlug}`, text: `${townName} — All Areas` },
          { href: "/locations/nassau-county", text: "Nassau County" },
          { href: "/contact", text: "Get Your Cash Offer" }
        ]
      )
    };
  }

  const suffolkVillageMatch = cleanPath.match(/^\/locations\/suffolk-county\/([^/]+)\/([^/]+)$/);
  if (suffolkVillageMatch) {
    const townSlug = suffolkVillageMatch[1];
    const villageSlug = suffolkVillageMatch[2];
    const villageName = villageSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const townName = townSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
      title: `We Buy Houses for Cash in ${villageName}, ${townName} | The Property Father`,
      description: `Sell your ${villageName} house fast for cash. The Property Father buys homes in any condition in ${villageName}, Town of ${townName}, Suffolk County, NY.`,
      canonical: `https://thepropertyfather.com${cleanPath}`,
      noscriptContent: noscriptShell(
        `We Buy Houses for Cash in ${villageName}, Suffolk County, NY`,
        [
          `The Property Father buys houses for cash in ${villageName}, located in the Town of ${townName}, Suffolk County, New York. We make fair cash offers on homes in any condition.`,
          `No repairs needed, no agent fees. We can close in as few as 7 days.`
        ],
        [],
        [
          { href: `/locations/suffolk-county/${townSlug}`, text: `${townName} — All Areas` },
          { href: "/locations/suffolk-county", text: "Suffolk County" },
          { href: "/contact", text: "Get Your Cash Offer" }
        ]
      )
    };
  }

  return null;
}

export function injectSEO(html: string, urlPath: string): string {
  const seo = getPageSEO(urlPath) || generateDynamicSEO(urlPath);
  if (!seo) {
    const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
    if (cleanPath !== "/") {
      const fallback: PageSEO = {
        title: "The Property Father | We Buy Houses for Cash in Long Island, NY",
        description: "Sell your Long Island house fast for cash. The Property Father buys houses in any condition in Suffolk and Nassau County. No fees, no repairs, close in 7 days.",
        canonical: `https://thepropertyfather.com${cleanPath}`,
        noscriptContent: defaultNoscript
      };
      return applyReplacements(html, fallback);
    }
    return html;
  }
  return applyReplacements(html, seo);
}

function applyReplacements(html: string, seo: PageSEO): string {
  let result = html;

  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${seo.title}</title>`
  );

  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`
  );

  result = result.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${seo.canonical}" />`
  );

  result = result.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`
  );

  result = result.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`
  );

  result = result.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${seo.canonical}" />`
  );

  result = result.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`
  );

  result = result.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`
  );

  result = result.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>${seo.noscriptContent}</noscript>`
  );

  return result;
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
