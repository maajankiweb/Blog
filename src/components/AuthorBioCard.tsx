"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { HiCheckBadge, HiArrowRight } from "react-icons/hi2";

export default function AuthorBioCard() {
  return (
    <div className="bg-surface border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-sm my-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar / Photo */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#ff6b00] relative bg-neutral-900 shadow-md">
            <Image
              src="https://blog.maajankiwebtech.com/wp-content/uploads/2026/02/Ashish-Kumar-Profile.png"
              alt="Ashish Kumar - Founder & Lead Strategist"
              fill
              sizes="96px"
              className="object-cover"
              onError={(e) => {
                // Fallback avatar handler
              }}
            />
          </div>
          <span className="absolute bottom-0 right-0 bg-[#ff6b00] text-white p-1 rounded-full border-2 border-surface shadow-xs" title="Verified Author & Founder">
            <HiCheckBadge className="w-4 h-4" />
          </span>
        </div>

        {/* Bio Content */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-on-surface text-lg md:text-xl flex items-center justify-center sm:justify-start gap-1.5">
                <span>Ashish Kumar</span>
                <span className="text-xs bg-[#ff6b00]/10 text-[#ff6b00] px-2.5 py-0.5 rounded-full border border-[#ff6b00]/20 font-bold uppercase tracking-wider">
                  FOUNDER &amp; LEAD STRATEGIST
                </span>
              </h3>
              <p className="text-xs text-on-surface-variant/70 font-semibold mt-0.5">
                Founder at Maajanki WebTech | Web Developer &amp; SEO Consultant
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-end gap-2 pt-1 sm:pt-0">
              <a
                href="https://www.youtube.com/@Akwebmasterhub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#ff0000]/10 text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-all flex items-center justify-center text-sm"
                title="AK Web Master Hub YouTube Channel"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/company/maajankiwebtech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center text-sm"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/AshishKmj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-on-surface hover:bg-[#ff6b00] hover:text-white transition-all flex items-center justify-center text-sm"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/kumarashishweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-600 hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center text-sm"
                title="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
            Ashish helps Indian business owners, freelancers, and developers scale online through high-converting web architecture, technical SEO, and proven organic growth strategies. Creator of <strong className="text-on-surface">AK Web Master Hub</strong> YouTube channel and <strong className="text-on-surface">InvoBill India</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
            <a
              href="https://www.youtube.com/@Akwebmasterhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6b00] hover:underline flex items-center gap-1"
            >
              <span>Watch Tutorials on YouTube</span>
              <HiArrowRight size={12} />
            </a>
            <span className="text-outline-variant">•</span>
            <Link href="/about" className="text-on-surface-variant hover:text-on-surface hover:underline">
              About Maajanki Agency
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
