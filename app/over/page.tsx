import type { Metadata } from "next";
import { ScoutAboutPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("about", "nl");
export default function OverPage() { return <ScoutAboutPage lang="nl" />; }
