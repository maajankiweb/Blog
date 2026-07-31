"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WooDigitalProduct } from "@/lib/wordpress";
import {
  HiSparkles,
  HiStar,
  HiArrowTopRightOnSquare,
  HiCheckCircle,
  HiXMark,
  HiCreditCard,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";

interface ProductsClientGridProps {
  initialProducts: WooDigitalProduct[];
}

export default function ProductsClientGrid({ initialProducts }: ProductsClientGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<WooDigitalProduct | null>(null);

  const categories = ["All", "Templates", "Plugins", "AI Tools", "Ebooks"];

  const filteredProducts =
    selectedCategory === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleWhatsAppPayment = (product: WooDigitalProduct) => {
    const text = encodeURIComponent(
      `Hi Maajanki WebTech! I want to purchase:\n- Product: ${product.name}\n- Price: ${product.price}\n- Category: ${product.category}\n\nPlease share UPI ID / Razorpay Payment link to complete purchase & receive instant download.`
    );
    window.open(`https://api.whatsapp.com/send/?phone=919006543913&text=${text}`, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Category Pills & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-[#ff6b00] text-white border-[#ff6b00] shadow-md"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-white/50 font-mono">
          Showing <strong>{filteredProducts.length}</strong> Products
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-[#120904] rounded-3xl border border-white/10 hover:border-[#ff6b00]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl hover:-translate-y-1"
          >
            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-[#ff6b00] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
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

                <button
                  onClick={() => setActiveCheckoutProduct(product)}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95 shrink-0"
                >
                  <span>Buy Now</span>
                  <HiArrowTopRightOnSquare size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal Popup */}
      {activeCheckoutProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#120904] border border-[#ff6b00]/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 relative shadow-2xl text-white animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveCheckoutProduct(null)}
              className="absolute top-5 right-5 text-white/50 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <HiXMark size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#ff6b00] uppercase tracking-widest">
                DIRECT CHECKOUT &amp; FULFILLMENT
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                {activeCheckoutProduct.name}
              </h3>
              <div className="text-2xl font-black text-[#ff6b00]">
                {activeCheckoutProduct.price}
              </div>
            </div>

            <div className="space-y-3 text-xs text-white/80 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-emerald-400 shrink-0" size={16} />
                <span>Instant Download &amp; License Key</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-emerald-400 shrink-0" size={16} />
                <span>Direct Payment to Maajanki WebTech (Razorpay/UPI)</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-emerald-400 shrink-0" size={16} />
                <span>Free Future Updates &amp; Technical Support</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleWhatsAppPayment(activeCheckoutProduct)}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <HiChatBubbleLeftRight size={18} />
                <span>Pay via UPI / WhatsApp (Instant Delivery)</span>
              </button>

              <button
                onClick={() => handleWhatsAppPayment(activeCheckoutProduct)}
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <HiCreditCard size={18} />
                <span>Pay via Razorpay (Cards / NetBanking)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
