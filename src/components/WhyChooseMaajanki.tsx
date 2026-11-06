import React from "react";
import Link from "next/link";
import {
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiWrench,
  HiCpuChip,
  HiMagnifyingGlass,
  HiShieldCheck,
  HiArrowPath,
} from "react-icons/hi2";

const features = [
  {
    icon: HiWrench,
    title: "Production WordPress Plugins",
    desc: "Lightweight, enterprise-tested plugins engineered for speed, clean code, and business automation.",
  },
  {
    icon: HiCheckCircle,
    title: "Next.js 16 Starter Blueprints",
    desc: "Modern App Router templates with TypeScript, TailwindCSS, SEO metadata, and instant revalidation.",
  },
  {
    icon: HiCpuChip,
    title: "AI Tools & Automation",
    desc: "Smart calculators, schema generators, and automation scripts to accelerate your client projects.",
  },
  {
    icon: HiMagnifyingGlass,
    title: "Technical SEO & GEO Built-In",
    desc: "Structured schema.org markup and AI citation-ready architecture designed to win search rankings.",
  },
  {
    icon: HiShieldCheck,
    title: "Verified Razorpay Commerce",
    desc: "Instant digital product delivery with GST-compliant Indian invoicing and direct file downloads.",
  },
  {
    icon: HiArrowPath,
    title: "Continuous Updates & Support",
    desc: "Regular updates, detailed step-by-step tutorials, and responsive founder-level developer support.",
  },
];

const statNumbers = [
  { value: "50+", label: "Guides & Dispatches" },
  { value: "10+", label: "Digital Products" },
  { value: "100%", label: "Responsive Layouts" },
  { value: "Next.js", label: "Modern Architecture" },
  { value: "SEO", label: "Search Engine Ready" },
  { value: "24/7", label: "Documentation Access" },
];

export default function WhyChooseMaajanki() {
  return (
    <section suppressHydrationWarning className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div suppressHydrationWarning className="bg-slate-50/70 rounded-3xl p-8 md:p-14 border border-slate-200/80 shadow-sm space-y-12 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2564]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-200 relative z-10">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F5] border border-[#FBCFE8] text-[#DC2564] text-xs font-bold uppercase tracking-wider">
              <HiSparkles size={14} />
              <span>THE MAAJANKI ADVANTAGE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              An Elite Ecosystem for Modern Web Development &amp; Growth
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              MJ Digital equips developers, creators, and agencies with production-grade templates, verified WordPress plugins, AI-powered tools, and actionable engineering guides to build faster and scale confidently.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/products"
              className="bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm shadow-[#DC2564]/20 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Digital Store</span>
              <HiArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-slate-200 transition-all shadow-xs"
            >
              Our Agency Services
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white hover:bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 transition-all duration-200 hover:shadow-md hover:border-slate-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F5] text-[#DC2564] flex items-center justify-center group-hover:bg-[#DC2564] group-hover:text-white transition-colors duration-200">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#DC2564] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stat Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 relative z-10">
          {statNumbers.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/80 p-4 rounded-2xl text-center space-y-1 shadow-xs"
            >
              <div className="text-2xl md:text-3xl font-black text-[#DC2564]">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold text-slate-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
