import { notFound } from "next/navigation";
import { ResultScreen } from "@/components/cv-studio/ResultScreen";
import { getDemoCandidate, isDemoVariant } from "@/lib/cv-studio/demo-manifest";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function ConversionResultPage({
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
  return <ResultScreen candidate={candidate} initialVariant={variant} />;
}
