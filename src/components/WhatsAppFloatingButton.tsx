"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=919006543913&text=Hi+%2AMaajanki+Blog+%7C+SEO%2C+Digital+Marketing+%26+Web+Development+Tips%2A+%7C+I+need+more+info+about+Maajanki+Blog+%7C+SEO%2C+Digital+Marketing+%26+Web+Development+Tips+https%3A%2F%2Fblog.maajankiwebtech.com%2F&type=phone_number&app_absent=0";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed left-5 bottom-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 md:px-4 md:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group border border-white/20"
    >
      <FaWhatsapp className="w-6 h-6 text-white shrink-0 animate-bounce" />
      <span className="hidden md:inline-block font-bold text-xs tracking-wide pr-1">
        Chat with Us
      </span>
    </a>
  );
}
