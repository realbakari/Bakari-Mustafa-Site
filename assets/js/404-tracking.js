/**
 * 404 Error Tracking for Analytics
 * Tracks broken links and missing pages
 */

(function() {
  'use strict';

  const SUPABASE_URL = window.SUPABASE_URL || 'https://fmyukpxfweibodnuaifr.supabase.co';
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTg5NjQsImV4cCI6MjA3NzkzNDk2NH0.Pil32HEZaf4eZwTGbdgJfcZedgdRXuE4zUNA7Z_RPCg';

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || typeof window.supabase === 'undefined') {
    console.warn('404 tracking disabled - Supabase not configured');
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
   * Track a 404 error
   */
  async function track404Error() {
    try {
      const sessionId = getSessionId();
      const requestedUrl = window.location.pathname;
      const referrer = document.referrer || '';
      const userAgent = navigator.userAgent;
      const now = new Date();
      const occurredDate = now.toISOString().split('T')[0];

      await supabase
        .from('error_404_logs')
        .insert({
          requested_url: requestedUrl,
          referrer: referrer,
          user_agent: userAgent,
          session_id: sessionId,
          occurred_date: occurredDate
        });

      console.log('404 error tracked:', requestedUrl);
    } catch (error) {
      console.warn('Error tracking 404:', error);
    }
  }

  /**
   * Initialize 404 tracking
   */
  function init() {
    // Only track if this is actually a 404 page
    // Check for 404 indicators in the page
    const is404Page =
      document.title.toLowerCase().includes('404') ||
      document.body.classList.contains('error404') ||
      document.querySelector('.error-404') ||
      document.querySelector('#error-404') ||
      window.location.pathname === '/404.html';

    if (is404Page) {
      // Wait a moment to avoid tracking bots
      setTimeout(() => {
        track404Error();
      }, 1000);
    }
  }

  // Expose public API
  window.Error404Tracking = {
    track404Error
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
