/**
 * Image Manager
 * Tracks image usage and optimization opportunities
 */

(function() {
  'use strict';

  let allImages = [];

  function loadPostsData() {
    const el = document.getElementById('posts-data');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return [];
    }
  }

  function extractImages(posts) {
    const images = [];
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?[^>]*>/g;

    posts.forEach(post => {
      // Featured image
      if (post.image) {
        images.push({
          url: post.image,
          alt: '',
          type: 'featured',
          postTitle: post.title,
          postUrl: post.url,
          isExternal: post.image.startsWith('http')
        });
      }

      // Content images
      let match;
      while ((match = imgRegex.exec(post.content)) !== null) {
        images.push({
          url: match[1],
          alt: match[2] || '',
          type: 'content',
          postTitle: post.title,
          postUrl: post.url,
          isExternal: match[1].startsWith('http')
        });
      }
    });

    return images;
  }

  function updateStats() {
    const total = allImages.length;
    const featured = allImages.filter(img => img.type === 'featured').length;
    const content = allImages.filter(img => img.type === 'content').length;
    const missingAlt = allImages.filter(img => !img.alt || img.alt.trim() === '').length;

    document.getElementById('total-images').textContent = total;
    document.getElementById('featured-images').textContent = featured;
    document.getElementById('content-images').textContent = content;
    document.getElementById('missing-alt').textContent = missingAlt;
  }

  function renderMissingAlt() {
    const container = document.getElementById('missing-alt-list');
    if (!container) return;

    const missingAlt = allImages.filter(img => !img.alt || img.alt.trim() === '');

    if (missingAlt.length === 0) {
      container.innerHTML = '<div class="empty-state">✓ All images have alt text!</div>';
      return;
    }

    container.innerHTML = missingAlt.slice(0, 20).map(img => `
      <div class="image-issue-card">
        <div class="image-preview" style="background-image: url('${escapeHtml(img.url)}')"></div>
        <div class="image-info">
          <div class="image-url">${escapeHtml(img.url)}</div>
          <div class="image-post">
            In post: <a href="${escapeHtml(img.postUrl)}" target="_blank">${escapeHtml(img.postTitle)}</a>
          </div>
          <span class="image-type-badge ${img.type}">${img.type}</span>
        </div>
      </div>
    `).join('');

    if (missingAlt.length > 20) {
      container.innerHTML += `<div class="table-note">Showing 20 of ${missingAlt.length} images</div>`;
    }
  }

  function renderImagesTable(filterType = 'all', filterText = '') {
    const container = document.getElementById('all-images-table');
    if (!container) return;

    let filtered = [...allImages];

    switch (filterType) {
      case 'featured':
        filtered = filtered.filter(img => img.type === 'featured');
        break;
      case 'content':
        filtered = filtered.filter(img => img.type === 'content');
        break;
      case 'external':
        filtered = filtered.filter(img => img.isExternal);
        break;
    }

    if (filterText) {
      filtered = filtered.filter(img =>
        img.url.toLowerCase().includes(filterText.toLowerCase()) ||
        img.postTitle.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state">No images match filters</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Type</th>
            <th>Alt Text</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.slice(0, 100).map(img => `
            <tr>
              <td class="image-cell">
                <div class="image-thumb" style="background-image: url('${escapeHtml(img.url)}')"></div>
                <a href="${escapeHtml(img.url)}" target="_blank" class="image-url-link">${escapeHtml(img.url.substring(0, 50))}...</a>
              </td>
              <td class="type-cell">
                <span class="image-type-badge ${img.type}">${img.type}</span>
              </td>
              <td class="alt-cell">
                ${img.alt ? escapeHtml(img.alt) : '<span class="missing-alt-text">❌ Missing</span>'}
              </td>
              <td class="post-cell">
                <a href="${escapeHtml(img.postUrl)}" target="_blank">${escapeHtml(img.postTitle)}</a>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ${filtered.length > 100 ? `<div class="table-note">Showing 100 of ${filtered.length} images</div>` : ''}
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function init() {
    const posts = loadPostsData();
    allImages = extractImages(posts);

    updateStats();
    renderMissingAlt();
    renderImagesTable();

    document.getElementById('refresh-images')?.addEventListener('click', () => location.reload());

    const filterInput = document.getElementById('filter-images');
    const filterType = document.getElementById('filter-image-type');

    filterInput?.addEventListener('input', function() {
      renderImagesTable(filterType?.value || 'all', this.value);
    });

    filterType?.addEventListener('change', function() {
      renderImagesTable(this.value, filterInput?.value || '');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
