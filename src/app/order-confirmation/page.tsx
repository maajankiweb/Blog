"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HiCheckCircle, HiArrowRight, HiEnvelope } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa6";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "MJ-ORD-DEMO";

  return (
    <main className="min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-surface border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
          <HiCheckCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
            ORDER CONFIRMED
          </span>
          <h1 className="text-3xl font-black text-on-surface">Thank You for Your Order!</h1>
          <p className="text-on-surface-variant text-sm max-w-md mx-auto">
            Your order reference is <span className="font-mono font-bold text-on-surface">{orderId}</span>. 
            We have sent a confirmation email with download instructions and access credentials.
          </p>
        </div>

        <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 text-left space-y-3">
          <div className="flex items-center gap-3">
            <HiEnvelope className="w-5 h-5 text-primary shrink-0" />
            <p className="text-xs text-on-surface">
              Download links remain accessible indefinitely in your email and customer dashboard.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={`https://api.whatsapp.com/send/?phone=919006543913&text=${encodeURIComponent(
              `Hi Maajanki WebTech, I have completed order ${orderId}. Please confirm my instant digital file access.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-3.5 px-6 rounded-2xl transition-all shadow-md"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Confirm Order Access on WhatsApp (+91-9006543913)</span>
          </a>

          <Link
            href="/products"
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs py-3.5 px-6 rounded-2xl transition-all"
          >
            <span>Continue Browsing Products</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm">Loading order details...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
