/**
 * fetcher.js — HTTP client for themessage.com ASP.NET WebMethod endpoints
 *
 * The site uses jQuery AJAX calls to internal WebMethods that return
 * JSON-wrapped HTML fragments: { d: "<html table rows>" }
 *
 * Discovered endpoints:
 *   POST /{lang}/themessage/sermonsdownload.aspx/wmSearchByYear
 *   POST /{lang}/themessage/sermonsdownload.aspx/wmSearch
 *   POST /{lang}/themessage/sermonsdownload.aspx/wmSearchBySeries
 */

const BASE_URL = 'https://themessage.com';

/* Rate limit: minimum ms between requests */
const RATE_LIMIT_MS = 1200;
let lastRequestTime = 0;

/**
 * Sleep for the given number of milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Enforce rate limiting between requests.
 */
async function rateLimit() {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < RATE_LIMIT_MS) {
    await sleep(RATE_LIMIT_MS - elapsed);
  }
  lastRequestTime = Date.now();
}

/* Language session cookie cache */
const sessionCookies = {};

/**
 * Ensure a valid session cookie exists for the given language context.
 */
async function getSessionCookie(lang) {
  if (sessionCookies[lang]) return sessionCookies[lang];

  const pageUrl = `https://themessage.com/${lang}/sermonsdownload`;
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'TheMessageAPI-Scraper/1.0 (educational project)',
      },
    });
    const cookieHeader = res.headers.get('set-cookie') || '';
    sessionCookies[lang] = cookieHeader;
    return cookieHeader;
  } catch (err) {
    console.warn(`Failed to initialize session for ${lang}: ${err.message}`);
    return '';
  }
}

/**
 * Call an ASP.NET WebMethod and return the HTML string from `msg.d`.
 *
 * @param {string} lang     — Language code (e.g. "en", "fr", "ny")
 * @param {string} method   — WebMethod name (e.g. "wmSearchByYear")
 * @param {Array}  formVars — Array of { name, value } pairs
 * @param {number} retries  — Number of retry attempts on failure
 * @returns {string} The HTML string returned in `msg.d`
 */
async function callWebMethod(lang, method, formVars = [], retries = 3) {
  await rateLimit();

  const cookie = await getSessionCookie(lang);
  const pageUrl = `https://themessage.com/${lang}/sermonsdownload`;
  const url = `${BASE_URL}/themessage/sermonsdownload.aspx/${method}`;

  const body = JSON.stringify({ formVars });

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Referer: pageUrl,
          Cookie: cookie,
          'User-Agent': 'TheMessageAPI-Scraper/1.0 (educational project)',
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || typeof data.d !== 'string') {
        throw new Error('Unexpected response format — missing "d" property');
      }

      return data.d;
    } catch (err) {
      const isLast = attempt === retries;
      console.error(
        `  [attempt ${attempt}/${retries}] ${method} lang=${lang} — ${err.message}`
      );
      if (isLast) throw err;
      /* Exponential backoff */
      await sleep(1000 * Math.pow(2, attempt));
    }
  }
}

/**
 * Fetch all sermons for a given year and language.
 *
 * @param {string} lang — Language code
 * @param {string} year — 2-digit year code (e.g. "65" for 1965)
 * @returns {string} HTML table fragment
 */
async function fetchByYear(lang, year) {
  return callWebMethod(lang, 'wmSearchByYear', [
    { name: 'year', value: String(year) },
  ]);
}

/**
 * Search sermons by text query.
 *
 * @param {string} lang    — Language code
 * @param {string} query   — Search text
 * @returns {string} HTML table fragment
 */
async function fetchBySearch(lang, query) {
  return callWebMethod(lang, 'wmSearch', [
    { name: 'searchcriteria', value: query },
  ]);
}

/**
 * Fetch sermons by series name.
 *
 * @param {string} lang   — Language code
 * @param {string} series — Series identifier
 * @returns {string} HTML table fragment
 */
async function fetchBySeries(lang, series) {
  return callWebMethod(lang, 'wmSearchBySeries', [
    { name: 'series', value: series },
  ]);
}

/**
 * Download a file (PDF or M4A) and return it as a Buffer.
 *
 * @param {string} url — Full URL to the file
 * @returns {Buffer}
 */
async function downloadFile(url) {
  await rateLimit();

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'TheMessageAPI-Scraper/1.0 (educational project)',
    },
  });

  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status} for ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

module.exports = {
  fetchByYear,
  fetchBySearch,
  fetchBySeries,
  downloadFile,
  BASE_URL,
};
