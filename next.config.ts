import type { NextConfig } from "next";

const securityHeaders = [
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
  // Basic Content Security Policy — tighten further once stable
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // tighten after removing inline scripts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "connect-src 'self' https://blog.maajankiwebtech.com https://*.maajankiwebtech.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
    ],
  },
  compress: true,
  poweredByHeader: false,

  // ── Security Headers ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
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
    ];
  },
};

export default nextConfig;
