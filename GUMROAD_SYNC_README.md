# Gumroad Product Auto-Sync

Automatically update your landing page with the latest products from Gumroad.

## Setup

### 1. Get Your Gumroad API Token

1. Go to https://app.gumroad.com/settings/advanced#application-form
2. Create an application (name it anything, like "Product Sync")
3. Copy your access token
4. Add it to `.env`:

```bash
cp .env.example .env
# Edit .env and add your token
```

### 2. Configure Pinned Product

Edit `web/site-config.json` to set which product should be featured first:

```json
{
  "pinnedProduct": {
    "name": "n8n-healer",
    "title": "n8n Healer",
    "description": "Production-ready n8n workflow monitoring and auto-healing system"
  }
}
```

The `name` field will match against product names or permalinks.

### 3. Run the Sync

```bash
npm run sync-products
```

This will:
- Fetch all products from Gumroad API
- Pin the configured product to the top
- Update `web/landing.html` with latest products
- Auto-generate categories and icons

### 4. Deploy

Commit and push:

```bash
git add web/landing.html
git commit -m "Update products from Gumroad"
git push
```

Vercel will auto-deploy.

## Automation

### Option 1: Manual (Recommended)

Run `npm run sync-products` whenever you add/update products.

### Option 2: GitHub Action (Auto-sync daily)

Create `.github/workflows/sync-products.yml`:

```yaml
name: Sync Gumroad Products

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run sync-products
        env:
          GUMROAD_ACCESS_TOKEN: ${{ secrets.GUMROAD_ACCESS_TOKEN }}
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "Auto-sync products from Gumroad"
```

Then add `GUMROAD_ACCESS_TOKEN` to GitHub Secrets.

### Option 3: Vercel Build Hook

Add to `package.json`:

```json
{
  "scripts": {
    "build": "npm run sync-products"
  }
}
```

This runs on every Vercel deploy.

## Product Display

Products are automatically:
- **Categorized** by name (Real Estate, Voice AI, Lead Gen, etc.)
- **Iconified** with emoji based on category
- **Priced** from Gumroad API
- **Linked** to purchase page

The pinned product gets:
- ✨ RECOMMENDED badge
- First position in grid
- Highlighted styling
