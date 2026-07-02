---
title: Search
permalink: "/search/"
layout: page
hide_title: true
excerpt: Search all content on Bakari Mustafa's site
comments: false
---

<div class="search-page-header">
  <div class="search-page-header-content">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-page-icon">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <h1 class="search-page-title">Search</h1>
    <p class="search-page-subtitle">Find articles, projects, pages, and book notes across the site.</p>
  </div>
</div>

<div class="main-search-container">
  <div class="main-search-wrapper">
    <label for="main-search-input" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </label>
    <input
      type="search"
      id="main-search-input"
      placeholder="Search articles, pages, books, and projects"
      aria-label="Search site content"
      autocomplete="off"
    >
    <button type="button" id="clear-main-search" class="clear-main-search-btn" aria-label="Clear search" style="display: none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
  <div id="search-hints" class="search-hints">
    <span class="hint-label">Try searching for:</span>
    <button type="button" class="search-hint-btn" data-query="technology">technology</button>
    <button type="button" class="search-hint-btn" data-query="leadership">leadership</button>
    <button type="button" class="search-hint-btn" data-query="community">community</button>
    <button type="button" class="search-hint-btn" data-query="books">books</button>
  </div>
</div>

<div class="search-filters" id="search-filters" style="display: none;">
  <div class="filter-section">
    <span class="filter-label">Filter by type:</span>
    <button class="search-filter-btn active" data-type="all">All Results</button>
    <button class="search-filter-btn" data-type="post">Articles</button>
    <button class="search-filter-btn" data-type="page">Pages</button>
  </div>
</div>

<div id="search-stats" class="search-stats" style="display: none;">
  <span id="search-stats-text"></span>
</div>

<div id="main-search-results-container" class="main-search-results-container" style="display: none;">
  <div id="main-search-results" class="main-search-results"></div>
</div>

<div id="no-search-results" class="no-search-results" style="display: none;">
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
  <h3>No results found</h3>
  <p>We couldn't find anything matching "<span id="search-query-display"></span>"</p>
  <div class="no-results-suggestions">
    <p><strong>Suggestions:</strong></p>
    <ul>
      <li>Check your spelling</li>
      <li>Try more general keywords</li>
      <li>Try different keywords</li>
      <li>Browse <a href="/posts/">all articles</a></li>
    </ul>
  </div>
</div>

<div id="search-welcome" class="search-welcome">
  <div class="search-welcome-content">
    <h2>What are you looking for?</h2>
    <p>Search through {{ site.posts | size }} articles, public pages, book summaries, and project notes.</p>

    <div class="search-categories">
      <div class="search-category-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <h3>Articles</h3>
        <p>Essays and notes on technology, leadership, faith, and community building.</p>
        <a href="/posts/" class="category-link">Browse all articles</a>
      </div>

      <div class="search-category-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <h3>Book Summaries</h3>
        <p>Notes and takeaways from books I've read.</p>
        <a href="/book-summaries/" class="category-link">View book summaries</a>
      </div>

      <div class="search-category-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <h3>Projects</h3>
        <p>Community initiatives, digital products, and creative work.</p>
        <a href="/projects/" class="category-link">Explore projects</a>
      </div>

      <div class="search-category-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <h3>About</h3>
        <p>Background, current work, and contact details.</p>
        <a href="/about/" class="category-link">About Bakari</a>
      </div>
    </div>

    <div class="search-tips">
      <h3>Search Tips</h3>
      <div class="tips-grid">
        <div class="tip-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Search matches titles, content, and tags</span>
        </div>
        <div class="tip-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Use filters to narrow down results by type</span>
        </div>
        <div class="tip-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Results are sorted by relevance</span>
        </div>
        <div class="tip-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Search is case-insensitive</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Search Query Tracking -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  window.SUPABASE_URL = "https://fmyukpxfweibodnuaifr.supabase.co";
  window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3NzkzNDk2NH0.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg";
</script>
<script src="/assets/js/search-tracking.js"></script>
