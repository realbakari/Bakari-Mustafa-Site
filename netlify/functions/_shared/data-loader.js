/**
 * _shared/data-loader.js — Load and query pre-built sermon data
 *
 * Loads the JSON files built by the scraper and provides
 * query, filter, pagination, date search, and full-text helpers.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/* ── Data Cache (loaded once per cold start) ───────────────────── */

let _sermons = null;
let _languages = null;
let _searchIndex = null;
const _transcriptCache = new Map();
const _langSermonsCache = {};

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
      const raw = JSON.parse(
        fs.readFileSync(getDataPath('sermons.json'), 'utf8')
      );
      // Canonicalize language codes in memory (e.g. ny -> nya)
      _sermons = raw.map((s) => ({
        ...s,
        language: s.language === 'ny' ? 'nya' : (s.language || 'en'),
        pdf_url: s.pdf_url && !s.pdf_url.includes('messagehub.info') ? s.pdf_url : null,
      }));
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

/* ── Language Normalization ────────────────────────────────────── */

const MH_LANG_ALIASES = {
  fr: 'fra',
  ny: 'nya',
  nya: 'nya',
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

function matchLanguage(sermonLang, targetLang) {
  if (!targetLang) return true;
  const normTarget = normalizeLangCode(targetLang);
  const normSermon = normalizeLangCode(sermonLang);
  return normSermon === normTarget;
}

/* ── Sermon Formatting Helpers ─────────────────────────────────── */

/**
 * Return a clean summary representation of a sermon.
 * Strips heavy full-text and paragraph structures to prevent multi-megabyte payloads.
 */
function formatSermonSummary(s, matchSnippet = null) {
  const normLang = s.language === 'ny' ? 'nya' : (s.language || 'en');
  const validPdf = s.pdf_url && !s.pdf_url.includes('messagehub.info') ? s.pdf_url : null;
  const validAudio = s.m4a_url && !s.m4a_url.includes('messagehub.info') ? s.m4a_url : null;

  const summary = {
    id: s.id,
    number: s.number ?? null,
    title: s.title || s.id,
    date: s.date || null,
    year: s.year || (s.date ? parseInt(s.date.slice(0, 4), 10) : null),
    language: normLang,
    cover_image: s.cover_image || 'https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg',
    pdf_url: validPdf,
    m4a_url: validAudio,
    series: s.series || null,
    location: s.location || null,
    source: s.source || (validPdf ? 'themessage' : 'messagehub'),
  };

  if (matchSnippet) {
    summary.match_snippet = matchSnippet;
  }

  return summary;
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
 * Fetch list of sermons for any language from MessageHub
 */
async function fetchLanguageSermonsFromMessageHub(langCode) {
  const mhCode = normalizeLangCode(langCode);
  if (_langSermonsCache[mhCode]) return _langSermonsCache[mhCode];

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 300;
  const secret = 'MessageHubSecretKey2021';
  const token = crypto.createHash('md5').update(`${now}${exp}${secret}`).digest('hex');

  const headers = {
    token,
    timestamp: now.toString(),
    expirationTime: exp.toString(),
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    Accept: 'application/json',
  };

  try {
    const res = await fetch(`https://search.messagehub.info/api/languages/${mhCode}/sermons`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const mapped = data.map((s) => {
          let isoDate = null;
          let year = null;
          if (s.dateCode && /^\d{2}-\d{4}/.test(s.dateCode)) {
            const yy = parseInt(s.dateCode.slice(0, 2), 10);
            const mm = s.dateCode.slice(3, 5);
            const dd = s.dateCode.slice(5, 7);
            year = yy < 100 ? (yy > 40 ? 1900 + yy : 2000 + yy) : yy;
            isoDate = `${year}-${mm}-${dd}`;
          } else if (s.date) {
            const d = new Date(s.date);
            if (!isNaN(d.getTime())) {
              isoDate = d.toISOString().slice(0, 10);
              year = d.getFullYear();
            }
          }

          return {
            id: s.dateCode || String(s.id),
            number: null,
            title: s.title || 'Untitled Sermon',
            date: isoDate,
            year,
            language: mhCode === 'nya' ? 'nya' : langCode,
            location: s.location || null,
            cover_image: 'https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg',
            // Do NOT fabricate 404 links on search.messagehub.info
            pdf_url: null,
            m4a_url: null,
            series: null,
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
async function getSermons({ language, year, date, series, page, limit } = {}) {
  let sermons = loadSermons();

  if (language && language !== 'en') {
    const localMatches = sermons.filter((s) => matchLanguage(s.language, language));
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
    const fullYear = yearNum < 100 ? (yearNum > 40 ? yearNum + 1900 : yearNum + 2000) : yearNum;
    sermons = sermons.filter((s) => s.year === fullYear);
  }

  if (date) {
    const parsedDate = parseSearchDate(date) || date.trim();
    sermons = sermons.filter(
      (s) =>
        (s.date && s.date === parsedDate) ||
        (s.id && (s.id.startsWith(parsedDate) || s.id.toLowerCase() === parsedDate.toLowerCase()))
    );
  }

  if (series) {
    const seriesLower = series.toLowerCase();
    sermons = sermons.filter(
      (s) => s.series && s.series.toLowerCase().includes(seriesLower)
    );
  }

  // Format to lightweight summaries without heavy full_text/paragraphs
  const summaries = sermons.map((s) => formatSermonSummary(s));
  return paginate(summaries, page, limit);
}

/**
 * Get a specific sermon by ID, optionally in a specific language.
 */
function getSermonById(id, language = null) {
  const sermons = loadSermons();
  const cleanId = (id || '').toUpperCase().trim();
  const matches = sermons.filter((s) => (s.id || '').toUpperCase().trim() === cleanId);

  let sermon = null;
  if (language) {
    sermon = matches.find((s) => matchLanguage(s.language, language)) || null;
  } else {
    sermon = matches.length === 1 ? matches[0] : matches.length > 0 ? matches[0] : null;
  }

  return sermon ? formatSermonSummary(sermon) : null;
}

/* ── Transcript Caching & Fetching ──────────────────────────────── */

function getDiskCachedTranscript(id, language) {
  const normLang = normalizeLangCode(language);
  const filename = `${normLang}-${id}.json`;

  // Check _data/transcripts/
  const transcriptsDir = getDataPath('transcripts');
  const filePath = path.join(transcriptsDir, filename);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      // ignore
    }
  }

  // Check /tmp/transcripts/
  const tmpPath = path.join('/tmp', 'transcripts', filename);
  if (fs.existsSync(tmpPath)) {
    try {
      return JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
    } catch {
      // ignore
    }
  }

  return null;
}

function saveDiskCachedTranscript(id, language, data) {
  try {
    const normLang = normalizeLangCode(language);
    const filename = `${normLang}-${id}.json`;
    const tmpDir = path.join('/tmp', 'transcripts');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(path.join(tmpDir, filename), JSON.stringify(data), 'utf8');
  } catch {
    // Non-fatal if /tmp is constrained
  }
}

/**
 * Fetch sermon paragraph blocks directly from Message Hub API with caching and timeout
 */
async function fetchSermonBlocksFromMessageHub(id, language = 'en') {
  const mhCode = normalizeLangCode(language);
  const cacheKey = `${mhCode}:${id.toUpperCase().trim()}`;

  // 1. Check in-memory cache
  if (_transcriptCache.has(cacheKey)) {
    return _transcriptCache.get(cacheKey);
  }

  // 2. Check disk cache
  const diskCached = getDiskCachedTranscript(id, language);
  if (diskCached) {
    _transcriptCache.set(cacheKey, diskCached);
    return diskCached;
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 300;
  const secret = 'MessageHubSecretKey2021';
  const token = crypto.createHash('md5').update(`${now}${exp}${secret}`).digest('hex');

  const headers = {
    token,
    timestamp: now.toString(),
    expirationTime: exp.toString(),
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    Accept: 'application/json',
  };

  try {
    const res = await fetch(
      `https://search.messagehub.info/api/languages/${mhCode}/sermons/${encodeURIComponent(id)}/blocks`,
      {
        headers,
        signal: AbortSignal.timeout(8000), // 8-second timeout to avoid 20-second hangs
      }
    );
    if (!res.ok) return null;
    const data = await res.json();

    if (data && data.blocks && Array.isArray(data.blocks)) {
      const paragraphs = data.blocks.map((b) => ({
        number: b.blockNumber,
        text: (b.blockText || '')
          .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
      }));
      const fullText = paragraphs.map((p) => `¶${p.number} ${p.text}`).join('\n\n');

      const result = {
        id: data.dateCode || id,
        title: data.title || id,
        location: data.location || null,
        language: mhCode === 'nya' ? 'nya' : language,
        date: data.date || null,
        // Genuine PDF only; MessageHub doesn't provide PDFs for these
        pdf_url: null,
        full_text: fullText,
        paragraphs,
        source: 'messagehub',
      };

      _transcriptCache.set(cacheKey, result);
      saveDiskCachedTranscript(id, language, result);
      return result;
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
  const normLang = normalizeLangCode(language);
  const cacheKey = `${normLang}:${id.toUpperCase().trim()}`;

  // Check in-memory transcript cache
  if (_transcriptCache.has(cacheKey)) {
    return _transcriptCache.get(cacheKey);
  }

  // Check disk cache
  const diskCached = getDiskCachedTranscript(id, language);
  if (diskCached) {
    _transcriptCache.set(cacheKey, diskCached);
    return diskCached;
  }

  const sermons = loadSermons();
  const cleanId = (id || '').toUpperCase().trim();
  const sermon = sermons.find(
    (s) =>
      (s.id || '').toUpperCase().trim() === cleanId &&
      (!language || matchLanguage(s.language, language))
  );

  if (sermon && (sermon.full_text || sermon.pdf_text || (sermon.paragraphs && sermon.paragraphs.length > 0))) {
    const validPdf = sermon.pdf_url && !sermon.pdf_url.includes('messagehub.info') ? sermon.pdf_url : null;
    const result = {
      id: sermon.id,
      title: sermon.title,
      language: sermon.language === 'ny' ? 'nya' : sermon.language,
      date: sermon.date,
      pdf_url: validPdf,
      m4a_url: sermon.m4a_url || null,
      full_text: sermon.full_text || sermon.pdf_text || null,
      paragraphs: sermon.paragraphs || [],
      source: sermon.source || 'local',
    };
    _transcriptCache.set(cacheKey, result);
    return result;
  }

  // Fallback: Fetch directly from Message Hub REST API
  const mhData = await fetchSermonBlocksFromMessageHub(id, normLang);
  if (mhData) {
    const validPdf = sermon && sermon.pdf_url && !sermon.pdf_url.includes('messagehub.info') ? sermon.pdf_url : null;
    const result = {
      id: sermon ? sermon.id : mhData.id,
      title: sermon ? sermon.title : mhData.title,
      language: normLang,
      date: sermon ? sermon.date : mhData.date,
      pdf_url: validPdf,
      m4a_url: sermon ? sermon.m4a_url : null,
      full_text: mhData.full_text,
      paragraphs: mhData.paragraphs,
      source: 'messagehub',
    };
    _transcriptCache.set(cacheKey, result);
    return result;
  }

  if (sermon) {
    const validPdf = sermon.pdf_url && !sermon.pdf_url.includes('messagehub.info') ? sermon.pdf_url : null;
    return {
      id: sermon.id,
      title: sermon.title,
      language: sermon.language === 'ny' ? 'nya' : sermon.language,
      date: sermon.date,
      pdf_url: validPdf,
      m4a_url: sermon.m4a_url || null,
      full_text: sermon.full_text || sermon.pdf_text || null,
      paragraphs: sermon.paragraphs || [],
      source: sermon.source || 'local',
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
    sermons = sermons.filter((s) => matchLanguage(s.language, language));
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

/* ── Date Parsing Helper ───────────────────────────────────────── */

const MONTH_NAMES = {
  january: '01',
  jan: '01',
  february: '02',
  feb: '02',
  march: '03',
  mar: '03',
  april: '04',
  apr: '04',
  may: '05',
  june: '06',
  jun: '06',
  july: '07',
  jul: '07',
  august: '08',
  aug: '08',
  september: '09',
  sep: '09',
  sept: '09',
  october: '10',
  oct: '10',
  november: '11',
  nov: '11',
  december: '12',
  dec: '12',
};

function parseSearchDate(q) {
  if (!q || typeof q !== 'string') return null;
  const s = q.trim();

  // YYYY-MM-DD
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;

  // YY-MMDD or YY-MM-DD (e.g. 65-0718 or 65-07-18)
  const codeMatch = s.match(/^(\d{2})-?(\d{2})(\d{2})[A-Za-z]?$/);
  if (codeMatch) {
    const yy = parseInt(codeMatch[1], 10);
    const yr = yy < 100 ? (yy > 40 ? 1900 + yy : 2000 + yy) : yy;
    return `${yr}-${codeMatch[2]}-${codeMatch[3]}`;
  }

  // Month name DD, YYYY or Month name DD YYYY
  const naturalMatch = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (naturalMatch) {
    const m = MONTH_NAMES[naturalMatch[1].toLowerCase()];
    if (m) {
      const d = naturalMatch[2].padStart(2, '0');
      return `${naturalMatch[3]}-${m}-${d}`;
    }
  }

  // DD Month name YYYY
  const dayFirstMatch = s.match(/^(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})$/);
  if (dayFirstMatch) {
    const m = MONTH_NAMES[dayFirstMatch[2].toLowerCase()];
    if (m) {
      const d = dayFirstMatch[1].padStart(2, '0');
      return `${dayFirstMatch[3]}-${m}-${d}`;
    }
  }

  return null;
}

function extractSnippet(text, phrase, maxLength = 160) {
  if (!text || !phrase) return null;
  const lowerText = text.toLowerCase();
  const lowerPhrase = phrase.toLowerCase();
  const idx = lowerText.indexOf(lowerPhrase);
  if (idx === -1) return null;

  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + phrase.length + 80);
  let snippet = text.slice(start, end).replace(/\s+/g, ' ').trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';
  return snippet;
}

/* ── Full-Text & Phrase Search ─────────────────────────────────── */

/**
 * Multi-factor search:
 * - Exact phrase matching (quotes or phrase substring in title/body)
 * - All words (AND query) matching for multi-word queries
 * - Date search (YYYY-MM-DD, YY-MMDD, Month Day YYYY, Year)
 * - Returns clean summary objects (NO heavy full-text or paragraphs)
 */
function searchSermons(query, { language, date, year, page, limit } = {}) {
  const sermons = loadSermons();

  let targetDate = date ? parseSearchDate(date) || date.trim() : null;
  let targetYear = year ? parseInt(year, 10) : null;
  if (targetYear && targetYear < 100) {
    targetYear = targetYear > 40 ? 1900 + targetYear : 2000 + targetYear;
  }

  const rawQuery = (query || '').trim();
  const isQuoted = /^["'].+["']$/.test(rawQuery);
  const cleanQuery = rawQuery.replace(/^["']|["']$/g, '').trim().toLowerCase();

  // If query itself is a date format, recognize it
  if (!targetDate && cleanQuery) {
    const parsedFromQ = parseSearchDate(cleanQuery);
    if (parsedFromQ) {
      targetDate = parsedFromQ;
    } else if (/^\d{4}$/.test(cleanQuery)) {
      targetYear = parseInt(cleanQuery, 10);
    }
  }

  const queryWords = cleanQuery
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  // If there is no text query and only date/year filtering
  if (!cleanQuery && (targetDate || targetYear)) {
    let filtered = sermons;
    if (language) {
      filtered = filtered.filter((s) => matchLanguage(s.language, language));
    }
    if (targetDate) {
      filtered = filtered.filter((s) => s.date === targetDate || (s.id && s.id.startsWith(targetDate)));
    }
    if (targetYear) {
      filtered = filtered.filter((s) => s.year === targetYear);
    }
    const summaries = filtered.map((s) => formatSermonSummary(s));
    return paginate(summaries, page, limit);
  }

  if (!cleanQuery && !targetDate && !targetYear) {
    return paginate([], page, limit);
  }

  const scoredResults = [];

  for (const sermon of sermons) {
    // 1. Language filter
    if (language && !matchLanguage(sermon.language, language)) {
      continue;
    }

    // 2. Date / Year filter (if explicitly passed)
    if (targetDate && sermon.date !== targetDate && (!sermon.id || !sermon.id.startsWith(targetDate))) {
      continue;
    }
    if (targetYear && sermon.year !== targetYear) {
      continue;
    }

    const titleLower = (sermon.title || '').toLowerCase();
    const idLower = (sermon.id || '').toLowerCase();
    const bodyText = sermon.full_text || sermon.pdf_text || '';
    const bodyLower = bodyText.toLowerCase();

    let score = 0;
    let snippet = null;

    // Check Date match from query
    if (targetDate && (sermon.date === targetDate || idLower.startsWith(targetDate.toLowerCase()))) {
      score += 40000;
    }
    if (targetYear && sermon.year === targetYear) {
      score += 5000;
    }

    // Check ID match
    if (idLower === cleanQuery) {
      score += 50000;
    } else if (idLower.includes(cleanQuery)) {
      score += 20000;
    }

    // Check Exact Title match
    if (titleLower === cleanQuery) {
      score += 30000;
    } else if (titleLower.includes(cleanQuery)) {
      // Substring phrase match in title!
      score += 15000;
    }

    // Multi-word phrase & AND matching
    if (queryWords.length > 1) {
      const allWordsInTitle = queryWords.every((w) => titleLower.includes(w));
      const allWordsInBody = queryWords.every((w) => bodyLower.includes(w) || titleLower.includes(w));

      if (allWordsInTitle) {
        score += 8000;
      }

      if (bodyLower.includes(cleanQuery)) {
        score += 4000;
        snippet = extractSnippet(bodyText, cleanQuery);
      } else if (allWordsInBody) {
        score += 1500;
        snippet = extractSnippet(bodyText, queryWords[0]);
      } else if (!isQuoted) {
        // Partial word matches only count if query is not quoted
        const titleMatches = queryWords.filter((w) => titleLower.includes(w)).length;
        if (titleMatches > 0) {
          score += titleMatches * 100;
        }
      }
    } else if (queryWords.length === 1) {
      const singleWord = queryWords[0];
      if (titleLower.includes(singleWord)) {
        score += 5000;
      } else if (bodyLower.includes(singleWord)) {
        score += 1000;
        snippet = extractSnippet(bodyText, singleWord);
      }
    }

    // If exact phrase quotes were used, require that either title, ID, or body contained the phrase
    if (isQuoted && !titleLower.includes(cleanQuery) && !idLower.includes(cleanQuery) && !bodyLower.includes(cleanQuery)) {
      continue;
    }

    if (score > 0) {
      scoredResults.push({
        sermon,
        score,
        snippet,
      });
    }
  }

  // Sort by score descending, then by date descending
  scoredResults.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.sermon.date && b.sermon.date) return b.sermon.date.localeCompare(a.sermon.date);
    return (a.sermon.id || '').localeCompare(b.sermon.id || '');
  });

  const formatted = scoredResults.map((r) => formatSermonSummary(r.sermon, r.snippet));
  return paginate(formatted, page, limit);
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
    const lang = s.language === 'ny' ? 'nya' : (s.language || 'en');
    langCounts[lang] = (langCounts[lang] || 0) + 1;
  }

  return {
    total_sermons: sermons.length,
    total_languages: Object.keys(langCounts).length,
    available_languages: languages.length,
    year_range:
      years.length > 0
        ? { earliest: years[0].year, latest: years[years.length - 1].year }
        : null,
    sermons_with_pdf: sermons.filter((s) => s.pdf_url && !s.pdf_url.includes('messagehub.info')).length,
    sermons_with_audio: sermons.filter((s) => s.m4a_url).length,
    sermons_with_text: sermons.filter(
      (s) =>
        s.full_text ||
        s.pdf_text ||
        (s.paragraphs && s.paragraphs.length > 0) ||
        (s.pdf_url && !s.pdf_url.includes('messagehub.info'))
    ).length,
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
  normalizeLangCode,
};
