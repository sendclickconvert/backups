"""
CRST.net DataForSEO Backlink Audit
Combines best of both AI recommendations:
  - 5 endpoints: summary, referring_domains, backlinks, anchors, domain_pages
  - rank_scale one_hundred, exclude_internal_backlinks, include_indirect_links
  - Proper pagination (offset up to 20k, then search_after_token)
  - API cost tracking per call
  - Raw JSON saved for troubleshooting
  - UTF-8 with BOM so CSVs open cleanly in Excel
"""

import os, json, csv, time, sys
from pathlib import Path
import requests
from requests.auth import HTTPBasicAuth

# ── Credentials ───────────────────────────────────────────────────────────────
LOGIN    = os.environ.get("DATAFORSEO_LOGIN")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")
if not LOGIN or not PASSWORD:
    sys.exit("ERROR: DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD not set in environment.")

AUTH     = HTTPBasicAuth(LOGIN, PASSWORD)
BASE_URL = "https://api.dataforseo.com/v3/backlinks"
TARGET   = "crst.net"
RAW_DIR  = Path("crst_backlinks_raw")
RAW_DIR.mkdir(exist_ok=True)

COMMON = {
    "target": TARGET,
    "backlinks_status_type": "live",
    "include_subdomains": True,
    "exclude_internal_backlinks": True,
    "include_indirect_links": True,
    "rank_scale": "one_hundred",
}

total_cost      = 0.0
total_api_calls = 0
output_files    = []

# ── Helpers ───────────────────────────────────────────────────────────────────
def post(endpoint: str, payload: list, label: str) -> dict:
    global total_cost, total_api_calls
    url = f"{BASE_URL}/{endpoint}"
    print(f"  → POST {url}  [{label}]")
    resp = requests.post(url, json=payload, auth=AUTH, timeout=120)
    resp.raise_for_status()
    data = resp.json()
    total_api_calls += 1

    # Save raw JSON
    raw_path = RAW_DIR / f"{label.replace(' ', '_')}.json"
    raw_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    output_files.append(str(raw_path))

    # Validate top-level status
    if data.get("status_code") != 20000:
        print(f"  ✗ API top-level error: {data.get('status_message')}")
        return data

    for task in data.get("tasks", []):
        cost = task.get("cost", 0) or 0
        total_cost += cost
        sc = task.get("status_code")
        sm = task.get("status_message")
        if sc != 20000:
            print(f"  ✗ Task error {sc}: {sm}")
    return data


def safe(obj, *keys, default=""):
    for k in keys:
        if obj is None:
            return default
        obj = obj.get(k) if isinstance(obj, dict) else None
    return obj if obj is not None else default


def jstr(v):
    if isinstance(v, (dict, list)):
        return json.dumps(v, ensure_ascii=False)
    return "" if v is None else str(v)


def write_csv(path: str, rows: list, fieldnames: list):
    p = Path(path)
    with p.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        for row in rows:
            w.writerow({k: jstr(row.get(k)) for k in fieldnames})
    output_files.append(path)
    print(f"  ✓ Saved {path}  ({len(rows)} rows)")


# ── 1. Summary ────────────────────────────────────────────────────────────────
print("\n[1/5] Backlink Summary")
payload = [{**COMMON, "internal_list_limit": 50}]
data    = post("summary/live", payload, "1_summary")

summary_result = safe(data, "tasks", 0, "result", 0) or {}
summary_rows = [{
    "target":                           safe(summary_result, "target"),
    "rank":                             safe(summary_result, "rank"),
    "backlinks":                        safe(summary_result, "backlinks"),
    "backlinks_spam_score":             safe(summary_result, "backlinks_spam_score"),
    "broken_backlinks":                 safe(summary_result, "broken_backlinks"),
    "broken_pages":                     safe(summary_result, "broken_pages"),
    "referring_domains":                safe(summary_result, "referring_domains"),
    "referring_domains_nofollow":       safe(summary_result, "referring_domains_nofollow"),
    "referring_main_domains":           safe(summary_result, "referring_main_domains"),
    "referring_main_domains_nofollow":  safe(summary_result, "referring_main_domains_nofollow"),
    "referring_ips":                    safe(summary_result, "referring_ips"),
    "referring_subnets":                safe(summary_result, "referring_subnets"),
    "referring_pages":                  safe(summary_result, "referring_pages"),
    "referring_pages_nofollow":         safe(summary_result, "referring_pages_nofollow"),
    "referring_links_types":            jstr(safe(summary_result, "referring_links_types")),
    "referring_links_attributes":       jstr(safe(summary_result, "referring_links_attributes")),
    "referring_links_platform_types":   jstr(safe(summary_result, "referring_links_platform_types")),
    "referring_links_countries":        jstr(safe(summary_result, "referring_links_countries")),
    "first_seen":                       safe(summary_result, "first_seen"),
    "lost_date":                        safe(summary_result, "lost_date"),
}]
write_csv("crst_summary.csv", summary_rows, list(summary_rows[0].keys()))


