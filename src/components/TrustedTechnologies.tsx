import React from "react";
import { HiRocketLaunch } from "react-icons/hi2";

const technologies = [
  { name: "Next.js 16", desc: "App Router & SSR", badge: "Framework" },
  { name: "WordPress REST API", desc: "Headless Content CMS", badge: "Backend" },
  { name: "TailwindCSS v4", desc: "Modern Utility Styling", badge: "Engine" },
  { name: "TypeScript 5", desc: "Strict Type Safety", badge: "Language" },
  { name: "WooCommerce API", desc: "Digital Store & Cart", badge: "Commerce" },
  { name: "Razorpay SDK", desc: "Verified Indian Payments", badge: "Checkout" },
  { name: "Google Search Console", desc: "Technical SEO & Indexing", badge: "Rankings" },
  { name: "Schema.org & GEO", desc: "AI Engine Citations", badge: "Visibility" },
];

export default function TrustedTechnologies() {
  return (
    <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F5] border border-[#FBCFE8] text-[#DC2564] text-xs font-bold uppercase tracking-wider">
              <HiRocketLaunch size={14} />
              <span>CORE ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Built on Modern, Production-Grade Standards
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Every digital template, WordPress plugin, and editorial dispatch on Maajanki is engineered using battle-tested web standards for sub-second speeds and long-term stability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl flex flex-col justify-between hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-150 group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2564] bg-[#FDF2F5] px-2 py-0.5 rounded-md inline-block mb-2">
                  {tech.badge}
                </span>
                <div className="font-bold text-sm text-slate-900 group-hover:text-[#DC2564] transition-colors">
                  {tech.name}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">{tech.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
