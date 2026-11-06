import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import { Mail, MapPin, Phone, MessageSquare, Clock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | MJ Digital",
  description:
    "Get in touch with the MJ Digital engineering and editorial team. Inquire about digital products, custom Next.js development, licensing, and partnerships.",
  alternates: { canonical: "https://blog.maajankiwebtech.com/contact" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const contactFaqs = [
  {
    question: "How quickly does the team respond to inquiries?",
    answer:
      "We typically review and respond to all developer and commercial inquiries within 24 business hours. For urgent digital license issues, our WhatsApp channel is monitored daily.",
  },
  {
    question: "Do you offer custom web development and migration services?",
    answer:
      "Yes. MJ Digital specializes in custom Next.js architectures, Headless WordPress development, WooCommerce integration, and performance optimization.",
  },
  {
    question: "Where can I get direct support for purchased digital products?",
    answer:
      "You can access all your downloads and licenses anytime in the Customer Portal at /my-account. For direct troubleshooting, email support@maajankiwebtech.com.",
  },
];

export default function ContactPage() {
  return (
    <div suppressHydrationWarning className="bg-[#FFFFFF] text-[#14213D] min-h-screen">
      {/* ── 1. Hero Header ────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#F7F8FC] to-white border-b border-gray-200 py-16 md:py-20">
        <div suppressHydrationWarning className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="badge-brand inline-block">
            REACH OUT TO OUR TEAM
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#14213D] tracking-tight">
            Let&apos;s Build Something <span className="text-[#DC2564]">Extraordinary</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a question about our Next.js digital products, licensing terms, or require enterprise custom engineering? We are here to assist.
          </p>
        </div>
      </section>

      {/* ── 2. Split Content: Details Left, Form Right ───────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & HQ Details */}
          <div suppressHydrationWarning className="lg:col-span-5 space-y-8">
            <div suppressHydrationWarning>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2564] font-bold">
                DIRECT CHANNELS
              </span>
              <h2 className="text-2xl font-black text-[#14213D] mt-1">
                Official Communications
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Connect directly with our engineering architects, support desk, or founder.
              </p>
            </div>

            <div suppressHydrationWarning className="space-y-4">
              {/* Card 1: Email */}
              <div suppressHydrationWarning className="card-saas p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#DC2564] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div suppressHydrationWarning>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email Desk
                  </h3>
                  <a
                    href="mailto:info@maajankiwebtech.com"
                    className="text-sm font-bold text-[#14213D] hover:text-[#DC2564] transition-colors block mt-0.5"
                  >
                    info@maajankiwebtech.com
                  </a>
                  <p className="text-[11px] text-gray-500 mt-0.5">Average reply time: Under 24h</p>
                </div>
              </div>

              {/* Card 2: Phone & WhatsApp */}
              <div suppressHydrationWarning className="card-saas p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div suppressHydrationWarning>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Phone &amp; WhatsApp Support
                  </h3>
                  <a
                    href="tel:+919006543913"
                    className="text-sm font-bold text-[#14213D] hover:text-[#DC2564] transition-colors block mt-0.5"
                  >
                    +91 90065 43913
                  </a>
                  <p className="text-[11px] text-gray-500 mt-0.5">Mon–Sat: 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              {/* Card 3: Registered Headquarters */}
              <div suppressHydrationWarning className="card-saas p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div suppressHydrationWarning>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Operational Headquarters
                  </h3>
                  <p className="text-sm font-bold text-[#14213D] mt-0.5">
                    MJ Digital
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Link to Customer Account */}
            <div suppressHydrationWarning className="p-6 bg-[#14213D] text-white rounded-2xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2564] font-bold">
                LOOKING FOR PAST PURCHASES?
              </span>
              <h3 className="text-base font-bold">Customer Self-Service Portal</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                If you already purchased a starter kit or digital product, access your files, license keys, and receipts directly without waiting.
              </p>
              <Link
                href="/my-account"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2564] hover:text-white transition-colors pt-1"
              >
                <span>Go to My Account &amp; Downloads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div suppressHydrationWarning className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      {/* ── 3. Contact FAQs ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F8FC] border-t border-gray-200">
        <div suppressHydrationWarning className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection
            title="Inquiries &amp; Support FAQs"
            subtitle="Common questions regarding communication channels, turnaround times, and technical assistance."
            items={contactFaqs}
          />
        </div>
      </section>
    </div>
  );
}
