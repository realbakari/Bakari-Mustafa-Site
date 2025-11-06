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
  let currentDateRange = 30; // Default 30 days
  let customStartDate = null;
  let customEndDate = null;

  /**
   * Format number with commas
   */
  function formatNumber(num) {
    if (num === 0) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /**
   * Get date range filter for queries
   */
  function getDateFilter() {
    if (customStartDate && customEndDate) {
      return {
        start: customStartDate,
        end: customEndDate
      };
    }

    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - currentDateRange);

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  }

  /**
   * Export data to CSV
   */
  function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
      });
      csv += values.join(',') + '\n';
    });

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
   * Get referrer statistics
   */
  async function getReferrerStats() {
    try {
      const { data, error } = await supabase
        .from('page_view_logs')
        .select('referrer_domain, referrer_type');

      if (error) throw error;

      // Count by domain
      const byDomain = {};
      const byType = { direct: 0, search: 0, social: 0, internal: 0, external: 0 };

      data.forEach(row => {
        // Count by type
        if (row.referrer_type) {
          byType[row.referrer_type] = (byType[row.referrer_type] || 0) + 1;
        }

        // Count by domain (exclude internal and direct)
        if (row.referrer_domain && row.referrer_type !== 'internal' && row.referrer_type !== 'direct') {
          byDomain[row.referrer_domain] = (byDomain[row.referrer_domain] || 0) + 1;
        }
      });

      // Convert to array and sort
      const topReferrers = Object.entries(byDomain)
        .map(([domain, count]) => ({ domain, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return { byType, topReferrers };
    } catch (error) {
      console.error('Error fetching referrer stats:', error);
      return { byType: {}, topReferrers: [] };
    }
  }

  /**
   * Get device/browser statistics
   */
  async function getDeviceBrowserStats() {
    try {
      const { data, error } = await supabase
        .from('page_view_logs')
        .select('device_type, browser_name, os_name');

      if (error) throw error;

      const byDevice = {};
      const byBrowser = {};
      const byOS = {};

      data.forEach(row => {
        if (row.device_type) {
          byDevice[row.device_type] = (byDevice[row.device_type] || 0) + 1;
        }
        if (row.browser_name) {
          byBrowser[row.browser_name] = (byBrowser[row.browser_name] || 0) + 1;
        }
        if (row.os_name) {
          byOS[row.os_name] = (byOS[row.os_name] || 0) + 1;
        }
      });

      return { byDevice, byBrowser, byOS };
    } catch (error) {
      console.error('Error fetching device/browser stats:', error);
      return { byDevice: {}, byBrowser: {}, byOS: {} };
    }
  }

  /**
   * Get views by date for trends
   */
  async function getViewsByDate(days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      const startDateStr = startDate.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('page_view_logs')
        .select('viewed_date')
        .gte('viewed_date', startDateStr)
        .order('viewed_date', { ascending: true });

      if (error) throw error;

      // Count views per date
      const viewsByDate = {};
      data.forEach(row => {
        if (row.viewed_date) {
          viewsByDate[row.viewed_date] = (viewsByDate[row.viewed_date] || 0) + 1;
        }
      });

      // Fill in missing dates with 0
      const result = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        result.push({
          date: dateStr,
          count: viewsByDate[dateStr] || 0
        });
      }

      return result;
    } catch (error) {
      console.error('Error fetching views by date:', error);
      return [];
    }
  }

  /**
   * Render referrer stats
   */
  async function renderReferrerStats() {
    const container = document.getElementById('referrer-stats');
    if (!container) return;

    const { byType, topReferrers } = await getReferrerStats();

    const total = Object.values(byType).reduce((sum, count) => sum + count, 0);

    if (total === 0) {
      container.innerHTML = '<p class="no-data">No referrer data yet</p>';
      return;
    }

    const typeLabels = {
      direct: 'Direct',
      search: 'Search Engines',
      social: 'Social Media',
      internal: 'Internal',
      external: 'External'
    };

    container.innerHTML = `
      <div class="referrer-types">
        ${Object.entries(byType).filter(([_, count]) => count > 0).map(([type, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          return `
            <div class="stat-bar">
              <div class="stat-bar-label">
                <span>${typeLabels[type] || type}</span>
                <span>${formatNumber(count)} (${percentage}%)</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="width: ${percentage}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      ${topReferrers.length > 0 ? `
        <div class="top-referrers">
          <h4>Top External Referrers</h4>
          <div class="referrer-list">
            ${topReferrers.map(ref => `
              <div class="referrer-item">
                <span class="referrer-domain">${ref.domain}</span>
                <span class="referrer-count">${formatNumber(ref.count)} visits</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  /**
   * Render device/browser stats
   */
  async function renderDeviceBrowserStats() {
    const deviceContainer = document.getElementById('device-stats');
    const browserContainer = document.getElementById('browser-stats');

    if (!deviceContainer || !browserContainer) return;

    const { byDevice, byBrowser, byOS } = await getDeviceBrowserStats();

    // Render device stats
    const deviceTotal = Object.values(byDevice).reduce((sum, count) => sum + count, 0);
    if (deviceTotal === 0) {
      deviceContainer.innerHTML = '<p class="no-data">No device data yet</p>';
    } else {
      deviceContainer.innerHTML = Object.entries(byDevice).map(([device, count]) => {
        const percentage = ((count / deviceTotal) * 100).toFixed(1);
        const icon = device === 'mobile' ? '📱' : device === 'tablet' ? '📲' : '💻';
        return `
          <div class="device-stat">
            <span class="device-icon">${icon}</span>
            <span class="device-name">${device.charAt(0).toUpperCase() + device.slice(1)}</span>
            <span class="device-percentage">${percentage}%</span>
            <span class="device-count">${formatNumber(count)}</span>
          </div>
        `;
      }).join('');
    }

    // Render browser stats
    const browserTotal = Object.values(byBrowser).reduce((sum, count) => sum + count, 0);
    if (browserTotal === 0) {
      browserContainer.innerHTML = '<p class="no-data">No browser data yet</p>';
    } else {
      const sortedBrowsers = Object.entries(byBrowser)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Top 5 browsers

      browserContainer.innerHTML = sortedBrowsers.map(([browser, count]) => {
        const percentage = ((count / browserTotal) * 100).toFixed(1);
        return `
          <div class="browser-stat">
            <span class="browser-name">${browser}</span>
            <div class="browser-bar">
              <div class="browser-bar-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="browser-percentage">${percentage}%</span>
          </div>
        `;
      }).join('');
    }
  }

  /**
   * Render traffic chart
   */
  async function renderTrafficChart() {
    const canvas = document.getElementById('traffic-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const viewsData = await getViewsByDate(30);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: viewsData.map(d => {
          const date = new Date(d.date);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [{
          label: 'Page Views',
          data: viewsData.map(d => d.count),
          borderColor: '#000',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  /**
   * Get entry/exit page statistics
   */
  async function getEntryExitPages() {
    try {
      const dateFilter = getDateFilter();

      // Get top entry pages
      const { data: entryData, error: entryError } = await supabase
        .from('page_view_logs')
        .select('page_url, page_title')
        .eq('is_entry_page', true)
        .gte('viewed_date', dateFilter.start)
        .lte('viewed_date', dateFilter.end);

      if (entryError) throw entryError;

      // Get top exit pages
      const { data: exitData, error: exitError } = await supabase
        .from('page_view_logs')
        .select('page_url, page_title')
        .eq('is_exit_page', true)
        .gte('viewed_date', dateFilter.start)
        .lte('viewed_date', dateFilter.end);

      if (exitError) throw exitError;

      // Count entries
      const entryCounts = {};
      entryData.forEach(row => {
        const key = row.page_url;
        entryCounts[key] = entryCounts[key] || { url: row.page_url, title: row.page_title, count: 0 };
        entryCounts[key].count++;
      });

      // Count exits
      const exitCounts = {};
      exitData.forEach(row => {
        const key = row.page_url;
        exitCounts[key] = exitCounts[key] || { url: row.page_url, title: row.page_title, count: 0 };
        exitCounts[key].count++;
      });

      const topEntries = Object.values(entryCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      const topExits = Object.values(exitCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return { topEntries, topExits };
    } catch (error) {
      console.error('Error fetching entry/exit pages:', error);
      return { topEntries: [], topExits: [] };
    }
  }

  /**
   * Get search query analytics
   */
  async function getSearchAnalytics() {
    try {
      const dateFilter = getDateFilter();

      const { data, error } = await supabase
        .from('search_queries')
        .select('*')
        .gte('searched_date', dateFilter.start)
        .lte('searched_date', dateFilter.end);

      if (error) throw error;

      // Count by query
      const queryCounts = {};
      let totalSearches = 0;
      let zeroResultSearches = 0;

      data.forEach(row => {
        totalSearches++;
        if (row.results_count === 0) zeroResultSearches++;

        const query = row.query.toLowerCase();
        queryCounts[query] = queryCounts[query] || { query: row.query, count: 0, avgResults: [] };
        queryCounts[query].count++;
        queryCounts[query].avgResults.push(row.results_count || 0);
      });

      // Calculate averages and sort
      const popularSearches = Object.values(queryCounts)
        .map(item => ({
          query: item.query,
          count: item.count,
          avgResults: Math.round(item.avgResults.reduce((a, b) => a + b, 0) / item.avgResults.length)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      return {
        popularSearches,
        totalSearches,
        zeroResultSearches,
        zeroResultRate: totalSearches > 0 ? ((zeroResultSearches / totalSearches) * 100).toFixed(1) : 0
      };
    } catch (error) {
      console.error('Error fetching search analytics:', error);
      return { popularSearches: [], totalSearches: 0, zeroResultSearches: 0, zeroResultRate: 0 };
    }
  }

  /**
   * Get 404 error analytics
   */
  async function get404Errors() {
    try {
      const dateFilter = getDateFilter();

      const { data, error } = await supabase
        .from('error_404_logs')
        .select('*')
        .gte('occurred_date', dateFilter.start)
        .lte('occurred_date', dateFilter.end);

      if (error) throw error;

      // Count by URL
      const urlCounts = {};
      const referrerCounts = {};

      data.forEach(row => {
        // Count URLs
        urlCounts[row.requested_url] = urlCounts[row.requested_url] || { url: row.requested_url, count: 0 };
        urlCounts[row.requested_url].count++;

        // Count referrers (where broken links come from)
        if (row.referrer) {
          const ref = row.referrer;
          referrerCounts[ref] = referrerCounts[ref] || { referrer: ref, count: 0 };
          referrerCounts[ref].count++;
        }
      });

      const topBrokenLinks = Object.values(urlCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 15);

      const topReferrers = Object.values(referrerCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        topBrokenLinks,
        topReferrers,
        total404s: data.length
      };
    } catch (error) {
      console.error('Error fetching 404 errors:', error);
      return { topBrokenLinks: [], topReferrers: [], total404s: 0 };
    }
  }

  /**
   * Get active visitors (real-time)
   */
  async function getActiveVisitors() {
    try {
      // Clean up old sessions first
      await supabase.rpc('cleanup_old_sessions');

      // Get active sessions (last 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from('active_sessions')
        .select('*')
        .gte('last_seen_at', fiveMinutesAgo);

      if (error) throw error;

      return {
        count: data.length,
        sessions: data
      };
    } catch (error) {
      console.error('Error fetching active visitors:', error);
      return { count: 0, sessions: [] };
    }
  }

  /**
   * Refresh all data
   */
  async function refreshAllData() {
    const btn = document.getElementById('refresh-btn');
    if (btn) {
      btn.classList.add('refreshing');
      btn.disabled = true;
    }

    await Promise.all([
      updateStatsOverview(),
      renderPopularPosts(),
      renderRecentActivity(),
      getAllPages().then(() => renderAllPagesTable()),
      renderReferrerStats(),
      renderDeviceBrowserStats(),
      renderTrafficChart(),
      renderEntryExitPages(),
      renderSearchAnalytics(),
      render404Errors(),
      renderActiveVisitors()
    ]);

    if (btn) {
      btn.classList.remove('refreshing');
      btn.disabled = false;
    }
  }

  /**
   * Render entry/exit page analytics
   */
  async function renderEntryExitPages() {
    const entryContainer = document.getElementById('entry-pages');
    const exitContainer = document.getElementById('exit-pages');

    if (!entryContainer || !exitContainer) return;

    const { topEntries, topExits } = await getEntryExitPages();

    // Render entry pages
    if (topEntries.length === 0) {
      entryContainer.innerHTML = '<p class="no-data">No entry page data yet</p>';
    } else {
      entryContainer.innerHTML = topEntries.map((page, index) => `
        <div class="entry-exit-item">
          <span class="rank">#${index + 1}</span>
          <div class="page-info">
            <a href="${page.url}" class="page-title">${page.title || page.url}</a>
            <span class="page-url">${page.url}</span>
          </div>
          <span class="count">${formatNumber(page.count)} entries</span>
        </div>
      `).join('');
    }

    // Render exit pages
    if (topExits.length === 0) {
      exitContainer.innerHTML = '<p class="no-data">No exit page data yet</p>';
    } else {
      exitContainer.innerHTML = topExits.map((page, index) => `
        <div class="entry-exit-item">
          <span class="rank">#${index + 1}</span>
          <div class="page-info">
            <a href="${page.url}" class="page-title">${page.title || page.url}</a>
            <span class="page-url">${page.url}</span>
          </div>
          <span class="count">${formatNumber(page.count)} exits</span>
        </div>
      `).join('');
    }
  }

  /**
   * Render search analytics
   */
  async function renderSearchAnalytics() {
    const container = document.getElementById('search-analytics');
    if (!container) return;

    const { popularSearches, totalSearches, zeroResultSearches, zeroResultRate } = await getSearchAnalytics();

    if (totalSearches === 0) {
      container.innerHTML = '<p class="no-data">No search data yet</p>';
      return;
    }

    container.innerHTML = `
      <div class="search-stats-summary">
        <div class="search-stat">
          <span class="stat-value">${formatNumber(totalSearches)}</span>
          <span class="stat-label">Total Searches</span>
        </div>
        <div class="search-stat">
          <span class="stat-value">${formatNumber(zeroResultSearches)}</span>
          <span class="stat-label">Zero Results</span>
        </div>
        <div class="search-stat">
          <span class="stat-value">${zeroResultRate}%</span>
          <span class="stat-label">Zero Result Rate</span>
        </div>
      </div>
      <div class="popular-searches-list">
        ${popularSearches.map((search, index) => `
          <div class="search-item">
            <span class="search-rank">#${index + 1}</span>
            <div class="search-query">
              <span class="query-text">"${search.query}"</span>
              <span class="query-stats">${search.count} searches • ${search.avgResults} avg results</span>
            </div>
            ${search.avgResults === 0 ? '<span class="zero-results-badge">No Results</span>' : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render 404 error analytics
   */
  async function render404Errors() {
    const container = document.getElementById('error-404-analytics');
    if (!container) return;

    const { topBrokenLinks, topReferrers, total404s } = await get404Errors();

    if (total404s === 0) {
      container.innerHTML = '<p class="no-data">No 404 errors yet (that\'s good!)</p>';
      return;
    }

    container.innerHTML = `
      <div class="error-summary">
        <div class="error-stat">
          <span class="stat-value">${formatNumber(total404s)}</span>
          <span class="stat-label">Total 404 Errors</span>
        </div>
        <div class="error-stat">
          <span class="stat-value">${topBrokenLinks.length}</span>
          <span class="stat-label">Unique Broken URLs</span>
        </div>
      </div>
      <div class="broken-links-section">
        <h4>Most Common Broken Links</h4>
        <div class="broken-links-list">
          ${topBrokenLinks.map((link, index) => `
            <div class="broken-link-item">
              <span class="link-rank">#${index + 1}</span>
              <div class="link-info">
                <code class="broken-url">${link.url}</code>
                <span class="error-count">${formatNumber(link.count)} errors</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ${topReferrers.length > 0 ? `
        <div class="error-referrers-section">
          <h4>Where Broken Links Come From</h4>
          <div class="error-referrers-list">
            ${topReferrers.map(ref => `
              <div class="error-referrer-item">
                <span class="referrer-url">${ref.referrer}</span>
                <span class="referrer-count">${formatNumber(ref.count)} links</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  /**
   * Render active visitors (real-time)
   */
  async function renderActiveVisitors() {
    const container = document.getElementById('active-visitors');
    const countElement = document.getElementById('active-visitors-count');

    if (!container && !countElement) return;

    const { count, sessions } = await getActiveVisitors();

    // Update count badge
    if (countElement) {
      countElement.textContent = count;
      countElement.classList.toggle('has-visitors', count > 0);
    }

    // Update detailed list
    if (container) {
      if (count === 0) {
        container.innerHTML = '<p class="no-data">No active visitors right now</p>';
      } else {
        container.innerHTML = sessions.map(session => {
          const lastSeen = new Date(session.last_seen_at);
          const secondsAgo = Math.floor((Date.now() - lastSeen.getTime()) / 1000);
          const timeAgo = secondsAgo < 60 ? 'Just now' : `${Math.floor(secondsAgo / 60)}m ago`;

          return `
            <div class="active-visitor-item">
              <div class="visitor-device">
                ${session.device_type === 'mobile' ? '📱' : session.device_type === 'tablet' ? '📲' : '💻'}
              </div>
              <div class="visitor-info">
                <span class="visitor-page">${session.current_page_title || session.current_page_url}</span>
                <span class="visitor-meta">${session.browser_name} • ${timeAgo}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  /**
   * Handle date range change
   */
  function handleDateRangeChange(range) {
    customStartDate = null;
    customEndDate = null;

    if (range === 'custom') {
      // Show custom date picker (will be handled by UI)
      const modal = document.getElementById('custom-date-modal');
      if (modal) modal.style.display = 'flex';
      return;
    }

    currentDateRange = parseInt(range);
    refreshAllData();
  }

  /**
   * Apply custom date range
   */
  function applyCustomDateRange(startDate, endDate) {
    customStartDate = startDate;
    customEndDate = endDate;
    refreshAllData();
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

    // Date range filter
    document.getElementById('date-range-select')?.addEventListener('change', (e) => {
      handleDateRangeChange(e.target.value);
    });

    // Custom date range
    document.getElementById('apply-custom-date')?.addEventListener('click', () => {
      const startDate = document.getElementById('start-date')?.value;
      const endDate = document.getElementById('end-date')?.value;
      if (startDate && endDate) {
        applyCustomDateRange(startDate, endDate);
        document.getElementById('custom-date-modal').style.display = 'none';
      }
    });

    document.getElementById('cancel-custom-date')?.addEventListener('click', () => {
      document.getElementById('custom-date-modal').style.display = 'none';
    });

    // Export buttons
    document.getElementById('export-all-pages')?.addEventListener('click', () => {
      exportToCSV(allPagesData, `analytics-all-pages-${new Date().toISOString().split('T')[0]}.csv`);
    });

    document.getElementById('export-popular')?.addEventListener('click', async () => {
      const data = await getPopularPosts(50);
      exportToCSV(data, `analytics-popular-posts-${new Date().toISOString().split('T')[0]}.csv`);
    });

    document.getElementById('export-searches')?.addEventListener('click', async () => {
      const { popularSearches } = await getSearchAnalytics();
      exportToCSV(popularSearches, `analytics-searches-${new Date().toISOString().split('T')[0]}.csv`);
    });

    document.getElementById('export-404s')?.addEventListener('click', async () => {
      const { topBrokenLinks } = await get404Errors();
      exportToCSV(topBrokenLinks, `analytics-404-errors-${new Date().toISOString().split('T')[0]}.csv`);
    });

    // Real-time auto-refresh (every 30 seconds for active visitors)
    setInterval(() => {
      renderActiveVisitors();
    }, 30000); // 30 seconds
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
