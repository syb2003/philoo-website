import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const pages = [
  "/",
  "/hoe-het-werkt",
  "/voor-bedrijven",
  "/voor-recruitmentbureaus",
  "/over",
  "/demo",
  "/en",
  "/en/how-it-works",
  "/en/for-companies",
  "/en/for-recruitment-agencies",
  "/en/about",
  "/en/demo",
  "/maatwerk",
  "/en/custom-software",
  "/nl/cv-studio",
  "/en/cv-studio",
  "/nl/privacybeleid",
  "/en/privacy-policy",
  "/nl/algemene-voorwaarden",
  "/en/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "/" || path === "/en" ? 1 : 0.8 }));
}
