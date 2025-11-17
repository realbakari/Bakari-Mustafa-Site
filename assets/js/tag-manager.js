/**
 * Tag & Category Manager
 * Manage tags and categories across posts
 */

(function() {
  'use strict';

  let tagCounts = {};
  let categoryCounts = {};

  function loadPostsData() {
    const el = document.getElementById('posts-data');
    if (!el) return [];
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return [];
    }
  }

  function analyzeTaxonomy(posts) {
    const tags = {};
    const cats = {};

    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          if (!tags[tag]) tags[tag] = { count: 0, posts: [] };
          tags[tag].count++;
          tags[tag].posts.push({ title: post.title, url: post.url });
        });
      }

      if (post.categories) {
        post.categories.forEach(cat => {
          if (!cats[cat]) cats[cat] = { count: 0, posts: [] };
          cats[cat].count++;
          cats[cat].posts.push({ title: post.title, url: post.url });
        });
      }
    });

    return { tags, cats };
  }

  function findSimilarTags(tags) {
    const similar = [];
    const tagNames = Object.keys(tags);

    for (let i = 0; i < tagNames.length; i++) {
      for (let j = i + 1; j < tagNames.length; j++) {
        const tag1 = tagNames[i].toLowerCase();
        const tag2 = tagNames[j].toLowerCase();

        // Check for exact case-insensitive match
        if (tag1 === tag2) {
          similar.push({
            tags: [tagNames[i], tagNames[j]],
            reason: 'Case difference',
            counts: [tags[tagNames[i]].count, tags[tagNames[j]].count]
          });
        }
        // Check for similar strings
        else if (tag1.includes(tag2) || tag2.includes(tag1)) {
          similar.push({
            tags: [tagNames[i], tagNames[j]],
            reason: 'Similar names',
            counts: [tags[tagNames[i]].count, tags[tagNames[j]].count]
          });
        }
      }
    }

    return similar;
  }

  function updateStats() {
    const totalTags = Object.keys(tagCounts).length;
    const totalCats = Object.keys(categoryCounts).length;
    const orphanTags = Object.values(tagCounts).filter(t => t.count <= 2).length;
    const similar = findSimilarTags(tagCounts).length;

    document.getElementById('total-tags').textContent = totalTags;
    document.getElementById('total-categories').textContent = totalCats;
    document.getElementById('orphan-tags').textContent = orphanTags;
    document.getElementById('similar-tags').textContent = similar;
  }

  function renderSimilarTags() {
    const container = document.getElementById('similar-tags-list');
    if (!container) return;

    const similar = findSimilarTags(tagCounts);

    if (similar.length === 0) {
      container.innerHTML = '<div class="empty-state">✓ No similar tags found!</div>';
      return;
    }

    container.innerHTML = similar.map(item => `
      <div class="similar-tag-card">
        <div class="similar-tags">
          ${item.tags.map((tag, idx) => `
            <span class="tag-badge">${escapeHtml(tag)} (${item.counts[idx]})</span>
          `).join(' <span class="similar-arrow">→</span> ')}
        </div>
        <div class="similar-reason">${item.reason}</div>
      </div>
    `).join('');
  }

  function renderOrphanTags() {
    const container = document.getElementById('orphan-tags-list');
    if (!container) return;

    const orphans = Object.entries(tagCounts)
      .filter(([_, data]) => data.count <= 2)
      .sort((a, b) => a[1].count - b[1].count);

    if (orphans.length === 0) {
      container.innerHTML = '<div class="empty-state">✓ All tags used in 3+ posts!</div>';
      return;
    }

    container.innerHTML = orphans.map(([tag, data]) => `
      <div class="orphan-tag-card">
        <span class="tag-badge">${escapeHtml(tag)}</span>
        <span class="tag-count">${data.count} post${data.count > 1 ? 's' : ''}</span>
        <div class="tag-posts">
          ${data.posts.map(p => `
            <a href="${escapeHtml(p.url)}" target="_blank">${escapeHtml(p.title)}</a>
          `).join(', ')}
        </div>
      </div>
    `).join('');
  }

  function renderTagsTable(filterText = '', sortBy = 'count-desc') {
    const container = document.getElementById('all-tags-table');
    if (!container) return;

    let tags = Object.entries(tagCounts);

    if (filterText) {
      tags = tags.filter(([tag]) => tag.toLowerCase().includes(filterText.toLowerCase()));
    }

    switch (sortBy) {
      case 'count-desc':
        tags.sort((a, b) => b[1].count - a[1].count);
        break;
      case 'count-asc':
        tags.sort((a, b) => a[1].count - b[1].count);
        break;
      case 'name':
        tags.sort((a, b) => a[0].localeCompare(b[0]));
        break;
    }

    if (tags.length === 0) {
      container.innerHTML = '<div class="empty-state">No tags match filter</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Post Count</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          ${tags.map(([tag, data]) => `
            <tr>
              <td class="tag-name-cell">
                <span class="tag-badge">${escapeHtml(tag)}</span>
              </td>
              <td class="count-cell">${data.count}</td>
              <td class="posts-cell">
                ${data.posts.slice(0, 3).map(p => `
                  <a href="${escapeHtml(p.url)}" target="_blank">${escapeHtml(p.title)}</a>
                `).join(', ')}
                ${data.count > 3 ? ` +${data.count - 3} more` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderCategoriesTable() {
    const container = document.getElementById('all-categories-table');
    if (!container) return;

    const cats = Object.entries(categoryCounts).sort((a, b) => b[1].count - a[1].count);

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Post Count</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          ${cats.map(([cat, data]) => `
            <tr>
              <td class="cat-name-cell">
                <span class="category-badge">${escapeHtml(cat)}</span>
              </td>
              <td class="count-cell">${data.count}</td>
              <td class="posts-cell">
                ${data.posts.slice(0, 3).map(p => `
                  <a href="${escapeHtml(p.url)}" target="_blank">${escapeHtml(p.title)}</a>
                `).join(', ')}
                ${data.count > 3 ? ` +${data.count - 3} more` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function init() {
    const posts = loadPostsData();
    const { tags, cats } = analyzeTaxonomy(posts);
    tagCounts = tags;
    categoryCounts = cats;

    updateStats();
    renderSimilarTags();
    renderOrphanTags();
    renderTagsTable();
    renderCategoriesTable();

    document.getElementById('refresh-tags')?.addEventListener('click', () => location.reload());

    const filterInput = document.getElementById('filter-tags');
    const sortSelect = document.getElementById('sort-tags');

    filterInput?.addEventListener('input', function() {
      renderTagsTable(this.value, sortSelect?.value || 'count-desc');
    });

    sortSelect?.addEventListener('change', function() {
      renderTagsTable(filterInput?.value || '', this.value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
