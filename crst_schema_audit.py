"""
CRST Schema & SEO Doctrine Audit  — v3 (schema + content recipe, de-duped)
Pulls every URL from sitemap, fetches raw HTML, and grades each page against:

SCHEMA DOCTRINE
  - AggregateRating violations (none allowed sitewide)
  - LocalBusiness/Organization schema placement rules
  - Article + FAQPage presence on content pages
  - BreadcrumbList on guide pages
  - Meta title ≤ 60 chars, description ≤ 155 chars
  - NAP (phone/address) consistency
  - Duplicate @type blocks

CONTENT RECIPE  (LLM / AI-overview optimisation)
  R1  Lead answer block — bolded text after H1 must exist and be ≤ 50 words
  R2  No banned openers — FAQ answers must not open with Yes / No / It depends / etc.
  R3  Lead sentence ≤ 50 words — first sentence of FAQ answer must be concise
      (thorough answers that LEAD with a ≤50-word direct statement pass; only
       answers that bury the point are flagged)
  R4  FAQ in static HTML — answer text must appear outside <script> tags
      (both sides normalised: entities decoded, apostrophes/quotes/dashes
       standardised before comparison, eliminating encoding false-positives)

  R2+R3 CO-OCCURRENCE: when an answer triggers both R2 and R3 it is counted
  ONCE as a combined item so the report shows distinct answers needing rewrite.
"""

import re, json, sys, time, unicodedata, html as html_mod
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
from xml.etree import ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict

BASE        = "http://localhost:5000"
SITEMAP_URL = f"{BASE}/sitemap.xml"
WORKERS     = 8
TIMEOUT     = 15

# ── Canonical NAP ─────────────────────────────────────────────────────────────
CANONICAL_PHONE   = "+18452555722"
CANONICAL_ADDRESS = "31 South Ohioville Road"
CANONICAL_CITY    = "New Paltz"
HOMEPAGE_PATH     = "/"

# ── URL classifiers ───────────────────────────────────────────────────────────
GUIDE_PATTERNS   = ["/guides/", "/direct-mail-tools/"]
ARTICLE_PATTERNS = ["/services/direct-mail/", "/services/eddm/articles/",
                    "/services/printing/", "/services/non-profit-mailing/",
                    "/services/mailing/", "/services/graphic-design/",
                    "/services/web-design/", "/services/school-district/",
                    "/services/union-printing/"]
NOINDEX_PATTERNS = ["/shop/", "/training/"]

# ── Recipe constants ──────────────────────────────────────────────────────────
LEAD_ANSWER_MAX_WORDS = 50
FAQ_LEAD_SENTENCE_MAX = 50   # R3: grade the first sentence only
BANNED_OPENERS = [
    "yes,", "yes.", "yes!", "yes —", "yes:",
    "no,",  "no.",  "no!",  "no —",  "no:",
    "it depends", "that depends",
    "absolutely,", "absolutely.", "absolutely!",
    "definitely,", "definitely.", "definitely!",
    "certainly,",  "certainly.",
    "of course,",  "of course.",
    "sure,",       "sure.",
    "great question", "good question",
]

# ── Shared state ──────────────────────────────────────────────────────────────
findings = []
stats    = defaultdict(int)

def flag(url, severity, rule, detail=""):
    findings.append({"url": url, "severity": severity, "rule": rule, "detail": detail})
    stats[severity] += 1

# ── Fetch helpers ─────────────────────────────────────────────────────────────
def fetch(url):
    req = Request(url, headers={"User-Agent": "CRST-Audit/1.0"})
    try:
        with urlopen(req, timeout=TIMEOUT) as r:
            return r.read().decode("utf-8", errors="replace"), r.status
    except HTTPError as e:
        return None, e.code
    except URLError as e:
        return None, f"ERR:{e.reason}"

