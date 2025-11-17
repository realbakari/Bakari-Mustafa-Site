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

      // Fetch popular pages from Supabase
      const popularPages = await window.PageViewCounter.getPopularPages(10);

      if (!popularPages || popularPages.length === 0) {
        // No view data yet, populate static placeholders
        console.log('[PopularPosts] No view data available, populating static view counts');
        await populateStaticViewCounts();
        return;
      }

      // Match popular pages with post data
      const popularPosts = matchPostsWithViews(popularPages);

      if (popularPosts.length === 0) {
        // No matched posts, populate static placeholders
        console.log('[PopularPosts] No matched posts, populating static view counts');
        await populateStaticViewCounts();
        return;
      }

      // Render popular posts (replaces entire section)
      renderPopularPosts(popularPosts);

    } catch (error) {
      console.error('[PopularPosts] Error loading popular posts:', error);
      // On error, populate static placeholders
      await populateStaticViewCounts();
    }
  }

  /**
   * Populate view counts for statically rendered posts
   */
  async function populateStaticViewCounts() {
    const viewCountElements = popularSection.querySelectorAll('.popular-views[data-url]');

    if (viewCountElements.length === 0) return;

    // Get view counts for all visible posts
    const viewCountsPromises = Array.from(viewCountElements).map(async (element) => {
      const postUrl = element.getAttribute('data-url');
      if (!postUrl) return;

      try {
        // Fetch view count for this specific post
        const { data, error } = await window.supabase.createClient(
          window.SUPABASE_URL,
          window.SUPABASE_ANON_KEY
        )
          .from('page_views')
          .select('view_count')
          .eq('page_url', postUrl)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.warn('[PopularPosts] Error fetching view count for', postUrl, error);
          return;
        }

        const viewCount = data ? data.view_count : 0;
        const countElement = element.querySelector('.view-count');
        if (countElement) {
          countElement.textContent = window.PageViewCounter.formatNumber(viewCount);
        }
      } catch (err) {
        console.warn('[PopularPosts] Error fetching view count for', postUrl, err);
      }
    });

    await Promise.all(viewCountsPromises);
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
              <a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a>
            </h4>
            <div class="popular-meta">
              <span class="popular-date">${formatDate(post.date)}</span>
              <span class="popular-separator">•</span>
              <span class="popular-reading-time">${readingTime}</span>
              <span class="popular-separator">•</span>
              <span class="popular-views">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                ${window.PageViewCounter.formatNumber(post.viewCount)} views
              </span>
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
