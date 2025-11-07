# Newsletter Email Setup Guide

## Overview

Your newsletter system now supports automatic email sending via Netlify Functions + Resend.

**Current Status:**
- ✅ Newsletter subscription form (frontend)
- ✅ Database storage (Supabase)
- ✅ Email function created (Netlify Function)
- ⏳ **Needs configuration** (environment variables)

---

## Setup Steps

### 1. Install Dependencies

Run this command in your project directory:

```bash
npm install
```

This installs the Resend email SDK.

### 2. Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. **Free tier includes:** 3,000 emails/month, 100 emails/day

### 3. Verify Your Domain (or Email)

**Option A: Verify Full Domain (Recommended)**
1. Go to Resend Dashboard > Domains
2. Add your domain: `bakarimustafa.com`
3. Add the DNS records they provide (TXT, MX, CNAME)
4. Wait for verification (usually 5-30 minutes)

**Option B: Use a Single Email (Quick Start)**
1. You can start with a verified email like `noreply@yourdomain.com`
2. Resend will send a verification link to that address
3. This works for testing but domain verification is better for production

### 4. Get Your API Key

1. In Resend Dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name it: "Newsletter Emails"
4. Copy the API key (starts with `re_...`)
5. **Keep it secret!** Never commit it to git

### 5. Configure Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your site: `bakarimustafa.com`
3. Go to **Site settings** > **Environment variables**
4. Add these variables:

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL = noreply@bakarimustafa.com
```

**Important:** After adding variables, you must redeploy your site for them to take effect.

### 6. Deploy to Netlify

```bash
git add .
git commit -m "Add newsletter email functionality"
git push
```

Netlify will automatically:
- Install the `resend` package
- Deploy the Netlify Function
- Make the function available at `/.netlify/functions/send-confirmation-email`

---

## Testing the Email System

### Test 1: Subscribe to Newsletter

1. Go to your site footer
2. Enter an email address
3. Click "Subscribe"
4. Check the email inbox for confirmation email

### Test 2: Check Logs

If emails aren't sending:

1. Go to Netlify Dashboard > Functions
2. Click on `send-confirmation-email`
3. Check the function logs for errors

Common issues:
- `RESEND_API_KEY not configured` → Add environment variable
- `403 Forbidden` → Domain not verified in Resend
- `422 Validation Error` → Check FROM_EMAIL matches verified domain

### Test 3: Console Fallback

If email fails, the subscription still works! The URLs are logged to the browser console:
```
Confirmation URL: https://bakarimustafa.com/newsletter-confirm?token=...
Unsubscribe URL: https://bakarimustafa.com/newsletter-unsubscribe?token=...
```

---

## Email Templates

The function sends two types of emails:

### 1. Confirmation Email (`type: 'confirmation'`)
- Subject: "📬 Confirm Your Newsletter Subscription"
- Includes: Confirmation button, unsubscribe link
- Sent when: User first subscribes or resubscribes

### 2. Welcome Email (`type: 'welcome'`)
- Subject: "🎉 Welcome to the Newsletter!"
- Sent when: User clicks confirmation link (optional - not yet implemented)

---

## Customizing Email Templates

Edit the HTML in:
```
netlify/functions/send-confirmation-email.js
```

The templates use inline CSS for email client compatibility.

**Tips:**
- Keep CSS inline (not in `<style>` tags)
- Test emails in multiple clients: Gmail, Outlook, Apple Mail
- Use tables for layout (better email client support)
- Avoid JavaScript (most email clients block it)

---

## Monitoring and Analytics

### Resend Dashboard
- View sent emails
- Track delivery rates
- Monitor bounces and complaints

### Supabase Dashboard
Check subscriber stats:
```sql
SELECT
  status,
  COUNT(*) as count
FROM newsletter_subscribers
GROUP BY status;
```

---

## Cost Breakdown

### Free Tier (Resend)
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ All features included

### If You Exceed Free Tier
- **Pay-as-you-go:** $1 per 1,000 emails
- No monthly fee unless you send more than 3,000 emails

### Example Costs
- 100 subscribers → ~100 emails/month → **FREE**
- 1,000 subscribers → ~1,000 emails/month → **FREE**
- 5,000 subscribers → ~5,000 emails/month → **$2/month**

---

## Alternative Email Providers

If you prefer a different service:

### SendGrid (Twilio)
- Free tier: 100 emails/day
- Setup: Similar to Resend
- Package: `npm install @sendgrid/mail`

### Mailgun
- Free tier: 5,000 emails/month (first 3 months)
- After: $35/month or pay-as-you-go
- Package: `npm install mailgun-js`

### AWS SES
- Very cheap: $0.10 per 1,000 emails
- More complex setup (AWS account required)
- Package: `npm install @aws-sdk/client-ses`

---

## Troubleshooting

### Emails Not Sending

1. **Check environment variables in Netlify**
   ```bash
   # Should see RESEND_API_KEY and FROM_EMAIL
   ```

2. **Check function logs**
   - Netlify Dashboard > Functions > send-confirmation-email > Logs

3. **Test API key manually**
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "noreply@bakarimustafa.com",
       "to": "test@example.com",
       "subject": "Test",
       "html": "<p>Test email</p>"
     }'
   ```

### Domain Not Verified

1. Check DNS records in your domain registrar
2. DNS propagation can take up to 48 hours
3. Use [DNS Checker](https://dnschecker.org) to verify propagation

### Emails Going to Spam

1. **Verify domain** (don't use unverified email)
2. **Add SPF, DKIM, DMARC** records (Resend provides these)
3. **Warm up your domain** (send to engaged users first)
4. **Avoid spam trigger words** in subject/content
5. **Include unsubscribe link** (already included)

---

## Next Steps

### Immediate
1. ✅ Install dependencies: `npm install`
2. ✅ Sign up for Resend
3. ✅ Add environment variables to Netlify
4. ✅ Deploy and test

### Optional Enhancements
- [ ] Add "Welcome" email after confirmation
- [ ] Create newsletter broadcast functionality
- [ ] Add email templates for different post categories
- [ ] Set up email analytics tracking
- [ ] Add double opt-in compliance notice

---

## Questions?

If you encounter issues:

1. Check Netlify function logs
2. Check Resend dashboard for delivery status
3. Verify environment variables are set
4. Test with a simple email first

**Current Setup:**
- Function: `netlify/functions/send-confirmation-email.js`
- Frontend: `assets/js/newsletter.js`
- Database: Supabase `newsletter_subscribers` table
