import os
import json
import requests
import pandas as pd
from pathlib import Path
from datetime import datetime

# ── CONFIG ──────────────────────────────────────────────────────────────────
TARGETS = {
    "crst":                 "crst.net",
    "directmailsolutions":  "directmailsolutions.com",
    "maildatainc":          "maildatainc.com",
    "johnsbyrne":           "johnsbyrne.com",
}
OUR_KEY = "crst"
COMPETITOR_KEYS = [k for k in TARGETS if k != OUR_KEY]

COMMERCIAL_KEYWORDS = [
    "direct mail", "eddm", "every door direct mail", "bulk mail",
    "mailing services", "direct mail services", "envelope sizes",
    "non-profit mailing", "postage rates", "commercial printing",
]
BRANDED_TERMS = {
    "crst":                ["cornerstone", "crst"],
    "directmailsolutions": ["directmailsolutions", "direct mail solutions"],
    "maildatainc":         ["maildata", "maildatainc", "mail data"],
    "johnsbyrne":          ["johns byrne", "johnsbyrne"],
}
GENERIC_ANCHORS = {
    "click here", "here", "learn more", "read more", "this", "this article",
    "this page", "this site", "website", "link", "source", "more", "visit",
    "see more", "view", "continue reading", "find out more",
}

BASE_URL = "https://api.dataforseo.com/v3/backlinks"
OUT_DIR  = Path("output/backlink-analysis")
RAW_DIR  = OUT_DIR / "raw"

# ── AUTH ─────────────────────────────────────────────────────────────────────
LOGIN    = os.environ.get("DATAFORSEO_LOGIN")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD")
if not LOGIN or not PASSWORD:
    raise SystemExit("ERROR: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD env vars not set.")

SESSION = requests.Session()
SESSION.auth = (LOGIN, PASSWORD)
SESSION.headers.update({"Content-Type": "application/json"})

# ── HELPERS ──────────────────────────────────────────────────────────────────
def api_post(endpoint: str, payload: list) -> dict:
    url = f"{BASE_URL}/{endpoint}"
    resp = SESSION.post(url, json=payload, timeout=60)
    resp.raise_for_status()
    return resp.json()

def save_raw(name: str, data: dict):
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    path = RAW_DIR / f"{name}.json"
    path.write_text(json.dumps(data, indent=2))

def classify_anchor(text: str, brand_terms: list) -> str:
    t = (text or "").strip().lower()
    if not t or len(t) <= 1:
        return "Empty"
    if t.startswith("http") or t.startswith("www."):
        return "URL"
    for term in brand_terms:
        if term in t:
            return "Branded"
    if any(kw == t for kw in COMMERCIAL_KEYWORDS):
        return "Exact Match"
    if any(word in t for kw in COMMERCIAL_KEYWORDS for word in kw.split()):
        if any(kw_word in t for kw in COMMERCIAL_KEYWORDS for kw_word in kw.split() if len(kw_word) > 3):
            return "Partial Match"
    if t in GENERIC_ANCHORS:
        return "Generic"
    return "Generic"

# ── FETCH ────────────────────────────────────────────────────────────────────
def fetch_summary(key: str, domain: str) -> dict:
    print(f"  Fetching summary for {domain}...", end=" ", flush=True)
    payload = [{"target": domain, "backlinks_status_type": "live", "include_subdomains": True}]
    data = api_post("summary/live", payload)
    save_raw(f"summary_{key}", data)
    result = data.get("tasks", [{}])[0].get("result", [{}])[0] or {}
    print(f"done. {result.get('referring_domains', 0)} referring domains.")
    return result

def fetch_referring_domains(key: str, domain: str) -> list:
    print(f"  Fetching referring domains for {domain}...", end=" ", flush=True)
    payload = [{
        "target": domain,
        "limit": 1000,
        "backlinks_status_type": "live",
        "include_subdomains": True,
        "filters": [["backlinks", ">", 0]],
        "order_by": ["rank,desc"],
    }]
    data = api_post("referring_domains/live", payload)
    save_raw(f"referring_domains_{key}", data)
    items = data.get("tasks", [{}])[0].get("result", [{}])[0].get("items") or []
    print(f"done. {len(items)} domains returned.")
    return items

