---
title: The Message Sermon Library
permalink: "/the-message/"
layout: page
hide_title: true
excerpt: Access and search over 1,200 sermons by William Marrion Branham in audio, PDF, and multiple languages including Chichewa.
comments: false
image: "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg"
description: Public catalogue and API for William Branham sermons in audio (M4A) and PDF transcript formats across 40+ languages.
---

<style>
/* Library Specific Styles */
.sermon-library-container {
  max-width: 1100px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.library-hero {
  text-align: center;
  padding: 2.5rem 1rem 2rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  color: #ffffff;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.library-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.library-hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.library-hero p {
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 680px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.hero-badge strong {
  color: #60a5fa;
}

/* Search & Filters Bar */
.filter-bar {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

body.dark-mode .filter-bar,
html[data-theme="dark"] .filter-bar {
  background: #1e293b;
  border-color: #334155;
}

.search-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-input-wrapper {
  flex: 1;
  min-width: 260px;
  position: relative;
}

.search-input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #ffffff;
  color: #1e293b;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.search-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

.filter-select {
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  min-width: 140px;
}

.quick-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.pill-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  margin-right: 0.25rem;
}

.pill-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.825rem;
  font-weight: 500;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pill-btn:hover, .pill-btn.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

/* Sermon Cards Grid */
.sermons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.sermon-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.sermon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.1);
}

.card-cover {
  position: relative;
  width: 100%;
  height: 170px;
  background: #0f172a;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sermon-card:hover .card-cover img {
  transform: scale(1.05);
}

