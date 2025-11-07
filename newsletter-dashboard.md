---
layout: page
title: Newsletter Subscribers Dashboard
permalink: /newsletter-dashboard
---

<!-- Auth Loading Screen -->
<div id="auth-loading" class="auth-loading">
  <div class="auth-loading-spinner"></div>
  <p>Checking authentication...</p>
</div>

<!-- Unauthorized Message (hidden by default) -->
<div id="auth-required" class="auth-required" style="display: none;">
  <div class="auth-message">
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
    <h2>Authentication Required</h2>
    <p>Please sign in to access the newsletter dashboard.</p>
    <a href="/newsletter-admin-login" class="btn-login-link">Go to Login</a>
  </div>
</div>

<!-- Dashboard Content (hidden until authenticated) -->
<div id="dashboard-content" class="newsletter-dashboard" style="display: none;">
  <!-- Dashboard Header with User Info and Logout -->
  <div class="dashboard-header">
    <div class="header-left">
      <h1>Newsletter Subscribers</h1>
      <p id="user-email" class="user-email">Logged in as: <span></span></p>
    </div>
    <div class="header-right">
      <button id="logout-btn" class="btn-logout">
        🚪 Logout
      </button>
    </div>
  </div>

  <!-- Stats Overview -->
  <div class="dashboard-stats">
    <div class="stat-card stat-card-primary">
      <div class="stat-icon-wrapper">
        <div class="stat-icon">👥</div>
      </div>
      <div class="stat-info">
        <div class="stat-value" id="total-subscribers">0</div>
        <div class="stat-label">Total Subscribers</div>
        <div class="stat-change" id="total-change">+0 this week</div>
      </div>
    </div>

    <div class="stat-card stat-card-success">
      <div class="stat-icon-wrapper">
        <div class="stat-icon">✅</div>
      </div>
      <div class="stat-info">
        <div class="stat-value" id="confirmed-subscribers">0</div>
        <div class="stat-label">Confirmed</div>
        <div class="stat-change" id="confirmed-percentage">0%</div>
      </div>
    </div>

    <div class="stat-card stat-card-warning">
      <div class="stat-icon-wrapper">
        <div class="stat-icon">⏳</div>
      </div>
      <div class="stat-info">
        <div class="stat-value" id="pending-subscribers">0</div>
        <div class="stat-label">Pending</div>
        <div class="stat-change" id="pending-percentage">0%</div>
      </div>
    </div>

    <div class="stat-card stat-card-info">
      <div class="stat-icon-wrapper">
        <div class="stat-icon">📈</div>
      </div>
      <div class="stat-info">
        <div class="stat-value" id="growth-rate">0%</div>
        <div class="stat-label">Monthly Growth</div>
        <div class="stat-change" id="growth-trend">Trend: ↗️</div>
      </div>
    </div>
  </div>

  <!-- Growth Chart -->
  <div class="chart-section">
    <div class="section-header">
      <h2>📊 Growth Over Time</h2>
      <div class="chart-controls">
        <button class="chart-btn active" data-period="7">7 Days</button>
        <button class="chart-btn" data-period="30">30 Days</button>
        <button class="chart-btn" data-period="90">90 Days</button>
      </div>
    </div>
    <canvas id="growth-chart" style="max-height: 250px;"></canvas>
  </div>

  <!-- Action Bar -->
  <div class="action-bar">
    <div class="action-bar-left">
      <button id="send-email-btn" class="btn-primary">
        📧 Compose Email
      </button>
      <button id="bulk-delete-btn" class="btn-danger" style="display: none;">
        🗑️ Delete Selected (<span id="selected-count">0</span>)
      </button>
    </div>
    <div class="action-bar-right">
      <button id="refresh-btn" class="btn-refresh">
        🔄 Refresh
      </button>
    </div>
  </div>

  <!-- Controls -->
  <div class="dashboard-controls">
    <div class="control-group control-group-filters">
      <div class="search-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" id="search-subscribers" placeholder="Search by email..." class="search-input">
      </div>

      <select id="filter-status" class="filter-select">
        <option value="all">All Statuses</option>
        <option value="confirmed">✅ Confirmed</option>
        <option value="pending">⏳ Pending</option>
        <option value="unsubscribed">❌ Unsubscribed</option>
      </select>

      <select id="filter-source" class="filter-select">
        <option value="all">All Sources</option>
        <option value="footer">Footer</option>
        <option value="sidebar">Sidebar</option>
        <option value="popup">Popup</option>
        <option value="post">Post</option>
      </select>

      <select id="filter-date-range" class="filter-select">
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="custom">Custom Range...</option>
      </select>
    </div>

    <div class="control-group control-group-actions">
      <button id="export-all-btn" class="btn-export">
        📥 Export All
      </button>
      <button id="export-selected-btn" class="btn-export" style="display: none;">
        📥 Export Selected
      </button>
      <button id="export-confirmed-btn" class="btn-export">
        📥 Confirmed Only
      </button>
    </div>
  </div>

  <!-- Subscribers Table -->
  <div class="subscribers-table-container">
    <div class="table-header-info">
      <div class="table-count">
        Showing <span id="showing-count">0</span> of <span id="total-count">0</span> subscribers
      </div>
      <div class="table-sort-info">
        <span id="sort-info">Sort by clicking column headers</span>
      </div>
    </div>
    <table class="subscribers-table" id="subscribers-table">
      <thead>
        <tr>
          <th class="th-checkbox">
            <input type="checkbox" id="select-all-checkbox" title="Select all">
          </th>
          <th class="sortable" data-sort="email">
            Email
            <span class="sort-icon">⇅</span>
          </th>
          <th class="sortable" data-sort="status">
            Status
            <span class="sort-icon">⇅</span>
          </th>
          <th class="sortable" data-sort="subscribed_at">
            Subscribed
            <span class="sort-icon">⇅</span>
          </th>
          <th class="sortable" data-sort="confirmed_at">
            Confirmed
            <span class="sort-icon">⇅</span>
          </th>
          <th>Source</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="subscribers-list">
        <tr>
          <td colspan="7" class="loading">Loading subscribers...</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="pagination" id="pagination">
    <button id="prev-page" class="btn-page" disabled>← Previous</button>
    <span id="page-info">Page 1 of 1</span>
    <button id="next-page" class="btn-page" disabled>Next →</button>
  </div>
