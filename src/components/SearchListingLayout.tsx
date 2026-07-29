"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, ChevronLeft, ChevronRight, Info, AlertCircle, ArrowRight } from "lucide-react";
import { WPPost, WPCategory } from "@/lib/wordpress";
import { motion } from "framer-motion";
import AdBanner from "./AdBanner";

interface SearchListingLayoutProps {
  query: string;
  initialPosts: WPPost[];
  categories: WPCategory[];
}

export default function SearchListingLayout({
  query,
  initialPosts,
  categories,
}: SearchListingLayoutProps) {
  const [searchVal, setSearchVal] = useState(query);

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    // Strip HTML tags for clean rendering
    const cleanText = text.replace(/<[^>]*>?/gm, "");
    const parts = cleanText.split(new RegExp(`(${search})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-primary-fixed text-on-primary-fixed-variant font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="bg-background text-on-background min-h-screen pb-xl">
      {/* Search Header */}
      <header className="bg-surface-container-low pt-xl pb-lg px-margin-mobile md:px-margin-desktop border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto space-y-md">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            Search results for '<span className="text-primary">{query}</span>'
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Found {initialPosts.length} results across all archives.
          </p>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        {initialPosts.length === 0 ? (
          /* Empty State Fallback Layout */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-md">
            <div className="w-48 h-48 bg-surface-container rounded-full flex items-center justify-center mb-md border border-outline-variant/30 animate-pulse">
              <AlertCircle className="h-24 w-24 text-outline" />
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              No results found for "{query}"
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              We couldn't find anything matching your request. Try adjusting your filters or checking spelling.
            </p>
            <div className="flex flex-col justify-center items-center gap-sm pt-4 w-full">
              <p className="font-label-md text-label-md uppercase text-on-surface-variant mb-xs">
                Try searching for...
              </p>
              <div className="flex flex-wrap justify-center gap-xs">
                <Link
                  href="/search?q=Development"
                  className="px-md py-sm bg-surface-container-high rounded-full font-label-md text-label-md hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-colors border border-outline-variant/20 text-sm"
                >
                  Development
                </Link>
                <Link
                  href="/search?q=Architecture"
                  className="px-md py-sm bg-surface-container-high rounded-full font-label-md text-label-md hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-colors border border-outline-variant/20 text-sm"
                >
                  Architecture
                </Link>
                <Link
                  href="/search?q=Minimalism"
                  className="px-md py-sm bg-surface-container-high rounded-full font-label-md text-label-md hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-colors border border-outline-variant/20 text-sm"
                >
                  Minimalism
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Search results layout with Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Left Sidebar Filters */}
            <aside className="lg:col-span-3 space-y-lg order-2 lg:order-1">
              {/* Category refinement */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 dark:border-zinc-800">
                <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant dark:text-zinc-300 mb-md font-bold">
                  Refine by Category
                </h3>
                <div className="space-y-sm">
                  {categories.slice(0, 5).map((cat) => (
                    <label key={cat.id} className="flex items-center gap-sm cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-white dark:bg-zinc-800"
                      />
                      <span className="font-body-md text-sm text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors">
                        {cat.name} ({cat.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Publish Date limits */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 dark:border-zinc-800">
                <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant dark:text-zinc-300 mb-md font-bold">
                  Publish Date
                </h3>
                <div className="space-y-sm">
                  <label className="flex items-center gap-sm cursor-pointer group">
                    <input
                      type="radio"
                      name="date"
                      defaultChecked
                      className="w-5 h-5 border-outline-variant text-primary focus:ring-primary bg-white dark:bg-zinc-800"
                    />
                    <span className="font-body-md text-sm text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors">
                      Anytime
                    </span>
                  </label>
                  <label className="flex items-center gap-sm cursor-pointer group">
                    <input
                      type="radio"
                      name="date"
                      className="w-5 h-5 border-outline-variant text-primary focus:ring-primary bg-white dark:bg-zinc-800"
                    />
                    <span className="font-body-md text-sm text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors">
                      Last 30 Days
                    </span>
                  </label>
                  <label className="flex items-center gap-sm cursor-pointer group">
                    <input
                      type="radio"
                      name="date"
                      className="w-5 h-5 border-outline-variant text-primary focus:ring-primary bg-white dark:bg-zinc-800"
                    />
                    <span className="font-body-md text-sm text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors">
                      Last 6 Months
                    </span>
                  </label>
                </div>
              </div>

              {/* Sponsored Ad Banner */}
              <AdBanner />

              {/* Search Tips */}
              <div className="p-md bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-sm">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-label-md text-label-md text-primary font-bold mb-xs">Search Tip</h3>
                  <p className="text-xs text-on-surface-variant dark:text-zinc-400 leading-relaxed">
                    Use specific phrases for exact matches, e.g., "headless architecture".
                  </p>
                </div>
              </div>
            </aside>

            {/* Right: Search Results list */}
            <div className="lg:col-span-9 space-y-lg order-1 lg:order-2">
              <div className="space-y-md">
                {initialPosts.map((post, idx) => {
                  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                  const imageUrl = featuredMedia?.source_url;
                  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Blog";
                  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group bg-white dark:bg-zinc-900 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-outline-variant/20 dark:border-zinc-800/30 flex flex-col md:flex-row gap-md p-md"
                    >
                      <div className="w-full md:w-60 h-40 flex-shrink-0 bg-surface-variant overflow-hidden rounded-lg relative">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            fill
                            sizes="(max-width: 768px) 100vw, 240px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            loading={idx < 2 ? "eager" : "lazy"}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-fixed to-primary" />
                        )}
                      </div>
                      <div className="flex-1 space-y-sm flex flex-col justify-between">
                        <div className="space-y-xs">
                          <div className="flex gap-sm items-center text-xs text-on-surface-variant dark:text-zinc-400 font-label-md">
                            <span className="bg-surface-variant dark:bg-zinc-800 text-on-surface-variant dark:text-zinc-300 px-2 py-0.5 rounded-full uppercase">
                              {categoryName}
                            </span>
                            <span className="flex items-center gap-xs"><Calendar className="h-3.5 w-3.5" /> {formattedDate}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <h2 className="font-headline-md text-body-lg md:text-headline-md font-bold leading-tight group-hover:text-primary transition-colors">
                              {highlightText(post.title.rendered, query)}
                            </h2>
                          </Link>
                          <p className="font-body-md text-sm text-on-surface-variant dark:text-zinc-400 line-clamp-2 leading-relaxed">
                            {highlightText(post.excerpt.rendered, query)}
                          </p>
                        </div>
                        <div className="pt-2">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary font-bold text-sm flex items-center gap-xs hover:gap-sm transition-all"
                          >
                            Read Article <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Search Results Pagination */}
              <div className="flex items-center justify-center gap-md py-lg border-t border-outline-variant/10 dark:border-zinc-800/10 mt-xl">
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant dark:border-zinc-800 text-on-surface dark:text-zinc-300 hover:bg-primary-fixed transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                  1
                </span>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant dark:border-zinc-800 text-on-surface dark:text-zinc-300 hover:bg-primary-fixed transition-colors">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant dark:border-zinc-800 text-on-surface dark:text-zinc-300 hover:bg-primary-fixed transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
