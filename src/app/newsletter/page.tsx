import FaqSection, { FAQItem } from "@/components/FaqSection";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
  ShieldCheck,
  Bell,
  Zap,
  BarChart2,
  Star,
  ChevronRight,
} from "lucide-react";
import SubscribeForm from "@/app/newsletter/SubscribeForm";

export const revalidate = 86400; // revalidate daily

export const metadata = {
  title: "The Sunday Dispatch Newsletter | Maajanki Blog",
  description:
    "Join 15,000+ developers, digital strategists, and growth leaders. Subscribe to our curated weekly newsletter — The Sunday Dispatch.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "The Sunday Dispatch Newsletter | Maajanki Blog",
    description: "Join 15,000+ readers. Weekly deep-dives on SEO, web development, and digital growth — every Sunday morning.",
    url: "https://blog.maajankiwebtech.com/newsletter",
    type: "website",
  },
};

const newsletterFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often is The Sunday Dispatch delivered?",
      acceptedAnswer: { "@type": "Answer", text: "The newsletter is delivered once per week every Sunday morning at 8:00 AM EST." },
    },
    {
      "@type": "Question",
      name: "Is subscribing to the newsletter completely free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, The Sunday Dispatch is 100% free with no credit card required." },
    },
    {
      "@type": "Question",
      name: "How do I unsubscribe if I no longer wish to receive emails?",
      acceptedAnswer: { "@type": "Answer", text: "Every email contains a 1-click unsubscribe link at the bottom. You can opt out at any time instantly." },
    },
    {
      "@type": "Question",
      name: "Will my email address be shared or sold to third parties?",
      acceptedAnswer: { "@type": "Answer", text: "Never. We adhere to strict privacy policies and never sell, rent, or share subscriber data." },
    },
  ],
};

const newsletterFaqs: FAQItem[] = [
  {
    question: "How often is The Sunday Dispatch delivered?",
    answer:
      "The newsletter is delivered once per week every Sunday morning at 8:00 AM EST.",
  },
  {
    question: "Is subscribing to the newsletter completely free?",
    answer: "Yes, The Sunday Dispatch is 100% free with no credit card required.",
  },
  {
    question: "How do I unsubscribe if I no longer wish to receive emails?",
    answer:
      "Every email contains a 1-click unsubscribe link at the bottom. You can opt out at any time instantly.",
  },
  {
    question: "What type of content is included in each edition?",
    answer:
      "Each edition includes 1 deep dive article, 3 curated architecture links, code snippets, and early access to upcoming reports.",
  },
  {
    question: "Will my email address be shared or sold to third parties?",
    answer:
      "Never. We adhere to strict privacy policies and never sell, rent, or share subscriber data.",
  },
];

const pastPreviews = [
  {
    issue: "Issue #184",
    title: "The Death of Serverless Cold Starts",
    date: "July 05, 2026",
    readTime: "9 min read",
    excerpt:
      "Exploring how edge container runtimes and snapshot restores are making cold starts a problem of the past.",
    href: "#",
    tag: "Performance",
  },
  {
    issue: "Issue #183",
    title: "CSS in 2026: Anchor Positioning and Beyond",
    date: "June 28, 2026",
    readTime: "7 min read",
    excerpt:
      "A deep dive into native CSS anchor positioning, scroll-driven animations, and the deprecation of JS positioning libraries.",
    href: "#",
    tag: "Frontend",
  },
  {
    issue: "Issue #182",
    title: "Next.js 15 Performance Benchmarks",
    date: "June 21, 2026",
    readTime: "11 min read",
    excerpt:
      "We compared page router vs app router vs serverless runtimes. The results might surprise you.",
    href: "#",
    tag: "Benchmarks",
  },
];

const perks = [
  {
    icon: Zap,
    title: "Weekly Deep Dives",
    desc: "One focused, long-form analysis every Sunday — no filler, no fluff.",
  },
  {
    icon: BarChart2,
    title: "Data-Backed Insights",
    desc: "Every claim is backed by benchmarks, case studies, or primary research.",
  },
  {
    icon: Bell,
    title: "Early Access",
    desc: "Subscribers get reports, tools, and guides before they go public.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Spam Policy",
    desc: "One email per week. Your inbox won't be flooded — ever.",
  },
];

