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
    estimate_links = len(re.findall(r'/estimate/|/contact/', html))
    cta_count = tel_links + estimate_links
    
    has_phone_visible = bool(re.search(r'\(845\)\s*255-5722|\(845\)\s*393-6770', html))
    has_address = bool(re.search(r'31 South Ohioville|New Paltz', html))
    has_map = bool(re.search(r'google\.com/maps', html))
    
    has_author = bool(re.search(r'Sean Griff|Sean H\. Griff', html, re.IGNORECASE))
    has_founded = bool(re.search(r'1998|since 1998', html, re.IGNORECASE))
    has_bbb = bool(re.search(r'BBB|A\+', html))
    
    faq_visible = len(re.findall(r'<details|<summary', html))
    
    plain = re.sub(r'<[^>]+>', ' ', text)
    plain = re.sub(r'\s+', ' ', plain).strip()
    word_count = len(plain.split())
    
    has_local_refs = bool(re.search(r'Ulster|Dutchess|Orange|Hudson Valley|Kingston|Poughkeepsie|Newburgh', plain))
    
    title_match = re.search(r'<title>(.*?)</title>', html)
    title = title_match.group(1) if title_match else "?"
    
    meta_desc = ""
    md = re.search(r'<meta name="description" content="([^"]*)"', html)
    if md: meta_desc = md.group(1)
    
    has_source_citations = bool(re.search(r'pe\.usps\.com|usps\.com|DMM|Domestic Mail Manual', html))
    
    return {
        "url": url,
        "title": title,
        "meta_desc": meta_desc[:120],
        "word_count": word_count,
        "h1": h1s,
        "h2_count": len(h2s),
        "h2s": h2s[:8],
        "schema_types": schema_types,
        "has_aggregate_rating": has_aggregate_rating,
        "has_faq_schema": has_faq_schema,
        "has_geo": has_geo,
        "has_breadcrumb": has_breadcrumb,
        "has_person": has_person,
        "tel_links": tel_links,
        "estimate_links": estimate_links,
        "cta_count": cta_count,
        "has_phone_visible": has_phone_visible,
        "has_address": has_address,
        "has_map": has_map,
        "has_author": has_author,
        "has_founded": has_founded,
        "has_bbb": has_bbb,
        "faq_accordions": faq_visible,
        "has_local_refs": has_local_refs,
        "has_source_citations": has_source_citations,
    }


pages = [
    ("/", "Homepage"),
    ("/services/direct-mail/", "Direct Mail"),
    ("/services/data-lists/", "Data Lists"),
    ("/services/printing/", "Printing"),
    ("/services/mailing/", "Mailing"),
    ("/services/graphic-design/", "Graphic Design"),
    ("/services/eddm/", "EDDM"),
    ("/services/non-profit-mailing/", "Non-Profit Mailing"),
    ("/services/union-printing/", "Union Printing"),
    ("/services/web-design/", "Web Design"),
    ("/service-areas/ulster-county/", "Ulster County Hub"),
    ("/service-areas/dutchess-county/", "Dutchess County Hub"),
    ("/service-areas/orange-county/", "Orange County Hub"),
    ("/service-areas/ulster-county/new-paltz/", "New Paltz"),
    ("/service-areas/ulster-county/kingston/", "Kingston"),
    ("/service-areas/dutchess-county/poughkeepsie/", "Poughkeepsie"),
    ("/service-areas/orange-county/newburgh/", "Newburgh"),
    ("/service-areas/ulster-county/woodstock/", "Woodstock"),
]

results = []
for url, label in pages:
    data = extract_page(url)
    data["label"] = label
    results.append(data)
    
    issues = []
    if not data.get("has_aggregate_rating"): issues.append("NO AggregateRating")
    if not data.get("has_author"): issues.append("NO author byline")
    if data.get("cta_count", 0) < 6: issues.append(f"LOW CTAs ({data.get('cta_count',0)})")
    if not data.get("has_local_refs"): issues.append("NO local refs")
    if not data.get("has_founded"): issues.append("NO founding year")
    if not data.get("has_phone_visible"): issues.append("NO phone visible")
    if data.get("word_count", 0) < 500: issues.append(f"THIN ({data.get('word_count',0)} words)")
    if url.startswith("/service-areas/") and not data.get("has_map"): issues.append("NO map embed")
    if url.startswith("/service-areas/") and not data.get("has_geo"): issues.append("NO GeoCoordinates schema")
    if not data.get("has_faq_schema") and data.get("faq_accordions", 0) > 0: issues.append("FAQs visible but NO FAQPage schema")
    if data.get("faq_accordions", 0) > 0 and not data.get("has_faq_schema"): pass
    
    status = "PASS" if len(issues) <= 1 else ("MINOR" if len(issues) <= 3 else "NEEDS WORK")
    
    print(f"\n{'='*70}")
    print(f"  {label} — {url}")
    print(f"  Title: {data.get('title','?')}")
    print(f"  Words: {data.get('word_count',0)} | H2s: {data.get('h2_count',0)} | CTAs: {data.get('cta_count',0)}")
    print(f"  Schema: {', '.join(data.get('schema_types',[]))}")
    print(f"  AggRating: {'Y' if data.get('has_aggregate_rating') else 'N'} | Author: {'Y' if data.get('has_author') else 'N'} | Map: {'Y' if data.get('has_map') else 'N'} | FAQSchema: {'Y' if data.get('has_faq_schema') else 'N'}")
    print(f"  Phone: {'Y' if data.get('has_phone_visible') else 'N'} | Address: {'Y' if data.get('has_address') else 'N'} | Local: {'Y' if data.get('has_local_refs') else 'N'} | Founded: {'Y' if data.get('has_founded') else 'N'} | BBB: {'Y' if data.get('has_bbb') else 'N'}")
    print(f"  Sources: {'Y' if data.get('has_source_citations') else 'N'} | GeoCoords: {'Y' if data.get('has_geo') else 'N'} | Breadcrumb: {'Y' if data.get('has_breadcrumb') else 'N'}")
    if issues:
        print(f"  STATUS: {status}")
        for iss in issues:
            print(f"    ❌ {iss}")
    else:
        print(f"  STATUS: PASS ✅")

with open("tools/eeat_audit_results.json", "w") as f:
    json.dump(results, f, indent=2)
print(f"\n\nFull results saved to tools/eeat_audit_results.json")
