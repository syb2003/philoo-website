import type { Metadata } from "next";
import { ScoutDemoPage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("demo", "nl");
export default function DemoPage() { return <ScoutDemoPage lang="nl" />; }
