---
title: The Message Sermon Library
permalink: "/the-message/"
layout: page
hide_title: true
full_width: true
excerpt: Access and search over 1,200 sermons by William Marrion Branham in audio, PDF, and multiple languages including Chichewa.
comments: false
image: "https://branham.org/azure/branham/073884ef-dd28-41d1-a7b8-33accbc478b2.jpg"
description: Public catalogue and API for William Branham sermons in audio (M4A/MP3) and PDF transcript formats across 72+ languages.
---

<style>
/* ── Kumo UI Design System Tokens & Base Layout ──────────────────── */
body:has(.msg-library-wrapper) .wrapper,
.wrapper.full-width,
.wrapper:has(.msg-library-wrapper) {
  max-width: 1120px !important;
  width: 100% !important;
  padding-left: clamp(1rem, 3vw, 32px) !important;
  padding-right: clamp(1rem, 3vw, 32px) !important;
  box-sizing: border-box !important;
}

body:has(.msg-library-wrapper) .page-content,
.wrapper:has(.msg-library-wrapper) .page-content,
.page-content:has(.msg-library-wrapper) {
  max-width: 100% !important;
  width: 100% !important;
}

.msg-library-wrapper,
.msg-library-wrapper p,
.msg-library-wrapper > * {
  max-width: 100% !important;
}

.msg-library-wrapper {
  max-width: 1120px !important;
  width: 100% !important;
  margin: 0 auto;
  padding: 0.75rem 0 3.5rem;
  box-sizing: border-box;
  color: var(--text-primary);
  font-size: 14px;
}

.msg-library-wrapper p {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.msg-header {
  margin-bottom: 2rem;
}

.msg-header .page-kicker {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 0.35rem;
}

.msg-header h1 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.msg-header .page-subtitle {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 860px;
  margin-bottom: 1.25rem;
}

/* ── Editorial Header Summary & Badge ────────────────────────────── */
.msg-header-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  font-size: 13px;
  color: var(--text-secondary);
}

.msg-header-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: var(--kumo-radius-sm, 6px);
  background-color: var(--kumo-control, var(--bg-secondary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  font-weight: 500;
  color: var(--text-primary);
}

/* ── Kumo Control Panel (Search & Filters) ───────────────────────── */
.msg-controls-panel {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 12px);
  padding: 1.15rem;
  margin-bottom: 1.75rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.msg-search-group {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .msg-search-group {
    grid-template-columns: 1fr;
  }
}

.msg-input-box {
  width: 100%;
  height: 38px;
  padding: 0 0.85rem;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid var(--kumo-line, var(--border-default));
  border-radius: var(--kumo-radius-md, 8px);
  background-color: var(--kumo-canvas, var(--bg-primary));
  color: var(--text-primary);
  box-sizing: border-box;
}

.msg-input-box:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--kumo-focus, rgba(30, 58, 47, 0.2));
}

.msg-select-box {
  height: 38px;
  padding: 0 0.85rem;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid var(--kumo-line, var(--border-default));
  border-radius: var(--kumo-radius-md, 8px);
  background-color: var(--kumo-canvas, var(--bg-primary));
  color: var(--text-primary);
  cursor: pointer;
}

.msg-select-box:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--kumo-focus, rgba(30, 58, 47, 0.2));
}

.msg-quick-tags {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  font-size: 13px;
}

.msg-tag-label {
  font-weight: 500;
  font-size: 13px;
  color: var(--text-secondary);
  margin-right: 0.25rem;
}

.msg-filter-tag {
  padding: 0.25rem 0.7rem;
  border-radius: var(--kumo-radius-sm, 6px);
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--kumo-line, var(--border-default));
  background-color: var(--kumo-canvas, var(--bg-primary));
  color: var(--text-secondary);
  cursor: pointer;
}

.msg-filter-tag:hover {
  background-color: var(--kumo-control, var(--bg-secondary));
  color: var(--text-primary);
  border-color: var(--accent-primary);
}

.msg-filter-tag.active {
  background-color: var(--accent-primary);
  color: #ffffff !important;
  border-color: var(--accent-primary);
}

/* ── Kumo Segmented View Switcher ────────────────────────────────── */
.msg-view-mode-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--kumo-hairline, var(--border-subtle));
}

.msg-view-toggle {
  display: inline-flex;
  gap: 0.25rem;
  background-color: var(--kumo-control, var(--bg-secondary));
  padding: 2px;
  border-radius: var(--kumo-radius-md, 8px);
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
}

.msg-view-btn {
  padding: 0.3rem 0.75rem;
  font-size: 13px;
  font-weight: 500;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: var(--kumo-radius-sm, 6px);
  cursor: pointer;
}

.msg-view-btn.active {
  background-color: var(--surface-strong, var(--bg-primary));
  color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.msg-results-count {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

/* ── Kumo Layer Cards Grid ───────────────────────────────────────── */
.msg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.msg-card {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 12px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
}

.msg-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--accent-primary);
}

.msg-cover-wrap {
  position: relative;
  width: 100%;
  height: 155px;
  background-color: var(--kumo-control, var(--bg-secondary));
  overflow: hidden;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}

.msg-cover-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.msg-badge-lang {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--kumo-line);
  font-weight: 600;
  font-size: 11px;
  padding: 0.15rem 0.5rem;
  border-radius: var(--kumo-radius-sm, 6px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.msg-card-content {
  padding: 1rem 1.15rem 1.15rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.msg-card-title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 0.35rem;
}

.msg-card-meta {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 0.85rem;
}

.msg-card-actions {
  margin-top: auto;
  display: flex;
  gap: 0.45rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--kumo-hairline, var(--border-subtle));
}

/* ── Kumo Buttons ────────────────────────────────────────────────── */
.msg-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 0.65rem;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--kumo-radius-sm, 6px);
  text-decoration: none !important;
  cursor: pointer;
  border: 1px solid var(--kumo-line, var(--border-default));
  background-color: var(--kumo-canvas, var(--bg-primary));
  color: var(--text-primary);
  box-sizing: border-box;
}

.msg-btn:hover {
  background-color: var(--kumo-control, var(--bg-secondary));
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.msg-btn-primary {
  background-color: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
}

.msg-btn-primary:hover {
  background-color: var(--accent-secondary);
  border-color: var(--accent-secondary);
  color: #ffffff;
}

.msg-btn-disabled {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
  background-color: var(--kumo-control, var(--bg-secondary)) !important;
  color: var(--text-secondary) !important;
  border-color: var(--kumo-hairline, var(--border-subtle)) !important;
}

/* ── Kumo Archival Table ─────────────────────────────────────────── */
.msg-table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--kumo-radius-lg, 12px);
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  background-color: var(--surface-strong, var(--bg-primary));
  box-shadow: var(--shadow-sm);
  margin-bottom: 2.5rem;
}

.msg-archival-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

.msg-archival-table th {
  background-color: var(--kumo-control, var(--bg-secondary));
  color: var(--text-primary);
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--kumo-line, var(--border-default));
  white-space: nowrap;
}

.msg-archival-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--kumo-hairline, var(--border-subtle));
  color: var(--text-primary);
  vertical-align: middle;
}

.msg-archival-table tr:hover {
  background-color: var(--kumo-tint, rgba(23, 107, 91, 0.04));
}

.msg-archival-table tr:last-child td {
  border-bottom: none;
}

/* ── Kumo Full Immersion Sermon Reader ───────────────────────────── */
.msg-full-reader {
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  min-height: 85vh;
  width: 100%;
}

.msg-reader-toolbar {
  padding: 0.65rem 0.85rem;
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-bottom: 1px solid var(--kumo-line, var(--border-default));
  border-radius: var(--kumo-radius-lg, 12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0.75rem;
  z-index: 100;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(16px);
}

.msg-toolbar-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.msg-reader-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 34px;
  padding: 0 0.75rem;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--kumo-radius-sm, 6px);
  background-color: var(--kumo-canvas, var(--bg-primary));
  border: 1px solid var(--kumo-line, var(--border-default));
  color: var(--text-primary);
  cursor: pointer;
  text-decoration: none !important;
  box-sizing: border-box;
}

.msg-reader-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background-color: var(--kumo-tint, rgba(23, 107, 91, 0.06));
}

.msg-reader-btn.active {
  background-color: var(--accent-primary);
  color: #ffffff !important;
  border-color: var(--accent-primary);
}

.msg-reader-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.msg-reader-meta-title {
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.25;
}

.msg-reader-meta-sub {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 0.35rem;
}

.msg-reading-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background-color: var(--accent-primary);
  width: 0%;
  transition: width 0.1s ease;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* ── Reading Canvas Themes: Light / Sepia / Dark ─────────────────── */
.msg-reader-main-content {
  max-width: 960px;
  width: 100%;
  margin: 1.5rem auto 0;
  padding: 2rem 1.5rem 6rem;
  font-size: 18px;
  line-height: 1.9;
  color: var(--text-primary);
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  box-sizing: border-box;
  border-radius: var(--kumo-radius-lg, 12px);
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  box-shadow: var(--shadow-sm);
}

.msg-reader-main-content.msg-reader-wide {
  max-width: 100% !important;
  padding-left: 1.25rem !important;
  padding-right: 1.25rem !important;
}

.msg-reader-main-content.msg-theme-sepia {
  background-color: #fbf0d9 !important;
  color: #432818 !important;
  border-color: #ebd7b2 !important;
}

.msg-reader-main-content.msg-theme-dark {
  background-color: #0f172a !important;
  color: #e2e8f0 !important;
  border-color: #1e293b !important;
}

/* ── Paragraph Items & Live Audio Reading Highlight ──────────────── */
.msg-paragraph-item {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--kumo-radius-md, 8px);
  border-left: 3px solid transparent;
}

