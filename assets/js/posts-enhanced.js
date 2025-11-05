(() => {
  // Enhanced Posts Page JavaScript
  // Wait for DOM and SimpleJekyllSearch to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchStatus = document.getElementById('search-status');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResults = document.getElementById('search-results');
    const noResultsMessage = document.getElementById('no-results');
    const clearResultsBtn = document.getElementById('clear-results');
    const postsList = document.getElementById('posts-list');
    const yearFilterBtns = document.querySelectorAll('.year-filter-btn');
    const tagFilterBtns = document.querySelectorAll('.tag-filter-btn');
    const sortSelect = document.getElementById('sort-select');

    let activeFilters = {
      year: 'all',
      tag: null,
      sort: 'newest'
    };

    // Clear search button functionality
    if (searchInput && clearSearchBtn) {
      searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
          clearSearchBtn.style.display = 'flex';
        } else {
          clearSearchBtn.style.display = 'none';
          searchStatus.textContent = '';
        }
      });

      clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchStatus.textContent = '';

        // Trigger search clear if SimpleJekyllSearch is available
        if (window.sjs) {
          searchInput.dispatchEvent(new Event('input'));
        }

        // Reset to show all posts
        resetSearch();
      });
    }

    // Reset search and show all posts
    function resetSearch() {
      if (searchResultsContainer) {
        searchResultsContainer.style.display = 'none';
      }
      if (postsList) {
        postsList.style.display = 'block';
      }
      if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
      }
      applyFilters();
    }

    // Clear results button
    if (clearResultsBtn) {
      clearResultsBtn.addEventListener('click', resetSearch);
    }

    // Override SimpleJekyllSearch callbacks if available
    if (window.SimpleJekyllSearch) {
      // Enhance the existing search
      const enhancedSearch = window.SimpleJekyllSearch({
        searchInput: searchInput,
        resultsContainer: searchResults,
        json: '/assets/search.json',
        searchResultTemplate: '<li><article class="post-card enhanced"><div class="post-card-content"><div class="post-card-meta"><span class="post-item-date">{date}</span></div><h3 class="post-item-title"><a href="{url}">{title}</a></h3><div class="post-card-footer"><div class="post-card-tags">{tags}</div><a href="{url}" class="read-more">Read more <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></div></div></article></li>',
        noResultsText: '',
        success: function(data) {
          // Search success callback
          searchInput.addEventListener('input', function() {
            setTimeout(() => {
              const resultsCount = searchResults.children.length;
              const searchTerm = searchInput.value.trim();

              if (searchTerm.length > 0) {
                postsList.style.display = 'none';
                searchResultsContainer.style.display = 'block';

                if (resultsCount > 0) {
                  document.getElementById('search-results-title').textContent =
                    `Found ${resultsCount} article${resultsCount !== 1 ? 's' : ''} matching "${searchTerm}"`;
                  noResultsMessage.style.display = 'none';
                  searchStatus.textContent = `${resultsCount} result${resultsCount !== 1 ? 's' : ''}`;
                } else {
                  document.getElementById('search-results-title').textContent = '';
                  noResultsMessage.style.display = 'block';
                  searchStatus.textContent = 'No results found';
                }
              } else {
                resetSearch();
              }
            }, 100);
          });
        }
      });
    }

    // Year filter functionality
    yearFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all year buttons
        yearFilterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        activeFilters.year = this.dataset.year;
        applyFilters();
      });
    });

    // Tag filter functionality
    tagFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tag = this.dataset.tag;

        if (activeFilters.tag === tag) {
          // Deactivate if already active
          this.classList.remove('active');
          activeFilters.tag = null;
        } else {
          // Remove active from all tags
          tagFilterBtns.forEach(b => b.classList.remove('active'));
          // Activate this tag
          this.classList.add('active');
          activeFilters.tag = tag;
        }

        applyFilters();
      });
    });

    // Sort functionality
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        activeFilters.sort = this.value;
        applyFilters();
      });
    }

    // Apply all active filters
    function applyFilters() {
      const yearSections = document.querySelectorAll('.year-section');
      const postCards = document.querySelectorAll('.post-card');

      // First, show all
      yearSections.forEach(section => {
        section.classList.remove('hidden');
        section.style.display = 'block';
      });
      postCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = 'block';
      });

      // Apply year filter
      if (activeFilters.year !== 'all') {
        yearSections.forEach(section => {
          if (section.dataset.year !== activeFilters.year) {
            section.classList.add('hidden');
            section.style.display = 'none';
          }
        });
        postCards.forEach(card => {
          if (card.dataset.year !== activeFilters.year) {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        });
      }

      // Apply tag filter
      if (activeFilters.tag) {
        postCards.forEach(card => {
          const tags = Array.from(card.querySelectorAll('.post-tag')).map(tag => tag.textContent.trim());
          if (!tags.includes(activeFilters.tag)) {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        });
      }

      // Hide empty year sections
      yearSections.forEach(section => {
        const visibleCards = section.querySelectorAll('.post-card:not(.hidden)');
        if (visibleCards.length === 0) {
          section.classList.add('hidden');
          section.style.display = 'none';
        }
      });

      // Apply sort
      applySorting();

      // Smooth scroll to top of posts list
      if (activeFilters.year !== 'all' || activeFilters.tag) {
        postsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Apply sorting to visible posts
    function applySorting() {
      const yearSections = Array.from(document.querySelectorAll('.year-section:not(.hidden)'));

      yearSections.forEach(section => {
        const cards = Array.from(section.querySelectorAll('.post-card:not(.hidden)'));

        cards.sort((a, b) => {
          switch(activeFilters.sort) {
            case 'oldest':
              return parseInt(a.dataset.date) - parseInt(b.dataset.date);
            case 'title':
              return a.dataset.title.localeCompare(b.dataset.title);
            case 'newest':
            default:
              return parseInt(b.dataset.date) - parseInt(a.dataset.date);
          }
        });

        // Re-append sorted cards
        const yearHeader = section.querySelector('.posts-year-header');
        cards.forEach(card => {
          section.appendChild(card);
        });

        // Move header back to top
        if (yearHeader) {
          section.insertBefore(yearHeader, section.firstChild);
        }
      });

      // Sort year sections themselves
      if (activeFilters.sort === 'oldest') {
        yearSections.sort((a, b) => parseInt(a.dataset.year) - parseInt(b.dataset.year));
      } else {
        yearSections.sort((a, b) => parseInt(b.dataset.year) - parseInt(a.dataset.year));
      }

      // Re-append sorted sections
      yearSections.forEach(section => {
        postsList.appendChild(section);
      });
    }

    // Smooth scroll for year navigation
    yearFilterBtns.forEach(btn => {
      if (btn.dataset.year !== 'all') {
        btn.addEventListener('click', function(e) {
          const year = this.dataset.year;
          const yearSection = document.getElementById(`year-${year}`);

          if (yearSection && !yearSection.classList.contains('hidden')) {
            setTimeout(() => {
              yearSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        });
      }
    });

    // Initialize with default sort
    applyFilters();

    // Add loading state while searching
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        if (this.value.length > 0) {
          postsList.classList.add('searching');
          searchTimeout = setTimeout(() => {
            postsList.classList.remove('searching');
          }, 300);
        }
      });
    }
  });
})();
