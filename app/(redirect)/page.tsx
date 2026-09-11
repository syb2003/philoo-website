import type { Metadata } from "next";
import { ScoutHomePage } from "@/components/scout/ScoutPages";
import { scoutMetadata } from "@/lib/scout-metadata";

export const metadata: Metadata = scoutMetadata("home", "nl");

export default function RootRedirectPage() {
  return <ScoutHomePage lang="nl" />;
}