.msg-paragraph-item:hover {
  background-color: var(--kumo-tint, rgba(0, 0, 0, 0.03));
}

.msg-para-num {
  font-family: var(--mono-family, monospace);
  font-size: 0.9em;
  font-weight: 600;
  color: var(--accent-primary);
  background-color: var(--kumo-control, rgba(0, 0, 0, 0.05));
  padding: 0.2rem 0.5rem;
  border-radius: var(--kumo-radius-sm, 6px);
  height: fit-content;
  user-select: none;
}

.msg-para-text {
  flex: 1;
  font-size: inherit;
  line-height: inherit;
}

.msg-copy-para-btn {
  opacity: 0;
  height: fit-content;
  align-self: flex-start;
  padding: 0.2rem 0.5rem;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--kumo-line, var(--border-default));
  background: var(--kumo-canvas, var(--bg-primary));
  color: var(--text-secondary);
  border-radius: var(--kumo-radius-sm, 6px);
  cursor: pointer;
}

.msg-paragraph-item:hover .msg-copy-para-btn {
  opacity: 1;
}

.msg-copy-para-btn:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.msg-paragraph-item.msg-para-active-reading {
  background-color: var(--kumo-tint-hover, rgba(23, 107, 91, 0.14)) !important;
  border-left: 4px solid var(--accent-primary) !important;
}

.msg-sentence {
  padding: 0.1rem 0.25rem;
  border-radius: 4px;
  display: inline;
}

.msg-sentence.active-sentence {
  background-color: rgba(253, 224, 71, 0.65) !important;
  color: #0f172a !important;
  font-weight: 500;
  border-bottom: 2px solid var(--accent-primary);
}

.msg-reader-main-content.msg-theme-dark .msg-sentence.active-sentence {
  background-color: rgba(14, 165, 233, 0.4) !important;
  color: #ffffff !important;
  border-bottom: 2px solid #38bdf8;
}

.msg-karaoke-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background-color: var(--accent-primary);
  padding: 0.2rem 0.55rem;
  border-radius: var(--kumo-radius-full, 9999px);
  user-select: none;
}

/* ── Parallel Dual Column Split View ─────────────────────────────── */
.msg-parallel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media (max-width: 900px) {
  .msg-parallel-grid {
    grid-template-columns: 1fr;
  }
}

.msg-parallel-col {
  min-width: 0;
}

.msg-parallel-col-header {
  font-weight: 600;
  font-size: 14px;
  padding: 0.6rem 0.85rem;
  background-color: var(--kumo-control, var(--bg-secondary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-md, 8px);
  margin-bottom: 1rem;
}

/* ── Scripture Tag Pills & Strong's Popover ──────────────────────── */
.msg-scripture-ref {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  color: var(--accent-primary);
  background-color: var(--kumo-tint, rgba(23, 107, 91, 0.08));
  padding: 0.1rem 0.45rem;
  border-radius: var(--kumo-radius-sm, 6px);
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95em;
  border: 1px solid transparent;
}

.msg-scripture-ref:hover {
  background-color: var(--accent-primary);
  color: #ffffff !important;
  border-color: var(--accent-primary);
}

.msg-strongs-tag {
  display: inline-block;
  font-family: var(--mono-family, monospace);
  font-size: 0.85em;
  font-weight: 600;
  color: var(--accent-primary);
  background: var(--kumo-control, rgba(0,0,0,0.06));
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.15rem;
  user-select: none;
  vertical-align: middle;
}

.msg-strongs-tag:hover {
  background: var(--accent-primary);
  color: #ffffff;
}

.msg-strongs-popover-card {
  position: absolute;
  z-index: 100000;
  width: 340px;
  max-width: 90vw;
  background: var(--surface-strong, var(--bg-primary));
  color: var(--text-primary);
  border: 1px solid var(--accent-primary);
  border-radius: var(--kumo-radius-lg, 12px);
  padding: 1rem 1.15rem;
  box-shadow: var(--shadow-lg);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
}

/* ── Kumo Bottom Stats Dashboard & Region Map ────────────────────── */
.msg-stats-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.msg-stat-card {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 12px);
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.msg-stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-primary);
}

.msg-stat-val {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent-primary);
  line-height: 1.2;
}

.msg-stat-lbl {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.msg-map-section {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 12px);
  padding: 1.25rem 1.4rem;
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-sm);
}

.msg-region-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.msg-region-card {
  background-color: var(--kumo-canvas, var(--bg-primary));
  border: 1px solid var(--kumo-line, var(--border-default));
  border-radius: var(--kumo-radius-md, 8px);
  padding: 1rem 1.15rem;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.msg-region-card:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.msg-region-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.35rem;
}

.msg-region-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.msg-region-badge {
  font-size: 12px;
  font-weight: 500;
  background-color: var(--kumo-tint, rgba(23, 107, 91, 0.08));
  color: var(--accent-primary);
  padding: 0.15rem 0.5rem;
  border-radius: var(--kumo-radius-full, 9999px);
}

.msg-region-langs {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* ── Kumo Audio Dock Floating Player ─────────────────────────────── */
.msg-audio-dock {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 720px;
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-line, var(--border-default));
  border-radius: var(--kumo-radius-lg, 12px);
  box-shadow: var(--shadow-lg);
  padding: 0.75rem 1.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 10000;
  backdrop-filter: blur(16px);
  box-sizing: border-box;
}

.msg-audio-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.msg-audio-title {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary);
}

.msg-audio-sub {
  font-size: 13px;
  color: var(--text-secondary);
}

.msg-audio-close-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.msg-audio-close-btn:hover {
  color: var(--text-primary);
}

/* ── Kumo Bible Study Modal ──────────────────────────────────────── */
.msg-bible-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  padding: 1rem;
  box-sizing: border-box;
}

.msg-bible-dialog {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 12px);
  width: 100%;
  max-width: 780px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
}

.msg-bible-header {
  padding: 0.85rem 1.15rem;
  border-bottom: 1px solid var(--kumo-hairline, var(--border-subtle));
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.msg-bible-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.msg-bible-body {
  padding: 1.25rem 1.4rem;
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-primary);
}

/* ── API Box ─────────────────────────────────────────────────────── */
.msg-api-box {
  background-color: var(--surface-strong, var(--bg-primary));
  border: 1px solid var(--kumo-hairline, var(--border-subtle));
  border-radius: var(--kumo-radius-lg, 12px);
  padding: 1.25rem 1.4rem;
  margin-top: 2.5rem;
  box-shadow: var(--shadow-sm);
}

.msg-api-box h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.35rem 0;
  color: var(--text-primary);
}

.msg-api-box p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 0.75rem;
}

.msg-api-box code {
  background-color: var(--kumo-control, var(--bg-secondary));
  padding: 0.2rem 0.45rem;
  border-radius: var(--kumo-radius-sm, 6px);
  font-size: 0.9em;
}

.msg-pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2.5rem 0;
}

.msg-page-info {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.msg-empty {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--text-secondary);
  grid-column: 1 / -1;
  font-size: 14px;
}
</style>

