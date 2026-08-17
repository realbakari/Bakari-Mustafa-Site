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

const MH_LANG_ALIASES = {
  fr: 'fra',
  ny: 'nya',
  zh: 'zh',
  ja: 'ja',
  es: 'es',
  pt: 'pt',
  ru: 'ru',
  nl: 'nl',
  pl: 'pl',
  it: 'it',
  ro: 'ro',
  af: 'af',
  sw: 'sw',
  de: 'de',
  tl: 'tl',
  hr: 'hr',
  rw: 'rw',
  ar: 'ar',
  hi: 'hi',
  vi: 'vi',
  id: 'id',
  yo: 'yor',
  cs: 'cs',
  bg: 'bg',
  ko: 'ko',
  fa: 'fa',
  ur: 'ur',
};

function normalizeLangCode(code) {
  if (!code) return 'en';
  const clean = code.toLowerCase().trim();
  return MH_LANG_ALIASES[clean] || clean;
}

const _langSermonsCache = {};

/**
 * Fetch list of sermons for any language from MessageHub
 */
async function fetchLanguageSermonsFromMessageHub(langCode) {
  const mhCode = normalizeLangCode(langCode);
  if (_langSermonsCache[mhCode]) return _langSermonsCache[mhCode];

  const crypto = require('crypto');
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 300;
  const secret = 'MessageHubSecretKey2021';
  const token = crypto.createHash('md5').update(`${now}${exp}${secret}`).digest('hex');

  const headers = {
    token: token,
    timestamp: now.toString(),
    expirationTime: exp.toString(),
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    Accept: 'application/json',
  };

  try {
    const res = await fetch(`https://search.messagehub.info/api/languages/${mhCode}/sermons`, { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const mapped = data.map(s => {
          const rawYear = s.dateCode ? parseInt(s.dateCode.slice(0, 2), 10) : 0;
          const fullYear = rawYear > 0 ? (rawYear < 100 ? rawYear + 1900 : rawYear) : null;
          return {
            id: s.dateCode || String(s.id),
            title: s.title || 'Untitled Sermon',
            date: s.date || null,
            year: fullYear,
            language: langCode,
            location: s.location || null,
            pdf_url: `https://search.messagehub.info/api/languages/${mhCode}/sermons/${encodeURIComponent(s.dateCode || s.id)}/pdf`,
            m4a_url: null,
            source: 'messagehub',
          };
        });
        _langSermonsCache[mhCode] = mapped;
        return mapped;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch sermons for language ${langCode}:`, err.message);
  }
  return [];
}

/**
 * Get all sermons, optionally filtered.
 */
async function getSermons({ language, year, series, page, limit } = {}) {
  let sermons = loadSermons();

  if (language && language !== 'en') {
    const localMatches = sermons.filter((s) => s.language === language || normalizeLangCode(s.language) === normalizeLangCode(language));
    if (localMatches.length > 0) {
      sermons = localMatches;
    } else {
      const remoteSermons = await fetchLanguageSermonsFromMessageHub(language);
      if (remoteSermons && remoteSermons.length > 0) {
        sermons = remoteSermons;
      } else {
        sermons = [];
      }
    }
  } else if (language === 'en') {
    sermons = sermons.filter((s) => !s.language || s.language === 'en');
  }

  if (year) {
    const yearNum = parseInt(year, 10);
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
    return matches.find((s) => s.language === language || normalizeLangCode(s.language) === normalizeLangCode(language)) || null;
  }

  return matches.length === 1 ? matches[0] : matches.length > 0 ? matches : null;
}

/**
 * Fetch sermon paragraph blocks directly from Message Hub API
 */
async function fetchSermonBlocksFromMessageHub(id, language = 'en') {
  const crypto = require('crypto');
  const mhCode = normalizeLangCode(language);
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 300;
  const secret = 'MessageHubSecretKey2021';
  const token = crypto.createHash('md5').update(`${now}${exp}${secret}`).digest('hex');

  const headers = {
    token: token,
    timestamp: now.toString(),
    expirationTime: exp.toString(),
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    Accept: 'application/json',
  };

  try {
    const res = await fetch(`https://search.messagehub.info/api/languages/${mhCode}/sermons/${encodeURIComponent(id)}/blocks`, { headers });
    if (!res.ok) return null;
    const data = await res.json();

    if (data && data.blocks && Array.isArray(data.blocks)) {
      const paragraphs = data.blocks.map(b => ({
        number: b.blockNumber,
        text: (b.blockText || '').replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ').trim()
      }));
      const fullText = paragraphs.map(p => `¶${p.number} ${p.text}`).join('\n\n');
      return {
        id: data.dateCode || id,
        title: data.title || id,
        location: data.location || null,
        language,
        date: data.date || null,
        full_text: fullText,
        paragraphs,
        source: 'messagehub'
      };
    }
  } catch (err) {
    console.warn(`Message Hub fetch error for ${id} (${language}):`, err.message);
  }
  return null;
}

/**
 * Get full transcript text and structured paragraphs for a sermon.
 */
async function getSermonText(id, language = null) {
  const sermon = getSermonById(id, language);

  if (sermon && (sermon.full_text || sermon.pdf_text || (sermon.paragraphs && sermon.paragraphs.length > 0))) {
    return {
      id: sermon.id,
      title: sermon.title,
      language: sermon.language,
      date: sermon.date,
      pdf_url: sermon.pdf_url,
      m4a_url: sermon.m4a_url,
      full_text: sermon.full_text || sermon.pdf_text || null,
      paragraphs: sermon.paragraphs || [],
      source: sermon.source || 'local'
    };
  }

  /* Fallback: Fetch directly from Message Hub REST API */
  const mhData = await fetchSermonBlocksFromMessageHub(id, language || (sermon ? sermon.language : 'en'));
  if (mhData) {
    return {
      id: sermon ? sermon.id : mhData.id,
      title: sermon ? sermon.title : mhData.title,
      language: language || (sermon ? sermon.language : 'en'),
      date: sermon ? sermon.date : mhData.date,
      pdf_url: sermon ? sermon.pdf_url : `https://search.messagehub.info/api/languages/${normalizeLangCode(language)}/sermons/${encodeURIComponent(id)}/pdf`,
      m4a_url: sermon ? sermon.m4a_url : null,
      full_text: mhData.full_text,
      paragraphs: mhData.paragraphs,
      source: 'messagehub'
    };
  }

  if (sermon) {
    return {
      id: sermon.id,
      title: sermon.title,
      language: sermon.language,
      date: sermon.date,
      pdf_url: sermon.pdf_url,
      m4a_url: sermon.m4a_url,
      full_text: sermon.full_text || sermon.pdf_text || null,
      paragraphs: sermon.paragraphs || [],
      source: sermon.source || 'local'
    };
  }

  return null;
}

/**
 * Get all available languages with sermon counts.
 */
function getLanguages() {
  const languages = loadLanguages();
  return languages;
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
    sermons_with_text: sermons.filter((s) => s.full_text || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0) || s.pdf_url).length,
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
