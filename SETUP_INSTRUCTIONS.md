# Quick Setup Instructions

Your Supabase page view counter is ready to go! Follow these steps to activate it:

## ✅ Your Supabase Credentials

- **Project URL**: https://fmyukpxfweibodnuaifr.supabase.co
- **Project Dashboard**: https://app.supabase.com/project/fmyukpxfweibodnuaifr

## Step 1: Run the Database Schema (2 minutes)

1. Go to your Supabase dashboard: https://app.supabase.com/project/fmyukpxfweibodnuaifr
2. Click **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Open the file `supabase-schema.sql` in this repository
5. Copy all the SQL and paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see: "Setup complete! Table created with 0 rows."

This creates:
- ✅ `page_views` table to store view counts
- ✅ Indexes for fast lookups
- ✅ Row Level Security policies for public read/write

## Step 2: Verify Setup (Optional)

Run this query in SQL Editor to check the table:

```sql
SELECT * FROM page_views LIMIT 10;
```

You should see an empty table (that's normal - views will appear after you deploy).

## Step 3: Deploy to Netlify

Your credentials are already in `_config.yml`, so just push and deploy:

```bash
git add .
git commit -m "Configure Supabase page counter"
git push
```

Netlify will automatically rebuild your site with the page counter enabled!

## Step 4: Test It!

1. After deployment, visit any blog post
2. Look for the view counter in the post metadata:
   ```
   Date • Author • 5 min read • 👁 0 views
   ```
3. Refresh the page - the count should increase!
4. Open in incognito window - unique views will increase too

## Checking Your Stats

### View All Page Data

In Supabase **SQL Editor**, run:

```sql
SELECT
  page_title,
  page_url,
  view_count,
  unique_views,
  last_viewed_at
FROM page_views
ORDER BY view_count DESC;
```

### Get Total Site Views

```sql
SELECT
  SUM(view_count) as total_views,
  SUM(unique_views) as total_unique_visitors,
  COUNT(*) as total_pages_tracked
FROM page_views;
```

### See Most Popular Posts

```sql
SELECT
  page_title,
  view_count,
  unique_views
FROM page_views
WHERE page_url LIKE '/posts/%'
   OR page_url LIKE '/%/'
ORDER BY view_count DESC
LIMIT 10;
```

## 🔒 Security Note

**Important**: Your repository currently has credentials in `_config.yml`. While the anon key is safe to expose publicly (it's meant for client-side use), for better security you should:

### Option A: Use Netlify Environment Variables (Recommended)

1. Go to **Netlify Dashboard** → Your Site → **Site settings**
2. Click **Build & deploy** → **Environment variables**
3. Add these variables:
   - `SUPABASE_URL` = https://fmyukpxfweibodnuaifr.supabase.co
   - `SUPABASE_ANON_KEY` = your key

4. Remove credentials from `_config.yml`:
   ```yaml
   supabase:
     url: ""
     anon_key: ""
   ```

5. Update `_includes/footer.html` to use environment variables

For now, it's fine to keep them in `_config.yml` - the anon key is designed for public use!

## Troubleshooting

### Counter shows "0 views" forever

- Check browser console for errors (F12 → Console)
- Verify the SQL schema was run successfully
- Check Supabase table editor - do you see the table?

### "Failed to fetch" errors

- Verify Row Level Security policies are enabled
- Check that the policies allow public access
- Re-run the `supabase-schema.sql` file

### Counter doesn't appear at all

- View page source - do you see the Supabase script loading?
- Check that `_config.yml` has valid URL and key
- Clear browser cache and try again

## Next Steps

- ✅ Counter is working on all blog posts
- 📊 Optional: Create a `/stats/` page to show site-wide analytics (see `docs/PAGE_COUNTER_EXAMPLES.md`)
- 📈 Optional: Add popular posts widget to homepage
- 🎨 Optional: Customize the counter styling

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Your Supabase Dashboard](https://app.supabase.com/project/fmyukpxfweibodnuaifr)
- Check the detailed docs in `docs/SUPABASE_SETUP.md`

Happy tracking! 📊
