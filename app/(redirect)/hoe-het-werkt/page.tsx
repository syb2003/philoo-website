import type { Metadata } from "next";
import { ScoutHowItWorksPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("howItWorks", "nl");
export default function HowItWorksPage() { return <ScoutHowItWorksPage lang="nl" />; }
