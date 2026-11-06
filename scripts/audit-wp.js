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

async function inspectWP() {
  console.log("=== INSPECTING CMS (https://cms.maajankiwebtech.com/wp-json/) ===");
  const root = await fetchJson('https://cms.maajankiwebtech.com/wp-json/');
  console.log('Site Name:', root.name);
  console.log('Site URL:', root.url);
  console.log('Description:', root.description);
  console.log('Namespaces:', root.namespaces);

  const posts = await fetchJson('https://cms.maajankiwebtech.com/wp-json/wp/v2/posts?per_page=100');
  console.log('Total published posts:', Array.isArray(posts) ? posts.length : 'error');
  if (Array.isArray(posts)) {
    posts.forEach((p, idx) => {
      console.log(`${idx + 1}. [ID: ${p.id}] Slug: ${p.slug} | Date: ${p.date} | Title: ${p.title?.rendered}`);
    });
  }

  const users = await fetchJson('https://cms.maajankiwebtech.com/wp-json/wp/v2/users');
  console.log('Authors/Users:', Array.isArray(users) ? users.map(u => ({ id: u.id, name: u.name, slug: u.slug })) : users);

  const categories = await fetchJson('https://cms.maajankiwebtech.com/wp-json/wp/v2/categories?per_page=100');
  console.log('Categories:', Array.isArray(categories) ? categories.map(c => ({ id: c.id, name: c.name, slug: c.slug, count: c.count })) : categories);
}

inspectWP().catch(console.error);
