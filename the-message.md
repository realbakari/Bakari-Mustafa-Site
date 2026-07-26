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
/* Seamless Theme Integration for The Message Library */
.msg-library-wrapper {
  margin-top: 1.5rem;
}

.msg-header {
  margin-bottom: 2rem;
}

.msg-stats-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.msg-stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.825rem;
  font-weight: 500;
  background-color: var(--bg-secondary, rgba(0,0,0,0.04));
  border: 1px solid var(--border-default, rgba(0,0,0,0.1));
  color: var(--text-primary);
}

.msg-stat-chip strong {
  color: var(--accent-primary, #2563eb);
}

/* Controls & Filter Panel */
.msg-controls-panel {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.msg-search-group {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .msg-search-group {
    grid-template-columns: 1fr;
  }
}

.msg-input-box {
  width: 100%;
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  border: 1px solid var(--border-default, #cbd5e1);
  border-radius: 8px;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary, #0f172a);
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.msg-input-box:focus {
  outline: none;
  border-color: var(--accent-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.msg-select-box {
  padding: 0.65rem 1rem;
  font-size: 0.9rem;
  border: 1px solid var(--border-default, #cbd5e1);
  border-radius: 8px;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary, #0f172a);
  cursor: pointer;
}

.msg-quick-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
}

.msg-tag-label {
  font-weight: 600;
  color: var(--text-secondary, #64748b);
  margin-right: 0.25rem;
}

.msg-filter-tag {
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--border-default, #cbd5e1);
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary, #334155);
  cursor: pointer;
  transition: all 0.15s ease;
}

.msg-filter-tag:hover,
.msg-filter-tag.active {
  background-color: var(--accent-primary, #2563eb);
  color: #ffffff;
  border-color: var(--accent-primary, #2563eb);
}

/* Grid Layout for Sermons */
.msg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.msg-card {
  background-color: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.msg-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.msg-cover-wrap {
  position: relative;
  width: 100%;
  height: 160px;
  background-color: var(--bg-secondary, #0f172a);
  overflow: hidden;
}

.msg-cover-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.msg-card:hover .msg-cover-wrap img {
  transform: scale(1.04);
}

.msg-badge-id {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(4px);
  color: #60a5fa;
  font-family: monospace;
  font-weight: 700;
  font-size: 0.775rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.msg-badge-lang {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  background: var(--accent-primary, #2563eb);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.725rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.msg-card-content {
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.msg-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.msg-card-meta {
  font-size: 0.825rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.msg-card-actions {
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-default, #f1f5f9);
}

.msg-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.825rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none !important;
  transition: all 0.15s ease;
  cursor: pointer;
  border: 1px solid var(--border-default, #cbd5e1);
}

.msg-btn-pdf {
  background-color: var(--bg-secondary, #eff6ff);
  color: var(--text-primary);
}

.msg-btn-pdf:hover {
  background-color: var(--accent-primary, #3b82f6);
  color: #ffffff;
  border-color: var(--accent-primary, #3b82f6);
}

.msg-btn-audio {
  background-color: #10b981;
  color: #ffffff;
  border-color: #10b981;
}

.msg-btn-audio:hover {
  background-color: #059669;
  border-color: #059669;
}

.msg-btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* Audio Player Floating Dock */
.msg-player-dock {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 680px;
  background-color: var(--bg-primary, #0f172a);
  border: 1px solid var(--border-default, #334155);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 0.85rem 1.15rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
}

.msg-player-details {
  flex: 1;
  min-width: 0;
}

.msg-player-title {
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.msg-player-sub {
  font-size: 0.775rem;
  color: var(--text-secondary);
}

.msg-player-controls audio {
  height: 36px;
  outline: none;
}

.msg-close-player {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
}

.msg-close-player:hover {
  color: var(--text-primary);
}

/* API Info Box */
.msg-api-box {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 10px;
  padding: 1.25rem;
  margin-top: 3rem;
  font-size: 0.875rem;
}

.msg-api-box h3 {
  font-size: 1.05rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* Pagination Bar */
.msg-pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.msg-page-info {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary, #64748b);
}

.msg-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
  grid-column: 1 / -1;
}
</style>

<div class="msg-library-wrapper">

  <!-- Site Layout Page Header -->
  <div class="page-header msg-header">
    <p class="page-kicker">Digital Library & Archives</p>
    <h1>The Message</h1>
    <p class="page-subtitle">Audio recordings, PDF transcripts, and multi-lingual catalogues of William Marrion Branham's sermons, including Chichewa translations.</p>

    <div class="msg-stats-bar">
      <span class="msg-stat-chip">📖 Sermons: <strong id="stat-total">595+</strong></span>
      <span class="msg-stat-chip">🌍 Languages: <strong id="stat-langs">42</strong></span>
      <span class="msg-stat-chip">🇲🇼 Chichewa Included</span>
      <span class="msg-stat-chip">⚡ Public REST API</span>
    </div>
  </div>

  <!-- Filters & Controls -->
  <section class="msg-controls-panel">
    <div class="msg-search-group">
      <input type="text" id="msg-search" class="msg-input-box" placeholder="Search title, date, or ID (e.g. 65-0718M)..." oninput="applyFilters()">

      <select id="msg-lang-select" class="msg-select-box" onchange="applyFilters()">
        <option value="">All Languages</option>
        <option value="en" selected>English</option>
        <option value="ny">Chichewa (Nyanja)</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ro">Română</option>
        <option value="ru">Русский</option>
      </select>

      <select id="msg-year-select" class="msg-select-box" onchange="applyFilters()">
        <option value="">All Years</option>
        <option value="1965">1965</option>
        <option value="1964">1964</option>
        <option value="1963">1963</option>
      </select>
    </div>

    <div class="msg-quick-tags">
      <span class="msg-tag-label">Quick Filters:</span>
      <button class="msg-filter-tag active" onclick="setQuickLang('')">All</button>
      <button class="msg-filter-tag" onclick="setQuickLang('ny')">🇲🇼 Chichewa</button>
      <button class="msg-filter-tag" onclick="setQuickLang('en')">🇬🇧 English</button>
      <button class="msg-filter-tag" onclick="setQuickYear('1965')">1965 Sermons</button>
      <button class="msg-filter-tag" onclick="setQuickYear('1963')">1963 Seven Seals</button>
    </div>
  </section>

  <!-- Sermons Grid -->
  <main class="msg-grid" id="sermons-container">
    <!-- Loaded dynamically -->
  </main>

  <!-- Pagination Controls -->
  <div id="pagination-controls" class="msg-pagination-bar" style="display: none;">
    <button id="btn-prev-page" class="msg-btn" onclick="changePage(-1)">← Previous</button>
    <span id="page-info-text" class="msg-page-info">Page 1 of 1</span>
    <button id="btn-next-page" class="msg-btn" onclick="changePage(1)">Next →</button>
  </div>

  <!-- Floating Audio Player -->
  <div id="audio-player-bar" class="msg-player-dock" style="display: none;">
    <div class="msg-player-details">
      <div class="msg-player-title" id="player-sermon-title">Sermon Title</div>
      <div class="msg-player-sub" id="player-sermon-sub">ID • Language</div>
    </div>
    <div class="msg-player-controls">
      <audio id="audio-element" controls autoplay></audio>
    </div>
    <button class="msg-close-player" onclick="closePlayer()" title="Close player">✕</button>
  </div>

  <!-- REST API Details Section -->
  <section class="msg-api-box">
    <h3>⚡ Public JSON REST API</h3>
    <p>Developers can fetch structured sermon metadata, PDF transcript links, and audio stream URLs directly from the site API:</p>
    <ul>
      <li><code>GET /api/messages?language=ny</code> — List Chichewa sermons</li>
      <li><code>GET /api/messages/65-0718M</code> — Single sermon lookup</li>
      <li><code>GET /api/search?q=seven+seals</code> — Full-text search</li>
    </ul>
  </section>

</div>

<script>
const DEFAULT_COVER = "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg";
let allSermons = [];
let filteredSermons = [];
let currentPage = 1;
const pageSize = 24;

async function loadSermonsData() {
  try {
    const res = await fetch('/api/messages?limit=500');
    if (res.ok) {
      const result = await res.json();
      allSermons = result.data || result;
    } else {
      const staticRes = await fetch('/_data/sermons.json');
      if (staticRes.ok) allSermons = await staticRes.json();
    }
  } catch (err) {
    try {
      const staticRes = await fetch('/_data/sermons.json');
      if (staticRes.ok) allSermons = await staticRes.json();
    } catch (e) {
      console.error('Failed to load sermon data:', e);
    }
  }

  const statEl = document.getElementById('stat-total');
  if (statEl) statEl.innerText = `${allSermons.length || 595}+`;
  applyFilters();
}

function renderSermons(items) {
  const container = document.getElementById('sermons-container');
  const paginationBar = document.getElementById('pagination-controls');

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="msg-empty">
        <h3>No sermons found</h3>
        <p>Try searching another keyword or clearing your language filter.</p>
      </div>
    `;
    if (paginationBar) paginationBar.style.display = 'none';
    return;
  }

  /* Calculate pagination slice */
  const totalPages = Math.ceil(items.length / pageSize);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIdx, startIdx + pageSize);

  /* Update pagination bar */
  if (paginationBar) {
    if (totalPages > 1) {
      paginationBar.style.display = 'flex';
      document.getElementById('page-info-text').innerText = `Page ${currentPage} of ${totalPages}`;
      document.getElementById('btn-prev-page').disabled = (currentPage === 1);
      document.getElementById('btn-next-page').disabled = (currentPage === totalPages);
      
      document.getElementById('btn-prev-page').classList.toggle('msg-btn-disabled', currentPage === 1);
      document.getElementById('btn-next-page').classList.toggle('msg-btn-disabled', currentPage === totalPages);
    } else {
      paginationBar.style.display = 'none';
    }
  }

  container.innerHTML = pageItems.map(s => {
    const coverUrl = s.cover_image || DEFAULT_COVER;
    const langCode = (s.language || 'en').toUpperCase();
    
    const pdfBtn = s.pdf_url 
      ? `<a href="${s.pdf_url}" target="_blank" class="msg-btn msg-btn-pdf">📄 PDF</a>`
      : `<span class="msg-btn msg-btn-pdf msg-btn-disabled">📄 PDF</span>`;
      
    const audioBtn = s.m4a_url
      ? `<button class="msg-btn msg-btn-audio" onclick="playAudio('${escapeJs(s.title)}', '${s.id}', '${s.language}', '${s.m4a_url}')">🎧 Audio</button>`
      : `<span class="msg-btn msg-btn-audio msg-btn-disabled">🎧 Audio</span>`;

    return `
      <article class="msg-card">
        <div class="msg-cover-wrap">
          <img src="${coverUrl}" alt="${escapeHtml(s.title)}" loading="lazy" />
          <span class="msg-badge-id">${escapeHtml(s.id)}</span>
          <span class="msg-badge-lang">${langCode}</span>
        </div>
        <div class="msg-card-content">
          <h3 class="msg-card-title">${escapeHtml(s.title)}</h3>
          <div class="msg-card-meta">
            <span>📅 ${s.date || s.year || 'Unknown Date'}</span>
            ${s.number ? `<span>• #${s.number}</span>` : ''}
          </div>
          <div class="msg-card-actions">
            ${pdfBtn}
            ${audioBtn}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function applyFilters() {
  currentPage = 1;
  const query = (document.getElementById('msg-search').value || '').toLowerCase().trim();
  const selectedLang = document.getElementById('msg-lang-select').value;
  const selectedYear = document.getElementById('msg-year-select').value;

  filteredSermons = allSermons.filter(s => {
    if (selectedLang && s.language !== selectedLang) return false;
    if (selectedYear) {
      const sermonYear = String(s.year || '');
      if (!sermonYear.includes(selectedYear) && !selectedYear.endsWith(sermonYear)) return false;
    }
    if (query) {
      const titleMatch = (s.title || '').toLowerCase().includes(query);
      const idMatch = (s.id || '').toLowerCase().includes(query);
      if (!titleMatch && !idMatch) return false;
    }
    return true;
  });

  renderSermons(filteredSermons);
}

function changePage(delta) {
  currentPage += delta;
  renderSermons(filteredSermons);
  document.getElementById('sermons-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setQuickLang(code) {
  document.getElementById('msg-lang-select').value = code;
  applyFilters();
}

function setQuickYear(year) {
  document.getElementById('msg-year-select').value = year;
  applyFilters();
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

document.addEventListener('DOMContentLoaded', loadSermonsData);
</script>
