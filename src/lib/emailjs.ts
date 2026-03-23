// EmailJS configuration module
// Note: @emailjs/browser needs to be installed: npm install @emailjs/browser

let emailjs: any = null;

try {
  emailjs = require("@emailjs/browser");
} catch (error) {
  console.warn("EmailJS is not installed. Install with: npm install @emailjs/browser");
}

// Initialize EmailJS
const EMAILJS_SERVICE_ID = "service_your_service_id"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "template_your_template_id"; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = "your_public_key"; // Replace with your public key

export const initializeEmailJS = () => {
  if (!emailjs) {
    console.error("EmailJS is not installed");
    return;
  }

  if (typeof window !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

export interface SendEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (params: SendEmailParams) => {
  if (!emailjs) {
    return { success: false, message: "EmailJS is not configured" };
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: params.name,
        from_email: params.email,
        subject: params.subject,
        message: params.message,
        reply_to: params.email,
      },
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return { success: true, message: "Email sent successfully" };
    }
    return { success: false, message: "Failed to send email" };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, message: "Error sending email" };
  }
};

/**
 * Configuration Instructions:
 * 
 * 1. Install EmailJS: npm install @emailjs/browser
 * 2. Create an account at https://www.emailjs.com
 * 3. Set up an email service in EmailJS
 * 4. Create an email template with these template variables:
 *    - {{from_name}} - Sender's name
 *    - {{from_email}} - Sender's email
 *    - {{subject}} - Email subject
 *    - {{message}} - Email message
 *    - {{reply_to}} - Reply to email address
 * 5. Replace the placeholder IDs in this file with your actual IDs
 * 6. Add environment variables to .env.local or .env
 * 7. See docs/EMAILJS_SETUP.md for detailed setup instructions
 */
