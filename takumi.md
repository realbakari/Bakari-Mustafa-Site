---
title: Takumi OS
permalink: "/takumi/"
layout: page
hide_title: true
full_width: true
comments: false
excerpt: "A desktop for people who are done with macOS and Windows. Updates you can undo, windows that never pile up, and one place to find anything."
description: "Takumi OS is a desktop built on Arch Linux for people coming from a Mac or a Windows PC: updates that can be undone, a scrolling desktop where windows never overlap, one field for apps, settings and commands, and themes that follow the time of day."
image: "/assets/img/takumi/skies/ion.jpg"
---

<link rel="stylesheet" href="/assets/css/takumi.css">
<link rel="stylesheet" href="/assets/js/takumi/stages.css">
<script src="/assets/js/takumi/stages.js" defer></script>

<style>
.page-content .tk {
  container: tk / inline-size;
  color: var(--text-primary);
  padding-bottom: 4rem;
}
.page-content .tk p { padding: 0 !important; }
.page-content .tk a { text-decoration: none; }

/* ── Hero ─────────────────────────────────────────────────────── */
.page-content .tk .tk-hero { margin: 4.5rem auto 3rem; max-width: 760px; text-align: center; }
.page-content .tk .tk-hero .tk-emblem {
  width: 64px; height: 64px; border-radius: 18px; font-size: 46px;
  margin: 0 auto 1.75rem;
}
.page-content .tk .tk-eyebrow {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.875rem !important;
}
.page-content .tk .tk-hero h1 {
  font-size: clamp(2.75rem, 7vw, 4.25rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 0 0 1.25rem;
}
.page-content .tk .tk-lede {
  font-size: clamp(1.125rem, 2.2vw, 1.3125rem);
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 32em;
  margin: 0 auto 2rem !important;
}
.page-content .tk .tk-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-bottom: 1rem; }
.page-content .tk .tk-button {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: 1px solid var(--border-default);
  color: var(--text-primary) !important;
  background: var(--bg-primary);
}
.page-content .tk .tk-button:hover { border-color: var(--border-strong); }
.page-content .tk .tk-button.is-primary { background: var(--text-primary); border-color: var(--text-primary); color: var(--bg-primary) !important; }
.page-content .tk .tk-button.is-primary:hover { opacity: 0.88; }
.page-content .tk .tk-meta { font-size: 0.875rem; color: var(--text-tertiary); }
.page-content .tk .tk-meta a, body[data-theme="dark"] .page-content .tk .tk-meta a { color: var(--text-secondary); border-bottom: 1px solid var(--border-default); }
.page-content .tk .tk-meta a:hover { color: var(--text-primary); }

/* ── The scene: its slot holds the shape before the script runs ── */
.page-content .tk .tk-stage { position: relative; width: 100%; margin: 0 auto 1rem; aspect-ratio: 1000 / 580; max-width: 1000px; }
.page-content .tk .tk-stage-fallback { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; display: block; }
/* On the site's dark page the dark screen needs an edge */
body[data-theme="dark"] .page-content .tk .tkh-screen { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1); }
.page-content .tk .tk-caption { text-align: center; font-size: 0.875rem; color: var(--text-tertiary); margin: 0 auto 6rem !important; max-width: 40em; }

/* ── Sections: a heading column and its text ─────────────────── */
.page-content .tk .tk-part {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
  gap: clamp(1.5rem, 5vw, 4.5rem);
  padding: 3rem 0;
  border-top: 1px solid var(--border-subtle);
}
.page-content .tk .tk-part h2 {
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0;
}
.page-content .tk .tk-part .tk-kicker { font-size: 0.8125rem; color: var(--text-tertiary); margin-top: 0.625rem !important; }
.page-content .tk .tk-text > p { font-size: 1.0625rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1rem !important; }
.page-content .tk .tk-text > p strong { color: var(--text-primary); font-weight: 600; }
.page-content .tk .tk-text a, .page-content .tk .tk-panel a, .page-content .tk .tk-credits a {
  color: var(--text-primary); border-bottom: 1px solid var(--border-strong);
}
.page-content .tk .tk-text a:hover, .page-content .tk .tk-panel a:hover { border-color: var(--text-primary); }
.page-content .tk kbd {
  display: inline-block;
  font-family: inherit;
  font-size: 0.8125em;
  font-weight: 500;
  line-height: 1.4;
  padding: 0.05em 0.45em;
  border: 1px solid var(--border-default);
  border-bottom-width: 2px;
  border-radius: 5px;
  background: var(--bg-primary);
  color: var(--text-primary);
  white-space: nowrap;
}

