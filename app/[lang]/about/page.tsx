import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScoutAboutPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("about", "en");
export default async function AboutRoute({ params }: { params: Promise<{ lang: string }> }) { if ((await params).lang !== "en") notFound(); return <ScoutAboutPage lang="en" />; }
