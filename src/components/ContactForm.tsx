"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }
    
    setStatus("submitting");

    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-outline-variant p-8 md:p-10 rounded-[16px] shadow-sm">
      {status === "success" && (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-on-surface dark:text-zinc-50">Message Sent!</h3>
          <p className="text-on-surface-variant dark:text-zinc-400 text-sm max-w-sm">
            Thank you for reaching out. We have received your message and our editorial desk will contact you shortly.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-primary font-bold text-sm hover:underline pt-2"
          >
            Send another message
          </button>
        </div>
      )}

      {status !== "success" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold border border-red-500/20">
              All fields are required.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all outline-none text-sm dark:text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@editorial.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all outline-none text-sm dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400" htmlFor="subject">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all outline-none text-sm dark:text-zinc-100"
            >
              <option value="general">General Inquiry</option>
              <option value="pitch">Story Pitch</option>
              <option value="press">Press & Media</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container transition-all outline-none text-sm resize-none dark:text-zinc-100"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full md:w-auto bg-primary-container text-on-primary font-label-md text-label-md px-12 py-4 rounded-full hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
}
