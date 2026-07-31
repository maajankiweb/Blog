"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiCodeBracket,
  HiClipboardDocumentCheck,
  HiCheckCircle,
  HiExclamationTriangle,
} from "react-icons/hi2";

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(`{\n  "title": "Maajanki Blog",\n  "status": "success",\n  "toolsCount": 5,\n  "categories": ["SEO", "WebDev", "Business"]\n}`);
  const [formattedJson, setFormattedJson] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed, null, indent));
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid JSON syntax");
      setFormattedJson("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid JSON syntax");
      setFormattedJson("");
    }
  };

  const copyResult = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
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
            <span className="text-white">JSON Formatter</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiCodeBracket size={16} />
            <span>DEVELOPER UTILITY</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            JSON Formatter &amp; Validator
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Format, beautify, minify, and validate JSON payloads with instant syntax error highlighting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel (6 cols) */}
          <div className="lg:col-span-6 bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider">
                Raw JSON Input
              </span>
              <button
                onClick={() => setInputJson("")}
                className="text-[11px] text-white/40 hover:text-white"
              >
                Clear Input
              </button>
            </div>

            <textarea
              rows={16}
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste raw JSON here..."
              className="w-full bg-[#090503] border border-white/10 rounded-2xl p-4 text-xs font-mono text-white focus:outline-none focus:border-[#ff6b00]"
            />

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => formatJson(2)}
                className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Beautify JSON (2 spaces)
              </button>
              <button
                onClick={minifyJson}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                Minify JSON
              </button>
            </div>
          </div>

          {/* Output Panel (6 cols) */}
          <div className="lg:col-span-6 bg-[#120904] rounded-3xl border border-white/10 p-6 space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider">
                Formatted Output
              </span>
              {formattedJson && (
                <button
                  onClick={copyResult}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/15 transition-all flex items-center gap-1"
                >
                  <HiClipboardDocumentCheck size={14} />
                  <span>{copied ? "Copied! ✓" : "Copy Output"}</span>
                </button>
              )}
            </div>

            {errorMsg ? (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <HiExclamationTriangle size={18} />
                  <span>JSON Syntax Error</span>
                </div>
                <p className="font-mono text-[11px]">{errorMsg}</p>
              </div>
            ) : formattedJson ? (
              <pre className="bg-[#090503] p-4 rounded-2xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-[440px] border border-white/10">
                <code>{formattedJson}</code>
              </pre>
            ) : (
              <div className="h-[380px] bg-[#090503] rounded-2xl border border-white/5 flex items-center justify-center text-xs text-white/40">
                Click &quot;Beautify JSON&quot; to format output
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
