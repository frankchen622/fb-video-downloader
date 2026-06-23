# Contact Form Email Setup

The contact form now sends submissions to your email using Resend.

## Setup Instructions

### 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Go to API Keys section
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
```

Replace:
- `re_xxxxxxxxxxxxx` with your actual Resend API key
- `your-email@example.com` with the email where you want to receive submissions

### 3. Deploy

When deploying to Vercel/Netlify, add these environment variables in your deployment settings.

## How It Works

1. User fills out the contact form
2. Form data is sent to `/api/contact` endpoint
3. API validates the data
4. Email is sent via Resend to your configured email address
5. User sees success message

## Email Format

You'll receive emails with:
- Subject: "New Contact Form Submission from [Name]"
- Sender name and email
- Message content
- Locale (language) of the submission

## Fallback Behavior

If `RESEND_API_KEY` is not configured:
- Form submissions are logged to console
- No email is sent
- Form still shows success message to user

## Free Tier Limits

Resend free tier includes:
- 100 emails per day
- 3,000 emails per month
- No credit card required

For higher volume, upgrade to a paid plan.

## Alternative: Use Your Own Domain

To send emails from your own domain (e.g., contact@savefbs.net):

1. Add your domain in Resend dashboard
2. Add DNS records (SPF, DKIM)
3. Update the `from` field in `/pages/api/contact.ts`:

```typescript
from: 'SaveFBS Contact <contact@savefbs.net>'
```

## Testing

Test the form locally:
1. Set environment variables in `.env.local`
2. Run `npm run dev`
3. Visit http://localhost:3000/contact
4. Submit a test message
5. Check your email inbox
