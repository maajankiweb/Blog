import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const siteUrl = "https://blog.maajankiwebtech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maajanki Blog | Digital Growth, SEO & Web Development",
    template: "%s | Maajanki Blog",
  },
  description:
    "Learn web development, technical SEO, content marketing, and growth strategy for businesses. Practical, actionable insights from Maajanki WebTech Digital Agency.",
  keywords: [
    "SEO", "Technical SEO", "Web Development", "Digital Marketing",
    "Content Marketing", "WordPress", "Next.js", "Online Business Growth",
    "Maajanki", "Maajanki WebTech",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maajanki Blog | Digital Growth, SEO & Web Development",
    description:
      "Practical, actionable insights on SEO, digital marketing, and web development for modern businesses.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Maajanki Blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@maajankiwebtech",
    creator: "@kumarashishweb",
    title: "Maajanki Blog | Digital Growth, SEO & Web Development",
    description:
      "Practical, actionable insights on SEO, digital marketing, and web development.",
  },
};

// Organization + WebSite schema for GEO (AI citation engines)
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maajanki WebTech Digital Agency",
  url: "https://blog.maajankiwebtech.com",
  logo: {
    "@type": "ImageObject",
    url: "https://blog.maajankiwebtech.com/logo.png",
    width: 200,
    height: 60,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@maajankiwebtech.com",
    contactType: "customer support",
  },
  sameAs: [
    "https://www.facebook.com/maajankiwebtech",
    "https://twitter.com/maajankiwebtech",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Maajanki Blog",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* DNS prefetch for WordPress API */}
        <link rel="preconnect" href="https://blog.maajankiwebtech.com" />
        <link rel="dns-prefetch" href="https://blog.maajankiwebtech.com" />
        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed"
        suppressHydrationWarning
      >
        {/* Skip to main content — WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-primary-container text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
        >
          Skip to main content
        </a>

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Reusable Footer */}
        <Footer />
      </body>
    </html>
  );
}
