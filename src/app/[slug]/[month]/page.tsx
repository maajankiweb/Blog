import { getPostsByDate, WPPost } from "@/lib/wordpress";
import BlogCard from "@/components/BlogCard";
import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Metadata } from "next";

type Params = Promise<{ slug: string; month: string }>;

interface PageProps {
  params: Params;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug: year, month } = await props.params;
  const mIndex = parseInt(month, 10) - 1;
  const monthName = MONTH_NAMES[mIndex] || month;
  return {
    title: `Articles from ${monthName} ${year} | Archive`,
    description: `Browse all articles published in ${monthName} ${year} on Maa Janki Web Tech blog.`,
  };
}

export default async function DateArchivePage(props: PageProps) {
  const { slug: year, month } = await props.params;
  const yNum = parseInt(year, 10);
  const mNum = parseInt(month, 10);

  const mIndex = mNum - 1;
  const monthName = MONTH_NAMES[mIndex] || month;

  const { posts, totalPosts } = await getPostsByDate(yNum, mNum);

  return (
    <div className="bg-background text-on-background min-h-screen pb-xl">
      {/* Header */}
      <header className="bg-surface-container-low pt-xl pb-lg px-margin-mobile md:px-margin-desktop border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto space-y-md">
          <Link
            href="/blog"
            className="inline-flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Articles
          </Link>

          <div className="space-y-xs">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <Calendar className="h-4 w-4" />
              <span>Monthly Archive</span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {monthName} {year}
            </h1>
            <p className="text-on-surface-variant text-body-lg">
              Showing {totalPosts} {totalPosts === 1 ? 'article' : 'articles'} published in {monthName} {year}.
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-outline-variant/30 rounded-2xl bg-surface">
            <p className="text-on-surface-variant text-sm italic">
              No articles found for {monthName} {year}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {posts.map((post: WPPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <FaqSection
        faqs={[
          {
            question: `How far back do monthly archives go?`,
            answer: `Our monthly archives contain all published posts since the launch of the Maa Janki Web Tech blog.`,
          },
          {
            question: `Can I view posts by category instead of date?`,
            answer: `Yes, you can browse all categories on our main /blog page or click any category badge.`,
          },
        ]}
        title="Archive FAQ"
        description="Frequently asked questions about browsing articles by publication date."
      />
    </div>
  );
}
