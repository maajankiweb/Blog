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
  const siteUrl = "https://blog.maajankiwebtech.com";
  const canonicalUrl = `${siteUrl}/category/${slug}`;

  return {
    title: category ? `${category.name} | MJ Digital Category Archive` : "Category Archive | MJ Digital",
    description: category?.description || `Explore all technical guides and articles in our ${slug} category.`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: category ? `${category.name} | MJ Digital Category Archive` : "Category Archive | MJ Digital",
      description: category?.description || `Explore all technical guides and articles in our ${slug} category.`,
      url: canonicalUrl,
      type: "website",
    },
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

    // If no direct posts found under mapped category id, fallback to recent posts
    if (fetchedPosts && fetchedPosts.length > 0) {
      posts = fetchedPosts;
    } else {
      const fallbackAll = await getPosts({ perPage: 12 });
      posts = fallbackAll;
    }

    categories = fetchedCategories.filter((c) => c.count > 0);
    tags = fetchedTags.filter((t) => t.count > 0);
  } catch (err) {
    console.error("Failed to load category page data:", err);
  }

  const categoryJsonLd = {
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
            name: "Editorial Dispatches",
            item: "https://blog.maajankiwebtech.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `https://blog.maajankiwebtech.com/category/${slug}`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `https://blog.maajankiwebtech.com/category/${slug}#webpage`,
        url: `https://blog.maajankiwebtech.com/category/${slug}`,
        name: `${category.name} | MJ Digital Category Archive`,
        description: category.description || `Explore all technical guides in ${category.name}.`,
        publisher: {
          "@type": "Organization",
          name: "MJ Digital",
          url: "https://blog.maajankiwebtech.com",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
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

