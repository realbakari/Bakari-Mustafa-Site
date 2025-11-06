/**
 * Search Query Tracking for Analytics
 * Tracks search queries and results count
 */

(function() {
  'use strict';

  const SUPABASE_URL = window.SUPABASE_URL || 'https://fmyukpxfweibodnuaifr.supabase.co';
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3NzkzNDk2NH0.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg';

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || typeof window.supabase === 'undefined') {
    console.warn('Search tracking disabled - Supabase not configured');
    return;
  }

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  /**
   * Get session ID (same as page views)
   */
  function getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Track a search query
   */
  async function trackSearch(query, resultsCount) {
    if (!query || query.trim().length === 0) return;

    try {
      const sessionId = getSessionId();
      const now = new Date();
      const searchedDate = now.toISOString().split('T')[0];

      await supabase
        .from('search_queries')
        .insert({
          query: query.trim(),
          results_count: resultsCount || 0,
          session_id: sessionId,
          searched_date: searchedDate
        });

    } catch (error) {
      console.warn('Error tracking search:', error);
    }
  }

  /**
   * Debounce function to avoid tracking every keystroke
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Initialize search tracking
   */
  function init() {
    const searchInput = document.getElementById('main-search-input');
    const searchResults = document.getElementById('main-search-results');

    if (!searchInput) return;

    // Track search when user stops typing (debounced)
    const debouncedTrack = debounce((query) => {
      if (!query || query.length < 2) return;

      // Wait a moment for results to render
      setTimeout(() => {
        const resultsCount = searchResults ? searchResults.children.length : 0;
        trackSearch(query, resultsCount);
      }, 200);
    }, 1000); // Wait 1 second after user stops typing

    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      if (query.length >= 2) {
        debouncedTrack(query);
      }
    });
  }

  // Expose public API
  window.SearchTracking = {
    trackSearch
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
