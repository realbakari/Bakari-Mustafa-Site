/**
 * Newsletter Dashboard
 * Manage and export subscribers
 */

// Use global Supabase client (initialized in footer or inline)
var supabase = window.supabaseClient || window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);

// State
let allSubscribers = [];
let filteredSubscribers = [];
let currentPage = 1;
const itemsPerPage = 20;

/**
 * Fetch all subscribers from database
 */
async function fetchSubscribers() {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) throw error;

    allSubscribers = data || [];
    filteredSubscribers = [...allSubscribers];

    updateStats();
    applyFilters();

    return allSubscribers;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }
}

/**
 * Update dashboard statistics
 */
function updateStats() {
  const total = allSubscribers.length;
  const confirmed = allSubscribers.filter(s => s.status === 'confirmed').length;
  const pending = allSubscribers.filter(s => s.status === 'pending').length;

  // Calculate monthly growth
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const thisMonthSubscribers = allSubscribers.filter(s => new Date(s.subscribed_at) > lastMonth).length;
  const growthRate = total > 0 ? ((thisMonthSubscribers / total) * 100).toFixed(1) : 0;

  document.getElementById('total-subscribers').textContent = total;
  document.getElementById('confirmed-subscribers').textContent = confirmed;
  document.getElementById('pending-subscribers').textContent = pending;
  document.getElementById('growth-rate').textContent = `${growthRate}%`;
}

/**
 * Apply filters to subscriber list
 */
function applyFilters() {
  const searchTerm = document.getElementById('search-subscribers').value.toLowerCase();
  const statusFilter = document.getElementById('filter-status').value;
  const sourceFilter = document.getElementById('filter-source').value;

  filteredSubscribers = allSubscribers.filter(subscriber => {
    // Search filter
    if (searchTerm && !subscriber.email.toLowerCase().includes(searchTerm)) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all' && subscriber.status !== statusFilter) {
      return false;
    }

    // Source filter
    if (sourceFilter !== 'all' && subscriber.source !== sourceFilter) {
      return false;
    }

    return true;
  });

  currentPage = 1;
  renderSubscribers();
}

/**
 * Render subscribers table
 */
function renderSubscribers() {
  const tbody = document.getElementById('subscribers-list');

  if (filteredSubscribers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">No subscribers found</td></tr>';
    updatePagination();
    return;
  }

  // Calculate pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageSubscribers = filteredSubscribers.slice(startIdx, endIdx);

  // Render rows
  tbody.innerHTML = pageSubscribers.map(subscriber => {
    const subscribedDate = new Date(subscriber.subscribed_at).toLocaleDateString();
    const confirmedDate = subscriber.confirmed_at
      ? new Date(subscriber.confirmed_at).toLocaleDateString()
      : '-';

    const statusClass = `status-${subscriber.status}`;
    const statusText = subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1);

    return `
      <tr>
        <td>${subscriber.email}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>${subscribedDate}</td>
        <td>${confirmedDate}</td>
        <td>${subscriber.source || '-'}</td>
        <td>
          <button class="btn-delete" onclick="deleteSubscriber(${subscriber.id})">Delete</button>
        </td>
      </tr>
    `;
  }).join('');

  updatePagination();
}

/**
 * Update pagination controls
 */
function updatePagination() {
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages || 1}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage >= totalPages;
}

/**
 * Delete subscriber
 */
async function deleteSubscriber(id) {
  if (!confirm('Are you sure you want to delete this subscriber?')) {
    return;
  }

  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Refresh list
    await fetchSubscribers();
    alert('Subscriber deleted successfully');
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    alert('Failed to delete subscriber');
  }
}

// Make deleteSubscriber available globally
window.deleteSubscriber = deleteSubscriber;

/**
 * Export subscribers to CSV
 */
function exportToCSV(subscribers, filename) {
  if (subscribers.length === 0) {
    alert('No subscribers to export');
    return;
  }

  const headers = ['Email', 'Status', 'Subscribed At', 'Confirmed At', 'Source', 'Referrer'];

  let csv = headers.join(',') + '\n';

  subscribers.forEach(subscriber => {
    const row = [
      subscriber.email,
      subscriber.status,
      subscriber.subscribed_at,
      subscriber.confirmed_at || '',
      subscriber.source || '',
      subscriber.referrer || ''
    ];

    // Escape commas and quotes
    const escapedRow = row.map(value => {
      const stringValue = String(value || '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return '"' + stringValue.replace(/"/g, '""') + '"';
      }
      return stringValue;
    });

    csv += escapedRow.join(',') + '\n';
  });

  // Create download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Initialize dashboard
 */
document.addEventListener('DOMContentLoaded', async function() {
  // Load subscribers
  await fetchSubscribers();

  // Search
  document.getElementById('search-subscribers').addEventListener('input', applyFilters);

  // Status filter
  document.getElementById('filter-status').addEventListener('change', applyFilters);

  // Source filter
  document.getElementById('filter-source').addEventListener('change', applyFilters);

  // Export all
  document.getElementById('export-all-btn').addEventListener('click', () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(filteredSubscribers, `newsletter-subscribers-all-${timestamp}.csv`);
  });

  // Export confirmed only
  document.getElementById('export-confirmed-btn').addEventListener('click', () => {
    const confirmed = filteredSubscribers.filter(s => s.status === 'confirmed');
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(confirmed, `newsletter-subscribers-confirmed-${timestamp}.csv`);
  });

  // Refresh
  document.getElementById('refresh-btn').addEventListener('click', async () => {
    await fetchSubscribers();
  });

  // Pagination
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderSubscribers();
    }
  });

  document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderSubscribers();
    }
  });
});
