---
title: Content Health Dashboard
layout: page
permalink: /dev/content-health/
excerpt: Monitor content quality and SEO health across all posts
description: Developer tool to check for missing metadata, SEO issues, and content quality problems
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <div class="header-left">
      <h1>🏥 Content Health Dashboard</h1>
      <p class="dev-subtitle">Catch SEO and quality issues before they hurt rankings</p>
    </div>
    <div class="header-right">
      <button id="refresh-health" class="refresh-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Refresh
      </button>
      <button id="export-health-report" class="export-btn">Export Report</button>
    </div>
  </div>

  <!-- Health Score Overview -->
  <div class="health-score-section">
    <div class="health-score-card">
      <div class="score-circle" id="health-score-circle">
        <div class="score-value" id="health-score">0</div>
        <div class="score-label">Health Score</div>
      </div>
      <div class="score-breakdown">
        <div class="breakdown-item">
          <span class="breakdown-label">Total Posts:</span>
          <span class="breakdown-value" id="total-posts-count">0</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-label">Healthy:</span>
          <span class="breakdown-value green" id="healthy-posts-count">0</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-label">Needs Attention:</span>
          <span class="breakdown-value orange" id="warning-posts-count">0</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-label">Critical Issues:</span>
          <span class="breakdown-value red" id="critical-posts-count">0</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Issue Categories -->
  <div class="issues-grid">
    <!-- Missing Meta Descriptions -->
    <div class="issue-card">
      <div class="issue-header">
        <div class="issue-icon warning">⚠️</div>
        <div class="issue-title">
          <h3>Missing Meta Descriptions</h3>
          <p class="issue-count"><span id="missing-desc-count">0</span> posts</p>
        </div>
      </div>
      <div class="issue-impact">
        <strong>SEO Impact:</strong> High - Hurts click-through rates from search results
      </div>
      <div class="issue-posts" id="missing-desc-posts">
        <div class="loading-skeleton">Scanning posts...</div>
      </div>
    </div>

    <!-- Missing Featured Images -->
    <div class="issue-card">
      <div class="issue-header">
        <div class="issue-icon warning">🖼️</div>
        <div class="issue-title">
          <h3>Missing Featured Images</h3>
          <p class="issue-count"><span id="missing-image-count">0</span> posts</p>
        </div>
      </div>
      <div class="issue-impact">
        <strong>SEO Impact:</strong> Medium - Affects social sharing and visual appeal
      </div>
      <div class="issue-posts" id="missing-image-posts">
        <div class="loading-skeleton">Scanning posts...</div>
      </div>
    </div>

    <!-- Missing Tags -->
    <div class="issue-card">
      <div class="issue-header">
        <div class="issue-icon info">🏷️</div>
        <div class="issue-title">
          <h3>Missing Tags</h3>
          <p class="issue-count"><span id="missing-tags-count">0</span> posts</p>
        </div>
      </div>
      <div class="issue-impact">
        <strong>SEO Impact:</strong> Low - Helps content discovery and organization
      </div>
      <div class="issue-posts" id="missing-tags-posts">
        <div class="loading-skeleton">Scanning posts...</div>
      </div>
    </div>

    <!-- Short Descriptions -->
    <div class="issue-card">
      <div class="issue-header">
        <div class="issue-icon warning">📝</div>
        <div class="issue-title">
          <h3>Short Meta Descriptions</h3>
          <p class="issue-count"><span id="short-desc-count">0</span> posts</p>
        </div>
      </div>
      <div class="issue-impact">
        <strong>SEO Impact:</strong> Medium - Descriptions under 120 chars don't fully utilize search snippets
      </div>
      <div class="issue-posts" id="short-desc-posts">
        <div class="loading-skeleton">Scanning posts...</div>
      </div>
    </div>

    <!-- Long Titles -->
    <div class="issue-card">
      <div class="issue-header">
        <div class="issue-icon info">📏</div>
        <div class="issue-title">
          <h3>Long Titles</h3>
          <p class="issue-count"><span id="long-title-count">0</span> posts</p>
        </div>
      </div>
      <div class="issue-impact">
        <strong>SEO Impact:</strong> Low - Titles over 60 chars get truncated in search results
      </div>
      <div class="issue-posts" id="long-title-posts">
        <div class="loading-skeleton">Scanning posts...</div>
      </div>
    </div>

    <!-- Missing Categories -->
    <div class="issue-card">
      <div class="issue-header">
        <div class="issue-icon info">📂</div>
        <div class="issue-title">
          <h3>Missing Categories</h3>
          <p class="issue-count"><span id="missing-cats-count">0</span> posts</p>
        </div>
      </div>
      <div class="issue-impact">
        <strong>SEO Impact:</strong> Low - Categories help organize content
      </div>
      <div class="issue-posts" id="missing-cats-posts">
        <div class="loading-skeleton">Scanning posts...</div>
      </div>
    </div>
  </div>

  <!-- All Posts Health Report -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📋 All Posts Health Report</h2>
      <p>Complete health status for all posts</p>
    </div>
    <div class="table-controls">
      <input type="search" id="filter-posts" placeholder="Search posts..." class="search-input">
      <select id="filter-health" class="sort-select">
        <option value="all">All Posts</option>
        <option value="critical">Critical Issues</option>
        <option value="warning">Needs Attention</option>
        <option value="healthy">Healthy</option>
      </select>
      <select id="sort-posts-health" class="sort-select">
        <option value="issues-desc">Most Issues</option>
        <option value="issues-asc">Least Issues</option>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
    <div id="all-posts-health" class="posts-health-table">
      <div class="loading-skeleton">Analyzing all posts...</div>
    </div>
  </div>
</div>

<!-- Jekyll Data - All Posts -->
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
    "content": {{ post.content | strip_html | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script src="/assets/js/content-health-dashboard.js"></script>
