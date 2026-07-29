"use client";

import React from "react";

interface AdBannerProps {
  variant?: "sidebar" | "banner";
  className?: string;
}

export default function AdBanner({ variant = "sidebar", className = "" }: AdBannerProps) {
  return (
    <div
      className={`bg-surface p-5 rounded-2xl border-2 border-primary-container/20 relative overflow-hidden shadow-sm hover:border-primary-container/40 transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-primary-container/15 text-primary-container rounded-full border border-primary-container/30">
          SPONSORED
        </span>
        <span className="text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">
          Ad
        </span>
      </div>

      <div className="space-y-2">
        <h4 className="font-headline-md text-base font-extrabold text-on-surface leading-snug">
          Accelerate Your Digital Growth with Osdire
        </h4>
        <p className="text-on-surface-variant text-xs leading-relaxed">
          Unlock premium digital tools, web optimization, and specialized infrastructure designed for modern businesses.
        </p>
        <a
          href="https://osdire.com/aff/ashish_kumar_dchb-1"
          target="_blank"
          rel="noopener sponsored"
          className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-primary-container hover:bg-[#e05e00] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 shadow-sm active:scale-[0.98]"
        >
          Explore Osdire Offers →
        </a>
      </div>

      {/* Placeholder slot for future Adsterra / Google Ads scripts integration:
          <div id="adsterra-ad-container">
            Future Adsterra or Google Ads script code can be dynamically mounted here
          </div>
      */}
    </div>
  );
}
