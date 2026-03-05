/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║           CRST Redirect Chain Checker  v2                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * WHAT IT DOES
 * ------------
 * Reads every old URL from redirect-map.csv, follows redirects
 * one hop at a time (no auto-follow), and flags anything that
 * chains through 2+ hops or lands on a dead/wrong page.
 *
 * A single 301 (1 hop) is correct and expected.
 * We only fix chains (2+ hops) or error statuses.
 *
 * HOW TO RUN
 * ----------
 *   1. Place this file and redirect-map.csv in the same folder
 *   2. node redirect-chain-check-v2.js
 *   3. Open redirect-chain-report.csv for results
 *
 * No npm install needed — pure Node.js.
 *
 * CSV FORMAT
 * ----------
 * Required column:  old_url
 * Optional column:  expected_destination
 *
 * Example:
 *   old_url,expected_destination
 *   https://crst.net/services,https://crst.net/direct-mail-services
 *   https://crst.net/about-us,https://crst.net/about
 *   https://crst.net/contact-us,https://crst.net/contact
 *
 * The expected_destination column lets the script flag redirects
 * that resolve to a 200 but land on the wrong page (e.g., homepage
 * instead of the intended destination). Leave blank to skip that check.
 *
 * CSV RULES
 * ---------
 * - The parser is quote-aware (Google Sheets exports work fine)
 * - Commas inside quoted fields are handled correctly
 * - Plain URLs without quotes also work
 *
 * FLAGS IN REPORT
 * ---------------
 *   ✅            OK — single hop, landed on correct page
 *   🚩 CHAIN      2+ hops — fix by pointing old URL directly to final destination
 *   💀 DEAD       Final URL returned 404, 410, or 5xx
 *   🔀 MISMATCH   Resolved to 200 but landed on wrong page
 *   ⚠️  ERROR      Network error or timeout
 *
 * WHAT TO FIX
 * -----------
 * Chains:    In Replit redirects, update the old URL to skip the
 *            middle hop and point directly to the final destination.
 *
 * Dead ends: Update the redirect target to a live page.
 *
 * Mismatches: Confirm the intended destination and update the
 *             redirect rule to point to the correct page.
 *
 * PRO TIP
 * -------
 * Run against both http:// and https:// variants of old URLs if
 * they existed in both forms. Chains often hide in:
 *   http → https → non-www → final destination
 *
 * After the script, spot-check flagged URLs in an incognito window
 * to confirm the final landing page is correct for real users,
 * not just technically returning a 200.
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const INPUT_FILE  = 'redirect-map.csv';
const OUTPUT_FILE = 'redirect-chain-report.csv';
const MAX_HOPS    = 10;
const TIMEOUT_MS  = 8000;
const DELAY_MS    = 300;
// ─────────────────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── FIX 1: Quote-aware CSV parser ─────────────────────────────────────────────
function parseCSVLine(line) {
  const cols = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      cols.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cols.push(current.trim());
  return cols;
}

function parseCSV(content) {
  const lines = content.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one URL.');
  const headers    = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/^\uFEFF/, ''));
  const oldUrlIdx  = headers.indexOf('old_url');
  const expectedIdx = headers.indexOf('expected_destination');
  if (oldUrlIdx === -1) throw new Error('CSV must have an "old_url" column.');
  return lines.slice(1).map(line => {
    const cols = parseCSVLine(line);
    return {
      old_url:  cols[oldUrlIdx]  || '',
      expected: expectedIdx >= 0 ? (cols[expectedIdx] || '') : '',
    };
  }).filter(r => r.old_url);
}

// ── FIX 1b: Ensure URLs have a scheme ────────────────────────────────────────
const BASE_DOMAIN = 'crst.net';

function ensureAbsoluteUrl(u) {
  const s = (u || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith('/')) return `https://${BASE_DOMAIN}${s}`;
  return 'https://' + s;
}

