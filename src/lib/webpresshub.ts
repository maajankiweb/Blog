import { WooDigitalProduct } from "./wordpress";

export async function fetchWebPressHubProducts(): Promise<WooDigitalProduct[]> {
  try {
    // 1. Attempt to fetch posts from WebPressHub REST API
    const res = await fetch("https://webpresshub.net/wp-json/wp/v2/posts?per_page=20&_embed=true", {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts) && posts.length > 0) {
        return posts.map((post: any, index: number) => {
          const title = post.title?.rendered?.replace(/<[^>]*>/g, "") || "WordPress Product";
          const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim() || "Premium WordPress plugin and template.";
          const mediaUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";

          // Classify category based on title keyword
          let category = "Plugins";
          if (title.toLowerCase().includes("template") || title.toLowerCase().includes("theme")) {
            category = "Templates";
          } else if (title.toLowerCase().includes("ai") || title.toLowerCase().includes("tool")) {
            category = "AI Tools";
          } else if (title.toLowerCase().includes("guide") || title.toLowerCase().includes("ebook")) {
            category = "Ebooks";
          }

          // Generate attractive INR price
          const priceInr = category === "Templates" ? "₹2,499" : category === "Plugins" ? "₹1,499" : "₹999";
          const regularPriceInr = category === "Templates" ? "₹4,999" : category === "Plugins" ? "₹2,999" : "₹1,999";

          return {
            id: 2000 + (post.id || index),
            name: title,
            slug: post.slug || `webpresshub-product-${index}`,
            category: category,
            price: priceInr,
            regularPrice: regularPriceInr,
            description: post.content?.rendered?.replace(/<[^>]*>/g, "") || excerpt,
            shortDescription: excerpt.slice(0, 120),
            featuredImage: mediaUrl,
            demoUrl: post.link || "https://webpresshub.net",
            downloadUrl: post.link || "https://webpresshub.net",
            badge: index % 2 === 0 ? "WEBPRESSHUB SYNC" : "TRENDING",
            rating: 4.9,
            salesCount: 120 + index * 15,
          };
        });
      }
    }
  } catch (err) {
    console.warn("Could not fetch remote products from webpresshub.net API:", err);
  }

  return [];
}
