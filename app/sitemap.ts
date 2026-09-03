import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const pages = ["/", "/maatwerk", "/cv-studio", "/auto-sourcer", "/over", "/en", "/en/custom-software", "/en/cv-studio", "/en/auto-sourcer", "/en/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "/" || path === "/en" ? 1 : 0.8 }));
}
