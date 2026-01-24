# Gumroad Packaging Guide — ZIP Integration

All 9 products are now packaged as ZIP files ready for immediate Gumroad upload.

---

## Available Packages

### Horizontal Workflows (n8n Automation Templates)

| Product | ZIP File | Size | Price | Status |
|---------|----------|------|-------|--------|
| Lead Capture Kit (Basic) | `lead-capture-kit-basic-gumroad.zip` | 3.0 KB | $12 | ✓ Ready |
| Voice Agent Qualifier (Premium) | `voice-agent-qualifier-premium-gumroad.zip` | 4.8 KB | $37 | ✓ Ready |
| Deal Analyzer System (VIP) | `deal-analyzer-system-vip-gumroad.zip` | 3.1 KB | $77 | ✓ Ready |

### Vertical Content Packs (Social Media Content)

| Product | ZIP File | Size | Price | Status |
|---------|----------|------|-------|--------|
| Real Estate Agent (Starter) | `real-estate-agent-content-starter-gumroad.zip` | 4.5 KB | $12 | ✓ Ready |
| Fitness Coach (Pro) | `fitness-coach-content-pro-gumroad.zip` | 5.9 KB | $37 | ✓ Ready |
| SaaS Founder (Complete) | `saas-founder-content-complete-gumroad.zip` | 11 KB | $77 | ✓ Ready |
| Ecommerce Store (Starter) | `ecommerce-store-content-starter-gumroad.zip` | 4.4 KB | $12 | ✓ Ready |
| Restaurant Owner (Pro) | `restaurant-owner-content-pro-gumroad.zip` | 6.0 KB | $37 | ✓ Ready |
| Mortgage Broker (Complete) | `mortgage-broker-content-complete-gumroad.zip` | 7.3 KB | $77 | ✓ Ready |

**Total: 9 products packaged and ready**

---

## Automatic ZIP Generation

The SKU generator now includes automatic ZIP packaging with the `--zip` flag.

### Usage Examples

**Generate new product with automatic packaging:**
```bash
python generate_sku.py --name "dentist" --type content --tier vip --zip
```

**Output:**
```
[OK] Created content SKU: skus\dentist-content-complete

[ZIP] Package created: skus\dentist-content-complete-gumroad.zip
[ZIP] Size: 7.2 KB
[ZIP] Ready for Gumroad upload!

[PACKAGE] SKU generated at: skus\dentist-content-complete
[PRICE] Suggested price: $77

[SUCCESS] Product ready for Gumroad!
[STEPS] Next steps:
   1. Fill in TODO placeholders in dentist-content-complete/
   2. Re-run with --zip to update package
   3. Upload dentist-content-complete-gumroad.zip to Gumroad.com
```

---

## Workflow: From Generation to Launch

### 1. Generate SKU with Auto-Zip
```bash
cd C:\Users\jga07\.claude\skills\gumroad-template-factory\scripts

# Generate horizontal workflow
python generate_sku.py \
  --name "email-sequence-engine" \
  --type horizontal \
  --tier premium \
  --output "C:\Users\jga07\Projects\auto-claude-demo\gumroad-catalog" \
  --zip

# Generate content pack
python generate_sku.py \
  --name "chiropractor" \
  --type content \
  --tier vip \
  --output "C:\Users\jga07\Projects\auto-claude-demo\gumroad-catalog" \
  --zip
```

### 2. Fill Content
Edit the generated files to replace TODO placeholders:
- Write actual hooks in `prompts/viral-hooks.md`
- Add real content ideas in `prompts/content-ideas.md`
- Write scripts in `templates/avatar-scripts/`
- Complete the Gumroad listing copy
- Add screenshots/demos

### 3. Re-package After Edits
```bash
# Re-run with --zip to update the package
python generate_sku.py \
  --name "chiropractor" \
  --type content \
  --tier vip \
  --output "C:\Users\jga07\Projects\auto-claude-demo\gumroad-catalog" \
  --zip
```

### 4. Upload to Gumroad
1. Go to gumroad.com/products/new
2. Upload the `-gumroad.zip` file
3. Copy/paste listing copy from `docs/GUMROAD_LISTING.md`
4. Set price (already suggested in output)
5. Add cover image (optional but recommended)
6. Publish!

---

## Manual ZIP Creation (Alternative)

If you need to create ZIPs manually:

**Windows (PowerShell):**
```powershell
Compress-Archive -Path ".\product-name-tier" -DestinationPath ".\product-name-tier-gumroad.zip" -Force
```

**Windows (Command Prompt with 7-Zip):**
```cmd
7z a product-name-tier-gumroad.zip product-name-tier\
```

**Linux/Mac:**
```bash
zip -r product-name-tier-gumroad.zip product-name-tier/
```

**Python (from anywhere):**
```python
import shutil
from pathlib import Path

sku_dir = Path("path/to/product-name-tier")
shutil.make_archive(
    str(sku_dir.parent / f"{sku_dir.name}-gumroad"),
    'zip',
    root_dir=sku_dir.parent,
    base_dir=sku_dir.name
)
```

---

## ZIP Contents

Each ZIP includes everything a buyer needs:

