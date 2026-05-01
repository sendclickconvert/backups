const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');

// ─── Keyword Scope Rules (see tools/keyword-research-scope.md) ───────────────

// Generic post office terms — exclude entirely from all output
const EXCLUDE_PATTERNS = [
  /\bpost office hours\b/i,
  /\bpost office phone\b/i,
  /\bpost office passport\b/i,
  /\busps hours\b/i,
  /\bpassport appointment\b/i,
  /\bmail lobby\b/i,
  /\bpackage pickup\b/i,
  /^[\w\s]+ post office$/i,          // "[town] post office" — exact
  /^[\w\s]+ usps$/i,                  // "[town] USPS" — exact
];

// Mailing-logistics post office terms — section use only, no standalone page
const SECTION_ONLY_PATTERNS = [
  /\beddm drop.?off\b/i,
  /\bbulk mail post office\b/i,
  /\bbulk mail permit\b/i,
  /\busps eddm\b/i,
  /\bwhere to drop off eddm\b/i,
  /\bmailing permit\b/i,
  /\bbusiness mail entry unit\b/i,
  /\busps direct mail acceptance\b/i,
  /\bpost office bulk mail\b/i,
  /\bpost office eddm\b/i,
  /\bpost office direct mail\b/i,
  /\blocal post office mailing\b/i,
];

function classifyKeyword(keyword) {
  const kw = keyword.toLowerCase();
  if (EXCLUDE_PATTERNS.some(p => p.test(kw))) {
    return { standaloneTarget: 'EXCLUDE', useAs: 'Exclude entirely' };
  }
  if (SECTION_ONLY_PATTERNS.some(p => p.test(kw))) {
    return { standaloneTarget: 'No', useAs: 'On-Page Section' };
  }
  return { standaloneTarget: 'Yes', useAs: 'Standalone Page' };
}

// ─────────────────────────────────────────────────────────────────────────────

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;

if (!login || !password) {
  console.error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD environment variables');
  process.exit(1);
}

const token = Buffer.from(`${login}:${password}`).toString('base64');
const headers = { 'Authorization': `Basic ${token}`, 'Content-Type': 'application/json' };

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RUN_DATE = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const RAW_DIR = `tools/raw-responses-${RUN_DATE}`;
const fs = require('fs');
if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

function saveRaw(label, data) {
  const file = `${RAW_DIR}/${label}.json`;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

const GROUPS = {
  'Core Direct Mail': [
    'direct mail',
    'direct mail printing',
    'printing and mailing',
    'mailing services',
    'bulk mailing',
    'postcard mailing',
    'saturation mailing',
    'local business direct mail',
    'direct mail advertising',
    'direct mail company',
    'direct mail marketing',
  ],
  'EDDM & Saturation': [
    'EDDM',
    'Every Door Direct Mail',
    'EDDM printing',
    'EDDM mailing service',
    'EDDM marketing',
    'EDDM postcard',
    'saturation mail',
    'residential saturation mailing',
    'carrier route mailing',
  ],
  'Industry Verticals': [
    'nonprofit mailing',
    'nonprofit direct mail',
    'political mailing',
    'political direct mail',
    'real estate direct mail',
    'contractor direct mail',
    'home services direct mail',
    'HVAC direct mail',
    'roofing direct mail',
    'restaurant direct mail',
    'healthcare direct mail',
    'church direct mail',
    'school district direct mail',
  ],
  'Post Office Logistics — Section Only': [
    'mail drop',
    'postal mailing',
    'USPS EDDM',
    'USPS saturation mailing',
    'local post office mailing',
    'post office bulk mail',
    'post office EDDM',
    'post office direct mail',
    'bulk mail permit',
    'mailing permit',
    'business mail entry unit',
    'EDDM drop off',
    'where to drop off EDDM',
    'USPS direct mail acceptance',
  ],
};

const NO_DATA_KEYWORDS = [
  // Populated dynamically from script1 results — see script2 logic
  'saturation mailing',
  'carrier route mailing',
  'residential saturation mailing',
  'contractor direct mail',
  'HVAC direct mail',
  'roofing direct mail',
  'church direct mail',
  'school district direct mail',
  'EDDM drop off',
  'where to drop off EDDM',
  'USPS direct mail acceptance',
  'business mail entry unit',
  'mailing permit',
  'local post office mailing',
  'USPS saturation mailing',
  'post office EDDM',
  'post office direct mail',
  'post office bulk mail',
  'mail drop',
  'postal mailing',
];

const HUB_KEYWORDS = [
  'direct mail',
  'EDDM',
  'Every Door Direct Mail',
  'mailing services',
  'postcard mailing',
  'saturation mailing',
  'bulk mailing',
  'direct mail printing',
  'nonprofit mailing',
  'political mailing',
  'real estate direct mail',
  'USPS EDDM',
  'bulk mail permit',
];

let _rawBatchCounter = 0;
async function fetchSearchVolume(keywords) {
  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
      [{ keywords, language_name: 'English', location_code: 2840 }],
      { headers }
    );
    saveRaw(`s1-search-volume-batch${++_rawBatchCounter}`, response.data);
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

      const classification = classifyKeyword(keyword);
      if (classification.standaloneTarget === 'EXCLUDE') {
        console.log(`  [EXCLUDED] ${keyword}`);
        continue;
      }

      const row = {
        group,
        hub: hubCounter,
        keyword,
        volume: vol.volume ?? 'NO DATA',
        kd,
        cpc: vol.cpc ?? 'NO DATA',
        competition: vol.competition ?? 'NO DATA',
        intent: '',
        standaloneTarget: classification.standaloneTarget,
        useAs: classification.useAs,
      };

      allResults.push(row);
      console.log(`  ${hubCounter}. ${keyword} — vol: ${row.volume}, KD: ${row.kd}, CPC: $${row.cpc} [${row.standaloneTarget}]`);
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
      { id: 'standaloneTarget', title: 'Standalone Target?' },
      { id: 'useAs', title: 'Use As' },
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
        const classification = classifyKeyword(idea.keyword);
        if (classification.standaloneTarget === 'EXCLUDE') {
          console.log(`    [EXCLUDED] "${idea.keyword}"`);
          return;
        }
        console.log(`    ${j + 1}. "${idea.keyword}" — vol: ${idea.volume}, KD: ${idea.kd}, CPC: $${idea.cpc}, ${idea.intent} [${classification.standaloneTarget}]`);
        allSpokes.push({
          hubKeyword: hub,
          spokeKeyword: idea.keyword,
          volume: idea.volume,
          kd: idea.kd,
          cpc: idea.cpc,
          intent: idea.intent,
          standaloneTarget: classification.standaloneTarget,
          useAs: classification.useAs,
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
      { id: 'standaloneTarget', title: 'Standalone Target?' },
      { id: 'useAs', title: 'Use As' },
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
