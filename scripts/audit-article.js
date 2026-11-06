const https = require('https');

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

async function auditArticle() {
  console.log("=== INSPECTING ARTICLE: website-launch-checklist ===");
  const posts = await fetchJson('https://cms.maajankiwebtech.com/wp-json/wp/v2/posts?slug=website-launch-checklist');
  if (Array.isArray(posts) && posts.length > 0) {
    const p = posts[0];
    console.log("Title:", p.title?.rendered);
    console.log("Author ID:", p.author);
    const content = p.content?.rendered || "";
    
    // Check for "InvoBill. inin"
    const hasTypo = content.includes("InvoBill. inin") || content.includes(". inin");
    console.log("Contains 'InvoBill. inin' or '. inin' typo:", hasTypo);
    if (hasTypo) {
      const matchIdx = content.indexOf(". inin");
      console.log("Snippet around typo:", content.slice(Math.max(0, matchIdx - 50), matchIdx + 60));
    }

    // Check checklist numbering
    const checklistMatches = content.match(/<h[234][^>]*>.*?<\/h[234]>/gi) || [];
    console.log("Total Headings:", checklistMatches.length);
    console.log("Sample Headings:", checklistMatches.slice(0, 10));
  } else {
    console.log("Post not found:", posts);
  }
}

auditArticle().catch(console.error);
