const fs = require('fs');

const internalLinks = [
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/website-launch-checklist",
    targetUrl: "https://blog.maajankiwebtech.com/tools/website-cost-calculator",
    anchorText: "website cost calculator",
    context: "Under technical budgeting and pre-launch planning"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/website-launch-checklist",
    targetUrl: "https://blog.maajankiwebtech.com/blog/how-to-index-your-page-in-google",
    anchorText: "step-by-step Google indexing guide",
    context: "Under search engine visibility and sitemap submission steps"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/website-development-services-near-me",
    targetUrl: "https://www.maajankiwebtech.com/",
    anchorText: "Maajanki Web Tech LLP",
    context: "Official company website for businesses in Bihar, Bagaha, and Bettiah"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/professional-business-website-cost-india",
    targetUrl: "https://blog.maajankiwebtech.com/tools/website-cost-calculator",
    anchorText: "free instant website cost calculator",
    context: "Direct conversion tool embed inside pricing analysis"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/how-to-index-your-page-in-google",
    targetUrl: "https://blog.maajankiwebtech.com/tools/ai-schema-generator",
    anchorText: "AI Schema Generator tool",
    context: "Under structured data implementation to speed up crawling"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/how-to-index-your-page-in-google",
    targetUrl: "https://blog.maajankiwebtech.com/tools/meta-tag-generator",
    anchorText: "meta tag generator tool",
    context: "Under meta robots and indexing tags checklist"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/landing-page-vs-full-website-leads",
    targetUrl: "https://www.maajankiwebtech.com/",
    anchorText: "custom landing page design services",
    context: "Under conversion rate optimization recommendation"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/invoice-international-clients-india",
    targetUrl: "https://blog.maajankiwebtech.com/tools/gst-invoice-generator",
    anchorText: "online GST Invoice generator",
    context: "Under SAC code 998314 and 18% GST calculation section"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/how-to-create-a-tool-website",
    targetUrl: "https://blog.maajankiwebtech.com/products/toolsuite-pro-plugin",
    anchorText: "ToolSuite Pro WordPress Plugin",
    context: "Recommended plugin for deploying 50+ tools in WordPress"
  },
  {
    sourceUrl: "https://blog.maajankiwebtech.com/blog/wordpress-website-complete-guide-2026",
    targetUrl: "https://www.maajankiwebtech.com/",
    anchorText: "professional WordPress development agency",
    context: "Closing consultation and agency development support"
  }
];

const csvRows = [
  ["Source URL", "Target URL", "Recommended Anchor Text", "Contextual Placement"]
];

for (const link of internalLinks) {
  csvRows.push([
    `"${link.sourceUrl}"`,
    `"${link.targetUrl}"`,
    `"${link.anchorText}"`,
    `"${link.context}"`
  ].join(','));
}

fs.writeFileSync('INTERNAL_LINKING_PLAN.csv', csvRows.join('\n'), 'utf8');
console.log('Successfully created INTERNAL_LINKING_PLAN.csv');
