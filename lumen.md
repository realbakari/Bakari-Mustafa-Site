---
title: Lumen for iPhone
permalink: "/lumen/"
layout: page
hide_title: true
full_width: true
comments: false
excerpt: "Shoot. Develop. Create. A manual camera, a RAW developer and a photo editor for iPhone, with 48 original Looks you can see in the viewfinder."
description: "Lumen for iPhone: a camera with real manual control, RAW development with Apple's RAW decoder, a non-destructive editor with masks and curves, and 48 original Looks in eight families. No account, no tracking, no network requests."
image: "/assets/img/lumen/icon.png"
---

<link rel="stylesheet" href="/assets/css/lumen.css?v=2">

<div class="lu">

<section class="lu-stage">
  <div class="lu-hero">
    <img class="lu-icon" src="/assets/img/lumen/icon.png" alt="" width="104" height="104">
    <p class="lu-eyebrow">Lumen for iPhone{% if site.data.lumen.app_store_url == "" %} · Coming soon{% else %} · On the App Store{% endif %}</p>
    <h1>Shoot. Develop. Create.</h1>
    <p class="lu-lede">A manual camera, a RAW developer and a photo editor in one app, with 48 original Looks you can see in the viewfinder before you shoot.</p>
    <div class="lu-actions">
      {% if site.data.lumen.app_store_url != "" and site.data.lumen.app_store_badge %}
      <a class="lu-badge" href="{{ site.data.lumen.app_store_url }}"><img src="/assets/img/lumen/app-store-badge.svg" alt="Download on the App Store" height="48"></a>
      {% elsif site.data.lumen.app_store_url != "" %}
      <a class="lu-badge-soon lu-store-link" href="{{ site.data.lumen.app_store_url }}" aria-label="Download Lumen on the App Store"><small>Download on the</small><strong>App Store</strong></a>
      {% else %}
      <span class="lu-badge-soon" role="img" aria-label="Coming soon to the App Store"><small>Coming soon to the</small><strong>App Store</strong></span>
      {% endif %}
    </div>
    <p class="lu-meta">iPhone · iOS {{ site.data.lumen.minimum_ios }} or later</p>
  </div>
  <div class="lu-phones" aria-hidden="true">
    <img src="/assets/img/lumen/editor-white-balance.jpg" width="552" height="1200" alt="">
    <img src="/assets/img/lumen/editor-looks.jpg" width="552" height="1200" alt="">
    <img src="/assets/img/lumen/editor-perspective.jpg" width="552" height="1200" alt="">
  </div>
</section>

<ul class="lu-facts">
  <li><strong>No account</strong><span>Open it and shoot.</span></li>
  <li><strong>No tracking</strong><span>No analytics, no ads.</span></li>
  <li><strong>Offline</strong><span>Makes no network requests.</span></li>
  <li><strong>Apple Photos</strong><span>Your library, no import.</span></li>
</ul>

<section class="lu-section" id="camera">
  <div class="lu-intro">
    <p class="lu-kicker">Camera</p>
    <h2>Every setting, yours to set.</h2>
    <p>Fix the shutter and Lumen finds the ISO. Fix the ISO and it finds the shutter. Fix both and you're in full manual. There's no mode dial to remember, and Lumen only shows what your iPhone's lenses can really do.</p>
  </div>
  <div class="lu-grid">
    <div><h3>RAW your way</h3><p>ProRAW or Bayer RAW, on its own or paired with HEIF or JPEG.</p></div>
    <div><h3>Spot and grey card</h3><p>Drag the meter anywhere in the frame. Tap a grey card for exact white balance.</p></div>
    <div><h3>Size and frame</h3><p>12, 24 or 48 MP, framed at 4:3, 3:2, 16:9 or 1:1, and undoable later.</p></div>
    <div><h3>Brackets to HDR</h3><p>Shoot a bracket and Lumen aligns and merges it into one editable HDR photo.</p></div>
    <div><h3>Viewfinder aids</h3><p>Histogram, zebras, focus peaking, clipping, a level and grids.</p></div>
    <div><h3>Camera Control</h3><p>Slide to set exposure, change the Look or its strength.</p></div>
  </div>
</section>

<section class="lu-row is-flipped">
  <div class="lu-copy">
    <p class="lu-kicker">Develop and edit</p>
    <h2>Develop the RAW, not the JPEG.</h2>
    <p>Lumen develops RAW files with Apple's RAW decoder, so you edit everything the sensor recorded. By default it adds no sharpening and no local tone mapping, which keeps the photo looking natural.</p>
    <p>Then the full editor: curves, eight-band HSL, colour grading, perspective, heal and clone, and masks for the sky, a person or the subject. Edits are saved in Photos and the original is never touched.</p>
  </div>
  <figure class="lu-shot">
    <img src="/assets/img/lumen/editor-perspective.jpg" width="552" height="1200" alt="Lumen's editor straightening the perspective of a rainy night street with Vertical and Horizontal sliders." loading="lazy">
  </figure>
