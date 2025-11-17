/**
 * Search Analytics Dashboard
 * Dedicated view for analyzing search queries and trends
 */

(function() {
  'use strict';

  const SUPABASE_URL = window.SUPABASE_URL;
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Supabase credentials not found');
    return;
  }

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  let currentDateRange = 30;
  let allQueriesData = [];

  /**
   * Format number with commas
   */
  function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
  }

  /**
   * Format date
   */
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /**
   * Format time
   */
  function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  /**
   * Calculate date range
   */
  function getDateRange(days) {
    const endDate = new Date();
    const startDate = new Date();
    if (days !== 'all') {
      startDate.setDate(startDate.getDate() - parseInt(days));
    } else {
      startDate.setFullYear(2020); // Beginning of time
    }
    return { startDate, endDate };
  }

  /**
   * Fetch search queries from Supabase
   */
  async function fetchSearchQueries(dateRange) {
    try {
      const { startDate, endDate } = getDateRange(dateRange);

      let query = supabase
        .from('search_queries')
        .select('*');

      if (dateRange !== 'all') {
        query = query
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString());
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching search queries:', error);
      return [];
    }
  }

  /**
   * Update key metrics
   */
  function updateKeyMetrics(queries) {
    const totalSearches = queries.length;
    const uniqueQueries = new Set(queries.map(q => q.query.toLowerCase())).size;
    const zeroResultQueries = queries.filter(q => q.results_count === 0).length;

    // Calculate avg searches per day
    const { startDate, endDate } = getDateRange(currentDateRange);
    const daysDiff = currentDateRange === 'all'
      ? Math.ceil((endDate - new Date(Math.min(...queries.map(q => new Date(q.created_at))))) / (1000 * 60 * 60 * 24))
      : parseInt(currentDateRange);
    const avgPerDay = daysDiff > 0 ? (totalSearches / daysDiff).toFixed(1) : 0;

    document.getElementById('total-searches').textContent = formatNumber(totalSearches);
    document.getElementById('unique-queries').textContent = formatNumber(uniqueQueries);
    document.getElementById('avg-searches-per-day').textContent = avgPerDay;
    document.getElementById('zero-result-queries').textContent = formatNumber(zeroResultQueries);

    // Remove loading state
    document.querySelectorAll('.stat-value.loading').forEach(el => el.classList.remove('loading'));
  }

  /**
   * Render search trends chart
   */
  function renderSearchTrendsChart(queries) {
    const canvas = document.getElementById('search-trends-chart');
    if (!canvas) return;

    // Group by date
    const dateGroups = {};
    queries.forEach(q => {
      const date = new Date(q.created_at).toISOString().split('T')[0];
      dateGroups[date] = (dateGroups[date] || 0) + 1;
    });

    // Sort dates and create arrays
    const dates = Object.keys(dateGroups).sort();
    const counts = dates.map(date => dateGroups[date]);

    // Destroy existing chart if any
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    // Create chart
    const ctx = canvas.getContext('2d');
    canvas.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.map(date => formatDate(date)),
        datasets: [{
          label: 'Searches per Day',
          data: counts,
          borderColor: '#2F9E96',
          backgroundColor: 'rgba(47, 158, 150, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
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
   * Render top queries list
   */
  function renderTopQueries(queries) {
    const container = document.getElementById('top-queries-list');
    if (!container) return;

    // Count queries
    const queryCount = {};
    queries.forEach(q => {
      const query = q.query.toLowerCase();
      if (!queryCount[query]) {
        queryCount[query] = { count: 0, avgResults: 0, totalResults: 0 };
      }
      queryCount[query].count++;
      queryCount[query].totalResults += q.results_count || 0;
    });

    // Calculate averages and sort
    const topQueries = Object.entries(queryCount)
      .map(([query, data]) => ({
        query,
        count: data.count,
        avgResults: Math.round(data.totalResults / data.count)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    if (topQueries.length === 0) {
      container.innerHTML = '<div class="empty-state">No search queries yet</div>';
      return;
    }

    container.innerHTML = topQueries.map((item, index) => `
      <div class="query-item">
        <div class="query-rank">${index + 1}</div>
        <div class="query-content">
          <div class="query-text">${escapeHtml(item.query)}</div>
          <div class="query-stats">
            <span class="query-count">${formatNumber(item.count)} searches</span>
            <span class="query-separator">•</span>
            <span class="query-results">${item.avgResults} avg results</span>
          </div>
        </div>
        <div class="query-badge">
          ${item.avgResults === 0 ? '<span class="badge-warning">No results</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  /**
   * Render zero results queries
   */
  function renderZeroResultsQueries(queries) {
    const container = document.getElementById('zero-results-list');
    if (!container) return;

    const zeroResultQueries = queries.filter(q => q.results_count === 0);

    // Count frequency
    const queryCount = {};
    zeroResultQueries.forEach(q => {
      const query = q.query.toLowerCase();
      queryCount[query] = (queryCount[query] || 0) + 1;
    });

    const sortedQueries = Object.entries(queryCount)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    if (sortedQueries.length === 0) {
      container.innerHTML = '<div class="empty-state">All queries returned results!</div>';
      return;
    }

    container.innerHTML = sortedQueries.map((item, index) => `
      <div class="query-item warning">
        <div class="query-rank">${index + 1}</div>
        <div class="query-content">
          <div class="query-text">${escapeHtml(item.query)}</div>
          <div class="query-stats">
            <span class="query-count">${formatNumber(item.count)} searches</span>
            <span class="query-separator">•</span>
            <span class="query-results text-warning">0 results</span>
          </div>
        </div>
        <div class="query-action">
          <button class="btn-create-content" data-query="${escapeHtml(item.query)}">
            Create Content
          </button>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render query performance chart
   */
  function renderQueryPerformanceChart(queries) {
    const canvas = document.getElementById('query-performance-chart');
    if (!canvas) return;

    // Group by results count ranges
    const ranges = {
      '0': 0,
      '1-5': 0,
      '6-10': 0,
      '11-20': 0,
      '21-50': 0,
      '50+': 0
    };

    queries.forEach(q => {
      const count = q.results_count || 0;
      if (count === 0) ranges['0']++;
      else if (count <= 5) ranges['1-5']++;
      else if (count <= 10) ranges['6-10']++;
      else if (count <= 20) ranges['11-20']++;
      else if (count <= 50) ranges['21-50']++;
      else ranges['50+']++;
    });

    // Destroy existing chart
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    const ctx = canvas.getContext('2d');
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(ranges),
        datasets: [{
          label: 'Number of Queries',
          data: Object.values(ranges),
          backgroundColor: [
            '#E07856',  // Terracotta for 0 results (warning)
            '#F4A259',
            '#FFD166',
            '#2F9E96',  // Teal for good results
            '#2F9E96',
            '#2F9E96'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} queries with ${context.label} results`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          },
          x: {
            title: {
              display: true,
              text: 'Results Count Range'
            }
          }
        }
      }
    });
  }

  /**
   * Render recent searches
   */
  function renderRecentSearches(queries) {
    const container = document.getElementById('recent-searches-list');
    if (!container) return;

    const recentSearches = queries.slice(0, 50);

    if (recentSearches.length === 0) {
      container.innerHTML = '<div class="empty-state">No recent searches</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Results</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${recentSearches.map(q => `
            <tr>
              <td class="query-cell">${escapeHtml(q.query)}</td>
              <td class="results-cell ${q.results_count === 0 ? 'text-warning' : ''}">${q.results_count || 0}</td>
              <td class="time-cell">${formatTime(q.created_at)}</td>
              <td class="date-cell">${formatDate(q.created_at)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  /**
   * Render search heatmap by hour
   */
  function renderSearchHeatmap(queries) {
    const canvas = document.getElementById('search-heatmap');
    if (!canvas) return;

    // Group by hour
    const hourCounts = new Array(24).fill(0);
    queries.forEach(q => {
      const hour = new Date(q.created_at).getHours();
      hourCounts[hour]++;
    });

    // Destroy existing chart
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    const ctx = canvas.getContext('2d');
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [{
          label: 'Searches',
          data: hourCounts,
          backgroundColor: hourCounts.map(count => {
            const max = Math.max(...hourCounts);
            const intensity = max > 0 ? count / max : 0;
            return `rgba(47, 158, 150, ${0.2 + intensity * 0.8})`;
          }),
          borderColor: '#2F9E96',
          borderWidth: 1
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
          },
          x: {
            title: {
              display: true,
              text: 'Hour of Day'
            }
          }
        }
      }
    });
  }

  /**
   * Render all queries table
   */
  function renderAllQueriesTable(queries, sortBy = 'count-desc', filterText = '') {
    const container = document.getElementById('all-queries-table');
    if (!container) return;

    // Aggregate queries
    const queryMap = {};
    queries.forEach(q => {
      const query = q.query.toLowerCase();
      if (!queryMap[query]) {
        queryMap[query] = {
          query: q.query,
          count: 0,
          totalResults: 0,
          lastSearched: q.created_at
        };
      }
      queryMap[query].count++;
      queryMap[query].totalResults += q.results_count || 0;
      if (new Date(q.created_at) > new Date(queryMap[query].lastSearched)) {
        queryMap[query].lastSearched = q.created_at;
      }
    });

    let allQueries = Object.values(queryMap).map(q => ({
      ...q,
      avgResults: Math.round(q.totalResults / q.count)
    }));

    // Filter
    if (filterText) {
      allQueries = allQueries.filter(q =>
        q.query.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'count-desc':
        allQueries.sort((a, b) => b.count - a.count);
        break;
      case 'count-asc':
        allQueries.sort((a, b) => a.count - b.count);
        break;
      case 'recent':
        allQueries.sort((a, b) => new Date(b.lastSearched) - new Date(a.lastSearched));
        break;
      case 'results-asc':
        allQueries.sort((a, b) => a.avgResults - b.avgResults);
        break;
      case 'alpha':
        allQueries.sort((a, b) => a.query.localeCompare(b.query));
        break;
    }

    if (allQueries.length === 0) {
      container.innerHTML = '<div class="empty-state">No queries found</div>';
      return;
    }

    container.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Query</th>
            <th>Total Searches</th>
            <th>Avg Results</th>
            <th>Last Searched</th>
          </tr>
        </thead>
        <tbody>
          ${allQueries.map(q => `
            <tr>
              <td class="query-cell">${escapeHtml(q.query)}</td>
              <td class="count-cell">${formatNumber(q.count)}</td>
              <td class="results-cell ${q.avgResults === 0 ? 'text-warning' : ''}">${q.avgResults}</td>
              <td class="date-cell">${formatDate(q.lastSearched)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  /**
   * Export to CSV
   */
  function exportToCSV(data, filename) {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
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
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
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
   * Load and render all data
   */
  async function loadData() {
    const queries = await fetchSearchQueries(currentDateRange);
    allQueriesData = queries;

    updateKeyMetrics(queries);
    renderSearchTrendsChart(queries);
    renderTopQueries(queries);
    renderZeroResultsQueries(queries);
    renderQueryPerformanceChart(queries);
    renderRecentSearches(queries);
    renderSearchHeatmap(queries);
    renderAllQueriesTable(queries);
  }

  /**
   * Initialize event listeners
   */
  function initEventListeners() {
    // Date range selector
    const dateRangeSelect = document.getElementById('search-date-range');
    if (dateRangeSelect) {
      dateRangeSelect.addEventListener('change', function() {
        currentDateRange = this.value;
        loadData();
      });
    }

    // Refresh button
    const refreshBtn = document.getElementById('refresh-search-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', loadData);
    }

    // Sort queries
    const sortSelect = document.getElementById('sort-queries');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        const filterText = document.getElementById('filter-queries')?.value || '';
        renderAllQueriesTable(allQueriesData, this.value, filterText);
      });
    }

    // Filter queries
    const filterInput = document.getElementById('filter-queries');
    if (filterInput) {
      filterInput.addEventListener('input', function() {
        const sortBy = document.getElementById('sort-queries')?.value || 'count-desc';
        renderAllQueriesTable(allQueriesData, sortBy, this.value);
      });
    }

    // Export buttons
    document.getElementById('export-all-search')?.addEventListener('click', function() {
      const queryMap = {};
      allQueriesData.forEach(q => {
        const query = q.query.toLowerCase();
        if (!queryMap[query]) {
          queryMap[query] = { query: q.query, count: 0, avgResults: 0, totalResults: 0 };
        }
        queryMap[query].count++;
        queryMap[query].totalResults += q.results_count || 0;
      });
      const exportData = Object.values(queryMap).map(q => ({
        query: q.query,
        searches: q.count,
        avgResults: Math.round(q.totalResults / q.count)
      }));
      exportToCSV(exportData, 'search-analytics-all.csv');
    });

    document.getElementById('export-top-queries')?.addEventListener('click', function() {
      const queryMap = {};
      allQueriesData.forEach(q => {
        const query = q.query.toLowerCase();
        if (!queryMap[query]) {
          queryMap[query] = { query: q.query, count: 0 };
        }
        queryMap[query].count++;
      });
      const exportData = Object.values(queryMap)
        .sort((a, b) => b.count - a.count)
        .slice(0, 20)
        .map(q => ({ query: q.query, searches: q.count }));
      exportToCSV(exportData, 'top-search-queries.csv');
    });

    document.getElementById('export-zero-results')?.addEventListener('click', function() {
      const zeroResults = allQueriesData.filter(q => q.results_count === 0);
      const queryMap = {};
      zeroResults.forEach(q => {
        const query = q.query.toLowerCase();
        queryMap[query] = (queryMap[query] || 0) + 1;
      });
      const exportData = Object.entries(queryMap)
        .map(([query, count]) => ({ query, searches: count }))
        .sort((a, b) => b.searches - a.searches);
      exportToCSV(exportData, 'zero-result-queries.csv');
    });
  }

  /**
   * Initialize dashboard
   */
  function init() {
    loadData();
    initEventListeners();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
