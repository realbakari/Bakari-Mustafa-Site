(function () {
  const root = document.querySelector("[data-books-directory]");
  if (!root) return;

  const filterButtons = Array.from(root.querySelectorAll("[data-book-filter]"));
  const searchInput = root.querySelector("[data-book-search]");
  const statusEl = root.querySelector("[data-books-status]");
  const emptyEl = root.querySelector("[data-books-empty]");
  const sections = Array.from(root.querySelectorAll("[data-books-group]"));
  const items = Array.from(root.querySelectorAll("[data-book-item]"));

  let activeFilter = "all";
  let query = "";

  function applyFilters() {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const hasNotes = item.dataset.hasNotes === "true";
      const isFav = item.dataset.favorite === "true";
      const haystack = item.dataset.search || "";

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "notes" && hasNotes) ||
        (activeFilter === "favorites" && isFav);

      const matchesQuery = !q || haystack.includes(q);
      const show = matchesFilter && matchesQuery;

      item.hidden = !show;
      if (show) visibleCount += 1;
    });

    sections.forEach((section) => {
      const groupItems = section.querySelectorAll("[data-book-item]");
      let groupVisible = 0;
      groupItems.forEach((el) => {
        if (!el.hidden) groupVisible += 1;
      });
      section.hidden = groupVisible === 0;
      const countEl = section.querySelector("[data-group-count]");
      if (countEl) countEl.textContent = String(groupVisible);
    });

    if (emptyEl) {
      emptyEl.hidden = visibleCount > 0;
    }

    if (statusEl) {
      if (activeFilter === "all" && !q) {
        statusEl.textContent = `Showing all ${items.length} books`;
      } else {
        statusEl.textContent = `Showing ${visibleCount} of ${items.length} books`;
      }
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.bookFilter || "all";
      filterButtons.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle("is-active", isCurrent);
        b.setAttribute("aria-pressed", isCurrent ? "true" : "false");
      });
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      query = searchInput.value;
      applyFilters();
    });
  }
})();
