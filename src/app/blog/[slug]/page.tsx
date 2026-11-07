import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getComments, getPosts, WPPost, cleanHtmlText } from "@/lib/wordpress";
import { getProducts, WordPressProduct } from "@/lib/wordpress/products";
import CommentForm from "@/components/CommentForm";
import FaqSection from "@/components/FaqSection";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import AdBanner from "@/components/AdBanner";
import HostingerAdCard from "@/components/HostingerAdCard";
import InlineAdBanner from "@/components/InlineAdBanner";
import YoutubeAdCard from "@/components/YoutubeAdCard";
import MaajankiAdCard from "@/components/MaajankiAdCard";
import BrewPluseAdCard from "@/components/BrewPluseAdCard";
import AuthorBioCard from "@/components/AuthorBioCard";
import AgencyConsultationCta from "@/components/AgencyConsultationCta";
import ArticleAudioPlayer from "@/components/ArticleAudioPlayer";
import InteractiveTOC from "@/components/InteractiveTOC";
import CodeCopyEnhancer from "@/components/CodeCopyEnhancer";
import BookmarkButton from "@/components/BookmarkButton";
import ExitIntentModal from "@/components/ExitIntentModal";
import { Clock, Calendar, MessageSquare, ArrowLeft, ArrowRight, User } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaPinterestP, FaWhatsapp, FaTelegram, FaRedditAlien } from "react-icons/fa6";
import { HiCheckBadge, HiShoppingBag } from "react-icons/hi2";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

// Generate dynamic metadata for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const siteUrl = "https://blog.maajankiwebtech.com";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  
  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return {
        title: "Post Not Found | MJ Digital",
        robots: { index: false, follow: false },
      };
    }

    const seoTitle = post.seo?.seoTitle || cleanHtmlText(post.title.rendered);
    const seoDescription = post.seo?.seoDescription || cleanHtmlText(post.excerpt.rendered).slice(0, 160);
    const keywords = post.seo?.keywords ? post.seo.keywords.split(',').map(k => k.trim()) : undefined;

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = post.seo?.ogImage || featuredMedia?.source_url;

    return {
      title: `${seoTitle} | MJ Digital`,
      description: seoDescription,
      keywords: keywords,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: post.seo?.ogTitle || `${seoTitle} | MJ Digital`,
        description: post.seo?.ogDescription || seoDescription,
        type: "article",
        url: canonicalUrl,
        publishedTime: post.date,
        modifiedTime: post.modified || post.date,
        authors: ["Ashish Kumar"],
        images: imageUrl ? [{ url: imageUrl, alt: post.seo?.ogImage ? seoTitle : (featuredMedia?.alt_text || post.title.rendered) }] : [],
      },
      twitter: {
        card: (post.seo?.twitterCard as any) || "summary_large_image",
        title: post.seo?.twitterTitle || `${seoTitle} | MJ Digital`,
        description: post.seo?.twitterDescription || seoDescription,
        images: post.seo?.twitterImage ? [post.seo.twitterImage] : (imageUrl ? [imageUrl] : []),
      }
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Blog Post | MJ Digital",
    };
  }
}

