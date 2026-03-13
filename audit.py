#!/usr/bin/env python3
"""Quick SEO audit for ajielectricalsolutionsinc.com via DataForSEO On-Page API."""
import os, json, time, base64, urllib.request, urllib.error, sys
from datetime import datetime

LOGIN = os.environ.get("DATAFORSEO_LOGIN", "")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD", "")
if not LOGIN or not PASSWORD:
    LOGIN = os.environ.get("DataForSEO_Username", "")
    PASSWORD = os.environ.get("DataForSEO_API_Password", "")

AUTH = base64.b64encode(f"{LOGIN}:{PASSWORD}".encode()).decode()
BASE = "https://api.dataforseo.com"
TARGET = "ajielectricalsolutionsinc.com"

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

print(f"SEO Audit: {TARGET}")
print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
print("=" * 60)

# Submit crawl
print("\nSubmitting crawl...")
resp = api("POST", "/v3/on_page/task_post", [{
    "target": TARGET, "max_crawl_pages": 100,
    "load_resources": True, "enable_javascript": True, "enable_browser_rendering": True,
}])
if not resp or not resp.get("tasks"):
    print("FAILED to submit crawl. Exiting.")
    sys.exit(1)

task_id = resp["tasks"][0].get("id")
print(f"Task ID: {task_id}")
print("Waiting for crawl to finish (this takes a few minutes)...")

for i in range(50):
    time.sleep(20)
    r = api("GET", f"/v3/on_page/summary/{task_id}")
    if r and r.get("tasks"):
        res = r["tasks"][0].get("result", [{}])
        res = res[0] if isinstance(res, list) and res else {}
        cs = res.get("crawl_status", {}) if isinstance(res, dict) else {}
        st = cs.get("status", "?") if isinstance(cs, dict) else "?"
        pg = cs.get("pages_crawled", 0) if isinstance(cs, dict) else 0
        print(f"  [{i+1}] status={st} pages={pg}")
        sys.stdout.flush()
        if st == "finished":
            break
else:
    print("Crawl timed out.")
    sys.exit(1)

# Collect summary
raw = {"summary": r}
summary = r["tasks"][0]["result"][0]
pm = summary.get("page_metrics", {})
checks = pm.get("checks", {})

lines = []
def out(msg):
    lines.append(msg)
    print(msg)

out(f"\nSEO AUDIT REPORT: {TARGET}")
out(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
out("=" * 60)

out("\nCRAWL SUMMARY")
out("-" * 40)
cp = summary.get("crawl_progress", {})
out(f"Pages crawled: {cp.get('pages_crawled', 0)}")
out(f"Pages with issues: {cp.get('pages_with_errors', 0) if isinstance(cp, dict) else 'N/A'}")

if isinstance(checks, dict):
    out("\nISSUES FOUND:")
    for k, v in sorted(checks.items(), key=lambda x: x[1] or 0, reverse=True):
        if v and v > 0:
            out(f"  {k}: {v}")

# Fetch pages
time.sleep(1)
out("\n\nPAGE-BY-PAGE DETAILS")
out("-" * 40)
pages_resp = api("POST", "/v3/on_page/pages", [{"id": task_id, "limit": 100, "order_by": ["meta.internal_links_count,desc"]}])
raw["pages"] = pages_resp

page_list = []
if pages_resp and pages_resp.get("tasks"):
    for t in pages_resp["tasks"]:
        for r in (t.get("result") or []):
            page_list.extend(r.get("items") or [])

out(f"Total pages: {len(page_list)}\n")
issues = {"CRITICAL": [], "WARNING": [], "INFO": []}

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

    out(f"{sc} | {url}")
    out(f"     Title: {(title or 'MISSING')[:75]}")
    out(f"     Desc: {(desc or 'MISSING')[:75]}")
    out(f"     H1: {h1s if h1s else 'MISSING'} | Words: {wc} | Load: {lt:.1f}s")
    if noalt: out(f"     ⚠ {noalt} images missing alt text")

    if sc == 404: issues["CRITICAL"].append(f"404: {url}")
    if sc >= 500: issues["CRITICAL"].append(f"Server error {sc}: {url}")
    if not title: issues["CRITICAL"].append(f"Missing title: {url}")
    if not desc: issues["WARNING"].append(f"Missing meta desc: {url}")
    if not h1s: issues["WARNING"].append(f"Missing H1: {url}")
    elif isinstance(h1s, list) and len(h1s) > 1: issues["WARNING"].append(f"Multiple H1s ({len(h1s)}): {url}")
    if wc < 200 and sc == 200: issues["WARNING"].append(f"Thin content ({wc} words): {url}")
    if lt > 3: issues["WARNING"].append(f"Slow load ({lt:.1f}s): {url}")
    if noalt > 0: issues["WARNING"].append(f"{noalt} imgs no alt: {url}")

# Duplicates
time.sleep(1)
for tag in ["duplicate_title", "duplicate_description"]:
    dup = api("POST", "/v3/on_page/duplicate_tags", [{"id": task_id, "type": tag, "limit": 50}])
    raw[tag] = dup
    if dup and dup.get("tasks"):
        for t in dup["tasks"]:
            for r in (t.get("result") or []):
                for item in (r.get("items") or []):
                    val = item.get("title") or item.get("description") or "?"
                    pgs = item.get("pages") or []
                    out(f"\n  Duplicate {tag.replace('duplicate_','')}: \"{val[:50]}\" ({len(pgs)} pages)")
                    issues["WARNING"].append(f"Dup {tag.replace('duplicate_','')}: \"{val[:40]}\"")
    time.sleep(1)

# Broken links
broken = api("POST", "/v3/on_page/links", [{"id": task_id, "limit": 100, "filters": ["status_code", "=", 404]}])
raw["broken_links"] = broken
if broken and broken.get("tasks"):
    for t in broken["tasks"]:
        for r in (t.get("result") or []):
            items = r.get("items") or []
            if items:
                out(f"\nBROKEN LINKS: {len(items)}")
                for item in items[:20]:
                    out(f"  {item.get('url','?')} (from {item.get('page_from','?')[:50]})")
                    issues["CRITICAL"].append(f"Broken: {item.get('url','?')}")

# Non-indexable
time.sleep(1)
noindex = api("POST", "/v3/on_page/non_indexable", [{"id": task_id, "limit": 50}])
raw["non_indexable"] = noindex
if noindex and noindex.get("tasks"):
    for t in noindex["tasks"]:
        for r in (t.get("result") or []):
            items = r.get("items") or []
            if items:
                out(f"\nNON-INDEXABLE PAGES: {len(items)}")
                for item in items:
                    out(f"  {item.get('url','?')} — {item.get('reason','?')}")

# Issue summary
out(f"\n\n{'='*60}")
out("ISSUE SUMMARY")
out("=" * 60)
for sev in ["CRITICAL", "WARNING", "INFO"]:
    if issues[sev]:
        out(f"\n{sev}: {len(issues[sev])}")
        for i, item in enumerate(issues[sev]):
            out(f"  {i+1}. {item}")

nc, nw = len(issues["CRITICAL"]), len(issues["WARNING"])
out(f"\n{'='*60}")
out(f"TOTAL: {len(page_list)} pages | {nc} critical | {nw} warnings")
out("=" * 60)

with open("audit_report.txt", "w") as f:
    f.write("\n".join(lines))
print("\n✓ audit_report.txt saved")

with open("audit_data.json", "w") as f:
    json.dump(raw, f, indent=2, default=str)
print("✓ audit_data.json saved")
