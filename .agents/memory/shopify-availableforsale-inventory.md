---
name: Shopify availableForSale vs inventory quantity
description: availableForSale=true with quantityAvailable=0 is expected for made-to-order/print products, not a bug or hardcoded default.
---

When a Shopify Storefront API product/variant shows `availableForSale: true` while `quantityAvailable: 0`, that is real inventory-policy data, not a stale or hardcoded default — it means "continue selling when out of stock" is enabled (typical for made-to-order/print-on-demand items with no physical stock to track).

**Why:** Verified directly against the live Storefront GraphQL API for a Shopify store selling custom-printed products — every variant returned this combination, confirming it reflects genuine inventory policy rather than a fallback in application code.

**How to apply:** Before assuming an `availableForSale: true` signal is wrong or fake, check the store's product type — physical made-to-order goods legitimately report available-for-sale with zero on-hand quantity. Also note: a password-protected/coming-soon storefront gate blocks the public storefront UI and checkout but does not affect the Storefront API response (separate auth via access-token header), so `availableForSale` is unaffected by that gate.
