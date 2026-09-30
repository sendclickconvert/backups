- [BaseLayout schema={null} pattern](baselayout-schema-null.md) — pages using Fragment slot="head" for custom schema MUST pass schema={null} to BaseLayout or get duplicate JSON-LD blocks.
- [CSP inline script hashes are fragile](csp-inline-script-hashes.md) — prefer hoisted external scripts (plain `<script>`, not `is:inline`) over hash-maintained inline blocks; caused a real Stripe outage.
- [Draft-product content gating](draft-product-content-gating.md) — a literal "any placeholder field → draft" rule for CMS content drafted every item; draft status must exclude fields that are guarded per-row instead.
- [Shopify availableForSale ≠ inventory](shopify-availableforsale-inventory.md) — availableForSale can be true with 0 on-hand quantity; that's real "continue selling" policy, not a stale/default value.
- [Legacy Shopify publication](legacy-shopify-publication.md) — the environment-token storefront uses Online Store; the Admin app has no dedicated publication.
- [Shopify store identity](shopify-store-identity.md) — never switch to a legacy store merely to make mismatched credentials authenticate.
</content>