**Horizontal Workflows:**
```
product-name-tier/
├── workflow.json           # Import into n8n
├── CONFIG.template.json    # Customizable settings
├── README.md               # Setup instructions
├── payloads/               # Test webhooks
│   ├── test-basic.json
│   ├── test-complete.json
│   └── test-invalid.json
└── docs/
    └── GUMROAD_LISTING.md  # (for your reference)
```

**Vertical Content Packs:**
```
niche-content-tier/
├── CONFIG.niche.json       # Platform configs
├── prompts/
│   ├── viral-hooks.md      # 10 or 50 hooks
│   └── content-ideas.md    # 10 or 50 ideas
├── templates/
│   ├── captions/           # All platforms
│   ├── hashtags/           # (Pro/Complete)
│   └── avatar-scripts/     # (Pro/Complete)
├── schedules/              # (Pro/Complete)
│   ├── posting-calendar.md
│   └── 30-day-plan.md      # (Complete only)
├── analytics/              # (Complete only)
│   └── dashboard-template.json
└── docs/
    ├── SETUP.md
    ├── PLAYBOOK.md         # (Complete only)
    └── GUMROAD_LISTING.md  # (for your reference)
```

---

## Best Practices

### ✅ DO

- **Generate with --zip from the start** - Faster workflow
- **Re-run with --zip after edits** - Updates the package
- **Test ZIP contents** - Extract and verify files before upload
- **Keep source directories** - Never delete the unzipped folders
- **Version control** - Git commit SKU folders, ignore ZIPs

### ❌ DON'T

- **Don't edit inside ZIPs** - Always edit source folders, then re-zip
- **Don't include .git folders** - The script excludes them automatically
- **Don't upload incomplete products** - Fill TODOs first
- **Don't forget screenshots** - Add to docs/ before zipping
- **Don't skip testing** - Import workflow or try templates before selling

---

## Gumroad Upload Checklist

Before uploading each ZIP:

- [ ] All TODO placeholders filled
- [ ] Screenshots added to docs/
- [ ] Gumroad listing copy reviewed
- [ ] Test payloads validated (horizontal) or scripts tested (vertical)
- [ ] Price matches tier recommendation
- [ ] README.md has clear setup instructions
- [ ] ZIP file under 50 MB (Gumroad limit)

---

## Bulk Operations

### Create ZIPs for all existing SKUs
```bash
cd C:\Users\jga07\Projects\auto-claude-demo\gumroad-catalog

# Windows PowerShell
Get-ChildItem -Directory | Where-Object { $_.Name -notlike "*gumroad*" } | ForEach-Object {
    Compress-Archive -Path $_.FullName -DestinationPath "$($_.Name)-gumroad.zip" -Force
    Write-Host "[ZIP] Created $($_.Name)-gumroad.zip"
}

# Linux/Mac
for dir in */; do
    if [[ ! "$dir" =~ gumroad ]]; then
        zip -r "${dir%/}-gumroad.zip" "$dir"
        echo "[ZIP] Created ${dir%/}-gumroad.zip"
    fi
done
```

### Update all ZIPs after batch edits
Same commands as above - will overwrite existing ZIPs with updated content.

---

## File Sizes

Typical ZIP sizes by tier:

| Tier | Horizontal | Vertical (Content Pack) |
|------|------------|-------------------------|
| Basic/Starter | 2-4 KB | 4-5 KB |
| Premium/Pro | 4-6 KB | 5-7 KB |
| VIP/Complete | 3-5 KB | 7-12 KB |

These are skeleton files with TODOs. After filling content:

| Tier | Expected Final Size |
|------|---------------------|
| Basic/Starter | 10-50 KB |
| Premium/Pro | 50-200 KB |
| VIP/Complete | 200-500 KB |

All well within Gumroad's 50 MB upload limit.

---

## Quick Reference

**Generate new product with ZIP:**
```bash
python generate_sku.py --name "PRODUCT" --type [horizontal|content] --tier [basic|premium|vip] --zip
```

**Update ZIP after edits:**
```bash
python generate_sku.py --name "PRODUCT" --type [horizontal|content] --tier [basic|premium|vip] --zip
```

**Manual ZIP (if needed):**
```bash
# PowerShell
Compress-Archive -Path ".\product-name-tier" -DestinationPath ".\product-name-tier-gumroad.zip" -Force

# Bash
zip -r product-name-tier-gumroad.zip product-name-tier/
```

**Upload to Gumroad:**
1. gumroad.com/products/new
2. Upload ZIP
3. Copy listing from docs/GUMROAD_LISTING.md
4. Set price and publish

---

## Integration Complete

✅ **All 9 products now have Gumroad-ready ZIP packages**
✅ **New products automatically generate ZIPs with --zip flag**
✅ **Re-running with --zip updates existing packages**
✅ **No manual zip commands needed**

The Gumroad Template Factory now handles complete end-to-end packaging from generation to upload.

---

**Next Steps:**
1. Fill TODO placeholders in 2-3 products
2. Add screenshots and demos
3. Upload ZIPs to Gumroad
4. Launch and track conversions

Start with the two optimized products:
- [voice-agent-qualifier-premium-gumroad.zip](./voice-agent-qualifier-premium-gumroad.zip)
- [saas-founder-content-complete-gumroad.zip](./saas-founder-content-complete-gumroad.zip)
