import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/site/AboutPage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = { title: "About Philoo | Recruitment Software", description: "Philoo builds software, AI and automation for recruiters and recruitment agencies. Learn more about our focus and approach.", alternates: { canonical: "/en/about", languages: { nl: "/over", en: "/en/about" } }, ...socialMetadata("About Philoo | Recruitment Software", "Philoo builds software, AI and automation for recruiters and recruitment agencies. Learn more about our focus and approach.", "/en/about", "en_GB") };
export default async function AboutRoute({ params }: { params: Promise<{ lang: string }> }) { if ((await params).lang !== "en") notFound(); return <AboutPage lang="en" />; }
