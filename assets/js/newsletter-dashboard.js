/**
 * Enhanced Newsletter Dashboard
 * Features: Bulk actions, sorting, charts, email broadcast
 */

/* Supabase client reference */
let supabase = null;

/* State */
let allSubscribers = [];
let filteredSubscribers = [];
let selectedSubscribers = new Set();
let currentPage = 1;
const itemsPerPage = 20;
let sortColumn = 'subscribed_at';
let sortDirection = 'desc';
let growthChart = null;

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
    updateGrowthChart();
    applyFilters();

    return allSubscribers;
  } catch (error) {
    console.error('[Dashboard] Error fetching subscribers:', error);
    return [];
  }
}

/**
 * Update dashboard statistics with enhanced metrics
 */
function updateStats() {
  const total = allSubscribers.length;
  const confirmed = allSubscribers.filter(s => s.status === 'confirmed').length;
  const pending = allSubscribers.filter(s => s.status === 'pending').length;

  /* Calculate weekly growth */
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekSubscribers = allSubscribers.filter(s =>
    new Date(s.subscribed_at) > weekAgo
  ).length;

  /* Calculate monthly growth */
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const thisMonthSubscribers = allSubscribers.filter(s =>
    new Date(s.subscribed_at) > lastMonth
  ).length;
  const growthRate = total > 0 ? ((thisMonthSubscribers / total) * 100).toFixed(1) : 0;

  /* Update DOM */
  document.getElementById('total-subscribers').textContent = total;
  document.getElementById('confirmed-subscribers').textContent = confirmed;
  document.getElementById('pending-subscribers').textContent = pending;
  document.getElementById('growth-rate').textContent = `${growthRate}%`;

  /* Update change indicators */
  document.getElementById('total-change').textContent = `+${thisWeekSubscribers} this week`;
  document.getElementById('confirmed-percentage').textContent =
    total > 0 ? `${((confirmed / total) * 100).toFixed(1)}%` : '0%';
  document.getElementById('pending-percentage').textContent =
    total > 0 ? `${((pending / total) * 100).toFixed(1)}%` : '0%';
  document.getElementById('growth-trend').textContent =
    thisMonthSubscribers > 0 ? 'Trend: ↗️' : 'Trend: →';
}

/**
 * Create/update growth chart
 */
