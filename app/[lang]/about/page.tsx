import { notFound, permanentRedirect } from "next/navigation";

export default async function AboutRoute({ params }: { params: Promise<{ lang: string }> }) {
  if ((await params).lang !== "en") notFound();
  permanentRedirect("/en#contact");
}
