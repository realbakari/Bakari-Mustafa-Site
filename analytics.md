---
title: Analytics
layout: page
permalink: /analytics/
excerpt: Internal analytics dashboard showing site traffic and popular content
description: View site statistics, popular posts, and traffic trends
comments: false
---

<div class="analytics-dashboard">
  <!-- Header with Controls -->
  <div class="analytics-header">
    <div class="header-left">
      <h1>📊 Site Analytics</h1>
      <p class="analytics-subtitle">Real-time insights from your blog</p>
    </div>
    <div class="header-right">
      <div class="active-visitors-badge">
        <span class="pulse-dot"></span>
        <span id="active-visitors-count" class="visitor-count">0</span>
        <span class="visitor-label">online</span>
      </div>
      <button id="refresh-btn" class="refresh-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Refresh
      </button>
    </div>
  </div>

  <!-- Date Range Filter -->
  <div class="analytics-controls">
    <div class="control-group">
      <label for="date-range-select">Date Range:</label>
      <select id="date-range-select" class="date-range-select">
        <option value="7">Last 7 days</option>
        <option value="30" selected>Last 30 days</option>
        <option value="90">Last 90 days</option>
        <option value="custom">Custom range...</option>
      </select>
    </div>
  </div>

  <!-- Stats Overview -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="total-views">0</span>
        <span class="stat-label">Total Views</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="unique-visitors">0</span>
        <span class="stat-label">Unique Visitors</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value" id="total-posts">{{ site.posts | size }}</span>
        <span class="stat-label">Total Posts</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value loading" id="avg-views">0</span>
        <span class="stat-label">Avg Views/Post</span>
      </div>
    </div>
  </div>

  <!-- Traffic Trends Chart -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📈 Traffic Trends</h2>
      <p>Page views over time</p>
    </div>
    <div class="traffic-chart">
      <canvas id="traffic-chart" width="800" height="300"></canvas>
    </div>
  </div>

  <!-- Popular Posts -->
  <div class="analytics-section">
    <div class="section-header">
      <div>
        <h2>🔥 Most Popular Posts</h2>
        <p>Top performing content by total views</p>
      </div>
      <button id="export-popular" class="export-btn">Export CSV</button>
    </div>
    <div id="popular-posts" class="popular-posts-list">
      <div class="loading-skeleton">Loading popular posts...</div>
    </div>
  </div>

  <!-- Entry/Exit Pages -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🚪 Entry & Exit Pages</h2>
      <p>Where visitors arrive and leave</p>
    </div>
    <div class="entry-exit-grid">
      <div class="entry-exit-card">
        <h3>Top Entry Pages</h3>
        <div id="entry-pages" class="entry-exit-list">
          <div class="loading-skeleton">Loading...</div>
        </div>
      </div>
      <div class="entry-exit-card">
        <h3>Top Exit Pages</h3>
        <div id="exit-pages" class="entry-exit-list">
          <div class="loading-skeleton">Loading...</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Traffic Sources -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🔗 Traffic Sources</h2>
      <p>Where your visitors are coming from</p>
    </div>
    <div id="referrer-stats" class="referrer-stats">
      <div class="loading-skeleton">Loading referrer data...</div>
    </div>
  </div>

  <!-- Device & Browser Analytics -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📊 Visitor Technology</h2>
      <p>Devices and browsers used by your audience</p>
    </div>
    <div class="device-browser-grid">
      <div class="analytics-card">
        <h3>Devices</h3>
        <div id="device-stats" class="device-stats">
          <div class="loading-skeleton">Loading device data...</div>
        </div>
      </div>
      <div class="analytics-card">
        <h3>Browsers</h3>
        <div id="browser-stats" class="browser-stats">
          <div class="loading-skeleton">Loading browser data...</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Analytics -->
  <div class="analytics-section">
    <div class="section-header">
      <div>
        <h2>🔍 Search Queries</h2>
        <p>What visitors are searching for</p>
      </div>
      <button id="export-searches" class="export-btn">Export CSV</button>
    </div>
    <div id="search-analytics" class="search-analytics">
      <div class="loading-skeleton">Loading search data...</div>
    </div>
  </div>

  <!-- 404 Errors -->
  <div class="analytics-section">
    <div class="section-header">
      <div>
        <h2>⚠️ 404 Errors</h2>
        <p>Broken links and missing pages</p>
      </div>
      <button id="export-404s" class="export-btn">Export CSV</button>
    </div>
    <div id="error-404-analytics" class="error-404-analytics">
      <div class="loading-skeleton">Loading error data...</div>
    </div>
  </div>

  <!-- Active Visitors (Real-time) -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>👥 Active Visitors (Real-Time)</h2>
      <p>Currently browsing your site</p>
    </div>
    <div id="active-visitors" class="active-visitors-list">
      <div class="loading-skeleton">Loading active visitors...</div>
    </div>
  </div>

  <!-- Recent Activity -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>⏱️ Recent Activity</h2>
      <p>Latest page views and updates</p>
    </div>
    <div id="recent-activity" class="recent-activity-list">
      <div class="loading-skeleton">Loading recent activity...</div>
    </div>
  </div>

  <!-- All Pages Table -->
  <div class="analytics-section">
    <div class="section-header">
      <div>
        <h2>📄 All Pages</h2>
        <p>Complete overview of all tracked pages</p>
      </div>
      <button id="export-all-pages" class="export-btn">Export CSV</button>
    </div>
    <div class="table-controls">
      <input type="search" id="search-pages" placeholder="Search pages..." class="search-input">
      <select id="sort-pages" class="sort-select">
        <option value="views-desc">Most Views</option>
        <option value="views-asc">Least Views</option>
        <option value="unique-desc">Most Unique</option>
        <option value="date-desc">Recently Updated</option>
        <option value="title-asc">Title A-Z</option>
      </select>
    </div>
    <div id="all-pages-table" class="pages-table">
      <div class="loading-skeleton">Loading all pages...</div>
    </div>
  </div>
</div>

<!-- Custom Date Range Modal -->
<div id="custom-date-modal" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <h3>Custom Date Range</h3>
    <div class="date-inputs">
      <div class="date-input-group">
        <label for="start-date">Start Date:</label>
        <input type="date" id="start-date" class="date-input">
      </div>
      <div class="date-input-group">
        <label for="end-date">End Date:</label>
        <input type="date" id="end-date" class="date-input">
      </div>
    </div>
    <div class="modal-actions">
      <button id="cancel-custom-date" class="btn-secondary">Cancel</button>
      <button id="apply-custom-date" class="btn-primary">Apply</button>
    </div>
  </div>
</div>

<!-- Load Supabase Library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  window.SUPABASE_URL = "https://fmyukpxfweibodnuaifr.supabase.co";
  window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3NzkzNDk2NH0.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg";
</script>
<!-- Load Chart.js for trend visualizations -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="/assets/js/analytics.js"></script>
