import type { ReactNode } from "react";
import { AppShell } from "@/components/cv-studio/AppShell";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function CvStudioAppLayout({ children }: { children: ReactNode }) {
  await requireDemoSession();
  return <AppShell>{children}</AppShell>;
}
