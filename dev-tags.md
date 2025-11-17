---
title: Tag & Category Manager
layout: page
permalink: /dev/tags/
excerpt: Manage tags and categories across all posts
description: Developer tool to find duplicate tags, merge similar ones, and maintain taxonomy
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <div class="header-left">
      <h1>🏷️ Tag & Category Manager</h1>
      <p class="dev-subtitle">Keep content organization clean and consistent</p>
    </div>
    <div class="header-right">
      <button id="refresh-tags" class="refresh-button">Refresh</button>
      <button id="export-tags" class="export-btn">Export Report</button>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value" id="total-tags">0</span>
        <span class="stat-label">Unique Tags</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value" id="total-categories">0</span>
        <span class="stat-label">Unique Categories</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value orange" id="orphan-tags">0</span>
        <span class="stat-label">Tags (1-2 posts)</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value orange" id="similar-tags">0</span>
        <span class="stat-label">Similar Tags</span>
      </div>
    </div>
  </div>

  <!-- Similar Tags -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🔄 Similar Tags (Merge Candidates)</h2>
      <p>Tags that might be duplicates or should be merged</p>
    </div>
    <div id="similar-tags-list" class="similar-tags-list">
      <div class="loading-skeleton">Finding similar tags...</div>
    </div>
  </div>

  <!-- Orphan Tags -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📌 Tags with Few Posts</h2>
      <p>Tags used in 1-2 posts (consider consolidating)</p>
    </div>
    <div id="orphan-tags-list" class="orphan-tags-list">
      <div class="loading-skeleton">Finding orphan tags...</div>
    </div>
  </div>

  <!-- All Tags -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🏷️ All Tags</h2>
    </div>
    <div class="table-controls">
      <input type="search" id="filter-tags" placeholder="Search tags..." class="search-input">
      <select id="sort-tags" class="sort-select">
        <option value="count-desc">Most Used</option>
        <option value="count-asc">Least Used</option>
        <option value="name">Alphabetical</option>
      </select>
    </div>
    <div id="all-tags-table" class="tags-table">
      <div class="loading-skeleton">Loading tags...</div>
    </div>
  </div>

  <!-- All Categories -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📂 All Categories</h2>
    </div>
    <div id="all-categories-table" class="categories-table">
      <div class="loading-skeleton">Loading categories...</div>
    </div>
  </div>
</div>

<script id="posts-data" type="application/json">
[
  {% for post in site.posts %}
  {
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | jsonify }},
    "tags": {{ post.tags | jsonify }},
    "categories": {{ post.categories | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script src="/assets/js/tag-manager.js"></script>
