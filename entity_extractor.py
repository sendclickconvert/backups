import os
import json
import requests
from bs4 import BeautifulSoup
import anthropic

CLAUDE_API_KEY = os.environ.get("Claude_API_Key")
TARGET_URL = "https://crst.net/usps-direct-mailer-templates/"


def fetch_page_text(url):
    headers = {"User-Agent": "Mozilla/5.0 (compatible; EntityBot/1.0)"}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
        tag.decompose()
    text = soup.get_text(separator=" ", strip=True)
    text = " ".join(text.split())
    return text[:12000]


def extract_entities(text, url):
    client = anthropic.Anthropic(api_key=CLAUDE_API_KEY)
    prompt = f"""You are an SEO entity extraction specialist. Analyze the following page content and extract every entity Google's NLP would recognize.

For each entity return:
- name: the entity name
- type: one of [PERSON, LOCATION, ORGANIZATION, EVENT, CONSUMER_GOOD, OTHER, CONCEPT]
- importance: HIGH / MEDIUM / LOW (based on how central it is to the page topic)
- mentions: estimated number of times referenced

Group results by type. Return ONLY valid JSON in this exact format with no extra text:
{{
  "url": "{url}",
  "total_entities": 0,
  "entities_by_type": {{
    "CONSUMER_GOOD": [{{"name": "...", "importance": "...", "mentions": 0}}],
    "CONCEPT": [],
    "ORGANIZATION": [],
    "LOCATION": [],
    "PERSON": [],
    "EVENT": [],
    "OTHER": []
  }}
}}

PAGE CONTENT:
{text}"""

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=4000,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text.strip()
    if raw.startswith("```"):
        parts = raw.split("```")
        raw = parts[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def print_report(data):
    print(f"\n{'='*65}")
    print(f"ENTITY EXTRACTION REPORT")
    print(f"URL: {data['url']}")
    print(f"Total entities found: {data['total_entities']}")
    print(f"{'='*65}")

    order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
    for entity_type, entities in data["entities_by_type"].items():
        if not entities:
            continue
        print(f"\n[{entity_type}] — {len(entities)} entities")
        print("-" * 50)
        sorted_e = sorted(entities, key=lambda x: (order.get(x.get("importance", "LOW"), 2), x["name"]))
        for e in sorted_e:
            imp = e.get("importance", "")
            flag = "★" if imp == "HIGH" else "·"
            print(f"  {flag} {e['name']:<45} [{imp}]  mentions: {e.get('mentions', '?')}")

    with open("entities_crst_templates.json", "w") as f:
        json.dump(data, f, indent=2)
    print(f"\n✓ Saved to entities_crst_templates.json")


def main():
    print(f"Fetching: {TARGET_URL}")
    text = fetch_page_text(TARGET_URL)
    print(f"✓ Got {len(text)} characters\n")
    print("Extracting entities via Claude API...")
    data = extract_entities(text, TARGET_URL)
    print("✓ Done\n")
    print_report(data)


if __name__ == "__main__":
    main()
