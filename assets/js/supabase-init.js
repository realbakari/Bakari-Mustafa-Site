/**
 * Supabase Initialization Script
 * Sets up configuration and loads dependent scripts after Supabase library is ready
 */

// Supabase configuration
// Note: The anon key is safe to expose publicly - it's meant for client-side use
// Row Level Security policies in Supabase control actual permissions
window.SUPABASE_URL = "https://fmyukpxfweibodnuaifr.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteXVrcHhmd2VpYm9kbnVhaWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyOTgxMzUsImV4cCI6MjA0OTg3NDEzNX0.TUrP9YKKCl7qw6B6A0RqP1lhFGa2Rx7IDajMbqZR_bU";

// Load dependent scripts only after Supabase library is ready
window.loadSupabaseDependentScripts = function() {
  console.log('Supabase library loaded, loading dependent scripts...');

  // Create and load page-views.js
  var script1 = document.createElement('script');
  script1.src = '/assets/js/page-views.js';
  script1.onerror = function() {
    console.error('Failed to load page-views.js - check if file exists at:', script1.src);
  };
  script1.onload = function() {
    console.log('page-views.js loaded successfully');
  };
  document.body.appendChild(script1);

  // Create and load newsletter.js
  var script2 = document.createElement('script');
  script2.src = '/assets/js/newsletter.js';
  script2.onerror = function() {
    console.error('Failed to load newsletter.js - check if file exists at:', script2.src);
  };
  script2.onload = function() {
    console.log('newsletter.js loaded successfully');
  };
  document.body.appendChild(script2);
};
