const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'blog_all_content.json');
const posts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
	xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:wp="http://wordpress.org/export/1.2/"
>
<channel>
	<title>Maajanki Blog Complete Backup with Media</title>
	<link>https://cms.maajankiwebtech.com</link>
	<description>WordPress Backup Export with Images</description>
	<pubDate>Sun, 02 Aug 2026 18:40:00 +0000</pubDate>
	<language>en-US</language>
	<wp:wxr_version>1.2</wp:wxr_version>
`;

let mediaIdCounter = 90000;

posts.forEach(post => {
  const title = post.title ? post.title.rendered : '';
  const content = post.content ? post.content.rendered : '';
  const excerpt = post.excerpt ? post.excerpt.rendered : '';
  const slug = post.slug || '';
  const date = post.date || new Date().toISOString();
  const id = post.id || Math.floor(Math.random() * 10000);

  // Check for featured image attachment in _embedded
  let featuredMediaObj = null;
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    featuredMediaObj = post._embedded['wp:featuredmedia'][0];
  }

  let mediaId = null;
  if (featuredMediaObj && featuredMediaObj.source_url) {
    mediaId = featuredMediaObj.id || mediaIdCounter++;
    const mediaUrl = featuredMediaObj.source_url;
    const mediaTitle = featuredMediaObj.title ? featuredMediaObj.title.rendered : title;
    
    // Add Attachment Item to XML
    xml += `
	<item>
		<title><![CDATA[${mediaTitle}]]></title>
		<link>${mediaUrl}</link>
		<pubDate>${new Date(date).toUTCString()}</pubDate>
		<dc:creator><![CDATA[Ashish Kumar]]></dc:creator>
		<guid isPermaLink="false">${mediaUrl}</guid>
		<description></description>
		<content:encoded><![CDATA[]]></content:encoded>
		<excerpt:encoded><![CDATA[]]></excerpt:encoded>
		<wp:post_id>${mediaId}</wp:post_id>
		<wp:post_date><![CDATA[${date.replace('T', ' ')}]]></wp:post_date>
		<wp:post_date_gmt><![CDATA[${date.replace('T', ' ')}]]></wp:post_date_gmt>
		<wp:comment_status><![CDATA[open]]></wp:comment_status>
		<wp:ping_status><![CDATA[closed]]></wp:ping_status>
		<wp:post_name><![CDATA[media-${mediaId}]]></wp:post_name>
		<wp:status><![CDATA[inherit]]></wp:status>
		<wp:post_parent>${id}</wp:post_parent>
		<wp:menu_order>0</wp:menu_order>
		<wp:post_type><![CDATA[attachment]]></wp:post_type>
		<wp:attachment_url><![CDATA[${mediaUrl}]]></wp:attachment_url>
	</item>
`;
  }

  // Add Post Item to XML
  xml += `
	<item>
		<title><![CDATA[${title}]]></title>
		<link>https://cms.maajankiwebtech.com/${slug}/</link>
		<pubDate>${new Date(date).toUTCString()}</pubDate>
		<dc:creator><![CDATA[Ashish Kumar]]></dc:creator>
		<guid isPermaLink="false">https://cms.maajankiwebtech.com/?p=${id}</guid>
		<description></description>
		<content:encoded><![CDATA[${content}]]></content:encoded>
		<excerpt:encoded><![CDATA[${excerpt}]]></excerpt:encoded>
		<wp:post_id>${id}</wp:post_id>
		<wp:post_date><![CDATA[${date.replace('T', ' ')}]]></wp:post_date>
		<wp:post_date_gmt><![CDATA[${date.replace('T', ' ')}]]></wp:post_date_gmt>
		<wp:comment_status><![CDATA[open]]></wp:comment_status>
		<wp:ping_status><![CDATA[open]]></wp:ping_status>
		<wp:post_name><![CDATA[${slug}]]></wp:post_name>
		<wp:status><![CDATA[publish]]></wp:status>
		<wp:post_parent>0</wp:post_parent>
		<wp:menu_order>0</wp:menu_order>
		<wp:post_type><![CDATA[post]]></wp:post_type>
		<wp:post_password><![CDATA[]]></wp:post_password>
		<wp:is_sticky>0</wp:is_sticky>
		${mediaId ? `<wp:postmeta><wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key><wp:meta_value><![CDATA[${mediaId}]]></wp:meta_value></wp:postmeta>` : ''}
	</item>
`;
});

xml += `
</channel>
</rss>`;

const outputPath = path.join(__dirname, 'public', 'wordpress_export_backup.xml');
fs.writeFileSync(outputPath, xml);
console.log(`Updated XML export with Featured Images generated at ${outputPath}!`);
