import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Globe,
  Share2,
  ArrowRight,
  Sparkles,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Compass,
  Zap,
  Layout,
  TrendingUp,
  Award,
  ExternalLink,
  CheckCircle2,
  Rocket,
  Code2,
  Building2,
  Layers,
  Cpu,
} from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "About Us | MJ Digital",
  description:
    "Learn about MJ Digital, our founder Ashish Kumar, our engineering philosophy, and how we help modern digital brands scale with Next.js, Headless WordPress, and AI.",
  alternates: { canonical: "https://blog.maajankiwebtech.com/about" },
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
  openGraph: {
    title: "About Us | MJ Digital",
    description: "Learn about MJ Digital, our founder Ashish Kumar, our engineering philosophy, and how we help modern digital brands scale.",
    url: "https://blog.maajankiwebtech.com/about",
    type: "website",
  },
};

const aboutFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MJ Digital's core focus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MJ Digital develops high-performance digital publishing platforms, custom Next.js web applications, headless commerce systems, and commercial SaaS & starter kit products.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the founder of MJ Digital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MJ Digital was founded by Ashish Kumar, a full-stack engineer and digital systems architect with extensive expertise in Next.js, Headless WordPress, and performance optimization.",
      },
    },
    {
      "@type": "Question",
      name: "What digital platforms and software do you operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our active platforms include the Maajanki Web Tech digital agency, BrewPluse POS cafe management software, and developer tools & starter kits.",
      },
    },
    {
      "@type": "Question",
      name: "What digital products do you produce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We engineer production-ready Next.js starter templates, headless WordPress architectures, automated marketing tools, and curated developer utilities.",
      },
    },
  ],
};

