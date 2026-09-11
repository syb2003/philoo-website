import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScoutCompaniesPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("companies", "en");
export default async function CompaniesPage({ params }: { params: Promise<{ lang: string }> }) { if ((await params).lang !== "en") notFound(); return <ScoutCompaniesPage lang="en" />; }