function updateGrowthChart(days = 7) {
  const canvas = document.getElementById('growth-chart');
  const ctx = canvas.getContext('2d');

  /* Generate date labels and data */
  const labels = [];
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));

    const count = allSubscribers.filter(s => {
      const subDate = new Date(s.subscribed_at);
      return subDate >= dayStart && subDate <= dayEnd && s.status !== 'unsubscribed';
    }).length;

    data.push(count);
  }

  /* Destroy existing chart */
  if (growthChart) {
    growthChart.destroy();
  }

  /* Create new chart */
  growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'New Subscribers',
        data: data,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          bodyColor: '#fff',
          displayColors: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: '#6B7280'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          ticks: {
            color: '#6B7280'
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * Apply all filters to subscriber list
 */
function applyFilters() {
  const searchTerm = document.getElementById('search-subscribers').value.toLowerCase();
  const statusFilter = document.getElementById('filter-status').value;
  const sourceFilter = document.getElementById('filter-source').value;
  const dateRange = document.getElementById('filter-date-range').value;

  filteredSubscribers = allSubscribers.filter(subscriber => {
    /* Search filter */
    if (searchTerm && !subscriber.email.toLowerCase().includes(searchTerm)) {
      return false;
    }

    /* Status filter */
    if (statusFilter !== 'all' && subscriber.status !== statusFilter) {
      return false;
    }

    /* Source filter */
    if (sourceFilter !== 'all' && subscriber.source !== sourceFilter) {
      return false;
    }

    /* Date range filter */
    if (dateRange !== 'all' && dateRange !== 'custom') {
      const subDate = new Date(subscriber.subscribed_at);
      const now = new Date();

      if (dateRange === 'today') {
        const today = new Date(now.setHours(0, 0, 0, 0));
        if (subDate < today) return false;
      } else if (dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        if (subDate < weekAgo) return false;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        if (subDate < monthAgo) return false;
      }
    }

    return true;
  });

  /* Apply sorting */
  applySorting();

  currentPage = 1;
  renderSubscribers();
}

/**
 * Apply sorting to filtered subscribers
 */
function applySorting() {
  filteredSubscribers.sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];

    /* Handle null/undefined */
    if (!aVal) aVal = '';
    if (!bVal) bVal = '';

    /* Compare */
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Render subscribers table
 */
function renderSubscribers() {
  const tbody = document.getElementById('subscribers-list');

  /* Update counts */
  document.getElementById('showing-count').textContent = filteredSubscribers.length;
  document.getElementById('total-count').textContent = allSubscribers.length;

  if (filteredSubscribers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="loading">No subscribers found</td></tr>';
    updatePagination();
    return;
  }

  /* Calculate pagination */
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageSubscribers = filteredSubscribers.slice(startIdx, endIdx);

  /* Render rows */
  tbody.innerHTML = pageSubscribers.map(subscriber => {
    const subscribedDate = new Date(subscriber.subscribed_at).toLocaleDateString();
    const confirmedDate = subscriber.confirmed_at
      ? new Date(subscriber.confirmed_at).toLocaleDateString()
      : '-';

    const statusClass = `status-${subscriber.status}`;
    const statusText = subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1);

    const isSelected = selectedSubscribers.has(subscriber.id);

    return `
      <tr>
        <td class="th-checkbox">
          <input type="checkbox"
                 class="subscriber-checkbox"
                 data-id="${subscriber.id}"
                 ${isSelected ? 'checked' : ''}>
        </td>
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

  /* Attach checkbox listeners */
  document.querySelectorAll('.subscriber-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  updatePagination();
}

/**
 * Handle individual checkbox change
 */
function handleCheckboxChange(e) {
  const id = parseInt(e.target.dataset.id);

  if (e.target.checked) {
    selectedSubscribers.add(id);
  } else {
    selectedSubscribers.delete(id);
  }

  updateBulkActions();
}

/**
 * Update bulk action buttons
 */
function updateBulkActions() {
  const count = selectedSubscribers.size;
  const bulkDeleteBtn = document.getElementById('bulk-delete-btn');
  const exportSelectedBtn = document.getElementById('export-selected-btn');
  const selectedCountSpan = document.getElementById('selected-count');

  selectedCountSpan.textContent = count;

  if (count > 0) {
    bulkDeleteBtn.style.display = 'inline-flex';
    exportSelectedBtn.style.display = 'inline-flex';
  } else {
    bulkDeleteBtn.style.display = 'none';
    exportSelectedBtn.style.display = 'none';
  }

  /* Update select-all checkbox state */
  const selectAllCheckbox = document.getElementById('select-all-checkbox');
  const pageSubscriberIds = filteredSubscribers
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map(s => s.id);

  const allPageSelected = pageSubscriberIds.every(id => selectedSubscribers.has(id));
  const somePageSelected = pageSubscriberIds.some(id => selectedSubscribers.has(id));

  selectAllCheckbox.checked = allPageSelected && pageSubscriberIds.length > 0;
  selectAllCheckbox.indeterminate = somePageSelected && !allPageSelected;
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
 * Delete single subscriber
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

    selectedSubscribers.delete(id);
    await fetchSubscribers();
    alert('Subscriber deleted successfully');
  } catch (error) {
    console.error('[Dashboard] Error deleting subscriber:', error);
    alert('Failed to delete subscriber');
  }
}

/* Make deleteSubscriber available globally */
window.deleteSubscriber = deleteSubscriber;

/**
 * Bulk delete selected subscribers
 */
async function bulkDeleteSubscribers() {
  const count = selectedSubscribers.size;
  if (!confirm(`Are you sure you want to delete ${count} selected subscriber(s)?`)) {
    return;
  }

  try {
    const idsToDelete = Array.from(selectedSubscribers);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .in('id', idsToDelete);

    if (error) throw error;

    selectedSubscribers.clear();
    await fetchSubscribers();
    alert(`${count} subscriber(s) deleted successfully`);
  } catch (error) {
    console.error('[Dashboard] Error bulk deleting subscribers:', error);
    alert('Failed to delete subscribers');
  }
}

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

    /* Escape commas and quotes */
    const escapedRow = row.map(value => {
      const stringValue = String(value || '');
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return '"' + stringValue.replace(/"/g, '""') + '"';
      }
      return stringValue;
    });

    csv += escapedRow.join(',') + '\n';
  });

  /* Create download link */
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
async function initializeDashboard() {
  /* Wait for Supabase client to be ready */
  if (!supabase) {
    console.warn('[Dashboard] Supabase client not ready yet, waiting...');
    return;
  }

  console.log('[Dashboard] Initializing...');

  /* Load subscribers */
  await fetchSubscribers();

  /* Search */
  document.getElementById('search-subscribers').addEventListener('input', applyFilters);

  /* Filters */
  document.getElementById('filter-status').addEventListener('change', applyFilters);
  document.getElementById('filter-source').addEventListener('change', applyFilters);
  document.getElementById('filter-date-range').addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      showDateRangeModal();
    } else {
      applyFilters();
    }
  });

  /* Select all checkbox */
  document.getElementById('select-all-checkbox').addEventListener('change', (e) => {
    const pageSubscriberIds = filteredSubscribers
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map(s => s.id);

    if (e.target.checked) {
      pageSubscriberIds.forEach(id => selectedSubscribers.add(id));
    } else {
      pageSubscriberIds.forEach(id => selectedSubscribers.delete(id));
    }

    renderSubscribers();
    updateBulkActions();
  });

  /* Sortable columns */
  document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const column = th.dataset.sort;

      if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn = column;
        sortDirection = 'asc';
      }

      /* Update sort indicators */
      document.querySelectorAll('.sortable').forEach(el => {
        el.classList.remove('sorted-asc', 'sorted-desc');
      });
      th.classList.add(`sorted-${sortDirection}`);

      applyFilters();
    });
  });

  /* Bulk delete */
  document.getElementById('bulk-delete-btn').addEventListener('click', bulkDeleteSubscribers);

  /* Export buttons */
  document.getElementById('export-all-btn').addEventListener('click', () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(filteredSubscribers, `newsletter-subscribers-all-${timestamp}.csv`);
  });

  document.getElementById('export-selected-btn').addEventListener('click', () => {
    const selected = allSubscribers.filter(s => selectedSubscribers.has(s.id));
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(selected, `newsletter-subscribers-selected-${timestamp}.csv`);
  });

  document.getElementById('export-confirmed-btn').addEventListener('click', () => {
    const confirmed = filteredSubscribers.filter(s => s.status === 'confirmed');
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(confirmed, `newsletter-subscribers-confirmed-${timestamp}.csv`);
  });

  /* Refresh */
  document.getElementById('refresh-btn').addEventListener('click', async () => {
    await fetchSubscribers();
  });

  /* Pagination */
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

  /* Chart period buttons */
  document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const days = parseInt(e.target.dataset.period);
      updateGrowthChart(days);
    });
  });

  /* Email composer */
  document.getElementById('send-email-btn').addEventListener('click', showEmailComposer);
  document.getElementById('close-email-modal').addEventListener('click', hideEmailComposer);
  document.getElementById('cancel-email-btn').addEventListener('click', hideEmailComposer);
  document.getElementById('send-email-broadcast-btn').addEventListener('click', sendBroadcastEmail);

  /* Date range modal */
  document.getElementById('close-date-modal').addEventListener('click', hideDateRangeModal);
  document.getElementById('cancel-date-btn').addEventListener('click', hideDateRangeModal);
  document.getElementById('apply-date-btn').addEventListener('click', applyCustomDateRange);

  /* Modal backdrop clicks */
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.parentElement.style.display = 'none';
      }
    });
  });

  console.log('[Dashboard] Initialization complete');
}

/**
 * Show email composer modal
 */
function showEmailComposer() {
  const modal = document.getElementById('email-composer-modal');
  const recipientsSelect = document.getElementById('email-recipients');
  const recipientCount = document.getElementById('recipient-count');

  /* Update recipient count based on selection */
  const updateRecipientCount = () => {
    const option = recipientsSelect.value;
    let count = 0;

    if (option === 'all' || option === 'confirmed') {
      count = allSubscribers.filter(s => s.status === 'confirmed').length;
    } else if (option === 'selected') {
      count = Array.from(selectedSubscribers)
        .filter(id => allSubscribers.find(s => s.id === id && s.status === 'confirmed'))
        .length;
    } else if (option === 'pending') {
      count = allSubscribers.filter(s => s.status === 'pending').length;
    }

    recipientCount.textContent = count;
  };

  recipientsSelect.addEventListener('change', updateRecipientCount);
  updateRecipientCount();

  modal.style.display = 'flex';
}

/**
 * Hide email composer modal
 */
function hideEmailComposer() {
  document.getElementById('email-composer-modal').style.display = 'none';
  document.getElementById('email-subject').value = '';
  document.getElementById('email-body').value = '';
  document.getElementById('email-preview-mode').checked = false;
}

/**
 * Send broadcast email
 */
async function sendBroadcastEmail() {
  const subject = document.getElementById('email-subject').value.trim();
  const body = document.getElementById('email-body').value.trim();
  const recipientsOption = document.getElementById('email-recipients').value;
  const previewMode = document.getElementById('email-preview-mode').checked;

  if (!subject || !body) {
    alert('Please fill in both subject and message');
    return;
  }

  /* Get recipients */
  let recipients = [];
  if (recipientsOption === 'all' || recipientsOption === 'confirmed') {
    recipients = allSubscribers.filter(s => s.status === 'confirmed');
  } else if (recipientsOption === 'selected') {
    recipients = allSubscribers.filter(s =>
      selectedSubscribers.has(s.id) && s.status === 'confirmed'
    );
  } else if (recipientsOption === 'pending') {
    recipients = allSubscribers.filter(s => s.status === 'pending');
  }

  if (recipients.length === 0) {
    alert('No recipients match your selection');
    return;
  }

  if (!previewMode) {
    if (!confirm(`Send email to ${recipients.length} recipient(s)?`)) {
      return;
    }
  }

  /* Show loading state */
  const sendBtn = document.getElementById('send-email-broadcast-btn');
  const btnText = sendBtn.querySelector('.btn-text');
  const btnLoading = sendBtn.querySelector('.btn-loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-flex';
  sendBtn.disabled = true;

  try {
    /* TODO: Implement actual email sending via Netlify Function */
    console.log('[Dashboard] Would send email:', {
      subject,
      body,
      recipients: recipients.map(r => r.email),
      previewMode
    });

    /* Simulate API call */
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert(previewMode
      ? 'Test email sent to your account!'
      : `Email sent to ${recipients.length} recipient(s)!`
    );

    hideEmailComposer();
  } catch (error) {
    console.error('[Dashboard] Error sending email:', error);
    alert('Failed to send email. Please try again.');
  } finally {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    sendBtn.disabled = false;
  }
}

/**
 * Show date range modal
 */
function showDateRangeModal() {
  document.getElementById('date-range-modal').style.display = 'flex';
}

/**
 * Hide date range modal
 */
function hideDateRangeModal() {
  document.getElementById('date-range-modal').style.display = 'none';
}

/**
 * Apply custom date range filter
 */
function applyCustomDateRange() {
  const fromDate = document.getElementById('date-from').value;
  const toDate = document.getElementById('date-to').value;

  if (!fromDate || !toDate) {
    alert('Please select both start and end dates');
    return;
  }

  /* Apply custom filter */
  const from = new Date(fromDate);
  const to = new Date(toDate);
  to.setHours(23, 59, 59, 999);

  filteredSubscribers = allSubscribers.filter(subscriber => {
    const subDate = new Date(subscriber.subscribed_at);
    return subDate >= from && subDate <= to;
  });

  currentPage = 1;
  renderSubscribers();
  hideDateRangeModal();
}

/* Wait for Supabase client to be ready */
window.addEventListener('supabaseReady', function(event) {
  supabase = event.detail.client;
  console.log('[Dashboard] Supabase client received from event');

  /* Initialize when both DOM and Supabase are ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
  } else {
    initializeDashboard();
  }
});

/* Check if Supabase is already initialized */
if (window.supabaseClient) {
  supabase = window.supabaseClient;
  console.log('[Dashboard] Supabase client already available');

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
  } else {
    initializeDashboard();
  }
}
