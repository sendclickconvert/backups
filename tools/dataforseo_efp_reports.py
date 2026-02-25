import os, json, requests, csv, io, time
from base64 import b64encode

USERNAME = os.environ.get("DataForSEO_Username")
PASSWORD = os.environ.get("DataForSEO_API_Password")
AUTH = b64encode(f"{USERNAME}:{PASSWORD}".encode()).decode()
HEADERS = {"Authorization": f"Basic {AUTH}", "Content-Type": "application/json"}
BASE = "https://api.dataforseo.com/v3"

def post(endpoint, data):
    r = requests.post(f"{BASE}{endpoint}", headers=HEADERS, json=data, timeout=60)
    return r.json()

def save_json(name, data):
    with open(f"tools/efp_{name}.json", "w") as f:
        json.dump(data, f, indent=2)
    print(f"  Saved to tools/efp_{name}.json")

# ========== REPORT 1: Keyword Ideas ==========
print("=" * 60)
print("REPORT 1: Keyword Ideas")
print("=" * 60)
seeds = [
    "480-a forest tax law new york",
    "land clearing Sullivan County NY",
    "timber harvesting Hudson Valley",
    "sell standing timber New York",
    "consulting forester New York",
    "logging company Sullivan County",
    "woodlot management New York",
    "forestry mulching Hudson Valley",
]
r1 = post("/keywords_data/google_ads/keywords_for_keywords/live", [{
    "keywords": seeds,
    "location_code": 2840,
    "language_code": "en",
    "sort_by": "search_volume",
    "include_seed_keyword": True,
}])
if r1.get("tasks") and r1["tasks"][0].get("result"):
    kw_ideas = r1["tasks"][0]["result"]
    print(f"  Got {len(kw_ideas)} keyword ideas")
    print(f"  {'Keyword':<55} {'Vol':>6} {'CPC':>6} {'Comp':>6}")
    print(f"  {'-'*55} {'-'*6} {'-'*6} {'-'*6}")
    for kw in kw_ideas[:30]:
        vol = kw.get("search_volume") or 0
        cpc = kw.get("cpc") or 0
        comp = kw.get("competition") or 0
        print(f"  {kw['keyword']:<55} {vol:>6} {cpc:>6.2f} {comp:>6.2f}")
    save_json("keyword_ideas", kw_ideas)
else:
    print(f"  Error: {json.dumps(r1.get('tasks', [{}])[0].get('status_message', 'unknown'))}")
    save_json("keyword_ideas_raw", r1)

# ========== REPORT 2: Competitor Gap ==========
print()
print("=" * 60)
print("REPORT 2: Competitor Keyword Gap")
print("=" * 60)
competitors = [
    "hudsonvalleyforestry.com",
    "midhudsonforestproducts.com",
    "hinzloggingandlandclearing.com",
    "joshuatreeforestry.com",
    "futureforestinc.com",
    "blackwoodforestry.com",
]
r2 = post("/dataforseo_labs/google/competitors_domain/live", [{
    "target": "eforestproducts.com",
    "location_code": 2840,
    "language_code": "en",
    "filters": None,
    "limit": 100,
}])
if r2.get("tasks") and r2["tasks"][0].get("result"):
    save_json("competitor_domain", r2["tasks"][0]["result"])
    print(f"  Got competitor domain data")
else:
    print(f"  Status: {r2.get('tasks', [{}])[0].get('status_message', 'unknown')}")

gap_results = []
for comp in competitors:
    print(f"  Checking gap: eforestproducts.com vs {comp}...")
    r2b = post("/dataforseo_labs/google/domain_intersection/live", [{
        "target1": comp,
        "target2": "eforestproducts.com",
        "location_code": 2840,
        "language_code": "en",
        "intersections": {"1": False, "2": False, "1_not_2": True},
        "limit": 50,
        "order_by": ["keyword_data.keyword_info.search_volume,desc"],
    }])
    if r2b.get("tasks") and r2b["tasks"][0].get("result"):
        items = r2b["tasks"][0]["result"][0].get("items", []) if r2b["tasks"][0]["result"] else []
        print(f"    → {len(items)} keywords {comp} ranks for that EFP does not")
        for item in items[:10]:
            kd = item.get("keyword_data", {})
            ki = kd.get("keyword_info", {})
            print(f"      {kd.get('keyword','?'):<50} vol={ki.get('search_volume','?'):>5}  pos={item.get('first_domain_serp_element',{}).get('serp_item',{}).get('rank_absolute','?')}")
        gap_results.append({"competitor": comp, "items": items})
    else:
        msg = r2b.get("tasks", [{}])[0].get("status_message", "unknown")
        print(f"    → Error: {msg}")
        gap_results.append({"competitor": comp, "error": msg})