<div class="msg-library-wrapper">

  <!-- ── Full Immersion Sermon Reader View (Hidden by default) ─────── -->
  <section id="full-reader-section" class="msg-full-reader" style="display: none;">
    <div class="msg-reader-toolbar">
      <div id="reading-progress-bar" class="msg-reading-progress"></div>

      <!-- Navigation Group -->
      <div class="msg-toolbar-group">
        <button class="msg-reader-btn" onclick="closeFullReader()">← Library</button>
        <button class="msg-reader-btn" id="reader-prev-btn" onclick="navigateSermon(-1)" title="Previous sermon">← Prev</button>
        <button class="msg-reader-btn" id="reader-next-btn" onclick="navigateSermon(1)" title="Next sermon">Next →</button>
        <select id="reader-sermon-select" class="msg-select-box" style="height: 34px; max-width: 240px;" onchange="onReaderSermonSelect(this.value)">
          <!-- Loaded dynamically -->
        </select>
      </div>

      <!-- View Mode Tabs -->
      <div class="msg-toolbar-group">
        <button class="msg-reader-btn active" id="tab-btn-text" onclick="switchReaderTab('text')">📖 Reading</button>
        <button class="msg-reader-btn" id="tab-btn-parallel" onclick="switchReaderTab('parallel')">🔀 Parallel dual</button>
        <button class="msg-reader-btn" id="tab-btn-bible" onclick="switchReaderTab('bible')">📜 KJV Bible</button>
        <button class="msg-reader-btn" id="tab-btn-pdf" onclick="switchReaderTab('pdf')">📄 PDF document</button>
      </div>

      <!-- Reader Settings -->
      <div class="msg-toolbar-group">
        <select id="reader-font-size" class="msg-select-box" style="height: 34px; width: 90px;" onchange="changeReaderFontSize(this.value)" title="Adjust text size">
          <option value="16px">Small</option>
          <option value="18px" selected>Normal</option>
          <option value="21px">Large</option>
          <option value="25px">Extra large</option>
        </select>
        <select id="parallel-lang-select" class="msg-select-box" style="height: 34px; width: 160px; display: none;" onchange="updateParallelLanguage(this.value)">
          <option value="en">English (Original)</option>
          <option value="fra">French (Français)</option>
          <option value="nya">Chichewa (Chinyanja)</option>
          <option value="es">Spanish (Español)</option>
          <option value="pt">Portuguese (Português)</option>
          <option value="ru">Russian (Русский)</option>
          <option value="sw">Swahili (Kiswahili)</option>
          <option value="de">German (Deutsch)</option>
          <option value="zh">Chinese (中文)</option>
          <option value="ja">Japanese (日本語)</option>
        </select>
        <button class="msg-reader-btn" id="btn-theme-light" onclick="setReaderTheme('light')" title="Light theme">Light</button>
        <button class="msg-reader-btn" id="btn-theme-sepia" onclick="setReaderTheme('sepia')" title="Sepia theme">Sepia</button>
        <button class="msg-reader-btn" id="btn-theme-dark" onclick="setReaderTheme('dark')" title="Dark theme">Dark</button>
        <button class="msg-reader-btn" id="btn-toggle-wide" onclick="toggleReaderWidth()" title="Toggle wide reading canvas">Wide</button>
        <button class="msg-reader-btn" id="reader-audio-btn" onclick="toggleReaderAudio()" title="Play audio recording">Audio</button>
        <a id="reader-download-btn" class="msg-reader-btn" href="#" target="_blank" title="Download PDF transcript" rel="noopener">PDF</a>
      </div>
    </div>

    <!-- Reader Title & Meta Banner -->
    <div style="margin-top: 1.5rem; text-align: center; padding: 0 1rem;">
      <h2 id="reader-sermon-title" class="msg-reader-meta-title">Sermon title</h2>
      <p id="reader-sermon-sub" class="msg-reader-meta-sub">Date • Location • Language</p>
    </div>

    <!-- Search in Transcript Bar -->
    <div style="max-width: 480px; margin: 1rem auto 0; padding: 0 1rem;">
      <input type="search" id="reader-search-input" class="msg-input-box" placeholder="Search within transcript..." oninput="searchInTranscript(this.value)">
    </div>

    <!-- Active Reading Content Area -->
    <div id="reader-content-area" class="msg-reader-main-content">
      <p style="text-align: center; color: var(--text-secondary); padding: 3rem 0;">Loading transcript text...</p>
    </div>
  </section>

  <!-- ── Catalogue Grid Library View ───────────────────────────────── -->
  <section id="catalogue-section">

    <!-- Header -->
    <div class="msg-header">
      <p class="page-kicker">Sermon archive</p>
      <h1>The message sermon library</h1>
      <p class="page-subtitle">A digital library of sermons preached by William Marrion Branham between 1947 and 1965, with original audio recordings, text transcripts, and translations across 72 languages.</p>

      <div class="msg-header-meta-row">
        <span class="msg-header-tag"><strong id="stat-total">1,291</strong> sermons</span>
        <span class="msg-header-tag">72 languages</span>
        <span class="msg-header-tag">Audio & text</span>
        <a href="{{ '/api-docs/' | relative_url }}" style="color: var(--accent-primary); text-decoration: none; margin-left: auto; font-size: 13px;">REST API →</a>
      </div>
    </div>

    <!-- Controls Panel -->
    <div class="msg-controls-panel">
      <div class="msg-search-group">
        <input
          type="search"
          id="msg-search"
          class="msg-input-box"
          placeholder="Search sermons by title, scripture, or sermon ID..."
          aria-label="Search sermons"
          oninput="applyFilters()"
        />
        <select id="msg-lang-select" class="msg-select-box" aria-label="Filter by language" onchange="applyFilters()">
          <option value="">All languages (72)</option>
        </select>
        <select id="msg-year-select" class="msg-select-box" aria-label="Filter by year" onchange="applyFilters()">
          <option value="">All years (1947–1965)</option>
        </select>
      </div>

      <!-- Quick Filter Chips -->
      <div class="msg-quick-tags">
        <span class="msg-tag-label">Languages:</span>
        <button class="msg-filter-tag active" onclick="setQuickLang('')">All</button>
        <button class="msg-filter-tag" onclick="setQuickLang('en')">English</button>
        <button class="msg-filter-tag" onclick="setQuickLang('fra')">French</button>
        <button class="msg-filter-tag" onclick="setQuickLang('es')">Spanish</button>
        <button class="msg-filter-tag" onclick="setQuickLang('nya')">Chichewa</button>
        <button class="msg-filter-tag" onclick="setQuickLang('sw')">Swahili</button>
        <button class="msg-filter-tag" onclick="setQuickLang('pt')">Portuguese</button>
        <button class="msg-filter-tag" onclick="setQuickLang('ru')">Russian</button>
      </div>

      <!-- View Switcher & Result Counter -->
      <div class="msg-view-mode-bar">
        <div class="msg-view-toggle">
          <button id="view-btn-grid" class="msg-view-btn active" onclick="setViewMode('grid')">Grid</button>
          <button id="view-btn-table" class="msg-view-btn" onclick="setViewMode('table')">Table</button>
        </div>
        <div id="results-count-text" class="msg-results-count">Showing sermons...</div>
      </div>
    </div>

    <!-- Sermon Cards Container -->
    <div id="sermons-container" class="msg-grid">
      <!-- Loaded dynamically -->
    </div>

    <!-- Pagination -->
    <div id="pagination-controls" class="msg-pagination-bar" style="display: none;">
      <button id="btn-prev-page" class="msg-reader-btn" onclick="changePage(-1)">← Previous</button>
      <span id="page-info-text" class="msg-page-info">Page 1</span>
      <button id="btn-next-page" class="msg-reader-btn" onclick="changePage(1)">Next →</button>
    </div>

    <!-- Region Translation Overview -->
    <div class="msg-map-section">
      <h3 style="margin-top:0; margin-bottom: 0.35rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);">Translations by territory</h3>
      <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 1rem;">Filter available recordings and translations by geographical region:</p>
      <div class="msg-region-grid">
        <div class="msg-region-card" onclick="filterByRegion('africa')">
          <div class="msg-region-header">
            <span class="msg-region-name">Africa & East Africa</span>
            <span class="msg-region-badge">24 languages</span>
          </div>
          <p class="msg-region-langs">Chichewa, Swahili, Afrikaans, Luganda, Kinyarwanda, Shona, Zulu, Lingala...</p>
        </div>
        <div class="msg-region-card" onclick="filterByRegion('americas')">
          <div class="msg-region-header">
            <span class="msg-region-name">Americas & Caribbean</span>
            <span class="msg-region-badge">14 languages</span>
          </div>
          <p class="msg-region-langs">English, Spanish, Portuguese, Haitian Creole, Quechua, Guarani, Papiamento...</p>
        </div>

        <div class="msg-region-card" onclick="filterByRegion('europe')">
          <div class="msg-region-header">
            <span class="msg-region-name">Europe & Eurasia</span>
            <span class="msg-region-badge">20 languages</span>
          </div>
          <p class="msg-region-langs">French, Russian, German, Dutch, Polish, Italian, Romanian, Ukrainian, Czech...</p>
        </div>

        <div class="msg-region-card" onclick="filterByRegion('asia')">
          <div class="msg-region-header">
            <span class="msg-region-name">Asia & Pacific</span>
            <span class="msg-region-badge">14 languages</span>
          </div>
          <p class="msg-region-langs">Chinese, Japanese, Hindi, Tagalog, Indonesian, Korean, Vietnamese, Tamil...</p>
        </div>
      </div>
    </div>

    <!-- Developer API Box -->
    <section class="msg-api-box" style="margin-top: 2rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
        <h3 style="font-size: 0.95rem; font-weight: 600; margin: 0;">Machine-readable REST API</h3>
        <a href="{{ '/api-docs/' | relative_url }}" class="msg-btn msg-btn-text" style="flex: 0 0 auto; font-size: 12px; height: 28px;">API docs →</a>
      </div>
      <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 0.75rem;">Fetch structured sermon metadata, full paragraph transcripts, PDF links, and audio stream URLs directly via REST endpoints:</p>
      <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 13px; font-family: var(--mono-family, monospace);">
        <div>GET /api/messages?language=nya</div>
        <div>GET /api/messages/65-0718M/text</div>
        <div>GET /api/search?q=seven+seals</div>
      </div>
    </section>
  </div>

  <!-- ── Floating Audio Dock Player ───────────────────────────────── -->
  <div id="audio-player-bar" class="msg-audio-dock" style="display: none;">
    <div class="msg-audio-meta">
      <div style="min-width: 0; flex: 1;">
        <div id="player-sermon-title" class="msg-audio-title">Sermon title</div>
        <div id="player-sermon-sub" class="msg-audio-sub">Sermon ID • Language</div>
      </div>
    </div>
    <audio id="audio-element" controls style="height: 32px; max-width: 300px; outline: none;"></audio>
    <button onclick="closePlayer()" class="msg-audio-close-btn" title="Close player">✕</button>
  </div>

  <!-- ── Bible & Strong's Concordance Modal ───────────────────────── -->
  <div id="bible-modal-backdrop" class="msg-bible-backdrop" style="display: none;" onclick="if(event.target === this) closeBibleModal()">
    <div class="msg-bible-dialog">
      <header class="msg-bible-header">
        <h3 id="bible-modal-title" class="msg-bible-title">Scripture text (King James Version)</h3>
        <button onclick="closeBibleModal()" class="msg-audio-close-btn" title="Close modal">✕</button>
      </header>
      <main id="bible-modal-body" class="msg-bible-body">
        <div>Loading scripture verse & Strong's Concordance lexicon...</div>
      </main>
    </div>
  </div>
        <div>Loading scripture verse & Strong's Concordance lexicon...</div>
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
      const staticRes = await fetch('{{ "/_data/languages.json" | relative_url }}');
      if (staticRes.ok) languages = await staticRes.json();
    } catch (e) {}

    if (!languages || languages.length === 0) {
      try {
        const res = await fetch('/api/languages');
        if (res.ok) {
          const result = await res.json();
          languages = result.data || result;
        }
      } catch (e) {}
    }

    if (languages && languages.length > 0) {
      const select = document.getElementById('msg-lang-select');
      if (select) {
        const selectedVal = select.value || 'en';
        select.innerHTML = '<option value="">All Languages (72)</option>' + 
          languages.map(l => `<option value="${l.code}" ${l.code === selectedVal ? 'selected' : ''}>${l.name} (${l.english_name || l.name})</option>`).join('');
      }

      const parSelect = document.getElementById('parallel-lang-select');
      if (parSelect) {
        parSelect.innerHTML = languages.map(l => `<option value="${l.code}" ${l.code === 'ny' ? 'selected' : ''}>🌐 ${l.name} (${l.code.toUpperCase()})</option>`).join('');
      }
    }
  } catch (e) {
    console.warn('Could not load dynamic language list:', e);
  }
}