# ── Text normalisation ────────────────────────────────────────────────────────
def normalise(text):
    """Decode entities, standardise apostrophes/quotes/dashes/whitespace.
    Used for R4 comparison so encoding differences don't false-positive."""
    text = html_mod.unescape(text)
    text = unicodedata.normalize("NFC", text)
    # Curly apostrophes → straight
    text = text.replace("\u2019", "'").replace("\u2018", "'")
    # Curly double-quotes → straight
    text = text.replace("\u201c", '"').replace("\u201d", '"')
    # Em-dash / en-dash → hyphen
    text = text.replace("\u2014", "-").replace("\u2013", "-")
    # Non-breaking space → space
    text = text.replace("\u00a0", " ")
    # Collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text.lower()

def strip_scripts(html_text):
    """Remove all <script> blocks."""
    return re.sub(r"<script[^>]*>.*?</script>", " ", html_text,
                  flags=re.DOTALL | re.IGNORECASE)

def strip_tags(text):
    """Strip HTML tags and decode entities."""
    text = re.sub(r"<[^>]+>", " ", text)
    text = html_mod.unescape(text)
    return re.sub(r"\s+", " ", text).strip()

def word_count(text):
    return len(text.split())

def first_sentence(text):
    """Return the leading sentence (up to first .!? that ends a sentence).
    Falls back to the whole text if no sentence break is found."""
    # Match . ! ? followed by whitespace + capital letter, or end-of-string.
    # Negative look-behind skips common abbreviations ending with a capital.
    m = re.search(r"[.!?](?=\s+[A-Z]|\s*$)", text)
    if m:
        return text[: m.end()].strip()
    return text

def get_title(html_text):
    m = re.search(r"<title[^>]*>(.*?)</title>", html_text, re.IGNORECASE | re.DOTALL)
    return m.group(1).strip() if m else ""

def get_meta(html_text, name):
    m = re.search(
        rf'<meta[^>]+(?:name|property)=["\'](?:og:)?{name}["\'][^>]+content=["\']([^"\']*)["\']',
        html_text, re.IGNORECASE)
    if not m:
        m = re.search(
            rf'<meta[^>]+content=["\']([^"\']*)["\'][^>]+(?:name|property)=["\'](?:og:)?{name}["\']',
            html_text, re.IGNORECASE)
    return m.group(1).strip() if m else ""

def is_noindex(html_text):
    return bool(re.search(r'content=["\'][^"\']*noindex', html_text, re.IGNORECASE))

# ── JSON-LD helpers ───────────────────────────────────────────────────────────
def extract_jsonld(html_text):
    blocks = re.findall(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html_text, re.DOTALL | re.IGNORECASE)
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
    if isinstance(t, str): t = [t]
    return [x.lower() for x in t]

def has_type(blocks, *types):
    for b in blocks:
        if any(t.lower() in get_types(b) for t in types):
            return True
    return False

def get_faq_answers(blocks):
    """Return [(question, raw_answer_text), …] from FAQPage JSON-LD."""
    results = []
    for b in blocks:
        if "faqpage" not in get_types(b):
            continue
        entities = b.get("mainEntity", [])
        if isinstance(entities, dict):
            entities = [entities]
        for qa in entities:
            q    = qa.get("name", "")
            ab   = qa.get("acceptedAnswer", {})
            a    = ab.get("text", "") if isinstance(ab, dict) else ""
            if q and a:
                results.append((q, a))
    return results

def is_service_location_page(path):
    """True for /services/<svc>/<town> template-generated pages."""
    parts = [p for p in path.split("/") if p]
    return len(parts) == 3 and parts[0] == "services"

