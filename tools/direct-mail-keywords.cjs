const https = require('https');
const fs = require('fs');

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
const AUTH = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

function apiRequest(endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.dataforseo.com',
      path: endpoint,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        try { resolve(JSON.parse(chunks)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(data);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const SEEDS = {
  core: [
    'direct mail', 'direct mail services', 'direct mail marketing',
    'direct mail company', 'direct mail printing', 'direct mail advertising',
    'bulk mail services', 'direct mail campaigns', 'direct mail solutions',
    'direct mail fulfillment',
  ],
  vertical: [
    'direct mail for real estate', 'direct mail for real estate agents',
    'real estate direct mail', 'real estate direct mail marketing',
    'direct mail for contractors', 'contractor direct mail',
    'direct mail for restaurants', 'restaurant direct mail marketing',
    'direct mail for nonprofits', 'nonprofit direct mail services',
    'nonprofit bulk mailing', 'political direct mail',
    'political direct mail printing', 'political mailers',
    'direct mail for small business', 'small business direct mail marketing',
    'direct mail for dentists', 'direct mail for insurance agents',
    'direct mail for car dealerships', 'direct mail for attorneys',
    'direct mail for churches',
  ],
  commercial: [
    'direct mail printing services', 'direct mail company near me',
    'direct mail services near me', 'bulk mailing services near me',
    'hire a direct mail company', 'direct mail printing company',
    'direct mail service provider', 'affordable direct mail services',
    'direct mail pricing', 'direct mail cost per piece',
    'how much does direct mail cost',
  ],
  local: [
    'direct mail services New York', 'direct mail services Hudson Valley',
    'direct mail company New York', 'bulk mailing services New York',
    'direct mail printing New York', 'direct mail services NY',
  ],
  eddm: [
    'EDDM direct mail', 'every door direct mail services',
    'EDDM printing services', 'EDDM for real estate',
    'EDDM for restaurants', 'EDDM marketing',
  ],
  informational: [
    'direct mail response rates', 'direct mail vs email marketing',
    'direct mail ROI', 'how to start a direct mail campaign',
    'direct mail design tips', 'best direct mail formats',
    'direct mail tracking', 'direct mail letter vs postcard',
  ],
};

const ALL_SEEDS = [];
for (const [cat, kws] of Object.entries(SEEDS)) {
  for (const kw of kws) ALL_SEEDS.push({ keyword: kw, category: cat });
}

function isDirectMailRelated(kw) {
  const terms = ['direct mail', 'bulk mail', 'mailing', 'eddm', 'every door', 'postcard', 'mailer', 'mail campaign', 'mail marketing', 'mail service', 'mail print', 'mail company', 'mail fulfillment', 'mail advertis', 'political mail', 'nonprofit mail', 'mail piece', 'mail design', 'mail cost', 'mail roi', 'mail response', 'mail track', 'print and mail'];
  return terms.some(t => kw.includes(t));
}

async function phase1() {
  console.log(`\n=== PHASE 1: Seed keyword data (${ALL_SEEDS.length} keywords) ===`);
  const results = [];

  console.log('  Fetching search volume...');
  try {
    const resp = await apiRequest('/v3/keywords_data/google_ads/search_volume/live', [{
      keywords: ALL_SEEDS.map(s => s.keyword),
      language_code: 'en',
      location_code: 2840,
    }]);
    if (resp.tasks?.[0]?.result) {
      const items = resp.tasks[0].result;
      for (const b of ALL_SEEDS) {
        const match = items.find(it => it.keyword?.toLowerCase() === b.keyword.toLowerCase());
        results.push({
          keyword: match?.keyword || b.keyword,
          search_volume: match?.search_volume || 0,
          keyword_difficulty: 0,
          cpc: match?.cpc || 0,
          competition: match?.competition_level || 'N/A',
          category: b.category,
        });
      }
    }
  } catch (err) {
    console.error(`  Error: ${err.message}`);
    for (const b of ALL_SEEDS) results.push({ keyword: b.keyword, search_volume: 0, keyword_difficulty: 0, cpc: 0, competition: 'N/A', category: b.category });
  }

  const withVol = results.filter(r => r.search_volume > 0);
  console.log(`  ${results.length} keywords, ${withVol.length} with volume`);

  console.log('  Fetching keyword difficulty...');
  const needKD = withVol.map(r => r.keyword);
  for (let i = 0; i < needKD.length; i += 20) {
    const batch = needKD.slice(i, i + 20);
    try {
      const resp = await apiRequest('/v3/dataforseo_labs/google/bulk_keyword_difficulty/live', [{
        keywords: batch, language_name: 'English', location_code: 2840,
      }]);
      const items = resp.tasks?.[0]?.result?.[0]?.items || [];
      for (const item of items) {
        const r = results.find(r => r.keyword.toLowerCase() === item.keyword?.toLowerCase());
        if (r && item.keyword_difficulty !== undefined) r.keyword_difficulty = item.keyword_difficulty;
      }
    } catch (err) { console.error(`  KD error: ${err.message}`); }
    await sleep(800);
  }
  console.log('  Phase 1 complete');
  return results;
}

async function phase2(phase1Results) {
  console.log('\n=== PHASE 2: Keyword expansion ===');
  const top15 = [...phase1Results].sort((a, b) => b.search_volume - a.search_volume)
    .filter(r => r.search_volume > 0).slice(0, 15);
  const expanded = [];
  const existingKws = new Set(phase1Results.map(r => r.keyword.toLowerCase()));

  for (let i = 0; i < top15.length; i += 5) {
    const batch = top15.slice(i, i + 5);
    const keywords = batch.map(b => b.keyword);
    console.log(`  Batch: ${keywords.join(', ')}`);
    try {
      const resp = await apiRequest('/v3/dataforseo_labs/google/keyword_ideas/live', [{
        keywords, language_name: 'English', location_code: 2840,
        include_seed_keyword: false, limit: 50,
        filters: ['keyword_info.search_volume', '>', 10],
      }]);
      const items = resp.tasks?.[0]?.result?.[0]?.items || [];
      for (const item of items) {
        const kw = item.keyword?.toLowerCase();
        if (kw && !existingKws.has(kw) && isDirectMailRelated(kw)) {
          existingKws.add(kw);
          expanded.push({
            keyword: item.keyword,
            search_volume: item.keyword_info?.search_volume || 0,
            keyword_difficulty: item.keyword_properties?.keyword_difficulty || 0,
            cpc: item.keyword_info?.cpc || 0,
            competition: item.keyword_info?.competition_level || 'N/A',
            category: 'expanded',
          });
        }
      }
    } catch (err) { console.error(`  Error: ${err.message}`); }
    await sleep(1000);
  }
  console.log(`  Phase 2 complete: ${expanded.length} new keywords`);
  return expanded;
}

async function phase3(allResults) {
  console.log('\n=== PHASE 3: SERP competitor check ===');
  const top20 = [...allResults].sort((a, b) => b.search_volume - a.search_volume)
    .filter(r => r.search_volume > 0).slice(0, 20);
  const serpData = {};

  for (let i = 0; i < top20.length; i++) {
    const kw = top20[i];
    console.log(`  ${i+1}/20: "${kw.keyword}" (${kw.search_volume})`);
    try {
      const resp = await apiRequest('/v3/serp/google/organic/live/regular', [{
        keyword: kw.keyword, language_code: 'en', location_code: 2840, depth: 10,
      }]);
      const items = resp.tasks?.[0]?.result?.[0]?.items || [];
      const domains = items.filter(it => it.type === 'organic').slice(0, 3)
        .map(it => { try { return new URL(it.url).hostname; } catch { return ''; } });
      serpData[kw.keyword.toLowerCase()] = {
        topDomains: domains.join(', '),
        localPack: items.some(it => it.type === 'local_pack' || it.type === 'maps') ? 'yes' : 'no',
      };
    } catch (err) { console.error(`  Error: ${err.message}`); }
    await sleep(1200);
  }
  console.log(`  Phase 3 complete: ${Object.keys(serpData).length} SERPs`);
  return serpData;
}

function generateCSV(allResults, serpData) {
  const header = 'keyword,search_volume,keyword_difficulty,cpc,competition,category,serp_top_3_domains,local_pack_present';
  const rows = [...allResults].sort((a, b) => b.search_volume - a.search_volume).map(r => {
    const serp = serpData[r.keyword.toLowerCase()] || {};
    return `"${r.keyword}",${r.search_volume},${r.keyword_difficulty},${(r.cpc||0).toFixed(2)},${r.competition},${r.category},"${serp.topDomains || ''}",${serp.localPack || ''}`;
  });
  return header + '\n' + rows.join('\n');
}

function generateSummary(allResults, serpData) {
  const sorted = [...allResults].sort((a, b) => b.search_volume - a.search_volume);
  const wv = sorted.filter(r => r.search_volume > 0);

  let md = '# Direct Mail Keyword Research — Summary Report\n\n';
  md += `Generated: ${new Date().toISOString().split('T')[0]}\n`;
  md += `Total keywords: ${allResults.length} | With volume: ${wv.length}\n\n`;

  md += '## 1. Top 20 Keywords by Volume\n\n';
  md += '| Keyword | Volume | KD | CPC | Competition |\n|---------|--------|-----|------|-------------|\n';
  wv.slice(0, 20).forEach(r => { md += `| ${r.keyword} | ${r.search_volume} | ${r.keyword_difficulty} | $${(r.cpc||0).toFixed(2)} | ${r.competition} |\n`; });

  md += '\n## 2. Top 10 Quick Wins (100+ Vol, KD < 60)\n\n';
  const qw = wv.filter(r => r.search_volume >= 100 && r.keyword_difficulty < 60).sort((a,b) => a.keyword_difficulty - b.keyword_difficulty).slice(0, 10);
  md += '| Keyword | Volume | KD | CPC |\n|---------|--------|-----|------|\n';
  qw.forEach(r => { md += `| ${r.keyword} | ${r.search_volume} | ${r.keyword_difficulty} | $${(r.cpc||0).toFixed(2)} |\n`; });
  if (!qw.length) md += '| (none) | — | — | — |\n';

  md += '\n## 3. Vertical Breakdown\n\n';
  const vg = {};
  allResults.filter(r => r.category === 'vertical').forEach(r => {
    const kw = r.keyword.toLowerCase();
    let ind = 'Other';
    if (kw.includes('real estate')) ind = 'Real Estate';
    else if (kw.includes('contractor')) ind = 'Contractors';
    else if (kw.includes('restaurant')) ind = 'Restaurants';
    else if (kw.includes('nonprofit') || kw.includes('non-profit')) ind = 'Nonprofits';
    else if (kw.includes('political')) ind = 'Political';
    else if (kw.includes('small business')) ind = 'Small Business';
    else if (kw.includes('dentist')) ind = 'Dentists';
    else if (kw.includes('insurance')) ind = 'Insurance';
    else if (kw.includes('car dealer')) ind = 'Car Dealerships';
    else if (kw.includes('attorney')) ind = 'Attorneys';
    else if (kw.includes('church')) ind = 'Churches';
    if (!vg[ind]) vg[ind] = { vol: 0, kws: [] };
    vg[ind].vol += r.search_volume; vg[ind].kws.push(r);
  });
  md += '| Industry | Combined Vol | # KWs | Avg KD |\n|----------|-------------|-------|--------|\n';
  Object.entries(vg).sort((a,b) => b[1].vol - a[1].vol).forEach(([ind, d]) => {
    const avg = d.kws.length ? Math.round(d.kws.reduce((s,k) => s + k.keyword_difficulty, 0) / d.kws.length) : 0;
    md += `| ${ind} | ${d.vol} | ${d.kws.length} | ${avg} |\n`;
  });

  md += '\n## 4. Local Intent Signals\n\n';
  const lp = Object.entries(serpData).filter(([,d]) => d.localPack === 'yes');
  if (lp.length) { md += '| Keyword | Local Pack |\n|---------|------------|\n'; lp.forEach(([kw]) => { md += `| ${kw} | yes |\n`; }); }
  else md += 'No local pack results detected in top 20.\n';

  md += '\n## 5. Recommended Build List (Vol > 50, KD < 60)\n\n';
  const bc = wv.filter(r => r.search_volume > 50 && r.keyword_difficulty < 60 && ['vertical','commercial','eddm'].includes(r.category))
    .sort((a,b) => b.search_volume - a.search_volume);
  if (bc.length) {
    md += '| Keyword | Volume | KD | CPC | Category |\n|---------|--------|-----|------|----------|\n';
    bc.forEach(r => { md += `| ${r.keyword} | ${r.search_volume} | ${r.keyword_difficulty} | $${(r.cpc||0).toFixed(2)} | ${r.category} |\n`; });
  } else md += 'No candidates meeting both thresholds.\n';

  md += '\n## 6. Blog Content Opportunities (Informational/Expanded, 100+ Vol)\n\n';
  const bo = wv.filter(r => ['informational','expanded'].includes(r.category) && r.search_volume >= 100).sort((a,b) => b.search_volume - a.search_volume);
  if (bo.length) {
    md += '| Keyword | Volume | KD | CPC |\n|---------|--------|-----|------|\n';
    bo.slice(0,20).forEach(r => { md += `| ${r.keyword} | ${r.search_volume} | ${r.keyword_difficulty} | $${(r.cpc||0).toFixed(2)} |\n`; });
  } else md += 'No informational terms with 100+ volume.\n';

  md += '\n## 7. SERP Competitor Landscape\n\n';
  md += '| Keyword | Volume | Top 3 Domains | Local Pack |\n|---------|--------|---------------|------------|\n';
  wv.slice(0,20).forEach(r => {
    const s = serpData[r.keyword.toLowerCase()] || {};
    md += `| ${r.keyword} | ${r.search_volume} | ${s.topDomains || 'N/A'} | ${s.localPack || 'N/A'} |\n`;
  });

  return md;
}

async function main() {
  console.log('Direct Mail Keyword Research');
  if (!LOGIN || !PASSWORD) { console.error('Missing credentials'); process.exit(1); }

  const p1 = await phase1();
  fs.writeFileSync('/home/runner/workspace/direct-mail-keyword-research.csv', generateCSV(p1, {}));
  console.log('  (interim CSV saved after Phase 1)');

  const p2 = await phase2(p1);
  const all = [...p1, ...p2];
  fs.writeFileSync('/home/runner/workspace/direct-mail-keyword-research.csv', generateCSV(all, {}));
  console.log('  (interim CSV saved after Phase 2)');

  const serpData = await phase3(all);

  fs.writeFileSync('/home/runner/workspace/direct-mail-keyword-research.csv', generateCSV(all, serpData));
  fs.writeFileSync('/home/runner/workspace/direct-mail-keyword-summary.md', generateSummary(all, serpData));
  console.log('\nFinal files saved!');
  console.log(`Total: ${all.length} keywords, ${all.filter(r => r.search_volume > 0).length} with volume`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
