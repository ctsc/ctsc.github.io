# EmailJS Setup Instructions

## Overview
The feedback form in the Projects page uses EmailJS to send emails directly without opening the user's email client.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)

### 2. Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your Gmail account (cartertierney0@gmail.com)
5. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:** 
```
New Portfolio Feedback from {{from_name}}
```

**Body:**
```
You have received new feedback from your portfolio:

{{message}}

---
Sent from: Portfolio Website
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (e.g., `abc123XYZ`)

### 5. Configure Environment Variables
Create a `.env` file in the project root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Replace the placeholder values with your actual EmailJS credentials.

### 6. Add .env to .gitignore
Make sure `.env` is in your `.gitignore` file to keep your credentials secure.

## Testing
1. Run your development server
2. Navigate to Projects page
3. Click "Edit"
4. Enter test feedback
5. Click "Send Feedback"
6. Check your email inbox (cartertierney0@gmail.com)

## Features
- ✅ Direct email sending (no email client popup)
- ✅ Loading state while sending
- ✅ Success/error messages
- ✅ Auto-close modal after successful send
- ✅ Works on all devices
- ✅ No backend required

## Troubleshooting
- **"Failed to send feedback"**: Check your EmailJS credentials in `.env`
- **Email not received**: Check EmailJS dashboard for failed sends
- **CORS errors**: Verify your domain is allowed in EmailJS settings
- **Rate limit**: Free tier has 200 emails/month limit

## Template Variables
The following variables are sent to EmailJS:
- `from_name`: "Portfolio Visitor"
- `message`: User's feedback text
- `to_email`: "cartertierney0@gmail.com"
- `reply_to`: "noreply@portfolio.com"
