---
title: Kora for Mac
permalink: "/kora/"
layout: page
hide_title: true
full_width: true
comments: false
excerpt: "A home on your Mac for a community’s photos, videos, recordings, flyers and newsletters. Bring them together, describe them as you go, and look after them for the long run."
description: "Kora for Mac: an archive app for community organisations. Import photos, videos, audio and documents without changing the originals, record dates, places, tags and consent, review duplicates, and keep a history of every change. Everything stays on the Mac."
image: "/assets/img/kora/hero.jpg"
---

<link rel="stylesheet" href="/assets/js/kora/stages.css">
<script src="/assets/js/kora/stages.js" defer></script>

<style>
.page-content .kp {
  container: kp / inline-size;
  color: var(--text-primary);
  padding-bottom: 4rem;
}
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
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem !important;
}
.page-content .kp .kp-hero h1 {
  font-family: "New York", ui-serif, Georgia, "Times New Roman", serif;
  font-size: clamp(2.75rem, 6.5vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0 0 1.25rem;
}
.page-content .kp .kp-lede {
  font-size: clamp(1.125rem, 2.2vw, 1.3125rem);
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 auto 2rem !important;
  max-width: 34em;
}
.page-content .kp .kp-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
}
.page-content .kp .kp-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--kumo-radius-full, 9999px);
  font-size: 0.9375rem;
  font-weight: 600;
  border: 1px solid var(--border-default);
  color: var(--text-primary) !important;
  background: var(--bg-primary);
}
.page-content .kp .kp-button:hover { border-color: var(--border-strong); }
.page-content .kp .kp-button.is-primary {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--bg-primary) !important;
}
.page-content .kp .kp-button.is-primary:hover { background: var(--accent-secondary); border-color: var(--accent-secondary); }
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
  margin: 0 0 5.5rem;
}
.page-content .kp .kp-row.is-flipped { grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); }
.page-content .kp .kp-row.is-flipped .kp-copy { order: 2; }
.page-content .kp .kp-copy h2 {
  font-family: "New York", ui-serif, Georgia, "Times New Roman", serif;
  font-size: clamp(1.625rem, 3vw, 2.125rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin: 0 0 1rem;
}
.page-content .kp .kp-copy > p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 1.25rem !important;
}
.page-content .kp .kp-points {
  list-style: none;
  margin: 0;
  padding: 0;
}
.page-content .kp .kp-points li {
  position: relative;
  padding: 0.375rem 0 0.375rem 1.25rem;
  font-size: 0.9875rem;
  line-height: 1.5;
}
.page-content .kp .kp-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.95em;
  width: 6px;
  height: 6px;
  margin: 0;
  border-radius: 50%;
  background: #b5482a;
}
.page-content .kp .kp-kbd {
  font-family: inherit;
  font-size: 0.85em;
  padding: 0.05em 0.4em;
  border: 1px solid var(--border-default);
  border-radius: 5px;
  background: var(--bg-secondary);
  white-space: nowrap;
}

/* The import, in two columns under the hero */
.page-content .kp .kp-stack {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
  margin: 0 0 5.5rem;
}
.page-content .kp .kp-stack .kp-copy > p { margin-bottom: 0 !important; }

