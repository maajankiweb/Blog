"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiDocumentText,
  HiClipboardDocumentCheck,
  HiEye,
  HiSparkles,
} from "react-icons/hi2";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("Custom Web Development & SEO Services | Maajanki WebTech");
  const [description, setDescription] = useState("Scale your online business in India with custom Next.js web applications, technical SEO optimization, and proven growth strategies.");
  const [url, setUrl] = useState("https://blog.maajankiwebtech.com");
  const [imageUrl, setImageUrl] = useState("https://blog.maajankiwebtech.com/og-image.png");
  const [author, setAuthor] = useState("Ashish Kumar");
  const [copied, setCopied] = useState(false);

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="author" content="${author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${imageUrl}" />`;

  const copyCode = () => {
    navigator.clipboard.writeText(metaHtml);
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
            <span className="text-white">Meta Tag Generator</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiDocumentText size={16} />
            <span>SEO &amp; OPENGRAPH TOOL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            SEO &amp; OpenGraph Meta Tag Generator
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Create clean, validated SEO title tags, meta descriptions, OpenGraph social sharing snippets, and Twitter card tags with live search previews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs (6 cols) */}
          <div className="lg:col-span-6 bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4">
            <h3 className="text-sm font-bold text-[#ff6b00] uppercase tracking-wider">
              1. Enter Page Information
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Page Title (50 - 60 chars)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
              <span className={`text-[11px] block ${title.length > 60 ? "text-amber-400" : "text-white/40"}`}>
                {title.length} characters {title.length > 60 && "(May be truncated on Google)"}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Meta Description (140 - 160 chars)</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
              <span className={`text-[11px] block ${description.length > 160 ? "text-amber-400" : "text-white/40"}`}>
                {description.length} characters
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Canonical URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">OpenGraph Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>
          </div>

          {/* Previews & Output Code (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Google Search Live Preview */}
            <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase">
                <HiEye className="text-[#ff6b00]" />
                <span>Google Search Snippet Preview</span>
              </div>
              <div className="bg-white p-4 rounded-2xl space-y-1 text-black font-sans shadow-md">
                <div className="text-xs text-neutral-600 truncate">{url}</div>
                <div className="text-base text-blue-700 font-medium hover:underline leading-snug cursor-pointer line-clamp-1">
                  {title}
                </div>
                <div className="text-xs text-neutral-700 line-clamp-2 leading-relaxed">
                  {description}
                </div>
              </div>
            </div>

            {/* Output HTML */}
            <div className="bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider">
                  Generated Meta Tags HTML
                </span>
                <button
                  onClick={copyCode}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 active:scale-95"
                >
                  <HiClipboardDocumentCheck size={14} />
                  <span>{copied ? "Copied! ✓" : "Copy Tags"}</span>
                </button>
              </div>

              <pre className="bg-[#090503] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-56 border border-white/10">
                <code>{metaHtml}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
