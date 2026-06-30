#!/usr/bin/env python3
"""
pull_keywords.py  —  DataForSEO keyword pull for Pullman Car Service
Outputs pullman_keywords.csv: keyword, volume, CPC, competition, SERP features.

Setup in Replit:
  1. Tools -> Secrets, add:
        DATAFORSEO_LOGIN     = your DataForSEO login (email)
        DATAFORSEO_PASSWORD  = your DataForSEO password
  2. Shell:  pip install requests
  3. Run:    python pull_keywords.py
"""

import os, csv, sys, requests

LOGIN    = os.environ.get("DATAFORSEO_LOGIN")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")
if not LOGIN or not PASSWORD:
    sys.exit("Missing DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD in Secrets.")

AUTH          = (LOGIN, PASSWORD)
BASE          = "https://api.dataforseo.com/v3"
LOCATION_NAME = "United States"   # narrow to "New York,New York,United States" for state-level volume
LANGUAGE_NAME = "English"
PULL_SERP     = True              # set False to skip per-keyword SERP-feature calls (saves credits)

# ── Seed terms ────────────────────────────────────────────────────────────────
SEEDS = [
    # core / brand-category
    "car service near me", "black car service", "limo service near me",
    "airport car service", "luxury car service", "chauffeur service",
    # airports (named + opportunity)
    "car service to stewart airport", "car service to albany airport",
    "car service to jfk", "car service to lga", "car service to ewr",
    "car service to newark airport",
    # services
    "wedding transportation hudson valley", "wedding limo poughkeepsie",
    "party bus rental hudson valley", "prom limo dutchess county",
    "corporate car service hudson valley", "nyc car service from hudson valley",
    "hudson valley wine tour transportation",
]

# ── Airport × origin-town matrix (auto-generated) ──────────────────────────────
AIRPORTS = ["jfk", "lga", "ewr", "stewart airport", "albany airport"]
TOWNS    = ["millbrook", "poughkeepsie", "rhinebeck", "beacon", "kingston",
            "newburgh", "hyde park", "red hook", "wappingers falls", "fishkill"]
MATRIX   = [f"car service to {a} from {t}" for t in TOWNS for a in AIRPORTS]

KEYWORDS = list(dict.fromkeys(SEEDS + MATRIX))   # dedupe, preserve order
print(f"Pulling {len(KEYWORDS)} keywords...")

# ── 1) Search volume / CPC / competition (one call, up to 1000 kw) ─────────────
sv_body = [{
    "location_name": LOCATION_NAME,
    "language_name": LANGUAGE_NAME,
    "keywords": KEYWORDS,
}]
r = requests.post(f"{BASE}/keywords_data/google_ads/search_volume/live",
                  auth=AUTH, json=sv_body, timeout=120)
r.raise_for_status()
sv_items = (r.json()["tasks"][0].get("result") or [])
vol = {it["keyword"].lower(): it for it in sv_items}

# ── 2) SERP features per keyword (optional; one call each) ─────────────────────
def serp_features(kw):
    body = [{"keyword": kw, "location_name": LOCATION_NAME,
             "language_name": LANGUAGE_NAME, "device": "desktop"}]
    resp = requests.post(f"{BASE}/serp/google/organic/live/advanced",
                         auth=AUTH, json=body, timeout=120)
    resp.raise_for_status()
    res = resp.json()["tasks"][0].get("result") or [{}]
    types = res[0].get("item_types", []) if res else []
    flags = {"ai_overview": "AI Overview", "people_also_ask": "PAA",
             "local_pack": "Local Pack", "featured_snippet": "Featured Snippet",
             "paid": "Paid"}
    return ", ".join(label for k, label in flags.items() if k in types) or "—"

# ── 3) Write CSV (sorted by volume desc) ───────────────────────────────────────
rows = []
for kw in KEYWORDS:
    d = vol.get(kw.lower(), {})
    rows.append({
        "keyword": kw,
        "volume": d.get("search_volume") or 0,
        "cpc": round(d.get("cpc") or 0, 2),
        "competition": (d.get("competition") or "").upper(),
        "serp_features": serp_features(kw) if PULL_SERP else "",
    })
rows.sort(key=lambda x: x["volume"], reverse=True)

with open("pullman_keywords.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["keyword", "volume", "cpc", "competition", "serp_features"])
    w.writeheader(); w.writerows(rows)

print("Done -> pullman_keywords.csv")
for r_ in rows[:15]:
    print(f"  {r_['volume']:>6}  {r_['keyword']:<45} {r_['competition']:<7} {r_['serp_features']}")