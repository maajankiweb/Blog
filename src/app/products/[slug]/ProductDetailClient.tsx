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

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  return (
    <div className="space-y-16">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl border border-slate-700 shadow-2xl flex items-center gap-3 text-xs font-bold">
          <HiCheckCircle className="text-emerald-400 w-5 h-5 shrink-0" />
          <span>Added &quot;{product.name}&quot; to your cart!</span>
          <Link href="/cart" className="underline text-[#DC2564] ml-2">
            View Cart
          </Link>
        </div>
      )}

      {/* Main Grid: Gallery Left, Details & Buy Box Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Showcase Image */}
          <div className="relative h-[340px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xs">
            {product.badge && (
              <span className="absolute top-4 left-4 z-20 bg-[#DC2564] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-xs">
                {product.badge}
              </span>
            )}
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.galleryImages && product.galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? "border-[#DC2564] scale-95 shadow-xs" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Product Specifications */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">
              Product Overview &amp; What&apos;s Included
            </h3>
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {product.description || product.shortDescription}
            </div>

            {/* Feature Checklist */}
            {product.features && product.features.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Included Features:
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <HiCheckCircle size={16} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Purchase Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-24">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-[#FDF2F5] text-[#DC2564] font-bold uppercase tracking-wider border border-[#FBCFE8]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-[#FCA311] font-bold">
                <HiStar size={16} className="fill-current" />
                <span className="text-slate-800">{product.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount || 45} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Total Price (One-Time)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{product.price}</span>
                {product.regularPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {product.regularPrice}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Lifetime Access
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <Link
              href={`/checkout?product=${product.id}`}
              onClick={() => addToCart(product)}
              className="w-full bg-[#DC2564] hover:bg-[#B81D52] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#DC2564]/20 active:scale-95 transition-all"
            >
              <HiCreditCard size={18} />
              <span>Buy Now with Razorpay / UPI</span>
            </Link>

            <button
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <HiOutlineShoppingBag size={18} />
              <span>Add to Shopping Cart</span>
            </button>
          </div>

          {/* Security & Delivery Guarantees */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <HiShieldCheck size={18} className="text-[#DC2564] shrink-0" />
              <span>Verified 256-Bit SSL Payment by Razorpay</span>
            </div>
            <div className="flex items-center gap-2.5">
              <HiArrowDownTray size={18} className="text-[#DC2564] shrink-0" />
              <span>Instant ZIP download &amp; license key delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <HiGlobeAlt size={18} className="text-[#DC2564] shrink-0" />
              <span>GST-compliant Indian business invoice included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
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
                  <Link href={`/products/${rel.slug}`} className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-100 block">
                    <Image
                      src={rel.featuredImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                      alt={rel.name}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
