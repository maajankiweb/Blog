"use client";

import React from "react";

interface HostingerAdCardProps {
  className?: string;
  variant?: "sidebar" | "banner";
}

export default function HostingerAdCard({ className = "" }: HostingerAdCardProps) {
  const referralUrl = "https://www.hostinger.com/in?REFERRALCODE=maajankiweb";

  return (
    <div
      className={`bg-gradient-to-br from-[#120a2a] via-[#1a0f3d] to-[#291254] p-5 rounded-2xl border border-purple-500/30 text-white relative overflow-hidden shadow-lg hover:border-purple-400/50 transition-all duration-300 group ${className}`}
    >
      {/* Decorative Glow Effects */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/40 transition-all" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badges */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          RECOMMENDED HOSTING
        </span>
        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
          AD
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h4 className="font-headline-md text-base font-extrabold text-white leading-snug">
            Hostinger Web Hosting
          </h4>
        </div>

        <p className="text-zinc-300 text-xs leading-relaxed">
          High-speed SSD performance, free domain, SSL & 24/7 support for your website with up to 75% OFF + bonus discount.
        </p>

        {/* Features highlights */}
        <ul className="text-[11px] text-purple-200/90 space-y-1 font-medium pt-1">
          <li className="flex items-center gap-1.5">
            <span className="text-purple-400">✓</span> Free Domain & SSL Included
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-purple-400">✓</span> 99.9% Uptime Guarantee
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-purple-400">✓</span> Optimized for WordPress & Next.js
          </li>
        </ul>

        {/* CTA Button */}
        <a
          href={referralUrl}
          target="_blank"
          rel="noopener sponsored"
          className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-purple-900/40 active:scale-[0.98]"
        >
          Claim Hostinger Discount →
        </a>
      </div>
    </div>
  );
}
