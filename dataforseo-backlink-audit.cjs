const https = require('https');

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
const AUTH = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');
const TARGET = 'crst.net';

function apiCall(endpoint, body) {
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
      res.on('data', c => chunks += c);
      res.on('end', () => {
        try { resolve(JSON.parse(chunks)); }
        catch (e) { reject(new Error('Parse error: ' + chunks.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== DataForSEO Backlink Audit for', TARGET, '===');
  console.log('Date:', new Date().toISOString().slice(0, 10));
  console.log('');

  // 1) REFERRING DOMAINS (top 100)
  console.log('### 1. TOP REFERRING DOMAINS');
  try {
    const r1 = await apiCall('/v3/backlinks/referring_domains/live', [{
      target: TARGET,
      limit: 100,
      order_by: ['rank,desc'],
      backlinks_filters: ['dofollow', '=', true],
    }]);
    if (r1.tasks && r1.tasks[0] && r1.tasks[0].result) {
      const items = r1.tasks[0].result[0].items || [];
      console.log(`Found ${r1.tasks[0].result[0].total_count} total referring domains`);
      console.log('');
      console.log('Domain | Rank | Backlinks | Dofollow | First Seen');
      console.log('---|---|---|---|---');
      items.forEach(d => {
        console.log(`${d.domain} | ${d.rank} | ${d.backlinks} | ${d.backlinks_nofollow !== undefined ? d.backlinks - (d.backlinks_nofollow || 0) : 'N/A'} | ${(d.first_seen || '').slice(0, 10)}`);
      });
    } else {
      console.log('API error:', JSON.stringify(r1.tasks?.[0]?.status_message || r1));
    }
  } catch (e) { console.log('Error:', e.message); }

  console.log('');

  // 2) ANCHOR TEXT DISTRIBUTION
  console.log('### 2. ANCHOR TEXT DISTRIBUTION');
  try {
    const r2 = await apiCall('/v3/backlinks/anchors/live', [{
      target: TARGET,
      limit: 100,
      order_by: ['backlinks,desc'],
    }]);
    if (r2.tasks && r2.tasks[0] && r2.tasks[0].result) {
      const items = r2.tasks[0].result[0].items || [];
      let branded = 0, keyword = 0, generic = 0, url = 0, other = 0;
      const brandTerms = ['cornerstone', 'crst', 'cornerstone services'];
      const genericTerms = ['click here', 'here', 'website', 'link', 'visit', 'learn more', 'read more', 'this', 'source'];

      console.log('Anchor | Backlinks | Referring Domains | Category');
      console.log('---|---|---|---');
      items.forEach(a => {
        const anchor = (a.anchor || '').toLowerCase().trim();
        let cat = 'other';
        if (brandTerms.some(b => anchor.includes(b))) { cat = 'branded'; branded += a.backlinks; }
        else if (genericTerms.some(g => anchor === g)) { cat = 'generic'; generic += a.backlinks; }
        else if (anchor.startsWith('http') || anchor.includes('crst.net')) { cat = 'url'; url += a.backlinks; }
        else if (anchor.includes('mail') || anchor.includes('print') || anchor.includes('eddm') || anchor.includes('mailing') || anchor.includes('data list') || anchor.includes('direct mail')) { cat = 'keyword'; keyword += a.backlinks; }
        else { other += a.backlinks; }
        console.log(`${a.anchor} | ${a.backlinks} | ${a.referring_domains} | ${cat}`);
      });
      const total = branded + keyword + generic + url + other;
      console.log('');
      console.log('Category | Count | Percentage');
      console.log('---|---|---');
      console.log(`Branded | ${branded} | ${(branded/total*100).toFixed(1)}%`);
      console.log(`Keyword | ${keyword} | ${(keyword/total*100).toFixed(1)}%`);
      console.log(`Generic | ${generic} | ${(generic/total*100).toFixed(1)}%`);
      console.log(`URL | ${url} | ${(url/total*100).toFixed(1)}%`);
      console.log(`Other | ${other} | ${(other/total*100).toFixed(1)}%`);
    } else {
      console.log('API error:', JSON.stringify(r2.tasks?.[0]?.status_message || r2));
    }
  } catch (e) { console.log('Error:', e.message); }

  console.log('');

  // 3) TOP PAGES BY BACKLINKS
  console.log('### 3. TOP PAGES BY BACKLINKS');
  try {
    const r3 = await apiCall('/v3/backlinks/pages_summary/live', [{
      target: TARGET,
      limit: 50,
      order_by: ['referring_domains,desc'],
    }]);
    if (r3.tasks && r3.tasks[0] && r3.tasks[0].result) {
      const items = r3.tasks[0].result[0].items || [];
      console.log('Page | Backlinks | Referring Domains | Dofollow');
      console.log('---|---|---|---');
      items.forEach(p => {
        console.log(`${p.page} | ${p.backlinks} | ${p.referring_domains} | ${p.referring_domains_nofollow !== undefined ? p.referring_domains - (p.referring_domains_nofollow || 0) : 'N/A'}`);
      });
    } else {
      console.log('API error:', JSON.stringify(r3.tasks?.[0]?.status_message || r3));
    }
  } catch (e) { console.log('Error:', e.message); }

  console.log('');

  // 4) BACKLINKS SUMMARY
  console.log('### 4. BACKLINK SUMMARY');
  try {
    const r4 = await apiCall('/v3/backlinks/summary/live', [{
      target: TARGET,
    }]);
    if (r4.tasks && r4.tasks[0] && r4.tasks[0].result) {
      const s = r4.tasks[0].result[0];
      console.log(`Total backlinks: ${s.total_backlinks}`);
      console.log(`Referring domains: ${s.referring_domains}`);
      console.log(`Referring main domains: ${s.referring_main_domains}`);
      console.log(`Rank: ${s.rank}`);
      console.log(`Dofollow: ${s.backlinks_nofollow !== undefined ? s.total_backlinks - s.backlinks_nofollow : 'N/A'}`);
      console.log(`Nofollow: ${s.backlinks_nofollow || 'N/A'}`);
      console.log(`Referring IPs: ${s.referring_ips || 'N/A'}`);
      console.log(`Referring subnets: ${s.referring_subnets || 'N/A'}`);
    }
  } catch (e) { console.log('Error:', e.message); }

  console.log('');

  // 5) COMPETITOR INTERSECTION (top SERP competitors for "direct mail services")
  console.log('### 5. COMPETITOR LINK GAP');
  try {
    const serp = await apiCall('/v3/serp/google/organic/live/regular', [{
      keyword: 'direct mail services',
      location_code: 2840,
      language_code: 'en',
      depth: 20,
    }]);
    
    let competitors = [];
    if (serp.tasks && serp.tasks[0] && serp.tasks[0].result) {
      const serpItems = serp.tasks[0].result[0].items || [];
      competitors = serpItems
        .filter(i => i.type === 'organic' && i.domain && !i.domain.includes('crst.net'))
        .map(i => i.domain)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 5);
      console.log('Top 5 competitors for "direct mail services":');
      competitors.forEach((c, i) => console.log(`  ${i+1}. ${c}`));
    }

    if (competitors.length >= 2) {
      console.log('');
      console.log('Running intersection analysis...');
      const r5 = await apiCall('/v3/backlinks/domain_intersection/live', [{
        targets: {
          1: TARGET,
          2: competitors[0],
          3: competitors[1],
        },
        limit: 50,
        order_by: ['1_rank,desc'],
        exclude_targets: [TARGET],
      }]);
      if (r5.tasks && r5.tasks[0] && r5.tasks[0].result) {
        const items = r5.tasks[0].result[0].items || [];
        console.log('');
        console.log(`Domains linking to competitors but NOT to crst.net:`);
        console.log('Domain | Rank');
        console.log('---|---');
        items
          .filter(d => !d['1_domain_backlinks'] || d['1_domain_backlinks'] === 0)
          .forEach(d => {
            console.log(`${d.domain} | ${d['1_rank'] || d.rank || 'N/A'}`);
          });
      } else {
        console.log('Intersection API error:', JSON.stringify(r5.tasks?.[0]?.status_message || r5));
      }
    }
  } catch (e) { console.log('Error:', e.message); }

  console.log('');
  console.log('=== AUDIT COMPLETE ===');
}

run().catch(e => console.error('Fatal:', e));
