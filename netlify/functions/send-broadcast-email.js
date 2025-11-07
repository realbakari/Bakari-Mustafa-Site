/**
 * Netlify Function: Send Broadcast Email to Newsletter Subscribers
 *
 * This function sends emails to multiple subscribers at once.
 * Uses Resend API for reliable email delivery.
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
    const { subject, body, recipients, previewMode, previewEmail } = JSON.parse(event.body);

    /* Validate required fields */
    if (!subject || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: subject, body' })
      };
    }

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Recipients array is required and cannot be empty' })
      };
    }

    /* Check for API key */
    if (!process.env.RESEND_API_KEY) {
      console.error('[Broadcast] RESEND_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.FROM_EMAIL || 'noreply@bakarimustafa.com';
    const siteUrl = process.env.URL || 'https://bakarimustafa.com';

    /* Preview mode: send only to admin */
    if (previewMode) {
      if (!previewEmail) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Preview email address required for test mode' })
        };
      }

      const html = generateEmailHTML(subject, body, previewEmail, siteUrl, true);

      const data = await resend.emails.send({
        from: fromEmail,
        to: previewEmail,
        subject: `[TEST] ${subject}`,
        html: html
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Test email sent successfully',
          messageId: data.id,
          recipientCount: 1
        })
      };
    }

    /* Production mode: send to all recipients */
    /* Note: Resend allows batch sending, but we'll send individually to personalize */
    const results = {
      successful: 0,
      failed: 0,
      errors: []
    };

    /* Limit: Process in batches to avoid timeouts */
    const batchSize = 10;
    const maxRecipients = 100; // Safety limit

    const recipientsToSend = recipients.slice(0, maxRecipients);

    for (let i = 0; i < recipientsToSend.length; i += batchSize) {
      const batch = recipientsToSend.slice(i, i + batchSize);

      /* Send emails in parallel within batch */
      const promises = batch.map(async (recipient) => {
        try {
          const html = generateEmailHTML(
            subject,
            body,
            recipient.email,
            siteUrl,
            false,
            recipient.unsubscribe_token
          );

          await resend.emails.send({
            from: fromEmail,
            to: recipient.email,
            subject: subject,
            html: html
          });

          results.successful++;
        } catch (error) {
          console.error(`[Broadcast] Failed to send to ${recipient.email}:`, error);
          results.failed++;
          results.errors.push({
            email: recipient.email,
            error: error.message
          });
        }
      });

      await Promise.all(promises);

      /* Small delay between batches to avoid rate limits */
      if (i + batchSize < recipientsToSend.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`[Broadcast] Sent ${results.successful} emails, ${results.failed} failed`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Email sent to ${results.successful} recipient(s)`,
        successful: results.successful,
        failed: results.failed,
        errors: results.errors.length > 0 ? results.errors : undefined
      })
    };

  } catch (error) {
    console.error('[Broadcast] Error sending broadcast:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send broadcast email',
        details: error.message
      })
    };
  }
};

/**
 * Generate HTML email template
 */
function generateEmailHTML(subject, bodyContent, recipientEmail, siteUrl, isPreview, unsubscribeToken) {
  /* Convert newlines to <br> and wrap in paragraphs if needed */
  let formattedBody = bodyContent;

  /* If body doesn't contain HTML tags, format plain text */
  if (!bodyContent.includes('<')) {
    formattedBody = bodyContent
      .split('\n\n')
      .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }

  /* Build unsubscribe link */
  const unsubscribeLink = unsubscribeToken
    ? `${siteUrl}/newsletter-unsubscribe?token=${unsubscribeToken}`
    : '#';

  const previewBanner = isPreview ? `
    <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
      <strong style="color: #92400E;">🧪 TEST EMAIL</strong>
      <p style="margin: 4px 0 0 0; color: #92400E; font-size: 14px;">
        This is a preview. In production, this would be sent to ${recipientEmail}.
      </p>
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .content p {
          margin: 0 0 16px 0;
          color: #374151;
        }
        .content a {
          color: #3B82F6;
          text-decoration: none;
        }
        .content a:hover {
          text-decoration: underline;
        }
        .footer {
          background: #f9fafb;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          margin: 0 0 8px 0;
          color: #6b7280;
          font-size: 14px;
        }
        .unsubscribe {
          margin-top: 16px;
          font-size: 12px;
          color: #9ca3af;
        }
        .unsubscribe a {
          color: #9ca3af;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bakari Mustafa</h1>
        </div>
        <div class="content">
          ${previewBanner}
          ${formattedBody}
        </div>
        <div class="footer">
          <p><strong>Bakari Mustafa</strong></p>
          <p>Software Developer | Tech Writer | AI Enthusiast</p>
          <p><a href="${siteUrl}" style="color: #3B82F6;">Visit Website</a></p>
          <div class="unsubscribe">
            <p>
              You're receiving this because you subscribed to the Bakari Mustafa newsletter.<br>
              ${unsubscribeToken ? `<a href="${unsubscribeLink}">Unsubscribe</a>` : 'To unsubscribe, click the link in your confirmation email.'}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
