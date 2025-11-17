---
title: Developer Tools
layout: page
permalink: /dev/
excerpt: Internal developer tools for managing and monitoring the site
description: Developer dashboard with tools for content health, performance, SEO, and more
comments: false
---

<div class="dev-tools-dashboard">
  <div class="dev-header">
    <h1>🛠️ Developer Tools</h1>
    <p class="dev-subtitle">Internal tools for site management and monitoring</p>
  </div>

  <!-- Quick Stats -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">{{ site.posts | size }}</span>
        <span class="stat-label">Total Posts</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">-</span>
        <span class="stat-label">Total Views</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">-</span>
        <span class="stat-label">Searches</span>
      </div>
    </div>
  </div>

  <!-- Tools Grid -->
  <div class="dev-tools-grid">
    <!-- Content Health -->
    <a href="/dev/content-health/" class="dev-tool-card">
      <div class="tool-icon">🏥</div>
      <div class="tool-info">
        <h3>Content Health Dashboard</h3>
        <p>Monitor content quality and SEO health across all posts</p>
        <div class="tool-features">
          <span class="feature-tag">Missing Meta Descriptions</span>
          <span class="feature-tag">Missing Images</span>
          <span class="feature-tag">SEO Issues</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Frontmatter Validator -->
    <a href="/dev/frontmatter/" class="dev-tool-card">
      <div class="tool-icon">📝</div>
      <div class="tool-info">
        <h3>Frontmatter Validator</h3>
        <p>Validate and preview post metadata consistency</p>
        <div class="tool-features">
          <span class="feature-tag">Required Fields</span>
          <span class="feature-tag">SEO Preview</span>
          <span class="feature-tag">Social Cards</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Performance Monitor -->
    <a href="/dev/performance/" class="dev-tool-card">
      <div class="tool-icon">⚡</div>
      <div class="tool-info">
        <h3>Performance Monitor</h3>
        <p>Track page load times and Core Web Vitals</p>
        <div class="tool-features">
          <span class="feature-tag">LCP/FID/CLS</span>
          <span class="feature-tag">Load Times</span>
          <span class="feature-tag">Recommendations</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Link Checker -->
    <a href="/dev/links/" class="dev-tool-card">
      <div class="tool-icon">🔗</div>
      <div class="tool-info">
        <h3>Link Checker</h3>
        <p>Scan for broken links and link health issues</p>
        <div class="tool-features">
          <span class="feature-tag">Broken Links</span>
          <span class="feature-tag">HTTP Links</span>
          <span class="feature-tag">Internal/External</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Image Manager -->
    <a href="/dev/images/" class="dev-tool-card">
      <div class="tool-icon">🖼️</div>
      <div class="tool-info">
        <h3>Image Manager</h3>
        <p>Manage and optimize images across all posts</p>
        <div class="tool-features">
          <span class="feature-tag">Missing Alt Text</span>
          <span class="feature-tag">Image Sizes</span>
          <span class="feature-tag">Optimization</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Tag & Category Manager -->
    <a href="/dev/tags/" class="dev-tool-card">
      <div class="tool-icon">🏷️</div>
      <div class="tool-info">
        <h3>Tag & Category Manager</h3>
        <p>Manage tags and categories for better organization</p>
        <div class="tool-features">
          <span class="feature-tag">Similar Tags</span>
          <span class="feature-tag">Orphan Tags</span>
          <span class="feature-tag">Taxonomy</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Analytics -->
    <a href="/analytics/" class="dev-tool-card">
      <div class="tool-icon">📊</div>
      <div class="tool-info">
        <h3>Analytics Dashboard</h3>
        <p>Real-time site traffic and visitor analytics</p>
        <div class="tool-features">
          <span class="feature-tag">Page Views</span>
          <span class="feature-tag">Popular Posts</span>
          <span class="feature-tag">Traffic Sources</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>

    <!-- Search Analytics -->
    <a href="/search-analytics/" class="dev-tool-card">
      <div class="tool-icon">🔍</div>
      <div class="tool-info">
        <h3>Search Analytics</h3>
        <p>Analyze search queries and trends</p>
        <div class="tool-features">
          <span class="feature-tag">Top Queries</span>
          <span class="feature-tag">No Results</span>
          <span class="feature-tag">Content Gaps</span>
        </div>
      </div>
      <div class="tool-arrow">→</div>
    </a>
  </div>

  <!-- Quick Actions -->
  <div class="analytics-section">
    <div class="section-header">
      <h2>⚡ Quick Actions</h2>
    </div>
    <div class="quick-actions-grid">
      <a href="/admin/" class="quick-action-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Create New Post
      </a>
      <a href="/sitemap.xml" class="quick-action-btn" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
        View Sitemap
      </a>
      <a href="/newsletter-dashboard/" class="quick-action-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        Newsletter Dashboard
      </a>
      <button id="clear-cache-btn" class="quick-action-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="1 4 1 10 7 10"></polyline>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
        </svg>
        Clear Browser Cache
      </button>
    </div>
  </div>
</div>

<script>
  document.getElementById('clear-cache-btn')?.addEventListener('click', function() {
    if (confirm('This will clear your browser cache and reload the page. Continue?')) {
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        }).then(() => location.reload(true));
      } else {
        location.reload(true);
      }
    }
  });
</script>