</section>

<section class="lu-row">
  <div class="lu-copy">
    <p class="lu-kicker">Looks</p>
    <h2>48 Looks, all original.</h2>
    <p>Each Look is a complete colour rendering with one strength slider. They're built so skin stays natural and bright colours roll off instead of clipping, and they stay editable after you shoot.</p>
    <ul class="lu-families">
      <li><strong>Everyday</strong><span>Natural, Soft, Airy, Crisp, Lively</span></li>
      <li><strong>Portrait</strong><span>Portrait, Glow, Porcelain, Bronze, Editorial</span></li>
      <li><strong>Colour</strong><span>Warm, Cool, Golden, Dusk, Savour, Chrome, Pastel, Pop, Deep</span></li>
      <li><strong>Outdoor</strong><span>Terrain, Meadow, Coast, Alpine, Dune</span></li>
      <li><strong>Urban</strong><span>Asphalt, Signal, Transit, Neon</span></li>
      <li><strong>Analog</strong><span>Fade, Documentary, Linen, Ember, Postcard, Citrus</span></li>
      <li><strong>Cinema</strong><span>Copper, Steel, Night, Lantern, Velvet, Mirage</span></li>
      <li><strong>Mono</strong><span>Mono, Pearl, Slate, Umber, Chalk, Ink, Infra, Frost</span></li>
    </ul>
    <p class="lu-small">Make your own from any edit, or bring your own <code>.cube</code> LUTs.</p>
  </div>
  <figure class="lu-shot">
    <img src="/assets/img/lumen/editor-looks.jpg" width="552" height="1200" alt="Lumen's Looks panel: tiles for Natural, Soft, Airy and Crisp, each previewing the Look on the photo being edited." loading="lazy">
  </figure>
</section>

<section class="lu-section">
  <div class="lu-intro">
    <p class="lu-kicker">Video</p>
    <h2>The same care, in motion.</h2>
    <p>4K or 1080p from 24 to 60 fps, with 120 and 240 fps in 1080p where your iPhone offers them. Bake the Look into the clip, or record clean and keep the Look for later.</p>
  </div>
  <div class="lu-grid">
    <div><h3>ProRes Log</h3><p>Apple Log in ProRes on iPhones that support it, or HEVC.</p></div>
    <div><h3>Waveform and false colour</h3><p>Judge exposure properly, even in Log.</p></div>
    <div><h3>Pause and gain</h3><p>Pause a take and resume it in the same file. Ride the audio gain mid-take.</p></div>
    <div><h3>Record to a drive</h3><p>Plug in a USB-C drive and record straight to it.</p></div>
    <div><h3>Keeps rolling</h3><p>If the drive fills or comes loose, recording carries on to the iPhone.</p></div>
    <div><h3>180° shutter</h3><p>Shutter speed follows the frame rate on its own.</p></div>
  </div>
</section>

<section class="lu-section">
  <div class="lu-intro">
    <p class="lu-kicker">More</p>
    <h2>Ready when you are.</h2>
  </div>
  <div class="lu-grid">
    <div><h3>Shoot from the Lock Screen</h3><p>Put Lumen Camera in Control Centre, on the Lock Screen or on the Action button.</p></div>
    <div><h3>Siri and Shortcuts</h3><p>"Open Lumen in video mode." "Shoot with Golden in Lumen."</p></div>
    <div><h3>Cull fast</h3><p>Swipe up to pick, down to reject. Stars, labels, stacks and side-by-side compare.</p></div>
    <div><h3>HDR photos</h3><p>Single shots on auto exposure keep their highlights bright on HDR screens.</p></div>
    <div><h3>Export anything</h3><p>JPEG, HEIF, PNG, 16-bit TIFF or AVIF, with or without location.</p></div>
    <div><h3>Batch edits</h3><p>Apply a Look to a whole shoot, or paste one photo's edit onto the rest.</p></div>
  </div>
</section>

<div class="lu-closing">
  <section class="lu-panel">
    <h2>Private by design</h2>
    <p>Lumen collects nothing. There's no account, no analytics and no network access, so your photos never leave your iPhone unless you share them. Location is off until you turn it on. <a href="/lumen/privacy/">Privacy policy</a></p>
  </section>
  <section class="lu-panel">
    <h2>Help</h2>
    <p>Guides to the camera, the editor and Looks, the Lock Screen camera, Shortcuts and recording to a drive are in <a href="/lumen/support/">Lumen Support</a>. Or email <a href="mailto:{{ site.data.lumen.support_email }}">{{ site.data.lumen.support_email }}</a>.</p>
  </section>
</div>

<p class="lu-credits">Screenshots are of Lumen in the iOS Simulator. Rainy street photo by <a href="https://unsplash.com/photos/people-walking-on-street-in-rainy-day-FhR46F3l9KQ">Gil Ribeiro on Unsplash</a>. Some features depend on your iPhone model. Lumen is made by Bakari Mustafa.</p>

</div>
