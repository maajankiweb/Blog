import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'ClaudeBot', 'PerplexityBot', 'Bytespider'],
        allow: '/',
      },
    ],
    sitemap: 'https://blog.maajankiwebtech.com/sitemap.xml',
    host: 'https://blog.maajankiwebtech.com',
  };
}
