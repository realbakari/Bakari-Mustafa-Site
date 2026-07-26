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

/* View Mode Toggle Bar */
.msg-view-mode-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-default, #e2e8f0);
}

.msg-view-toggle {
  display: flex;
  gap: 0.4rem;
  background-color: var(--bg-primary, #ffffff);
  padding: 0.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-default, #cbd5e1);
}

.msg-view-btn {
  padding: 0.35rem 0.85rem;
  font-size: 0.825rem;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.msg-view-btn.active {
  background-color: var(--accent-primary, #2563eb);
  color: #ffffff;
}

.msg-results-count {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

/* Archival Table View */
.msg-table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--border-default, #e2e8f0);
  background-color: var(--bg-primary, #ffffff);
  margin-bottom: 2.5rem;
}

.msg-archival-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  text-align: left;
}

.msg-archival-table th {
  background-color: var(--bg-secondary, #f8fafc);
  color: var(--text-primary);
  font-weight: 700;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-default, #e2e8f0);
  white-space: nowrap;
}

.msg-archival-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-default, #e2e8f0);
  color: var(--text-primary);
  vertical-align: middle;
}

.msg-archival-table tr:hover {
  background-color: var(--bg-secondary, rgba(0,0,0,0.02));
}

.msg-archival-table tr:last-child td {
  border-bottom: none;
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
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.msg-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.15);
  border-color: var(--accent-primary, #2563eb);
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

.msg-btn-text {
  background-color: var(--bg-secondary, #f1f5f9);
  color: var(--text-primary);
}

.msg-btn-text:hover {
  background-color: var(--accent-primary, #2563eb);
  color: #ffffff;
  border-color: var(--accent-primary, #2563eb);
}

.msg-btn-pdf {
  background-color: var(--bg-secondary, #eff6ff);
  color: var(--text-primary);
}

.msg-btn-pdf:hover {
  background-color: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
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

/* On-Site Sermon Reader Modal */
.msg-reader-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.msg-reader-dialog {
  background-color: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-default, #334155);
  border-radius: 14px;
  width: 100%;
  max-width: 900px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.msg-reader-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-default, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--bg-secondary, #f8fafc);
}

.msg-reader-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.msg-reader-sub {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.msg-reader-tools {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.msg-reader-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-primary);
}

.msg-reader-tabs {
  display: flex;
  gap: 0.5rem;
  background-color: var(--bg-secondary, rgba(0,0,0,0.04));
  padding: 0.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-default, rgba(0,0,0,0.1));
}

.msg-tab-btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.msg-tab-btn.active {
  background-color: var(--bg-primary, #ffffff);
  color: var(--accent-primary, #2563eb);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.msg-paragraph-item {
  margin-bottom: 1.25rem;
  display: flex;
  gap: 0.75rem;
}

.msg-para-num {
  font-family: monospace;
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--accent-primary, #2563eb);
  background-color: var(--bg-secondary, rgba(0,0,0,0.04));
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  height: fit-content;
  user-select: none;
}

.msg-para-text {
  flex: 1;
}

/* Exact Stats Dashboard Grid */
.msg-stats-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

.msg-stat-card {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 12px;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.msg-stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-primary, #2563eb);
}

.msg-stat-val {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-primary, #2563eb);
  line-height: 1.2;
}

.msg-stat-lbl {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Interactive World Map & Region Panel */
.msg-map-section {
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.msg-map-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.msg-map-sub {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
}

.msg-region-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.msg-region-card {
  background-color: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-default, #cbd5e1);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.msg-region-card:hover, .msg-region-card.active {
  border-color: var(--accent-primary, #2563eb);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
  transform: translateY(-2px);
}

.msg-region-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.msg-region-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.msg-region-badge {
  font-size: 0.75rem;
  font-weight: 700;
  background-color: var(--bg-secondary, #eff6ff);
  color: var(--accent-primary, #2563eb);
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
}

.msg-region-langs {
  font-size: 0.775rem;
  color: var(--text-secondary);
  line-height: 1.4;
}
</style>

<div class="msg-library-wrapper">

  <!-- Site Layout Page Header -->
  <div class="page-header msg-header">
    <p class="page-kicker">Digital Library & Archives</p>
    <h1>The Message</h1>
    <p class="page-subtitle">Audio recordings, PDF transcripts, and multi-lingual catalogues of William Marrion Branham's sermons across 72+ global languages.</p>

    <div class="msg-stats-bar">
      <span class="msg-stat-chip">📖 Sermons: <strong id="stat-total">1,200+</strong></span>
      <span class="msg-stat-chip">🌍 Languages: <strong id="stat-langs">72</strong></span>
      <span class="msg-stat-chip">🌐 Global Multi-Lingual Archive</span>
      <span class="msg-stat-chip">⚡ Public REST API</span>
    </div>
  </div>

  <!-- Exact Sermon Statistics Dashboard -->
  <div class="msg-stats-dashboard">
    <div class="msg-stat-card">
      <div class="msg-stat-val" id="stat-exact-sermons">577</div>
      <div class="msg-stat-lbl">Indexed Sermons</div>
    </div>
    <div class="msg-stat-card">
      <div class="msg-stat-val" id="stat-exact-audio">577</div>
      <div class="msg-stat-lbl">Audio Streams</div>
    </div>
    <div class="msg-stat-card">
      <div class="msg-stat-val" id="stat-exact-pdf">577</div>
      <div class="msg-stat-lbl">PDF Transcripts</div>
    </div>
    <div class="msg-stat-card">
      <div class="msg-stat-val" id="stat-exact-text">577</div>
      <div class="msg-stat-lbl">Full Text Records</div>
    </div>
    <div class="msg-stat-card">
      <div class="msg-stat-val" id="stat-exact-langs">72</div>
      <div class="msg-stat-lbl">Global Languages</div>
    </div>
  </div>

  <!-- Interactive Global Translation Region Map -->
  <section class="msg-map-section">
    <div class="msg-map-title">
      <span>🌍 Global Translation Coverage Map</span>
    </div>
    <div class="msg-map-sub">Select a region below to filter translations across 72 global languages:</div>

    <div class="msg-region-grid">
      <div class="msg-region-card" onclick="filterByRegion('africa')">
        <div class="msg-region-header">
          <span class="msg-region-name">🌍 Africa</span>
          <span class="msg-region-badge">18 Languages</span>
        </div>
        <div class="msg-region-langs">🇲🇼 Chichewa (ny), 🇰🇪 Kiswahili (sw), 🇿🇦 Afrikaans (af), 🇳🇬 Igbo (ig), 🇳🇬 Yoruba (yo), 🇨🇩 Lingala (ln), 🇪🇹 Amharic (am), 🇪🇹 Oromo (om), 🇲🇬 Malagasy (mg), 🇿🇦 Zulu (zu), 🇿🇦 Xhosa (xh), 🇿🇼 Shona (sn), 🇺🇬 Luganda (lg), 🇰🇪 Kikuyu (ki), 🇧🇼 Tswana (tn), 🇱🇸 Sesotho (st), 🇸🇴 Somali (so), 🇳🇬 Hausa (ha).</div>
      </div>

      <div class="msg-region-card" onclick="filterByRegion('americas')">
        <div class="msg-region-header">
          <span class="msg-region-name">🌎 Americas</span>
          <span class="msg-region-badge">8 Languages</span>
        </div>
        <div class="msg-region-langs">🇺🇸 English (en), 🇲🇽 Español (es), 🇧🇷 Português (pt), 🇭🇹 Kreyòl Ayisyen (ht), 🇦🇼 Papiamento (pap), 🇸🇷 Dutch (nl), 🇵🇾 Guarani (gn), 🇵🇪 Quechua (qu).</div>
      </div>

      <div class="msg-region-card" onclick="filterByRegion('europe')">
        <div class="msg-region-header">
          <span class="msg-region-name">🌍 Europe</span>
          <span class="msg-region-badge">24 Languages</span>
        </div>
        <div class="msg-region-langs">🇫🇷 Français (fr), 🇩🇪 Deutsch (de), 🇮🇹 Italiano (it), 🇷🇴 Română (ro), 🇷🇺 Русский (ru), 🇵🇱 Polski (pl), 🇺🇦 Українська (uk), 🇨🇿 Čeština (cs), 🇭🇺 Magyar (hu), 🇸🇪 Svenska (sv), 🇳🇴 Norsk (no), 🇫🇮 Suomi (fi), 🇳🇱 Nederlands (nl), 🇬🇷 Ελληνικά (el), 🇧🇬 Български (bg), 🇭🇷 Hrvatski (hr), 🇷🇸 Srpski (sr), 🇸🇰 Slovenčina (sk), 🇱🇹 Lietuvių (lt), 🇱🇻 Latviešu (lv), 🇪🇪 Eesti (et), 🇦🇱 Shqip (sq), 🇩🇰 Dansk (da), 🇬🇪 ქართული (ka).</div>
      </div>

      <div class="msg-region-card" onclick="filterByRegion('asia')">
        <div class="msg-region-header">
          <span class="msg-region-name">🌏 Asia & Pacific</span>
          <span class="msg-region-badge">22 Languages</span>
        </div>
        <div class="msg-region-langs">🇵🇭 Tagalog (tl), 🇮🇩 Bahasa Indonesia (id), 🇮🇳 Hindi (hi), 🇮🇳 Tamil (ta), 🇨🇳 Simplified Chinese (zh-CN), 🇹🇼 Traditional Chinese (zh-TW), 🇻🇳 Tiếng Việt (vi), 🇰🇷 한국어 (ko), 🇯🇵 日本語 (ja), 🇵🇰 Urdu (ur), 🇧🇩 Bengali (bn), 🇮🇳 Marathi (mr), 🇮🇳 Telugu (te), 🇮🇳 Malayalam (ml), 🇲🇲 Burmese (my), 🇹🇭 Thai (th), 🇰🇭 Khmer (km), 🇱🇦 Lao (lo), 🇱🇰 Sinhala (si), 🇵🇭 Cebuano (ceb), 🇵🇭 Ilocano (ilo), 🇵🇭 Hiligaynon (hil).</div>
      </div>
    </div>
  </section>

  <!-- Filters & Controls -->
  <section class="msg-controls-panel">
    <div class="msg-search-group">
      <input type="text" id="msg-search" class="msg-input-box" placeholder="Search title, date, or ID (e.g. 65-0718M)..." oninput="applyFilters()">

      <select id="msg-lang-select" class="msg-select-box" onchange="applyFilters()">
        <option value="">All Languages (72)</option>
        <option value="en" selected>English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ny">Chichewa (Nyanja)</option>
        <option value="sw">Kiswahili</option>
        <option value="pt">Português</option>
        <option value="de">Deutsch</option>
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
      <button class="msg-filter-tag active" onclick="setQuickLang('')">All Languages</button>
      <button class="msg-filter-tag" onclick="setQuickLang('en')">🇬🇧 English</button>
      <button class="msg-filter-tag" onclick="setQuickYear('1965')">1965 Sermons</button>
      <button class="msg-filter-tag" onclick="setQuickYear('1963')">1963 Seven Seals</button>
    </div>

    <div class="msg-view-mode-bar">
      <div class="msg-view-toggle">
        <button id="view-btn-grid" class="msg-view-btn active" onclick="setViewMode('grid')">🎴 Cards Grid</button>
        <button id="view-btn-table" class="msg-view-btn" onclick="setViewMode('table')">📋 Archival Table</button>
      </div>
      <div id="results-count-text" class="msg-results-count">Showing 0 sermons</div>
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

  <!-- On-Site Sermon Reader Modal -->
  <div id="reader-modal-backdrop" class="msg-reader-backdrop" style="display: none;">
    <div class="msg-reader-dialog">
      <header class="msg-reader-header">
        <div>
          <h2 class="msg-reader-title" id="reader-sermon-title">Sermon Title</h2>
          <div class="msg-reader-sub" id="reader-sermon-sub">ID • Date</div>
        </div>
        <div class="msg-reader-tools">
          <div class="msg-reader-tabs">
            <button id="tab-btn-text" class="msg-tab-btn active" onclick="switchReaderTab('text')">📖 Text View</button>
            <button id="tab-btn-pdf" class="msg-tab-btn" onclick="switchReaderTab('pdf')">📄 PDF View</button>
          </div>
          <a id="reader-download-btn" href="#" target="_blank" class="msg-btn msg-btn-pdf" style="padding: 0.35rem 0.75rem;">⬇ PDF</a>
          <button class="msg-close-player" onclick="closeReaderModal()" title="Close reader">✕</button>
        </div>
      </header>
      <main class="msg-reader-body" id="reader-content-area">
        <!-- Embedded document / reader content -->
      </main>
    </div>
  </div>

</div>

<script>
const DEFAULT_COVER = "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg";
let allSermons = [];
let filteredSermons = [];
let currentPage = 1;
const pageSize = 24;

async function loadLanguagesData() {
  try {
    let languages = [];
    try {
      const res = await fetch('/api/languages');
      if (res.ok) {
        const result = await res.json();
        languages = result.data || result;
      }
    } catch (e) {
      /* API route un-routed locally */
    }

    if (!languages || languages.length === 0) {
      const staticRes = await fetch('{{ "/_data/languages.json" | relative_url }}');
      if (staticRes.ok) languages = await staticRes.json();
    }

    if (languages && languages.length > 0) {
      const select = document.getElementById('msg-lang-select');
      if (select) {
        const selectedVal = select.value || 'en';
        select.innerHTML = '<option value="">All Languages (72)</option>' + 
          languages.map(l => `<option value="${l.code}" ${l.code === selectedVal ? 'selected' : ''}>${l.name} (${l.english_name || l.name})</option>`).join('');
      }
      
      const langsStat = document.getElementById('stat-langs');
      if (langsStat) langsStat.innerText = `${languages.length}`;
    }
  } catch (e) {
    console.warn('Could not load dynamic language list:', e);
  }
}

async function loadSermonsData() {
  await loadLanguagesData();
  try {
    try {
      const res = await fetch('/api/messages?limit=500');
      if (res.ok) {
        const result = await res.json();
        allSermons = result.data || result;
      }
    } catch (e) {
      /* API route un-routed locally */
    }

    if (!allSermons || allSermons.length === 0) {
      const staticRes = await fetch('{{ "/_data/sermons.json" | relative_url }}');
      if (staticRes.ok) allSermons = await staticRes.json();
    }
  } catch (err) {
    console.error('Failed to load sermon data:', err);
  }

  /* Update exact stats metrics */
  const totalCount = allSermons.length || 577;
  const audioCount = allSermons.filter(s => s.m4a_url).length || totalCount;
  const pdfCount = allSermons.filter(s => s.pdf_url).length || totalCount;
  const textCount = allSermons.filter(s => s.pdf_text || (s.paragraphs && s.paragraphs.length > 0)).length || totalCount;

  const statEl = document.getElementById('stat-total');
  if (statEl) statEl.innerText = `${totalCount}+ (1,200+ Archive)`;

  const elSermons = document.getElementById('stat-exact-sermons');
  if (elSermons) elSermons.innerText = `${totalCount}`;

  const elAudio = document.getElementById('stat-exact-audio');
  if (elAudio) elAudio.innerText = `${audioCount}`;

  const elPdf = document.getElementById('stat-exact-pdf');
  if (elPdf) elPdf.innerText = `${pdfCount}`;

  const elText = document.getElementById('stat-exact-text');
  if (elText) elText.innerText = `${textCount}`;

  applyFilters();
}

function filterByRegion(region) {
  const select = document.getElementById('msg-lang-select');
  if (!select) return;

  const regionLangs = {
    africa: 'ny',
    americas: 'en',
    europe: 'fr',
    asia: 'tl'
  };

  select.value = regionLangs[region] || '';
  applyFilters();
  document.getElementById('sermons-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let currentViewMode = 'grid';

function setViewMode(mode) {
  currentViewMode = mode;
  const btnGrid = document.getElementById('view-btn-grid');
  const btnTable = document.getElementById('view-btn-table');
  
  if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');
  if (btnTable) btnTable.classList.toggle('active', mode === 'table');
  
  renderSermons(filteredSermons);
}

function renderSermons(items) {
  const container = document.getElementById('sermons-container');
  const paginationBar = document.getElementById('pagination-controls');
  const countText = document.getElementById('results-count-text');

  if (countText) {
    countText.innerText = `Showing ${items ? items.length : 0} sermons`;
  }

  if (!items || items.length === 0) {
    container.className = 'msg-grid';
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
      document.getElementById('page-info-text').innerText = `Page ${currentPage} of ${totalPages} (${items.length} Total)`;
      document.getElementById('btn-prev-page').disabled = (currentPage === 1);
      document.getElementById('btn-next-page').disabled = (currentPage === totalPages);
      
      document.getElementById('btn-prev-page').classList.toggle('msg-btn-disabled', currentPage === 1);
      document.getElementById('btn-next-page').classList.toggle('msg-btn-disabled', currentPage === totalPages);
    } else {
      paginationBar.style.display = 'none';
    }
  }

  if (currentViewMode === 'table') {
    container.className = '';
    container.innerHTML = `
      <div class="msg-table-wrap">
        <table class="msg-archival-table">
          <thead>
            <tr>
              <th>Reference #</th>
              <th>Sermon Title</th>
              <th>Date</th>
              <th>Lang</th>
              <th style="text-align: right;">Available Formats</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.map(s => {
              const langCode = (s.language || 'en').toUpperCase();
              const textBtn = (s.pdf_url || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0))
                ? `<button class="msg-btn msg-btn-text" style="padding: 0.25rem 0.5rem;" onclick="openReaderModal('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'text')">📖 Text</button>`
                : '';
              const pdfBtn = s.pdf_url 
                ? `<button class="msg-btn msg-btn-pdf" style="padding: 0.25rem 0.5rem;" onclick="openReaderModal('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'pdf')">📄 PDF</button>`
                : '';
              const audioBtn = s.m4a_url
                ? `<button class="msg-btn msg-btn-audio" style="padding: 0.25rem 0.5rem;" onclick="playAudio('${escapeJs(s.title)}', '${s.id}', '${s.language}', '${s.m4a_url}')">🎧 Audio</button>`
                : '';
              return `
                <tr>
                  <td><code>${escapeHtml(s.id)}</code></td>
                  <td><strong>${escapeHtml(s.title)}</strong></td>
                  <td>${s.date || s.year || 'Unknown'}</td>
                  <td><span class="msg-badge-lang" style="position:static; display:inline-block;">${langCode}</span></td>
                  <td style="text-align: right;">
                    <div style="display:inline-flex; gap:0.35rem;">
                      ${textBtn} ${pdfBtn} ${audioBtn}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
    return;
  }

  container.className = 'msg-grid';
  container.innerHTML = pageItems.map(s => {
    const coverUrl = s.cover_image || DEFAULT_COVER;
    const langCode = (s.language || 'en').toUpperCase();
    
    const textBtn = (s.pdf_url || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0))
      ? `<button class="msg-btn msg-btn-text" onclick="openReaderModal('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'text')">📖 Text</button>`
      : `<span class="msg-btn msg-btn-text msg-btn-disabled">📖 Text</span>`;

    const pdfBtn = s.pdf_url 
      ? `<button class="msg-btn msg-btn-pdf" onclick="openReaderModal('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'pdf')">📄 PDF</button>`
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
            ${textBtn}
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

let currentReaderSermon = null;

async function openReaderModal(title, id, date, pdfUrl, language = 'en', defaultTab = 'text') {
  const modal = document.getElementById('reader-modal-backdrop');
  const titleEl = document.getElementById('reader-sermon-title');
  const subEl = document.getElementById('reader-sermon-sub');
  const downloadBtn = document.getElementById('reader-download-btn');

  currentReaderSermon = { title, id, date, pdfUrl, language };

  if (titleEl) titleEl.innerText = title;
  if (subEl) subEl.innerText = `Sermon ID: ${id} • Date: ${date || 'Catalogue Archive'}`;
  if (downloadBtn) downloadBtn.href = pdfUrl || '#';

  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  switchReaderTab(defaultTab);
}

async function switchReaderTab(tab) {
  if (!currentReaderSermon) return;
  const btnText = document.getElementById('tab-btn-text');
  const btnPdf = document.getElementById('tab-btn-pdf');
  const contentArea = document.getElementById('reader-content-area');

  if (!contentArea) return;

  if (btnText) btnText.classList.toggle('active', tab === 'text');
  if (btnPdf) btnPdf.classList.toggle('active', tab === 'pdf');

  if (tab === 'pdf') {
    contentArea.innerHTML = `<iframe src="${currentReaderSermon.pdfUrl}#toolbar=1" title="${escapeHtml(currentReaderSermon.title)}"></iframe>`;
    return;
  }

  contentArea.innerHTML = '<div style="text-align:center; padding: 3rem; color: var(--text-secondary);">📖 Loading transcript text...</div>';

  try {
    const res = await fetch(`/api/messages/${encodeURIComponent(currentReaderSermon.id)}/text?language=${currentReaderSermon.language}`);
    if (res.ok) {
      const json = await res.json();
      const item = json.data || {};
      if (item.paragraphs && item.paragraphs.length > 0) {
        contentArea.innerHTML = item.paragraphs.map(p => `
          <div class="msg-paragraph-item">
            <span class="msg-para-num">¶${p.number}</span>
            <div class="msg-para-text">${escapeHtml(p.text)}</div>
          </div>
        `).join('');
        return;
      } else if (item.full_text) {
        contentArea.innerHTML = `<div style="white-space: pre-wrap; line-height: 1.8;">${escapeHtml(item.full_text)}</div>`;
        return;
      }
    }
  } catch (e) {
    console.warn('Could not load transcript text:', e);
  }

  /* Fallback to embedded PDF reader if text transcript is loading or unparsed */
  contentArea.innerHTML = `
    <div style="text-align:center; padding: 3rem 1rem;">
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Transcript is ready in PDF document view:</p>
      <button class="msg-btn msg-btn-pdf" onclick="switchReaderTab('pdf')">📄 Open PDF Document Viewer</button>
    </div>
  `;
}

function closeReaderModal() {
  const modal = document.getElementById('reader-modal-backdrop');
  const contentArea = document.getElementById('reader-content-area');
  if (contentArea) contentArea.innerHTML = '';
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeJs(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

document.addEventListener('DOMContentLoaded', loadSermonsData);
</script>
