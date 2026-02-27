const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;

if (!login || !password) {
  console.error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD environment variables');
  process.exit(1);
}

const token = Buffer.from(`${login}:${password}`).toString('base64');
const headers = { 'Authorization': `Basic ${token}`, 'Content-Type': 'application/json' };

const GROUPS = {
  'Tier 1 Service': [
    'direct mail ROI',
    'direct mail response rates',
    'direct mail vs email marketing',
    'how much does direct mail cost',
    'targeted mailing lists',
    'digital vs offset printing',
    'bulk printing services',
    'eco friendly printing',
    'brochure printing services',
    'flyer printing services',
    'business card printing services',
    'large format printing',
    'banner printing services',
    'variable data printing',
    'direct mail design services',
  ],
  'Tier 2 Industry': [
    'direct mail for restaurants',
    'direct mail for real estate agents',
    'direct mail for nonprofits',
    'political campaign direct mail printing',
    'credit union direct mail marketing',
    'home services direct mail',
    'HVAC direct mail marketing',
    'roofing direct mail marketing',
    'healthcare direct mail marketing',
    'medical practice direct mail',
    'retail direct mail marketing',
    'printing for contractors',
    'construction company printing',
    'printing for schools',
    'church printing services',
  ],
  'Tier 3 Local': [
    'direct mail services Hudson Valley NY',
    'printing services New Paltz NY',
    'direct mail marketing Poughkeepsie NY',
    'printing services Kingston NY',
    'mailing services Ulster County NY',
    'EDDM Hudson Valley NY',
    'local marketing Dutchess County NY',
    'direct mail services Dutchess County',
    'printing services Hudson Valley',
    'marketing services New Paltz NY',
  ],
  'EDDM Spokes': [
    'EDDM vs targeted mail',
    'EDDM for restaurants',
    'EDDM for real estate',
    'EDDM design tips',
    'how to set up EDDM',
    'EDDM route selection',
    'EDDM marketing strategy',
    'EDDM success stories',
    'EDDM vs digital advertising',
    'every door direct mail for small business',
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSearchVolume(keywords) {
  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
      [{ keywords, language_name: 'English', location_code: 2840 }],
      { headers }
    );
    const task = response.data?.tasks?.[0];
    if (task?.status_code !== 20000) {
      console.error(`  Search volume API error: ${task?.status_message}`);
      return {};
    }
    const items = task?.result || [];
    const map = {};
    items.forEach(item => {
      map[item.keyword.toLowerCase()] = {
        volume: item.search_volume ?? 'NO DATA',
        cpc: item.cpc ?? 'NO DATA',
        competition: item.competition || 'NO DATA',
      };
    });
    return map;
  } catch (err) {
    console.error(`  Search volume request failed: ${err.message}`);
    return {};
  }
}

async function fetchKeywordDifficulty(keywords) {
  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live',
      [{ keywords, language_name: 'English', location_name: 'United States' }],
      { headers }
    );
    const task = response.data?.tasks?.[0];
    if (task?.status_code !== 20000) {
      console.error(`  KD API error: ${task?.status_message}`);
      return {};
    }
    const items = task?.result?.[0]?.items || [];
    const map = {};
    items.forEach(item => {
      map[item.keyword.toLowerCase()] = item.keyword_difficulty ?? 'NO DATA';
    });
    return map;
  } catch (err) {
    console.error(`  KD request failed: ${err.message}`);
    return {};
  }
}

async function main() {
  console.log('Starting CRST keyword research...\n');

  const allResults = [];
  let hubCounter = 0;

  for (const [group, keywords] of Object.entries(GROUPS)) {
    console.log(`\n📦 Group: ${group} (${keywords.length} keywords)`);

    console.log('  Fetching search volume...');
    const volumeData = await fetchSearchVolume(keywords);
    await delay(500);

    console.log('  Fetching keyword difficulty...');
    const kdData = await fetchKeywordDifficulty(keywords);
    await delay(500);

    for (const keyword of keywords) {
      hubCounter++;
      const key = keyword.toLowerCase();
      const vol = volumeData[key] || {};
      const kd = kdData[key] ?? 'NO DATA';

      const row = {
        group,
        hub: hubCounter,
        keyword,
        volume: vol.volume ?? 'NO DATA',
        kd,
        cpc: vol.cpc ?? 'NO DATA',
        competition: vol.competition ?? 'NO DATA',
        intent: '',
      };

      allResults.push(row);
      console.log(`  ${hubCounter}. ${keyword} — vol: ${row.volume}, KD: ${row.kd}, CPC: $${row.cpc}, comp: ${row.competition}`);
    }
  }

  console.log('\nFetching search intent for all keywords...');
  const allKeywords = allResults.map(r => r.keyword);
  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/dataforseo_labs/google/search_intent/live',
      [{ keywords: allKeywords, language_name: 'English', location_name: 'United States' }],
      { headers }
    );
    const task = response.data?.tasks?.[0];
    if (task?.status_code === 20000) {
      const items = task?.result?.[0]?.items || [];
      const intentMap = {};
      items.forEach(item => {
        intentMap[item.keyword.toLowerCase()] = item.keyword_intent?.label || item.keyword_intent?.main_intent || 'NO DATA';
      });
      allResults.forEach(r => {
        r.intent = intentMap[r.keyword.toLowerCase()] || 'NO DATA';
      });
    }
  } catch (err) {
    console.error(`  Intent request failed: ${err.message}`);
  }

  const csvWriter = createObjectCsvWriter({
    path: 'crst-keyword-research.csv',
    header: [
      { id: 'group', title: 'Group' },
      { id: 'hub', title: 'Hub #' },
      { id: 'keyword', title: 'Keyword' },
      { id: 'volume', title: 'Monthly Volume' },
      { id: 'kd', title: 'Keyword Difficulty' },
      { id: 'cpc', title: 'CPC' },
      { id: 'competition', title: 'Competition' },
      { id: 'intent', title: 'Intent' },
    ],
  });

  await csvWriter.writeRecords(allResults);

  const opportunities = allResults
    .filter(r => typeof r.volume === 'number' && typeof r.kd === 'number' && r.kd < 30)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 10);

  console.log(`\n✅ Done — ${allResults.length} keywords researched`);
  console.log(`📄 Results saved to crst-keyword-research.csv`);
  console.log(`⭐ Top 10 opportunities (highest volume, KD under 30):`);

  if (opportunities.length === 0) {
    console.log('   No keywords found with KD under 30');
  } else {
    opportunities.forEach((r, i) => {
      console.log(`   ${i + 1}. "${r.keyword}" — vol: ${r.volume}, KD: ${r.kd}, CPC: $${r.cpc}, ${r.intent}`);
    });
  }
}

main().catch(console.error);
