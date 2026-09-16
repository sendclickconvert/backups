---
name: Legacy Shopify publication
description: Publication selection for the environment-token storefront when Shopify reports no app-owned publication.
---

Use the Online Store publication for products served through the project's environment-based Storefront token when the Admin app reports no dedicated publication.

**Why:** The token authenticated successfully but returned no products while all active products were limited to Shop and Point of Sale. Publishing them to Online Store made the complete catalog visible.

**How to apply:** For catalog visibility checks, resolve publications dynamically and confirm the app-owned publication first. If it remains absent for this legacy credential setup, verify and use Online Store rather than Shop or Point of Sale.