#!/usr/bin/env python3
import os
import sys
import json
import time
import base64
import urllib.request
import urllib.error
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
CANONICAL_NAME = "AJI Electrical Solutions, Inc."
CANONICAL_PHONE = "845-270-9950"
CANONICAL_DOMAIN = "ajielectricalsolutionsinc.com"
DELAY = 1.0

KEYWORDS = [
    "electrician near me",
    "electrician cornwall ny",
    "electrician bergen county nj",
    "electrician highland mills ny",
    "electrician westchester county ny",
    "electrical contractor near me",
    "emergency electrician near me",
    "electrical panel upgrade near me",
    "generator installation near me",
    "ev charger installation near me",
    "residential electrician near me",
    "commercial electrician near me",
    "electrician franklin lakes nj",
    "electrician ridgewood nj",
    "electrician mahwah nj",
    "electrician newburgh ny",
    "electrician monroe ny",
]

LOCATIONS = [
    "Cornwall,New York,United States",
    "Paramus,New Jersey,United States",
]

all_raw = {}
issues = {"CRITICAL": [], "WARNING": [], "OPPORTUNITY": []}
report_lines = []


def log(msg):
    print(msg)
    report_lines.append(msg)


def api_call(method, endpoint, body=None):
    url = BASE + endpoint
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Basic {AUTH}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode() if e.fp else ""
        log(f"  [API ERROR] {e.code} on {endpoint}: {err_body[:300]}")
        return None
    except Exception as e:
        log(f"  [API ERROR] {endpoint}: {e}")
        return None


def add_issue(severity, section, msg):
    issues[severity].append(f"[{section}] {msg}")


def section_header(title):
    sep = "=" * 70
    log(f"\n{sep}")
    log(f"  {title}")
    log(sep)


def run_keyword_rankings():
    section_header("2. KEYWORD RANKINGS")

    results = []
    competitor_domains = {}

    for location in LOCATIONS:
        log(f"\n  Location: {location}")
        log(f"  {'Keyword':<45} {'Rank':<8} {'URL'}")
        log(f"  {'-'*45} {'-'*8} {'-'*50}")

        for kw in KEYWORDS:
            time.sleep(DELAY)
            resp = api_call("POST", "/v3/serp/google/organic/live/advanced", [{
                "keyword": kw,
                "location_name": location,
                "language_name": "English",
                "device": "mobile",
                "os": "Android",
                "depth": 100,
            }])
            key = f"serp_{kw}_{location}".replace(" ", "_").replace(",", "")
            all_raw[key] = resp

            rank = "Not in top 100"
            ranking_url = ""
            local_pack = []

            if resp and resp.get("tasks"):
                for t in resp["tasks"]:
                    for r in (t.get("result") or []):
                        for item in (r.get("items") or []):
                            item_type = item.get("type", "")
                            if item_type == "organic":
                                domain = item.get("domain", "")
                                if TARGET in domain or LEGACY_DOMAIN in domain:
                                    if rank == "Not in top 100":
                                        rank = item.get("rank_absolute", "?")
                                        ranking_url = item.get("url", "")
                                else:
                                    competitor_domains[domain] = competitor_domains.get(domain, 0) + 1

                            if item_type == "local_pack":
                                lp_items = item.get("items") or []
                                for lpi in lp_items:
                                    local_pack.append({
                                        "title": lpi.get("title", ""),
                                        "domain": lpi.get("domain", ""),
                                        "rating": lpi.get("rating", {}).get("value") if lpi.get("rating") else None,
                                        "reviews": lpi.get("rating", {}).get("votes_count") if lpi.get("rating") else None,
                                    })
                                    d = lpi.get("domain", "")
                                    if d:
                                        competitor_domains[d] = competitor_domains.get(d, 0) + 1

            log(f"  {kw:<45} {str(rank):<8} {ranking_url[:50]}")
            if local_pack:
                log(f"    Local Pack:")
                for lp in local_pack[:5]:
                    log(f"      {lp['title']} | {lp['domain']} | ★{lp.get('rating', 'N/A')} ({lp.get('reviews', 'N/A')} reviews)")

            results.append({
                "keyword": kw,
                "location": location,
                "rank": rank,
                "url": ranking_url,
                "local_pack": local_pack,
            })

            if rank == "Not in top 100":
                add_issue("WARNING", "Rankings", f"\"{kw}\" [{location.split(',')[0]}]: not ranking in top 100")
            elif isinstance(rank, int) and rank > 10:
                add_issue("OPPORTUNITY", "Rankings", f"\"{kw}\" [{location.split(',')[0]}]: position {rank} — push to page 1")

    all_raw["keyword_results_summary"] = results
    return results, competitor_domains


