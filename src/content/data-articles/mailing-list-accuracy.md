---
title: "How Accurate Are Mailing Lists? Understanding Deliverability Rates"
description: "What '96–98% deliverability' actually means for direct mail lists — how CASS and NCOA processing get you there, what causes the remaining bad addresses, and how to minimize waste."
pubDate: 2026-04-09
updatedDate: 2026-04-09
author: "Sean Griffin"
authorTitle: "Owner, Cornerstone Services"
authorLocation: "New Paltz, NY"
primaryKeyword: "mailing list accuracy"
pillar: "https://crst.net/services/data-lists"
schemaFAQ:
  - q: "How accurate are purchased mailing lists?"
    a: "Raw purchased lists (unprocessed) typically run 85–92% deliverable. After CASS certification and NCOA processing, deliverability improves to 96–98%. The remaining 2–4% represents addresses that are technically standardized but have wrong occupants, recent vacancies, or movers who did not file a change-of-address request."
  - q: "What causes mail to be undeliverable?"
    a: "The main causes of undeliverable mail are: recipient moved without filing a change-of-address request, address exists but has wrong occupant, recipient deceased, property vacant, address formatted incorrectly for USPS, and PO Box versus street address mismatches. CASS and NCOA catch most of these; some slip through."
  - q: "What is CASS certification?"
    a: "CASS stands for Coding Accuracy Support System. It is USPS-approved software that verifies and standardizes every address against the USPS master address file. CASS corrects abbreviations, adds ZIP+4 codes, and flags addresses that do not exist in the USPS system. It is a prerequisite for presort automation discounts."
  - q: "Can I get a refund for undeliverable mail?"
    a: "Not on standard Marketing Mail — undeliverable pieces are discarded or returned depending on the endorsement on the mail piece. With the 'Address Service Requested' endorsement, the USPS will return undeliverable pieces with the reason for non-delivery. This is useful for cleaning your list after a campaign."
---

When Cornerstone delivers a [processed mailing list](/services/mailing-list-services), we describe it as 96–98% deliverable. That number comes up constantly, and it is worth explaining precisely what it means — what it accounts for, why the remaining 2–4% exists, and what you can do to minimize waste on your campaign.

The short version: no mailing list reaches 100% deliverability. The processes that get you from raw data to 96–98% — CASS certification, NCOA processing, and deduplication — are real, established, and required by the USPS for presorted mail. The residual undeliverability after those processes is mostly unfixable through data processing alone.

## Where Mailing List Data Comes From

To understand list accuracy, you need to understand where the data originates. Compiled consumer lists draw from multiple sources:

- **Public records** — Property ownership, deed transfers, voter registrations, business licenses, birth records where available
- **Self-reported data** — Survey responses, subscription forms, contest entries, warranty registrations
- **Census and demographic data** — Block-level demographic modeling from Census Bureau data
- **Credit bureau headers** — Name and address data from credit applications (excluding credit score information)
- **Catalog and direct response buyer files** — Transaction history from mail order buyers
- **USPS delivery records** — USPS data on active delivery points and carrier routes

Each source has different accuracy and update frequencies. Property records update with every deed transfer. Voter files update with each election cycle. Self-reported survey data may be years old. The compiled database is a composite — accurate on some dimensions, estimated on others.

Raw compiled lists, before any processing, typically run 85–92% deliverable. The 8–15% of bad records includes outdated addresses from movers, duplicate records, deceased individuals still on active files, and addresses with formatting errors that USPS automation cannot process.

## What CASS Certification Does

CASS (Coding Accuracy Support System) is USPS-approved software that verifies and standardizes addresses. It is a prerequisite for presort automation discounts — without CASS certification, your mailing does not qualify for bulk rates.

CASS does three things:

**Standardizes address formatting.** CASS converts addresses to USPS standard format — correct abbreviations (Street → St, Avenue → Ave), proper capitalization, correct ZIP code boundaries. This ensures the automated sorting equipment can read the address correctly.

**Appends ZIP+4 codes.** The basic five-digit ZIP identifies the post office. The four-digit extension (+4) identifies a specific delivery range — a block face, building, or P.O. Box group. ZIP+4 is required for automation discounts and is what allows the USPS to barcode each piece for carrier-route sorting.

**Flags non-existent addresses.** If an address does not exist in the USPS Delivery Sequence File (DSF) — the master database of all deliverable addresses in the US — CASS flags it. This catches addresses where the street exists but the house number doesn't, addresses in recently demolished buildings, and rural route addresses that were renumbered.

After CASS processing, you typically see a 3–6% reduction in the raw list count — those are the addresses that failed CASS verification and were suppressed as undeliverable. The remaining records are standardized, ZIP+4 coded, and verifiably exist as delivery points.

## What NCOA Processing Does

[NCOA (National Change of Address)](/services/data-lists/what-is-ncoa-processing) addresses the second major accuracy problem: people who moved. The USPS NCOA database contains 48 months of change-of-address filings. NCOA processing matches your list against this database and either updates the address or flags the record as undeliverable.

After NCOA processing, you see two outcomes on affected records:

**Updated addresses** — Records where the person filed a change-of-address request get updated to the new address. These records remain in your mailing list with a corrected delivery point.

**Suppressions** — Records where the person moved internationally, moved without providing a forwarding address, or filed a move where the forwarding period has expired get suppressed from the list. These are removed from the count before printing.

NCOA typically removes an additional 2–5% of records from a list, depending on how recently the list was built and how long since it was last NCOA-processed. A list compiled three years ago and never refreshed might see 8–12% of records flagged by NCOA.

## Why 96–98% and Not 100%

After CASS and NCOA, the list is at 96–98% deliverability. The remaining 2–4% breaks down roughly like this:

