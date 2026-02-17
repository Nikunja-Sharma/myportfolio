# EmailJS Setup Guide

This guide explains how to configure EmailJS for the contact form functionality.

## Prerequisites

1. A Gmail, Outlook, or other email account
2. An EmailJS account (free tier available)

## Setup Steps

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the authentication steps
5. Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. **Option A: Simple Text Template**
   ```
   Subject: Portfolio Contact: {{subject}}

   From: {{name}} <{{email}}>

   Message:
   {{message}}

   ---
   This message was sent via the portfolio contact form.
   Reply to: {{email}}
   ```

4. **Option B: HTML Template (Recommended)**
   - Copy the HTML content from `docs/email-template.html` in this project
   - Paste it into the "Content" section of your EmailJS template
   - The template uses these variables: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`

5. Save the template and note the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `user_abcdef123456`)

### 5. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Test the Configuration

1. Start the development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message

## Template Variables

The email template uses these variables:

- `{{name}}` - Sender's name from the form
- `{{email}}` - Sender's email from the form
- `{{subject}}` - Subject from the form
- `{{message}}` - Message content from the form

**Note:** The service also sends `to_email` and `reply_to` for internal EmailJS functionality, but these don't need to be displayed in the template.

## Troubleshooting

### Configuration Warnings

If you see a "CONFIG_WARNING" message:
- Check that all environment variables are set correctly
- Ensure the `.env.local` file is in the project root
- Restart the development server after adding environment variables

### Form Data Persistence

If form submission fails:
- The form data is automatically saved to localStorage
- Data is restored when you return to the page
- Data expires after 24 hours
- You can clear saved data using the "Clear" button

### Common Issues

1. **"Service not found"** - Check your Service ID
2. **"Template not found"** - Check your Template ID  
3. **"Invalid public key"** - Check your Public Key
4. **"Blocked by CORS"** - Make sure you're testing on localhost or your domain is added to EmailJS settings

## Security Notes

- Public keys are safe to expose in client-side code
- Never expose your private key
- EmailJS handles rate limiting automatically
- Consider adding reCAPTCHA for production use

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates
- Basic support

For higher volumes, consider upgrading to a paid plan.