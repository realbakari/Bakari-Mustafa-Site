/**
 * Page View Counter with Supabase
 * Privacy-friendly page view tracking without external analytics
 */

(function() {
  'use strict';

  // Configuration - loaded from window variables set in footer
  // Fallback to hardcoded values if window variables aren't set
  const SUPABASE_URL = window.SUPABASE_URL || 'https://fmyukpxfweibodnuaifr.supabase.co';
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3OTM0OTY0fQ.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg';

  // Check if Supabase is configured
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase not configured. Page view counter disabled.');
    return;
  }

  // Initialize Supabase client
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  /**
   * Get the current page identifier
   * Uses pathname to avoid tracking query parameters
   */
  function getPageUrl() {
    return window.location.pathname;
  }

  /**
   * Get page title from the document
   */
  function getPageTitle() {
    return document.title || 'Untitled';
  }

  /**
   * Check if this page was already viewed in this session
   * Uses sessionStorage for privacy (cleared when browser closed)
   */
  function hasViewedThisSession(pageUrl) {
    const viewedPages = JSON.parse(sessionStorage.getItem('viewed_pages') || '[]');
    return viewedPages.includes(pageUrl);
  }

  /**
   * Mark page as viewed in this session
   */
  function markAsViewedThisSession(pageUrl) {
    const viewedPages = JSON.parse(sessionStorage.getItem('viewed_pages') || '[]');
    if (!viewedPages.includes(pageUrl)) {
      viewedPages.push(pageUrl);
      sessionStorage.setItem('viewed_pages', JSON.stringify(viewedPages));
    }
  }

  /**
   * Track a page view
   * Increments view_count always, unique_views only once per session
   */
  async function trackPageView() {
    const pageUrl = getPageUrl();
    const pageTitle = getPageTitle();
    const isUniqueView = !hasViewedThisSession(pageUrl);

    try {
      // First, try to get existing record
      const { data: existingData, error: fetchError } = await supabase
        .from('page_views')
        .select('id, view_count, unique_views')
        .eq('page_url', pageUrl)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is fine
        throw fetchError;
      }

      if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('page_views')
          .update({
            view_count: existingData.view_count + 1,
            unique_views: isUniqueView ? existingData.unique_views + 1 : existingData.unique_views,
            last_viewed_at: new Date().toISOString(),
            page_title: pageTitle // Update title in case it changed
          })
          .eq('id', existingData.id);

        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('page_views')
          .insert({
            page_url: pageUrl,
            page_title: pageTitle,
            view_count: 1,
            unique_views: 1
          });

        if (insertError) throw insertError;
      }

      // Mark as viewed in this session
      markAsViewedThisSession(pageUrl);

      // Update display if counter exists
      await updateViewCountDisplay();

    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  /**
   * Get view count for current page
   */
  async function getViewCount() {
    const pageUrl = getPageUrl();

    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('view_count, unique_views')
        .eq('page_url', pageUrl)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data || { view_count: 0, unique_views: 0 };
    } catch (error) {
      console.error('Error fetching view count:', error);
      return { view_count: 0, unique_views: 0 };
    }
  }

  /**
   * Update view count display elements
   */
  async function updateViewCountDisplay() {
    const viewCountElements = document.querySelectorAll('[data-view-counter]');

    if (viewCountElements.length === 0) return;

    const counts = await getViewCount();

    viewCountElements.forEach(element => {
      const type = element.getAttribute('data-view-counter');
      const count = type === 'unique' ? counts.unique_views : counts.view_count;

      // Update the count
      const countElement = element.querySelector('.view-count-number');
      if (countElement) {
        countElement.textContent = formatNumber(count);
      } else {
        element.textContent = formatNumber(count);
      }

      // Remove loading state
      element.classList.remove('loading');
    });
  }

  /**
   * Format number with commas for thousands
   */
  function formatNumber(num) {
    if (num === 0) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /**
   * Get total site views (optional - for homepage/stats page)
   */
  async function getTotalSiteViews() {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('view_count, unique_views');

      if (error) throw error;

      const totals = data.reduce((acc, row) => ({
        total_views: acc.total_views + row.view_count,
        total_unique: acc.total_unique + row.unique_views
      }), { total_views: 0, total_unique: 0 });

      return totals;
    } catch (error) {
      console.error('Error fetching total views:', error);
      return { total_views: 0, total_unique: 0 };
    }
  }

  /**
   * Get popular pages (optional - for stats page)
   */
  async function getPopularPages(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('page_url, page_title, view_count, unique_views')
        .order('view_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching popular pages:', error);
      return [];
    }
  }

  /**
   * Initialize page view tracking
   */
  function init() {
    // Wait a bit to avoid tracking bots and quick bounces
    setTimeout(() => {
      // Track the page view
      trackPageView();
    }, 2000); // 2 second delay

    // Update any existing view count displays
    updateViewCountDisplay();
  }

  // Expose public API
  window.PageViewCounter = {
    getViewCount,
    getTotalSiteViews,
    getPopularPages,
    formatNumber
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
