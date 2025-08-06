# Deployment Instructions for Render

This app is ready to deploy on Render with both the React frontend and Node.js backend.

## Quick Deploy

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account
   - Click "New Web Service"
   - Select this repository
   - Use these settings:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: Node

3. **Set Environment Variables**
   - In Render dashboard, go to Environment tab
   - Add these variables:
     - `GMAIL_USER`: Your Gmail address
     - `GMAIL_APP_PASSWORD`: Your Gmail app password
     - `NODE_ENV`: `production`
     - `SENDER_NAME`: `Wedding ADA2024`

## Alternative: Using render.yaml

The included `render.yaml` file will automatically configure the deployment. Just connect your repo and Render will use this file.

## Local Development

```bash
# Install dependencies
npm install

# Run development server (frontend only)
npm run dev

# Run both frontend and backend
npm run dev:full

# Build for production
npm run build

# Start production server
npm start
```

## Gmail Setup

You need a Gmail App Password:
1. Enable 2FA on your Gmail account
2. Go to Google Account > Security > App passwords
3. Generate a new app password
4. Use this 16-character password in `GMAIL_APP_PASSWORD`

## Project Structure

- Frontend: React + Vite (builds to `/dist`)
- Backend: Express server in `/server`
- Production: Server serves both API endpoints and React app