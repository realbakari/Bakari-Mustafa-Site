---
title: Reading
permalink: "/reading/"
layout: page
hide_title: true
excerpt: Books I've read, summaries I've written, and recommendations across business, personal development, science, fiction, and philosophy.
description: Explore Bakari Mustafa's reading log and book library with covers, notes, summaries, and recommendations across business, leadership, science, fiction, and philosophy.
image: '/uploads/bakari_mustafa.jpg'
comments: false
---
{%- assign all_books = site.data.books -%}
{%- assign shelf_books = all_books | where: "shelf", true -%}
{%- assign noted_books = all_books | where_exp: "b", "b.summary_url" -%}
{%- assign favorite_books = all_books | where: "favorite", true -%}
{%- assign curated_books = all_books | where_exp: "b", "b.year == nil" -%}
{%- assign years = "2025,2022,2021,2020,2019,2018" | split: "," -%}

{::nomarkdown}
<div class="page-header books-page-header" id="top">
  <h1>Reading</h1>
  <p class="page-subtitle">A running log of {{ all_books.size }} books I've read, summarized, or recommend across business, leadership, science, philosophy, and fiction.</p>
  <p class="books-stats-line">
    <span>{{ all_books.size }} books</span>
    <a href="/book-summaries/">{{ noted_books.size }} with notes</a>
    <span>{{ favorite_books.size }} favorites ★</span>
    <a href="/book-repository/">By topic</a>
  </p>
</div>

<section class="books-shelf-section" aria-labelledby="shelf-heading">
  <div class="books-section-head">
    <h2 id="shelf-heading">On the shelf</h2>
    <span class="books-section-meta">Recent &amp; revisited</span>
  </div>
  <div class="books-shelf">
    {%- for book in shelf_books limit: 8 -%}
      {%- assign book_href = book.summary_url -%}
      {%- assign is_external = false -%}
      {%- unless book_href -%}
        {%- assign query = book.title | append: " " | append: book.author | url_encode -%}
        {%- assign book_href = "https://bookshop.org/search?keywords=" | append: query -%}
        {%- assign is_external = true -%}
      {%- endunless -%}
      <a class="books-shelf-card" href="{{ book_href }}"{% if is_external %} target="_blank" rel="noopener noreferrer"{% endif %}>
        {%- if forloop.index <= 2 -%}
          {% include book-cover.html book=book size="shelf" priority="high" %}
        {%- else -%}
          {% include book-cover.html book=book size="shelf" %}
        {%- endif -%}
        <span class="books-shelf-title">{{ book.title }}</span>
        <span class="books-shelf-author">{{ book.author }}</span>
      </a>
    {%- endfor -%}
  </div>
</section>

<nav class="books-jump" aria-label="Jump to year">
  {%- for y in years -%}
    {%- assign y_num = y | plus: 0 -%}
    {%- assign y_books = all_books | where: "year", y_num -%}
    {%- if y_books.size > 0 -%}
      <a class="books-jump-link" href="#year-{{ y }}">
        <span class="books-jump-label">{{ y }}</span>
        <span class="books-jump-count">{{ y_books.size }}</span>
      </a>
    {%- endif -%}
  {%- endfor -%}
  {%- if curated_books.size > 0 -%}
    <a class="books-jump-link" href="#curated">
      <span class="books-jump-label">Curated</span>
      <span class="books-jump-count">{{ curated_books.size }}</span>
    </a>
  {%- endif -%}
</nav>

