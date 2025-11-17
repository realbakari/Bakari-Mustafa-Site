/**
 * Content Health Dashboard
 * Analyzes posts for SEO and quality issues
 */

(function() {
  'use strict';

  let allPosts = [];
  let healthReports = [];

  /**
   * Load posts data from Jekyll
   */
  function loadPostsData() {
    const postsDataEl = document.getElementById('posts-data');
    if (!postsDataEl) return [];

    try {
      return JSON.parse(postsDataEl.textContent);
    } catch (error) {
      console.error('Error parsing posts data:', error);
      return [];
    }
  }

  /**
   * Analyze post health
   */
  function analyzePostHealth(post) {
    const issues = [];
    let severity = 'healthy'; // healthy, warning, critical

    // Check meta description
    if (!post.description || post.description.trim().length === 0) {
      issues.push({
        type: 'missing-description',
        severity: 'critical',
        message: 'Missing meta description'
      });
      severity = 'critical';
    } else if (post.description.length < 120) {
      issues.push({
        type: 'short-description',
        severity: 'warning',
        message: `Description too short (${post.description.length} chars, recommended 120-160)`
      });
      if (severity !== 'critical') severity = 'warning';
    }

    // Check featured image
    if (!post.image || post.image.trim().length === 0) {
      issues.push({
        type: 'missing-image',
        severity: 'warning',
        message: 'Missing featured image'
      });
      if (severity !== 'critical') severity = 'warning';
    }

    // Check tags
    if (!post.tags || post.tags.length === 0) {
      issues.push({
        type: 'missing-tags',
        severity: 'info',
        message: 'No tags assigned'
      });
    }

    // Check categories
    if (!post.categories || post.categories.length === 0) {
      issues.push({
        type: 'missing-categories',
        severity: 'info',
        message: 'No categories assigned'
      });
    }

    // Check title length (60 chars is Google's cutoff)
    if (post.title.length > 60) {
      issues.push({
        type: 'long-title',
        severity: 'info',
        message: `Title too long (${post.title.length} chars, recommended < 60)`
      });
    }

    // Check for very short content
    if (post.content && post.content.length < 300) {
      issues.push({
        type: 'thin-content',
        severity: 'warning',
        message: `Content very short (${post.content.length} chars)`
      });
      if (severity !== 'critical') severity = 'warning';
    }

    return {
      post,
      issues,
      severity,
      healthScore: calculateHealthScore(issues)
    };
  }

  /**
   * Calculate health score (0-100)
   */
  function calculateHealthScore(issues) {
    let score = 100;

    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          score -= 20;
          break;
        case 'warning':
          score -= 10;
          break;
        case 'info':
          score -= 5;
          break;
      }
    });

    return Math.max(0, score);
  }

  /**
   * Update health score overview
   */
  function updateHealthScoreOverview() {
    const totalPosts = healthReports.length;
    const healthyPosts = healthReports.filter(r => r.severity === 'healthy').length;
    const warningPosts = healthReports.filter(r => r.severity === 'warning').length;
    const criticalPosts = healthReports.filter(r => r.severity === 'critical').length;

    const avgHealthScore = totalPosts > 0
      ? Math.round(healthReports.reduce((sum, r) => sum + r.healthScore, 0) / totalPosts)
      : 0;

    document.getElementById('health-score').textContent = avgHealthScore;
    document.getElementById('total-posts-count').textContent = totalPosts;
    document.getElementById('healthy-posts-count').textContent = healthyPosts;
    document.getElementById('warning-posts-count').textContent = warningPosts;
    document.getElementById('critical-posts-count').textContent = criticalPosts;

    // Update score circle color
    const scoreCircle = document.getElementById('health-score-circle');
    scoreCircle.className = 'score-circle';
    if (avgHealthScore >= 80) {
      scoreCircle.classList.add('healthy');
    } else if (avgHealthScore >= 60) {
      scoreCircle.classList.add('warning');
    } else {
      scoreCircle.classList.add('critical');
    }
  }

  /**
   * Update issue cards
   */
  function updateIssueCards() {
    // Missing descriptions
    const missingDesc = healthReports.filter(r =>
      r.issues.some(i => i.type === 'missing-description')
    );
    document.getElementById('missing-desc-count').textContent = missingDesc.length;
    renderIssueList('missing-desc-posts', missingDesc, 'No posts missing descriptions! 🎉');

    // Missing images
    const missingImage = healthReports.filter(r =>
      r.issues.some(i => i.type === 'missing-image')
    );
    document.getElementById('missing-image-count').textContent = missingImage.length;
    renderIssueList('missing-image-posts', missingImage, 'All posts have featured images! 🎉');

    // Missing tags
    const missingTags = healthReports.filter(r =>
      r.issues.some(i => i.type === 'missing-tags')
    );
    document.getElementById('missing-tags-count').textContent = missingTags.length;
    renderIssueList('missing-tags-posts', missingTags, 'All posts are tagged! 🎉');

    // Short descriptions
    const shortDesc = healthReports.filter(r =>
      r.issues.some(i => i.type === 'short-description')
    );
    document.getElementById('short-desc-count').textContent = shortDesc.length;
    renderIssueList('short-desc-posts', shortDesc, 'All descriptions are optimal length! 🎉');

    // Long titles
    const longTitle = healthReports.filter(r =>
      r.issues.some(i => i.type === 'long-title')
    );
    document.getElementById('long-title-count').textContent = longTitle.length;
    renderIssueList('long-title-posts', longTitle, 'All titles are optimal length! 🎉');

    // Missing categories
    const missingCats = healthReports.filter(r =>
      r.issues.some(i => i.type === 'missing-categories')
    );
    document.getElementById('missing-cats-count').textContent = missingCats.length;
    renderIssueList('missing-cats-posts', missingCats, 'All posts have categories! 🎉');
  }

  /**
   * Render issue list
   */
  function renderIssueList(containerId, reports, emptyMessage) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (reports.length === 0) {
      container.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
      return;
    }

    container.innerHTML = reports.slice(0, 10).map(report => `
      <div class="issue-post-item">
        <a href="${escapeHtml(report.post.url)}" target="_blank" class="issue-post-link">
          ${escapeHtml(report.post.title)}
        </a>
        <span class="issue-post-date">${formatDate(report.post.date)}</span>
      </div>
    `).join('');

    if (reports.length > 10) {
      container.innerHTML += `<div class="issue-more">+${reports.length - 10} more posts</div>`;
    }
  }

  /**
   * Render all posts health table
   */
  function renderAllPostsHealth(filterHealth = 'all', filterText = '', sortBy = 'issues-desc') {
    const container = document.getElementById('all-posts-health');
    if (!container) return;

    let filtered = [...healthReports];

    // Apply health filter
    if (filterHealth !== 'all') {
      filtered = filtered.filter(r => r.severity === filterHealth);
    }

    // Apply text filter
    if (filterText) {
      filtered = filtered.filter(r =>
        r.post.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'issues-desc':
        filtered.sort((a, b) => b.issues.length - a.issues.length);
        break;
      case 'issues-asc':
        filtered.sort((a, b) => a.issues.length - b.issues.length);
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.post.date) - new Date(a.post.date));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.post.date) - new Date(b.post.date));
        break;
      case 'title':
        filtered.sort((a, b) => a.post.title.localeCompare(b.post.title));
        break;
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state">No posts match the selected filters</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Date</th>
            <th>Health</th>
            <th>Score</th>
            <th>Issues</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(report => `
            <tr class="health-row ${report.severity}">
              <td class="post-title-cell">
                <a href="${escapeHtml(report.post.url)}" target="_blank">
                  ${escapeHtml(report.post.title)}
                </a>
              </td>
              <td class="date-cell">${formatDate(report.post.date)}</td>
              <td class="health-cell">
                <span class="health-badge ${report.severity}">
                  ${report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                </span>
              </td>
              <td class="score-cell">
                <span class="health-score-badge ${getScoreClass(report.healthScore)}">
                  ${report.healthScore}
                </span>
              </td>
              <td class="issues-cell">
                ${report.issues.length === 0
                  ? '<span class="no-issues">✓ None</span>'
                  : `<ul class="issues-list">
                      ${report.issues.map(issue => `
                        <li class="issue-item ${issue.severity}">
                          ${escapeHtml(issue.message)}
                        </li>
                      `).join('')}
                    </ul>`
                }
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  /**
   * Get score class for styling
   */
  function getScoreClass(score) {
    if (score >= 80) return 'healthy';
    if (score >= 60) return 'warning';
    return 'critical';
  }

  /**
   * Export health report to CSV
   */
  function exportHealthReport() {
    const csvData = healthReports.map(report => ({
      Title: report.post.title,
      Date: report.post.date,
      URL: report.post.url,
      HealthScore: report.healthScore,
      Severity: report.severity,
      IssueCount: report.issues.length,
      Issues: report.issues.map(i => i.message).join('; '),
      HasDescription: report.post.description ? 'Yes' : 'No',
      HasImage: report.post.image ? 'Yes' : 'No',
      TagCount: report.post.tags ? report.post.tags.length : 0,
      CategoryCount: report.post.categories ? report.post.categories.length : 0
    }));

    const headers = Object.keys(csvData[0]);
    const csv = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-health-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Format date
   */
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /**
   * Escape HTML
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Initialize dashboard
   */
  function init() {
    allPosts = loadPostsData();

    if (allPosts.length === 0) {
      console.error('No posts data found');
      return;
    }

    // Analyze all posts
    healthReports = allPosts.map(post => analyzePostHealth(post));

    // Update UI
    updateHealthScoreOverview();
    updateIssueCards();
    renderAllPostsHealth();

    // Event listeners
    const refreshBtn = document.getElementById('refresh-health');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        location.reload();
      });
    }

    const exportBtn = document.getElementById('export-health-report');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportHealthReport);
    }

    const filterPostsInput = document.getElementById('filter-posts');
    const filterHealthSelect = document.getElementById('filter-health');
    const sortPostsSelect = document.getElementById('sort-posts-health');

    if (filterPostsInput) {
      filterPostsInput.addEventListener('input', function() {
        const filterHealth = filterHealthSelect?.value || 'all';
        const sortBy = sortPostsSelect?.value || 'issues-desc';
        renderAllPostsHealth(filterHealth, this.value, sortBy);
      });
    }

    if (filterHealthSelect) {
      filterHealthSelect.addEventListener('change', function() {
        const filterText = filterPostsInput?.value || '';
        const sortBy = sortPostsSelect?.value || 'issues-desc';
        renderAllPostsHealth(this.value, filterText, sortBy);
      });
    }

    if (sortPostsSelect) {
      sortPostsSelect.addEventListener('change', function() {
        const filterHealth = filterHealthSelect?.value || 'all';
        const filterText = filterPostsInput?.value || '';
        renderAllPostsHealth(filterHealth, filterText, this.value);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
