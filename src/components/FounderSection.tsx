import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiUser,
  HiArrowRight,
  HiCheckBadge,
} from "react-icons/hi2";

const skills = [
  "Next.js 16",
  "Headless WordPress",
  "WooCommerce API",
  "TypeScript",
  "Technical SEO",
  "Razorpay Integrations",
  "REST APIs",
  "AI Automation",
];

export default function FounderSection() {
  return (
    <section suppressHydrationWarning className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div suppressHydrationWarning className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#14213D] rounded-3xl p-8 md:p-14 border border-slate-800 shadow-xl space-y-10 relative overflow-hidden text-white">
        {/* Subtle Ambient Brand Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2564]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#FBCFE8] text-xs font-bold uppercase tracking-wider">
            <HiUser size={14} className="text-[#DC2564]" />
            <span>LEADERSHIP &amp; ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Built by Developers, for Modern Businesses &amp; Creators
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            MJ Digital was founded with a single mission: to create practical digital tools, battle-tested software blueprints, and high-impact SEO guides that eliminate technical friction for web builders.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Founder Quick Card (4 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4 backdrop-blur-sm">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#DC2564] relative shadow-lg bg-slate-800">
              <Image
                src="/ashish-kumar.png"
                alt="Ashish Kumar - Founder & Lead Developer"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-xl font-bold text-white">Ashish Kumar</h3>
                <HiCheckBadge className="text-[#DC2564] w-5 h-5" />
              </div>
              <p className="text-xs text-[#DC2564] font-semibold uppercase tracking-wider mt-0.5">
                Founder &amp; Principal Architect
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Creator of AK Web Master Hub &amp; InvoBill India
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-center">
              <Link
                href="/about"
                className="text-xs font-bold text-white hover:text-[#DC2564] transition-colors flex items-center gap-1.5"
              >
                <span>Read Full Founder Story</span>
                <HiArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Detailed Philosophy & Tech Stack (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <blockquote className="text-base md:text-lg font-medium text-slate-200 leading-relaxed italic border-l-2 border-[#DC2564] pl-4">
              &ldquo;Great digital software should just work. We don&apos;t build bloated plugins or fragile templates; we deliver clean, performant, and reliable engineering assets that save hundreds of development hours.&rdquo;
            </blockquote>

            {/* Skills Pills */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                Core Specializations:
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 border border-white/10 text-slate-200 text-xs font-medium px-3 py-1 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
