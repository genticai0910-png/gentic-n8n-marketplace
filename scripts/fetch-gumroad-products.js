#!/usr/bin/env node

/**
 * Fetch products from Gumroad and update landing page
 *
 * Usage:
 *   GUMROAD_ACCESS_TOKEN=your_token node scripts/fetch-gumroad-products.js
 *
 * Or set in .env file
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GUMROAD_ACCESS_TOKEN = process.env.GUMROAD_ACCESS_TOKEN;
const CONFIG_PATH = path.join(__dirname, '../web/site-config.json');
const LANDING_TEMPLATE_PATH = path.join(__dirname, '../web/landing-template.html');
const LANDING_OUTPUT_PATH = path.join(__dirname, '../web/landing.html');

async function fetchGumroadProducts() {
  if (!GUMROAD_ACCESS_TOKEN) {
    console.error('❌ GUMROAD_ACCESS_TOKEN not set');
    console.log('💡 Get your token from: https://app.gumroad.com/settings/advanced#application-form');
    process.exit(1);
  }

  try {
    console.log('📦 Fetching products from Gumroad...');

    const response = await fetch(
      `https://api.gumroad.com/v2/products?access_token=${GUMROAD_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Gumroad API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Gumroad API returned success: false');
    }

    console.log(`✅ Found ${data.products.length} products`);
    return data.products;
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    process.exit(1);
  }
}

function loadConfig() {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    console.log(`📋 Loaded config - Pinned product: ${config.pinnedProduct.name}`);
    return config;
  } catch (error) {
    console.error('❌ Error loading config:', error.message);
    process.exit(1);
  }
}

function formatPrice(cents) {
  return `$${(cents / 100).toFixed(0)}`;
}

function getCategoryIcon(name) {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('voice') || lowerName.includes('call')) return '📞';
  if (lowerName.includes('real estate') || lowerName.includes('deal')) return '🏠';
  if (lowerName.includes('lead') || lowerName.includes('capture')) return '🎯';
  if (lowerName.includes('appointment') || lowerName.includes('scheduler')) return '📅';
  if (lowerName.includes('content') || lowerName.includes('social')) return '✍️';
  if (lowerName.includes('email') || lowerName.includes('sequence')) return '📧';
  if (lowerName.includes('crm') || lowerName.includes('sync')) return '🔄';
  if (lowerName.includes('payment')) return '💳';
  if (lowerName.includes('healer') || lowerName.includes('monitor')) return '🩺';

  return '⚡';
}

function getCategory(name) {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('voice') || lowerName.includes('call')) return 'Voice AI';
  if (lowerName.includes('real estate') || lowerName.includes('deal')) return 'Real Estate';
  if (lowerName.includes('lead') || lowerName.includes('capture')) return 'Lead Gen';
  if (lowerName.includes('content') || lowerName.includes('social')) return 'Content';
  if (lowerName.includes('crm') || lowerName.includes('sync')) return 'CRM';
  if (lowerName.includes('healer') || lowerName.includes('monitor')) return 'Infrastructure';

  return 'Automation';
}

function generateProductCards(products, pinnedProductName) {
  // Find pinned product
  const pinnedIndex = products.findIndex(p =>
    p.name.toLowerCase().includes(pinnedProductName.toLowerCase()) ||
    p.custom_permalink?.includes(pinnedProductName.toLowerCase())
  );

  let sortedProducts = [...products];

  // Move pinned to front if found
  if (pinnedIndex !== -1) {
    const [pinned] = sortedProducts.splice(pinnedIndex, 1);
    sortedProducts.unshift(pinned);
    console.log(`📌 Pinned product: ${pinned.name}`);
  }

  // Take first 10 products
  sortedProducts = sortedProducts.slice(0, 10);

  return sortedProducts.map((product, index) => {
    const isPinned = index === 0 && pinnedIndex !== -1;
    const icon = getCategoryIcon(product.name);
    const category = getCategory(product.name);
    const price = formatPrice(product.price);
    const permalink = product.custom_permalink || product.short_url;

    return `        <div class="template-card${isPinned ? ' featured' : ''}" data-category="${category}">
          <div class="template-icon">${icon}</div>
          <h3>${product.name}</h3>
          <p class="template-description">${product.short_description || product.description?.substring(0, 120) + '...' || 'Production-ready n8n automation template'}</p>
          <div class="template-meta">
            <span class="template-category">${category}</span>
            <span class="template-price">${price}</span>
          </div>
          <a href="${permalink}" target="_blank" class="template-cta" style="display: block; text-align: center; text-decoration: none;">Get Template</a>
        </div>`;
  }).join('\n');
}

async function updateLandingPage(products, config) {
  console.log('📝 Generating landing page...');

  const currentLanding = fs.readFileSync(LANDING_OUTPUT_PATH, 'utf8');

  // Generate new product cards
  const productCards = generateProductCards(products, config.pinnedProduct.name);

  // Replace the templates section by finding matching closing div
  const templatesStart = currentLanding.indexOf('<div class="templates-grid">');

  if (templatesStart === -1) {
    console.error('❌ Could not find templates grid in landing.html');
    process.exit(1);
  }

  // Find the matching closing </div> by counting nested divs
  let depth = 0;
  let pos = templatesStart;
  let templatesEnd = -1;

  while (pos < currentLanding.length) {
    const nextOpen = currentLanding.indexOf('<div', pos);
    const nextClose = currentLanding.indexOf('</div>', pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      if (depth === 0) {
        templatesEnd = nextClose + 6;
        break;
      }
      depth--;
      pos = nextClose + 6;
    }
  }

  if (templatesEnd === -1) {
    console.error('❌ Could not find closing div for templates grid');
    process.exit(1);
  }

  const newLanding =
    currentLanding.substring(0, templatesStart) +
    `<div class="templates-grid">\n${productCards}\n      </div>` +
    currentLanding.substring(templatesEnd);

  fs.writeFileSync(LANDING_OUTPUT_PATH, newLanding, 'utf8');
  console.log('✅ Landing page updated');
}

async function main() {
  console.log('🚀 Gumroad Product Sync\n');

  const config = loadConfig();
  const products = await fetchGumroadProducts();
  await updateLandingPage(products, config);

  console.log('\n✨ Done! Landing page updated with latest products.');
  console.log(`📌 Pinned: ${config.pinnedProduct.name}`);
}

main();
