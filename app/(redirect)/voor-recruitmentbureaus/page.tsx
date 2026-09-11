import type { Metadata } from "next";
import { ScoutAgenciesPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("agencies", "nl");
export default function AgenciesPage() { return <ScoutAgenciesPage lang="nl" />; }
