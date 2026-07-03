// Search behavior for the Writing archive (/posts/).
(() => {
  document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('search-input');
    const container = document.getElementById('search-results-container');
    const results = document.getElementById('search-results');
    const title = document.getElementById('search-results-title');
    const noResults = document.getElementById('no-results');
    const clearBtn = document.getElementById('clear-results');
    const list = document.getElementById('posts-list');

    if (!input || !container || !window.SimpleJekyllSearch) return;

    function showAllPosts() {
      input.value = '';
      results.innerHTML = '';
      container.style.display = 'none';
      noResults.style.display = 'none';
      list.style.display = 'block';
    }

    if (clearBtn) clearBtn.addEventListener('click', showAllPosts);

    window.SimpleJekyllSearch({
      searchInput: input,
      resultsContainer: results,
      json: '/assets/search.json',
      searchResultTemplate:
        '<li class="archive-item"><a class="archive-item-link" href="{url}">{title}</a><time class="archive-item-date">{date}</time></li>',
      noResultsText: '',
      success: function () {
        input.addEventListener('input', function () {
          setTimeout(function () {
            const term = input.value.trim();
            if (term.length === 0) {
              showAllPosts();
              return;
            }
            const count = results.children.length;
            list.style.display = 'none';
            container.style.display = 'block';
            noResults.style.display = count > 0 ? 'none' : 'block';
            title.textContent = count > 0
              ? count + ' result' + (count === 1 ? '' : 's') + ' for “' + term + '”'
              : '';
          }, 100);
        });
      }
    });
  });
})();
