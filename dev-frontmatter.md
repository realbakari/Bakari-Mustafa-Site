---
title: Frontmatter Validator
layout: page
permalink: /dev/frontmatter/
excerpt: Validate and preview post frontmatter metadata
description: Developer tool to ensure consistent post metadata and preview SEO appearance
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <div class="header-left">
      <h1>📝 Frontmatter Validator</h1>
      <p class="dev-subtitle">Ensure consistent metadata across all posts</p>
    </div>
    <div class="header-right">
      <button id="refresh-frontmatter" class="refresh-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Refresh
      </button>
      <button id="export-frontmatter" class="export-btn">Export Report</button>
    </div>
  </div>

  <!-- Validation Summary -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value" id="total-posts">0</span>
        <span class="stat-label">Total Posts</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value green" id="valid-posts">0</span>
        <span class="stat-label">Valid Frontmatter</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value orange" id="invalid-posts">0</span>
        <span class="stat-label">Needs Attention</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value" id="compliance-rate">0%</span>
        <span class="stat-label">Compliance Rate</span>
      </div>
    </div>
  </div>

  <!-- Required Fields Compliance -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>✅ Required Fields Compliance</h2>
      <p>Check which required fields are present across all posts</p>
    </div>
    <div id="fields-compliance" class="fields-compliance-grid">
      <div class="loading-skeleton">Analyzing frontmatter...</div>
    </div>
  </div>

  <!-- Tag & Category Analysis -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🏷️ Tag & Category Consistency</h2>
      <p>Common tags and categories used across posts</p>
    </div>
    <div class="tag-cat-grid">
      <div class="tag-cat-card">
        <h3>Most Used Tags</h3>
        <div id="top-tags" class="tag-list">
          <div class="loading-skeleton">Loading tags...</div>
        </div>
      </div>
      <div class="tag-cat-card">
        <h3>Most Used Categories</h3>
        <div id="top-categories" class="tag-list">
          <div class="loading-skeleton">Loading categories...</div>
        </div>
      </div>
    </div>
  </div>

  <!-- All Posts Validation Table -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📋 All Posts Validation</h2>
      <p>Complete frontmatter validation for all posts</p>
    </div>
    <div class="table-controls">
      <input type="search" id="filter-posts-fm" placeholder="Search posts..." class="search-input">
      <select id="filter-status-fm" class="sort-select">
        <option value="all">All Posts</option>
        <option value="valid">Valid Only</option>
        <option value="invalid">Invalid Only</option>
      </select>
      <select id="sort-posts-fm" class="sort-select">
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title">Title A-Z</option>
        <option value="issues">Most Issues</option>
      </select>
    </div>
    <div id="all-posts-validation" class="posts-validation-table">
      <div class="loading-skeleton">Validating all posts...</div>
    </div>
  </div>

  <!-- SEO Preview -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🔍 SEO Preview</h2>
      <p>Select a post to preview how it appears in search and social</p>
    </div>
    <div class="seo-preview-controls">
      <select id="post-selector" class="post-selector">
        <option value="">Select a post...</option>
      </select>
    </div>
    <div id="seo-preview-container" class="seo-preview-container">
      <div class="empty-state">Select a post to preview its SEO appearance</div>
    </div>
  </div>
</div>

<!-- Jekyll Data -->
<script id="posts-data" type="application/json">
[
  {% for post in site.posts %}
  {
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | jsonify }},
    "date": {{ post.date | date: "%Y-%m-%d" | jsonify }},
    "description": {{ post.description | default: post.excerpt | strip_html | jsonify }},
    "image": {{ post.image | jsonify }},
    "tags": {{ post.tags | jsonify }},
    "categories": {{ post.categories | jsonify }},
    "author": {{ site.author.name | jsonify }},
    "modified": {{ post.modified | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script>
  window.SITE_URL = {{ site.url | jsonify }};
  window.SITE_TITLE = {{ site.title | jsonify }};
  window.AUTHOR_TWITTER = {{ site.author.twitter | jsonify }};
</script>

<script src="/assets/js/frontmatter-validator.js"></script>
