---
title: Link Checker
layout: page
permalink: /dev/links/
excerpt: Check for broken links across all posts
description: Developer tool to scan posts for broken external links and internal link issues
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <div class="header-left">
      <h1>🔗 Link Checker</h1>
      <p class="dev-subtitle">Scan for broken links and link health issues</p>
    </div>
    <div class="header-right">
      <button id="scan-links" class="refresh-button">Scan Links</button>
      <button id="export-links" class="export-btn">Export Report</button>
    </div>
  </div>

  <!-- Scan Status -->
  <div id="scan-status" class="scan-status" style="display: none;">
    <div class="status-message"></div>
    <div class="status-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
      <div class="progress-text">0%</div>
    </div>
  </div>

  <!-- Link Statistics -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value" id="total-links">0</span>
        <span class="stat-label">Total Links</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value green" id="working-links">0</span>
        <span class="stat-label">Working Links</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value red" id="broken-links">0</span>
        <span class="stat-label">Broken Links</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value orange" id="warning-links">0</span>
        <span class="stat-label">Warnings</span>
      </div>
    </div>
  </div>

  <!-- Link Issues -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>⚠️ Link Issues</h2>
      <p>Links requiring attention</p>
    </div>
    <div id="link-issues-list" class="link-issues-list">
      <div class="empty-state">Click "Scan Links" to check for broken links</div>
    </div>
  </div>

  <!-- All Links -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📋 All Extracted Links</h2>
      <p>Complete list of links found in posts</p>
    </div>
    <div class="table-controls">
      <input type="search" id="filter-links" placeholder="Search links..." class="search-input">
      <select id="filter-type" class="sort-select">
        <option value="all">All Links</option>
        <option value="external">External Only</option>
        <option value="internal">Internal Only</option>
        <option value="http">HTTP Only</option>
      </select>
    </div>
    <div id="all-links-table" class="links-table">
      <div class="empty-state">No links scanned yet</div>
    </div>
  </div>
</div>

<script id="posts-data" type="application/json">
[
  {% for post in site.posts %}
  {
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | jsonify }},
    "content": {{ post.content | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script src="/assets/js/link-checker.js"></script>
