import type { MetadataRoute } from "next"

import { caseStudies } from "@/content"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((item) => ({
      url: `${siteUrl}/work/${item.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]
}
