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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const NO_DATA_KEYWORDS = [
  'political campaign direct mail printing',
  'roofing direct mail marketing',
  'medical practice direct mail',
  'printing for contractors',
  'construction company printing',
  'direct mail services Hudson Valley NY',
  'printing services New Paltz NY',
  'direct mail marketing Poughkeepsie NY',
  'mailing services Ulster County NY',
  'EDDM Hudson Valley NY',
  'local marketing Dutchess County NY',
  'direct mail services Dutchess County',
  'printing services Hudson Valley',
  'marketing services New Paltz NY',
  'EDDM for restaurants',
  'EDDM design tips',
  'how to set up EDDM',
  'EDDM route selection',
  'EDDM marketing strategy',
  'EDDM success stories',
  'EDDM vs digital advertising',
  'every door direct mail for small business',
];

const HUB_KEYWORDS = [
  'direct mail ROI',
  'direct mail response rates',
  'direct mail vs email marketing',
  'how much does direct mail cost',
  'targeted mailing lists',
  'digital vs offset printing',
  'bulk printing services',
  'brochure printing services',
  'business card printing services',
  'large format printing',
  'variable data printing',
  'flyer printing services',
  'banner printing services',
];

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

async function fetchSearchIntent(keywords) {
  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/dataforseo_labs/google/search_intent/live',
      [{ keywords, language_name: 'English', location_name: 'United States' }],
      { headers }
    );
    const task = response.data?.tasks?.[0];
    if (task?.status_code === 20000) {
      const items = task?.result?.[0]?.items || [];
      const map = {};
      items.forEach(item => {
        map[item.keyword.toLowerCase()] = item.keyword_intent?.label || item.keyword_intent?.main_intent || 'NO DATA';
      });
      return map;
    }
    return {};
  } catch (err) {
    console.error(`  Intent request failed: ${err.message}`);
    return {};
  }
}

async function fetchKeywordIdeas(seedKeyword, limit) {
  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live',
      [{
        keywords: [seedKeyword],
        language_name: 'English',
        location_name: 'United States',
        include_serp_info: false,
        limit,
      }],
      { headers }
    );
    const task = response.data?.tasks?.[0];
    if (task?.status_code !== 20000) {
      console.error(`  Keyword ideas API error for "${seedKeyword}": ${task?.status_message}`);
      return [];
    }
    const items = task?.result?.[0]?.items || [];
    return items.map(item => {
      const info = item.keyword_info || {};
      const props = item.keyword_properties || {};
      const intentInfo = item.search_intent_info || {};
      return {
        keyword: item.keyword,
        volume: info.search_volume ?? 'NO DATA',
        kd: props.keyword_difficulty ?? 'NO DATA',
        cpc: info.cpc ?? 'NO DATA',
        intent: intentInfo.main_intent || 'NO DATA',
      };
    });
  } catch (err) {
    console.error(`  Keyword ideas request failed for "${seedKeyword}": ${err.message}`);
    return [];
  }
}

async function script1() {
  console.log('='.repeat(60));
  console.log('SCRIPT 1: Seed keyword volume + KD lookup');
  console.log('='.repeat(60));

  const allResults = [];
  let hubCounter = 0;

  for (const [group, keywords] of Object.entries(GROUPS)) {
    console.log(`\n  Group: ${group} (${keywords.length} keywords)`);

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
      console.log(`  ${hubCounter}. ${keyword} — vol: ${row.volume}, KD: ${row.kd}, CPC: $${row.cpc}`);
    }
  }

  console.log('\n  Fetching search intent for all keywords...');
  const intentMap = await fetchSearchIntent(allResults.map(r => r.keyword));
  allResults.forEach(r => {
    r.intent = intentMap[r.keyword.toLowerCase()] || 'NO DATA';
  });

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
  console.log(`\n  Saved ${allResults.length} keywords to crst-keyword-research.csv`);
  return allResults.length;
}

async function script2() {
  console.log('\n' + '='.repeat(60));
  console.log('SCRIPT 2: Fix NO DATA keywords — find alternatives');
  console.log('='.repeat(60));

  const allAlternatives = [];

  for (let i = 0; i < NO_DATA_KEYWORDS.length; i++) {
    const seed = NO_DATA_KEYWORDS[i];
    console.log(`\n  ${i + 1}/${NO_DATA_KEYWORDS.length}: "${seed}"`);

    const ideas = await fetchKeywordIdeas(seed, 5);
    await delay(500);

    if (ideas.length === 0) {
      console.log('    No alternatives found');
      allAlternatives.push({
        originalSeed: seed,
        suggestedKeyword: 'NO ALTERNATIVES FOUND',
        volume: 'NO DATA',
        kd: 'NO DATA',
        cpc: 'NO DATA',
        intent: 'NO DATA',
      });
    } else {
      ideas.forEach((idea, j) => {
        console.log(`    ${j + 1}. "${idea.keyword}" — vol: ${idea.volume}, KD: ${idea.kd}, CPC: $${idea.cpc}, ${idea.intent}`);
        allAlternatives.push({
          originalSeed: seed,
          suggestedKeyword: idea.keyword,
          volume: idea.volume,
          kd: idea.kd,
          cpc: idea.cpc,
          intent: idea.intent,
        });
      });
    }
  }

  const csvWriter = createObjectCsvWriter({
    path: 'crst-keyword-alternatives.csv',
    header: [
      { id: 'originalSeed', title: 'Original Seed' },
      { id: 'suggestedKeyword', title: 'Suggested Keyword' },
      { id: 'volume', title: 'Monthly Volume' },
      { id: 'kd', title: 'Keyword Difficulty' },
      { id: 'cpc', title: 'CPC' },
      { id: 'intent', title: 'Intent' },
    ],
  });

  await csvWriter.writeRecords(allAlternatives);
  console.log(`\n  Saved ${allAlternatives.length} alternatives to crst-keyword-alternatives.csv`);
  return allAlternatives.length;
}

