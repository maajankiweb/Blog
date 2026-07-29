"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const percentage = trackLength > 0 ? Math.floor((scrollTop / trackLength) * 100) : 0;
      setWidth(`${percentage}%`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-accent-primary z-[60] transition-all duration-100 ease-out" 
      style={{ width }} 
    />
  );
}
