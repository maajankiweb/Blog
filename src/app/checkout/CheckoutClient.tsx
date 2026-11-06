"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { HiShieldCheck, HiLockClosed, HiArrowLeft, HiCheckCircle } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: formData,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        total: subtotal,
      };

      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (res.ok && data.orderId) {
        clearCart();
        router.push(`/order-confirmation?orderId=${data.orderId}`);
      } else {
        alert(data.message || "Could not process order automatically. Redirecting to instant WhatsApp checkout.");
        const waText = encodeURIComponent(
          `Hi Maajanki WebTech, I would like to complete order for:\n${items
            .map((i) => `• ${i.product.name} (Qty: ${i.quantity})`)
            .join("\n")}\nTotal: ₹${subtotal}\nName: ${formData.fullName}\nEmail: ${formData.email}`
        );
        window.open(`https://api.whatsapp.com/send/?phone=919006543913&text=${waText}`, "_blank");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred. Please try again or pay via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center p-4 bg-white text-slate-900">
        <div className="text-center space-y-4 max-w-sm bg-slate-50/70 p-8 rounded-2xl border border-slate-200">
          <h1 className="text-2xl font-black text-slate-900">No Items to Checkout</h1>
          <p className="text-slate-500 text-xs sm:text-sm">Your shopping cart is currently empty.</p>
          <Link
            href="/products"
            className="inline-block bg-[#DC2564] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-xs"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-6 bg-white text-slate-900 min-h-screen">
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#DC2564] transition-colors"
      >
        <HiArrowLeft className="w-4 h-4" />
        <span>Return to Cart</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Information Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 p-6 md:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2564] bg-[#FDF2F5] px-2.5 py-0.5 rounded-md inline-block mb-1.5">
              Secure Checkout
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer &amp; Billing Details</h1>
            <p className="text-xs text-slate-500 mt-1">
              Your instant download link and license will be delivered to this email address.
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ashish Kumar"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:border-[#DC2564] outline-none text-slate-900 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:border-[#DC2564] outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9006543913"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:border-[#DC2564] outline-none text-slate-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Company / Agency Name (Optional)
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Agency or Business Name"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:border-[#DC2564] outline-none text-slate-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Order Notes / GST Requirements (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions, GSTIN number for tax invoice..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:border-[#DC2564] outline-none text-slate-900 transition-all resize-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#DC2564] hover:bg-[#B81D52] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-sm shadow-[#DC2564]/20 active:scale-95"
              >
                <HiLockClosed className="w-4 h-4" />
                <span>{loading ? "Processing Order..." : `Pay Securely (₹${subtotal.toLocaleString("en-IN")})`}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const waText = encodeURIComponent(
                    `Hello Maajanki WebTech, I would like to complete order via UPI/WhatsApp:\n${items
                      .map((i) => `• ${i.product.name} (Qty: ${i.quantity})`)
                      .join("\n")}\nTotal: ₹${subtotal}\nName: ${formData.fullName || "Customer"}`
                  );
                  window.open(`https://api.whatsapp.com/send/?phone=919006543913&text=${waText}`, "_blank");
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-xs"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Pay via UPI &amp; Instant WhatsApp Delivery</span>
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-slate-50/70 border border-slate-200/90 p-6 rounded-2xl shadow-2xs space-y-4">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200/70 pb-3">
            Order Review
          </h2>

          <div className="divide-y divide-slate-100 space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="pt-2 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900 line-clamp-1">{item.product.name}</p>
                  <p className="text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-black text-slate-900">{item.product.price}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Digital Delivery</span>
              <span className="text-emerald-600 font-bold">Instant (Free)</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-2">
              <span>Total Payable</span>
              <span className="text-[#DC2564] text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
            <HiShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>256-Bit SSL Encrypted • Direct Creator Support</span>
          </div>
        </div>
      </div>
    </main>
  );
}
