---
title: Relova for iPhone
permalink: "/relova/"
layout: page
hide_title: true
full_width: true
comments: false
excerpt: "A fresh start, made easier. Relova plans your move for your state, tracks the legal deadlines for updating your address and keeps a dated, room-by-room record for your bond. No account and no referral fees."
description: "Relova for iPhone helps Australian renters move home: a plan for your state, an Address Hub with legal deadlines, room-by-room condition records and an evidence pack, the bond timeline, letters, budget, boxes and household. No account, no referral fees, and your records are kept on your iPhone."
image: "/assets/img/relova/relova-app-icon-1024.png"
---

<link rel="stylesheet" href="/assets/css/relova.css?v=2">

<div class="rv">

<section class="rv-hero">
  <img class="rv-mark" src="/assets/img/relova/brand-mark.png" alt="" width="96" height="96">
  <p class="rv-name">Relova for iPhone</p>
  <h1>A fresh start, made easier.</h1>
  <p class="rv-lede">Know what needs to happen, when it needs to happen and where everything stands.</p>
  <div class="rv-actions">
    {% if site.data.relova.app_store_url != "" %}
    <a class="rv-badge" href="{{ site.data.relova.app_store_url }}"><img src="/assets/img/relova/app-store-badge.svg" alt="Download on the App Store" height="52"></a>
    {% else %}
    <span class="rv-badge-soon" role="img" aria-label="Coming soon to the App Store"><small>Coming soon to the</small><strong>App Store</strong></span>
    {% endif %}
  </div>
  <p class="rv-meta">iPhone · iOS {{ site.data.relova.minimum_ios }} or later</p>
</section>

<section class="rv-section rv-first" id="features">
  <div class="rv-intro">
    <h2>From giving notice to getting your bond back.</h2>
    <p>Relova puts the jobs in order for the state you're leaving and the one you're moving to, and keeps the records you'll need if the bond is disputed.</p>
  </div>

  <div class="rv-feature-lead">
    <article class="rv-card is-lead">
      <span class="rv-icon">{% include relova-icon.html name="feat.evidence" %}</span>
      <h3>Room-by-room condition records</h3>
      <p>Each room is broken into the items a condition report lists, such as walls, floors, the oven and taps. Mark each one clean, undamaged and working when you move in and again when you move out.</p>
      <ul class="rv-points">
        <li>{% include relova-icon.html name="act.check" %}Photos are attached to the item they show, with the date and whether they were taken in Relova or imported. Relova never edits a photo.</li>
        <li>{% include relova-icon.html name="act.check" %}Record what the agent's report says, mark where you disagree, and send your comments back as a PDF.</li>
        <li>{% include relova-icon.html name="act.check" %}A countdown to your state's deadline for returning the entry report.</li>
        <li>{% include relova-icon.html name="act.check" %}An evidence pack PDF with entry and exit marks for every item, plus photos, meter readings and keys.<span class="rv-tag">Plus</span></li>
      </ul>
    </article>
    <article class="rv-card is-lead">
      <span class="rv-icon">{% include relova-icon.html name="feat.bond" %}</span>
      <h3>The bond timeline</h3>
      <p>Each step from handing back the keys to getting your bond, with your state's deadlines. If a deadline passes and you haven't been paid, Relova tells you to contact the bond authority.</p>
      <ul class="rv-points">
        <li>{% include relova-icon.html name="act.check" %}In NSW and Victoria, choose between a refund and moving the bond to your next rental. Relova works out the top-up and the fee, and lists who can transfer.</li>
        <li>{% include relova-icon.html name="act.check" %}If there's a claim on your bond, Relova lists anything you recorded as already there when you moved in. In Victoria and Queensland, it also checks whether you've been given the evidence the law requires.</li>
        <li>{% include relova-icon.html name="act.check" %}A draft response, and a link to your state's tenancy authority if you need to dispute.</li>
      </ul>
    </article>
  </div>

  <div class="rv-cards">
    <article class="rv-card">
      <span class="rv-icon">{% include relova-icon.html name="tab.plan" %}</span>
      <h3>A move plan for your state</h3>
      <p>Tell Relova where you're moving from and to, whether you rent, and how you're moving. Your plan only includes the tasks that apply. If the date changes, the tasks move with it. If you start late, earlier tasks are spread over the days left rather than showing as overdue.</p>
    </article>
    <article class="rv-card">
      <span class="rv-icon">{% include relova-icon.html name="tab.address" %}</span>
      <h3>Address Hub</h3>
      <p>More than 25 organisations to update, each with why it matters and how to do it. Where the law gives you a set number of days after you move, Relova shows the deadline and reminds you the day before. It also says which services myGov updates, and which it doesn't.</p>
    </article>
    <article class="rv-card">
      <span class="rv-icon">{% include relova-icon.html name="feat.letters" %}</span>
      <h3>Letters</h3>
      <p>Drafts of a notice to vacate, a reply to bond deductions, a forwarding address letter and a letter withdrawing consent to connection-service calls. The notice works out the date from your state's notice period. Edit any letter and send it yourself.</p>
    </article>
    <article class="rv-card">
      <span class="rv-icon">{% include relova-icon.html name="tab.budget" %}</span>
      <h3>Budget</h3>
      <p>Costs by category, quotes and receipts, and who owes whom. Work out what paying two rents will cost, and in NSW, the break fee for ending a fixed term early. Export to CSV.</p>
    </article>
    <article class="rv-card">
      <span class="rv-icon">{% include relova-icon.html name="tab.boxes" %}</span>
      <h3>Boxes with QR labels</h3>
      <p>Number each box, note the room it's going to and what's inside, then search for an item. Each label has a QR code: scan it with your iPhone's camera and Relova opens that box. Printable label sheets come with Plus.</p>
    </article>
    <article class="rv-card">
      <span class="rv-icon">{% include relova-icon.html name="cat.family" %}</span>
      <h3>Household</h3>
      <p>Add the people moving with you, assign them tasks, and split costs and the new rent, all on one iPhone. Relova only sees the contacts you choose.</p>
    </article>
  </div>
