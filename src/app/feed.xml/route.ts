import { getPosts } from "@/lib/wordpress";

export async function GET() {
  const siteUrl = "https://blog.maajankiwebtech.com";

  let posts: any[] = [];
  try {
    posts = await getPosts({ perPage: 20 });
  } catch (err) {
    console.error("RSS feed post fetch error:", err);
  }

  const itemsXml = posts
    .map((post) => {
      const cleanTitle = post.title.rendered
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      const cleanExcerpt = post.excerpt.rendered
        .replace(/<[^>]*>/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")
        .trim();

      const pubDate = new Date(post.date).toUTCString();
      const postUrl = `${siteUrl}/blog/${post.slug}`;

      return `
    <item>
      <title>${cleanTitle}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cleanExcerpt}</description>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Maajanki Blog | Digital Growth, SEO &amp; Web Development</title>
    <link>${siteUrl}</link>
    <description>Practical, actionable insights on SEO, digital marketing, and web development for modern businesses.</description>
    <language>en-in</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
