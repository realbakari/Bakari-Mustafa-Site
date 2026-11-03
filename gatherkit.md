---
title: GatherKit for Mac
permalink: "/gatherkit/"
layout: page
hide_title: true
full_width: true
comments: false
excerpt: "Events, tickets and check-in on the Mac. Register people, print QR tickets and badges, and check everyone in at the door, even with no internet."
description: "GatherKit for Mac: run events without an events team. Registrations, imports from Eventbrite, Humanitix, Luma and Tito, QR tickets, name badges, offline check-in and attendance reports."
image: "/assets/img/gatherkit/check-in.jpg"
---

<link rel="stylesheet" href="/assets/js/gatherkit/stages.css">
<script src="/assets/js/gatherkit/stages.js" defer></script>

<style>
.page-content .gk {
  container: gk / inline-size;
  color: var(--text-primary);
  padding-bottom: 4rem;
}
.page-content .gk p { padding: 0 !important; }
.page-content .gk a { text-decoration: none; }
.page-content .gk img { display: block; max-width: 100%; height: auto; }

/* Screenshots sit on the page like windows: a hairline and rounded corners, no shadow. */
.page-content .gk .gk-shot {
  border-radius: 12px;
  border: 1px solid var(--border-default);
  overflow: hidden;
  background: #fff;
}

