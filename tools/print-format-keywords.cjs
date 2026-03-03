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
  postcard: [
    'postcard printing services', 'postcard printing near me',
    'custom postcard printing', 'bulk postcard printing',
    'postcard printing company', 'postcard mailing services',
  ],
  brochure: [
    'brochure printing services', 'brochure printing near me',
    'custom brochure printing', 'bulk brochure printing',
    'brochure design and printing', 'tri-fold brochure printing',
  ],
  'self-mailer': [
    'self-mailer printing', 'self-mailer printing services',
    'self-mailer design and print', 'folded self-mailer printing',
  ],
  newsletter: [
    'newsletter printing services', 'newsletter printing and mailing',
    'bulk newsletter printing', 'newsletter mailing services',
    'printed newsletter services',
  ],
  letter: [
    'letter printing and mailing services', 'bulk letter mailing services',
    'letter printing services', 'direct mail letter printing',
    'variable data letter printing',
  ],
  catalog: [
    'catalog printing services', 'catalog printing near me',
    'custom catalog printing', 'bulk catalog printing',
    'catalog printing and mailing',
  ],
  'business-card': [
    'business card printing services', 'business card printing near me',
    'custom business card printing', 'bulk business card printing',
  ],
  flyer: [
    'flyer printing services', 'flyer printing near me',
    'bulk flyer printing', 'flyer printing and mailing',
  ],
  local: [
    'postcard printing New York', 'brochure printing New York',
    'business card printing New York', 'printing services Hudson Valley',
    'printing services near me', 'commercial printing New York',
    'commercial printing Hudson Valley',
  ],
};

const ALL_SEEDS = [];
for (const [cat, kws] of Object.entries(SEEDS)) {
  for (const kw of kws) ALL_SEEDS.push({ keyword: kw, category: cat });
}

async function getVolumes() {
  console.log(`\nFetching search volume for ${ALL_SEEDS.length} keywords...`);
  const results = [];
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
  const wv = results.filter(r => r.search_volume > 0);
  console.log(`  ${results.length} keywords, ${wv.length} with volume`);
  return results;
}

async function getDifficulty(results) {
  const needKD = results.filter(r => r.search_volume > 0).map(r => r.keyword);
  if (!needKD.length) return;
  console.log(`Fetching difficulty for ${needKD.length} keywords...`);
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
}

function isPrintRelated(kw) {
  const terms = ['print', 'mail', 'postcard', 'brochure', 'flyer', 'catalog', 'newsletter', 'letter', 'self-mailer', 'business card', 'commercial print'];
  return terms.some(t => kw.includes(t));
}

