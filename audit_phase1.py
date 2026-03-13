#!/usr/bin/env python3
"""Phase 1: Submit crawl + run keywords + backlinks + competitors (fast sections)"""
import os, sys, json, time, base64, urllib.request, urllib.error
from datetime import datetime

LOGIN = os.environ.get("DATAFORSEO_LOGIN", "")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD", "")
if not LOGIN or not PASSWORD:
    LOGIN = os.environ.get("DataForSEO_Username", "")
    PASSWORD = os.environ.get("DataForSEO_API_Password", "")

AUTH = base64.b64encode(f"{LOGIN}:{PASSWORD}".encode()).decode()
BASE = "https://api.dataforseo.com"
TARGET = "ajielectricalsolutionsinc.com"
LEGACY_DOMAIN = "ajielectricalsolutions.com"
DELAY = 1.0

KEYWORDS = [
    "electrician near me", "electrician cornwall ny", "electrician bergen county nj",
    "electrician highland mills ny", "electrician westchester county ny",
    "electrical contractor near me", "emergency electrician near me",
    "electrical panel upgrade near me", "generator installation near me",
    "ev charger installation near me", "residential electrician near me",
    "commercial electrician near me", "electrician franklin lakes nj",
    "electrician ridgewood nj", "electrician mahwah nj",
    "electrician newburgh ny", "electrician monroe ny",
]
LOCATIONS = ["Cornwall,New York,United States", "Paramus,New Jersey,United States"]

raw = {}

def api(method, endpoint, body=None):
    url = BASE + endpoint
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Basic {AUTH}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        print(f"  [ERR] {endpoint}: {e}")
        return None

print("=" * 70)
print("PHASE 1: Submit crawl + Keywords + Backlinks + Competitors")
print("=" * 70)

# Submit crawl
print("\n[1] Submitting on-page crawl...")
crawl_resp = api("POST", "/v3/on_page/task_post", [{
    "target": TARGET, "max_crawl_pages": 150,
    "load_resources": True, "enable_javascript": True, "enable_browser_rendering": True,
}])
raw["crawl_submit"] = crawl_resp
crawl_task_id = None
if crawl_resp and crawl_resp.get("tasks"):
    crawl_task_id = crawl_resp["tasks"][0].get("id")
    print(f"  Crawl task ID: {crawl_task_id}")
else:
    print("  FAILED to submit crawl")

# Keywords
print("\n[2] Keyword Rankings...")
serp_results = []
competitor_domains = {}

for loc in LOCATIONS:
    print(f"\n  Location: {loc}")
    for kw in KEYWORDS:
        time.sleep(DELAY)
        resp = api("POST", "/v3/serp/google/organic/live/advanced", [{
            "keyword": kw, "location_name": loc, "language_name": "English",
            "device": "mobile", "os": "Android", "depth": 100,
        }])
        raw[f"serp_{kw}_{loc}".replace(" ","_").replace(",","")] = resp

        rank = "Not in top 100"
        ranking_url = ""
        local_pack = []

        if resp and resp.get("tasks"):
            for t in resp["tasks"]:
                for r in (t.get("result") or []):
                    for item in (r.get("items") or []):
                        itype = item.get("type", "")
                        if itype == "organic":
                            domain = item.get("domain", "")
                            if TARGET in domain or LEGACY_DOMAIN in domain:
                                if rank == "Not in top 100":
                                    rank = item.get("rank_absolute", "?")
                                    ranking_url = item.get("url", "")
                            else:
                                competitor_domains[domain] = competitor_domains.get(domain, 0) + 1
                        if itype == "local_pack":
                            for lpi in (item.get("items") or []):
                                local_pack.append({
                                    "title": lpi.get("title",""), "domain": lpi.get("domain",""),
                                    "rating": lpi.get("rating",{}).get("value") if isinstance(lpi.get("rating"),dict) else None,
                                    "reviews": lpi.get("rating",{}).get("votes_count") if isinstance(lpi.get("rating"),dict) else None,
                                })
                                d = lpi.get("domain","")
                                if d: competitor_domains[d] = competitor_domains.get(d, 0) + 1

        print(f"  {kw:<45} {str(rank):<12} {ranking_url[:60]}")
        if local_pack:
            for lp in local_pack[:3]:
                print(f"    LP: {lp['title'][:40]} | {lp['domain']} | ★{lp.get('rating','?')}")

        serp_results.append({"keyword": kw, "location": loc, "rank": rank, "url": ranking_url, "local_pack": local_pack})

