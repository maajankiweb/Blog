import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPageBySlug,
  getComments,
  getPosts,
  WPPost,
  generateArticleJsonLd,
  generateFaqJsonLd,
  cleanHtmlText,
} from "@/lib/wordpress";
import CommentForm from "@/components/CommentForm";
import FaqSection from "@/components/FaqSection";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import TableOfContents from "@/components/TableOfContents";
import AdBanner from '@/components/AdBanner';
import HostingerAdCard from '@/components/HostingerAdCard';
import YoutubeAdCard from '@/components/YoutubeAdCard';
import { Clock, Bookmark, Share2, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaPinterestP, FaWhatsapp, FaTelegram, FaRedditAlien } from "react-icons/fa6";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    // 1. Try fetching post first
    const post = await getPostBySlug(slug);
    if (post) {
      const cleanTitle = cleanHtmlText(post.title.rendered);
      const cleanDesc = cleanHtmlText(post.excerpt?.rendered || "").substring(0, 160);
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

      return {
        title: `${cleanTitle} | Maajanki Blog`,
        description: cleanDesc,
        alternates: {
          canonical: `https://blog.maajankiwebtech.com/${slug}`,
        },
        openGraph: {
          title: cleanTitle,
          description: cleanDesc,
          type: "article",
          url: `https://blog.maajankiwebtech.com/${slug}`,
          publishedTime: post.date,
          modifiedTime: post.modified || post.date,
          siteName: "Maajanki Blog",
          images: featuredMedia
            ? [{ url: featuredMedia, width: 1200, height: 630, alt: cleanTitle }]
            : [],
        },
        twitter: {
          card: "summary_large_image",
          title: cleanTitle,
          description: cleanDesc,
          images: featuredMedia ? [featuredMedia] : [],
        },
      };
    }

    // 2. Try fetching static page
    const page = await getPageBySlug(slug);
    if (page) {
      const cleanTitle = cleanHtmlText(page.title.rendered);
      const cleanDesc = cleanHtmlText(page.excerpt?.rendered || cleanTitle).substring(0, 160);
      return {
        title: `${cleanTitle} | Maajanki Blog`,
        description: cleanDesc,
        alternates: { canonical: `https://blog.maajankiwebtech.com/${slug}` },
      };
    }

    return { title: "Page Not Found | Maajanki Blog" };
  } catch (err) {
    console.error(`Error generating metadata for slug ${slug}:`, err);
    return { title: "Maajanki Blog" };
  }
}

