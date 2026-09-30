---
name: Shopify store identity
description: Do not change store identity to make mismatched credentials work.
---

When Shopify authentication fails, keep the intended store configured; do not fall back to another store merely because the token works there.

**Why:** A replacement Storefront token authenticated against a legacy store with an incomplete catalog, but not against the intended store. Switching domains would hide missing products and send orders to the wrong store rather than fix authentication.

**How to apply:** Confirm the intended domain and matching credentials before declaring live catalog or checkout operational. Synthetic tests can verify syncing mechanics but cannot establish that the real store connection works.