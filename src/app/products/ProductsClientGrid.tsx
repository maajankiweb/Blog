"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { WooDigitalProduct } from "@/lib/wordpress";
import {
  HiStar,
  HiCheckCircle,
  HiXMark,
  HiCreditCard,
  HiMagnifyingGlass,
  HiAdjustmentsHorizontal,
  HiOutlineShoppingBag,
  HiArrowTopRightOnSquare,
  HiCheckBadge,
  HiLockClosed,
  HiArrowsPointingOut,
  HiHome,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";

interface ProductsClientGridProps {
  initialProducts: WooDigitalProduct[];
}

export default function ProductsClientGrid({ initialProducts }: ProductsClientGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<WooDigitalProduct | null>(null);
  const { addToCart } = useCart();
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (⌘K or Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute distinct categories and real-time count badges
  const { categories, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = { All: initialProducts.length };
    initialProducts.forEach((p) => {
      const cat = p.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const uniqueCats = ["All", ...Object.keys(counts).filter((c) => c !== "All")];
    return { categories: uniqueCats, categoryCounts: counts };
  }, [initialProducts]);

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          (p.plainShortDescription && p.plainShortDescription.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const getNumeric = (priceStr: string) => {
          if (!priceStr || priceStr.toLowerCase().includes("free") || priceStr.toLowerCase().includes("amazon")) return 0;
          return parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
        };

        if (sortBy === "price-asc") {
          return getNumeric(a.price) - getNumeric(b.price);
        }
        if (sortBy === "price-desc") {
          return getNumeric(b.price) - getNumeric(a.price);
        }
        if (sortBy === "rating") {
          return (b.rating || 0) - (a.rating || 0);
        }
        return (b.salesCount || 0) - (a.salesCount || 0);
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleAddToCart = (product: WooDigitalProduct) => {
    addToCart(product);
    setAddedToast(`Added "${product.name}" to cart`);
    setTimeout(() => {
      setAddedToast(null);
    }, 3500);
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl border border-slate-700 shadow-2xl flex items-center gap-3 text-xs font-bold">
          <HiCheckCircle className="text-emerald-400 w-5 h-5 shrink-0" />
          <span>{addedToast}</span>
          <Link href="/cart" className="underline text-[#DC2564] ml-2">
            View Cart
          </Link>
        </div>
      )}

      {/* ── Catalog Hero (wpwebtemplates.com style) ── */}
      <header className="flex flex-col gap-4 pb-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 flex items-center gap-1.5">
            <HiHome size={14} className="text-slate-400" />
            <span>Home</span>
          </Link>
          <span className="text-slate-300 font-normal">/</span>
          <span className="text-slate-900 font-semibold" aria-current="page">
            Templates
          </span>
        </nav>

        {/* Hero Meta Badges */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-emerald-800 font-mono">
              {initialProducts.length} Production-Ready Assets &amp; Templates
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11.5px] font-bold shadow-xs">
            <HiCheckBadge className="w-3.5 h-3.5 text-emerald-100" />
            <span>Verified Code · Instant Download</span>
          </div>
        </div>

        {/* Headings & Search Box */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
          <div className="max-w-2xl space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Templates &amp; Digital Store
            </h1>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Curated Next.js starter blueprints, custom WordPress plugins, eBooks, and verified developer toolkits with transparent pricing.
            </p>
          </div>

          {/* Quick Search Form with ⌘K Badge */}
          <div className="relative w-full lg:max-w-md">
            <div className="relative flex items-center">
              <HiMagnifyingGlass className="absolute left-4 text-slate-400 pointer-events-none" size={18} />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates, plugins, ebooks..."
                className="w-full h-11 pl-11 pr-20 bg-white border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-2xs"
                aria-label="Search templates"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-12 text-slate-400 hover:text-slate-600 text-xs p-1"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
              <div className="absolute right-3.5 pointer-events-none hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded">
                ⌘K
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky Category & Sort Bar (wpwebtemplates.com style) ── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md py-3 border-y border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        {/* Horizontal Category Pills */}
        <nav aria-label="Categories" className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <span>{cat === "All" ? "All Templates" : cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sort Controls */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <HiAdjustmentsHorizontal className="text-slate-400" size={16} />
          <span className="text-xs text-slate-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 focus:border-slate-400 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer font-medium"
          >
            <option value="featured">Featured &amp; Bestsellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* ── Empty State ── */}
      {displayedProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
          <p className="text-slate-500 text-sm">No products found matching your search or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-[#DC2564] font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── Products Grid (wph-card layout from wpwebtemplates.com) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => {
          const isExternal = Boolean(product.externalUrl) || product.type === "external";
          return (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* 1. Browser Mockup Header Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/90 border-b border-slate-100">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-500 max-w-[170px] truncate">
                    <HiLockClosed className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    <span className="truncate">{isExternal ? "amzn.in" : "maajankiwebtech.com"}</span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="text-slate-400 hover:text-slate-700 p-1"
                    title="View Product Page"
                    aria-label="View Product"
                  >
                    <HiArrowsPointingOut size={13} />
                  </Link>
                </div>

                {/* 2. Card Viewport Thumbnail with Hover Zoom */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative h-52 w-full bg-slate-100/70 overflow-hidden block border-b border-slate-100 p-4"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.featuredImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    />
                  </div>

                  {/* Top Overlay Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    {isExternal ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                        <span>Amazon Store</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span>Instant Delivery</span>
                      </span>
                    )}
                  </div>
                </Link>

                {/* 3. Card Body Details */}
                <div className="p-5 space-y-3">
                  {/* Meta row: Star rating + Category Tag */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#FCA311] font-bold text-xs">
                      <HiStar size={14} className="fill-current" />
                      <span className="text-slate-800">{product.rating || 4.9}</span>
                      <span className="text-slate-400 font-normal">({product.reviewsCount || 45})</span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {product.plainShortDescription || product.shortDescription?.replace(/<[^>]*>/g, "") || product.description?.replace(/<[^>]*>/g, "")}
                  </p>

                  {/* Features Mini Checklist */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-medium">
                      <HiCheckBadge size={12} className="text-emerald-600 shrink-0" />
                      <span>Verified Release</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-medium">
                      <HiCheckCircle size={12} className="text-emerald-600 shrink-0" />
                      <span>{isExternal ? "Kindle / Print" : "Full Source"}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Footer Pricing & CTA Row (wph-card-actions-row) */}
              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  {product.regularPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">
                      {product.regularPrice}
                    </span>
                  )}
                  <span className="text-lg font-black text-slate-900 tracking-tight">
                    {product.price}
                  </span>
                </div>

                {isExternal ? (
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF9900] hover:bg-[#E88B00] text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-xs active:scale-95"
                    title={product.buttonText || "Buy on Amazon"}
                  >
                    <span>{product.buttonText || "Buy Product"}</span>
                    <HiArrowTopRightOnSquare size={14} className="shrink-0" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 transition-colors"
                      title="Add to Cart"
                      aria-label="Add to Cart"
                    >
                      <HiOutlineShoppingBag size={16} />
                    </button>

                    <button
                      onClick={() => setActiveCheckoutProduct(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs"
                    >
                      Buy Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination / Load More */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-xs"
          >
            Load More Templates ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Instant Checkout / Buy Modal (Only for internal products) */}
      {activeCheckoutProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl relative space-y-6">
            <button
              onClick={() => setActiveCheckoutProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              <HiXMark size={20} />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                Fast Checkout
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {activeCheckoutProduct.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{activeCheckoutProduct.price}</span>
                {activeCheckoutProduct.regularPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {activeCheckoutProduct.regularPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                <span>Instant digital file download upon payment</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                <span>100% genuine lifetime license</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                <span>GST-compliant Indian billing</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href={`/checkout?product=${activeCheckoutProduct.id}`}
                onClick={() => {
                  addToCart(activeCheckoutProduct);
                  setActiveCheckoutProduct(null);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <HiCreditCard size={18} />
                <span>Pay Securely via Razorpay / UPI</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
