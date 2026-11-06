"use client";

import { useState } from "react";
import { HiPlus, HiMinus, HiQuestionMarkCircle } from "react-icons/hi2";

export interface FAQItem {
  question: string;
  answer: string;
}

export const defaultFaqs: FAQItem[] = [
  {
    question: "What is MJ Digital?",
    answer:
      "MJ Digital is a modern digital publishing platform, technology agency, and digital software marketplace founded by Ashish Kumar. We engineer production-ready Next.js starter templates, headless WordPress architectures, and free developer tools.",
  },
  {
    question: "Are code examples and starter kits commercial-ready?",
    answer:
      "Yes. All starter kits, blueprints, and architectural tutorials published by MJ Digital are engineered strictly with TypeScript, modern security practices, and tested against production workloads.",
  },
  {
    question: "Do you accept custom software development projects?",
    answer:
      "Yes. Through our agency arm, we partner with founders and enterprises to engineer custom Next.js applications, headless e-commerce stores with Razorpay, and enterprise SEO systems. You can reach us via our Contact page.",
  },
  {
    question: "How do digital downloads and product licenses work?",
    answer:
      "Purchases are fulfilled instantaneously upon payment clearance by Razorpay. Download links and commercial licenses are immediately accessible in your Customer Portal at /my-account and delivered via email.",
  },
  {
    question: "Can I use purchased templates for client websites?",
    answer:
      "Absolutely. Our commercial license grants you perpetual rights to build unlimited end projects for yourself or your paying clients without recurring royalties.",
  },
];

interface FaqSectionProps {
  faqs?: FAQItem[];
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function FaqSection({
  faqs,
  items,
  title = "Frequently Asked Questions",
  subtitle,
  description,
}: FaqSectionProps) {
  const activeFaqs = faqs || items || defaultFaqs;
  const subText =
    subtitle ||
    description ||
    "Everything you need to know about our engineering standards, digital products, licensing, and agency services.";
  
  // First item open by default for engaging preview
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section suppressHydrationWarning className="py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header with Brand Badge */}
        <div suppressHydrationWarning className="text-center mb-12 space-y-3">
          <span className="badge-brand inline-block">
            HELP &amp; TRANSPARENCY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14213D] tracking-tight">
            {title}
          </h2>
          {subText && (
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              {subText}
            </p>
          )}
        </div>

        {/* Clean Accordion List */}
        <div suppressHydrationWarning className="space-y-4">
          {activeFaqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                suppressHydrationWarning
                onClick={() => toggleAccordion(index)}
                className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#DC2564]/40 shadow-sm ring-2 ring-[#DC2564]/5"
                    : "bg-white border-gray-200/80 hover:border-gray-300 hover:bg-[#F7F8FC]/50 shadow-xs"
                }`}
              >
                <div
                  suppressHydrationWarning
                  className="p-5 sm:p-6 flex justify-between items-center gap-4 select-none"
                >
                  <div suppressHydrationWarning className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-pink-50 text-[#DC2564]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-bold text-sm sm:text-base transition-colors ${
                        isOpen ? "text-[#DC2564]" : "text-[#14213D]"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? "bg-[#DC2564] text-white rotate-180"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {isOpen ? <HiMinus size={16} /> : <HiPlus size={16} />}
                  </div>
                </div>

                {isOpen && (
                  <div
                    suppressHydrationWarning
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100"
                  >
                    <p className="pl-10.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Support Callout */}
        <div
          suppressHydrationWarning
          className="mt-10 p-5 rounded-2xl bg-[#F7F8FC] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div suppressHydrationWarning className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#DC2564] flex items-center justify-center shrink-0">
              <HiQuestionMarkCircle size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#14213D]">Still have questions?</p>
              <p className="text-[11px] text-gray-500">Our engineering desk responds within 24 business hours.</p>
            </div>
          </div>
          <a
            href="mailto:info@maajankiwebtech.com"
            className="btn-outline py-2 px-4 text-xs font-bold shrink-0"
          >
            Contact Engineering Desk →
          </a>
        </div>
      </section>
    </>
  );
}
