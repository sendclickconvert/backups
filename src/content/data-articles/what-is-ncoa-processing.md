---
title: "What Is NCOA Processing and Why Does It Matter for Direct Mail?"
description: "NCOA (National Change of Address) explained — how it works, what it catches, why the USPS requires it for presorted mail, and what happens when you skip it."
pubDate: 2026-04-09
updatedDate: 2026-04-09
author: "Sean Griffin"
authorTitle: "Owner, Cornerstone Services"
authorLocation: "Saugerties, NY"
primaryKeyword: "NCOA processing direct mail"
pillar: "https://crst.net/services/data-lists"
schemaFAQ:
  - q: "What does NCOA stand for?"
    a: "NCOA stands for National Change of Address. It is a USPS-licensed database containing 48 months of change-of-address filings from postal customers who moved and submitted a forwarding request at the post office."
  - q: "Is NCOA processing required for direct mail?"
    a: "NCOA processing is required for presorted Marketing Mail. If you skip it, your mailing either gets rejected at the USPS Business Mail Entry Unit or reverts to single-piece postage rates — eliminating your automation discounts."
  - q: "How often should I run NCOA on my list?"
    a: "Run NCOA every time before a mailing, and at minimum once every 95 days for any active customer database. The USPS NCOA database contains 48 months of move records. A list processed 6 months ago may have 2–5% new movers who are now at outdated addresses."
  - q: "What is the difference between NCOA and CASS?"
    a: "NCOA catches people who moved and updates their address. CASS (Coding Accuracy Support System) verifies that each address actually exists and is deliverable. They solve different problems. Both are required for presort automation discounts."
  - q: "How much does NCOA processing cost?"
    a: "At Cornerstone Services, NCOA processing is included in every list we deliver — whether we build the list or you supply it. For lists you supply for processing only (not mailing with us), we charge $75 per 1,000 records, which includes CASS, NCOA, and deduplication."
---

[Mailing list accuracy](/services/data-lists) is the single biggest variable in direct mail deliverability — and NCOA processing is the most important step in the cleaning process. If you're running direct mail campaigns without NCOA, you're mailing to people who no longer live where your list says they do. The USPS moves approximately 35–40 million people per year in the United States. Over 48 months, that means roughly 12–15% of any list without regular NCOA updates contains outdated addresses.

NCOA is not optional for serious direct mail. It is required by the USPS for presorted mail — the class that earns you automation postage discounts. This guide explains exactly how NCOA processing works, what it catches, what it misses, and why every mailing at Cornerstone Services goes through it before a single piece prints.

## What Is NCOA Processing?

NCOA stands for National Change of Address. The USPS maintains a database of address change filings submitted by people who moved and filed a mail forwarding request at the post office. The database contains 48 months of move records — approximately 160 million records at any given time.

NCOA processing matches your mailing list against this database. When a record on your list matches a name and old address in the NCOA database, the system either updates the address to the new address or flags it as undeliverable (if the person moved but did not file a new forwarding address, or if the forwarding period has expired).

The result is a list with current addresses for people who moved and filed change-of-address requests, and suppressions for addresses that are now known to be undeliverable.

## Why NCOA Is Required for Presorted Mail

The USPS requires NCOA processing within 95 days of your mail date for all presorted Marketing Mail and First Class Presort mailings. This is not a suggestion — it is a condition of the automation discount. When you drop a mailing at the Business Mail Entry Unit, you certify that the list has been NCOA-processed within that 95-day window.

Here's the cost consequence of skipping it: presort automation discounts lower your postage from single-piece rates ($0.82+ for First Class, $0.40–$0.55 for Marketing Mail flats) to $0.22–$0.30 for presorted Marketing Mail. On a 5,000-piece mailing, that difference is $1,500–$2,000 in postage savings. NCOA processing costs a fraction of that — it is one of the few true free lunches in direct mail.

If you submit a mailing without current NCOA certification, the BMECU will either reject it or process it at single-piece rates. At Cornerstone, we have never submitted a mailing without current NCOA. Every list is processed within 48 hours of the mail date.

## What the NCOA Database Actually Contains

The USPS NCOA database includes:

**Individual moves** — A specific person filed a change-of-address request. The record links their name, old address, and new address. The forwarding period lasts 12 months (with most forwarding active for 18 months).

**Family moves** — The entire household filed a change-of-address request. All mail to that address for any family member is forwarded to the new address.

**Business moves** — A business filed a change-of-address request. Business records show the old and new business address.

**Foreign moves** — The person moved internationally. These records flag the address as undeliverable (no domestic forwarding possible).

**Puerto Rico moves** — Records flagged specifically for Puerto Rico address changes.

The database does not contain records for people who moved without filing a forwarding request. If someone moves and simply stops checking their old mailbox, the NCOA database has no record of it. These addresses will still show as deliverable — the mail just goes to a property with a new occupant, or sits uncollected.

## How NCOA Processing Works Step by Step

When Cornerstone processes your list through NCOA, here is what happens:

**Step 1: Name and address standardization.** Before matching against the NCOA database, every record is normalized to USPS address format — standardized abbreviations, corrected capitalization, proper format for ZIP+4. This step is part of [CASS certification](/services/data-lists) and is required before NCOA matching can run accurately.

**Step 2: Name and address matching.** Each record is compared against the NCOA database using a combination of name and address fields. The matching algorithm accounts for name variations, abbreviations, and minor address discrepancies to catch matches that would be missed by exact-string matching.

**Step 3: Match coding.** Each record receives a match code:
- **A (Individual)** — Individual name match at that address; new address provided
- **B (Business)** — Business name match; new address provided
- **C (Family)** — Family match at that address; new address provided
- **F (Foreign move)** — Moved internationally; flag as undeliverable
- **G (Government)** — Government agency move
- **K (Moved, left no address)** — Filed a move but provided no forwarding address
- **91 (No match)** — No record found in NCOA database