def fetch_anchors(key: str, domain: str) -> list:
    print(f"  Fetching anchors for {domain}...", end=" ", flush=True)
    payload = [{
        "target": domain,
        "limit": 1000,
        "backlinks_status_type": "live",
        "include_subdomains": True,
    }]
    data = api_post("anchors/live", payload)
    save_raw(f"anchors_{key}", data)
    items = data.get("tasks", [{}])[0].get("result", [{}])[0].get("items") or []
    print(f"done. {len(items)} anchors returned.")
    return items

# ── BUILD OUTPUTS ─────────────────────────────────────────────────────────────
def build_summary_csv(summaries: dict) -> pd.DataFrame:
    rows = []
    for key, s in summaries.items():
        domain = TARGETS[key]
        rows.append({
            "Domain":                    domain,
            "Total Backlinks":           s.get("backlinks", 0),
            "Referring Domains":         s.get("referring_domains", 0),
            "Rank":                      s.get("rank", 0),
            "Dofollow %":                round((s.get("backlinks_dofollow", 0) /
                                                max(s.get("backlinks", 1), 1)) * 100, 1),
            "Avg Referring Domain Rank": s.get("referring_domains_nofollow", "n/a"),
        })
    df = pd.DataFrame(rows)
    df.to_csv(OUT_DIR / "summary_comparison.csv", index=False)
    return df

def build_bucketed_csv(rd_data: dict) -> pd.DataFrame:
    rows = []
    for key, items in rd_data.items():
        domain = TARGETS[key]
        rank60  = sum(1 for i in items if (i.get("rank") or 0) >= 60)
        rank30  = sum(1 for i in items if 30 <= (i.get("rank") or 0) < 60)
        ranklow = sum(1 for i in items if (i.get("rank") or 0) < 30)
        rows.append({
            "Domain":      domain,
            "Rank 60+":    rank60,
            "Rank 30-59":  rank30,
            "Rank under 30": ranklow,
            "Total":       len(items),
        })
    df = pd.DataFrame(rows)
    df.to_csv(OUT_DIR / "referring_domains_bucketed.csv", index=False)
    return df

def build_anchor_csv(anchor_data: dict) -> pd.DataFrame:
    rows = []
    for key, items in anchor_data.items():
        domain = TARGETS[key]
        brand_terms = BRANDED_TERMS.get(key, [])
        counts = {"Branded": 0, "Exact Match": 0, "Partial Match": 0,
                  "URL": 0, "Generic": 0, "Empty": 0}
        for item in items:
            cat = classify_anchor(item.get("anchor", ""), brand_terms)
            counts[cat] = counts.get(cat, 0) + (item.get("backlinks") or 1)
        rows.append({"Domain": domain, **counts})
    df = pd.DataFrame(rows)
    df.to_csv(OUT_DIR / "anchor_distribution.csv", index=False)
    return df

def build_gap_list(rd_data: dict) -> pd.DataFrame:
    # Build a unified map: referring_domain -> {key: True/False, rank, traffic, sample_anchor, sample_url}
    universe: dict[str, dict] = {}

    for key, items in rd_data.items():
        for item in items:
            rd = (item.get("domain") or "").lower().strip()
            if not rd:
                continue
            if rd not in universe:
                universe[rd] = {
                    "Referring Domain":             rd,
                    "Rank":                         item.get("rank") or 0,
                    "Organic Traffic":              item.get("organic_traffic") or 0,
                    "links_crst":                   False,
                    "links_directmailsolutions":    False,
                    "links_maildatainc":            False,
                    "links_johnsbyrne":             False,
                    "Sample Anchor":                item.get("anchor") or "",
                    "Sample Target URL":            item.get("backlink") or "",
                }
            universe[rd][f"links_{key}"] = True
            # Prefer highest rank as the representative row
            if (item.get("rank") or 0) > universe[rd]["Rank"]:
                universe[rd]["Rank"] = item.get("rank") or 0
                universe[rd]["Organic Traffic"] = item.get("organic_traffic") or 0

    df = pd.DataFrame(list(universe.values()))
    if df.empty:
        df.to_csv(OUT_DIR / "GAP_OUTREACH_LIST.csv", index=False)
        return df

    # Score = # of competitors (not crst) that link here
    df["shared_competitor_score"] = (
        df["links_directmailsolutions"].astype(int) +
        df["links_maildatainc"].astype(int) +
        df["links_johnsbyrne"].astype(int)
    )

    gap = df[(df["shared_competitor_score"] >= 2) & (~df["links_crst"])].copy()
    gap = gap.sort_values(["shared_competitor_score", "Rank"], ascending=[False, False])

    out_cols = [
        "Referring Domain", "Rank", "Organic Traffic",
        "links_directmailsolutions", "links_maildatainc", "links_johnsbyrne",
        "Sample Anchor", "Sample Target URL",
    ]
    gap[out_cols].to_csv(OUT_DIR / "GAP_OUTREACH_LIST.csv", index=False)
    return gap

