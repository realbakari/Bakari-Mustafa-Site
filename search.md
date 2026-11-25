---
title: Search
permalink: "/search/"
layout: page
hide_title: true
excerpt: Search articles, books, projects, and pages across bakarimustafa.com.
description: Search articles, book notes, projects, and pages across Bakari Mustafa's website.
comments: false
---
{::nomarkdown}
<div class="page-header">
  <h1>Search</h1>
  <p class="page-subtitle">Find articles, books, projects, and pages across the site.</p>
</div>

<div class="site-search" data-site-search>
  <search>
    <form class="site-search-form" role="search" action="/search/" method="GET" data-search-form>
      <label for="main-search-input" class="visually-hidden">Search site content</label>
      <div class="site-search-input-wrap">
        <input
          type="search"
          id="main-search-input"
          name="q"
          class="site-search-input"
          placeholder="Search writing, books, projects…"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          enterkeyhint="search"
        >
        <button type="button" id="clear-main-search" class="site-search-clear" aria-label="Clear search" hidden>Clear</button>
      </div>
    </form>
  </search>

  <div class="site-search-hints" id="search-hints">
    <span class="site-search-hints-label">Try</span>
    <button type="button" class="site-search-hint" data-query="Mavuno">Mavuno</button>
    <button type="button" class="site-search-hint" data-query="Dzaleka">Dzaleka</button>
    <button type="button" class="site-search-hint" data-query="Atomic Habits">Atomic Habits</button>
    <button type="button" class="site-search-hint" data-query="leadership">leadership</button>
  </div>

  <div class="books-filters site-search-filters" id="search-filters" role="group" aria-label="Filter results by type" hidden>
    <button type="button" class="books-filter-btn is-active" data-type="all" aria-pressed="true">All <span class="books-filter-count" data-type-count="all">0</span></button>
    <button type="button" class="books-filter-btn" data-type="post" aria-pressed="false">Writing <span class="books-filter-count" data-type-count="post">0</span></button>
    <button type="button" class="books-filter-btn" data-type="book" aria-pressed="false">Books <span class="books-filter-count" data-type-count="book">0</span></button>
    <button type="button" class="books-filter-btn" data-type="page" aria-pressed="false">Pages <span class="books-filter-count" data-type-count="page">0</span></button>
  </div>

  <p class="books-status" id="search-stats" aria-live="polite" hidden></p>

  <ul class="site-search-results" id="main-search-results" hidden></ul>

  <div class="site-search-empty" id="no-search-results" hidden>
    <p>No results for <strong id="search-query-display"></strong>.</p>
    <p class="site-search-empty-sub">Try a shorter keyword, or browse <a href="/posts/">writing</a>, <a href="/reading/">books</a>, or <a href="/projects/">projects</a>.</p>
  </div>

  <section class="ledger-section site-search-browse" id="search-welcome" aria-labelledby="search-browse-heading">
    <h2 id="search-browse-heading">Browse by section</h2>
    <ul class="ledger-list">
      <li class="ledger-row">
        <span class="ledger-key">Writing</span>
        <span class="ledger-val"><a href="/posts/">{{ site.posts | size }} essays and notes</a> · <a href="/tags/">Browse by tag</a></span>
      </li>
      <li class="ledger-row">
        <span class="ledger-key">Books</span>
        <span class="ledger-val"><a href="/reading/">{{ site.data.books | size }} books with covers</a> · <a href="/book-summaries/">Book summaries</a></span>
      </li>
      <li class="ledger-row">
        <span class="ledger-key">Projects</span>
        <span class="ledger-val"><a href="/projects/">Software, apps, and community work</a></span>
      </li>
      <li class="ledger-row">
        <span class="ledger-key">Archive</span>
        <span class="ledger-val"><a href="/the-message/">The Message sermon library</a> · <a href="/the-message/mac/">Mac &amp; iPhone apps</a></span>
      </li>
      <li class="ledger-row">
        <span class="ledger-key">About</span>
        <span class="ledger-val"><a href="/about/">Bio</a> · <a href="/now/">Now</a> · <a href="/uses/">Uses</a> · <a href="/press-kit/">Press kit</a></span>
      </li>
    </ul>
  </section>
</div>
{:/nomarkdown}
