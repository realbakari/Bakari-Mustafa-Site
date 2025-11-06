---
layout: page
title: Unsubscribe from Newsletter
permalink: /newsletter-unsubscribe
---

<div class="newsletter-unsubscribe-page">
  <div class="unsubscribe-container">
    <div class="unsubscribe-icon" id="unsubscribe-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </div>

    <h1 id="unsubscribe-title">Unsubscribing...</h1>
    <p id="unsubscribe-message" class="unsubscribe-message">Please wait while we process your request.</p>

    <div id="unsubscribe-actions" class="unsubscribe-actions" style="display: none;">
      <a href="/" class="btn-primary">Return to Homepage</a>
      <a href="/posts" class="btn-secondary">Browse Posts</a>
    </div>

    <div id="resubscribe-section" class="resubscribe-section" style="display: none;">
      <p>Changed your mind?</p>
      <form id="resubscribe-form">
        <input type="hidden" id="resubscribe-email" />
        <button type="submit" class="btn-resubscribe">Resubscribe</button>
      </form>
      <div id="resubscribe-message"></div>
    </div>
  </div>
</div>

<script>
  let userEmail = '';

  // Wait for newsletter.js to be ready
  function waitForNewsletterJS() {
    return new Promise((resolve) => {
      // Check if unsubscribeFromNewsletter function is available
      if (typeof window.unsubscribeFromNewsletter === 'function') {
        resolve();
      } else {
        // Wait a bit and try again
        setTimeout(() => waitForNewsletterJS().then(resolve), 100);
      }
    });
  }

  // Auto-unsubscribe on page load
  document.addEventListener('DOMContentLoaded', async function() {
    // Wait for newsletter.js to load
    await waitForNewsletterJS();
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const iconDiv = document.getElementById('unsubscribe-icon');
    const titleEl = document.getElementById('unsubscribe-title');
    const messageEl = document.getElementById('unsubscribe-message');
    const actionsDiv = document.getElementById('unsubscribe-actions');
    const resubscribeSection = document.getElementById('resubscribe-section');

    if (!token) {
      iconDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
      iconDiv.style.color = '#EF4444';
      titleEl.textContent = 'Invalid Link';
      messageEl.textContent = 'This unsubscribe link is invalid or has expired.';
      actionsDiv.style.display = 'flex';
      return;
    }

    // Unsubscribe
    try {
      const result = await unsubscribeFromNewsletter(token);

      if (result.success) {
        userEmail = result.email;

        iconDiv.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
        iconDiv.style.color = '#10B981';
        titleEl.textContent = result.alreadyUnsubscribed ? 'Already Unsubscribed' : 'Successfully Unsubscribed';

        if (result.alreadyUnsubscribed) {
          messageEl.textContent = result.message;
        } else {
          messageEl.innerHTML = `
            ${result.message}<br><br>
            You will no longer receive newsletter emails from us.
          `;
        }

        // Show resubscribe option
        if (userEmail) {
          document.getElementById('resubscribe-email').value = userEmail;
          resubscribeSection.style.display = 'block';
        }
      } else {
        iconDiv.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;
        iconDiv.style.color = '#EF4444';
        titleEl.textContent = 'Unsubscribe Failed';
        messageEl.textContent = result.message;
      }
    } catch (error) {
      iconDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      `;
      iconDiv.style.color = '#EF4444';
      titleEl.textContent = 'Error';
      messageEl.textContent = 'An error occurred while unsubscribing.';
    }

    // Show actions
    actionsDiv.style.display = 'flex';
  });

  // Handle resubscribe
  const resubscribeForm = document.getElementById('resubscribe-form');
  if (resubscribeForm) {
    resubscribeForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const email = document.getElementById('resubscribe-email').value;
      const messageDiv = document.getElementById('resubscribe-message');
      const submitBtn = resubscribeForm.querySelector('button');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Resubscribing...';

      const result = await subscribeToNewsletter(email, 'unsubscribe_page');

      messageDiv.textContent = result.message;
      messageDiv.className = `resubscribe-message ${result.success ? 'success' : 'error'}`;

      if (result.success) {
        submitBtn.textContent = 'Resubscribed!';
        setTimeout(() => {
          document.getElementById('resubscribe-section').style.display = 'none';
        }, 3000);
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Resubscribe';
      }
    });
  }
</script>

<style>
.newsletter-unsubscribe-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.unsubscribe-container {
  max-width: 600px;
  text-align: center;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

body[data-theme="dark"] .unsubscribe-container {
  background: rgba(255, 255, 255, 0.05);
}

.unsubscribe-icon {
  margin: 0 auto 2rem;
  color: #3B82F6;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

#unsubscribe-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1F2937;
}

body[data-theme="dark"] #unsubscribe-title {
  color: #F9FAFB;
}

.unsubscribe-message {
  font-size: 1.125rem;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

body[data-theme="dark"] .unsubscribe-message {
  color: #D1D5DB;
}

.unsubscribe-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.resubscribe-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E5E7EB;
}

body[data-theme="dark"] .resubscribe-section {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.resubscribe-section p {
  color: #6B7280;
  margin-bottom: 1rem;
}

body[data-theme="dark"] .resubscribe-section p {
  color: #D1D5DB;
}

.btn-resubscribe {
  padding: 0.75rem 1.5rem;
  background: #10B981;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-resubscribe:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-resubscribe:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.resubscribe-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
}

.resubscribe-message.success {
  background: #D1FAE5;
  color: #065F46;
}

body[data-theme="dark"] .resubscribe-message.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
}

.resubscribe-message.error {
  background: #FEE2E2;
  color: #991B1B;
}

body[data-theme="dark"] .resubscribe-message.error {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary {
  background: #3B82F6;
  color: white;
}

.btn-primary:hover {
  background: #2563EB;
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: #3B82F6;
  border: 2px solid #3B82F6;
}

body[data-theme="dark"] .btn-secondary {
  color: #60A5FA;
  border-color: #60A5FA;
}

.btn-secondary:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .unsubscribe-container {
    padding: 2rem 1.5rem;
  }

  #unsubscribe-title {
    font-size: 1.5rem;
  }

  .unsubscribe-message {
    font-size: 1rem;
  }

  .unsubscribe-actions {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>
