"use client";

import React from "react";
import { HiStar } from "react-icons/hi2";

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
    name: "Ashish Kumar",
    role: "Founder & Lead Developer",
    content:
      "Working with AK Web Master Hub transformed our client projects. Their practical tutorials on SEO optimization, WordPress custom setups, and Next.js are 100% actionable and yield real ranking results.",
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

export default function TestimonialsSection() {
  return (
    <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-[#ff6b00] font-label-md text-xs uppercase tracking-widest font-extrabold">
            REAL USER REVIEWS &amp; FEEDBACK
          </span>
          <h2 className="font-display-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            What Our Community Members &amp; Clients Say
          </h2>
          <p className="text-on-surface-variant font-body-md text-sm md:text-base leading-relaxed">
            Real feedback from developers, digital marketers, and clients who have scaled their web platforms and organic search presence using our tutorials and services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-surface-container-low border border-outline-variant/30 p-lg rounded-2xl flex flex-col justify-between hover:border-primary-container/40 transition-all duration-300 shadow-xs"
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
