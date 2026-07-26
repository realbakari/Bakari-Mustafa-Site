/**
 * _shared/data-loader.js — Load and query pre-built sermon data
 *
 * Loads the JSON files built by the scraper and provides
 * query, filter, pagination, and search helpers.
 */

const fs = require('fs');
const path = require('path');

/* ── Data Cache (loaded once per cold start) ───────────────────── */

let _sermons = null;
let _languages = null;
let _searchIndex = null;

function getDataPath(filename) {
  /* Try process.cwd() first (works in local dev & Netlify build environment) */
  const cwdPath = path.resolve(process.cwd(), '_data', filename);
  if (fs.existsSync(cwdPath)) return cwdPath;

  /* Fallback relative path from netlify/functions/_shared */
  return path.resolve(__dirname, '..', '..', '..', '_data', filename);
}

function loadSermons() {
  if (!_sermons) {
    try {
      _sermons = JSON.parse(
        fs.readFileSync(getDataPath('sermons.json'), 'utf8')
      );
    } catch {
      _sermons = [];
    }
  }
  return _sermons;
}

function loadLanguages() {
  if (!_languages) {
    try {
      _languages = JSON.parse(
        fs.readFileSync(getDataPath('languages.json'), 'utf8')
      );
    } catch {
      _languages = [];
    }
  }
  return _languages;
}

function loadSearchIndex() {
  if (!_searchIndex) {
    try {
      _searchIndex = JSON.parse(
        fs.readFileSync(getDataPath('search-index.json'), 'utf8')
      );
    } catch {
      _searchIndex = {};
    }
  }
  return _searchIndex;
}

/* ── Query Helpers ─────────────────────────────────────────────── */

/**
 * Paginate an array.
 */
function paginate(items, page = 1, limit = 50) {
  page = Math.max(1, parseInt(page, 10) || 1);
  limit = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));

  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = items.slice(offset, offset + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1,
    },
  };
}

/**
 * Get all sermons, optionally filtered.
 */
function getSermons({ language, year, series, page, limit } = {}) {
  let sermons = loadSermons();

  if (language) {
    sermons = sermons.filter((s) => s.language === language);
  }
  if (year) {
    const yearNum = parseInt(year, 10);
    /* Support both 2-digit (65) and 4-digit (1965) year input */
    const fullYear = yearNum < 100 ? yearNum + 1900 : yearNum;
    sermons = sermons.filter((s) => s.year === fullYear);
  }
  if (series) {
    const seriesLower = series.toLowerCase();
    sermons = sermons.filter(
      (s) => s.series && s.series.toLowerCase().includes(seriesLower)
    );
  }

  return paginate(sermons, page, limit);
}

/**
 * Get a specific sermon by ID, optionally in a specific language.
 */
function getSermonById(id, language = null) {
  const sermons = loadSermons();
  const matches = sermons.filter((s) => s.id === id);

  if (language) {
    return matches.find((s) => s.language === language) || null;
  }

  /* Return all language variants if no language specified */
  return matches.length === 1 ? matches[0] : matches.length > 0 ? matches : null;
}

/**
 * Get full transcript text and structured paragraphs for a sermon.
 */
function getSermonText(id, language = null) {
  const sermon = getSermonById(id, language);
  if (!sermon) return null;

  return {
    id: sermon.id,
    title: sermon.title,
    language: sermon.language,
    date: sermon.date,
    pdf_url: sermon.pdf_url,
    m4a_url: sermon.m4a_url,
    full_text: sermon.pdf_text || null,
    paragraphs: sermon.paragraphs || [],
  };
}

/**
 * Get all available languages with sermon counts.
 */
function getLanguages() {
  const languages = loadLanguages();
  const sermons = loadSermons();

  /* Recalculate counts from actual data */
  return languages.map((lang) => ({
    ...lang,
    sermon_count: sermons.filter((s) => s.language === lang.code).length,
  }));
}

/**
 * Get all unique years with sermon counts.
 */
function getYears(language = null) {
  let sermons = loadSermons();

  if (language) {
    sermons = sermons.filter((s) => s.language === language);
  }

  const yearCounts = {};
  for (const s of sermons) {
    if (s.year) {
      yearCounts[s.year] = (yearCounts[s.year] || 0) + 1;
    }
  }

  return Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year, 10), count }))
    .sort((a, b) => a.year - b.year);
}

/**
 * Full-text search across sermon titles and PDF text.
 */
function searchSermons(query, { language, page, limit } = {}) {
  if (!query || typeof query !== 'string') {
    return paginate([], page, limit);
  }

  const index = loadSearchIndex();
  const sermons = loadSermons();

  /* Tokenise query */
  const queryWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  if (queryWords.length === 0) {
    return paginate([], page, limit);
  }

  /* Find matching sermon keys — score by number of matching words */
  const scores = {};

  for (const word of queryWords) {
    /* Exact match */
    const exact = index[word] || [];
    for (const key of exact) {
      scores[key] = (scores[key] || 0) + 2;
    }

    /* Prefix match */
    for (const indexWord of Object.keys(index)) {
      if (indexWord.startsWith(word) && indexWord !== word) {
        for (const key of index[indexWord]) {
          scores[key] = (scores[key] || 0) + 1;
        }
      }
    }
  }

  /* Convert scored keys to sermons, sorted by relevance */
  let results = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => {
      const [lang, ...idParts] = key.split(':');
      const id = idParts.join(':');
      return sermons.find((s) => s.id === id && s.language === lang);
    })
    .filter(Boolean);

  /* Filter by language if specified */
  if (language) {
    results = results.filter((s) => s.language === language);
  }

  return paginate(results, page, limit);
}

/**
 * Get aggregate stats about the data.
 */
function getStats() {
  const sermons = loadSermons();
  const languages = loadLanguages();
  const years = getYears();

  const langCounts = {};
  for (const s of sermons) {
    langCounts[s.language] = (langCounts[s.language] || 0) + 1;
  }

  return {
    total_sermons: sermons.length,
    total_languages: Object.keys(langCounts).length,
    available_languages: languages.length,
    year_range: years.length > 0
      ? { earliest: years[0].year, latest: years[years.length - 1].year }
      : null,
    sermons_with_pdf: sermons.filter((s) => s.pdf_url).length,
    sermons_with_audio: sermons.filter((s) => s.m4a_url).length,
    sermons_with_text: sermons.filter((s) => s.pdf_text).length,
  };
}

module.exports = {
  getSermons,
  getSermonById,
  getSermonText,
  getLanguages,
  getYears,
  searchSermons,
  getStats,
};
