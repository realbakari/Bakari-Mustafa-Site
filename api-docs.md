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
/* API Documentation Page Styling using Kumo Design Tokens */
.api-doc-container {
  margin-top: 1.5rem;
  font-family: inherit;
  font-size: 14px;
}

.api-doc-header {
  margin-bottom: 2rem;
}

.api-badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.api-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--kumo-radius-full, 9999px);
  font-size: 0.825rem;
  font-weight: 500;
  background-color: var(--kumo-control, var(--bg-secondary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  color: var(--text-primary);
  text-decoration: none !important;
}

.api-chip strong {
  color: var(--accent-primary);
  font-weight: 600;
}

/* Quick Nav Table of Contents */
.api-toc {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 14px);
  padding: 1.25rem;
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-sm);
}

.api-toc h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.api-toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem 1rem;
}

.api-toc-link {
  font-size: 0.875rem;
  color: var(--text-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.api-toc-link:hover {
  color: var(--accent-primary);
}

.method-tag {
  display: inline-block;
  padding: 0.15rem 0.45rem;
  border-radius: var(--kumo-radius-sm, 6px);
  font-family: var(--mono-family, monospace);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.method-get {
  background-color: var(--kumo-tint, rgba(23, 107, 91, 0.1));
  color: var(--accent-primary);
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
}

/* Endpoint Card Blocks */
.endpoint-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--kumo-hairline, var(--border-subtle));
}

.endpoint-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.endpoint-url {
  font-family: var(--mono-family, monospace);
  font-size: 0.9em;
  background-color: var(--kumo-control, var(--bg-secondary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  padding: 0.35rem 0.75rem;
  border-radius: var(--kumo-radius-sm, 6px);
  color: var(--text-primary);
  display: inline-block;
  margin-bottom: 1rem;
}

.param-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem;
  font-size: 0.875rem;
  border-radius: var(--kumo-radius-md, 8px);
  overflow: hidden;
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
}

.param-table th, .param-table td {
  padding: 0.65rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid var(--kumo-hairline, var(--border-subtle));
}

.param-table th {
  background-color: var(--kumo-control, var(--bg-secondary));
  font-weight: 600;
  color: var(--text-primary);
}

.code-snippet {
  background-color: #0f172a;
  color: #e2e8f0;
  border-radius: var(--kumo-radius-md, 10px);
  padding: 1.15rem;
  font-family: var(--mono-family, monospace);
  font-size: 0.85rem;
  overflow-x: auto;
  margin-top: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-snippet pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

/* Interactive API Playground */
.playground-box {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 14px);
  padding: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-sm);
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
  padding: 0.55rem 0.85rem;
  font-size: 0.875rem;
  border: 1px solid var(--kumo-line, var(--border-default));
  border-radius: var(--kumo-radius-md, 8px);
  background-color: var(--kumo-canvas, var(--bg-primary));
  color: var(--text-primary);
}

.playground-btn {
  padding: 0.55rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--kumo-radius-md, 8px);
  background-color: var(--accent-primary);
  color: #ffffff;
  border: 1px solid var(--accent-primary);
  cursor: pointer;
}

.playground-btn:hover {
  background-color: var(--accent-secondary);
  border-color: var(--accent-secondary);
}

.playground-response {
  background-color: #0f172a;
  color: #38bdf8;
  border-radius: var(--kumo-radius-md, 10px);
  padding: 1.25rem;
  font-family: var(--mono-family, monospace);
  font-size: 0.85rem;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
      <span class="api-chip">🤖 LLM / AI Native</span>
    </div>
  </div>

  <!-- AI Agents & LLM Discovery Banner -->
  <div style="background-color: var(--bg-secondary, #f8fafc); border: 1px solid var(--accent-primary, #2563eb); border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 2rem;">
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.5rem;">
      <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">🤖 AI Agent & LLM Machine-Readable Specifications</h3>
      <span style="font-size: 0.8rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(37,99,235,0.1); color: var(--accent-primary);">100% LLM Native</span>
    </div>
    <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--text-secondary);">Autonomous AI agents, Custom GPTs, Claude Tools, and LangChain OpenAPI toolkits can consume the machine-readable specifications directly:</p>
    <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
      <a href="{{ '/llms.txt' | relative_url }}" target="_blank" class="api-chip" style="text-decoration: none; font-weight: 700;">📄 /llms.txt (AI Discovery Context)</a>
      <a href="{{ '/llms-full.txt' | relative_url }}" target="_blank" class="api-chip" style="text-decoration: none; font-weight: 700;">📘 /llms-full.txt (Full Technical Reference)</a>
      <a href="{{ '/api/openapi.json' | relative_url }}" target="_blank" class="api-chip" style="text-decoration: none; font-weight: 700; border-color: var(--accent-primary);">⚡ /api/openapi.json (OpenAPI 3.0 Spec)</a>
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
