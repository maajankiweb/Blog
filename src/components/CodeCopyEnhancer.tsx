"use client";

import { useEffect } from "react";

export default function CodeCopyEnhancer() {
  useEffect(() => {
    const preBlocks = document.querySelectorAll(".wp-content pre");

    preBlocks.forEach((pre) => {
      // Avoid duplicate copy buttons
      if (pre.querySelector(".code-copy-btn")) return;

      const preElement = pre as HTMLElement;
      preElement.style.position = "relative";

      const copyBtn = document.createElement("button");
      copyBtn.className =
        "code-copy-btn absolute top-3 right-3 bg-white/10 hover:bg-[#ff6b00] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-white/20 shadow-md transition-all backdrop-blur-md active:scale-95 cursor-pointer z-10";
      copyBtn.innerText = "Copy Code";

      copyBtn.addEventListener("click", () => {
        const codeText = pre.querySelector("code")?.innerText || preElement.innerText;
        navigator.clipboard.writeText(codeText.trim());

        copyBtn.innerText = "Copied! ✓";
        copyBtn.style.backgroundColor = "#22c55e";

        setTimeout(() => {
          copyBtn.innerText = "Copy Code";
          copyBtn.style.backgroundColor = "";
        }, 2500);
      });

      preElement.appendChild(copyBtn);
    });
  }, []);

  return null;
}
