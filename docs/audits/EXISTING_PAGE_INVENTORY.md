# EXISTING PAGE INVENTORY — MAAJANKI WEB TECH
**Platform**: Next.js 16 (App Router) + Headless WordPress + WooCommerce  
**Last Updated**: November 2026  

---

## 1. Complete Page Inventory Matrix

| # | Route | Existing File Path | Data Source | Existing State | Redesign Priority & Key Enhancements |
|---|---|---|---|---|---|
| 1 | `/` | `src/app/page.tsx` | WP REST API (`getPosts`, `getCategories`) + WooCommerce | Mixed dark cards, legacy orange `#ff6b00`, cluttered layout. | **P0 (Critical)**: Rebuild into premium editorial + SaaS marketplace hero ("Learn. Build. Grow."), live featured dispatches, category chips, digital store showcase, founder spotlight, and clean footer. |
| 2 | `/blog` | `src/app/blog/page.tsx` | WP REST API (`getPosts`, `getCategories`) | Basic post listing with simple pagination and legacy sidebar. | **P0 (Critical)**: Editorial magazine layout, sticky category navigation, featured hero article, clean grid cards, reading time indicators, and pagination. |
| 3 | `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | WP REST API (`getPostBySlug`, `getComments`) | Basic article view, ad banner clutter, dark elements. | **P0 (Critical)**: Distraction-free typography, interactive TOC sidebar, inline code styling, related products callout card, author bio card, and comment section. |
| 4 | `/category/[slug]` | `src/app/category/[slug]/page.tsx` | WP REST API (`getCategoryBySlug`, `getPosts`) | Simple grid without rich category headers. | **P1 (High)**: Category introduction banner, curated article grid, sub-topic pills, and breadcrumbs. |
| 5 | `/products` / `/store` | `src/app/products/page.tsx` & `src/app/store/page.tsx` | WooCommerce REST API (`getWooDigitalProducts`) | Functional but plain grid with inconsistent card heights and raw button styles. | **P0 (Critical)**: Premium SaaS product marketplace, category filter tabs (Templates, Plugins, Services, Tools), sort by popularity/price, discount badges, and instant Add-to-Cart. |
| 6 | `/products/[slug]` / `/product/[slug]` | `src/app/products/[slug]/page.tsx` & `src/app/product/[slug]/page.tsx` | WooCommerce REST API (`getWooProductBySlug`) | Basic detail page without rich digital product specs. | **P0 (Critical)**: High-converting software sales page: sticky buy box, what's included list, file format & license badges, preview demo link, FAQ accordion, and related products. |
| 7 | `/cart` | `src/app/cart/page.tsx` | `CartContext` (Client state) | Basic table layout with unstyled coupon box. | **P1 (High)**: Clean Stripe-style cart drawer/page, order summary breakdown, coupon input with instant validation, trust badges, and prominent Proceed to Checkout CTA. |
| 8 | `/checkout` | `src/app/checkout/page.tsx` | Razorpay Client SDK + Server API (`/api/payments/*`) | Functional Razorpay trigger, but layout needs trust-focused overhaul. | **P0 (Critical)**: Two-column frictionless checkout: Billing & contact fields on left; live order breakdown, GST info, and Razorpay secure payment button on right. |
| 9 | `/order-confirmation` | `src/app/order-confirmation/page.tsx` | Client state / query params | Simple confirmation text. | **P1 (High)**: Order receipt card, secure digital download access button, invoice generation link, and support helpdesk details. |
| 10 | `/my-account` | `src/app/my-account/page.tsx` | Local session / WP Customer API | Basic placeholders for orders and downloads. | **P1 (High)**: SaaS Customer Portal: Unified sidebar with tabs for `Orders`, `Downloads`, `License Keys`, and `Profile Settings`. |
| 11 | `/about` | `src/app/about/page.tsx` | Static / WP Pages | Plain text layout. | **P2 (Medium)**: Story of Maajanki WebTech, founder vision (Ashish Kumar), agency credentials, mission, and technology stack. |
| 12 | `/contact` | `src/app/contact/page.tsx` | Contact Form component | Basic form layout. | **P2 (Medium)**: Split layout: Direct contact info (email, WhatsApp, Bettiah office address) on left, interactive inquiry form on right. |
| 13 | `/tools` | `src/app/tools/page.tsx` | Static tool registry | List of tools. | **P2 (Medium)**: Interactive developer utilities directory with search and categorization. |
| 14 | Legal Pages (`/privacy-policy`, `/terms`, `/refund-policy`, `/digital-delivery-policy`) | `src/app/[slug]/page.tsx` | WP Pages REST API | Plain text. | **P2 (Medium)**: Clean legal typography with sidebar navigation and last-updated timestamps. |

---

## 2. API & Data Dependency Inventory

| Endpoint | Method | Provider | Used In | Status |
|---|---|---|---|---|
| `/wp-json/wp/v2/posts?_embed=1` | GET | WordPress Core | Homepage, Blog, Categories | Verified Active |
| `/wp-json/wp/v2/categories` | GET | WordPress Core | Header, Blog Filter, Homepage | Verified Active |
| `/wp-json/wc/v3/products` | GET | WooCommerce REST API | Store, Product Detail, Homepage | Verified Active |
| `/wp-json/wc/store/v1/cart` | POST/GET | WooCommerce Store API | Cart synchronization | Verified Fallback |
| `/api/payments/create` | POST | Next.js API (Razorpay SDK) | Checkout Page | Verified Active |
| `/api/payments/verify` | POST | Next.js API (HMAC SHA-256) | Checkout Callback | Verified Active |
| `/api/webhooks/razorpay` | POST | Next.js API | Backend Webhook | Verified Active |

---

## 3. Global Structural Elements

- **Header / Navigation (`src/components/Navbar.tsx`)**:
  - Requires transformation into a clean, floating light-mode header with logo, navigation links, quick search trigger, shopping cart count badge, and high-contrast CTA.
- **Footer (`src/components/Footer.tsx`)**:
  - Requires clean 4-column layout: Company Bio & Socials, Quick Navigation, Digital Store Categories, Legal & Compliance, plus Indian GST/LLP business notice.
- **Floating Actions**:
  - WhatsApp Floating Button (`src/components/WhatsAppFloatingButton.tsx`): Clean, accessible quick-help trigger.
