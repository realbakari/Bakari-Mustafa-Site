/**
 * Netlify Function: Send Newsletter Confirmation Email
 *
 * Setup Instructions:
 * 1. Sign up for Resend (https://resend.com) - Free tier: 3,000 emails/month
 * 2. Get your API key from Resend dashboard
 * 3. Add to Netlify environment variables:
 *    - RESEND_API_KEY=your_api_key_here
 *    - FROM_EMAIL=noreply@yourdomain.com (must be verified in Resend)
 * 4. Install dependency: npm install --save resend
 */

const { Resend } = require('resend');

exports.handler = async (event, context) => {
  /* Only allow POST requests */
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, confirmToken, unsubscribeToken, type } = JSON.parse(event.body);

    /* Validate required fields */
    if (!email || !type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: email, type' })
      };
    }

    /* Check for API key */
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'noreply@bakarimustafa.com';
    const siteUrl = process.env.URL || 'https://bakarimustafa.com';

    let subject, html;

    if (type === 'confirmation') {
      const confirmUrl = `${siteUrl}/newsletter-confirm?token=${confirmToken}`;

      subject = '📬 Confirm Your Newsletter Subscription';
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; padding: 14px 28px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
            .button:hover { background: #2563EB; }
            .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 14px; }
            .unsubscribe { color: #9CA3AF; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Welcome! 👋</h1>
            </div>
            <div class="content">
              <h2 style="color: #1F2937; margin-top: 0;">Confirm Your Subscription</h2>
              <p>Thank you for subscribing to the Bakari Mustafa newsletter!</p>
              <p>You'll receive updates about new blog posts, insights on software development, AI, and exclusive content.</p>
              <p>Please confirm your email address by clicking the button below:</p>
              <div style="text-align: center;">
                <a href="${confirmUrl}" class="button">Confirm Subscription</a>
              </div>
              <p style="color: #6B7280; font-size: 14px;">
                Or copy and paste this link into your browser:<br>
                <a href="${confirmUrl}" style="color: #3B82F6; word-break: break-all;">${confirmUrl}</a>
              </p>
              <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                If you didn't subscribe to this newsletter, you can safely ignore this email.
              </p>
            </div>
            <div class="footer">
              <p>Bakari Mustafa © ${new Date().getFullYear()}</p>
              <p class="unsubscribe">
                Don't want to receive these emails?
                <a href="${siteUrl}/newsletter-unsubscribe?token=${unsubscribeToken}" style="color: #9CA3AF;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'welcome') {
      subject = '🎉 Welcome to the Newsletter!';
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">You're All Set! 🎉</h1>
            </div>
            <div class="content">
              <h2 style="color: #1F2937; margin-top: 0;">Welcome Aboard!</h2>
              <p>Your subscription is now confirmed. Thank you for joining!</p>
              <p>Here's what you can expect:</p>
              <ul>
                <li>📝 Latest blog posts and articles</li>
                <li>💡 Tips on software development and AI</li>
                <li>🚀 Exclusive content and insights</li>
                <li>🎯 No spam, just quality content</li>
              </ul>
              <p>Stay tuned for great content!</p>
            </div>
            <div class="footer">
              <p>Bakari Mustafa © ${new Date().getFullYear()}</p>
              <p style="font-size: 12px; color: #9CA3AF;">
                <a href="${siteUrl}/newsletter-unsubscribe?token=${unsubscribeToken}" style="color: #9CA3AF;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email type' })
      };
    }

    /* Send email via Resend */
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: subject,
      html: html
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: data.id
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};