export default async function PostPage(props: PageProps) {
  const { slug } = await props.params;
  
  let post = null;
  let comments: any[] = [];
  let relatedPosts: WPPost[] = [];
  let latestProduct: WordPressProduct | null = null;
  let errorMsg = "";

  try {
    const [fetchedPost, products] = await Promise.all([
      getPostBySlug(slug),
      getProducts({ perPage: 1 }).catch(() => []),
    ]);

    post = fetchedPost;
    latestProduct = products?.[0] || null;
    
    if (post) {
      const postCategories = post._embedded?.['wp:term']?.[0] || [];
      const primaryCategory = postCategories[0];

      const [fetchedComments, fetchedRelated] = await Promise.all([
        getComments(post.id),
        primaryCategory 
          ? getPosts({ category: primaryCategory.id, perPage: 4 }) 
          : getPosts({ perPage: 4 })
      ]);
      
      comments = fetchedComments;
      relatedPosts = fetchedRelated
        .filter((p) => p.id !== post!.id)
        .slice(0, 3);
    }
  } catch (err) {
    console.error(`Error loading blog details for slug "${slug}":`, err);
    errorMsg = "Unable to load some section details. The connection might be slow.";
  }

  if (!post) {
    notFound();
  }

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url;
  const imageAlt = featuredMedia?.alt_text || post.title.rendered;

  const postCategories = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = postCategories[0];
  const author = post._embedded?.author?.[0];

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const textOnly = post.content.rendered.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 225));

  let headingIndex = 0;
  let contentWithHeadingIds = post.content.rendered.replace(/<h2>/g, () => {
    return `<h2 id="heading-${headingIndex++}">`;
  });

  // Inject dynamic in-content Digital Product Recommendation Banner after 3rd paragraph
  let paragraphCount = 0;
  if (latestProduct) {
    const rawExcerpt = latestProduct.plainShortDescription || latestProduct.shortDescription?.replace(/<[^>]*>/g, "") || "";
    const cleanExcerpt = rawExcerpt.length > 150 ? rawExcerpt.slice(0, 147) + "..." : rawExcerpt;
    const badgeText = latestProduct.badge || "RECOMMENDED ASSET";
    const btnLabel = latestProduct.buttonText || "View Details";
    const productUrl = `/products/${latestProduct.slug}`;

    const digitalProductCallout = `
    <div class="my-10 p-5 sm:p-6 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-xs not-prose flex flex-col sm:flex-row items-center gap-5">
      ${latestProduct.featuredImage ? `
        <a href="${productUrl}" class="relative w-full sm:w-28 h-36 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-200 block border border-slate-200/80 group">
          <img src="${latestProduct.featuredImage}" alt="${cleanHtmlText(latestProduct.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </a>
      ` : ''}
      <div class="space-y-1.5 flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-[10px] font-bold px-2.5 py-0.5 bg-[#FDF2F5] text-[#DC2564] rounded-full border border-[#FBCFE8] uppercase tracking-wider">
            ${badgeText}
          </span>
          <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full uppercase tracking-wider border border-slate-200">
            ${latestProduct.category || "Store"}
          </span>
          <span class="text-xs font-black text-slate-900 ml-auto sm:ml-0">
            ${latestProduct.price}
          </span>
        </div>
        <a href="${productUrl}" class="block font-extrabold text-slate-900 text-base leading-snug hover:text-[#DC2564] transition-colors">
          ${cleanHtmlText(latestProduct.name)}
        </a>
        <p class="text-slate-600 text-xs leading-relaxed line-clamp-2">
          ${cleanHtmlText(cleanExcerpt)}
        </p>
      </div>
      <a href="${productUrl}" class="inline-flex items-center justify-center gap-1.5 bg-[#DC2564] hover:bg-[#B81D52] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-sm shadow-[#DC2564]/20 shrink-0 whitespace-nowrap active:scale-95">
        <span>${btnLabel}</span>
        <span>→</span>
      </a>
    </div>
    `;

    contentWithHeadingIds = contentWithHeadingIds.replace(/<\/p>/g, (match) => {
      paragraphCount++;
      if (paragraphCount === 3) {
        return match + digitalProductCallout;
      }
      return match;
    });
  }

  contentWithHeadingIds = contentWithHeadingIds
    .replace(/<div[^>]*class="[^"]*(sharedaddy|sd-sharing|heateor|social-share|xs_social_share_widget|wslu-style-2)[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*(sharedaddy|sd-sharing|heateor|social-share|xs_social_share_widget|wslu-style-2)[^"]*"[\s\S]*?<\/div>/gi, '')
    .replace(/<ul[^>]*class="[^"]*(sharedaddy|sd-sharing|heateor|social-share|wslu)[^"]*"[\s\S]*?<\/ul>/gi, '')
    .replace(/<ul[^>]*>[\s\S]*?Share\s*(Facebook|LinkedIn|Twitter|Pinterest|WhatsApp|Telegram|Reddit)[\s\S]*?<\/ul>/gi, '')
    .replace(/<div[^>]*>[\s\S]*?0\s*Share\s*Facebook[\s\S]*?<\/div>/gi, '');

  const cleanTitle = cleanHtmlText(post.title.rendered);
  const displayAuthorName = author?.name === "Maa janki" || !author?.name ? "Ashish Kumar" : author.name;
  const authorRole = displayAuthorName === "Ashish Kumar" ? "Founder & Principal Architect, MJ Digital" : "Technical Contributor";

  const postJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://blog.maajankiwebtech.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://blog.maajankiwebtech.com/blog",
          },
          ...(primaryCategory
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: primaryCategory.name,
                  item: `https://blog.maajankiwebtech.com/category/${primaryCategory.slug}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: cleanTitle,
                  item: `https://blog.maajankiwebtech.com/blog/${slug}`,
                },
              ]
            : [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: cleanTitle,
                  item: `https://blog.maajankiwebtech.com/blog/${slug}`,
                },
              ]),
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `https://blog.maajankiwebtech.com/blog/${slug}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `https://blog.maajankiwebtech.com/blog/${slug}`,
          url: `https://blog.maajankiwebtech.com/blog/${slug}`,
          name: cleanTitle,
        },
        headline: cleanTitle,
        description: cleanHtmlText(post.excerpt?.rendered || "").slice(0, 200),
        url: `https://blog.maajankiwebtech.com/blog/${slug}`,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://blog.maajankiwebtech.com/blog/${slug}`,
        },
        image: imageUrl || "https://blog.maajankiwebtech.com/ashish-kumar.png",
        author: {
          "@type": "Person",
          name: displayAuthorName,
          jobTitle: "Founder & Lead Architect",
          url: "https://blog.maajankiwebtech.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "MJ Digital",
          url: "https://blog.maajankiwebtech.com",
          logo: {
            "@type": "ImageObject",
            url: "https://blog.maajankiwebtech.com/maajanki-web-tech-logo.webp",
          },
        },
        articleSection: primaryCategory?.name || "Software Architecture",
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <>
      {/* Schema.org BlogPosting & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <ReadingProgressBar />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Articles</Link>
          {primaryCategory && (
            <>
              <span>/</span>
              <Link href={`/category/${primaryCategory.slug}`} className="hover:text-[#DC2564] transition-colors">
                {primaryCategory.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-slate-500 font-medium" aria-current="page">{cleanTitle}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10 space-y-4">
          {primaryCategory && (
            <span className="inline-block px-3 py-1 bg-[#FDF2F5] text-[#DC2564] border border-[#FBCFE8] rounded-full text-xs font-bold uppercase tracking-wider">
              {primaryCategory.name}
            </span>
          )}

          <h1 
            className="font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 max-w-4xl leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Author, Date & Reading Time Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200/80 my-6">
            <div className="flex items-center gap-3">
              {author?.avatar_urls?.['96'] ? (
                <Image 
                  src={author.avatar_urls['96']} 
                  alt={displayAuthorName}
                  width={44}
                  height={44}
                  className="rounded-full object-cover border border-[#DC2564]/30"
                />
              ) : (
                <div className="w-11 h-11 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  AK
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                  <span>{displayAuthorName}</span>
                  <HiCheckBadge className="text-[#DC2564] w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500">
                  {authorRole} • <span suppressHydrationWarning>{formattedDate}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{readingTimeMinutes} min read</span>
              </div>
              <div className="h-5 w-px bg-slate-200 hidden sm:block" />
              <BookmarkButton
                slug={post.slug}
                title={cleanTitle}
                excerpt={cleanHtmlText(post.excerpt.rendered).slice(0, 120)}
                category={primaryCategory?.name || "Article"}
                imageUrl={imageUrl}
              />
            </div>
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden relative shadow-sm border border-slate-200/80 bg-slate-100">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <CodeCopyEnhancer />

            {/* Audio Listener Component */}
            <ArticleAudioPlayer
              title={cleanTitle}
              content={post.content.rendered}
            />

            {/* Rendered WP Content */}
            <div 
              className="wp-content article-content max-w-none text-slate-700"
              dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
            />

            {/* Inline Hostinger Ad Section */}
            <InlineAdBanner
              href="https://www.hostinger.com/in?REFERRALCODE=maajankiweb"
              title="Host Your Website with Hostinger — Up to 75% OFF + Free Domain"
              description="Ultra-fast cloud hosting, free SSL, 99.9% uptime guarantee, and 24/7 expert support. Specially optimized for Next.js, WordPress, and web applications."
              ctaText="Get Started with Hostinger"
            />

            {/* Social Share & Save for Later Bar */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Share this Dispatch
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${cleanTitle} https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaWhatsapp size={14} />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaLinkedinIn size={13} />
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}&text=${encodeURIComponent(cleanTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black text-white hover:opacity-90 transition-opacity"
                  >
                    <FaXTwitter size={13} />
                    X / Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaFacebookF size={13} />
                    Facebook
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1.5">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bookmark Article
                </span>
                <BookmarkButton
                  slug={post.slug}
                  title={cleanTitle}
                  excerpt={cleanHtmlText(post.excerpt.rendered).slice(0, 120)}
                  category={primaryCategory?.name || "Article"}
                  imageUrl={imageUrl}
                />
              </div>
            </div>

            {/* Post Tags */}
            {post._embedded?.['wp:term']?.[1] && (
              <div className="flex flex-wrap gap-1.5 mt-8 pt-4 border-t border-slate-100">
                {post._embedded['wp:term'][1].map((tag: any) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.id}`}
                    className="px-3 py-1 bg-slate-100 hover:bg-[#FDF2F5] hover:text-[#DC2564] rounded-lg text-xs font-medium text-slate-700 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Interactive Dynamic Table of Contents */}
              <InteractiveTOC content={post.content.rendered} />

              {/* Dynamic Sidebar Store Callout */}
              {latestProduct ? (
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#14213D] p-5 rounded-2xl border border-slate-800 text-white shadow-sm space-y-3.5 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FBCFE8] bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                      {latestProduct.badge || "NEW RELEASE"}
                    </span>
                    <span className="text-xs font-black text-white bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                      {latestProduct.price}
                    </span>
                  </div>

                  {latestProduct.featuredImage && (
                    <Link
                      href={`/products/${latestProduct.slug}`}
                      className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-800 block border border-slate-700/60"
                    >
                      <Image
                        src={latestProduct.featuredImage}
                        alt={latestProduct.name}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  )}

                  <div>
                    <Link
                      href={`/products/${latestProduct.slug}`}
                      className="font-extrabold text-sm leading-snug text-white group-hover:text-[#FBCFE8] transition-colors line-clamp-2 block mb-1"
                    >
                      {latestProduct.name}
                    </Link>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                      {latestProduct.plainShortDescription || latestProduct.shortDescription?.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-2">
                    <Link
                      href={`/products/${latestProduct.slug}`}
                      className="inline-flex items-center gap-1.5 bg-[#DC2564] hover:bg-[#B81D52] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
                    >
                      <span>{latestProduct.buttonText || "Get Product"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/products"
                      className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      All Products →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-slate-900 to-[#14213D] p-5 rounded-2xl border border-slate-800 text-white shadow-sm space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FBCFE8] bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                    MAAJANKI COMMERCE
                  </span>
                  <h4 className="font-extrabold text-sm leading-snug">
                    Explore Digital Products &amp; Resources
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    High-converting eBooks, business tools, and verified templates for startup founders and developers.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1 bg-[#DC2564] hover:bg-[#B81D52] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
                  >
                    <span>Browse Store</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}

              {/* YouTube Channel Banner */}
              <YoutubeAdCard />

              {/* Hostinger Sponsored Ad Widget */}
              <HostingerAdCard />

              {/* Maajanki Web Tech Agency Ad */}
              <MaajankiAdCard />

              {/* BrewPluse Cafe Management Software Ad */}
              <BrewPluseAdCard />

              {/* Related reads column */}
              <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
                <h3 className="font-bold text-sm text-slate-900 mb-4">
                  Related Dispatches
                </h3>
                <div className="flex flex-col gap-3.5">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((rPost) => {
                      const rImgUrl = rPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                      return (
                        <Link key={rPost.id} href={`/blog/${rPost.slug}`} className="group flex gap-3 items-center">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 relative shrink-0 border border-slate-200/60">
                            {rImgUrl ? (
                              <Image
                                src={rImgUrl}
                                alt={rPost.title.rendered}
                                fill
                                sizes="64px"
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-200" />
                            )}
                          </div>
                          <div>
                            <h4 
                              className="text-xs font-bold text-slate-900 group-hover:text-[#DC2564] transition-colors line-clamp-2 leading-snug"
                              dangerouslySetInnerHTML={{ __html: rPost.title.rendered }}
                            />
                            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                              5 min read
                            </span>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-500 italic">No related articles found</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Strategic Agency Consultation CTA */}
        <AgencyConsultationCta />

        {/* Author Bio Block */}
        <AuthorBioCard />

        <section className="mt-8 py-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/blog" className="group flex items-center gap-2 text-[#DC2564] font-bold text-sm hover:underline">
              <ArrowLeft className="h-4 w-4" /> Browse All Articles
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 font-semibold text-xs transition-colors">
              Have questions or need custom development? Reach out →
            </Link>
          </div>
        </section>

        {/* Comments Listing & Post Comment Form */}
        <section className="mt-12 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#DC2564]" />
              <span>Comments ({comments.length})</span>
            </h3>
          </div>

          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const commentDate = new Date(comment.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                });
                return (
                  <div key={comment.id} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {comment.author_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-slate-900">
                          {comment.author_name}
                        </span>
                        <span className="text-[11px] text-slate-400" suppressHydrationWarning>
                          {commentDate}
                        </span>
                      </div>
                      <div 
                        className="text-xs sm:text-sm text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500 text-xs italic py-2">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>

          {/* Comment submission form */}
          <CommentForm postId={post.id} />
        </section>

        {/* Post FAQ Section */}
        <FaqSection
          faqs={[
            {
              question: "Can I share or reference this article in my own publication?",
              answer: "Yes, you are welcome to quote excerpts with attribution and a link back to this original post. For full syndication requests, please reach out via our contact page.",
            },
            {
              question: "How can I stay updated on future articles about this topic?",
              answer: "You can subscribe to our weekly newsletter or follow our RSS feed to get notified whenever new deep dives in this category are published.",
            },
            {
              question: "Where can I report a correction or technical typo?",
              answer: "We strive for technical accuracy. If you notice an error or outdated code sample, please leave a comment below or send a note via our contact form.",
            },
            {
              question: "Are code examples in this post free to use in production?",
              answer: "All code snippets provided in our editorial deep dives are open for educational and commercial use under standard MIT licensing unless specified otherwise.",
            },
          ]}
          title="Article FAQ & Usage"
          description="Frequently asked questions regarding this post, code usage, and sharing rights."
        />

        {/* Lead Magnet Exit-Intent Modal */}
        <ExitIntentModal />

        {/* Structured Schema Markup (BlogPosting & FAQPage JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BlogPosting",
                  "@id": `https://blog.maajankiwebtech.com/blog/${post.slug}#article`,
                  "isPartOf": {
                    "@type": "WebPage",
                    "@id": `https://blog.maajankiwebtech.com/blog/${post.slug}`,
                    "url": `https://blog.maajankiwebtech.com/blog/${post.slug}`,
                    "name": cleanTitle,
                  },
                  "headline": cleanTitle,
                  "description": cleanHtmlText(post.excerpt.rendered).slice(0, 160),
                  "image": imageUrl ? [imageUrl] : undefined,
                  "datePublished": post.date,
                  "dateModified": post.modified || post.date,
                  "author": {
                    "@type": "Person",
                    "name": displayAuthorName,
                    "jobTitle": "Founder & Technical Lead",
                    "worksFor": {
                      "@type": "Organization",
                      "name": "Maajanki Web Tech LLP",
                      "url": "https://www.maajankiwebtech.com/"
                    },
                    "url": "https://blog.maajankiwebtech.com/about",
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Maajanki Web Tech LLP",
                    "url": "https://www.maajankiwebtech.com/",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://blog.maajankiwebtech.com/logo.png",
                    },
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://blog.maajankiwebtech.com/blog/${post.slug}`,
                  },
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Can I share or reference this article in my own publication?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, you are welcome to quote excerpts with attribution and a link back to this original post. For full syndication requests, please reach out via our contact page."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I stay updated on future articles about this topic?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can subscribe to our weekly newsletter or follow our RSS feed to get notified whenever new deep dives in this category are published."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Where can I report a correction or technical typo?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We strive for technical accuracy. If you notice an error or outdated code sample, please leave a comment below or send a note via our contact form."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Are code examples in this post free to use in production?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "All code snippets provided in our editorial deep dives are open for educational and commercial use under standard MIT licensing unless specified otherwise."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </main>
    </>
  );
}