def run_backlinks():
    section_header("3. BACKLINK PROFILE")

    log(f"\n  --- {TARGET} ---")
    summary_resp = api_call("POST", "/v3/backlinks/summary/live", [{
        "target": TARGET,
        "internal_list_limit": 10,
        "backlinks_status_type": "all",
    }])
    all_raw["backlinks_summary"] = summary_resp
    time.sleep(DELAY)

    bl_summary = {}
    if summary_resp and summary_resp.get("tasks"):
        for t in summary_resp["tasks"]:
            for r in (t.get("result") or []):
                bl_summary = r
                log(f"  Total backlinks: {r.get('total_backlinks', 0):,}")
                log(f"  Referring domains: {r.get('referring_domains', 0):,}")
                log(f"  Domain rank: {r.get('rank', 0)}")
                log(f"  Dofollow: {r.get('dofollow', 0):,}")
                log(f"  Nofollow: {r.get('nofollow', 0):,}")
                log(f"  Referring IPs: {r.get('referring_ips', 0):,}")
                log(f"  Referring subnets: {r.get('referring_subnets', 0):,}")
                if r.get('referring_domains', 0) < 20:
                    add_issue("CRITICAL", "Backlinks", f"Very low referring domains: {r.get('referring_domains', 0)}")
                if r.get('rank', 0) < 10:
                    add_issue("WARNING", "Backlinks", f"Low domain rank: {r.get('rank', 0)}")

    log("\n  Fetching top backlinks...")
    bl_resp = api_call("POST", "/v3/backlinks/backlinks/live", [{
        "target": TARGET,
        "limit": 100,
        "order_by": ["rank,desc"],
        "backlinks_status_type": "live",
    }])
    all_raw["backlinks_list"] = bl_resp
    time.sleep(DELAY)

    if bl_resp and bl_resp.get("tasks"):
        for t in bl_resp["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                log(f"\n  Top backlinks ({len(items)} total):")
                for i, item in enumerate(items[:20]):
                    log(f"    {i+1}. {item.get('url_from', '?')[:70]}")
                    log(f"       → {item.get('url_to', '?')[:70]} | rank: {item.get('rank', 0)} | {item.get('dofollow', 'N/A')}")

    log("\n  Fetching referring domains...")
    rd_resp = api_call("POST", "/v3/backlinks/referring_domains/live", [{
        "target": TARGET,
        "limit": 100,
        "order_by": ["rank,desc"],
    }])
    all_raw["backlinks_referring_domains"] = rd_resp
    time.sleep(DELAY)

    if rd_resp and rd_resp.get("tasks"):
        for t in rd_resp["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                log(f"\n  Top referring domains ({len(items)} total):")
                for i, item in enumerate(items[:20]):
                    log(f"    {i+1}. {item.get('domain', '?')} | rank: {item.get('rank', 0)} | backlinks: {item.get('backlinks', 0)}")

    log("\n  Fetching anchor texts...")
    anc_resp = api_call("POST", "/v3/backlinks/anchors/live", [{
        "target": TARGET,
        "limit": 50,
        "order_by": ["backlinks,desc"],
    }])
    all_raw["backlinks_anchors"] = anc_resp
    time.sleep(DELAY)

    if anc_resp and anc_resp.get("tasks"):
        for t in anc_resp["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                log(f"\n  Top anchor texts ({len(items)} total):")
                for i, item in enumerate(items[:20]):
                    log(f"    {i+1}. \"{item.get('anchor', '?')}\" — {item.get('backlinks', 0)} backlinks")

    log(f"\n  --- Legacy domain: {LEGACY_DOMAIN} ---")
    legacy_resp = api_call("POST", "/v3/backlinks/summary/live", [{
        "target": LEGACY_DOMAIN,
        "internal_list_limit": 10,
        "backlinks_status_type": "all",
    }])
    all_raw["backlinks_legacy"] = legacy_resp
    time.sleep(DELAY)

    if legacy_resp and legacy_resp.get("tasks"):
        for t in legacy_resp["tasks"]:
            for r in (t.get("result") or []):
                log(f"  Legacy backlinks: {r.get('total_backlinks', 0):,}")
                log(f"  Legacy referring domains: {r.get('referring_domains', 0):,}")
                log(f"  Legacy domain rank: {r.get('rank', 0)}")
                if r.get('total_backlinks', 0) > 0:
                    add_issue("OPPORTUNITY", "Backlinks", f"Legacy domain {LEGACY_DOMAIN} has {r.get('total_backlinks', 0)} backlinks — consider 301 redirect to capture equity")

    return bl_summary


def run_competitors(competitor_domains, serp_results):
    section_header("4. COMPETITOR ANALYSIS")

    sorted_comps = sorted(competitor_domains.items(), key=lambda x: x[1], reverse=True)

    skip_domains = [TARGET, LEGACY_DOMAIN, "google.com", "yelp.com", "facebook.com",
                    "youtube.com", "instagram.com", "twitter.com", "x.com",
                    "bbb.org", "thumbtack.com", "homeadvisor.com", "angi.com",
                    "angieslist.com", "nextdoor.com", "mapquest.com", "yellowpages.com"]

    top_competitors = []
    for domain, count in sorted_comps:
        if not any(skip in domain for skip in skip_domains):
            top_competitors.append((domain, count))
        if len(top_competitors) >= 3:
            break

    log(f"\n  Top 3 competitors by SERP frequency:")
    comp_data = []

    for domain, serp_count in top_competitors:
        log(f"\n  --- {domain} (appeared in {serp_count} SERPs) ---")
        time.sleep(DELAY)

        comp_resp = api_call("POST", "/v3/backlinks/summary/live", [{
            "target": domain,
            "internal_list_limit": 5,
            "backlinks_status_type": "all",
        }])
        all_raw[f"competitor_{domain}"] = comp_resp

        comp_info = {"domain": domain, "serp_appearances": serp_count}
        if comp_resp and comp_resp.get("tasks"):
            for t in comp_resp["tasks"]:
                for r in (t.get("result") or []):
                    comp_info["backlinks"] = r.get("total_backlinks", 0)
                    comp_info["referring_domains"] = r.get("referring_domains", 0)
                    comp_info["domain_rank"] = r.get("rank", 0)
                    log(f"  Backlinks: {r.get('total_backlinks', 0):,}")
                    log(f"  Referring domains: {r.get('referring_domains', 0):,}")
                    log(f"  Domain rank: {r.get('rank', 0)}")

        top10_count = 0
        for sr in serp_results:
            if isinstance(sr.get("rank"), int) and sr["rank"] <= 10:
                pass

        comp_data.append(comp_info)

    log(f"\n  --- Competitor Comparison Table ---")
    log(f"  {'Domain':<35} {'Backlinks':<12} {'Ref Domains':<14} {'Rank':<8} {'SERPs'}")
    log(f"  {'-'*35} {'-'*12} {'-'*14} {'-'*8} {'-'*6}")
    log(f"  {TARGET:<35} {comp_data[0].get('backlinks', 'N/A') if not comp_data else 'see §3':<12} {'see §3':<14} {'see §3':<8} {'—'}")
    for c in comp_data:
        log(f"  {c['domain']:<35} {c.get('backlinks', 0):<12,} {c.get('referring_domains', 0):<14,} {c.get('domain_rank', 0):<8} {c['serp_appearances']}")

    return comp_data


def run_gbp():
    section_header("5. GOOGLE BUSINESS PROFILE LOOKUP")

    gbp_keywords = [
        "AJI Electrical Solutions Cornwall NY",
        "AJI Electrical Solutions Inc Highland Mills",
        "AJI Electric Cornwall NY",
    ]

    all_gbp = []

    for kw in gbp_keywords:
        log(f"\n  Searching: \"{kw}\"")
        time.sleep(DELAY)

        resp = api_call("POST", "/v3/business_data/google/my_business_info/task_post", [{
            "keyword": kw,
            "location_name": "United States",
            "language_name": "English",
        }])
        key = f"gbp_task_{kw.replace(' ', '_')}"
        all_raw[key] = resp

        if not resp or not resp.get("tasks"):
            log("    Failed to submit GBP task.")
            continue

        task_id = resp["tasks"][0].get("id")
        if not task_id:
            log("    No task_id returned.")
            continue

        log(f"    Task ID: {task_id}, polling...")
        gbp_result = None
        for attempt in range(20):
            time.sleep(15)
            get_resp = api_call("GET", f"/v3/business_data/google/my_business_info/task_get/{task_id}")
            if get_resp and get_resp.get("tasks"):
                task = get_resp["tasks"][0]
                if task.get("status_code") == 20000:
                    gbp_result = get_resp
                    all_raw[f"gbp_result_{kw.replace(' ', '_')}"] = get_resp
                    log(f"    Ready after {attempt+1} polls.")
                    break
                else:
                    log(f"    Poll {attempt+1}: status {task.get('status_code')}...")
        else:
            log("    GBP lookup timed out.")
            continue

        if gbp_result and gbp_result.get("tasks"):
            for t in gbp_result["tasks"]:
                for r in (t.get("result") or []):
                    items = r.get("items") or []
                    for item in items:
                        name = item.get("title", "")
                        address = item.get("address", "")
                        phone = item.get("phone", "")
                        categories = item.get("category", "")
                        rating = item.get("rating", {})
                        rating_val = rating.get("value") if isinstance(rating, dict) else rating
                        review_count = rating.get("votes_count") if isinstance(rating, dict) else 0
                        website = item.get("url", "") or item.get("website", "")

                        log(f"\n    LISTING FOUND:")
                        log(f"      Name: {name}")
                        log(f"      Address: {address}")
                        log(f"      Phone: {phone}")
                        log(f"      Categories: {categories}")
                        log(f"      Rating: {rating_val} ({review_count} reviews)")
                        log(f"      Website: {website}")

                        nap_issues = []
                        if phone and CANONICAL_PHONE not in str(phone).replace("-", "").replace("(", "").replace(")", "").replace(" ", ""):
                            nap_issues.append(f"Phone mismatch: {phone} vs {CANONICAL_PHONE}")
                        if website and CANONICAL_DOMAIN not in str(website):
                            nap_issues.append(f"Website mismatch: {website} vs {CANONICAL_DOMAIN}")

                        if nap_issues:
                            for ni in nap_issues:
                                log(f"      ⚠ NAP ISSUE: {ni}")
                                add_issue("CRITICAL", "GBP", ni)

                        all_gbp.append({
                            "search_term": kw,
                            "name": name,
                            "address": address,
                            "phone": phone,
                            "categories": categories,
                            "rating": rating_val,
                            "reviews": review_count,
                            "website": website,
                            "nap_issues": nap_issues,
                        })

    if not all_gbp:
        add_issue("CRITICAL", "GBP", "No Google Business Profile listings found")

    all_raw["gbp_all_listings"] = all_gbp
    return all_gbp


def run_citations():
    section_header("6. CITATION / BUSINESS LISTING SCAN")

    search_terms = [
        "AJI Electrical Solutions",
        "AJI Electrical Solutions Inc",
        "AJI Electric Cornwall NY",
    ]

    all_citations = []

    for term in search_terms:
        log(f"\n  Searching: \"{term}\"")
        time.sleep(DELAY)

        resp = api_call("POST", "/v3/business_data/business_listings/search/live", [{
            "keyword": term,
            "location_name": "United States",
        }])
        key = f"citations_{term.replace(' ', '_')}"
        all_raw[key] = resp

        if resp and resp.get("tasks"):
            for t in resp["tasks"]:
                for r in (t.get("result") or []):
                    items = r.get("items") or []
                    log(f"  Found {len(items)} listings for \"{term}\"")
                    for item in items:
                        platform = item.get("type", "unknown")
                        name = item.get("title", "")
                        address = item.get("address", "")
                        phone = item.get("phone", "")
                        website = item.get("url", "") or item.get("website", "")

                        log(f"    [{platform}] {name}")
                        log(f"      Address: {address} | Phone: {phone}")
                        log(f"      Website: {website}")

                        nap_issues = []
                        if phone and CANONICAL_PHONE not in str(phone).replace("-", "").replace("(", "").replace(")", "").replace(" ", ""):
                            nap_issues.append(f"Phone: {phone}")
                        if website and CANONICAL_DOMAIN not in str(website):
                            nap_issues.append(f"Website: {website}")

                        if nap_issues:
                            for ni in nap_issues:
                                log(f"      ⚠ NAP inconsistency: {ni}")
                                add_issue("WARNING", "Citations", f"NAP inconsistency on {platform}: {ni}")

                        all_citations.append({
                            "search_term": term,
                            "platform": platform,
                            "name": name,
                            "address": address,
                            "phone": phone,
                            "website": website,
                            "nap_issues": nap_issues,
                        })

    if not all_citations:
        add_issue("WARNING", "Citations", "No business listings found in DataForSEO directory data")

    all_raw["citations_all"] = all_citations
    return all_citations


def submit_crawl():
    section_header("1. ON-PAGE CRAWL — Submitting")

    log("  Submitting crawl task...")
    resp = api_call("POST", "/v3/on_page/task_post", [{
        "target": TARGET,
        "max_crawl_pages": 150,
        "load_resources": True,
        "enable_javascript": True,
        "enable_browser_rendering": True,
    }])
    all_raw["on_page_task_post"] = resp
    if not resp or not resp.get("tasks"):
        log("  FAILED to submit crawl task.")
        add_issue("CRITICAL", "On-Page", "Could not submit crawl task")
        return None

    task_id = resp["tasks"][0].get("id")
    log(f"  Task ID: {task_id}")
    log("  Crawl submitted — running other sections while it finishes...\n")
    return task_id


def collect_crawl(task_id):
    section_header("1. ON-PAGE CRAWL — Results")

    if not task_id:
        log("  No task_id — skipping crawl results.")
        return {"pages_crawled": 0}

    log(f"  Polling crawl task {task_id}...")
    summary_resp = None
    for attempt in range(40):
        time.sleep(15)
        summary_resp = api_call("GET", f"/v3/on_page/summary/{task_id}")
        if not summary_resp or not summary_resp.get("tasks"):
            log(f"  Poll {attempt+1}: no response...")
            continue
        task = summary_resp["tasks"][0]
        result = task.get("result", [{}])
        if result:
            result = result[0] if isinstance(result, list) else result
        crawl_status = result.get("crawl_status", {}) if isinstance(result, dict) else {}
        status = crawl_status.get("status", "unknown") if isinstance(crawl_status, dict) else "unknown"
        pages_crawled = crawl_status.get("pages_crawled", 0) if isinstance(crawl_status, dict) else 0
        log(f"  Poll {attempt+1}: status={status}, pages={pages_crawled}")
        sys.stdout.flush()
        if status == "finished":
            all_raw["on_page_summary"] = summary_resp
            break
    else:
        log("  Crawl timed out after 10 minutes.")
        add_issue("CRITICAL", "On-Page", "Crawl timed out")
        return {"pages_crawled": 0}

    summary = {}
    if summary_resp and summary_resp.get("tasks"):
        res = summary_resp["tasks"][0].get("result", [{}])
        if isinstance(res, list) and res:
            summary = res[0]

    page_metrics = summary.get("page_metrics", {})
    log(f"\n  --- Crawl Summary ---")
    checks = page_metrics.get("checks", {})
    if isinstance(checks, dict):
        for check_name, count in checks.items():
            if count and count > 0:
                log(f"    {check_name}: {count}")

    time.sleep(DELAY)

    log("\n  Fetching all pages...")
    pages_resp = api_call("POST", "/v3/on_page/pages", [{
        "id": task_id,
        "limit": 150,
        "order_by": ["meta.internal_links_count,desc"],
    }])
    all_raw["on_page_pages"] = pages_resp
    time.sleep(DELAY)

    pages = []
    if pages_resp and pages_resp.get("tasks"):
        for t in pages_resp["tasks"]:
            for r in (t.get("result") or []):
                pages.extend(r.get("items") or [])

    log(f"  Total pages retrieved: {len(pages)}")

    for p in pages:
        url = p.get("url", "?")
        status_code = p.get("status_code", 0)
        meta = p.get("meta", {}) or {}
        title = meta.get("title", "")
        description = meta.get("description", "")
        h1_tags = meta.get("htags", {}).get("h1") if meta.get("htags") else None
        content_info = meta.get("content", {}) or {}
        word_count = content_info.get("plain_text_word_count", 0) or 0
        page_timing = p.get("page_timing", {}) or {}
        load_time = page_timing.get("duration_time", 0) or 0
        internal_links = p.get("internal_links_count", 0) or 0
        external_links = p.get("external_links_count", 0) or 0
        images_without_alt = p.get("images_without_alt_count") or 0

        if status_code == 404:
            add_issue("CRITICAL", "On-Page", f"404 error: {url}")
        if status_code >= 500:
            add_issue("CRITICAL", "On-Page", f"Server error {status_code}: {url}")
        if not title:
            add_issue("CRITICAL", "On-Page", f"Missing title tag: {url}")
        if not description:
            add_issue("WARNING", "On-Page", f"Missing meta description: {url}")
        if not h1_tags:
            add_issue("WARNING", "On-Page", f"Missing H1: {url}")
        elif isinstance(h1_tags, list) and len(h1_tags) > 1:
            add_issue("WARNING", "On-Page", f"Multiple H1 tags ({len(h1_tags)}): {url}")
        if word_count < 200 and status_code == 200:
            add_issue("WARNING", "On-Page", f"Thin content ({word_count} words): {url}")
        if load_time > 3:
            add_issue("WARNING", "On-Page", f"Slow load ({load_time:.1f}s): {url}")
        if images_without_alt > 0:
            add_issue("WARNING", "On-Page", f"{images_without_alt} images without alt text: {url}")

        log(f"  {status_code} | {url}")
        log(f"       Title: {(title or 'MISSING')[:80]}")
        log(f"       Desc: {(description or 'MISSING')[:80]}")
        log(f"       H1: {h1_tags if h1_tags else 'MISSING'}")
        log(f"       Words: {word_count} | Load: {load_time:.1f}s | Int links: {internal_links} | Ext links: {external_links}")
        if images_without_alt:
            log(f"       Images without alt: {images_without_alt}")

    log("\n  Fetching duplicate tags...")
    for tag_type in ["duplicate_title", "duplicate_description"]:
        dup_resp = api_call("POST", "/v3/on_page/duplicate_tags", [{
            "id": task_id,
            "type": tag_type,
            "limit": 50,
        }])
        all_raw[f"on_page_{tag_type}"] = dup_resp
        time.sleep(DELAY)

        if dup_resp and dup_resp.get("tasks"):
            for t in dup_resp["tasks"]:
                for r in (t.get("result") or []):
                    items = r.get("items") or []
                    if items:
                        log(f"\n  {tag_type}: {len(items)} groups found")
                        for item in items:
                            tag_val = item.get("title") or item.get("description") or "N/A"
                            pages_list = item.get("pages") or []
                            log(f"    \"{tag_val[:60]}\" — on {len(pages_list)} pages")
                            for pg in pages_list[:5]:
                                log(f"      - {pg.get('url', '?')}")
                            add_issue("WARNING", "On-Page", f"Duplicate {tag_type.replace('duplicate_', '')}: \"{tag_val[:50]}\" on {len(pages_list)} pages")

    log("\n  Fetching broken links...")
    links_resp = api_call("POST", "/v3/on_page/links", [{
        "id": task_id,
        "limit": 150,
        "filters": ["status_code", "=", 404],
    }])
    all_raw["on_page_broken_links"] = links_resp
    time.sleep(DELAY)

    if links_resp and links_resp.get("tasks"):
        for t in links_resp["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                if items:
                    log(f"  Broken links (404): {len(items)}")
                    for item in items[:20]:
                        log(f"    {item.get('url', '?')} → from {item.get('page_from', '?')}")
                        add_issue("CRITICAL", "On-Page", f"Broken link: {item.get('url', '?')}")

    log("\n  Fetching redirect chains...")
    redir_resp = api_call("POST", "/v3/on_page/links", [{
        "id": task_id,
        "limit": 100,
        "filters": ["is_redirect", "=", True],
    }])
    all_raw["on_page_redirects"] = redir_resp
    time.sleep(DELAY)

    if redir_resp and redir_resp.get("tasks"):
        for t in redir_resp["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                if items:
                    log(f"  Redirect chains: {len(items)}")
                    for item in items[:15]:
                        log(f"    {item.get('url', '?')} ({item.get('status_code', '?')})")
                        add_issue("WARNING", "On-Page", f"Redirect chain: {item.get('url', '?')}")

    log("\n  Fetching non-indexable pages...")
    noindex_resp = api_call("POST", "/v3/on_page/non_indexable", [{
        "id": task_id,
        "limit": 50,
    }])
    all_raw["on_page_non_indexable"] = noindex_resp
    time.sleep(DELAY)

    if noindex_resp and noindex_resp.get("tasks"):
        for t in noindex_resp["tasks"]:
            for r in (t.get("result") or []):
                items = r.get("items") or []
                if items:
                    log(f"  Non-indexable pages: {len(items)}")
                    for item in items:
                        reason = item.get("reason", "unknown")
                        url = item.get("url", "?")
                        log(f"    {url} — {reason}")

    return {"pages_crawled": len(pages), "summary": summary}


def main():
    start = datetime.now()
    log(f"SEO AUDIT: {TARGET}")
    log(f"Date: {start.strftime('%Y-%m-%d %H:%M:%S')}")
    log(f"{'=' * 70}")

    crawl_task_id = submit_crawl()

    serp_results, competitor_domains = run_keyword_rankings()
    bl_data = run_backlinks()
    comp_data = run_competitors(competitor_domains, serp_results)
    gbp_data = run_gbp()
    citation_data = run_citations()

    crawl_data = collect_crawl(crawl_task_id)

    section_header("ISSUE SUMMARY")

    for severity in ["CRITICAL", "WARNING", "OPPORTUNITY"]:
        items = issues[severity]
        log(f"\n  {severity}: {len(items)} issues")
        for i, item in enumerate(items):
            log(f"    {i+1}. {item}")

    total_critical = len(issues["CRITICAL"])
    total_warnings = len(issues["WARNING"])
    total_opportunities = len(issues["OPPORTUNITY"])

    section_header("TOP 10 PRIORITY ACTIONS")

    all_actions = []
    for item in issues["CRITICAL"]:
        all_actions.append(("CRITICAL", item))
    for item in issues["WARNING"]:
        all_actions.append(("WARNING", item))
    for item in issues["OPPORTUNITY"]:
        all_actions.append(("OPPORTUNITY", item))

    for i, (sev, action) in enumerate(all_actions[:10]):
        log(f"  {i+1}. [{sev}] {action}")

    pages_crawled = crawl_data.get("pages_crawled", 0) if isinstance(crawl_data, dict) else 0
    keywords_checked = len(KEYWORDS) * len(LOCATIONS)

    elapsed = (datetime.now() - start).total_seconds()
    summary_line = (
        f"\nDONE in {elapsed:.0f}s | "
        f"Pages crawled: {pages_crawled} | "
        f"Keywords checked: {keywords_checked} | "
        f"CRITICAL: {total_critical} | "
        f"WARNING: {total_warnings} | "
        f"OPPORTUNITY: {total_opportunities}"
    )
    log(summary_line)

    with open("audit_report.txt", "w") as f:
        f.write("\n".join(report_lines))
    print("\n✓ Saved audit_report.txt")

    with open("audit_data.json", "w") as f:
        json.dump(all_raw, f, indent=2, default=str)
    print("✓ Saved audit_data.json")


if __name__ == "__main__":
    main()