<div class="books-directory" data-books-directory>
  <div class="books-controls">
    <div class="books-filters" role="group" aria-label="Filter books">
      <button type="button" class="books-filter-btn is-active" data-book-filter="all" aria-pressed="true">All <span class="books-filter-count">{{ all_books.size }}</span></button>
      <button type="button" class="books-filter-btn" data-book-filter="notes" aria-pressed="false">With notes <span class="books-filter-count">{{ noted_books.size }}</span></button>
      <button type="button" class="books-filter-btn" data-book-filter="favorites" aria-pressed="false">Favorites ★ <span class="books-filter-count">{{ favorite_books.size }}</span></button>
    </div>
    <div class="books-search">
      <input type="search" placeholder="Filter by title, author, or topic…" aria-label="Filter books by title, author, or topic" data-book-search>
    </div>
  </div>
  <p class="books-status" data-books-status aria-live="polite">Showing all {{ all_books.size }} books</p>

  {%- for y in years -%}
    {%- assign y_num = y | plus: 0 -%}
    {%- assign y_books = all_books | where: "year", y_num -%}
    {%- if y_books.size > 0 -%}
      <section class="books-year{% if forloop.index > 2 %} books-year--deferred{% endif %}" id="year-{{ y }}" data-books-group>
        <div class="books-year-head">
          <h2>{{ y }} <span class="books-year-count" data-group-count>{{ y_books.size }}</span></h2>
          <a class="books-year-top" href="#top">Top ↑</a>
        </div>
        <ul class="books-ledger">
          {%- for book in y_books -%}
            {%- assign has_notes = false -%}
            {%- if book.summary_url -%}{%- assign has_notes = true -%}{%- endif -%}
            {%- assign search_blob = book.title | append: " " | append: book.author | append: " " | append: book.category | append: " " | append: book.blurb | downcase -%}
            <li class="books-ledger-item" data-book-item data-has-notes="{{ has_notes }}" data-favorite="{% if book.favorite %}true{% else %}false{% endif %}" data-search="{{ search_blob | escape }}">
              {%- if book.summary_url -%}
                <a class="books-row books-row--linked" href="{{ book.summary_url }}">
                  {% include book-cover.html book=book size="thumb" lazy=true %}
                  <div class="books-row-body">
                    <span class="books-row-title"><cite>{{ book.title }}</cite>{% if book.favorite %} <span class="books-fav" title="Favorite" aria-label="Favorite">★</span>{% endif %}</span>
                    <span class="books-row-author">{{ book.author }}</span>
                    {%- if book.blurb -%}<span class="books-row-blurb">{{ book.blurb }}</span>{%- endif -%}
                  </div>
                  <span class="books-row-cta">Notes →</span>
                </a>
              {%- else -%}
                {%- assign query = book.title | append: " " | append: book.author | url_encode -%}
                <a class="books-row" href="https://bookshop.org/search?keywords={{ query }}" target="_blank" rel="noopener noreferrer">
                  {% include book-cover.html book=book size="thumb" lazy=true %}
                  <div class="books-row-body">
                    <span class="books-row-title"><cite>{{ book.title }}</cite>{% if book.favorite %} <span class="books-fav" title="Favorite" aria-label="Favorite">★</span>{% endif %}</span>
                    <span class="books-row-author">{{ book.author }}</span>
                    {%- if book.blurb -%}<span class="books-row-blurb">{{ book.blurb }}</span>{%- endif -%}
                  </div>
                  <span class="books-row-tag">{{ book.category }}</span>
                </a>
              {%- endif -%}
            </li>
          {%- endfor -%}
        </ul>
      </section>
    {%- endif -%}
  {%- endfor -%}

  {%- if curated_books.size > 0 -%}
    <section class="books-year books-year--deferred" id="curated" data-books-group>
      <div class="books-year-head">
        <h2>Recommended classics <span class="books-year-count" data-group-count>{{ curated_books.size }}</span></h2>
        <a class="books-year-top" href="#top">Top ↑</a>
      </div>
      <ul class="books-ledger">
        {%- for book in curated_books -%}
          {%- assign search_blob = book.title | append: " " | append: book.author | append: " " | append: book.category | append: " " | append: book.recommended_group | downcase -%}
          {%- assign query = book.title | append: " " | append: book.author | url_encode -%}
          <li class="books-ledger-item" data-book-item data-has-notes="false" data-favorite="{% if book.favorite %}true{% else %}false{% endif %}" data-search="{{ search_blob | escape }}">
            <a class="books-row" href="https://bookshop.org/search?keywords={{ query }}" target="_blank" rel="noopener noreferrer">
              {% include book-cover.html book=book size="thumb" lazy=true %}
              <div class="books-row-body">
                <span class="books-row-title"><cite>{{ book.title }}</cite>{% if book.favorite %} <span class="books-fav" title="Favorite" aria-label="Favorite">★</span>{% endif %}</span>
                <span class="books-row-author">{{ book.author }}</span>
              </div>
              <span class="books-row-tag">{{ book.recommended_group | default: book.category }}</span>
            </a>
          </li>
        {%- endfor -%}
      </ul>
    </section>
  {%- endif -%}

  <p class="books-empty" data-books-empty hidden>No books match your filter.</p>
</div>

<section class="books-essays" aria-labelledby="essays-heading">
  <h2 id="essays-heading">Reading lists and essays</h2>
  <ul class="books-essay-list">
    <li><a href="/the-best-books-recommended-reading-list/">The Best Books — Recommended Reading List (2022)</a></li>
    <li><a href="/21-books-everyone-should-read-at-least-once-in-their-lives/">21 Books Everyone Should Read at Least Once in Their Lives</a></li>
    <li><a href="/5-books-recommendation-that-will-make-your-life-better/">5 Books Recommendation That Will Make Your Life Better</a></li>
    <li><a href="/10-japanese-books-you-need-to-read/">10 Japanese Books You Need to Read</a></li>
  </ul>
  <p class="books-page-footer">Have a book recommendation? Send it on <a href="https://twitter.com/realbakari" target="_blank" rel="noopener noreferrer">Twitter</a> or by <a href="mailto:bakari@bakarimustafa.com">email</a>.</p>
</section>
{:/nomarkdown}
