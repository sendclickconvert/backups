#!/usr/bin/env python3
"""
pull_magnets.py  —  DataForSEO 5-step keyword research for magnetic postcards
Pipeline: expand → volume/CPC → KD → intent → SERP (survivors only)
Output: magnets_full.csv (all keywords with data) + magnets_opportunities.csv (survivors)
"""

import os, csv, sys, time, json, requests

LOGIN    = os.environ.get("DATAFORSEO_LOGIN")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")
if not LOGIN or not PASSWORD:
    sys.exit("Missing DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD")

AUTH = (LOGIN, PASSWORD)
BASE = "https://api.dataforseo.com/v3"
LOC  = "United States"
LANG = "English"

VOLUME_MIN = 40
KD_MAX     = 40
CPC_MIN    = 1.0
KEEP_INTENTS = {"commercial", "transactional"}
SKIP_DOMAINS = {
    "vistaprint.com", "uprinting.com", "gotprint.com", "printplace.com",
    "48hourprint.com", "amazon.com", "staples.com", "zazzle.com",
}

CORE_SEEDS = [
    "magnetic postcards", "magnetic postcard printing", "magnetic mailers",
    "magnet postcards", "postcard magnets", "custom magnetic postcards",
    "magnetic direct mail", "refrigerator magnet mailers",
    "magnetic mail advertising", "bulk magnetic postcards",
    "magnetic postcard mailing service",
]
VERTICAL = [
    "real estate magnetic postcards", "realtor magnet mailers",
    "magnetic calendar mailers", "appointment reminder magnets",
    "sports schedule magnets", "magnetic business card mailers",
    "restaurant magnet mailers", "nonprofit magnet mailers",
]
ADJACENT = [
    "car magnets custom", "die cut magnets bulk",
    "promotional refrigerator magnets",
]
ALL_SEEDS = list(dict.fromkeys(CORE_SEEDS + VERTICAL + ADJACENT))

def post(endpoint, body, timeout=60):
    r = requests.post(f"{BASE}/{endpoint}", auth=AUTH, json=body, timeout=timeout)
    r.raise_for_status()
    tasks = r.json().get("tasks", [{}])
    return tasks[0].get("result") or []

# ── STEP 1: Expand via keyword_suggestions + related_keywords ─────────────────
print("\n── STEP 1: Keyword expansion ──────────────────────────────────────────")
expanded = set(kw.lower() for kw in ALL_SEEDS)

for seed in CORE_SEEDS[:8]:
    print(f"  suggestions → {seed}")
    try:
        res = post("dataforseo_labs/google/keyword_suggestions/live",
                   [{"keyword": seed, "location_name": LOC, "language_name": LANG, "limit": 30}])
        for item in (res[0].get("items") or []) if res else []:
            kw = item.get("keyword", "")
            if kw:
                expanded.add(kw.lower())
    except Exception as e:
        print(f"    error: {e}")
    time.sleep(0.3)

for seed in CORE_SEEDS[:5]:
    print(f"  related     → {seed}")
    try:
        res = post("dataforseo_labs/google/related_keywords/live",
                   [{"keyword": seed, "location_name": LOC, "language_name": LANG, "limit": 30}])
        for item in (res[0].get("items") or []) if res else []:
            kw = item.get("keyword_data", {}).get("keyword", "")
            if kw:
                expanded.add(kw.lower())
    except Exception as e:
        print(f"    error: {e}")
    time.sleep(0.3)

all_keywords = sorted(expanded)
print(f"  → {len(all_keywords)} unique keywords after expansion")

# ── STEP 2: Search volume + CPC + competition ──────────────────────────────────
print("\n── STEP 2: Search volume / CPC / competition ──────────────────────────")
vol_map = {}
CHUNK = 900
for i in range(0, len(all_keywords), CHUNK):
    chunk = all_keywords[i:i+CHUNK]
    try:
        res = post("keywords_data/google_ads/search_volume/live",
                   [{"location_name": LOC, "language_name": LANG, "keywords": chunk}],
                   timeout=120)
        for item in res:
            vol_map[item["keyword"].lower()] = item
    except Exception as e:
        print(f"  volume chunk failed: {e}")
    time.sleep(0.5)
print(f"  → volume data for {len(vol_map)} keywords")

# Print all seeds with volume for visibility
print("  Seed volumes:")
for kw in ALL_SEEDS:
    v = vol_map.get(kw.lower(), {})
    sv = v.get("search_volume") or 0
    cpc = v.get("cpc") or 0
    comp = (v.get("competition") or "").upper()
    print(f"    {sv:>6}  ${cpc:>5.2f}  {comp:<7}  {kw}")

vol_filtered = [
    kw for kw in all_keywords
    if (vol_map.get(kw, {}).get("search_volume") or 0) >= VOLUME_MIN
    and (vol_map.get(kw, {}).get("cpc") or 0) >= CPC_MIN
]
print(f"\n  → {len(vol_filtered)} pass volume ≥ {VOLUME_MIN} and CPC ≥ ${CPC_MIN}")

