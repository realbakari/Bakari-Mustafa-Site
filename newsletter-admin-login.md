---
layout: page
title: Newsletter Admin Login
permalink: /newsletter-admin-login
---

<div class="admin-login-page">
  <div class="login-container">
    <div class="login-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      <h1>Newsletter Admin</h1>
      <p>Sign in to access the subscriber dashboard</p>
    </div>

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

    <div class="login-footer">
      <p>Don't have an account? Contact the site administrator.</p>
      <a href="/">← Back to Homepage</a>
    </div>
  </div>
</div>

<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  window.SUPABASE_URL = "https://fmyukpxfweibodnuaifr.supabase.co";
  window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTgxMzUsImV4cCI6MjA0OTg3NDEzNX0.TUrP9YKKCl7qw6B6A0RqP1lhFGa2Rx7IDajMbqZR_bU";

  // Initialize global Supabase client
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );
  var supabase = window.supabaseClient;
</script>

<script>

  // Check if already logged in
  document.addEventListener('DOMContentLoaded', async function() {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      // Already logged in, redirect to dashboard
      window.location.href = '/newsletter-dashboard';
    }
  });

  // Handle login
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const messageDiv = document.getElementById('login-message');

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear previous messages
    messageDiv.textContent = '';
    messageDiv.className = 'login-message';

    // Disable form
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      // Success - redirect to dashboard
      messageDiv.textContent = 'Login successful! Redirecting...';
      messageDiv.className = 'login-message success';

      setTimeout(() => {
        window.location.href = '/newsletter-dashboard';
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);

      messageDiv.textContent = error.message || 'Login failed. Please check your credentials.';
      messageDiv.className = 'login-message error';

      // Re-enable form
      loginBtn.disabled = false;
      loginBtn.textContent = 'Sign In';
    }
  });
</script>

<style>
.admin-login-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-container {
  max-width: 420px;
  width: 100%;
  background: #fff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

body[data-theme="dark"] .login-container {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header svg {
  color: #003FFF;
  margin-bottom: 1rem;
}

body[data-theme="dark"] .login-header svg {
  color: #60A5FA;
}

.login-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #1F2937;
}

body[data-theme="dark"] .login-header h1 {
  color: #F9FAFB;
}

.login-header p {
  color: #6B7280;
  font-size: 0.95rem;
}

body[data-theme="dark"] .login-header p {
  color: #D1D5DB;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

body[data-theme="dark"] .form-group label {
  color: #F9FAFB;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

body[data-theme="dark"] .form-group input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #F9FAFB;
}

.form-group input:focus {
  outline: none;
  border-color: #003FFF;
  box-shadow: 0 0 0 3px rgba(0, 63, 255, 0.1);
}

body[data-theme="dark"] .form-group input:focus {
  border-color: #60A5FA;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  background: #003FFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-login:hover {
  background: #0035db;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 63, 255, 0.3);
}

.btn-login:active {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.login-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
}

.login-message.success {
  background: rgba(16, 185, 129, 0.1);
  color: #065F46;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

body[data-theme="dark"] .login-message.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
  border-color: rgba(16, 185, 129, 0.4);
}

.login-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: #991B1B;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

body[data-theme="dark"] .login-message.error {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #E5E7EB;
}

body[data-theme="dark"] .login-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.login-footer p {
  color: #6B7280;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

body[data-theme="dark"] .login-footer p {
  color: #D1D5DB;
}

.login-footer a {
  color: #003FFF;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

body[data-theme="dark"] .login-footer a {
  color: #60A5FA;
}

.login-footer a:hover {
  color: #0035db;
}

@media (max-width: 480px) {
  .login-container {
    padding: 2rem 1.5rem;
  }

  .login-header h1 {
    font-size: 1.5rem;
  }
}
</style>