</div>
<!-- End of dashboard-content -->

<!-- Email Composer Modal -->
<div id="email-composer-modal" class="modal" style="display: none;">
  <div class="modal-backdrop"></div>
  <div class="modal-content modal-large">
    <div class="modal-header">
      <h2>📧 Compose Broadcast Email</h2>
      <button class="modal-close" id="close-email-modal">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="email-recipients">Recipients</label>
        <select id="email-recipients" class="form-control">
          <option value="all">All Confirmed Subscribers</option>
          <option value="selected">Selected Subscribers Only</option>
          <option value="confirmed">All Confirmed</option>
          <option value="pending">Pending Confirmations</option>
        </select>
        <small class="form-hint">
          <span id="recipient-count">0</span> recipients will receive this email
        </small>
      </div>

      <div class="form-group">
        <label for="email-subject">Subject Line *</label>
        <input type="text" id="email-subject" class="form-control" placeholder="Enter email subject..." required>
      </div>

      <div class="form-group">
        <label for="email-body">Message *</label>
        <textarea id="email-body" class="form-control" rows="12" placeholder="Write your message here...&#10;&#10;You can use basic HTML:&#10;- <strong>Bold text</strong>&#10;- <em>Italic text</em>&#10;- <a href='url'>Links</a>&#10;- <p>Paragraphs</p>" required></textarea>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" id="email-preview-mode">
          Send test email to yourself first
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" id="cancel-email-btn">Cancel</button>
      <button class="btn-primary" id="send-email-broadcast-btn">
        <span class="btn-text">📤 Send Email</span>
        <span class="btn-loading" style="display: none;">
          <span class="spinner"></span> Sending...
        </span>
      </button>
    </div>
  </div>
</div>

