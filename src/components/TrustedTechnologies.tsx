import React from "react";
import { HiRocketLaunch } from "react-icons/hi2";

const technologies = [
  { name: "Next.js 16", desc: "React Framework", color: "border-white/20 text-white" },
  { name: "WordPress API", desc: "Headless CMS", color: "border-blue-500/30 text-blue-400" },
  { name: "TailwindCSS v4", desc: "Styling Engine", color: "border-cyan-500/30 text-cyan-400" },
  { name: "TypeScript", desc: "Type Safety", color: "border-blue-400/30 text-blue-300" },
  { name: "Node.js", desc: "Server Runtime", color: "border-emerald-500/30 text-emerald-400" },
  { name: "Google Search Console", desc: "SEO Indexing", color: "border-amber-500/30 text-amber-400" },
  { name: "WooCommerce API", desc: "Digital Store", color: "border-purple-500/30 text-purple-400" },
  { name: "Schema.org / GEO", desc: "AI Citations", color: "border-[#ff6b00]/30 text-[#ff6b00]" },
];

export default function TrustedTechnologies() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-white">
      <div className="bg-[#120904] rounded-3xl p-8 md:p-14 border border-white/10 space-y-8 text-center md:text-left relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
              <HiRocketLaunch size={14} />
              <span>TRUSTED TECHNOLOGIES</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">
              Built for the Platforms You Use
            </h2>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              Maajanki WebTech develops WordPress plugins, website templates, AI tools, and web solutions that integrate seamlessly with leading platforms and technologies used by businesses, developers, and creators worldwide.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className={`bg-white/5 border ${tech.color} p-4 rounded-2xl flex flex-col justify-center space-y-1 hover:bg-white/10 transition-colors`}
            >
              <div className="font-extrabold text-sm text-white">{tech.name}</div>
              <div className="text-[11px] text-white/50">{tech.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
