import type { MetadataRoute } from "next";
import { getThoughts } from "@/lib/content";
import { siteConfig } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const thoughts = getThoughts().map((thought) => ({
    url: `${siteConfig.url}/thoughts/${thought.slug}`,
    lastModified: new Date(thought.date),
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    ...thoughts,
  ];
}
