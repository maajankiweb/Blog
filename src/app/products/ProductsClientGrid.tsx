"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { WooDigitalProduct } from "@/lib/wordpress";
import {
  HiStar,
  HiCheckCircle,
  HiXMark,
  HiCreditCard,
  HiMagnifyingGlass,
  HiEye,
  HiAdjustmentsHorizontal,
  HiOutlineShoppingBag,
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

  const categories = ["All", "Templates", "Plugins", "AI Tools", "Ebooks"];

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
          p.category.toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const getNumeric = (priceStr: string) => {
          if (!priceStr || priceStr.toLowerCase().includes("free")) return 0;
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

      {/* Search, Filter & Sort Toolbar */}
      <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 space-y-4 shadow-2xs">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates, plugins, ebooks..."
              className="w-full bg-white border border-slate-200 focus:border-[#DC2564] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <HiAdjustmentsHorizontal className="text-[#DC2564]" size={18} />
            <span className="text-xs text-slate-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 focus:border-[#DC2564] text-xs text-slate-800 rounded-xl px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="featured">Featured &amp; Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? "bg-[#DC2564] text-white border-[#DC2564] shadow-xs"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{displayedProducts.length}</strong> of <strong className="text-slate-800">{filteredProducts.length}</strong> assets
          </span>
        </div>
      </div>

      {/* Empty State */}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1"
          >
            <div>
              {/* Product Thumbnail */}
              <Link href={`/products/${product.slug}`} className="relative h-48 w-full bg-slate-100 overflow-hidden block border-b border-slate-100">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-[#DC2564] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                <Image
                  src={product.featuredImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Body Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#DC2564] font-bold uppercase tracking-wider text-[10px] bg-[#FDF2F5] px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#FCA311] font-bold">
                    <HiStar size={14} className="fill-current" />
                    <span className="text-slate-700 text-xs">{product.rating || 4.9}</span>
                  </div>
                </div>

                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#DC2564] transition-colors leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {product.shortDescription || product.description}
                </p>

                {/* Features Mini Checklist */}
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-1 pt-1">
                    {product.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <HiCheckCircle size={14} className="text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Footer Pricing & CTA */}
            <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">
                  Price
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-slate-900">
                    {product.price}
                  </span>
                  {product.regularPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {product.regularPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#DC2564] text-slate-700 hover:text-[#DC2564] transition-colors"
                  title="Add to Cart"
                  aria-label="Add to Cart"
                >
                  <HiOutlineShoppingBag size={18} />
                </button>

                <button
                  onClick={() => setActiveCheckoutProduct(product)}
                  className="bg-[#DC2564] hover:bg-[#B81D52] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-xs"
          >
            Load More Products
          </button>
        </div>
      )}

      {/* Instant Checkout / Buy Modal */}
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
              <span className="text-[10px] font-bold text-[#DC2564] uppercase tracking-wider bg-[#FDF2F5] px-2 py-0.5 rounded-md">
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
                className="w-full bg-[#DC2564] hover:bg-[#B81D52] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
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