/* An update's life, as four steps on one rule */
.page-content .tk .tk-steps { list-style: none; margin: 1.5rem 0 0; padding: 0; counter-reset: s; }
.page-content .tk .tk-steps li {
  position: relative;
  padding: 0 0 1.25rem 2.25rem;
  margin: 0;
  font-size: 0.9875rem;
  line-height: 1.55;
  color: var(--text-secondary);
  counter-increment: s;
}
.page-content .tk .tk-steps li::before {
  content: counter(s);
  position: absolute;
  left: 0;
  top: 0.05rem;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-primary);
}
.page-content .tk .tk-steps li::after {
  content: "";
  position: absolute;
  left: 0.6875rem;
  top: 1.5rem;
  bottom: 0.125rem;
  width: 1px;
  background: var(--border-default);
}
.page-content .tk .tk-steps li:last-child::after { content: none; }
.page-content .tk .tk-steps li strong { color: var(--text-primary); font-weight: 600; }

/* The keys, Mac and Windows beside Takumi */
.page-content .tk .tk-keys { width: 100%; border-collapse: collapse; margin-top: 1.25rem; font-size: 0.9375rem; display: table; border: 0; }
.page-content .tk .tk-keys th, .page-content .tk .tk-keys td {
  text-align: left; padding: 0.625rem 0.75rem 0.625rem 0; border: 0; border-bottom: 1px solid var(--border-subtle); background: none; vertical-align: top;
}
.page-content .tk .tk-keys th { font-size: 0.75rem; font-weight: 600; color: var(--text-tertiary); border-bottom-color: var(--border-default); }
.page-content .tk .tk-keys td:first-child { color: var(--text-secondary); }
.page-content .tk .tk-keys tr:nth-child(even) td { background: none; }

/* ── Smaller things, in a ruled grid ──────────────────────────── */
.page-content .tk .tk-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--border-subtle);
  margin: 0 0 4.5rem;
}
.page-content .tk .tk-grid div { padding: 1.5rem 1.5rem 1.5rem 0; border-bottom: 1px solid var(--border-subtle); }
.page-content .tk .tk-grid h3 { font-size: 1rem; font-weight: 600; margin: 0 0 0.375rem; }
.page-content .tk .tk-grid p { font-size: 0.9375rem; line-height: 1.55; color: var(--text-secondary); }
.page-content .tk .tk-grid-head { font-size: 0.8125rem; color: var(--text-tertiary); margin: 0 0 0.75rem !important; }

/* ── Closing ──────────────────────────────────────────────────── */
.page-content .tk .tk-closing { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.25rem; margin-bottom: 3rem; }
.page-content .tk .tk-panel { padding: 1.75rem; border-radius: 12px; border: 1px solid var(--border-subtle); background: var(--bg-secondary); min-width: 0; }
.page-content .tk .tk-panel h2 { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 0.75rem; }
.page-content .tk .tk-panel p { font-size: 0.9875rem; line-height: 1.6; color: var(--text-secondary); }
.page-content .tk .tk-panel p + p { margin-top: 0.75rem !important; }
.page-content .tk .tk-panel ul { margin: 0.75rem 0 0; padding-left: 1.125rem; font-size: 0.9375rem; line-height: 1.55; color: var(--text-secondary); }
.page-content .tk .tk-panel li { margin: 0 0 0.375rem; }
.page-content .tk .tk-cmd {
  margin: 1rem 0 0.75rem;
  padding: 0.75rem 0.875rem;
  border-radius: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  font-family: "SF Mono", Monaco, Inconsolata, monospace;
  font-size: 0.8125rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: nowrap;
  color: var(--text-primary);
}
.page-content .tk .tk-credits { font-size: 0.875rem; line-height: 1.6; color: var(--text-tertiary); max-width: 720px; }

