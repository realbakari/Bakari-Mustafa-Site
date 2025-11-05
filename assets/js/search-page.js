(() => {
  // Dedicated Search Page JavaScript
  document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchInput = document.getElementById('main-search-input');
    const clearSearchBtn = document.getElementById('clear-main-search');
    const searchHints = document.getElementById('search-hints');
    const searchFilters = document.getElementById('search-filters');
    const searchStats = document.getElementById('search-stats');
    const searchStatsText = document.getElementById('search-stats-text');
    const resultsContainer = document.getElementById('main-search-results-container');
    const searchResults = document.getElementById('main-search-results');
    const noResultsMessage = document.getElementById('no-search-results');
    const searchQueryDisplay = document.getElementById('search-query-display');
    const welcomeState = document.getElementById('search-welcome');
    const filterBtns = document.querySelectorAll('.search-filter-btn');
    const hintBtns = document.querySelectorAll('.search-hint-btn');

    let currentFilter = 'all';

    // Initialize SimpleJekyllSearch
    const searchInstance = SimpleJekyllSearch({
      searchInput: searchInput,
      resultsContainer: searchResults,
      json: '/assets/search.json',
      searchResultTemplate: '<a href="{url}" class="search-result-item"><div class="result-header"><span class="result-type-badge type-{type}">{type}</span>{date}<span class="result-tags">{tags}</span></div><h3 class="result-title">{title}</h3><p class="result-description">{description}</p><div class="result-footer">Read more <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div></a>',
      templateMiddleware: function(prop, value, template) {
        // Add conditional rendering for date
        if (prop === 'date') {
          if (value) {
            return '<span class="result-date">' + value + '</span>';
          }
          return '';
        }

        // Format tags
        if (prop === 'tags' && value) {
          return '<span class="result-tags">Tags: ' + value + '</span>';
        }

        return value;
      },
      noResultsText: ''
    });

    // Clear search button
    if (searchInput && clearSearchBtn) {
      searchInput.addEventListener('input', function() {
        const value = this.value.trim();

        if (value.length > 0) {
          clearSearchBtn.style.display = 'flex';

          // Hide welcome state and hints
          if (welcomeState) welcomeState.style.display = 'none';
          if (searchHints) searchHints.style.display = 'none';

          // Show filters and results container
          if (searchFilters) searchFilters.style.display = 'block';
          if (resultsContainer) resultsContainer.style.display = 'block';
          if (searchStats) searchStats.style.display = 'block';

          // Wait for SimpleJekyllSearch to update results
          setTimeout(updateSearchResults, 100);
        } else {
          clearSearchBtn.style.display = 'none';
          resetSearch();
        }
      });

      clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        resetSearch();
      });
    }

    // Search hint buttons
    hintBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const query = this.dataset.query;
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    });

    // Filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');

        currentFilter = this.dataset.type;
        applyFilter();
      });
    });

    // Update search results display
    function updateSearchResults() {
      const resultItems = searchResults.querySelectorAll('.search-result-item');
      const count = resultItems.length;
      const query = searchInput.value.trim();

      if (count > 0) {
        // Show results
        searchResults.style.display = 'grid';
        noResultsMessage.style.display = 'none';

        // Update stats
        if (searchStatsText) {
          searchStatsText.textContent = `Found ${count} result${count !== 1 ? 's' : ''} for "${query}"`;
        }

        // Apply current filter
        applyFilter();
      } else {
        // No results
        searchResults.style.display = 'none';
        noResultsMessage.style.display = 'block';
        searchStats.style.display = 'none';

        if (searchQueryDisplay) {
          searchQueryDisplay.textContent = query;
        }
      }
    }

    // Apply type filter
    function applyFilter() {
      const resultItems = searchResults.querySelectorAll('.search-result-item');
      let visibleCount = 0;

      resultItems.forEach(item => {
        const typeBadge = item.querySelector('.result-type-badge');
        if (!typeBadge) return;

        const type = typeBadge.classList.contains('type-post') ? 'post' : 'page';

        if (currentFilter === 'all' || currentFilter === type) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      // Update stats with filter
      if (searchStatsText) {
        const query = searchInput.value.trim();
        const filterLabel = currentFilter === 'all' ? 'results' :
                           currentFilter === 'post' ? 'articles' : 'pages';
        searchStatsText.textContent = `Found ${visibleCount} ${filterLabel} for "${query}"`;
      }

      // Show/hide no results based on visible count
      if (visibleCount === 0 && currentFilter !== 'all') {
        noResultsMessage.style.display = 'block';
        searchResults.style.display = 'none';
        if (searchQueryDisplay) {
          searchQueryDisplay.textContent = searchInput.value.trim();
        }
      } else if (visibleCount > 0) {
        noResultsMessage.style.display = 'none';
        searchResults.style.display = 'grid';
      }
    }

    // Reset search to welcome state
    function resetSearch() {
      // Show welcome state and hints
      if (welcomeState) welcomeState.style.display = 'block';
      if (searchHints) searchHints.style.display = 'flex';

      // Hide search results and filters
      if (resultsContainer) resultsContainer.style.display = 'none';
      if (searchFilters) searchFilters.style.display = 'none';
      if (searchStats) searchStats.style.display = 'none';
      if (noResultsMessage) noResultsMessage.style.display = 'none';

      // Reset filter to all
      currentFilter = 'all';
      filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === 'all');
      });
    }

    // Check for URL parameters (search query from other pages)
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');

    if (queryParam) {
      searchInput.value = queryParam;
      searchInput.dispatchEvent(new Event('input'));
    }

    // Focus search input on page load
    setTimeout(() => {
      searchInput.focus();
    }, 100);

    // Keyboard shortcut: Cmd/Ctrl + K to focus search
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }

      // Escape to clear search
      if (e.key === 'Escape' && searchInput === document.activeElement) {
        if (searchInput.value) {
          searchInput.value = '';
          clearSearchBtn.style.display = 'none';
          resetSearch();
        }
      }
    });
  });
})();