# ── 2. Referring Domains (paginated) ──────────────────────────────────────────
print("\n[2/5] Referring Domains (paginated, 1 000/page)")
DOMAIN_FIELDS = [
    "domain","rank","backlinks","backlinks_spam_score","referring_pages",
    "referring_pages_nofollow","broken_backlinks","broken_pages",
    "first_seen","lost_date","referring_links_types","referring_links_attributes",
    "referring_links_platform_types","referring_links_countries",
]
domains_rows, seen_domains, offset = [], set(), 0
while True:
    payload = [{**COMMON, "limit": 1000, "offset": offset,
                "order_by": ["rank,desc"], "internal_list_limit": 50}]
    data    = post("referring_domains/live", payload,
                   f"2_referring_domains_offset{offset}")
    items   = safe(data, "tasks", 0, "result", 0, "items") or []
    total   = safe(data, "tasks", 0, "result", 0, "total_count") or 0
    for item in items:
        d = item.get("domain", "")
        if d not in seen_domains:
            seen_domains.add(d)
            domains_rows.append(item)
    print(f"    offset {offset}: got {len(items)} items  (total_count={total})")
    if len(items) < 1000 or len(domains_rows) >= total:
        break
    offset += 1000
    time.sleep(0.5)
write_csv("crst_referring_domains.csv", domains_rows, DOMAIN_FIELDS)


# ── 3. Backlinks one-per-domain (paginated) ───────────────────────────────────
print("\n[3/5] Backlinks — one per domain (paginated)")
BACKLINK_FIELDS = [
    "domain_from","url_from","page_from_title","page_from_rank","domain_from_rank",
    "domain_from_country","page_from_status_code","url_to","url_to_status_code",
    "url_to_redirect_target","anchor","text_pre","text_post","alt","dofollow",
    "attributes","item_type","semantic_location","rank","backlink_spam_score",
    "first_seen","last_seen","group_count","links_count","is_broken",
    "is_indirect_link","indirect_link_path",
]
backlink_rows, seen_bl, offset, search_after_token = [], set(), 0, None
MAX_OFFSET = 20000
while True:
    base_payload = {
        **COMMON,
        "limit": 1000,
        "mode": "one_per_domain",
        "order_by": ["rank,desc"],
        "internal_list_limit": 50,
    }
    if search_after_token:
        base_payload["search_after_token"] = search_after_token
    else:
        base_payload["offset"] = offset

    label = f"3_backlinks_offset{offset}" if not search_after_token else f"3_backlinks_token"
    data  = post("backlinks/live", [base_payload], label)
    items = safe(data, "tasks", 0, "result", 0, "items") or []
    total = safe(data, "tasks", 0, "result", 0, "total_count") or 0
    search_after_token = safe(data, "tasks", 0, "result", 0, "search_after_token") or None

    for item in items:
        key = (item.get("domain_from",""), item.get("url_from",""), item.get("url_to",""))
        if key not in seen_bl:
            seen_bl.add(key)
            backlink_rows.append(item)
    print(f"    offset {offset}: got {len(items)} items  (total_count={total})")
    if len(items) < 1000 or len(backlink_rows) >= total:
        break
    if search_after_token:
        pass  # token handles the next page
    elif offset + 1000 <= MAX_OFFSET:
        offset += 1000
    else:
        print("    Reached max offset (20 000) — switching to search_after_token pagination")
    time.sleep(0.5)
