/**
 * Analytics Dashboard
 * Internal analytics using Supabase page view data
 */

(function() {
  'use strict';

  // Get Supabase client from page-views.js or create new one
  const SUPABASE_URL = window.SUPABASE_URL || 'https://fmyukpxfweibodnuaifr.supabase.co';
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3NzkzNDk2NH0.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg';

  let supabase;

  // Check if Supabase is available
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase not configured');
    showError('Analytics unavailable - Supabase not configured');
    return;
  }

  // Initialize Supabase
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    showError('Failed to initialize analytics');
    return;
  }

  // Cache for data
  let allPagesData = [];

  /**
   * Format number with commas
   */
  function formatNumber(num) {
    if (num === 0) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /**
   * Format date for display
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return date.toLocaleDateString();
  }

  /**
   * Show error message
   */
  function showError(message) {
    document.querySelectorAll('.loading-skeleton').forEach(el => {
      el.textContent = message;
      el.classList.add('error');
    });
  }

  /**
   * Get site-wide statistics
   */
  async function getSiteStats() {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('view_count, unique_views');

      if (error) throw error;

      const totals = data.reduce((acc, row) => ({
        total_views: acc.total_views + (row.view_count || 0),
        total_unique: acc.total_unique + (row.unique_views || 0),
        total_pages: acc.total_pages + 1
      }), { total_views: 0, total_unique: 0, total_pages: 0 });

      return totals;
    } catch (error) {
      console.error('Error fetching site stats:', error);
      return { total_views: 0, total_unique: 0, total_pages: 0 };
    }
  }

  /**
   * Get popular posts
   */
  async function getPopularPosts(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('*')
        .order('view_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      return [];
    }
  }

  /**
   * Get all pages with search and sort
   */
  async function getAllPages() {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('*')
        .order('view_count', { ascending: false });

      if (error) throw error;
      allPagesData = data;
      return data;
    } catch (error) {
      console.error('Error fetching all pages:', error);
      return [];
    }
  }

  /**
   * Get recent activity
   */
  async function getRecentActivity(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('*')
        .order('last_viewed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  }

  /**
   * Update stats overview
   */
  async function updateStatsOverview() {
    const stats = await getSiteStats();

    document.getElementById('total-views').textContent = formatNumber(stats.total_views);
    document.getElementById('total-views').classList.remove('loading');

    document.getElementById('unique-visitors').textContent = formatNumber(stats.total_unique);
    document.getElementById('unique-visitors').classList.remove('loading');

    const avgViews = stats.total_pages > 0 ? Math.round(stats.total_views / stats.total_pages) : 0;
    document.getElementById('avg-views').textContent = formatNumber(avgViews);
    document.getElementById('avg-views').classList.remove('loading');
  }

  /**
   * Render popular posts
   */
  async function renderPopularPosts() {
    const container = document.getElementById('popular-posts');
    const posts = await getPopularPosts(10);

    if (posts.length === 0) {
      container.innerHTML = '<p class="no-data">No data available yet</p>';
      return;
    }

    container.innerHTML = posts.map((post, index) => `
      <div class="popular-post-item">
        <div class="post-rank">#${index + 1}</div>
        <div class="post-info">
          <a href="${post.page_url}" class="post-title">${post.page_title || post.page_url}</a>
          <div class="post-stats">
            <span class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              ${formatNumber(post.view_count)} views
            </span>
            <span class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              ${formatNumber(post.unique_views)} unique
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render recent activity
   */
  async function renderRecentActivity() {
    const container = document.getElementById('recent-activity');
    const activity = await getRecentActivity(10);

    if (activity.length === 0) {
      container.innerHTML = '<p class="no-data">No recent activity</p>';
      return;
    }

    container.innerHTML = activity.map(item => `
      <div class="activity-item">
        <div class="activity-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="activity-content">
          <a href="${item.page_url}" class="activity-title">${item.page_title || item.page_url}</a>
          <span class="activity-time">${formatDate(item.last_viewed_at)}</span>
        </div>
        <div class="activity-count">${formatNumber(item.view_count)} views</div>
      </div>
    `).join('');
  }

  /**
   * Render all pages table
   */
  async function renderAllPagesTable(filteredData = null) {
    const container = document.getElementById('all-pages-table');
    const data = filteredData || allPagesData;

    if (data.length === 0) {
      if (!allPagesData.length) {
        await getAllPages();
        renderAllPagesTable();
        return;
      }
      container.innerHTML = '<p class="no-data">No pages found</p>';
      return;
    }

    container.innerHTML = `
      <table class="analytics-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Total Views</th>
            <th>Unique Visitors</th>
            <th>Last Viewed</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(page => `
            <tr>
              <td>
                <a href="${page.page_url}" class="page-link">${page.page_title || page.page_url}</a>
              </td>
              <td>${formatNumber(page.view_count)}</td>
              <td>${formatNumber(page.unique_views)}</td>
              <td>${formatDate(page.last_viewed_at)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  /**
   * Handle search
   */
  function handleSearch(query) {
    if (!query) {
      renderAllPagesTable();
      return;
    }

    const filtered = allPagesData.filter(page => {
      const title = (page.page_title || '').toLowerCase();
      const url = (page.page_url || '').toLowerCase();
      const q = query.toLowerCase();
      return title.includes(q) || url.includes(q);
    });

    renderAllPagesTable(filtered);
  }

  /**
   * Handle sort
   */
  function handleSort(sortBy) {
    let sorted = [...allPagesData];

    switch(sortBy) {
      case 'views-desc':
        sorted.sort((a, b) => b.view_count - a.view_count);
        break;
      case 'views-asc':
        sorted.sort((a, b) => a.view_count - b.view_count);
        break;
      case 'unique-desc':
        sorted.sort((a, b) => b.unique_views - a.unique_views);
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.last_viewed_at) - new Date(a.last_viewed_at));
        break;
      case 'title-asc':
        sorted.sort((a, b) => (a.page_title || a.page_url).localeCompare(b.page_title || b.page_url));
        break;
    }

    renderAllPagesTable(sorted);
  }

  /**
   * Refresh all data
   */
  async function refreshAllData() {
    const btn = document.getElementById('refresh-btn');
    btn.classList.add('refreshing');
    btn.disabled = true;

    await Promise.all([
      updateStatsOverview(),
      renderPopularPosts(),
      renderRecentActivity(),
      getAllPages().then(() => renderAllPagesTable())
    ]);

    btn.classList.remove('refreshing');
    btn.disabled = false;
  }

  /**
   * Initialize dashboard
   */
  async function init() {
    // Load all data
    await refreshAllData();

    // Setup event listeners
    document.getElementById('refresh-btn')?.addEventListener('click', refreshAllData);

    document.getElementById('search-pages')?.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    document.getElementById('sort-pages')?.addEventListener('change', (e) => {
      handleSort(e.target.value);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
