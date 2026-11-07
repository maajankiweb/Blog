import type { Metadata } from "next";
import { getPosts, getCategories, getTags } from "@/lib/wordpress";
import { getProducts } from "@/lib/wordpress/products";
import BlogListingLayout from "@/components/BlogListingLayout";
import FaqSection, { FAQItem } from "@/components/FaqSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Editorial Dispatches & Articles | MJ Digital",
  description:
    "Explore in-depth technical guides on Next.js 16, headless WordPress, SEO algorithms, AI automations, and digital business strategies.",
  alternates: {
    canonical: "https://blog.maajankiwebtech.com/blog",
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
    title: "Editorial Dispatches & Articles | MJ Digital",
    description:
      "Explore in-depth technical guides on Next.js 16, headless WordPress, SEO algorithms, and digital business.",
    url: "https://blog.maajankiwebtech.com/blog",
    type: "website",
  },
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
  let latestProduct: any = null;

  try {
    const [fetchedPosts, fetchedCategories, fetchedTags, products] = await Promise.all([
      getPosts({
        category: activeCategoryId,
        tag: activeTagId,
        perPage: 20,
      }),
      getCategories({ perPage: 15 }),
      getTags({ perPage: 25 }),
      getProducts({ perPage: 1 }).catch(() => []),
    ]);

    posts = fetchedPosts;
    categories = fetchedCategories.filter((c) => c.count > 0);
    tags = fetchedTags.filter((t) => t.count > 0);
    latestProduct = products?.[0] || null;
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
        latestProduct={latestProduct}
      />
      <FaqSection
        faqs={blogFaqs}
        title="Articles FAQ"
        description="Questions about browsing our archive, topic taxonomy, and syndication."
      />
    </>
  );
}

