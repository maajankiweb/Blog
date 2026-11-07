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

        {/* Right Column: Purchase Card (5 cols) — Styled exactly like wpwebtemplates.com with MJ Digital brand colors */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs sticky top-24">
          {/* Header Metadata Pill Row (wph-nexus-pill-row) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FDF2F5] text-[#DC2564] border border-[#FBCFE8] uppercase tracking-wider">
                  <HiCheckBadge className="w-3.5 h-3.5 text-[#DC2564]" />
                  <span>Verified Edition</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200">
                  {product.category}
                </span>
                {isExternal && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FDF2F5] text-[#DC2564] uppercase tracking-wider border border-[#FBCFE8]">
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

            {/* Product Title (H1 - wph-nexus-title) */}
            <h1 className="text-2xl sm:text-[1.85rem] font-extrabold text-slate-900 tracking-tight leading-[1.25]">
              {product.name}
            </h1>

            {/* Short Pitch (Exact HTML from WordPress - wph-nexus-short-pitch) */}
            {product.shortDescription && (
              <div
                className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed [&_strong]:font-bold [&_strong]:text-slate-900 [&_p]:mb-1.5"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}
          </div>

          {/* Pricing Box (wph-nexus-price-card with MJ Digital Brand Palette) */}
          <div className="bg-slate-50/90 border border-slate-200/90 rounded-xl p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-2">
                {product.regularPrice && (
                  <del className="text-slate-400 line-through text-sm sm:text-base font-medium">
                    {product.regularPrice}
                  </del>
                )}
                <ins className="text-3xl sm:text-[2rem] font-bold text-slate-900 no-underline tracking-tight">
                  {product.price}
                </ins>
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="bg-[#DC2564]/10 text-[#DC2564] text-xs font-bold px-2 py-0.5 rounded border border-[#DC2564]/20 ml-1">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                {isExternal ? "Amazon Store" : "One-Time Payment"}
              </span>
            </div>

            <p className="text-xs font-bold text-[#DC2564] mt-1">
              {isExternal
                ? "Available on Amazon India • Official Kindle Edition & Paperback"
                : "One-time payment • Full access & lifetime updates included."}
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              {isExternal
                ? "Instant Kindle 1-Click access. Orders fulfilled securely by Amazon."
                : "Instant digital download upon checkout. 100% genuine license."}
            </p>
          </div>

          {/* Action Button (wph-nexus-btn-buynow styled with our brand color #DC2564) */}
          {isExternal ? (
            <div className="space-y-2">
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full bg-[#DC2564] hover:bg-[#B81D52] border border-[#DC2564] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#DC2564]/20 active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
              >
                <span>{product.buttonText || "Buy Product"}</span>
                <HiArrowTopRightOnSquare className="w-4 h-4 shrink-0 text-white" />
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

          {/* Trust Grid (3 Cards — wph-nexus-trust-grid with brand #DC2564 icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-100">
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FDF2F5] border border-[#FBCFE8] flex items-center justify-center text-[#DC2564] shrink-0">
                <HiCheckBadge size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-900 leading-tight">30 Days Support</p>
                <p className="text-[10px] text-slate-500 leading-tight truncate">Author Assistance</p>
              </div>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FDF2F5] border border-[#FBCFE8] flex items-center justify-center text-[#DC2564] shrink-0">
                <HiBolt size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-900 leading-tight">100% Genuine</p>
                <p className="text-[10px] text-slate-500 leading-tight truncate">Publisher Edition</p>
              </div>
            </div>

            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FDF2F5] border border-[#FBCFE8] flex items-center justify-center text-[#DC2564] shrink-0">
                <HiShieldCheck size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-900 leading-tight">Safe Purchase</p>
                <p className="text-[10px] text-slate-500 leading-tight truncate">Buyer Protection</p>
              </div>
            </div>
          </div>

          {/* Vitals Pill (wph-nexus-vitals-pill with brand #DC2564 / #FDF2F5 palette) */}
          <div className="flex items-center justify-between gap-3 bg-[#FDF2F5] border border-[#FBCFE8] rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-full bg-[#DC2564] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                95+
              </span>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 block text-xs leading-tight truncate">
                  Google Core Web Vitals 95+
                </span>
                <span className="text-slate-600 block text-[11px] leading-tight truncate">
                  SEO-friendly architecture &amp; fast access
                </span>
              </div>
            </div>
            <span className="bg-white border border-[#FBCFE8] text-[#DC2564] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Grade A+
            </span>
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

        {/* High-Converting Bottom Action Banner styled with MJ Digital palette */}
        {isExternal && (
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FDF2F5] p-6 rounded-2xl border border-[#FBCFE8]">
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
              className="bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider shrink-0 shadow-sm shadow-[#DC2564]/20 active:scale-95 transition-all"
            >
              <span>{product.buttonText || "Buy Product"}</span>
              <HiArrowTopRightOnSquare className="w-4 h-4 text-white" />
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
