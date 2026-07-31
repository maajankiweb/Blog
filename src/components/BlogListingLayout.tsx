"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Grid, List, Search, Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WPPost, WPCategory, WPTag } from "@/lib/wordpress";
import AdBanner from "./AdBanner";
import HostingerAdCard from "./HostingerAdCard";
import YoutubeAdCard from "./YoutubeAdCard";

interface BlogListingLayoutProps {
  initialPosts: WPPost[];
  categories: WPCategory[];
  tags: WPTag[];
  activeCategoryId?: number;
  activeTagId?: number;
}

export default function BlogListingLayout({
  initialPosts,
  categories,
  tags,
  activeCategoryId,
  activeTagId,
}: BlogListingLayoutProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (catId?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catId) {
      params.set("category", catId.toString());
    } else {
      params.delete("category");
    }
    params.delete("tag"); // Reset tag on category change
    router.push(`/blog?${params.toString()}`);
  };

  const handleTagClick = (tagId?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tagId) {
      params.set("tag", tagId.toString());
    } else {
      params.delete("tag");
    }
    params.delete("category"); // Reset category on tag change
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="bg-background text-on-background min-h-screen pb-xl">
      {/* Page Header */}
      <header className="bg-surface-container-low pt-xl pb-lg px-margin-mobile md:px-margin-desktop border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto space-y-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div className="max-w-2xl space-y-xs">
              <span className="inline-block text-primary-container font-label-md text-label-md uppercase tracking-wider font-bold">
                THE ARCHIVE
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
                Articles &amp; Insights
              </h1>
              <p className="text-on-surface-variant font-body-lg text-body-lg">
                Curated insights into design, culture, and technological innovation. Exploring the boundaries of digital and physical editorial experiences.
              </p>
            </div>

            {/* Layout & Sort Controls */}
            <div className="flex items-center gap-base self-start md:self-auto">
              <div className="flex items-center bg-surface border border-outline-variant/30 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-primary-container/15 text-primary-container"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-primary-container/15 text-primary-container"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <select className="bg-surface border border-outline-variant/30 text-on-surface rounded-xl px-4 py-2.5 font-label-md text-label-md outline-none focus:ring-2 focus:ring-primary-container/30 transition-all duration-200">
                <option>Newest</option>
                <option>Popular</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-sm pt-2">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search the archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant/30 rounded-2xl focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all duration-200 text-sm"
              />
            </form>
            <div className="flex flex-wrap gap-xs">
              <button
                onClick={() => {
                  handleCategoryClick(undefined);
                }}
                className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all duration-200 ${
                  !activeCategoryId && !activeTagId
                    ? "bg-primary-container text-on-primary"
                    : "bg-surface border border-outline-variant/30 text-on-surface-variant hover:border-primary-container/50 hover:text-primary-container"
                }`}
              >
                All Topics
              </button>
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all duration-200 ${
                    activeCategoryId === cat.id
                      ? "bg-primary-container text-on-primary"
                      : "bg-surface border border-outline-variant/30 text-on-surface-variant hover:border-primary-container/50 hover:text-primary-container"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Post Grid/List */}
          <div className="lg:col-span-8 space-y-xl">
            {initialPosts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-outline-variant/30 rounded-2xl bg-surface">
                <h3 className="text-lg font-bold text-on-surface mb-2">No articles found</h3>
                <p className="text-on-surface-variant text-sm">
                  We couldn&apos;t find any articles matching your active filters.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-gutter ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {initialPosts.map((post, idx) => {
                    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                    const imageUrl = featuredMedia?.source_url;
                    const imageAlt = featuredMedia?.alt_text || post.title.rendered;
                    const author = post._embedded?.author?.[0];
                    const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    });
                    const postCategories = post._embedded?.['wp:term']?.[0] || [];
                    const primaryCategory = postCategories[0];

                    if (viewMode === "grid") {
                      return (
                        <motion.article
                          layout
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="group bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_-4px_rgba(17,24,39,0.06)] hover:-translate-y-0.5 hover:border-outline-variant/50 transition-all duration-200 flex flex-col h-full"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative bg-surface-variant">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={imageAlt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                loading={idx < 2 ? "eager" : "lazy"}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-fixed to-primary" />
                            )}
                            {primaryCategory && (
                              <span className="absolute top-4 left-4 bg-primary-container text-on-primary px-3 py-1 rounded-lg font-label-md text-label-md shadow-sm">
                                {primaryCategory.name}
                              </span>
                            )}
                          </div>
                          <div className="p-md flex flex-col flex-grow">
                            <div className="flex items-center gap-xs mb-sm text-[#6B6058] font-label-md text-label-md text-xs">
                              {author && <span className="font-bold text-primary-container">{author.name}</span>}
                              {author && <span>•</span>}
                              <span>{formattedDate}</span>
                            </div>
                            <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                              <h3 
                                className="font-headline-md text-body-lg md:text-headline-md font-bold mb-base line-clamp-2 leading-tight"
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                              />
                            </Link>
                            <p 
                              className="text-on-surface-variant text-sm line-clamp-3 mb-md leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...'
                              }}
                            />
                            <div className="mt-auto pt-md border-t border-outline-variant/10 flex items-center justify-end">
                              <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-sm flex items-center gap-xs">
                                Read <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      );
                    }

                    // List View Layout
                    return (
                      <motion.article
                        layout
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="group bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_-4px_rgba(17,24,39,0.06)] hover:border-outline-variant/50 transition-all duration-200 p-md flex flex-col md:flex-row gap-lg items-start"
                      >
                        <div className="w-full md:w-64 aspect-video md:aspect-square shrink-0 rounded-xl overflow-hidden bg-surface-variant relative">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              fill
                              sizes="(max-width: 768px) 100vw, 256px"
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              loading={idx < 2 ? "eager" : "lazy"}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-fixed to-primary" />
                          )}
                          {primaryCategory && (
                            <span className="absolute top-4 left-4 bg-primary-container text-on-primary px-3 py-1 rounded-lg font-label-md text-label-md shadow-sm">
                              {primaryCategory.name}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 space-y-sm">
                          <div className="flex items-center gap-xs text-[#6B6058] font-label-md text-label-md text-xs">
                            {author && (
                              <span className="font-bold text-primary-container flex items-center gap-1">
                                <User className="h-3 w-3" /> {author.name}
                              </span>
                            )}
                            {author && <span>•</span>}
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formattedDate}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                            <h3 
                              className="font-headline-md text-body-lg md:text-headline-md font-bold mb-base line-clamp-2 leading-tight"
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                          </Link>
                          <p 
                            className="text-on-surface-variant text-sm line-clamp-3 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'
                            }}
                          />
                          <div className="pt-2">
                            <Link href={`/blog/${post.slug}`} className="text-primary font-bold text-sm flex items-center gap-xs">
                              Read Full Article <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination Controls */}
            {initialPosts.length > 0 && (
              <div className="mt-xl flex justify-center items-center gap-sm pt-6">
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-300 text-zinc-900 font-extrabold hover:bg-primary-container hover:text-white hover:border-primary-container transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 shadow-xs">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-container text-white font-extrabold shadow-md border border-primary-container">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-300 text-zinc-900 font-extrabold hover:bg-primary-container hover:text-white hover:border-primary-container transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 shadow-xs">
                  2
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-300 text-zinc-900 font-extrabold hover:bg-primary-container hover:text-white hover:border-primary-container transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 shadow-xs">
                  3
                </button>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold px-2">...</span>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-300 text-zinc-900 font-extrabold hover:bg-primary-container hover:text-white hover:border-primary-container transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 shadow-xs">
                  12
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-300 text-zinc-900 font-extrabold hover:bg-primary-container hover:text-white hover:border-primary-container transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 shadow-xs">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-lg">
            {/* Search Widget */}
            <div className="bg-surface p-lg rounded-2xl border border-outline-variant/30">
              <h4 className="text-label-md font-bold uppercase tracking-widest text-on-surface mb-md">
                Search Archive
              </h4>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background py-3 px-4 pr-12 rounded-xl border border-outline-variant/30 focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none text-sm transition-all duration-200"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-container">
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Trending / Popular Posts Widget */}
            <div className="bg-surface p-lg rounded-2xl border border-outline-variant/30">
              <h4 className="text-label-md font-bold uppercase tracking-widest text-on-surface mb-md">
                Trending Now
              </h4>
              <div className="space-y-md">
                {initialPosts.slice(0, 3).map((post) => {
                  const imgUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                  return (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-md items-center">
                      <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-surface-variant relative">
                        {imgUrl ? (
                          <Image
                            src={imgUrl}
                            alt={post.title.rendered}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-fixed to-primary" />
                        )}
                      </div>
                      <div>
                        <h5 
                          className="text-label-md font-bold text-[#1A1410] group-hover:text-primary-container transition-colors line-clamp-2 leading-snug"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <span className="text-[11px] text-[#6B6058] font-medium">
                          {new Date(post.date).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* AK Web Master Hub YouTube Channel Banner */}
            <YoutubeAdCard />

            {/* Hostinger Sponsored Ad Widget */}
            <HostingerAdCard />

            {/* Tags Cloud Widget */}
            {tags && tags.length > 0 && (
              <div className="bg-surface p-lg rounded-2xl border border-outline-variant/30">
                <h4 className="text-label-md font-bold uppercase tracking-widest text-on-surface mb-md">
                  Popular Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 15).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTagClick(t.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        activeTagId === t.id
                          ? "bg-primary-container text-on-primary border-primary-container"
                          : "bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:border-primary-container/50"
                      }`}
                    >
                      #{t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sponsored / Ad Placement Widget (Osdire & Affiliate Ads) */}
            <AdBanner />

            {/* Sidebar Wide Newsletter Widget */}
            <div
              className="p-lg rounded-2xl relative overflow-hidden text-white border border-white/10"
              style={{ background: "linear-gradient(135deg, #0d0806 0%, #170d08 40%, #241108 100%)" }}
            >
              <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #ff6b00 0%, transparent 70%)" }} />
              <h4 className="font-black text-white text-lg mb-xs relative z-10">
                Fresh Insights Weekly.
              </h4>
              <p className="text-white/70 text-sm mb-lg relative z-10">
                Join 50,000+ readers who receive our curated Sunday digest.
              </p>
              <form action="/newsletter" method="GET" className="space-y-sm relative z-10">
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="w-full bg-white/8 border border-white/15 py-3 px-4 rounded-xl text-white placeholder:text-white/35 focus:ring-1 focus:ring-[#ff6b00] focus:border-[#ff6b00] outline-none text-sm transition-all duration-200"
                  required
                />
                <button type="submit" className="w-full py-3 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold rounded-xl transition-all duration-200 text-sm active:scale-[0.98]">
                  Subscribe Free
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
