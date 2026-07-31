import { Metadata } from "next";
import Link from "next/link";
import {
  HiWrenchScrewdriver,
  HiCalculator,
  HiCodeBracket,
  HiSparkles,
  HiDocumentText,
  HiPhoto,
  HiArrowRight,
} from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Free Web & SEO Developer Tools | Maajanki WebTech",
  description:
    "Free online web development, SEO, and business tools for Indian business owners, freelancers, and developers. Calculate website costs, generate meta tags, format JSON, and build GST invoices.",
  openGraph: {
    title: "Free Web & SEO Developer Tools | Maajanki WebTech",
    description:
      "Instant free online tools: Website Cost Calculator India, Meta Tag Generator, GST Invoice Helper, JSON Formatter & WebP Image Converter.",
    type: "website",
  },
};

const toolsList = [
  {
    id: "website-cost-calculator",
    name: "Website Development Cost Calculator India (2026)",
    category: "BUSINESS & ESTIMATION",
    description:
      "Calculate custom website, Next.js web app, or WordPress development cost in India with detailed cost breakdowns.",
    href: "/tools/website-cost-calculator",
    icon: HiCalculator,
    badge: "POPULAR",
    accent: "from-[#ff6b00] to-amber-500",
  },
  {
    id: "meta-tag-generator",
    name: "SEO & OpenGraph Meta Tag Generator",
    category: "SEO & MARKETING",
    description:
      "Generate clean SEO title tags, meta descriptions, OpenGraph social cards, and Twitter cards with live preview.",
    href: "/tools/meta-tag-generator",
    icon: HiDocumentText,
    badge: "FREE",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: "gst-invoice-generator",
    name: "GST & Freelancer Invoice Estimator",
    category: "BUSINESS & FINANCE",
    description:
      "Calculate 18% GST, SAC codes, and generate compliant invoices for Indian & global clients (InvoBill Helper).",
    href: "/tools/gst-invoice-generator",
    icon: HiWrenchScrewdriver,
    badge: "ESSENTIAL",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "WEB DEVELOPMENT",
    description:
      "Format, validate, beautify, and minify raw JSON payloads instantly with syntax error detection.",
    href: "/tools/json-formatter",
    icon: HiCodeBracket,
    badge: "DEV TOOL",
    accent: "from-purple-500 to-pink-500",
  },
  {
    id: "image-webp-converter",
    name: "Image to WebP Converter",
    category: "SPEED & OPTIMIZATION",
    description:
      "Convert PNG/JPG images to high-compression WebP format in your browser to pass Core Web Vitals.",
    href: "/tools/image-webp-converter",
    icon: HiPhoto,
    badge: "SPEED TOOL",
    accent: "from-orange-500 to-red-500",
  },
];

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-[#090503] text-white py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiSparkles size={16} />
            <span>100% FREE BROWSER UTILITIES</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Free Developer, SEO &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-amber-400">Business Tools Hub</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 font-normal leading-relaxed">
            Instant, zero-install online tools designed for Indian businesses, agency founders, freelancers, and web developers. Built for fast client-side execution with zero data tracking.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group relative bg-[#120904] rounded-3xl border border-white/10 hover:border-[#ff6b00]/50 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Background Glow Accent */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${tool.accent} rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity`}
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[#ff6b00] text-[10px] font-black uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <span className="bg-white/10 text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                      {tool.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ff6b00] group-hover:border-[#ff6b00] transition-colors">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff6b00] transition-colors leading-snug">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-white/60 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#ff6b00] font-bold relative z-10">
                  <span>Launch Tool</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    <HiArrowRight size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Agency CTA Banner */}
        <div className="bg-gradient-to-r from-[#170e09] via-[#120904] to-[#0d0704] rounded-3xl p-8 md:p-12 border border-[#ff6b00]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
          <div className="space-y-2 max-w-2xl relative z-10">
            <span className="text-[#ff6b00] text-xs font-black uppercase tracking-widest">
              NEED A CUSTOM TOOL OR WEB APP?
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Build Your High-Converting Custom Web Application
            </h2>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              Maajanki WebTech builds ultra-fast Next.js web applications, SaaS tools, and custom WordPress systems optimized for search rankings and lead conversion.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shrink-0 relative z-10 active:scale-95"
          >
            <span>Get Free Project Quote →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