// ── FIX 2: Normalized URL comparison ─────────────────────────────────────────
function normalizeUrl(raw) {
  if (!raw) return '';
  try {
    const u = new URL(raw.toLowerCase().trim());
    // force https
    u.protocol = 'https:';
    // strip www
    u.hostname = u.hostname.replace(/^www\./, '');
    // strip trailing slash (except root path)
    u.pathname = u.pathname.replace(/\/+$/, '') || '/';
    // strip common tracking params (UTM, Google, Meta, Microsoft)
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content',
     'gclid','gbraid','wbraid','fbclid','msclkid']
      .forEach(p => u.searchParams.delete(p));
    return u.href;
  } catch {
    return raw.toLowerCase().trim().replace(/\/+$/, '');
  }
}

// ── FIX 3: HEAD-first with GET fallback ──────────────────────────────────────
function fetchOneHop(url) {
  return new Promise((resolve) => {
    const tryRequest = (method) => {
      const lib = url.startsWith('https') ? https : http;
      const opts = { method, timeout: TIMEOUT_MS };
      const req = lib.request(url, opts, (res) => {
        // Some servers return 405 on HEAD — fall back to GET
        if (method === 'HEAD' && res.statusCode === 405) {
          res.destroy();
          tryRequest('GET');
          return;
        }
        resolve({ status: res.statusCode, location: res.headers.location || null });
        res.destroy();
      });
      req.on('error', (err) => resolve({ status: 'ERROR', location: null, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ status: 'TIMEOUT', location: null }); });
      req.end();
    };
    tryRequest('HEAD');
  });
}

function resolveLocation(base, location) {
  if (!location) return null;
  if (location.startsWith('http')) return location;
  try { return new URL(location, base).href; } catch { return location; }
}

// ── FIX 4: Meaningful final status labels ────────────────────────────────────
function finalStatusLabel(status) {
  if (status === 'TIMEOUT')        return 'TIMEOUT';
  if (status === 'ERROR')          return 'ERROR';
  if (status === 'TOO_MANY_HOPS')  return 'LOOP/TOO_MANY_HOPS';
  if (status === 200)              return 'OK_200';
  if (status === 404)              return 'FINAL_404_DEAD';
  if (status === 410)              return 'FINAL_410_GONE';
  if (status === 403)              return 'FINAL_403_BLOCKED';
  if (status >= 500)               return `FINAL_${status}_SERVER_ERROR`;
  if (status >= 400)               return `FINAL_${status}_CLIENT_ERROR`;
  return `FINAL_${status}`;
}

function hopLabel(hops, finalStatus, error) {
  if (finalStatus === 'TOO_MANY_HOPS' && error === 'LOOP_DETECTED') return 'LOOP_DETECTED';
  if (['TIMEOUT','ERROR','TOO_MANY_HOPS'].includes(String(finalStatus))) return finalStatusLabel(finalStatus);
  if (hops === 0) return 'NO_REDIRECT';
  if (hops === 1) return 'OK_1_HOP';
  return `CHAIN_${hops}_HOPS`;
}

async function followChain(startUrl) {
  const chain = [startUrl];
  const seen  = new Set([normalizeUrl(startUrl)]);
  let current = startUrl;
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const { status, location, error } = await fetchOneHop(current);
    if (error || status === 'ERROR' || status === 'TIMEOUT') {
      return { chain, finalStatus: error ? 'ERROR' : status, error: error || status };
    }
    if ([301,302,303,307,308].includes(status) && !location) {
      return { chain, finalStatus: 'ERROR', error: 'REDIRECT_WITHOUT_LOCATION' };
    }
    if ([301,302,303,307,308].includes(status) && location) {
      const next = resolveLocation(current, location);
      if (seen.has(normalizeUrl(next))) {
        chain.push(next);
        return { chain, finalStatus: 'TOO_MANY_HOPS', error: 'LOOP_DETECTED' };
      }
      chain.push(next);
      seen.add(normalizeUrl(next));
      current = next;
    } else {
      return { chain, finalStatus: status, error: null };
    }
  }
  return { chain, finalStatus: 'TOO_MANY_HOPS', error: 'Exceeded max hops' };
}

