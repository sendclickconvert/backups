import requests, json, re, sys

BASE = "http://localhost:5000"

def extract_page(url):
    try:
        r = requests.get(f"{BASE}{url}", timeout=10)
        html = r.text
    except:
        return {"url": url, "error": "failed to fetch"}

    schemas = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    schema_types = []
    has_aggregate_rating = False
    has_faq_schema = False
    has_geo = False
    has_person = False
    has_breadcrumb = False

    for s in schemas:
        try:
            d = json.loads(s)
            t = d.get("@type", "?")
            schema_types.append(t)
            if "aggregateRating" in s: has_aggregate_rating = True
            if t == "FAQPage": has_faq_schema = True
            if "GeoCoordinates" in s: has_geo = True
            if t == "Person" or '"@type":"Person"' in s: has_person = True
            if t == "BreadcrumbList": has_breadcrumb = True
        except:
            pass

    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    h1s = [re.sub(r'<[^>]+>', '', h).strip() for h in h1s]
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)
    h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in h2s]
    tel_links = len(re.findall(r'tel:', html))
    estimate_links = len(re.findall(r'/contact/', html))
    cta_count = tel_links + estimate_links

    has_phone_visible = bool(re.search(r'\(516\)\s*548-6558', html))
    has_address = bool(re.search(r'Long Island|Patchogue', html))
    has_map = bool(re.search(r'google\.com/maps', html))
    has_author = bool(re.search(r'The Property Father|Property Father', html, re.IGNORECASE))
    has_founded = bool(re.search(r'2015|since 2015', html, re.IGNORECASE))
    has_bbb = bool(re.search(r'BBB|A\+', html))
    faq_visible = len(re.findall(r'<details|<summary', html))

    plain = re.sub(r'<[^>]+>', ' ', text)
    plain = re.sub(r'\s+', ' ', plain).strip()
    word_count = len(plain.split())

    has_local_refs = bool(re.search(r'Suffolk|Nassau|Long Island|Huntington|Babylon|Hempstead|Islip', plain))

    title_match = re.search(r'<title>(.*?)</title>', html)
    title = title_match.group(1) if title_match else "?"
    meta_desc = ""
    md = re.search(r'<meta name="description" content="([^"]*)"', html)
    if md: meta_desc = md.group(1)

    return {
        "url": url, "title": title, "meta_desc": meta_desc[:120],
        "word_count": word_count, "h1": h1s, "h2_count": len(h2s), "h2s": h2s[:8],
        "schema_types": schema_types, "has_aggregate_rating": has_aggregate_rating,
        "has_faq_schema": has_faq_schema, "has_geo": has_geo, "has_breadcrumb": has_breadcrumb,
        "has_person": has_person, "tel_links": tel_links, "estimate_links": estimate_links,
        "cta_count": cta_count, "has_phone_visible": has_phone_visible, "has_address": has_address,
        "has_map": has_map, "has_author": has_author, "has_founded": has_founded,
        "has_bbb": has_bbb, "faq_accordions": faq_visible, "has_local_refs": has_local_refs,
    }

pages = [
    ("/", "Homepage"),
    ("/how-it-works", "How It Works"),
    ("/about", "About"),
    ("/contact", "Contact"),
    ("/faq", "FAQ"),
    ("/locations/suffolk-county", "Suffolk County"),
    ("/locations/nassau-county", "Nassau County"),
    ("/locations/suffolk-county/babylon", "Babylon Town"),
    ("/locations/nassau-county/baldwin", "Baldwin Town"),
    ("/situations/divorce", "Divorce"),
    ("/situations/pre-foreclosure", "Pre-Foreclosure"),
    ("/situations/probate", "Probate"),
    ("/situations/inherited-property", "Inherited Property"),
    ("/situations/sell-as-is", "Sell As-Is"),
    ("/partners/lenders", "Lenders"),
    ("/partners/realtors", "Realtors"),
    ("/partners/contractors", "Contractors"),
]

results = []
for url, label in pages:
    data = extract_page(url)
    data["label"] = label
    results.append(data)
    issues = []
    if not data.get("has_aggregate_rating"): issues.append("NO AggregateRating")
    if not data.get("has_author"): issues.append("NO author/brand byline")
    if data.get("cta_count", 0) < 4: issues.append(f"LOW CTAs ({data.get('cta_count',0)})")
    if not data.get("has_local_refs"): issues.append("NO local refs")
    if not data.get("has_phone_visible"): issues.append("NO phone visible")
    if data.get("word_count", 0) < 300: issues.append(f"THIN ({data.get('word_count',0)} words)")
    if url.startswith("/locations/") and not data.get("has_map"): issues.append("NO map embed")
    if url.startswith("/locations/") and not data.get("has_geo"): issues.append("NO GeoCoordinates schema")
    if url.startswith("/locations/") and not data.get("has_breadcrumb"): issues.append("NO BreadcrumbList schema")
    if not data.get("has_faq_schema") and data.get("faq_accordions", 0) > 0: issues.append("FAQs visible but NO FAQPage schema")
    if not data.get("has_breadcrumb") and url != "/": issues.append("NO BreadcrumbList schema")
    status = "PASS" if len(issues) <= 1 else ("MINOR" if len(issues) <= 3 else "NEEDS WORK")
    print(f"\n{'='*70}")
    print(f"  {label} - {url}")
    print(f"  Title: {data.get('title','?')}")
    print(f"  Words: {data.get('word_count',0)} | H2s: {data.get('h2_count',0)} | CTAs: {data.get('cta_count',0)}")
    print(f"  Schema: {', '.join(data.get('schema_types',[]))}")
    print(f"  AggRating: {'Y' if data.get('has_aggregate_rating') else 'N'} | Author: {'Y' if data.get('has_author') else 'N'} | Map: {'Y' if data.get('has_map') else 'N'} | FAQSchema: {'Y' if data.get('has_faq_schema') else 'N'}")
    print(f"  Phone: {'Y' if data.get('has_phone_visible') else 'N'} | Address: {'Y' if data.get('has_address') else 'N'} | Local: {'Y' if data.get('has_local_refs') else 'N'} | Founded: {'Y' if data.get('has_founded') else 'N'}")
    print(f"  GeoCoords: {'Y' if data.get('has_geo') else 'N'} | Breadcrumb: {'Y' if data.get('has_breadcrumb') else 'N'}")
    if issues:
        print(f"  STATUS: {status}")
        for iss in issues: print(f"    - {iss}")
    else:
        print(f"  STATUS: PASS")

with open("tools/eeat_audit_results.json", "w") as f:
    json.dump(results, f, indent=2)
print(f"\n\nFull results saved to tools/eeat_audit_results.json")
