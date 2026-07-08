---
name: CSP inline script hashes are fragile — prefer hoisted external scripts
description: Why crst.net's strict CSP (no unsafe-inline for scripts) uses sha256 hashes, and why any inline <script is:inline> block is a recurring outage risk.
---

`server.mjs` enforces `script-src` without `'unsafe-inline'`, so every `<script is:inline>` block with real JS content must have its exact sha256 hash hardcoded into the CSP allowlist. Hashes are maintained by hand — there is no build step that computes them.

**Why this matters:** any edit to an inline script's content (even whitespace) changes its hash and silently breaks it — the browser just refuses to execute the block, with no visible error to the end user. This caused a real outage: the Stripe card-mounting script on `/resources/payments` was blocked because its hash was never added, making the card field render as a dead, unclickable box.

**How to apply:** when adding or editing a same-origin inline script on this site, prefer converting it to a plain Astro `<script>` (not `is:inline`) so Vite hoists it into an external bundle under `/_astro/hoisted.*.js`, automatically covered by `script-src 'self'` — no hash to maintain. Only use `is:inline` + a maintained hash when the script must run before hydration/bundling (rare). Third-party scripts loaded via `<script src="https://...">` don't need a hash — they're covered by domain in `script-src` directly.
