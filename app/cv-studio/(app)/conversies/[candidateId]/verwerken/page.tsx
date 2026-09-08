import { notFound } from "next/navigation";
import { ProcessingScreen } from "@/components/cv-studio/ProcessingScreen";
import { getDemoCandidate, isDemoVariant } from "@/lib/cv-studio/demo-manifest";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function ProcessingPage({
  params,
  searchParams,
}: {
  params: Promise<{ candidateId: string }>;
  searchParams: Promise<{ variant?: string | string[] }>;
}) {
  await requireDemoSession();
  const { candidateId } = await params;
  const candidate = getDemoCandidate(candidateId);
  if (!candidate) notFound();

  const variantValue = (await searchParams).variant;
  const variant = typeof variantValue === "string" && isDemoVariant(variantValue) ? variantValue : "named";
  return <ProcessingScreen candidate={candidate} variant={variant} />;
}
