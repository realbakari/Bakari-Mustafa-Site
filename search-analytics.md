---
title: Search Analytics
layout: page
permalink: /search-analytics/
excerpt: Dedicated search analytics dashboard
description: Analyze search queries, trends, and content gaps based on what visitors search for
comments: false
---

<div class="search-analytics-dashboard">
  <!-- Header -->
  <div class="analytics-header">
    <div class="header-left">
      <h1>🔍 Search Analytics</h1>
      <p class="analytics-subtitle">Understand what visitors are looking for</p>
    </div>
    <div class="header-right">
      <button id="refresh-search-btn" class="refresh-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Refresh
      </button>
      <button id="export-all-search" class="export-btn">Export All CSV</button>
    </div>
  </div>

  <!-- Date Range Filter -->
  <div class="analytics-controls">
    <div class="control-group">
      <label for="search-date-range">Date Range:</label>
      <select id="search-date-range" class="date-range-select">
        <option value="7">Last 7 days</option>
        <option value="30" selected>Last 30 days</option>
        <option value="90">Last 90 days</option>
        <option value="all">All time</option>
      </select>
    </div>
  </div>

  <!-- Key Metrics -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="total-searches">0</span>
        <span class="stat-label">Total Searches</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"></path>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="unique-queries">0</span>
        <span class="stat-label">Unique Queries</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="avg-searches-per-day">0</span>
        <span class="stat-label">Avg Searches/Day</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="zero-result-queries">0</span>
        <span class="stat-label">No Results Queries</span>
      </div>
    </div>
  </div>

  <!-- Search Trends Chart -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📈 Search Trends</h2>
      <p>Search volume over time</p>
    </div>
    <div class="chart-container">
      <canvas id="search-trends-chart" width="800" height="300"></canvas>
    </div>
  </div>

  <!-- Two Column Layout -->
  <div class="search-analytics-grid">
    <!-- Top Search Queries -->
    <div class="analytics-section">
      <div class="section-header">
        <div>
          <h2>🔥 Top Search Queries</h2>
          <p>Most searched terms</p>
        </div>
        <button id="export-top-queries" class="export-btn-small">Export</button>
      </div>
      <div id="top-queries-list" class="search-queries-list">
        <div class="loading-skeleton">Loading top queries...</div>
      </div>
    </div>

    <!-- Zero Results Queries -->
    <div class="analytics-section">
      <div class="section-header">
        <div>
          <h2>⚠️ No Results Found</h2>
          <p>Content gap opportunities</p>
        </div>
        <button id="export-zero-results" class="export-btn-small">Export</button>
      </div>
      <div id="zero-results-list" class="search-queries-list">
        <div class="loading-skeleton">Loading queries with no results...</div>
      </div>
    </div>
  </div>

  <!-- Search Query Performance -->
  <div class="analytics-section">
    <div class="section-header">
      <div>
        <h2>📊 Query Performance</h2>
        <p>Results count distribution</p>
      </div>
    </div>
    <div class="performance-chart-container">
      <canvas id="query-performance-chart" width="600" height="300"></canvas>
    </div>
  </div>

  <!-- Recent Searches -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>⏱️ Recent Searches</h2>
      <p>Latest search activity</p>
    </div>
    <div id="recent-searches-list" class="recent-searches-table">
      <div class="loading-skeleton">Loading recent searches...</div>
    </div>
  </div>

  <!-- Popular Search Terms by Hour -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🕐 Search Activity by Hour</h2>
      <p>When are visitors searching?</p>
    </div>
    <div class="heatmap-container">
      <canvas id="search-heatmap" width="800" height="200"></canvas>
    </div>
  </div>

  <!-- All Queries Table -->
  <div class="analytics-section">
    <div class="section-header">
      <div>
        <h2>📄 All Search Queries</h2>
        <p>Complete search query history</p>
      </div>
    </div>
    <div class="table-controls">
      <input type="search" id="filter-queries" placeholder="Filter queries..." class="search-input">
      <select id="sort-queries" class="sort-select">
        <option value="count-desc">Most Frequent</option>
        <option value="count-asc">Least Frequent</option>
        <option value="recent">Most Recent</option>
        <option value="results-asc">Fewest Results</option>
        <option value="alpha">Alphabetical</option>
      </select>
    </div>
    <div id="all-queries-table" class="queries-table">
      <div class="loading-skeleton">Loading all queries...</div>
    </div>
  </div>
</div>

<!-- Load Dependencies -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  window.SUPABASE_URL = "https://fmyukpxfweibodnuaifr.supabase.co";
  window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3NzkzNDk2NH0.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg";
</script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="/assets/js/search-analytics-dashboard.js"></script>
