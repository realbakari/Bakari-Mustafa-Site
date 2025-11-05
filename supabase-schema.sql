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

-- Verify setup
SELECT
  'Setup complete! Table created with ' || COUNT(*) || ' rows.' as status
FROM page_views;
