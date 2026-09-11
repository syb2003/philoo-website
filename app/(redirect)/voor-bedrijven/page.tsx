import type { Metadata } from "next";
import { ScoutCompaniesPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("companies", "nl");
export default function CompaniesPage() { return <ScoutCompaniesPage lang="nl" />; }
