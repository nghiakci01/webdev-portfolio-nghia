import emailjs from "@emailjs/browser";
import { emailJsConfig } from "./env";
import { contactInfo } from "./config";

// Initialize EmailJS
// Initialize EmailJS with trimmed keys to avoid accidental spaces
const EMAILJS_SERVICE_ID = emailJsConfig.serviceId.trim();
const EMAILJS_TEMPLATE_ID = emailJsConfig.templateId.trim();
const EMAILJS_PUBLIC_KEY = emailJsConfig.publicKey.trim();

export const initializeEmailJS = () => {
  if (typeof window !== "undefined" && EMAILJS_PUBLIC_KEY) {
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
  if (!emailJsConfig.isConfigured()) {
    console.error("EmailJS check: Configuration is incomplete", {
      serviceId: !!emailJsConfig.serviceId,
      templateId: !!emailJsConfig.templateId,
      publicKey: !!emailJsConfig.publicKey
    });
    return { success: false, message: "Email service is not properly configured" };
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: params.name, // Added to match the {{name}} in your dashboard screenshot
        from_name: params.name,
        from_email: params.email,
        subject: params.subject,
        message: params.message,
        reply_to: params.email,
        // Redundant recipient variables to ensure compatibility with various templates
        to_email: "nghia08092005@gmail.com",
        recipient_email: "nghia08092005@gmail.com",
        to_name: "Nguyễn Tuấn Nghĩa",
      },
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return { success: true, message: "Email sent successfully" };
    }
    return { success: false, message: `Failed to send email (Status: ${response.status})` };
  } catch (error: any) {
    // Detailed error logging for debugging 422 and other API errors
    const errorText = error?.text || error?.message || "Unknown error";
    const errorStatus = error?.status || "No status";
    
    console.error("EmailJS Error Details:", {
      status: errorStatus,
      text: errorText,
      params: {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!EMAILJS_PUBLIC_KEY
      }
    });

    // Provide a more user-friendly message based on common errors
    let userMessage = "Có lỗi xảy ra khi gửi tin nhắn.";
    if (errorStatus === 422) {
      userMessage = `Lỗi 422 [v4]: ${errorText}. Hãy kiểm tra lại phần "To Email" trong Dashboard của bạn.`;
    } else {
      userMessage = `${userMessage} (Lỗi ${errorStatus}: ${errorText})`;
    }

    return { success: false, message: userMessage, details: errorText };
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
