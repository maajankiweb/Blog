const fs = require('fs');

const keywordClusters = [
  // Cluster 1: Website Development & Engineering
  {
    topic: "Website Development",
    cluster: "Website Development Services",
    primaryKeyword: "Website Development Company in India",
    supportingKeywords: "custom website development, Next.js web development, web development agency india",
    targetUrl: "https://blog.maajankiwebtech.com/blog/best-website-development-agency-india",
    intent: "Commercial / Informational",
    conversionCTA: "Custom Next.js & Full-Stack Website Development (https://www.maajankiwebtech.com/)"
  },
  {
    topic: "Local Web Development Bihar",
    cluster: "Website Development Services",
    primaryKeyword: "Website Development Services Near Me Bihar",
    supportingKeywords: "website development in Bagaha, website development in Bettiah, web developer Patna",
    targetUrl: "https://blog.maajankiwebtech.com/blog/website-development-services-near-me",
    intent: "Local Commercial",
    conversionCTA: "Local Business Website Package Bihar (https://www.maajankiwebtech.com/)"
  },
  {
    topic: "Website Pricing India",
    cluster: "Website Development Services",
    primaryKeyword: "Professional Business Website Cost in India",
    supportingKeywords: "website design cost india 2026, web development pricing, website budget for small business",
    targetUrl: "https://blog.maajankiwebtech.com/blog/professional-business-website-cost-india",
    intent: "Commercial Investigation",
    conversionCTA: "Website Cost Calculator Tool & Agency Quote (https://blog.maajankiwebtech.com/tools/website-cost-calculator)"
  },
  {
    topic: "Website vs Builder",
    cluster: "Website Development Services",
    primaryKeyword: "Web Development vs Website Builders",
    supportingKeywords: "custom code vs wix, wordpress vs shopify vs custom",
    targetUrl: "https://blog.maajankiwebtech.com/blog/web-development-vs-website-builders",
    intent: "Informational / Commercial",
    conversionCTA: "Consult with Maajanki Web Tech on Custom vs CMS Architecture"
  },
  {
    topic: "Website Launch Readiness",
    cluster: "Website Development Services",
    primaryKeyword: "Website Launch Checklist",
    supportingKeywords: "pre-launch website checklist, SEO launch audit 2026, google indexing checklist",
    targetUrl: "https://blog.maajankiwebtech.com/blog/website-launch-checklist",
    intent: "Informational / Educational",
    conversionCTA: "Audit & Launch Support Services by Maajanki Web Tech"
  },

  // Cluster 2: WordPress Development
  {
    topic: "WordPress Full Guide",
    cluster: "WordPress Development",
    primaryKeyword: "WordPress Website Development Services",
    supportingKeywords: "wordpress website in 2026, build wordpress site india, headless wordpress nextjs",
    targetUrl: "https://blog.maajankiwebtech.com/blog/wordpress-website-complete-guide-2026",
    intent: "Informational / Commercial",
    conversionCTA: "WordPress Custom Development & Headless Migration (https://www.maajankiwebtech.com/)"
  },
  {
    topic: "WordPress Tools Website",
    cluster: "WordPress Development",
    primaryKeyword: "How to Create a Tool Website in WordPress",
    supportingKeywords: "tool website script, build webmaster tools site, monetizing tool websites",
    targetUrl: "https://blog.maajankiwebtech.com/blog/how-to-create-a-tool-website",
    intent: "Informational / Commercial",
    conversionCTA: "ToolSuite Pro WordPress Plugin (https://blog.maajankiwebtech.com/products/toolsuite-pro-plugin)"
  },

  // Cluster 3: SEO and Local SEO
  {
    topic: "SEO Company India",
    cluster: "SEO and Local SEO",
    primaryKeyword: "Best SEO Company in India",
    supportingKeywords: "SEO services bihar, organic traffic growth, rank #1 google india",
    targetUrl: "https://blog.maajankiwebtech.com/blog/best-seo-company-in-india",
    intent: "Commercial / Transactional",
    conversionCTA: "SEO Growth Package by Maajanki Web Tech (https://www.maajankiwebtech.com/)"
  },
  {
    topic: "Google Indexing",
    cluster: "SEO and Local SEO",
    primaryKeyword: "How to Index Your Page in Google",
    supportingKeywords: "instant google indexing, google search console indexing fix, indexnow api",
    targetUrl: "https://blog.maajankiwebtech.com/blog/how-to-index-your-page-in-google",
    intent: "Informational",
    conversionCTA: "Free AI Schema Generator & Meta Tag Generator (https://blog.maajankiwebtech.com/tools)"
  },
  {
    topic: "SEO vs Paid Ads",
    cluster: "SEO and Local SEO",
    primaryKeyword: "SEO vs Paid Ads for Small Business",
    supportingKeywords: "google ads vs organic seo, roi seo vs ppc india",
    targetUrl: "https://blog.maajankiwebtech.com/blog/seo-vs-paid-ads",
    intent: "Commercial Investigation",
    conversionCTA: "Digital Marketing ROI Audit by Maajanki Web Tech"
  },
  {
    topic: "Local Business Growth",
    cluster: "SEO and Local SEO",
    primaryKeyword: "Local SEO Services for Small Businesses",
    supportingKeywords: "grow local business 2026, google business profile ranking, local seo bihar",
    targetUrl: "https://blog.maajankiwebtech.com/blog/how-to-grow-local-business-in-2026",
    intent: "Informational / Commercial",
    conversionCTA: "Local SEO & GMB Optimization Package"
  },

  // Cluster 4: Digital Marketing & Business
  {
    topic: "Digital Marketing Agency",
    cluster: "Digital Marketing",
    primaryKeyword: "Digital Marketing Agency in Bihar India",
    supportingKeywords: "what is digital marketing agency, performance marketing agency india",
    targetUrl: "https://blog.maajankiwebtech.com/blog/what-is-a-digital-marketing-agency",
    intent: "Informational / Commercial",
    conversionCTA: "Full-Funnel Digital Marketing Solutions (https://www.maajankiwebtech.com/)"
  },
  {
    topic: "Getting First 100 Customers",
    cluster: "Digital Marketing",
    primaryKeyword: "How to Get First 100 Customers Online",
    supportingKeywords: "customer acquisition digital marketing, lead generation india",
    targetUrl: "https://blog.maajankiwebtech.com/blog/get-your-first-100-customers-online",
    intent: "Informational / Practical",
    conversionCTA: "Lead Generation Landing Page Consultation"
  },
  {
    topic: "Landing Page vs Full Website",
    cluster: "Digital Marketing",
    primaryKeyword: "Landing Page vs Full Website for Leads",
    supportingKeywords: "high converting landing page, lead generation website design",
    targetUrl: "https://blog.maajankiwebtech.com/blog/landing-page-vs-full-website-leads",
    intent: "Commercial Investigation",
    conversionCTA: "High-Converting Landing Page Design Package"
  },

  // Cluster 5: Technical Tutorials & Billing
  {
    topic: "International Invoicing India",
    cluster: "Technical Tutorials and Website Performance",
    primaryKeyword: "How to Invoice International Clients from India",
    supportingKeywords: "GST invoice export of services, FIRC lut gst freelancer, freelancer billing india",
    targetUrl: "https://blog.maajankiwebtech.com/blog/invoice-international-clients-india",
    intent: "Informational / Practical",
    conversionCTA: "InvoBill GST Invoice Helper Plugin & Free GST Invoice Generator Tool"
  }
];

const csvRows = [
  [
    "Topic",
    "Content Cluster",
    "Primary Target Keyword",
    "Supporting Keywords",
    "Target URL",
    "Search Intent",
    "Recommended Conversion CTA"
  ]
];

for (const k of keywordClusters) {
  csvRows.push([
    `"${k.topic}"`,
    `"${k.cluster}"`,
    `"${k.primaryKeyword}"`,
    `"${k.supportingKeywords}"`,
    `"${k.targetUrl}"`,
    `"${k.intent}"`,
    `"${k.conversionCTA}"`
  ].join(','));
}

fs.writeFileSync('KEYWORD_MAPPING.csv', csvRows.join('\n'), 'utf8');
console.log('Successfully created KEYWORD_MAPPING.csv');
