# 🚀 Maajanki WebTech — Headless Next.js Blog & Affiliate Deals Platform

Welcome to the official repository for **Maajanki WebTech Blog & Affiliate Hub**! Built with **Next.js 16 (App Router)**, **TailwindCSS**, and **TypeScript**, this high-performance digital platform serves as a modern, decoupled frontend powered by a headless **WordPress REST API** backend (`blog.maajankiwebtech.com`).

---

## ✨ Features & Architectural Highlights

- **⚡ Next.js 16 App Router & Turbopack**: Ultra-fast page rendering using Incremental Static Regeneration (ISR) with robust fallback local JSON support.
- **🛍️ WordPress Affiliate Products & Deals Engine (`/affiliate-products`)**:
  - **WordPress Dynamic Sync**: Automatically fetches affiliate products & promotions from WordPress REST API (`/posts`) or local structured data fallback.
  - **Filter & Search**: Interactive filtering by categories (*Hosting, Themes & Plugins, SEO & Marketing, AI Tools, Domain & Security*), real-time search, and sorting.
  - **Conversion-Focused Cards**: Features price comparison, discount badges, click-to-copy coupon codes, and direct affiliate CTA links (`rel="noopener sponsored"`).
  - **Single Product Landing Pages (`/affiliate-products/[slug]`)**: Detailed reviews with feature highlights, pros & cons breakdown, affiliate disclosure, and Schema.org product metadata.
  - **WordPress CMS Guide**: Embedded step-by-step guide for site managers on publishing affiliate products via WordPress Admin.
- **🎨 Glassmorphic & Modern Design System**: Sleek dark aesthetic (`#090503`), ambient gradient glow spots, micro-animations with `framer-motion`, and custom responsive layouts.
- **🛡️ Hardened Security**: Full HTTP Security Headers (`X-Frame-Options`, `HSTS`, `Content-Security-Policy`, `Permissions-Policy`), XSS input sanitization, and server-only API configurations.
- **🔍 10/10 Technical SEO & AEO**: Dynamic XML `sitemap.ts`, `robots.ts`, `metadataBase`, canonical URLs, OpenGraph tags, Twitter Cards, and `FAQPage`, `Organization`, `WebSite`, `BreadcrumbList`, and `BlogPosting` JSON-LD schemas for search engines & AI engine discovery (ChatGPT, Perplexity, Gemini).
- **♿ WCAG 2.1 AA Accessibility**: Semantic HTML5 landmarks (`<main id="main-content">`), ARIA attributes, keyboard navigation focus rings, and high contrast typography.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) & Vanilla CSS design system
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons (Hi2 & Fa6)](https://react-icons.github.io/react-icons/)
- **Backend / CMS**: WordPress REST API (`https://blog.maajankiwebtech.com/wp-json/wp/v2/`)
- **Fonts**: Google Fonts (`Inter`, `Outfit`)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── [slug]/                  # Dynamic blog post route & static page resolver
│   ├── about/                   # Agency showcase, mission & ecosystem cards
│   ├── affiliate-products/      # Affiliate Products & Deals Hub
│   │   ├── [slug]/              # Single Affiliate Product review & landing page
│   │   ├── AffiliateClientPage.tsx # Client interactive filter & search component
│   │   └── page.tsx             # Server entry point & SEO metadata
│   ├── api/                     # Serverless API routes (Newsletter, Email, Revalidate)
│   ├── author/                  # Author archive routes
│   ├── blog/                    # Main blog listing page
│   ├── category/                # Category filter routes
│   ├── contact/                 # Contact page with interactive form
│   ├── cookie-settings/         # Cookie preference management
│   ├── newsletter/              # Newsletter subscription page & archive
│   ├── privacy-policy/          # Legal privacy policy page
│   ├── search/                  # Search listing page
│   ├── tag/                     # Tag archive routes
│   ├── terms/                   # Terms of service page
│   ├── globals.css              # Theme tokens & Tailwind utility classes
│   ├── layout.tsx               # Root layout with Navbar, Footer & JSON-LD
│   ├── page.tsx                 # Homepage layout & post grid
│   ├── robots.ts                # Dynamic robots.txt generator
│   └── sitemap.ts               # Dynamic XML sitemap generator
├── components/                  # Reusable UI components (Navbar, Footer, BlogCard, etc.)
├── data/                        # Local fallback datasets (blog_all_content.json, affiliate_products.json)
└── lib/
    └── wordpress.ts             # WordPress REST API integration & JSON-LD generators
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js 18.x** or higher installed.

### 2. Environment Setup

Create or update `.env.local` in the root directory:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://blog.maajankiwebtech.com/wp-json/wp/v2
WORDPRESS_API_URL=https://blog.maajankiwebtech.com/wp-json/wp/v2
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Type Check & Build Validation

```bash
# Run TypeScript compilation check
npx tsc --noEmit

# Production Build
npm run build
```

---

## 📦 Deployment

This project is configured for seamless deployment on **Vercel**, **Netlify**, or **Hostinger Node.js Hosting**. For detailed step-by-step instructions, refer to [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md).

```bash
npm run build
npm run start
```

---

## 📄 License & Attribution

Built with ❤️ by **Maajanki WebTech Digital Agency**.  
Copyright © All rights reserved. | Maajanki WebTech.