**Step 4: Address update or suppression.** Records with new addresses are updated. Records with move-left-no-address flags or foreign move flags are suppressed from the mailing. Records with no match (code 91) remain in the list as-is — they either live at the original address or moved without filing.

**Step 5: Documentation.** The processed list includes NCOA processing documentation, including the processing date. This documentation is required when you present the mailing at the BMECU to certify NCOA compliance.

## What NCOA Catches — and What It Misses

NCOA is highly effective at catching movers who filed forwarding requests — approximately 60–70% of all residential moves in the US result in a change-of-address filing. For the remaining 30–40% who move without filing, NCOA has no record.

**NCOA catches:**
- Anyone who filed a USPS change-of-address form in the last 48 months
- Business relocations with filed forwarding
- International moves (flagged as undeliverable)
- Records where the forwarding period has expired (address is now stale)

**NCOA misses:**
- People who moved without filing a forwarding request
- People whose forwarding period expired more than 48 months ago
- Recently deceased individuals (no move filed)
- Vacant properties that still receive mail
- Businesses that closed without filing

For these remaining bad addresses, [CASS certification](/services/data-lists) catches some additional issues (addresses that no longer exist in the USPS master file), but some percentage of undeliverable addresses will still pass through. This is why deliverability after NCOA and CASS processing runs 96–98% rather than 100% — the remaining 2–4% are addresses that are technically deliverable but may have incorrect occupants.

## How NCOA Affects Your Postage Savings

The postage math is straightforward. Consider a 5,000-piece 6×9 postcard mailing:

| Scenario | Postage Rate | Total Postage | Savings |
|----------|-------------|--------------|---------|
| Single-piece First Class | $0.82 | $4,100 | — |
| Presorted Marketing Mail (with NCOA) | $0.26 | $1,300 | $2,800 |
| Presorted First Class (with NCOA) | $0.52 | $2,600 | $1,500 |

NCOA compliance is what unlocks the presort discount. Without it, you pay the full retail rate. The processing fee is nominal compared to the savings — on a 5,000-piece mailing, NCOA pays for itself within the first hundred pieces.

For larger campaigns, the math is even more compelling. A 25,000-piece campaign saves $11,750 in postage by qualifying for Marketing Mail presort rates. NCOA processing for a 25,000-record list is a fraction of that.

## NCOA and the 95-Day Rule

The USPS requires that NCOA processing occur within 95 days of your mail induction date. This means if you process a list in January and mail in May, you need to reprocess — the certification has expired.

For clients who mail repeatedly to the same list, Cornerstone recommends refreshing NCOA every 60–75 days to stay comfortably inside the 95-day window regardless of when the next campaign launches. For clients with annual mailings, we process NCOA fresh for every campaign.

The 95-day rule exists because addresses in the NCOA database change continuously. A list processed last year may have 5–8% of records with address changes that occurred after processing. Running fresh NCOA before each mailing maximizes deliverability and postage qualification.

## NCOA and List Hygiene: The Full Picture

NCOA is one part of a three-step list hygiene process. At Cornerstone, every list goes through:

1. **[CASS certification](/services/data-lists)** — Verifies and standardizes every address against the USPS master address file. Catches non-existent addresses, incorrect ZIP codes, and formatting problems.

2. **NCOA processing** — Updates addresses for known movers and suppresses undeliverable records.

3. **[Deduplication](/services/data-lists)** — Removes duplicate records within the list and, when requested, suppresses your existing customers from a purchased list (merge/purge).

All three steps are included in every list Cornerstone delivers — whether we build the list or process one you supply. The result is a file that qualifies for automation postage rates and delivers at 96–98% accuracy.

For more on the full list processing workflow, see our [mailing list processing overview](/services/data-lists) and our guide to [mailing list accuracy](/services/data-lists/mailing-list-accuracy).

## Frequently Asked Questions

**What does NCOA stand for?**

NCOA stands for National Change of Address. It is a USPS-licensed database containing 48 months of change-of-address filings from postal customers who moved and submitted a forwarding request. Licensed list processors like Cornerstone access this database to update mailing lists before each campaign.

**Is NCOA processing required for direct mail?**

NCOA processing is required for presorted Marketing Mail — the class that earns automation postage discounts. Without current NCOA certification (within 95 days of mail date), your mailing either gets rejected at the Business Mail Entry Unit or reverts to single-piece rates. For First Class Presort, NCOA is also required. The only class that does not require NCOA is single-piece First Class, which carries no presort discount.

**How often should I run NCOA on my list?**

Run NCOA every time before a mailing, or at minimum every 95 days. If you maintain an active customer database, running NCOA quarterly keeps the file current and ensures compliance for any mailing you might launch. Cornerstone processes NCOA fresh for every campaign regardless of when we last ran it for that client.

**What is the difference between NCOA and CASS?**

NCOA updates addresses for people who moved. CASS (Coding Accuracy Support System) verifies that each address in your list actually exists and is deliverable per the USPS master address file. They solve different problems: NCOA finds the new address when someone moves; CASS confirms the address is real and formatted correctly. Both are required for presort automation discounts. Both are included in every list Cornerstone delivers.

**What happens to addresses with no NCOA match?**

Records with no NCOA match (code 91) remain in the list at their original address. A no-match does not mean the person moved — most no-matches are people who still live at the original address and never filed a change-of-address request. The records are treated as deliverable unless CASS processing separately identifies them as non-existent addresses.

Ready to mail with a clean, NCOA-processed list? [Request a free estimate](/estimate) from Cornerstone Services in Saugerties, NY — we process NCOA on every mailing, included in the base service price.
