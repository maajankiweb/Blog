"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SavedArticle } from "@/components/BookmarkButton";
import { HiBookmark, HiTrash, HiArrowRight, HiSparkles } from "react-icons/hi2";

export default function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const list: SavedArticle[] = JSON.parse(
        localStorage.getItem("maajanki_saved_articles") || "[]"
      );
      setSavedArticles(list);
    } catch (err) {
      console.error("Failed to load saved articles:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const removeArticle = (slug: string) => {
    const updated = savedArticles.filter((item) => item.slug !== slug);
    setSavedArticles(updated);
    localStorage.setItem("maajanki_saved_articles", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all saved articles?")) {
      setSavedArticles([]);
      localStorage.removeItem("maajanki_saved_articles");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background py-20 flex items-center justify-center text-white">
        <p className="animate-pulse">Loading saved articles...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-white py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC2564]/15 border border-[#DC2564]/30 text-[#DC2564] text-xs font-bold uppercase tracking-wider">
              <HiBookmark className="w-4 h-4" />
              <span>PERSONAL LIBRARY</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Saved Articles &amp; Bookmarks
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-xl">
              Access your saved tutorials, web dev guides, and SEO strategies offline without creating an account.
            </p>
          </div>

          {savedArticles.length > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0"
            >
              <HiTrash size={16} />
              <span>Clear All Saved ({savedArticles.length})</span>
            </button>
          )}
        </div>

        {/* Saved List Grid */}
        {savedArticles.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-gray-200 space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#DC2564]/15 text-[#DC2564] flex items-center justify-center mx-auto">
              <HiBookmark size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Your Reading List is Empty</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Explore our articles and click &quot;Save for later&quot; on any guide to save it here for instant access.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md mt-2"
            >
              <span>Explore Articles</span>
              <HiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article) => (
              <article
                key={article.slug}
                className="group relative bg-white rounded-2xl border border-gray-200 hover:border-[#DC2564]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#DC2564] text-[10px] font-black uppercase tracking-wider">
                      {article.category}
                    </span>
                    <button
                      onClick={() => removeArticle(article.slug)}
                      className="text-white/40 hover:text-red-400 p-1 transition-colors"
                      title="Remove from saved"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>

                  <Link href={`/blog/${article.slug}`}>
                    <h3 className="font-bold text-lg text-white group-hover:text-[#DC2564] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-200 flex items-center justify-between text-xs text-white/50">
                  <span>Saved on {new Date(article.savedAt).toLocaleDateString()}</span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-[#DC2564] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read →</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
