"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    // Simulate submission / dispatch
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1000);
  };

  return (
    <div suppressHydrationWarning className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-xs">
      {status === "success" ? (
        <div suppressHydrationWarning className="flex flex-col items-center justify-center py-10 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-black text-[#14213D]">Message Sent Successfully!</h3>
          <p className="text-gray-600 text-xs sm:text-sm max-w-sm">
            Thank you for reaching out. Our engineering and editorial team will review your inquiry and get back to you within 24 business hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[#DC2564] font-bold text-xs hover:underline pt-2"
          >
            Send another inquiry →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
          <div suppressHydrationWarning className="border-b border-gray-100 pb-4 mb-2">
            <h3 className="text-xl font-black text-[#14213D]">Send Us a Message</h3>
            <p className="text-xs text-gray-500 mt-1">
              Have questions regarding digital products, licensing, custom Next.js development, or editorial guest articles? We respond quickly.
            </p>
          </div>

          {status === "error" && (
            <div suppressHydrationWarning className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage || "An error occurred. Please check your inputs."}</span>
            </div>
          )}

          <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ashish Kumar"
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ashish@example.com"
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 90065 43913"
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
              >
                <option value="general">General Question</option>
                <option value="digital-product">Digital Product &amp; License Support</option>
                <option value="custom-project">Custom Next.js &amp; Headless Development</option>
                <option value="editorial">Editorial &amp; Guest Article Proposal</option>
                <option value="partnership">Agency Partnership &amp; Commercial</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Message / Project Details *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your requirements or question..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#DC2564] focus:ring-2 focus:ring-[#DC2564]/10 transition-all text-[#14213D]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full btn-primary py-3.5 text-xs sm:text-sm font-bold shadow-md justify-center flex items-center gap-2"
          >
            {status === "submitting" ? (
              <span>Transmitting Inquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
