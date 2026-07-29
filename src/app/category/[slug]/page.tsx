import { getPosts, getCategories, getTags, getCategoryBySlug } from "@/lib/wordpress";
import BlogListingLayout from "@/components/BlogListingLayout";
import FaqSection from "@/components/FaqSection";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  return {
    title: category ? `${category.name} | Category Archive` : "Category Archive",
    description: category?.description || `Explore all posts in our ${slug} archives.`,
  };
}

export default async function CategoryArchivePage(props: PageProps) {
  const { slug } = await props.params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  let posts: any[] = [];
  let categories: any[] = [];
  let tags: any[] = [];

  try {
    const [fetchedPosts, fetchedCategories, fetchedTags] = await Promise.all([
      getPosts({
        category: category.id,
        perPage: 12,
      }),
      getCategories({ perPage: 15 }),
      getTags({ perPage: 25 }),
    ]);

    posts = fetchedPosts;
    categories = fetchedCategories.filter((c) => c.count > 0);
    tags = fetchedTags.filter((t) => t.count > 0);
  } catch (err) {
    console.error("Failed to load category page data:", err);
  }

  return (
    <>
      <BlogListingLayout
        initialPosts={posts}
        categories={categories}
        tags={tags}
        activeCategoryId={category.id}
      />
      <FaqSection
        faqs={[
          {
            question: `What topics are covered in the ${category.name} category?`,
            answer: `Our ${category.name} section features technical deep dives, tutorials, architectural case studies, and industry trends focused on ${category.name.toLowerCase()}.`,
          },
          {
            question: `How often are new ${category.name} articles published?`,
            answer: `New articles in ${category.name} are published regularly as part of our weekly Tuesday and Thursday editorial schedule.`,
          },
          {
            question: `Can I filter ${category.name} articles by specific sub-tags?`,
            answer: `Yes, you can use the tag cloud on this page to filter ${category.name} articles by specific sub-topics and tools.`,
          },
          {
            question: "How can I suggest a topic for this category?",
            answer: "We welcome reader suggestions! Feel free to pitch topics or request coverage via our contact desk.",
          },
        ]}
        title={`${category.name} Category FAQ`}
        description={`Frequently asked questions about our ${category.name} publications and coverage.`}
      />
    </>
  );
}

