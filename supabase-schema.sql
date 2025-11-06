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

-- Enable Row Level Security (RLS) for page_view_logs
ALTER TABLE page_view_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access logs" ON page_view_logs;
DROP POLICY IF EXISTS "Allow public insert logs" ON page_view_logs;

-- Create policies for page_view_logs
CREATE POLICY "Allow public read access logs"
ON page_view_logs FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert logs"
ON page_view_logs FOR INSERT
TO public
WITH CHECK (true);

-- Verify setup
SELECT
  'Setup complete! Tables created.' as status,
  (SELECT COUNT(*) FROM page_views) as aggregated_views,
  (SELECT COUNT(*) FROM page_view_logs) as detailed_logs;
