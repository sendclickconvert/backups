---
title: "How to Clean a Mailing List Before You Mail"
description: "Mailing list hygiene step by step — CASS certification, NCOA processing, deduplication, and merge/purge. What each step does and why skipping any of them costs you money."
pubDate: 2026-04-09
updatedDate: 2026-04-09
author: "Sean Griffin"
authorTitle: "Owner, Cornerstone Services"
authorLocation: "New Paltz, NY"
primaryKeyword: "how to clean a mailing list"
pillar: "https://crst.net/services/data-lists"
schemaFAQ:
  - q: "What does it mean to clean a mailing list?"
    a: "Cleaning a mailing list means running it through a series of validation and correction processes: CASS certification (address verification and standardization), NCOA processing (updating addresses for known movers), deduplication (removing duplicate records), and optionally merge/purge (suppressing your existing customers from a purchased list). The result is a deliverable, non-redundant file that qualifies for USPS automation postage rates."
  - q: "How much does it cost to clean a mailing list?"
    a: "At Cornerstone Services, list cleaning — CASS, NCOA, deduplication, and formatting — is included in every list we deliver and in every campaign we mail. For lists you supply for processing only (not printing and mailing with us), we charge $75 per 1,000 records, which includes all standard cleaning steps."
  - q: "Can I clean my own mailing list?"
    a: "Individual businesses cannot access the NCOA database directly — USPS licensing requires certified list processors. CASS certification requires USPS-approved software. To properly clean a mailing list, you need a licensed list service provider. Cornerstone holds the necessary USPS licenses to process lists for any client."
  - q: "How often should I clean my mailing list?"
    a: "For any active house list, run NCOA every 95 days to maintain presort compliance. For purchased lists, clean immediately before each use — do not reuse a list cleaned for a previous campaign without re-processing. For customer databases, cleaning quarterly is sufficient for most businesses."
---

A clean mailing list is the difference between a direct mail campaign that pays back and one that burns your budget on undeliverable pieces. Every bad address in your list is money wasted — printing, postage, and handling on a piece that will never reach a human being.

The process of cleaning a list involves four distinct steps, each solving a different problem. At [Cornerstone Services](/services/data-lists), we run all four on every list — whether we build it from our data sources or you supply it from your own database. This guide explains what each step does and why skipping any of them costs you more than the cleaning fee.

## Step 1: CASS Certification

CASS (Coding Accuracy Support System) is USPS-approved software that verifies every address in your list against the USPS master address file — a database of every deliverable address in the United States, updated continuously from postal carrier data.

CASS does three things:

**Corrects formatting.** Addresses in raw data files frequently have inconsistent formatting — "Street" versus "St," "Avenue" versus "Ave," inconsistent capitalization, missing directional indicators (N, S, E, W). CASS standardizes every address to USPS format so the automated sorting equipment can read and process it.

**Appends ZIP+4 codes.** The basic five-digit ZIP code identifies a post office. The four-digit extension narrows to a specific delivery range — a block, a building floor, a PO Box group. ZIP+4 codes are required for Intelligent Mail barcodes and are what qualify your mailing for the lowest presort automation rates. Without them, you pay higher postage.

**Flags non-existent addresses.** If the street number does not exist on that street in that ZIP code, CASS flags it as undeliverable. These records are removed from the list before printing.

After CASS, you typically suppress 3–7% of raw records — those are addresses that failed verification and would have resulted in undeliverable mail.

## Step 2: NCOA Processing

[NCOA (National Change of Address)](/services/data-lists/what-is-ncoa-processing) addresses the most common cause of undeliverable mail: the person moved. The USPS NCOA database contains 48 months of change-of-address filings — approximately 160 million records. Running your list against this database either updates addresses for known movers or suppresses records where no forwarding address is available.

NCOA is not optional for presorted mail. The USPS requires NCOA processing within 95 days of your mail date as a condition of the automation postage discount. If you skip it, you lose the presort rates that typically save $0.15–$0.25 per piece — on a 5,000-piece campaign, that's $750–$1,250 in additional postage.

After NCOA, you typically suppress an additional 2–5% of records (people who moved and could not be forwarded) and update 1–3% with corrected addresses.

## Step 3: Deduplication

Deduplication identifies and removes duplicate records from the list. Duplicate records waste print and postage budget by mailing the same person multiple times. They also create a poor impression — a recipient who receives three identical pieces immediately suspects your data quality.

Duplicates arise in several ways:
- A name appears twice with slightly different spellings ("Sean Griffin" and "S. Griffin")
- The same address appears under two different names (husband and wife listed separately in the source data)
- Records merged from multiple source databases overlap
- Previous campaign suppressions were not applied

Deduplication uses matching logic that catches common variations — name format differences, middle initial presence/absence, address abbreviation differences. The result is one record per deliverable household (or per individual, depending on your suppression preference).

For campaigns targeting households (one piece per address), Cornerstone deduplicates to one record per unique delivery point. For campaigns targeting individuals, we deduplicate to one record per person.

## Step 4: Merge/Purge

Merge/purge is an optional but often valuable step that suppresses your existing customers from a purchased list. If you are running a new-customer acquisition campaign, you typically do not want to spend money mailing people who already buy from you.

To run merge/purge, you supply your house customer file (Excel or CSV). We match it against the purchased list using name and address matching logic and remove any records that appear in both files. The result is a purchased list that has been cleaned of existing customers.

Merge/purge is included at no additional charge when you print and mail with Cornerstone. It can also be applied to your own list before mailing if you want to suppress a segment — former customers, people who requested removal, recent buyers who don't need a reactivation offer.

## What You Get After Cleaning

After all four steps, you have a file with:
- Every address standardized to USPS format with ZIP+4 codes
- Addresses updated for known movers (NCOA matches)
- Non-existent and unforwardable addresses removed
- Duplicate records eliminated
- Existing customers suppressed (if merge/purge was requested)
- Intelligent Mail barcode qualification confirmed

This file is mail-ready. If you are printing and mailing with Cornerstone, it goes directly into our inkjet addressing system. If you are printing elsewhere or using the list for other purposes, we deliver it as a formatted Excel or CSV file.

## Cleaning Your Own House List

If you maintain a customer database, it needs periodic cleaning too. Customer lists accumulate bad addresses through natural address decay — moves, business closures, deaths. A customer database that has not been NCOA-processed in two years may have 8–12% outdated records.

Cornerstone processes your house files the same way we process purchased lists: CASS, NCOA, deduplication, format standardization. If you mail with us regularly, we recommend refreshing your house file with NCOA every 95 days. For annual mailers, we clean the file fresh before each campaign.

The cost is $75 per 1,000 records for processing-only jobs (where you're not printing and mailing with us). For all campaigns run through Cornerstone, cleaning is included.

For questions about processing your specific list, call [(845) 255-5722](tel:8453936770) or [request an estimate](/estimate). We accept lists in Excel, CSV, or any standard database export format.
