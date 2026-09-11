import { notFound, permanentRedirect } from "next/navigation";

export default async function LocalizedAutoSourcerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang === "nl") permanentRedirect("/hoe-het-werkt");
  if (lang === "en") permanentRedirect("/en/how-it-works");
  notFound();
}
