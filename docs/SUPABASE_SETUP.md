# Supabase Page View Counter Setup

This guide will help you set up a page view counter using Supabase for your Jekyll site.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: Bakari Site Analytics (or any name)
   - **Database Password**: (generate a strong password - save it!)
   - **Region**: Choose closest to your audience
4. Click "Create new project" and wait ~2 minutes for setup

## 2. Create Database Table

1. In your Supabase dashboard, go to **Table Editor** (left sidebar)
2. Click **"New Table"**
3. Configure the table:

```sql
-- Table name: page_views

CREATE TABLE page_views (
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
CREATE INDEX idx_page_views_url ON page_views(page_url);

-- Enable Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read view counts
CREATE POLICY "Allow public read access"
ON page_views FOR SELECT
TO public
USING (true);

-- Create policy to allow anyone to insert/update views
-- (In production, you might want to use a server-side function)
CREATE POLICY "Allow public insert"
ON page_views FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update"
ON page_views FOR UPDATE
TO public
USING (true);
```

4. Run this SQL in **SQL Editor** (left sidebar → SQL Editor → New query)

## 3. Get Your API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (looks like: `eyJhbGc...`)

## 4. Add Credentials to Your Site

### Option A: Environment Variables (Recommended for local development)

Create `.env` file in your project root:

```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
```

**Important:** Add `.env` to `.gitignore` - never commit credentials!

### Option B: Jekyll Configuration (For production)

Add to `_config.yml` (if you're using Netlify, set as environment variables there):

```yaml
supabase:
  url: "https://xxxxx.supabase.co"
  anon_key: "eyJhbGc..."
```

### Option C: Netlify Environment Variables (Recommended for production)

1. Go to your Netlify dashboard
2. Site settings → Build & deploy → Environment variables
3. Add:
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON_KEY` = your anon key

## 5. Testing

Once implemented, you can verify views in Supabase:

1. Go to **Table Editor** → `page_views`
2. You should see rows appearing with URLs and view counts
3. Query in **SQL Editor**:

```sql
SELECT page_url, view_count, unique_views, last_viewed_at
FROM page_views
ORDER BY view_count DESC;
```

## Privacy Considerations

The current implementation:
- ✅ No personal data stored (no IPs, user agents, cookies)
- ✅ Only tracks URL + count
- ✅ Session-based deduplication (same user = 1 view per session)
- ✅ GDPR-friendly (no personal identifiable information)

## Free Tier Limits

Supabase free tier includes:
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth
- 50,000 monthly active users

More than enough for a personal blog!

## Optional: Edge Function for Better Security

For production, consider creating a Supabase Edge Function to handle view counting server-side. This prevents potential abuse of the public API.

## Support

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
