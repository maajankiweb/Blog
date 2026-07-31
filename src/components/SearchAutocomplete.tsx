"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { WPPost, cleanHtmlText } from "@/lib/wordpress";

interface SearchAutocompleteProps {
  onCloseMobile?: () => void;
}

export default function SearchAutocomplete({ onCloseMobile }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WPPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search results on debounced query change
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch(`https://blog.maajankiwebtech.com/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&_embed=true&per_page=5`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setResults(data);
            setIsOpen(true);
          }
        })
        .catch((err) => console.error("Search autocomplete error:", err))
        .finally(() => setIsLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      if (onCloseMobile) onCloseMobile();
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <HiMagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ff6b00] pointer-events-none"
        />
        <input
          type="text"
          placeholder="Type to search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6b00] transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <HiXMark size={16} />
          </button>
        )}
      </form>

      {/* Autocomplete Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#120904] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 space-y-1 backdrop-blur-2xl">
          {isLoading ? (
            <div className="p-4 text-center text-xs text-white/50 animate-pulse">
              Searching published articles...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-xs text-white/50">
              No matching articles found.
            </div>
          ) : (
            <>
              {results.map((post) => {
                const titleText = cleanHtmlText(post.title?.rendered || "");
                const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
                const imageUrl = featuredMedia?.source_url;

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    {imageUrl ? (
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-800">
                        <Image
                          src={imageUrl}
                          alt={titleText}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-10 rounded-lg bg-[#ff6b00]/20 flex items-center justify-center shrink-0 text-[#ff6b00] font-black text-xs">
                        MJ
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#ff6b00] transition-colors truncate">
                        {titleText}
                      </h4>
                      <p className="text-[11px] text-white/50 truncate">
                        Read full guide →
                      </p>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-white/10 text-center">
                <button
                  onClick={handleSubmit}
                  className="text-[11px] font-bold text-[#ff6b00] hover:underline"
                >
                  View all results for &quot;{query}&quot; →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
