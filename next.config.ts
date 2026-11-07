import type { NextConfig } from "next";

const securityHeaders = [
  // AI Agent Content Signals
  { key: "Content-Signal", value: "search=yes, ai-train=no" },
  // Universal Search Engine Indexing Directives (Google, Bing, AI Bots)
  { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
  // Prevent clickjacking — disallow site from being embedded in iframes
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing attacks
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Enforce HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Restrict access to browser APIs (camera, mic, geolocation)
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Basic Content Security Policy — tightened with YouTube & Razorpay frame permissions
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://www.youtube.com https://s.ytimg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https: http: https://i.ytimg.com https://*.ytimg.com https://*.youtube.com",
      "media-src 'self' https: data: blob:",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://player.vimeo.com https://api.razorpay.com https://checkout.razorpay.com",
      "child-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://api.razorpay.com https://checkout.razorpay.com",
      "connect-src 'self' https://blog.maajankiwebtech.com https://*.maajankiwebtech.com https://api.razorpay.com https://lumberjack.razorpay.com https://www.google-analytics.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.maajankiwebtech.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.maajankiwebtech.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "contribution.usercontent.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mjbytech.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.maajankiwebtech.com",
        pathname: "/**",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,

  // ── Security & Indexing Headers ───────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/cart",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/checkout",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/my-account/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/my-account",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  // ── Redirects ──────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/all-blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
