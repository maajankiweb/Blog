"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";
import { HiArrowUp, HiPhone } from "react-icons/hi2";

const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/maajankiwebtech/", label: "Instagram (@maajankiwebtech)" },
  { icon: FaFacebookF, href: "https://www.facebook.com/maajankiwebtechllp", label: "Facebook (maajankiwebtechllp)" },
  { icon: FaXTwitter, href: "https://twitter.com/maajankiwebtech", label: "X / Twitter" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/maajankiwebtech", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://www.youtube.com/@Ashishkmj", label: "YouTube" },
];

const editorialLinks = [
  { label: "All Dispatches", href: "/blog" },
  { label: "Next.js & React", href: "/category/technology" },
  { label: "Technical SEO & GEO", href: "/category/seo" },
  { label: "AI & Automation", href: "/category/ai" },
  { label: "WordPress Architecture", href: "/category/wordpress" },
  { label: "Online Business Growth", href: "/category/business" },
];

const marketplaceLinks = [
  { label: "Digital Store Home", href: "/products" },
  { label: "Next.js Templates", href: "/products?category=templates" },
  { label: "WordPress Plugins", href: "/products?category=plugins" },
  { label: "Agency Development", href: "/contact" },
  { label: "My Customer Account", href: "/my-account" },
];

const legalLinks = [
  { label: "About MJ Digital", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Digital Delivery Policy", href: "/digital-delivery-policy" },
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
    <footer className="relative overflow-hidden bg-[#0F172A] text-slate-300 border-t border-slate-800">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl bg-[#DC2564]" />

      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Column 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              <span>MJ Digital</span>
              <span className="w-2 h-2 rounded-full bg-[#DC2564] inline-block mb-0.5" />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              MJ Digital is a modern digital publishing platform and digital products marketplace helping developers, agencies, and businesses build faster and scale online.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <HiPhone size={16} className="text-[#DC2564] shrink-0" />
                <span>+91-9006543913 / info@maajankiwebtech.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#DC2564] hover:border-[#DC2564] transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Editorial Dispatches (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-sm text-white">
              Editorial Dispatches
            </h3>
            <ul className="space-y-2.5 text-sm">
              {editorialLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Digital Marketplace (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-sm text-white">
              Digital Store
            </h3>
            <ul className="space-y-2.5 text-sm">
              {marketplaceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Trust & Company (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-sm text-white">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} MJ Digital. All rights reserved. Registered Indian Digital Tech Enterprise.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#DC2564] text-white flex items-center justify-center shadow-lg hover:bg-[#B81D52] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <HiArrowUp size={18} />
        </button>
      )}

      {/* Decorative Brand Watermark */}
      <div
        suppressHydrationWarning
        className="absolute -bottom-6 right-4 text-[70px] md:text-[100px] font-black text-white/[0.02] pointer-events-none select-none z-0 tracking-tighter uppercase"
      >
        MAAJANKI
      </div>
    </footer>
  );
}
