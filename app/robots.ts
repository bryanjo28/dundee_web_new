import type { MetadataRoute } from "next";
import { absoluteUrl } from "./site";

// Required for `output: "export"`: the route must be explicitly static.
export const dynamic = "force-static";

// Single-page site with no private routes, so nothing needs to be disallowed.
// Never block /_next/ here: crawlers need those files to render the page.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Listed explicitly so the policy is easy to see and easy to reverse.
        // This is documentation, not extra permission: "*" already allows them.
        // To opt out of AI answers and training, change allow to disallow.
        userAgent: AI_CRAWLERS,
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