/* ── Everything else, in a compact grid ───────────────────────── */
.page-content .kp .kp-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--border-subtle);
  margin-bottom: 5rem;
}
.page-content .kp .kp-grid div {
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}
.page-content .kp .kp-grid h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
}
.page-content .kp .kp-grid p {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ── Closing panels ───────────────────────────────────────────── */
.page-content .kp .kp-closing {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}
.page-content .kp .kp-panel {
  padding: 1.75rem;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
}
.page-content .kp .kp-panel h2 {
  font-family: "New York", ui-serif, Georgia, "Times New Roman", serif;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.625rem;
}
.page-content .kp .kp-panel p {
  font-size: 0.9875rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.page-content .kp .kp-panel p + p { margin-top: 0.75rem !important; }
.page-content .kp .kp-panel a, .page-content .kp .kp-credits a, .page-content .kp .kp-meta a { color: var(--text-primary); border-bottom: 1px solid var(--border-strong); }
.page-content .kp .kp-panel a:hover, .page-content .kp .kp-credits a:hover, .page-content .kp .kp-meta a:hover { border-color: var(--text-primary); }
.page-content .kp .kp-credits {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-tertiary);
  max-width: 720px;
}

@media (max-width: 860px) {
.page-content .kp .kp-row, .page-content .kp .kp-row.is-flipped, .page-content .kp .kp-stack { grid-template-columns: minmax(0, 1fr); margin-bottom: 4rem; }
.page-content .kp .kp-row.is-flipped .kp-copy { order: 0; }
.page-content .kp .kp-closing { grid-template-columns: minmax(0, 1fr); }
.page-content .kp .kp-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
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
.page-content .kp .kp-grid { grid-template-columns: minmax(0, 1fr); }
.page-content .kp .kp-grid div { padding-right: 0; }
.page-content .kp .kp-hero-stage { margin-bottom: 3.5rem; }
}
</style>

<div class="kp">

<div class="kp-hero">
  <img class="kp-icon" src="/assets/img/kora/icon.png" alt="The Kora app icon: a kora, the West African harp, on terracotta" width="104" height="104">
  <p class="kp-eyebrow">For Mac · In development</p>
  <h1>Kora</h1>
  <p class="kp-lede">A home for your community’s photos, videos, recordings, flyers and newsletters. Bring years of scattered files together, describe them as you go, and look after them for the long run. Everything stays on your Mac.</p>
  <div class="kp-actions">
    <a class="kp-button is-primary" href="#features">See what it does</a>
  </div>
  <p class="kp-meta">Not yet available to download · For macOS 15 or later</p>
</div>

<div class="kp-stage kp-hero-stage" id="ko-hero-stage" role="img" aria-label="Kora’s library window. A folder called Harmony Day 2026 is dragged in from Finder; the new photos arrive at the top of All Assets and fill in as their previews are made, the count goes from 1,184 to 1,220 items, and the status bar reads Imported 36 items, 2 duplicates skipped.">
  <img class="kp-stage-fallback" src="/assets/img/kora/hero.jpg" width="2000" height="1080" alt="">
</div>

<section class="kp-stack" id="features">
  <div class="kp-copy">
    <h2>Bring it all together</h2>
    <p>Drag in files or whole folders from a computer, an old drive or a USB stick. Kora takes photos, videos, audio, PDFs, documents, presentations and spreadsheets, makes a preview of each and reads the details already in the files.</p>
  </div>
  <ul class="kp-points">
    <li>Your originals stay where they are and are never changed. Kora can also keep its own copy, for a drive that has to go back to its owner.</li>
    <li>An import that’s interrupted picks up where it stopped.</li>
    <li>Anything Kora can’t read is listed with what went wrong. Nothing is skipped silently.</li>
    <li>Duplicates are recognised by their content, whatever they’re called.</li>
  </ul>
</section>

<section class="kp-row">
  <div class="kp-copy">
    <h2>Describe as you go</h2>
    <p>Select anything and its details sit beside it: title, description, date, place, community, creator, source, copyright, licence and notes. A date nobody knows stays blank. Kora never guesses one.</p>
    <ul class="kp-points">
      <li>Record consent for every item: Not Recorded, Not Required, Pending, Obtained, Refused or Withdrawn.</li>
      <li>Every change goes into the item’s history: what changed, who changed it and when.</li>
      <li>Tags are suggested as you type, and “Youth” and “youth” stay one tag.</li>
      <li>Edit many items at once. Only the fields you touch change, and <span class="kp-kbd">⌘Z</span> undoes the lot.</li>
    </ul>
  </div>
  <div class="kp-scene">
    <div class="kp-stage" id="ko-detail-stage" role="img" aria-label="Kora’s inspector for a photo called Opening night. Its date created is unknown and shows as a dash. Consent is changed from Not Recorded to Obtained, and the change appears at the top of the photo’s history: Consent changed from Not Recorded to Obtained, by Amina Yusuf, now.">
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
    <div class="kp-stage" id="ko-dupes-stage" role="img" aria-label="Kora’s Compare Possible Duplicates sheet: the same photo shown as This item, Opening night copy, and as Already in library, Opening night, with buttons to Cancel, Move This Item to Trash or Keep Both.">
      <img class="kp-stage-fallback" src="/assets/img/kora/duplicates.jpg" width="1040" height="880" alt="">
    </div>
  </div>
</section>

<div class="kp-grid">
  <div><h3>Collections</h3><p>Put an item in every collection it belongs to, gather collections into folders, and drag items onto them from the grid.</p></div>
  <div><h3>Tags</h3><p>See every tag with how many items carry it. Rename one to another and they merge.</p></div>
  <div><h3>Filters</h3><p>Narrow any view by type, consent, where the original is kept, or items with no date.</p></div>
  <div><h3>Grid or list</h3><p>Thumbnails from small to large, with or without titles, or a list you can sort.</p></div>
  <div><h3>Quick Look and keys</h3><p><span class="kp-kbd">Space</span> to preview, <span class="kp-kbd">Return</span> to open, and <span class="kp-kbd">⌘K</span> opens the command palette.</p></div>
  <div><h3>A Trash that keeps originals</h3><p>Removed items wait in Kora’s Trash. Emptying it never deletes your original files.</p></div>
</div>

<div class="kp-closing">
  <section class="kp-panel">
    <h2>Private by design</h2>
    <p>No account, no server, no analytics. Kora doesn’t connect to the internet at all, so your files can’t go anywhere. It doesn’t recognise faces or name the people in your photos.</p>
  </section>
  <section class="kp-panel">
    <h2>What’s next</h2>
    <p>Kora is in development. Next come search inside documents and scanned flyers, events, people and organisations, and a timeline; after that, stories and exhibitions to share what you’ve kept. Any AI features will be optional and off until you turn them on, and every suggestion will be yours to accept or reject.</p>
    <p>Questions or ideas? Email <a href="mailto:bakari@bakarimustafa.com">bakari@bakarimustafa.com</a>.</p>
  </section>
</div>

<p class="kp-credits">The scenes on this page are drawn from Kora’s interface. The photos in them are from Unsplash, and the names are made up. Kora is made by Bakari Mustafa.</p>

</div>
