/**
 * Performance Monitor
 * Tracks page performance and Core Web Vitals
 */

(function() {
  'use strict';

  function measurePerformance() {
    if (!window.performance) return;

    const perf = window.performance;
    const timing = perf.timing;

    // Calculate metrics
    const domLoad = timing.domContentLoadedEventEnd - timing.navigationStart;
    const pageLoad = timing.loadEventEnd - timing.navigationStart;
    const ttfb = timing.responseStart - timing.navigationStart;

    document.getElementById('dom-load').textContent = (domLoad / 1000).toFixed(2) + 's';
    document.getElementById('page-load').textContent = (pageLoad / 1000).toFixed(2) + 's';
    document.getElementById('ttfb').textContent = (ttfb / 1000).toFixed(2) + 's';

    // Track Core Web Vitals if available
    if ('PerformanceObserver' in window) {
      // LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.renderTime || lastEntry.loadTime;
          document.getElementById('lcp-value').textContent = (lcp / 1000).toFixed(2) + 's';
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        document.getElementById('lcp-value').textContent = 'N/A';
      }

      // FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0];
          const fid = firstInput.processingStart - firstInput.startTime;
          document.getElementById('fid-value').textContent = fid.toFixed(0) + 'ms';
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        document.getElementById('fid-value').textContent = 'N/A';
      }

      // CLS
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          document.getElementById('cls-value').textContent = clsValue.toFixed(3);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        document.getElementById('cls-value').textContent = 'N/A';
      }
    }

    generateRecommendations(pageLoad, domLoad, ttfb);
  }

  function generateRecommendations(pageLoad, domLoad, ttfb) {
    const recommendations = [];

    if (pageLoad > 3000) {
      recommendations.push({
        type: 'warning',
        title: 'Page Load Time High',
        message: `Page takes ${(pageLoad / 1000).toFixed(2)}s to load. Aim for under 3s.`,
        actions: ['Optimize images', 'Minify CSS/JS', 'Enable compression', 'Use CDN']
      });
    }

    if (ttfb > 600) {
      recommendations.push({
        type: 'warning',
        title: 'Slow Server Response',
        message: `TTFB is ${(ttfb / 1000).toFixed(2)}s. Aim for under 0.6s.`,
        actions: ['Optimize server', 'Enable caching', 'Use a CDN']
      });
    }

    // Check for large resources
    if (window.performance && window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource');
      const largeImages = resources.filter(r =>
        r.initiatorType === 'img' && r.transferSize > 200000
      );

      if (largeImages.length > 0) {
        recommendations.push({
          type: 'info',
          title: 'Large Images Detected',
          message: `Found ${largeImages.length} images over 200KB.`,
          actions: ['Compress images', 'Use WebP format', 'Implement lazy loading']
        });
      }
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        title: 'Great Performance!',
        message: 'Your page is performing well. Keep up the good work!',
        actions: []
      });
    }

    renderRecommendations(recommendations);
  }

  function renderRecommendations(recommendations) {
    const container = document.getElementById('perf-recommendations');
    if (!container) return;

    container.innerHTML = recommendations.map(rec => `
      <div class="recommendation-card ${rec.type}">
        <div class="rec-header">
          <span class="rec-icon">
            ${rec.type === 'warning' ? '⚠️' : rec.type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <h3>${rec.title}</h3>
        </div>
        <p>${rec.message}</p>
        ${rec.actions.length > 0 ? `
          <ul class="rec-actions">
            ${rec.actions.map(action => `<li>${action}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
  }

  function init() {
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    document.getElementById('refresh-perf')?.addEventListener('click', () => location.reload());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
