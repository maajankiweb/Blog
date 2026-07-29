"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle2, Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    // TODO: Replace setTimeout with real API call (e.g. fetch to newsletter service)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 900);
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center text-center space-y-4 py-4"
        role="status"
        aria-live="polite"
      >
        <div
          className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
          aria-hidden="true"
        >
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
        <p className="text-white/70 text-sm max-w-xs leading-relaxed">
          Thank you for subscribing. Your first edition arrives this Sunday morning.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs text-[#ff6b00] underline font-semibold hover:text-[#ff8533] transition-colors pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff6b00] rounded"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full" noValidate>
      {/* Email Field */}
      <div className="relative group">
        <label htmlFor="newsletter-email-input" className="sr-only">
          Your email address
        </label>
        <div
          className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#ff6b00] transition-colors"
          aria-hidden="true"
        >
          <Mail className="h-5 w-5" />
        </div>
        <input
          id="newsletter-email-input"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "submitting"}
          placeholder="your@email.com"
          required
          aria-required="true"
          aria-describedby={status === "error" ? "newsletter-email-error" : undefined}
          aria-invalid={status === "error" ? "true" : "false"}
          className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white/[0.08] border ${
            status === "error" ? "border-red-500/60" : "border-white/[0.15]"
          } text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/30 transition-all backdrop-blur-md disabled:opacity-50`}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p
          id="newsletter-email-error"
          className="text-red-400 text-xs pl-1 font-medium -mt-1"
          role="alert"
        >
          Please enter a valid email address.
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#ff6b00]/30 active:scale-[0.98] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b00]"
        aria-busy={status === "submitting"}
      >
        <span>{status === "submitting" ? "Subscribing…" : "Subscribe — It's Free"}</span>
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Trust signals */}
      <div className="flex items-center justify-between text-white/45 text-xs px-1">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" aria-hidden="true" />
          High signal, zero spam
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" aria-hidden="true" />
          Unsubscribe anytime
        </span>
      </div>
    </form>
  );
}