const testimonials = [
  {
    quote:
      "The most consistently valuable newsletter I receive each week. No fluff, all signal.",
    name: "Priya M.",
    role: "Senior Frontend Engineer",
  },
  {
    quote:
      "Every Sunday edition gives me at least 2 actionable things to test the next week. Incredible ROI on 7 minutes.",
    name: "Rahul K.",
    role: "Growth Lead, SaaS Startup",
  },
  {
    quote:
      "I've recommended this to every member of my team. The benchmark breakdowns alone are worth it.",
    name: "Anjali S.",
    role: "Engineering Manager",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsletterFaqJsonLd) }}
      />
      <div className="bg-background text-on-surface min-h-screen selection:bg-primary-container/30">

      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-20 overflow-hidden px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
        aria-labelledby="newsletter-hero-heading"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-60"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,107,0,0.18) 0%, rgba(245,158,11,0.1) 50%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[900px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-outline-variant/40 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-primary-container animate-pulse" aria-hidden="true" />
            <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
              WEEKLY INTELLIGENCE
            </span>
          </div>

          <h1
            id="newsletter-hero-heading"
            className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg leading-[1.1] tracking-tight"
          >
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-amber-500 to-orange-400">
              Sunday Dispatch
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[680px] mx-auto leading-relaxed">
            Join 15,000+ developers, digital strategists, and growth leaders. A curated weekly digest of deep-dive analyses, engineering insights, and early-access editorial content — every Sunday morning.
          </p>

          {/* Stats row */}
          <dl className="flex flex-wrap items-center justify-center gap-8 pt-2">
            {[
              { label: "Subscribers", value: "15K+" },
              { label: "Issues Published", value: "184" },
              { label: "Avg. Open Rate", value: "62%" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <dt className="text-xs text-on-surface-variant font-medium uppercase tracking-wider order-2">{label}</dt>
                <dd className="text-2xl font-black text-on-surface order-1">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 2. Main Subscribe Card ───────────────────────────────────── */}
      <section
        className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-20"
        aria-label="Newsletter subscription"
      >
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-16 border border-white/10 shadow-2xl"
          style={{ background: "linear-gradient(135deg, #0d0806 0%, #170d08 40%, #241108 100%)" }}
        >
          {/* Decorative orbs */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, #ff6b00 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #ffb693 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-[#ff6b00] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
                <span>Free Subscription</span>
              </div>

              <h2
                className="font-black text-white leading-[1.1] tracking-tight"
                style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
              >
                Get insights that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-amber-400">
                  matter most
                </span>
                , delivered weekly.
              </h2>

              <p className="text-white/80 text-base leading-relaxed max-w-md">
                No spam. Receive curated deep-dives on modern web architectures, SEO strategy, engineering leadership, and high-impact digital tools every Sunday.
              </p>

              {/* Social proof avatars */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex -space-x-2.5" aria-hidden="true">
                  {[
                    "bg-gradient-to-tr from-amber-500 to-orange-400",
                    "bg-gradient-to-tr from-[#ff6b00] to-orange-300",
                    "bg-gradient-to-tr from-orange-600 to-amber-500",
                    "bg-gradient-to-tr from-amber-600 to-orange-500",
                  ].map((g, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full border-2 border-[#0d0806] ${g} flex items-center justify-center text-[11px] font-black text-white shadow-md`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm font-medium">
                  Joined by <span className="text-white font-bold">15,000+</span> readers
                </p>
              </div>

              {/* Perks list */}
              <ul className="space-y-3 pt-2" aria-label="Subscription benefits">
                {[
                  "One deep-dive article every Sunday",
                  "Curated architecture & strategy links",
                  "Early access to reports and tools",
                  "1-click unsubscribe, always free",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-emerald-400 shrink-0" aria-hidden="true">✓</span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Form panel */}
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-8 space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white">Subscribe now</h3>
                <p className="text-white/60 text-sm">Your first edition arrives this Sunday.</p>
              </div>
              {/* SubscribeForm is a Client Component */}
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Why Subscribe — Perks Grid ───────────────────────────── */}
      <section className="py-24 border-y border-outline-variant/20 bg-surface/30" aria-labelledby="perks-heading">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-[700px] mx-auto mb-16 space-y-3">
            <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
              WHY SUBSCRIBE
            </span>
            <h2 id="perks-heading" className="font-headline-lg text-headline-lg text-on-surface">
              What You Get Every Week
            </h2>
            <p className="text-on-surface-variant text-body-md">
              A high-signal, zero-filler newsletter built for people serious about digital and technical growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-3xl bg-surface border border-outline-variant/30 space-y-4 hover:border-primary-container/50 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div
                  className="w-14 h-14 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-lg text-on-surface">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Past Issues ───────────────────────────────────────────── */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" aria-labelledby="archive-heading">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-2">
            <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
              THE ARCHIVE
            </span>
            <h2 id="archive-heading" className="font-headline-lg text-headline-lg text-on-surface">
              Recent Issues
            </h2>
          </div>
          <Link
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-primary-container font-bold text-sm hover:gap-3 transition-all duration-200"
            aria-label="Browse all newsletter issues"
          >
            Browse all <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pastPreviews.map((prev) => (
            <article
              key={prev.issue}
              className="group bg-surface border border-outline-variant/30 rounded-3xl p-8 hover:border-primary-container/50 hover:shadow-xl transition-all duration-300 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-primary-container/10 text-primary-container border border-primary-container/20">
                  {prev.issue}
                </span>
                <span className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-surface border border-outline-variant/30">
                  {prev.tag}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="font-bold text-xl text-on-surface group-hover:text-primary-container transition-colors duration-200 leading-snug">
                  {prev.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {prev.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{prev.readTime}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={prev.date}>{prev.date}</time>
                </div>
                <Link
                  href={prev.href}
                  className="text-primary-container font-bold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
                  aria-label={`Read ${prev.title}`}
                >
                  Read <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Browse All */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-primary-container font-bold text-sm"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" /> Browse full archive
          </Link>
        </div>
      </section>

      {/* ── 5. Testimonials ──────────────────────────────────────────── */}
      <section className="py-20 border-y border-outline-variant/20 bg-surface/30" aria-labelledby="testimonials-heading">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-14 space-y-2">
            <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">READER REVIEWS</span>
            <h2 id="testimonials-heading" className="font-headline-lg text-headline-lg text-on-surface">
              What Our Readers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ quote, name, role }) => (
              <figure key={name} className="p-8 rounded-3xl bg-surface border border-outline-variant/30 space-y-5 hover:border-primary-container/30 transition-all duration-300">
                <div className="flex items-center gap-1" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p className="text-on-surface-variant text-sm leading-relaxed italic">&quot;{quote}&quot;</p>
                </blockquote>
                <figcaption className="flex items-center gap-3 pt-1">
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white text-xs font-black"
                    aria-hidden="true"
                  >
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">{name}</div>
                    <div className="text-xs text-on-surface-variant">{role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Bottom CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div
          className="p-12 md:p-20 rounded-[2.5rem] space-y-6 text-white border border-white/10 shadow-2xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d0806 0%, #1a0e08 50%, #291309 100%)" }}
        >
          <div
            className="pointer-events-none absolute -top-20 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-[700px] mx-auto space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/30 text-xs font-bold uppercase tracking-widest">
              JOIN 15,000+ READERS
            </span>
            <h2 className="font-headline-lg text-headline-lg text-white font-bold">
              Start Your Sunday Dispatch Journey
            </h2>
            <p className="text-white/80 text-base leading-relaxed">
              One email, every Sunday. No noise. Just the deep-dive insights, curated links, and early-access tools your peers are already reading.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="#newsletter-email-input"
                className="inline-flex items-center gap-2 bg-[#ff6b00] text-white px-9 py-4 rounded-full font-bold text-sm hover:bg-[#e05e00] active:scale-95 transition-all duration-200 shadow-xl shadow-[#ff6b00]/30"
              >
                Subscribe Free <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="text-white/50 text-xs">No credit card · Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────────── */}
      <FaqSection
        faqs={newsletterFaqs}
        title="Newsletter FAQ"
        description="Everything you need to know about subscribing, delivery schedules, and privacy."
      />
    </div>
    </>
  );
}
