---
title: Book Repository
permalink: "/book-repository/"
layout: page
hide_title: true
excerpt: A curated repository of books I've read and recommend by topic and year, complete with covers and links to my notes.
comments: false
image: "/uploads/alfons-morales-ylswjsy7stw-unsplash.jpg"
description: A curated repository of books Bakari Mustafa has read and recommends by topic and year, with book covers and links to summaries.
---
{%- assign all_books = site.data.books -%}
{%- assign rec_groups = "Entrepreneurship,Finance,Leadership,Management,Art & Creativity,Artist Biographies,Photography" | split: "," -%}
{%- assign log_years = "2020,2019,2018" | split: "," -%}

{::nomarkdown}
<div class="page-header books-page-header" id="top">
  <h1>Book Repository</h1>
  <p class="page-subtitle">A curated repository of books I've read or re-read across entrepreneurship, finance, leadership, creativity, and history. If I don't enjoy a book, I usually don't finish it—favorites are marked with ★.</p>
  <p class="books-stats-line">
    <a href="/reading/">Full reading log ({{ all_books.size }} books)</a>
    <a href="/book-summaries/">Book summaries</a>
  </p>
</div>

<nav class="books-jump" aria-label="Jump to section">
  {%- for grp in rec_groups -%}
    {%- assign g_books = all_books | where: "recommended_group", grp -%}
    {%- if g_books.size > 0 -%}
      <a class="books-jump-link" href="#group-{{ grp | slugify }}">
        <span class="books-jump-label">{{ grp }}</span>
        <span class="books-jump-count">{{ g_books.size }}</span>
      </a>
    {%- endif -%}
  {%- endfor -%}
  {%- for y in log_years -%}
    {%- assign y_num = y | plus: 0 -%}
    {%- assign y_books = all_books | where: "year", y_num -%}
    {%- if y_books.size > 0 -%}
      <a class="books-jump-link" href="#year-{{ y }}">
        <span class="books-jump-label">{{ y }}</span>
        <span class="books-jump-count">{{ y_books.size }}</span>
      </a>
    {%- endif -%}
  {%- endfor -%}
</nav>

<div class="books-directory">
  {%- for grp in rec_groups -%}
    {%- assign g_books = all_books | where: "recommended_group", grp -%}
    {%- if g_books.size > 0 -%}
      <section class="books-year{% if forloop.index > 2 %} books-year--deferred{% endif %}" id="group-{{ grp | slugify }}">
        <div class="books-year-head">
          <h2>Best {{ grp }} Books <span class="books-year-count">{{ g_books.size }}</span></h2>
          <a class="books-year-top" href="#top">Top ↑</a>
        </div>
        <ul class="books-ledger">
          {%- for book in g_books -%}
            {%- assign book_href = book.summary_url -%}
            {%- assign is_external = false -%}
            {%- unless book_href -%}
              {%- assign query = book.title | append: " " | append: book.author | url_encode -%}
              {%- assign book_href = "https://bookshop.org/search?keywords=" | append: query -%}
              {%- assign is_external = true -%}
            {%- endunless -%}
            <li class="books-ledger-item">
              <a class="books-row{% if book.summary_url %} books-row--linked{% endif %}" href="{{ book_href }}"{% if is_external %} target="_blank" rel="noopener noreferrer"{% endif %}>
                {%- if forloop.parentloop.first and forloop.index <= 2 -%}
                  {% include book-cover.html book=book size="thumb" priority="high" %}
                {%- elsif forloop.parentloop.first -%}
                  {% include book-cover.html book=book size="thumb" %}
                {%- else -%}
                  {% include book-cover.html book=book size="thumb" lazy=true %}
                {%- endif -%}
                <div class="books-row-body">
                  <span class="books-row-title"><cite>{{ book.title }}</cite>{% if book.favorite %} <span class="books-fav" title="Favorite" aria-label="Favorite">★</span>{% endif %}</span>
                  <span class="books-row-author">{{ book.author }}</span>
                </div>
                {%- if book.summary_url -%}
                  <span class="books-row-cta">Notes →</span>
                {%- endif -%}
              </a>
            </li>
          {%- endfor -%}
        </ul>
      </section>
    {%- endif -%}
  {%- endfor -%}

  {%- for y in log_years -%}
    {%- assign y_num = y | plus: 0 -%}
    {%- assign y_books = all_books | where: "year", y_num -%}
    {%- if y_books.size > 0 -%}
      <section class="books-year books-year--deferred" id="year-{{ y }}">
        <div class="books-year-head">
          <h2>{{ y }} <span class="books-year-count">{{ y_books.size }}</span></h2>
          <a class="books-year-top" href="#top">Top ↑</a>
        </div>
        <ul class="books-ledger">
          {%- for book in y_books -%}
            {%- assign book_href = book.summary_url -%}
            {%- assign is_external = false -%}
            {%- unless book_href -%}
              {%- assign query = book.title | append: " " | append: book.author | url_encode -%}
              {%- assign book_href = "https://bookshop.org/search?keywords=" | append: query -%}
              {%- assign is_external = true -%}
            {%- endunless -%}
            <li class="books-ledger-item">
              <a class="books-row{% if book.summary_url %} books-row--linked{% endif %}" href="{{ book_href }}"{% if is_external %} target="_blank" rel="noopener noreferrer"{% endif %}>
                {% include book-cover.html book=book size="thumb" lazy=true %}
                <div class="books-row-body">
                  <span class="books-row-title"><cite>{{ book.title }}</cite>{% if book.favorite %} <span class="books-fav" title="Favorite" aria-label="Favorite">★</span>{% endif %}</span>
                  <span class="books-row-author">{{ book.author }}</span>
                </div>
                {%- if book.summary_url -%}
                  <span class="books-row-cta">Notes →</span>
                {%- else -%}
                  <span class="books-row-tag">{{ book.category }}</span>
                {%- endif -%}
              </a>
            </li>
          {%- endfor -%}
        </ul>
      </section>
    {%- endif -%}
  {%- endfor -%}
</div>
{:/nomarkdown}
