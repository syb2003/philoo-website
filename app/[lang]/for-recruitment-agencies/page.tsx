import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScoutAgenciesPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("agencies", "en");
export default async function AgenciesPage({ params }: { params: Promise<{ lang: string }> }) { if ((await params).lang !== "en") notFound(); return <ScoutAgenciesPage lang="en" />; }
