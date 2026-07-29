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
  Search,
  Layout,
  TrendingUp,
  Award,
  ExternalLink,
  CheckCircle2,
  Rocket,
  ShieldAlert,
} from "lucide-react";
import FaqSection from "@/components/FaqSection";

export const metadata = {
  title: "About Maajanki Blog | Digital Growth Insights",
  description:
    "Explore practical SEO, digital marketing, and WordPress insights from About Maajanki blog to help you grow your business online smarter.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Maajanki Blog | Digital Growth Insights",
    description: "Explore practical SEO, digital marketing, and WordPress insights to grow your business online smarter.",
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
      name: "What is Maajanki Blog's core focus?",
      acceptedAnswer: { "@type": "Answer", text: "Maajanki Blog focuses on providing practical, structured, and actionable guidance on SEO, digital marketing strategy, WordPress optimization, and online business growth." },
    },
    {
      "@type": "Question",
      name: "Who is behind Maajanki Blog?",
      acceptedAnswer: { "@type": "Answer", text: "Maajanki Blog is created and managed by the Maajanki WebTech Digital Agency, led by Ashish Kumar, a web developer and digital marketing strategist." },
    },
    {
      "@type": "Question",
      name: "How can I contact the Maajanki Blog team?",
      acceptedAnswer: { "@type": "Answer", text: "You can reach out via email at info@maajankiwebtech.com or visit our contact page to connect for questions or collaboration." },
    },
    {
      "@type": "Question",
      name: "Is the content suitable for beginners?",
      acceptedAnswer: { "@type": "Answer", text: "Yes! Every article is written with clarity and structured step-by-step so that readers can understand complex concepts and implement them confidently." },
    },
  ],
};

