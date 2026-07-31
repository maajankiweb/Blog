"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiCodeBracket,
  HiClipboardDocumentCheck,
  HiCheckCircle,
} from "react-icons/hi2";

export default function AiSchemaGeneratorPage() {
  const [schemaType, setSchemaType] = useState<"article" | "faq" | "local">("article");
  const [headline, setHeadline] = useState("Custom Web Development & Technical SEO Guide 2026");
  const [authorName, setAuthorName] = useState("Ashish Kumar");
  const [publisher, setPublisher] = useState("Maajanki WebTech Digital Agency");
  const [url, setUrl] = useState("https://blog.maajankiwebtech.com/blog/web-dev-seo-guide");
  const [imageUrl, setImageUrl] = useState("https://blog.maajankiwebtech.com/og-image.png");
  const [copied, setCopied] = useState(false);

  const generateJsonLd = () => {
    if (schemaType === "article") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: headline,
          image: [imageUrl],
          datePublished: new Date().toISOString(),
          author: {
            "@type": "Person",
            name: authorName,
            url: "https://blog.maajankiwebtech.com/author/ashish-kumar",
          },
          publisher: {
            "@type": "Organization",
            name: publisher,
            url: "https://blog.maajankiwebtech.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
        },
        null,
        2
      );
    } else if (schemaType === "faq") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much does a website cost in India?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Website development costs in India range from ₹9,999 for landing pages up to ₹45,000+ for custom Next.js web applications.",
              },
            },
          ],
        },
        null,
        2
      );
    } else {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: publisher,
          image: imageUrl,
          telePhone: "+91-9006543913",
          email: "info@maajankiwebtech.com",
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
          priceRange: "₹₹",
        },
        null,
        2
      );
    }
  };

  const jsonLdResult = generateJsonLd();

  const copyJsonLd = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${jsonLdResult}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
            <span className="text-white">AI Schema Markup Generator</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiCodeBracket size={16} />
            <span>GEO &amp; RICH RESULTS TOOL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            AI Schema Markup Generator (JSON-LD)
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Generate Schema.org structured JSON-LD code for Articles, FAQPages, and Local Businesses to secure Google Rich Snippets &amp; AI citations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-4">
            <h3 className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider">
              1. Select Schema Type &amp; Details
            </h3>

            <div className="flex gap-2">
              {[
                { key: "article", label: "BlogPosting Schema" },
                { key: "faq", label: "FAQPage Schema" },
                { key: "local", label: "LocalBusiness Schema" },
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setSchemaType(type.key as any)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    schemaType === type.key
                      ? "bg-[#ff6b00] text-white border-[#ff6b00]"
                      : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Headline / Business Title</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Author / Entity Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Page URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>
          </div>

          {/* Result (6 cols) */}
          <div className="lg:col-span-6 bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                JSON-LD Output Code
              </span>
              <button
                onClick={copyJsonLd}
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 active:scale-95"
              >
                <HiClipboardDocumentCheck size={14} />
                <span>{copied ? "Copied! ✓" : "Copy JSON-LD"}</span>
              </button>
            </div>

            <pre className="bg-[#090503] p-4 rounded-2xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-[360px] border border-white/10">
              <code>{`<script type="application/ld+json">\n${jsonLdResult}\n</script>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
