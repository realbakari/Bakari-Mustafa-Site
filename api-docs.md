---
title: The Message Sermon API Documentation
permalink: "/api-docs/"
layout: page
hide_title: true
excerpt: Complete REST API documentation, interactive playground, and code examples for building applications on top of The Message sermon catalogue.
comments: false
image: "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg"
description: Complete developer documentation and REST API specification for William Branham sermon archives in 70+ languages.
---

<style>
/* API Documentation Page Styling using Site Design Tokens */
.api-doc-container {
  margin-top: 1.5rem;
  font-family: inherit;
}

.api-doc-header {
  margin-bottom: 2rem;
}

.api-badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.api-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.825rem;
  font-weight: 500;
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  color: var(--text-primary);
}

.api-chip strong {
  color: var(--accent-primary, #2563eb);
}

/* Quick Nav Table of Contents */
.api-toc {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 2.5rem;
}

.api-toc h3 {
  font-size: 1.05rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.api-toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem 1rem;
}

.api-toc-link {
  font-size: 0.9rem;
  color: var(--text-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.api-toc-link:hover {
  color: var(--accent-primary, #2563eb);
}

.method-tag {
  display: inline-block;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.method-get {
  background-color: #dcfce7;
  color: #15803d;
}

body[data-theme="dark"] .method-get {
  background-color: rgba(22, 101, 52, 0.3);
  color: #4ade80;
}

/* Endpoint Card Blocks */
.endpoint-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-default, #e2e8f0);
}

.endpoint-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.endpoint-url {
  font-family: monospace;
  font-size: 0.95rem;
  background-color: var(--bg-secondary, #f1f5f9);
  border: 1px solid var(--border-default, #cbd5e1);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  color: var(--text-primary);
  display: inline-block;
  margin-bottom: 1rem;
}

.param-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem;
  font-size: 0.9rem;
}

.param-table th, .param-table td {
  padding: 0.65rem 0.85rem;
  text-align: left;
  border: 1px solid var(--border-default, #e2e8f0);
}

.param-table th {
  background-color: var(--bg-secondary, #f8fafc);
  font-weight: 600;
}

.code-snippet {
  background-color: #0f172a;
  color: #e2e8f0;
  border-radius: 10px;
  padding: 1.15rem;
  font-family: monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  margin-top: 0.75rem;
  border: 1px solid #334155;
}

.code-snippet pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Interactive API Playground */
.playground-box {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 14px;
  padding: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.playground-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.playground-select {
  flex: 1;
  min-width: 260px;
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  border: 1px solid var(--border-default, #cbd5e1);
  border-radius: 8px;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary);
}

.playground-btn {
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: var(--accent-primary, #2563eb);
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.playground-btn:hover {
  opacity: 0.9;
}

.playground-response {
  background-color: #0f172a;
  color: #38bdf8;
  border-radius: 10px;
  padding: 1.25rem;
  font-family: monospace;
  font-size: 0.85rem;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #334155;
}
</style>

<div class="api-doc-container">

  <!-- Header -->
  <div class="page-header api-doc-header">
    <p class="page-kicker">Developer Documentation & API Specification</p>
    <h1>The Message REST API</h1>
    <p class="page-subtitle">Build mobile apps, web interfaces, and research tools on top of 1,200+ William Branham sermons across 70+ languages including Chichewa.</p>

    <div class="api-badge-list">
      <span class="api-chip">⚡ Base URL: <strong>https://bakarimustafa.com/api</strong></span>
      <span class="api-chip">🔓 Open Access (No API Key Required)</span>
      <span class="api-chip">🌐 CORS Enabled</span>
      <span class="api-chip">📦 Response Format: JSON</span>
    </div>
  </div>

  <!-- Table of Contents -->
  <div class="api-toc">
    <h3>Quick Navigation</h3>
    <div class="api-toc-grid">
      <a href="#playground" class="api-toc-link">🎮 Live API Playground</a>
      <a href="#messages-list" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/messages</a>
      <a href="#messages-single" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/messages/:id</a>
      <a href="#messages-text" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/messages/:id/text</a>
      <a href="#languages-list" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/languages</a>
      <a href="#languages-messages" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/languages/:code/messages</a>
      <a href="#search" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/search</a>
      <a href="#years" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/years</a>
      <a href="#stats" class="api-toc-link"><span class="method-tag method-get">GET</span> /api/stats</a>
      <a href="#code-examples" class="api-toc-link">💻 Code Examples</a>
    </div>
  </div>

  <!-- Interactive API Playground -->
  <section id="playground" class="playground-box">
    <h2>🎮 Interactive API Explorer</h2>
    <p>Test live REST API responses directly in your browser:</p>

    <div class="playground-controls">
      <select id="pg-endpoint-select" class="playground-select">
        <option value="/api/messages?limit=3">GET /api/messages?limit=3 (List sermons)</option>
        <option value="/api/messages?language=ny&limit=3">GET /api/messages?language=ny (Chichewa sermons)</option>
        <option value="/api/messages/65-0718M">GET /api/messages/65-0718M (Get sermon by ID)</option>
        <option value="/api/messages/50-0100/text?language=ny">GET /api/messages/50-0100/text?language=ny (Sermon text transcript)</option>
        <option value="/api/search?q=seven+seals">GET /api/search?q=seven+seals (Full-text search)</option>
        <option value="/api/languages">GET /api/languages (List all 72 languages)</option>
        <option value="/api/years">GET /api/years (List sermon years)</option>
        <option value="/api/stats">GET /api/stats (Catalogue statistics)</option>
      </select>

      <button class="playground-btn" onclick="executePlayground()">Execute Query 🚀</button>
    </div>

    <div class="playground-response">
      <pre id="pg-response-output">Click "Execute Query" to fetch live JSON response...</pre>
    </div>
  </section>

  <!-- Endpoint 1: List Messages -->
  <section id="messages-list" class="endpoint-section">
    <div class="endpoint-title">
      <span class="method-tag method-get">GET</span> List Sermons
    </div>
    <div class="endpoint-url">https://bakarimustafa.com/api/messages</div>
    <p>Retrieves a paginated list of sermon records. Supports filtering by language, year, or series.</p>

    <h4>Query Parameters</h4>
    <table class="param-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>page</code></td>
          <td>integer</td>
          <td><code>1</code></td>
          <td>Page number to retrieve.</td>
        </tr>
        <tr>
          <td><code>limit</code></td>
          <td>integer</td>
          <td><code>50</code></td>
          <td>Number of items per page (max: 200).</td>
        </tr>
        <tr>
          <td><code>language</code></td>
          <td>string</td>
          <td><code>null</code></td>
          <td>Language code filter (e.g. <code>en</code>, <code>ny</code> for Chichewa, <code>fr</code>, <code>es</code>).</td>
        </tr>
        <tr>
          <td><code>year</code></td>
          <td>string / int</td>
          <td><code>null</code></td>
          <td>Year filter (e.g. <code>1965</code> or 2-digit <code>65</code>).</td>
        </tr>
      </tbody>
    </table>

    <h4>Example Response (200 OK)</h4>
    <div class="code-snippet">
<pre>{
  "data": [
    {
      "id": "65-0718M",
      "number": 1170,
      "title": "Trying To Do God A Service Without Being The Will Of God",
      "date": "1965-07-18",
      "year": 1965,
      "language": "en",
      "cover_image": "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg",
      "pdf_url": "https://themessage.com/...",
      "m4a_url": "https://themessage.com/..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 595,
    "total_pages": 12,
    "has_next": true,
    "has_prev": false
  }
}</pre>
    </div>
  </section>

  <!-- Endpoint 2: Get Single Sermon -->
  <section id="messages-single" class="endpoint-section">
    <div class="endpoint-title">
      <span class="method-tag method-get">GET</span> Get Sermon by ID
    </div>
    <div class="endpoint-url">https://bakarimustafa.com/api/messages/:id</div>
    <p>Fetches metadata, cover image, PDF transcript URL, and audio stream for a specific sermon ID (date code like <code>65-0718M</code>).</p>

    <h4>URL Parameters</h4>
    <table class="param-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>id</code></td>
          <td>string</td>
          <td>Sermon date code identifier (e.g. <code>65-0718M</code>, <code>63-0317M</code>).</td>
        </tr>
      </tbody>
    </table>
  <!-- Endpoint 2b: Get Sermon Text Transcript -->
  <section id="messages-text" class="endpoint-section">
    <div class="endpoint-title">
      <span class="method-tag method-get">GET</span> Get Sermon Transcript & Paragraphs
    </div>
    <div class="endpoint-url">https://bakarimustafa.com/api/messages/:id/text</div>
    <p>Fetches full transcript text and structured paragraph objects for a specific sermon ID (date code like <code>50-0100</code>).</p>

    <h4>URL & Query Parameters</h4>
    <table class="param-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>id</code></td>
          <td>string (path)</td>
          <td>Sermon date code identifier (e.g. <code>50-0100</code>, <code>65-0718M</code>).</td>
        </tr>
        <tr>
          <td><code>language</code></td>
          <td>string (query)</td>
          <td>Language code filter (e.g. <code>ny</code> for Chichewa, <code>en</code> for English).</td>
        </tr>
      </tbody>
    </table>

    <h4>Example Response (200 OK)</h4>
    <div class="code-snippet">
<pre>{
  "data": {
    "id": "50-0100",
    "title": "Matenda Ndi Zosautsa",
    "language": "ny",
    "date": "1950-01-00",
    "pdf_url": "https://d2w09gj4mqt5u.cloudfront.net/repo/...",
    "full_text": "MATENDANDIZOSAUTSA...",
    "paragraphs": [
      { "number": 1, "text": "Inendikufunakufotokozachinachake..." },
      { "number": 2, "text": "Chinthu chimodzi chiri chokhudza..." }
    ]
  }
}</pre>
    </div>
  </section>

  <!-- Endpoint 3: Full-Text Search -->
  <section id="search" class="endpoint-section">
    <div class="endpoint-title">
      <span class="method-tag method-get">GET</span> Full-Text Search
    </div>
    <div class="endpoint-url">https://bakarimustafa.com/api/search?q={query}</div>
    <p>Performs full-text keyword search across sermon titles, sermon IDs, and date codes.</p>

    <h4>Query Parameters</h4>
    <table class="param-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>q</code></td>
          <td>string</td>
          <td><strong>Yes</strong></td>
          <td>Search term or phrase (e.g. <code>seven seals</code>, <code>deity</code>).</td>
        </tr>
        <tr>
          <td><code>language</code></td>
          <td>string</td>
          <td>No</td>
          <td>Filter search results to a specific language code.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- Endpoint 4: Languages -->
  <section id="languages-list" class="endpoint-section">
    <div class="endpoint-title">
      <span class="method-tag method-get">GET</span> List Available Languages
    </div>
    <div class="endpoint-url">https://bakarimustafa.com/api/languages</div>
    <p>Returns all 72 supported languages with ISO language codes and sermon counts.</p>
  </section>

  <!-- Endpoint 5: Stats -->
  <section id="stats" class="endpoint-section">
    <div class="endpoint-title">
      <span class="method-tag method-get">GET</span> Catalogue Statistics
    </div>
    <div class="endpoint-url">https://bakarimustafa.com/api/stats</div>
    <p>Aggregated metrics detailing total sermon counts, language breakdown, audio streams, PDF transcripts, and text availability.</p>

    <h4>Example Response (200 OK)</h4>
    <div class="code-snippet">
<pre>{
  "data": {
    "total_sermons": 577,
    "total_languages": 2,
    "available_languages": 72,
    "year_range": {
      "earliest": 1950,
      "latest": 1965
    },
    "sermons_with_pdf": 572,
    "sermons_with_audio": 525,
    "sermons_with_text": 572
  }
}</pre>
    </div>
  </section>

  <!-- Code Examples -->
  <section id="code-examples" class="endpoint-section">
    <h2>💻 Code Examples</h2>
    <p>Integrate the API into your web or mobile application in minutes:</p>

    <h3>JavaScript (Fetch API)</h3>
    <div class="code-snippet">
<pre>// Fetch Chichewa sermons from the REST API
async function getChichewaSermons() {
  const response = await fetch('https://bakarimustafa.com/api/messages?language=ny&limit=10');
  const data = await response.json();
  console.log('Chichewa Sermons:', data.data);
}

getChichewaSermons();</pre>
    </div>

    <h3>Python</h3>
    <div class="code-snippet">
<pre>import requests

# Query sermons by search keyword
response = requests.get('https://bakarimustafa.com/api/search', params={'q': 'seven seals'})
results = response.json()

for sermon in results['data']:
    print(f"[{sermon['id']}] {sermon['title']} ({sermon['language']})")</pre>
    </div>

    <h3>cURL</h3>
    <div class="code-snippet">
<pre>curl -X GET "https://bakarimustafa.com/api/messages?language=ny&limit=5" \
  -H "Accept: application/json"</pre>
    </div>
  </section>

</div>

<script>
async function executePlayground() {
  const select = document.getElementById('pg-endpoint-select');
  const output = document.getElementById('pg-response-output');
  const url = select.value;

  output.innerText = `Fetching ${url}...`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    output.innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    output.innerText = `Error executing request: ${err.message}`;
  }
}
</script>
