import { NewConversion } from "@/components/cv-studio/NewConversion";
import { PageHeader } from "@/components/cv-studio/PageHeader";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function NewConversionPage() {
  await requireDemoSession();
  return (
    <div className="mx-auto max-w-[1280px]">
      <PageHeader
        description="Zet een kandidaat-cv om naar een professioneel opgemaakte Bluefin-cv. Volg de stappen hieronder, het is zo geregeld."
        title="Nieuwe conversie"
      />
      <NewConversion />
    </div>
  );
}
