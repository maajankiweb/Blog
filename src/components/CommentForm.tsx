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
    <div className="mt-xl p-8 bg-white dark:bg-zinc-900 border border-outline-variant/30 rounded-2xl shadow-sm">
      <h3 className="text-xl font-headline-md text-on-surface dark:text-zinc-100 mb-6 flex items-center gap-sm">
        <MessageSquare className="h-5 w-5 text-primary" />
        Leave a Reflection
      </h3>
      
      {status === "success" && (
        <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl mb-6 font-semibold text-sm border border-emerald-500/20">
          Thank you! Your comment has been submitted and is awaiting moderation.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl mb-6 font-semibold text-sm border border-red-500/20">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="commenter-name" className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400">
              Name *
            </label>
            <input
              id="commenter-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "submitting"}
              placeholder="Your Name"
              required
              className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none transition-all text-sm dark:text-zinc-100"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="commenter-email" className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400">
              Email *
            </label>
            <input
              id="commenter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              placeholder="email@work.com"
              required
              className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none transition-all text-sm dark:text-zinc-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="comment-text" className="font-label-md text-label-md text-on-surface-variant dark:text-zinc-400">
            Reflection *
          </label>
          <textarea
            id="comment-text"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={status === "submitting"}
            placeholder="Share your thoughts..."
            required
            className="w-full bg-surface-container-low dark:bg-zinc-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none transition-all text-sm resize-none dark:text-zinc-100"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-3 rounded-full hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/10 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Submit Comment"}
          <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
