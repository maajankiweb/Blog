import { getPosts, cleanHtmlText } from "@/lib/wordpress";
import { getProducts } from "@/lib/wordpress/products";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const siteUrl = "https://blog.maajankiwebtech.com";

  let posts: any[] = [];
  let products: any[] = [];

  try {
    const [fetchedPosts, fetchedProducts] = await Promise.all([
      getPosts({ perPage: 30 }),
      getProducts(),
    ]);
    posts = fetchedPosts || [];
    products = fetchedProducts || [];
  } catch (err) {
    console.error("RSS feed fetch error:", err);
  }

  const buildDate = new Date().toUTCString();

  const postItems = posts
    .map((post) => {
      const title = cleanHtmlText(post.title?.rendered || "Untitled Post");
      const link = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const description = cleanHtmlText(post.excerpt?.rendered || "").slice(0, 300);
      const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Software Architecture";

      return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${category}]]></category>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join("");

  const productItems = products
    .slice(0, 15)
    .map((product) => {
      const link = `${siteUrl}/products/${product.slug}`;
      const pubDate = new Date(product.dateCreated || new Date()).toUTCString();
      const description = (product.shortDescription || product.description || "").slice(0, 200);

      return `
    <item>
      <title><![CDATA[${product.name} (Digital Product)]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${product.category || "Digital Products"}]]></category>
      <description><![CDATA[${description} - Available on MJ Digital Store.]]></description>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MJ Digital Blog | Digital Growth, Technical SEO &amp; Software Architecture</title>
    <link>${siteUrl}/</link>
    <description>Practical, actionable insights on SEO, digital marketing, and software architecture from MJ Digital.</description>
    <language>en-in</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${postItems}
    ${productItems}
  </channel>
</rss>`;

  return new Response(rssXml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200",
      "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
  });
}
