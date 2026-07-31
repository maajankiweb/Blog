"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiCalculator,
  HiCheckCircle,
  HiArrowRight,
  HiSparkles,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";

export default function WebsiteCostCalculatorPage() {
  const [siteType, setSiteType] = useState<"landing" | "business" | "ecommerce" | "custom">("business");
  const [pagesCount, setPagesCount] = useState<number>(5);
  const [needSeo, setNeedSeo] = useState<boolean>(true);
  const [needSpeed, setNeedSpeed] = useState<boolean>(true);
  const [needPayment, setNeedPayment] = useState<boolean>(false);
  const [needContent, setNeedContent] = useState<boolean>(false);

  // Calculate estimated costs in INR
  const calculateCost = () => {
    let base = 0;
    if (siteType === "landing") base = 9999;
    else if (siteType === "business") base = 18500;
    else if (siteType === "ecommerce") base = 28999;
    else if (siteType === "custom") base = 42000;

    const extraPagesCost = Math.max(0, pagesCount - 5) * 1500;
    const seoCost = needSeo ? 7500 : 0;
    const speedCost = needSpeed ? 4500 : 0;
    const paymentCost = needPayment ? 5000 : 0;
    const contentCost = needContent ? 6000 : 0;

    const total = base + extraPagesCost + seoCost + speedCost + paymentCost + contentCost;
    return {
      total,
      min: Math.round(total * 0.9),
      max: Math.round(total * 1.15),
    };
  };

  const cost = calculateCost();

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hi Maajanki WebTech! I calculated a website quote on your website tool:\n- Type: ${siteType.toUpperCase()}\n- Estimated Pages: ${pagesCount}\n- SEO: ${needSeo ? 'Yes' : 'No'}\n- Speed Optimization: ${needSpeed ? 'Yes' : 'No'}\n- Payment Gateway: ${needPayment ? 'Yes' : 'No'}\n- Estimated Budget: ₹${cost.min.toLocaleString()} - ₹${cost.max.toLocaleString()}\n\nCan we discuss my project?`
    );
    window.open(`https://api.whatsapp.com/send/?phone=919006543913&text=${text}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#090503] text-white py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Link href="/tools" className="hover:text-[#ff6b00]">
              Tools Hub
            </Link>
            <span>/</span>
            <span className="text-white">Website Cost Calculator</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiCalculator size={16} />
            <span>INSTANT ESTIMATOR (INDIA 2026)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            How Much Does a Website Cost in India?
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Select your project requirements to get an accurate cost breakdown for domain, hosting, custom Next.js/WordPress development, and SEO optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
            {/* Step 1: Website Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#ff6b00]">
                1. Select Website Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "landing", label: "Landing Page", sub: "1 Page High-converting" },
                  { key: "business", label: "Business Website", sub: "5-10 Corporate Pages" },
                  { key: "ecommerce", label: "E-Commerce Store", sub: "Online Shop + Payment" },
                  { key: "custom", label: "Custom Next.js App", sub: "Ultra-fast Custom SaaS" },
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setSiteType(type.key as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      siteType === type.key
                        ? "bg-[#ff6b00]/15 border-[#ff6b00] text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{type.label}</div>
                    <div className="text-[11px] text-white/50">{type.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pages Count Slider */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                <span className="text-[#ff6b00]">2. Number of Pages</span>
                <span className="text-white bg-white/10 px-3 py-1 rounded-full">{pagesCount} Pages</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pagesCount}
                onChange={(e) => setPagesCount(parseInt(e.target.value))}
                className="w-full accent-[#ff6b00] bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            {/* Step 3: Optional Addons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-[#ff6b00]">
                3. Optional Add-ons &amp; Optimizations
              </label>
              <div className="space-y-2">
                {[
                  { state: needSeo, setter: setNeedSeo, label: "Technical SEO & Schema Markup", price: "+ ₹7,500" },
                  { state: needSpeed, setter: setNeedSpeed, label: "Core Web Vitals PageSpeed (90+ Score)", price: "+ ₹4,500" },
                  { state: needPayment, setter: setNeedPayment, label: "Payment Gateway (Razorpay/Stripe)", price: "+ ₹5,000" },
                  { state: needContent, setter: setNeedContent, label: "Copywriting & Content Assistance", price: "+ ₹6,000" },
                ].map((addon, idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 text-xs font-semibold text-white">
                      <input
                        type="checkbox"
                        checked={addon.state}
                        onChange={(e) => addon.setter(e.target.checked)}
                        className="accent-[#ff6b00] w-4 h-4 rounded"
                      />
                      <span>{addon.label}</span>
                    </div>
                    <span className="text-xs text-white/50 font-mono">{addon.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Quotation Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#1c0f08] via-[#120904] to-[#090503] rounded-3xl border border-[#ff6b00]/40 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#ff6b00]">
                  ESTIMATED PROJECT COST
                </span>
                <div className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  ₹{cost.min.toLocaleString()} - ₹{cost.max.toLocaleString()}
                </div>
                <p className="text-xs text-white/50">
                  Estimated Timeline: <strong>{pagesCount <= 5 ? "7 - 10 Days" : "14 - 21 Days"}</strong>
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-emerald-400" />
                  <span>Free SSL Certificate &amp; Domain Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-emerald-400" />
                  <span>Mobile-First Responsive Layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-emerald-400" />
                  <span>Next.js / WordPress Admin Panel Access</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
                >
                  <HiChatBubbleLeftRight size={18} />
                  <span>Get Official Quotation on WhatsApp →</span>
                </button>

                <Link
                  href="/contact"
                  className="block text-center w-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl border border-white/15 transition-all"
                >
                  Book Agency Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