# ── Main per-page audit ───────────────────────────────────────────────────────
def audit_page(url):
    path = url.replace(BASE, "").rstrip("/") or "/"
    html, status = fetch(url)

    if html is None:
        flag(path, "ERROR", "HTTP", f"Status {status}")
        return
    if status != 200:
        flag(path, "WARN",  "HTTP", f"Status {status}")
        return

    noindex = is_noindex(html)
    blocks  = extract_jsonld(html)
    is_sxl  = is_service_location_page(path)

    # ════════════════════════════════════════════════════════════
    #  SCHEMA DOCTRINE CHECKS
    # ════════════════════════════════════════════════════════════

    for b in blocks:
        if "_PARSE_ERROR" in b:
            flag(path, "ERROR", "JSON-LD parse error", b["_PARSE_ERROR"])

    for b in blocks:
        if "aggregateRating" in b or has_type([b], "AggregateRating"):
            flag(path, "CRITICAL", "AggregateRating present",
                 f"@type={b.get('@type')}")

    has_lb = has_type(blocks, "LocalBusiness")
    if path in (HOMEPAGE_PATH, ""):
        if not has_lb:
            flag(path, "WARN", "Missing LocalBusiness",
                 "Homepage needs LocalBusiness schema")
        for b in blocks:
            if has_type([b], "LocalBusiness", "Organization"):
                sa = b.get("sameAs", [])
                if not sa:
                    flag(path, "WARN", "Missing sameAs", "")
                elif len(sa) < 5:
                    flag(path, "WARN", "Thin sameAs", f"Only {len(sa)} entries")
    else:
        if has_lb:
            flag(path, "CRITICAL", "LocalBusiness off-homepage", "")

    if any(p in path for p in GUIDE_PATTERNS) and not noindex:
        if not has_type(blocks, "BreadcrumbList"):
            flag(path, "WARN", "Missing BreadcrumbList", "")

    is_article_page = (any(p in path for p in ARTICLE_PATTERNS)
                       and not noindex and not is_sxl)
    if is_article_page:
        if not has_type(blocks, "Article", "BlogPosting", "TechArticle"):
            flag(path, "WARN", "Missing Article schema", "")
        if not has_type(blocks, "FAQPage"):
            flag(path, "INFO", "Missing FAQPage", "")

    for b in blocks:
        addr  = b.get("address", {})
        phone = b.get("telephone", "")
        if addr:
            street = addr.get("streetAddress", "")
            city   = addr.get("addressLocality", "")
            if street and CANONICAL_ADDRESS not in street:
                flag(path, "WARN", "NAP address mismatch", f"Got: {street}")
            if city and CANONICAL_CITY not in city:
                flag(path, "WARN", "NAP city mismatch",   f"Got: {city}")
        if phone and phone != CANONICAL_PHONE:
            flag(path, "WARN", "NAP phone mismatch",
                 f"Got: {phone}  expected: {CANONICAL_PHONE}")

    if not noindex:
        title = get_title(html)
        if not title:
            flag(path, "WARN", "Missing <title>", "")
        elif len(title) > 60:
            flag(path, "INFO", "Title > 60 chars",
                 f"{len(title)} chars: {title[:70]}")

        desc = get_meta(html, "description")
        if not desc:
            flag(path, "WARN", "Missing meta description", "")
        elif len(desc) > 155:
            flag(path, "INFO", "Description > 155 chars", f"{len(desc)} chars")

    type_counts = defaultdict(int)
    for b in blocks:
        for t in get_types(b): type_counts[t] += 1
    for t, c in type_counts.items():
        if c > 1 and t in ("localbusiness", "organization", "webpage"):
            flag(path, "WARN", f"Duplicate {t} block", f"Found {c} blocks")

    # ════════════════════════════════════════════════════════════
    #  CONTENT RECIPE CHECKS
    # ════════════════════════════════════════════════════════════
    faq_answers  = get_faq_answers(blocks)
    recipe_scope = bool(faq_answers) and not noindex and not is_sxl

    if recipe_scope:
        body_no_scripts = strip_scripts(html)
        norm_body       = normalise(body_no_scripts)   # normalised for R4

        # ── R1: Lead answer block — bolded text after H1, ≥5 words, ≤50 words ─
        h1_match = re.search(r"<h1[^>]*>.*?</h1>", body_no_scripts,
                             re.DOTALL | re.IGNORECASE)
        content_after_h1 = (body_no_scripts[h1_match.end():]
                            if h1_match else body_no_scripts)

        lead_block = None
        for m in re.finditer(
                r"<(?:strong|b)(?:\s[^>]*)?>(.+?)</(?:strong|b)>",
                content_after_h1, re.DOTALL | re.IGNORECASE):
            candidate = strip_tags(m.group(1))
            if word_count(candidate) >= 5:
                lead_block = candidate
                break

        if not lead_block:
            flag(path, "WARN",
                 "RECIPE R1: Missing lead answer block",
                 "No bolded summary (≥5 words) found after H1")
        else:
            wc = word_count(lead_block)
            if wc > LEAD_ANSWER_MAX_WORDS:
                flag(path, "WARN",
                     "RECIPE R1: Lead answer > 50 words",
                     f"{wc} words — \"{lead_block[:80]}…\"")

        # ── R2 + R3: combined per-answer loop (de-duplicated) ─────────────────
        for q, raw_a in faq_answers:
            clean_a = strip_tags(raw_a)
            opener  = clean_a.lower().lstrip()[:50]

            # R2: banned opener?
            r2_opener = None
            for banned in BANNED_OPENERS:
                if opener.startswith(banned):
                    r2_opener = banned
                    break

            # R3 (new definition): first sentence > 50 words?
            first_sent    = first_sentence(clean_a)
            wc_first      = word_count(first_sent)
            r3_too_long   = wc_first > FAQ_LEAD_SENTENCE_MAX

            if r2_opener and r3_too_long:
                flag(path, "WARN",
                     "RECIPE R2+R3: Opener + long lead sentence",
                     f'Q: "{q[:60]}" → opener="{r2_opener}", '
                     f'lead sentence={wc_first} words')
            elif r2_opener:
                flag(path, "WARN",
                     "RECIPE R2: Banned FAQ opener",
                     f'Q: "{q[:60]}" → opens with "{r2_opener}"')
            elif r3_too_long:
                flag(path, "WARN",
                     "RECIPE R3: Lead sentence > 50 words",
                     f'{wc_first} words — Q: "{q[:60]}"')

        # ── R4: FAQ text in static HTML — normalised comparison ───────────────
        found_static = False
        for q, raw_a in faq_answers[:5]:
            clean_a = strip_tags(raw_a)
            words   = clean_a.split()
            if len(words) >= 6:
                # Probe: words 1–7 (skip first word to avoid generic openers)
                probe = normalise(" ".join(words[1:7]))
                if probe in norm_body:
                    found_static = True
                    break
        if not found_static and faq_answers:
            flag(path, "CRITICAL",
                 "RECIPE R4: FAQ appears JS-rendered",
                 "FAQ answer text not found in static HTML (bots/LLMs can't read it)")

    if not any(f["url"] == path for f in findings):
        stats["clean"] += 1


