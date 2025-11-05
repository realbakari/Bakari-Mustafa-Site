# Page View Counter - Usage Examples

This document shows different ways to use the Supabase page view counter on your site.

## Basic Usage

The page view counter is automatically active on all post pages (in `_layouts/post.html`). No additional setup needed!

## Display Options

### 1. Simple View Count (Default)

Already implemented in post layout:

```html
<span class="page-view-counter loading" data-view-counter="total">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
  <span class="view-count-number">0</span> views
</span>
```

### 2. Unique Views Only

To show unique visitors instead:

```html
<span class="page-view-counter loading" data-view-counter="unique">
  <svg>...</svg>
  <span class="view-count-number">0</span> unique visitors
</span>
```

### 3. Minimal Counter (No Icon)

```html
<span class="page-view-counter loading" data-view-counter="total">
  <span class="view-count-number">0</span> views
</span>
```

## Advanced Features

### Display Site-Wide Statistics

Create a stats page (e.g., `stats.md`) to show total site analytics:

```html
---
title: Site Statistics
layout: page
---

<div class="site-stats">
  <div class="stat-card">
    <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
    <span class="stat-value loading" id="total-views">0</span>
    <span class="stat-label">Total Views</span>
  </div>

  <div class="stat-card">
    <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
    <span class="stat-value loading" id="unique-visitors">0</span>
    <span class="stat-label">Unique Visitors</span>
  </div>

  <div class="stat-card">
    <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
    <span class="stat-value">{{ site.posts | size }}</span>
    <span class="stat-label">Total Posts</span>
  </div>
</div>

<script>
  // Load total site views
  if (window.PageViewCounter) {
    window.PageViewCounter.getTotalSiteViews().then(data => {
      document.getElementById('total-views').textContent =
        window.PageViewCounter.formatNumber(data.total_views);
      document.getElementById('total-views').classList.remove('loading');

      document.getElementById('unique-visitors').textContent =
        window.PageViewCounter.formatNumber(data.total_unique);
      document.getElementById('unique-visitors').classList.remove('loading');
    });
  }
</script>
```

### Show Popular Posts

```html
<div class="popular-posts">
  <h3>Most Popular Posts</h3>
  <div id="popular-posts-list" class="popular-posts-list">
    <p>Loading...</p>
  </div>
</div>

<script>
  if (window.PageViewCounter) {
    window.PageViewCounter.getPopularPages(10).then(pages => {
      const container = document.getElementById('popular-posts-list');

      if (pages.length === 0) {
        container.innerHTML = '<p>No data yet. Check back soon!</p>';
        return;
      }

      container.innerHTML = pages.map((page, index) => `
        <div class="popular-post-item">
          <a href="${page.page_url}" class="popular-post-title">
            <span class="post-rank">${index + 1}</span>
            ${page.page_title || page.page_url}
          </a>
          <span class="popular-post-views">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            ${window.PageViewCounter.formatNumber(page.view_count)}
          </span>
        </div>
      `).join('');
    });
  }
</script>
```

### Add to Home Page

In `index.html`, add view counters to post cards:

```html
{% for post in paginator.posts %}
  <article class="post-card">
    <!-- ... existing post card content ... -->
    <div class="post-meta">
      <time>{{ post.date | date: "%b %d, %Y" }}</time>
      <span class="post-meta-separator">•</span>
      <span class="page-view-counter" data-view-counter="total" data-page-url="{{ post.url }}">
        <span class="view-count-number">0</span> views
      </span>
    </div>
  </article>
{% endfor %}
```

Note: For homepage view counts, you'll need to modify `page-views.js` to support `data-page-url` attribute.

## Custom JavaScript API

The counter exposes a JavaScript API you can use:

```javascript
// Get view count for current page
PageViewCounter.getViewCount().then(data => {
  console.log('Views:', data.view_count);
  console.log('Unique views:', data.unique_views);
});

// Get total site statistics
PageViewCounter.getTotalSiteViews().then(data => {
  console.log('Total views:', data.total_views);
  console.log('Total unique:', data.total_unique);
});

// Get popular pages
PageViewCounter.getPopularPages(10).then(pages => {
  pages.forEach(page => {
    console.log(page.page_title, ':', page.view_count, 'views');
  });
});

// Format numbers with commas
const formatted = PageViewCounter.formatNumber(12345); // "12,345"
```

## Privacy Features

The counter is privacy-friendly:
- ✅ **No cookies** - Uses sessionStorage only
- ✅ **No IP tracking** - Doesn't store personal data
- ✅ **Session-based deduplication** - Same visitor = 1 unique view per session
- ✅ **No cross-site tracking** - Data stays in your database
- ✅ **GDPR compliant** - No personally identifiable information stored

## Styling Customization

All styles are in `_sass/klise/_miscellaneous.scss`. Customize as needed:

```scss
.page-view-counter {
  // Change colors
  color: your-color;

  svg {
    color: your-icon-color;
  }

  .view-count-number {
    font-weight: 700; // Make count bold
    color: your-count-color;
  }
}
```

## Troubleshooting

### Counter shows 0 or "..."

1. Check browser console for errors
2. Verify Supabase credentials in `_config.yml`
3. Ensure Row Level Security policies are set correctly
4. Check network tab for failed API requests

### Views not increasing

1. Clear browser sessionStorage: `sessionStorage.clear()`
2. Try in incognito/private window
3. Check Supabase table editor for new rows
4. Verify the 2-second tracking delay hasn't been modified

### Counter not appearing

1. Verify `site.supabase.url` is set in `_config.yml`
2. Check that Supabase CDN script is loading
3. Ensure `page-views.js` is loading without errors
4. Check element has correct `data-view-counter` attribute

## Performance

The counter is optimized for performance:
- Loads asynchronously (won't block page render)
- 2-second delay before tracking (reduces bot counting)
- Single database call per page load
- Minimal JavaScript (<5KB)
- CDN-hosted Supabase client

## Cost Considerations

With Supabase free tier:
- **500 MB database** = millions of page views
- **50,000 monthly active users** = plenty for personal sites
- **2 GB bandwidth** = thousands of visits

You'll likely never exceed the free tier for a personal blog!

## Next Steps

1. Set up your Supabase project (see `SUPABASE_SETUP.md`)
2. Add credentials to `_config.yml` or Netlify environment variables
3. Deploy and test
4. Optional: Create a `/stats/` page to show site analytics
5. Optional: Add popular posts widget to homepage

Happy tracking! 📊
