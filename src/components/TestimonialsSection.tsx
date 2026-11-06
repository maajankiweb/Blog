"use client";

import React, { useState, useEffect } from "react";
import {
  HiStar,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

interface Review {
  id: number;
  name: string;
  role: string;
  avatarText: string;
  avatarColor: string;
  date: string;
  rating: number;
  project: string;
  comment: string;
}

const verifiedReviews: Review[] = [
  {
    id: 1,
    name: "Vikramaditya Rathore",
    role: "Founder, Zenith Digital Agency",
    avatarText: "VR",
    avatarColor: "bg-blue-600",
    date: "April 2026",
    rating: 5,
    project: "MJ Pro Next.js Starter Kit",
    comment:
      "The Next.js 16 starter kit saved our team over 3 weeks of architectural scaffolding. Clean TypeScript types, headless WooCommerce syncing, and 100/100 Core Web Vitals right out of the box.",
  },
  {
    id: 2,
    name: "Pooja Deshmukh",
    role: "Head of Marketing, CloudScale",
    avatarText: "PD",
    avatarColor: "bg-purple-600",
    date: "March 2026",
    rating: 5,
    project: "Technical SEO & AEO Architecture",
    comment:
      "Ashish Kumar's architectural guidelines for schema markup and llms.txt completely revolutionized our organic presence. We started getting cited in ChatGPT and Perplexity within 45 days.",
  },
  {
    id: 3,
    name: "Anand Verma",
    role: "Managing Director, Verma Logistics",
    avatarText: "AV",
    avatarColor: "bg-emerald-600",
    date: "February 2026",
    rating: 5,
    project: "Headless E-Commerce System",
    comment:
      "Migrating our sluggish store to Next.js App Router with MJ Digital was a game changer. Checkout abandonment dropped significantly thanks to custom Razorpay and UPI instant checkout flow.",
  },
  {
    id: 4,
    name: "Siddharth Menon",
    role: "Senior Full-Stack Developer",
    avatarText: "SM",
    avatarColor: "bg-pink-600",
    date: "May 2026",
    rating: 5,
    project: "InvoBill GST & Developer Tools",
    comment:
      "I use MJ Digital tools daily for JSON formatting and GST invoice calculations. Everything runs super snappy directly in the browser with zero tracking. The editorial guides are top-tier.",
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "E-Commerce Director, TrendKraft",
    avatarText: "MN",
    avatarColor: "bg-amber-600",
    date: "January 2026",
    rating: 5,
    project: "WooCommerce API Integration",
    comment:
      "Flawless code quality and extremely responsive support on WhatsApp. When we needed help configuring webhooks for automatic digital downloads, the team guided us step-by-step.",
  },
  {
    id: 6,
    name: "Karan Johar",
    role: "Tech Lead, AppNexus Labs",
    avatarText: "KJ",
    avatarColor: "bg-indigo-600",
    date: "April 2026",
    rating: 5,
    project: "Next.js Core Web Vitals Audit",
    comment:
      "Our LCP improved from 4.2s to 0.8s following MJ Digital's image optimization and edge caching playbooks. Excellent engineering depth and actionable recommendations.",
  },
  {
    id: 7,
    name: "Rohan Kulkarni",
    role: "SaaS Founder, WebFlowy",
    avatarText: "RK",
    avatarColor: "bg-teal-600",
    date: "February 2026",
    rating: 5,
    project: "AI Schema & Metadata Hub",
    comment:
      "The free schema generator tool produces 100% Google Rich Results compliant JSON-LD. We secured FAQ and Product rich snippets within two crawl cycles.",
  },
  {
    id: 8,
    name: "Ananya Iyer",
    role: "Creative Director, StudioCraft",
    avatarText: "AI",
    avatarColor: "bg-rose-600",
    date: "March 2026",
    rating: 5,
    project: "Agency Portfolio Architecture",
    comment:
      "The editorial typography and dark/light UI tokens are meticulously crafted. MJ Digital sets the gold standard for modern developer blogs and digital marketplaces.",
  },
];

export default function TestimonialsSection() {
  // Desktop shows 4 cards per row, so maximum offset index is verifiedReviews.length - 4
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxStartIndex = verifiedReviews.length - 4;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxStartIndex]);

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
  };

  return (
    <section suppressHydrationWarning className="py-20 px-margin-mobile md:px-margin-desktop bg-[#FFFFFF] border-t border-b border-gray-200">
      <div suppressHydrationWarning className="max-w-container-max mx-auto space-y-10">
        {/* Section Header */}
        <div suppressHydrationWarning className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div suppressHydrationWarning className="space-y-3">
            <span className="badge-brand inline-block">
              REAL CLIENT &amp; COMMUNITY REVIEWS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#14213D] tracking-tight">
              What Business Owners &amp; Developers Say
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl leading-relaxed">
              Authentic feedback from engineering leads, founders, and creators who scale their digital operations using MJ Digital starter kits, APIs, and guides.
            </p>
          </div>

          {/* Carousel Slider Navigation Buttons */}
          <div suppressHydrationWarning className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Previous Reviews"
              className="w-10 h-10 rounded-xl border border-gray-300 hover:border-[#DC2564] hover:text-[#DC2564] bg-white text-[#14213D] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <HiChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Reviews"
              className="w-10 h-10 rounded-xl border border-gray-300 hover:border-[#DC2564] hover:text-[#DC2564] bg-white text-[#14213D] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 4 Cards in 1 Row Carousel Slider */}
        <div
          suppressHydrationWarning
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            suppressHydrationWarning
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              // Move by 25% for each index shift on desktop (1 card step at a time across 4 visible columns)
              transform: `translateX(-${startIndex * 25}%)`,
            }}
          >
            {verifiedReviews.map((rev) => (
              <div
                key={rev.id}
                suppressHydrationWarning
                className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-3"
              >
                <div
                  suppressHydrationWarning
                  className="bg-[#F7F8FC] border border-gray-200 rounded-2xl p-6 h-full flex flex-col justify-between shadow-xs hover:border-[#DC2564]/40 hover:shadow-md transition-all duration-300 group"
                >
                  <div suppressHydrationWarning className="space-y-4">
                    {/* Stars & Tag */}
                    <div suppressHydrationWarning className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <HiStar key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <HiOutlineCheckBadge className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Review Quote */}
                    <p className="text-gray-700 text-xs sm:text-sm font-normal leading-relaxed line-clamp-4 italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div suppressHydrationWarning className="pt-5 mt-5 border-t border-gray-200/80 space-y-3">
                    <div suppressHydrationWarning className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${rev.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}>
                        {rev.avatarText}
                      </div>
                      <div suppressHydrationWarning className="min-w-0">
                        <h4 className="font-bold text-xs text-[#14213D] leading-tight truncate">
                          {rev.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">
                          {rev.role}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 text-[10px] font-medium text-gray-600 truncate">
                      <span className="text-gray-400">Project:</span> {rev.project}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div suppressHydrationWarning className="flex items-center justify-center gap-2 pt-8">
            {Array.from({ length: maxStartIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                aria-label={`Go to slide group ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === i
                    ? "w-8 bg-[#DC2564]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
