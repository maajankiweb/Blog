"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { HiTrash, HiOutlineShoppingBag, HiArrowRight, HiShieldCheck, HiCheckCircle } from "react-icons/hi2";

export default function CartClient() {
  const { items, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "MAAJANKI10") {
      setCouponDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code. Try MAAJANKI10 for 10% off!");
    }
  };

  const finalTotal = Math.max(0, subtotal - couponDiscount);

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-white text-slate-900">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-50/70 p-8 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="w-16 h-16 mx-auto bg-[#FDF2F5] text-[#DC2564] flex items-center justify-center rounded-2xl">
            <HiOutlineShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Your Cart is Empty</h1>
            <p className="text-slate-600 text-xs sm:text-sm">
              Explore our production-ready Next.js templates, WordPress plugins, and verified developer toolkits.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-sm shadow-[#DC2564]/20 w-full"
          >
            <span>Browse Products</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-8 bg-white text-slate-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Review your digital selections ({totalItems} item{totalItems > 1 ? "s" : ""})
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-500 hover:text-rose-600 font-semibold self-start md:self-auto"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product }) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-slate-100 border border-slate-100">
                  <Image
                    src={product.featuredImage || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FDF2F5] text-[#DC2564] rounded-md">
                    {product.category || "Digital Product"}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block font-bold text-slate-900 hover:text-[#DC2564] text-sm sm:text-base transition-colors mt-1 line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Instant Digital Delivery · Lifetime License
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:border-l sm:border-slate-100 sm:pl-6">
                <span className="text-base font-black text-slate-900">
                  {product.price}
                </span>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-slate-400 hover:text-rose-500 p-2 rounded-lg transition-colors"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <HiTrash size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Code Section */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Have a Coupon or Discount Code?
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon (e.g. MAAJANKI10)"
                disabled={couponApplied}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 uppercase placeholder:normal-case placeholder:text-slate-400 focus:border-[#DC2564] outline-none"
              />
              <button
                type="submit"
                disabled={couponApplied}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                {couponApplied ? "Applied!" : "Apply"}
              </button>
            </form>
            {couponApplied && (
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <HiCheckCircle size={14} />
                <span>Coupon MAAJANKI10 applied: 10% discount subtracted!</span>
              </p>
            )}
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-sm sticky top-24">
          <h3 className="font-extrabold text-lg text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Estimated Taxes (GST)</span>
              <span className="text-slate-500 font-medium">Included</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
              <span>Total Amount</span>
              <span className="text-xl text-[#DC2564]">₹{finalTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-[#DC2564] hover:bg-[#B81D52] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm shadow-[#DC2564]/20 active:scale-95 transition-all"
          >
            <span>Proceed to Checkout</span>
            <HiArrowRight size={14} />
          </Link>

          {/* Security Guarantee Box */}
          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <HiShieldCheck size={16} className="text-[#DC2564] shrink-0" />
              <span>Razorpay 256-Bit Encrypted Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <HiCheckCircle size={16} className="text-emerald-500 shrink-0" />
              <span>Instant ZIP download access after purchase</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
