# WordPress CMS Setup & Administrative Guide
**Platform:** Headless WordPress Content & Digital E-Commerce Platform  
**Frontend URL:** `https://blog.maajankiwebtech.com/`  
**WordPress Admin URL:** `https://cms.maajankiwebtech.com/wp-admin/`  
**Company:** Maajanki Web Tech LLP (Bagaha, Bihar, India)  
**Date:** 2026-11-06  

---

## 1. Golden Rule: Manage Everything in WordPress

You do not need to touch Next.js code for routine publishing, pricing changes, or SEO updates. All data flows from WordPress into the Next.js frontend via server-side cached APIs.

---

## 2. Managing Blog Articles

1. **Add / Edit Article:**
   - In WordPress Admin, navigate to **Posts** &rarr; **Add New Post**.
   - Enter your Title, rich text content, and headings (H2, H3).
2. **SEO Settings (Rank Math):**
   - Scroll down to the **Rank Math** meta box.
   - Enter your **SEO Title**, **Meta Description**, and **Focus Keyword**.
3. **Author Attribution:**
   - Set the post Author to **Ashish Kumar** to enforce high E-E-A-T trust signals.
4. **Publish:**
   - Click **Publish**. Within seconds, your article appears live at `https://blog.maajankiwebtech.com/blog/[slug]` with valid Schema.org markup.

---

## 3. Managing Digital Products & Pricing

1. **Add / Edit Digital Product:**
   - Navigate to **Products** &rarr; **Add New**.
   - Enter **Product Name**, **Short Description**, and **Full Description**.
2. **Product Data Settings:**
   - **Type:** Simple Product.
   - Check **Virtual** (disables shipping).
   - Check **Downloadable** (enables digital file delivery).
   - **Regular Price:** Set normal price in INR (e.g., `4999`).
   - **Sale Price:** Set promotional price in INR (e.g., `2499`).
3. **Attach Downloadable Files:**
   - In the **General** tab, click **Add File**.
   - Upload your ZIP package, PDF ebook, or template file.
   - Set **Download Limit** (e.g., `5` or leave blank for unlimited).
   - Set **Download Expiry** (e.g., `365` days).
4. **Category & SEO:**
   - Select Category (e.g., `Templates`, `Plugins`, `AI Tools`, `Ebooks`).
   - Fill in the Rank Math snippet.
5. **Publish:**
   - Click **Publish**. The product will immediately appear on `https://blog.maajankiwebtech.com/products` and `https://blog.maajankiwebtech.com/store`.

---

## 4. Managing Coupons & Discounts

1. In WordPress Admin, navigate to **Marketing** &rarr; **Coupons**.
2. Click **Add Coupon** (e.g., `MAAJANKI10` or a seasonal code).
3. Set discount type (Percentage or Fixed Cart Discount).
4. When shoppers enter this coupon code on `https://blog.maajankiwebtech.com/cart`, the discount is calculated immediately.

---

## 5. Controlling Homepage Content from WordPress (Optional)

If you wish to override the homepage hero headline, description, or CTAs directly from WordPress without code:
1. Navigate to **Pages** &rarr; **Add New Page**.
2. Title: `Home Settings`
3. Slug: `home-settings`
4. In the page excerpt or body, enter your preferred headline and description.
5. Publish the page. Next.js reads this page via ISR and updates the homepage hero automatically!

---

## 6. Real-Time Cache Invalidation Webhooks

Whenever you publish or update a post or product, you can trigger instant cache purges on Next.js:
- **Webhook Delivery URL:** `https://blog.maajankiwebtech.com/api/revalidate?secret=maajanki-revalidate-secret&tag=products`
- **Topic:** `Product created` / `Product updated` / `Post updated`
