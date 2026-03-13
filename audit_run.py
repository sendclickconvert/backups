#!/usr/bin/env python3
"""All-in-one audit — saves progress after each section so nothing is lost."""
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
LEGACY = "ajielectricalsolutions.com"
NAP_PHONE = "8452709950"
NAP_DOMAIN = "ajielectricalsolutionsinc.com"
DELAY = 0.5
PROGRESS_FILE = "audit_progress.json"

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

def load_progress():
    try:
        with open(PROGRESS_FILE) as f:
            return json.load(f)
    except:
        return {"raw": {}, "issues": {"CRITICAL":[], "WARNING":[], "OPPORTUNITY":[]}, "completed": [], "crawl_task_id": None}

def save_progress(state):
    with open(PROGRESS_FILE, "w") as f:
        json.dump(state, f, indent=2, default=str)

def api(method, endpoint, body=None):
    url = BASE + endpoint
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Basic {AUTH}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300] if e.fp else ""
        print(f"  [ERR {e.code}] {endpoint}: {body[:200]}")
        return None
    except Exception as e:
        print(f"  [ERR] {endpoint}: {e}")
        return None

def issue(state, sev, section, msg):
    state["issues"][sev].append(f"[{section}] {msg}")

state = load_progress()

# ---- SECTION 1: Submit crawl ----
if "crawl_submitted" not in state["completed"]:
    print("\n[1] Submitting on-page crawl...")
    resp = api("POST", "/v3/on_page/task_post", [{
        "target": TARGET, "max_crawl_pages": 150,
        "load_resources": True, "enable_javascript": True, "enable_browser_rendering": True,
    }])
    state["raw"]["crawl_submit"] = resp
    if resp and resp.get("tasks"):
        state["crawl_task_id"] = resp["tasks"][0].get("id")
        print(f"  Task ID: {state['crawl_task_id']}")
    else:
        print("  FAILED")
        issue(state, "CRITICAL", "On-Page", "Could not submit crawl")
    state["completed"].append("crawl_submitted")
    save_progress(state)
else:
    print("[1] Crawl already submitted.")

# ---- SECTION 2: Keywords ----
if "keywords" not in state["completed"]:
    print("\n[2] Keyword Rankings...")
    serp_results = []
    comp_domains = {}

    for loc in LOCATIONS:
        print(f"\n  === {loc} ===")
        print(f"  {'Keyword':<45} {'Rank':<12} {'URL'}")
        print(f"  {'-'*45} {'-'*12} {'-'*50}")
        for kw in KEYWORDS:
            time.sleep(DELAY)
            resp = api("POST", "/v3/serp/google/organic/live/advanced", [{
                "keyword": kw, "location_name": loc, "language_name": "English",
                "device": "mobile", "os": "Android", "depth": 100,
            }])

            rank = "Not in top 100"
            ranking_url = ""
            local_pack = []

            if resp and resp.get("tasks"):
                for t in resp["tasks"]:
                    for r in (t.get("result") or []):
                        for item in (r.get("items") or []):
                            if item.get("type") == "organic":
                                d = item.get("domain", "")
                                if TARGET in d or LEGACY in d:
                                    if rank == "Not in top 100":
                                        rank = item.get("rank_absolute", "?")
                                        ranking_url = item.get("url", "")
                                else:
                                    comp_domains[d] = comp_domains.get(d, 0) + 1
                            if item.get("type") == "local_pack":
                                for lpi in (item.get("items") or []):
                                    lp_entry = {
                                        "title": lpi.get("title",""),
                                        "domain": lpi.get("domain",""),
                                        "rating": lpi.get("rating",{}).get("value") if isinstance(lpi.get("rating"),dict) else None,
                                        "reviews": lpi.get("rating",{}).get("votes_count") if isinstance(lpi.get("rating"),dict) else None,
                                    }
                                    local_pack.append(lp_entry)
                                    dd = lpi.get("domain","")
                                    if dd: comp_domains[dd] = comp_domains.get(dd, 0) + 1

            print(f"  {kw:<45} {str(rank):<12} {ranking_url[:50]}")
            if local_pack:
                for lp in local_pack[:3]:
                    print(f"    LP: {lp['title'][:35]} | {lp['domain'][:30]} | ★{lp.get('rating','?')} ({lp.get('reviews','?')})")

            serp_results.append({"keyword": kw, "location": loc, "rank": rank, "url": ranking_url, "local_pack": local_pack})

            if rank == "Not in top 100":
                issue(state, "WARNING", "Rankings", f"\"{kw}\" [{loc.split(',')[0]}]: not in top 100")
            elif isinstance(rank, int) and rank > 10:
                issue(state, "OPPORTUNITY", "Rankings", f"\"{kw}\" [{loc.split(',')[0]}]: position {rank}")

    state["raw"]["serp_results"] = serp_results
    state["raw"]["comp_domains"] = comp_domains
    state["completed"].append("keywords")
    save_progress(state)
    print(f"\n  ✓ Keywords done ({len(serp_results)} checks)")
