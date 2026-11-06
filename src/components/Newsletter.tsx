"use client";

import { useState, FormEvent } from "react";
import { HiPaperAirplane, HiCheckCircle, HiEnvelope, HiSparkles } from "react-icons/hi2";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Newsletter submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <div
      className="relative rounded-[32px] overflow-hidden p-8 md:p-14 border border-white/10 bg-gradient-to-br from-[#0d0806] via-[#170d08] to-[#241108]"
    >
      {/* Dynamic Glowing Orbs */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-25 blur-3xl bg-[#DC2564]"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl bg-[#ffb693]"
      />
      <div suppressHydrationWarning className="grain-overlay absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Column: Heading & Pitch */}
        <div className="lg:w-7/12 text-white space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/12 text-[#DC2564] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <HiSparkles className="w-4 h-4 animate-pulse text-[#DC2564]" />
            <span>Weekly Newsletter</span>
          </div>

          {/* Main Title */}
          <h2
            className="font-black text-white text-3xl md:text-5xl leading-[1.1] tracking-tight"
          >
            Get the insights that{" "}
            <span className="text-gradient-warm">matter, delivered weekly.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-white/85 text-[15px] md:text-base leading-relaxed max-w-lg line-clamp-2">
            No spam. Receive curated weekly deep-dives on modern web architectures, engineering leadership, and high-impact digital tools.
          </p>

          {/* Social Proof Avatars */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex -space-x-2.5">
              {[
                { gradient: "bg-gradient-to-tr from-amber-500 to-orange-400", char: "A" },
                { gradient: "bg-gradient-to-tr from-[#DC2564] to-orange-300", char: "B" },
                { gradient: "bg-gradient-to-tr from-orange-600 to-amber-500", char: "C" },
                { gradient: "bg-gradient-to-tr from-amber-600 to-orange-500", char: "D" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-[#0d0806] ${item.gradient} flex items-center justify-center text-[10px] font-black text-white shadow-md`}
                >
                  <span>{item.char}</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs md:text-sm font-medium">
              Curated weekly insights by <span className="text-white font-bold">Ashish Kumar</span>, Founder of MJ Digital
            </p>
          </div>
        </div>

        {/* Right Column: Form / Success State */}
        <div className="lg:w-5/12 w-full">
          {status === "success" ? (
            <div className="bg-white/8 backdrop-blur-xl border border-emerald-500/30 p-8 rounded-3xl text-center space-y-3 flex flex-col items-center animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                <HiCheckCircle size={32} />
              </div>
              <h4 className="font-bold text-white text-xl">You&apos;re on the list!</h4>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Thank you for subscribing. We will deliver our next deep dive to your inbox every Sunday morning.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs text-[#DC2564] underline font-semibold pt-2 hover:text-[#e64980] transition-colors"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3 w-full"
              {...({
                toolname: "subscribe_newsletter",
                tooldescription: "Subscribe to MJ Digital weekly engineering and SEO newsletter",
              } as any)}
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#DC2564] transition-colors">
                  <HiEnvelope size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "submitting"}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/8 border border-white/15 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-[#DC2564] focus:ring-1 focus:ring-[#DC2564] transition-all backdrop-blur-md"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#DC2564] hover:bg-[#B81D52] text-white py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#DC2564]/30 active:scale-[0.98] disabled:opacity-60"
              >
                <span>{status === "submitting" ? "Subscribing..." : "Subscribe Free"}</span>
                <HiPaperAirplane className="w-4 h-4 transform rotate-45 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-between text-[#ffffff60] text-xs px-1 pt-1">
                <span>✓ High signal, zero spam</span>
                <span>✓ Unsubscribe anytime</span>
              </div>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 text-xs mt-2 pl-2 font-medium">
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
