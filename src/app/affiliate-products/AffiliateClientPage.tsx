"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiStar,
  HiShoppingBag,
  HiSparkles,
  HiTag,
  HiArrowTopRightOnSquare,
  HiCheckCircle,
  HiClipboardDocumentCheck,
  HiQuestionMarkCircle,
  HiFunnel,
  HiChevronDown,
  HiInformationCircle,
} from "react-icons/hi2";
import { WPAffiliateProduct } from "@/lib/wordpress";

interface Props {
  initialProducts: WPAffiliateProduct[];
}

const CATEGORIES = [
  "All",
  "Hosting",
  "Themes & Plugins",
  "SEO & Marketing",
  "AI Tools",
  "Domain & Security",
];

export default function AffiliateClientPage({ initialProducts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "rating" | "discount">("featured");
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [showWpGuide, setShowWpGuide] = useState(false);

  const copyToClipboard = (coupon: string) => {
    navigator.clipboard.writeText(coupon);
    setCopiedCoupon(coupon);
    setTimeout(() => setCopiedCoupon(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.storeName &&
            product.storeName.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === "discount") {
          return (b.discount ? 1 : 0) - (a.discount ? 1 : 0);
        }
        return a.id - b.id;
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pb-24 pt-8">
      {/* Hero Header */}
      <section className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b00]/10 via-purple-900/10 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider mb-4">
            <HiSparkles size={16} />
            <span>Verified Affiliate Deals & Recommendations</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Recommended Tools, Hosting & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-orange-400">Exclusive Deals</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 font-normal leading-relaxed mb-8">
            Hand-picked software, premium hosting, WordPress extensions, and digital tools tested by our web agency. Updated regularly directly from our WordPress content system.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowWpGuide(!showWpGuide)}
              className="flex items-center gap-2 text-xs md:text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl border border-white/10 transition-all"
            >
              <HiQuestionMarkCircle size={18} className="text-[#ff6b00]" />
              <span>How to add products via WordPress CMS?</span>
              <HiChevronDown
                size={16}
                className={`transition-transform ${showWpGuide ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Admin WordPress Guide Collapsible Banner */}
      <AnimatePresence>
        {showWpGuide && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-10"
          >
            <div className="bg-[#180e09] border border-[#ff6b00]/30 rounded-2xl p-6 md:p-8 relative">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#ff6b00]/20 rounded-xl text-[#ff6b00]">
                  <HiInformationCircle size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                    Publishing Affiliate Products via WordPress Dashboard
                  </h2>
                  <p className="text-sm text-white/70 mb-4 leading-relaxed">
                    You can manage all affiliate products dynamically through your existing WordPress site without writing new code! Here is how your site automatically extracts affiliate metadata:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-white/80">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff6b00] block mb-1">1. Category & Tagging</span>
                      Add a post in WordPress and tag or assign it to category <code className="bg-black/40 text-orange-300 px-1 py-0.5 rounded">Affiliate</code> or <code className="bg-black/40 text-orange-300 px-1 py-0.5 rounded">Products</code>.
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff6b00] block mb-1">2. Price & Link Meta</span>
                      Include metadata in your post content using formatted lines:
                      <br />
                      <code className="text-white/60 block mt-1">Price: ₹2,499</code>
                      <code className="text-white/60 block">Coupon: MAAJANKI10</code>
                      <code className="text-white/60 block">Store: Hostinger</code>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff6b00] block mb-1">3. Direct Syncing</span>
                      The frontend automatically fetches your published posts from WordPress REST API (<code className="text-orange-300">/wp-json/wp/v2/posts</code>) and renders them cleanly!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Filter and Search Bar */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-[#130b07] p-4 rounded-2xl border border-white/10">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <HiMagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ff6b00]"
            />
            <input
              type="text"
              placeholder="Search hosting, SEO tools, plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff6b00]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#ff6b00] text-white shadow-lg shadow-[#ff6b00]/30"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 border-t lg:border-t-0 border-white/10 pt-3 lg:pt-0">
            <HiFunnel size={16} className="text-white/50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 text-xs md:text-sm text-white/80 rounded-xl px-3 py-2 focus:outline-none focus:border-[#ff6b00]"
            >
              <option value="featured" className="bg-[#130b07]">Featured</option>
              <option value="rating" className="bg-[#130b07]">Highest Rating</option>
              <option value="discount" className="bg-[#130b07]">Best Discounts</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <HiShoppingBag size={48} className="mx-auto text-white/30 mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">No products found</h3>
            <p className="text-sm text-white/60">
              Try adjusting your category filter or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="group relative bg-[#120904] rounded-2xl border border-white/10 hover:border-[#ff6b00]/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl"
              >
                {/* Badge Overlay */}
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-[#ff6b00] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}

                {/* Store Name Pill */}
                {product.storeName && (
                  <span className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
                    {product.storeName}
                  </span>
                )}

                {/* Product Image */}
                <div className="relative h-48 w-full bg-white/5 overflow-hidden">
                  <Image
                    src={product.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120904] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category */}
                  <span className="text-[11px] uppercase tracking-wider text-[#ff6b00] font-bold mb-1">
                    {product.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff6b00] transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-white">{product.rating || 4.8}</span>
                    <span className="text-white/40">({product.reviewsCount || 100}+ reviews)</span>
                  </div>

                  {/* Tagline / Description */}
                  <p className="text-xs text-white/70 leading-relaxed mb-6 line-clamp-2">
                    {product.tagline || product.description}
                  </p>

                  {/* Pricing Block */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs text-white/50 block">Starting Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg md:text-xl font-black text-white">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-white/40 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {product.discount && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Coupon Code Pill */}
                  {product.couponCode && (
                    <div className="mb-4 bg-white/5 border border-dashed border-[#ff6b00]/40 rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-white/80">
                        <HiTag className="text-[#ff6b00]" size={14} />
                        <span>Code: <strong className="text-white">{product.couponCode}</strong></span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(product.couponCode!)}
                        className="text-[11px] font-bold text-[#ff6b00] hover:underline flex items-center gap-1"
                      >
                        {copiedCoupon === product.couponCode ? (
                          <>
                            <HiClipboardDocumentCheck size={14} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <span>Copy Code</span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Action CTAs */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/affiliate-products/${product.slug}`}
                      className="text-center text-xs font-bold py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Details</span>
                    </Link>

                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener sponsored"
                      className="text-center text-xs font-bold py-2.5 px-3 rounded-xl bg-[#ff6b00] hover:bg-[#e05e00] text-white shadow-lg shadow-[#ff6b00]/25 transition-all flex items-center justify-center gap-1 active:scale-95"
                    >
                      <span>Get Deal</span>
                      <HiArrowTopRightOnSquare size={14} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Floating Toast Notification for Coupon Copy */}
      <AnimatePresence>
        {copiedCoupon && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] bg-emerald-950 border border-emerald-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl"
          >
            <HiClipboardDocumentCheck size={20} className="text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Coupon Code Copied!</p>
              <p className="text-[11px] text-emerald-300">
                Code &quot;{copiedCoupon}&quot; copied to clipboard.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
