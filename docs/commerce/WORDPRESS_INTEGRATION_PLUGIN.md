# Maajanki Headless Commerce WordPress Plugin Documentation
**Plugin Directory:** `public/maajanki-headless-commerce/`  
**File:** `maajanki-headless-commerce.php`  
**Namespace:** `/wp-json/maajanki/v1/`  
**Author:** Ashish Kumar (Maajanki Web Tech LLP)  
**Date:** 2026-11-06  

---

## 1. What This Plugin Does
This custom WordPress plugin serves as the secure enterprise bridge between your **WordPress CMS** (`https://cms.maajankiwebtech.com/`) and your **Next.js Frontend** (`https://blog.maajankiwebtech.com/`).

### Core Responsibilities:
1. **Authoritative Order Creation (`POST /wp-json/maajanki/v1/checkout/orders`):**
   - Receives product IDs and customer details from Next.js.
   - **Never trusts client-supplied prices**: It looks up the live database price in WooCommerce and recalculates the exact total server-side.
   - Generates a WooCommerce pending order.
2. **HMAC SHA-256 Authentication & Anti-Replay Security:**
   - Validates `x-maajanki-signature` and `x-maajanki-timestamp`.
   - Blocks any request older than 300 seconds (5 minutes) to defeat replay attacks.
3. **Verified Order Completion (`POST /wp-json/maajanki/v1/checkout/orders/{id}/complete`):**
   - Invoked only after Next.js verifies the Razorpay payment signature via HMAC SHA-256.
   - Marks the WooCommerce order as `completed` and grants digital download permissions idempotently.
4. **Automated Cache Invalidation:**
   - Whenever you save or publish a post or digital product in WordPress, the plugin fires an asynchronous background ping to `https://blog.maajankiwebtech.com/api/revalidate?tag=products` to instantly clear the Next.js cache.

---

## 2. Installation Instructions (WordPress Admin)

1. **Option A: Upload via WP Admin:**
   - Zip the `maajanki-headless-commerce` folder.
   - Go to `https://cms.maajankiwebtech.com/wp-admin/` &rarr; **Plugins** &rarr; **Add New Plugin** &rarr; **Upload Plugin**.
   - Select the zip file and click **Install Now** &rarr; **Activate Plugin**.
2. **Option B: FTP / Hostinger File Manager:**
   - Upload the folder to: `wp-content/plugins/maajanki-headless-commerce/`.
   - Go to **Plugins** &rarr; **Installed Plugins** &rarr; Activate **Maajanki Headless Commerce Integration**.
3. **Configure Shared Secret:**
   - In WP Admin, navigate to **Settings** &rarr; **Headless Commerce**.
   - Set an **Integration Secret (HMAC)** (e.g. a strong random 32-character string).
   - Set the identical key in your Next.js `.env.local` as `WORDPRESS_INTEGRATION_SECRET`.

---

## 3. REST API Endpoint Reference

| Endpoint | Method | Purpose | Authentication |
| :--- | :--- | :--- | :--- |
| `/wp-json/maajanki/v1/checkout/orders` | POST | Create order with authoritative prices | HMAC SHA-256 Signature |
| `/wp-json/maajanki/v1/checkout/orders/{id}/complete` | POST | Complete order after verified payment | HMAC SHA-256 Signature |
| `/wp-json/maajanki/v1/orders/{id}` | GET | Retrieve order status & download URLs | HMAC SHA-256 Signature |
