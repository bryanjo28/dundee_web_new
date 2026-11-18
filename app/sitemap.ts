import type { MetadataRoute } from "next";
import { absoluteUrl, homeImages, locationPage, menuPage, siteUrl } from "./site";
import { menuImages } from "./menu-items";

// Required for `output: "export"`: the route must be explicitly static.
export const dynamic = "force-static";

const unique = (paths: string[]) => [...new Set(paths)].map(absoluteUrl);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: unique(homeImages),
    },
    {
      url: absoluteUrl(menuPage.path),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: unique(menuImages),
    },
    {
      url: absoluteUrl(locationPage.path),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
