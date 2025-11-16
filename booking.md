---
title: Work With Me
layout: page
excerpt: Book me for speaking engagements, mentorship, or explore partnership opportunities.
comments: false
description: Connect with Bakari Mustafa for speaking engagements, mentorship sessions, or business partnerships.
image: "/uploads/bakari_mustafa.jpg"
---

Let's work together! Whether you're looking for a speaker, mentor, or partner, I'd love to hear from you.

<div class="booking-options">
  <div class="booking-tabs">
    <button class="booking-tab active" data-form="speaking">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
      </svg>
      Speaking
    </button>
    <button class="booking-tab" data-form="mentorship">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      Mentorship
    </button>
    <button class="booking-tab" data-form="partnership">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
      </svg>
      Partnership
    </button>
  </div>

  <!-- Speaking Form -->
  <form name="speaking" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" class="booking-form active" id="speaking-form">
    <p style="display:none;">
      <label>Don't fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <input type="hidden" name="form-name" value="speaking" />
    <input type="hidden" name="form-type" value="Speaking Inquiry" />

    <div class="form-intro">
      <h3>Speaking Engagements</h3>
      <p>I speak on entrepreneurship, African-Australian perspectives, technology, and empowering youth. Perfect for conferences, corporate events, schools, and community gatherings.</p>
    </div>

    <div class="form-group">
      <label for="speaking-name">Name <span class="required">*</span></label>
      <input type="text" name="name" id="speaking-name" required placeholder="Your name">
    </div>

    <div class="form-group">
      <label for="speaking-email">Email <span class="required">*</span></label>
      <input type="email" name="email" id="speaking-email" required placeholder="your@email.com">
    </div>

    <div class="form-group">
      <label for="organization">Organization <span class="required">*</span></label>
      <input type="text" name="organization" id="organization" required placeholder="Company, school, or event name">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="event-date">Preferred Date</label>
        <input type="date" name="event-date" id="event-date">
      </div>

      <div class="form-group">
        <label for="event-type">Event Type <span class="required">*</span></label>
        <select name="event-type" id="event-type" required>
          <option value="">Select type...</option>
          <option value="conference">Conference</option>
          <option value="corporate">Corporate Event</option>
          <option value="school">School/University</option>
          <option value="community">Community Event</option>
          <option value="virtual">Virtual Event</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="audience-size">Expected Audience Size</label>
      <input type="text" name="audience-size" id="audience-size" placeholder="e.g., 50-100 people">
    </div>

    <div class="form-group">
      <label for="topic">Preferred Topics <span class="required">*</span></label>
      <textarea name="topic" id="topic" rows="3" required placeholder="What would you like me to speak about?"></textarea>
    </div>

    <div class="form-group">
      <label for="speaking-details">Additional Details</label>
      <textarea name="details" id="speaking-details" rows="4" placeholder="Event details, budget, travel requirements, etc."></textarea>
    </div>

    <button type="submit" class="form-submit">Submit Speaking Inquiry</button>
  </form>

  <!-- Mentorship Form -->
  <form name="mentorship" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" class="booking-form" id="mentorship-form">
    <p style="display:none;">
      <label>Don't fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <input type="hidden" name="form-name" value="mentorship" />
    <input type="hidden" name="form-type" value="Mentorship Application" />

    <div class="form-intro">
      <h3>Mentorship Application</h3>
      <p>I mentor aspiring entrepreneurs, students, and professionals looking to develop their entrepreneurial skills and build impactful ventures.</p>
    </div>

    <div class="form-group">
      <label for="mentorship-name">Name <span class="required">*</span></label>
      <input type="text" name="name" id="mentorship-name" required placeholder="Your name">
    </div>

    <div class="form-group">
      <label for="mentorship-email">Email <span class="required">*</span></label>
      <input type="email" name="email" id="mentorship-email" required placeholder="your@email.com">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="age">Age Range</label>
        <select name="age" id="age">
          <option value="">Select range...</option>
          <option value="under-18">Under 18</option>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45+">45+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="current-status">Current Status</label>
        <select name="current-status" id="current-status">
          <option value="">Select status...</option>
          <option value="student">Student</option>
          <option value="employed">Employed</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="job-seeker">Job Seeker</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="background">Your Background <span class="required">*</span></label>
      <textarea name="background" id="background" rows="4" required placeholder="Tell me about yourself, your education, and current situation..."></textarea>
    </div>

    <div class="form-group">
      <label for="goals">Your Goals <span class="required">*</span></label>
      <textarea name="goals" id="goals" rows="4" required placeholder="What are you hoping to achieve? What specific areas do you need help with?"></textarea>
    </div>

    <div class="form-group">
      <label for="commitment">Time Commitment</label>
      <select name="commitment" id="commitment">
        <option value="">How often can you meet?</option>
        <option value="weekly">Weekly</option>
        <option value="biweekly">Bi-weekly</option>
        <option value="monthly">Monthly</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>

    <button type="submit" class="form-submit">Submit Mentorship Application</button>
  </form>

  <!-- Partnership Form -->
  <form name="partnership" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" class="booking-form" id="partnership-form">
    <p style="display:none;">
      <label>Don't fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <input type="hidden" name="form-name" value="partnership" />
    <input type="hidden" name="form-type" value="Partnership Opportunity" />

    <div class="form-intro">
      <h3>Partnership Opportunities</h3>
      <p>Let's explore collaboration opportunities, joint ventures, or strategic partnerships that create mutual value.</p>
    </div>

    <div class="form-group">
      <label for="partnership-name">Name <span class="required">*</span></label>
      <input type="text" name="name" id="partnership-name" required placeholder="Your name">
    </div>

    <div class="form-group">
      <label for="partnership-email">Email <span class="required">*</span></label>
      <input type="email" name="email" id="partnership-email" required placeholder="your@email.com">
    </div>

    <div class="form-group">
      <label for="company">Company/Organization <span class="required">*</span></label>
      <input type="text" name="company" id="company" required placeholder="Your organization">
    </div>

    <div class="form-group">
      <label for="website">Website</label>
      <input type="url" name="website" id="website" placeholder="https://yourcompany.com">
    </div>

    <div class="form-group">
      <label for="partnership-type">Partnership Type <span class="required">*</span></label>
      <select name="partnership-type" id="partnership-type" required>
        <option value="">Select type...</option>
        <option value="collaboration">Content Collaboration</option>
        <option value="joint-venture">Joint Venture</option>
        <option value="sponsorship">Sponsorship</option>
        <option value="advisory">Advisory Role</option>
        <option value="investment">Investment Opportunity</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label for="proposal">Partnership Proposal <span class="required">*</span></label>
      <textarea name="proposal" id="proposal" rows="6" required placeholder="Describe your partnership idea, what value it brings, and how we can work together..."></textarea>
    </div>

    <div class="form-group">
      <label for="timeline">Preferred Timeline</label>
      <input type="text" name="timeline" id="timeline" placeholder="When would you like to start?">
    </div>

    <button type="submit" class="form-submit">Submit Partnership Proposal</button>
  </form>
</div>

<div class="contact-info-section">
  <h2>Other Ways to Reach Me</h2>
  <p>For general inquiries, feel free to contact me via <a href="/contact/">the contact form</a> or reach out directly:</p>
  <ul class="contact-methods">
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      Email: <a href="mailto:bakari@bakarimustafa.com">bakari@bakarimustafa.com</a>
    </li>
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
      LinkedIn: <a href="https://www.linkedin.com/in/realbakari/" target="_blank" rel="noopener">linkedin.com/in/realbakari</a>
    </li>
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
      Twitter: <a href="https://twitter.com/realbakari" target="_blank" rel="noopener">@realbakari</a>
    </li>
  </ul>
</div>

<script src="/assets/js/booking-forms.js"></script>
