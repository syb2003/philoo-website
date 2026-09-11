import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScoutDemoPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("demo", "en");
export default async function DemoPage({ params }: { params: Promise<{ lang: string }> }) { if ((await params).lang !== "en") notFound(); return <ScoutDemoPage lang="en" />; }
