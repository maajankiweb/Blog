import React from "react";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { BsShieldCheck } from "react-icons/bs";

export default function AgencyConsultationCta() {
  return (
    <div className="my-10 p-6 md:p-8 bg-gradient-to-br from-[#14213d] to-[#0a1120] text-white rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden not-prose">
      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#dc2564]/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dc2564]/20 border border-[#dc2564]/40 rounded-full text-[#ff7597] text-xs font-bold uppercase tracking-wider">
            <BsShieldCheck className="w-4 h-4" />
            <span>Maajanki Web Tech LLP • Verified Agency Service</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
            Need a High-Performance Website or SEO in Bihar & India?
          </h3>
          <p className="text-white/75 text-sm leading-relaxed">
            From lightning-fast Next.js websites to WordPress architectures and local search dominance in Bihar (Bagaha, Bettiah, Patna), we engineer digital platforms that drive measurable revenue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <a
            href="https://www.maajankiwebtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#dc2564] hover:bg-[#c2185b] text-white font-extrabold text-sm py-3 px-6 rounded-2xl transition-all shadow-lg hover:shadow-[#dc2564]/25 hover:scale-[1.02]"
          >
            <span>Explore Agency Services</span>
            <HiArrowUpRight className="w-4 h-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-sm py-3 px-5 rounded-2xl border border-white/15 transition-all text-center"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
