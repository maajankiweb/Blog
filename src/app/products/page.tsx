import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getWooProducts, WooDigitalProduct } from "@/lib/wordpress";
import {
  HiShoppingBag,
  HiStar,
  HiSparkles,
  HiArrowTopRightOnSquare,
  HiCheckCircle,
} from "react-icons/hi2";

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
            <span>WOOCOMMERCE INTEGRATED DIGITAL STORE</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Ready-Made Templates, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-amber-400">Plugins &amp; E-Books</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 font-normal leading-relaxed">
            High-performance Next.js starter kits, custom WordPress plugins, and digital SEO playbooks created by Maajanki WebTech. Synchronized directly with our WordPress WooCommerce dashboard.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-[#120904] rounded-3xl border border-white/10 hover:border-[#ff6b00]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl hover:-translate-y-1"
            >
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-[#ff6b00] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <div className="relative h-52 w-full bg-white/5 overflow-hidden">
                <Image
                  src={product.featuredImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120904] via-transparent to-transparent opacity-80" />
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#ff6b00] font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <HiStar size={14} className="fill-current" />
                      <span>{product.rating || 4.9}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff6b00] transition-colors leading-snug line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/40 block">Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {product.price}
                      </span>
                      {product.regularPrice && (
                        <span className="text-xs text-white/40 line-through">
                          {product.regularPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={`https://api.whatsapp.com/send/?phone=919006543913&text=${encodeURIComponent(`Hi Maajanki WebTech! I want to buy/download "${product.name}" (${product.price}). Can you share instant download details?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95 shrink-0"
                  >
                    <span>Buy Now</span>
                    <HiArrowTopRightOnSquare size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
