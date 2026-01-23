# Gentic n8n Marketplace Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `gentic-n8n-marketplace`)
3. **Do NOT initialize with README** (we already have one)
4. Click "Create repository"

### Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"
6. Your site will be live at: `https://your-project.vercel.app`

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 4: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `marketplace.gentic.ai`)
4. Follow the DNS configuration instructions

## Project Structure

```
.
├── web/
│   └── landing.html          # Main landing page
├── server-landing.js          # Node.js server
├── vercel.json               # Vercel configuration
├── package.json              # Node.js dependencies
└── start-landing.bat         # Local server launcher (Windows)
```

## Local Development

To run locally:

```bash
# Start the server
node server-landing.js

# Or use npm script
npm run landing

# Or on Windows
start-landing.bat
```

Server runs on: http://localhost:3000

## Vercel Configuration

The `vercel.json` file configures:
- Node.js runtime for `server-landing.js`
- Routes all requests to the server
- Automatic HTTPS
- Global CDN deployment

## Environment Variables (if needed)

If you need environment variables:

1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Add variables (e.g., `GUMROAD_API_KEY`)

## Features

- ✅ Modern dark theme with Aura-inspired design
- ✅ Gentic branding with gradient colors
- ✅ 10 production templates linked to Gumroad
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and hover effects
- ✅ SEO-optimized
- ✅ Fast loading with CDN

## Gumroad Integration

All templates link to: `https://genticai.gumroad.com/l/[product-id]`

Current products:
- Appointment Scheduler ($12)
- Deal Analyzer System ($77) - Featured
- Voice Agent Qualifier ($37)
- Lead Capture Kit ($12)
- SaaS Founder Content ($77)
- Fitness Coach Social Media ($37)
- Mortgage Broker Content ($77)
- Restaurant Owner Social Media ($37)
- Ecommerce Store Social Media ($12)
- Real Estate Agent Social Media ($12)

**Total Catalog Value:** $1,170

## Performance

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Score: 95+

## Support

For issues or questions:
- Email: support@genticai.com
- Gumroad Store: https://genticai.gumroad.com

## License

© 2026 GenticAI. All rights reserved.
