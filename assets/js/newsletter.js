/**
 * Newsletter Subscription System
 * Handles email subscriptions with double opt-in
 */

(function() {
  'use strict';

  // Supabase client reference (will be set when ready)
  var supabase = null;

/**
 * Generate a random token for confirmation/unsubscribe
 */
function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Subscribe to newsletter
 */
async function subscribeToNewsletter(email, source = 'footer') {
  try {
    // Check if Supabase is initialized
    if (!supabase) {
      return {
        success: false,
        message: 'Newsletter subscription is temporarily unavailable. Please try again later.'
      };
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, status')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === 'confirmed') {
        return {
          success: false,
          message: 'You are already subscribed to our newsletter!'
        };
      } else if (existing.status === 'pending') {
        return {
          success: false,
          message: 'Please check your email to confirm your subscription.'
        };
      } else if (existing.status === 'unsubscribed') {
        // Resubscribe
        const confirmToken = generateToken();
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            status: 'pending',
            confirmation_token: confirmToken,
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null
          })
          .eq('email', email.toLowerCase());

        if (updateError) throw updateError;

        return {
          success: true,
          message: 'Welcome back! Please check your email to confirm your subscription.',
          confirmToken: confirmToken
        };
      }
    }

    // Create new subscription
    const confirmToken = generateToken();
    const unsubscribeToken = generateToken();

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        status: 'pending',
        confirmation_token: confirmToken,
        unsubscribe_token: unsubscribeToken,
        source: source,
        referrer: window.location.href,
        user_agent: navigator.userAgent
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Almost there! Please check your email to confirm your subscription.',
      confirmToken: confirmToken,
      unsubscribeToken: unsubscribeToken
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Oops! Something went wrong. Please try again later.'
    };
  }
}

/**
 * Confirm email subscription
 */
async function confirmSubscription(token) {
  try {
    // Check if Supabase is initialized
    if (!supabase) {
      return {
        success: false,
        message: 'Service temporarily unavailable. Please try again later.'
      };
    }

    // Find subscriber by confirmation token
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (findError || !subscriber) {
      return {
        success: false,
        message: 'Invalid or expired confirmation link.'
      };
    }

    if (subscriber.status === 'confirmed') {
      return {
        success: true,
        message: 'Your email is already confirmed. Thank you for subscribing!',
        alreadyConfirmed: true
      };
    }

    // Update status to confirmed
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString()
      })
      .eq('confirmation_token', token);

    if (updateError) throw updateError;

    return {
      success: true,
      message: 'Thank you! Your subscription has been confirmed.',
      email: subscriber.email
    };

  } catch (error) {
    console.error('Confirmation error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.'
    };
  }
}

/**
 * Unsubscribe from newsletter
 */
async function unsubscribeFromNewsletter(token) {
  try {
    // Check if Supabase is initialized
    if (!supabase) {
      return {
        success: false,
        message: 'Service temporarily unavailable. Please try again later.'
      };
    }

    // Find subscriber by unsubscribe token
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('unsubscribe_token', token)
      .single();

    if (findError || !subscriber) {
      return {
        success: false,
        message: 'Invalid unsubscribe link.'
      };
    }

    if (subscriber.status === 'unsubscribed') {
      return {
        success: true,
        message: 'You have already unsubscribed from our newsletter.',
        alreadyUnsubscribed: true
      };
    }

    // Update status to unsubscribed
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('unsubscribe_token', token);

    if (updateError) throw updateError;

    return {
      success: true,
      message: 'You have been unsubscribed. We\'re sorry to see you go!',
      email: subscriber.email
    };

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.'
    };
  }
}

/**
 * Initialize newsletter form on page load
 */
function initNewsletterForm() {
  console.log('[Newsletter] initNewsletterForm called');
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) {
    console.log('[Newsletter] No newsletter form found on this page');
    return;
  }
  console.log('[Newsletter] Newsletter form found, attaching handlers');

  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const submitButton = newsletterForm.querySelector('button[type="submit"]');
  const messageDiv = document.getElementById('newsletter-message');

  newsletterForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const source = newsletterForm.dataset.source || 'footer';

    // Disable form during submission
    emailInput.disabled = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    // Clear previous messages
    if (messageDiv) {
      messageDiv.textContent = '';
      messageDiv.className = 'newsletter-message';
    }

    // Subscribe
    const result = await subscribeToNewsletter(email, source);

    // Show message
    if (messageDiv) {
      messageDiv.textContent = result.message;
      messageDiv.className = `newsletter-message ${result.success ? 'success' : 'error'}`;
    } else {
      alert(result.message);
    }

    // Reset form if successful
    if (result.success) {
      emailInput.value = '';

      // Log confirmation URL to console (in production, this would be sent via email)
      if (result.confirmToken) {
        console.log('Confirmation URL:', window.location.origin + '/newsletter-confirm?token=' + result.confirmToken);
        console.log('Unsubscribe URL:', window.location.origin + '/newsletter-unsubscribe?token=' + result.unsubscribeToken);
        console.log('⚠️ In production, these URLs would be sent via email.');
      }
    }

    // Re-enable form
    emailInput.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = 'Subscribe';
  });
}

// Initialize everything
(function initializeNewsletter() {
  // Initialize Supabase client (library loaded synchronously before this script)
  try {
    supabase = window.supabase.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );
    console.log('[Newsletter] Supabase client created successfully');
  } catch (error) {
    console.error('[Newsletter] Failed to create Supabase client:', error);
    return;
  }

  // Initialize newsletter form
  // DOM is ready at this point (script is in footer after body content)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletterForm);
  } else {
    initNewsletterForm();
  }
})();

  // Expose public API for newsletter pages
  window.confirmSubscription = confirmSubscription;
  window.unsubscribeFromNewsletter = unsubscribeFromNewsletter;

})(); // End of newsletter.js IIFE
