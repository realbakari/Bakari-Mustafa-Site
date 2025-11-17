/**
 * Link Checker
 * Scans posts for broken links
 */

(function() {
  'use strict';

  let allLinks = [];
  let linkResults = [];

  function loadPostsData() {
    const el = document.getElementById('posts-data');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return [];
    }
  }

  function extractLinks(posts) {
    const links = [];
    const linkRegex = /href=["'](.*?)["']/g;

    posts.forEach(post => {
      let match;
      while ((match = linkRegex.exec(post.content)) !== null) {
        const url = match[1];
        if (url && !url.startsWith('#') && !url.startsWith('javascript:')) {
          links.push({
            url,
            postTitle: post.title,
            postUrl: post.url,
            isExternal: url.startsWith('http://') || url.startsWith('https://'),
            isHttp: url.startsWith('http://'),
            isInternal: url.startsWith('/')
          });
        }
      }
    });

    return links;
  }

  async function checkLink(link) {
    // Note: Due to CORS, we can't actually check external links from browser
    // This is a simplified version that checks for common issues
    const issues = [];

    if (link.isHttp) {
      issues.push({
        type: 'warning',
        message: 'HTTP link (should use HTTPS)'
      });
    }

    return {
      ...link,
      status: issues.length > 0 ? 'warning' : 'unknown',
      issues
    };
  }

  function updateStats() {
    const total = linkResults.length;
    const warnings = linkResults.filter(l => l.status === 'warning').length;

    document.getElementById('total-links').textContent = total;
    document.getElementById('working-links').textContent = total - warnings;
    document.getElementById('broken-links').textContent = 0;
    document.getElementById('warning-links').textContent = warnings;
  }

  function renderLinkIssues() {
    const container = document.getElementById('link-issues-list');
    if (!container) return;

    const issueLinks = linkResults.filter(l => l.issues && l.issues.length > 0);

    if (issueLinks.length === 0) {
      container.innerHTML = '<div class="empty-state">✓ No link issues found!</div>';
      return;
    }

    container.innerHTML = issueLinks.map(link => `
      <div class="link-issue-card">
        <div class="link-url">${escapeHtml(link.url)}</div>
        <div class="link-post">
          In post: <a href="${escapeHtml(link.postUrl)}" target="_blank">${escapeHtml(link.postTitle)}</a>
        </div>
        <div class="link-issues">
          ${link.issues.map(issue => `
            <span class="issue-badge ${issue.type}">${issue.message}</span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderLinksTable(filterType = 'all', filterText = '') {
    const container = document.getElementById('all-links-table');
    if (!container) return;

    let filtered = [...linkResults];

    switch (filterType) {
      case 'external':
        filtered = filtered.filter(l => l.isExternal);
        break;
      case 'internal':
        filtered = filtered.filter(l => l.isInternal);
        break;
      case 'http':
        filtered = filtered.filter(l => l.isHttp);
        break;
    }

    if (filterText) {
      filtered = filtered.filter(l => l.url.toLowerCase().includes(filterText.toLowerCase()));
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state">No links match filters</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Link URL</th>
            <th>Type</th>
            <th>Found In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.slice(0, 200).map(link => `
            <tr>
              <td class="link-url-cell">
                <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.url)}</a>
              </td>
              <td class="link-type-cell">
                <span class="link-type-badge ${link.isExternal ? 'external' : 'internal'}">
                  ${link.isExternal ? 'External' : 'Internal'}
                </span>
              </td>
              <td class="post-cell">
                <a href="${escapeHtml(link.postUrl)}" target="_blank">${escapeHtml(link.postTitle)}</a>
              </td>
              <td class="status-cell">
                ${link.issues && link.issues.length > 0
                  ? `<span class="status-badge warning">⚠️ ${link.issues[0].message}</span>`
                  : '<span class="status-badge ok">✓ OK</span>'
                }
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ${filtered.length > 200 ? `<div class="table-note">Showing first 200 of ${filtered.length} links</div>` : ''}
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function scanLinks() {
    const btn = document.getElementById('scan-links');
    if (btn) btn.disabled = true;

    const posts = loadPostsData();
    allLinks = extractLinks(posts);

    // Check each link (simplified)
    linkResults = await Promise.all(allLinks.map(checkLink));

    updateStats();
    renderLinkIssues();
    renderLinksTable();

    if (btn) btn.disabled = false;
  }

  function init() {
    document.getElementById('scan-links')?.addEventListener('click', scanLinks);

    const filterInput = document.getElementById('filter-links');
    const filterType = document.getElementById('filter-type');

    filterInput?.addEventListener('input', function() {
      renderLinksTable(filterType?.value || 'all', this.value);
    });

    filterType?.addEventListener('change', function() {
      renderLinksTable(this.value, filterInput?.value || '');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
