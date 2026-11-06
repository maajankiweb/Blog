"use client";

import React, { useState, useEffect } from "react";
import { HiBookmark } from "react-icons/hi2";

export interface SavedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  savedAt: string;
}

interface BookmarkButtonProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  className?: string;
  variant?: "light" | "dark";
}

export default function BookmarkButton({
  slug,
  title,
  excerpt,
  category,
  imageUrl,
  className = "",
  variant = "light",
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedList: SavedArticle[] = JSON.parse(
        localStorage.getItem("maajanki_saved_articles") || "[]"
      );
      setIsSaved(savedList.some((item) => item.slug === slug));
    } catch (err) {
      console.error("Failed to read bookmarks:", err);
    }
  }, [slug]);

  const toggleBookmark = () => {
    try {
      const savedList: SavedArticle[] = JSON.parse(
        localStorage.getItem("maajanki_saved_articles") || "[]"
      );

      if (isSaved) {
        const updated = savedList.filter((item) => item.slug !== slug);
        localStorage.setItem("maajanki_saved_articles", JSON.stringify(updated));
        setIsSaved(false);
      } else {
        const newItem: SavedArticle = {
          slug,
          title,
          excerpt,
          category,
          imageUrl,
          savedAt: new Date().toISOString(),
        };
        const updated = [newItem, ...savedList.filter((item) => item.slug !== slug)];
        localStorage.setItem("maajanki_saved_articles", JSON.stringify(updated));
        setIsSaved(true);
      }
    } catch (err) {
      console.error("Failed to update bookmarks:", err);
    }
  };

  const baseStyle =
    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95 border cursor-pointer select-none";

  const colorStyle = isSaved
    ? "bg-[#DC2564] hover:bg-[#b01e4f] text-white border-[#DC2564] shadow-xs"
    : variant === "dark"
    ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
    : "bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-900 border-slate-300";

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={`${baseStyle} ${colorStyle} ${className}`}
      title={isSaved ? "Remove from saved articles" : "Save article for later"}
      aria-label={isSaved ? "Remove article from bookmarks" : "Save article for later"}
    >
      <HiBookmark
        className={`w-4 h-4 transition-transform ${
          isSaved ? "fill-white text-white scale-110" : "text-slate-600"
        }`}
      />
      <span className="font-semibold">
        {mounted && isSaved ? "Saved" : "Save for later"}
      </span>
    </button>
  );
}
