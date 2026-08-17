#!/usr/bin/env node

/**
 * scraper/branham-ru.js — Fetch sermons from en.branham.ru and add missing ones
 *
 * en.branham.ru renders all ~1,219 sermons in one HTML page (no API).
 * This scraper is INCREMENTAL — safe to re-run anytime.
 * It deduplicates on write: if a sermon ID exists from any source, it is
 * skipped, and existing duplicates in sermons.json are cleaned up on --write.
 *
 * Usage:
 *   node scraper/branham-ru.js                          # dry-run
 *   node scraper/branham-ru.js --write                  # import missing
 *   node scraper/branham-ru.js --write --full-text      # + fetch sermon body text
 *   node scraper/branham-ru.js --write --year=50,51     # specific years only
 *   node scraper/branham-ru.js --check                  # exits 1 if new sermons exist
 *
 * npm shortcuts:
 *   npm run sync:branham-ru        # --write
 *   npm run sync:all               # themessage.com + branham.ru
 */

const fs   = require('fs');
const path = require('path');

/* ── Paths ─────────────────────────────────────────────────────── */

const ROOT            = path.resolve(__dirname, '..');
const SERMONS_PATH    = path.join(ROOT, '_data', 'sermons.json');
const SEARCH_IDX_PATH = path.join(ROOT, '_data', 'search-index.json');

/* ── Constants ──────────────────────────────────────────────────── */

const BASE_URL    = 'https://en.branham.ru';
const LIST_URL    = `${BASE_URL}/sermons`;
const LANGUAGE    = 'en';
const COVER_IMAGE = 'https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg';
const RATE_LIMIT_MS = 1000;
let lastRequestTime = 0;

/* ── CLI args ───────────────────────────────────────────────────── */

const args        = process.argv.slice(2);
const doWrite     = args.includes('--write');
const checkMode   = args.includes('--check');
const fetchText   = args.includes('--full-text');
const yearFilter  = (() => {
  const a = args.find(a => a.startsWith('--year='));
  return a ? new Set(a.replace('--year=', '').split(',').map(y => y.trim())) : null;
})();

/* ── HTTP helpers ───────────────────────────────────────────────── */

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function rateLimit() {
  const elapsed = Date.now() - lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) await sleep(RATE_LIMIT_MS - elapsed);
  lastRequestTime = Date.now();
}

