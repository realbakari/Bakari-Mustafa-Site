/**
 * Popular Posts - Dynamic loading based on actual view counts from Supabase
 */

(function() {
  'use strict';

  // Check if we're on the homepage
  const popularSection = document.querySelector('.popular-section .popular-list');
  if (!popularSection) return;

  // Store all posts data (will be populated from Jekyll)
  let allPosts = [];

  /**
   * Initialize popular posts with actual view data
   */
  async function initPopularPosts() {
    try {
      // Wait for PageViewCounter to be available
      if (!window.PageViewCounter) {
        console.warn('[PopularPosts] PageViewCounter not available yet');
        setTimeout(initPopularPosts, 500);
        return;
      }

      // Show loading state
      popularSection.innerHTML = '<div class="popular-loading">Loading popular posts...</div>';

      // Fetch popular pages from Supabase
      const popularPages = await window.PageViewCounter.getPopularPages(10);

      if (!popularPages || popularPages.length === 0) {
        // No view data yet, keep the default Jekyll-rendered posts
        console.log('[PopularPosts] No view data available, using default');
        return;
      }

      // Match popular pages with post data
      const popularPosts = matchPostsWithViews(popularPages);

      // Render popular posts
      renderPopularPosts(popularPosts);

    } catch (error) {
      console.error('[PopularPosts] Error loading popular posts:', error);
      // On error, keep the default Jekyll-rendered posts
    }
  }

  /**
   * Match Supabase view data with post metadata
   */
  function matchPostsWithViews(popularPages) {
    const matched = [];

    popularPages.forEach(page => {
      // Find matching post from all posts
      const postData = allPosts.find(post => post.url === page.page_url);

      if (postData) {
        matched.push({
          ...postData,
          viewCount: page.view_count,
          uniqueViews: page.unique_views
        });
      }
    });

    return matched;
  }

  /**
   * Render popular posts list
   */
  function renderPopularPosts(posts) {
    if (posts.length === 0) {
      popularSection.innerHTML = '<p class="no-posts">No popular posts yet. Check back soon!</p>';
      return;
    }

    const html = posts.map((post, index) => {
      const readingTime = calculateReadingTime(post.words || 0);

      return `
        <article class="popular-card">
          <div class="popular-number">${index + 1}</div>
          <div class="popular-content">
            <h4 class="popular-title">
              <a href="${post.url}">${escapeHtml(post.title)}</a>
            </h4>
            <div class="popular-meta">
              <span class="popular-date">${formatDate(post.date)}</span>
              <span class="popular-separator">•</span>
              <span class="popular-reading-time">${readingTime}</span>
              <span class="popular-separator">•</span>
              <span class="popular-views">${window.PageViewCounter.formatNumber(post.viewCount)} views</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    popularSection.innerHTML = html;
  }

  /**
   * Calculate reading time from word count
   */
  function calculateReadingTime(words) {
    if (words < 360) {
      return '1 min read';
    }
    const minutes = Math.ceil(words / 180);
    return `${minutes} min read`;
  }

  /**
   * Format date string
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Set post data (called from Jekyll template)
   */
  window.setPopularPostsData = function(postsData) {
    allPosts = postsData;
    // Initialize after data is set
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPopularPosts);
    } else {
      initPopularPosts();
    }
  };

})();