# ── STEP 3: Keyword difficulty ─────────────────────────────────────────────────
print("\n── STEP 3: Keyword difficulty ──────────────────────────────────────────")
kd_map = {}
if vol_filtered:
    try:
        res = post("dataforseo_labs/google/bulk_keyword_difficulty/live",
                   [{"keywords": vol_filtered, "location_name": LOC, "language_name": LANG}],
                   timeout=120)
        for item in (res[0].get("items") or []) if res else []:
            kd_map[item["keyword"].lower()] = item.get("keyword_difficulty", 100)
    except Exception as e:
        print(f"  KD call failed: {e}")

kd_filtered = [kw for kw in vol_filtered if kd_map.get(kw, 100) <= KD_MAX]
print(f"  → {len(kd_filtered)} pass KD ≤ {KD_MAX}")
for kw in kd_filtered:
    print(f"    KD={kd_map.get(kw,'?'):>3}  {kw}")

# ── STEP 4: Search intent ──────────────────────────────────────────────────────
print("\n── STEP 4: Search intent ───────────────────────────────────────────────")
intent_map = {}
# Run intent on all vol_filtered (not just kd_filtered) so we have full picture
intent_candidates = vol_filtered if vol_filtered else list(all_keywords)
if intent_candidates:
    try:
        res = post("dataforseo_labs/google/search_intent/live",
                   [{"keywords": intent_candidates, "language_name": LANG}],
                   timeout=120)
        for item in (res[0].get("items") or []) if res else []:
            label = item.get("keyword_intent", {}).get("label", "informational")
            intent_map[item["keyword"].lower()] = label
    except Exception as e:
        print(f"  intent call failed: {e}")

print(f"  Intent results:")
for kw in vol_filtered:
    print(f"    {intent_map.get(kw,'?'):<15}  {kw}")

# Apply both KD and intent filters
survivors = [
    kw for kw in kd_filtered
    if intent_map.get(kw, "informational") in KEEP_INTENTS
]
print(f"\n  → {len(survivors)} pass KD + intent filters")

# If nothing survived intent filter, use kd_filtered and flag intent manually
if not survivors and kd_filtered:
    print("  (intent filter removed all — using KD survivors with intent noted)")
    survivors = kd_filtered

# ── STEP 5: SERP composition (survivors only) ──────────────────────────────────
print("\n── STEP 5: SERP analysis ───────────────────────────────────────────────")

def analyze_serp(kw):
    try:
        res = post("serp/google/organic/live/advanced",
                   [{"keyword": kw, "location_name": LOC, "language_name": LANG,
                     "device": "desktop", "depth": 10}], timeout=45)
        items = (res[0].get("items") or []) if res else []
        organic = [it for it in items if it.get("type") == "organic"][:10]
        domains, skip_count = [], 0
        for it in organic:
            dom = it.get("domain", "").lower().replace("www.", "")
            domains.append(dom)
            if any(s in dom for s in SKIP_DOMAINS):
                skip_count += 1
        serp_features = [it.get("type","") for it in items if it.get("type") != "organic"]
        feature_str = ", ".join(dict.fromkeys(f for f in serp_features if f))[:60]
        top5 = " | ".join(domains[:5])
        opportunity = "YES" if skip_count < 6 else "no"
        return skip_count, top5, feature_str, opportunity
    except Exception as e:
        print(f"    error: {e}")
        return 0, "error", "", "?"

serp_results = {}
for i, kw in enumerate(survivors):
    print(f"  [{i+1}/{len(survivors)}] {kw}")
    sc, top5, features, opp = analyze_serp(kw)
    serp_results[kw] = {"skip_count": sc, "top5_domains": top5,
                        "serp_features": features, "opportunity": opp}
    print(f"    → skip={sc}  opp={opp}  {top5[:70]}")
    time.sleep(0.5)

# ── Write CSVs ─────────────────────────────────────────────────────────────────
FIELDS = ["keyword","volume","cpc","competition","kd","intent",
          "opportunity","skip_domain_count","serp_features","top5_domains"]

all_rows = []
for kw in all_keywords:
    v   = vol_map.get(kw, {})
    sr  = serp_results.get(kw, {})
    all_rows.append({
        "keyword":          kw,
        "volume":           v.get("search_volume") or 0,
        "cpc":              round(v.get("cpc") or 0, 2),
        "competition":      (v.get("competition") or "").upper(),
        "kd":               kd_map.get(kw, ""),
        "intent":           intent_map.get(kw, ""),
        "opportunity":      sr.get("opportunity", ""),
        "skip_domain_count":sr.get("skip_count", ""),
        "serp_features":    sr.get("serp_features", ""),
        "top5_domains":     sr.get("top5_domains", ""),
    })
all_rows.sort(key=lambda x: x["volume"], reverse=True)

with open("magnets_full.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=FIELDS)
    w.writeheader(); w.writerows(all_rows)

opp_rows = [r for r in all_rows if r.get("opportunity") == "YES"]
with open("magnets_opportunities.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=FIELDS)
    w.writeheader(); w.writerows(opp_rows)

print(f"\n{'─'*70}")
print(f"magnets_full.csv          → {len(all_rows)} keywords")
print(f"magnets_opportunities.csv → {len(opp_rows)} opportunities\n")
print("Top opportunities:")
for r in opp_rows[:20]:
    print(f"  vol={r['volume']:>5}  kd={str(r['kd']):>3}  cpc=${r['cpc']:.2f}"
          f"  {r['intent']:<14}  {r['keyword'][:40]:<40}  {r['top5_domains'][:55]}")
