"use client";

import { useEffect, useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
}

export default function TableOfContents({ htmlContent }: { htmlContent: string }) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    // Parse h2 elements from the post content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const h2s = doc.querySelectorAll("h2");
    
    const parsedHeadings: HeadingItem[] = Array.from(h2s).map((h2, index) => {
      const text = h2.textContent || "";
      // Match the generated id format: heading-0, heading-1, etc.
      const id = h2.id || `heading-${index}`;
      return { id, text };
    });

    setHeadings(parsedHeadings);
  }, [htmlContent]);

  if (headings.length === 0) {
    // Return a default table of contents as a fallback
    return (
      <div className="bg-surface-container-low dark:bg-zinc-900 p-gutter rounded-xl border border-outline-variant/20 dark:border-zinc-800/30">
        <h3 className="font-label-md text-label-md mb-md text-on-surface dark:text-zinc-200 uppercase font-bold">
          CONTENTS
        </h3>
        <ul className="flex flex-col gap-sm text-sm">
          <li><a className="text-primary font-bold" href="#">1. The Cognitive Load</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">2. Technical Implementation</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">3. Comparative Analysis</a></li>
          <li><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">4. Looking to 2025</a></li>
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low dark:bg-zinc-900 p-gutter rounded-xl border border-outline-variant/20 dark:border-zinc-800/30">
      <h3 className="font-label-md text-label-md mb-md text-on-surface dark:text-zinc-200 uppercase font-bold">
        CONTENTS
      </h3>
      <ul className="flex flex-col gap-sm text-sm">
        {headings.map((heading, idx) => (
          <li key={idx}>
            <a
              href={`#${heading.id}`}
              className="text-on-surface-variant dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors block line-clamp-1 py-1"
            >
              {idx + 1}. {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
