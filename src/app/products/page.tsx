import { Metadata } from "next";
import { getProducts } from "@/lib/wordpress/products";
import { HiSparkles } from "react-icons/hi2";
import ProductsClientGrid from "./ProductsClientGrid";

export const revalidate = 60; // ISR revalidation every 60 seconds

export const metadata: Metadata = {
  title: "Digital Products & WordPress Plugins Store | MJ Digital",
  description:
    "Buy production-ready Next.js 16 templates, custom WordPress plugins, and SEO playbooks. Instant license keys and automated delivery by MJ Digital.",
  alternates: {
    canonical: "https://blog.maajankiwebtech.com/products",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Digital Products Store | MJ Digital",
    description: "Premium Next.js templates, WordPress plugins, and developer toolkits with transparent pricing in INR.",
    type: "website",
    url: "https://blog.maajankiwebtech.com/products",
  },
};

export default async function ProductsStorePage() {
  const products = await getProducts();

  // Structured Data Schema for Search Engines and AI Crawlers
  const productSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://blog.maajankiwebtech.com/products#webpage",
        name: "Digital Products & Templates Store",
        url: "https://blog.maajankiwebtech.com/products",
        description: "Explore ready-made Next.js starter templates, custom WordPress plugins, and digital SEO playbooks.",
      },
      ...products.map((p) => ({
        "@type": "Product",
        "@id": `https://blog.maajankiwebtech.com/products/${p.slug}`,
        name: p.name,
        description: p.shortDescription || p.description,
        image: p.featuredImage,
        offers: {
          "@type": "Offer",
          price: p.numericPrice > 0 ? String(p.numericPrice) : "0",
          priceCurrency: "INR",
          availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `https://blog.maajankiwebtech.com/products/${p.slug}`,
          seller: {
            "@type": "Organization",
            name: "MJ Digital Digital Agency",
          },
        },
      })),
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 py-12 md:py-16 px-margin-mobile md:px-margin-desktop">
      {/* Product Catalog & Offer Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
      />

      <div className="max-w-container-max mx-auto space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F5] border border-[#FBCFE8] text-[#DC2564] text-xs font-bold uppercase tracking-wider">
            <HiSparkles size={14} />
            <span>OFFICIAL DIGITAL STORE &amp; LICENSES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Production Templates, <span className="text-[#DC2564]">Plugins &amp; Assets</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            High-performance Next.js 16 starter kits, custom WordPress plugins, and verified developer toolkits synced directly from WooCommerce. Instant payment via Razorpay / UPI with automated download delivery.
          </p>
        </div>

        {/* Client Filter & Checkout Grid */}
        <ProductsClientGrid initialProducts={products} />
      </div>
    </main>
  );
}
