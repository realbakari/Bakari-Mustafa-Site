#!/usr/bin/env node

/**
 * scraper/index.js — Orchestrator for scraping themessage.com sermon catalogue
 *
 * Usage:
 *   node scraper/index.js                         # Scrape English, all years
 *   node scraper/index.js --language=en --year=65  # English, 1965 only
 *   node scraper/index.js --language=en,fr,ny      # Multiple languages
 *   node scraper/index.js --all-languages          # All 42 languages
 *   node scraper/index.js --extract-pdf            # Also extract PDF text
 *
 * Output:
 *   _data/sermons.json       — All scraped sermons
 *   _data/search-index.json  — Inverted index for text search
 */

const fs = require('fs');
const path = require('path');
const { fetchByYear } = require('./fetcher');
const { parseSermons } = require('./parser');
const pdfExtractor = require('./pdf-extractor');

/* ── Configuration ─────────────────────────────────────────────── */

const ALL_YEARS = [];
for (let y = 47; y <= 65; y++) {
  ALL_YEARS.push(String(y));
}

const LANGUAGES_PATH = path.resolve(__dirname, '..', '_data', 'languages.json');
const OUTPUT_DIR = path.resolve(__dirname, '..', '_data');
const SERMONS_PATH = path.join(OUTPUT_DIR, 'sermons.json');
const SEARCH_INDEX_PATH = path.join(OUTPUT_DIR, 'search-index.json');

