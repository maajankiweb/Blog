"use client";

import React from "react";
import Image from "next/image";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

interface BrewPluseAdCardProps {
  className?: string;
}

export default function BrewPluseAdCard({ className = "" }: BrewPluseAdCardProps) {
  const productUrl = "https://brewpluse.com";

  return (
    <div
      className={`bg-gradient-to-br from-[#042f2e] via-[#064e3b] to-[#022c22] p-5 rounded-2xl border border-emerald-500/30 text-white relative overflow-hidden shadow-lg hover:border-emerald-400/50 transition-all duration-300 group ${className}`}
    >
      {/* Decorative Glow Effects */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-400/35 transition-all" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-teal-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          CAFE &amp; RESTAURANT POS
        </span>
        <span className="text-xs text-emerald-200/60 font-semibold uppercase tracking-wider">
          AD
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10">
        {/* Real Cafe Storefront Graphic */}
        <div className="relative h-32 w-full rounded-xl overflow-hidden border border-emerald-400/20 shadow-sm bg-slate-900">
          <Image
            src="/brewpluse-cafe.jpg"
            alt="BrewPluse POS Cafe Management Software"
            fill
            sizes="280px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2.5 text-[11px] font-bold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
            BrewPluse Cloud POS
          </span>
        </div>

        <div>
          <p className="font-extrabold text-white text-base leading-snug">
            BrewPluse POS
          </p>
          <p className="text-emerald-100/90 text-xs leading-relaxed mt-1">
            Cloud cafe &amp; restaurant management software. Lightning-fast billing, automated inventory alerts, and QR ordering to scale your food business.
          </p>
        </div>

        {/* Feature Highlights */}
        <ul className="text-xs text-emerald-200/90 space-y-1.5 font-medium pt-1">
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> Fast Cloud POS &amp; Kitchen KOT
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> Recipe &amp; Real-time Stock Inventory
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">✓</span> Contactless QR Digital Menus
          </li>
        </ul>

        {/* CTA Button */}
        <a
          href={productUrl}
          target="_blank"
          rel="noopener sponsored"
          className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-emerald-950/40 active:scale-[0.98]"
        >
          <span>Explore BrewPluse POS</span>
          <HiArrowTopRightOnSquare className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
