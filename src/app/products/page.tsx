import { Metadata } from "next";
import Link from "next/link";
import { getWooProducts, WooDigitalProduct } from "@/lib/wordpress";
import { HiSparkles } from "react-icons/hi2";
import ProductsClientGrid from "./ProductsClientGrid";

export const metadata: Metadata = {
  title: "Digital Products & Templates Store | Maajanki WebTech",
  description:
    "Explore ready-made Next.js & WordPress starter templates, custom WordPress plugins, and digital SEO playbooks curated by Maajanki WebTech.",
  openGraph: {
    title: "Digital Products Store | Maajanki WebTech",
    description:
      "Buy premium website templates, WordPress plugins, and developer kits.",
    type: "website",
  },
};

export default async function ProductsStorePage() {
  const products: WooDigitalProduct[] = await getWooProducts();

  return (
    <main className="min-h-screen bg-[#090503] text-white py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiSparkles size={16} />
            <span>WOOCOMMERCE &amp; WEBPRESSHUB INTEGRATED STORE</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Ready-Made Templates, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-amber-400">Plugins &amp; E-Books</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 font-normal leading-relaxed">
            High-performance Next.js starter kits, custom WordPress plugins, and digital SEO playbooks synced from WordPress &amp; WebPressHub APIs. Direct instant payment collection with instant download delivery.
          </p>
        </div>

        {/* Client Filter & Checkout Grid */}
        <ProductsClientGrid initialProducts={products} />
      </div>
    </main>
  );
}