const coreValues = [
  {
    icon: Target,
    title: "Code-First Excellence",
    desc: "We write clean, typed, modular code built for high scale, blazing sub-second load times, and long-term maintainability.",
  },
  {
    icon: ShieldCheck,
    title: "Production Reliability",
    desc: "Every system, template, and architectural pattern is stress-tested against real enterprise production traffic.",
  },
  {
    icon: Zap,
    title: "Continuous Innovation",
    desc: "Pioneering hybrid headless solutions that merge headless WordPress content operations with cutting-edge Next.js user interfaces.",
  },
  {
    icon: Users,
    title: "Customer & Community First",
    desc: "Empowering developers and agency owners with transparent licensing, hands-on documentation, and dedicated engineering support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFaqJsonLd) }}
      />
      <div suppressHydrationWarning className="bg-[#FFFFFF] text-[#14213D] min-h-screen">
        {/* ── 1. Hero Section ───────────────────────────────── */}
        <section suppressHydrationWarning className="relative pt-16 md:pt-24 pb-16 md:pb-20 bg-gradient-to-b from-[#F7F8FC] to-white border-b border-gray-200">
          <div suppressHydrationWarning className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="badge-brand inline-block">
              ENGINEERING &amp; DIGITAL EXCELLENCE
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight leading-[1.15]">
              Empowering Modern Digital Brands to{" "}
              <span className="text-[#DC2564]">Build, Learn &amp; Scale</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              MJ Digital is a modern technology company and digital publishing platform. We bridge the gap between world-class engineering, high-performance headless architecture, and practical digital commerce.
            </p>

            <div suppressHydrationWarning className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/products" className="btn-primary">
                <span>Explore Digital Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-outline">
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. Founder Story & Philosophy ───────────────────────────────── */}
        <section suppressHydrationWarning className="py-16 md:py-24 bg-[#F7F8FC]">
          <div suppressHydrationWarning className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div suppressHydrationWarning className="lg:col-span-5">
                <div suppressHydrationWarning className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[3/4] bg-slate-900">
                  <Image
                    src="/ashish-kumar.png"
                    alt="Ashish Kumar - Founder of MJ Digital"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top"
                    priority
                  />
                  <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-[#14213D]/95 via-[#14213D]/25 to-transparent" />
                  <div suppressHydrationWarning className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#DC2564] font-bold">
                      FOUNDER &amp; ARCHITECT
                    </p>
                    <h3 className="text-2xl font-black mt-1">Ashish Kumar</h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Full-Stack Engineer • Next.js &amp; Headless WordPress Specialist
                    </p>
                  </div>
                </div>
              </div>

              <div suppressHydrationWarning className="lg:col-span-7 space-y-6">
                <span className="badge-brand inline-block">OUR PHILOSOPHY</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#14213D] leading-tight">
                  Crafted for Speed, Security &amp; Measurable Business Impact
                </h2>
                <div suppressHydrationWarning className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  <p>
                    Founded by <strong>Ashish Kumar</strong>, MJ Digital was born out of a real industry necessity: digital businesses were trapped between slow, fragile legacy CMS setups and overly complex modern web stacks.
                  </p>
                  <p>
                    We created a unified paradigm that brings together the best of both worlds. By coupling the familiar, intuitive editorial workflow of WordPress with the blazing execution speeds, edge caching, and type-safety of <strong>Next.js App Router</strong>, we help creators, agencies, and businesses achieve unmatched digital performance.
                  </p>
                  <p>
                    Whether through our in-depth editorial tutorials, open-source utilities, or production-ready digital starter templates, our mission remains uncompromising: <em>deliver actionable technology that actually moves the revenue needle</em>.
                  </p>
                </div>

                <div suppressHydrationWarning className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                  <div suppressHydrationWarning className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Headless Architecture</span>
                  </div>
                  <div suppressHydrationWarning className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Razorpay &amp; UPI Commerce</span>
                  </div>
                  <div suppressHydrationWarning className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>100% Core Web Vitals Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. OUR Platforms Ecosystem (Premium Redesigned Cards with Real Imagery) ──────────────── */}
        <section suppressHydrationWarning className="py-20 bg-[#FFFFFF] border-t border-b border-gray-200">
          <div suppressHydrationWarning className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div suppressHydrationWarning className="text-center max-w-2xl mx-auto space-y-3">
              <span className="badge-brand inline-block">OUR ECOSYSTEM</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#14213D] tracking-tight">
                OUR Platforms &amp; Software Products
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Discover the software products, web platforms, and digital client services engineered by our core team.
              </p>
            </div>

            {/* 4 Cards Grid with Real Imagery & Ad-Inspired Glowing Design */}
            <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: My Agency (Maajanki Web Tech) */}
              <div
                suppressHydrationWarning
                className="bg-gradient-to-br from-[#0c1427] via-[#111e3b] to-[#18284d] border border-orange-500/30 hover:border-orange-400/60 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Decorative Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-600/25 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/35 transition-all" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3.5 relative z-10">
                  {/* Header Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-orange-500/20 text-orange-300 rounded-full border border-orange-400/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      FEATURED AGENCY
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      SERVICE
                    </span>
                  </div>

                  {/* Logo Container with Real Image */}
                  <div className="bg-white/95 rounded-xl p-3 flex items-center justify-center border border-white/20 shadow-xs relative h-28">
                    <div className="relative w-full h-12">
                      <Image
                        src="/maajanki-web-tech-logo.webp"
                        alt="Maajanki Web Tech Agency Logo"
                        fill
                        sizes="280px"
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-orange-300 transition-colors">
                      Maajanki Web Tech LLP
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed mt-1">
                      Full-service digital agency building custom Next.js web applications, headless commerce systems, and data-driven SEO growth campaigns.
                    </p>
                  </div>

                  {/* Feature Checkmarks */}
                  <ul className="text-xs text-orange-200/90 space-y-1.5 font-medium pt-1">
                    <li className="flex items-center gap-1.5">
                      <span className="text-orange-400 font-bold">✓</span> Next.js &amp; Headless WordPress
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-orange-400 font-bold">✓</span> Technical SEO, Speed &amp; 3x CRO
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-orange-400 font-bold">✓</span> Complete Digital Marketing &amp; Growth
                    </li>
                  </ul>
                </div>

                <div className="pt-4 relative z-10">
                  <a
                    href="https://maajankiwebtech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-[#DC2564] hover:from-orange-600 hover:to-[#B81D52] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-orange-950/40 active:scale-[0.98]"
                  >
                    <span>Visit maajankiwebtech.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: BrewPluse POS (Cafe Management Software) */}
              <div
                suppressHydrationWarning
                className="bg-gradient-to-br from-[#042f2e] via-[#064e3b] to-[#022c22] border border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Decorative Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-400/35 transition-all" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-teal-600/20 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-3.5 relative z-10">
                  {/* Header Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      CAFE &amp; RESTAURANT POS
                    </span>
                    <span className="text-xs text-emerald-200/60 font-semibold uppercase tracking-wider">
                      SAAS
                    </span>
                  </div>

                  {/* Real Storefront Photo Container */}
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-emerald-400/20 shadow-xs bg-slate-900">
                    <Image
                      src="/brewpluse-cafe.jpg"
                      alt="BrewPluse POS Cafe Management Software"
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[11px] font-bold text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      BrewPluse POS
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-emerald-300 transition-colors">
                      BrewPluse POS
                    </h3>
                    <p className="text-emerald-100/90 text-xs leading-relaxed mt-1">
                      Cloud cafe &amp; restaurant management software with lightning-fast billing, automated inventory alerts, and QR ordering.
                    </p>
                  </div>

                  {/* Feature Checkmarks */}
                  <ul className="text-xs text-emerald-200/90 space-y-1.5 font-medium pt-1">
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span> Fast Cloud POS &amp; Kitchen KOT
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span> Recipe &amp; Real-time Stock Inventory
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span> Contactless QR Digital Menus
                    </li>
                  </ul>
                </div>

                <div className="pt-4 relative z-10">
                  <a
                    href="https://brewpluse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 shadow-md shadow-emerald-950/40 active:scale-[0.98]"
                  >
                    <span>Visit brewpluse.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Coming Soon */}
              <div
                suppressHydrationWarning
                className="bg-gradient-to-br from-[#120a2a] via-[#1a0f3d] to-[#291254] border border-purple-500/30 hover:border-purple-400/60 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center group min-h-[420px]"
              >
                {/* Decorative Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-600/25 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/35 transition-all" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="w-full flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    IN LABS
                  </span>
                  <span className="text-xs text-purple-300/60 font-semibold uppercase tracking-wider">
                    UPCOMING
                  </span>
                </div>

                <div className="my-auto py-6 space-y-4 relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Rocket className="w-8 h-8 animate-pulse text-purple-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Coming Soon
                    </h3>
                    <p className="text-xs text-purple-200/80 font-medium">
                      Proprietary Software Platform
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 max-w-[220px] mx-auto leading-relaxed">
                    New cloud software platform currently under active development. Stay tuned for official launch.
                  </p>
                </div>

                <div className="w-full pt-4 relative z-10 border-t border-purple-500/20">
                  <div className="w-full bg-purple-900/40 border border-purple-500/40 py-2.5 px-3 rounded-xl text-center">
                    <span className="text-xs font-bold text-purple-200 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                      Status: Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 4: Coming Soon */}
              <div
                suppressHydrationWarning
                className="bg-gradient-to-br from-[#082032] via-[#0f2d48] to-[#173a5e] border border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center group min-h-[420px]"
              >
                {/* Decorative Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/35 transition-all" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                <div className="w-full flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    IN LABS
                  </span>
                  <span className="text-xs text-cyan-300/60 font-semibold uppercase tracking-wider">
                    UPCOMING
                  </span>
                </div>

                <div className="my-auto py-6 space-y-4 relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Sparkles className="w-8 h-8 animate-pulse text-cyan-300" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Coming Soon
                    </h3>
                    <p className="text-xs text-cyan-200/80 font-medium">
                      Enterprise Digital Utility
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 max-w-[220px] mx-auto leading-relaxed">
                    Next-generation digital tool designed to accelerate automated online operations.
                  </p>
                </div>

                <div className="w-full pt-4 relative z-10 border-t border-cyan-500/20">
                  <div className="w-full bg-cyan-900/40 border border-cyan-500/40 py-2.5 px-3 rounded-xl text-center">
                    <span className="text-xs font-bold text-cyan-200 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      Status: Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Core Principles ───────────────────────────────── */}
        <section suppressHydrationWarning className="py-16 md:py-24 bg-white">
          <div suppressHydrationWarning className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div suppressHydrationWarning className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="badge-brand inline-block">OUR STANDARDS</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#14213D]">
                Principles That Guide Every Line of Code
              </h2>
              <p className="text-sm text-gray-600">
                We believe in uncompromising software quality, transparent licensing, and long-term customer success.
              </p>
            </div>

            <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, idx) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={idx}
                    suppressHydrationWarning
                    className="card-saas p-6 space-y-4 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#DC2564] flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-[#14213D]">{value.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. Corporate Entity & Office ───────────────────────────────── */}
        <section suppressHydrationWarning className="py-16 bg-[#14213D] text-white">
          <div suppressHydrationWarning className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div suppressHydrationWarning className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div suppressHydrationWarning className="lg:col-span-8 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2564] font-bold">
                  REGISTERED OPERATIONAL HEADQUARTERS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  MJ Digital
                </h2>
                <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                  India. Serving forward-thinking developers, agencies, and enterprise creators across India and worldwide.
                </p>
              </div>

              <div suppressHydrationWarning className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/contact"
                  className="btn-primary text-center justify-center py-3 text-xs font-bold"
                >
                  Send Business Inquiry
                </Link>
                <a
                  href="https://maajankiwebtech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline bg-transparent border-white/20 text-white hover:bg-white hover:text-[#14213D] text-center justify-center py-3 text-xs font-bold"
                >
                  Main Agency Website ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. FAQ Section ───────────────────────────────── */}
        <section suppressHydrationWarning className="py-16 md:py-24 bg-[#F7F8FC]">
          <div suppressHydrationWarning className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FaqSection
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our company, software products, and support."
              items={aboutFaqJsonLd.mainEntity.map((item) => ({
                question: item.name,
                answer: item.acceptedAnswer.text,
              }))}
            />
          </div>
        </section>
      </div>
    </>
  );
}
