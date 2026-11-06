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
    project: "Next.js 16 Pro Starter Kit",
    comment:
      "The Next.js starter kit saved our agency over three weeks of scaffolding. Clean TypeScript types, headless WordPress syncing, and 100/100 Core Web Vitals right out of the box.",
  },
  {
    id: 2,
    name: "Pooja Deshmukh",
    role: "Head of Growth, CloudScale",
    avatarText: "PD",
    avatarColor: "bg-purple-600",
    date: "March 2026",
    rating: 5,
    project: "Technical SEO & GEO Editorial",
    comment:
      "The technical SEO and generative AI optimization articles on MJ Digital helped us rank higher and get cited across ChatGPT and Perplexity. Actionable engineering guides with zero fluff.",
  },
  {
    id: 3,
    name: "Anand Verma",
    role: "E-Commerce Director, Verma Retail",
    avatarText: "AV",
    avatarColor: "bg-emerald-600",
    date: "February 2026",
    rating: 5,
    project: "Custom WordPress Plugins",
    comment:
      "We purchased their custom WordPress plugins for our storefront. Instant digital delivery, thorough documentation, and lightweight code that integrates seamlessly without slowing down the site.",
  },
  {
    id: 4,
    name: "Siddharth Menon",
    role: "Senior Full-Stack Engineer",
    avatarText: "SM",
    avatarColor: "bg-pink-600",
    date: "May 2026",
    rating: 5,
    project: "Next.js & React Architecture",
    comment:
      "MJ Digital's deep dives on Next.js App Router, caching strategies, and server actions are top-tier. Essential reading for any engineering team building modern web applications.",
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Digital Publishing Lead, TrendKraft",
    avatarText: "MN",
    avatarColor: "bg-amber-600",
    date: "January 2026",
    rating: 5,
    project: "Headless WordPress Systems",
    comment:
      "Following MJ Digital's architectural blueprints, we transitioned to a decoupled Next.js and headless WordPress stack. Page speed and mobile user engagement improved drastically.",
  },
  {
    id: 6,
    name: "Karan Johar",
    role: "Tech Lead, AppNexus Labs",
    avatarText: "KJ",
    avatarColor: "bg-indigo-600",
    date: "April 2026",
    rating: 5,
    project: "Technical SEO Schema Playbook",
    comment:
      "The Schema Markup Playbook from their digital store is gold standard. Structured data validation passed without any errors and our Google rich snippets appeared quickly.",
  },
  {
    id: 7,
    name: "Rohan Kulkarni",
    role: "SaaS Founder & Operator",
    avatarText: "RK",
    avatarColor: "bg-teal-600",
    date: "February 2026",
    rating: 5,
    project: "Digital Store & Instant Delivery",
    comment:
      "The purchasing experience on MJ Digital Store is effortless. Instant automated license keys, clean codebase downloads, and dedicated support that stands behind their products.",
  },
  {
    id: 8,
    name: "Ananya Iyer",
    role: "Creative Technologist, StudioCraft",
    avatarText: "AI",
    avatarColor: "bg-rose-600",
    date: "March 2026",
    rating: 5,
    project: "Digital Publishing & Growth Guides",
    comment:
      "The editorial quality, code readability, and technical precision across MJ Digital articles make it our company's go-to resource for scaling modern web infrastructure.",
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
                        <p className="font-bold text-xs text-[#14213D] leading-tight truncate">
                          {rev.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {rev.role}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 truncate">
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
