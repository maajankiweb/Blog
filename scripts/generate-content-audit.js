const https = require('https');
const fs = require('fs');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          resolve({ error: e.message, status: res.statusCode, raw: data.slice(0, 300) });
        }
      });
    }).on('error', reject);
  });
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function auditAllPosts() {
  console.log("Crawling all posts from WordPress REST API...");
  const posts = await fetchJson('https://cms.maajankiwebtech.com/wp-json/wp/v2/posts?per_page=100');
  if (!Array.isArray(posts)) {
    console.error("Failed to fetch posts:", posts);
    return;
  }

  const csvRows = [
    [
      "Article Title",
      "URL",
      "Slug",
      "Publication Date",
      "Last Updated",
      "Word Count",
      "Headings (H2/H3)",
      "Target Keyword Hint",
      "Content Quality Issues",
      "Recommended Action"
    ]
  ];

  for (const post of posts) {
    const rawContent = post.content?.rendered || '';
    const plainText = stripHtml(rawContent);
    const words = plainText.split(/\s+/).filter(w => w.length > 0).length;
    const headingsCount = (rawContent.match(/<h[23][^>]*>/gi) || []).length;
    
    // Check specific issues
    const issues = [];
    if (words < 600) issues.push("Thin Content (<600 words)");
    if (headingsCount < 3) issues.push("Low heading structure");
    if (rawContent.includes(". inin") || rawContent.includes("InvoBill. inin")) {
      issues.push("Typo found: 'invobill. inin'");
    }
    if (post.slug.includes("nba-youngboy") || post.slug.includes("realme-p4") || post.slug.includes("zerogpt-premium-account") || post.slug.includes("get-free-chatgpt-premium-access")) {
      issues.push("Off-topic/niche mismatch with Core Agency Services");
    }

    let recommended = "Maintain & update internally with target service CTAs";
    if (issues.some(i => i.includes("Typo"))) {
      recommended = "Fix typographical error in WordPress content editor";
    } else if (issues.some(i => i.includes("Off-topic"))) {
      recommended = "Review relevance to core Web Tech & SEO services; add canonical/disclaimer or pivot to tech guide";
    } else if (issues.some(i => i.includes("Thin Content"))) {
      recommended = "Expand with actionable examples, practical screenshots and FAQ schema";
    }

    const row = [
      `"${(post.title?.rendered || '').replace(/"/g, '""')}"`,
      `"https://blog.maajankiwebtech.com/blog/${post.slug}"`,
      `"${post.slug}"`,
      `"${post.date}"`,
      `"${post.modified}"`,
      words,
      headingsCount,
      `"${post.slug.replace(/-/g, ' ')}"`,
      `"${issues.join('; ') || 'None detected'}"`,
      `"${recommended}"`
    ];
    csvRows.push(row.join(','));
  }

  fs.writeFileSync('CONTENT_AUDIT.csv', csvRows.join('\n'), 'utf8');
  console.log(`Successfully generated CONTENT_AUDIT.csv with ${posts.length} articles!`);
}

auditAllPosts().catch(console.error);
