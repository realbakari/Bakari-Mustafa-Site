---
title: Contact
permalink: "/contact/"
layout: page
hide_title: true
excerpt: Get in touch about projects, speaking, mentorship, media, or collaborations.
comments: false
description: Contact Bakari Mustafa for questions, collaborations, speaking, mentorship, or media inquiries.
image: "/uploads/volodymyr-hryshchenko-v5vqwc9gyeu-unsplash.jpg"
---
{::nomarkdown}
<div class="page-header">
  <h1>Contact</h1>
  <p class="page-subtitle">For questions, collaborations, speaking, mentorship, or media inquiries, use the form below or email me directly.</p>
</div>

<section class="contact-section" aria-labelledby="contact-form-heading">
  <h2 id="contact-form-heading" class="visually-hidden">Send a message</h2>
  <form
    name="contact"
    method="POST"
    action="/thank-you/"
    accept-charset="UTF-8"
    enctype="application/x-www-form-urlencoded"
    data-netlify="true"
    netlify-honeypot="bot-field"
    aria-labelledby="contact-form-heading"
    class="contact-form site-form"
  >
    <p class="visually-hidden" aria-hidden="true">
      <label>Leave this field blank: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
    </p>
    <input type="hidden" name="form-name" value="contact" />

    <div class="form-group">
      <label for="contact-name">Name <span class="required" aria-hidden="true">*</span></label>
      <input type="text" name="name" id="contact-name" autocomplete="name" enterkeyhint="next" required placeholder="Your name">
    </div>

    <div class="form-group">
      <label for="contact-email">Email <span class="required" aria-hidden="true">*</span></label>
      <input type="email" name="email" id="contact-email" autocomplete="email" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="next" required placeholder="you@example.com">
    </div>

    <fieldset class="form-fieldset">
      <legend>Topic</legend>
      <div class="form-radio-row">
        <label class="form-radio-label"><input type="radio" name="topic" value="general" checked> General</label>
        <label class="form-radio-label"><input type="radio" name="topic" value="speaking"> Speaking</label>
        <label class="form-radio-label"><input type="radio" name="topic" value="mentorship"> Mentorship</label>
        <label class="form-radio-label"><input type="radio" name="topic" value="collaboration"> Collaboration</label>
        <label class="form-radio-label"><input type="radio" name="topic" value="media"> Media</label>
      </div>
    </fieldset>

    <div class="form-group">
      <label for="contact-subject">Subject <span class="required" aria-hidden="true">*</span></label>
      <input type="text" name="subject" id="contact-subject" enterkeyhint="next" required placeholder="What is this about?">
    </div>

    <div class="form-group">
      <label for="contact-message">Message <span class="required" aria-hidden="true">*</span></label>
      <textarea name="message" id="contact-message" rows="6" required aria-describedby="contact-message-help" placeholder="Write your message"></textarea>
      <span id="contact-message-help" class="form-hint">No character limit—for attachments or long proposals, email me directly below.</span>
    </div>

    <button type="submit" class="form-submit">Send message</button>
  </form>
</section>

<section class="contact-details" aria-labelledby="direct-contact-heading">
  <h2 id="direct-contact-heading">Direct contact</h2>
  <ul class="ledger-list">
    <li class="ledger-row">
      <span class="ledger-key">General</span>
      <span class="ledger-val"><a href="mailto:bakari@bakarimustafa.com">bakari@bakarimustafa.com</a></span>
    </li>
    <li class="ledger-row">
      <span class="ledger-key">Media</span>
      <span class="ledger-val"><a href="mailto:media@bakarimustafa.com">media@bakarimustafa.com</a> · <a href="/press-kit/">Press kit</a></span>
    </li>
    <li class="ledger-row">
      <span class="ledger-key">Mail</span>
      <span class="ledger-val">Parcel Collect 10191 10633, Shop 3, 69 Ann Street, Brisbane QLD 4003</span>
    </li>
    <li class="ledger-row">
      <span class="ledger-key">Elsewhere</span>
      <span class="ledger-val">
        <a href="https://www.linkedin.com/in/realbakari/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ·
        <a href="https://twitter.com/realbakari" target="_blank" rel="noopener noreferrer">Twitter</a> ·
        <a href="https://github.com/realbakari" target="_blank" rel="noopener noreferrer">GitHub</a> ·
        <a href="https://www.instagram.com/realbakari/" target="_blank" rel="noopener noreferrer">Instagram</a> ·
        <a href="https://www.facebook.com/therealbakari" target="_blank" rel="noopener noreferrer">Facebook</a>
      </span>
    </li>
  </ul>
</section>
{:/nomarkdown}
