import { getPosts, getCategories, getTags, getTagBySlug } from "@/lib/wordpress";
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
  const tag = await getTagBySlug(slug);
  return {
    title: tag ? `#${tag.name} | Tag Archive` : "Tag Archive",
    description: `Explore all articles tagged with #${tag?.name || slug}.`,
  };
}

export default async function TagArchivePage(props: PageProps) {
  const { slug } = await props.params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  let posts: any[] = [];
  let categories: any[] = [];
  let tags: any[] = [];

  try {
    const [fetchedPosts, fetchedCategories, fetchedTags] = await Promise.all([
      getPosts({
        tag: tag.id,
        perPage: 12,
      }),
      getCategories({ perPage: 15 }),
      getTags({ perPage: 25 }),
    ]);

    posts = fetchedPosts;
    categories = fetchedCategories.filter((c) => c.count > 0);
    tags = fetchedTags.filter((t) => t.count > 0);
  } catch (err) {
    console.error("Failed to load tag page data:", err);
  }

  return (
    <>
      <BlogListingLayout
        initialPosts={posts}
        categories={categories}
        tags={tags}
        activeTagId={tag.id}
      />
      <FaqSection
        faqs={[
          {
            question: `What articles are indexed under #${tag.name}?`,
            answer: `All articles tagged with #${tag.name} feature discussions, benchmarks, or tutorials directly related to ${tag.name}.`,
          },
          {
            question: `How are tags assigned to Editorial posts?`,
            answer: `Tags are assigned by our technical editors based on primary tools, frameworks, and architectural patterns discussed in each post.`,
          },
          {
            question: `Can I subscribe specifically to #${tag.name} updates?`,
            answer: "While topic feeds are available via RSS, our main email newsletter aggregates top stories across all tags weekly.",
          },
        ]}
        title={`#${tag.name} Tag Archive FAQ`}
        description={`Frequently asked questions about articles tagged with #${tag.name}.`}
      />
    </>
  );
}

