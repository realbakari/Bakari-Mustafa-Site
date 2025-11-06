---
layout: page
title: Admin Login
permalink: /newsletter-admin-login
---

<div class="admin-login-page">
  <div class="login-container">
    <h2>Admin Login</h2>

    <form id="login-form" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="admin@example.com" required>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required>
      </div>

      <button type="submit" class="btn-login" id="login-btn">
        Sign In
      </button>

      <div id="login-message" class="login-message"></div>
    </form>

    <a href="/" class="back-link">← Back to site</a>
  </div>
</div>

<script>
  // Initialize Supabase client
  let supabase = null;

  // Check if already logged in
  document.addEventListener('DOMContentLoaded', async function() {
    // Create Supabase client
    try {
      supabase = window.supabase.createClient(
        window.SUPABASE_URL,
        window.SUPABASE_ANON_KEY
      );
      console.log('[Admin Login] Supabase client created successfully');
    } catch (error) {
      console.error('[Admin Login] Failed to create Supabase client:', error);
      document.getElementById('login-message').textContent = 'Failed to initialize. Please refresh the page.';
      document.getElementById('login-message').className = 'login-message error';
      return;
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session check error:', error);
        return;
      }

      if (session) {
        // Already logged in, redirect to dashboard
        console.log('Already logged in, redirecting...');
        window.location.href = '/newsletter-dashboard';
      }
    } catch (err) {
      console.error('Failed to check session:', err);
    }
  });

  // Handle login
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const messageDiv = document.getElementById('login-message');

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!email || !password) {
      messageDiv.textContent = 'Please enter both email and password.';
      messageDiv.className = 'login-message error';
      return;
    }

    // Clear previous messages
    messageDiv.textContent = '';
    messageDiv.className = 'login-message';

    // Disable form
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';

    try {
      console.log('Attempting login for:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful:', data);

      // Success - redirect to dashboard
      messageDiv.textContent = 'Login successful! Redirecting...';
      messageDiv.className = 'login-message success';

      setTimeout(() => {
        window.location.href = '/newsletter-dashboard';
      }, 800);

    } catch (error) {
      console.error('Login failed:', error);

      let errorMessage = 'Login failed. Please check your credentials.';

      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please confirm your email address first.';
        } else {
          errorMessage = error.message;
        }
      }

      messageDiv.textContent = errorMessage;
      messageDiv.className = 'login-message error';

      // Re-enable form
      loginBtn.disabled = false;
      loginBtn.textContent = 'Sign In';
    }
  });
</script>

<style>
.admin-login-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-container {
  max-width: 400px;
  width: 100%;
  padding: 2rem 1.5rem;
}

.login-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

body[data-theme="dark"] .form-group input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #F9FAFB;
}

.form-group input:focus {
  outline: none;
  border-color: #003FFF;
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  background: #003FFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
}

.btn-login:hover {
  background: #0035db;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
}

.login-message.success {
  background: #d1fae5;
  color: #065f46;
}

body[data-theme="dark"] .login-message.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
}

.login-message.error {
  background: #fee2e2;
  color: #991b1b;
}

body[data-theme="dark"] .login-message.error {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
}

.back-link {
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.875rem;
}

.back-link:hover {
  color: #003FFF;
}

body[data-theme="dark"] .back-link {
  color: #999;
}
</style>
