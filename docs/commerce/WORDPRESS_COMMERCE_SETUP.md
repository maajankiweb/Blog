# WordPress & WooCommerce Commerce Setup Guide
**Project:** Headless Digital Commerce Platform  
**Target Platform:** `https://blog.maajankiwebtech.com/`  
**CMS Backend:** `https://cms.maajankiwebtech.com/` (WordPress 6.x)  
**Company:** Maajanki Web Tech LLP (Bagaha, West Champaran, Bihar, India)  
**Date:** 2026-11-06  

---

## 1. WooCommerce General Configuration (India Digital Commerce)

In your WordPress Admin (`https://cms.maajankiwebtech.com/wp-admin/`):

1. **General Store Settings (`WooCommerce -> Settings -> General`):**
   - **Store Address:** Bagaha, West Champaran, Bihar, PIN: 845105, India.
   - **Selling Locations:** Sell to all countries (or Sell to specific countries: India + International).
   - **Shipping Location(s):** **Disable shipping & shipping calculations** (All products are digital/virtual).
   - **Enable Taxes:** Check only if GST registered. (Consult your CA before enabling automated tax collection).
   - **Currency Options:**
     - **Currency:** Indian Rupee (`₹` / `INR`).
     - **Currency Position:** Left (`₹1,999`).
     - **Thousand Separator:** `,`
     - **Decimal Separator:** `.`
     - **Number of Decimals:** `0` (or `2`).

2. **Digital & Downloadable Products Settings (`WooCommerce -> Settings -> Products -> Downloadable Products`):**
   - **File Download Method:** `Force Downloads` (Safest cross-platform option) or `X-Accel-Redirect/X-Sendfile` (if configured on Hostinger Nginx/LiteSpeed).
   - **Access Restriction:**
     - Check **"Downloads require login"** (Uncheck for seamless guest downloads via email link).
     - Check **"Grant access to downloadable products after payment"** (Ensures immediate access once payment is confirmed).
     - Check **"Append a unique string to filename for security"** (Prevents direct URL guessing).

---

## 2. Standardized Digital Product Categories

Create these 5 primary product categories in **Products -> Categories**:

| Category Name | Slug | Description |
| :--- | :--- | :--- |
| **eBooks & PDF Guides** | `ebooks-pdf-guides` | Technical SEO playbooks, marketing guides, checklists. |
| **Website Templates** | `website-templates` | Next.js 16 starter kits, Tailwind CSS HTML landing pages. |
| **WordPress Themes & Plugins** | `wordpress-themes-plugins` | Custom agency themes, GST invoicing plugins, tool plugins. |
| **Source Code & UI Kits** | `source-code-ui-kits` | Full-stack application scripts, design systems. |
| **Digital Courses** | `digital-courses` | Downloadable video lessons, curriculum materials. |

---

## 3. Creating a Digital Product in WordPress Admin

When creating a new digital product (**Products -> Add New**):

1. Set **Product Name** & **Description**.
2. In **Product Data** (dropdown):
   - Select **Simple product**.
   - Check **Virtual** (Removes shipping step at checkout).
   - Check **Downloadable** (Enables secure file attachments).
3. Under the **General** tab:
   - **Regular Price (INR):** e.g., `4999`
   - **Sale Price (INR):** e.g., `2499`
   - **Downloadable Files:** Click **Add File** &rarr; Upload ZIP or PDF to media library.
   - **Download Limit:** Leave blank for unlimited, or set limit (e.g. `5`).
   - **Download Expiry:** Set expiry days (e.g. `365`).
4. In **Rank Math SEO** box (below content):
   - Enter **SEO Title**, **Meta Description**, and **Focus Keyword**.
5. Click **Publish**.

The product automatically becomes available on Next.js (`/products` and `/store`) with zero code modification.
