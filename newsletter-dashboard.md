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
    <div class="stat-card">
      <div class="stat-icon">👥</div>
      <div class="stat-info">
        <div class="stat-value" id="total-subscribers">0</div>
        <div class="stat-label">Total Subscribers</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">✅</div>
      <div class="stat-info">
        <div class="stat-value" id="confirmed-subscribers">0</div>
        <div class="stat-label">Confirmed</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">⏳</div>
      <div class="stat-info">
        <div class="stat-value" id="pending-subscribers">0</div>
        <div class="stat-label">Pending</div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">📈</div>
      <div class="stat-info">
        <div class="stat-value" id="growth-rate">0%</div>
        <div class="stat-label">Monthly Growth</div>
      </div>
    </div>
  </div>

  <!-- Controls -->
  <div class="dashboard-controls">
    <div class="control-group">
      <input type="text" id="search-subscribers" placeholder="Search by email..." class="search-input">

      <select id="filter-status" class="filter-select">
        <option value="all">All Statuses</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="unsubscribed">Unsubscribed</option>
      </select>

      <select id="filter-source" class="filter-select">
        <option value="all">All Sources</option>
        <option value="footer">Footer</option>
        <option value="sidebar">Sidebar</option>
        <option value="popup">Popup</option>
        <option value="post">Post</option>
      </select>
    </div>

    <div class="control-group">
      <button id="export-all-btn" class="btn-export">
        📥 Export All
      </button>
      <button id="export-confirmed-btn" class="btn-export">
        📥 Export Confirmed Only
      </button>
      <button id="refresh-btn" class="btn-refresh">
        🔄 Refresh
      </button>
    </div>
  </div>

  <!-- Subscribers Table -->
  <div class="subscribers-table-container">
    <table class="subscribers-table" id="subscribers-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Status</th>
          <th>Subscribed</th>
          <th>Confirmed</th>
          <th>Source</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="subscribers-list">
        <tr>
          <td colspan="6" class="loading">Loading subscribers...</td>
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

<!-- Authentication Check -->
<script>
  // Wait for Supabase to be initialized
  let supabase = null;

  function waitForSupabase() {
    return new Promise((resolve) => {
      if (window.supabaseClient) {
        supabase = window.supabaseClient;
        resolve();
      } else {
        window.addEventListener('supabaseReady', function(event) {
          supabase = event.detail.client;
          resolve();
        });
      }
    });
  }

  // Check authentication on page load
  (async function() {
    // Wait for Supabase to be ready
    await waitForSupabase();

    const authLoading = document.getElementById('auth-loading');
    const authRequired = document.getElementById('auth-required');
    const dashboardContent = document.getElementById('dashboard-content');
    const logoutBtn = document.getElementById('logout-btn');

    try {
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        // Not authenticated - show auth required message
        authLoading.style.display = 'none';
        authRequired.style.display = 'block';
        return;
      }

      // Authenticated - show dashboard
      authLoading.style.display = 'none';
      dashboardContent.style.display = 'block';

      // Display user email
      const userEmailSpan = document.querySelector('#user-email span');
      if (userEmailSpan) {
        userEmailSpan.textContent = session.user.email;
      }

      // Handle logout
      logoutBtn.addEventListener('click', async function() {
        if (confirm('Are you sure you want to logout?')) {
          await supabase.auth.signOut();
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
</style>
