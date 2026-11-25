(() => {
  const root = document.querySelector("[data-site-search]");
  if (!root) return;

  const form = root.querySelector("[data-search-form]");
  const input = document.getElementById("main-search-input");
  const clearBtn = document.getElementById("clear-main-search");
  const hintsEl = document.getElementById("search-hints");
  const filtersEl = document.getElementById("search-filters");
  const statsEl = document.getElementById("search-stats");
  const resultsEl = document.getElementById("main-search-results");
  const emptyEl = document.getElementById("no-search-results");
  const queryDisplayEl = document.getElementById("search-query-display");
  const welcomeEl = document.getElementById("search-welcome");
  const filterBtns = Array.from(root.querySelectorAll("[data-type]"));
  const hintBtns = Array.from(root.querySelectorAll("[data-query]"));

  let index = [];
  let indexLoaded = false;
  let activeType = "all";

  function scoreItem(item, tokens, fullQuery) {
    const title = (item.title || "").toLowerCase();
    const author = (item.author || "").toLowerCase();
    const tags = (item.tags || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    const haystack = `${title} ${author} ${tags} ${desc}`;

    for (const tok of tokens) {
      if (!haystack.includes(tok)) return 0;
    }

    let score = 1;
    if (title === fullQuery) score += 100;
    else if (title.startsWith(fullQuery)) score += 60;
    else if (title.includes(fullQuery)) score += 40;

    if (author && author.includes(fullQuery)) score += 35;
    if (tags && tags.includes(fullQuery)) score += 20;

    for (const tok of tokens) {
      if (title.includes(tok)) score += 12;
      if (author.includes(tok)) score += 8;
      if (tags.includes(tok)) score += 5;
    }

    if (item.type === "book" && item.hasNotes) score += 4;
    return score;
  }

  function typeLabel(type) {
    if (type === "post") return "Writing";
    if (type === "book") return "Book";
    return "Page";
  }

  function buildRow(item) {
    const li = document.createElement("li");
    li.className = "site-search-item";

    const a = document.createElement("a");
    a.className = "site-search-row";
    a.href = item.url;

    const meta = document.createElement("span");
    meta.className = "site-search-when";
    meta.textContent = item.date || typeLabel(item.type);

    const body = document.createElement("div");
    body.className = "site-search-body";

    const titleLine = document.createElement("div");
    titleLine.className = "site-search-title-line";

    const title = document.createElement("span");
    title.className = "site-search-title";
    title.textContent = item.title;
    titleLine.appendChild(title);

    const kind = document.createElement("span");
    kind.className = "site-search-kind";
    kind.textContent = item.type === "book" && item.hasNotes ? "Book notes" : typeLabel(item.type);
    titleLine.appendChild(kind);

    body.appendChild(titleLine);

    const subText =
      item.type === "book" && item.author
        ? item.description && item.description !== item.author
          ? `${item.author} — ${item.description}`
          : item.author
        : item.description;

    if (subText) {
      const desc = document.createElement("p");
      desc.className = "site-search-desc";
      desc.textContent = subText;
      body.appendChild(desc);
    }

    a.appendChild(meta);
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function render() {
    const raw = input.value.trim();
    clearBtn.hidden = raw.length === 0;

    if (!raw) {
      welcomeEl.hidden = false;
      hintsEl.hidden = false;
      filtersEl.hidden = true;
      statsEl.hidden = true;
      resultsEl.hidden = true;
      emptyEl.hidden = true;
      resultsEl.textContent = "";
      return;
    }

    welcomeEl.hidden = true;
    hintsEl.hidden = true;

    if (!indexLoaded) {
      statsEl.hidden = false;
      statsEl.textContent = "Loading index…";
      return;
    }

    const fullQuery = raw.toLowerCase();
    const tokens = fullQuery.split(/\s+/).filter(Boolean);

    const matched = [];
    for (const item of index) {
      const s = scoreItem(item, tokens, fullQuery);
      if (s > 0) matched.push({ item, score: s });
    }
    matched.sort((a, b) => b.score - a.score);

    const counts = { all: matched.length, post: 0, book: 0, page: 0 };
    for (const m of matched) {
      if (counts[m.item.type] !== undefined) counts[m.item.type] += 1;
    }

    filterBtns.forEach((btn) => {
      const t = btn.dataset.type;
      const countEl = btn.querySelector("[data-type-count]");
      if (countEl && counts[t] !== undefined) countEl.textContent = String(counts[t]);
    });

    const filtered =
      activeType === "all" ? matched : matched.filter((m) => m.item.type === activeType);

    filtersEl.hidden = matched.length === 0;
    resultsEl.textContent = "";

    if (filtered.length > 0) {
      const frag = document.createDocumentFragment();
      filtered.slice(0, 60).forEach((m) => frag.appendChild(buildRow(m.item)));
      resultsEl.appendChild(frag);
      resultsEl.hidden = false;
      emptyEl.hidden = true;
      statsEl.hidden = false;
      const label = filtered.length === 1 ? "result" : "results";
      statsEl.textContent = `${filtered.length} ${label} for "${raw}"`;
    } else {
      resultsEl.hidden = true;
      statsEl.hidden = true;
      emptyEl.hidden = false;
      queryDisplayEl.textContent = raw;
    }
  }

  function syncUrl(q) {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  }

  fetch("/assets/search.json")
    .then((r) => r.json())
    .then((data) => {
      index = Array.isArray(data) ? data : [];
      indexLoaded = true;
      render();
    })
    .catch(() => {
      indexLoaded = true;
      statsEl.hidden = false;
      statsEl.textContent = "Could not load search index.";
    });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      render();
      syncUrl(input.value.trim());
    });
  }

  input.addEventListener("input", () => {
    render();
    syncUrl(input.value.trim());
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    activeType = "all";
    filterBtns.forEach((b) => {
      const isAll = b.dataset.type === "all";
      b.classList.toggle("is-active", isAll);
      b.setAttribute("aria-pressed", isAll ? "true" : "false");
    });
    render();
    syncUrl("");
    input.focus();
  });

  hintBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = btn.dataset.query || "";
      render();
      syncUrl(input.value.trim());
      input.focus();
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeType = btn.dataset.type || "all";
      filterBtns.forEach((b) => {
        const current = b === btn;
        b.classList.toggle("is-active", current);
        b.setAttribute("aria-pressed", current ? "true" : "false");
      });
      render();
    });
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (e.key === "Escape" && document.activeElement === input && input.value) {
      clearBtn.click();
    }
  });

  const initialQuery = new URLSearchParams(window.location.search).get("q");
  if (initialQuery) {
    input.value = initialQuery;
    render();
  }
})();
