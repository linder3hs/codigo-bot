import type { MetadataRoute } from "next";
import { SITIO } from "@/bot.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITIO,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
