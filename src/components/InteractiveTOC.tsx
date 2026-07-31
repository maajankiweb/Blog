"use client";

import React, { useEffect, useState } from "react";
import { HiListBullet } from "react-icons/hi2";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface InteractiveTOCProps {
  content: string;
}

export default function InteractiveTOC({ content }: InteractiveTOCProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse h2 and h3 headings from the rendered DOM content
    const articleContainer = document.querySelector(".wp-content");
    if (!articleContainer) return;

    const headingElements = articleContainer.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    headingElements.forEach((el, index) => {
      // Ensure heading has an ID attribute
      let id = el.id;
      if (!id) {
        id = `heading-toc-${index}`;
        el.id = id;
      }

      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName.toLowerCase() === "h2" ? 2 : 3,
      });
    });

    setHeadings(items);

    // Setup IntersectionObserver for smooth active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // Navbar offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-[#120904] border border-white/10 p-5 rounded-2xl shadow-xl text-white space-y-4 sticky top-24">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-[#ff6b00]">
        <HiListBullet size={18} />
        <h4 className="font-extrabold text-xs uppercase tracking-widest text-white">
          Table of Contents
        </h4>
      </div>

      <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1 text-xs">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all leading-snug font-medium block truncate ${
                item.level === 3 ? "pl-5 text-[11px]" : ""
              } ${
                isActive
                  ? "bg-[#ff6b00] text-white font-bold shadow-md"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.text}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
