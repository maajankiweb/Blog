import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SERVER_INFO = {
  name: "blog.maajankiwebtech.com",
  version: "1.0.0",
};

const TOOLS = [
  {
    name: "search_articles",
    description: "Search blog articles and technical guides on Maajanki WebTech",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query or keyword" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_products_and_pricing",
    description: "Retrieve digital products, Next.js templates, and pricing packages in INR & USD",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Optional category filter" },
      },
    },
  },
  {
    name: "calculate_website_cost",
    description: "Calculate estimated website development cost in India based on scope and requirements",
    inputSchema: {
      type: "object",
      properties: {
        siteType: { type: "string", enum: ["business", "ecommerce", "custom", "blog"] },
        pages: { type: "number", description: "Approximate page count" },
      },
    },
  },
];

export async function GET() {
  return NextResponse.json({
    status: "ok",
    server: SERVER_INFO,
    protocol: "mcp",
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false },
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, method, params } = body;

    // Standard MCP JSON-RPC routing
    switch (method) {
      case "initialize":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            serverInfo: SERVER_INFO,
            capabilities: {
              tools: { listChanged: false },
              resources: { subscribe: false, listChanged: false },
              prompts: { listChanged: false },
            },
          },
        });

      case "ping":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {},
        });

      case "tools/list":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            tools: TOOLS,
          },
        });

      case "tools/call": {
        const toolName = params?.name;
        const args = params?.arguments || {};

        if (toolName === "search_articles") {
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: `Search results for "${args.query || ""}": https://blog.maajankiwebtech.com/search?q=${encodeURIComponent(args.query || "")}`,
                },
              ],
            },
          });
        }

        if (toolName === "get_products_and_pricing") {
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    currency: "INR",
                    products: [
                      {
                        name: "Maajanki Pro Next.js 16 Starter Kit",
                        price: "₹2,499",
                        url: "https://blog.maajankiwebtech.com/products",
                      },
                      {
                        name: "InvoBill GST & Freelancer Invoice Helper Plugin",
                        price: "₹1,499",
                        url: "https://blog.maajankiwebtech.com/products",
                      },
                      {
                        name: "Custom Web App & Technical SEO Package",
                        price: "From ₹15,000",
                        url: "https://blog.maajankiwebtech.com/tools/website-cost-calculator",
                      },
                    ],
                  }),
                },
              ],
            },
          });
        }

        if (toolName === "calculate_website_cost") {
          const base = args.siteType === "ecommerce" ? 35000 : 15000;
          const extra = Math.max(0, (args.pages || 5) - 5) * 1200;
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    estimatedCostINR: base + extra,
                    currency: "INR",
                    calculatorUrl: "https://blog.maajankiwebtech.com/tools/website-cost-calculator",
                  }),
                },
              ],
            },
          });
        }

        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Tool ${toolName} not found` },
        });
      }

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method ${method} not implemented` },
        });
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: { code: -32700, message: "Parse error", data: err?.message },
      },
      { status: 400 }
    );
  }
}
