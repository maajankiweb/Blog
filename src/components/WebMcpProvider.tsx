"use client";

import { useEffect } from "react";

/**
 * WebMCP Provider — Registers in-browser agent tools via navigator.modelContext.registerTool
 * Conforms to the Web Model Context Protocol specification for in-browser AI assistants and autonomous agents.
 */
export default function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as any;
    const modelContext = nav.modelContext || (window as any).modelContext;

    if (modelContext && typeof modelContext.registerTool === "function") {
      try {
        // Tool 1: Search Articles
        modelContext.registerTool({
          name: "search_articles",
          description: "Search blog articles, technical guides, and SEO tutorials on Maajanki WebTech",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Search query or keyword" },
            },
            required: ["query"],
          },
          execute: async ({ query }: { query: string }) => {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
            return JSON.stringify({
              success: true,
              message: `Navigating to search results for "${query}"`,
              url: `https://blog.maajankiwebtech.com/search?q=${encodeURIComponent(query)}`,
            });
          },
        });

        // Tool 2: Products and Pricing
        modelContext.registerTool({
          name: "get_products_and_pricing",
          description: "Get prices for digital products, Next.js templates, and development services",
          inputSchema: {
            type: "object",
            properties: {},
          },
          execute: async () => {
            return JSON.stringify({
              currency: "INR",
              products: [
                {
                  name: "Maajanki Pro Next.js 16 Blog Starter Kit",
                  price: "₹2,499",
                  regularPrice: "₹4,999",
                  category: "Templates",
                  url: "https://blog.maajankiwebtech.com/products",
                },
                {
                  name: "InvoBill GST & Freelancer Invoice Helper Plugin",
                  price: "₹1,499",
                  regularPrice: "₹2,999",
                  category: "Plugins",
                  url: "https://blog.maajankiwebtech.com/products",
                },
                {
                  name: "Custom Web App & Technical SEO Package",
                  price: "From ₹15,000",
                  category: "Agency Services",
                  url: "https://blog.maajankiwebtech.com/tools/website-cost-calculator",
                },
              ],
            });
          },
        });

        // Tool 3: Business Information
        modelContext.registerTool({
          name: "get_business_info",
          description: "Get verified contact details, headquarters address, phone, and leadership for Maajanki WebTech",
          inputSchema: {
            type: "object",
            properties: {},
          },
          execute: async () => {
            return JSON.stringify({
              name: "Maajanki WebTech Digital Agency",
              telephone: "+91-9006543913",
              email: "info@maajankiwebtech.com",
              address: "Bettiah, West Champaran, Bihar - 845438, India",
              founder: "Ashish Kumar",
              website: "https://blog.maajankiwebtech.com",
            });
          },
        });
      } catch (err) {
        console.debug("WebMCP registration note:", err);
      }
    }
  }, []);

  return null;
}
