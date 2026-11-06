"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";
import { HiCheckBadge, HiArrowRight } from "react-icons/hi2";

export default function AuthorBioCard() {
  return (
    <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs my-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar / Photo */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#DC2564] relative bg-slate-800 shadow-md">
            <Image
              src="/ashish-kumar.png"
              alt="Ashish Kumar - Founder & Lead Strategist"
              fill
              sizes="96px"
              className="object-cover object-top"
              priority
            />
          </div>
          <span className="absolute bottom-0 right-0 bg-[#DC2564] text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Author & Founder">
            <HiCheckBadge className="w-4 h-4" />
          </span>
        </div>

        {/* Bio Content */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg md:text-xl flex items-center justify-center sm:justify-start gap-1.5">
                <span>Ashish Kumar</span>
                <span className="text-xs bg-[#FDF2F5] text-[#DC2564] px-2.5 py-0.5 rounded-full border border-[#FBCFE8] font-bold uppercase tracking-wider">
                  FOUNDER &amp; LEAD ARCHITECT
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Founder at MJ Digital | Web Developer &amp; SEO Consultant
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-end gap-2 pt-1 sm:pt-0">
              <a
                href="https://www.youtube.com/@Ashishkmj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center text-sm"
                title="Ashish Kumar YouTube Channel"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/company/maajankiwebtech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all flex items-center justify-center text-sm"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/AshishKmj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 hover:bg-[#DC2564] hover:text-white transition-all flex items-center justify-center text-sm"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/kumarashishweb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center text-sm"
                title="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Ashish helps Indian business owners, freelancers, and developers scale online through high-converting web architecture, technical SEO, and proven organic growth strategies. Creator of <strong className="text-slate-900">AK Web Master Hub</strong> YouTube channel and <strong className="text-slate-900">InvoBill India</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
            <a
              href="https://www.youtube.com/@Ashishkmj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DC2564] hover:underline flex items-center gap-1"
            >
              <span>Watch Tutorials on YouTube</span>
              <HiArrowRight size={12} />
            </a>
            <span className="text-slate-300">•</span>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 hover:underline">
              About Maajanki Agency
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
