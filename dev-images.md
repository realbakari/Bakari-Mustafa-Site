---
title: Image Manager
layout: page
permalink: /dev/images/
excerpt: Manage and optimize images across all posts
description: Developer tool to track image usage, identify optimization opportunities
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <div class="header-left">
      <h1>🖼️ Image Manager</h1>
      <p class="dev-subtitle">Track image usage and optimization opportunities</p>
    </div>
    <div class="header-right">
      <button id="refresh-images" class="refresh-button">Refresh</button>
      <button id="export-images" class="export-btn">Export Report</button>
    </div>
  </div>

  <!-- Image Statistics -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value" id="total-images">0</span>
        <span class="stat-label">Total Images</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value" id="featured-images">0</span>
        <span class="stat-label">Featured Images</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value" id="content-images">0</span>
        <span class="stat-label">Content Images</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-content">
        <span class="stat-value red" id="missing-alt">0</span>
        <span class="stat-label">Missing Alt Text</span>
      </div>
    </div>
  </div>

  <!-- Missing Alt Text -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>⚠️ Images Missing Alt Text</h2>
      <p>SEO and accessibility issue</p>
    </div>
    <div id="missing-alt-list" class="image-issues-list">
      <div class="loading-skeleton">Analyzing images...</div>
    </div>
  </div>

  <!-- All Images -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📋 All Images</h2>
    </div>
    <div class="table-controls">
      <input type="search" id="filter-images" placeholder="Search images..." class="search-input">
      <select id="filter-image-type" class="sort-select">
        <option value="all">All Images</option>
        <option value="featured">Featured Only</option>
        <option value="content">Content Only</option>
        <option value="external">External Only</option>
      </select>
    </div>
    <div id="all-images-table" class="images-table">
      <div class="loading-skeleton">Loading images...</div>
    </div>
  </div>
</div>

<script id="posts-data" type="application/json">
[
  {% for post in site.posts %}
  {
    "title": {{ post.title | jsonify }},
    "url": {{ post.url | jsonify }},
    "image": {{ post.image | jsonify }},
    "content": {{ post.content | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script src="/assets/js/image-manager.js"></script>
