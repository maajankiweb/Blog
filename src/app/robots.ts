import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://blog.maajankiwebtech.com';

  const disallowList = ['/api/', '/_next/', '/cart', '/checkout', '/my-account'];

  return {
    rules: [
      // Standard search engine crawlers (Google, Bing, Yahoo, DuckDuckGo)
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowList,
      },
      // Google (Googlebot, Mobile, News, Image, Other, AI Gemini)
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Google-Extended',
          'GoogleOther',
        ],
        allow: '/',
        disallow: disallowList,
      },
      // Microsoft Bing & IndexNow crawlers
      {
        userAgent: ['Bingbot', 'msnbot', 'BingPreview'],
        allow: '/',
        disallow: disallowList,
      },
      // OpenAI ChatGPT crawler & Search Agent
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'],
        allow: '/',
        disallow: disallowList,
      },
      // Anthropic Claude Crawler & Web Agent
      {
        userAgent: ['ClaudeBot', 'anthropic-ai', 'Claude-Web'],
        allow: '/',
        disallow: disallowList,
      },
      // Perplexity AI Search Crawler
      {
        userAgent: ['PerplexityBot'],
        allow: '/',
        disallow: disallowList,
      },
      // Apple, Meta, Cohere, and other crawlers
      {
        userAgent: [
          'Applebot',
          'Applebot-Extended',
          'cohere-ai',
          'FacebookBot',
          'Bytespider',
          'CCBot',
          'YandexBot',
        ],
        allow: '/',
        disallow: disallowList,
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/feed.xml`,
    ],
    host: siteUrl,
  };
}
