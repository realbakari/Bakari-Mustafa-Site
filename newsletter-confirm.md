---
layout: page
title: Confirm Your Subscription
permalink: /newsletter-confirm
---

<div class="newsletter-confirm-page">
  <div class="confirm-container">
    <div class="confirm-icon" id="confirm-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>

    <h1 id="confirm-title">Confirming Your Subscription...</h1>
    <p id="confirm-message" class="confirm-message">Please wait while we confirm your email address.</p>

    <div id="confirm-actions" class="confirm-actions" style="display: none;">
      <a href="/" class="btn-primary">Return to Homepage</a>
      <a href="/posts" class="btn-secondary">Browse Posts</a>
    </div>
  </div>
</div>

<script>
  /* Wait for newsletter.js to be ready */
  function waitForNewsletterJS() {
    return new Promise((resolve) => {
      /* Check if confirmSubscription function is available */
      if (typeof window.confirmSubscription === 'function') {
        resolve();
      } else {
        /* Wait a bit and try again */
        setTimeout(() => waitForNewsletterJS().then(resolve), 100);
      }
    });
  }

  /* Auto-confirm on page load */
  document.addEventListener('DOMContentLoaded', async function() {
    /* Wait for newsletter.js to load */
    await waitForNewsletterJS();

    /* Get token from URL */
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const iconDiv = document.getElementById('confirm-icon');
    const titleEl = document.getElementById('confirm-title');
    const messageEl = document.getElementById('confirm-message');
    const actionsDiv = document.getElementById('confirm-actions');

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
      messageEl.textContent = 'This confirmation link is invalid or has expired.';
      actionsDiv.style.display = 'flex';
      return;
    }

    /* Confirm subscription */
    try {
      const result = await confirmSubscription(token);

      if (result.success) {
        iconDiv.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
        iconDiv.style.color = '#10B981';
        titleEl.textContent = result.alreadyConfirmed ? 'Already Confirmed' : 'Subscription Confirmed!';
        messageEl.textContent = result.message;

        /* Add welcome message */
        if (!result.alreadyConfirmed) {
          messageEl.innerHTML = `
            ${result.message}<br><br>
            <strong>You will now receive new posts, reading notes, and project updates.</strong>
          `;
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
        titleEl.textContent = 'Confirmation Failed';
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
      messageEl.textContent = 'An error occurred while confirming your subscription.';
    }

    /* Show actions */
    actionsDiv.style.display = 'flex';
  });
</script>

<style>
.newsletter-confirm-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.confirm-container {
  max-width: 600px;
  text-align: center;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

body[data-theme="dark"] .confirm-container {
  background: rgba(255, 255, 255, 0.05);
}

.confirm-icon {
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

#confirm-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1F2937;
}

body[data-theme="dark"] #confirm-title {
  color: #F9FAFB;
}

.confirm-message {
  font-size: 1.125rem;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

body[data-theme="dark"] .confirm-message {
  color: #D1D5DB;
}

.confirm-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
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
  .confirm-container {
    padding: 2rem 1.5rem;
  }

  #confirm-title {
    font-size: 1.5rem;
  }

  .confirm-message {
    font-size: 1rem;
  }

  .confirm-actions {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>
