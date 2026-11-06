# 📝 Blog Frontend — New Next.js Website Plan
**WordPress Blog:** `blog.maajankiwebtech.com`  
**New Frontend:** Next.js (separate project)  
**Status:** ✅ Completed

---

## 🎯 Goal
`blog.maajankiwebtech.com` WordPress ka content ek naye Next.js frontend se display karna.  
Dono alag rahenge — WordPress sirf CMS ki tarah kaam karega.

---

## 🔧 Tech Stack (Decided & Implemented)
- [x] Framework: Next.js 15 (App Router)
- [x] Styling: TailwindCSS v4 with Material 3 & Custom Design Tokens
- [x] Data Source: WordPress REST API (`/wp-json/wp/v2/`) with Local Fallback JSON
- [x] Hosting: Hostinger / Vercel ready
- [x] Output: ISR (Incremental Static Regeneration) with dynamic revalidation

---

## 🎨 Design (Decided & Implemented)
- [x] Theme: Modern Dark / Light system with ambient glassmorphism glow
- [x] Style: Modern Editorial / Glassmorphism / Vibrant Accent (`#FF6B00`)
- [x] Branding: Aligned with Maajanki WebTech Digital Agency

---

## 📦 Pages & Features (Completed)
- [x] Homepage — Featured post, latest grid, trending, categories
- [x] `/[slug]` — Dynamic single post page & static pages
- [x] Category / Tag filter pages (`/category/[slug]`, `/tag/[slug]`)
- [x] Search page (`/search?q=...`)
- [x] About page (`/about`) — Full modern redesign & Ecosystem ads
- [x] Author profile (`/author/[slug]`)
- [x] Related posts section
- [x] Newsletter signup page (`/newsletter`) & reusable component
- [x] Comments (WordPress comments API integration & CommentForm)
- [x] Full SEO, AEO (FAQ JSON-LD), GEO (Organization/WebSite schema), & Security Headers

---

## 🗂️ Folder Location
```
F:\MJ WT\
└── blog-frontend\    ← ACTIVE project
```

---

## 🔗 WordPress REST API Endpoints (Integrated)
```
GET /wp-json/wp/v2/posts          → All posts & filtering
GET /wp-json/wp/v2/posts?slug=xyz → Single post
GET /wp-json/wp/v2/categories     → Categories
GET /wp-json/wp/v2/tags           → Tags
GET /wp-json/wp/v2/media          → Images
GET /wp-json/wp/v2/users          → Author info
GET /wp-json/wp/v2/comments       → Comments
```

---

## 📋 TODO & Status
1. [x] Design & features finalize karo
2. [x] `F:\MJ WT\blog-frontend\` folder me Next.js project create karo
3. [x] `lib/wordpress.ts` API helper banao
4. [x] Pages banao (listing, single, category, author, search, about, newsletter)
5. [x] Design implement karo
6. [x] WordPress REST API se connect karo
7. [x] Test karo locally (`npx tsc --noEmit`, dev server verified)
8. [x] Build, Security Headers, SEO, AEO, GEO, and Accessibility optimization complete

---

*Updated: 2026-07-29 | Plan fully executed & project production-ready*
