# Existing API & Route Map
**Date:** 2026-11-06  

---

## 1. WordPress REST API Endpoints (Backend)

| Endpoint | Method | Namespace | Public / Auth | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/wp-json/wp/v2/posts` | GET | `wp/v2` | Public | **HTTP 200** (45 articles) |
| `/wp-json/wp/v2/categories` | GET | `wp/v2` | Public | **HTTP 200** |
| `/wp-json/wp/v2/users` | GET | `wp/v2` | Public | **HTTP 200** (Ashish Kumar ID: 2) |
| `/wp-json/wp/v2/pages` | GET | `wp/v2` | Public | **HTTP 200** |
| `/wp-json/wc/store/v1/products` | GET | `wc/store/v1` | Public | **HTTP 200** |
| `/wp-json/wc/store/v1/cart` | GET/POST | `wc/store/v1` | Public / Session | **HTTP 200** |
| `/wp-json/wc/v3/products` | GET/POST | `wc/v3` | Authenticated | **HTTP 401** (Requires Consumer Key/Secret) |
| `/wp-json/wc/v3/orders` | POST | `wc/v3` | Authenticated | **HTTP 401** (Requires Consumer Key/Secret) |
| `/wp-json/rankmath/v1` | GET | `rankmath/v1` | Public | **HTTP 200** |

---

## 2. Next.js Internal Routes & API Endpoints (Frontend)

| Route / Endpoint | Type | Description |
| :--- | :--- | :--- |
| `/` | Page (SSR + ISR) | Homepage featuring Hero, Featured Articles, Dynamic Digital Products, and Tools. |
| `/blog` | Page (SSR + ISR) | Searchable article listing. |
| `/blog/[slug]` | Page (SSR + ISR) | Single article page with Table of Contents and Agency Consultation CTA. |
| `/products` | Page (SSR + ISR) | Digital store product catalog with live search, filters, and Add to Cart. |
| `/products/[slug]` | Page (SSR + ISR) | Single digital product specifications and buy options. |
| `/store` | Redirect | 301 alias to `/products`. |
| `/product/[slug]` | Redirect | 301 alias to `/products/[slug]`. |
| `/cart` | Client Page | Headless shopping cart with coupon calculation (`noindex`). |
| `/checkout` | Client Page | Secure billing intake form (`noindex`). |
| `/order-confirmation` | Client Page | Post-checkout confirmation and reference generator (`noindex`). |
| `/tools/*` | Pages | 6 free webmaster & calculation tools. |
| `/sitemap.xml` | Route Handler | Valid dynamic XML sitemap. |
| `/robots.txt` | Route Handler | Content-Signal & crawler guidance. |
| `/api/checkout/create-order` | API Route (POST) | Server-side order creation route with WooCommerce fallback. |
| `/api/revalidate` | API Route (GET/POST)| Webhook cache invalidation endpoint (`tag=products`). |
