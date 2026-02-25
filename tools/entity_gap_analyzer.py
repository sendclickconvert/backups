"""
Entity Gap Analyzer — CRST SEO Tool
Usage:
  python tools/entity_gap_analyzer.py --crst <url> --competitors <url1> <url2> <url3>

Example:
  python tools/entity_gap_analyzer.py \
    --crst https://crst.net/usps-direct-mailer-templates/ \
    --competitors \
      https://www.modernpostcard.com/templates \
      https://pe.usps.com/text/qsg300/Q201.htm \
      https://pe.usps.com/text/qsg300/Q201d.htm

Requires: pip install beautifulsoup4 anthropic requests
Env var:  Claude_API_Key
"""

import os
import sys
import json
import argparse
import requests
from bs4 import BeautifulSoup
import anthropic

CLAUDE_API_KEY = os.environ.get("Claude_API_Key")


def fetch_page(url: str, max_chars: int = 10000) -> tuple[int, int, str]:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    try:
        resp = requests.get(url, headers=headers, timeout=20)
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
            tag.decompose()
        text = " ".join(soup.get_text(separator=" ", strip=True).split())[:max_chars]
        return resp.status_code, len(text), text
    except Exception as e:
        return 0, 0, str(e)


def extract_entities(client: anthropic.Anthropic, name: str, text: str) -> dict:
    prompt = f"""Extract all entities from this page that Google NLP would recognize.
Categories: ORGANIZATION, CONCEPT, PROCESS, FORM, ELIGIBILITY, LOCATION, PERSON, CONSUMER_GOOD, OTHER.

Return ONLY valid JSON:
{{
  "source": "{name}",
  "entities": [
    {{"name": "...", "category": "...", "importance": "HIGH|MEDIUM|LOW"}}
  ]
}}

PAGE ({name}):
{text[:8000]}"""

    msg = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    if raw.startswith("```"):
        parts = raw.split("```")
        raw = parts[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def run_gap_analysis(crst_url: str, competitor_urls: list[str], output_file: str = None):
    client = anthropic.Anthropic(api_key=CLAUDE_API_KEY)

    all_urls = {"CRST": crst_url}
    for i, url in enumerate(competitor_urls, 1):
        all_urls[f"Competitor_{i}"] = url

    print("\nFetching pages...")
    pages = {}
    for name, url in all_urls.items():
        status, chars, text = fetch_page(url)
        pages[name] = text
        print(f"  {status} | {chars:>5} chars | {name}: {url}")

    print("\nExtracting entities...")
    results = {}
    for name, text in pages.items():
        print(f"  Extracting: {name}...", end="", flush=True)
        results[name] = extract_entities(client, name, text)
        print(f" → {len(results[name]['entities'])} entities")

    crst_names = {e["name"].lower() for e in results["CRST"]["entities"]}

    print(f"\n{'='*65}")
    print(f"ENTITY GAP ANALYSIS: CRST vs Competitors")
    print(f"CRST: {crst_url}")
    print(f"CRST has {len(crst_names)} entities. Missing HIGH/MEDIUM entities:\n")
    print(f"{'='*65}\n")

    gaps = {}
    for comp_name, comp_data in results.items():
        if comp_name == "CRST":
            continue
        for e in comp_data["entities"]:
            if e["name"].lower() not in crst_names and e["importance"] in ["HIGH", "MEDIUM"]:
                cat = e["category"]
                if cat not in gaps:
                    gaps[cat] = []
                if not any(x["name"].lower() == e["name"].lower() for x in gaps[cat]):
                    gaps[cat].append({"name": e["name"], "importance": e["importance"], "source": comp_name})

    category_order = ["ORGANIZATION", "FORM", "ELIGIBILITY", "PROCESS", "CONCEPT", "CONSUMER_GOOD", "LOCATION", "OTHER"]
    for cat in category_order:
        if cat not in gaps:
            continue
        items = sorted(gaps[cat], key=lambda x: (0 if x["importance"] == "HIGH" else 1, x["name"]))
        print(f"[{cat}] — {len(items)} gaps")
        for item in items:
            flag = "★" if item["importance"] == "HIGH" else "·"
            print(f"  {flag} {item['name']:<50} (from: {item['source']})")
        print()

    total_gaps = sum(len(v) for v in gaps.values())
    print(f"Total gaps: {total_gaps}")

    if output_file:
        with open(output_file, "w") as f:
            json.dump({"crst_url": crst_url, "crst_entities": results["CRST"], "gaps": gaps}, f, indent=2)
        print(f"\n✓ Saved to {output_file}")

    return gaps


def main():
    parser = argparse.ArgumentParser(description="Entity gap analyzer for SEO")
    parser.add_argument("--crst", required=True, help="CRST page URL to analyze")
    parser.add_argument("--competitors", nargs="+", required=True, help="Competitor URLs")
    parser.add_argument("--output", default=None, help="Output JSON file path")
    args = parser.parse_args()

    run_gap_analysis(args.crst, args.competitors, args.output)


if __name__ == "__main__":
    if len(sys.argv) == 1:
        print(__doc__)
        sys.exit(0)
    main()
