"use client";

import { useEffect } from "react";

/**
 * ExtensionCleaner — Removes browser extension injected attributes (e.g. Bitdefender `bis_skin_checked`)
 * immediately on DOM load to permanently prevent React 19 hydration mismatch warnings in dev overlay.
 */
export default function ExtensionCleaner() {
  useEffect(() => {
    const cleanInjectedAttributes = () => {
      try {
        const elements = document.querySelectorAll("[bis_skin_checked]");
        elements.forEach((el) => {
          el.removeAttribute("bis_skin_checked");
        });
      } catch {
        // silent
      }
    };

    cleanInjectedAttributes();

    // Observe any delayed extension attribute injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "bis_skin_checked"
        ) {
          (mutation.target as HTMLElement).removeAttribute("bis_skin_checked");
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["bis_skin_checked"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
