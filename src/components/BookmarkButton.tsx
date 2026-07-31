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
}

export default function BookmarkButton({
  slug,
  title,
  excerpt,
  category,
  imageUrl,
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
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

  return (
    <button
      onClick={toggleBookmark}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 border ${
        isSaved
          ? "bg-[#ff6b00] text-white border-[#ff6b00]"
          : "bg-white/10 hover:bg-white/20 text-white/90 border-white/20"
      }`}
      title={isSaved ? "Remove from saved articles" : "Save article for later"}
    >
      <HiBookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
      <span>{isSaved ? "Saved" : "Save for later"}</span>
    </button>
  );
}
