import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiSparkles,
  HiUser,
  HiArrowRight,
  HiCodeBracket,
  HiCheckCircle,
} from "react-icons/hi2";

const skills = ["WordPress", "PHP", "JavaScript", "AI", "SEO", "Automation", "SaaS", "Next.js"];

const servicesList = [
  { title: "WordPress Dev", sub: "Custom themes & setups" },
  { title: "Custom Plugins", sub: "Lightweight & secure" },
  { title: "Templates", sub: "Ready-made designs" },
  { title: "AI Automation", sub: "Smart lead tools" },
  { title: "Technical SEO", sub: "AI search ready" },
  { title: "SaaS Products", sub: "Digital web solutions" },
];

export default function FounderSection() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-white">
      <div className="bg-gradient-to-br from-[#1c0f08] via-[#120904] to-[#090503] rounded-3xl p-8 md:p-14 border border-[#ff6b00]/30 shadow-2xl space-y-12 relative overflow-hidden">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiUser size={16} />
            <span>MEET THE FOUNDER</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Building Smarter Websites with Web Dev, AI &amp; Automation
          </h2>

          <p className="text-sm md:text-base text-white/70 leading-relaxed">
            Maajanki WebTech was founded to help businesses, bloggers, agencies, and creators build professional websites faster using modern Next.js &amp; WordPress solutions, AI-powered tools, SaaS products, and practical automation.
          </p>
        </div>

        {/* Profile & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Founder Image & Quick Info (4 cols) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#ff6b00] relative shadow-xl bg-neutral-900">
              <Image
                src="/ashish-kumar.png"
                alt="Ashish Kumar - Founder & Lead Developer"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Ashish Kumar</h3>
              <p className="text-xs text-[#ff6b00] font-semibold uppercase tracking-wider mt-0.5">
                Founder &amp; Lead Developer
              </p>
              <p className="text-[11px] text-white/50 mt-1">
                Creator of AK Web Master Hub &amp; InvoBill India
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-center gap-2">
              <Link
                href="/about"
                className="text-xs font-bold text-[#ff6b00] hover:underline flex items-center gap-1"
              >
                <span>View Full Bio</span>
                <HiArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Detailed Bio & Philosophy (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-normal">
              A passionate web developer, plugin creator, template designer, and AI automation enthusiast focused on building practical digital products that help website owners launch faster, improve performance, and grow with confidence.
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold px-3.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Founder Philosophy Box */}
            <div className="bg-black/50 border-l-4 border-[#ff6b00] p-5 rounded-r-2xl space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#ff6b00] font-extrabold block">
                FOUNDER PHILOSOPHY
              </span>
              <blockquote className="text-sm font-medium text-white italic">
                &quot;We build practical tools that solve real problems, helping website owners launch faster, work smarter, and grow with confidence.&quot;
              </blockquote>
            </div>

            {/* Services Quick Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {servicesList.map((s, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                  <div className="font-bold text-white">{s.title}</div>
                  <div className="text-[10px] text-white/50">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                Explore Products →
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl border border-white/15 transition-all"
              >
                View Agency Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