async function loadStatsData() {
  try {
    let stats = null;
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const json = await res.json();
        stats = json.data || json;
      }
    } catch (e) {}

    if (stats) {
      const totalCount = stats.total_sermons || allSermons.length || 1291;
      const audioCount = stats.sermons_with_audio || totalCount;
      const pdfCount = stats.sermons_with_pdf || totalCount;
      const textCount = stats.sermons_with_text || totalCount;
      const langCount = stats.available_languages || stats.total_languages || 72;

      const statEl = document.getElementById('stat-total');
      if (statEl) statEl.innerText = `${totalCount.toLocaleString()}+`;

      const elSermons = document.getElementById('stat-exact-sermons');
      if (elSermons) elSermons.innerText = `${totalCount.toLocaleString()}`;

      const elAudio = document.getElementById('stat-exact-audio');
      if (elAudio) elAudio.innerText = `${audioCount.toLocaleString()}`;

      const elPdf = document.getElementById('stat-exact-pdf');
      if (elPdf) elPdf.innerText = `${pdfCount.toLocaleString()}`;

      const elText = document.getElementById('stat-exact-text');
      if (elText) elText.innerText = `${textCount.toLocaleString()}`;

      const elLangs = document.getElementById('stat-exact-langs');
      if (elLangs) elLangs.innerText = `${langCount}`;
    }
  } catch (err) {
    console.warn('Could not load API stats:', err);
  }
}

