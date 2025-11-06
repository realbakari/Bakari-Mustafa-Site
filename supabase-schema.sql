-- Supabase Schema for Page View Counter
-- Run this SQL in your Supabase SQL Editor
-- Dashboard: https://fmyukpxfweibodnuaifr.supabase.co

-- Create the page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_title TEXT,
  view_count INTEGER DEFAULT 0,
  unique_views INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_url)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(page_url);

-- Enable Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Allow public read access" ON page_views;
DROP POLICY IF EXISTS "Allow public insert" ON page_views;
DROP POLICY IF EXISTS "Allow public update" ON page_views;

-- Create policy to allow anyone to read view counts
CREATE POLICY "Allow public read access"
ON page_views FOR SELECT
TO public
USING (true);

-- Create policy to allow anyone to insert views
CREATE POLICY "Allow public insert"
ON page_views FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow anyone to update views
CREATE POLICY "Allow public update"
ON page_views FOR UPDATE
TO public
USING (true);

-- Create detailed page view logs table for analytics
CREATE TABLE IF NOT EXISTS page_view_logs (
  id BIGSERIAL PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_title TEXT,
  -- Referrer tracking
  referrer TEXT,
  referrer_domain TEXT,
  referrer_type TEXT, -- 'search', 'social', 'direct', 'internal', 'external'
  -- Device & Browser analytics
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser_name TEXT, -- 'Chrome', 'Firefox', 'Safari', etc.
  browser_version TEXT,
  os_name TEXT, -- 'Windows', 'macOS', 'iOS', 'Android', 'Linux'
  os_version TEXT,
  -- User agent for detailed analysis
  user_agent TEXT,
  -- Session tracking (privacy-friendly, no cookies)
  session_id TEXT,
  is_unique_view BOOLEAN DEFAULT false,
  -- Entry/Exit tracking
  is_entry_page BOOLEAN DEFAULT false,
  is_exit_page BOOLEAN DEFAULT false,
  -- Timestamps
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  viewed_date DATE DEFAULT CURRENT_DATE,
  viewed_hour INTEGER, -- 0-23 for hour of day analysis
  -- Location (optional, privacy-friendly city/country level)
  country_code TEXT,
  city TEXT
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_page_view_logs_url ON page_view_logs(page_url);
CREATE INDEX IF NOT EXISTS idx_page_view_logs_date ON page_view_logs(viewed_date);
CREATE INDEX IF NOT EXISTS idx_page_view_logs_referrer ON page_view_logs(referrer_domain);
CREATE INDEX IF NOT EXISTS idx_page_view_logs_device ON page_view_logs(device_type);
CREATE INDEX IF NOT EXISTS idx_page_view_logs_browser ON page_view_logs(browser_name);
CREATE INDEX IF NOT EXISTS idx_page_view_logs_session ON page_view_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_page_view_logs_entry ON page_view_logs(is_entry_page) WHERE is_entry_page = true;
CREATE INDEX IF NOT EXISTS idx_page_view_logs_exit ON page_view_logs(is_exit_page) WHERE is_exit_page = true;

-- Enable Row Level Security (RLS) for page_view_logs
ALTER TABLE page_view_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access logs" ON page_view_logs;
DROP POLICY IF EXISTS "Allow public insert logs" ON page_view_logs;
DROP POLICY IF EXISTS "Allow public update logs" ON page_view_logs;

-- Create policies for page_view_logs
CREATE POLICY "Allow public read access logs"
ON page_view_logs FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert logs"
ON page_view_logs FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update logs"
ON page_view_logs FOR UPDATE
TO public
USING (true);

-- Search queries tracking table
CREATE TABLE IF NOT EXISTS search_queries (
  id BIGSERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  session_id TEXT,
  searched_at TIMESTAMPTZ DEFAULT NOW(),
  searched_date DATE DEFAULT CURRENT_DATE
);

-- Create indexes for search queries
CREATE INDEX IF NOT EXISTS idx_search_queries_query ON search_queries(query);
CREATE INDEX IF NOT EXISTS idx_search_queries_date ON search_queries(searched_date);

-- Enable RLS for search_queries
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;

-- Policies for search_queries
DROP POLICY IF EXISTS "Allow public read search" ON search_queries;
DROP POLICY IF EXISTS "Allow public insert search" ON search_queries;

CREATE POLICY "Allow public read search"
ON search_queries FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert search"
ON search_queries FOR INSERT
TO public
WITH CHECK (true);

-- 404 errors tracking table
CREATE TABLE IF NOT EXISTS error_404_logs (
  id BIGSERIAL PRIMARY KEY,
  requested_url TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  occurred_date DATE DEFAULT CURRENT_DATE
);

-- Create indexes for 404 logs
CREATE INDEX IF NOT EXISTS idx_error_404_url ON error_404_logs(requested_url);
CREATE INDEX IF NOT EXISTS idx_error_404_date ON error_404_logs(occurred_date);

-- Enable RLS for error_404_logs
ALTER TABLE error_404_logs ENABLE ROW LEVEL SECURITY;

-- Policies for error_404_logs
DROP POLICY IF EXISTS "Allow public read errors" ON error_404_logs;
DROP POLICY IF EXISTS "Allow public insert errors" ON error_404_logs;

CREATE POLICY "Allow public read errors"
ON error_404_logs FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert errors"
ON error_404_logs FOR INSERT
TO public
WITH CHECK (true);

-- Active sessions tracking (for real-time analytics)
CREATE TABLE IF NOT EXISTS active_sessions (
  session_id TEXT PRIMARY KEY,
  current_page_url TEXT,
  current_page_title TEXT,
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  device_type TEXT,
  browser_name TEXT
);

-- Create index for active sessions
CREATE INDEX IF NOT EXISTS idx_active_sessions_last_seen ON active_sessions(last_seen_at);

-- Enable RLS for active_sessions
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for active_sessions
DROP POLICY IF EXISTS "Allow public read sessions" ON active_sessions;
DROP POLICY IF EXISTS "Allow public insert sessions" ON active_sessions;
DROP POLICY IF EXISTS "Allow public update sessions" ON active_sessions;

CREATE POLICY "Allow public read sessions"
ON active_sessions FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert sessions"
ON active_sessions FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update sessions"
ON active_sessions FOR UPDATE
TO public
USING (true);

-- Function to clean up old sessions (older than 5 minutes)
CREATE OR REPLACE FUNCTION cleanup_old_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM active_sessions
  WHERE last_seen_at < NOW() - INTERVAL '5 minutes';
END;
$$ LANGUAGE plpgsql;

-- Verify setup
SELECT
  'Setup complete! All tables created.' as status,
  (SELECT COUNT(*) FROM page_views) as aggregated_views,
  (SELECT COUNT(*) FROM page_view_logs) as detailed_logs,
  (SELECT COUNT(*) FROM search_queries) as search_queries,
  (SELECT COUNT(*) FROM error_404_logs) as error_404_logs,
  (SELECT COUNT(*) FROM active_sessions) as active_sessions;
