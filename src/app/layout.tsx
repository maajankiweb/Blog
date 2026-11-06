import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import GsapInit from "@/components/GsapInit";
import WebMcpProvider from "@/components/WebMcpProvider";
import ExtensionCleaner from "@/components/ExtensionCleaner";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const siteUrl = "https://blog.maajankiwebtech.com";
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "zuQNLK0LfnYPs6sn7PFd4igMvGvDQHni8uqM8ZH9BLo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MJ Digital Blog | Digital Growth, Technical SEO & Software Architecture",
    template: "%s | MJ Digital Blog",
  },
  description:
    "Learn modern web architecture, technical SEO, content marketing, and growth strategy for businesses. Practical, actionable insights from MJ Digital.",
  keywords: [
    "SEO", "Technical SEO", "Modern Web Architecture", "Digital Marketing",
    "Content Marketing", "WordPress", "Next.js", "Online Business Growth",
    "MJ Digital", "Maajanki", "Ashish Kumar",
  ],
  alternates: {
    canonical: "https://blog.maajankiwebtech.com/",
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "MJ Digital Blog | Digital Growth, Technical SEO & Software Architecture",
    description:
      "Practical, actionable insights on SEO, digital marketing, and modern software architecture for modern businesses.",
    type: "website",
    locale: "en_IN",
    url: "https://blog.maajankiwebtech.com/",
    siteName: "MJ Digital Blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@maajankiwebtech",
    creator: "@kumarashishweb",
    title: "MJ Digital Blog | Digital Growth, Technical SEO & Software Architecture",
    description:
      "Practical, actionable insights on SEO, digital marketing, and modern software architecture.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    apple: "/apple-icon.jpg",
  },
  verification: {
    google: googleVerification,
    yandex: "yandex-verification",
    other: {
      "msvalidate.01": "D604E6BC1049FE60A7D40D2F3C012345",
    },
  },
};

// Consolidated Organization, LocalBusiness & WebSite schema for AI Agents & Search Engines
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": "https://blog.maajankiwebtech.com/#organization",
      name: "MJ Digital",
      alternateName: "MJ Digital Agency",
      url: "https://blog.maajankiwebtech.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://blog.maajankiwebtech.com/#logo",
        url: "https://blog.maajankiwebtech.com/maajanki-web-tech-logo.webp",
        width: 300,
        height: 80,
        caption: "MJ Digital",
      },
      image: "https://blog.maajankiwebtech.com/ashish-kumar.png",
      description: "Indian Software Architecture, Technical SEO, and Digital Growth Agency specializing in Next.js 16, WordPress, and digital products.",
      telephone: "+91-9006543913",
      email: "info@maajankiwebtech.com",
      priceRange: "₹₹",
      currenciesAccepted: "INR, USD",
      paymentAccepted: "Credit Card, UPI, Net Banking",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Main Road",
        addressLocality: "Bettiah",
        addressRegion: "Bihar",
        postalCode: "845438",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.8028,
        longitude: 84.5029,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      founder: {
        "@type": "Person",
        name: "Ashish Kumar",
        jobTitle: "Founder & Lead Architect",
        url: "https://blog.maajankiwebtech.com/about",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9006543913",
        email: "info@maajankiwebtech.com",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.instagram.com/maajankiwebtech/",
        "https://www.facebook.com/maajankiwebtechllp",
        "https://twitter.com/maajankiwebtech",
        "https://www.linkedin.com/company/maajankiwebtech",
        "https://www.youtube.com/@Ashishkmj",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://blog.maajankiwebtech.com/#website",
      name: "MJ Digital Blog",
      url: "https://blog.maajankiwebtech.com/",
      publisher: {
        "@id": "https://blog.maajankiwebtech.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
      <body
        className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed"
        suppressHydrationWarning
      >
        {/* Consolidated Organization, LocalBusiness & WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* In-browser Agent Tools (WebMCP) */}
        <WebMcpProvider />

        {/* Browser Extension Attribute Sanitizer */}
        <ExtensionCleaner />

        {/* Global GSAP Registration & Plugin Initialization */}
        <GsapInit />

        {/* Skip to main content — WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-200 bg-primary-container text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
        >
          Skip to main content
        </a>

        <CartProvider>
          {/* Sticky Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main id="main-content" className="grow pt-18">
            {children}
          </main>

          {/* Floating WhatsApp Button */}
          <WhatsAppFloatingButton />

          {/* Global Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
