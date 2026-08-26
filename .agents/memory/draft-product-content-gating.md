---
name: Draft-product content gating
description: How to compute "draft" status for CMS-backed product content when only some fields are placeholder, without drafting every item.
---

When a content collection has many fields and only some carry a placeholder sentinel (e.g. "TODO_SPEC"), don't gate the whole item's draft status on "any field is placeholder" — that drafts everything if even one commonly-unfilled field (like turnaround time, stock, or ink/finish) lags behind the rest.

**Why:** In this project, all 20 product entries had `specs.turnaround` still a placeholder, including the 6 the business considered "complete." A literal any-placeholder rule would have drafted all 20 and zeroed out a syndication feed that was supposed to ship the 6 complete ones.

**How to apply:** Split fields into two tiers:
1. Core narrative fields (intro, primary specs, use cases, ordering steps, FAQs) — any placeholder here means the whole item is draft (hide the corresponding sections).
2. Secondary/operational fields that lag independently (turnaround, stock, finish) — guard these per-field/per-row at render time instead, hiding just that row/line while the rest of the item still displays.

Also: never let the literal placeholder string leak into rendered HTML, JSON-LD `description`, or an FAQPage schema block — omit the field/section entirely rather than rendering the sentinel text.
