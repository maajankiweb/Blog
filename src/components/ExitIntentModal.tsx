"use client";

import React, { useState, useEffect } from "react";
import { HiXMark, HiSparkles, HiEnvelope, HiCheckCircle } from "react-icons/hi2";

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Check if user dismissed modal in this session
    const dismissed = sessionStorage.getItem("maajanki_modal_dismissed");
    if (dismissed) return;

    // Desktop Exit-intent mouseleave trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasDismissed) {
        setIsVisible(true);
      }
    };

    // Scroll-depth trigger for mobile (50% scroll)
    const handleScroll = () => {
      if (hasDismissed) return;
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 55) {
        setIsVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasDismissed(true);
    sessionStorage.setItem("maajanki_modal_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#120904] border border-[#ff6b00]/40 rounded-3xl p-6 md:p-8 text-white shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <HiXMark size={20} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <HiCheckCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Guide Sent to Your Email!</h3>
            <p className="text-xs text-white/70">
              Check your inbox shortly for our high-impact Digital Growth Toolkit &amp; Next.js checklist.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
                <HiSparkles size={14} />
                <span>FREE DIGITAL GROWTH KIT</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Wait! Before You Go...
              </h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                Download our free <strong>2026 Web Dev &amp; Technical SEO Playbook</strong> — 15 proven strategies to rank #1 on Google and scale client revenues in India.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ff6b00]" size={18} />
                <input
                  type="email"
                  placeholder="Enter your primary email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff6b00]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
              >
                Send Me Free Playbook →
              </button>
            </form>

            <p className="text-[11px] text-white/40 text-center">
              Zero spam. Unsubscribe anytime in 1 click.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
