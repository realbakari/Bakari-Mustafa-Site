---
title: The Message for Mac
permalink: "/the-message/mac/"
layout: page
hide_title: true
full_width: true
comments: false
excerpt: "William Branham’s sermons and the Bible, side by side on the Mac. Read, listen, study, and put the words on the screen on Sunday."
description: "The Message for Mac: read and hear William Branham’s sermons beside the Bible, with highlights, cross references, an order of service and a projector view."
image: "/assets/img/the-message/sermon-light.jpg"
---

<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/assets/js/the-message/stages.css">
<script src="/assets/js/the-message/stages.js" defer></script>
<link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap" rel="stylesheet">

<style>
.page-content .tm {
  container: tm / inline-size;
  --tm-serif: 'Literata', Georgia, 'Times New Roman', serif;
  --tm-sepia: #f6efdf;
  color: var(--text-primary);
  padding-bottom: 4rem;
}
.page-content .tm p { padding: 0 !important; }
.page-content .tm a { text-decoration: none; }
.page-content .tm img { display: block; max-width: 100%; height: auto; }

/* Screenshots sit on the page like windows: a hairline and rounded corners, no shadow. */
.page-content .tm .tm-shot {
  border-radius: 12px;
  border: 1px solid var(--border-default);
  overflow: hidden;
  background: var(--bg-secondary);
}

/* ── Hero ─────────────────────────────────────────────────────── */
.page-content .tm .tm-hero {
  text-align: center;
  margin: 4rem auto 3rem;
  max-width: 720px;
}
.page-content .tm .tm-icon {
  width: 104px;
  height: 104px;
  margin: 0 auto 1.5rem;
}
.page-content .tm .tm-eyebrow {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem !important;
}
.page-content .tm .tm-hero h1 {
  font-family: var(--tm-serif);
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0 0 1.25rem;
}
.page-content .tm .tm-lede {
  font-size: clamp(1.125rem, 2.2vw, 1.3125rem);
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 auto 2rem !important;
  max-width: 34em;
}
.page-content .tm .tm-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
}
.page-content .tm .tm-button {
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
.page-content .tm .tm-button:hover { border-color: var(--border-strong); }
.page-content .tm .tm-button.is-primary {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--bg-primary) !important;
}
.page-content .tm .tm-button.is-primary:hover { background: var(--accent-secondary); border-color: var(--accent-secondary); }
.page-content .tm .tm-meta a { color: inherit; border-bottom: 1px solid var(--border-strong); }
.page-content .tm .tm-meta {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}
.page-content .tm .tm-stage { position: relative; margin: 0 auto 5rem; }
/* The slots hold the scenes' shapes before the script runs, so nothing shifts. */
.page-content .tm .tm-hero-stage { aspect-ratio: 1000 / 540; max-width: 1000px; }
.page-content .tm .tm-sunday-stage { aspect-ratio: 1000 / 470; max-width: 1000px; margin-bottom: 1.5rem; }
.page-content .tm .tm-live-stage { aspect-ratio: 1000 / 470; max-width: 1000px; margin-bottom: 1.5rem; }
.page-content .tm .tm-stage-fallback { width: 100%; height: 100%; object-fit: cover; object-position: top left; border-radius: 12px; }
.page-content .tm .tm-stage .ss-fit .tm-stage-fallback { display: none; }

/* ── Feature rows: text beside a screenshot, alternating sides ── */
.page-content .tm .tm-row {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  margin: 0 0 5.5rem;
}
.page-content .tm .tm-row.is-flipped { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
.page-content .tm .tm-row.is-flipped .tm-copy { order: 2; }
.page-content .tm .tm-copy h2 {
  font-family: var(--tm-serif);
  font-size: clamp(1.625rem, 3vw, 2.125rem);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.15;
  margin: 0 0 1rem;
}
.page-content .tm .tm-copy > p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 1.25rem !important;
}
.page-content .tm .tm-points {
  list-style: none;
  margin: 0;
  padding: 0;
}
.page-content .tm .tm-points li {
  position: relative;
  padding: 0.375rem 0 0.375rem 1.25rem;
  font-size: 0.9875rem;
  line-height: 1.5;
}
.page-content .tm .tm-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.95em;
  width: 6px;
  height: 6px;
  margin: 0;
  border-radius: 50%;
  background: var(--accent-primary);
}
.page-content .tm .tm-kbd {
  font-family: inherit;
  font-size: 0.85em;
  padding: 0.05em 0.4em;
  border: 1px solid var(--border-default);
  border-radius: 5px;
  background: var(--bg-secondary);
  white-space: nowrap;
}

