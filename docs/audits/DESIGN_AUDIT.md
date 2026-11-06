# DESIGN AUDIT — MAAJANKI WEB TECH
**Platform**: Next.js 16 + Headless WordPress + WooCommerce  
**Date**: November 2026  
**Auditor**: Senior UI/UX Architect & Art Director  

---

## 1. Executive Summary

This design audit evaluates the current frontend of [blog.maajankiwebtech.com](https://blog.maajankiwebtech.com) against the requirements of a **world-class digital publishing and digital products marketplace platform**. 

While the backend integration (WordPress REST API, WooCommerce endpoints, and Razorpay server verification) is intact, the existing visual identity and user experience suffer from **fragmented styling, mixed design eras, harsh dark-mode containers on light backgrounds, inconsistent brand colors (orange `#ff6b00` vs brand magenta `#DC2564`), and non-standardized component primitives**.

The objective of this comprehensive redesign is to elevate Maajanki Web Tech to the tier of modern platforms like **Vercel, Lemon Squeezy, Stripe Docs, and Framer Marketplace**, combining:
1. **Modern SaaS Aesthetics**: Ultra-clean whitespace, crisp typography, subtle borders, soft neutral shadows.
2. **Editorial Publishing**: Distraction-free reading, optimal line lengths (65–75 chars), high visual hierarchy, clean table of contents.
3. **High-Converting Marketplace**: Clear pricing tiers, feature checklists, instant add-to-cart, sticky trust badges, frictionless custom checkout.

---

## 2. Current Visual & Technical Inventory

### 2.1 Technology Stack & Versions
- **Framework**: Next.js 16.4.5 (App Router, Turbopack enabled)
- **UI Engine**: React 19.2.4 (Strict hydration rules)
- **Styling**: Tailwind CSS v4.3.2 (`@tailwindcss/postcss`)
- **Typography**: Inter (Google Fonts via `next/font/google`), loaded with `--font-sans` variable
- **Animation**: Framer Motion 12.42.2, GSAP 3.15.0
- **Iconography**: React Icons (`react-icons/hi2`, `react-icons/md`), Lucide React (`lucide-react`)
- **State Management**: React Context (`CartContext` with localStorage sync)
- **Backend CMS**: Headless WordPress 6.x (`https://blog.maajankiwebtech.com/wp-json/wp/v2`)
- **Commerce**: WooCommerce Store & REST APIs (`/wp-json/wc/v3` & `/wp-json/wc/store/v1`)
- **Payments**: Razorpay Node SDK (`razorpay`) with server verification routes

---

## 3. Critical Visual & UX Deficiencies Identified

| Dimension | Current State | Defect & User Impact | Target Redesign Standard |
| :--- | :--- | :--- | :--- |
| **Brand Color Consistency** | Mixed orange (`#ff6b00`), legacy brown, and partial `#dc2564`. | Brand feels disjointed and uncurated. Orange confuses brand recognition. | Unified **#DC2564** primary, **#14213D** deep slate secondary, **#FFFFFF** primary background, **#F7F8FC** secondary background. |
| **Theme / Mode Harmony** | Patchwork dark-theme sections (`#120904`, `#0d0806`) inside a light-theme layout. | Harsh visual jump as user scrolls; feels like mismatched template blocks. | Unified cohesive **Light-First Editorial SaaS** theme with generous whitespace and intentional dark contrast accents only where justified (e.g. code blocks, terminal callouts). |
| **Header & Navigation** | Dark floating bar with cramped navigation, low contrast links, and raw red subscribe button. | Desktop and mobile menus lack professional SaaS elegance, cart count badge lacks polish. | Minimalist sticky header (`backdrop-blur-md bg-white/90`), crisp typography, subtle border (`#E5E7EB`), refined cart dropdown & search trigger. |
| **Hero Section** | Heavy text box with split layout and hardcoded stats. | Lacks editorial prestige and instant clarity. | Crisp editorial hero with bold headline: **"Learn. Build. Grow."**, supporting copy, dual CTA buttons ("Explore Articles", "Explore Digital Store"), and live featured dispatches. |
| **Product Cards & Marketplace** | Inconsistent card borders, mixed button shapes, lack of standardized feature badges. | Looks like an amateur WooCommerce listing rather than a high-ticket software/template store. | Clean SaaS product cards with category pill, verified license badges, price strikethrough, instant Add-to-Cart, and feature micro-lists. |
| **Article Reading Experience** | Cluttered sidebars, ad placeholders with conflicting widths, inconsistent heading sizes. | Causes reader fatigue and high bounce rate. | Medium/Substack-grade reading typography, sticky clean TOC on left, minimalist author/share rail, uncluttered inline code blocks, and contextually relevant product CTAs. |
| **Cart & Checkout UX** | Basic layout lacking trust seals, order security badges, and clear step indicators. | Abandoned carts due to low trust perception during payment. | Stripe/Gumroad-grade checkout with 2-column layout: customer details & billing on left, live order breakdown with instant Razorpay modal trigger on right. |
| **Customer Dashboard** | Basic tabular views without unified sidebar navigation. | Difficult for customers to find downloaded zip files, license keys, or invoices. | SaaS customer portal (`/my-account`) with unified sidebar: Orders, Downloads, Invoices, Account Settings. |
| **Mobile Responsiveness** | Some tables and cards overflow on 375px screens; tap targets below 44px on some links. | Poor mobile purchasing experience on Indian smartphone traffic. | 100% mobile-first layouts, 48px touch targets, sticky bottom purchase bar on product pages, swipeable category chips. |

---

## 4. Reusable Architectural Assets (Do Not Break)

The following core modules are verified, robust, and will be preserved and restyled rather than rewritten:

1. **WordPress Data Layer (`src/lib/wordpress.ts`)**:
   - `getPosts`, `getPostBySlug`, `getCategories`, `getTags`, `getComments`, `createComment`.
   - `getWooDigitalProducts`, `getWooProductBySlug`.
   - Robust fallback handling and Next.js revalidation (`revalidate: 3600`).
2. **Cart Context (`src/context/CartContext.tsx`)**:
   - `items`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `subtotal`, `totalItems`.
   - LocalStorage persistence and price string sanitization.
3. **Payment API Routes (`src/app/api/payments/*`)**:
   - `/api/payments/create`: Razorpay order generation with receipt hashing.
   - `/api/payments/verify`: HMAC-SHA256 signature verification.
   - `/api/webhooks/razorpay`: Idempotent payment capture listener.
4. **Search Autocomplete (`src/components/SearchAutocomplete.tsx`)**:
   - Debounced REST search query mechanism.
5. **Interactive TOC (`src/components/TableOfContents.tsx`)**:
   - Working DOM parser and intersection observer for active heading states.
6. **SEO & Structured Data Engine (`src/app/sitemap.ts`, `src/app/robots.ts`)**:
   - Dynamic dynamic sitemap generation and Google Search Console verification.

---

## 5. Design Token Strategy (Phase 1 Blueprint)

To eliminate hardcoded colors and arbitrary paddings, the new design system introduces strict CSS custom properties in `src/app/globals.css`:

```css
/* Core Brand Tokens */
--color-brand-primary: #DC2564;          /* Vibrant Rose/Magenta */
--color-brand-primary-hover: #B81D52;    /* Darkened for interactive hover */
--color-brand-primary-light: #FDF2F5;    /* 5% tint for pill backgrounds */
--color-brand-secondary: #14213D;        /* Deep Slate/Navy */
--color-brand-secondary-hover: #0F172A;
--color-brand-accent: #FCA311;           /* Warm Gold for ratings & highlights */

/* Neutral Surface Tokens (Clean Light SaaS) */
--color-bg-canvas: #FFFFFF;              /* Pure White Canvas */
--color-bg-subtle: #F7F8FC;              /* Light Cool Gray Surface */
--color-bg-muted: #EFF1F6;               /* Slightly darker for secondary containers */
--color-border-subtle: #E5E7EB;          /* Light gray border */
--color-border-hover: #D1D5DB;

/* Text Typography Tokens */
--color-text-headline: #0F172A;          /* Slate 900 for high-contrast headlines */
--color-text-body: #334155;              /* Slate 700 for comfortable longform reading */
--color-text-muted: #64748B;             /* Slate 500 for metadata & captions */

/* Shadows */
--shadow-subtle: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
--shadow-hover: 0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.03);
--shadow-elevated: 0 20px 30px -10px rgba(15, 23, 42, 0.12);
```

---

## 6. Audit Verdict

The backend architecture and data piping are solid. The entire frontend will be methodically transformed into a unified, high-converting, premium editorial and digital commerce platform while strictly following the **Phase-by-Phase implementation plan**.
