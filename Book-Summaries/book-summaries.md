---
title: Book Summaries
permalink: "/book-summaries/"
layout: page
hide_title: true
excerpt: A running archive of book summaries and notes from books that have shaped how I think about leadership, business, psychology, and creative work.
comments: false
image: "/uploads/alfons-morales-ylswjsy7stw-unsplash.jpg"
description: This page shares a full list of book summaries I have compiled during my reading and research. Click any book to browse my full notes on it.
---
{%- assign summary_books = site.data.books | where_exp: "b", "b.summary_year" -%}
{%- assign summary_years = "2022,2021,2020,2019" | split: "," -%}

{::nomarkdown}
<div class="page-header books-page-header" id="top">
  <h1>Book Summaries</h1>
  <p class="page-subtitle">A running archive of {{ summary_books.size }} book summaries and notes from books that have shaped how I think about leadership, business, psychology, and creative work.</p>
  <p class="books-stats-line">
    <span>{{ summary_books.size }} summaries</span>
    <a href="/reading/">Full reading log ({{ site.data.books.size }} books)</a>
    <a href="/book-repository/">Recommended by topic</a>
  </p>
</div>

<nav class="books-jump" aria-label="Jump to year">
  {%- for y in summary_years -%}
    {%- assign y_num = y | plus: 0 -%}
    {%- assign y_books = summary_books | where: "summary_year", y_num -%}
    {%- if y_books.size > 0 -%}
      <a class="books-jump-link" href="#year-{{ y }}">
        <span class="books-jump-label">{{ y }}</span>
        <span class="books-jump-count">{{ y_books.size }}</span>
      </a>
    {%- endif -%}
  {%- endfor -%}
</nav>

<div class="books-directory">
  {%- for y in summary_years -%}
    {%- assign y_num = y | plus: 0 -%}
    {%- assign y_books = summary_books | where: "summary_year", y_num -%}
    {%- if y_books.size > 0 -%}
      <section class="books-year{% if forloop.index > 2 %} books-year--deferred{% endif %}" id="year-{{ y }}">
        <div class="books-year-head">
          <h2>{{ y }} <span class="books-year-count">{{ y_books.size }}</span></h2>
          <a class="books-year-top" href="#top">Top ↑</a>
        </div>
        <ul class="books-ledger">
          {%- for book in y_books -%}
            <li class="books-ledger-item">
              <a class="books-row books-row--linked" href="{{ book.summary_url }}">
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
                  {%- if book.blurb -%}<span class="books-row-blurb">{{ book.blurb }}</span>{%- endif -%}
                </div>
                <span class="books-row-cta">Read notes →</span>
              </a>
            </li>
          {%- endfor -%}
        </ul>
      </section>
    {%- endif -%}
  {%- endfor -%}
</div>

<p class="books-page-footer">Browse the summaries above, explore my <a href="/reading/">complete reading log</a>, or view <a href="/book-repository/">recommendations by topic</a>.</p>
{:/nomarkdown}
