import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://blog.maajankiwebtech.com';

  return {
    rules: [
      // Standard search engine crawlers (Google, Bing, Yahoo, DuckDuckGo)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/cart', '/checkout'],
      },
      // OpenAI ChatGPT crawler & Search Agent
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/cart', '/checkout'],
      },
      // Google Gemini, Vertex AI & Search Generative Experience
      {
        userAgent: ['Google-Extended', 'GoogleOther', 'Googlebot'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/cart', '/checkout'],
      },
      // Anthropic Claude Crawler & Web Agent
      {
        userAgent: ['ClaudeBot', 'anthropic-ai', 'Claude-Web'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/cart', '/checkout'],
      },
      // Perplexity AI Search Crawler
      {
        userAgent: ['PerplexityBot'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/cart', '/checkout'],
      },
      // Cohere, Meta & Mistral Web Crawlers
      {
        userAgent: ['cohere-ai', 'FacebookBot', 'Bytespider', 'CCBot'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/cart', '/checkout'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
