"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

export interface FAQItem {
  question: string;
  answer: string;
}

export const defaultFaqs: FAQItem[] = [
  {
    question: "How often do you publish new articles?",
    answer:
      "We publish three times per week: Deep Dives on Tuesdays, Industry Roundups on Thursdays, and The Weekend Architect newsletter every Saturday morning.",
  },
  {
    question: "Do you accept guest contributions?",
    answer:
      'Yes, we have a "Community Voice" program for lead engineers and CTOs. Please visit our \'Contribute\' page for submission guidelines and editorial standards.',
  },
  {
    question: "Is there a paid premium subscription?",
    answer:
      "Currently, all our core insights are free. We plan to launch 'Editorial Pro' in late 2024, which will include private benchmarks and vendor reports.",
  },
  {
    question: "How are your technical deep dives researched?",
    answer:
      "Our editorial team collaborates directly with principal engineers, open-source maintainers, and system architects to verify code samples and benchmark results.",
  },
  {
    question: "Can I syndicate or repost Editorial articles?",
    answer:
      "You are welcome to quote excerpts up to 200 words with canonical attribution and a link back to the original article. Full republication requires prior written approval.",
  },
];

interface FaqSectionProps {
  faqs?: FAQItem[];
  title?: string;
  description?: string;
}

export default function FaqSection({
  faqs = defaultFaqs,
  title = "Common Questions",
  description = "Everything you need to know about our editorial process and community.",
}: FaqSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-xl">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-md">
            {title}
          </h2>
          {description && (
            <p className="text-on-surface-variant font-body-lg">
              {description}
            </p>
          )}
        </div>
        <div className="max-w-3xl mx-auto space-y-base">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                onClick={() => toggleAccordion(index)}
                className="bg-white border border-outline-variant rounded-2xl overflow-hidden cursor-pointer group hover:border-[#ff6b00]/40 transition-colors"
              >
                <div className="p-md flex justify-between items-center gap-4">
                  <h4 className="font-bold text-on-surface group-hover:text-[#ff6b00] transition-colors">
                    {faq.question}
                  </h4>
                  <HiChevronDown
                    size={20}
                    className={`text-on-surface-variant flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#ff6b00]" : ""
                    }`}
                  />
                </div>
                {isOpen && (
                  <div className="px-md pb-md text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