def build_summary_report(summaries: dict, rd_data: dict, gap_df: pd.DataFrame):
    our  = summaries[OUR_KEY]
    comp = [summaries[k] for k in COMPETITOR_KEYS]

    our_rd    = our.get("referring_domains", 0)
    comp_avg  = sum(c.get("referring_domains", 0) for c in comp) / len(comp)
    our_rank  = our.get("rank", 0)
    comp_ranks = [c.get("rank", 0) for c in comp]

    # Rank 60+ links
    our_60    = sum(1 for i in rd_data[OUR_KEY] if (i.get("rank") or 0) >= 60)
    comp_60   = [sum(1 for i in rd_data[k] if (i.get("rank") or 0) >= 60) for k in COMPETITOR_KEYS]
    comp_60_avg = sum(comp_60) / len(comp_60) if comp_60 else 0

    lines = [
        f"# CRST Backlink Gap Analysis",
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "",
        "## Headline Numbers",
        f"- **CRST referring domains:** {our_rd}",
        f"- **Competitor average referring domains:** {comp_avg:.0f}",
        f"- **Gap:** {max(0, comp_avg - our_rd):.0f} domains behind the average competitor",
        f"- **CRST domain rank:** {our_rank}",
        f"- **Competitor ranks:** {', '.join(str(r) for r in comp_ranks)}",
        "",
        "## Quality Distribution (Rank 60+ referring domains)",
        f"- **CRST:** {our_60} rank-60+ referring domains",
        f"- **Competitor average:** {comp_60_avg:.1f}",
    ]
    for k, cnt in zip(COMPETITOR_KEYS, comp_60):
        lines.append(f"  - {TARGETS[k]}: {cnt}")

    lines += [
        "",
        "## Gap Outreach Targets",
        f"- **High-priority outreach domains identified:** {len(gap_df)}",
        f"  (Criteria: links to ≥2 competitors AND does NOT link to crst.net)",
        "",
        "## Files Generated",
        "- `raw/` — 12 raw JSON API responses (audit trail)",
        "- `summary_comparison.csv` — side-by-side domain metrics",
        "- `referring_domains_bucketed.csv` — quality distribution by rank bucket",
        "- `anchor_distribution.csv` — anchor text classification per domain",
        "- `GAP_OUTREACH_LIST.csv` — **actionable outreach targets**",
        "- `SUMMARY_REPORT.md` — this file",
    ]

    (OUT_DIR / "SUMMARY_REPORT.md").write_text("\n".join(lines))

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    summaries   = {}
    rd_data     = {}
    anchor_data = {}

    for key, domain in TARGETS.items():
        print(f"\n[{domain}]")
        summaries[key]   = fetch_summary(key, domain)
        rd_data[key]     = fetch_referring_domains(key, domain)
        anchor_data[key] = fetch_anchors(key, domain)

    print("\nBuilding CSVs...")
    build_summary_csv(summaries)
    print("  summary_comparison.csv done")
    build_bucketed_csv(rd_data)
    print("  referring_domains_bucketed.csv done")
    build_anchor_csv(anchor_data)
    print("  anchor_distribution.csv done")
    gap_df = build_gap_list(rd_data)
    print(f"  GAP_OUTREACH_LIST.csv done ({len(gap_df)} rows)")
    build_summary_report(summaries, rd_data, gap_df)
    print("  SUMMARY_REPORT.md done")

    our_rd   = summaries[OUR_KEY].get("referring_domains", 0)
    comp_avg = sum(summaries[k].get("referring_domains", 0) for k in COMPETITOR_KEYS) / len(COMPETITOR_KEYS)

    print(f"""
=== ANALYSIS COMPLETE ===
CRST referring domains:          {our_rd}
Competitor average:              {comp_avg:.0f}
Gap (high-priority outreach targets): {len(gap_df)} domains identified
Output: ./output/backlink-analysis/
""")

if __name__ == "__main__":
    main()