.card-badge-id {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(6px);
  color: #60a5fa;
  font-family: monospace;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.card-badge-lang {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  text-transform: uppercase;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.card-meta {
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-actions {
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.btn-action {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
}

.btn-pdf {
  background: #eff6ff;
  color: #1d4ed8;
}

.btn-pdf:hover {
  background: #dbeafe;
}

.btn-audio {
  background: #10b981;
  color: #ffffff;
}

.btn-audio:hover {
  background: #059669;
}

.btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* Inline Audio Player Bar */
.sticky-player-bar {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 700px;
  background: #0f172a;
  border: 1px solid #334155;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { transform: translate(-50%, 100%); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}

.player-info {
  flex: 1;
  min-width: 0;
}

.player-title {
  font-size: 0.95rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-sub {
  font-size: 0.8rem;
  color: #94a3b8;
}

.player-audio {
  height: 36px;
  outline: none;
}

.close-player {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.2rem;
}

.close-player:hover {
  color: #ffffff;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: #64748b;
  grid-column: 1 / -1;
}

.empty-state h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #334155;
}

/* API Banner */
.api-banner {
  background: #0f172a;
  border-radius: 12px;
  padding: 1.5rem;
  color: #94a3b8;
  font-family: monospace;
  font-size: 0.875rem;
  margin-top: 3rem;
}

.api-banner h4 {
  color: #60a5fa;
  font-family: sans-serif;
  margin-bottom: 0.5rem;
}

.api-code {
  color: #a7f3d0;
}
</style>

<div class="sermon-library-container">

  <!-- Hero Header -->
  <header class="library-hero">
    <h1>The Message Sermon Library</h1>
    <p>Explore, listen to, and download transcripts of over 1,200 sermons by William Marrion Branham translated into Chichewa, English, French, and over 40 languages worldwide.</p>
    
    <div class="hero-badges">
      <span class="hero-badge">📖 Total Sermons: <strong id="stat-total">595+</strong></span>
      <span class="hero-badge">🌍 Languages: <strong id="stat-langs">42</strong></span>
      <span class="hero-badge">🇲🇼 Chichewa Included</span>
      <span class="hero-badge">⚡ Public JSON API Available</span>
    </div>
  </header>

  <!-- Search & Filter Controls -->
  <section class="filter-bar">
    <div class="search-row">
      <div class="search-input-wrapper">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="library-search" placeholder="Search sermons by title, ID (e.g. 65-0718M), or topic..." oninput="handleSearch()">
      </div>

      <select id="lang-select" class="filter-select" onchange="applyFilters()">
        <option value="">All Languages</option>
        <option value="en" selected>English</option>
        <option value="ny">Chichewa (Nyanja)</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ro">Română</option>
        <option value="ru">Русский</option>
      </select>

      <select id="year-select" class="filter-select" onchange="applyFilters()">
        <option value="">All Years</option>
        <option value="1965">1965</option>
        <option value="1964">1964</option>
        <option value="1963">1963</option>
      </select>
    </div>

    <div class="quick-pills">
      <span class="pill-label">Quick Filters:</span>
      <button class="pill-btn active" onclick="setQuickLang('')">All</button>
      <button class="pill-btn" onclick="setQuickLang('ny')">🇲🇼 Chichewa</button>
      <button class="pill-btn" onclick="setQuickLang('en')">🇬🇧 English</button>
      <button class="pill-btn" onclick="setQuickYear('1965')">1965 Sermons</button>
      <button class="pill-btn" onclick="setQuickYear('1963')">1963 Seven Seals Year</button>
    </div>
  </section>

  <!-- Sermons Grid -->
  <main class="sermons-grid" id="sermons-container">
    <!-- Loaded dynamically via JavaScript -->
  </main>

  <!-- Sticky Audio Player -->
  <div id="audio-player-bar" class="sticky-player-bar" style="display: none;">
    <div class="player-info">
      <div class="player-title" id="player-sermon-title">Sermon Title</div>
      <div class="player-sub" id="player-sermon-sub">ID • Language</div>
    </div>
    <audio id="audio-element" class="player-audio" controls autoplay></audio>
    <button class="close-player" onclick="closePlayer()" title="Close player">✕</button>
  </div>

  <!-- Developer API Banner -->
  <footer class="api-banner">
    <h4>⚡ Developer REST API</h4>
    <p>You can query this sermon catalogue directly via JSON endpoints:</p>
    <code>
      GET <span class="api-code">/api/messages?language=ny</span><br>
      GET <span class="api-code">/api/messages/65-0718M</span><br>
      GET <span class="api-code">/api/search?q=seven+seals</span>
    </code>
  </footer>

</div>

<!-- Data Loading & Interactive Client Logic -->
<script>
const DEFAULT_COVER = "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg";
let allSermons = [];
let filteredSermons = [];

async function loadSermonsData() {
  try {
    /* Fetch pre-built dataset from Jekyll _data output or Netlify function */
    const res = await fetch('/api/messages?limit=200');
    if (res.ok) {
      const result = await res.json();
      allSermons = result.data || result;
    } else {
      /* Fallback to static JSON file */
      const staticRes = await fetch('/_data/sermons.json');
      if (staticRes.ok) {
        allSermons = await staticRes.json();
      }
    }
  } catch (err) {
    console.warn('API fetch fallback:', err);
    try {
      const staticRes = await fetch('/_data/sermons.json');
      if (staticRes.ok) allSermons = await staticRes.json();
    } catch (e) {
      console.error('Failed to load sermon data:', e);
    }
  }

  /* Update counter badges */
  document.getElementById('stat-total').innerText = `${allSermons.length || 595}+`;
  applyFilters();
}

function renderSermons(items) {
  const container = document.getElementById('sermons-container');
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No sermons found</h3>
        <p>Try adjusting your search query or language filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(s => {
    const coverUrl = s.cover_image || DEFAULT_COVER;
    const langCode = (s.language || 'en').toUpperCase();
    const pdfBtn = s.pdf_url 
      ? `<a href="${s.pdf_url}" target="_blank" class="btn-action btn-pdf">📄 PDF</a>`
      : `<span class="btn-action btn-pdf btn-disabled">📄 PDF</span>`;
      
    const audioBtn = s.m4a_url
      ? `<button class="btn-action btn-audio" onclick="playAudio('${escapeJs(s.title)}', '${s.id}', '${s.language}', '${s.m4a_url}')">🎧 Listen</button>`
      : `<span class="btn-action btn-audio btn-disabled">🎧 Audio</span>`;

    return `
      <article class="sermon-card">
        <div class="card-cover">
          <img src="${coverUrl}" alt="${escapeHtml(s.title)}" loading="lazy" />
          <span class="card-badge-id">${escapeHtml(s.id)}</span>
          <span class="card-badge-lang">${langCode}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(s.title)}</h3>
          <div class="card-meta">
            <span>📅 ${s.date || s.year || 'Unknown Date'}</span>
            ${s.number ? `<span>• #${s.number}</span>` : ''}
          </div>
          <div class="card-actions">
            ${pdfBtn}
            ${audioBtn}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function applyFilters() {
  const query = (document.getElementById('library-search').value || '').toLowerCase().trim();
  const selectedLang = document.getElementById('lang-select').value;
  const selectedYear = document.getElementById('year-select').value;

  filteredSermons = allSermons.filter(s => {
    /* Language filter */
    if (selectedLang && s.language !== selectedLang) return false;

    /* Year filter */
    if (selectedYear) {
      const sermonYear = String(s.year || '');
      if (!sermonYear.includes(selectedYear) && !selectedYear.endsWith(sermonYear)) return false;
    }

    /* Text search query */
    if (query) {
      const titleMatch = (s.title || '').toLowerCase().includes(query);
      const idMatch = (s.id || '').toLowerCase().includes(query);
      const seriesMatch = (s.series || '').toLowerCase().includes(query);
      if (!titleMatch && !idMatch && !seriesMatch) return false;
    }

    return true;
  });

  renderSermons(filteredSermons);
}

function handleSearch() {
  applyFilters();
}

function setQuickLang(code) {
  document.getElementById('lang-select').value = code;
  updatePillState();
  applyFilters();
}

function setQuickYear(year) {
  document.getElementById('year-select').value = year;
  applyFilters();
}

function updatePillState() {
  const currentLang = document.getElementById('lang-select').value;
  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.classList.remove('active');
  });
}

function playAudio(title, id, lang, url) {
  const bar = document.getElementById('audio-player-bar');
  const titleEl = document.getElementById('player-sermon-title');
  const subEl = document.getElementById('player-sermon-sub');
  const audioEl = document.getElementById('audio-element');

  titleEl.innerText = title;
  subEl.innerText = `Sermon ${id} • ${lang.toUpperCase()}`;
  audioEl.src = url;
  bar.style.display = 'flex';
  audioEl.play().catch(e => console.log('Audio autoplay blocked:', e));
}

function closePlayer() {
  const bar = document.getElementById('audio-player-bar');
  const audioEl = document.getElementById('audio-element');
  audioEl.pause();
  bar.style.display = 'none';
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeJs(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

/* Initialize library on page load */
document.addEventListener('DOMContentLoaded', loadSermonsData);
</script>
