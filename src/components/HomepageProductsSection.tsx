import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/wordpress/products";
import { HiArrowRight, HiSparkles, HiCheckBadge } from "react-icons/hi2";

export default async function HomepageProductsSection() {
  const featuredProducts = await getFeaturedProducts(8);

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section id="digital-products" className="py-20 px-margin-mobile md:px-margin-desktop bg-slate-50/60 border-t border-b border-slate-200/80">
      <div className="max-w-container-max mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F5] border border-[#FBCFE8] text-[#DC2564] text-xs font-bold uppercase tracking-wider">
              <HiSparkles className="w-3.5 h-3.5" />
              <span>DIGITAL STORE &amp; LICENSES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Production-Grade Digital Products
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Engineered Next.js starter blueprints, WordPress business themes, and verified GST billing tools designed for agencies, founders, and developers.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm shadow-[#DC2564]/20 shrink-0"
          >
            <span>Explore All Products</span>
            <HiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1"
            >
              <div className="space-y-3.5">
                {/* Product Thumbnail */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 block border border-slate-100"
                >
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 z-10 bg-[#DC2564] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.featuredImage || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2564] bg-[#FDF2F5] px-2 py-0.5 rounded-md">
                        {product.category || "Digital Asset"}
                      </span>
                      {product.externalUrl && (
                        <span className="text-amber-800 font-bold uppercase tracking-wider text-[9px] bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-300">
                          Amazon
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-medium flex items-center gap-1 ${
                      product.externalUrl ? "text-amber-700" : "text-emerald-600"
                    }`}>
                      <HiCheckBadge className="w-3.5 h-3.5" />
                      {product.externalUrl ? "Amazon Kindle" : "Instant Delivery"}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="font-bold text-slate-900 text-sm group-hover:text-[#DC2564] transition-colors line-clamp-2 leading-snug block"
                  >
                    {product.name}
                  </Link>

                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                    {product.plainShortDescription || product.shortDescription?.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">
                    {product.externalUrl ? "Amazon Listing" : "Lifetime License"}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-900">{product.price}</span>
                    {product.regularPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {product.regularPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="bg-slate-900 hover:bg-[#DC2564] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Get</span>
                  <HiArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
