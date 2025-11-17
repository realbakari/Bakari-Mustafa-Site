---
title: Performance Monitor
layout: page
permalink: /dev/performance/
excerpt: Monitor site performance metrics from real visitors
description: Developer tool to track page load times, Core Web Vitals, and performance trends
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <div class="header-left">
      <h1>⚡ Performance Monitor</h1>
      <p class="dev-subtitle">Track site speed and Core Web Vitals from real visitors</p>
    </div>
    <div class="header-right">
      <button id="refresh-perf" class="refresh-button">Refresh</button>
      <button id="export-perf" class="export-btn">Export CSV</button>
    </div>
  </div>

  <!-- Core Web Vitals -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>🎯 Core Web Vitals</h2>
      <p>Google's key metrics for user experience</p>
    </div>
    <div class="web-vitals-grid">
      <div class="vital-card">
        <div class="vital-name">LCP</div>
        <div class="vital-value" id="lcp-value">-</div>
        <div class="vital-label">Largest Contentful Paint</div>
        <div class="vital-target">Target: &lt; 2.5s</div>
      </div>
      <div class="vital-card">
        <div class="vital-name">FID</div>
        <div class="vital-value" id="fid-value">-</div>
        <div class="vital-label">First Input Delay</div>
        <div class="vital-target">Target: &lt; 100ms</div>
      </div>
      <div class="vital-card">
        <div class="vital-name">CLS</div>
        <div class="vital-value" id="cls-value">-</div>
        <div class="vital-label">Cumulative Layout Shift</div>
        <div class="vital-target">Target: &lt; 0.1</div>
      </div>
    </div>
  </div>

  <!-- Current Page Performance -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>📊 Current Page Performance</h2>
      <p>Real-time metrics for this page</p>
    </div>
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value" id="dom-load">-</span>
          <span class="stat-label">DOM Content Loaded</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value" id="page-load">-</span>
          <span class="stat-label">Full Page Load</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-value" id="ttfb">-</span>
          <span class="stat-label">Time to First Byte</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Performance Recommendations -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>💡 Performance Recommendations</h2>
    </div>
    <div id="perf-recommendations" class="recommendations-list">
      <div class="loading-skeleton">Analyzing performance...</div>
    </div>
  </div>
</div>

<script src="/assets/js/performance-monitor.js"></script>
