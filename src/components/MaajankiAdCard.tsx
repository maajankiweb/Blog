"use client";

import React from "react";
import Image from "next/image";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

interface MaajankiAdCardProps {
  className?: string;
}

export default function MaajankiAdCard({ className = "" }: MaajankiAdCardProps) {
  const agencyUrl = "https://maajankiwebtech.com";

  return (
    <div
      className={`bg-gradient-to-br from-[#0c1427] via-[#111e3b] to-[#18284d] p-5 rounded-2xl border border-orange-500/30 text-white relative overflow-hidden shadow-lg hover:border-orange-400/50 transition-all duration-300 group ${className}`}
    >
      {/* Decorative Glow Effects */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-600/25 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/35 transition-all" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-orange-500/20 text-orange-300 rounded-full border border-orange-400/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          FEATURED AGENCY
        </span>
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          AD
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10">
        {/* Brand Banner with Real Logo */}
        <div className="bg-white/95 rounded-xl p-3 flex items-center justify-center border border-white/20 shadow-xs">
          <div className="relative w-full h-10">
            <Image
              src="/maajanki-web-tech-logo.webp"
              alt="Maajanki Web Tech Agency"
              fill
              sizes="280px"
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <p className="font-extrabold text-white text-base leading-snug">
            Maajanki Web Tech LLP
          </p>
          <p className="text-slate-300 text-xs leading-relaxed mt-1">
            Full-service digital agency building custom web applications, high-converting eCommerce platforms, and data-driven SEO growth engines.
          </p>
        </div>

        {/* Feature Highlights */}
        <ul className="text-xs text-orange-200/90 space-y-1.5 font-medium pt-1">
          <li className="flex items-center gap-1.5">
            <span className="text-orange-400 font-bold">✓</span> Custom Next.js &amp; Headless WordPress
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-orange-400 font-bold">✓</span> Technical SEO, Speed &amp; 3x CRO
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-orange-400 font-bold">✓</span> Complete Digital Marketing &amp; Branding
          </li>
        </ul>

        {/* CTA Button */}
        <a
          href={agencyUrl}
          target="_blank"
          rel="noopener sponsored"
          className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-[#DC2564] hover:from-orange-600 hover:to-[#B81D52] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-orange-900/40 active:scale-[0.98]"
        >
          <span>Visit Maajanki Web Tech</span>
          <HiArrowTopRightOnSquare className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
