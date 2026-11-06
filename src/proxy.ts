import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getHomepageMarkdown,
  getProductsMarkdown,
  getAboutMarkdown,
  getToolsMarkdown,
} from "./lib/markdown-representations";

const MCP_SERVER_CARD = {
  $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: "blog.maajankiwebtech.com",
  version: "1.0.0",
  description:
    "Maajanki WebTech & Blog Model Context Protocol (MCP) Server. Provides tools for technical SEO, article discovery, website cost calculation, and digital developer products.",
  endpoint: "https://blog.maajankiwebtech.com/api/mcp",
  url: "https://blog.maajankiwebtech.com/api/mcp",
  remotes: [
    {
      type: "streamable-http",
      url: "https://blog.maajankiwebtech.com/api/mcp",
    },
  ],
  capabilities: {
    tools: { listChanged: false },
    resources: { subscribe: false, listChanged: false },
    prompts: { listChanged: false },
  },
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") || "";

  // 0. Server Action DoS Shield (CVE-2026-94482 mitigation)
  // This application uses standard REST route handlers and does not expose server actions.
  if (request.headers.has("next-action")) {
    return new NextResponse("Server actions are not enabled on this deployment", { status: 403 });
  }

  // 1. Direct SEP-1649 MCP Server Card route handler
  if (
    pathname === "/.well-known/mcp/server-card.json" ||
    pathname === "/.well-known/mcp.json"
  ) {
    return NextResponse.json(MCP_SERVER_CARD, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Content-Signal": "search=yes, ai-train=no",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  // 2. Serve Markdown representations when an agent asks for it via Accept: text/markdown
  const asksForMarkdown =
    acceptHeader.includes("text/markdown") ||
    acceptHeader.includes("text/x-markdown");

  if (asksForMarkdown && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    let markdown = "";

    if (pathname === "/" || pathname === "") {
      markdown = getHomepageMarkdown();
    } else if (pathname.startsWith("/products")) {
      markdown = getProductsMarkdown();
    } else if (pathname.startsWith("/about")) {
      markdown = getAboutMarkdown();
    } else if (pathname.startsWith("/tools")) {
      markdown = getToolsMarkdown();
    } else {
      markdown = getHomepageMarkdown();
    }

    return new NextResponse(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Signal": "search=yes, ai-train=no",
        "Vary": "Accept",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  // 3. Normal pass-through with Content-Signal declared
  const response = NextResponse.next();
  response.headers.set("Content-Signal", "search=yes, ai-train=no");
  return response;
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, audio, video files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