else:
    print("[2] Keywords already done.")
    comp_domains = state["raw"].get("comp_domains", {})

# ---- SECTION 3: Backlinks ----
if "backlinks" not in state["completed"]:
    print("\n[3] Backlink Profile...")
    for label, target in [(TARGET, TARGET), (LEGACY, LEGACY)]:
        time.sleep(DELAY)
        resp = api("POST", "/v3/backlinks/summary/live", [{"target": target, "internal_list_limit": 10, "backlinks_status_type": "all"}])
        state["raw"][f"bl_summary_{label}"] = resp
        if resp and resp.get("tasks"):
            for t in resp["tasks"]:
                for r in (t.get("result") or []):
                    print(f"\n  {label}:")
                    print(f"    Backlinks: {r.get('total_backlinks',0):,} | Ref domains: {r.get('referring_domains',0):,} | Rank: {r.get('rank',0)}")
                    print(f"    Dofollow: {r.get('dofollow',0):,} | Nofollow: {r.get('nofollow',0):,}")
                    if label == TARGET:
                        if r.get('referring_domains',0) < 20:
                            issue(state, "CRITICAL", "Backlinks", f"Very low referring domains: {r.get('referring_domains',0)}")
                        if r.get('rank',0) < 10:
                            issue(state, "WARNING", "Backlinks", f"Low domain rank: {r.get('rank',0)}")
                    if label == LEGACY and r.get('total_backlinks',0) > 0:
                        issue(state, "OPPORTUNITY", "Backlinks", f"Legacy {LEGACY} has {r.get('total_backlinks',0)} backlinks — redirect to capture equity")

    time.sleep(DELAY)
    bl = api("POST", "/v3/backlinks/backlinks/live", [{"target": TARGET, "limit": 100, "order_by": ["rank,desc"], "backlinks_status_type": "live"}])
    state["raw"]["bl_list"] = bl
    if bl and bl.get("tasks"):
        for t in bl["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                print(f"\n  Top {min(20,len(items))} backlinks:")
                for i, item in enumerate(items[:20]):
                    print(f"    {i+1}. {item.get('url_from','?')[:65]} | rank:{item.get('rank',0)}")

    time.sleep(DELAY)
    rd = api("POST", "/v3/backlinks/referring_domains/live", [{"target": TARGET, "limit": 100, "order_by": ["rank,desc"]}])
    state["raw"]["bl_ref_domains"] = rd
    if rd and rd.get("tasks"):
        for t in rd["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                print(f"\n  Top {min(20,len(items))} referring domains:")
                for i, item in enumerate(items[:20]):
                    print(f"    {i+1}. {item.get('domain','?')} | rank:{item.get('rank',0)} | bl:{item.get('backlinks',0)}")

    time.sleep(DELAY)
    anc = api("POST", "/v3/backlinks/anchors/live", [{"target": TARGET, "limit": 50, "order_by": ["backlinks,desc"]}])
    state["raw"]["bl_anchors"] = anc
    if anc and anc.get("tasks"):
        for t in anc["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                print(f"\n  Top anchors:")
                for i, item in enumerate(items[:20]):
                    print(f"    {i+1}. \"{item.get('anchor','?')}\" — {item.get('backlinks',0)} bl")

    state["completed"].append("backlinks")
    save_progress(state)
    print("\n  ✓ Backlinks done")
else:
    print("[3] Backlinks already done.")

# ---- SECTION 4: Competitors ----
if "competitors" not in state["completed"]:
    print("\n[4] Competitor Analysis...")
    skip = [TARGET, LEGACY, "google.com", "yelp.com", "facebook.com", "youtube.com",
            "instagram.com", "twitter.com", "x.com", "bbb.org", "thumbtack.com",
            "homeadvisor.com", "angi.com", "angieslist.com", "nextdoor.com",
            "mapquest.com", "yellowpages.com", "manta.com", "superpages.com",
            "porch.com", "bark.com", "houzz.com"]
    top3 = []
    for d, c in sorted(comp_domains.items(), key=lambda x: x[1], reverse=True):
        if not any(s in d for s in skip):
            top3.append((d, c))
        if len(top3) >= 3: break

    print(f"\n  {'Domain':<40} {'SERPs':<8} {'Backlinks':<12} {'Ref Doms':<12} {'Rank'}")
    print(f"  {'-'*40} {'-'*8} {'-'*12} {'-'*12} {'-'*6}")
    for domain, cnt in top3:
        time.sleep(DELAY)
        resp = api("POST", "/v3/backlinks/summary/live", [{"target": domain, "internal_list_limit": 5, "backlinks_status_type": "all"}])
        state["raw"][f"comp_{domain}"] = resp
        bl = rd = rank = 0
        if resp and resp.get("tasks"):
            for t in resp["tasks"]:
                for r in (t.get("result") or []):
                    bl = r.get("total_backlinks", 0)
                    rd = r.get("referring_domains", 0)
                    rank = r.get("rank", 0)
        print(f"  {domain:<40} {cnt:<8} {bl:<12,} {rd:<12,} {rank}")

    state["raw"]["comp_top3"] = top3
    state["completed"].append("competitors")
    save_progress(state)
    print("\n  ✓ Competitors done")
else:
    print("[4] Competitors already done.")

# ---- SECTION 5: GBP ----
if "gbp" not in state["completed"]:
    print("\n[5] Google Business Profile...")
    gbp_terms = ["AJI Electrical Solutions Cornwall NY", "AJI Electrical Solutions Inc Highland Mills", "AJI Electric Cornwall NY"]
    all_gbp = []

    for kw in gbp_terms:
        print(f"\n  Searching: \"{kw}\"")
        time.sleep(DELAY)
        resp = api("POST", "/v3/business_data/google/my_business_info/task_post", [{"keyword": kw, "location_name": "United States", "language_name": "English"}])
        state["raw"][f"gbp_task_{kw.replace(' ','_')}"] = resp
        if not resp or not resp.get("tasks"):
            print("    Failed to submit")
            continue
        task_id = resp["tasks"][0].get("id")
        if not task_id:
            continue
        print(f"    Task ID: {task_id}, polling...")
        for attempt in range(20):
            time.sleep(15)
            get_resp = api("GET", f"/v3/business_data/google/my_business_info/task_get/{task_id}")
            if get_resp and get_resp.get("tasks") and get_resp["tasks"][0].get("status_code") == 20000:
                state["raw"][f"gbp_result_{kw.replace(' ','_')}"] = get_resp
                for t in get_resp["tasks"]:
                    for r in (t.get("result") or []):
                        for item in (r.get("items") or []):
                            name = item.get("title", "")
                            addr = item.get("address", "")
                            phone = item.get("phone", "")
                            cats = item.get("category", "")
                            rating = item.get("rating", {})
                            rv = rating.get("value") if isinstance(rating, dict) else rating
                            rc = rating.get("votes_count") if isinstance(rating, dict) else 0
                            web = item.get("url", "") or item.get("website", "")
                            print(f"    FOUND: {name}")
                            print(f"      Addr: {addr} | Phone: {phone}")
                            print(f"      Rating: {rv} ({rc} reviews) | Web: {web}")
                            nap_issues = []
                            clean_phone = str(phone).replace("-","").replace("(","").replace(")","").replace(" ","")
                            if phone and NAP_PHONE not in clean_phone:
                                nap_issues.append(f"Phone: {phone}")
                            if web and NAP_DOMAIN not in str(web):
                                nap_issues.append(f"Website: {web}")
                            for ni in nap_issues:
                                print(f"      ⚠ NAP: {ni}")
                                issue(state, "CRITICAL", "GBP", ni)
                            all_gbp.append({"name": name, "address": addr, "phone": phone, "rating": rv, "reviews": rc, "website": web, "nap_issues": nap_issues})
                break
            else:
                print(f"    Poll {attempt+1}...")

    if not all_gbp:
        issue(state, "CRITICAL", "GBP", "No Google Business Profile found")
    state["raw"]["gbp_all"] = all_gbp
    state["completed"].append("gbp")
    save_progress(state)
    print("\n  ✓ GBP done")
else:
    print("[5] GBP already done.")

# ---- SECTION 6: Citations ----
if "citations" not in state["completed"]:
    print("\n[6] Citations / Business Listings...")
    terms = ["AJI Electrical Solutions", "AJI Electrical Solutions Inc", "AJI Electric Cornwall NY"]
    all_cit = []
    for term in terms:
        time.sleep(DELAY)
        resp = api("POST", "/v3/business_data/business_listings/search/live", [{"keyword": term, "location_name": "United States"}])
        state["raw"][f"cit_{term.replace(' ','_')}"] = resp
        if resp and resp.get("tasks"):
            for t in resp["tasks"]:
                for r in (t.get("result") or []):
                    items = r.get("items") or []
                    print(f"  \"{term}\": {len(items)} listings")
                    for item in items[:10]:
                        name = item.get("title", "")
                        addr = item.get("address", "")
                        phone = item.get("phone", "")
                        web = item.get("url", "") or item.get("website", "")
                        platform = item.get("type", "?")
                        print(f"    [{platform}] {name} | {phone} | {web[:40]}")
                        all_cit.append({"term": term, "platform": platform, "name": name, "phone": phone, "website": web})
    state["raw"]["cit_all"] = all_cit
    state["completed"].append("citations")
    save_progress(state)
    print("\n  ✓ Citations done")
else:
    print("[6] Citations already done.")

# ---- SECTION 7: Collect crawl ----
if "crawl_collected" not in state["completed"]:
    print("\n[7] Collecting crawl results...")
    task_id = state.get("crawl_task_id")
    if not task_id:
        print("  No crawl task ID — skipping")
    else:
        for attempt in range(40):
            time.sleep(15)
            resp = api("GET", f"/v3/on_page/summary/{task_id}")
            if not resp or not resp.get("tasks"):
                print(f"  Poll {attempt+1}: no response...")
                continue
            result = resp["tasks"][0].get("result", [{}])
            if isinstance(result, list) and result:
                result = result[0]
            cs = result.get("crawl_status", {}) if isinstance(result, dict) else {}
            status = cs.get("status", "unknown") if isinstance(cs, dict) else "unknown"
            pages = cs.get("pages_crawled", 0) if isinstance(cs, dict) else 0
            print(f"  Poll {attempt+1}: status={status}, pages={pages}")
            sys.stdout.flush()
            if status == "finished":
                state["raw"]["crawl_summary"] = resp
                break
        else:
            print("  Crawl timed out")
            issue(state, "CRITICAL", "On-Page", "Crawl timed out")
            state["completed"].append("crawl_collected")
            save_progress(state)
            # still continue to generate report

        if "crawl_summary" in state["raw"]:
            summary = state["raw"]["crawl_summary"]["tasks"][0]["result"][0] if state["raw"]["crawl_summary"]["tasks"][0].get("result") else {}
            pm = summary.get("page_metrics", {})
            checks = pm.get("checks", {})
            print(f"\n  --- Crawl Health ---")
            if isinstance(checks, dict):
                for k, v in checks.items():
                    if v and v > 0:
                        print(f"    {k}: {v}")

            time.sleep(DELAY)
            pages_resp = api("POST", "/v3/on_page/pages", [{"id": task_id, "limit": 150, "order_by": ["meta.internal_links_count,desc"]}])
            state["raw"]["crawl_pages"] = pages_resp
            page_list = []
            if pages_resp and pages_resp.get("tasks"):
                for t in pages_resp["tasks"]:
                    for r in (t.get("result") or []):
                        page_list.extend(r.get("items") or [])
            print(f"\n  Pages retrieved: {len(page_list)}")
            for p in page_list:
                url = p.get("url", "?")
                sc = p.get("status_code", 0)
                meta = p.get("meta", {}) or {}
                title = meta.get("title", "")
                desc = meta.get("description", "")
                h1s = meta.get("htags", {}).get("h1") if meta.get("htags") else None
                wc = (meta.get("content", {}) or {}).get("plain_text_word_count", 0) or 0
                lt = (p.get("page_timing", {}) or {}).get("duration_time", 0) or 0
                noalt = p.get("images_without_alt_count") or 0

                if sc == 404: issue(state, "CRITICAL", "On-Page", f"404: {url}")
                if sc >= 500: issue(state, "CRITICAL", "On-Page", f"Server error {sc}: {url}")
                if not title: issue(state, "CRITICAL", "On-Page", f"Missing title: {url}")
                if not desc: issue(state, "WARNING", "On-Page", f"Missing meta description: {url}")
                if not h1s: issue(state, "WARNING", "On-Page", f"Missing H1: {url}")
                elif isinstance(h1s, list) and len(h1s) > 1: issue(state, "WARNING", "On-Page", f"Multiple H1s ({len(h1s)}): {url}")
                if wc < 200 and sc == 200: issue(state, "WARNING", "On-Page", f"Thin content ({wc} words): {url}")
                if lt > 3: issue(state, "WARNING", "On-Page", f"Slow load ({lt:.1f}s): {url}")
                if noalt > 0: issue(state, "WARNING", "On-Page", f"{noalt} imgs without alt: {url}")

                print(f"  {sc} | {url}")
                print(f"       T: {(title or 'MISSING')[:70]} | D: {(desc or 'MISSING')[:50]}")
                print(f"       H1: {h1s if h1s else 'MISSING'} | Words: {wc} | Load: {lt:.1f}s | NoAlt: {noalt}")

            time.sleep(DELAY)
            for tag_type in ["duplicate_title", "duplicate_description"]:
                dup = api("POST", "/v3/on_page/duplicate_tags", [{"id": task_id, "type": tag_type, "limit": 50}])
                state["raw"][f"crawl_{tag_type}"] = dup
                if dup and dup.get("tasks"):
                    for t in dup["tasks"]:
                        for r in (t.get("result") or []):
                            for item in (r.get("items") or []):
                                val = item.get("title") or item.get("description") or "?"
                                pgs = item.get("pages") or []
                                print(f"  Dup {tag_type}: \"{val[:50]}\" on {len(pgs)} pages")
                                issue(state, "WARNING", "On-Page", f"Dup {tag_type.replace('duplicate_','')}: \"{val[:40]}\" ({len(pgs)} pages)")
                time.sleep(DELAY)

            broken = api("POST", "/v3/on_page/links", [{"id": task_id, "limit": 150, "filters": ["status_code", "=", 404]}])
            state["raw"]["crawl_broken_links"] = broken
            if broken and broken.get("tasks"):
                for t in broken["tasks"]:
                    for r in (t.get("result") or []):
                        for item in (r.get("items") or [])[:20]:
                            print(f"  Broken: {item.get('url','?')} from {item.get('page_from','?')}")
                            issue(state, "CRITICAL", "On-Page", f"Broken link: {item.get('url','?')}")
            time.sleep(DELAY)

            noindex = api("POST", "/v3/on_page/non_indexable", [{"id": task_id, "limit": 50}])
            state["raw"]["crawl_noindex"] = noindex
            if noindex and noindex.get("tasks"):
                for t in noindex["tasks"]:
                    for r in (t.get("result") or []):
                        for item in (r.get("items") or []):
                            print(f"  Non-indexable: {item.get('url','?')} — {item.get('reason','?')}")

            state["raw"]["pages_crawled_count"] = len(page_list)

        state["completed"].append("crawl_collected")
        save_progress(state)
        print("\n  ✓ Crawl collection done")
else:
    print("[7] Crawl already collected.")

# ---- GENERATE FINAL REPORTS ----
print("\n" + "=" * 70)
print("GENERATING FINAL REPORTS")
print("=" * 70)

lines = []
def out(msg):
    lines.append(msg)
    print(msg)

out(f"SEO AUDIT REPORT: {TARGET}")
out(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
out(f"{'='*70}\n")

# Summary
out("ISSUE SUMMARY")
out("-" * 40)
for sev in ["CRITICAL", "WARNING", "OPPORTUNITY"]:
    items = state["issues"][sev]
    out(f"\n{sev}: {len(items)} issues")
    for i, item in enumerate(items):
        out(f"  {i+1}. {item}")

out(f"\n\nTOP 10 PRIORITY ACTIONS")
out("-" * 40)
all_actions = [(s, i) for s in ["CRITICAL","WARNING","OPPORTUNITY"] for i in state["issues"][s]]
for i, (sev, action) in enumerate(all_actions[:10]):
    out(f"  {i+1}. [{sev}] {action}")

pc = state["raw"].get("pages_crawled_count", 0)
kc = len(KEYWORDS) * len(LOCATIONS)
nc = len(state["issues"]["CRITICAL"])
nw = len(state["issues"]["WARNING"])
no = len(state["issues"]["OPPORTUNITY"])

out(f"\n{'='*70}")
out(f"Pages crawled: {pc} | Keywords checked: {kc} | CRITICAL: {nc} | WARNING: {nw} | OPPORTUNITY: {no}")

with open("audit_report.txt", "w") as f:
    f.write("\n".join(lines))
print("\n✓ Saved audit_report.txt")

with open("audit_data.json", "w") as f:
    json.dump(state["raw"], f, indent=2, default=str)
print("✓ Saved audit_data.json")

print(f"\nDONE | Pages: {pc} | Keywords: {kc} | CRITICAL: {nc} | WARNING: {nw} | OPPORTUNITY: {no}")