<!-- Custom Date Range Modal -->
<div id="date-range-modal" class="modal" style="display: none;">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>📅 Custom Date Range</h2>
      <button class="modal-close" id="close-date-modal">×</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="date-from">From Date</label>
        <input type="date" id="date-from" class="form-control">
      </div>
      <div class="form-group">
        <label for="date-to">To Date</label>
        <input type="date" id="date-to" class="form-control">
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" id="cancel-date-btn">Cancel</button>
      <button class="btn-primary" id="apply-date-btn">Apply Filter</button>
    </div>
  </div>
</div>

<!-- Authentication Check -->
<script>
  /* Initialize Supabase client */
  let dashboardSupabase = null;

  /* Function to wait for Supabase library to load */
  function waitForSupabase() {
    return new Promise((resolve) => {
      if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
        resolve();
      } else {
        const checkInterval = setInterval(() => {
          if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 50);
      }
    });
  }

  /* Check authentication on page load */
  (async function() {
    /* Wait for Supabase library to be available */
    await waitForSupabase();

    /* Create Supabase client */
    try {
      dashboardSupabase = window.supabase.createClient(
        window.SUPABASE_URL,
        window.SUPABASE_ANON_KEY
      );
      console.log('[Dashboard] Supabase client created successfully');
    } catch (error) {
      console.error('[Dashboard] Failed to create Supabase client:', error);
      document.getElementById('auth-loading').style.display = 'none';
      document.getElementById('auth-required').innerHTML = '<p>Failed to initialize. Please refresh the page.</p>';
      document.getElementById('auth-required').style.display = 'block';
      return;
    }

    const authLoading = document.getElementById('auth-loading');
    const authRequired = document.getElementById('auth-required');
    const dashboardContent = document.getElementById('dashboard-content');
    const logoutBtn = document.getElementById('logout-btn');

    try {
      /* Get current session */
      const { data: { session }, error } = await dashboardSupabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        /* Not authenticated - show auth required message */
        authLoading.style.display = 'none';
        authRequired.style.display = 'block';
        return;
      }

      /* Authenticated - show dashboard */
      authLoading.style.display = 'none';
      dashboardContent.style.display = 'block';

      /* Expose Supabase client to external dashboard.js */
      window.supabaseClient = dashboardSupabase;
      const supabaseReadyEvent = new CustomEvent('supabaseReady', {
        detail: { client: dashboardSupabase }
      });
      window.dispatchEvent(supabaseReadyEvent);

      /* Display user email */
      const userEmailSpan = document.querySelector('#user-email span');
      if (userEmailSpan) {
        userEmailSpan.textContent = session.user.email;
      }

      /* Handle logout */
      logoutBtn.addEventListener('click', async function() {
        if (confirm('Are you sure you want to logout?')) {
          await dashboardSupabase.auth.signOut();
          window.location.href = '/newsletter-admin-login';
        }
      });

    } catch (error) {
      console.error('Auth check error:', error);
      authLoading.style.display = 'none';
      authRequired.style.display = 'block';
    }
  })();
</script>

<!-- Load Chart.js for growth chart -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="/assets/js/newsletter-dashboard.js"></script>

