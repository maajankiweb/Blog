import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAffiliateProductBySlug,
  getAffiliateProducts,
  WPAffiliateProduct,
} from "@/lib/wordpress";
import {
  HiStar,
  HiCheckCircle,
  HiXCircle,
  HiArrowTopRightOnSquare,
  HiTag,
  HiShieldCheck,
  HiSparkles,
  HiArrowLeft,
} from "react-icons/hi2";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getAffiliateProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | Maajanki WebTech",
    };
  }

  return {
    title: `${product.title} - Deal & Review | Maajanki WebTech`,
    description:
      product.tagline ||
      product.description.slice(0, 160) ||
      `Get the best deal on ${product.title}. Exclusive affiliate discount and complete review.`,
    openGraph: {
      title: `${product.title} Deal`,
      description: product.description.slice(0, 160),
      images: product.featuredImage ? [{ url: product.featuredImage }] : [],
    },
  };
}

export default async function SingleAffiliateProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await getAffiliateProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAffiliateProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#090503] text-white pb-24 pt-8">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Back Link */}
        <Link
          href="/affiliate-products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-[#ff6b00] transition-colors mb-8"
        >
          <HiArrowLeft size={16} />
          <span>Back to All Deals</span>
        </Link>

        {/* Top Product Header Grid */}
        <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-10 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Featured Image */}
            <div className="lg:col-span-5 relative h-64 md:h-80 w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={
                  product.featuredImage ||
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
                }
                alt={product.title}
                fill
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#ff6b00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Meta & Buy Section */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold text-[#ff6b00] tracking-wider mb-2 block">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
                {product.title}
              </h1>

              {product.tagline && (
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                  {product.tagline}
                </p>
              )}

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-sm text-white/80 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} size={18} className="fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white text-base">
                  {product.rating || 4.8} / 5.0
                </span>
                <span className="text-white/40">
                  ({product.reviewsCount || 150}+ satisfied users)
                </span>
              </div>

              {/* Price & Offer Box */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-white/50 block mb-1">
                    Special Offer Price
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl font-black text-white">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/40 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {product.discount && (
                  <span className="text-sm font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-xl">
                    Save {product.discount}
                  </span>
                )}
              </div>

              {/* Coupon Bar if present */}
              {product.couponCode && (
                <div className="mb-6 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-white/90">
                    <HiTag className="text-[#ff6b00]" size={18} />
                    <span>
                      Use Coupon Code:{" "}
                      <strong className="text-white bg-black/40 px-2 py-0.5 rounded font-mono text-sm">
                        {product.couponCode}
                      </strong>
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#ff6b00]">
                    Verified Deal
                  </span>
                </div>
              )}

              {/* Primary Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener sponsored"
                  className="flex-1 bg-[#ff6b00] hover:bg-[#e05e00] text-white text-center font-bold px-6 py-4 rounded-xl shadow-lg shadow-[#ff6b00]/30 transition-all flex items-center justify-center gap-2 text-base active:scale-95"
                >
                  <span>Claim Discount Deal</span>
                  <HiArrowTopRightOnSquare size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review & Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-[#120904] rounded-2xl border border-white/10 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Overview & Review
              </h2>
              <div className="prose prose-invert max-w-none text-white/80 text-sm md:text-base leading-relaxed">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="bg-[#120904] rounded-2xl border border-white/10 p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Key Features & Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-white/80 bg-white/5 p-3 rounded-xl border border-white/5"
                    >
                      <HiCheckCircle size={18} className="text-[#ff6b00] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pros and Cons */}
            {(product.pros || product.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.pros && (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
                      <HiCheckCircle size={20} />
                      <span>Pros</span>
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-white/80">
                      {product.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.cons && (
                  <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-rose-400 mb-3 flex items-center gap-2">
                      <HiXCircle size={20} />
                      <span>Cons</span>
                    </h3>
                    <ul className="space-y-2 text-xs md:text-sm text-white/80">
                      {product.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#120904] rounded-2xl border border-white/10 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <HiShieldCheck size={20} className="text-[#ff6b00]" />
                <span>Our Disclosure</span>
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                When you buy through links on our site, we may earn an affiliate commission at no additional cost to you. We only recommend software and services we trust.
              </p>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener sponsored"
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white text-center font-bold px-4 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Visit Official Site</span>
                <HiArrowTopRightOnSquare size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
