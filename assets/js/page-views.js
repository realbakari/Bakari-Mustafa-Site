/**
 * Page View Counter with Supabase
 * Privacy-friendly page view tracking without external analytics
 */

(function() {
  'use strict';

  // Skip tracking on admin/newsletter pages
  const currentPath = window.location.pathname;
  const skipPaths = ['/newsletter-admin-login', '/newsletter-dashboard', '/analytics'];

  if (skipPaths.some(path => currentPath.startsWith(path))) {
    return; // Don't track admin pages
  }

  // Supabase client reference (will be set when ready)
  let supabase = null;

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
   * Get or create a session ID
   * Privacy-friendly: stored in sessionStorage, cleared when browser closes
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
   * Detect device type from user agent
   */
  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  /**
   * Detect browser name and version
   */
  function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = '';

    // Edge (Chromium)
    if (ua.indexOf('Edg') > -1) {
      browser = 'Edge';
      version = ua.match(/Edg\/(\d+)/)?.[1] || '';
    }
    // Chrome
    else if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
      browser = 'Chrome';
      version = ua.match(/Chrome\/(\d+)/)?.[1] || '';
    }
    // Safari
    else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
      browser = 'Safari';
      version = ua.match(/Version\/(\d+)/)?.[1] || '';
    }
    // Firefox
    else if (ua.indexOf('Firefox') > -1) {
      browser = 'Firefox';
      version = ua.match(/Firefox\/(\d+)/)?.[1] || '';
    }
    // Opera
    else if (ua.indexOf('OPR') > -1 || ua.indexOf('Opera') > -1) {
      browser = 'Opera';
      version = ua.match(/OPR\/(\d+)/)?.[1] || ua.match(/Opera\/(\d+)/)?.[1] || '';
    }
    // IE
    else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
      browser = 'Internet Explorer';
      version = ua.match(/(?:MSIE |rv:)(\d+)/)?.[1] || '';
    }

    return { name: browser, version: version };
  }

  /**
   * Detect operating system
   */
  function getOSInfo() {
    const ua = navigator.userAgent;
    let os = 'Unknown';
    let version = '';

    if (ua.indexOf('Win') > -1) {
      os = 'Windows';
      if (ua.indexOf('Windows NT 10') > -1) version = '10';
      else if (ua.indexOf('Windows NT 6.3') > -1) version = '8.1';
      else if (ua.indexOf('Windows NT 6.2') > -1) version = '8';
      else if (ua.indexOf('Windows NT 6.1') > -1) version = '7';
    } else if (ua.indexOf('Mac') > -1) {
      os = 'macOS';
      version = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
    } else if (ua.indexOf('Linux') > -1) {
      os = 'Linux';
    } else if (ua.indexOf('Android') > -1) {
      os = 'Android';
      version = ua.match(/Android (\d+\.\d+)/)?.[1] || '';
    } else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
      os = 'iOS';
      version = ua.match(/OS (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
    }

    return { name: os, version: version };
  }

  /**
   * Get referrer information
   */
  function getReferrerInfo() {
    const referrer = document.referrer || '';

    if (!referrer) {
      return {
        referrer: '',
        domain: '',
        type: 'direct'
      };
    }

    let domain = '';
    let type = 'external';

    try {
      const url = new URL(referrer);
      domain = url.hostname;

      // Check if it's internal (same domain)
      if (domain === window.location.hostname) {
        type = 'internal';
      }
      // Check if it's a search engine
      else if (/google|bing|yahoo|duckduckgo|baidu|yandex/.test(domain)) {
        type = 'search';
      }
      // Check if it's social media
      else if (/facebook|twitter|linkedin|instagram|pinterest|reddit|youtube|tiktok/.test(domain)) {
        type = 'social';
      }
    } catch (e) {
      // Invalid URL
      domain = 'unknown';
    }

    return {
      referrer: referrer,
      domain: domain,
      type: type
    };
  }

  /**
   * Track a page view
   * Increments view_count always, unique_views only once per session
   * Also logs detailed analytics to page_view_logs
   */
  async function trackPageView() {
    const pageUrl = getPageUrl();
    const pageTitle = getPageTitle();
    const isUniqueView = !hasViewedThisSession(pageUrl);

    try {
      // Gather analytics data
      const sessionId = getSessionId();
      const deviceType = getDeviceType();
      const browserInfo = getBrowserInfo();
      const osInfo = getOSInfo();
      const referrerInfo = getReferrerInfo();
      const now = new Date();
      const viewedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
      const viewedHour = now.getHours();

      // Update aggregated page_views table
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
            last_viewed_at: now.toISOString(),
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

      // Check if this is an entry page (first page in session)
      const viewedPages = JSON.parse(sessionStorage.getItem('viewed_pages') || '[]');
      const isEntryPage = viewedPages.length === 0;

      // Mark previous page as exit page if exists
      const lastLogId = sessionStorage.getItem('last_log_id');
      if (lastLogId && !isEntryPage) {
        await markAsExitPage(lastLogId);
      }

      // Log detailed view to page_view_logs table
      const { data: logData, error: logError } = await supabase
        .from('page_view_logs')
        .insert({
          page_url: pageUrl,
          page_title: pageTitle,
          referrer: referrerInfo.referrer,
          referrer_domain: referrerInfo.domain,
          referrer_type: referrerInfo.type,
          device_type: deviceType,
          browser_name: browserInfo.name,
          browser_version: browserInfo.version,
          os_name: osInfo.name,
          os_version: osInfo.version,
          user_agent: navigator.userAgent,
          session_id: sessionId,
          is_unique_view: isUniqueView,
          is_entry_page: isEntryPage,
          is_exit_page: false,
          viewed_date: viewedDate,
          viewed_hour: viewedHour
        })
        .select('id')
        .single();

      if (logError) {
        console.warn('Error logging detailed analytics:', logError);
      } else if (logData) {
        // Store this log ID for potential exit marking
        sessionStorage.setItem('last_log_id', logData.id);
      }

      // Update active session
      await updateActiveSession(sessionId, pageUrl, pageTitle, deviceType, browserInfo.name);

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
   * Mark a page view log as an exit page
   */
  async function markAsExitPage(logId) {
    try {
      const { error } = await supabase
        .from('page_view_logs')
        .update({ is_exit_page: true })
        .eq('id', logId);

      if (error) {
        console.warn('Error marking exit page:', error);
      }
    } catch (error) {
      console.warn('Error marking exit page:', error);
    }
  }

  /**
   * Update active session for real-time analytics
   */
  async function updateActiveSession(sessionId, pageUrl, pageTitle, deviceType, browserName) {
    try {
      // Use upsert to insert or update
      const { error } = await supabase
        .from('active_sessions')
        .upsert({
          session_id: sessionId,
          current_page_url: pageUrl,
          current_page_title: pageTitle,
          last_seen_at: new Date().toISOString(),
          device_type: deviceType,
          browser_name: browserName
        }, {
          onConflict: 'session_id'
        });

      if (error) {
        console.warn('Error updating active session:', error);
      }
    } catch (error) {
      console.warn('Error updating active session:', error);
    }
  }

  /**
   * Mark current page as exit when leaving
   */
  function markExitOnUnload() {
    const lastLogId = sessionStorage.getItem('last_log_id');
    if (lastLogId) {
      // Use sendBeacon for reliable async request on unload
      const data = new FormData();
      data.append('log_id', lastLogId);

      // Alternative: Use fetch with keepalive
      fetch(window.SUPABASE_URL + '/rest/v1/page_view_logs?id=eq.' + lastLogId, {
        method: 'PATCH',
        headers: {
          'apikey': window.SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + window.SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ is_exit_page: true }),
        keepalive: true
      }).catch(() => {
        // Silently fail - not critical
      });
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
    console.log('[PageViews] init called, supabase:', !!supabase);
    // Wait a bit to avoid tracking bots and quick bounces
    setTimeout(() => {
      // Track the page view
      trackPageView();
    }, 2000); // 2 second delay

    // Update any existing view count displays
    updateViewCountDisplay();

    // Mark exit page when leaving site
    window.addEventListener('beforeunload', markExitOnUnload);
    window.addEventListener('pagehide', markExitOnUnload);
  }

  // Expose public API
  window.PageViewCounter = {
    getViewCount,
    getTotalSiteViews,
    getPopularPages,
    formatNumber
  };

  // Since this script is loaded dynamically AFTER Supabase initializes,
  // we can directly initialize without event listeners
  console.log('[PageViews] Script loaded, checking for Supabase client...');

  if (window.supabaseClient) {
    console.log('[PageViews] Supabase client found, initializing...');
    supabase = window.supabaseClient;

    // DOM is definitely ready at this point (script is in footer)
    init();
  } else {
    console.error('[PageViews] ERROR: Supabase client not found! This should not happen.');
  }

})();
