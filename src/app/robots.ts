import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: "https://studioyounick.vercel.app/sitemap.xml",
  };
}