save_json("competitor_gap", gap_results)

# ========== REPORT 3: SERP Overview ==========
print()
print("=" * 60)
print("REPORT 3: SERP Overview (480-a cluster)")
print("=" * 60)
serp_queries = [
    "480-a forest tax law new york",
    "480a consulting forester hudson valley",
    "forest management plan new york 480a",
]
serp_results = []
for q in serp_queries:
    print(f"  SERP: {q}")
    r3 = post("/serp/google/organic/live/regular", [{
        "keyword": q,
        "location_code": 2840,
        "language_code": "en",
        "depth": 20,
    }])
    if r3.get("tasks") and r3["tasks"][0].get("result"):
        items = r3["tasks"][0]["result"][0].get("items", []) if r3["tasks"][0]["result"] else []
        organic = [i for i in items if i.get("type") == "organic"]
        print(f"    → {len(organic)} organic results")
        for i, item in enumerate(organic[:10], 1):
            domain = item.get("domain", "?")
            title = (item.get("title") or "")[:50]
            pos = item.get("rank_absolute", "?")
            print(f"    {pos:>3}. {domain:<35} {title}")
        serp_results.append({"query": q, "items": organic})
    else:
        msg = r3.get("tasks", [{}])[0].get("status_message", "unknown")
        print(f"    → Error: {msg}")
        serp_results.append({"query": q, "error": msg})

save_json("serp_480a", serp_results)

# ========== REPORT 4: Keyword Difficulty ==========
print()
print("=" * 60)
print("REPORT 4: Keyword Difficulty on Priority Terms")
print("=" * 60)
priority_kws = [
    "land clearing sullivan county ny",
    "land clearing orange county ny",
    "land clearing ulster county ny",
    "timber harvesting companies hudson valley",
    "sell standing timber new york",
    "logging company near me sullivan county",
    "480a forest tax law ny",
    "consulting forester sullivan county ny",
    "forestry mulching catskills",
    "woodlot management plan new york",
]
r4 = post("/dataforseo_labs/google/bulk_keyword_difficulty/live", [{
    "keywords": priority_kws,
    "location_code": 2840,
    "language_code": "en",
}])
kd_results = []
if r4.get("tasks") and r4["tasks"][0].get("result"):
    items = r4["tasks"][0]["result"]
    print(f"  {'Keyword':<50} {'Vol':>6} {'KD':>4} {'CPC':>6}")
    print(f"  {'-'*50} {'-'*6} {'-'*4} {'-'*6}")
    for item in items:
        kw = item.get("keyword", "?")
        vol = item.get("search_volume") or 0
        kd = item.get("keyword_difficulty") or 0
        cpc = item.get("cpc") or 0
        print(f"  {kw:<50} {vol:>6} {kd:>4} {cpc:>6.2f}")
        kd_results.append(item)
    save_json("keyword_difficulty", kd_results)
else:
    msg = r4.get("tasks", [{}])[0].get("status_message", "unknown")
    print(f"  Error: {msg}")
    save_json("keyword_difficulty_raw", r4)

# ========== REPORT 5: EFP Current Rankings ==========
print()
print("=" * 60)
print("REPORT 5: EFP Current Organic Rankings")
print("=" * 60)
r5 = post("/dataforseo_labs/google/ranked_keywords/live", [{
    "target": "eforestproducts.com",
    "location_code": 2840,
    "language_code": "en",
    "limit": 100,
    "order_by": ["keyword_data.keyword_info.search_volume,desc"],
}])
if r5.get("tasks") and r5["tasks"][0].get("result"):
    result = r5["tasks"][0]["result"]
    total = result[0].get("total_count", 0) if result else 0
    items = result[0].get("items", []) if result else []
    print(f"  Total ranked keywords: {total}")
    print(f"  {'Keyword':<50} {'Vol':>6} {'Pos':>4} {'URL'}")
    print(f"  {'-'*50} {'-'*6} {'-'*4} {'-'*40}")
    for item in items[:30]:
        kd = item.get("keyword_data", {})
        ki = kd.get("keyword_info", {})
        se = item.get("ranked_serp_element", {}).get("serp_item", {})
        kw = kd.get("keyword", "?")
        vol = ki.get("search_volume") or 0
        pos = se.get("rank_absolute") or se.get("rank_group") or "?"
        url = (se.get("relative_url") or "")[:40]
        print(f"  {kw:<50} {vol:>6} {pos:>4} {url}")
    save_json("efp_rankings", items)
else:
    msg = r5.get("tasks", [{}])[0].get("status_message", "unknown")
    print(f"  Error: {msg}")
    save_json("efp_rankings_raw", r5)

print()
print("=" * 60)
print("ALL REPORTS COMPLETE")
print("=" * 60)
