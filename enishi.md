---
title: Enishi
permalink: "/enishi/"
layout: page
hide_title: true
full_width: true
comments: false
# download_ready shows Download for Mac, linked to site.data.enishi.mac_download_url
# (_data/enishi.yml), with the version beneath it. Update version with each release.
# The App Store link for iPhone, iPad and Apple Watch is set in _data/enishi.yml.
download_ready: false
version: "1.0"
excerpt: "A private notebook about the people in your life: what you talked about, what you promised and the moments you shared, kept as plain files that are yours. For iPhone, iPad, Mac and Apple Watch."
description: "Enishi is a private notebook about the people in your life, for iPhone, iPad, Mac and Apple Watch. Log a conversation in one sentence, see who today is about, keep your follow-ups and reconnect with people. Your notebook is a folder of plain Markdown files. No account, no analytics and no tracking."
image: "/assets/img/enishi/icon-512.png"
---

<link rel="stylesheet" href="/assets/css/enishi.css?v=1">
<link rel="stylesheet" href="/assets/js/enishi/stages.css?v=1">
<script src="/assets/js/enishi/stages.js?v=1" defer></script>

<div class="en">

<div class="en-hero">
  <img class="en-icon" src="/assets/img/enishi/icon.png" alt="The Enishi app icon: a knotted cord in cream on brick red" width="104" height="104">
  <p class="en-eyebrow">For iPhone, iPad, Mac and Apple Watch</p>
  <h1>Enishi</h1>
  <p class="en-lede">A private notebook about the people in your life: what you talked about, what you promised and the moments you shared, kept as plain files that are yours.</p>
  <div class="en-actions">
{% if site.data.enishi.app_store_url != "" and site.data.enishi.app_store_badge %}
    <a class="en-badge" href="{{ site.data.enishi.app_store_url }}"><img src="/assets/img/enishi/app-store-badge.svg" alt="Download on the App Store" height="44"></a>
{% elsif site.data.enishi.app_store_url != "" %}
    <a class="en-store" href="{{ site.data.enishi.app_store_url }}" aria-label="Download Enishi on the App Store"><small>Download on the</small><strong>App Store</strong></a>
{% else %}
    <span class="en-store" role="img" aria-label="Coming to the App Store"><small>Coming to the</small><strong>App Store</strong></span>
{% endif %}
{% if page.download_ready %}
    <a class="en-button" href="{{ site.data.enishi.mac_download_url }}">Download for Mac</a>
{% endif %}
  </div>
{% if page.download_ready %}
  <p class="en-meta"><span>Mac: version {{ page.version }}</span> · <span>For macOS {{ site.data.enishi.minimum_macos }} or later</span> · <a href="{{ site.data.enishi.mac_releases_url }}">Release notes</a></p>
{% else %}
  <p class="en-meta"><span>The Mac download isn’t ready yet</span> · <span>For macOS {{ site.data.enishi.minimum_macos }} or later</span></p>
{% endif %}
</div>

<div class="en-stage en-hero-stage" id="en-hero-stage" role="img" aria-label="Enishi’s Timeline on the Mac. The quick log opens with Control-Option-M and the sentence “coffee with Ada yesterday, follow up Friday: send the deck” is typed. Enishi reads it as Ada Lovelace, yesterday, and a follow-up on Friday. Return logs it: Coffee with Ada arrives at the top of November with Ada’s face and the follow-up Send the deck, Friday, and the count goes from 4 to 5 conversations in the last 12 months.">
  <img class="en-stage-fallback" src="/assets/img/enishi/hero.jpg" width="2000" height="1080" alt="">
</div>

<section class="en-stack" id="features">
  <div class="en-copy">
    <h2>Log it in a sentence</h2>
    <p>Write what happened the way you’d say it: “coffee with Ada yesterday, follow up Friday: send the deck”. Enishi works out who it was with, when it was and what you said you’d do.</p>
  </div>
  <ul class="en-points">
    <li>Type it or say it, on iPhone, iPad or Apple Watch.</li>
    <li>On the Mac, the quick log opens from the menu bar with <span class="en-kbd">⌃⌥M</span>, over whatever you’re doing.</li>
    <li>Add a note, a place, photos or a follow-up when there’s more to say.</li>
    <li>Every conversation joins the timeline, and ones that continue each other become a thread.</li>
  </ul>
</section>

