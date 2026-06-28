"""
CRST Schema & SEO Doctrine Audit
Pulls every URL from sitemap, fetches raw HTML, and grades each page against:
  - AggregateRating violations (none allowed sitewide)
  - LocalBusiness/Organization schema placement rules
  - Article + FAQPage presence on content pages
  - BreadcrumbList on guide pages
  - sameAs only on homepage Organization
  - Meta title ≤ 60 chars, description ≤ 155 chars
  - NAP (phone/address) consistency
  - Duplicate @type blocks
"""

import re, json, sys, time
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
from xml.etree import ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict

BASE   = "http://localhost:5000"
SITEMAP_URL = f"{BASE}/sitemap.xml"
WORKERS = 8
TIMEOUT = 15

# ── Expected canonical values ─────────────────────────────────────────────────
CANONICAL_PHONE   = "+18452555722"
CANONICAL_ADDRESS = "31 South Ohioville Road"
CANONICAL_CITY    = "New Paltz"
HOMEPAGE_PATH     = "/"

# URL patterns that should have certain schema types
GUIDE_PATTERNS  = ["/guides/", "/direct-mail-tools/"]
ARTICLE_PATTERNS = ["/services/direct-mail/", "/services/eddm/articles/",
                    "/services/printing/", "/services/non-profit-mailing/",
                    "/services/mailing/", "/services/graphic-design/",
                    "/services/web-design/", "/services/school-district/",
                    "/services/union-printing/"]

NOINDEX_PATTERNS = ["/shop/", "/training/"]  # pages expected to be noindex

findings = []  # list of dicts: {url, severity, rule, detail}
stats = defaultdict(int)

def flag(url, severity, rule, detail):
    findings.append({"url": url, "severity": severity, "rule": rule, "detail": detail})
    stats[severity] += 1

def fetch(url):
    req = Request(url, headers={"User-Agent": "CRST-Audit/1.0"})
    try:
        with urlopen(req, timeout=TIMEOUT) as r:
            return r.read().decode("utf-8", errors="replace"), r.status
    except HTTPError as e:
        return None, e.code
    except URLError as e:
        return None, f"ERR:{e.reason}"

def extract_jsonld(html):
    blocks = re.findall(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html, re.DOTALL | re.IGNORECASE
    )
    parsed = []
    for b in blocks:
        try:
            d = json.loads(b.strip())
            if isinstance(d, dict) and "@graph" in d:
                parsed.extend(d["@graph"])
            elif isinstance(d, list):
                parsed.extend(d)
            else:
                parsed.append(d)
        except json.JSONDecodeError:
            parsed.append({"_PARSE_ERROR": b[:80]})
    return parsed

def get_types(block):
    t = block.get("@type", [])
    if isinstance(t, str):
        t = [t]
    return [x.lower() for x in t]

def has_type(blocks, *types):
    for b in blocks:
        bt = get_types(b)
        if any(t.lower() in bt for t in types):
            return True
    return False

def get_meta(html, name):
    m = re.search(
        rf'<meta[^>]+(?:name|property)=["\'](?:og:)?{name}["\'][^>]+content=["\']([^"\']*)["\']',
        html, re.IGNORECASE
    )
    if not m:
        m = re.search(
            rf'<meta[^>]+content=["\']([^"\']*)["\'][^>]+(?:name|property)=["\'](?:og:)?{name}["\']',
            html, re.IGNORECASE
        )
    return m.group(1).strip() if m else ""

def get_title(html):
    m = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    return m.group(1).strip() if m else ""

def is_noindex(html):
    return bool(re.search(r'content=["\'][^"\']*noindex', html, re.IGNORECASE))

