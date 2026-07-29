import { getPosts, getCategories } from "@/lib/wordpress";
import SearchListingLayout from "@/components/SearchListingLayout";
import FaqSection, { FAQItem } from "@/components/FaqSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: SearchParams;
}

export const metadata = {
  title: "Search Results | Editorial",
  description: "Search results from our curated technology and design archives.",
};

const searchFaqs: FAQItem[] = [
  {
    question: "How does the search engine match articles?",
    answer: "Our search matches query terms against article titles, excerpts, body text, categories, and tags.",
  },
  {
    question: "What if no results are found for my search query?",
    answer: "Try using broader keywords or explore our category chips on the homepage and blog archive.",
  },
  {
    question: "Can I filter search results by date or author?",
    answer: "Currently, search results are ordered by keyword relevance and publication date.",
  },
  {
    question: "Does the search support exact phrase matching?",
    answer: "Yes, wrapping your terms in quotation marks forces exact-phrase matching across title and content.",
  },
];

export default async function SearchPage(props: PageProps) {
  // Await searchParams in Next.js 15+
  const searchParams = await props.searchParams;
  const queryParam = searchParams.q;
  const query = typeof queryParam === "string" ? queryParam : "";

  let posts: any[] = [];
  let categories: any[] = [];

  try {
    const [fetchedPosts, fetchedCategories] = await Promise.all([
      getPosts({
        search: query || undefined,
        perPage: 20,
      }),
      getCategories({ perPage: 15 }),
    ]);

    posts = fetchedPosts;
    categories = fetchedCategories.filter((c) => c.count > 0);
  } catch (err) {
    console.error("Failed to load search page data:", err);
  }

  return (
    <>
      <SearchListingLayout
        query={query}
        initialPosts={posts}
        categories={categories}
      />
      <FaqSection
        faqs={searchFaqs}
        title="Search FAQ"
        description="Tips on refining your search and finding specific technical topics."
      />
    </>
  );
}

