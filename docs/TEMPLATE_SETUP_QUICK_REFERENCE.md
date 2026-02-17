# EmailJS Template Setup - Quick Reference

## Template Variables Mapping

When setting up your EmailJS template, use these variable names:

| Form Field | Template Variable | Description |
|------------|------------------|-------------|
| Name | `{{name}}` | Sender's full name |
| Email | `{{email}}` | Sender's email address |
| Subject | `{{subject}}` | Email subject line |
| Message | `{{message}}` | Email message content |

## Ready-to-Use HTML Template

The file `docs/email-template.html` contains a complete, styled HTML email template that you can copy directly into EmailJS.

### Features:
- ✅ Responsive design
- ✅ Professional styling
- ✅ All required variables included
- ✅ Clean, modern appearance

### To Use:
1. Open `docs/email-template.html`
2. Copy the entire HTML content
3. Paste into EmailJS template editor
4. Save with a memorable Template ID

## Subject Line Suggestion

For the email subject in EmailJS, use:
```
Portfolio Contact: {{subject}}
```

This will create subjects like:
- "Portfolio Contact: Project Inquiry"
- "Portfolio Contact: Collaboration Opportunity"

## Testing

After setup, test with:
- Name: "Test User"
- Email: "test@example.com" 
- Subject: "Test Message"
- Message: "This is a test of the contact form."

You should receive a nicely formatted email with all the information clearly displayed.