export default async function DynamicSlugPage(props: PageProps) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);

  if (post) {
    // Fetch comments & related posts in parallel
    const postCategories = post._embedded?.['wp:term']?.[0] || [];
    const primaryCategory = postCategories[0];

    const [comments, fetchedRelated] = await Promise.all([
      getComments(post.id).catch(() => []),
      primaryCategory
        ? getPosts({ category: primaryCategory.id, perPage: 4 }).catch(() => [])
        : getPosts({ perPage: 4 }).catch(() => []),
    ]);

    const relatedPosts = fetchedRelated
      .filter((p) => p.id !== post.id)
      .slice(0, 3);

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url;
    const imageAlt = featuredMedia?.alt_text || cleanHtmlText(post.title.rendered);
    const author = post._embedded?.author?.[0];

    const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Calculate dynamic reading time
    const textOnly = post.content.rendered.replace(/<[^>]*>/g, "");
    const wordCount = textOnly.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 225));

    let headingIndex = 0;
    let contentWithHeadingIds = post.content.rendered.replace(/<h2>/g, () => {
      return `<h2 id="heading-${headingIndex++}">`;
    });

    // Inject inline Ad banner into long articles after the 3rd paragraph
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

    const jsonLd = generateArticleJsonLd(post);

    const articleFaqs = [
      {
        question: "Can I share or reference this article?",
        answer: "Yes, feel free to cite or share excerpts with attribution and a backlink to Maa Janki Web Tech.",
      },
      {
        question: "Where can I report feedback or typos?",
        answer: "You can leave a comment below or drop us a message through our contact page.",
      },
    ];
    const faqJsonLd = generateFaqJsonLd(articleFaqs);

    const siteUrl = 'https://blog.maajankiwebtech.com';
    const cleanTitle = cleanHtmlText(post.title.rendered);

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        ...(primaryCategory ? [{ '@type': 'ListItem', position: 2, name: primaryCategory.name, item: `${siteUrl}/category/${primaryCategory.slug}` }] : []),
        { '@type': 'ListItem', position: primaryCategory ? 3 : 2, name: cleanTitle },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ReadingProgressBar />

        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg">
          {/* Article Header */}
          <header className="mb-xl">
            <div className="flex flex-col gap-sm mb-base">
              {primaryCategory && (
                <Link
                  href={`/category/${primaryCategory.slug}`}
                  className="inline-block px-3 py-1 bg-primary-container/10 text-primary-container rounded-full text-xs font-bold uppercase tracking-wider w-fit hover:bg-primary-container/20 transition-colors"
                >
                  {primaryCategory.name}
                </Link>
              )}
              <h1
                className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-zinc-50 max-w-4xl leading-tight"
              >
                {cleanHtmlText(post.title.rendered)}
              </h1>
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
                    {author?.name ? author.name.substring(0, 2).toUpperCase() : "MJ"}
                  </div>
                )}
                <div>
                  <Link
                    href={`/author/${author?.slug || "maajanki"}`}
                    className="font-label-md text-label-md text-on-surface dark:text-zinc-200 hover:text-primary transition-colors"
                  >
                    {author?.name || "Maa Janki Team"}
                  </Link>
                  <p className="text-xs text-on-surface-variant dark:text-zinc-400">
                    Editorial • {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-md">
                <div className="flex items-center gap-xs text-on-surface-variant dark:text-zinc-400 text-xs font-medium">
                  <Clock className="h-4 w-4" />
                  <span>{readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>

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

          {/* Article & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            <article className="lg:col-span-8">
              <div
                className="wp-content article-content max-w-none dark:text-zinc-300 prose prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
              />

              {/* Social Share Bar */}
              <div className="mt-xl pt-lg border-t border-outline-variant/20 dark:border-zinc-800/30">
                <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                  Share this Article
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://blog.maajankiwebtech.com/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaFacebookF size={13} />
                    Facebook
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://blog.maajankiwebtech.com/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaLinkedinIn size={13} />
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/${slug}`)}&text=${encodeURIComponent(cleanHtmlText(post.title.rendered))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-black text-white hover:opacity-90 transition-opacity"
                  >
                    <FaXTwitter size={13} />
                    Twitter
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#E60023] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaPinterestP size={13} />
                    Pinterest
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${cleanHtmlText(post.title.rendered)} https://blog.maajankiwebtech.com/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaWhatsapp size={14} />
                    WhatsApp
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/${slug}`)}&text=${encodeURIComponent(cleanHtmlText(post.title.rendered))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#229ED9] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaTelegram size={14} />
                    Telegram
                  </a>
                  <a
                    href={`https://reddit.com/submit?url=${encodeURIComponent(`https://blog.maajankiwebtech.com/${slug}`)}&title=${encodeURIComponent(cleanHtmlText(post.title.rendered))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#FF4500] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaRedditAlien size={14} />
                    Reddit
                  </a>
                </div>
              </div>

              {/* Tags */}
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
                <TableOfContents htmlContent={post.content.rendered} />

                {/* Related Reads */}
                <div>
                  <h3 className="font-label-md text-label-md mb-md text-black dark:text-white uppercase font-black tracking-wider sidebar-related-title">
                    RELATED READS
                  </h3>
                  <div className="flex flex-col gap-md">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((rPost) => {
                        const rImgUrl = rPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                        return (
                          <Link key={rPost.id} href={`/${rPost.slug}`} className="group flex gap-sm items-center cursor-pointer">
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
                              <span className="text-xs text-on-surface-variant font-medium">
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

                {/* AK Web Master Hub YouTube Channel Banner */}
                <YoutubeAdCard />

                {/* Hostinger Sponsored Ad Banner */}
                <HostingerAdCard />

                {/* Ad Banner Widget */}
                <AdBanner />

                {/* Sidebar Newsletter Widget */}
                <div
                  className="p-lg rounded-2xl relative overflow-hidden text-white border border-white/10"
                  style={{ background: "linear-gradient(135deg, #0d0806 0%, #170d08 40%, #241108 100%)" }}
                >
                  <h4 className="font-black text-white text-base mb-xs">
                    Weekly Digest
                  </h4>
                  <p className="text-white/70 text-xs mb-md">
                    Stay updated with tech insights delivered directly to your inbox.
                  </p>
                  <form action="/newsletter" method="GET" className="space-y-xs">
                    <input
                      type="email"
                      placeholder="email@address.com"
                      className="w-full bg-white/10 border border-white/20 py-2.5 px-3.5 rounded-xl text-white placeholder:text-white/40 outline-none text-xs"
                      required
                    />
                    <button type="submit" className="w-full py-2.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold rounded-xl text-xs transition-all">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>

          {/* Comments */}
          <section className="mt-xl max-w-4xl mx-auto space-y-lg">
            <div className="flex justify-between items-center mb-lg pb-4 border-b border-outline-variant/20 dark:border-zinc-800/30">
              <h3 className="font-headline-md text-2xl text-on-surface dark:text-zinc-100 flex items-center gap-xs">
                <MessageSquare className="h-6 w-6 text-primary" />
                Comments ({comments.length})
              </h3>
            </div>

            <div className="space-y-lg">
              {comments.length > 0 ? (
                comments.map((comment: any) => (
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
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div
                        className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-on-surface-variant dark:text-zinc-400 text-sm italic py-4">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>

            <CommentForm postId={post.id} />
          </section>

          <FaqSection
            faqs={articleFaqs}
            title="Article FAQ & Licensing"
            description="Usage policies and guidelines regarding this publication."
          />
        </main>
      </>
    );
  }

  // If not a post, try loading WP static page
  const page = await getPageBySlug(slug);

  if (page) {
    return (
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <header className="mb-lg pb-md border-b border-outline-variant/30">
          <h1
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </header>
        <div
          className="wp-content article-content max-w-none dark:text-zinc-300 prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </main>
    );
  }

  // Not found
  notFound();
}
