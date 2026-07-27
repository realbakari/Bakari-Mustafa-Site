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
/* Seamless Theme Integration for The Message Library & Full Viewport Breakout */
.msg-library-wrapper {
  margin-top: 1rem;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
  max-width: 100vw;
  padding-left: clamp(1rem, 5vw, 4rem);
  padding-right: clamp(1rem, 5vw, 4rem);
  box-sizing: border-box;
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

/* Full Immersion Seamless Sermon Reader View */
.msg-full-reader {
  background-color: transparent;
  border: none;
  box-shadow: none;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  min-height: 85vh;
  width: 100%;
}

.msg-reader-toolbar {
  padding: 0.65rem 1rem;
  background-color: var(--bg-secondary, #f8fafc);
  border: 1px solid var(--border-default, #e2e8f0);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0.75rem;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.msg-reader-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 36px;
  padding: 0 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-default, #cbd5e1);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none !important;
  box-sizing: border-box;
}

.msg-reader-btn:hover {
  border-color: var(--accent-primary, #2563eb);
  color: var(--accent-primary, #2563eb);
}

.msg-reader-btn.active {
  background-color: var(--accent-primary, #2563eb);
  color: #ffffff !important;
  border-color: var(--accent-primary, #2563eb);
}

.msg-reader-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: var(--border-default, #cbd5e1);
  color: var(--text-secondary);
}

.msg-reader-meta-title {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.msg-reader-meta-sub {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.35rem;
}

.msg-reader-controls-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Reading Canvas Themes: Light / Sepia / Dark */
.msg-reader-main-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem 2rem 6rem;
  font-size: 1.3rem;
  line-height: 1.95;
  color: var(--text-primary);
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  box-sizing: border-box;
  border-radius: 14px;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.msg-reader-main-content.msg-reader-wide {
  max-width: 100% !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.msg-reader-main-content.msg-theme-sepia {
  background-color: #fbf0d9 !important;
  color: #432818 !important;
}

.msg-reader-main-content.msg-theme-dark {
  background-color: #0f172a !important;
  color: #e2e8f0 !important;
}

.msg-reader-main-content.msg-theme-sepia .msg-para-num {
  background-color: #f4e3c1 !important;
  color: #854d0e !important;
}

.msg-reader-main-content.msg-theme-dark .msg-para-num {
  background-color: #1e293b !important;
  color: #38bdf8 !important;
}

.msg-reader-main-content.msg-theme-sepia .msg-paragraph-item:hover {
  background-color: rgba(67, 40, 24, 0.05) !important;
}

.msg-reader-main-content.msg-theme-dark .msg-paragraph-item:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

/* Reading Progress Bar */
.msg-reading-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background-color: var(--accent-primary, #2563eb);
  width: 0%;
  transition: width 0.1s ease;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* Responsive Mobile Audio Dock Player */
.msg-audio-dock {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-primary, #ffffff);
  border-top: 1px solid var(--border-default, #e2e8f0);
  padding: 0.75rem 1.5rem;
  z-index: 10000;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  backdrop-filter: blur(12px);
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
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary);
}

.msg-audio-sub {
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.msg-audio-element {
  max-width: 420px;
  width: 100%;
  height: 38px;
  border-radius: 8px;
}

.msg-audio-close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.4rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
}

@media (max-width: 768px) {
  .msg-audio-dock {
    flex-direction: column;
    align-items: stretch;
    padding: 0.6rem 0.85rem 0.85rem;
    gap: 0.5rem;
    box-shadow: 0 -6px 30px rgba(0, 0, 0, 0.2);
  }

  .msg-audio-meta {
    justify-content: space-between;
    width: 100%;
  }

  .msg-audio-title {
    font-size: 0.9rem;
    max-width: 220px;
  }

  .msg-audio-element {
    max-width: 100%;
    width: 100%;
    height: 42px; /* Touch-friendly mobile target size */
  }
}

/* Clickable Bible Reference Pill */
.msg-scripture-ref {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.15rem 0.45rem;
  background-color: var(--bg-secondary, rgba(37, 99, 235, 0.08));
  border: 1px solid var(--accent-primary, #2563eb);
  color: var(--accent-primary, #2563eb);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  text-decoration: none;
}

.msg-scripture-ref:hover {
  background-color: var(--accent-primary, #2563eb);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  transform: translateY(-1px);
}

/* Bible & Strong's Concordance Study Modal */
.msg-bible-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.msg-bible-dialog {
  background-color: var(--bg-primary, #ffffff);
  border: 1px solid var(--border-default, #cbd5e1);
  border-radius: 16px;
  max-width: 650px;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.msg-bible-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.5rem;
  border-bottom: 1px solid var(--border-default, #e2e8f0);
  background-color: var(--bg-secondary, #f8fafc);
}

.msg-bible-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.msg-bible-body {
  padding: 1.5rem;
  overflow-y: auto;
  font-size: 1rem;
  line-height: 1.7;
}

.msg-strongs-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-primary, #2563eb);
  background: var(--bg-secondary, rgba(37, 99, 235, 0.1));
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  margin-left: 0.2rem;
  cursor: pointer;
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.msg-strongs-tag:hover {
  background: var(--accent-primary, #2563eb);
  color: #ffffff;
}

.msg-strongs-def-box {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background-color: var(--bg-secondary, #f1f5f9);
  border-left: 4px solid var(--accent-primary, #2563eb);
  border-radius: 8px;
  font-size: 0.9rem;
}

.msg-strongs-popover-card {
  position: absolute;
  z-index: 100000;
  width: 330px;
  max-width: 90vw;
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary, #0f172a);
  border: 1.5px solid var(--accent-primary, #2563eb);
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  font-family: inherit;
  font-size: 0.925rem;
  line-height: 1.6;
  animation: popoverFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popoverFadeIn {
  from { opacity: 0; transform: translateY(6px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Parallel Dual Column Split View */
.msg-parallel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
}

.msg-parallel-col {
  min-width: 0;
}

.msg-parallel-col-header {
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--bg-secondary, rgba(0,0,0,0.04));
  border-radius: 6px;
/* Live Audio Active Reading Karaoke Highlight & Badge */
.msg-paragraph-item.msg-para-active-reading {
  background-color: var(--bg-secondary, rgba(37, 99, 235, 0.12)) !important;
  border-left: 5px solid var(--accent-primary, #2563eb) !important;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.15);
  transition: all 0.25s ease;
}

.msg-para-active-reading .msg-para-text {
  font-weight: 500;
}

/* Live Karaoke Sentence-by-Sentence & Laser Line Reader */
.msg-sentence {
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  padding: 0.1rem 0.25rem;
  border-radius: 4px;
  position: relative;
  display: inline;
}

.msg-sentence.active-sentence {
  background-color: rgba(253, 224, 71, 0.65) !important;
  color: #0f172a !important;
  font-weight: 600;
  border-bottom: 2px solid var(--accent-primary, #2563eb);
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.25);
}

.msg-reader-main-content.msg-theme-dark .msg-sentence.active-sentence {
  background-color: rgba(14, 165, 233, 0.4) !important;
  color: #ffffff !important;
  border-bottom: 2px solid #38bdf8;
}

.msg-reader-main-content.msg-theme-sepia .msg-sentence.active-sentence {
  background-color: rgba(234, 179, 8, 0.4) !important;
  color: #432818 !important;
  border-bottom: 2px solid #854d0e;
}

.msg-karaoke-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.725rem;
  font-weight: 800;
  color: #ffffff;
  background-color: var(--accent-primary, #2563eb);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  animation: karaokePulse 1.5s infinite alternate;
  user-select: none;
  height: fit-content;
}

@keyframes karaokePulse {
  0% { transform: scale(1); opacity: 0.95; }
  100% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 10px rgba(37, 99, 235, 0.5); }
}

/* Fullscreen Focus Mode Scrollability */
#full-reader-section:fullscreen {
  overflow-y: auto !important;
  background-color: var(--bg-primary, #ffffff);
  padding: 1.5rem 2rem 5rem;
  box-sizing: border-box;
}

#full-reader-section:fullscreen .msg-reader-toolbar {
  top: 0;
  border-radius: 0;
  border-left: none;
  border-right: none;
}

/* Paragraph Highlight Persistence States */
.msg-paragraph-item.msg-para-highlighted-yellow {
  background-color: rgba(254, 240, 138, 0.45) !important;
  border-left: 3px solid #eab308;
}

.msg-paragraph-item.msg-para-highlighted-green {
  background-color: rgba(187, 247, 208, 0.45) !important;
  border-left: 3px solid #22c55e;
}

.msg-paragraph-item.msg-para-highlighted-blue {
  background-color: rgba(191, 219, 254, 0.45) !important;
  border-left: 3px solid #3b82f6;
}

.msg-paragraph-item:hover .msg-copy-para-btn {
  opacity: 1;
}

.msg-paragraph-item {
  margin-bottom: 1.75rem;
  display: flex;
  gap: 1.15rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: background-color 0.15s ease;
}

.msg-paragraph-item:hover {
  background-color: var(--bg-secondary, rgba(0, 0, 0, 0.03));
}

.msg-para-num {
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent-primary, #2563eb);
  background-color: var(--bg-secondary, rgba(0, 0, 0, 0.06));
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  height: fit-content;
  user-select: none;
}

.msg-para-text {
  flex: 1;
  font-size: 1.25rem;
  line-height: 1.95;
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

  <!-- Full Immersion Sermon Reader View (Hidden by default) -->
  <div id="full-reader-section" class="msg-full-reader" style="display: none;">
    <!-- Fixed Floating Quick-Close Button for Instant Exit at Any Scroll Position -->
    <button id="fixed-reader-close-btn" onclick="closeFullReader()" title="Exit reader & return to library" style="position: fixed; top: 18px; right: 20px; z-index: 100001; background: var(--accent-primary, #2563eb); color: #ffffff; border: none; box-shadow: 0 4px 14px rgba(0,0,0,0.3); font-weight: 700; padding: 0.5rem 1rem; border-radius: 999px; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
      ✕ Close Reader
    </button>

    <div class="msg-reader-toolbar" style="position: relative;">
      <div id="reading-progress-bar" class="msg-reading-progress"></div>

      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <button class="msg-reader-btn" onclick="closeFullReader()">← Library</button>

        <div style="display: flex; gap: 0.25rem;">
          <button class="msg-reader-btn" id="reader-prev-btn" onclick="navigateSermon(-1)">← Prev</button>
          <button class="msg-reader-btn" id="reader-next-btn" onclick="navigateSermon(1)">Next →</button>
        </div>

        <select id="reader-sermon-select" class="msg-select-box" style="height: 36px; max-width: 250px; padding: 0 0.65rem; font-size: 0.85rem; border-radius: 8px;" onchange="onReaderSermonSelect(this.value)">
          <!-- Loaded dynamically -->
        </select>
      </div>

      <div class="msg-reader-controls-right">
        <button id="reader-audio-btn" class="msg-reader-btn" onclick="toggleReaderAudio()">🎧 Play Audio</button>
        <input type="text" id="reader-search-input" class="msg-input-box" style="height: 36px; width: 150px; padding: 0 0.65rem; font-size: 0.85rem; border-radius: 8px;" placeholder="🔍 Find in text..." oninput="searchInTranscript(this.value)">

        <select id="reader-theme-select" class="msg-select-box" style="height: 36px; padding: 0 0.55rem; font-size: 0.85rem; border-radius: 8px;" onchange="setReaderTheme(this.value)">
          <option value="light">☀️ Light</option>
          <option value="sepia">📜 Sepia</option>
          <option value="dark">🌙 Dark</option>
        </select>

        <div style="display: flex; gap: 0.25rem; align-items: center;">
          <button id="tab-btn-text" class="msg-reader-btn active" onclick="switchReaderTab('text')">📖 Single Text</button>
          <button id="tab-btn-parallel" class="msg-reader-btn" onclick="switchReaderTab('parallel')">🌐 Parallel Dual</button>
          <select id="parallel-lang-select" class="msg-select-box" style="display: none; height: 36px; padding: 0 0.55rem; font-size: 0.85rem; border-radius: 8px; border-color: var(--accent-primary);" onchange="updateParallelLanguage(this.value)">
            <!-- Populated dynamically with all 72 languages -->
          </select>
          <button id="tab-btn-bible" class="msg-reader-btn" onclick="switchReaderTab('bible')">📜 KJV Bible (Bolls.life)</button>
          <button id="tab-btn-pdf" class="msg-reader-btn" onclick="switchReaderTab('pdf')">📄 PDF View</button>
        </div>

        <div style="display: flex; gap: 0.25rem;">
          <button class="msg-reader-btn" style="padding: 0 0.5rem;" onclick="adjustFontSize(-1)" title="Smaller font">A-</button>
          <button class="msg-reader-btn" style="padding: 0 0.5rem;" onclick="adjustFontSize(1)" title="Larger font">A+</button>
        </div>

        <button class="msg-reader-btn" onclick="toggleFocusMode()" title="Toggle full-screen focus reading mode">📺 Focus Mode</button>
        <a id="reader-download-btn" href="#" target="_blank" class="msg-reader-btn">⬇ PDF</a>
      </div>
    </div>

    <div style="padding: 2rem 1.5rem 0.5rem; max-width: 1050px; margin: 0 auto;">
      <h2 class="msg-reader-meta-title" id="reader-sermon-title">Sermon Title</h2>
      <div class="msg-reader-meta-sub" id="reader-sermon-sub">ID • Date • Language</div>
    </div>

    <main class="msg-reader-main-content" id="reader-content-area">
      <!-- Full paragraph transcript / embedded document view -->
    </main>
  </div>

  <!-- Library Catalogue Section -->
  <div id="catalogue-section">
    <!-- Site Layout Page Header -->
    <div class="page-header msg-header">
      <p class="page-kicker">Digital Library & Archives</p>
      <h1>The Message</h1>
      <p class="page-subtitle">Audio recordings, PDF transcripts, and multi-lingual catalogues of William Marrion Branham's sermons across 72+ global languages.</p>

      <div class="msg-stats-bar">
        <span class="msg-stat-chip">📖 Sermons: <strong id="stat-total">1,200+</strong></span>
        <span class="msg-stat-chip" style="cursor: pointer; border-color: var(--accent-primary); color: var(--accent-primary); font-weight: 700;" onclick="playLwbRadio('gospel_music')" title="Listen to 24/7 Sermon Broadcast">📻 24/7 Broadcast</span>
        <span class="msg-stat-chip" style="cursor: pointer; border-color: var(--accent-primary); font-weight: 700;" onclick="openStandaloneBibleReader()" title="Open Standalone Bolls.life KJV Bible Reader">📜 KJV Bible Reader</span>
        <a href="https://www.lwbcast.org/OtherTabs/Music.php" target="_blank" rel="noopener" class="msg-stat-chip" style="text-decoration: none;" title="Visit Living Word Broadcast web player page">🔗 LWB Site</a>
        <span class="msg-stat-chip">⚡ Public REST API</span>
      </div>
    </div>

    <!-- Filters & Controls (Primary Top Section) -->
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

    <!-- Sermons Grid / Table Area -->
    <main class="msg-grid" id="sermons-container">
      <!-- Loaded dynamically -->
    </main>

    <!-- Pagination Controls -->
    <div id="pagination-controls" class="msg-pagination-bar" style="display: none;">
      <button id="btn-prev-page" class="msg-btn" onclick="changePage(-1)">← Previous</button>
      <span id="page-info-text" class="msg-page-info">Page 1 of 1</span>
      <button id="btn-next-page" class="msg-btn" onclick="changePage(1)">Next →</button>
    </div>

    <!-- Bottom Analytics & Region Map Section -->
    <div class="msg-stats-dashboard" style="margin-top: 3rem;">
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
          <div class="msg-region-langs">🇲🇼 Chichewa (ny), 🇰🇪 Kiswahili (sw), 🇿🇦 Afrikaans (af), 🇳🇬 Igbo (ig), 🇳🇬 Yoruba (yo), 🇨🇩 Lingala (ln)...</div>
        </div>

        <div class="msg-region-card" onclick="filterByRegion('americas')">
          <div class="msg-region-header">
            <span class="msg-region-name">🌎 Americas</span>
            <span class="msg-region-badge">8 Languages</span>
          </div>
          <div class="msg-region-langs">🇺🇸 English (en), 🇲🇽 Español (es), 🇧🇷 Português (pt), 🇭🇹 Kreyòl Ayisyen (ht)...</div>
        </div>

        <div class="msg-region-card" onclick="filterByRegion('europe')">
          <div class="msg-region-header">
            <span class="msg-region-name">🌍 Europe</span>
            <span class="msg-region-badge">24 Languages</span>
          </div>
          <div class="msg-region-langs">🇫🇷 Français (fr), 🇩🇪 Deutsch (de), 🇮🇹 Italiano (it), 🇷🇴 Română (ro), 🇷🇺 Русский (ru)...</div>
        </div>

        <div class="msg-region-card" onclick="filterByRegion('asia')">
          <div class="msg-region-header">
            <span class="msg-region-name">🌏 Asia & Pacific</span>
            <span class="msg-region-badge">22 Languages</span>
          </div>
          <div class="msg-region-langs">🇵🇭 Tagalog (tl), 🇮🇩 Bahasa Indonesia (id), 🇮🇳 Hindi (hi), 🇮🇳 Tamil (ta), 🇨🇳 Chinese...</div>
        </div>
      </div>
    </section>

    <!-- REST API Details Section -->
    <section class="msg-api-box">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
        <h3 style="margin: 0;">⚡ Public JSON REST API & Developer Docs</h3>
        <a href="{{ '/api-docs/' | relative_url }}" class="msg-btn msg-btn-text" style="padding: 0.45rem 0.95rem; font-weight: 700;">🚀 Open Interactive API Explorer & Full Docs →</a>
      </div>
      <p>Developers can fetch structured sermon metadata, full paragraph transcripts, PDF links, and audio stream URLs directly via REST API:</p>
      <ul>
        <li><code>GET /api/messages?language=ny</code> — List Chichewa sermons</li>
        <li><code>GET /api/messages/65-0718M/text</code> — Get sermon transcript & paragraphs</li>
        <li><code>GET /api/search?q=seven+seals</code> — Full-text search</li>
      </ul>
    </section>
  </div>

  <!-- KJV Scripture & Strong's Concordance Study Modal -->
  <div id="bible-modal-backdrop" class="msg-bible-backdrop" style="display: none;" onclick="if(event.target === this) closeBibleModal()">
    <div class="msg-bible-dialog">
      <header class="msg-bible-header">
        <h3 id="bible-modal-title" class="msg-bible-title">📖 Genesis 1:1 — King James Version</h3>
        <button onclick="closeBibleModal()" class="msg-audio-close-btn" title="Close Bible modal">✕</button>
      </header>
      <main id="bible-modal-body" class="msg-bible-body">
        <div>Loading scripture verse & Strong's Concordance lexicon...</div>
      </main>
    </div>
  </div>

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

  <!-- Persistent Mobile-Responsive Audio Dock Player Bar -->
  <div id="audio-player-bar" class="msg-audio-dock" style="display: none;">
    <div class="msg-audio-meta">
      <div style="display: flex; align-items: center; gap: 0.6rem; min-width: 0;">
        <span style="font-size: 1.25rem;">🎧</span>
        <div style="min-width: 0;">
          <div id="player-sermon-title" class="msg-audio-title">Sermon Title</div>
          <div id="player-sermon-sub" class="msg-audio-sub">Sermon ID • Language</div>
        </div>
      </div>
      <button onclick="closePlayer()" class="msg-audio-close-btn" title="Close audio player">✕</button>
    </div>
    <audio id="audio-element" controls class="msg-audio-element"></audio>
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
    /* Try static file first for instant zero-latency loading */
    try {
      const staticRes = await fetch('{{ "/_data/languages.json" | relative_url }}');
      if (staticRes.ok) languages = await staticRes.json();
    } catch (e) {}

    /* Try API endpoint if static data was empty */
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
      
      const langsStat = document.getElementById('stat-langs');
      if (langsStat) langsStat.innerText = `${languages.length}`;
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
    } catch (e) {
      /* API route un-routed locally */
    }

    if (stats) {
      const totalCount = stats.total_sermons || allSermons.length || 577;
      const audioCount = stats.sermons_with_audio || totalCount;
      const pdfCount = stats.sermons_with_pdf || totalCount;
      const textCount = stats.sermons_with_text || totalCount;
      const langCount = stats.available_languages || stats.total_languages || 72;

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
    /* Try static json data first for instant loading */
    try {
      const staticRes = await fetch('{{ "/_data/sermons.json" | relative_url }}');
      if (staticRes.ok) allSermons = await staticRes.json();
    } catch (e) {}

    /* Try API endpoint if static data empty */
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

  /* Update stats from API or dataset */
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
              <th style="text-align: right;">Available Formats</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.map(s => {
              const langCode = (s.language || 'en').toUpperCase();
              const textBtn = (s.pdf_url || s.pdf_text || (s.paragraphs && s.paragraphs.length > 0))
                ? `<button class="msg-btn msg-btn-text" style="padding: 0.25rem 0.5rem;" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'text')">📖 Text</button>`
                : '';
              const pdfBtn = s.pdf_url 
                ? `<button class="msg-btn msg-btn-pdf" style="padding: 0.25rem 0.5rem;" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'pdf')">📄 PDF</button>`
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
      ? `<button class="msg-btn msg-btn-text" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'text')">📖 Text</button>`
      : `<span class="msg-btn msg-btn-text msg-btn-disabled">📖 Text</span>`;

    const pdfBtn = s.pdf_url 
      ? `<button class="msg-btn msg-btn-pdf" onclick="openFullReader('${escapeJs(s.title)}', '${s.id}', '${s.date || s.year || ''}', '${s.pdf_url}', '${s.language}', 'pdf')">📄 PDF</button>`
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

  /* Force HTTPS to avoid mixed content blocking */
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
      console.log('Audio playback waiting for user click:', e);
    });
  }

  /* Live Audio Karaoke Paragraph & Sentence-by-Sentence Laser Reader */
  audioEl.ontimeupdate = function() {
    if (!audioEl.duration || audioEl.paused) return;
    const progress = audioEl.currentTime / audioEl.duration;
    const paraItems = Array.from(document.querySelectorAll('#reader-content-area .msg-paragraph-item'));
    if (paraItems.length === 0) return;

    /* Calculate weighted character offset across all paragraphs for speech timing */
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
          badge.innerHTML = '🎙️ READING NOW';
          numEl.after(badge);
        }

        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      /* Highlight active sentence inside active paragraph */
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
let currentReaderFontSize = 1.125;

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
      item.style.backgroundColor = 'var(--bg-secondary, rgba(37, 99, 235, 0.1))';
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
    alert('Audio stream recording is not available for this sermon.');
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

function adjustFontSize(delta) {
  currentReaderFontSize = Math.max(0.9, Math.min(1.6, currentReaderFontSize + (delta * 0.1)));
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

  /* Hide main site header nav while reading for distraction-free immersion */
  const siteHeader = document.querySelector('.site-header, header.site-header, header');
  if (siteHeader) siteHeader.style.display = 'none';

  currentReaderSermon = { title, id, date, pdfUrl, language };

  if (titleEl) titleEl.innerText = title;
  if (subEl) subEl.innerText = `Sermon ID: ${id} • Date: ${date || 'Catalogue Archive'} • Language: ${language.toUpperCase()}`;
  if (downloadBtn) downloadBtn.href = pdfUrl || '#';
  if (searchInput) searchInput.value = '';

  /* Sync audio button state safely */
  const audioEl = document.getElementById('audio-element');
  if (audioBtn) {
    if (audioEl && audioEl.src && !audioEl.paused) {
      audioBtn.innerText = '⏸ Pause Audio';
    } else {
      audioBtn.innerText = '🎧 Play Audio';
    }
  }

  populateReaderSermonSelect(id);

  /* Enable/disable prev/next buttons based on position */
  const currentIndex = allSermons ? allSermons.findIndex(s => s.id === id) : -1;
  const btnPrev = document.getElementById('reader-prev-btn');
  const btnNext = document.getElementById('reader-next-btn');
  if (btnPrev) btnPrev.disabled = (currentIndex <= 0);
  if (btnNext) btnNext.disabled = (currentIndex === -1 || currentIndex >= allSermons.length - 1);

  if (catalogueSection) catalogueSection.style.display = 'none';
  if (readerSection) readerSection.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* Update browser URL query parameter for deep-linking */
  const newUrl = `${window.location.pathname}?read=${encodeURIComponent(id)}&lang=${encodeURIComponent(language)}`;
  window.history.pushState({ sermonId: id }, '', newUrl);

  switchReaderTab(defaultTab);
}

function closeFullReader() {
  const catalogueSection = document.getElementById('catalogue-section');
  const readerSection = document.getElementById('full-reader-section');
  const contentArea = document.getElementById('reader-content-area');

  /* Restore site header nav */
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
      btn.innerText = '✓ Copied!';
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

async function switchReaderTab(tab, customParallelLang = null) {
  const btnText = document.getElementById('tab-btn-text');
  const btnParallel = document.getElementById('tab-btn-parallel');
  const btnBible = document.getElementById('tab-btn-bible');
  const parSelect = document.getElementById('parallel-lang-select');
  const btnPdf = document.getElementById('tab-btn-pdf');
  const contentArea = document.getElementById('reader-content-area');
  const subEl = document.getElementById('reader-sermon-sub');

  if (!contentArea) return;

  if (btnText) btnText.classList.toggle('active', tab === 'text');
  if (btnParallel) btnParallel.classList.toggle('active', tab === 'parallel');
  if (btnBible) btnBible.classList.toggle('active', tab === 'bible');
  if (btnPdf) btnPdf.classList.toggle('active', tab === 'pdf');

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

  contentArea.innerHTML = '<div style="text-align:center; padding: 4rem; color: var(--text-secondary);">📖 Loading transcript text...</div>';

  /* Dual Parallel View Handler */
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
          subEl.innerText = `Sermon ID: ${currentReaderSermon.id} • Parallel Dual Reader: ${currentReaderSermon.language.toUpperCase()} ↔ ${selectedParallelLang.toUpperCase()} (${paras1.length} Paragraphs)`;
        }

        const secColumnHtml = paras2.length > 0 
          ? paras2.map(p => `
              <div class="msg-paragraph-item" id="p_sec_${p.number}">
                <span class="msg-para-num">¶${p.number}</span>
                <div class="msg-para-text">${escapeHtml(p.text)}</div>
              </div>
            `).join('')
          : `
            <div style="padding: 2.5rem 1.5rem; background-color: var(--bg-secondary, rgba(0,0,0,0.03)); border: 1px dashed var(--border-default, #cbd5e1); border-radius: 12px; text-align: center; color: var(--text-secondary);">
              <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">ℹ️ Translation Not Available Yet</p>
              <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">The <strong>${selectedParallelLang.toUpperCase()}</strong> text transcript is not available for this specific sermon. Please select another language from the dropdown above (e.g. 🇬🇧 EN, 🇫🇷 FR, 🇲🇽 ES, 🇩🇪 DE).</p>
            </div>
          `;

        let html = `
          <div class="msg-parallel-grid">
            <div class="msg-parallel-col">
              <div class="msg-parallel-col-header">Primary Transcript (${currentReaderSermon.language.toUpperCase()})</div>
              ${paras1.map(p => `
                <div class="msg-paragraph-item" id="p${p.number}">
                  <span class="msg-para-num" onclick="toggleHighlight('${currentReaderSermon.id}', ${p.number})">¶${p.number}</span>
                  <div class="msg-para-text">${escapeHtml(p.text)}</div>
                </div>
              `).join('')}
            </div>
            <div class="msg-parallel-col">
              <div class="msg-parallel-col-header">Parallel Translation (${selectedParallelLang.toUpperCase()})</div>
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

  try {
    const res = await fetch(`/api/messages/${encodeURIComponent(currentReaderSermon.id)}/text?language=${currentReaderSermon.language}`);
    if (res.ok) {
      const json = await res.json();
      const item = json.data || {};
      if (item.paragraphs && item.paragraphs.length > 0) {
        /* Compute word count and estimated reading time */
        const totalWords = item.paragraphs.reduce((sum, p) => sum + (p.text ? p.text.split(/\s+/).length : 0), 0);
        const estMinutes = Math.ceil(totalWords / 200);

        if (subEl) {
          subEl.innerText = `Sermon ID: ${currentReaderSermon.id} • Date: ${currentReaderSermon.date || 'Catalogue Archive'} • Language: ${currentReaderSermon.language.toUpperCase()} • ⏱ ~${estMinutes} min read (${item.paragraphs.length} Paragraphs)`;
        }

        contentArea.innerHTML = item.paragraphs.map(p => {
          const hlKey = `msg_hl_${currentReaderSermon.id}_${p.number}`;
          const hlClass = localStorage.getItem(hlKey) ? `msg-para-highlighted-${localStorage.getItem(hlKey)}` : '';
          return `
            <div class="msg-paragraph-item ${hlClass}" id="p${p.number}">
              <span class="msg-para-num" style="cursor:pointer;" onclick="toggleHighlight('${currentReaderSermon.id}', ${p.number})" title="Click to highlight paragraph">¶${p.number}</span>
              <div class="msg-para-text">${formatKaraokeSentences(p.number, p.text)}</div>
              <button id="copy-btn-${p.number}" class="msg-copy-para-btn" onclick="copyQuote(${p.number}, '${escapeJs(p.text)}')">📋 Copy</button>
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
    <div style="text-align:center; padding: 4rem 1rem;">
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Transcript is ready in PDF document view:</p>
      <button class="msg-btn msg-btn-pdf" onclick="switchReaderTab('pdf')">📄 Open PDF Book View</button>
    </div>
  `;
}

function parseScripturePills(text) {
  if (!text) return '';

  /* Clean raw Message Hub transcript symbols (@@) */
  let cleanText = text.replace(/^@@\s*/gm, '');

  /* Escape raw HTML FIRST to prevent XSS and prevent escaping generated tags */
  let formatted = escapeHtml(cleanText);

  /* Convert ^^word^^ scripture emphasis tags to clean <em> elements */
  formatted = formatted.replace(/\^\^([^\^]+)\^\^/g, '<em style="color: var(--accent-primary, #2563eb); font-style: normal; font-weight: 600;">$1</em>');

  /* Detect bracketed references [Genesis 1:1], [Revelation 10:7], [St. John 3:16], [I Corinthians 3:7], [Malachi 4:5-6] */
  formatted = formatted.replace(/\[((?:[I|V|X]+|[123]|St\.)?\s*[\w\.\s]+?)\s+(\d+):(\d+)(?:-(\d+))?\]/gi, (match, bookRaw, chap, startVerse, endVerse) => {
    const cleanBook = bookRaw.trim();
    const verseLabel = endVerse ? `${startVerse}-${endVerse}` : startVerse;
    const safeBookEscaped = cleanBook.replace(/'/g, "\\'");
    return `<span class="msg-scripture-ref" onclick="openBibleModal('${safeBookEscaped}', ${chap}, ${startVerse}${endVerse ? `, ${endVerse}` : ''})" title="Click to view KJV Text & Strong's Concordance">📖 [${cleanBook} ${chap}:${verseLabel}]</span>`;
  });

  /* Detect unbracketed references like Genesis 1:1 or Revelation 10:7 or John 3:16 */
  formatted = formatted.replace(/\b((?:St\.\s*)?(?:[123]|I{1,3})?\s*(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation))\s+(\d+):(\d+)(?:-(\d+))?\b/gi, (match, bookRaw, chap, startVerse, endVerse) => {
    const cleanBook = bookRaw.trim();
    const verseLabel = endVerse ? `${startVerse}-${endVerse}` : startVerse;
    const safeBookEscaped = cleanBook.replace(/'/g, "\\'");
    return `<span class="msg-scripture-ref" onclick="openBibleModal('${safeBookEscaped}', ${chap}, ${startVerse}${endVerse ? `, ${endVerse}` : ''})" title="Click to view KJV Text & Strong's Concordance">📖 ${cleanBook} ${chap}:${verseLabel}</span>`;
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

/* Bolls.life Bible & Strong's Concordance Study Tool Integration */
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
      <div style="font-size: 1.1rem; font-family: serif; line-height: 1.8; color: var(--text-primary);">
        ${versesHtml}
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--border-default, #cbd5e1);">
        <button class="msg-btn msg-btn-pdf" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;" onclick="navigator.clipboard.writeText('${escapeJs(copyPayload)}'); this.innerText='✓ Copied Verse!'; setTimeout(()=>this.innerText='📋 Copy KJV Verse', 2000)">📋 Copy KJV Verse</button>
        <a href="https://www.blueletterbible.org/search/search.cfm?Criteria=${encodeURIComponent(refTitle)}" target="_blank" rel="noopener" class="msg-btn msg-btn-pdf" style="font-size: 0.85rem; padding: 0.35rem 0.75rem; text-decoration: none;">🔗 Open in Blue Letter Bible</a>
      </div>
      <div id="strongs-def-container"></div>
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
      <span style="font-weight: 700; font-size: 0.95rem; color: var(--accent-primary, #2563eb);">Strong's ${type.toUpperCase()} #${number}</span>
      <button onclick="closeStrongsPopover()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-secondary); line-height: 1;">&times;</button>
    </div>
    <div style="font-size: 0.85rem; color: var(--text-secondary);">📖 Fetching Interlinear Lexicon Card...</div>
  `;

  document.body.appendChild(popover);
  currentStrongsPopover = popover;

  /* Position card directly below target element */
  const rect = targetEl.getBoundingClientRect();
  const cardWidth = 330;
  let leftPos = rect.left + window.scrollX;
  if (leftPos + cardWidth > window.innerWidth - 20) {
    leftPos = Math.max(10, window.innerWidth - cardWidth - 20);
  }
  let topPos = rect.bottom + window.scrollY + 8;

  popover.style.left = `${leftPos}px`;
  popover.style.top = `${topPos}px`;

  /* Fetch dictionary data */
  const dict = await loadStrongsDictionary(isNT);
  const entry = dict ? (dict[paddedNum] || dict[`${prefix}${number.padStart(4, '0')}`]) : null;

  if (entry) {
    const lemma = entry.lemma ? `<span style="font-size: 1.3rem; font-weight: bold; color: var(--accent-primary, #2563eb); margin-right: 0.4rem;">${entry.lemma}</span>` : '';
    const translit = (entry.translit || entry.xlit) ? `<span style="font-style: italic; color: var(--text-secondary); font-size: 0.9rem;">(${entry.translit || entry.xlit})</span>` : '';
    const pron = entry.pron ? `<span style="font-size: 0.8rem; background: var(--bg-secondary, rgba(0,0,0,0.06)); padding: 0.1rem 0.35rem; border-radius: 4px;">🗣️ ${entry.pron}</span>` : '';
    const strongsDef = entry.strongs_def ? `<div style="margin-top: 0.5rem; font-size: 0.875rem;"><strong>Definition:</strong> ${entry.strongs_def}</div>` : '';
    const kjvDef = entry.kjv_def ? `<div style="margin-top: 0.4rem; font-size: 0.825rem; color: var(--text-secondary);"><strong>KJV:</strong> ${entry.kjv_def}</div>` : '';

    popover.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem; border-bottom: 1px solid var(--border-default, rgba(0,0,0,0.1)); padding-bottom: 0.4rem;">
        <div>
          <span style="font-weight: 700; font-size: 0.85rem; color: var(--accent-primary, #2563eb); text-transform: uppercase;">Strong's ${type} #${number}</span>
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
        <span style="font-weight: 700; color: var(--accent-primary);">Strong's ${type.toUpperCase()} #${number}</span>
        <button onclick="closeStrongsPopover()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-secondary);">&times;</button>
      </div>
      <p style="font-size: 0.85rem; margin: 0.4rem 0;">Definition lookup available on Blue Letter Bible.</p>
      <a href="https://www.blueletterbible.org/lexicon/${type === 'hebrew' ? 'h' : 'g'}${number}/kjv/wlc/1-1/" target="_blank" class="msg-btn msg-btn-pdf" style="font-size: 0.8rem; padding: 0.25rem 0.6rem; display: inline-block;">🔍 Open Blue Letter Bible Lexicon</a>
    `;
  }
}

/* Auto-close popover & modals on outside click or Esc key */
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

async function fetchStrongsDefinition(number, isNT) {
  const container = document.getElementById('strongs-def-container');
  if (!container) return;

  const type = isNT ? 'greek' : 'hebrew';
  const prefix = isNT ? 'G' : 'H';
  const paddedNum = `${prefix}${number}`;

  container.innerHTML = `<div class="msg-strongs-def-box">📖 Loading Strong's ${type.toUpperCase()} #${number} Interlinear Lexicon...</div>`;

  const dict = await loadStrongsDictionary(isNT);
  const entry = dict ? (dict[paddedNum] || dict[`${prefix}${number.padStart(4, '0')}`]) : null;

  if (entry) {
    const lemma = entry.lemma ? `<span style="font-size: 1.25rem; font-weight: bold; margin-right: 0.5rem; color: var(--accent-primary, #2563eb);">${entry.lemma}</span>` : '';
    const translit = (entry.translit || entry.xlit) ? `<span style="font-style: italic; color: var(--text-secondary); margin-right: 0.5rem;">(${entry.translit || entry.xlit})</span>` : '';
    const pron = entry.pron ? `<span style="font-size: 0.85rem; background: var(--bg-secondary, rgba(0,0,0,0.06)); padding: 0.15rem 0.4rem; border-radius: 4px;">🗣️ ${entry.pron}</span>` : '';
    const strongsDef = entry.strongs_def ? `<div style="margin-top: 0.5rem;"><strong>Definition:</strong> ${entry.strongs_def}</div>` : '';
    const kjvDef = entry.kjv_def ? `<div style="margin-top: 0.35rem; font-size: 0.9rem; color: var(--text-secondary);"><strong>KJV Translations:</strong> ${entry.kjv_def}</div>` : '';
    const derivation = entry.derivation ? `<div style="margin-top: 0.35rem; font-size: 0.85rem; font-style: italic;"><strong>Origin:</strong> ${entry.derivation}</div>` : '';

    container.innerHTML = `
      <div class="msg-strongs-def-box" style="margin-top: 1.25rem; background: var(--bg-secondary, #f8fafc); border: 1px solid var(--accent-primary, #2563eb); border-radius: 10px; padding: 1.1rem 1.25rem;">
        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem;">
          <span style="font-weight: 700; font-size: 1rem; color: var(--accent-primary, #2563eb);">Strong's ${type.toUpperCase()} #${number}</span>
          ${lemma} ${translit} ${pron}
        </div>
        ${strongsDef}
        ${kjvDef}
        ${derivation}
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="msg-strongs-def-box" style="margin-top: 1.25rem; padding: 1rem;">
        <div style="font-weight: 700; color: var(--accent-primary);">Strong's ${type.toUpperCase()} #${number}</div>
        <p style="margin-top: 0.35rem;">Definition lookup available on Blue Letter Bible.</p>
        <a href="https://www.blueletterbible.org/lexicon/${type === 'hebrew' ? 'h' : 'g'}${number}/kjv/wlc/1-1/" target="_blank" class="msg-btn msg-btn-pdf" style="margin-top: 0.5rem; display: inline-block;">🔍 Open Blue Letter Bible Lexicon</a>
      </div>
    `;
  }
}

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
    <div style="max-width: 900px; margin: 0 auto; padding: 1.5rem 0;">
      <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; flex-wrap: wrap; background: var(--bg-secondary, rgba(0,0,0,0.03)); padding: 1rem 1.25rem; border-radius: 12px; border: 1px solid var(--border-default, #cbd5e1); margin-bottom: 2rem;">
        <label style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">📖 Select Bible Book:</label>
        <select id="standalone-book-select" class="msg-select-box" style="height: 38px; font-size: 0.95rem;" onchange="loadBollsBibleChapter()">
          ${bookOptions}
        </select>
        <label style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">Chapter:</label>
        <input type="number" id="standalone-chapter-input" class="msg-input-box" style="height: 38px; width: 80px; text-align: center;" value="1" min="1" max="150" onchange="loadBollsBibleChapter()">
        <button class="msg-reader-btn active" style="height: 38px; padding: 0 1.25rem;" onclick="loadBollsBibleChapter()">📖 Load KJV Chapter</button>
      </div>

      <div id="standalone-bible-text-area" style="font-size: 1.2rem; font-family: serif; line-height: 1.9; color: var(--text-primary);">
        Loading Genesis Chapter 1...
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

  textArea.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--text-secondary);">📖 Fetching ${bookName} Chapter ${chapter} (KJV & Strong's Interlinear)...</div>`;

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
        return ` <span class="msg-strongs-tag" onclick="showStrongsPopover(event, '${number}', ${isNT})" title="Click to view Strong's ${type.toUpperCase()} #${number} Interlinear Card">${isNT ? 'G' : 'H'}${number}</span>`;
      });
      return `
        <div style="margin-bottom: 1.1rem; display: flex; gap: 0.75rem; align-items: baseline;">
          <span style="font-family: monospace; font-size: 0.9rem; font-weight: 700; color: var(--accent-primary, #2563eb); background: var(--bg-secondary, rgba(0,0,0,0.05)); padding: 0.2rem 0.5rem; border-radius: 6px;">v${vNum}</span>
          <div style="flex: 1;">${parsedText}</div>
        </div>
      `;
    }).join('');

    textArea.innerHTML = `
      <div style="border-bottom: 2px solid var(--accent-primary, #2563eb); padding-bottom: 0.75rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700;">📖 ${bookName} Chapter ${chapter}</h2>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-primary);">King James Version • Interlinear Lexicon</span>
      </div>
      <div>${html}</div>
      <div id="strongs-def-container"></div>
    `;
  } catch (err) {
    console.warn('Bolls.life chapter fetch error:', err);
    textArea.innerHTML = `
      <div style="text-align:center; padding: 3rem;">
        <p style="color: var(--text-secondary);">Unable to load KJV chapter text for <strong>${escapeHtml(bookName)} ${chapter}</strong>.</p>
        <a href="https://www.blueletterbible.org/search/search.cfm?Criteria=${encodeURIComponent(bookName + ' ' + chapter)}" target="_blank" class="msg-btn msg-btn-pdf" style="margin-top: 1rem; display: inline-block;">🔍 Read on Blue Letter Bible</a>
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

/* Deep-linking check on page init */
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