async function expand(results) {
  const top5 = [...results].sort((a, b) => b.search_volume - a.search_volume)
    .filter(r => r.search_volume > 0).slice(0, 5);
  console.log(`\nExpanding top ${top5.length} seeds...`);
  const expanded = [];
  const existing = new Set(results.map(r => r.keyword.toLowerCase()));

  for (const seed of top5) {
    console.log(`  "${seed.keyword}" (${seed.search_volume}/mo)...`);
    try {
      const resp = await apiRequest('/v3/dataforseo_labs/google/keyword_ideas/live', [{
        keywords: [seed.keyword],
        language_name: 'English',
        location_code: 2840,
        include_seed_keyword: false,
        limit: 30,
        filters: ['keyword_info.search_volume', '>', 10],
      }]);
      const items = resp.tasks?.[0]?.result?.[0]?.items || [];
      for (const item of items) {
        const kw = item.keyword?.toLowerCase();
        if (kw && !existing.has(kw) && isPrintRelated(kw)) {
          existing.add(kw);
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
  console.log(`  ${expanded.length} new keywords from expansion`);
  return expanded;
}

function generateCSV(all) {
  const header = 'keyword,search_volume,keyword_difficulty,cpc,competition,format_category';
  const rows = [...all].sort((a, b) => b.search_volume - a.search_volume).map(r =>
    `"${r.keyword}",${r.search_volume},${r.keyword_difficulty},${(r.cpc||0).toFixed(2)},${r.competition},${r.category}`
  );
  return header + '\n' + rows.join('\n');
}

function generateSummary(all) {
  const wv = [...all].sort((a, b) => b.search_volume - a.search_volume).filter(r => r.search_volume > 0);

  const formatVols = {};
  for (const r of all) {
    if (r.category === 'expanded' || r.category === 'local') continue;
    if (!formatVols[r.category]) formatVols[r.category] = { vol: 0, kws: [] };
    formatVols[r.category].vol += r.search_volume;
    formatVols[r.category].kws.push(r);
  }

  let md = '# Print Format Keyword Research — Summary Report\n\n';
  md += `Generated: ${new Date().toISOString().split('T')[0]}\n`;
  md += `Total keywords: ${all.length} | With volume: ${wv.length}\n\n`;

  md += '## 1. Volume by Format\n\n';
  md += '| Format | Combined Monthly Vol | # Keywords | Avg KD |\n|--------|---------------------|------------|--------|\n';
  Object.entries(formatVols).sort((a, b) => b[1].vol - a[1].vol).forEach(([fmt, d]) => {
    const avg = d.kws.length ? Math.round(d.kws.reduce((s, k) => s + k.keyword_difficulty, 0) / d.kws.length) : 0;
    md += `| ${fmt} | ${d.vol} | ${d.kws.length} | ${avg} |\n`;
  });

  md += '\n## 2. Top 10 Quick Wins (50+ Vol, KD < 50)\n\n';
  const qw = wv.filter(r => r.search_volume >= 50 && r.keyword_difficulty < 50)
    .sort((a, b) => a.keyword_difficulty - b.keyword_difficulty).slice(0, 10);
  md += '| Keyword | Volume | KD | CPC | Category |\n|---------|--------|-----|------|----------|\n';
  if (qw.length) qw.forEach(r => { md += `| ${r.keyword} | ${r.search_volume} | ${r.keyword_difficulty} | $${(r.cpc||0).toFixed(2)} | ${r.category} |\n`; });
  else md += '| (none found) | — | — | — | — |\n';

  md += '\n## 3. Recommended Builds (Combined 200+/mo, Avg KD < 50)\n\n';
  const builds = Object.entries(formatVols).filter(([, d]) => {
    const avg = d.kws.length ? d.kws.reduce((s, k) => s + k.keyword_difficulty, 0) / d.kws.length : 100;
    return d.vol >= 200 && avg < 50;
  }).sort((a, b) => b[1].vol - a[1].vol);
  if (builds.length) {
    md += 'These formats have enough combined volume and low enough difficulty to justify standalone service pages:\n\n';
    builds.forEach(([fmt, d]) => {
      const avg = Math.round(d.kws.reduce((s, k) => s + k.keyword_difficulty, 0) / d.kws.length);
      md += `- **${fmt}** — ${d.vol}/mo combined, Avg KD ${avg}\n`;
      d.kws.sort((a, b) => b.search_volume - a.search_volume).forEach(k => {
        md += `  - "${k.keyword}" — ${k.search_volume}/mo, KD ${k.keyword_difficulty}\n`;
      });
    });
  } else {
    md += 'No formats meet both thresholds (200+ combined volume AND avg KD < 50).\n';
  }

  md += '\n## 4. Skip List (Fold into Main Printing Page)\n\n';
  const skips = Object.entries(formatVols).filter(([, d]) => d.vol < 200)
    .sort((a, b) => b[1].vol - a[1].vol);
  if (skips.length) {
    md += 'These formats don\'t have enough standalone volume. Mention them on the main printing services page instead:\n\n';
    skips.forEach(([fmt, d]) => {
      md += `- **${fmt}** — ${d.vol}/mo combined (${d.kws.length} keywords)\n`;
    });
  } else {
    md += 'All formats have sufficient volume for standalone pages.\n';
  }

  md += '\n## 5. All Keywords with Volume\n\n';
  md += '| Keyword | Volume | KD | CPC | Competition | Category |\n|---------|--------|-----|------|-------------|----------|\n';
  wv.forEach(r => {
    md += `| ${r.keyword} | ${r.search_volume} | ${r.keyword_difficulty} | $${(r.cpc||0).toFixed(2)} | ${r.competition} | ${r.category} |\n`;
  });

  return md;
}

async function main() {
  console.log('Print Format Keyword Research');
  if (!LOGIN || !PASSWORD) { console.error('Missing credentials'); process.exit(1); }

  const seeds = await getVolumes();
  await getDifficulty(seeds);

  fs.writeFileSync('/home/runner/workspace/print-format-keyword-research.csv', generateCSV(seeds));
  console.log('(interim CSV saved)');

  const expanded = await expand(seeds);
  const all = [...seeds, ...expanded];

  fs.writeFileSync('/home/runner/workspace/print-format-keyword-research.csv', generateCSV(all));
  fs.writeFileSync('/home/runner/workspace/print-format-keyword-summary.md', generateSummary(all));
  console.log(`\nDone! ${all.length} total, ${all.filter(r => r.search_volume > 0).length} with volume`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