async function fetchHtml(url, label) {
  await rateLimit();
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'BakariSite-Sermon-Importer/1.0 (educational use)',
      'Accept':     'text/html',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${label || url}`);
  return res.text();
}

/* ── Date parser ────────────────────────────────────────────────── */

/**
 * Parse branham.ru sermon ID into year + ISO date.
 * Handles: "63-0112", "63-0317M", "50-0813A", "00-01X"
 */
function parseDate(id) {
  const m = id.match(/^(\d{2})-(\d{2})(\d{2})[A-Za-z]*$/);
  if (m) {
    const yy   = parseInt(m[1], 10);
    const year = yy === 0 ? null : yy + 1900;
    const date = year ? `${year}-${m[2]}-${m[3]}` : null;
    return { year, date };
  }
  return { year: null, date: null };
}

/* ── List page parser ───────────────────────────────────────────── */

/**
 * Parse the sermon catalogue page.
 * Each row:
 *   <tr class="my-2">
 *     <td><span class="arial text-nowrap">63-0112</span></td>
 *     <td><a href="/sermons/63-0112" class="...">Influence</a></td>
 *     <td><a href="/files/pdf/63-0112.pdf">...</a></td>   ← optional
 *     <td><a href="/files/mp3/hq/63-0112.mp3">...</a></td>← optional
 *   </tr>
 */
function parseListPage(html) {
  const sermons = [];
  const rowRe   = /<tr[^>]*class="my-2"[^>]*>([\s\S]*?)<\/tr>/g;
  let m;

  while ((m = rowRe.exec(html)) !== null) {
    const row = m[1];

    const idM = row.match(/class="arial text-nowrap">([^<]+)<\/span>/);
    if (!idM) continue;
    const id = idM[1].trim();

    const titleM = row.match(/href="\/sermons\/[^"]+"\s[^>]*>([^<]+)<\/a>/);
    const title  = titleM ? titleM[1].trim() : id;

    const pdfM   = row.match(/href="(\/files\/pdf\/[^"]+\.pdf)"/i);
    const pdf_url = pdfM ? `${BASE_URL}${pdfM[1]}` : null;

    const mp3M   = row.match(/href="(\/files\/mp3\/hq\/[^"]+\.mp3)"/i);
    const mp3_url = mp3M ? `${BASE_URL}${mp3M[1]}` : null;

    const { year, date } = parseDate(id);

    sermons.push({
      id,
      number:      null,
      title,
      date,
      year,
      language:    LANGUAGE,
      cover_image: COVER_IMAGE,
      pdf_url,
      m4a_url:     mp3_url,
      series:      null,
      source:      'branham.ru',
    });
  }

  return sermons;
}

/* ── Detail page full-text extractor ───────────────────────────── */

/**
 * Fetch a sermon detail page and extract the full transcript text.
 *
 * The text lives in:  <div class="scalText text-justify col-12 mt-2 p-0">
 * Paragraph numbers:  <span class="arial badge bg-light text-dark">E-1</span>
 * Line breaks:        <br /> between sentences
 *
 * Returns { full_text, paragraphs[] } or null on failure.
 */
async function fetchSermonText(id) {
  const url = `${BASE_URL}/sermons/${id}`;
  let html;
  try {
    html = await fetchHtml(url, id);
  } catch (err) {
    console.warn(`    [text] SKIP ${id}: ${err.message}`);
    return null;
  }

  /* Extract the scalText div */
  const blockM = html.match(/<div[^>]*class="scalText[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
  if (!blockM) return null;

  const block = blockM[1];

  /* Strip HTML tags, decode entities, normalise whitespace */
  const full_text = block
    .replace(/<span[^>]*>E-\d+<\/span>/g, '')   // remove paragraph badges
    .replace(/<br\s*\/?>/gi, '\n')               // <br> → newline
    .replace(/<[^>]+>/g, '')                     // strip remaining tags
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!full_text) return null;

  /* Split into paragraph array (non-empty lines) */
  const paragraphs = full_text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  return { full_text, paragraphs };
}

/* ── Deduplicate helper ─────────────────────────────────────────── */

/**
 * Remove duplicate sermon entries, keeping the richer one.
 * Priority: prefer entry that has pdf_url / full_text / m4a_url.
 * When equal, prefer the entry from themessage.com (original source).
 */
function deduplicateSermons(sermons) {
  const map = new Map();

  for (const s of sermons) {
    const key = `${s.language || 'en'}:${(s.id || '').toUpperCase().trim()}`;
    if (!map.has(key)) {
      map.set(key, s);
      continue;
    }
    const existing = map.get(key);
    /* Score: count non-null valuable fields */
    const score = item => [item.pdf_url, item.m4a_url, item.full_text || item.pdf_text, item.title !== item.id ? item.title : null]
      .filter(Boolean).length;

    const mergedItem = {
      ...existing,
      ...s,
      full_text: ((s.full_text?.length || 0) >= (existing.full_text?.length || 0))
        ? (s.full_text || existing.full_text)
        : existing.full_text,
      pdf_text: s.pdf_text || existing.pdf_text,
      paragraphs: (s.paragraphs && s.paragraphs.length > 0) ? s.paragraphs : existing.paragraphs,
      pdf_url: s.pdf_url || existing.pdf_url,
      m4a_url: s.m4a_url || existing.m4a_url,
      cover_image: s.cover_image || existing.cover_image,
      series: s.series || existing.series,
    };

    map.set(key, mergedItem);
  }

  return [...map.values()];
}

/* ── Search index builder ───────────────────────────────────────── */

function buildSearchIndex(sermons) {
  const index = {};
  for (const s of sermons) {
    const words = (s.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 2);
    words.push(s.id.toLowerCase());

    /* Include top words from full text if available */
    if (s.full_text) {
      const textWords = s.full_text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 3);
      const freq = {};
      for (const w of textWords) freq[w] = (freq[w] || 0) + 1;
      const top = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,150).map(([w]) => w);
      words.push(...top);
    }

    for (const word of [...new Set(words)]) {
      if (!index[word]) index[word] = [];
      const key = `${s.language}:${s.id}`;
      if (!index[word].includes(key)) index[word].push(key);
    }
  }
  return index;
}

/* ── Main ───────────────────────────────────────────────────────── */

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   branham-ru.js — Missing Sermon Importer       ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  const modeLabel = checkMode ? '🔍 CHECK (exits 1 if new sermons found)'
                  : doWrite   ? '✏️  WRITE (will update sermons.json)'
                              : '👁  DRY-RUN (no files changed)';
  console.log(`Mode:        ${modeLabel}`);
  console.log(`Full text:   ${fetchText ? 'Yes (--full-text)' : 'No'}`);
  if (yearFilter) console.log(`Year filter: ${[...yearFilter].join(', ')}`);
  console.log();

  /* 1. Load & deduplicate existing sermons */
  let existing = [];
  try {
    const raw = JSON.parse(fs.readFileSync(SERMONS_PATH, 'utf8'));
    const before = raw.length;
    existing = deduplicateSermons(raw);
    const removed = before - existing.length;
    console.log(`Loaded ${before} sermons from sermons.json`);
    if (removed > 0) console.log(`  └─ ⚠️  Removed ${removed} duplicate(s) on load`);
  } catch {
    console.warn('No existing sermons.json — starting fresh.');
  }

  const existingKeys = new Set(
    existing.filter(s => s.language === LANGUAGE).map(s => s.id.toUpperCase())
  );
  console.log(`  └─ ${existingKeys.size} unique English sermons indexed\n`);

  /* 2. Fetch catalogue page */
  console.log(`Fetching ${LIST_URL} …`);
  let html;
  try {
    html = await fetchHtml(LIST_URL);
    console.log(`  └─ ${html.length.toLocaleString()} bytes received\n`);
  } catch (err) {
    console.error('Failed to fetch sermon list:', err.message);
    process.exit(1);
  }

  /* 3. Parse catalogue */
  const remote = parseListPage(html);
  console.log(`Parsed ${remote.length} sermons from branham.ru`);

  /* 4. Filter to only missing */
  let newSermons = remote.filter(s => !existingKeys.has(s.id.toUpperCase()));

  if (yearFilter) {
    newSermons = newSermons.filter(s => {
      if (!s.year) return yearFilter.has('00');
      return yearFilter.has(String(s.year).slice(-2));
    });
  }

  console.log(`  └─ ${newSermons.length} sermons NOT yet in your data\n`);

  if (newSermons.length === 0) {
    console.log('✅ Nothing to add — your data is already up to date!');
    if (checkMode) process.exit(0);
    return;
  }

  /* --check: just report and exit */
  if (checkMode) {
    console.log(`⚠️  ${newSermons.length} new sermon(s) available on branham.ru.`);
    console.log('Run to import:  npm run sync:branham-ru');
    process.exit(1);
  }

  /* 5. Summary table */
  const byYear = {};
  for (const s of newSermons) {
    const y = s.year ? String(s.year) : 'Unknown';
    (byYear[y] = byYear[y] || []).push(s);
  }

  console.log('New sermons by year:');
  for (const [y, list] of Object.entries(byYear).sort()) {
    const p = list.filter(s => s.pdf_url).length;
    const a = list.filter(s => s.m4a_url).length;
    console.log(`  ${y}: ${String(list.length).padStart(3)} sermons  (PDF: ${p}, MP3: ${a})`);
  }
  console.log();

  console.log('Sample (first 10):');
  for (const s of newSermons.slice(0, 10)) {
    const f = [s.pdf_url ? 'PDF' : '   ', s.m4a_url ? 'MP3' : '   '].join(' ');
    console.log(`  [${f}]  ${s.id.padEnd(12)}  ${s.title}`);
  }
  if (newSermons.length > 10) console.log(`  … and ${newSermons.length - 10} more`);
  console.log();

  /* 6. Dry-run exit */
  if (!doWrite) {
    console.log('─────────────────────────────────────────────────────');
    console.log(`Dry-run complete. ${newSermons.length} sermons ready to import.`);
    console.log('  node scraper/branham-ru.js --write');
    console.log('  node scraper/branham-ru.js --write --full-text   ← also fetch sermon text');
    return;
  }

  /* 7. Optionally fetch full text from detail pages */
  if (fetchText) {
    console.log(`Fetching full text for ${newSermons.length} sermons (rate-limited)…`);
    let fetched = 0, skipped = 0;
    for (let i = 0; i < newSermons.length; i++) {
      const s = newSermons[i];
      process.stdout.write(`  [${i+1}/${newSermons.length}] ${s.id} …`);
      const result = await fetchSermonText(s.id);
      if (result) {
        s.full_text  = result.full_text;
        s.paragraphs = result.paragraphs;
        const words = result.full_text.split(/\s+/).length;
        process.stdout.write(` ${words.toLocaleString()} words ✓\n`);
        fetched++;
      } else {
        process.stdout.write(` (no text)\n`);
        skipped++;
      }
    }
    console.log(`\nFull text: ${fetched} fetched, ${skipped} skipped.\n`);
  }

  /* 8. Merge, deduplicate, sort, write */
  const merged = deduplicateSermons([...existing, ...newSermons]);
  merged.sort((a, b) => {
    if (a.language !== b.language) return a.language.localeCompare(b.language);
    return (a.id || '').localeCompare(b.id || '');
  });

  fs.writeFileSync(SERMONS_PATH, JSON.stringify(merged, null, 2), 'utf8');
  console.log(`✓ Wrote ${merged.length} deduplicated sermons → ${SERMONS_PATH}`);

  /* 9. Rebuild search index */
  process.stdout.write('Building search index … ');
  let existingIndex = {};
  try { existingIndex = JSON.parse(fs.readFileSync(SEARCH_IDX_PATH, 'utf8')); } catch {}

  const newIndex = buildSearchIndex(newSermons);
  for (const [word, keys] of Object.entries(newIndex)) {
    if (!existingIndex[word]) existingIndex[word] = [];
    for (const k of keys) {
      if (!existingIndex[word].includes(k)) existingIndex[word].push(k);
    }
  }

  fs.writeFileSync(SEARCH_IDX_PATH, JSON.stringify(existingIndex, null, 0), 'utf8');
  console.log(`${Object.keys(existingIndex).length} unique words indexed.`);
  console.log(`✓ Updated ${SEARCH_IDX_PATH}`);

  console.log('\n═══════════════════════════════════════════');
  console.log(`  Added:     ${newSermons.length} new sermons`);
  console.log(`  Total now: ${merged.length} sermons (deduplicated)`);
  console.log(`  With PDF:  ${newSermons.filter(s => s.pdf_url).length}`);
  console.log(`  With MP3:  ${newSermons.filter(s => s.m4a_url).length}`);
  if (fetchText) console.log(`  With text: ${newSermons.filter(s => s.full_text).length}`);
  console.log('═══════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
