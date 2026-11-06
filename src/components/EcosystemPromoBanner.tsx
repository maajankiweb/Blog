"use client";

import React from "react";
import Image from "next/image";
import { HiArrowTopRightOnSquare, HiSparkles } from "react-icons/hi2";

interface EcosystemPromoBannerProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function EcosystemPromoBanner({
  className = "",
  title = "Our Core Platforms & Client Services",
  subtitle = "Discover the specialized agency solutions and commercial cloud software built by the MJ Digital team.",
}: EcosystemPromoBannerProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-container-max mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F5] border border-[#FBCFE8] text-[#DC2564] text-xs font-bold uppercase tracking-wider">
            <HiSparkles size={14} />
            <span>FEATURED ECOSYSTEM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2-Column Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Ad 1: Maajanki Web Tech Agency */}
          <div className="bg-gradient-to-br from-[#0c1427] via-[#111e3b] to-[#18284d] p-6 rounded-3xl border border-orange-500/30 text-white relative overflow-hidden shadow-xl hover:border-orange-400/60 transition-all duration-300 flex flex-col justify-between group">
            {/* Glow effects */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-600/25 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/35 transition-all" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 bg-orange-500/20 text-orange-300 rounded-full border border-orange-400/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  FULL-SERVICE AGENCY
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  AD
                </span>
              </div>

              {/* Logo Frame */}
              <div className="bg-white/95 rounded-2xl p-4 flex items-center justify-center border border-white/20 shadow-xs relative h-24">
                <div className="relative w-full h-12">
                  <Image
                    src="/maajanki-web-tech-logo.webp"
                    alt="Maajanki Web Tech Agency"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-lg leading-snug group-hover:text-orange-300 transition-colors">
                  Maajanki Web Tech LLP
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">
                  High-converting Next.js web applications, headless WooCommerce stores, and data-backed SEO growth marketing engineered for maximum business ROI.
                </p>
              </div>

              <ul className="text-xs text-orange-200/90 space-y-1.5 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span> Custom Next.js 16 &amp; Headless WordPress
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span> 3x Speed &amp; Conversion Optimization (CRO)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span> Technical SEO Dominance in Bihar &amp; India
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://maajankiwebtech.com"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-[#DC2564] hover:from-orange-600 hover:to-[#B81D52] text-white py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-orange-950/40 active:scale-[0.98]"
              >
                <span>Visit Maajanki Web Tech</span>
                <HiArrowTopRightOnSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Ad 2: BrewPluse POS */}
          <div className="bg-gradient-to-br from-[#042f2e] via-[#064e3b] to-[#022c22] p-6 rounded-3xl border border-emerald-500/30 text-white relative overflow-hidden shadow-xl hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group">
            {/* Glow effects */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/35 transition-all" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  RESTAURANT &amp; CAFE POS
                </span>
                <span className="text-xs text-emerald-200/60 font-semibold uppercase tracking-wider">
                  AD
                </span>
              </div>

              {/* Storefront Image */}
              <div className="relative h-24 w-full rounded-2xl overflow-hidden border border-emerald-400/20 shadow-xs bg-slate-900">
                <Image
                  src="/brewpluse-cafe.jpg"
                  alt="BrewPluse POS Cafe Management Software"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-white bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                  BrewPluse Cloud POS
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-lg leading-snug group-hover:text-emerald-300 transition-colors">
                  BrewPluse POS Software
                </h3>
                <p className="text-emerald-100/90 text-xs leading-relaxed mt-1">
                  Modern cloud billing, inventory alerts, and QR menu software designed specifically for cafes, bistros, bakeries, and cloud kitchens.
                </p>
              </div>

              <ul className="text-xs text-emerald-200/90 space-y-1.5 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Real-Time Cloud Billing &amp; Kitchen KOT
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Recipe Costing &amp; Auto Inventory Tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Contactless Digital QR Table Menus
                </li>
              </ul>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://brewpluse.com"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-emerald-950/40 active:scale-[0.98]"
              >
                <span>Explore BrewPluse POS</span>
                <HiArrowTopRightOnSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
