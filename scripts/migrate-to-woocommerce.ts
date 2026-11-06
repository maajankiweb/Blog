/**
 * Programmatic Migration Script: Next.js Mock Products → WordPress WooCommerce REST API
 * 
 * Usage:
 * npx tsx scripts/migrate-to-woocommerce.ts
 * 
 * Requirements:
 * WC_CONSUMER_KEY & WC_CONSUMER_SECRET in .env.local
 */

import fs from "fs";
import path from "path";

const WORDPRESS_URL = process.env.WORDPRESS_SITE_URL || "https://cms.maajankiwebtech.com";
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

interface MigrationResult {
  successful: Array<{ id?: number; name: string; slug: string; status: string }>;
  failed: Array<{ name: string; slug: string; error: string }>;
  skipped: Array<{ name: string; slug: string; reason: string }>;
}

async function migrate() {
  console.log("🚀 Starting WooCommerce Product Migration from Next.js catalog...");
  console.log(`Target WordPress Endpoint: ${WORDPRESS_URL}`);

  const payloadPath = path.join(process.cwd(), "src/data/migrated_products_payload.json");
  if (!fs.existsSync(payloadPath)) {
    console.error("❌ Migration payload not found at:", payloadPath);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
  console.log(`📦 Loaded ${products.length} products to migrate.`);

  if (!WC_KEY || !WC_SECRET) {
    console.warn("\n⚠️  No WC_CONSUMER_KEY and WC_CONSUMER_SECRET found in environment.");
    console.log("ℹ️  You can import products without API keys using the generated CSV file:");
    console.log(`   File location: public/woocommerce_products_import.csv`);
    console.log("   Steps:");
    console.log("   1. Open WordPress Admin: https://cms.maajankiwebtech.com/wp-admin");
    console.log("   2. Go to Products → All Products → Click 'Import' at the top");
    console.log("   3. Select 'public/woocommerce_products_import.csv' and click 'Continue'");
    console.log("   4. WooCommerce will map fields and import all 13 products in 1 click!\n");
    return;
  }

  const authHeader = "Basic " + Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
  const result: MigrationResult = { successful: [], failed: [], skipped: [] };

  for (const product of products) {
    try {
      console.log(`\n⏳ Checking product: "${product.name}" (${product.slug})...`);

      // Check if product already exists by slug
      const checkRes = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products?slug=${encodeURIComponent(product.slug)}`, {
        headers: { Authorization: authHeader },
      });

      if (checkRes.ok) {
        const existing = await checkRes.json();
        if (Array.isArray(existing) && existing.length > 0) {
          console.log(`⏩ Product already exists (ID: ${existing[0].id}). Skipping.`);
          result.skipped.push({ name: product.name, slug: product.slug, reason: "Already exists in WooCommerce" });
          continue;
        }
      }

      // Create product in WooCommerce
      const createRes = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          slug: product.slug,
          type: "simple",
          virtual: true,
          downloadable: true,
          status: "publish",
          featured: product.featured,
          catalog_visibility: "visible",
          regular_price: String(product.regular_price),
          sale_price: String(product.sale_price || ""),
          short_description: product.short_description,
          description: product.description,
          sku: product.sku,
          images: product.images,
          categories: product.categories,
          tags: product.tags,
          meta_data: product.meta_data,
        }),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`HTTP ${createRes.status}: ${errText}`);
      }

      const created = await createRes.json();
      console.log(`✅ Successfully created WooCommerce Product ID: ${created.id}`);
      result.successful.push({ id: created.id, name: product.name, slug: product.slug, status: "created" });
    } catch (err: any) {
      console.error(`❌ Failed migrating "${product.name}":`, err.message);
      result.failed.push({ name: product.name, slug: product.slug, error: err.message });
    }
  }

  console.log("\n================ MIGRATION REPORT ================");
  console.log(`Total Records: ${products.length}`);
  console.log(`Successful:    ${result.successful.length}`);
  console.log(`Skipped:       ${result.skipped.length}`);
  console.log(`Failed:        ${result.failed.length}`);
  console.log("==================================================");
}

migrate().catch(console.error);