def audit_page(url):
    path = url.replace(BASE, "").rstrip("/") or "/"
    html, status = fetch(url)

    if html is None:
        flag(path, "ERROR", "HTTP", f"Status {status}")
        return

    if status != 200:
        flag(path, "WARN", "HTTP", f"Status {status}")
        return

    noindex = is_noindex(html)
    blocks  = extract_jsonld(html)

    # ── Parse errors ─────────────────────────────────────────────────────────
    for b in blocks:
        if "_PARSE_ERROR" in b:
            flag(path, "ERROR", "JSON-LD parse error", b["_PARSE_ERROR"])

    # ── AggregateRating — NEVER allowed anywhere ───────────────────────────
    for b in blocks:
        if "aggregateRating" in b or has_type([b], "AggregateRating"):
            flag(path, "CRITICAL", "AggregateRating present", f"Found in block @type={b.get('@type')}")

    # ── LocalBusiness — homepage only ─────────────────────────────────────
    has_lb = has_type(blocks, "LocalBusiness")
    if path == HOMEPAGE_PATH or path == "":
        if not has_lb:
            flag(path, "WARN", "Missing LocalBusiness", "Homepage should have LocalBusiness schema")
        # Check sameAs on homepage
        for b in blocks:
            if has_type([b], "LocalBusiness", "Organization"):
                sa = b.get("sameAs", [])
                if not sa:
                    flag(path, "WARN", "Missing sameAs", "No sameAs on Organization/LocalBusiness")
                elif len(sa) < 5:
                    flag(path, "WARN", "Thin sameAs", f"Only {len(sa)} sameAs URLs")
    else:
        if has_lb:
            flag(path, "CRITICAL", "LocalBusiness off-homepage", "LocalBusiness schema should only appear on homepage")

    # ── Guide pages — BreadcrumbList ──────────────────────────────────────
    is_guide = any(p in path for p in GUIDE_PATTERNS)
    if is_guide and not noindex:
        if not has_type(blocks, "BreadcrumbList"):
            flag(path, "WARN", "Missing BreadcrumbList", "Guide pages should have BreadcrumbList")

    # ── Article/content pages — Article + FAQPage ─────────────────────────
    is_article = any(p in path for p in ARTICLE_PATTERNS) and not noindex
    if is_article:
        if not has_type(blocks, "Article", "BlogPosting", "TechArticle"):
            flag(path, "WARN", "Missing Article schema", path)
        if not has_type(blocks, "FAQPage"):
            flag(path, "INFO", "Missing FAQPage", "Article pages should have FAQPage where applicable")

    # ── NAP consistency ───────────────────────────────────────────────────
    for b in blocks:
        addr = b.get("address", {})
        if addr:
            street = addr.get("streetAddress", "")
            city   = addr.get("addressLocality", "")
            if street and CANONICAL_ADDRESS not in street:
                flag(path, "WARN", "NAP address mismatch", f"Got: {street}")
            if city and CANONICAL_CITY not in city:
                flag(path, "WARN", "NAP city mismatch", f"Got: {city}")
        phone = b.get("telephone", "")
        if phone and phone != CANONICAL_PHONE:
            flag(path, "WARN", "NAP phone mismatch", f"Got: {phone} expected {CANONICAL_PHONE}")

    # ── Meta title length ─────────────────────────────────────────────────
    if not noindex:
        title = get_title(html)
        if not title:
            flag(path, "WARN", "Missing <title>", "")
        elif len(title) > 60:
            flag(path, "INFO", "Title > 60 chars", f"{len(title)} chars: {title[:70]}")

        desc = get_meta(html, "description")
        if not desc:
            flag(path, "WARN", "Missing meta description", "")
        elif len(desc) > 155:
            flag(path, "INFO", "Description > 155 chars", f"{len(desc)} chars")

    # ── Duplicate @type LocalBusiness / Organization ──────────────────────
    type_counts = defaultdict(int)
    for b in blocks:
        for t in get_types(b):
            type_counts[t] += 1
    for t, c in type_counts.items():
        if c > 1 and t in ("localbusiness", "organization", "webpage"):
            flag(path, "WARN", f"Duplicate {t} block", f"Found {c} blocks")

    # All good marker for stats
    page_issues = [f for f in findings if f["url"] == path]
    if not page_issues:
        stats["clean"] += 1

