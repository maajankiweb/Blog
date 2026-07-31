import React from "react";
import Link from "next/link";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";

export default function HomepageFinalCta() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-gradient-to-r from-[#170e09] via-[#120904] to-[#0a0503] rounded-3xl p-8 md:p-14 border border-[#ff6b00]/40 shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6b00]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiSparkles size={16} />
            <span>READY TO GET STARTED?</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Build Better Websites with Maajanki
          </h2>

          <p className="text-xs md:text-sm text-white/70 leading-relaxed">
            Explore our WordPress plugins, ready-made website templates, AI-powered tools, and professional web solutions designed to help you build, manage, and grow your website more efficiently.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full sm:w-auto">
          <Link
            href="/products"
            className="w-full sm:w-auto text-center bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Products</span>
            <HiArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl border border-white/15 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
