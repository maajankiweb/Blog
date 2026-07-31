"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WPPost, cleanHtmlText } from "@/lib/wordpress";

interface BreakingNewsTickerProps {
  posts: WPPost[];
}

export default function BreakingNewsTicker({ posts }: BreakingNewsTickerProps) {
  const tickerPosts = posts.length > 0 ? posts.slice(0, 10) : [];

  if (tickerPosts.length === 0) return null;

  // Duplicate items for continuous seamless infinite loop
  const displayPosts = [...tickerPosts, ...tickerPosts];

  return (
    <section className="bg-surface border-y border-outline-variant/25 py-3 px-margin-mobile md:px-margin-desktop overflow-hidden shadow-xs relative z-10">
      <div className="max-w-container-max mx-auto flex items-center gap-4">
        {/* Red Breaking News Badge */}
        <div className="shrink-0 bg-[#e00000] text-white font-black text-xs md:text-sm uppercase tracking-wider px-3.5 py-1.5 rounded flex items-center gap-2 shadow-md z-20">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
          <span>BREAKING NEWS</span>
        </div>

        {/* Smooth Continuous Auto-sliding Container (Right to Left) */}
        <div className="flex-1 overflow-hidden relative animate-marquee-container py-1">
          <div className="flex items-center gap-8 animate-marquee">
            {displayPosts.map((post, index) => {
              const imgUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              return (
                <Link
                  key={`${post.id}-${index}`}
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-3 shrink-0 group/item hover:text-primary transition-colors pr-8 border-r border-outline-variant/20 last:border-r-0 max-w-[280px] md:max-w-[320px]"
                >
                  {imgUrl ? (
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-surface-variant relative shrink-0 border border-outline-variant/20">
                      <Image
                        src={imgUrl}
                        alt={post.title.rendered}
                        fill
                        sizes="40px"
                        className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : null}
                  <h4 className="text-xs md:text-sm font-bold text-on-surface group-hover/item:text-primary transition-colors leading-snug line-clamp-2 whitespace-normal">
                    {cleanHtmlText(post.title.rendered)}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
