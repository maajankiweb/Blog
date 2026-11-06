import { fetchWithTimeout } from "./client";

export interface HomepageDynamicConfig {
  hero: {
    badge: string;
    heading: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  announcement?: {
    enabled: boolean;
    text: string;
    link?: string;
  };
}

const DEFAULT_HOMEPAGE_CONFIG: HomepageDynamicConfig = {
  hero: {
    badge: "MAAJANKI WEB TECH LLP • FULL-STACK & SEO LEADERSHIP",
    heading: "Architecting Digital Authority & High-Performance Web Systems",
    description:
      "Deep technical insights, production Next.js blueprints, and proven SEO strategies for modern engineering teams and scaling businesses.",
    primaryCtaText: "Explore Digital Products",
    primaryCtaLink: "/products",
    secondaryCtaText: "Calculate Website Cost",
    secondaryCtaLink: "/tools/website-cost-calculator",
  },
  announcement: {
    enabled: true,
    text: "New: Explore our verified Next.js 16 & WordPress digital templates with instant download!",
    link: "/products",
  },
};

/**
 * Fetches dynamic homepage settings from WordPress (via dedicated page /wp-json/wp/v2/pages?slug=home-settings
 * or falls back safely to default agency configuration).
 */
export async function getHomepageConfig(): Promise<HomepageDynamicConfig> {
  try {
    const res = await fetchWithTimeout(
      "https://cms.maajankiwebtech.com/wp-json/wp/v2/pages?slug=home-settings",
      {
        next: { revalidate: 300, tags: ["homepage", "wordpress"] },
      },
      3000
    );

    if (res.ok) {
      const pages = await res.json();
      if (Array.isArray(pages) && pages.length > 0) {
        const page = pages[0];
        // If owner placed JSON or structured content in the WordPress page
        if (page.content?.rendered) {
          const rawText = page.content.rendered.replace(/<[^>]*>/g, "").trim();
          try {
            const parsed = JSON.parse(rawText);
            return {
              ...DEFAULT_HOMEPAGE_CONFIG,
              ...parsed,
              hero: { ...DEFAULT_HOMEPAGE_CONFIG.hero, ...(parsed.hero || {}) },
            };
          } catch {
            // Not raw JSON, use title & excerpt
            return {
              ...DEFAULT_HOMEPAGE_CONFIG,
              hero: {
                ...DEFAULT_HOMEPAGE_CONFIG.hero,
                heading: page.title?.rendered || DEFAULT_HOMEPAGE_CONFIG.hero.heading,
                description: page.excerpt?.rendered?.replace(/<[^>]*>/g, "").trim() || DEFAULT_HOMEPAGE_CONFIG.hero.description,
              },
            };
          }
        }
      }
    }
  } catch (err) {
    // Resilient fallback to default configuration
  }

  return DEFAULT_HOMEPAGE_CONFIG;
}
