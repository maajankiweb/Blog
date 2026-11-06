# MAAJANKI WEB TECH — DESIGN SYSTEM SPECIFICATION
**Version**: 2.0 (Premium SaaS & Digital Commerce Redesign)  
**Status**: Active Production Standard  
**Maintainer**: Senior UI/UX Architect & Frontend Team  

---

## 1. Brand Identity & Purpose
Maajanki Web Tech is an elite digital publishing and digital commerce platform for developers, agencies, business owners, and creators. The visual identity bridges **Stripe-grade SaaS precision**, **Medium/Substack editorial readability**, and **Gumroad/LemonSqueezy high-conversion commerce**.

---

## 2. Color Palette & Tokens

### 2.1 Primary Brand Colors
| Role | Token Name | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `--color-brand-primary` | `#DC2564` | Primary brand accent, primary CTA buttons, badges, highlighted text, active indicators |
| **Primary Hover** | `--color-brand-primary-hover` | `#B81D52` | Button hover & active states |
| **Primary Light** | `--color-brand-primary-light` | `#FDF2F5` | Badge backgrounds, tag chips, subtle notification backdrops |
| **Primary Border** | `--color-brand-primary-border` | `#FBCFE8` | Borders on active tags and featured callouts |

### 2.2 Secondary & Dark Accents
| Role | Token Name | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Secondary** | `--color-brand-secondary` | `#14213D` | Dark buttons, navbar titles, high-contrast badges, deep card accents |
| **Secondary Hover** | `--color-brand-secondary-hover` | `#0A1120` | Secondary button hover states |
| **Accent / Gold** | `--color-brand-accent` | `#FCA311` | Star ratings, deal highlights, urgency badges |

### 2.3 Surface & Neutral Foundation (Light-First SaaS)
| Role | Token Name | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `--color-bg-canvas` | `#FFFFFF` | Main page background, primary card surfaces |
| **Subtle** | `--color-bg-subtle` | `#F7F8FC` | Alternate sections, hero backgrounds, table headers |
| **Muted** | `--color-bg-muted` | `#EFF1F6` | Input fields, code block backdrops, inactive tags |
| **Border Neutral** | `--color-border-subtle` | `#E5E7EB` | 1px clean borders on cards, dividers, navbar borders |
| **Border Active** | `--color-border-active` | `#D1D5DB` | Hovered borders, active inputs |

### 2.4 Typographic Contrast
| Role | Token Name | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Headline** | `--color-text-headline` | `#0F172A` | Hero headlines, section titles, product titles (Slate 900) |
| **Body** | `--color-text-body` | `#334155` | Longform blog articles, product descriptions (Slate 700) |
| **Muted** | `--color-text-muted` | `#64748B` | Dates, reading time, breadcrumbs, copyright (Slate 500) |

---

## 3. Typography Scale & Guidelines

- **Primary Font**: `Inter`, sans-serif (system fallbacks: `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`).
- **Hierarchy**:
  - `Hero Display`: 48px – 64px (`font-black`, letter-spacing: `-0.03em`, leading: `1.1`)
  - `Heading 1 / Section Titles`: 32px – 40px (`font-extrabold`, letter-spacing: `-0.02em`)
  - `Heading 2 / Card Titles`: 20px – 24px (`font-bold`, leading: `1.3`)
  - `Heading 3 / Sub-sections`: 16px – 18px (`font-semibold`)
  - `Body / Longform`: 16px (`leading-relaxed` / 1.75 line-height for optimal reading)
  - `Caption / Metadata`: 12px – 13px (`font-medium`, text-muted)

---

## 4. Reusable Component Primitives

### 4.1 Button Hierarchy
1. **Primary Button (`btn-primary`)**:
   - Background: `#DC2564`
   - Text: White (`font-bold`, text-sm)
   - Border radius: 10px / 12px (`rounded-xl`)
   - Shadow: Soft colored shadow (`shadow-md shadow-[#DC2564]/20`)
   - Hover: Background `#B81D52`, subtle scale (`active:scale-[0.98]`)
2. **Secondary Button (`btn-secondary`)**:
   - Background: `#14213D`
   - Text: White (`font-bold`, text-sm)
   - Hover: Background `#0A1120`
3. **Outline / Ghost Button (`btn-outline`)**:
   - Background: Transparent / `#FFFFFF`
   - Border: 1px `#E5E7EB`
   - Text: `#0F172A` (`hover:bg-[#F7F8FC]`)

### 4.2 Card Primitives
1. **SaaS Product Card (`card-product`)**:
   - Background: `#FFFFFF`
   - Border: 1px `#E5E7EB`
   - Radius: 16px (`rounded-2xl`)
   - Shadow: `shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`
   - Header with category pill (`#FDF2F5` text `#DC2564`), pricing strikethrough, feature checklist.
2. **Editorial Blog Card (`card-editorial`)**:
   - Aspect ratio: 16/10 featured image
   - Clean category tag chip
   - Heading with `#0F172A` hover to `#DC2564`
   - Metadata line with author, formatted date, reading time.

---

## 5. Spacing & Grid System
- Max Container Width: `1280px` (`max-w-7xl` / `max-w-container-max`)
- Desktop Margin: `40px` (`px-8` to `px-10`)
- Mobile Margin: `16px` (`px-4`)
- Vertical Section Padding: `80px` (`py-20`) on desktop, `48px` (`py-12`) on mobile.