async function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`\n❌  ${INPUT_FILE} not found.\n`);
    console.error('Create a CSV with columns: old_url, expected_destination');
    process.exit(1);
  }

  const rows = parseCSV(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`\n📋  Loaded ${rows.length} URLs from ${INPUT_FILE}`);
  console.log(`🔍  Checking redirects (HEAD-first, GET fallback)...\n`);

  const results = [];
  let countOk = 0, countChains = 0, countErrors = 0, countDeadEnds = 0, countMismatch = 0;

  for (let i = 0; i < rows.length; i++) {
    const { old_url, expected } = rows[i];
    const start = ensureAbsoluteUrl(old_url);
    const exp   = ensureAbsoluteUrl(expected);
    if (!start) continue;

    process.stdout.write(`[${i+1}/${rows.length}] ${start.substring(0,65).padEnd(65)}`);

    const { chain, finalStatus, error } = await followChain(start);
    const hops      = chain.length - 1;
    const label     = hopLabel(hops, finalStatus, error);
    const finalUrl  = chain[chain.length - 1];
    const fLabel    = finalStatusLabel(finalStatus);

    // Normalized match check
    const normFinal    = normalizeUrl(finalUrl);
    const normExpected = normalizeUrl(exp);
    const matchResult  = !exp ? 'N/A'
                       : normFinal === normExpected ? 'YES' : 'NO';

    // Console flag
    const isChain    = hops > 1;
    const isError    = !!error;
    const isDeadEnd  = !error && finalStatus !== 'TOO_MANY_HOPS' && typeof finalStatus === 'number' && finalStatus !== 200;
    const isOk200    = !error && finalStatus === 200;
    const isMismatch = matchResult === 'NO';

    let flag = '✅';
    if (isChain)        { flag = '🚩 CHAIN     '; countChains++; }
    else if (isError)   { flag = '⚠️  ERROR     '; countErrors++; }
    else if (isDeadEnd) { flag = '💀 DEAD      '; countDeadEnds++; }
    else                { countOk++; }

    if (isMismatch && isOk200 && !isChain) {
      flag = '🔀 MISMATCH  ';
      countMismatch++;
    }

    console.log(` ${flag} [${label}] → ${finalUrl.substring(0,55)}`);

    results.push({
      old_url:              start,
      hops,
      hop_status:           label,
      final_http_status:    fLabel,
      final_url:            finalUrl,
      full_chain:           chain.join(' → '),
      expected_destination: exp,
      expected_match:       matchResult,
      normalized_final:     normFinal,
      normalized_expected:  normExpected,
      error:                error || '',
    });

    await sleep(DELAY_MS);
  }

  // ── Write CSV ──
  const header = 'old_url,hops,hop_status,final_http_status,final_url,full_chain,expected_destination,expected_match,normalized_final,normalized_expected,error';
  const csvRows = results.map(r =>
    Object.values(r).map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')
  );
  fs.writeFileSync(OUTPUT_FILE, [header, ...csvRows].join('\n'), 'utf8');

  // ── Summary ──
  console.log('\n' + '─'.repeat(65));
  console.log(`✅  OK (1 hop):          ${countOk}`);
  console.log(`🚩  Chains (2+ hops):    ${countChains}`);
  console.log(`💀  Dead ends (4xx/5xx): ${countDeadEnds}`);
  console.log(`🔀  Mismatches:          ${countMismatch}`);
  console.log(`⚠️   Errors/Timeouts:     ${countErrors}`);
  console.log(`📄  Report: ${OUTPUT_FILE}`);
  console.log('─'.repeat(65) + '\n');

  if (countChains > 0) {
    console.log('FIX CHAINS: In Replit redirects, update each flagged old URL to skip');
    console.log('the middle hop and point directly to the final destination.\n');
  }
  if (countDeadEnds > 0) {
    console.log('FIX DEAD ENDS: These old URLs are landing on 4xx/5xx pages.');
    console.log('Update redirect targets to a live, relevant page.\n');
  }
  if (countChains === 0 && countDeadEnds === 0 && countErrors === 0) {
    console.log('All redirects are single-hop and landing cleanly. ✅\n');
  }
  console.log('Spot-check any flagged URLs in an incognito window to confirm');
  console.log('the final landing page is correct for real users.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
