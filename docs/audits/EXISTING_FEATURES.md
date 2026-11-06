# Existing Features & Capabilities Matrix
**Website:** `https://blog.maajankiwebtech.com/`  
**CMS Backend:** `https://cms.maajankiwebtech.com/` (WordPress 6.x Headless + WooCommerce + Rank Math)  
**Date:** 2026-11-06  

---

## 1. Content & Publishing Features (Live & Operational)
- **45 Published Articles** dynamically fetched from `/wp-json/wp/v2/posts`.
- **Dynamic Routing:** `/blog` (archive), `/blog/[slug]` (single post with reading progress bar, table of contents, and comment display).
- **Author Identity:** Standardized to **Ashish Kumar** (Founder & Technical Lead, Maajanki Web Tech LLP) with valid `Person` and `Organization` schema.
- **Search & Filtering:** Real-time search autocomplete and category browsing.
- **Interactive Tools:**
  - `/tools/website-cost-calculator`
  - `/tools/gst-invoice-generator`
  - `/tools/meta-tag-generator`
  - `/tools/json-formatter`
  - `/tools/ai-headline-generator`
  - `/tools/ai-schema-generator`

---

## 2. Digital Commerce & Storefront Features
- **Storefront Catalog:** `/products` (and `/store` alias) featuring 13 digital products, category pills (`Templates`, `Plugins`, `AI Tools`, `Ebooks`), live keyword search, and price/popularity sorting.
- **Product Detail Pages:** `/products/[slug]` (and `/product/[slug]` alias) featuring multi-image gallery, real-time discount calculation, value propositions, technical specifications table, related products, and Schema.org `Product` & `Offer` JSON-LD.
- **Global Shopping Cart:** `CartProvider` (`src/context/CartContext.tsx`) with browser `localStorage` persistence, responsive cart icon in navbar with dynamic item counter badge.
- **Dedicated Cart Page (`/cart`):** Line items, quantity changers, coupon validation (`MAAJANKI10` for 10% discount), subtotal calculation, and direct checkout buttons.
- **Secure Checkout Page (`/checkout`):** Billing form (Name, Email, WhatsApp Phone, Company, Notes) routing to `/api/checkout/create-order` with instant UPI/WhatsApp fallback.
- **Order Confirmation Page (`/order-confirmation`):** Order reference display with digital download email instructions.

---

## 3. SEO & Crawling Infrastructure
- **XML Sitemap:** Dynamic `/sitemap.xml` automatically indexing all 45 articles, 13 WooCommerce digital products, and free tools.
- **Robots.txt:** Configured with `Content-Signal: search=yes, ai-train=no` and explicit `noindex` rules protecting private `/cart` and `/checkout` paths.
- **Rank Math Integration:** Connected via Next.js server-side `generateMetadata()`.
- **Cache Invalidation:** `/api/revalidate?secret=...&tag=products` listener for on-demand ISR cache clearing.
