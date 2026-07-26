/**
 * sermons.js — Netlify Function handling all sermon API routes
 *
 * This single function handles routing based on the URL path.
 * Netlify redirects in netlify.toml map /api/* to this function.
 *
 * Endpoints:
 *   GET /api/messages                          — List sermons (paginated)
 *   GET /api/messages/:id                      — Get sermon by ID
 *   GET /api/languages                         — List all languages
 *   GET /api/languages/:code/messages           — Sermons in a language
 *   GET /api/years                              — List all years
 *   GET /api/years/:year/messages               — Sermons from a year
 *   GET /api/search?q=...                       — Full-text search
 *   GET /api/stats                              — Aggregate statistics
 */

const {
  getSermons,
  getSermonById,
  getSermonText,
  getLanguages,
  getYears,
  searchSermons,
  getStats,
} = require('./_shared/data-loader');

/* ── Response Helpers ──────────────────────────────────────────── */

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
    body: JSON.stringify(body),
  };
}

function notFound(message = 'Not found') {
  return json(404, { error: message });
}

/* ── Route Parsing ─────────────────────────────────────────────── */

/**
 * Parse the request path into route segments.
 * The Netlify redirect strips /api/ prefix — we get the remainder.
 *
 * e.g. path = "/.netlify/functions/sermons/messages/65-0718M"
 *      → segments = ["messages", "65-0718M"]
 */
function parseRoute(rawPath) {
  /* Strip the function prefix */
  const cleanPath = rawPath
    .replace(/^\/?\.netlify\/functions\/sermons\/?/, '')
    .replace(/^api\/?/, '')
    .replace(/\/$/, '');

  if (!cleanPath) return [];
  return cleanPath.split('/').filter(Boolean);
}

/* ── Main Handler ──────────────────────────────────────────────── */

exports.handler = async (event) => {
  /* Handle CORS preflight */
  if (event.httpMethod === 'OPTIONS') {
    return json(204, '');
  }

  /* Only allow GET requests */
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed. Use GET.' });
  }

  const segments = parseRoute(event.path);
  const params = event.queryStringParameters || {};

  try {
    /* ── GET /api/messages ────────────────────────────────────── */
    if (segments[0] === 'messages' && segments.length === 1) {
      const result = getSermons({
        language: params.language,
        year: params.year,
        series: params.series,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/messages/:id/text ───────────────────────────── */
    if (
      segments[0] === 'messages' &&
      segments.length === 3 &&
      segments[2] === 'text'
    ) {
      const id = decodeURIComponent(segments[1]);
      const result = getSermonText(id, params.language);

      if (!result) {
        return notFound(`Sermon '${id}' text transcript not found`);
      }
      return json(200, { data: result });
    }

    /* ── GET /api/messages/:id ────────────────────────────────── */
    if (segments[0] === 'messages' && segments.length === 2) {
      const id = decodeURIComponent(segments[1]);
      const result = getSermonById(id, params.language);

      if (!result) {
        return notFound(`Sermon '${id}' not found`);
      }
      return json(200, { data: result });
    }

    /* ── GET /api/languages ───────────────────────────────────── */
    if (segments[0] === 'languages' && segments.length === 1) {
      const languages = getLanguages();
      return json(200, { data: languages });
    }

    /* ── GET /api/languages/:code/messages ─────────────────────── */
    if (
      segments[0] === 'languages' &&
      segments.length === 3 &&
      segments[2] === 'messages'
    ) {
      const code = segments[1];
      const result = getSermons({
        language: code,
        year: params.year,
        series: params.series,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/years ───────────────────────────────────────── */
    if (segments[0] === 'years' && segments.length === 1) {
      const years = getYears(params.language);
      return json(200, { data: years });
    }

    /* ── GET /api/years/:year/messages ─────────────────────────── */
    if (
      segments[0] === 'years' &&
      segments.length === 3 &&
      segments[2] === 'messages'
    ) {
      const year = segments[1];
      const result = getSermons({
        year,
        language: params.language,
        series: params.series,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/search?q=... ────────────────────────────────── */
    if (segments[0] === 'search') {
      if (!params.q) {
        return json(400, {
          error: 'Missing required query parameter: q',
          example: '/api/search?q=seven+seals',
        });
      }
      const result = searchSermons(params.q, {
        language: params.language,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/stats ───────────────────────────────────────── */
    if (segments[0] === 'stats') {
      const stats = getStats();
      return json(200, { data: stats });
    }

    /* ── GET /api (root — API documentation) ──────────────────── */
    if (segments.length === 0) {
      return json(200, {
        name: 'The Message Sermon API',
        version: '1.0.0',
        description:
          'REST API for browsing and searching William Branham sermon archives.',
        documentation_url: 'https://bakarimustafa.com/api-docs/',
        endpoints: {
          messages: {
            list: 'GET /api/messages?page=1&limit=50&language=ny&year=65',
            get: 'GET /api/messages/:id?language=ny',
          },
          languages: {
            list: 'GET /api/languages',
            messages: 'GET /api/languages/:code/messages',
          },
          years: {
            list: 'GET /api/years',
            messages: 'GET /api/years/:year/messages',
          },
          search: 'GET /api/search?q=keyword&language=ny',
          stats: 'GET /api/stats',
        },
        source: 'https://themessage.com + https://search.messagehub.info',
      });
    }

    /* ── 404 ──────────────────────────────────────────────────── */
    return notFound(`Unknown endpoint: /api/${segments.join('/')}`);
  } catch (err) {
    console.error('API Error:', err);
    return json(500, { error: 'Internal server error' });
  }
};