async function script3() {
  console.log('\n' + '='.repeat(60));
  console.log('SCRIPT 3: Spoke keyword ideas for each Tier 1 hub');
  console.log('='.repeat(60));

  const allSpokes = [];

  for (let i = 0; i < HUB_KEYWORDS.length; i++) {
    const hub = HUB_KEYWORDS[i];
    console.log(`\n  ${i + 1}/${HUB_KEYWORDS.length}: "${hub}"`);

    const ideas = await fetchKeywordIdeas(hub, 15);
    await delay(500);

    if (ideas.length === 0) {
      console.log('    No spoke ideas found');
    } else {
      ideas.forEach((idea, j) => {
        console.log(`    ${j + 1}. "${idea.keyword}" — vol: ${idea.volume}, KD: ${idea.kd}, CPC: $${idea.cpc}, ${idea.intent}`);
        allSpokes.push({
          hubKeyword: hub,
          spokeKeyword: idea.keyword,
          volume: idea.volume,
          kd: idea.kd,
          cpc: idea.cpc,
          intent: idea.intent,
        });
      });
    }
  }

  const csvWriter = createObjectCsvWriter({
    path: 'crst-spoke-ideas.csv',
    header: [
      { id: 'hubKeyword', title: 'Hub Keyword' },
      { id: 'spokeKeyword', title: 'Spoke Keyword' },
      { id: 'volume', title: 'Monthly Volume' },
      { id: 'kd', title: 'Keyword Difficulty' },
      { id: 'cpc', title: 'CPC' },
      { id: 'intent', title: 'Intent' },
    ],
  });

  await csvWriter.writeRecords(allSpokes);
  console.log(`\n  Saved ${allSpokes.length} spoke ideas to crst-spoke-ideas.csv`);
  return allSpokes.length;
}

async function script4() {
  console.log('\n' + '='.repeat(60));
  console.log('SCRIPT 4: Competitor keyword gap for crst.net');
  console.log('='.repeat(60));

  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/dataforseo_labs/google/competitors_domain/live',
      [{
        target: 'crst.net',
        language_name: 'English',
        location_name: 'United States',
        limit: 50,
      }],
      { headers }
    );

    const task = response.data?.tasks?.[0];
    if (task?.status_code !== 20000) {
      console.error(`  Competitors API error: ${task?.status_message}`);
      return 0;
    }

    const items = task?.result?.[0]?.items || [];

    if (items.length === 0) {
      console.log('  No competitor data found');
      return 0;
    }

    const competitors = items.map(item => ({
      competitorDomain: item.domain,
      intersectingKeywords: item.intersections ?? item.relevant_serp_items ?? 'NO DATA',
      avgPosition: item.avg_position != null ? Math.round(item.avg_position * 10) / 10 : 'NO DATA',
    }));

    competitors.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.competitorDomain} — ${c.intersectingKeywords} intersecting KWs, avg pos: ${c.avgPosition}`);
    });

    const csvWriter = createObjectCsvWriter({
      path: 'crst-competitors.csv',
      header: [
        { id: 'competitorDomain', title: 'Competitor Domain' },
        { id: 'intersectingKeywords', title: 'Intersecting Keywords' },
        { id: 'avgPosition', title: 'Avg Position' },
      ],
    });

    await csvWriter.writeRecords(competitors);
    console.log(`\n  Saved ${competitors.length} competitors to crst-competitors.csv`);
    return competitors.length;
  } catch (err) {
    console.error(`  Competitors request failed: ${err.message}`);
    return 0;
  }
}

async function main() {
  console.log('CRST Keyword Research Pipeline');
  console.log('='.repeat(60));

  const count1 = await script1();
  const count2 = await script2();
  const count3 = await script3();
  const count4 = await script4();

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`  crst-keyword-research.csv    — ${count1} seed keywords`);
  console.log(`  crst-keyword-alternatives.csv — ${count2} alternative suggestions`);
  console.log(`  crst-spoke-ideas.csv          — ${count3} spoke keyword ideas`);
  console.log(`  crst-competitors.csv          — ${count4} competitor domains`);
  console.log('='.repeat(60));
}

main().catch(console.error);
