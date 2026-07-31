"use client";

import React from "react";
import Link from "next/link";
import { HiSparkles, HiArrowRight, HiDocumentText, HiCurrencyRupee, HiChartBar, HiWrench } from "react-icons/hi2";

interface GuideItem {
  id: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  icon: React.ComponentType<{ className?: string }>;
  slug?: string;
}

const mustReadGuides: GuideItem[] = [
  {
    id: "invoicing-guide",
    title: "GST & International Invoicing Guide for Indian Devs & Freelancers",
    category: "BUSINESS & FINANCE",
    description: "Learn how to legally invoice Indian and global clients, calculate GST, and use free tools like InvoBill.",
    readTime: "6 min read",
    icon: HiCurrencyRupee,
    slug: "gst-invoicing-guide-freelancers-india",
  },
  {
    id: "website-cost",
    title: "How Much Does a Custom Business Website Cost in India (2026)?",
    category: "WEB DEVELOPMENT",
    description: "A complete breakdown of domain, hosting, custom Next.js/WordPress development costs vs DIY builders.",
    readTime: "8 min read",
    icon: HiWrench,
    slug: "website-development-cost-india-guide",
  },
  {
    id: "seo-vs-ads",
    title: "SEO vs Google Ads: Which is Best for Small Business Growth?",
    category: "SEO & MARKETING",
    description: "Compare long-term organic ranking value against instant paid search ads to maximize your ROI.",
    readTime: "7 min read",
    icon: HiChartBar,
    slug: "seo-vs-google-ads-roi-small-business",
  },
  {
    id: "indexing-fixes",
    title: "Fix Discovered - Currently Not Indexed Errors in GSC",
    category: "TECHNICAL SEO",
    description: "Step-by-step troubleshooting guide for getting your web pages crawled and indexed fast by Google.",
    readTime: "5 min read",
    icon: HiDocumentText,
    slug: "fix-google-search-console-indexing-errors",
  },
];

export default function StartHereSection() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-gradient-to-br from-[#170e09] via-[#100905] to-[#0a0503] rounded-3xl p-8 md:p-12 border border-[#ff6b00]/25 shadow-2xl text-white relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#ff6b00]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-widest">
              <HiSparkles className="w-3.5 h-3.5" />
              <span>NEW VISITOR ROADMAP</span>
            </div>
            <h2 className="font-extrabold text-2xl md:text-4xl text-white tracking-tight leading-tight">
              Start Here: Must-Read Digital Growth Guides
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              New to Maajanki? We&apos;ve handpicked our highest-impact articles on web development, SEO, and business operations to fast-track your growth.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-200 shrink-0"
          >
            Explore All Archives <HiArrowRight size={14} />
          </Link>
        </div>

        {/* Must Read Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {mustReadGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.id}
                href={guide.slug ? `/blog/${guide.slug}` : "/blog"}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff6b00]/50 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-md hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#ff6b00] text-[10px] font-black uppercase tracking-wider">
                      {guide.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#ffb693] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-3">
                    {guide.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 group-hover:text-white/80 transition-colors">
                  <span>{guide.readTime}</span>
                  <span className="text-[#ff6b00] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read guide →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
