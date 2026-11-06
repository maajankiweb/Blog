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

            {/* 4 Cards Grid with Real Imagery */}
            <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: My Agency (Maajanki Web Tech) */}
              <div
                suppressHydrationWarning
                className="bg-white border border-gray-200 hover:border-[#DC2564]/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Real Logo */}
                  <div className="relative h-48 w-full bg-slate-50 border-b border-gray-100 flex items-center justify-center p-6 overflow-hidden">
                    <Image
                      src="/maajanki-web-tech-logo.webp"
                      alt="Maajanki Web Tech Agency Logo"
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#DC2564] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      My Agency
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-black text-base text-[#14213D] group-hover:text-[#DC2564] transition-colors">
                      Maajanki Web Tech
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Website Development, Headless WordPress &amp; Digital Marketing agency empowering brands online.
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href="https://maajankiwebtech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outline py-2.5 px-3 text-xs font-bold justify-center flex items-center gap-1.5 group-hover:border-[#DC2564] group-hover:text-[#DC2564]"
                  >
                    <span>Visit maajankiwebtech.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: BrewPluse POS (Cafe Management Software) */}
              <div
                suppressHydrationWarning
                className="bg-white border border-gray-200 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Storefront Real Photo */}
                  <div className="relative h-48 w-full bg-slate-900 border-b border-gray-100 overflow-hidden">
                    <Image
                      src="/brewpluse-cafe.jpg"
                      alt="BrewPluse POS Cafe Management Software"
                      fill
                      sizes="(max-width: 640px) 100vw, 280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      Cafe Management
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-black text-base text-[#14213D] group-hover:text-emerald-700 transition-colors">
                      BrewPluse POS
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Modern cloud restaurant &amp; cafe billing software with smart inventory, menu QR, and KOT management.
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href="https://brewpluse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-outline py-2.5 px-3 text-xs font-bold justify-center flex items-center gap-1.5 hover:border-emerald-600 hover:text-emerald-700"
                  >
                    <span>Visit brewpluse.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Coming Soon 1 */}
              <div
                suppressHydrationWarning
                className="bg-[#F7F8FC] border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col justify-between text-center min-h-[340px]"
              >
                <div className="space-y-4 pt-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-50 text-[#DC2564] flex items-center justify-center">
                    <Rocket className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#DC2564] block">
                      IN PIPELINE
                    </span>
                    <h3 className="font-black text-xl text-[#14213D] mt-1">
                      Coming Soon
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 max-w-[200px] mx-auto leading-relaxed">
                    AI automated marketing suite and social syndication tool for creators and local service agencies.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 inline-block">
                    Launch: Q3 2026
                  </span>
                </div>
              </div>

              {/* Card 4: Coming Soon 2 */}
              <div
                suppressHydrationWarning
                className="bg-[#F7F8FC] border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col justify-between text-center min-h-[340px]"
              >
                <div className="space-y-4 pt-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Layers className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-600 block">
                      IN PIPELINE
                    </span>
                    <h3 className="font-black text-xl text-[#14213D] mt-1">
                      Coming Soon
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 max-w-[200px] mx-auto leading-relaxed">
                    Cloud invoice verification, GST billing automation, and tax document parsing utilities.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 inline-block">
                    Launch: Q4 2026
                  </span>
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
