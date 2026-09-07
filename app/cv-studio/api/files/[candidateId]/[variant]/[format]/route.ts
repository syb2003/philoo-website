import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDemoOutputAsset } from "@/lib/cv-studio/demo-manifest";
import { isCvStudioDemoEnabled } from "@/lib/cv-studio/config";
import { getDemoSession } from "@/lib/cv-studio/session";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ candidateId: string; variant: string; format: string }> },
) {
  if (!isCvStudioDemoEnabled()) return new Response(null, { status: 404 });
  if (!(await getDemoSession())) return new Response("Niet ingelogd", { status: 401 });

  const { candidateId, variant, format } = await params;
  const asset = getDemoOutputAsset(candidateId, variant, format);
  if (!asset) return new Response(null, { status: 404 });

  const filePath = join(process.cwd(), "private", "cv-studio-demo", asset.fileName);

  try {
    const file = await readFile(filePath);
    const inline = format === "pdf" && new URL(request.url).searchParams.get("disposition") === "inline";
    const disposition = inline ? "inline" : "attachment";

    return new Response(new Uint8Array(file), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `${disposition}; filename="${asset.fileName}"`,
        "Content-Length": String(file.byteLength),
        "Content-Type": asset.mimeType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Bestand niet beschikbaar", { status: 404 });
  }
}