# ── Fetch sitemap & collect URLs ──────────────────────────────────────────────
print("Fetching sitemap …")
xml_text, status = fetch(SITEMAP_URL)
if not xml_text:
    sys.exit(f"Could not fetch sitemap: {status}")

# Handle sitemap index (multiple sitemaps)
urls = []
try:
    root = ET.fromstring(xml_text)
    ns   = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    # Is this a sitemap index?
    sitemaps = root.findall("sm:sitemap/sm:loc", ns)
    if sitemaps:
        print(f"Sitemap index with {len(sitemaps)} sitemaps — fetching each …")
        for sm in sitemaps:
            sub_xml, _ = fetch(sm.text.strip())
            if sub_xml:
                sub = ET.fromstring(sub_xml)
                for loc in sub.findall("sm:url/sm:loc", ns):
                    path_url = loc.text.strip().replace("https://crst.net", BASE).replace("http://crst.net", BASE)
                    urls.append(path_url)
    else:
        for loc in root.findall("sm:url/sm:loc", ns):
            path_url = loc.text.strip().replace("https://crst.net", BASE).replace("http://crst.net", BASE)
            urls.append(path_url)
except ET.ParseError as e:
    sys.exit(f"Sitemap XML parse error: {e}")

# Always include homepage even if not in sitemap
homepage = BASE + "/"
if homepage not in urls:
    urls.insert(0, homepage)

total = len(urls)
print(f"Found {total} URLs — auditing with {WORKERS} workers …\n")

# ── Run audit concurrently ────────────────────────────────────────────────────
done = 0
t0   = time.time()
with ThreadPoolExecutor(max_workers=WORKERS) as pool:
    futs = {pool.submit(audit_page, u): u for u in urls}
    for fut in as_completed(futs):
        done += 1
        if done % 50 == 0 or done == total:
            elapsed = time.time() - t0
            print(f"  {done}/{total} pages  ({elapsed:.0f}s elapsed)")

# ── Group & report ────────────────────────────────────────────────────────────
SEVERITY_ORDER = ["CRITICAL", "ERROR", "WARN", "INFO"]
SEVERITY_EMOJI = {"CRITICAL": "🔴", "ERROR": "🔴", "WARN": "🟡", "INFO": "🔵"}

by_rule = defaultdict(list)
for f in findings:
    by_rule[(f["severity"], f["rule"])].append(f)

print("\n" + "="*70)
print("CRST SCHEMA & SEO DOCTRINE AUDIT REPORT")
print("="*70)
print(f"Pages audited:  {total}")
print(f"Pages clean:    {stats['clean']}")
print(f"CRITICAL/ERROR: {stats['CRITICAL'] + stats['ERROR']}")
print(f"WARN:           {stats['WARN']}")
print(f"INFO:           {stats['INFO']}")
print(f"Duration:       {time.time()-t0:.1f}s")
print()

for sev in SEVERITY_ORDER:
    rules = [(r, pages) for (s, r), pages in by_rule.items() if s == sev]
    if not rules:
        continue
    print(f"{'─'*70}")
    print(f"{SEVERITY_EMOJI[sev]} {sev}  ({sum(len(p) for _, p in rules)} findings)")
    print(f"{'─'*70}")
    for rule, pages in sorted(rules):
        print(f"\n  ▸ {rule}  [{len(pages)} page(s)]")
        for p in sorted(pages, key=lambda x: x["url"])[:25]:
            detail = f"  — {p['detail']}" if p['detail'] else ""
            print(f"      {p['url']}{detail}")
        if len(pages) > 25:
            print(f"      … and {len(pages)-25} more")
    print()

print("="*70)
print("Audit complete.")
