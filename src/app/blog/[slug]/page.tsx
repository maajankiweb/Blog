import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getComments, getPosts, WPPost } from "@/lib/wordpress";
import CommentForm from "@/components/CommentForm";
import FaqSection from "@/components/FaqSection";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import AdBanner from "@/components/AdBanner";
import HostingerAdCard from "@/components/HostingerAdCard";
import InlineAdBanner from "@/components/InlineAdBanner";
import YoutubeAdCard from "@/components/YoutubeAdCard";
import { Clock, Calendar, Bookmark, Share2, MessageSquare, ArrowLeft, ArrowRight, User } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaPinterestP, FaWhatsapp, FaTelegram, FaRedditAlien } from "react-icons/fa6";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

// Generate dynamic metadata for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  
  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return {
        title: "Post Not Found | Maajanki",
      };
    }

    // Use scraped SEO values if available, otherwise fall back to default logic
    const seoTitle = post.seo?.seoTitle || post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '“').replace(/&#8221;/g, '”');
    const seoDescription = post.seo?.seoDescription || post.excerpt.rendered
      .replace(/<[^>]*>?/gm, "") // Remove HTML tags
      .trim()
      .substring(0, 160);
    const keywords = post.seo?.keywords ? post.seo.keywords.split(',').map(k => k.trim()) : undefined;
    const robots = post.seo?.robots || undefined;

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = post.seo?.ogImage || featuredMedia?.source_url;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: keywords,
      robots: robots,
      openGraph: {
        title: post.seo?.ogTitle || seoTitle,
        description: post.seo?.ogDescription || seoDescription,
        type: "article",
        url: post.seo?.ogUrl || post.link,
        publishedTime: post.date,
        images: imageUrl ? [{ url: imageUrl, alt: post.seo?.ogImage ? seoTitle : (featuredMedia?.alt_text || post.title.rendered) }] : [],
      },
      twitter: {
        card: (post.seo?.twitterCard as any) || "summary_large_image",
        title: post.seo?.twitterTitle || seoTitle,
        description: post.seo?.twitterDescription || seoDescription,
        images: post.seo?.twitterImage ? [post.seo.twitterImage] : (imageUrl ? [imageUrl] : []),
      }
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Blog Post | Maajanki",
    };
  }
}

