"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiWrenchScrewdriver,
  HiClipboardDocumentCheck,
  HiArrowRight,
  HiSparkles,
} from "react-icons/hi2";

export default function GSTInvoiceGeneratorPage() {
  const [clientName, setClientName] = useState("Acme Retail India");
  const [serviceDesc, setServiceDesc] = useState("Custom Web Development & Technical SEO Audit Services");
  const [amount, setAmount] = useState<number>(25000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [sacCode, setSacCode] = useState("998314");
  const [copied, setCopied] = useState(false);

  const gstAmount = (amount * gstRate) / 100;
  const totalAmount = amount + gstAmount;

  const invoiceSummary = `INVOICE SUMMARY — MAAJANKI WEBTESCH / IN VOBILL HELPER
--------------------------------------------------
Client Name: ${clientName}
Service: ${serviceDesc}
SAC Code: ${sacCode} (Information Technology / Web Services)

Base Amount: ₹${amount.toLocaleString()}
GST (${gstRate}%): ₹${gstAmount.toLocaleString()}
--------------------------------------------------
TOTAL PAYABLE AMOUNT: ₹${totalAmount.toLocaleString()}
--------------------------------------------------`;

  const copySummary = () => {
    navigator.clipboard.writeText(invoiceSummary);
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
            <span className="text-white">GST Invoice Estimator</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiWrenchScrewdriver size={16} />
            <span>INDIAN FREELANCER &amp; AGENCY TOOL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            GST &amp; Freelance Invoice Estimator
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Quickly calculate 18% GST (CGST/SGST or IGST), SAC code categories, and total invoice amounts for Indian freelancers, web developers, and agency owners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-4">
            <h3 className="text-sm font-bold text-[#ff6b00] uppercase tracking-wider">
              1. Enter Invoice Details
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Client / Company Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Service Description</label>
              <input
                type="text"
                value={serviceDesc}
                onChange={(e) => setServiceDesc(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/80">Base Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/80">GST Rate (%)</label>
                <select
                  value={gstRate}
                  onChange={(e) => setGstRate(parseInt(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
                >
                  <option value={18} className="bg-[#120904]">18% (IT &amp; Web Services)</option>
                  <option value={12} className="bg-[#120904]">12% (Print/Graphic Design)</option>
                  <option value={0} className="bg-[#120904]">0% (SEZ / Export LUT Exemption)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">SAC Code</label>
              <input
                type="text"
                value={sacCode}
                onChange={(e) => setSacCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
              />
              <span className="text-[11px] text-white/40 block">
                Standard SAC Code for IT &amp; Web Dev is <strong>998314</strong>
              </span>
            </div>
          </div>

          {/* Invoice Summary Card (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-br from-[#1b0f08] via-[#120904] to-[#0a0503] rounded-3xl border border-[#ff6b00]/40 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#ff6b00]">
                    TOTAL INVOICE AMOUNT
                  </span>
                  <div className="text-3xl md:text-5xl font-black text-white tracking-tight mt-1">
                    ₹{totalAmount.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={copySummary}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 active:scale-95 shrink-0"
                >
                  <HiClipboardDocumentCheck size={16} />
                  <span>{copied ? "Copied! ✓" : "Copy Breakdown"}</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-white/80">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Base Subtotal:</span>
                  <span className="font-mono text-white">₹{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">GST Amount ({gstRate}%):</span>
                  <span className="font-mono text-emerald-400">+ ₹{gstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Applicable Tax Breakdown:</span>
                  <span className="font-mono text-white/90">
                    {gstRate === 0 ? "LUT Export Exemption" : `CGST (${gstRate/2}%) + SGST (${gstRate/2}%) or IGST (${gstRate}%)`}
                  </span>
                </div>
              </div>

              <pre className="bg-[#090503] p-4 rounded-xl text-xs font-mono text-white/70 overflow-x-auto border border-white/10">
                <code>{invoiceSummary}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
