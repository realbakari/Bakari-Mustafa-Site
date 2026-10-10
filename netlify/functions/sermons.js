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
  getSeries,
  getSeriesBySlug,
  getPlaces,
  getDurations,
  searchSermons,
  getStats,
} = require('./_shared/data-loader');

/* ── Response Helpers ──────────────────────────────────────────── */

function json(statusCode, body, customHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      ...customHeaders,
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
  let cleanPath = (rawPath || '')
    .replace(/^\/?\.netlify\/functions\/sermons\/?/, '')
    .replace(/^\/?api\/?/, '')
    .replace(/\/$/, '');

  if (!cleanPath) return [];
  return cleanPath.split('/').map(s => {
    try {
      return decodeURIComponent(s);
    } catch (e) {
      return s;
    }
  }).filter(Boolean);
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
      const result = await getSermons({
        language: params.language,
        year: params.year,
        date: params.date,
        series: params.series,
        place: params.place || params.location || params.city,
        duration: params.duration,
        length: params.length,
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
      const result = await getSermonText(id, params.language);

      if (!result) {
        return notFound(`Sermon '${id}' text transcript not found`);
      }
      return json(200, { data: result }, {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
      });
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

    /* ── GET /api/series ──────────────────────────────────────── */
    if (segments[0] === 'series' && segments.length === 1) {
      const seriesList = getSeries();
      return json(200, { total_series: seriesList.length, data: seriesList });
    }

    /* ── GET /api/series/:slug/messages ───────────────────────── */
    if (
      segments[0] === 'series' &&
      segments.length === 3 &&
      segments[2] === 'messages'
    ) {
      const slug = segments[1];
      const seriesObj = getSeriesBySlug(slug);
      const result = await getSermons({
        series: seriesObj ? seriesObj.title : slug,
        language: params.language,
        year: params.year,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/series/:slug ────────────────────────────────── */
    if (segments[0] === 'series' && segments.length === 2) {
      const slug = segments[1];
      const seriesObj = getSeriesBySlug(slug);
      if (!seriesObj) {
        return notFound(`Series '${slug}' not found`);
      }
      return json(200, { data: seriesObj });
    }

    /* ── GET /api/places or /api/locations or /api/cities ─────── */
    if ((segments[0] === 'places' || segments[0] === 'locations' || segments[0] === 'cities') && segments.length === 1) {
      const places = getPlaces();
      return json(200, { total_places: places.length, data: places });
    }

    /* ── GET /api/places/:place/messages ──────────────────────── */
    if (
      (segments[0] === 'places' || segments[0] === 'locations' || segments[0] === 'cities') &&
      segments.length === 3 &&
      segments[2] === 'messages'
    ) {
      const place = decodeURIComponent(segments[1]);
      const result = await getSermons({
        place,
        language: params.language,
        year: params.year,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/durations ───────────────────────────────────── */
    if (segments[0] === 'durations' && segments.length === 1) {
      const durations = getDurations();
      return json(200, { total_groups: durations.length, data: durations });
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
      const result = await getSermons({
        language: code,
        year: params.year,
        date: params.date,
        series: params.series,
        place: params.place || params.location,
        length: params.length,
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
      const result = await getSermons({
        year,
        date: params.date,
        language: params.language,
        series: params.series,
        place: params.place || params.location,
        length: params.length,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/search?q=... ────────────────────────────────── */
    if (segments[0] === 'search') {
      if (!params.q && !params.date && !params.year) {
        return json(400, {
          error: 'Missing required query parameter: q, date, or year',
          example: '/api/search?q=seven+seals or /api/search?date=1965-07-18',
        });
      }
      const result = searchSermons(params.q, {
        language: params.language,
        date: params.date,
        year: params.year,
        page: params.page,
        limit: params.limit,
      });
      return json(200, result);
    }

    /* ── GET /api/radio ────────────────────────────────────────── */
    if (segments[0] === 'radio') {
      return json(200, {
        provider: 'Living Word Broadcast (LWB Cast)',
        website: 'https://www.lwbcast.org',
        description: '24/7 End Time Gospel Music & William Branham Sermons Broadcast Streams',
        streams: [
          {
            id: 'gospel_music',
            name: '24/7 End Time Gospel Music',
            genre: 'Gospel Music & Hymns',
            stream_url: 'https://www.lwbcast.org/LWBPlayer/stream.mp3',
            source_page: 'https://www.lwbcast.org/OtherTabs/Music.php'
          },
          {
            id: 'featured_sermon',
            name: '24/7 Featured Sermon Stream',
            genre: 'Sermon Broadcast',
            stream_url: 'https://www.lwbcast.org/LWBPlayer/sermon.mp3',
            source_page: 'https://www.lwbcast.org/OtherTabs/Music.php'
          },
          {
            id: 'prayer_healing',
            name: '24/7 Prayer & Healing Stream',
            genre: 'Prayer & Healing',
            stream_url: 'https://www.lwbcast.org/LWBPlayer/healing.mp3',
            source_page: 'https://www.lwbcast.org/OtherTabs/Music.php'
          }
        ]
      });
    }

    /* ── GET /api/stats ───────────────────────────────────────── */
    if (segments[0] === 'stats') {
      const stats = await getStats();
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
            list: 'GET /api/messages?page=1&limit=50&language=nya&year=65&series=adoption&place=Jeffersonville&length=medium',
            get: 'GET /api/messages/:id?language=nya',
            transcript: 'GET /api/messages/:id/text?language=nya',
          },
          series: {
            list: 'GET /api/series',
            get: 'GET /api/series/:slug',
            messages: 'GET /api/series/:slug/messages',
          },
          places: {
            list: 'GET /api/places',
            messages: 'GET /api/places/:place/messages',
          },
          languages: {
            list: 'GET /api/languages',
            messages: 'GET /api/languages/:code/messages',
          },
          years: {
            list: 'GET /api/years',
            messages: 'GET /api/years/:year/messages',
          },
          search: 'GET /api/search?q=keyword&language=nya',
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
