import { Metadata } from "next";
import { getProducts } from "@/lib/wordpress/products";
import ProductsClientGrid from "./ProductsClientGrid";

export const revalidate = 60; // ISR revalidation every 60 seconds

export const metadata: Metadata = {
  title: "Digital Products & WordPress Plugins Store | MJ Digital",
  description:
    "Explore production-ready Next.js starter templates, custom WordPress plugins, and verified eBooks. Instant access and automated delivery by MJ Digital.",
  alternates: {
    canonical: "https://blog.maajankiwebtech.com/products/",
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
    title: "Templates & Digital Products Store | MJ Digital",
    description: "Premium Next.js blueprints, custom WordPress plugins, and digital books with transparent pricing in INR.",
    type: "website",
    url: "https://blog.maajankiwebtech.com/products/",
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
        "@id": "https://blog.maajankiwebtech.com/products/#webpage",
        name: "Templates & Digital Products Store",
        url: "https://blog.maajankiwebtech.com/products/",
        description: "Explore ready-made Next.js starter templates, custom WordPress plugins, and digital SEO playbooks.",
      },
      ...products.map((p) => ({
        "@type": "Product",
        "@id": `https://blog.maajankiwebtech.com/products/${p.slug}/`,
        name: p.name,
        description: p.plainShortDescription || p.seo?.description || p.name,
        image: p.featuredImage,
        offers: {
          "@type": "Offer",
          price: p.numericPrice > 0 ? String(p.numericPrice) : "0",
          priceCurrency: "INR",
          availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: p.externalUrl || `https://blog.maajankiwebtech.com/products/${p.slug}/`,
          seller: {
            "@type": "Organization",
            name: "MJ Digital Digital Agency",
          },
        },
      })),
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 py-6 md:py-10 px-margin-mobile md:px-margin-desktop">
      {/* Product Catalog & Offer Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
      />

      <div className="max-w-[1250px] mx-auto">
        <ProductsClientGrid initialProducts={products} />
      </div>
    </main>
  );
}
