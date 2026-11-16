---
title: Kora for Mac
permalink: "/kora/"
layout: page
hide_title: true
full_width: true
comments: false
# download_ready shows Download for Mac, linked to the latest release on
# github.com/realbakari/kora-releases, with the version and release notes beneath it.
# Update version with each release.
download_ready: true
version: "1.0.0"
excerpt: "A home on your Mac for a community’s photos, videos, recordings, flyers and newsletters. Bring them together, describe them as you go, find anything again, and turn what you’ve kept into stories, exhibitions and reports."
description: "Kora for Mac: an archive app for community organisations. Import photos, videos, audio and documents without changing the originals; record dates, places, people, events and consent; search the words in documents and photos; and make stories, exhibitions and annual reports. No account, no analytics, and an optional assistant that runs only on your Mac."
image: "/assets/img/kora/hero.jpg"
---

<link rel="stylesheet" href="/assets/js/kora/stages.css">
<script src="/assets/js/kora/stages.js" defer></script>

<style>
/* One family (the site's), one compact scale, whitespace instead of boxes and
   rules: the page follows Kora's own design. Kora's terracotta marks the one
   prominent action. */
.page-content .kp {
  --kp-accent: #b5482a;
  container: kp / inline-size;
  color: var(--text-primary);
  padding-bottom: 4rem;
}
[data-theme="dark"] .page-content .kp { --kp-accent: #bf5532; }
.page-content .kp p { padding: 0 !important; }
.page-content .kp a { text-decoration: none; }
.page-content .kp img { display: block; max-width: 100%; height: auto; }

/* ── Hero ─────────────────────────────────────────────────────── */
.page-content .kp .kp-hero {
  text-align: center;
  margin: 4rem auto 3rem;
  max-width: 720px;
}
.page-content .kp .kp-icon {
  width: 104px;
  height: 104px;
  margin: 0 auto 1.5rem;
}
.page-content .kp .kp-eyebrow {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem !important;
}
.page-content .kp .kp-hero h1 {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0 0 1rem;
}
.page-content .kp .kp-lede {
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 auto 2rem !important;
  max-width: 34em;
}
.page-content .kp .kp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.page-content .kp .kp-button {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.125rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  background: var(--kp-accent);
  color: #fff !important;
}
.page-content .kp .kp-button:hover { background: color-mix(in srgb, var(--kp-accent), #000 10%); }
.page-content .kp .kp-textlink {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-primary);
}
.page-content .kp .kp-textlink:hover { color: var(--kp-accent); }
.page-content .kp .kp-meta {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

/* ── Scenes: each slot holds its scene's shape before the script runs ── */
.page-content .kp .kp-stage { position: relative; width: 100%; margin: 0 auto; }
.page-content .kp .kp-stage-fallback { width: 100%; height: 100%; object-fit: cover; object-position: top left; border-radius: 14px; }
.page-content .kp .kp-hero-stage { aspect-ratio: 1000 / 540; max-width: 1000px; margin-bottom: 5rem; }
.page-content .kp .kp-scene { container: kps / inline-size; }
.page-content .kp .kp-scene .kp-stage { aspect-ratio: 520 / 440; max-width: 520px; }

/* ── Feature rows: copy beside a scene, alternating sides ─────── */
.page-content .kp .kp-row {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  margin: 0 0 6rem;
}
.page-content .kp .kp-row.is-flipped { grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); }
.page-content .kp .kp-row.is-flipped .kp-copy { order: 2; }
/* Two classes deep, to settle over the site's long-form heading sizes */
.page-content .kp .kp-copy h2,
.page-content .kp .kp-closing h2 {
  font-size: clamp(1.5rem, 2.6vw, 1.875rem);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin: 0 0 0.875rem;
}
.page-content .kp .kp-copy > p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 1.25rem !important;
}
.page-content .kp .kp-copy > p:last-child { margin-bottom: 0 !important; }
.page-content .kp .kp-points {
  list-style: none;
  margin: 0;
  padding: 0;
}
.page-content .kp .kp-points li {
  margin: 0;
  padding: 0 0 0 1.3em; /* the site's dash hangs 1.3em left: keep it inside the column */
  font-size: 0.9875rem;
  line-height: 1.55;
}
.page-content .kp .kp-points li + li { margin-top: 0.75rem; }
.page-content .kp .kp-kbd {
  font-family: inherit;
  font-size: 0.875em;
  font-weight: 500;
  padding: 0.05em 0.4em;
  border-radius: 5px;
  background: var(--bg-tertiary);
  white-space: nowrap;
}

/* The import, in two columns under the hero */
.page-content .kp .kp-stack {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
  margin: 0 0 6rem;
}

/* Two subjects side by side, words only */
.page-content .kp .kp-pair {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2.5rem clamp(1.5rem, 4vw, 3.5rem);
  margin: 0 0 6rem;
}

/* ── Making things from the archive: a heading, then three ────── */
.page-content .kp .kp-make { margin: 0 0 6rem; }
.page-content .kp .kp-make > .kp-copy { max-width: 40em; margin-bottom: 2.25rem; }
.page-content .kp .kp-three {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem clamp(1.5rem, 3vw, 2.5rem);
}

/* ── Everything else, in a compact grid ───────────────────────── */
.page-content .kp .kp-more { margin: 0 0 6rem; }
.page-content .kp .kp-more > .kp-copy { margin-bottom: 2rem; }
.page-content .kp .kp-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.25rem clamp(1.5rem, 3vw, 2.5rem);
}
.page-content .kp .kp-three h3,
.page-content .kp .kp-grid h3 {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 0 0 0.375rem;
}
.page-content .kp .kp-three p,
.page-content .kp .kp-grid p {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ── Closing: privacy and what's next ─────────────────────────── */
.page-content .kp .kp-closing {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2.5rem clamp(1.5rem, 4vw, 3.5rem);
  margin-bottom: 4rem;
}
.page-content .kp .kp-closing h2 { font-size: 1.375rem; margin-bottom: 0.625rem; }
.page-content .kp .kp-points li::before { color: var(--text-tertiary); }
.page-content .kp .kp-closing p {
  font-size: 0.9875rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.page-content .kp .kp-closing p + p { margin-top: 0.75rem !important; }
.page-content .kp .kp-closing a, .page-content .kp .kp-credits a, .page-content .kp .kp-meta a { color: var(--text-primary); border-bottom: 1px solid var(--border-strong); }
.page-content .kp .kp-closing a:hover, .page-content .kp .kp-credits a:hover, .page-content .kp .kp-meta a:hover { border-color: var(--text-primary); }
.page-content .kp .kp-credits {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-tertiary);
  max-width: 720px;
}

@media (max-width: 860px) {
.page-content .kp .kp-row, .page-content .kp .kp-row.is-flipped, .page-content .kp .kp-stack { grid-template-columns: minmax(0, 1fr); margin-bottom: 4.5rem; }
.page-content .kp .kp-row.is-flipped .kp-copy { order: 0; }
.page-content .kp .kp-pair, .page-content .kp .kp-closing { grid-template-columns: minmax(0, 1fr); }
.page-content .kp .kp-pair, .page-content .kp .kp-make, .page-content .kp .kp-more { margin-bottom: 4.5rem; }
}
@media (max-width: 640px) {
.page-content .kp .kp-three, .page-content .kp .kp-grid { grid-template-columns: minmax(0, 1fr); gap: 1.75rem; }
}
/* The scenes switch to their phone designs in narrow columns; the slots follow. */
@container kp (max-width: 819px) {
.page-content .kp .kp-hero-stage { aspect-ratio: 358 / 372; max-width: 358px; }
}
@container kps (max-width: 519px) {
.page-content .kp .kp-scene .kp-stage { aspect-ratio: 358 / 420; max-width: 358px; }
}
@media (max-width: 560px) {
.page-content .kp .kp-hero { margin-top: 2.5rem; }
.page-content .kp .kp-hero-stage { margin-bottom: 3.5rem; }
}
</style>

<div class="kp">

<div class="kp-hero">
  <img class="kp-icon" src="/assets/img/kora/icon.png" alt="The Kora app icon: a kora, the West African harp, in cream on terracotta" width="104" height="104">
  <p class="kp-eyebrow">For Mac{% unless page.download_ready %} · In development{% endunless %}</p>
  <h1>Kora</h1>
  <p class="kp-lede">A home for your community’s photos, videos, recordings, flyers and newsletters. Bring years of scattered files together, describe them as you go, find anything again, and turn what you’ve kept into stories, exhibitions and reports.</p>
  <div class="kp-actions">
{% if page.download_ready %}
    <a class="kp-button" href="https://github.com/realbakari/kora-releases/releases/latest">Download for Mac</a>
    <a class="kp-textlink" href="#features">See what it does</a>
{% else %}
    <a class="kp-button" href="#features">See what it does</a>
{% endif %}
  </div>
{% if page.download_ready %}
  <p class="kp-meta">{% if page.version != "" %}Version {{ page.version }} · {% endif %}For macOS 15 or later · <a href="https://github.com/realbakari/kora-releases/releases">Release notes</a></p>
{% else %}
  <p class="kp-meta">Not yet available to download · For macOS 15 or later</p>
{% endif %}
</div>

<div class="kp-stage kp-hero-stage" id="ko-hero-stage" role="img" aria-label="Kora’s library window, its sidebar listing Library, Organise and Discover. A folder called Harmony Day 2026 is dragged in from Finder; the new photos arrive at the top of All Assets and fill in as their previews are made, the count goes from 1,184 to 1,220 items, and the status bar reads Imported 36 items, 2 duplicates skipped.">
  <img class="kp-stage-fallback" src="/assets/img/kora/hero.jpg" width="2000" height="1080" alt="">
</div>

<section class="kp-stack" id="features">
  <div class="kp-copy">
    <h2>Bring it all together</h2>
    <p>Drag in files or whole folders from a computer, an old drive or a USB stick. Kora takes photos, videos, audio, PDFs, documents, presentations and spreadsheets, makes a preview of each, and reads the details and the words already in the files.</p>
  </div>
  <ul class="kp-points">
    <li>Your originals stay where they are and are never changed. Kora can also keep its own copy, for a drive that has to go back to its owner.</li>
    <li>An import that’s interrupted picks up where it stopped.</li>
    <li>Anything Kora can’t read is listed with what went wrong and what to do. Nothing is skipped silently.</li>
    <li>Duplicates are recognised by their content, whatever they’re called.</li>
  </ul>
</section>

<section class="kp-row">
  <div class="kp-copy">
    <h2>Describe as you go</h2>
    <p>Select anything and its details sit beside it: title, description, date, place, community, creator, source, copyright, licence, consent and notes. A date nobody knows stays blank. Kora never guesses one.</p>
    <ul class="kp-points">
      <li>Record consent for every item: Not Recorded, Not Required, Pending, Obtained, Refused or Withdrawn.</li>
      <li>Every change goes into the item’s history: what changed, who changed it and when.</li>
      <li>Tags are suggested as you type, and “Youth” and “youth” stay one tag.</li>
      <li>Edit many items at once. Only the fields you touch change, and <span class="kp-kbd">⌘Z</span> undoes the lot.</li>
    </ul>
  </div>
  <div class="kp-scene">
    <div class="kp-stage" id="ko-detail-stage" role="img" aria-label="Kora’s inspector for a photo called Opening night. Its date created is unknown and shows as a dash. Under Source & Rights, Consent is changed from Not Recorded to Obtained, and the change appears at the top of the photo’s history: Consent changed from Not Recorded to Obtained, by Amina Yusuf, now.">
      <img class="kp-stage-fallback" src="/assets/img/kora/detail.jpg" width="1040" height="880" alt="">
    </div>
  </div>
</section>

<section class="kp-row is-flipped">
  <div class="kp-copy">
    <h2>Duplicates are your call</h2>
    <p>Kora leaves out a file it already has and says so. If you’d rather see for yourself, it brings the copy in flagged for review and shows the two side by side. Keep both, or move one to the Trash. Kora never removes one on its own.</p>
    <ul class="kp-points">
      <li>Needs Review gathers possible duplicates, missing originals and files that couldn’t be read.</li>
      <li>Work through it with single keys: <span class="kp-kbd">F</span> to favourite, <span class="kp-kbd">R</span> to mark as reviewed, <span class="kp-kbd">T</span> to add a tag.</li>
      <li>Moved a file? Point Kora to it, and Kora checks by its content that it’s the same file before reconnecting it.</li>
    </ul>
  </div>
  <div class="kp-scene">
    <div class="kp-stage" id="ko-dupes-stage" role="img" aria-label="Kora’s Compare Possible Duplicates sheet: the same photo shown as This item, Opening night copy, and as Already in library, Opening night, with buttons to Move This Item to Trash or Keep Both.">
      <img class="kp-stage-fallback" src="/assets/img/kora/duplicates.jpg" width="1040" height="880" alt="">
    </div>
  </div>
</section>

<div class="kp-pair">
  <section class="kp-copy">
    <h2>Find anything</h2>
    <p>Search looks through titles, descriptions and tags, the people, events and organisations linked to each item, the words in documents, and the text Kora reads in photos, flyers and scanned pages. The reading happens on your Mac.</p>
    <p>Save a search and it stays in the sidebar, up to date as the library grows.</p>
  </section>
  <section class="kp-copy">
    <h2>Who, when and where</h2>
    <p>Give events, people and organisations a page each, link them to items and to one another, and see everything that belongs to them. Kora never identifies anyone or links them by itself.</p>
    <p>The timeline tells your organisation’s story year by year: milestones you add, figures counted from the library, and suggestions drawn from dated events and collections that wait for you to accept them.</p>
  </section>
</div>

<section class="kp-make">
  <div class="kp-copy">
    <h2>Share what you’ve kept</h2>
    <p>Turn the archive into something to read, to show and to report on. Before anything leaves the library, Kora tells you how many items have no consent recorded, or consent pending or refused, and asks you to confirm.</p>
  </div>
  <div class="kp-three">
    <div><h3>Stories</h3><p>Photos, recordings, quotes and documents in order, in your own words, with captions, credits and sources. Export to PDF, Word, a web page, Markdown or plain text.</p></div>
    <div><h3>Exhibitions</h3><p>Sections of items laid out as a grid, a feature or a timeline, in your colour and with your logo. Present them full screen, or export a web page that works offline.</p></div>
    <div><h3>Annual reports</h3><p>A year’s figures counted from the library, each statement linked to the records it comes from, with your own introduction and notes. Export to PDF or Word.</p></div>
  </div>
</section>

<section class="kp-more">
<div class="kp-copy"><h2>Also in Kora</h2></div>
<div class="kp-grid">
  <div><h3>Collections and tags</h3><p>Put an item in every collection it belongs to, gather collections into folders, and drag items onto them from the grid. Rename one tag to another and they merge.</p></div>
  <div><h3>Exports</h3><p>Exact copies of the originals, each checked against its fingerprint, or previews, or details only, with a spreadsheet. GPS locations are left out unless you include them.</p></div>
  <div><h3>An optional assistant</h3><p>Off until you turn it on, and it runs only on your Mac. It suggests descriptions, tags, summaries and collections, and understands searches typed as sentences. Nothing changes until you accept. Some suggestions need Apple Intelligence.</p></div>
  <div><h3>iCloud sync, if you want it</h3><p>Turn it on for a library and its details and previews sync between your own Macs through your iCloud account. Originals stay on the Mac that has them.</p></div>
  <div><h3>Spotlight, if you want it</h3><p>Find items, collections, events, stories and exhibitions from Spotlight. People’s names, notes and contact details are never added.</p></div>
  <div><h3>Updates</h3><p>Kora asks before it checks for updates on its own, and checking sends nothing about you or your library. Kora installs only updates signed by Kora.</p></div>
  <div><h3>Filters</h3><p>Narrow any view by type, consent, where the original is kept, or items with no date.</p></div>
  <div><h3>Quick Look and keys</h3><p><span class="kp-kbd">Space</span> to preview, <span class="kp-kbd">Return</span> to open, and <span class="kp-kbd">⌘K</span> opens the command palette.</p></div>
  <div><h3>A Trash that keeps originals</h3><p>Removed items wait in Kora’s Trash. Emptying it never deletes your original files.</p></div>
</div>
</section>

<div class="kp-closing">
  <section>
    <h2>Private by design</h2>
    <p>No account and no analytics. Kora connects to the internet only to sync with your own iCloud, if you turn that on, and to check for updates, which it asks about first.</p>
    <p>Details and previews are encrypted on your Mac before they’re sent. With Advanced Data Protection turned on, only your devices can read them. The assistant never sends anything off your Mac, and Kora doesn’t recognise faces or name the people in your photos.</p>
  </section>
  <section>
    <h2>What’s next</h2>
    <p>{% unless page.download_ready %}Kora is in development. {% endunless %}Next come sharing a library with other people, so more than one person can look after the same archive, and an app for iPhone and iPad.</p>
    <p>Questions or ideas? Email <a href="mailto:bakari@bakarimustafa.com">bakari@bakarimustafa.com</a>.</p>
  </section>
</div>

<p class="kp-credits">The scenes on this page are drawn from Kora’s interface, with the Hugeicons icons Kora uses. The photos in them are from Unsplash, and the names are made up. Kora is made by Bakari Mustafa.</p>

</div>
