# Gmail Email Setup Guide

This guide will help you set up automatic email sending using your personal Gmail account.

## 🎯 What You'll Get

- **Automatic email sending** through your Gmail account
- **Professional HTML emails** with beautiful formatting
- **Fallback options** if the backend is unavailable
- **Complete control** over your email account

## 📧 Step 1: Configure Gmail App Password

### 1.1 Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process if not already enabled

### 1.2 Create App Password
1. In the same Security section, click **App passwords**
2. Select **Mail** and **Other (Custom name)**
3. Enter "Wedding Invitation App" as the name
4. Click **Generate**
5. **Copy the 16-character password** (you'll need this)

## 🔧 Step 2: Configure the Backend

### 2.1 Create Environment File
```bash
cd server
cp env.example .env
```

### 2.2 Edit the .env file
Open `server/.env` and add your Gmail credentials:

```env
# Your Gmail address
GMAIL_USER=your-email@gmail.com

# The 16-character app password from Step 1.2
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop

# Server port (default is fine)
PORT=3001

# Your name for email signatures
SENDER_NAME=Your Name
```

## 🚀 Step 3: Start the Email Server

### 3.1 Start the Backend Server
```bash
cd server
npm start
```

You should see:
```
🚀 Wedding email server running on http://localhost:3001
📧 Gmail user: your-email@gmail.com
🔑 App password: Configured
```

### 3.2 Start the Frontend (in another terminal)
```bash
cd ..  # Back to main project
npm run dev
```

## ✅ Step 4: Test the Setup

1. Fill out the wedding invitation form
2. Submit the reservation
3. Check that:
   - ✅ The confirmation screen shows "Email de confirmación enviado automáticamente"
   - ✅ The guest receives a beautiful HTML email
   - ✅ Fallback options (mailto, download) are still available

## 🔍 Troubleshooting

### Email not sending?

**Check the browser console:**
- Open Developer Tools (F12)
- Look for error messages in the Console tab

**Check the server logs:**
- Look at the terminal where you ran `npm start`
- Check for error messages

**Common issues:**

1. **"Invalid credentials"**
   - Double-check your Gmail address in `.env`
   - Make sure you're using the **App Password**, not your regular password
   - Ensure 2-Factor Authentication is enabled

2. **"Connection refused"**
   - Make sure the server is running on port 3001
   - Check if another app is using port 3001

3. **CORS errors**
   - The server is configured for `localhost:5173` (Vite dev server)
   - If using a different port, update the CORS settings in `server.js`

### Still having issues?

The app has fallback options:
- **mailto: button** opens email client with pre-filled content
- **Download button** creates a text file with confirmation
- **Local storage** saves all bookings for later retrieval

## 🎨 Email Template

The emails sent include:
- ✈️ Beautiful airline-themed design
- 🎫 Confirmation number
- 💺 Selected seats
- 👥 Guest information
- 🍽️ Dietary restrictions
- 📱 Professional HTML formatting

## 🔒 Security Notes

- **App passwords** are safer than using your main password
- **Local only**: The server runs on your computer, not in the cloud
- **No external services**: Your Gmail credentials stay on your machine
- **Revokable**: You can revoke the app password anytime in Google settings

## 🚀 Production Deployment (Optional)

If you want to deploy this for others to use:

1. **Deploy the backend** to services like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

2. **Update frontend API URL** in `SeatSelection.jsx`:
   ```javascript
   const response = await fetch('https://your-backend-url.com/send-confirmation', {
   ```

3. **Set environment variables** on your hosting platform

## 💡 Alternative: Gmail API (Advanced)

For even more control, you can use the Gmail API instead of SMTP:
- More secure (OAuth2 instead of app passwords)
- Better rate limits
- More features (read receipts, etc.)
- More complex setup

Let me know if you'd like help setting up the Gmail API version!