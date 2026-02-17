/**
 * EmailJS Configuration
 * 
 * To set up EmailJS for the contact form:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create a new email service (Gmail, Outlook, etc.)
 * 3. Create an email template with the following variables:
 *    - {{from_name}} - Sender's name
 *    - {{from_email}} - Sender's email
 *    - {{subject}} - Email subject
 *    - {{message}} - Email message
 *    - {{to_email}} - Recipient email (xnikunja@gmail.com)
 *    - {{reply_to}} - Reply-to email (sender's email)
 * 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
 * 5. Update the values below
 */

export const EMAILJS_CONFIG = {
  // Service ID from EmailJS dashboard
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio',
  
  // Template ID from EmailJS dashboard  
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
  
  // Public Key from EmailJS dashboard
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY',
  
  // Recipient email address
  recipientEmail: 'xnikunja@gmail.com',
};

/**
 * Environment Variables Setup:
 * 
 * Create a .env.local file in the project root with:
 * VITE_EMAILJS_SERVICE_ID=your_service_id_here
 * VITE_EMAILJS_TEMPLATE_ID=your_template_id_here  
 * VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
 * 
 * Note: Vite automatically exposes environment variables prefixed with VITE_
 * They are accessed via import.meta.env in the browser.
 * This keeps sensitive configuration out of the codebase.
 */