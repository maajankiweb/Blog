# Risks & Dependencies Register
**Date:** 2026-11-06  

---

## 1. Technical Dependencies

| Dependency | Purpose | Requirement |
| :--- | :--- | :--- |
| **WooCommerce REST API** | Store & Cart Operations | Public Store API active; Admin API requires Consumer Key/Secret for order updates. |
| **Rank Math SEO** | Content & Product Metadata | WordPress plugin active; metadata exposed via REST API. |
| **Hostinger LiteSpeed Cache** | WordPress Server Cache | Must bypass caching for `/wp-json/wc/*` and `/wp-json/maajanki/*`. |
| **Razorpay API Keys** | Payment Processing | Requires `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`. Must remain in Test Mode initially. |

---

## 2. Risk Mitigation Matrix

| Risk ID | Potential Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **RSK-01** | Price Manipulation from Frontend | **Critical** | Never accept product prices sent by the client. The server reconstructs orders using verified WooCommerce product IDs and authoritative database prices. |
| **RSK-02** | Exposed API Secrets | **Critical** | WooCommerce consumer secrets and Razorpay secret keys are isolated exclusively in `.env.local` on the Node.js server. |
| **RSK-03** | Public Download Leakage | **High** | Downloadable files are protected by WooCommerce order permissions; direct file URLs are never exposed in public JSON responses. |
| **RSK-04** | Duplicate Webhook Processing | **High** | Webhook handler uses idempotent event tracking (`event_id`) to prevent duplicate fulfillment. |
| **RSK-05** | Stale Cache on Frontend | **Medium** | On-demand ISR revalidation triggers cache purge on `product.updated`, `product.created`, and `post.updated`. |