**Movers who did not file change-of-address (1–2%).** Approximately 30–40% of all residential movers never file a USPS forwarding request. These addresses pass CASS (the address still exists) and pass NCOA (no record found), but the named individual no longer lives there. The mail is delivered to the property but received by a new occupant.

**Recently deceased individuals (0.5–1%).** Death records update list databases on roughly a 90-day cycle. For any list, a small percentage of records will be individuals who died between the last death file update and your mailing date. Mail delivered to these addresses is received by family members or returned if the property is now vacant.

**Vacant properties (0.5–1%).** Properties that are vacant — foreclosures, estate properties, seasonal homes not currently occupied — pass CASS (the address exists) and usually pass NCOA (no forwarding filed) but the mail goes uncollected. Vacant property flags are available as a select on some lists but not universally.

**Institutionalized or relocated individuals (0.5%).** People who have moved to assisted living, nursing homes, correctional facilities, or other institutional addresses without filing a standard change-of-address request.

None of these failure modes can be fully eliminated through data processing. They are the irreducible minimum — the reason no list vendor can honestly claim 100% deliverability.

## Address Service Requested: Cleaning Your List After a Mailing

If you want to identify and clean bad addresses from your house list after a mailing, the USPS "Address Service Requested" endorsement does it. Printed on the mail piece, this endorsement instructs the USPS to:

- For mail delivered within 12 months of a change-of-address filing: deliver the piece and return an address correction notice to you (with the new address and a small fee per correction)
- For undeliverable mail more than 12 months post-move: return the piece to you with the reason for non-delivery

Using this endorsement turns your campaign into a free list cleaning exercise. Every returned piece represents a record you should remove from your house file or update with the corrected address. After two or three campaigns with this endorsement, your house list's deliverability typically improves to 98–99%.

Note: "Address Service Requested" applies a fee per returned or corrected piece — currently $0.45–$0.80 per piece. Budget for this if you're mailing to a large list with a high expected non-delivery rate.

## Factors That Affect Your List's Deliverability

**Age of the list.** Lists decay at roughly 1–2% per month due to moves, deaths, and business closures. A list compiled 24 months ago and never refreshed may have 15–20% of records at outdated or wrong addresses. Always refresh with NCOA before mailing.

**Urban versus rural.** Rural carrier routes have more address changes due to rural route renumbering, 911 address standardization projects, and lower forwarding-request rates from rural movers. Expect slightly lower deliverability in rural areas.

**Renter versus owner.** Renters move at approximately 3× the rate of homeowners. Consumer lists filtered to homeowners only typically run higher deliverability than mixed owner/renter lists, partly because homeownership data is more stable.

**Business lists.** Business lists decay faster than consumer lists — businesses close, relocate, and change at higher rates than households. Fresh business lists compiled from current filings outperform older compiled data significantly.

**Your house list versus purchased list.** Your own customer database, regularly updated with each transaction, often outperforms purchased lists because your customers actively maintain a relationship with you. A customer database that has not been NCOA-processed in two years can still be 5–8% outdated.

## Practical Implications for Your Campaign

On a 5,000-piece mailing at 97% deliverability, roughly 150 pieces will fail to reach the intended recipient. At $0.75 per piece all-in, that's $112.50 in waste — a modest and acceptable number on a $3,750 campaign. The math is unfavorable at much higher failure rates: a 90%-deliverable list wastes $375 in the same scenario.

The way to minimize that waste is through the processing steps Cornerstone applies to every list: CASS, NCOA, and deduplication. Beyond that, the most effective tool is house list maintenance — keeping your own customer database current by updating addresses with each transaction and running periodic NCOA refreshes.

For more on the full list processing workflow, see our [mailing list processing guide](/services/mailing-list-services) and our [overview of mailing list types](/services/data-lists).

## Frequently Asked Questions

**How accurate are purchased mailing lists?**

Raw purchased lists run 85–92% deliverable before processing. After CASS certification and NCOA processing, deliverability improves to 96–98%. The remaining 2–4% represents addresses that pass technical verification but have incorrect or absent occupants — movers who did not file forwarding requests, recently deceased individuals, and vacant properties.

**What causes mail to be undeliverable?**

The main causes: recipient moved without filing a change-of-address request (the largest single cause), recipient deceased, property vacant, address formatting wrong for USPS automation, and new occupant at that address (mail delivered but to wrong person). CASS and NCOA address the formatting and known-mover problems; the rest is irreducible.

**What is CASS certification?**

CASS (Coding Accuracy Support System) is USPS-approved software that verifies and standardizes addresses against the USPS master address file. CASS catches non-existent addresses, corrects formatting, and appends ZIP+4 codes. It is required for presort automation discounts and is included in every list Cornerstone delivers.

**Can I get a refund for undeliverable mail?**

Not on standard Marketing Mail. Undeliverable pieces are discarded or returned depending on the mail piece endorsement. The "Address Service Requested" endorsement instructs the USPS to return undeliverables to you with the reason for non-delivery — useful for list cleaning but carries a per-piece fee for returned and corrected pieces.

**How can I improve my list's deliverability above 98%?**

The best path to 98–99% deliverability is maintaining a house list over multiple campaign cycles. Each mailing with the Address Service Requested endorsement identifies and removes bad records. After 3–4 campaigns with active list cleaning, house file deliverability typically reaches 98–99% — as close to perfect as any mailing list can practically achieve. Purchased lists start at 96–98% and stay there because they are compiled from external sources rather than refined through your own mailing activity.

Questions about your list's deliverability? Call Cornerstone at [(845) 255-5722](tel:8452555722) or [request an estimate](/estimate) — we'll tell you exactly what to expect before you mail.
