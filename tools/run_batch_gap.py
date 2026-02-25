import os, json, requests
from bs4 import BeautifulSoup
import anthropic

client = anthropic.Anthropic(api_key=os.environ.get("Claude_API_Key"))

def fetch(url, max_chars=8000):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    try:
        r = requests.get(url, headers=headers, timeout=20)
        soup = BeautifulSoup(r.text, "html.parser")
        for t in soup(["script","style","nav","footer","header","noscript"]): t.decompose()
        text = " ".join(soup.get_text(separator=" ", strip=True).split())[:max_chars]
        return r.status_code, text
    except Exception as e:
        return 0, ""

def extract(label, text):
    prompt = f'Extract all entities a Google NLP model would identify from this page. Categories: ORGANIZATION, CONCEPT, PROCESS, FORM, ELIGIBILITY, LOCATION, OTHER. Return ONLY a JSON array: [{{"name":"...","category":"...","importance":"HIGH|MEDIUM|LOW"}}]\n\nPAGE ({label}):\n{text[:7000]}'
    msg = client.messages.create(model="claude-opus-4-6", max_tokens=2500, messages=[{"role":"user","content":prompt}])
    raw = msg.content[0].text.strip()
    if "```" in raw:
        parts = raw.split("```"); raw = parts[1]
        if raw.startswith("json"): raw = raw[4:]
    raw = raw.strip()
    start = raw.find("["); end = raw.rfind("]") + 1
    return json.loads(raw[start:end]) if start >= 0 else []

def gaps(crst_ents, comp_ents):
    crst_set = {e["name"].lower() for e in crst_ents}
    result = {}
    for e in comp_ents:
        if e["name"].lower() not in crst_set and e["importance"] in ["HIGH","MEDIUM"]:
            cat = e["category"]
            if cat not in result: result[cat] = []
            if not any(x["name"].lower() == e["name"].lower() for x in result[cat]):
                result[cat].append({"name":e["name"],"importance":e["importance"]})
    return result

def print_gaps(g):
    for cat, items in g.items():
        hi = [i for i in items if i["importance"]=="HIGH"]
        med = [i for i in items if i["importance"]=="MEDIUM"]
        if hi or med:
            print(f"  [{cat}]")
            for i in hi: print(f"    \u2605 {i['name']}")
            for i in med: print(f"    \u00b7 {i['name']}")

# --- PERMITS ---
print("=== PAGE 1: PERMITS ===")
_, crst1 = fetch("https://crst.net/direct-mail-tools/cornerstone-mailing-permits/")
_, comp1 = fetch("https://pe.usps.com/text/dmm300/604.htm")
e_crst1 = extract("CRST_permits", crst1)
e_comp1 = extract("DMM604", comp1)
g1 = gaps(e_crst1, e_comp1)
print(f"CRST: {len(e_crst1)} entities | Competitor: {len(e_comp1)} entities")
print_gaps(g1)

# --- PERIODICALS ---
print("\n=== PAGE 2: PERIODICALS ===")
_, crst2 = fetch("https://crst.net/resources/understanding-periodicals/")
_, comp2 = fetch("https://pe.usps.com/text/dmm300/207.htm", max_chars=9000)
e_crst2 = extract("CRST_periodicals", crst2)
e_comp2 = extract("DMM207", comp2)
g2 = gaps(e_crst2, e_comp2)
print(f"CRST: {len(e_crst2)} entities | Competitor: {len(e_comp2)} entities")
print_gaps(g2)

# --- POSTAGE REFUND ---
print("\n=== PAGE 3: POSTAGE REFUND ===")
_, crst3 = fetch("https://crst.net/how-to-get-a-refund-on-postage-a-guide-to-post-office-application-to-refund-postage/")
_, comp3 = fetch("https://pe.usps.com/text/dmm300/604.htm", max_chars=9000)
e_crst3 = extract("CRST_refund", crst3)
e_comp3 = extract("DMM604_refund", comp3)
g3 = gaps(e_crst3, e_comp3)
print(f"CRST: {len(e_crst3)} entities | Competitor: {len(e_comp3)} entities")
print_gaps(g3)

# --- INFORMED DELIVERY ---
print("\n=== PAGE 4: INFORMED DELIVERY (new page - competitor research) ===")
_, comp4 = fetch("https://www.usps.com/business/informed-delivery.htm")
e_comp4 = extract("USPS_informed_delivery", comp4)
print(f"Competitor entities ({len(e_comp4)}):")
for e in sorted(e_comp4, key=lambda x:(0 if x["importance"]=="HIGH" else 1,x["name"])):
    if e["importance"] in ["HIGH","MEDIUM"]:
        flag = "\u2605" if e["importance"]=="HIGH" else "\u00b7"
        print(f"  {flag} [{e['category']:<12}] {e['name']}")

with open("tools/gap_results_batch2.json","w") as f:
    json.dump({"permits":g1,"periodicals":g2,"refund":g3,"informed_delivery_competitor":e_comp4},f,indent=2)
print("\nDone. Saved to tools/gap_results_batch2.json")
