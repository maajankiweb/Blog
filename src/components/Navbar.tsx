"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiBars3,
  HiXMark,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setShowSearchInput(false);
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/blog" },
    { label: "Store", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900 transition-all duration-300 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
        <nav className="flex justify-between items-center h-[70px] w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 text-xl md:text-2xl font-black tracking-tight text-slate-900 hover:opacity-90 transition-opacity"
          >
            <span>MJ Digital</span>
            <span className="w-2 h-2 rounded-full bg-[#DC2564] inline-block mb-0.5" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-7 items-center h-full">
            {navItems.map(({ label, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <li key={label} className="h-full flex items-center relative">
                  <Link
                    className={`transition-colors text-sm py-1.5 font-medium ${
                      isActive
                        ? "text-[#DC2564] font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    href={href}
                  >
                    {label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      suppressHydrationWarning
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#DC2564] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Inline Quick Search (Desktop Expandable) */}
          <AnimatePresence>
            {showSearchInput && (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "240px" }}
                exit={{ opacity: 0, width: 0 }}
                onSubmit={handleSearchSubmit}
                className="hidden md:flex items-center relative overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#DC2564] focus:bg-white"
                />
                <HiMagnifyingGlass
                  size={16}
                  className="absolute left-3 text-slate-400"
                />
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trailing Actions */}
          <div className="flex items-center gap-2.5">
            {/* Search Toggle Button */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`p-2 rounded-xl transition-all ${
                showSearchInput
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
              aria-label="Toggle search"
            >
              <HiMagnifyingGlass size={19} />
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 relative transition-all"
              aria-label="View Shopping Cart"
            >
              <HiOutlineShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#DC2564] text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Primary CTA (Digital Store) */}
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center justify-center bg-[#DC2564] hover:bg-[#B81D52] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-[#DC2564]/20 active:scale-95 whitespace-nowrap"
            >
              Explore Store
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors md:hidden text-slate-800"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[70px] bg-white border-b border-slate-200 shadow-xl z-40 p-5 flex flex-col gap-4 md:hidden text-slate-900"
          >
            <SearchAutocomplete onCloseMobile={() => setIsOpen(false)} />

            <div className="flex flex-col gap-1 py-1">
              {navItems.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[#FDF2F5] text-[#DC2564] font-semibold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2564]" />
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#DC2564] text-white py-2.5 rounded-xl text-xs font-bold shadow-sm"
            >
              Visit Digital Store
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
