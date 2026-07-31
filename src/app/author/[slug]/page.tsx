import { getUserBySlug, getUser, getPosts, WPPost, WPUser } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import FaqSection from "@/components/FaqSection";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Globe, Mail, Rss, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

async function fetchAuthor(slug: string): Promise<WPUser | null> {
  let author = await getUserBySlug(slug);
  if (!author && !isNaN(Number(slug))) {
    try {
      author = await getUser(parseInt(slug, 10));
    } catch {
      author = null;
    }
  }
  return author;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const author = await fetchAuthor(slug);
    return {
      title: author ? `${author.name} | Author Profile` : "Author Profile",
      description: author?.description || `Explore articles and essays written by ${author?.name || slug}.`,
    };
  } catch {
    return {
      title: "Author Profile | Maajanki",
    };
  }
}

export default async function AuthorSlugPage(props: PageProps) {
  const { slug } = await props.params;
  const author: WPUser | null = await fetchAuthor(slug);

  if (!author) {
    notFound();
  }

  let posts: WPPost[] = [];

  try {
    posts = await getPosts({ author: author.id, perPage: 12 });
  } catch (err) {
    console.error("Error loading author profile:", err);
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-xl">
      {/* Author Profile Header */}
      <header className="bg-surface-container-low pt-xl pb-lg px-margin-mobile md:px-margin-desktop border-b border-outline-variant/30 dark:border-zinc-800/30">
        <div className="max-w-container-max mx-auto space-y-md">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Archives
          </Link>

          {/* Author Card Profile */}
          <div className="flex flex-col md:flex-row gap-lg items-center md:items-start text-center md:text-left py-4">
            {author.avatar_urls?.['96'] ? (
              <Image
                src={author.avatar_urls['96']}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full border border-primary-fixed object-cover shadow-sm shrink-0"
              />
            ) : (
              <div className="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center font-bold text-primary text-2xl shrink-0">
                {author.name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div className="space-y-sm">
              <span className="inline-block px-3 py-1 bg-primary-container/10 text-primary-container rounded-full text-xs font-bold uppercase tracking-wider">
                MAAJANKI AUTHOR
              </span>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-zinc-50 leading-tight">
                {author.name}
              </h1>
              <p className="font-body-lg text-body-md text-on-surface-variant dark:text-zinc-400 max-w-2xl leading-relaxed">
                {author.description || `${author.name} writes about web development, digital marketing, business growth, and technology on Maa Janki Web Tech.`}
              </p>

              {/* Social icons */}
              <div className="flex justify-center md:justify-start gap-md pt-2">
                {author.url && (
                  <a href={author.url} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="Website">
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                <Link href="/contact-us" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="Mail">
                  <Mail className="h-5 w-5" />
                </Link>
                <Link href="/blog" className="text-on-surface-variant hover:text-primary transition-colors" aria-label="RSS">
                  <Rss className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Author Posts Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <h2 className="font-headline-md text-headline-md text-on-surface dark:text-zinc-50 mb-lg border-b border-outline-variant/10 dark:border-zinc-800/10 pb-4">
          Articles by {author.name}
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-outline-variant/30 rounded-2xl bg-white dark:bg-zinc-900">
            <p className="text-on-surface-variant dark:text-zinc-400 text-sm italic">
              No articles published by this author yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      {/* Author FAQ */}
      <FaqSection
        faqs={[
          {
            question: `How can I contact ${author.name} directly?`,
            answer: `You can reach out via our contact page at /contact-us or leave a comment on their articles.`,
          },
          {
            question: `What primary topics does ${author.name} write about?`,
            answer: `${author.name} focuses on web development, SEO strategies, digital marketing insights, and tech tutorials.`,
          },
          {
            question: "How are articles reviewed before publishing?",
            answer: "All articles undergo technical review and editorial proofing prior to publication.",
          },
        ]}
        title={`${author.name} - Author FAQ`}
        description={`Frequently asked questions about ${author.name}'s background and published content.`}
      />
    </div>
  );
}
