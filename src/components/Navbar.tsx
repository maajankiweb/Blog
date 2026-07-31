"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiBars3,
  HiXMark,
  HiSparkles,
} from "react-icons/hi2";
import SearchAutocomplete from "@/components/SearchAutocomplete";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

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
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0806]/95 backdrop-blur-xl border-b border-white/10 text-white transition-all duration-300 shadow-2xl">
        <nav className="flex justify-between items-center h-[72px] w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xl md:text-2xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity"
          >
            <span>Maajanki</span>
            <span className="w-2 h-2 rounded-full bg-[#ff6b00] inline-block" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-8 items-center h-full">
            {navItems.map(({ label, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <li key={label} className="h-full flex items-center relative">
                  <Link
                    className={`transition-all text-sm py-1 ${
                      isActive
                        ? "text-white font-bold"
                        : "text-white/80 hover:text-white font-medium"
                    }`}
                    href={href}
                  >
                    {label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ff6b00] rounded-full"
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
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6b00]"
                />
                <HiMagnifyingGlass
                  size={16}
                  className="absolute left-3 text-[#ff6b00]"
                />
              </motion.form>
            )}
          </AnimatePresence>

          {/* Trailing Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`p-2.5 rounded-xl transition-all ${
                showSearchInput
                  ? "bg-white/15 text-white"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
              aria-label="Toggle search"
            >
              <HiMagnifyingGlass size={20} />
            </button>

            <a
              href="https://www.youtube.com/@Akwebmasterhub"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff0000] hover:bg-[#cc0000] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#ff0000]/25 active:scale-95 whitespace-nowrap flex items-center gap-1.5"
            >
              <HiSparkles size={14} />
              <span>Subscribe</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl hover:bg-white/10 transition-colors md:hidden text-white"
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
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-[72px] bg-[#120904] border-b border-white/10 shadow-2xl z-40 p-5 flex flex-col gap-4 md:hidden text-white"
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
                    className={`px-3 py-2.5 rounded-xl font-medium text-base transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[#ff6b00]/20 text-white font-bold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
