import Link from "next/link";
import Image from "next/image";
import { getPosts, getCategories, WPPost, cleanHtmlText } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import FaqSection from "@/components/FaqSection";
import StatCard from "@/components/StatCard";
import Newsletter from "@/components/Newsletter";
import AdBanner from "@/components/AdBanner";
import HostingerAdCard from "@/components/HostingerAdCard";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import TestimonialsSection from "@/components/TestimonialsSection";
import StartHereSection from "@/components/StartHereSection";
import WhyChooseMaajanki from "@/components/WhyChooseMaajanki";
import TrustedTechnologies from "@/components/TrustedTechnologies";
import FounderSection from "@/components/FounderSection";
import HomepageFinalCta from "@/components/HomepageFinalCta";
import HomepageProductsSection from "@/components/HomepageProductsSection";
import {
  HiArrowRight,
  HiArrowPath,
  HiBookOpen,
  HiEnvelope,
  HiStar,
} from "react-icons/hi2";
import {
  MdCode,
  MdCampaign,
  MdPsychology,
  MdPalette,
  MdRocketLaunch,
  MdLanguage,
  MdPayments,
  MdSchool,
  MdSearch,
  MdTrendingUp,
  MdArticle,
} from "react-icons/md";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const categoryParam = searchParams.category;
  const tagParam = searchParams.tag;

  const activeCategoryId =
    typeof categoryParam === "string" ? parseInt(categoryParam) : undefined;
  const activeTagId =
    typeof tagParam === "string" ? parseInt(tagParam) : undefined;

  let posts: WPPost[] = [];
  let categories: any[] = [];
  let errorMsg = "";

  try {
    const [fetchedPosts, fetchedCategories] = await Promise.all([
      getPosts({ category: activeCategoryId, tag: activeTagId, perPage: 20 }),
      getCategories({ perPage: 15 }),
    ]);
    posts = fetchedPosts;
    categories = fetchedCategories.filter((cat) => cat.count > 0);
  } catch (err) {
    console.error("Error fetching homepage data:", err);
    errorMsg =
      "Unable to load blog posts. Please check your WordPress connection.";
  }

  const mainFeaturedPost = posts[0];
  const rightFeaturedPosts = posts.slice(1, 5);
  // Show 8 latest published blog cards under "Latest Dispatches"
  const latestPosts = posts.slice(5, 13);
  // Separate trending posts to prevent heavy duplication in ticker
  const tickerPosts = posts.length > 5 ? posts.slice(4, 12) : posts;
  const trendingPosts = posts.slice(13, 17);

  type TopicIconComponent = React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  const topicIconMap: Record<string, TopicIconComponent> = {
    Technology: MdCode,
    Business: MdTrendingUp,
    Marketing: MdCampaign,
    AI: MdPsychology,
    SEO: MdSearch,
    Programming: MdCode,
    Design: MdPalette,
    Startup: MdRocketLaunch,
    WordPress: MdLanguage,
    Finance: MdPayments,
    Education: MdSchool,
    Health: HiStar,
  };

  const fallbackTopics: Array<{ id?: number; name: string; count: number }> = [
    { name: "Technology", count: 0 },
    { name: "Business", count: 0 },
    { name: "Marketing", count: 0 },
    { name: "AI", count: 0 },
    { name: "SEO", count: 0 },
    { name: "Programming", count: 0 },
    { name: "Design", count: 0 },
    { name: "Startup", count: 0 },
  ];

  const stats = [
    {
      target: 15,
      suffix: "K+",
      decimals: 0,
      label: "Subscribers",
      iconName: "group" as const,
    },
    {
      target: 3,
      suffix: "x",
      decimals: 0,
      label: "Per week",
      iconName: "calendar" as const,
    },
    {
      target: 200,
      suffix: "+",
      decimals: 0,
      label: "Deep dives",
      iconName: "stories" as const,
    },
    {
      target: 4.9,
      suffix: "★",
      decimals: 1,
      label: "Avg rating",
      iconName: "star" as const,
    },
  ];

  const displayTopics: Array<{ id?: number; name: string; count: number }> =
    categories.length > 0
      ? categories.slice(0, 10).map((cat) => ({
          id: cat.id as number,
          name: cat.name as string,
          count: cat.count as number,
        }))
      : fallbackTopics;

  const marqueeTopics = [
    "LOCAL SEO & SEARCH RANKINGS",
    "CUSTOM WEB ARCHITECTURE",
    "WORDPRESS OPTIMIZATION",
    "NEXT.JS & REACT SYSTEMS",
    "INDIAN FREELANCER INVOICING",
    "DIGITAL MARKETING ROI",
    "GOOGLE SEARCH CONSOLE FIXES",
    "BUSINESS GROWTH STRATEGY",
  ];

  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-[#DC2564]/20 selection:text-[#DC2564]">
      {/* ═══════════════════════════════════════════
          1. HERO — Premium Editorial & SaaS Header
      ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden border-b border-slate-200/80">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#DC2564]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ── Left: Text Content & Dual CTAs ── */}
            <div className="md:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F5] border border-[#FBCFE8] text-[#DC2564] text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2564] animate-pulse flex-shrink-0" />
                Next.js 16 · WordPress · Digital Commerce
              </div>

              {/* Headline */}
              <h1 className="font-black text-slate-900 text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-5 max-w-2xl">
                Learn. Build. <span className="text-[#DC2564]">Grow.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                Practical digital resources, website development insights, SEO guides and tools to help businesses grow online.
              </p>

              {/* Dual Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm shadow-[#DC2564]/25 active:scale-95"
                >
                  <span>Explore Articles</span>
                  <HiArrowRight size={16} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 bg-[#14213D] hover:bg-[#0A1120] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm shadow-[#14213D]/15 active:scale-95"
                >
                  <span>About MJ Digital</span>
                  <HiArrowRight size={16} />
                </Link>
              </div>

              {/* Search bar — Clean inline input */}
              <form
                action="/search"
                method="GET"
                className="w-full max-w-lg mb-8"
              >
                <div className="relative flex items-center">
                  <MdSearch
                    size={20}
                    className="absolute left-4 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search SEO, WordPress &amp; Dev guides..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#DC2564] focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl pl-11 pr-28 py-3 text-xs sm:text-sm outline-none transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 bg-[#DC2564] hover:bg-[#B81D52] text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Subscriber strip */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/80 w-full max-w-lg text-slate-600 text-xs">
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Practical engineering guides, verified starter kits, and actionable SEO breakdowns.</span>
                </div>
              </div>
            </div>

            {/* ── Right: Clean Editorial Preview Cards ── */}
            <div className="md:col-span-5 relative min-h-[320px] sm:min-h-[380px] md:h-[420px] w-full">
              {/* Primary featured card */}
              {mainFeaturedPost ? (
                <Link
                  href={`/blog/${mainFeaturedPost.slug}`}
                  className="absolute top-0 right-0 w-[88%] h-[72%] rounded-2xl overflow-hidden block group border border-slate-200 bg-white shadow-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  {mainFeaturedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <Image
                      src={mainFeaturedPost._embedded["wp:featuredmedia"][0].source_url}
                      alt={mainFeaturedPost.title.rendered}
                      fill
                      sizes="500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#DC2564] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    Featured Dispatch
                  </span>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <h2 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2">
                      {cleanHtmlText(mainFeaturedPost.title.rendered)}
                    </h2>
                    <p suppressHydrationWarning className="text-slate-300 text-xs mt-1">
                      {new Date(mainFeaturedPost.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · 8 min read
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="absolute top-0 right-0 w-[88%] h-[72%] rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <MdArticle className="text-slate-400" size={64} />
                </div>
              )}

              {/* Secondary card — bottom overlapping */}
              {rightFeaturedPosts[0] ? (
                <Link
                  href={`/blog/${rightFeaturedPosts[0].slug}`}
                  className="absolute bottom-0 left-0 w-[65%] h-[48%] rounded-2xl overflow-hidden block group border border-slate-200 bg-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  {rightFeaturedPosts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                    <Image
                      src={rightFeaturedPosts[0]._embedded["wp:featuredmedia"][0].source_url}
                      alt={rightFeaturedPosts[0].title.rendered}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs text-[#FBCFE8] font-bold block mb-0.5">
                      Recommended
                    </span>
                    <h2 className="text-white font-semibold text-xs leading-snug line-clamp-2">
                      {cleanHtmlText(rightFeaturedPosts[0].title.rendered)}
                    </h2>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Breaking News Ticker directly after Hero Section */}
      <BreakingNewsTicker posts={tickerPosts} />

      {/* Start Here / Beginner's Curated Guide Roadmap */}
      <StartHereSection />

      {/* ═══════════════════════════════════════════
          2. MARQUEE / TOPICS STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-6 border-b border-outline-variant/30 bg-surface-container-low/50 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-3">
          <p className="text-center text-xs text-slate-500 font-medium">
            Covering Key Growth Domains for Indian Businesses &amp; Developers
          </p>
        </div>
        <div className="flex items-center gap-8 overflow-hidden select-none opacity-60 hover:opacity-100 transition-opacity duration-200">
          <div className="marquee-track gap-12 items-center">
            {[...marqueeTopics, ...marqueeTopics].map((topic, i) => (
              <span
                key={i}
                className="font-bold text-xs tracking-widest text-on-surface/40 mx-6 flex-shrink-0"
              >
                ✦ {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. FEATURED COMMENTARY — Bento Grid
      ═══════════════════════════════════════════ */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Unified Section Header */}
        <div className="flex justify-between items-end mb-8 pb-4 border-b border-outline-variant/40">
          <div>
            <span className="text-[#DC2564] font-bold text-xs uppercase tracking-wider block mb-1">
              Editor&apos;s Pick
            </span>
            <h2 className="font-extrabold text-on-surface text-2xl md:text-3xl tracking-tight">
              Latest Update
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-on-surface font-medium text-xs border border-outline-variant/60 px-4 py-2 rounded-lg hover:border-[#DC2564] hover:text-[#DC2564] transition-colors duration-200"
          >
            View all articles <HiArrowRight size={14} />
          </Link>
        </div>

        {errorMsg && (
          <div className="p-4 text-center bg-error-container text-on-error-container rounded-xl mb-6 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main hero card */}
          {mainFeaturedPost ? (
            <article className="lg:col-span-7 group bg-surface border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
              <div className="h-64 md:h-80 overflow-hidden relative bg-surface-variant">
                {mainFeaturedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                  <Image
                    src={mainFeaturedPost._embedded["wp:featuredmedia"][0].source_url}
                    alt={mainFeaturedPost.title.rendered}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-200" />
                )}
                {mainFeaturedPost._embedded?.["wp:term"]?.[0]?.[0] && (
                  <span className="absolute top-4 left-4 bg-[#DC2564] text-white px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
                    {mainFeaturedPost._embedded["wp:term"][0][0].name}
                  </span>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col gap-3 flex-grow">
                <div className="flex items-center gap-2 text-on-surface-variant/80 text-xs font-medium">
                  <span className="font-semibold text-[#DC2564]">
                    {mainFeaturedPost._embedded?.author?.[0]?.name || "Maajanki Team"}
                  </span>
                  <span>·</span>
                  <span suppressHydrationWarning>
                    {new Date(mainFeaturedPost.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>8 min read</span>
                </div>
                <h3 className="font-bold text-on-surface text-xl md:text-2xl group-hover:text-[#DC2564] transition-colors duration-200 leading-snug">
                  {cleanHtmlText(mainFeaturedPost.title.rendered)}
                </h3>
                <p className="text-on-surface-variant text-sm md:text-base line-clamp-2 leading-relaxed">
                  {cleanHtmlText(mainFeaturedPost.excerpt.rendered).substring(0, 160)}…
                </p>
                <Link
                  href={`/blog/${mainFeaturedPost.slug}`}
                  className="flex items-center gap-1.5 text-[#DC2564] font-semibold text-xs mt-auto pt-2 w-fit hover:underline"
                >
                  <span>Continue Reading</span>
                  <HiArrowRight size={14} />
                </Link>
              </div>
            </article>
          ) : (
            <div className="lg:col-span-7 h-80 border border-outline-variant/60 rounded-xl flex items-center justify-center text-on-surface-variant bg-surface text-sm">
              No featured article found
            </div>
          )}

          {/* Right sidebar — 4 compact list cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {rightFeaturedPosts.length > 0 ? (
              rightFeaturedPosts.map((post, idx) => {
                const imgUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                const catName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Technology";
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex gap-4 group items-center p-3.5 rounded-xl bg-surface border border-outline-variant/50 hover:border-outline-variant hover:bg-surface-container-low/60 transition-all duration-200 shadow-sm"
                  >
                    <span className="text-lg font-bold text-on-surface-variant/40 group-hover:text-[#DC2564] transition-colors duration-200 flex-shrink-0 w-6 text-center">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-surface-variant relative">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={cleanHtmlText(post.title.rendered)}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-200" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-[#DC2564] text-[10px] font-bold uppercase tracking-wider">
                        {catName}
                      </span>
                      <h4 className="font-semibold text-on-surface text-xs md:text-sm group-hover:text-[#DC2564] transition-colors duration-200 line-clamp-2 leading-snug">
                        {cleanHtmlText(post.title.rendered)}
                      </h4>
                      <p suppressHydrationWarning className="text-on-surface-variant/70 text-[11px]">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} · 5 min read
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center border border-dashed border-outline-variant/60 rounded-xl p-6 text-on-surface-variant text-xs text-center">
                <HiBookOpen className="text-outline-variant mb-2" size={32} />
                No related articles yet
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. BROWSE BY TOPIC — Clean Scrollable Chips
      ═══════════════════════════════════════════ */}
      <section className="py-lg border-y border-outline-variant/30 bg-surface-container-low/40">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-on-surface text-lg tracking-tight">
              Browse by Topic
            </h2>
            <Link
              href="/blog"
              className="text-[#DC2564] text-xs font-semibold flex items-center gap-1 hover:underline"
            >
              View all <HiArrowRight size={14} />
            </Link>
          </div>
          <div className="topics-scroll">
            <div className="flex gap-2.5 pb-1">
              {displayTopics.map((topic, i) => {
                const Icon = topicIconMap[topic.name] || MdArticle;
                return (
                  <Link
                    key={i}
                    href={topic.id ? `/blog?category=${topic.id}` : "/blog"}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant/60 bg-surface hover:border-[#DC2564] hover:text-[#DC2564] text-on-surface text-xs font-semibold transition-colors duration-200 whitespace-nowrap shadow-sm"
                  >
                    <Icon size={16} className="text-[#DC2564]" />
                    {topic.name}
                    {topic.count > 0 && (
                      <span className="bg-surface-container-high text-on-surface-variant text-[10px] font-bold px-1.5 py-0.5 rounded ml-0.5">
                        {topic.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. LATEST ARTICLES + STICKY SIDEBAR
      ═══════════════════════════════════════════ */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Latest Articles — left */}
          <div className="lg:col-span-8">
            {/* Unified Section Header */}
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-outline-variant/40">
              <div>
                <span className="text-[#DC2564] font-bold text-xs uppercase tracking-wider block mb-1">
                  Fresh off the press
                </span>
                <h2 className="font-extrabold text-on-surface text-2xl md:text-3xl tracking-tight">
                  Latest Dispatches
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))
              ) : (
                <div className="col-span-2 py-12 text-center text-on-surface-variant border border-dashed border-outline-variant/60 rounded-xl text-sm">
                  <HiBookOpen
                    className="text-outline-variant mb-3 mx-auto"
                    size={40}
                  />
                  No recent posts found
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Link
                href="/blog"
                className="group flex items-center gap-2 bg-on-surface text-white px-8 py-3.5 rounded-xl hover:bg-[#DC2564] transition-colors duration-200 font-bold text-sm"
              >
                Load More Articles
                <HiArrowPath
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>

          {/* Sidebar — right */}
          <aside className="lg:col-span-4">
            <div className="sticky top-[88px] space-y-6">
              {/* Trending Widget */}
              <div className="bg-surface border border-outline-variant/60 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-outline-variant/40">
                  <MdTrendingUp className="text-[#DC2564]" size={20} />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Trending This Week
                  </h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.length > 0
                    ? trendingPosts.map((post, idx) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="flex gap-3.5 group items-start pb-3.5 border-b border-outline-variant/30 last:border-0 last:pb-0"
                        >
                          <span className="text-xl font-bold text-outline text-[#DC2564]/80 group-hover:text-[#DC2564] transition-colors duration-200 flex-shrink-0 leading-none pt-0.5">
                            0{idx + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold text-on-surface text-xs md:text-sm line-clamp-2 group-hover:text-[#DC2564] transition-colors duration-200 leading-snug">
                              {cleanHtmlText(post.title.rendered)}
                            </h4>
                            <p suppressHydrationWarning className="text-xs text-on-surface-variant/70 mt-1">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </Link>
                      ))
                    : [
                        [
                          "01",
                          "The Rust Renaissance: Why C++ is finally losing its grip",
                          "1.2k reads",
                        ],
                        [
                          "02",
                          "Scaling Postgres to 100TB: A Cautionary Tale",
                          "890 reads",
                        ],
                        [
                          "03",
                          "React 19 Server Components: First Impressions",
                          "750 reads",
                        ],
                      ].map(([num, title, meta]) => (
                        <div
                          key={num}
                          className="flex gap-3.5 group items-start pb-3.5 border-b border-outline-variant/30 last:border-0 last:pb-0 cursor-pointer"
                        >
                          <span className="text-xl font-bold text-[#DC2564]/80 flex-shrink-0 leading-none pt-0.5">{num}</span>
                          <div>
                            <h4 className="font-semibold text-on-surface text-xs md:text-sm line-clamp-2 group-hover:text-[#DC2564] transition-colors duration-200 leading-snug">
                              {title}
                            </h4>
                            <p className="text-[11px] text-on-surface-variant/70 mt-1">
                              {meta}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/* Hostinger Ad Box */}
              <HostingerAdCard />

              {/* Sponsored Ad Box — Osdire & Future Ads */}
              <AdBanner />

              {/* Sidebar Newsletter — Clean restrained container */}
              <div className="bg-[#0f0a08] border border-white/15 rounded-xl p-6 text-white shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-[#DC2564]/20 border border-[#DC2564]/40 text-[#DC2564] flex items-center justify-center mb-4">
                  <HiEnvelope size={18} />
                </div>
                <h3 className="font-bold text-base mb-1.5 leading-snug">
                  Don&apos;t miss a dispatch.
                </h3>
                <p className="text-white/60 text-xs mb-4 leading-relaxed">
                  Join Indian developers &amp; business owners getting our weekly growth deep dives.
                </p>
                <form action="/newsletter" method="GET" className="space-y-2.5">
                  <input
                    className="w-full bg-white/5 border border-white/15 focus:border-[#DC2564] focus:bg-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 outline-none transition-colors duration-200"
                    placeholder="name@company.com"
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#DC2564] hover:bg-[#B81D52] text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 text-xs"
                  >
                    Subscribe Free
                  </button>
                </form>
                <p className="text-xs text-white/70 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DYNAMIC WOOCOMMERCE PRODUCTS SECTION
      ═══════════════════════════════════════════ */}
      <HomepageProductsSection />

      {/* ═══════════════════════════════════════════
          6. NEWSLETTER & COMMUNITY
      ═══════════════════════════════════════════ */}
      <section className="py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low/30 border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto space-y-8">
          <Newsletter />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. WHY CHOOSE MAAJANKI & ECOSYSTEM
      ═══════════════════════════════════════════ */}
      <WhyChooseMaajanki />

      {/* ═══════════════════════════════════════════
          8. TRUSTED TECHNOLOGIES
      ═══════════════════════════════════════════ */}
      <TrustedTechnologies />

      {/* ═══════════════════════════════════════════
          10. MEET THE FOUNDER (ASHISH KUMAR)
      ═══════════════════════════════════════════ */}
      <FounderSection />

      {/* ═══════════════════════════════════════════
          11. TESTIMONIALS SECTION
      ═══════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════
          12. FAQ SECTION
      ═══════════════════════════════════════════ */}
      <FaqSection />

      {/* ═══════════════════════════════════════════
          13. FINAL HOMEPAGE CTA
      ═══════════════════════════════════════════ */}
      <HomepageFinalCta />
    </div>
  );
}
