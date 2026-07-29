# 🚀 Maajanki Blog — Headless Next.js 15 Blog Frontend

Welcome to the **Maajanki Blog Frontend** repository! Built with **Next.js 15 (App Router)**, **TailwindCSS v4**, and **TypeScript**, this high-performance web platform serves as a modern, decoupled frontend powered by a headless **WordPress REST API** backend (`blog.maajankiwebtech.com`).

---

## ✨ Features & Architectural Highlights

- **⚡ Next.js 15 App Router & ISR**: High-speed page rendering using Incremental Static Regeneration with fallback local JSON support.
- **🎨 Glassmorphism & Modern UI**: Tailored Tailwind v4 design system featuring dark/light aesthetic, ambient glow spots, and interactive card components.
- **🛡️ Hardened Security**: Full HTTP Security Headers (`X-Frame-Options`, `HSTS`, `Content-Security-Policy`, `Permissions-Policy`), XSS input sanitization, and server-only API configuration.
- **🔍 10/10 Technical SEO**: Dynamic XML `sitemap.ts`, `robots.ts`, `metadataBase`, canonical URLs, OpenGraph tags, and Twitter Cards.
- **🤖 AEO & GEO (AI Citation Optimization)**: Full `FAQPage`, `Organization`, `WebSite`, `BreadcrumbList`, and `BlogPosting` JSON-LD schemas for ChatGPT, Gemini, and Perplexity discoverability.
- **♿ WCAG 2.1 AA Accessibility**: Semantic `<main id="main-content">` landmarks, skip-to-content keyboard navigation, full ARIA labelling, and interactive focus states.
- **📱 Dynamic Pages**:
  - **Homepage**: Hero highlights, trending posts, categories carousel, & ad placements.
  - **Single Post (`/[slug]`)**: Reading progress bar, Table of Contents, inline ad integration, dynamic read times, & WordPress comments integration.
  - **About (`/about`)**: Modern agency showcase, ecosystem partner cards, & mission pillars.
  - **Newsletter (`/newsletter`)**: Subscription form, archive issue previews, & social proof highlights.
  - **Search (`/search`)**: Real-time keyword query matching across article titles, content, categories, and tags.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Backend / CMS**: WordPress REST API (`/wp-json/wp/v2/`)
- **Fonts**: `next/font/google` (Inter)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── [slug]/          # Dynamic blog post route & static page resolver
│   ├── about/           # Redesigned About page with Ecosystem Ads
│   ├── author/          # Author archive routes
│   ├── category/        # Category filter routes
│   ├── newsletter/      # Modern Newsletter page & SubscribeForm Client Component
│   ├── search/          # Search listing route
│   ├── tag/             # Tag filter routes
│   ├── globals.css      # Custom Tailwind v4 theme tokens & styles
│   ├── layout.tsx       # Root layout with Organization schema, Navbar & Footer
│   ├── page.tsx         # Homepage layout & post grid
│   ├── robots.ts        # Dynamic robots.txt generator
│   └── sitemap.ts       # Dynamic XML sitemap generator
├── components/          # Reusable UI components (BlogCard, FaqSection, Navbar, Footer, etc.)
├── data/                # Fallback offline JSON content archive
└── lib/
    └── wordpress.ts     # WordPress REST API integration & JSON-LD generators
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js 18.x** or higher installed.

### 2. Environment Setup

Rename `.env.local.example` or create a `.env.local` file in the root directory:

```bash
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

Open [http://localhost:3000](http://localhost:3000) in your browser to view the blog.

### 5. Type Checking & Verification

```bash
npx tsc --noEmit
```

---

## 📦 Deployment

This project is ready for deployment on **Vercel**, **Netlify**, or **Hostinger Node.js Hosting**. Refer to [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for full step-by-step instructions.

```bash
npm run build
npm run start
```

---

## 📄 License & Attribution

Built with ❤️ by **Maajanki WebTech Digital Agency**.  
Copyright © All rights reserved. | Maajanki by Maajanki WebTech Digital Agency.