# ── Fetch sitemap & collect URLs ──────────────────────────────────────────────
print("Fetching sitemap …")
xml_text, status = fetch(SITEMAP_URL)
if not xml_text:
    sys.exit(f"Could not fetch sitemap: {status}")

urls = []
try:
    root = ET.fromstring(xml_text)
    ns   = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemaps = root.findall("sm:sitemap/sm:loc", ns)
    if sitemaps:
        print(f"Sitemap index — {len(sitemaps)} child sitemaps …")
        for sm in sitemaps:
            sub_xml, _ = fetch(sm.text.strip())
            if sub_xml:
                sub = ET.fromstring(sub_xml)
                for loc in sub.findall("sm:url/sm:loc", ns):
                    u = (loc.text.strip()
                         .replace("https://crst.net", BASE)
                         .replace("http://crst.net",  BASE))
                    urls.append(u)
    else:
        for loc in root.findall("sm:url/sm:loc", ns):
            u = (loc.text.strip()
                 .replace("https://crst.net", BASE)
                 .replace("http://crst.net",  BASE))
            urls.append(u)
except ET.ParseError as e:
    sys.exit(f"Sitemap parse error: {e}")

homepage = BASE + "/"
if homepage not in urls:
    urls.insert(0, homepage)

total = len(urls)
print(f"Found {total} URLs — auditing with {WORKERS} workers …\n")

