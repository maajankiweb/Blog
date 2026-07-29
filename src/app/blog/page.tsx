import { getPosts, getCategories, getTags } from "@/lib/wordpress";
import BlogListingLayout from "@/components/BlogListingLayout";
import FaqSection, { FAQItem } from "@/components/FaqSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: SearchParams;
}

export const metadata = {
  title: "The Archive | Insights and Stories",
  description: "Browse our curated archive of long-form articles, tech reviews, and design analysis.",
};

const blogFaqs: FAQItem[] = [
  {
    question: "How do I filter articles by category or tag?",
    answer: "Use the category bar or tag cloud on this page to narrow down articles by topic such as Technology, AI, Architecture, or SEO.",
  },
  {
    question: "How frequently is the article archive updated?",
    answer: "New articles are published every Tuesday and Thursday, with instant additions to the archive upon release.",
  },
  {
    question: "Is an RSS feed available for article subscriptions?",
    answer: "Yes, you can subscribe via standard RSS/Atom feeds at /feed.xml or sign up for our weekly email newsletter.",
  },
  {
    question: "Can I bookmark or save articles for offline reading?",
    answer: "All articles feature clean, print-friendly formatting and responsive layouts optimized for mobile and desktop reading.",
  },
  {
    question: "How are articles ordered in the archive?",
    answer: "Articles are displayed in reverse chronological order (newest first). Filtering by topic preserves chronological sorting within that category.",
  },
];

export default async function BlogListingPage(props: PageProps) {
  // Await searchParams in Next.js 15+
  const searchParams = await props.searchParams;
  const categoryParam = searchParams.category;
  const tagParam = searchParams.tag;

  const activeCategoryId = typeof categoryParam === "string" ? parseInt(categoryParam) : undefined;
  const activeTagId = typeof tagParam === "string" ? parseInt(tagParam) : undefined;

  let posts: any[] = [];
  let categories: any[] = [];
  let tags: any[] = [];

  try {
    const [fetchedPosts, fetchedCategories, fetchedTags] = await Promise.all([
      getPosts({
        category: activeCategoryId,
        tag: activeTagId,
        perPage: 20,
      }),
      getCategories({ perPage: 15 }),
      getTags({ perPage: 25 }),
    ]);

    posts = fetchedPosts;
    categories = fetchedCategories.filter((c) => c.count > 0);
    tags = fetchedTags.filter((t) => t.count > 0);
  } catch (err) {
    console.error("Failed to load blog listing data:", err);
  }

  return (
    <>
      <BlogListingLayout
        initialPosts={posts}
        categories={categories}
        tags={tags}
        activeCategoryId={activeCategoryId}
        activeTagId={activeTagId}
      />
      <FaqSection
        faqs={blogFaqs}
        title="Articles FAQ"
        description="Questions about browsing our archive, topic taxonomy, and syndication."
      />
    </>
  );
}