/* ── Hero ─────────────────────────────────────────────────────── */
.page-content .gk .gk-hero {
  text-align: center;
  margin: 4rem auto 3rem;
  max-width: 720px;
}
.page-content .gk .gk-icon {
  width: 104px;
  height: 104px;
  margin: 0 auto 1.5rem;
}
.page-content .gk .gk-eyebrow {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem !important;
}
.page-content .gk .gk-hero h1 {
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 0 1.25rem;
}
.page-content .gk .gk-lede {
  font-size: clamp(1.125rem, 2.2vw, 1.3125rem);
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 auto 2rem !important;
  max-width: 34em;
}
.page-content .gk .gk-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
}
.page-content .gk .gk-button {
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
.page-content .gk .gk-button:hover { border-color: var(--border-strong); }
.page-content .gk .gk-button.is-primary {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: var(--bg-primary) !important;
}
.page-content .gk .gk-button.is-primary:hover { background: var(--accent-secondary); border-color: var(--accent-secondary); }
.page-content .gk .gk-meta a { color: inherit; border-bottom: 1px solid var(--border-strong); }
.page-content .gk .gk-meta {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}
.page-content .gk .gk-stage { position: relative; margin: 0 auto 5rem; }
/* The slot holds the scene's shape before the script runs, so nothing shifts. */
.page-content .gk .gk-hero-stage { aspect-ratio: 1000 / 540; max-width: 1000px; }
.page-content .gk .gk-stage-fallback { width: 100%; height: 100%; object-fit: cover; object-position: top left; border-radius: 12px; }
.page-content .gk .gk-stage .ss-fit .gk-stage-fallback { display: none; }

/* ── Feature rows: text beside a screenshot, alternating sides ── */
.page-content .gk .gk-row {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  margin: 0 0 5.5rem;
}
.page-content .gk .gk-row.is-flipped { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
.page-content .gk .gk-row.is-flipped .gk-copy { order: 2; }
.page-content .gk .gk-copy h2,
.page-content .gk .gk-section-head h2 {
  font-size: clamp(1.625rem, 3vw, 2.125rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 1rem;
}
.page-content .gk .gk-copy > p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 1.25rem !important;
}
.page-content .gk .gk-points {
  list-style: none;
  margin: 0;
  padding: 0;
}
.page-content .gk .gk-points li {
  position: relative;
  padding: 0.375rem 0 0.375rem 1.25rem;
  font-size: 0.9875rem;
  line-height: 1.5;
}
.page-content .gk .gk-points li::before {
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
.page-content .gk .gk-kbd {
  font-family: inherit;
  font-size: 0.85em;
  padding: 0.05em 0.4em;
  border: 1px solid var(--border-default);
  border-radius: 5px;
  background: var(--bg-secondary);
  white-space: nowrap;
}

/* A wide screenshot gets the full width, its copy in two columns above it */
.page-content .gk .gk-stack { margin: 0 0 5.5rem; }
.page-content .gk .gk-stack-copy {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
  margin-bottom: 2rem;
}
.page-content .gk .gk-stack-copy .gk-copy > p { margin-bottom: 0 !important; }

/* ── Printing: the ticket and the badge sheet side by side ────── */
.page-content .gk .gk-section-head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 2.5rem;
}
.page-content .gk .gk-section-head p {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.page-content .gk .gk-print { margin-bottom: 5.5rem; }
.page-content .gk .gk-pair {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}
.page-content .gk .gk-notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.25rem;
}
.page-content .gk .gk-note {
  padding: 1.25rem;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  background: var(--bg-secondary);
}
.page-content .gk .gk-note h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
}
.page-content .gk .gk-note p {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ── Everything else, in a compact grid ───────────────────────── */
.page-content .gk .gk-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--border-subtle);
  margin-bottom: 5rem;
}
.page-content .gk .gk-grid div {
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}
.page-content .gk .gk-grid h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
}
.page-content .gk .gk-grid p {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ── Closing panels ───────────────────────────────────────────── */
.page-content .gk .gk-closing {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.25rem;
  margin-bottom: 3rem;
}
.page-content .gk .gk-panel {
  padding: 1.75rem;
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
}
.page-content .gk .gk-panel h2 {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 0.625rem;
}
.page-content .gk .gk-panel p {
  font-size: 0.9875rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
.page-content .gk .gk-panel p + p { margin-top: 0.75rem !important; }
.page-content .gk .gk-panel a, .page-content .gk .gk-credits a { color: var(--text-primary); border-bottom: 1px solid var(--border-strong); }
.page-content .gk .gk-panel a:hover, .page-content .gk .gk-credits a:hover { border-color: var(--text-primary); }
.page-content .gk .gk-credits {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-tertiary);
  max-width: 720px;
}

@media (max-width: 860px) {
.page-content .gk .gk-row, .page-content .gk .gk-row.is-flipped { grid-template-columns: minmax(0, 1fr); margin-bottom: 4rem; }
.page-content .gk .gk-row.is-flipped .gk-copy { order: 0; }
.page-content .gk .gk-closing, .page-content .gk .gk-notes, .page-content .gk .gk-stack-copy { grid-template-columns: minmax(0, 1fr); }
.page-content .gk .gk-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
/* The scene switches to its phone design below an 820px column; the slot follows. */
@container gk (max-width: 819px) {
.page-content .gk .gk-hero-stage { aspect-ratio: 358 / 340; max-width: 358px; }
}
@media (max-width: 560px) {
.page-content .gk .gk-hero { margin-top: 2.5rem; }
.page-content .gk .gk-grid, .page-content .gk .gk-pair { grid-template-columns: minmax(0, 1fr); }
.page-content .gk .gk-grid div { padding-right: 0; }
.page-content .gk .gk-stage { margin-bottom: 3.5rem; }
}
</style>

<div class="gk">

<div class="gk-hero">
  <img class="gk-icon" src="/assets/img/gatherkit/icon.png" alt="The GatherKit app icon" width="104" height="104">
  <p class="gk-eyebrow">For Mac</p>
  <h1>GatherKit</h1>
  <p class="gk-lede">Events, tickets and check-in for people who run events without an events team. Register people, print tickets and badges, and check everyone in at the door, even with no internet.</p>
  <div class="gk-actions">
    <a class="gk-button is-primary" href="https://github.com/realbakari/gatherkit-mac/releases/latest/download/GatherKit.zip">Download for Mac</a>
    <a class="gk-button" href="#features">See what it does</a>
  </div>
  <p class="gk-meta">Version 1.0 · Requires macOS 14 · <a href="https://github.com/realbakari/gatherkit-mac/releases">Release notes</a></p>
</div>

<div class="gk-stage gk-hero-stage" id="gk-hero-stage" role="img" aria-label="The GatherKit check-in window at the Spring Fundraising Gala: Amara Okafor's ticket is scanned, the window says Welcome, Amara with a note that she is speaking at 8 pm, and the count goes from 41 to 42 of 120 checked in.">
  <img class="gk-stage-fallback" src="/assets/img/gatherkit/check-in.jpg" width="1600" height="1030" alt="">
</div>

<section class="gk-stack" id="features">
  <div class="gk-stack-copy">
    <div class="gk-copy">
      <h2>Everyone in one list</h2>
      <p>One list of people across all your events, and a registration table for each event. GatherKit keeps the count right as places fill, so an event never goes over capacity by accident.</p>
    </div>
    <ul class="gk-points">
      <li>Approvals, waitlists, plus-ones, ticket types and complimentary guest-list places.</li>
      <li>Promote from the waitlist when a place frees up.</li>
      <li>Spots the same person entered twice and merges them in one click.</li>
      <li>Times in the event’s own time zone, venues, cover images and templates to reuse.</li>
    </ul>
  </div>
  <div class="gk-shot">
    <img src="/assets/img/gatherkit/registrations.jpg" width="1600" height="517" loading="lazy" alt="The registrations table for an event: names, emails, ticket types, guests and statuses including Registered, Pending Approval and Waitlisted.">
  </div>
</section>

<section class="gk-row is-flipped">
  <div class="gk-copy">
    <h2>Bring the list you already have</h2>
    <p>Already sell tickets somewhere else? Import the export from Eventbrite, Humanitix, Luma, Tito or Google Forms. GatherKit recognises the file, matches its columns and shows exactly what will change before anything does.</p>
    <ul class="gk-points">
      <li>Import the same file again and registrations update instead of doubling.</li>
      <li>Any spreadsheet with names and emails works too.</li>
      <li>Or connect your Luma, Humanitix, Tito or Eventbrite account with your own key. Sync only downloads.</li>
    </ul>
  </div>
  <div class="gk-shot">
    <img src="/assets/img/gatherkit/csv-import.jpg" width="900" height="939" loading="lazy" alt="The CSV import screen with an Eventbrite file recognised and its columns mapped: first name, last name, email, ticket type and status.">
  </div>
</section>

<section class="gk-print">
  <div class="gk-section-head">
    <h2>Ready for the door</h2>
    <p>Every confirmed guest gets a ticket with a QR code. The code is twelve random characters and holds no personal details, so a forwarded ticket gives nothing away.</p>
  </div>
  <div class="gk-pair">
    <div class="gk-shot">
      <img src="/assets/img/gatherkit/ticket.jpg" width="1030" height="930" loading="lazy" alt="A printed ticket for Volunteer Orientation: the date, the venue, a QR code with its code, and Admit Zara Hassan, General Admission plus 1 guest.">
    </div>
    <div class="gk-shot">
      <img src="/assets/img/gatherkit/badges.jpg" width="1010" height="970" loading="lazy" alt="A sheet of six name badges, each with a large first name, a QR code and a coloured band for the ticket type.">
    </div>
  </div>
  <div class="gk-notes">
    <div class="gk-note">
      <h3>Printed at true size</h3>
      <p>Tickets, and sheets of name badges on A4 or US Letter paper.</p>
    </div>
    <div class="gk-note">
      <h3>Label printers</h3>
      <p>Name badges on Brother QL and DYMO label rolls.</p>
    </div>
    <div class="gk-note">
      <h3>A paper guest list</h3>
      <p>Everyone expected on paper, for a door with no Mac.</p>
    </div>
  </div>
</section>

<section class="gk-row">
  <div class="gk-copy">
    <h2>See who came</h2>
    <p>After the event, the report is waiting: registrations, check-ins, no-shows and the attendance rate, arrivals in 15-minute steps, and attendance by ticket type.</p>
    <ul class="gk-points">
      <li>Export it as a PDF for the committee.</li>
      <li>Or as a CSV of numbers only, with no one’s personal details in it.</li>
    </ul>
  </div>
  <div class="gk-shot">
    <img src="/assets/img/gatherkit/reports.jpg" width="1600" height="1269" loading="lazy" alt="The attendance report for Intro to Robotics Workshop: 8 registered, 6 checked in, 2 no-shows, 75% attendance, an arrivals chart and a bar for each ticket type.">
  </div>
</section>

<section class="gk-row is-flipped">
  <div class="gk-copy">
    <h2>Know what needs doing</h2>
    <p>Overview opens on your next event and lists what needs you: people awaiting approval, waitlists with free places, events still in draft and people who may be in the list twice.</p>
  </div>
  <div class="gk-shot">
    <img src="/assets/img/gatherkit/overview.jpg" width="1600" height="1269" loading="lazy" alt="The Overview: Volunteer Orientation next up in two days, totals for upcoming events, registrations and check-ins, a Needs Attention list and recent activity.">
  </div>
</section>

<div class="gk-grid">
  <div><h3>Works offline</h3><p>Check-in needs no internet. Nor does anything else, except syncing with a ticketing platform.</p></div>
  <div><h3>Several Macs at the door</h3><p>Run a station on each Mac, then merge their check-ins afterwards. No one is counted twice.</p></div>
  <div><h3>Scan any way</h3><p>A USB or Bluetooth barcode scanner, the Mac’s camera, a typed code or a name search.</p></div>
  <div><h3>Email your guests</h3><p>Drafts to attendee groups open in Mail, in batches, with everyone in BCC.</p></div>
  <div><h3>Backups</h3><p>Back up and restore the whole library, and export calendar files for any event.</p></div>
  <div><h3>Try it first</h3><p>Help › Explore the Sample Library opens sample events to play with. Your own library is untouched.</p></div>
</div>

<div class="gk-closing">
  <section class="gk-panel">
    <h2>Private by design</h2>
    <p>No account, no server, no analytics and no advertising. Everything you enter stays on your Mac. When an event is over, GatherKit can anonymise the people who came and keep only the numbers.</p>
  </section>
  <section class="gk-panel">
    <h2>Help</h2>
    <p>The app has a built-in guide: press <span class="gk-kbd">⌘?</span>. For anything else, email <a href="mailto:bakari@bakarimustafa.com">bakari@bakarimustafa.com</a> or <a href="https://github.com/realbakari/gatherkit-mac/issues">open an issue</a>.</p>
  </section>
</div>

<p class="gk-credits">Screenshots show GatherKit’s sample library; the people in them aren’t real. GatherKit is made by Bakari Mustafa.</p>

</div>