<style>
.newsletter-dashboard {
  padding: 1rem 0;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

body[data-theme="dark"] .stat-card {
  background: rgba(255, 255, 255, 0.05);
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
}

body[data-theme="dark"] .stat-value {
  color: #F9FAFB;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

body[data-theme="dark"] .stat-label {
  color: #D1D5DB;
}

.dashboard-controls {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

body[data-theme="dark"] .dashboard-controls {
  background: rgba(255, 255, 255, 0.05);
}

.control-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-input, .filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 0.875rem;
}

body[data-theme="dark"] .search-input,
body[data-theme="dark"] .filter-select {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #F9FAFB;
}

.search-input {
  min-width: 250px;
}

.btn-export, .btn-refresh {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-export {
  background: #3B82F6;
  color: white;
}

.btn-export:hover {
  background: #2563EB;
}

.btn-refresh {
  background: #10B981;
  color: white;
}

.btn-refresh:hover {
  background: #059669;
}

.subscribers-table-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

body[data-theme="dark"] .subscribers-table-container {
  background: rgba(255, 255, 255, 0.05);
}

.subscribers-table {
  width: 100%;
  border-collapse: collapse;
}

.subscribers-table th {
  background: #F9FAFB;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #6B7280;
  border-bottom: 1px solid #E5E7EB;
}

body[data-theme="dark"] .subscribers-table th {
  background: rgba(255, 255, 255, 0.02);
  border-bottom-color: rgba(255, 255, 255, 0.1);
  color: #D1D5DB;
}

.subscribers-table td {
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  font-size: 0.875rem;
  color: #1F2937;
}

body[data-theme="dark"] .subscribers-table td {
  border-bottom-color: rgba(255, 255, 255, 0.05);
  color: #F9FAFB;
}

.subscribers-table tbody tr:hover {
  background: #F9FAFB;
}

body[data-theme="dark"] .subscribers-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.02);
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-confirmed {
  background: #D1FAE5;
  color: #065F46;
}

body[data-theme="dark"] .status-confirmed {
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
}

.status-pending {
  background: #FEF3C7;
  color: #92400E;
}

body[data-theme="dark"] .status-pending {
  background: rgba(251, 191, 36, 0.2);
  color: #FBBF24;
}

.status-unsubscribed {
  background: #FEE2E2;
  color: #991B1B;
}

body[data-theme="dark"] .status-unsubscribed {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
}

.btn-delete {
  padding: 0.25rem 0.75rem;
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #DC2626;
}

.loading {
  text-align: center;
  color: #6B7280;
  padding: 2rem !important;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-page {
  padding: 0.5rem 1rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-page:hover:not(:disabled) {
  background: #2563EB;
}

.btn-page:disabled {
  background: #D1D5DB;
  cursor: not-allowed;
}

body[data-theme="dark"] .btn-page:disabled {
  background: rgba(255, 255, 255, 0.1);
}

#page-info {
  color: #6B7280;
  font-size: 0.875rem;
}

body[data-theme="dark"] #page-info {
  color: #D1D5DB;
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr 1fr;
  }

  .dashboard-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .control-group {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .subscribers-table {
    font-size: 0.75rem;
  }

  .subscribers-table th,
  .subscribers-table td {
    padding: 0.5rem;
  }
}

/* Auth Loading Screen */
.auth-loading {
  text-align: center;
  padding: 4rem 2rem;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.auth-loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 63, 255, 0.2);
  border-top-color: #003FFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-loading p {
  color: #6B7280;
  font-size: 1rem;
}

body[data-theme="dark"] .auth-loading p {
  color: #D1D5DB;
}

body[data-theme="dark"] .auth-loading-spinner {
  border-color: rgba(96, 165, 250, 0.2);
  border-top-color: #60A5FA;
}

/* Auth Required Message */
.auth-required {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-message {
  text-align: center;
  max-width: 500px;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

body[data-theme="dark"] .auth-message {
  background: rgba(255, 255, 255, 0.05);
}

.auth-message svg {
  color: #EF4444;
  margin-bottom: 1.5rem;
}

.auth-message h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #1F2937;
}

body[data-theme="dark"] .auth-message h2 {
  color: #F9FAFB;
}

.auth-message p {
  color: #6B7280;
  margin-bottom: 2rem;
  font-size: 1rem;
}

body[data-theme="dark"] .auth-message p {
  color: #D1D5DB;
}

.btn-login-link {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: #003FFF;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-login-link:hover {
  background: #0035db;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 63, 255, 0.3);
}

/* Dashboard Header with Logout */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

body[data-theme="dark"] .dashboard-header {
  background: rgba(255, 255, 255, 0.05);
}

.dashboard-header h1 {
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
  color: #1F2937;
}

body[data-theme="dark"] .dashboard-header h1 {
  color: #F9FAFB;
}

.user-email {
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0;
}

body[data-theme="dark"] .user-email {
  color: #D1D5DB;
}

.user-email span {
  font-weight: 500;
  color: #003FFF;
}

body[data-theme="dark"] .user-email span {
  color: #60A5FA;
}

.btn-logout {
  padding: 0.75rem 1.5rem;
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-right {
    width: 100%;
  }

  .btn-logout {
    width: 100%;
  }
}

/* ========== NEW ENHANCED STYLES ========== */

/* Enhanced Stat Cards */
.stat-card {
  position: relative;
  overflow: hidden;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
}

.stat-card-primary { border-left-color: #3B82F6; }
.stat-card-success { border-left-color: #10B981; }
.stat-card-warning { border-left-color: #F59E0B; }
.stat-card-info { border-left-color: #8B5CF6; }

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
}

.stat-card-success .stat-icon-wrapper { background: rgba(16, 185, 129, 0.1); }
.stat-card-warning .stat-icon-wrapper { background: rgba(245, 158, 11, 0.1); }
.stat-card-info .stat-icon-wrapper { background: rgba(139, 92, 246, 0.1); }

.stat-change {
  font-size: 0.75rem;
  color: #10B981;
  margin-top: 0.25rem;
}

body[data-theme="dark"] .stat-change {
  color: #34D399;
}

/* Growth Chart */
.chart-section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

body[data-theme="dark"] .chart-section {
  background: rgba(255, 255, 255, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

body[data-theme="dark"] .section-header h2 {
  color: #F9FAFB;
}

.chart-controls {
  display: flex;
  gap: 0.5rem;
}

.chart-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #D1D5DB;
  background: #fff;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.chart-btn:hover {
  background: #F3F4F6;
}

.chart-btn.active {
  background: #3B82F6;
  color: white;
  border-color: #3B82F6;
}

body[data-theme="dark"] .chart-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #F9FAFB;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.action-bar-left,
.action-bar-right {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #3B82F6;
  color: white;
}

.btn-primary:hover {
  background: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: #6B7280;
  color: white;
}

.btn-secondary:hover {
  background: #4B5563;
}

.btn-danger {
  background: #EF4444;
  color: white;
}

.btn-danger:hover {
  background: #DC2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}

/* Enhanced Controls */
.control-group-filters {
  flex: 1;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.control-group-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-wrapper svg {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
}

.search-wrapper .search-input {
  padding-left: 2.5rem;
  width: 100%;
}

/* Enhanced Table */
.table-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 8px 8px 0 0;
  font-size: 0.875rem;
}

body[data-theme="dark"] .table-header-info {
  background: rgba(255, 255, 255, 0.02);
}

.table-count {
  font-weight: 500;
  color: #1F2937;
}

body[data-theme="dark"] .table-count {
  color: #F9FAFB;
}

.table-sort-info {
  color: #6B7280;
  font-size: 0.75rem;
}

body[data-theme="dark"] .table-sort-info {
  color: #9CA3AF;
}

.th-checkbox {
  width: 40px;
  text-align: center;
}

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.sortable:hover {
  background: #F3F4F6;
}

body[data-theme="dark"] .sortable:hover {
  background: rgba(255, 255, 255, 0.05);
}

.sort-icon {
  opacity: 0.3;
  margin-left: 0.25rem;
  font-size: 0.75rem;
}

.sortable.sorted-asc .sort-icon::before {
  content: '↑';
  opacity: 1;
}

.sortable.sorted-desc .sort-icon::before {
  content: '↓';
  opacity: 1;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

.modal-content {
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s ease;
  z-index: 1001;
}

.modal-large {
  max-width: 700px;
}

body[data-theme="dark"] .modal-content {
  background: #1F2937;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

body[data-theme="dark"] .modal-header {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1F2937;
}

body[data-theme="dark"] .modal-header h2 {
  color: #F9FAFB;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #6B7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #F3F4F6;
  color: #1F2937;
}

body[data-theme="dark"] .modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #F9FAFB;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

body[data-theme="dark"] .modal-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}

/* Form Elements */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

body[data-theme="dark"] .form-group label {
  color: #D1D5DB;
}

.form-control {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

body[data-theme="dark"] .form-control {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #F9FAFB;
}

.form-control textarea {
  resize: vertical;
  font-family: inherit;
}

.form-hint {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6B7280;
}

body[data-theme="dark"] .form-hint {
  color: #9CA3AF;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Updates */
@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr 1fr;
  }

  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .action-bar-left,
  .action-bar-right {
    width: 100%;
  }

  .control-group-filters,
  .control-group-actions {
    flex-direction: column;
  }

  .search-wrapper,
  .filter-select {
    width: 100%;
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
    width: 100%;
    justify-content: center;
  }

  .modal-content {
    width: 95%;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .chart-controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