/* ── Sunday: two windows side by side ─────────────────────────── */
.page-content .tm .tm-section-head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 2.5rem;
}
.page-content .tm .tm-section-head h2 {
  font-family: var(--tm-serif);
  font-size: clamp(1.75rem, 3.4vw, 2.375rem);
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.15;
  margin: 0 0 1rem;
}
.page-content .tm .tm-section-head p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.page-content .tm .tm-sunday { margin-bottom: 5.5rem; }
.page-content .tm .tm-sunday-notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.25rem;
}
.page-content .tm .tm-note {
  padding: 1.25rem;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  background: var(--bg-secondary);
}
.page-content .tm .tm-note h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
}
.page-content .tm .tm-note p {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ── Everything else, in a compact grid ───────────────────────── */
.page-content .tm .tm-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--border-subtle);
  margin-bottom: 5rem;
}
.page-content .tm .tm-grid div {
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}
.page-content .tm .tm-grid h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
}
.page-content .tm .tm-grid p {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ── Closing panels ───────────────────────────────────────────── */
.page-content .tm .tm-closing {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}
.page-content .tm .tm-panel {
  padding: 1.75rem;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
}
.page-content .tm .tm-panel h2 {
  font-family: var(--tm-serif);
  font-size: 1.375rem;
  font-weight: 600;
  margin: 0 0 0.625rem;
}
.page-content .tm .tm-panel p {
  font-size: 0.9875rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.page-content .tm .tm-panel p + p { margin-top: 0.75rem !important; }
.page-content .tm .tm-panel a, .page-content .tm .tm-credits a { color: var(--text-primary); border-bottom: 1px solid var(--border-strong); }
.page-content .tm .tm-panel a:hover, .page-content .tm .tm-credits a:hover { border-color: var(--text-primary); }
.page-content .tm .tm-credits {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-tertiary);
  max-width: 720px;
}

@media (max-width: 860px) {
.page-content .tm .tm-row, .page-content .tm .tm-row.is-flipped { grid-template-columns: minmax(0, 1fr); margin-bottom: 4rem; }
.page-content .tm .tm-row.is-flipped .tm-copy { order: 0; }
.page-content .tm .tm-closing, .page-content .tm .tm-sunday-notes { grid-template-columns: minmax(0, 1fr); }
.page-content .tm .tm-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
/* The scenes switch to their phone design below an 820px column; the slots follow. */
@container tm (max-width: 819px) {
.page-content .tm .tm-hero-stage { aspect-ratio: 358 / 340; max-width: 358px; }
.page-content .tm .tm-sunday-stage { aspect-ratio: 1 / 1; max-width: 358px; }
.page-content .tm .tm-live-stage { aspect-ratio: 358 / 304; max-width: 358px; }
}
@media (max-width: 560px) {
.page-content .tm .tm-hero { margin-top: 2.5rem; }
.page-content .tm .tm-grid { grid-template-columns: minmax(0, 1fr); }
.page-content .tm .tm-grid div { padding-right: 0; }
.page-content .tm .tm-stage { margin-bottom: 3.5rem; }
}
</style>

<div class="tm">

<div class="tm-hero">
  <img class="tm-icon" src="/assets/img/the-message/icon.png" alt="The Message app icon: a white cloud in a blue sky" width="104" height="104">
  <p class="tm-eyebrow">For Mac</p>
  <h1>The Message</h1>
  <p class="tm-lede">William Branham’s sermons and the Bible, side by side. Read them, hear them, study them, and put the words on the screen on Sunday.</p>
  <div class="tm-actions">
    <a class="tm-button is-primary" href="https://github.com/realbakari/the-message-mac/releases/latest/download/The-Message.zip">Download for Mac</a>
    <a class="tm-button" href="/the-message/">Browse the sermons on the web</a>
  </div>
  <p class="tm-meta">Version 1.2 · Requires macOS 26 · <a href="https://github.com/realbakari/the-message-mac/releases">Release notes</a></p>
</div>

<div class="tm-stage tm-hero-stage" id="tm-hero-stage" role="img" aria-label="A sermon open in The Message: clicking the reading Revelation 10:1-7 opens the passage in a panel beside the transcript.">
  <img class="tm-stage-fallback" src="/assets/img/the-message/sermon-light.jpg" width="2000" height="1270" alt="">
</div>

<section class="tm-row">
  <div class="tm-copy">
    <h2>Sermons set like the printed books</h2>
    <p>More than 1,200 sermons, with transcripts in over 70 languages. Each one opens with its title, date code and place, then numbered paragraphs in a book face, so a page reads like the printed transcript.</p>
    <ul class="tm-points">
      <li>A sermon reopens at the paragraph you reached. <span class="tm-kbd">⌘J</span> goes to any paragraph.</li>
      <li>Listen from where you stopped, at 0.75× to 2×, with a sleep timer and the Mac’s media keys.</li>
      <li>Highlight words in six colours, add a note, and copy a quote with its source.</li>
      <li>Save a sermon to read it without a connection.</li>
    </ul>
  </div>
  <div class="tm-shot">
    <img src="/assets/img/the-message/sermon-sepia.jpg" width="2000" height="1270" loading="lazy" alt="Paragraph 4 of The First Seal on sepia paper, with two passages highlighted.">
  </div>
</section>

<section class="tm-row is-flipped">
  <div class="tm-copy">
    <h2>The Bible, open beside them</h2>
    <p>Seven public-domain translations come with the app, the KJV among them, and the NET, NLT and ESV load from their publishers. A reading in a sermon, such as Revelation 10:1–7, is a link, and a chapter lists the sermons that read from it.</p>
    <ul class="tm-points">
      <li><span class="tm-kbd">⌘K</span> goes to a passage the way you’d write it: jn 3:16, rom 8, jude 3.</li>
      <li>Search every word, an exact phrase, one testament or one book.</li>
      <li>Cross references for any verse, compare translations, or read two side by side.</li>
      <li>Highlights, notes, bookmarks and reading plans, kept on your Mac.</li>
    </ul>
  </div>
  <div class="tm-shot">
    <img src="/assets/img/the-message/bible-study.jpg" width="2000" height="1270" loading="lazy" alt="John 3 in the King James Version with the words of Jesus in red, verse 16 selected, and the Study sidebar showing a reading plan, a bookmark, a note and highlights.">
  </div>
</section>

<section class="tm-sunday">
  <div class="tm-section-head">
    <h2>Ready for Sunday</h2>
    <p>Plan the service, then present it. Passages, quotes from the sermons and headings go in order, and the projector steps through them a verse or a paragraph at a time.</p>
  </div>
  <div class="tm-stage tm-sunday-stage" id="tm-sunday-stage" role="img" aria-label="An order of service beside the projector: the right arrow key steps from Opening Prayer through Revelation 10:1 and 10:2 to a quote from The First Seal.">
    <img class="tm-stage-fallback" src="/assets/img/the-message/service.jpg" width="1600" height="1138" alt="" loading="lazy">
  </div>
  <div class="tm-sunday-notes">
    <div class="tm-note">
      <h3>Add from anywhere</h3>
      <p>Right-click verses, sermon words or a highlight and choose Add to Service.</p>
    </div>
    <div class="tm-note">
      <h3>Speaker View</h3>
      <p>What the room sees, what comes next, the time, and a countdown that turns orange near the end.</p>
    </div>
    <div class="tm-note">
      <h3>On the livestream</h3>
      <p>A lower third over green or transparency, for OBS and other streaming software.</p>
    </div>
  </div>
</section>

<section class="tm-sunday">
  <div class="tm-section-head">
    <h2>Go live from the same Mac</h2>
    <p>Stream the service to YouTube or Vimeo with the verse on screen. Count down to the start, go live, and cut to the words you present, in your church’s own look.</p>
  </div>
  <div class="tm-stage tm-live-stage" id="tm-live-stage" role="img" aria-label="The Go Live studio: Starting Soon counts down, Go Live turns the tally red, a cut to the Words scene fills the picture with Revelation 5:1, and Next steps it to Revelation 5:2.">
    <img class="tm-stage-fallback" src="/assets/img/the-message/go-live.jpg" width="1600" height="608" alt="" loading="lazy">
  </div>
  <div class="tm-sunday-notes">
    <div class="tm-note">
      <h3>Your church’s look</h3>
      <p>Your logo, typeface and colours, from six presets. The stream, the lower third and the projector all follow it.</p>
    </div>
    <div class="tm-note">
      <h3>Works with OBS</h3>
      <p>Switch OBS’s scenes, start its stream and recording, and send it the verse, from the same window.</p>
    </div>
    <div class="tm-note">
      <h3>Record the service</h3>
      <p>Keep what goes out, then trim it and take out the long silences in the Recording Studio.</p>
    </div>
  </div>
</section>

<section class="tm-row">
  <div class="tm-copy">
    <h2>Your highlights, by subject</h2>
    <p>Name the six colours for what you study, such as Faith or The Seals. Every highlight from every sermon is filed under its colour with its note, and the whole list exports as a PDF.</p>
  </div>
  <div class="tm-shot">
    <img src="/assets/img/the-message/highlights.jpg" width="2000" height="1270" loading="lazy" alt="The Highlights list with two highlights from The First Seal, one with a note, beside the home page showing today’s reading and sermons preached on this day.">
  </div>
</section>

<section class="tm-row is-flipped">
  <div class="tm-copy">
    <h2>Light, sepia or dark</h2>
    <p>Pick the paper and the whole window follows: sidebars, lists and sheets. Text size, red letters and one verse per line are a keystroke away.</p>
  </div>
  <div class="tm-shot">
    <img src="/assets/img/the-message/bible-dark.jpg" width="2000" height="1270" loading="lazy" alt="Psalm 23 on dark paper, with LORD in small capitals and the chapter grid in the sidebar.">
  </div>
</section>

<div class="tm-grid">
  <div><h3>Search like The Table</h3><p>@65 for a year, @65-1212 for a day, @64-0401 59 to open paragraph 59.</p></div>
  <div><h3>On this day</h3><p>Home shows the sermons preached on today’s date.</p></div>
  <div><h3>History</h3><p>What you’ve read and what you’ve listened to, and Home shows how far you got.</p></div>
  <div><h3>Every language</h3><p>Open a sermon in any of the languages it was translated into.</p></div>
  <div><h3>Your study, portable</h3><p>Export highlights, notes and bookmarks as Markdown or JSON, and import them back.</p></div>
  <div><h3>Keyboard first</h3><p>⌘K, ⌘J, J and K between verses, 1 to 6 to highlight. ⌘/ lists them all.</p></div>
</div>

<div class="tm-closing">
  <section class="tm-panel">
    <h2>Private by design</h2>
    <p>No account, no analytics and no advertising. Your highlights, notes, history and plans stay on your Mac. The app asks the internet only for sermons, recordings and the Bible text it doesn’t carry.</p>
  </section>
  <section class="tm-panel">
    <h2>Also on iPhone</h2>
    <p><strong>The Message: Sermons &amp; Bible</strong> brings the sermons, read-along and the Bible to iPhone.</p>
    <p><a href="/the-message/support/">Support</a> · <a href="/the-message/privacy/">Privacy policy</a></p>
  </section>
</div>

<p class="tm-credits">Sermons and recordings come from <a href="/api-docs/">The Message API</a>. The bundled Bibles are public domain, from eBible.org. Cross references are from <a href="https://www.openbible.info/labs/cross-references/">OpenBible.info</a> (CC BY 4.0). Text is set in Literata (SIL Open Font License). The NET, NLT and ESV are used under their publishers’ terms, with their notices in the app.</p>

</div>
