# EmailJS Configuration Guide

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Complete the verification process
6. Copy your **Service ID** (format: `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Name it "Contact Form Template"
4. Configure the template:
   
   **Subject:**
   ```
   New message from {{from_name}}: {{subject}}
   ```
   
   **HTML Content:**
   ```html
   <h2>New Contact Form Submission</h2>
   <p><strong>From:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Subject:</strong> {{subject}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   <hr>
   <p><em>To reply, use: {{reply_to}}</em></p>
   ```

5. Copy your **Template ID** (format: `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to "Account" > "API Keys"
2. Copy your **Public Key**

### Step 5: Update Environment Variables
1. Create a `.env.local` file in your project root
2. Add the following:
   ```
   VITE_EMAILJS_SERVICE_ID=service_your_service_id
   VITE_EMAILJS_TEMPLATE_ID=template_your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Step 6: Update EmailJS Configuration
1. Open `src/lib/emailjs.ts`
2. Replace the placeholder values:
   ```typescript
   const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
   const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
   const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
   ```

### Step 7: Install EmailJS
```bash
npm install @emailjs/browser
```

### Step 8: Enable EmailJS in Contact Form
1. Open `src/components/Contact.tsx`
2. Uncomment the EmailJS code in the `onSubmit` function
3. Comment out the demo code

### Step 9: Initialize EmailJS
1. Open `src/main.tsx`
2. Add at the top:
   ```typescript
   import { initializeEmailJS } from "@/lib/emailjs";
   initializeEmailJS();
   ```

## Testing
1. Run `npm run dev`
2. Fill out the contact form on your website
3. Submit and check your email for the contact message

## Free Plan Limits
- EmailJS free plan allows ~200 emails per month
- Upgrade to premium for higher limits

## Troubleshooting
- **"Invalid Service ID"**: Check your Service ID is copied correctly
- **"Invalid Template ID"**: Verify template is published
- **"Invalid Public Key"**: Check API key format
- **CORS errors**: Make sure your domain is added to EmailJS dashboard (Account > Security)

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- FAQ: https://www.emailjs.com/FAQ/