/**
 * dev-server.js — local preview that behaves like Netlify
 *
 * Serves the built site from _site and routes /api/* to the Netlify
 * functions, using the same redirects as netlify.toml. Without this,
 * the sermon reader cannot load transcripts locally.
 *
 *   bundle exec jekyll build && node scripts/dev-server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const PORT = Number(process.argv[2] || process.env.PORT || 4000);

/* Mirrors the [[redirects]] in netlify.toml, most specific first. */
const FUNCTION_ROUTES = [
  { prefix: '/api/openapi.json', fn: 'openapi' },
  { prefix: '/api/radio-stream', fn: 'radio-stream' },
  { prefix: '/api/', fn: 'sermons' },
];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

function loadHandler(name) {
  const file = path.join(ROOT, 'netlify', 'functions', `${name}.js`);
  delete require.cache[require.resolve(file)]; /* pick up edits without a restart */
  return require(file).handler;
}

async function runFunction(route, req, res, url) {
  const event = {
    httpMethod: req.method,
    path: url.pathname,
    headers: req.headers,
    queryStringParameters: Object.fromEntries(url.searchParams),
    body: null,
  };

  try {
    const result = await loadHandler(route.fn)(event, {});
    const headers = { ...(result.headers || {}), 'Cache-Control': 'no-store' };
    const body = result.isBase64Encoded ? Buffer.from(result.body || '', 'base64') : result.body || '';
    res.writeHead(result.statusCode || 200, headers);
    res.end(body);
  } catch (err) {
    console.error(`[${route.fn}]`, err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: String(err.message || err) }));
  }
}

function resolveStatic(pathname) {
  const safe = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  const candidates = [path.join(SITE, safe)];
  if (!path.extname(safe)) {
    candidates.push(path.join(SITE, safe, 'index.html'), path.join(SITE, `${safe}.html`));
  }
  return candidates.find((file) => file.startsWith(SITE) && fs.existsSync(file) && fs.statSync(file).isFile());
}

function serveStatic(req, res, url) {
  const file = resolveStatic(url.pathname);
  const notFound = path.join(SITE, '404.html');
  const target = file || (fs.existsSync(notFound) ? notFound : null);

  if (!target) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  res.writeHead(file ? 200 : 404, {
    'Content-Type': TYPES[path.extname(target).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store', /* always serve the latest build */
  });
  fs.createReadStream(target).pipe(res);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const route = FUNCTION_ROUTES.find((r) => url.pathname.startsWith(r.prefix));
    if (route) return runFunction(route, req, res, url);
    return serveStatic(req, res, url);
  })
  .listen(PORT, () => console.log(`Serving _site with Netlify functions at http://localhost:${PORT}`));