<section class="en-row">
  <div class="en-copy">
    <h2>Who today is about</h2>
    <p>Today starts with faces: the people with something due, a birthday or a meeting. Tap one to see everything you know about them.</p>
    <ul class="en-points">
      <li>Follow-ups that are due, and birthdays coming up.</li>
      <li>People you haven’t spoken to in a while.</li>
      <li>Meetings from your calendar, each with a short brief on who you’re about to see.</li>
      <li>A daily page for whatever else happened.</li>
    </ul>
  </div>
  <div class="en-scene">
    <div class="en-stage" id="en-today-stage" role="img" aria-label="Enishi’s Today on iPhone, Thursday 19 November: faces for Ada, Sam and Grace, follow-ups Send the deck, Friday, Ada Lovelace and Book the venue, in 3 days, Sam Okafor, and Grace Hopper to reconnect with. A tap on Ada’s face opens her page: Founder at Analytical Engines, last contact yesterday, in touch every month, with Send the deck as her open follow-up.">
      <img class="en-stage-fallback" src="/assets/img/enishi/today.jpg" width="1040" height="880" alt="">
    </div>
  </div>
</section>

<section class="en-shots">
  <div class="en-copy">
    <h2>Everyone has a page</h2>
    <p>What you talked about, what you promised, the dates that matter to them and the photos you’re in together, on one page for each person.</p>
  </div>
  <div class="en-phones">
    <figure class="en-shot">
      <img class="is-light" src="/assets/img/enishi/iphone-person-light.jpg" width="600" height="1305" loading="lazy" alt="Ada Lovelace’s page on iPhone: her photo, Founder at Analytical Engines, last contact 5 weeks ago, buttons to log, email and plan, her details and open follow-ups.">
      <img class="is-dark" src="/assets/img/enishi/iphone-person-dark.jpg" width="600" height="1305" loading="lazy" alt="Ada Lovelace’s page on iPhone: her photo, Founder at Analytical Engines, last contact 5 weeks ago, buttons to log, email and plan, her details and open follow-ups.">
    </figure>
    <figure class="en-shot">
      <img class="is-light" src="/assets/img/enishi/iphone-conversation-light.jpg" width="600" height="1305" loading="lazy" alt="A conversation on iPhone: Hike to the falls, a year ago, with a photo of the path, the place, Ada Lovelace and Sam Okafor, and what happened.">
      <img class="is-dark" src="/assets/img/enishi/iphone-conversation-dark.jpg" width="600" height="1305" loading="lazy" alt="A conversation on iPhone: Hike to the falls, a year ago, with a photo of the path, the place, Ada Lovelace and Sam Okafor, and what happened.">
    </figure>
    <figure class="en-shot">
      <img class="is-light" src="/assets/img/enishi/iphone-timeline-light.jpg" width="600" height="1305" loading="lazy" alt="The Timeline on iPhone: a chart of conversations over the last 12 months, then each conversation by month, with who it was with and a follow-up.">
      <img class="is-dark" src="/assets/img/enishi/iphone-timeline-dark.jpg" width="600" height="1305" loading="lazy" alt="The Timeline on iPhone: a chart of conversations over the last 12 months, then each conversation by month, with who it was with and a follow-up.">
    </figure>
  </div>
</section>

<div class="en-pair">
  <section class="en-copy">
    <h2>Reconnect</h2>
    <p>Give someone a gentle rhythm, like keep in touch every month, and Enishi lets you know when it’s been a while. Mark that you touched base and the clock starts again.</p>
  </section>
  <section class="en-copy">
    <h2>Follow-ups</h2>
    <p>Every “I’ll send it Friday” becomes a follow-up, with its person and its day. They’re kept in an Enishi list in Reminders too, and ticking one off there ticks it off here.</p>
  </section>
</div>

<section class="en-wide">
  <div class="en-copy">
    <h2>Memories</h2>
    <p>The same week in other years, with your photos as the heroes, and a photo timeline and map of where you’ve been and who with. Photos you choose are copied into your notebook; your library isn’t changed.</p>
  </div>
  <div class="en-window">
    <img class="is-light" src="/assets/img/enishi/mac-memories-light.webp" width="1600" height="1058" loading="lazy" alt="Memories in Enishi on the Mac: Around this week, other years, with Hike to the falls a year ago and First coffee with Grace Hopper two years ago, then the photo timeline.">
    <img class="is-dark" src="/assets/img/enishi/mac-memories-dark.webp" width="1600" height="1058" loading="lazy" alt="Memories in Enishi on the Mac: Around this week, other years, with Hike to the falls a year ago and First coffee with Grace Hopper two years ago, then the photo timeline.">
  </div>
</section>

