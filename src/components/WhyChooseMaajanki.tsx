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
    title: "Premium Plugins",
    desc: "Powerful plugins for performance, speed, and growth.",
  },
  {
    icon: HiCheckCircle,
    title: "Ready Templates",
    desc: "Responsive, SEO-friendly Next.js & WordPress designs.",
  },
  {
    icon: HiCpuChip,
    title: "AI Powered Tools",
    desc: "Modern AI automation software & lead generators.",
  },
  {
    icon: HiMagnifyingGlass,
    title: "SEO Optimized",
    desc: "Built for modern Google search visibility & AI citations.",
  },
  {
    icon: HiShieldCheck,
    title: "Fast Support",
    desc: "Professional assistance, video tutorials & documentation.",
  },
  {
    icon: HiArrowPath,
    title: "Regular Updates",
    desc: "Continuous code improvements, security & compatibility.",
  },
];

const statNumbers = [
  { value: "50+", label: "Website Templates" },
  { value: "10+", label: "WordPress Plugins" },
  { value: "AI", label: "Powered Products" },
  { value: "100%", label: "Responsive Design" },
  { value: "SEO", label: "AI Search Ready" },
  { value: "24/7", label: "Support & Updates" },
];

export default function WhyChooseMaajanki() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-[#120904] rounded-3xl p-8 md:p-14 border border-white/10 shadow-2xl space-y-12 relative overflow-hidden text-white">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
              <HiSparkles size={16} />
              <span>WHY CHOOSE MAAJANKI</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              The Complete Digital Growth &amp; Web Ecosystem
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Maajanki WebTech helps businesses, bloggers, agencies, and creators build, launch, optimize, automate, and grow websites using premium plugins, templates, AI tools, SaaS products, and professional development services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/products"
              className="bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>Explore Products</span>
              <HiArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/15 transition-all"
            >
              Our Services
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
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-2xl space-y-3 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/20 text-[#ff6b00] flex items-center justify-center group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ff6b00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stat Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 relative z-10">
          {statNumbers.map((s, i) => (
            <div
              key={i}
              className="bg-black/40 border border-white/10 p-4 rounded-2xl text-center space-y-1"
            >
              <div className="text-2xl md:text-3xl font-black text-[#ff6b00]">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