const ecosystemAds = [
  {
    title: "MaaJanki Web Tech",
    badge: "FEATURED AGENCY",
    badgeColor: "bg-primary-container/15 text-primary-container border-primary-container/30",
    desc: "Full-service web development, technical SEO, and digital marketing agency empowering businesses to build high-converting online presences.",
    url: "https://maajankiwebtech.com/",
    cta: "Visit Agency Website",
    icon: Globe,
  },
  {
    title: "InvoBill India",
    badge: "FREE BILLING TOOL",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    desc: "Simple, fast, and free GST invoice generator software designed for Indian small business owners, freelancers, and agency operators.",
    url: "https://invobill.in/",
    cta: "Create Invoices Free",
    icon: Zap,
  },
  {
    title: "MJByTech",
    badge: "TECH PLATFORM",
    badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    desc: "Next-generation technology portal providing enterprise web architectures, cloud deployment solutions, and digital transformation services.",
    url: "https://mjbytech.com/",
    cta: "Explore MJByTech",
    icon: Rocket,
  },
  {
    title: "MJChatSyncs Repository",
    badge: "OPEN SOURCE",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    desc: "Open-source chat synchronization and multi-channel messaging platform built for developers looking for high-performance webhook & API integrations.",
    url: "https://github.com/AshishKmj/MJChatSyncs",
    cta: "View Code on GitHub",
    icon: Layout,
  },
  {
    title: "@kumarashishweb",
    badge: "CONNECT INSTAGRAM",
    badgeColor: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    desc: "Follow Ashish Kumar for daily web development insights, SEO tips, tech trends, behind-the-scenes agency updates, and digital marketing strategies.",
    url: "https://www.instagram.com/kumarashishweb/",
    cta: "Follow on Instagram",
    icon: Share2,
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFaqJsonLd) }}
      />
      <div className="bg-background text-on-surface min-h-screen selection:bg-primary-container/30">
      {/* ── 1. Premium Ultra-Modern Hero ───────────────────────────────── */}
      <section className="relative pt-24 pb-20 overflow-hidden px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Glow ambient spots */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-container/20 via-orange-500/10 to-amber-500/20 rounded-full blur-[120px] opacity-70" />

        <div className="relative z-10 max-w-[920px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-outline-variant/40 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-primary-container animate-pulse" />
            <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
              ABOUT MAAJANKI BLOG
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg leading-[1.1] tracking-tight">
            Clear Guidance & Practical Strategy for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-amber-500 to-orange-400">
              Sustainable Digital Growth
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[780px] mx-auto leading-relaxed">
            If you are looking to learn more about digital growth, SEO, WordPress, and structured online marketing, this page will give you a clear understanding about Maajanki Blog and its purpose.
          </p>
        </div>

        {/* Hero Featured Card Layout */}
        <div className="mt-14 max-w-[1080px] mx-auto rounded-[2.5rem] p-2 bg-gradient-to-b from-outline-variant/40 via-outline-variant/20 to-transparent shadow-2xl">
          <div className="rounded-[2.25rem] overflow-hidden bg-surface border border-outline-variant/30">
            <div className="relative aspect-[16/9] w-full group overflow-hidden">
              <Image
                src="https://blog.maajankiwebtech.com/wp-content/uploads/2026/02/Building-Sustainable-Digital-Growth.png"
                alt="about maajanki blog"
                fill
                sizes="(max-width: 1200px) 100vw, 1080px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>

            <div className="p-8 md:p-12 -mt-16 md:-mt-24 relative z-10 bg-surface/95 backdrop-blur-xl border-t border-white/10 rounded-b-[2.25rem] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary-container animate-ping" />
                <span className="text-xs font-bold text-primary-container uppercase tracking-wider">
                  PURPOSE & EXECUTION
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Built for Discipline & Real Execution
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                About Maajanki Blog, it is a dedicated platform created to share practical, actionable, and results-focused insights on digital marketing and online business development. In today’s competitive online environment, simply creating a website or maintaining social media accounts is not enough. Real success comes from strategy, consistency, and disciplined execution. This blog exists to help readers understand that difference and apply it effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Strategic Pillars (2 Large Glass Cards) ────────────────── */}
      <section className="py-20 border-y border-outline-variant/20 bg-surface/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 rounded-3xl bg-surface border border-outline-variant/30 hover:border-primary-container/40 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                  <Compass className="h-7 w-7" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Sustainable Approach
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  The internet offers endless information, but not all of it is reliable or practical. Much of the content available online promotes trends, shortcuts, and temporary tactics. About Maajanki Blog, the approach is different. We believe in building strong foundations, understanding systems deeply, and focusing on sustainable digital growth rather than short-term spikes.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex items-center gap-2 text-xs font-bold text-primary-container">
                <CheckCircle2 className="h-4 w-4" /> Sustainable Growth Focus
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-surface border border-outline-variant/30 hover:border-primary-container/40 transition-all duration-300 shadow-sm flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:scale-110 transition-transform">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Structured Execution
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Every article is created with clarity and structure so readers can not only understand concepts but also implement them confidently. The goal is not to overwhelm but to guide step by step.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex items-center gap-2 text-xs font-bold text-primary-container">
                <CheckCircle2 className="h-4 w-4" /> Actionable Step-by-Step Guides
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What Maajanki Blog Is About (Numbered Modern Cards) ─────── */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center max-w-[750px] mx-auto mb-16 space-y-3">
          <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
            FOUNDATIONAL VALUES
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            What Maajanki Blog Is About
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Practical Learning",
              desc: "At its core, this platform is about practical learning, long-term growth, and simplicity in execution. We believe theory has value, but real results come from applying knowledge correctly. That is why our content is structured to encourage action and measurable improvement.",
            },
            {
              num: "02",
              title: "Long-term Sustainability",
              desc: "Maajanki Blog is also about sustainability. Digital platforms evolve, algorithms change, and trends shift constantly. However, strong fundamentals in SEO, content marketing, and online branding remain effective. This blog emphasizes those lasting principles instead of promoting quick fixes that stop working over time.",
            },
            {
              num: "03",
              title: "Uncompromising Clarity",
              desc: "Another important part about Maajanki Blog is clarity. Digital marketing can appear complex and technical. Our responsibility is to simplify that complexity into structured explanations that anyone serious about growth can understand and apply.",
            },
          ].map(({ num, title, desc }) => (
            <div
              key={num}
              className="p-8 rounded-3xl bg-surface border border-outline-variant/30 space-y-5 hover:border-primary-container/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="inline-block text-3xl font-black text-primary-container/40">
                  {num}
                </span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Core Knowledge Pillars ──────────────────────────────────── */}
      <section className="py-24 border-y border-outline-variant/20 bg-surface/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-[750px] mx-auto mb-16 space-y-3">
            <span className="text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
              KNOWLEDGE SYSTEM
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              What You Will Learn About Here
            </h2>
            <p className="text-on-surface-variant text-body-md">
              This blog covers essential areas connected to digital growth and online success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 rounded-3xl bg-surface border border-outline-variant/30 space-y-4 hover:border-primary-container/40 transition-all duration-300 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-primary-container/10 text-primary-container">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Search Engine Optimization (SEO)
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                A major focus is on search engine optimization. SEO remains one of the most reliable methods to generate consistent, high-quality traffic. Here, readers learn about keyword research, on-page optimization, technical improvements, content structuring, and authority building. Instead of isolated tips, we explain how each element works together as a system.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-surface border border-outline-variant/30 space-y-4 hover:border-primary-container/40 transition-all duration-300 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-primary-container/10 text-primary-container">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Digital Marketing Strategies
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Beyond SEO, Maajanki Blog shares insights about digital marketing strategies that build long-term results. Marketing is not about random posting or chasing viral moments. It requires audience understanding, positioning, and strategic planning. Through structured content, readers gain clarity about content marketing, social media growth, lead generation, conversion optimization, and brand positioning.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-surface border border-outline-variant/30 space-y-4 hover:border-primary-container/40 transition-all duration-300 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-primary-container/10 text-primary-container">
                  <Layout className="h-6 w-6" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  WordPress & Website Optimization
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Another key area is WordPress and website optimization. A website forms the foundation of any online presence. If that foundation is weak, marketing efforts lose impact. This blog explains how to properly structure a WordPress site, improve performance, enhance user experience, optimize blog layouts, and ensure security. The objective is to help readers build websites that not only look professional but also perform effectively.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-3xl bg-surface border border-outline-variant/30 space-y-4 hover:border-primary-container/40 transition-all duration-300 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-primary-container/10 text-primary-container">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Online Business Growth
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Maajanki Blog is also about online business growth. Many individuals struggle because they focus on trends instead of structured systems. Sustainable growth requires authority, consistency, and strategic improvement. Through detailed explanations, readers learn how to build niche authority, create steady traffic, structure offers properly, develop audience trust, and scale step by step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Sponsored & Partner Ecosystem Ads Section ───────────────── */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center max-w-[750px] mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-container font-label-md text-xs uppercase tracking-widest font-bold">
            SPONSORED & FEATURED ECOSYSTEM
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Explore Partner Platforms & Ecosystem Projects
          </h2>
          <p className="text-on-surface-variant text-body-md">
            Check out official digital agencies, free billing tools, open-source repositories, and creator channels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystemAds.map(({ title, badge, badgeColor, desc, url, cta, icon: Icon }) => (
            <div
              key={title}
              className="p-8 rounded-3xl bg-surface border-2 border-primary-container/20 hover:border-primary-container/60 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${badgeColor}`}>
                    {badge}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">
                    SPONSORED
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-container/10 text-primary-container">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-xl text-on-surface group-hover:text-primary-container transition-colors">
                    {title}
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {desc}
                </p>
              </div>

              <a
                href={url}
                target="_blank"
                rel="noopener sponsored"
                className="mt-8 inline-flex items-center justify-center gap-2 w-full bg-primary-container hover:bg-[#e05e00] text-white py-3.5 px-5 rounded-2xl font-bold text-xs transition-all duration-200 shadow-sm active:scale-95"
              >
                {cta} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Mission & Vision (Modern Split Card Layout) ────────────── */}
      <section className="py-24 border-y border-outline-variant/20 bg-surface/30 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 md:p-12 rounded-[2.25rem] bg-surface border border-outline-variant/30 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Why Maajanki Blog Is Different & Our Mission
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                There are countless digital marketing platforms available today. What makes this one different is its emphasis on fundamentals. About Maajanki Blog, the priority is not entertainment or hype. The priority is education and structured execution.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Trends will always change. Algorithms will continue to evolve. Platforms will update their policies and systems. However, strong fundamentals in digital marketing remain reliable. This blog teaches strategic thinking, consistent implementation, structured planning, and measurable progress. The aim is long-term stability rather than temporary attention.
              </p>
            </div>

            <div className="pt-6 border-t border-outline-variant/30 space-y-3">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                The mission behind Maajanki Blog is clear and straightforward. It is to provide practical, honest, and structured knowledge about digital growth that genuinely helps individuals and businesses succeed online.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                We believe online success should be built on clarity, consistency, strong foundations, ethical practices, and measurable outcomes. Digital growth is not about luck or shortcuts. It is about understanding systems and applying them with discipline.
              </p>
            </div>
          </div>

          {/* Vision & Quality Card */}
          <div
            className="p-8 md:p-12 rounded-[2.25rem] space-y-6 text-white border border-white/10 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(135deg, #0d0806 0%, #170d08 40%, #241108 100%)",
            }}
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00]">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-white">
                Our Vision
              </h2>
              <p className="font-body-md text-body-md text-white/80 leading-relaxed">
                The long-term vision about Maajanki Blog is to become a trusted resource for individuals seeking dependable information about SEO, WordPress, and digital marketing strategy. We aim to help readers build authority within their niche, understand digital systems deeply, create sustainable income opportunities, and strengthen brand credibility.
              </p>
              <p className="font-body-md text-body-md text-white/80 leading-relaxed">
                Each article is written with the intention of leaving readers more confident and informed than before.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#ff6b00]" />
                <h3 className="font-headline-sm text-headline-sm font-bold text-white">
                  Commitment to Quality
                </h3>
              </div>
              <p className="font-body-md text-body-md text-white/80 leading-relaxed">
                Quality remains central to everything we publish. Every piece of content is structured carefully, written clearly, and focused on real-world application. We continuously refine our understanding of digital systems to ensure that the knowledge shared remains relevant and effective.
              </p>
              <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-[#ff6b00] uppercase tracking-wider">
                Digital growth is not random. It is the result of structured learning and consistent effort.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Community & Contact ─────────────────────────────────────── */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-16">
        {/* Community */}
        <div className="p-10 md:p-14 rounded-[2.5rem] bg-surface border border-outline-variant/30 text-center space-y-4 max-w-[950px] mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center mx-auto">
            <Users className="h-7 w-7" />
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Community and Engagement
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Maajanki Blog is more than a collection of articles. It is a growing learning space. We encourage meaningful engagement, thoughtful feedback, and constructive discussion. When knowledge is shared and discussed, improvement becomes faster and stronger.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="space-y-10">
          <div className="text-center max-w-[650px] mx-auto space-y-2">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Contact Us
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              If you have questions about any topic covered here, would like to suggest improvements, or are interested in collaboration, you are welcome to connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            <a
              href="mailto:info@maajankiwebtech.com"
              className="p-8 rounded-3xl bg-surface border border-outline-variant/30 flex flex-col items-center text-center space-y-4 hover:border-primary-container/60 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300">
                <Mail className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-xl text-on-surface">Email Us</h4>
              <p className="text-sm text-on-surface-variant">info@maajankiwebtech.com</p>
            </a>

            <a
              href="https://blog.maajankiwebtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-surface border border-outline-variant/30 flex flex-col items-center text-center space-y-4 hover:border-primary-container/60 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300">
                <Globe className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-xl text-on-surface">Official Blog</h4>
              <p className="text-sm text-on-surface-variant">blog.maajankiwebtech.com</p>
            </a>

            <a
              href="https://www.facebook.com/maajankiwebtech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl bg-surface border border-outline-variant/30 flex flex-col items-center text-center space-y-4 hover:border-primary-container/60 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary transition-all duration-300">
                <Share2 className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-xl text-on-surface">Facebook Page</h4>
              <p className="text-sm text-on-surface-variant">maajankiwebtech</p>
            </a>
          </div>

          <p className="text-center text-xs text-on-surface-variant font-medium">
            We value thoughtful communication and aim to respond as efficiently as possible.
          </p>
        </div>
      </section>

      {/* ── 8. Call To Action Footer Card ─────────────────────────────── */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <div
          className="p-12 md:p-20 rounded-[2.5rem] space-y-6 text-white relative overflow-hidden border border-white/10 shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, #0d0806 0%, #1a0e08 50%, #291309 100%)",
          }}
        >
          <div className="max-w-[750px] mx-auto space-y-6 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/30 font-label-md text-xs uppercase tracking-widest font-bold">
              FINAL WORDS ABOUT MAAJANKI BLOG
            </span>
            <h2 className="font-headline-lg text-headline-lg text-white font-bold">
              Let’s Grow Smarter.
            </h2>
            <p className="font-body-lg text-body-lg text-white/85 leading-relaxed">
              Digital success does not happen overnight. It is built through discipline, structured planning, and consistent action. About Maajanki Blog, it is a platform created to guide that journey with clarity and purpose.
            </p>
            <p className="font-body-md text-body-md text-white font-semibold">
              If you are serious about building something sustainable and powerful online, this blog is designed for you.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#ff6b00] text-white px-9 py-4 rounded-full font-bold text-sm hover:bg-[#e05e00] active:scale-95 transition-all duration-200 shadow-xl"
              >
                Connect With Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ Section ────────────────────────────────────────────── */}
      <FaqSection
        faqs={[
          {
            question: "What is Maajanki Blog's core focus?",
            answer:
              "Maajanki Blog focuses on providing practical, structured, and actionable guidance on SEO, digital marketing strategy, WordPress optimization, and online business growth.",
          },
          {
            question: "Why does Maajanki Blog emphasize fundamentals over trends?",
            answer:
              "Trends and algorithm changes are frequent, but core principles in SEO, performance, and strategic content remain effective over time, building sustainable digital authority.",
          },
          {
            question: "How can I contact the Maajanki Blog team?",
            answer:
              "You can reach out via email at info@maajankiwebtech.com or visit our social channels and contact page to connect for questions or collaboration.",
          },
          {
            question: "Is the content suitable for beginners?",
            answer:
              "Yes! Every article is written with clarity and structured step-by-step so that readers can both understand complex concepts and implement them confidently.",
          },
        ]}
        title="Frequently Asked Questions"
        description="Learn more about our platform, mission, content focus, and community values."
      />
    </div>
    </>
  );
}
