"use client";

import React from "react";
import { HiStar, HiArrowTrendingUp } from "react-icons/hi2";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amit Varma",
    role: "Founder, Varma Retail & E-Commerce",
    content:
      "Working with Maajanki WebTech completely revamped our store architecture and local SEO strategy. Our organic monthly traffic grew 180% in 90 days and conversion rates doubled!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sneha Roy",
    role: "Digital Marketing Specialist",
    content:
      "I follow Maajanki Blog regularly for technical SEO and indexing strategies. The step-by-step guides on Google Search Console fixes helped us boost our organic traffic by 40% in just two months!",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul Sharma",
    role: "Freelance Web Developer",
    content:
      "The YouTube tutorials on AK Web Master Hub combined with detailed blog posts here gave me the exact skills needed to start invoicing international clients. Highly recommended for every web dev!",
    rating: 5,
  },
];

const caseStudies = [
  { metric: "+180%", label: "Organic Search Growth", sub: "E-Commerce Client (90 Days)" },
  { metric: "#1 Rank", label: "Local Keywords Secured", sub: "Service Business Wins" },
  { metric: "2.5x", label: "Lead Conversion Increase", sub: "Custom Next.js & WP Redesign" },
  { metric: "99.9%", label: "Core Web Vitals Pass", sub: "PageSpeed Performance" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto space-y-12">
        
        {/* Case Studies / Client Results Strip */}
        <div className="bg-[#120904] rounded-2xl p-6 md:p-8 border border-white/10 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-6 text-[#ff6b00] text-xs font-extrabold uppercase tracking-widest">
            <HiArrowTrendingUp className="w-4 h-4" />
            <span>CLIENT RESULTS &amp; CASE STUDY HIGHLIGHTS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="space-y-1 border-r border-white/10 last:border-r-0 pr-4">
                <p className="text-2xl md:text-4xl font-black text-white tracking-tight">
                  <span className="text-[#ff6b00]">{cs.metric}</span>
                </p>
                <p className="text-xs md:text-sm font-bold text-white/90 leading-tight">
                  {cs.label}
                </p>
                <p className="text-[11px] text-white/50">
                  {cs.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-[#ff6b00] font-label-md text-xs uppercase tracking-widest font-extrabold">
            REAL CLIENT &amp; COMMUNITY REVIEWS
          </span>
          <h2 className="font-display-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            What Business Owners &amp; Developers Say
          </h2>
          <p className="text-on-surface-variant font-body-md text-sm md:text-base leading-relaxed">
            Real feedback from business leaders, digital marketers, and developers who have scaled their web platforms and organic search presence using our strategies and services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-surface-container-low border border-outline-variant/30 p-lg rounded-2xl flex flex-col justify-between hover:border-[#ff6b00]/40 transition-all duration-300 shadow-xs"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                {/* Content */}
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              {/* Author info */}
              <div className="pt-6 mt-6 border-t border-outline-variant/20">
                <div>
                  <h4 className="font-bold text-on-surface text-sm leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant/70 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

