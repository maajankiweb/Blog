"use client";

import { useState, FormEvent } from "react";
import { MessageSquare, Send } from "lucide-react";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) {
      setStatus("error");
      setErrorMsg("All fields are required.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, name, email, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setContent("");
    } catch (err: any) {
      console.error("Comment submission error:", err);
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit comment. Please try again later.");
    }
  };

  return (
    <div className="mt-8 p-6 sm:p-8 bg-slate-50/70 border border-slate-200/90 rounded-2xl shadow-2xs">
      <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-[#DC2564]" />
        <span>Leave a Comment or Question</span>
      </h3>
      
      {status === "success" && (
        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl mb-6 font-semibold text-xs border border-emerald-200">
          Thank you! Your comment has been submitted and is awaiting moderation.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 font-semibold text-xs border border-red-200">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="commenter-name" className="text-xs font-bold text-slate-700">
              Your Name *
            </label>
            <input
              id="commenter-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "submitting"}
              placeholder="e.g. Rahul Sharma"
              required
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#DC2564] focus:ring-1 focus:ring-[#DC2564] outline-none transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="commenter-email" className="text-xs font-bold text-slate-700">
              Email Address * (Will not be published)
            </label>
            <input
              id="commenter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              placeholder="rahul@example.com"
              required
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#DC2564] focus:ring-1 focus:ring-[#DC2564] outline-none transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="comment-text" className="text-xs font-bold text-slate-700">
            Your Comment *
          </label>
          <textarea
            id="comment-text"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={status === "submitting"}
            placeholder="Share your feedback, question, or technical suggestion..."
            required
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-[#DC2564] focus:ring-1 focus:ring-[#DC2564] outline-none transition-all text-xs sm:text-sm text-slate-900 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-xs px-6 py-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 group shadow-sm shadow-[#DC2564]/20 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Post Comment"}
          <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
}
