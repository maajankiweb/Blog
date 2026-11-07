"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Grid, List, Search, Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WPPost, WPCategory, WPTag, cleanHtmlText } from "@/lib/wordpress";
import AdBanner from "./AdBanner";
import HostingerAdCard from "./HostingerAdCard";
import YoutubeAdCard from "./YoutubeAdCard";
import MaajankiAdCard from "./MaajankiAdCard";
import BrewPluseAdCard from "./BrewPluseAdCard";

interface BlogListingLayoutProps {
  initialPosts: WPPost[];
  categories: WPCategory[];
  tags: WPTag[];
  activeCategoryId?: number;
  activeTagId?: number;
  latestProduct?: any;
}

export default function BlogListingLayout({
  initialPosts,
  categories,
  tags,
  activeCategoryId,
  activeTagId,
  latestProduct,
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
    <div className="bg-white text-slate-900 min-h-screen pb-20">
      {/* Page Header — Magazine Style */}
      <header className="bg-slate-50/80 pt-16 pb-12 px-margin-mobile md:px-margin-desktop border-b border-slate-200/80">
        <div className="max-w-container-max mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="inline-block text-[#DC2564] text-xs uppercase tracking-wider font-extrabold bg-[#FDF2F5] px-3 py-1 rounded-full border border-[#FBCFE8]">
                THE ARCHIVE
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Editorial Dispatches &amp; Guides
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Curated insights into web development, technical SEO, WordPress engineering, and digital business growth.
              </p>
            </div>

            {/* Layout Toggle Controls */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#FDF2F5] text-[#DC2564]"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#FDF2F5] text-[#DC2564]"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search the archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#DC2564]/20 focus:border-[#DC2564] outline-none text-xs sm:text-sm text-slate-900 transition-all"
              />
            </form>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleCategoryClick(undefined)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  !activeCategoryId && !activeTagId
                    ? "bg-[#DC2564] text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                All Topics
              </button>
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategoryId === cat.id
                      ? "bg-[#DC2564] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
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
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Post Grid/List */}
          <div className="lg:col-span-8 space-y-8">
            {initialPosts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900 mb-2">No articles found</h3>
                <p className="text-slate-500 text-sm">
                  We couldn&apos;t find any articles matching your active search or filters.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
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
                    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
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
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 hover:border-slate-300 transition-all duration-200 flex flex-col h-full"
                        >
                          <Link href={`/blog/${post.slug}`} className="aspect-[16/10] overflow-hidden relative bg-slate-100 block">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={imageAlt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                loading={idx < 2 ? "eager" : "lazy"}
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">MAAJANKI</span>
                              </div>
                            )}
                            {primaryCategory && (
                              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#DC2564] px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border border-slate-200/60 shadow-xs">
                                {primaryCategory.name}
                              </span>
                            )}
                          </Link>
                          <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                <span className="font-semibold text-slate-700">{author?.name || "Maajanki Team"}</span>
                                <span>•</span>
                                <span suppressHydrationWarning>{formattedDate}</span>
                              </div>
                              <Link href={`/blog/${post.slug}`}>
                                <h3 className="font-bold text-base md:text-lg text-slate-900 group-hover:text-[#DC2564] transition-colors line-clamp-2 leading-snug">
                                  {cleanHtmlText(post.title.rendered)}
                                </h3>
                              </Link>
                              <p className="text-slate-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                                {cleanHtmlText(post.excerpt.rendered).slice(0, 115)}...
                              </p>
                            </div>
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                              <Link href={`/blog/${post.slug}`} className="text-[#DC2564] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                <span>Read Dispatch</span>
                                <ChevronRight className="h-3.5 w-3.5" />
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
                        transition={{ duration: 0.15 }}
                        className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start"
                      >
                        <Link href={`/blog/${post.slug}`} className="w-full sm:w-60 aspect-video sm:aspect-square shrink-0 rounded-xl overflow-hidden bg-slate-100 relative block">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              fill
                              sizes="(max-width: 768px) 100vw, 240px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              loading={idx < 2 ? "eager" : "lazy"}
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                              <span className="text-slate-400 font-bold text-xs uppercase">MAAJANKI</span>
                            </div>
                          )}
                          {primaryCategory && (
                            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#DC2564] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200/60 shadow-xs">
                              {primaryCategory.name}
                            </span>
                          )}
                        </Link>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <span className="font-semibold text-slate-700">{author?.name || "Maajanki Team"}</span>
                            <span>•</span>
                            <span suppressHydrationWarning>{formattedDate}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="font-bold text-base md:text-lg text-slate-900 group-hover:text-[#DC2564] transition-colors line-clamp-2 leading-snug">
                              {cleanHtmlText(post.title.rendered)}
                            </h3>
                          </Link>
                          <p className="text-slate-600 text-xs md:text-sm line-clamp-2 leading-relaxed">
                            {cleanHtmlText(post.excerpt.rendered).slice(0, 140)}...
                          </p>
                          <div className="pt-2">
                            <Link href={`/blog/${post.slug}`} className="text-[#DC2564] font-bold text-xs inline-flex items-center gap-1 hover:underline">
                              <span>Read Full Article</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Search Widget */}
            <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Search Articles
              </h4>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white py-2.5 px-3.5 pr-10 rounded-xl border border-slate-200 focus:border-[#DC2564] outline-none text-xs sm:text-sm text-slate-900 transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#DC2564]">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Featured Digital Products Banner */}
            {latestProduct ? (
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#14213D] p-5 sm:p-6 rounded-2xl border border-slate-800 text-white shadow-md space-y-3 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FBCFE8] bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                    {latestProduct.badge || "NEW RELEASE"}
                  </span>
                  <span className="text-xs font-black text-white bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700">
                    {latestProduct.price}
                  </span>
                </div>

                {latestProduct.featuredImage && (
                  <Link
                    href={`/products/${latestProduct.slug}`}
                    className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-800 block border border-slate-700/60"
                  >
                    <Image
                      src={latestProduct.featuredImage}
                      alt={latestProduct.name}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                <div>
                  <Link
                    href={`/products/${latestProduct.slug}`}
                    className="font-extrabold text-sm sm:text-base leading-snug text-white group-hover:text-[#FBCFE8] transition-colors line-clamp-2 block mb-1"
                  >
                    {latestProduct.name}
                  </Link>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {latestProduct.plainShortDescription || latestProduct.shortDescription?.replace(/<[^>]*>/g, "")}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between gap-2">
                  <Link
                    href={`/products/${latestProduct.slug}`}
                    className="inline-flex items-center gap-1.5 bg-[#DC2564] hover:bg-[#B81D52] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    <span>{latestProduct.buttonText || "Get Product"}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/products"
                    className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Browse All →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-900 to-[#14213D] p-6 rounded-2xl border border-slate-800 text-white shadow-md space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FBCFE8] bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                  OFFICIAL STORE
                </span>
                <h4 className="font-extrabold text-base leading-snug">
                  Explore Digital Products &amp; Resources
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Verified software blueprints, high-converting templates, and business guides for founders.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 bg-[#DC2564] hover:bg-[#B81D52] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>Visit Digital Store</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {/* Popular Tags */}
            {tags && tags.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Topic Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 14).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTagClick(t.id)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                        activeTagId === t.id
                          ? "bg-[#DC2564] text-white border-[#DC2564]"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                      }`}
                    >
                      #{t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar YouTube Channel */}
            <YoutubeAdCard />

            {/* Hostinger Sponsored Ad Widget */}
            <HostingerAdCard />

            {/* Maajanki Web Tech Agency Ad */}
            <MaajankiAdCard />

            {/* BrewPluse Cafe Management Software Ad */}
            <BrewPluseAdCard />

            {/* Sponsored Ad Banner */}
            <AdBanner />
          </aside>
        </div>
      </main>
    </div>
  );
}
