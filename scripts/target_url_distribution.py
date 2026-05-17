import os
import json
import requests
import pandas as pd
from pathlib import Path
from urllib.parse import urlparse

TARGETS = {
    "crst":                "crst.net",
    "directmailsolutions": "directmailsolutions.com",
    "maildatainc":         "maildatainc.com",
    "johnsbyrne":          "johnsbyrne.com",
}

BASE_URL = "https://api.dataforseo.com/v3/backlinks"
OUT_DIR  = Path("output/backlink-analysis")
RAW_DIR  = OUT_DIR / "raw"

LOGIN    = os.environ.get("DATAFORSEO_LOGIN")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")
if not LOGIN or not PASSWORD:
    raise SystemExit("ERROR: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD env vars not set.")

SESSION = requests.Session()
SESSION.auth = (LOGIN, PASSWORD)
SESSION.headers.update({"Content-Type": "application/json"})

def api_post(endpoint, payload):
    url = f"{BASE_URL}/{endpoint}"
    resp = SESSION.post(url, json=payload, timeout=60)
    resp.raise_for_status()
    return resp.json()

def fetch_referring_pages(key, domain):
    print(f"  Fetching backlinks for {domain}...", end=" ", flush=True)
    payload = [{
        "target": domain,
        "limit": 1000,
        "backlinks_status_type": "live",
        "include_subdomains": True,
        "order_by": ["rank,desc"],
        "mode": "as_is",
    }]
    data = api_post("backlinks/live", payload)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    (RAW_DIR / f"backlinks_{key}.json").write_text(json.dumps(data, indent=2))
    items = data.get("tasks", [{}])[0].get("result", [{}])[0].get("items") or []
    print(f"done. {len(items)} backlinks returned.")
    return items

def bucket_url(url, domain):
    try:
        path = urlparse(url).path.rstrip("/").lower()
    except Exception:
        path = ""

    if path == "" or path == "/":
        return "Homepage"
    if path.startswith("/services"):
        return "services/*"
    if path.startswith("/direct-mail-tools"):
        return "direct-mail-tools/*"
    if path.startswith("/resources"):
        return "resources/*"
    if path.startswith("/guides"):
        return "guides/*"
    if any(path.startswith(p) for p in ["/blog", "/case-studies", "/case-study"]):
        return "blog / case-studies"
    if path.startswith("/service-areas") or path.startswith("/services/"):
        return "service-areas/*"
    return "other"

def main():
    rows = []
    for key, domain in TARGETS.items():
        items = fetch_referring_pages(key, domain)

        # backlinks/live: each item = one individual backlink
        # url_to  = target page on our domain
        # url_from = source page
        # domain_from = source domain (for unique-domain counting)

        from collections import defaultdict
        bucket_bl      = defaultdict(int)   # backlink count per bucket
        bucket_domains = defaultdict(set)   # unique source domains per bucket

        for item in items:
            target_url  = item.get("url_to") or ""
            source_dom  = item.get("domain_from") or item.get("url_from", "")
            bucket      = bucket_url(target_url, domain)
            bucket_bl[bucket]      += 1
            bucket_domains[bucket].add(source_dom)

        total_bl = sum(bucket_bl.values()) or 1
        all_buckets = sorted(set(bucket_bl.keys()) | set(bucket_domains.keys()))

        for bucket in all_buckets:
            bl  = bucket_bl.get(bucket, 0)
            rds = len(bucket_domains.get(bucket, set()))
            rows.append({
                "Domain":            domain,
                "Bucket":            bucket,
                "Backlinks":         bl,
                "Unique Src Domains": rds,
                "% of Backlinks":    round(bl / total_bl * 100, 1),
            })

    df = pd.DataFrame(rows)

    # Pivot for easy reading — % of backlinks per domain per bucket
    pivot = df.pivot_table(
        index="Bucket",
        columns="Domain",
        values="% of Backlinks",
        fill_value=0,
    ).reset_index()
    pivot.to_csv(OUT_DIR / "target_url_distribution_pivot.csv", index=False)

    # Full detail table
    df.to_csv(OUT_DIR / "target_url_distribution.csv", index=False)

    print("\n=== TARGET URL DISTRIBUTION ===")
    print(pivot.to_string(index=False))
    print(f"\nFiles saved:")
    print(f"  output/backlink-analysis/target_url_distribution.csv  (full detail)")
    print(f"  output/backlink-analysis/target_url_distribution_pivot.csv  (% by bucket)")

if __name__ == "__main__":
    main()