raw["serp_results"] = serp_results

# Backlinks
print("\n[3] Backlink Profile...")
for label, target in [(TARGET, TARGET), (LEGACY_DOMAIN, LEGACY_DOMAIN)]:
    time.sleep(DELAY)
    resp = api("POST", "/v3/backlinks/summary/live", [{"target": target, "internal_list_limit": 10, "backlinks_status_type": "all"}])
    raw[f"bl_summary_{label}"] = resp
    if resp and resp.get("tasks"):
        for t in resp["tasks"]:
            for r in (t.get("result") or []):
                print(f"\n  {label}:")
                print(f"    Backlinks: {r.get('total_backlinks',0):,} | Ref domains: {r.get('referring_domains',0):,} | Rank: {r.get('rank',0)}")
                print(f"    Dofollow: {r.get('dofollow',0):,} | Nofollow: {r.get('nofollow',0):,}")

time.sleep(DELAY)
bl_list = api("POST", "/v3/backlinks/backlinks/live", [{"target": TARGET, "limit": 100, "order_by": ["rank,desc"], "backlinks_status_type": "live"}])
raw["bl_backlinks"] = bl_list
if bl_list and bl_list.get("tasks"):
    for t in bl_list["tasks"]:
        for r in (t.get("result") or []):
            items = r.get("items") or []
            print(f"\n  Top backlinks ({len(items)}):")
            for i, item in enumerate(items[:20]):
                print(f"    {i+1}. {item.get('url_from','?')[:70]} → {item.get('url_to','?')[:50]} | rank:{item.get('rank',0)}")

time.sleep(DELAY)
rd = api("POST", "/v3/backlinks/referring_domains/live", [{"target": TARGET, "limit": 100, "order_by": ["rank,desc"]}])
raw["bl_ref_domains"] = rd
if rd and rd.get("tasks"):
    for t in rd["tasks"]:
        for r in (t.get("result") or []):
            items = r.get("items") or []
            print(f"\n  Top referring domains ({len(items)}):")
            for i, item in enumerate(items[:20]):
                print(f"    {i+1}. {item.get('domain','?')} | rank:{item.get('rank',0)} | bl:{item.get('backlinks',0)}")

time.sleep(DELAY)
anc = api("POST", "/v3/backlinks/anchors/live", [{"target": TARGET, "limit": 50, "order_by": ["backlinks,desc"]}])
raw["bl_anchors"] = anc
if anc and anc.get("tasks"):
    for t in anc["tasks"]:
        for r in (t.get("result") or []):
            items = r.get("items") or []
            print(f"\n  Top anchors ({len(items)}):")
            for i, item in enumerate(items[:20]):
                print(f"    {i+1}. \"{item.get('anchor','?')}\" — {item.get('backlinks',0)} bl")

# Competitors
print("\n[4] Competitor Analysis...")
skip = [TARGET, LEGACY_DOMAIN, "google.com", "yelp.com", "facebook.com", "youtube.com",
        "instagram.com", "twitter.com", "x.com", "bbb.org", "thumbtack.com",
        "homeadvisor.com", "angi.com", "angieslist.com", "nextdoor.com",
        "mapquest.com", "yellowpages.com", "manta.com", "superpages.com"]

top3 = []
for d, c in sorted(competitor_domains.items(), key=lambda x: x[1], reverse=True):
    if not any(s in d for s in skip):
        top3.append((d, c))
    if len(top3) >= 3: break

for domain, cnt in top3:
    time.sleep(DELAY)
    resp = api("POST", "/v3/backlinks/summary/live", [{"target": domain, "internal_list_limit": 5, "backlinks_status_type": "all"}])
    raw[f"comp_{domain}"] = resp
    if resp and resp.get("tasks"):
        for t in resp["tasks"]:
            for r in (t.get("result") or []):
                print(f"  {domain} (in {cnt} SERPs) | BL:{r.get('total_backlinks',0):,} | RD:{r.get('referring_domains',0):,} | Rank:{r.get('rank',0)}")

# Save phase 1
raw["crawl_task_id"] = crawl_task_id
raw["competitor_top3"] = top3
with open("audit_phase1.json", "w") as f:
    json.dump(raw, f, indent=2, default=str)
print(f"\n✓ Phase 1 complete. Saved audit_phase1.json")
print(f"  Crawl task ID for phase 2: {crawl_task_id}")
