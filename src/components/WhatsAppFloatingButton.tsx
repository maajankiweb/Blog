"use client";

import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

const PHONE_NUMBER = "919006543913";

export default function WhatsAppFloatingButton() {
  const [whatsappUrl, setWhatsappUrl] = useState(
    `https://api.whatsapp.com/send/?phone=${PHONE_NUMBER}&text=${encodeURIComponent(
      "Hi Team MJ Digital,\n\nI came across your website (https://blog.maajankiwebtech.com/).\n\nI have a few questions and would love to consult with your team."
    )}&type=phone_number&app_absent=0`
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pageTitle = document.title ? document.title.split("|")[0].trim() : "your page";
      const currentUrl = window.location.href;

      const professionalMessage = `Hi Team MJ Digital,

I came across your page:
*"${pageTitle}"*
Link: ${currentUrl}

I have a few questions regarding this and would love to consult with your team.`;

      const encodedMessage = encodeURIComponent(professionalMessage);
      setWhatsappUrl(
        `https://api.whatsapp.com/send/?phone=${PHONE_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`
      );
    }
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with MJ Digital"
      className="fixed left-5 bottom-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 md:px-4 md:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group border border-white/20"
    >
      <FaWhatsapp className="w-6 h-6 text-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
      <span className="hidden md:inline-block font-semibold text-xs tracking-wide pr-1">
        Chat with Us
      </span>
    </a>
  );
}
