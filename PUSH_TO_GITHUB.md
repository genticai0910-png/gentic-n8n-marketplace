# Push to GitHub & Deploy to Vercel - Step by Step

## ✅ Current Status
- Git repository initialized
- Changes committed locally
- Ready to push to GitHub

## 📋 Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new

2. **Create new repository**:
   - Repository name: `gentic-n8n-marketplace` (or your preferred name)
   - Description: `Gentic n8n Marketplace - Production-ready automation templates`
   - Visibility: **Public** (or Private if you prefer)
   - ⚠️ **DO NOT** check "Initialize this repository with a README"
   - Click **"Create repository"**

3. **Copy the repository URL** from the next screen
   - It will look like: `https://github.com/YOUR_USERNAME/gentic-n8n-marketplace.git`

## 📋 Step 2: Connect Local Repo to GitHub

Open your terminal in this directory and run:

```bash
# Add GitHub as remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/gentic-n8n-marketplace.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/jga07/gentic-n8n-marketplace.git
git branch -M main
git push -u origin main
```

You'll be prompted to authenticate with GitHub.

## 📋 Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Easiest) ⭐

1. **Go to Vercel**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Authorize GitHub if needed
   - Select your `gentic-n8n-marketplace` repository

3. **Configure Project**:
   - Project Name: `gentic-marketplace` (or your preference)
   - Framework Preset: **Other**
   - Root Directory: `./` (leave as default)
   - Build Command: Leave empty (we're using serverless)
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Environment Variables** (Optional):
   - Skip for now (none needed)

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live!

6. **Get Your URL**:
   - Vercel will show you the URL: `https://gentic-marketplace.vercel.app`
   - Copy and test it

### Option B: Vercel CLI (Advanced)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 📋 Step 4: Verify Deployment

1. **Open your Vercel URL** in a browser
2. **Check that**:
   - ✅ Landing page loads with Gentic branding
   - ✅ All 10 templates are visible
   - ✅ Gumroad links work
   - ✅ Animations and hover effects work
   - ✅ Mobile responsive design works

## 📋 Step 5: Custom Domain (Optional)

If you want `marketplace.gentic.ai` or similar:

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `marketplace.gentic.ai`

2. **Configure DNS** (at your domain registrar):
   - Add CNAME record:
     - Name: `marketplace`
     - Value: `cname.vercel-dns.com`
   - Or follow Vercel's specific DNS instructions

3. **Wait for propagation** (5-60 minutes)

## 🎯 Expected Results

After deployment, your landing page will be:
- ✅ Live on the internet
- ✅ HTTPS enabled automatically
- ✅ Deployed to Vercel's global CDN
- ✅ Fast loading times worldwide
- ✅ Auto-deploys on git push

## 🔄 Future Updates

To update your live site:

```bash
# Make changes to web/landing.html or other files
# Then commit and push:
git add .
git commit -m "Update landing page"
git push origin main

# Vercel will auto-deploy the changes!
```

## 📱 Share Your Live URL

Once deployed, share:
- Landing page: `https://your-project.vercel.app`
- Gumroad store: `https://genticai.gumroad.com`

## 🆘 Troubleshooting

### "Permission denied (publickey)"
- Set up SSH key with GitHub: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Failed to push"
- Make sure you're using the correct repository URL
- Try using HTTPS instead of SSH: `https://github.com/...`

### Vercel deployment fails
- Check vercel.json is committed
- Verify package.json has all dependencies
- Check build logs in Vercel dashboard

### Site shows 404
- Verify vercel.json routes configuration
- Check server-landing.js is committed
- Ensure web/landing.html exists

## 📞 Need Help?

- GitHub Issues: https://github.com/YOUR_USERNAME/gentic-n8n-marketplace/issues
- Vercel Support: https://vercel.com/support
- Email: support@genticai.com

---

**Good luck with your deployment! 🚀**
