"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiSparkles,
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiDocumentText,
} from "react-icons/hi2";

export default function AiHeadlineGeneratorPage() {
  const [topic, setTopic] = useState("Web Development & Technical SEO for Indian Businesses");
  const [targetAudience, setTargetAudience] = useState("Business Owners & Developers");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateAiSuggestions = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const generatedHeadlines = [
        `How to Scale Your Business in India with ${topic} (2026 Guide)`,
        `15 Proven ${topic} Strategies That Drive 3x Organic Growth`,
        `The Ultimate ${topic} Checklist for ${targetAudience}`,
        `Why ${targetAudience} Need Custom ${topic} to Outrank Competitors`,
        `Step-by-Step ${topic} Blueprint: From Zero to #1 Google Ranking`,
      ];

      const generatedDescriptions = [
        `Discover actionable insights on ${topic}. Learn step-by-step strategies designed specifically for ${targetAudience} to maximize ROI and Google rankings.`,
        `Looking to master ${topic}? Explore our in-depth guide covering Core Web Vitals, architecture, and practical growth tactics for Indian businesses.`,
        `Unlock 3x traffic growth with our complete ${topic} playbook tailored for ${targetAudience}. Download code samples and setup instructions today.`,
      ];

      setHeadlines(generatedHeadlines);
      setDescriptions(generatedDescriptions);
      setIsGenerating(false);
    }, 600);
  };

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <main className="min-h-screen bg-[#090503] text-white py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Link href="/tools" className="hover:text-[#ff6b00]">
              Tools Hub
            </Link>
            <span>/</span>
            <span className="text-white">AI Headline Generator</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiSparkles size={16} />
            <span>AI CONTENT UTILITY</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            AI Article Title &amp; Meta Description Generator
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Generate high-CTR viral headlines and SEO meta descriptions optimized for Google rankings and click-through rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-4">
            <h3 className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider">
              1. Enter Topic &amp; Audience
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Primary Keyword / Article Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <button
              onClick={generateAiSuggestions}
              disabled={isGenerating}
              className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? "Generating AI Suggestions..." : "Generate AI Headlines →"}
            </button>
          </div>

          {/* Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {headlines.length === 0 ? (
              <div className="h-64 bg-[#120904] rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center text-white/40 space-y-2">
                <HiLightBulb size={36} className="text-[#ff6b00]" />
                <p className="text-xs">Click &quot;Generate AI Headlines&quot; to see instant title &amp; description suggestions.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Headlines List */}
                <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-3">
                  <span className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider block">
                    Recommended High-CTR Titles ({headlines.length})
                  </span>

                  <div className="space-y-2">
                    {headlines.map((h, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center justify-between gap-3 text-xs text-white font-semibold transition-colors"
                      >
                        <span className="line-clamp-1">{h}</span>
                        <button
                          onClick={() => copyText(h, i)}
                          className="text-[11px] font-bold text-[#ff6b00] hover:underline shrink-0"
                        >
                          {copiedIndex === i ? "Copied! ✓" : "Copy Title"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descriptions List */}
                <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Recommended Meta Descriptions ({descriptions.length})
                  </span>

                  <div className="space-y-2">
                    {descriptions.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col gap-2 text-xs text-white/80 transition-colors"
                      >
                        <p className="leading-relaxed">{d}</p>
                        <button
                          onClick={() => copyText(d, i + 10)}
                          className="text-[11px] font-bold text-emerald-400 hover:underline self-end"
                        >
                          {copiedIndex === i + 10 ? "Copied! ✓" : "Copy Description"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
