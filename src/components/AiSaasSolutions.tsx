import React from "react";
import Link from "next/link";
import {
  HiCpuChip,
  HiStar,
  HiQrCode,
  HiDocumentText,
  HiWrenchScrewdriver,
  HiPrinter,
  HiArrowRight,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";

export default function AiSaasSolutions() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-white">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiCpuChip size={16} />
            <span>AI POWERED SAAS SOLUTIONS</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Software Built To Help Businesses Work Smarter
          </h2>

          <p className="text-sm md:text-base text-white/70 leading-relaxed">
            Maajanki WebTech develops modern AI software and SaaS products for businesses, agencies, creators, and website owners to automate workflows and scale fast.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/80 pt-2">
            <span className="flex items-center gap-1 font-bold text-[#ff6b00]">
              <HiStar className="fill-current" /> Trusted by 500+ businesses
            </span>
            <span>• 4.9/5 average rating</span>
            <span>• 99.9% uptime guarantee</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: ReviewFlow AI */}
          <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-[#ff6b00]/50 transition-all shadow-2xl relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  LIVE PRODUCT
                </span>
                <span className="text-xs text-white/40 font-mono">ReviewFlow AI</span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-[#ff6b00] transition-colors">
                ReviewFlow AI
              </h3>

              <p className="text-xs text-white/70 leading-relaxed">
                AI-powered Google Review management platform that helps Indian businesses collect more customer reviews using smart QR codes and AI-assisted review writing.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["AI Reviews", "QR Generator", "Analytics", "Google Automation"].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/5 border border-white/10 text-white/80 text-[11px] font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mini Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div className="text-lg font-black text-[#ff6b00]">1,284</div>
                  <div className="text-[10px] text-white/50">Total Reviews</div>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div className="text-lg font-black text-white">4.8 ★</div>
                  <div className="text-[10px] text-white/50">Avg Rating</div>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <div className="text-lg font-black text-emerald-400">92%</div>
                  <div className="text-[10px] text-white/50">Response Rate</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <Link
                href="/products"
                className="text-xs font-bold text-[#ff6b00] hover:underline flex items-center gap-1"
              >
                <span>Explore SaaS Product</span>
                <HiArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: PDFGo */}
          <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-[#ff6b00]/50 transition-all shadow-2xl relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  LIVE PRODUCT
                </span>
                <span className="text-xs text-white/40 font-mono">PDFGo</span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-[#ff6b00] transition-colors">
                PDFGo Browser Utilities
              </h3>

              <p className="text-xs text-white/70 leading-relaxed">
                Fast, secure browser-based PDF utilities for everyday document management, file conversion, merging, and compression.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Merge PDF", "Split PDF", "Compress", "Image to PDF"].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/5 border border-white/10 text-white/80 text-[11px] font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <Link
                href="/tools"
                className="text-xs font-bold text-[#ff6b00] hover:underline flex items-center gap-1"
              >
                <span>Visit PDF Tools</span>
                <HiArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 3: Multi Tools Platform */}
          <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-[#ff6b00]/50 transition-all shadow-2xl relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  200+ UTILITIES
                </span>
                <span className="text-xs text-white/40 font-mono">Multi Tools</span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-[#ff6b00] transition-colors">
                Free Multi Tools Platform
              </h3>

              <p className="text-xs text-white/70 leading-relaxed">
                200+ free online tools including calculators, converters, SEO meta generators, and web developer utilities.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["200+ Tools", "Image Tools", "Dev Tools", "SEO Tools"].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/5 border border-white/10 text-white/80 text-[11px] font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <Link
                href="/tools"
                className="text-xs font-bold text-[#ff6b00] hover:underline flex items-center gap-1"
              >
                <span>Launch Tools Hub →</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Printer & Productivity Tools */}
          <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-[#ff6b00]/50 transition-all shadow-2xl relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  COMING SOON
                </span>
                <span className="text-xs text-white/40 font-mono">Print Tools</span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-[#ff6b00] transition-colors">
                Printer &amp; Image Studio Tools
              </h3>

              <p className="text-xs text-white/70 leading-relaxed">
                Productivity platform for print shops and creators with passport photo makers, cropping utilities, and document formatting.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Passport Maker", "Image Crop", "Print Utilities", "Documents"].map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white/5 border border-white/10 text-white/80 text-[11px] font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-white/40 font-semibold">
                In Development
              </span>
            </div>
          </div>
        </div>

        {/* Ready to Grow CTA */}
        <div className="bg-gradient-to-r from-[#170e09] to-[#0d0704] rounded-3xl p-8 border border-[#ff6b00]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to Grow Faster With AI?</h3>
            <p className="text-xs text-white/70">
              Discover practical software designed to automate your workflow, save time, and scale.
            </p>
          </div>
          <Link
            href="/products"
            className="bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md shrink-0"
          >
            Explore SaaS Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