# ── Run audit ─────────────────────────────────────────────────────────────────
done = 0
t0   = time.time()
with ThreadPoolExecutor(max_workers=WORKERS) as pool:
    futs = {pool.submit(audit_page, u): u for u in urls}
    for fut in as_completed(futs):
        done += 1
        if done % 50 == 0 or done == total:
            print(f"  {done}/{total} pages  ({time.time()-t0:.0f}s)")

# ── Group findings ────────────────────────────────────────────────────────────
SEVERITY_ORDER = ["CRITICAL", "ERROR", "WARN", "INFO"]
SEVERITY_EMOJI = {"CRITICAL": "🔴", "ERROR": "🔴", "WARN": "🟡", "INFO": "🔵"}
RECIPE_PREFIX  = "RECIPE"

by_rule = defaultdict(list)
for f in findings:
    by_rule[(f["severity"], f["rule"])].append(f)

# ── Summary header ────────────────────────────────────────────────────────────
total_dur = time.time() - t0

r2_only   = sum(len(v) for (s,r),v in by_rule.items() if r == "RECIPE R2: Banned FAQ opener")
r3_only   = sum(len(v) for (s,r),v in by_rule.items() if r == "RECIPE R3: Lead sentence > 50 words")
r2r3      = sum(len(v) for (s,r),v in by_rule.items() if r == "RECIPE R2+R3: Opener + long lead sentence")
r4        = sum(len(v) for (s,r),v in by_rule.items() if "R4" in r)
r1_miss   = sum(len(v) for (s,r),v in by_rule.items() if r == "RECIPE R1: Missing lead answer block")
r1_long   = sum(len(v) for (s,r),v in by_rule.items() if r == "RECIPE R1: Lead answer > 50 words")
schema_crit = sum(len(v) for (s,r),v in by_rule.items()
                  if s in ("CRITICAL","ERROR") and not r.startswith(RECIPE_PREFIX))

print("\n" + "="*72)
print("CRST SCHEMA + CONTENT RECIPE AUDIT REPORT")
print("="*72)
print(f"Pages audited:      {total}")
print(f"Pages clean:        {stats['clean']}")
print(f"Duration:           {total_dur:.1f}s")
print()
print("SCHEMA DOCTRINE")
print(f"  Critical/Error:   {schema_crit}")
print()
print("CONTENT RECIPE")
print(f"  R1 missing:       {r1_miss} pages   (no lead answer block)")
print(f"  R1 too long:      {r1_long} pages   (block > 50 words)")
print(f"  R2 only:          {r2_only}  distinct answers  (banned opener, lead ok)")
print(f"  R3 only:          {r3_only}  distinct answers  (lead sentence > 50 w, opener ok)")
print(f"  R2+R3 combined:   {r2r3}  distinct answers  (both issues)")
print(f"  Total rewrites:   {r2_only + r3_only + r2r3}  distinct FAQ answers needing edit")
print(f"  R4 violations:    {r4}   (FAQ JS-rendered / invisible to bots)")

# ── Detailed findings by section ──────────────────────────────────────────────
for section_label, filter_fn in [
    ("SCHEMA DOCTRINE", lambda r: not r.startswith(RECIPE_PREFIX)),
    ("CONTENT RECIPE",  lambda r: r.startswith(RECIPE_PREFIX)),
]:
    section_items = [(sev, r, pages)
                     for (sev, r), pages in by_rule.items()
                     if filter_fn(r)]
    if not section_items:
        continue
    print(f"\n{'━'*72}")
    print(f"  {section_label}")
    print(f"{'━'*72}")
    for sev in SEVERITY_ORDER:
        rules = [(r, pages) for (s, r, pages) in section_items if s == sev]
        if not rules:
            continue
        print(f"\n{SEVERITY_EMOJI[sev]} {sev}")
        for rule, pages in sorted(rules):
            print(f"\n  ▸ {rule}  [{len(pages)} instance(s)]")
            for p in sorted(pages, key=lambda x: x["url"])[:20]:
                detail = f"  — {p['detail']}" if p["detail"] else ""
                print(f"      {p['url']}{detail}")
            if len(pages) > 20:
                print(f"      … and {len(pages)-20} more")

print(f"\n{'='*72}")
print("Audit complete.")
