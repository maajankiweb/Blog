"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WordPressProduct } from "@/lib/wordpress/products";
import {
  HiStar,
  HiCheckCircle,
  HiShieldCheck,
  HiArrowDownTray,
  HiGlobeAlt,
  HiOutlineShoppingBag,
  HiCreditCard,
  HiSparkles,
  HiArrowTopRightOnSquare,
  HiCheckBadge,
  HiBolt,
  HiLockClosed,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";

interface ProductDetailClientProps {
  product: WordPressProduct;
  relatedProducts: WordPressProduct[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.featuredImage);
  const { addToCart } = useCart();
  const [addedToast, setAddedToast] = useState(false);

  const isExternal = Boolean(product.externalUrl) || product.type === "external";

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  return (
    <div className="space-y-12">
      {/* Toast Notification (Only for internal products) */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl border border-slate-700 shadow-2xl flex items-center gap-3 text-xs font-bold">
          <HiCheckCircle className="text-emerald-400 w-5 h-5 shrink-0" />
          <span>Added &quot;{product.name}&quot; to your cart!</span>
          <Link href="/cart" className="underline text-[#DC2564] ml-2">
            View Cart
          </Link>
        </div>
      )}

      {/* Main Showcase (Inspired by wpwebtemplates.com 2-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Mockup Media & Browser Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/5 rounded-2xl p-2.5 sm:p-4 border border-slate-200/90 shadow-2xs space-y-3">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] font-mono text-slate-600 max-w-[200px] sm:max-w-none truncate">
                <HiLockClosed className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{isExternal ? "amzn.in/d/0d5uqTkb" : "maajankiwebtech.com/product"}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Verified Official</span>
              </div>
            </div>

            {/* Main Product Image Viewport */}
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200/70 flex items-center justify-center p-4 sm:p-6">
              {product.badge && (
                <span className="absolute top-4 left-4 z-20 bg-[#DC2564] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                  {product.badge}
                </span>
              )}
              <div className="relative w-full h-full max-h-[440px]">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain hover:scale-[1.02] transition-transform duration-300 drop-shadow-md"
                />
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto p-1">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white p-1 ${
                      selectedImage === img
                        ? "border-[#DC2564] shadow-xs"
                        : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Preview thumbnail ${i + 1}`} fill className="object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Purchase Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
          {/* Header Metadata Pill Row */}
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  <HiCheckBadge className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Edition</span>
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200">
                  {product.category}
                </span>
                {isExternal && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100/80 text-amber-800 uppercase tracking-wider border border-amber-300">
                    Amazon India
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <HiStar className="w-4 h-4 fill-amber-400" />
                <span className="text-slate-800">{product.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount || 45})</span>
              </div>
            </div>

            {/* Product Title (H1) */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Short Description (Exact HTML from WordPress) */}
            {product.shortDescription && (
              <div
                className="text-xs sm:text-sm text-slate-600 leading-relaxed [&_strong]:font-semibold [&_strong]:text-slate-900 [&_p]:mb-1.5"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}
          </div>

          {/* Pricing Box (wpwebtemplates.com style) */}
          <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {product.price}
                </span>
                {product.regularPrice && (
                  <span className="text-base text-slate-400 line-through font-medium">
                    {product.regularPrice}
                  </span>
                )}
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="bg-[#DC2564]/10 text-[#DC2564] text-xs font-bold px-2 py-0.5 rounded-md border border-[#DC2564]/20">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                {isExternal ? "Amazon Listing" : "One-Time Payment"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {isExternal
                ? "Available in Kindle Edition & Paperback format. Fast delivery & Amazon Buyer Protection."
                : "One-time payment • Full access & lifetime updates included."}
            </p>
          </div>

          {/* Action Button (Strictly WordPress Button Name for Affiliate Products) */}
          {isExternal ? (
            <div className="space-y-2">
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full bg-[#FF9900] hover:bg-[#E88B00] text-slate-950 font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 shadow-md shadow-amber-500/25 active:scale-[0.98] transition-all text-sm sm:text-base uppercase tracking-wider"
              >
                <span>{product.buttonText || "Buy Product"}</span>
                <HiArrowTopRightOnSquare className="w-5 h-5 shrink-0" />
              </a>
              <p className="text-[11px] text-center text-slate-400">
                Official store listing. Purchases are fulfilled securely by Amazon / Author.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <Link
                href={`/checkout?product=${product.id}`}
                onClick={() => addToCart(product)}
                className="w-full bg-[#DC2564] hover:bg-[#B81D52] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#DC2564]/20 active:scale-95 transition-all"
              >
                <HiCreditCard size={18} />
                <span>{product.buttonText || "Buy Now with Razorpay / UPI"}</span>
              </Link>

              <button
                onClick={handleAddToCart}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <HiOutlineShoppingBag size={18} />
                <span>Add to Shopping Cart</span>
              </button>
            </div>
          )}

          {/* Trust Grid (3 Cards like wpwebtemplates.com) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center space-y-1">
              <HiCheckBadge className="w-5 h-5 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800">100% Genuine</p>
              <p className="text-[10px] text-slate-500">Official verified edition</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center space-y-1">
              <HiBolt className="w-5 h-5 text-amber-500 mx-auto" />
              <p className="text-xs font-bold text-slate-800">Instant Access</p>
              <p className="text-[10px] text-slate-500">Kindle 1-Click &amp; Print</p>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center space-y-1">
              <HiShieldCheck className="w-5 h-5 text-[#DC2564] mx-auto" />
              <p className="text-xs font-bold text-slate-800">Safe Purchase</p>
              <p className="text-[10px] text-slate-500">Amazon Buyer Protection</p>
            </div>
          </div>

          {/* Performance & Quality Vitals Pill */}
          <div className="flex items-center gap-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-900">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">
              ✓
            </div>
            <div>
              <span className="font-bold block">Verified Content Quality</span>
              <span className="text-emerald-700 text-[11px]">7-step practical framework for startup founders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Product Description & Complete Overview (Full Rich WP Content) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-7 bg-[#DC2564] rounded-full inline-block" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Product Description &amp; Complete Overview
            </h2>
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
            Official Publisher Content
          </span>
        </div>

        {/* Rendered WP Content with rich typography, table, list, and image styling */}
        <div
          className="wp-content product-content text-slate-700 leading-relaxed
            [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:rounded-xl [&_table]:overflow-hidden [&_table]:border [&_table]:border-slate-200
            [&_thead]:bg-slate-100 [&_thead]:text-slate-900
            [&_th]:p-3.5 [&_th]:text-left [&_th]:border-b [&_th]:border-slate-200 [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-wider
            [&_td]:p-3.5 [&_td]:border-b [&_td]:border-slate-100 [&_td]:text-sm [&_td]:text-slate-700
            [&_tr:hover]:bg-slate-50/80
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
            [&_li]:text-slate-700
            [&_img]:rounded-xl [&_img]:mx-auto [&_img]:shadow-sm [&_img]:border [&_img]:border-slate-200 [&_img]:my-6 [&_img]:max-w-md [&_img]:w-full
            [&_a]:text-[#DC2564] [&_a]:underline hover:[&_a]:text-[#B81D52]"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {/* High-Converting Bottom Action Banner */}
        {isExternal && (
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/60 p-6 rounded-2xl border border-amber-200/80">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Get &quot;{product.name}&quot;
              </h3>
              <p className="text-xs text-slate-600">
                Available now on Amazon in Kindle eBook &amp; Paperback format.
              </p>
            </div>
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-[#FF9900] hover:bg-[#E88B00] text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider shrink-0 shadow-xs active:scale-95 transition-all"
            >
              <span>{product.buttonText || "Buy Product"}</span>
              <HiArrowTopRightOnSquare className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Related Products Showcase */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-2">
            <HiSparkles className="text-[#DC2564] w-5 h-5" />
            <h3 className="text-xl font-bold text-slate-900">
              Recommended Related Products
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-3">
                  <Link href={`/products/${rel.slug}`} className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 block">
                    <Image
                      src={rel.featuredImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                      alt={rel.name}
                      fill
                      sizes="300px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2564] bg-[#FDF2F5] px-2 py-0.5 rounded-md inline-block mb-1">
                      {rel.category}
                    </span>
                    <Link href={`/products/${rel.slug}`}>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#DC2564] transition-colors line-clamp-2">
                        {rel.name}
                      </h4>
                    </Link>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900">{rel.price}</span>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="text-xs font-bold text-[#DC2564] hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
