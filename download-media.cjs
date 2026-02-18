#!/usr/bin/env node
/**
 * CRST Media Downloader
 * Downloads all media from blog.crst.net WordPress REST API
 * 
 * Usage: node download-media.js
 * Run from the crst-website project root on Replit
 * 
 * Images go into public/images/wp/ maintaining year/month structure
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const WP_API = 'https://blog.crst.net/wp-json/wp/v2/media';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'wp');
const PER_PAGE = 100;
const MAX_CONCURRENT = 3;
const DELAY_MS = 500;

// Track stats
let totalFound = 0;
let downloaded = 0;
let skipped = 0;
let failed = 0;

function fetch(fetchUrl) {
  return new Promise((resolve, reject) => {
    const protocol = fetchUrl.startsWith('https') ? https : http;
    protocol.get(fetchUrl, { headers: { 'User-Agent': 'CRST-Migration/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${fetchUrl}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ body: Buffer.concat(chunks), headers: res.headers }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function getMediaPage(page) {
  const apiUrl = `${WP_API}?per_page=${PER_PAGE}&page=${page}&_fields=id,source_url,media_details,title,alt_text,mime_type,date`;
  const { body, headers } = await fetch(apiUrl);
  const items = JSON.parse(body.toString());
  const totalPages = parseInt(headers['x-wp-totalpages'] || '1');
  const totalItems = parseInt(headers['x-wp-total'] || '0');
  return { items, totalPages, totalItems };
}

async function downloadFile(sourceUrl, outputPath) {
  // Skip if already downloaded
  if (fs.existsSync(outputPath)) {
    skipped++;
    return;
  }

  const dir = path.dirname(outputPath);
  fs.mkdirSync(dir, { recursive: true });

  try {
    const { body } = await fetch(sourceUrl);
    fs.writeFileSync(outputPath, body);
    downloaded++;
    process.stdout.write(`\r  Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed} / ${totalFound}`);
  } catch (err) {
    failed++;
    console.error(`\n  FAIL: ${sourceUrl} - ${err.message}`);
  }
}

function getOutputPath(sourceUrl) {
  // e.g. https://blog.crst.net/wp-content/uploads/2024/01/image.jpg
  // → public/images/wp/2024/01/image.jpg
  const parsed = url.parse(sourceUrl);
  const wpPath = parsed.pathname;
  
  // Try to extract path after /uploads/
  const uploadsIdx = wpPath.indexOf('/uploads/');
  if (uploadsIdx !== -1) {
    const relativePath = wpPath.substring(uploadsIdx + '/uploads/'.length);
    return path.join(OUTPUT_DIR, relativePath);
  }
  
  // Fallback: just use the filename
  const filename = path.basename(wpPath);
  return path.join(OUTPUT_DIR, filename);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadBatch(items) {
  for (let i = 0; i < items.length; i += MAX_CONCURRENT) {
    const batch = items.slice(i, i + MAX_CONCURRENT);
    await Promise.all(batch.map(async (item) => {
      if (!item.source_url) return;
      const outputPath = getOutputPath(item.source_url);
      await downloadFile(item.source_url, outputPath);
    }));
    await sleep(DELAY_MS);
  }
}

async function generateManifest(allItems) {
  // Create a manifest JSON mapping filenames to metadata
  const manifest = {};
  for (const item of allItems) {
    if (!item.source_url) continue;
    const outputPath = getOutputPath(item.source_url);
    const relativePath = path.relative(path.join(__dirname, 'public'), outputPath);
    manifest[item.id] = {
      src: '/' + relativePath.replace(/\\/g, '/'),
      title: item.title?.rendered || '',
      alt: item.alt_text || '',
      mime: item.mime_type || '',
      date: item.date || '',
      width: item.media_details?.width || null,
      height: item.media_details?.height || null,
    };
  }
  
  const manifestPath = path.join(__dirname, 'src', 'data', 'media-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n  Manifest saved: ${manifestPath} (${Object.keys(manifest).length} entries)`);
}

async function main() {
  console.log('CRST Media Downloader');
  console.log('=====================');
  console.log(`Source: ${WP_API}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Get first page to determine total
  console.log('Fetching media index...');
  const { items: firstPage, totalPages, totalItems } = await getMediaPage(1);
  totalFound = totalItems;
  console.log(`Found ${totalItems} media items across ${totalPages} pages\n`);

  const allItems = [...firstPage];

  // Fetch remaining pages
  for (let page = 2; page <= totalPages; page++) {
    process.stdout.write(`  Fetching page ${page}/${totalPages}...`);
    try {
      const { items } = await getMediaPage(page);
      allItems.push(...items);
      console.log(` ${items.length} items`);
    } catch (err) {
      console.error(` ERROR: ${err.message}`);
    }
  }

  console.log(`\nDownloading ${allItems.length} files...`);
  await downloadBatch(allItems);

  console.log(`\n\nDone!`);
  console.log(`  Downloaded: ${downloaded}`);
  console.log(`  Skipped (already existed): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Total: ${totalFound}`);

  // Generate manifest for easy reference in templates
  await generateManifest(allItems);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