<section class="en-stack">
  <div class="en-copy">
    <h2>Your notebook is a folder</h2>
    <p>Every person, conversation and page is a plain Markdown file, with photos beside it. Keep the folder on your device, in iCloud Drive so your iPhone, iPad and Mac show the same notebook, or in any folder on your Mac.</p>
  </div>
  <ul class="en-points">
    <li>Open, copy, back up or edit the files with any app, at any time.</li>
    <li>Open a notebook someone has shared with you through iCloud Drive, like a family notebook.</li>
    <li>Bring in what you already have from Contacts, Day One, Obsidian, Notion and LinkedIn.</li>
    <li>Deleted people, conversations and pages wait in Recently Deleted for 30 days.</li>
  </ul>
</section>

<section class="en-group">
  <div class="en-copy">
    <h2>Pages, and what you keep to yourself</h2>
  </div>
  <div class="en-three">
    <div><h3>Pages and a daily page</h3><p>Write as you would in a journal. Mention people with @, link pages with [[double brackets]] and keep checklists.</p></div>
    <div><h3>Private people and locked pages</h3><p>Enishi shows only the name until Face ID or Touch ID unlocks them, and leaves them out of Spotlight, widgets, Siri, notifications and anything an assistant can read.</p></div>
    <div><h3>Letters to the future</h3><p>Write a page and seal it until a date. Before that day it can’t be read, searched or reached by an assistant.</p></div>
  </div>
</section>

<section class="en-group">
  <div class="en-copy"><h2>Also in Enishi</h2></div>
  <div class="en-grid">
    <div><h3>Ask your notebook</h3><p>On devices with Apple Intelligence, Enishi summarises conversations and answers questions about your notebook, on your device.</p></div>
    <div><h3>A connector for assistants</h3><p>On the Mac, a built-in connector (MCP) lets an assistant like Claude work with your notebook, if you turn it on. You choose whether it can only read or also make changes. Private people and locked pages are always withheld.</p></div>
    <div><h3>Business cards</h3><p>Scan a card with the camera and a new person is filled in. The card is read on your device and the photo isn’t kept.</p></div>
    <div><h3>Spotlight, widgets, Siri and Shortcuts</h3><p>Find people and pages from search, see follow-ups and birthdays on your Home Screen, and use Enishi’s actions in Siri and Shortcuts.</p></div>
    <div><h3>Postcards and books</h3><p>Make a postcard from a memory, or a keepsake book as a PDF.</p></div>
    <div><h3>English and Japanese</h3><p>Enishi is written in both, and follows the language your device uses.</p></div>
    <div><h3>Updates on the Mac</h3><p>Enishi asks before it checks for updates on its own, and checking sends nothing about you or your notebook. Enishi installs only updates signed by Enishi.</p></div>
    <div><h3>Contacts</h3><p>Add people from your address book, see when their details have changed, and add a link to Enishi on a contact’s card when you ask.</p></div>
    <div><h3>How it felt</h3><p>Note how a conversation felt. If you turn it on, Enishi saves it to Apple Health as a State of Mind entry.</p></div>
  </div>
</section>

<div class="en-closing">
  <section>
    <h2>Private by design</h2>
    <p>No account, no analytics and no tracking, and nothing is sent to us. Enishi goes online only to sync through your own iCloud Drive if you keep your notebook there, to show maps, and on the Mac to check for updates, which it asks about first.</p>
    <p>Summaries and answers are made on your device. The details are in the <a href="/enishi/privacy/">privacy policy</a>.</p>
  </section>
  <section>
    <h2>Getting Enishi</h2>
    <p>{% if site.data.enishi.app_store_url != "" %}Enishi for iPhone, iPad and Apple Watch is on the <a href="{{ site.data.enishi.app_store_url }}">App Store</a>.{% else %}Enishi for iPhone, iPad and Apple Watch is coming to the App Store.{% endif %} {% if page.download_ready %}Enishi for Mac is a <a href="{{ site.data.enishi.mac_download_url }}">direct download</a>, for macOS {{ site.data.enishi.minimum_macos }} or later.{% else %}Enishi for Mac will be a direct download, for macOS {{ site.data.enishi.minimum_macos }} or later.{% endif %}</p>
    <p>Questions or ideas? Email <a href="mailto:{{ site.data.enishi.support_email }}">{{ site.data.enishi.support_email }}</a>.</p>
  </section>
</div>

<p class="en-credits">The scenes on this page are drawn from Enishi’s interface. The people in them are made up and their photos are stock. Enishi is made by Bakari Mustafa.</p>

<nav class="en-foot" aria-label="Enishi pages">
  <a href="/enishi/" aria-current="page">Enishi</a>
  <a href="/enishi/privacy/">Privacy</a>
  <a href="/legal/privacy/">Website privacy policy</a>
</nav>

</div>