@media (max-width: 860px) {
  .page-content .tk .tk-part { grid-template-columns: minmax(0, 1fr); gap: 1rem; padding: 2.5rem 0; }
  .page-content .tk .tk-closing { grid-template-columns: minmax(0, 1fr); }
  .page-content .tk .tk-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
/* The scene switches to its phone design in a narrow column; the slot follows. */
@container tk (max-width: 719px) {
  .page-content .tk .tk-stage { aspect-ratio: 358 / 400; max-width: 358px; }
}
@media (max-width: 560px) {
  .page-content .tk .tk-hero { margin-top: 2.5rem; }
  .page-content .tk .tk-grid { grid-template-columns: minmax(0, 1fr); }
  .page-content .tk .tk-grid div { padding-right: 0; }
  .page-content .tk .tk-caption { margin-bottom: 4rem !important; }
  .page-content .tk .tk-keys { font-size: 0.875rem; }
}
</style>

<div class="tk">

<div class="tk-hero">
  <span class="tk-emblem" aria-hidden="true">匠</span>
  <p class="tk-eyebrow">A desktop built on Arch Linux · Pre-alpha</p>
  <h1>Takumi</h1>
  <p class="tk-lede">For people who are done with macOS and Windows. Updates you can undo, windows that never pile up, and one place to find anything.</p>
  <div class="tk-actions">
    <a class="tk-button is-primary" href="/takumi/docs/">Read the guide</a>
    <a class="tk-button" href="/takumi/docs/install/">How to install</a>
  </div>
  <p class="tk-meta">Version 0.1.0 · Tested in a virtual machine · <a href="https://github.com/realbakari/takumi-os">Source on GitHub</a></p>
</div>

<div class="tk-stage" id="tk-hero-stage" role="img" aria-label="The Takumi desktop: a text editor on the strip, the sky beside it and the Core, a capsule, at the bottom. Super and Space grow the Core into the Palette. Typing theme lists Theme Umi, Theme Ember, Theme Sakura and Theme Ion, in use. Moving up the list, Sakura and then Ember take over the whole desktop: the sky, the windows and the Core. Super and Space again close the Palette and put Ion back.">
  <img class="tk-stage-fallback" src="/assets/img/takumi/skies/ion.jpg" width="1376" height="774" alt="">
</div>
<p class="tk-caption">Moving through themes shows each one on the whole desktop before you choose it. Closing the Palette puts yours back.</p>

<section class="tk-part" id="core">
  <div>
    <h2>One place for everything</h2>
    <p class="tk-kicker">The Core and the Palette</p>
  </div>
  <div class="tk-text">
    <p>There is no menu bar, dock, taskbar or settings app. At the bottom of the screen sits <strong>the Core</strong>: a small capsule that names the window you are in, the time and what is on. When something happens, it widens to say so.</p>
    <p>Press <kbd>Super</kbd>+<kbd>Space</kbd> and it grows into <strong>the Palette</strong>. Type part of a name and press Enter: an app, an open window, a setting such as <code>bluetooth</code>, a sum, an emoji, something you copied earlier. An app you don't have yet shows as “Get” and installs just for you, without a password. Click the marks on the right for Quick settings; click the clock for Today.</p>
    <p>Rows that change something ask in place: “Press Enter again to shut down”. Nothing opens a terminal to do an everyday job. <a href="/takumi/docs/core/">More about the Core</a></p>
  </div>
</section>

<section class="tk-part" id="rooms">
  <div>
    <h2>Updates you can undo</h2>
    <p class="tk-kicker">Rooms</p>
  </div>
  <div class="tk-text">
    <p>An update never changes the system you are using. Takumi copies it, updates the copy and starts the copy the next time you restart. Each copy is called a <strong>room</strong>, and the old one stays.</p>
    <ol class="tk-steps">
      <li><strong>You choose when.</strong> Type <code>update</code> in the Palette. Nothing restarts your computer while you work.</li>
      <li><strong>The new room is prepared beside yours.</strong> You keep working; your files are not touched.</li>
      <li><strong>Restart to move in.</strong> The new room starts.</li>
      <li><strong>If it doesn’t start,</strong> the next start goes back to the last good room by itself and tells you, with nothing lost. If you just don’t like it, “Go back to the previous system” in the Palette does the same.</li>
    </ol>
    <p><a href="/takumi/docs/updates/">How updates work</a></p>
  </div>
</section>

<section class="tk-part" id="strip">
  <div>
    <h2>Windows sit side by side</h2>
    <p class="tk-kicker">The strip</p>
  </div>
  <div class="tk-text">
    <p>New windows open next to each other on a strip that goes on as far as you need. They never cover one another, and opening one never shrinks the one you were reading. You slide along the strip with <kbd>Super</kbd>+<kbd>←</kbd> <kbd>→</kbd>, see everything with <kbd>Super</kbd>+<kbd>O</kbd>, and make a window wider with <kbd>Super</kbd>+<kbd>R</kbd>.</p>
    <p>There is no layout to learn. If you can scroll a page, you can use it. The strip runs on <a href="https://github.com/YaLTeR/niri">niri</a>. <a href="/takumi/docs/strip/">Windows on the strip</a></p>
  </div>
</section>

<section class="tk-part" id="keys">
  <div>
    <h2>The keys your hands know</h2>
    <p class="tk-kicker">Harmony</p>
  </div>
  <div class="tk-text">
    <p><kbd>Super</kbd> is the Command key: the one with the Windows logo, or Command on a Mac keyboard. Copy, paste, undo, save and the rest mean the same thing in every app, the terminal included, because Takumi sets them once at the keyboard itself.</p>
    <table class="tk-keys">
      <thead><tr><th></th><th>Mac</th><th>Windows</th><th>Takumi</th></tr></thead>
      <tbody>
        <tr><td>Copy, paste, undo</td><td><kbd>⌘</kbd> <kbd>C</kbd> <kbd>V</kbd> <kbd>Z</kbd></td><td><kbd>Ctrl</kbd> <kbd>C</kbd> <kbd>V</kbd> <kbd>Z</kbd></td><td><kbd>Super</kbd> <kbd>C</kbd> <kbd>V</kbd> <kbd>Z</kbd></td></tr>
        <tr><td>Find anything</td><td><kbd>⌘</kbd> <kbd>Space</kbd></td><td><kbd>Win</kbd></td><td><kbd>Super</kbd> <kbd>Space</kbd></td></tr>
        <tr><td>Everything you copied</td><td>an app</td><td><kbd>Win</kbd> <kbd>V</kbd></td><td><kbd>Super</kbd> <kbd>P</kbd></td></tr>
        <tr><td>Emoji</td><td><kbd>⌃</kbd> <kbd>⌘</kbd> <kbd>Space</kbd></td><td><kbd>Win</kbd> <kbd>.</kbd></td><td><kbd>Super</kbd> <kbd>.</kbd></td></tr>
        <tr><td>Screenshot of a part</td><td><kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>4</kbd></td><td><kbd>Win</kbd> <kbd>⇧</kbd> <kbd>S</kbd></td><td><kbd>Super</kbd> <kbd>⇧</kbd> <kbd>4</kbd> or <kbd>S</kbd></td></tr>
        <tr><td>Lock</td><td><kbd>⌃</kbd> <kbd>⌘</kbd> <kbd>Q</kbd></td><td><kbd>Win</kbd> <kbd>L</kbd></td><td><kbd>Super</kbd> <kbd>L</kbd></td></tr>
      </tbody>
    </table>
    <p style="margin-top:1.25rem !important"><a href="/takumi/docs/keys/">Every key</a></p>
  </div>
</section>

<section class="tk-part" id="themes">
  <div>
    <h2>A screen that follows the day</h2>
    <p class="tk-kicker">Themes and the Sky</p>
  </div>
  <div class="tk-text">
    <p>A theme colours everything at once: the Core, your windows, the terminal, the editor and the sky behind them. Each one has four phases, so the colours warm at dawn and sink at night on their own.</p>
    <p>Fifty-five themes come with Takumi, light and dark: Takumi’s own, led by <strong>Ion</strong>, and the community palettes people already use. Type <code>theme</code> and move through them; each one shows itself before you choose. <a href="/takumi/docs/themes/">Themes and the Sky</a></p>
  </div>
</section>

<p class="tk-grid-head">And the rest of a computer</p>
<div class="tk-grid">
  <div><h3>Wi-Fi in the Core</h3><p>Type a password right in the list; a wrong one is known in seconds. Give a visitor your network with a code their phone scans.</p></div>
  <div><h3>Quick settings and Today</h3><p>Switches, sound and capture under <kbd>Super</kbd>+<kbd>I</kbd>. The month, timers and what apps said earlier under the clock.</p></div>
  <div><h3>Screenshots without an app</h3><p>The picture shows in the Core, a press away from opening. Record the screen, pick a colour, copy text off the screen.</p></div>
  <div><h3>An encrypted disk</h3><p>One password from start to desktop, and a recovery code in case you forget it. Nobody who takes the laptop gets your files.</p></div>
  <div><h3>Something is wrong</h3><p>Type it. Takumi checks Wi-Fi, sound, space, updates and the clock, fixes what is safe and says what it did.</p></div>
  <div><h3>An assistant that asks</h3><p>Intent, on Claude or OpenAI, acts only through Takumi’s own commands and asks before anything risky. Nothing is sent until you set it up.</p></div>
  <div><h3>Nothing phones home</h3><p>No account, no tracking. Takumi goes online for updates, the weather you asked for and the assistant you chose.</p></div>
  <div><h3>One command for all of it</h3><p>Every row in the Palette is a <code>takumi</code> command you can read and run. If you can see it, you can script it.</p></div>
  <div><h3>Erase and give away</h3><p>One row resets the computer for its next owner, who chooses their own password and gets their own recovery code.</p></div>
</div>

<div class="tk-closing">
  <section class="tk-panel">
    <h2>Where it stands</h2>
    <p>Takumi is at version 0.1.0 and runs in a virtual machine today: the setup disc, the desktop, rooms and rollback, the Core, Wi-Fi, sound, displays, power, encryption and fifty-five themes. Some parts, like Bluetooth and firmware updates, are built against stand-ins for the real hardware.</p>
    <p>Next comes real hardware, laptops first. There is no setup disc to download yet; this page will say when there is. <a href="/takumi/docs/">The full story is in the guide.</a></p>
  </section>
  <section class="tk-panel">
    <h2>Install</h2>
    <p>From the setup disc: start the computer from a USB stick, answer five questions and it installs, with no network needed. Or, on a computer that already runs Arch Linux:</p>
    <div class="tk-cmd">curl -fsSL https://www.bakarimustafa.com/takumi/install.sh | bash</div>
    <p>The setup disc isn’t out yet. The one-line install works today and fetches Takumi from <a href="https://github.com/realbakari/takumi-os">GitHub</a>; it is pre-alpha, so use a computer you don’t depend on. <a href="/takumi/docs/install/">Installing, step by step</a> · <a href="/takumi/install.sh">Read the script</a></p>
  </section>
</div>

<p class="tk-credits">匠 (takumi) is Japanese for a master craftsman. The skies in the scene above are the Ion, Sakura and Ember themes’ own pictures. Takumi is free software under the MIT licence, made by Bakari Mustafa. Questions or ideas? Email <a href="mailto:bakari@bakarimustafa.com">bakari@bakarimustafa.com</a>.</p>

</div>
