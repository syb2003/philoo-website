import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScoutHowItWorksPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("howItWorks", "en");
export default async function HowItWorksPage({ params }: { params: Promise<{ lang: string }> }) { if ((await params).lang !== "en") notFound(); return <ScoutHowItWorksPage lang="en" />; }