</section>

<section class="rv-band" id="privacy">
  <div class="rv-intro">
    <h2>No account. No referral fees.</h2>
    <p>Many free moving services are paid by energy retailers and agents for each customer they sign up. Relova isn't paid by anyone except you.</p>
  </div>
  <ul class="rv-pillars">
    <li><strong>No account</strong><span>No sign-in, analytics, advertising or tracking.</span></li>
    <li><strong>Kept on your iPhone</strong><span>Your move, photos, documents and household are stored on your iPhone. Relova has no servers, so nothing is sent to us.</span></li>
    <li><strong>No referral fees</strong><span>Relova earns nothing from retailers, connection services or removalists, and never sells or shares your details.</span></li>
  </ul>
  <p class="rv-band-foot">Details, including the outside services a few features use, are in the <a href="/relova/privacy/">privacy policy</a>.</p>
</section>

<section class="rv-section" id="plus">
  <div class="rv-intro">
    <h2>Free to plan. Pay once for the paperwork.</h2>
    <p>Relova Plus is a one-time in-app purchase through Apple. There's no subscription.</p>
  </div>
  <div class="rv-plans">
    <article class="rv-card">
      <h3>Relova</h3>
      <p>Free.</p>
      <ul class="rv-points">
        <li>{% include relova-icon.html name="act.check" %}Your move plan, reminders and moving-day view</li>
        <li>{% include relova-icon.html name="act.check" %}Address Hub, letters and the bond timeline</li>
        <li>{% include relova-icon.html name="act.check" %}Room-by-room records, meters and keys, and your comments on the agent's report as a PDF</li>
        <li>{% include relova-icon.html name="act.check" %}Budget, boxes and household</li>
      </ul>
    </article>
    <article class="rv-card">
      <h3>Relova Plus</h3>
      <p>Pay once and keep it for this move and every one after.</p>
      <ul class="rv-points">
        <li>{% include relova-icon.html name="act.check" %}Evidence pack PDFs for your entry and exit reports</li>
        <li>{% include relova-icon.html name="act.check" %}A full move summary PDF with receipts</li>
        <li>{% include relova-icon.html name="act.check" %}Printable box labels</li>
      </ul>
    </article>
  </div>
</section>

<div class="rv-closing">
  <section class="rv-panel">
    <h2>Help</h2>
    <p>Your data, backups and Relova Plus are covered in <a href="/relova/support/">Relova Support</a>. Or email <a href="mailto:{{ site.data.relova.support_email }}">{{ site.data.relova.support_email }}</a>.</p>
  </section>
  <section class="rv-panel">
    <h2>Not legal advice</h2>
    <p>Relova's guides and letters are general information based on official government sources. See the <a href="/relova/terms/">terms of use</a>.</p>
  </section>
</div>

<p class="rv-credits">Relova is made in Australia by Bakari Mustafa. <a href="/relova/press/">Press kit</a></p>

</div>
