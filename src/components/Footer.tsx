"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";
import { HiEnvelope, HiArrowUp } from "react-icons/hi2";

const socialLinks = [
  { icon: FaXTwitter, href: "https://twitter.com/maajankiwebtech", label: "X / Twitter" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/maajankiwebtech", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com/AshishKmj", label: "GitHub" },
  { icon: FaYoutube, href: "https://youtube.com/@maajankiwebtech", label: "YouTube" },
  { icon: HiEnvelope, href: "mailto:info@maajankiwebtech.com", label: "Email" },
];

const navColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Latest Articles", href: "/blog" },
      { label: "Free Tools", href: "/tools" },
      { label: "Deals & Products", href: "/affiliate-products" },
      { label: "Saved Articles", href: "/saved" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Search & Topics", href: "/search" },
    ],
  },
  {
    title: "Legal & Policy",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Settings", href: "/cookie-settings" },
    ],
  },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 text-white"
      style={{
        background: "linear-gradient(180deg, #0a0604 0%, #120904 100%)",
      }}
    >
      {/* Background Glow Overlay */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff6b00 0%, transparent 70%)",
        }}
      />
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-30" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 lg:gap-16 pb-14 border-b border-white/10">
          {/* Brand Info (5/12 Width) */}
          <div className="w-full md:w-5/12 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl tracking-tighter text-white">
                Maajanki<span className="text-[#ff6b00]">.</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Feed Live
              </span>
            </div>

            <p className="text-white/80 text-sm md:text-[15px] leading-relaxed max-w-md w-full">
              Premium technical insights and architectural guides from Maajanki for
              software developers, designers, and engineering leaders.
            </p>

            {/* Social Media Pill Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#ff6b00] hover:border-[#ff6b00] transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links (7/12 Width) */}
          <div className="w-full md:w-7/12 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#ff6b00]">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        className="text-white/65 hover:text-white text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                        href={href}
                      >
                        <span className="group-hover:translate-x-1 transition-transform">
                          {label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            Copyright © All rights reserved. | Maajanki by Maajanki WebTech Digital Agency
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back To Top Icon Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shadow-2xl hover:bg-[#e05e00] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 animate-fade-in"
          title="Back to top"
        >
          <HiArrowUp size={20} />
        </button>
      )}

      {/* Decorative Watermark */}
      <div className="absolute -bottom-6 right-4 text-[80px] md:text-[110px] font-black text-white/[0.03] pointer-events-none select-none z-0 tracking-tighter uppercase">
        MAAJANKI
      </div>
    </footer>
  );
}