export default async function PostPage(props: PageProps) {
  const { slug } = await props.params;
  
  let post = null;
  let comments: any[] = [];
  let relatedPosts: WPPost[] = [];
  let errorMsg = "";

  try {
    post = await getPostBySlug(slug);
    
    if (post) {
      // Fetch comments & related posts in parallel
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
        .filter((p) => p.id !== post!.id) // Exclude current post
        .slice(0, 3); // Get top 3
    }
  } catch (err) {
    console.error(`Error loading blog details for slug "${slug}":`, err);
    errorMsg = "Unable to load some section details. The connection might be slow.";
  }

  if (!post) {
    notFound();
  }

  // Extract featured image from _embedded
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url;
  const imageAlt = featuredMedia?.alt_text || post.title.rendered;

  // Extract category details
  const postCategories = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = postCategories[0];

  // Extract author details
  const author = post._embedded?.author?.[0];

  // Format Date
  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Calculate dynamic reading time
  const textOnly = post.content.rendered.replace(/<[^>]*>/g, "");
  const wordCount = textOnly.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 225));

  // Inject ID attributes into h2 elements for Table of Contents anchors
  let headingIndex = 0;
  let contentWithHeadingIds = post.content.rendered.replace(/<h2>/g, () => {
    return `<h2 id="heading-${headingIndex++}">`;
  });

  // Inject inline Ad banner into long articles after 3rd paragraph
  let paragraphCount = 0;
  const inlineAdHtml = `
    <div class="my-10 p-6 bg-surface border-2 border-primary-container/20 rounded-2xl shadow-sm not-prose">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-primary-container/15 text-primary-container rounded-full border border-primary-container/30">SPONSORED</span>
        <span class="text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">Ad</span>
      </div>
      <h4 class="font-extrabold text-on-surface text-base mb-1">Accelerate Your Digital Growth with Osdire</h4>
      <p class="text-on-surface-variant text-xs leading-relaxed mb-3">Unlock premium digital tools, web optimization, and specialized infrastructure designed for modern businesses.</p>
      <a href="https://osdire.com/aff/ashish_kumar_dchb-1" target="_blank" rel="noopener sponsored" class="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-[#e05e00] text-white py-2 px-5 rounded-xl font-bold text-xs transition-all shadow-sm">Explore Osdire Offers →</a>
    </div>
  `;

  contentWithHeadingIds = contentWithHeadingIds.replace(/<\/p>/g, (match) => {
    paragraphCount++;
    if (paragraphCount === 3) {
      return match + inlineAdHtml;
    }
    return match;
  });

  // Completely strip Jetpack/Sassy Social Share/WordPress plugin social sharing block from article HTML content
  contentWithHeadingIds = contentWithHeadingIds
    .replace(/<div[^>]*class="[^"]*(sharedaddy|sd-sharing|heateor|social-share)[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*(sharedaddy|sd-sharing|heateor|social-share)[^"]*"[\s\S]*?<\/div>/gi, '')
    .replace(/<ul[^>]*class="[^"]*(sharedaddy|sd-sharing|heateor|social-share)[^"]*"[\s\S]*?<\/ul>/gi, '')
    .replace(/<ul[^>]*>[\s\S]*?Share\s*(Facebook|LinkedIn|Twitter|Pinterest|WhatsApp|Telegram|Reddit)[\s\S]*?<\/ul>/gi, '')
    .replace(/<div[^>]*>[\s\S]*?0\s*Share\s*Facebook[\s\S]*?<\/div>/gi, '');

  return (
    <>
      {/* Scroll-linked reading progress bar */}
      <ReadingProgressBar />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg">
        {/* Article Header */}
        <header className="mb-xl">
          <div className="flex flex-col gap-sm mb-base">
            {primaryCategory && (
              <span className="inline-block px-3 py-1 bg-surface-container-highest dark:bg-zinc-800 text-on-surface-variant dark:text-zinc-300 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
                {primaryCategory.name}
              </span>
            )}
            <h1 
              className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-zinc-50 max-w-4xl leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md py-md border-y border-outline-variant/20 dark:border-zinc-800/30 my-lg">
            <div className="flex items-center gap-sm">
              {author?.avatar_urls?.['96'] ? (
                <Image 
                  src={author.avatar_urls['96']} 
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border border-primary-fixed"
                />
              ) : (
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center font-bold text-primary">
                  {author?.name.substring(0, 2) || "ED"}
                </div>
              )}
              <div>
                <p className="font-label-md text-label-md text-on-surface dark:text-zinc-200">
                  {author?.name || "Elena Vance"}
                </p>
                <p className="text-xs text-on-surface-variant dark:text-zinc-400">
                  Senior Editorial Writer • {formattedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-md">
                <div className="flex items-center gap-xs text-on-surface-variant dark:text-zinc-400 text-xs font-medium">
                  <Clock className="h-4 w-4" />
                  <span>{readingTimeMinutes} min read</span>
                </div>
              <div className="h-8 w-px bg-outline-variant/40 hidden sm:block"></div>
              <div className="flex items-center gap-sm">
                <button className="p-2 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-full transition-colors text-on-surface dark:text-zinc-200" aria-label="Bookmark">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-surface-container dark:hover:bg-zinc-800 rounded-full transition-colors text-on-surface dark:text-zinc-200" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden relative group shadow-md border border-outline-variant/20 dark:border-zinc-800/30 bg-surface-variant/20">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover transition-transform duration-700 group-hover:scale-101"
                priority
              />
            </div>
          )}
        </header>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <div 
              className="wp-content article-content max-w-none dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
            />

            {/* Inline Hostinger Ad Section */}
            <InlineAdBanner
              href="https://www.hostinger.com/in?REFERRALCODE=maajankiweb"
              title="Host Your Website with Hostinger — Up to 75% OFF + Free Domain"
              description="Get ultra-fast cloud hosting, free SSL, 99.9% uptime guarantee, and 24/7 expert support. Specially optimized for Next.js, WordPress, and web applications."
              ctaText="Get Started with Hostinger"
            />

            {/* Social Share Bar */}
            <div className="mt-xl pt-lg border-t border-outline-variant/20 dark:border-zinc-800/30">
              <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                Share this Article
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                >
                  <FaFacebookF size={13} />
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
                >
                  <FaLinkedinIn size={13} />
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}&text=${encodeURIComponent(post.title.rendered)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-black text-white hover:opacity-90 transition-opacity"
                >
                  <FaXTwitter size={13} />
                  Twitter
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#E60023] text-white hover:opacity-90 transition-opacity"
                >
                  <FaPinterestP size={13} />
                  Pinterest
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title.rendered} https://blog.maajankiwebtech.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                >
                  <FaWhatsapp size={14} />
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}&text=${encodeURIComponent(post.title.rendered)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#229ED9] text-white hover:opacity-90 transition-opacity"
                >
                  <FaTelegram size={14} />
                  Telegram
                </a>
                <a
                  href={`https://reddit.com/submit?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/blog/${slug}`)}&title=${encodeURIComponent(post.title.rendered)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#FF4500] text-white hover:opacity-90 transition-opacity"
                >
                  <FaRedditAlien size={14} />
                  Reddit
                </a>
              </div>
            </div>

            {/* Post Tags */}
            <div className="flex flex-wrap gap-xs mt-lg pt-md border-t border-outline-variant/20 dark:border-zinc-800/30">
              {post._embedded?.['wp:term']?.[1]?.map((tag: any) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.id}`}
                  className="px-4 py-2 bg-surface-container dark:bg-zinc-800 rounded-lg text-xs font-medium hover:bg-primary-container hover:text-on-primary transition-all dark:text-zinc-300 dark:hover:text-white"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-lg">
            <div className="sticky top-28 space-y-lg">
              {/* Dynamic Table of Contents */}
              <TableOfContents htmlContent={post.content.rendered} />

              {/* Sidebar Newsletter box */}
              <div className="bg-on-secondary-fixed p-gutter rounded-xl text-white overflow-hidden relative shadow-md">
                <div className="relative z-10 space-y-4">
                  <h3 className="font-headline-md text-lg font-black">The Maajanki Weekly</h3>
                  <p className="text-secondary-fixed-dim text-sm leading-relaxed">
                    Deep dives into the architecture of the modern web. No fluff, just insights.
                  </p>
                  <form action="/newsletter" method="GET" className="space-y-xs">
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full bg-white/10 border-white/20 rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary placeholder:text-white/40 outline-none"
                      required
                    />
                    <button type="submit" className="w-full bg-primary-container py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                      SUBSCRIBE NOW
                    </button>
                  </form>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                  <span className="material-symbols-outlined text-[120px]">mark_email_read</span>
                </div>
              </div>

              {/* AK Web Master Hub YouTube Channel Banner */}
              <YoutubeAdCard />

              {/* Hostinger Sponsored Ad Widget */}
              <HostingerAdCard />

              {/* Sponsored Ad Banner */}
              <AdBanner />

              {/* Related reads column */}
              <div>
                <h3 className="font-label-md text-label-md mb-md text-black dark:text-white uppercase font-black tracking-wider sidebar-related-title">
                  RELATED READS
                </h3>
                <div className="flex flex-col gap-md">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((rPost) => {
                      const rImgUrl = rPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                      return (
                        <Link key={rPost.id} href={`/blog/${rPost.slug}`} className="group flex gap-sm items-center cursor-pointer">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-variant relative shrink-0">
                            {rImgUrl ? (
                              <Image
                                src={rImgUrl}
                                alt={rPost.title.rendered}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-fixed to-primary" />
                            )}
                          </div>
                          <div>
                            <h4 
                              className="text-sm font-bold text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 leading-snug"
                              dangerouslySetInnerHTML={{ __html: rPost.title.rendered }}
                            />
                            <span className="text-xs text-[#6B6058] font-medium">
                              5 min read
                            </span>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-sm text-on-surface-variant italic">No related articles found</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Author Bio Block */}
        <section className="mt-xl py-xl border-t border-outline-variant/20 dark:border-zinc-800/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-stretch">
            {/* Left: Author Details */}
            <div className="flex gap-md p-md bg-surface-container dark:bg-zinc-900 rounded-xl items-center">
              {author?.avatar_urls?.['96'] ? (
                <Image 
                  src={author.avatar_urls['96']} 
                  alt={author.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center font-bold text-primary text-xl shrink-0">
                  {author?.name.substring(0, 2) || "ED"}
                </div>
              )}
              <div>
                <h3 className="font-headline-md text-xl text-on-surface dark:text-zinc-100 mb-xs">
                  {author?.name || "Elena Vance"}
                </h3>
                <p className="text-sm text-on-surface-variant dark:text-zinc-400 leading-relaxed">
                  {author?.description || "Elena is a systems designer and journalist focusing on the intersection of human psychology and digital interfaces."}
                </p>
              </div>
            </div>

            {/* Right: Next / Prev navigation links */}
            <div className="flex flex-col justify-center gap-sm">
              <Link href="/blog" className="group flex flex-col items-end text-right">
                <span className="text-[11px] text-on-surface-variant dark:text-zinc-400 uppercase tracking-widest mb-1">
                  Next Article
                </span>
                <span className="text-body-lg font-bold text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors flex items-center gap-xs">
                  Beyond the Fold: Scroll Depth and Narrative <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/blog" className="group flex flex-col items-start">
                <span className="text-[11px] text-on-surface-variant dark:text-zinc-400 uppercase tracking-widest mb-1">
                  Previous Article
                </span>
                <span className="text-body-lg font-bold text-on-surface dark:text-zinc-200 group-hover:text-primary transition-colors flex items-center gap-xs">
                  <ArrowLeft className="h-4 w-4" /> The Color of Utility: Primary Orange
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Comments Listing & Post Comment Form */}
        <section className="mt-xl max-w-4xl mx-auto space-y-lg">
          <div className="flex justify-between items-center mb-lg pb-4 border-b border-outline-variant/20 dark:border-zinc-800/30">
            <h3 className="font-headline-md text-2xl text-on-surface dark:text-zinc-100 flex items-center gap-xs">
              <MessageSquare className="h-6 w-6 text-primary" />
              Reflections ({comments.length})
            </h3>
          </div>

          <div className="space-y-lg">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const commentDate = new Date(comment.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                });
                return (
                  <div key={comment.id} className="flex gap-md pb-lg border-b border-outline-variant/10 dark:border-zinc-800/10">
                    <div className="w-10 h-10 rounded-full bg-secondary-container dark:bg-zinc-800 flex items-center justify-center font-bold text-on-secondary-container dark:text-zinc-300 text-sm shrink-0">
                      {comment.author_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-sm mb-xs">
                        <span className="font-bold text-sm text-on-surface dark:text-zinc-100">
                          {comment.author_name}
                        </span>
                        <span className="text-xs text-on-surface-variant dark:text-zinc-400">
                          {commentDate}
                        </span>
                      </div>
                      <div 
                        className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-on-surface-variant dark:text-zinc-400 text-sm italic py-4">
                No reflections yet. Be the first to share your thoughts!
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
      </main>
    </>
  );
}

