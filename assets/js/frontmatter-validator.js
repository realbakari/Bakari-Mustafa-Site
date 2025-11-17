/**
 * Frontmatter Validator
 * Validates post metadata and previews SEO appearance
 */

(function() {
  'use strict';

  let allPosts = [];
  const requiredFields = ['title', 'date', 'description', 'image'];

  function loadPostsData() {
    const el = document.getElementById('posts-data');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      console.error('Error parsing posts:', e);
      return [];
    }
  }

  function validatePost(post) {
    const missing = [];
    const warnings = [];

    requiredFields.forEach(field => {
      if (!post[field] || (typeof post[field] === 'string' && post[field].trim() === '')) {
        missing.push(field);
      }
    });

    if (post.description && post.description.length < 120) {
      warnings.push(`Description short (${post.description.length} chars)`);
    }
    if (post.description && post.description.length > 160) {
      warnings.push(`Description long (${post.description.length} chars)`);
    }
    if (post.title && post.title.length > 60) {
      warnings.push(`Title long (${post.title.length} chars)`);
    }
    if (!post.tags || post.tags.length === 0) {
      warnings.push('No tags');
    }
    if (!post.categories || post.categories.length === 0) {
      warnings.push('No categories');
    }

    return {
      post,
      isValid: missing.length === 0,
      missing,
      warnings
    };
  }

  function updateStats(validations) {
    const total = validations.length;
    const valid = validations.filter(v => v.isValid).length;
    const invalid = total - valid;
    const compliance = total > 0 ? Math.round((valid / total) * 100) : 0;

    document.getElementById('total-posts').textContent = total;
    document.getElementById('valid-posts').textContent = valid;
    document.getElementById('invalid-posts').textContent = invalid;
    document.getElementById('compliance-rate').textContent = compliance + '%';
  }

  function renderFieldsCompliance(validations) {
    const container = document.getElementById('fields-compliance');
    if (!container) return;

    const fieldStats = {};
    requiredFields.forEach(field => {
      const present = validations.filter(v =>
        v.post[field] && (typeof v.post[field] !== 'string' || v.post[field].trim() !== '')
      ).length;
      fieldStats[field] = {
        present,
        missing: validations.length - present,
        percentage: Math.round((present / validations.length) * 100)
      };
    });

    container.innerHTML = Object.entries(fieldStats).map(([field, stats]) => `
      <div class="field-compliance-card">
        <div class="field-name">${field}</div>
        <div class="field-stats">
          <div class="field-bar">
            <div class="field-bar-fill" style="width: ${stats.percentage}%"></div>
          </div>
          <div class="field-numbers">
            <span class="field-present">${stats.present} present</span>
            <span class="field-missing">${stats.missing} missing</span>
          </div>
        </div>
        <div class="field-percentage ${stats.percentage === 100 ? 'complete' : ''}">${stats.percentage}%</div>
      </div>
    `).join('');
  }

  function renderTagsAndCategories(posts) {
    // Count tags
    const tagCounts = {};
    posts.forEach(p => {
      if (p.tags) {
        p.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    document.getElementById('top-tags').innerHTML = topTags.length > 0
      ? topTags.map(([tag, count]) => `
          <div class="tag-item">
            <span class="tag-name">${escapeHtml(tag)}</span>
            <span class="tag-count">${count} posts</span>
          </div>
        `).join('')
      : '<div class="empty-state">No tags found</div>';

    // Count categories
    const catCounts = {};
    posts.forEach(p => {
      if (p.categories) {
        p.categories.forEach(cat => {
          catCounts[cat] = (catCounts[cat] || 0) + 1;
        });
      }
    });

    const topCats = Object.entries(catCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    document.getElementById('top-categories').innerHTML = topCats.length > 0
      ? topCats.map(([cat, count]) => `
          <div class="tag-item">
            <span class="tag-name">${escapeHtml(cat)}</span>
            <span class="tag-count">${count} posts</span>
          </div>
        `).join('')
      : '<div class="empty-state">No categories found</div>';
  }

  function renderValidationTable(validations, filterStatus = 'all', filterText = '', sortBy = 'date-desc') {
    const container = document.getElementById('all-posts-validation');
    if (!container) return;

    let filtered = [...validations];

    if (filterStatus === 'valid') {
      filtered = filtered.filter(v => v.isValid);
    } else if (filterStatus === 'invalid') {
      filtered = filtered.filter(v => !v.isValid);
    }

    if (filterText) {
      filtered = filtered.filter(v =>
        v.post.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.post.date) - new Date(a.post.date));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.post.date) - new Date(b.post.date));
        break;
      case 'title':
        filtered.sort((a, b) => a.post.title.localeCompare(b.post.title));
        break;
      case 'issues':
        filtered.sort((a, b) => (b.missing.length + b.warnings.length) - (a.missing.length + a.warnings.length));
        break;
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state">No posts match filters</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Issues</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(v => `
            <tr class="${v.isValid ? 'valid' : 'invalid'}">
              <td class="post-title-cell">
                <a href="${escapeHtml(v.post.url)}" target="_blank">${escapeHtml(v.post.title)}</a>
              </td>
              <td class="date-cell">${formatDate(v.post.date)}</td>
              <td class="status-cell">
                <span class="status-badge ${v.isValid ? 'valid' : 'invalid'}">
                  ${v.isValid ? '✓ Valid' : '✗ Invalid'}
                </span>
              </td>
              <td class="issues-cell">
                ${v.missing.length === 0 && v.warnings.length === 0
                  ? '<span class="no-issues">None</span>'
                  : `
                    ${v.missing.length > 0 ? `<div class="missing-fields">Missing: ${v.missing.join(', ')}</div>` : ''}
                    ${v.warnings.length > 0 ? `<div class="warning-fields">${v.warnings.join('; ')}</div>` : ''}
                  `
                }
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function populatePostSelector(posts) {
    const selector = document.getElementById('post-selector');
    if (!selector) return;

    selector.innerHTML = '<option value="">Select a post...</option>' +
      posts.map((post, idx) => `
        <option value="${idx}">${escapeHtml(post.title)}</option>
      `).join('');

    selector.addEventListener('change', function() {
      const idx = this.value;
      if (idx === '') {
        document.getElementById('seo-preview-container').innerHTML =
          '<div class="empty-state">Select a post to preview</div>';
      } else {
        renderSEOPreview(posts[idx]);
      }
    });
  }

  function renderSEOPreview(post) {
    const container = document.getElementById('seo-preview-container');
    if (!container) return;

    const desc = post.description || 'No description provided';
    const truncatedDesc = desc.length > 160 ? desc.substring(0, 157) + '...' : desc;

    container.innerHTML = `
      <div class="seo-preview-section">
        <h3>Google Search Result Preview</h3>
        <div class="google-preview">
          <div class="google-url">${window.SITE_URL || 'https://yoursite.com'}${post.url}</div>
          <div class="google-title">${escapeHtml(post.title)} - ${window.SITE_TITLE || 'Your Site'}</div>
          <div class="google-description">${escapeHtml(truncatedDesc)}</div>
        </div>
      </div>

      <div class="seo-preview-section">
        <h3>Twitter Card Preview</h3>
        <div class="twitter-card">
          ${post.image ? `<div class="twitter-image" style="background-image: url('${post.image}')"></div>` : ''}
          <div class="twitter-content">
            <div class="twitter-title">${escapeHtml(post.title)}</div>
            <div class="twitter-description">${escapeHtml(truncatedDesc)}</div>
            <div class="twitter-url">${window.SITE_URL || 'yoursite.com'}</div>
          </div>
        </div>
      </div>

      <div class="seo-preview-section">
        <h3>Facebook Open Graph Preview</h3>
        <div class="facebook-card">
          ${post.image ? `<div class="facebook-image" style="background-image: url('${post.image}')"></div>` : ''}
          <div class="facebook-content">
            <div class="facebook-title">${escapeHtml(post.title)}</div>
            <div class="facebook-description">${escapeHtml(truncatedDesc)}</div>
            <div class="facebook-url">${window.SITE_URL || 'YOURSITE.COM'}</div>
          </div>
        </div>
      </div>
    `;
  }

  function exportReport(validations) {
    const csv = validations.map(v => ({
      Title: v.post.title,
      Date: v.post.date,
      Status: v.isValid ? 'Valid' : 'Invalid',
      MissingFields: v.missing.join('; '),
      Warnings: v.warnings.join('; '),
      HasDescription: v.post.description ? 'Yes' : 'No',
      HasImage: v.post.image ? 'Yes' : 'No',
      TagCount: v.post.tags ? v.post.tags.length : 0,
      CategoryCount: v.post.categories ? v.post.categories.length : 0
    }));

    const headers = Object.keys(csv[0]);
    const csvStr = [
      headers.join(','),
      ...csv.map(row => headers.map(h => {
        const val = row[h];
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvStr], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `frontmatter-validation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function init() {
    allPosts = loadPostsData();
    if (allPosts.length === 0) return;

    const validations = allPosts.map(validatePost);

    updateStats(validations);
    renderFieldsCompliance(validations);
    renderTagsAndCategories(allPosts);
    renderValidationTable(validations);
    populatePostSelector(allPosts);

    document.getElementById('refresh-frontmatter')?.addEventListener('click', () => location.reload());
    document.getElementById('export-frontmatter')?.addEventListener('click', () => exportReport(validations));

    const filterInput = document.getElementById('filter-posts-fm');
    const filterStatus = document.getElementById('filter-status-fm');
    const sortSelect = document.getElementById('sort-posts-fm');

    filterInput?.addEventListener('input', function() {
      renderValidationTable(validations, filterStatus?.value || 'all', this.value, sortSelect?.value || 'date-desc');
    });

    filterStatus?.addEventListener('change', function() {
      renderValidationTable(validations, this.value, filterInput?.value || '', sortSelect?.value || 'date-desc');
    });

    sortSelect?.addEventListener('change', function() {
      renderValidationTable(validations, filterStatus?.value || 'all', filterInput?.value || '', this.value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
