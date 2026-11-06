"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineShoppingBag,
  HiArrowDownTray,
  HiKey,
  HiCheckCircle,
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineInboxArrowDown,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export default function MyAccountClient() {
  const [emailInput, setEmailInput] = useState("");
  const [orderKeyInput, setOrderKeyInput] = useState("");
  const [activeTab, setActiveTab] = useState<"downloads" | "orders" | "profile">("downloads");
  const [isSearched, setIsSearched] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSearched(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
            <Link href="/" className="hover:text-[#DC2564] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#14213D]">Customer Portal</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="badge-brand inline-block mb-2">
                CUSTOMER DASHBOARD
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14213D] tracking-tight">
                My Account &amp; Purchases
              </h1>
              <p className="text-gray-600 text-sm mt-1 max-w-xl">
                Access your digital product licenses, source code downloads, Razorpay receipts, and account settings.
              </p>
            </div>

            {isSearched && (
              <div className="flex items-center gap-3 self-start md:self-auto bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-pink-50 text-[#DC2564] font-black text-xs flex items-center justify-center">
                  {emailInput.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-[#14213D]">{emailInput}</p>
                  <button
                    onClick={() => setIsSearched(false)}
                    className="text-[#DC2564] hover:underline font-medium"
                  >
                    Switch account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Guest Order Lookup Verification Screen */}
        {!isSearched ? (
          <div className="max-w-xl mx-auto bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-50 text-[#DC2564] flex items-center justify-center mb-5">
              <HiKey className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#14213D]">Access Your Digital Library</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-6">
              Enter the billing email you provided during checkout. All authorized download links and commercial licenses will unlock immediately.
            </p>

            <form onSubmit={handleLookup} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Billing Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. ashish@maajankiwebtech.com"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Order ID or Razorpay Payment ID <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={orderKeyInput}
                  onChange={(e) => setOrderKeyInput(e.target.value)}
                  placeholder="e.g. pay_XXXXX or MJ-ORD-10492"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary py-3.5 text-sm font-bold shadow-md justify-center flex items-center gap-2"
                >
                  <HiOutlineInboxArrowDown className="w-4 h-4" />
                  <span>Retrieve Purchases &amp; Licenses</span>
                </button>
              </div>

              <p className="text-[11px] text-gray-500 text-center pt-2">
                Protected by 256-bit SSL encryption. Direct delivery link will also be dispatched via email.
              </p>
            </form>
          </div>
        ) : (
          /* Logged In / Authenticated SaaS Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab("downloads")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "downloads"
                    ? "bg-[#DC2564] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#14213D]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <HiArrowDownTray className="w-4 h-4" />
                  <span>My Downloads</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === "downloads" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  1
                </span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "orders"
                    ? "bg-[#DC2564] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#14213D]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <HiOutlineShoppingBag className="w-4 h-4" />
                  <span>Order History</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === "orders" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                  1
                </span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "profile"
                    ? "bg-[#DC2564] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#14213D]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <HiOutlineUser className="w-4 h-4" />
                  <span>Account &amp; Billing</span>
                </span>
              </button>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="p-3 bg-[#F7F8FC] rounded-xl text-center">
                  <HiOutlineShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#14213D]">Verified Buyer</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Lifetime updates included</p>
                </div>
              </div>
            </aside>

            {/* Main Display Area */}
            <main className="lg:col-span-9 space-y-6">
              {/* Authenticated Banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2.5">
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Authenticated customer account: <strong>{emailInput}</strong>
                  </span>
                </div>
                <Link
                  href="/products"
                  className="font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
                >
                  Browse Store →
                </Link>
              </div>

              {/* TAB 1: DOWNLOADS */}
              {activeTab === "downloads" && (
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="badge-brand text-[10px]">LIFETIME LICENSE</span>
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            Active
                          </span>
                        </div>
                        <h2 className="text-lg font-bold text-[#14213D] mt-1.5">
                          Maajanki Pro Next.js &amp; Tailwind Starter Kit
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Full source code repository, documentation, Figma design tokens, and deployment scripts.
                        </p>
                      </div>

                      <a
                        href={`https://api.whatsapp.com/send/?phone=919006543913&text=${encodeURIComponent(
                          `Hi MJ Digital team, I am requesting direct file download link for Maajanki Pro Starter Kit. Email: ${emailInput}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-2 shrink-0 shadow-sm"
                      >
                        <HiArrowDownTray className="w-4 h-4" />
                        <span>Download ZIP (v2026.1)</span>
                      </a>
                    </div>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="bg-[#F7F8FC] p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">License Key</span>
                        <code className="text-[#DC2564] font-mono font-bold text-xs mt-0.5 block">
                          MJ-PRO-89F4-2026-LIVE
                        </code>
                      </div>
                      <div className="bg-[#F7F8FC] p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Release Build</span>
                        <span className="text-[#14213D] font-semibold block mt-0.5">Next.js 16 + Tailwind v4</span>
                      </div>
                      <div className="bg-[#F7F8FC] p-3 rounded-xl border border-gray-100">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Allowed Seats</span>
                        <span className="text-[#14213D] font-semibold block mt-0.5">Unlimited Client Projects</span>
                      </div>
                    </div>
                  </div>

                  {/* Documentation & Help Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <HiOutlineDocumentText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#14213D]">Getting Started Documentation</h3>
                        <p className="text-xs text-gray-500">
                          Step-by-step setup guides, environment variables guide, and deployment instructions.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/blog"
                      className="btn-outline py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Read Documentation</span>
                      <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS */}
              {activeTab === "orders" && (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Order Placed</span>
                      <p className="text-xs font-bold text-[#14213D]">May 2026</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Order ID</span>
                      <p className="text-xs font-mono font-bold text-[#14213D]">#WC-10492</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Total Amount</span>
                      <p className="text-xs font-black text-[#DC2564]">₹2,499.00</p>
                    </div>
                    <span className="self-start sm:self-auto text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md text-xs font-bold">
                      Paid via Razorpay
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#14213D]">Maajanki Pro Next.js Starter Kit</p>
                        <p className="text-gray-500 text-[11px]">Commercial Single-License • Instant Digital Delivery</p>
                      </div>
                      <span className="font-bold text-[#14213D]">₹2,499.00</span>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <span className="text-gray-500 flex items-center gap-1">
                        <HiOutlineClock className="w-4 h-4 text-gray-400" />
                        <span>GST Invoice auto-sent to {emailInput}</span>
                      </span>
                      <a
                        href={`https://api.whatsapp.com/send/?phone=919006543913&text=${encodeURIComponent(
                          `Requesting official GST Invoice PDF for Order #WC-10492 (${emailInput})`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#DC2564] hover:underline font-bold inline-flex items-center gap-1"
                      >
                        Request GST Invoice PDF →
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PROFILE */}
              {activeTab === "profile" && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#14213D]">Customer Billing Profile</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your registered billing email for GST invoicing and digital license activation.
                    </p>
                  </div>

                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Billing Email
                      </label>
                      <input
                        type="text"
                        disabled
                        value={emailInput}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Default Currency
                      </label>
                      <input
                        type="text"
                        disabled
                        value="INR (₹) - Indian Rupee"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Support Contact
                      </label>
                      <p className="text-xs text-gray-600">
                        Need to transfer license to another email or company GSTIN? Contact{" "}
                        <a href="mailto:support@maajankiwebtech.com" className="text-[#DC2564] font-bold hover:underline">
                          support@maajankiwebtech.com
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </main>
  );
}