async function loadSermonsData() {
  await loadLanguagesData();
  try {
    try {
      const staticRes = await fetch('{{ "/_data/sermons.json" | relative_url }}');
      if (staticRes.ok) allSermons = await staticRes.json();
    } catch (e) {}

    if (!allSermons || allSermons.length === 0) {
      try {
        const res = await fetch('/api/messages?limit=500');
        if (res.ok) {
          const result = await res.json();
          allSermons = result.data || result;
        }
      } catch (e) {}
    }
  } catch (err) {
    console.error('Failed to load sermon data:', err);
  }

  const totalCount = allSermons.length || 1291;
  const audioCount = allSermons.filter(s => s.m4a_url).length || totalCount;
  const pdfCount = allSermons.filter(s => s.pdf_url).length || totalCount;
  const textCount = allSermons.filter(s => s.full_text || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0)).length || totalCount;

  const statEl = document.getElementById('stat-total');
  if (statEl) statEl.innerText = `${totalCount.toLocaleString()}+`;

  const elSermons = document.getElementById('stat-exact-sermons');
  if (elSermons) elSermons.innerText = `${totalCount.toLocaleString()}`;

  const elAudio = document.getElementById('stat-exact-audio');
  if (elAudio) elAudio.innerText = `${audioCount.toLocaleString()}`;

  const elPdf = document.getElementById('stat-exact-pdf');
  if (elPdf) elPdf.innerText = `${pdfCount.toLocaleString()}`;

  const elText = document.getElementById('stat-exact-text');
  if (elText) elText.innerText = `${textCount.toLocaleString()}`;

  /* Populate unique years dropdown */
  const years = Array.from(new Set(allSermons.map(s => s.year).filter(Boolean))).sort((a, b) => b - a);
  const yearSelect = document.getElementById('msg-year-select');
  if (yearSelect && years.length > 0) {
    yearSelect.innerHTML = '<option value="">All Years</option>' + years.map(y => `<option value="${y}">${y}</option>`).join('');
  }

  await loadStatsData();
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
    countText.innerText = `Showing ${items ? items.length.toLocaleString() : 0} sermons`;
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

  const totalPages = Math.ceil(items.length / pageSize);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIdx, startIdx + pageSize);

  if (paginationBar) {
    if (totalPages > 1) {
      paginationBar.style.display = 'flex';
      const langSelect = document.getElementById('msg-lang-select');
      const selectedOpt = langSelect && langSelect.options[langSelect.selectedIndex];
      const langLabel = (selectedOpt && langSelect.value) ? `${selectedOpt.text}` : 'Total';

      document.getElementById('page-info-text').innerText = `Page ${currentPage} of ${totalPages} (${items.length} ${langLabel} Sermons)`;
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
              <th style="text-align: right;">Formats</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.map(s => {
              const langCode = (s.language || 'en').toUpperCase();
              const textBtn = (s.full_text || s.pdf_url || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0))
                ? `<button class="msg-btn msg-btn-primary" style="padding: 0.2rem 0.55rem; height: 28px; font-size: 12px;" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'text')">Read</button>`
                : '';
              const pdfBtn = s.pdf_url 
                ? `<button class="msg-btn" style="padding: 0.2rem 0.55rem; height: 28px; font-size: 12px;" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'pdf')">PDF</button>`
                : '';
              const audioBtn = s.m4a_url
                ? `<button class="msg-btn" style="padding: 0.2rem 0.55rem; height: 28px; font-size: 12px;" onclick="playAudio('${escapeJs(s.title)}', '${s.id}', '${s.language}', '${s.m4a_url}')">Audio</button>`
                : '';
              return `
                <tr>
                  <td><code>${escapeHtml(s.id)}</code></td>
                  <td><strong>${escapeHtml(s.title)}</strong></td>
                  <td>${s.date || s.year || ''}</td>
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
    const langCode = (s.language || 'en').toUpperCase();
    const sermonDate = s.date || (s.year ? `Year ${s.year}` : '');
    
    const textBtn = (s.full_text || s.pdf_url || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0))
      ? `<button class="msg-btn msg-btn-primary" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'text')">Read</button>`
      : `<span class="msg-btn msg-btn-disabled">Read</span>`;

    const pdfBtn = s.pdf_url 
      ? `<button class="msg-btn" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'pdf')">PDF</button>`
      : `<span class="msg-btn msg-btn-disabled">PDF</span>`;
      
    const audioBtn = s.m4a_url
      ? `<button class="msg-btn" onclick="playAudio('${escapeJs(s.title)}', '${s.id}', '${s.language}', '${s.m4a_url}')">Audio</button>`
      : `<span class="msg-btn msg-btn-disabled">Audio</span>`;

    return `
      <article class="msg-card">
        <div class="msg-card-content">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.4rem;">
            <code style="font-size: 12px; color: var(--accent-primary); font-weight: 600;">${escapeHtml(s.id)}</code>
            <span style="font-size: 11px; font-weight: 600; padding: 0.1rem 0.45rem; border-radius: 4px; background: var(--kumo-control, var(--bg-secondary)); border: 1px solid var(--kumo-line); color: var(--text-secondary);">${langCode}</span>
          </div>
          <h3 class="msg-card-title">${escapeHtml(s.title)}</h3>
          <div class="msg-card-meta">
            ${sermonDate ? `<span>${escapeHtml(sermonDate)}</span>` : ''}
            ${s.number ? `<span style="margin-left: 0.35rem; opacity: 0.7;">• #${s.number}</span>` : ''}
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

const _langCatalogCache = {};

async function applyFilters() {
  currentPage = 1;
  const query = (document.getElementById('msg-search').value || '').toLowerCase().trim();
  const selectedLang = document.getElementById('msg-lang-select').value;
  const selectedYear = document.getElementById('msg-year-select').value;

  let baseSermons = allSermons;

  if (selectedLang && selectedLang !== 'en') {
    const localMatches = allSermons.filter(s => s.language === selectedLang);
    if (localMatches.length > 0) {
      baseSermons = localMatches;
    } else {
      if (!_langCatalogCache[selectedLang]) {
        const countText = document.getElementById('results-count-text');
        if (countText) countText.innerText = `Fetching ${selectedLang.toUpperCase()} sermons from archive API...`;
        try {
          const res = await fetch(`/api/languages/${encodeURIComponent(selectedLang)}/messages?limit=200`);
          if (res.ok) {
            const json = await res.json();
            _langCatalogCache[selectedLang] = json.data || [];
          }
        } catch (e) {
          console.warn(`Could not load ${selectedLang} sermons:`, e);
        }
      }
      baseSermons = _langCatalogCache[selectedLang] || [];
    }
  }

  filteredSermons = baseSermons.filter(s => {
    if (selectedLang && s.language && s.language !== selectedLang && selectedLang !== 'en') return false;
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

function playLwbRadio(type = 'music') {
  const radioStreamUrl = `/api/radio-stream?type=${encodeURIComponent(type)}`;
  playAudio('24/7 End Time Gospel Music & Broadcast', 'LWB 24/7 Radio', 'EN', radioStreamUrl);
}

function playAudio(title, id, lang, url) {
  const bar = document.getElementById('audio-player-bar');
  const titleEl = document.getElementById('player-sermon-title');
  const subEl = document.getElementById('player-sermon-sub');
  const audioEl = document.getElementById('audio-element');

  if (!audioEl) return;

  let secureUrl = url || '';
  if (secureUrl.startsWith('http://')) {
    secureUrl = secureUrl.replace('http://', 'https://');
  }

  titleEl.innerText = title;
  subEl.innerText = `Sermon ${id} • ${lang.toUpperCase()}`;
  audioEl.src = secureUrl;
  bar.style.display = 'flex';

  audioEl.onerror = function() {
    console.warn('Audio stream unavailable or blocked:', secureUrl);
    subEl.innerText = `Sermon ${id} • Live Radio Stream Connecting...`;
  };

  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.catch(e => {
      console.log('Audio playback waiting for user interaction:', e);
    });
  }

  /* Live Karaoke Active Reading Sync */
  audioEl.ontimeupdate = function() {
    if (!audioEl.duration || audioEl.paused) return;
    const progress = audioEl.currentTime / audioEl.duration;
    const paraItems = Array.from(document.querySelectorAll('#reader-content-area .msg-paragraph-item'));
    if (paraItems.length === 0) return;

    let totalTextChars = 0;
    const paraCharOffsets = paraItems.map(item => {
      const textEl = item.querySelector('.msg-para-text');
      const len = textEl ? (textEl.textContent || '').length : 1;
      const start = totalTextChars;
      totalTextChars += len;
      return { item, start, len, end: totalTextChars };
    });

    if (totalTextChars === 0) return;
    const targetCharOffset = progress * totalTextChars;

    let activeParaObj = paraCharOffsets.find(p => targetCharOffset >= p.start && targetCharOffset <= p.end);
    if (!activeParaObj) activeParaObj = paraCharOffsets[paraCharOffsets.length - 1];

    const activeEl = activeParaObj.item;

    if (activeEl) {
      if (!activeEl.classList.contains('msg-para-active-reading')) {
        document.querySelectorAll('.msg-para-active-reading').forEach(el => {
          el.classList.remove('msg-para-active-reading');
          const oldBadge = el.querySelector('.msg-karaoke-badge');
          if (oldBadge) oldBadge.remove();
        });

        activeEl.classList.add('msg-para-active-reading');

        const numEl = activeEl.querySelector('.msg-para-num');
        if (numEl && !activeEl.querySelector('.msg-karaoke-badge')) {
          const badge = document.createElement('span');
          badge.className = 'msg-karaoke-badge';
          badge.innerHTML = '🎙️ READING';
          numEl.after(badge);
        }

        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const sentences = Array.from(activeEl.querySelectorAll('.msg-sentence'));
      if (sentences.length > 0) {
        const paraProgress = (targetCharOffset - activeParaObj.start) / Math.max(1, activeParaObj.len);
        let totalSentChars = 0;
        const sentCharOffsets = sentences.map(s => {
          const sLen = (s.textContent || '').length;
          const sStart = totalSentChars;
          totalSentChars += sLen;
          return { s, sStart, sEnd: totalSentChars };
        });

        const targetSentOffset = paraProgress * totalSentChars;
        let activeSentObj = sentCharOffsets.find(so => targetSentOffset >= so.sStart && targetSentOffset <= so.sEnd);
        if (!activeSentObj) activeSentObj = sentCharOffsets[sentCharOffsets.length - 1];

        const activeSentenceEl = activeSentObj ? activeSentObj.s : null;
        if (activeSentenceEl && !activeSentenceEl.classList.contains('active-sentence')) {
          document.querySelectorAll('.msg-sentence.active-sentence').forEach(s => s.classList.remove('active-sentence'));
          activeSentenceEl.classList.add('active-sentence');
        }
      }
    }
  };
}

function closePlayer() {
  const bar = document.getElementById('audio-player-bar');
  const audioEl = document.getElementById('audio-element');
  if (audioEl) audioEl.pause();
  if (bar) bar.style.display = 'none';
}

let currentReaderSermon = null;
let currentReaderFontSize = 1.25;

function populateReaderSermonSelect(currentId) {
  const select = document.getElementById('reader-sermon-select');
  if (!select || !allSermons || allSermons.length === 0) return;

  select.innerHTML = allSermons.map(s => `
    <option value="${s.id}" ${s.id === currentId ? 'selected' : ''}>
      ${s.id} — ${escapeHtml(s.title)}
    </option>
  `).join('');
}

function onReaderSermonSelect(sermonId) {
  if (!allSermons || !sermonId) return;
  const found = allSermons.find(s => s.id === sermonId);
  if (found) {
    const lang = currentReaderSermon ? currentReaderSermon.language : 'en';
    openFullReader(found.title, found.id, found.date || found.year || '', found.pdf_url, lang, 'text');
  }
}

function navigateSermon(direction) {
  if (!currentReaderSermon || !allSermons || allSermons.length === 0) return;
  const currentIndex = allSermons.findIndex(s => s.id === currentReaderSermon.id);
  if (currentIndex === -1) return;

  const targetIndex = currentIndex + direction;
  if (targetIndex >= 0 && targetIndex < allSermons.length) {
    const target = allSermons[targetIndex];
    openFullReader(target.title, target.id, target.date || target.year || '', target.pdf_url, currentReaderSermon.language, 'text');
  }
}

function searchInTranscript(query) {
  query = (query || '').toLowerCase().trim();
  const paraItems = document.querySelectorAll('#reader-content-area .msg-paragraph-item');

  paraItems.forEach(item => {
    const textEl = item.querySelector('.msg-para-text');
    if (!textEl) return;
    const text = textEl.textContent || '';
    if (!query) {
      item.style.display = 'flex';
      item.style.backgroundColor = '';
    } else if (text.toLowerCase().includes(query)) {
      item.style.display = 'flex';
      item.style.backgroundColor = 'var(--kumo-tint-hover, rgba(23, 107, 91, 0.12))';
    } else {
      item.style.display = 'none';
    }
  });
}

function toggleReaderAudio() {
  if (!currentReaderSermon) return;
  const audioEl = document.getElementById('audio-element');
  const btn = document.getElementById('reader-audio-btn');

  let audioUrl = currentReaderSermon.m4aUrl;
  if (!audioUrl && allSermons) {
    const found = allSermons.find(s => s.id === currentReaderSermon.id);
    if (found) audioUrl = found.m4a_url;
  }

  if (!audioUrl) {
    alert('Audio recording is not available for this sermon.');
    return;
  }

  if (audioEl && audioEl.src && !audioEl.paused) {
    audioEl.pause();
    if (btn) btn.innerText = '🎧 Play Audio';
  } else {
    playAudio(currentReaderSermon.title, currentReaderSermon.id, currentReaderSermon.language, audioUrl);
    if (btn) btn.innerText = '⏸ Pause Audio';
  }
}

function changeReaderFontSize(val) {
  const contentArea = document.getElementById('reader-content-area');
  if (contentArea) contentArea.style.fontSize = val;
}

function toggleReaderWidth() {
  const contentArea = document.getElementById('reader-content-area');
  if (contentArea) contentArea.classList.toggle('msg-reader-wide');
}

function adjustFontSize(delta) {
  currentReaderFontSize = Math.max(0.95, Math.min(1.65, currentReaderFontSize + (delta * 0.1)));
  const contentArea = document.getElementById('reader-content-area');
  if (contentArea) contentArea.style.fontSize = `${currentReaderFontSize}rem`;
}

async function openFullReader(title, id, date, pdfUrl, language = 'en', defaultTab = 'text') {
  const catalogueSection = document.getElementById('catalogue-section');
  const readerSection = document.getElementById('full-reader-section');
  const titleEl = document.getElementById('reader-sermon-title');
  const subEl = document.getElementById('reader-sermon-sub');
  const downloadBtn = document.getElementById('reader-download-btn');
  const searchInput = document.getElementById('reader-search-input');
  const audioBtn = document.getElementById('reader-audio-btn');

  const siteHeader = document.querySelector('.site-header, header.site-header, header');
  if (siteHeader) siteHeader.style.display = 'none';

  currentReaderSermon = { title, id, date, pdfUrl, language };

  if (titleEl) titleEl.innerText = title;
  if (subEl) subEl.innerText = `Sermon ID: ${id} • Date: ${date || 'Archive'} • Language: ${language.toUpperCase()}`;
  if (downloadBtn) downloadBtn.href = pdfUrl || '#';
  if (searchInput) searchInput.value = '';

  const audioEl = document.getElementById('audio-element');
  if (audioBtn) {
    if (audioEl && audioEl.src && !audioEl.paused) {
      audioBtn.innerText = '⏸ Pause Audio';
    } else {
      audioBtn.innerText = '🎧 Audio';
    }
  }

  populateReaderSermonSelect(id);

  const currentIndex = allSermons ? allSermons.findIndex(s => s.id === id) : -1;
  const btnPrev = document.getElementById('reader-prev-btn');
  const btnNext = document.getElementById('reader-next-btn');
  if (btnPrev) btnPrev.disabled = (currentIndex <= 0);
  if (btnNext) btnNext.disabled = (currentIndex === -1 || currentIndex >= allSermons.length - 1);

  if (catalogueSection) catalogueSection.style.display = 'none';
  if (readerSection) readerSection.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const newUrl = `${window.location.pathname}?read=${encodeURIComponent(id)}&lang=${encodeURIComponent(language)}`;
  window.history.pushState({ sermonId: id }, '', newUrl);

  switchReaderTab(defaultTab);
}

function closeFullReader() {
  const catalogueSection = document.getElementById('catalogue-section');
  const readerSection = document.getElementById('full-reader-section');
  const contentArea = document.getElementById('reader-content-area');

  const siteHeader = document.querySelector('.site-header, header.site-header, header');
  if (siteHeader) siteHeader.style.display = '';

  if (contentArea) contentArea.innerHTML = '';
  if (readerSection) readerSection.style.display = 'none';
  if (catalogueSection) catalogueSection.style.display = 'block';

  window.history.pushState({}, '', window.location.pathname);
}

function setReaderTheme(theme) {
  const contentArea = document.getElementById('reader-content-area');
  if (!contentArea) return;
  contentArea.classList.remove('msg-theme-light', 'msg-theme-sepia', 'msg-theme-dark');
  if (theme === 'sepia') contentArea.classList.add('msg-theme-sepia');
  else if (theme === 'dark') contentArea.classList.add('msg-theme-dark');
}

function updateReadingProgress() {
  const progressBar = document.getElementById('reading-progress-bar');
  const readerSection = document.getElementById('full-reader-section');
  if (!progressBar || !readerSection || readerSection.style.display === 'none') return;

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight <= 0) {
    progressBar.style.width = '0%';
    return;
  }
  const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateReadingProgress);

function copyQuote(number, text) {
  const sermonTitle = currentReaderSermon ? currentReaderSermon.title : '';
  const sermonId = currentReaderSermon ? currentReaderSermon.id : '';
  const quoteText = `"${text}"\n\n— William Branham (${sermonId} ${sermonTitle}, ¶${number})`;

  navigator.clipboard.writeText(quoteText).then(() => {
    const btn = document.getElementById(`copy-btn-${number}`);
    if (btn) {
      btn.innerText = '✓ Copied';
      setTimeout(() => btn.innerText = '📋 Copy', 2000);
    }
  }).catch(err => {
    console.error('Copy failed:', err);
  });
}

function toggleFocusMode() {
  const section = document.getElementById('full-reader-section');
  if (!document.fullscreenElement) {
    if (section.requestFullscreen) section.requestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

function toggleHighlight(sermonId, paraNum) {
  const key = `msg_hl_${sermonId}_${paraNum}`;
  const current = localStorage.getItem(key);
  const itemEl = document.getElementById(`p${paraNum}`);
  if (!itemEl) return;

  itemEl.classList.remove('msg-para-highlighted-yellow', 'msg-para-highlighted-green', 'msg-para-highlighted-blue');

  let nextState = 'yellow';
  if (current === 'yellow') nextState = 'green';
  else if (current === 'green') nextState = 'blue';
  else if (current === 'blue') nextState = 'none';

  if (nextState !== 'none') {
    localStorage.setItem(key, nextState);
    itemEl.classList.add(`msg-para-highlighted-${nextState}`);
  } else {
    localStorage.removeItem(key);
  }
}

function updateParallelLanguage(targetLang) {
  switchReaderTab('parallel', targetLang);
}

function updateTabButtons(activeTab) {
  const tabIds = ['text', 'parallel', 'bible', 'pdf'];
  tabIds.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) btn.classList.toggle('active', t === activeTab);
  });
}

async function switchReaderTab(tab, customParallelLang = null) {
  updateTabButtons(tab);

  const parSelect = document.getElementById('parallel-lang-select');
  const contentArea = document.getElementById('reader-content-area');
  const subEl = document.getElementById('reader-sermon-sub');

  if (!contentArea) return;

  contentArea.classList.toggle('msg-reader-wide', tab === 'parallel' || tab === 'bible');

  if (parSelect) {
    parSelect.style.display = (tab === 'parallel') ? 'inline-block' : 'none';
  }

  if (tab === 'bible') {
    if (subEl) subEl.innerText = `Full KJV Bible Reader & Interlinear Lexicon (Powered by Bolls.life)`;
    renderBollsBibleReader();
    return;
  }

  if (!currentReaderSermon) return;

  if (tab === 'pdf') {
    contentArea.innerHTML = `<iframe src="${currentReaderSermon.pdfUrl}#toolbar=1" style="width:100%; height:82vh; border:none; border-radius:10px;" title="${escapeHtml(currentReaderSermon.title)}"></iframe>`;
    return;
  }

  contentArea.innerHTML = '<div style="text-align:center; padding: 4rem; color: var(--text-secondary);">Loading transcript...</div>';

  /* Dual Parallel View */
  if (tab === 'parallel') {
    const selectedParallelLang = customParallelLang || (parSelect ? parSelect.value : (currentReaderSermon.language === 'en' ? 'ny' : 'en'));
    if (parSelect) parSelect.value = selectedParallelLang;

    try {
      const [resPrimary, resSecondary] = await Promise.all([
        fetch(`/api/messages/${encodeURIComponent(currentReaderSermon.id)}/text?language=${currentReaderSermon.language}`),
        fetch(`/api/messages/${encodeURIComponent(currentReaderSermon.id)}/text?language=${selectedParallelLang}`)
      ]);

      const json1 = resPrimary.ok ? await resPrimary.json() : {};
      const json2 = resSecondary.ok ? await resSecondary.json() : {};
      const paras1 = (json1.data && json1.data.paragraphs) || [];
      const paras2 = (json2.data && json2.data.paragraphs) || [];

      const maxLen = Math.max(paras1.length, paras2.length);
      if (maxLen > 0 || paras1.length > 0) {
        if (subEl) {
          subEl.innerText = `Sermon ID: ${currentReaderSermon.id} • Parallel translation: ${currentReaderSermon.language.toUpperCase()} / ${selectedParallelLang.toUpperCase()} (${paras1.length} paragraphs)`;
        }

        const secColumnHtml = paras2.length > 0 
          ? paras2.map(p => `
              <div class="msg-paragraph-item" id="p_sec_${p.number}">
                <span class="msg-para-num">¶${p.number}</span>
                <div class="msg-para-text">${escapeHtml(p.text)}</div>
              </div>
            `).join('')
          : `
            <div style="padding: 2rem 1.25rem; background-color: var(--kumo-control, var(--bg-secondary)); border: 1px dashed var(--kumo-line, var(--border-default)); border-radius: 8px; text-align: center; color: var(--text-secondary);">
              <p style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--text-primary);">Translation not available</p>
              <p style="font-size: 13px; line-height: 1.6; margin: 0;">The <strong>${selectedParallelLang.toUpperCase()}</strong> text transcript is not available for this sermon.</p>
            </div>
          `;

        let html = `
          <div class="msg-parallel-grid">
            <div class="msg-parallel-col">
              <div class="msg-parallel-col-header">Primary (${currentReaderSermon.language.toUpperCase()})</div>
              ${paras1.map(p => `
                <div class="msg-paragraph-item" id="p${p.number}">
                  <span class="msg-para-num" onclick="toggleHighlight('${currentReaderSermon.id}', ${p.number})">¶${p.number}</span>
                  <div class="msg-para-text">${escapeHtml(p.text)}</div>
                </div>
              `).join('')}
            </div>
            <div class="msg-parallel-col">
              <div class="msg-parallel-col-header">Translation (${selectedParallelLang.toUpperCase()})</div>
              ${secColumnHtml}
            </div>
          </div>
        `;
        contentArea.innerHTML = html;
        return;
      }
    } catch (e) {
      console.warn('Parallel fetch failed:', e);
    }
  }

  /* Single Text View */
  try {
    const res = await fetch(`/api/messages/${encodeURIComponent(currentReaderSermon.id)}/text?language=${currentReaderSermon.language}`);
    if (res.ok) {
      const json = await res.json();
      const item = json.data || {};
      if (item.paragraphs && item.paragraphs.length > 0) {
        const totalWords = item.paragraphs.reduce((sum, p) => sum + (p.text ? p.text.split(/\s+/).length : 0), 0);
        const estMinutes = Math.ceil(totalWords / 200);

        if (subEl) {
          subEl.innerText = `Sermon ID: ${currentReaderSermon.id} • ${currentReaderSermon.date || 'Archive'} • ${currentReaderSermon.language.toUpperCase()} • ~${estMinutes} min read (${item.paragraphs.length} paragraphs)`;
        }

        contentArea.innerHTML = item.paragraphs.map(p => {
          const hlKey = `msg_hl_${currentReaderSermon.id}_${p.number}`;
          const hlClass = localStorage.getItem(hlKey) ? `msg-para-highlighted-${localStorage.getItem(hlKey)}` : '';
          return `
            <div class="msg-paragraph-item ${hlClass}" id="p${p.number}">
              <span class="msg-para-num" style="cursor:pointer;" onclick="toggleHighlight('${currentReaderSermon.id}', ${p.number})" title="Click to highlight paragraph">¶${p.number}</span>
              <div class="msg-para-text">${formatKaraokeSentences(p.number, p.text)}</div>
              <button id="copy-btn-${p.number}" class="msg-copy-para-btn" onclick="copyQuote(${p.number}, '${escapeJs(p.text)}')">Copy</button>
            </div>
          `;
        }).join('');
        return;
      } else if (item.full_text) {
        contentArea.innerHTML = `<div style="white-space: pre-wrap; line-height: 1.95;">${escapeHtml(item.full_text)}</div>`;
        return;
      }
    }
  } catch (e) {
    console.warn('Could not load transcript text:', e);
  }

  contentArea.innerHTML = `
    <div style="text-align:center; padding: 3rem 1rem;">
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">Transcript available in PDF view:</p>
      <button class="msg-btn msg-btn-primary" onclick="switchReaderTab('pdf')">Open PDF document</button>
    </div>
  `;
}

function parseScripturePills(text) {
  if (!text) return '';
  let cleanText = text.replace(/^@@\s*/gm, '');
  let formatted = escapeHtml(cleanText);

  formatted = formatted.replace(/\^\^([^\^]+)\^\^/g, '<em style="color: var(--accent-primary); font-style: normal; font-weight: 600;">$1</em>');

  formatted = formatted.replace(/\[((?:[I|V|X]+|[123]|St\.)?\s*[\w\.\s]+?)\s+(\d+):(\d+)(?:-(\d+))?\]/gi, (match, bookRaw, chap, startVerse, endVerse) => {
    const cleanBook = bookRaw.trim();
    const verseLabel = endVerse ? `${startVerse}-${endVerse}` : startVerse;
    const safeBookEscaped = cleanBook.replace(/'/g, "\\'");
    return `<span class="msg-scripture-ref" onclick="openBibleModal('${safeBookEscaped}', ${chap}, ${startVerse}${endVerse ? `, ${endVerse}` : ''})" title="Click to view scripture text">[${cleanBook} ${chap}:${verseLabel}]</span>`;
  });

  formatted = formatted.replace(/\b((?:St\.\s*)?(?:[123]|I{1,3})?\s*(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation))\s+(\d+):(\d+)(?:-(\d+))?\b/gi, (match, bookRaw, chap, startVerse, endVerse) => {
    const cleanBook = bookRaw.trim();
    const verseLabel = endVerse ? `${startVerse}-${endVerse}` : startVerse;
    const safeBookEscaped = cleanBook.replace(/'/g, "\\'");
    return `<span class="msg-scripture-ref" onclick="openBibleModal('${safeBookEscaped}', ${chap}, ${startVerse}${endVerse ? `, ${endVerse}` : ''})" title="Click to view scripture text">${cleanBook} ${chap}:${verseLabel}</span>`;
  });

  return formatted;
}

function formatKaraokeSentences(pNumber, text) {
  if (!text) return '';
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
  return sentences.map((s, idx) => `
    <span class="msg-sentence" id="s_${pNumber}_${idx}">${parseScripturePills(s)}</span>
  `).join('');
}

const BIBLE_BOOKS = {
  "Genesis": 1, "Gen": 1, "Exodus": 2, "Ex": 2, "Leviticus": 3, "Lev": 3, "Numbers": 4, "Num": 4, "Deuteronomy": 5, "Deut": 5,
  "Joshua": 6, "Josh": 6, "Judges": 7, "Judg": 7, "Ruth": 8, "1 Samuel": 9, "I Samuel": 9, "1Sam": 9, "2 Samuel": 10, "II Samuel": 10, "2Sam": 10,
  "1 Kings": 11, "I Kings": 11, "1Kgs": 11, "2 Kings": 12, "II Kings": 12, "2Kgs": 12, "1 Chronicles": 13, "I Chronicles": 13, "2 Chronicles": 14, "II Chronicles": 14,
  "Ezra": 15, "Nehemiah": 16, "Neh": 16, "Esther": 17, "Job": 18, "Psalms": 19, "Psalm": 19, "Psa": 19, "Ps": 19,
  "Proverbs": 20, "Prov": 20, "Ecclesiastes": 21, "Eccl": 21, "Song of Solomon": 22, "Song": 22, "Isaiah": 23, "Isa": 23,
  "Jeremiah": 24, "Jer": 24, "Lamentations": 25, "Lam": 25, "Ezekiel": 26, "Ezek": 26, "Daniel": 27, "Dan": 27, "Hosea": 28, "Hos": 28,
  "Joel": 29, "Amos": 30, "Obadiah": 31, "Obad": 31, "Jonah": 32, "Micah": 33, "Mic": 33, "Nahum": 34, "Nah": 34,
  "Habakkuk": 35, "Hab": 35, "Zephaniah": 36, "Zeph": 36, "Haggai": 37, "Hag": 37, "Zechariah": 38, "Zech": 38, "Malachi": 39, "Mal": 39,
  "Matthew": 40, "St. Matthew": 40, "St Matthew": 40, "Matt": 40, "Mt": 40,
  "Mark": 41, "St. Mark": 41, "St Mark": 41, "Mk": 41,
  "Luke": 42, "St. Luke": 42, "St Luke": 42, "Lk": 42,
  "John": 43, "St. John": 43, "St John": 43, "Jn": 43,
  "Acts": 44, "Romans": 45, "Rom": 45,
  "1 Corinthians": 46, "I Corinthians": 46, "1Cor": 46, "2 Corinthians": 47, "II Corinthians": 47, "2Cor": 47,
  "Galatians": 48, "Gal": 48, "Ephesians": 49, "Eph": 49, "Philippians": 50, "Phil": 50, "Colossians": 51, "Col": 51,
  "1 Thessalonians": 52, "I Thessalonians": 52, "1Thess": 52, "2 Thessalonians": 53, "II Thessalonians": 53, "2Thess": 53,
  "1 Timothy": 54, "I Timothy": 54, "1Tim": 54, "2 Timothy": 55, "II Timothy": 55, "2Tim": 55,
  "Titus": 56, "Philemon": 57, "Philem": 57, "Hebrews": 58, "Heb": 58,
  "James": 59, "Jas": 59, "1 Peter": 60, "I Peter": 60, "1Pet": 60, "2 Peter": 61, "II Peter": 61, "2Pet": 61,
  "1 John": 62, "I John": 62, "1Jn": 62, "2 John": 63, "II John": 63, "2Jn": 63, "3 John": 64, "III John": 64, "3Jn": 64,
  "Jude": 65, "Revelation": 66, "Rev": 66
};

async function openBibleModal(bookName, chapter, startVerse, endVerse = null) {
  const modal = document.getElementById('bible-modal-backdrop');
  const titleEl = document.getElementById('bible-modal-title');
  const bodyEl = document.getElementById('bible-modal-body');

  if (!modal || !bodyEl) return;

  const normalizedBook = bookName.replace(/^St\.\s*/i, '').trim();
  const bookId = BIBLE_BOOKS[normalizedBook] || BIBLE_BOOKS[bookName] || 1;
  const isNT = bookId >= 40;

  const refTitle = endVerse ? `${bookName} ${chapter}:${startVerse}-${endVerse}` : `${bookName} ${chapter}:${startVerse}`;

  if (titleEl) titleEl.innerText = `📖 ${refTitle} — King James Version (Strong's Concordance)`;
  bodyEl.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--text-secondary);">📖 Fetching KJV Verse & Strong\'s Interlinear...</div>';
  modal.style.display = 'flex';

  try {
    const maxVerse = endVerse ? parseInt(endVerse, 10) : parseInt(startVerse, 10);
    const minVerse = parseInt(startVerse, 10);
    const fetchPromises = [];

    for (let v = minVerse; v <= Math.min(maxVerse, minVerse + 5); v++) {
      fetchPromises.push(
        fetch(`https://bolls.life/get-verse/KJV/${bookId}/${chapter}/${v}/`).then(r => r.ok ? r.json() : null)
      );
    }

    const results = await Promise.all(fetchPromises);
    const validResults = results.filter(Boolean);

    if (validResults.length === 0) throw new Error('No verses returned');

    let versesHtml = validResults.map(data => {
      const vNum = data.verse;
      const rawText = data.text || '';
      const parsedText = rawText.replace(/<S>(\d+)<\/S>/g, (match, number) => {
        const type = isNT ? 'greek' : 'hebrew';
        return ` <span class="msg-strongs-tag" onclick="showStrongsPopover(event, '${number}', ${isNT})" title="Click to view Strong's ${type.toUpperCase()} #${number} Interlinear Card">${isNT ? 'G' : 'H'}${number}</span>`;
      });
      return `<p style="margin-bottom: 0.85rem;"><sup style="font-weight: 700; color: var(--accent-primary); margin-right: 0.35rem;">${vNum}</sup>${parsedText}</p>`;
    }).join('');

    const cleanVerseText = validResults.map(d => `${d.verse}. ${d.text.replace(/<S>\d+<\/S>/g, '')}`).join(' ');
    const copyPayload = `"${cleanVerseText}" — ${refTitle} (KJV)`;

    bodyEl.innerHTML = `
      <div style="font-size: 1.05rem; font-family: serif; line-height: 1.8; color: var(--text-primary);">
        ${versesHtml}
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--kumo-line, var(--border-default));">
        <button class="msg-btn msg-btn-pdf" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;" onclick="navigator.clipboard.writeText('${escapeJs(copyPayload)}'); this.innerText='✓ Copied Verse!'; setTimeout(()=>this.innerText='📋 Copy KJV Verse', 2000)">📋 Copy KJV Verse</button>
        <a href="https://www.blueletterbible.org/search/search.cfm?Criteria=${encodeURIComponent(refTitle)}" target="_blank" rel="noopener" class="msg-btn msg-btn-pdf" style="font-size: 0.85rem; padding: 0.35rem 0.75rem; text-decoration: none;">🔗 Open in Blue Letter Bible</a>
      </div>
    `;
  } catch (err) {
    console.warn('Bolls.life fetch error:', err);
    bodyEl.innerHTML = `
      <div style="text-align:center; padding: 2rem;">
        <p style="color: var(--text-secondary);">Unable to load KJV text for <strong>${escapeHtml(refTitle)}</strong>.</p>
        <a href="https://www.blueletterbible.org/search/search.cfm?Criteria=${encodeURIComponent(refTitle)}" target="_blank" class="msg-btn msg-btn-pdf" style="margin-top: 1rem; display: inline-block;">🔍 Search on Blue Letter Bible</a>
      </div>
    `;
  }
}

let strongsHebrewDict = null;
let strongsGreekDict = null;

async function loadStrongsDictionary(isNT) {
  if (isNT && strongsGreekDict) return strongsGreekDict;
  if (!isNT && strongsHebrewDict) return strongsHebrewDict;

  const url = isNT 
    ? 'https://raw.githubusercontent.com/openscriptures/strongs/master/greek/strongs-greek-dictionary.js'
    : 'https://raw.githubusercontent.com/openscriptures/strongs/master/hebrew/strongs-hebrew-dictionary.js';

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const jsText = await res.text();
    const match = jsText.match(/var (?:strongsHebrewDictionary|strongsGreekDictionary) = (\{[\s\S]+\});/);
    if (match) {
      const data = JSON.parse(match[1]);
      if (isNT) strongsGreekDict = data;
      else strongsHebrewDict = data;
      return data;
    }
  } catch (err) {
    console.warn('Failed to load Strongs dictionary:', err);
  }
  return null;
}

let currentStrongsPopover = null;

function closeStrongsPopover() {
  if (currentStrongsPopover && currentStrongsPopover.parentNode) {
    currentStrongsPopover.parentNode.removeChild(currentStrongsPopover);
    currentStrongsPopover = null;
  }
}

async function showStrongsPopover(evt, number, isNT) {
  if (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  closeStrongsPopover();

  const targetEl = evt ? evt.currentTarget : null;
  if (!targetEl) return;

  const type = isNT ? 'greek' : 'hebrew';
  const prefix = isNT ? 'G' : 'H';
  const paddedNum = `${prefix}${number}`;

  const popover = document.createElement('div');
  popover.className = 'msg-strongs-popover-card';
  popover.id = 'strongs-popover-card';
  popover.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <span style="font-weight: 600; font-size: 0.9rem; color: var(--accent-primary);">Strong's ${type} #${number}</span>
      <button onclick="closeStrongsPopover()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-secondary); line-height: 1;">&times;</button>
    </div>
    <div style="font-size: 0.85rem; color: var(--text-secondary);">Loading lexicon...</div>
  `;

  document.body.appendChild(popover);
  currentStrongsPopover = popover;

  const rect = targetEl.getBoundingClientRect();
  const cardWidth = 340;
  let leftPos = rect.left + window.scrollX;
  if (leftPos + cardWidth > window.innerWidth - 20) {
    leftPos = Math.max(10, window.innerWidth - cardWidth - 20);
  }
  let topPos = rect.bottom + window.scrollY + 8;

  popover.style.left = `${leftPos}px`;
  popover.style.top = `${topPos}px`;

  const dict = await loadStrongsDictionary(isNT);
  const entry = dict ? (dict[paddedNum] || dict[`${prefix}${number.padStart(4, '0')}`]) : null;

  if (entry) {
    const lemma = entry.lemma ? `<span style="font-size: 1.2rem; font-weight: 600; color: var(--accent-primary); margin-right: 0.4rem;">${entry.lemma}</span>` : '';
    const translit = (entry.translit || entry.xlit) ? `<span style="font-style: italic; color: var(--text-secondary); font-size: 0.9rem;">(${entry.translit || entry.xlit})</span>` : '';
    const pron = entry.pron ? `<span style="font-size: 0.8rem; background: var(--kumo-control, var(--bg-secondary)); padding: 0.1rem 0.35rem; border-radius: 4px;">${entry.pron}</span>` : '';
    const strongsDef = entry.strongs_def ? `<div style="margin-top: 0.5rem; font-size: 0.875rem;"><strong>Definition:</strong> ${entry.strongs_def}</div>` : '';
    const kjvDef = entry.kjv_def ? `<div style="margin-top: 0.4rem; font-size: 0.825rem; color: var(--text-secondary);"><strong>KJV:</strong> ${entry.kjv_def}</div>` : '';

    popover.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem; border-bottom: 1px solid var(--kumo-hairline, var(--border-subtle)); padding-bottom: 0.4rem;">
        <div>
          <span style="font-weight: 600; font-size: 0.85rem; color: var(--accent-primary);">Strong's ${type} #${number}</span>
          <div style="margin-top: 0.15rem;">${lemma} ${translit} ${pron}</div>
        </div>
        <button onclick="closeStrongsPopover()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-secondary); line-height: 1; padding: 0 0 0 0.5rem;">&times;</button>
      </div>
      ${strongsDef}
      ${kjvDef}
    `;
  } else {
    popover.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 600; color: var(--accent-primary);">Strong's ${type} #${number}</span>
        <button onclick="closeStrongsPopover()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-secondary);">&times;</button>
      </div>
      <p style="font-size: 0.85rem; margin: 0.4rem 0;">Definition lookup available on Blue Letter Bible.</p>
      <a href="https://www.blueletterbible.org/lexicon/${type === 'hebrew' ? 'h' : 'g'}${number}/kjv/wlc/1-1/" target="_blank" class="msg-btn" style="font-size: 0.8rem; padding: 0.25rem 0.6rem; display: inline-block;">Blue Letter Bible Lexicon →</a>
    `;
  }
}

document.addEventListener('click', (e) => {
  if (currentStrongsPopover && !currentStrongsPopover.contains(e.target) && !e.target.classList.contains('msg-strongs-tag')) {
    closeStrongsPopover();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStrongsPopover();
    closeBibleModal();
    const readerSection = document.getElementById('full-reader-section');
    if (readerSection && readerSection.style.display !== 'none') {
      closeFullReader();
    }
  }
});

function openStandaloneBibleReader() {
  if (!allSermons || allSermons.length === 0) return;
  const sampleSermon = allSermons[0];
  openFullReader(sampleSermon.title, sampleSermon.id, sampleSermon.date || '', sampleSermon.pdf_url, 'en', 'bible');
}

function renderBollsBibleReader() {
  const contentArea = document.getElementById('reader-content-area');
  if (!contentArea) return;

  const bookOptions = Object.keys(BIBLE_BOOKS).filter(k => !/\d+Sam|\d+Kgs|\d+Cor|\d+Thess|\d+Tim|\d+Pet|\d+Jn|St\b|Ps\b|Gen\b|Ex\b|Lev\b|Num\b|Deut\b|Josh\b|Judg\b|Neh\b|Prov\b|Eccl\b|Song\b|Isa\b|Jer\b|Lam\b|Ezek\b|Dan\b|Hos\b|Obad\b|Mic\b|Nah\b|Hab\b|Zeph\b|Hag\b|Zech\b|Mal\b|Matt\b|Mt\b|Mk\b|Lk\b|Jn\b|Rom\b|Gal\b|Eph\b|Phil\b|Col\b|Philem\b|Heb\b|Jas\b|Rev\b/.test(k))
    .map(b => `<option value="${b}">${b}</option>`).join('');

  contentArea.innerHTML = `
    <div style="max-width: 860px; margin: 0 auto; padding: 1rem 0;">
      <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap; background: var(--kumo-control, var(--bg-secondary)); padding: 0.85rem 1.25rem; border-radius: 8px; border: 1px solid var(--kumo-hairline, var(--border-subtle)); margin-bottom: 2rem;">
        <label style="font-weight: 600; font-size: 13px; color: var(--text-primary);">Book:</label>
        <select id="standalone-book-select" class="msg-select-box" style="height: 34px; font-size: 13px;" onchange="loadBollsBibleChapter()">
          ${bookOptions}
        </select>
        <label style="font-weight: 600; font-size: 13px; color: var(--text-primary);">Chapter:</label>
        <input type="number" id="standalone-chapter-input" class="msg-input-box" style="height: 34px; width: 70px; text-align: center;" value="1" min="1" max="150" onchange="loadBollsBibleChapter()">
        <button class="msg-btn msg-btn-primary" style="height: 34px; padding: 0 1rem;" onclick="loadBollsBibleChapter()">Load chapter</button>
      </div>

      <div id="standalone-bible-text-area" style="font-size: 1.15rem; font-family: Georgia, serif; line-height: 1.85; color: var(--text-primary);">
        Loading Genesis chapter 1...
      </div>
    </div>
  `;

  loadBollsBibleChapter();
}

async function loadBollsBibleChapter() {
  const bookSelect = document.getElementById('standalone-book-select');
  const chapInput = document.getElementById('standalone-chapter-input');
  const textArea = document.getElementById('standalone-bible-text-area');

  if (!bookSelect || !chapInput || !textArea) return;

  const bookName = bookSelect.value || 'Genesis';
  const chapter = parseInt(chapInput.value, 10) || 1;
  const bookId = BIBLE_BOOKS[bookName] || 1;
  const isNT = bookId >= 40;

  textArea.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--text-secondary);">Loading ${bookName} chapter ${chapter}...</div>`;

  try {
    const res = await fetch(`https://bolls.life/get-text/KJV/${bookId}/${chapter}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const verses = await res.json();
    if (!verses || verses.length === 0) throw new Error('No verses returned');

    let html = verses.map(v => {
      const vNum = v.verse;
      const rawText = v.text || '';
      const parsedText = rawText.replace(/<S>(\d+)<\/S>/g, (match, number) => {
        const type = isNT ? 'greek' : 'hebrew';
        return ` <span class="msg-strongs-tag" onclick="showStrongsPopover(event, '${number}', ${isNT})" title="Strong's ${type} #${number}">${isNT ? 'G' : 'H'}${number}</span>`;
      });
      return `
        <div style="margin-bottom: 1rem; display: flex; gap: 0.75rem; align-items: baseline;">
          <span style="font-family: var(--mono-family, monospace); font-size: 0.85rem; font-weight: 600; color: var(--accent-primary); background: var(--kumo-control, var(--bg-secondary)); padding: 0.15rem 0.45rem; border-radius: 4px;">v${vNum}</span>
          <div style="flex: 1;">${parsedText}</div>
        </div>
      `;
    }).join('');

    textArea.innerHTML = `
      <div style="border-bottom: 1px solid var(--kumo-line); padding-bottom: 0.75rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <h2 style="margin: 0; font-size: 1.3rem; font-weight: 600; color: var(--text-primary);">${bookName} ${chapter}</h2>
        <span style="font-size: 12px; color: var(--text-secondary);">King James Version • Strong's Lexicon</span>
      </div>
      <div>${html}</div>
    `;
  } catch (err) {
    console.warn('Bolls.life chapter fetch error:', err);
    textArea.innerHTML = `
      <div style="text-align:center; padding: 3rem;">
        <p style="color: var(--text-secondary);">Unable to load text for <strong>${escapeHtml(bookName)} ${chapter}</strong>.</p>
      </div>
    `;
  }
}

function closeBibleModal() {
  const modal = document.getElementById('bible-modal-backdrop');
  if (modal) modal.style.display = 'none';
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeJs(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const readId = urlParams.get('read');
  if (!readId) {
    closeFullReader();
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  await loadSermonsData();
  const urlParams = new URLSearchParams(window.location.search);
  const readId = urlParams.get('read');
  const readLang = urlParams.get('lang') || 'en';
  if (readId && allSermons && allSermons.length > 0) {
    const found = allSermons.find(s => s.id === readId);
    if (found) {
      openFullReader(found.title, found.id, found.date || found.year || '', found.pdf_url, readLang, 'text');
    }
  }
});
</script>
