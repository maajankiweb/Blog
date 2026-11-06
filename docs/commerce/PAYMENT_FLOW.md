# Payment Integration & Verification Flow (Razorpay + WooCommerce)
**Website:** `https://blog.maajankiwebtech.com/`  
**CMS Backend:** `https://cms.maajankiwebtech.com/` (WooCommerce)  
**Date:** 2026-11-06  

---

## 1. End-to-End Payment Flow

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant NextJS as Next.js Frontend (/checkout)
    participant NextAPI as Next.js API (/api/payments/*)
    participant Razorpay as Razorpay Gateway
    participant WP as WordPress (maajanki-headless-commerce)

    Customer->>NextJS: Submits billing form & clicks "Complete Order"
    NextJS->>NextAPI: POST /api/payments/create (items, customer)
    NextAPI->>WP: POST /wp-json/maajanki/v1/checkout/orders (HMAC Signed)
    WP-->>NextAPI: Returns Authoritative Order ID (WC-XX) & recalculated total
    NextAPI->>Razorpay: POST /v1/orders (amount in paise, receipt)
    Razorpay-->>NextAPI: Returns rzp_order_id
    NextAPI-->>NextJS: Returns orderId, rzp_order_id, public key_id
    NextJS->>Customer: Opens Razorpay Checkout Modal (UPI, Cards, Netbanking)
    Customer->>Razorpay: Completes payment via UPI / Card
    Razorpay-->>NextJS: Emits payment_id, order_id, signature
    NextJS->>NextAPI: POST /api/payments/verify
    NextAPI->>NextAPI: Verifies HMAC SHA-256 signature using RAZORPAY_KEY_SECRET
    NextAPI->>WP: POST /wp-json/maajanki/v1/checkout/orders/{id}/complete
    WP->>WP: Marks WooCommerce order "completed" & activates download permissions
    NextAPI-->>NextJS: Returns verification status
    NextJS->>Customer: Redirects to /order-confirmation & /my-account
```

---

## 2. API Endpoints Created

| Endpoint | Method | Responsibility | Security |
| :--- | :--- | :--- | :--- |
| `/api/payments/create` | POST | Contacts WordPress for authoritative price calculation & creates Razorpay order. | Server-side authentication |
| `/api/payments/verify` | POST | Verifies Razorpay HMAC SHA-256 payment signature & informs WordPress to grant digital download access. | Timing-safe crypto verification |
| `/api/webhooks/razorpay` | POST | Asynchronous server-to-server webhook handler for `payment.captured` & `order.paid` events. | HMAC SHA-256 with memory deduplication |
| `/api/webhooks/wordpress` | POST | Receives cache invalidation pings from WordPress when content or products update. | Shared secret key verification |

---

## 3. Environment Variables Configuration

Add the following to your Next.js `.env.local` file:

```bash
# WordPress Integration
WORDPRESS_URL=https://cms.maajankiwebtech.com
WORDPRESS_API_URL=https://cms.maajankiwebtech.com/wp-json
WORDPRESS_INTEGRATION_SECRET=your_32_char_random_secret_here

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# Webhook Cache Revalidation Secret
WORDPRESS_WEBHOOK_SECRET=maajanki-revalidate-secret
```