write_csv("crst_backlinks.csv", backlink_rows, BACKLINK_FIELDS)


# ── 4. Anchor-text distribution ───────────────────────────────────────────────
print("\n[4/5] Anchor-text distribution")
ANCHOR_FIELDS = [
    "anchor","backlinks","referring_domains","referring_main_domains",
    "referring_pages","referring_pages_nofollow","first_seen","lost_date",
    "rank","backlinks_spam_score",
]
anchor_rows, offset = [], 0
while True:
    payload = [{**COMMON, "limit": 1000, "offset": offset,
                "order_by": ["backlinks,desc"]}]
    data    = post("anchors/live", payload, f"4_anchors_offset{offset}")
    items   = safe(data, "tasks", 0, "result", 0, "items") or []
    total   = safe(data, "tasks", 0, "result", 0, "total_count") or 0
    anchor_rows.extend(items)
    print(f"    offset {offset}: got {len(items)} items  (total_count={total})")
    if len(items) < 1000 or len(anchor_rows) >= total:
        break
    offset += 1000
    time.sleep(0.5)
write_csv("crst_anchors.csv", anchor_rows, ANCHOR_FIELDS)


# ── 5. Linked CRST pages ──────────────────────────────────────────────────────
print("\n[5/5] Linked CRST pages (domain_pages)")
PAGE_FIELDS = [
    "page","status_code","title",
    "ps_rank","ps_backlinks","ps_backlinks_spam_score","ps_broken_backlinks",
    "ps_referring_domains","ps_referring_main_domains","ps_referring_pages",
    "ps_referring_pages_nofollow","ps_first_seen","ps_lost_date",
]
payload = [{**COMMON, "limit": 1000, "order_by": ["referring_domains,desc"]}]
data    = post("domain_pages/live", payload, "5_domain_pages")
items   = safe(data, "tasks", 0, "result", 0, "items") or []

page_rows = []
for item in items:
    ps = item.get("page_summary") or {}
    page_rows.append({
        "page":                      item.get("page",""),
        "status_code":               item.get("status_code",""),
        "title":                     item.get("title",""),
        "ps_rank":                   ps.get("rank",""),
        "ps_backlinks":              ps.get("backlinks",""),
        "ps_backlinks_spam_score":   ps.get("backlinks_spam_score",""),
        "ps_broken_backlinks":       ps.get("broken_backlinks",""),
        "ps_referring_domains":      ps.get("referring_domains",""),
        "ps_referring_main_domains": ps.get("referring_main_domains",""),
        "ps_referring_pages":        ps.get("referring_pages",""),
        "ps_referring_pages_nofollow": ps.get("referring_pages_nofollow",""),
        "ps_first_seen":             ps.get("first_seen",""),
        "ps_lost_date":              ps.get("lost_date",""),
    })
write_csv("crst_linked_pages.csv", page_rows, PAGE_FIELDS)


# ── Final summary ─────────────────────────────────────────────────────────────
print("\n" + "="*60)
print("CRST.NET BACKLINK AUDIT — COMPLETE")
print("="*60)
r = summary_result
print(f"  Total backlinks:           {r.get('backlinks','n/a')}")
print(f"  Referring domains:         {r.get('referring_domains','n/a')}")
print(f"  Referring main domains:    {r.get('referring_main_domains','n/a')}")
print(f"  Referring pages:           {r.get('referring_pages','n/a')}")
print(f"  Broken backlinks:          {r.get('broken_backlinks','n/a')}")
print(f"  Backlink spam score:       {r.get('backlinks_spam_score','n/a')}")
print(f"  Domain rank (0-100):       {r.get('rank','n/a')}")
print()
print(f"  Referring-domain rows:     {len(domains_rows)}")
print(f"  Backlink rows (1/domain):  {len(backlink_rows)}")
print(f"  Anchor rows:               {len(anchor_rows)}")
print(f"  Linked-page rows:          {len(page_rows)}")
print()
print(f"  API calls made:            {total_api_calls}")
print(f"  Total API cost reported:   ${total_cost:.4f}")
print()
print("Output files:")
for f in output_files:
    print(f"  {f}")
print("="*60)
