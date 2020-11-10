---
title: Contact
layout: ''
excerpt: |+
  For all inquiries please use the form below. I may not able to respond to every message, but for relevant inquiries, I try to respond within a few business days.


comments: false

---
For all inquiries please use the form below. I may not able to respond to every message, but for relevant inquiries, I try to respond within a few business days.

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

<section class="l--mar-top-m l--grid-wide l--flex l--space-compact">
  <div class="l--space-compact l--flex-auto">
    <h1>Contact</h1>

    <p class="text-xl max-w-2xl">For all inquiries please use the form below. I may not able to respond to every message, but for relevant inquiries, I try to respond within a few business days.</p>

  <!-- Form -->
  <div class="container">
	<div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well well-sm">
          <form class="form-horizontal"  id="contact-form" method="POST" data-netlify="true" action="/thank-you" class="mt-10 max-w-lg">
          <fieldset>    
            <!-- Name input-->
            <div class="form-group">
              <label class="col-md-3 control-label" for="name">Name</label>
              <div class="col-md-9">
                <input id="name" name="name" type="text" placeholder="Fullname" class="form-control" required>
              </div>
            </div>
    
            <!-- Email input-->
            <div class="form-group">
              <label class="col-md-3 control-label" for="email">E-mail</label>
              <div class="col-md-9">
                <input id="email" name="email" type="text" placeholder="Email address" class="form-control" required>
              </div>
            </div>
    
            <!-- Message body -->
            <div class="form-group">
              <label class="col-md-3 control-label" for="message">Message</label>
              <div class="col-md-9">
                <textarea class="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5" required></textarea>
              </div>
            </div>
    
            <!-- Form actions -->
            <div class="form-group">
              <div class="col-md-12">
                <button type="submit" class="btn btn-success btn-send">Send Message</button>
              </div>
            </div>
          </fieldset>
          </form>
        </div>
      </div>
	</div>
</div>
<!-- Form End -->

  </div>
</section>