/* ── CLI Argument Parsing ──────────────────────────────────────── */

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    languages: ['en'],
    years: ALL_YEARS,
    extractPdf: false,
    allLanguages: false,
  };

  for (const arg of args) {
    if (arg.startsWith('--language=')) {
      opts.languages = arg.replace('--language=', '').split(',');
    } else if (arg.startsWith('--year=')) {
      opts.years = arg.replace('--year=', '').split(',');
    } else if (arg === '--extract-pdf') {
      opts.extractPdf = true;
    } else if (arg === '--all-languages') {
      opts.allLanguages = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
The Message Sermon Scraper
==========================

Usage:
  node scraper/index.js [options]

Options:
  --language=CODE[,CODE]   Languages to scrape (default: en)
  --all-languages          Scrape all 42 languages
  --year=YY[,YY]           Years to scrape (default: all 47-65)
  --extract-pdf            Download and extract PDF text
  --help, -h               Show this help

Examples:
  node scraper/index.js --language=en --year=65
  node scraper/index.js --language=en,fr,ny
  node scraper/index.js --all-languages --year=60,61,62,63,64,65
`);
      process.exit(0);
    }
  }

  /* Load all language codes if --all-languages */
  if (opts.allLanguages) {
    try {
      const langs = JSON.parse(fs.readFileSync(LANGUAGES_PATH, 'utf8'));
      opts.languages = langs.map((l) => l.code);
    } catch {
      console.error('Could not load languages.json — using English only.');
      opts.languages = ['en'];
    }
  }

  return opts;
}

/* ── Search Index Builder ──────────────────────────────────────── */

/**
 * Build an inverted index mapping words → sermon IDs for text search.
 *
 * @param {Array<Object>} sermons
 * @returns {Object} { word: [sermonId1, sermonId2, ...] }
 */
function buildSearchIndex(sermons) {
  const index = {};

  for (const sermon of sermons) {
    /* Tokenise title into lowercase words */
    const words = (sermon.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2);

    /* Also include the sermon ID as a searchable token */
    words.push(sermon.id.toLowerCase());

    /* Add PDF text words if available */
    if (sermon.pdf_text) {
      const pdfWords = sermon.pdf_text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 3);

      /* Limit PDF words to prevent huge index — take unique, most frequent */
      const wordCounts = {};
      for (const w of pdfWords) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
      const topWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 200)
        .map(([w]) => w);
      words.push(...topWords);
    }

    /* Deduplicate words for this sermon */
    const uniqueWords = [...new Set(words)];

    for (const word of uniqueWords) {
      if (!index[word]) index[word] = [];
      /* Store language-qualified key */
      const key = `${sermon.language}:${sermon.id}`;
      if (!index[word].includes(key)) {
        index[word].push(key);
      }
    }
  }

  return index;
}

/* ── Main Scraper Logic ────────────────────────────────────────── */

async function main() {
  const opts = parseArgs();

  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║     The Message — Sermon Catalogue Scraper      ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log(`Languages: ${opts.languages.join(', ')}`);
  console.log(`Years:     ${opts.years.join(', ')}`);
  console.log(`PDF text:  ${opts.extractPdf ? 'Yes' : 'No'}`);
  console.log();

  /* Load existing sermons (to support incremental scraping) */
  let existingSermons = [];
  try {
    existingSermons = JSON.parse(fs.readFileSync(SERMONS_PATH, 'utf8'));
    console.log(`Loaded ${existingSermons.length} existing sermons from cache.`);
  } catch {
    /* No existing data — starting fresh */
  }

  /* Create a set of existing sermon keys to avoid duplicates */
  const existingKeys = new Set(
    existingSermons.map((s) => `${s.language}:${s.id}`)
  );

  const allSermons = [...existingSermons];
  let newCount = 0;
  let errorCount = 0;

  const totalTasks = opts.languages.length * opts.years.length;
  let completed = 0;

  for (const lang of opts.languages) {
    for (const year of opts.years) {
      completed++;
      const progress = `[${completed}/${totalTasks}]`;

      try {
        process.stdout.write(`${progress} Fetching ${lang}/year=${year}...`);

        const html = await fetchByYear(lang, year);
        const sermons = parseSermons(html, lang);

        let added = 0;
        for (const sermon of sermons) {
          const key = `${sermon.language}:${sermon.id}`;
          if (!existingKeys.has(key)) {
            /* Optionally extract PDF text & structured paragraphs */
            if (opts.extractPdf && sermon.pdf_url) {
              process.stdout.write(` [extracting PDF]`);
              const pdfResult = await pdfExtractor.extractText(sermon.pdf_url);
              if (pdfResult) {
                sermon.pdf_text = pdfResult.full_text;
                sermon.paragraphs = pdfResult.paragraphs;
              }
            }

            allSermons.push(sermon);
            existingKeys.add(key);
            added++;
            newCount++;
          }
        }

        console.log(` ${sermons.length} found, ${added} new.`);
      } catch (err) {
        console.log(` ERROR: ${err.message}`);
        errorCount++;
      }
    }
  }

  /* ── Write Output ──────────────────────────────────────────── */

  /* Ensure output directory exists */
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  /* Sort by language, then by number */
  allSermons.sort((a, b) => {
    if (a.language !== b.language) return a.language.localeCompare(b.language);
    return (a.number || 0) - (b.number || 0);
  });

  /* Write sermons.json */
  fs.writeFileSync(SERMONS_PATH, JSON.stringify(allSermons, null, 2), 'utf8');
  console.log(`\n✓ Wrote ${allSermons.length} sermons to ${SERMONS_PATH}`);

  /* Build and write search index */
  process.stdout.write('Building search index...');
  const searchIndex = buildSearchIndex(allSermons);
  const indexWords = Object.keys(searchIndex).length;
  fs.writeFileSync(
    SEARCH_INDEX_PATH,
    JSON.stringify(searchIndex, null, 0),
    'utf8'
  );
  console.log(` ${indexWords} unique words indexed.`);
  console.log(`✓ Wrote search index to ${SEARCH_INDEX_PATH}`);

  /* Update languages.json with sermon counts */
  try {
    const languages = JSON.parse(fs.readFileSync(LANGUAGES_PATH, 'utf8'));
    for (const lang of languages) {
      lang.sermon_count = allSermons.filter(
        (s) => s.language === lang.code
      ).length;
    }
    fs.writeFileSync(LANGUAGES_PATH, JSON.stringify(languages, null, 2), 'utf8');
    console.log(`✓ Updated language sermon counts in ${LANGUAGES_PATH}`);
  } catch (err) {
    console.error(`Warning: Could not update languages.json: ${err.message}`);
  }

  /* ── Summary ───────────────────────────────────────────────── */

  console.log('\n═══════════════════════════════════════════');
  console.log(`  Total sermons:  ${allSermons.length}`);
  console.log(`  New this run:   ${newCount}`);
  console.log(`  Errors:         ${errorCount}`);
  console.log(`  Index words:    ${indexWords}`);
  console.log('═══════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
