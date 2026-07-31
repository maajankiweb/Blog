"use client";

import React from "react";
import Image from "next/image";

interface YoutubeAdCardProps {
  className?: string;
}

export default function YoutubeAdCard({ className = "" }: YoutubeAdCardProps) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:border-primary-container/40 transition-all duration-200 ${className}`}
    >
      <a
        href="https://www.youtube.com/@Akwebmasterhub"
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative"
      >
        <div className="relative w-full aspect-[1/1] overflow-hidden bg-zinc-900">
          <Image
            src="/ak-webmaster-hub-banner.jpg"
            alt="AK Web Master Hub - YouTube Channel"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="bg-[#ff0000] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              Subscribe on YouTube →
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
