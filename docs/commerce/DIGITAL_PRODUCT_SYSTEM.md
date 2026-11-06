# Digital Product System & Headless Commerce Integration
**Website:** `https://blog.maajankiwebtech.com/`  
**CMS Backend:** `https://cms.maajankiwebtech.com/` (WordPress Headless + WooCommerce)  
**Main Entity:** Maajanki Web Tech LLP (Founder: Ashish Kumar | Bagaha, Bihar)  
**Date:** 2026-11-06  

---

## 1. Digital Commerce Architecture Overview

The digital commerce system operates as a unified headless pipeline:
1. **WordPress Admin (`/wp-admin`)**: Single source of truth for creating and updating products, setting pricing, discounts, uploading downloadable files, managing SKUs, categories, and Rank Math SEO metadata.
2. **Next.js Storefront Frontend**:
   - `/products` & `/store`: Interactive product catalog with live search, category pills, price sorting, and instant cart additions.
   - `/products/[slug]`: Deep-dive product specification pages with multi-image gallery, value props, real-time discount calculation, and Schema.org Product/Offer JSON-LD.
   - `/cart`: Full headless shopping cart with coupon support (`MAAJANKI10`), quantity management, and subtotal calculation.
   - `/checkout`: Secure checkout experience supporting both direct order creation (`/api/checkout/create-order`) and instant UPI/WhatsApp fulfillment.
   - `/order-confirmation`: Transparent purchase reference display with download access instructions.

---

## 2. Implemented Routes & Capabilities

| Route | Purpose | Key Feature |
| :--- | :--- | :--- |
| `/store` | Store Directory | 301 alias redirecting cleanly to `/products`. |
| `/products` | Storefront Catalog | Live instant search, category filters, "Add to Cart", and "Buy Now". |
| `/product/[slug]` | Legacy Singular Alias | URL alias pointing to `/products/[slug]`. |
| `/products/[slug]` | Product Detail Page | Gallery, specifications table, related products, Schema.org JSON-LD. |
| `/cart` | Headless Shopping Cart | LocalStorage persistence, coupon validation, dynamic total calculation. |
| `/checkout` | Headless Checkout | Secure customer intake, server-side order routing, UPI/WhatsApp fallback. |
| `/order-confirmation` | Order Complete Screen | Order reference token display and download instructions. |
| `/api/checkout/create-order` | Server-Side Order API | Secure order creation with authenticated WooCommerce backend fallback. |

---

## 3. Digital File Security & Download Protection

- **No Public Predictable URLs**: Downloadable file paths are not exposed publicly in client bundles.
- **WooCommerce Permissions**: When downloadable files are attached to products in WordPress, WooCommerce manages file access permissions and download limits.
- **Fulfillment Path**: After payment verification, customers receive their authenticated download link directly via email and order confirmation token.

---

## 4. Payment Gateway Readiness (Razorpay & UPI)

The checkout architecture is ready for server-side Indian payment gateway processing:
- **Environment Variables Prepared**:
  ```bash
  RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxx"
  RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxx"
  ```
- **Failsafe Delivery**: When live automated gateway credentials are not yet configured, the system provides a high-converting instant **UPI / WhatsApp Direct Checkout** flow connecting directly to `+91-9006543913`, ensuring zero lost sales during configuration transitions.
