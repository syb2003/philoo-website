import { NextResponse } from "next/server";
import { createDemoSessionToken, getDemoSessionCookieOptions, validateDemoCredentials } from "@/lib/cv-studio/auth-core";
import { CV_STUDIO_SESSION_COOKIE, getCvStudioServerConfig, isCvStudioDemoEnabled } from "@/lib/cv-studio/config";

export async function POST(request: Request) {
  if (!isCvStudioDemoEnabled()) return new Response(null, { status: 404 });

  const config = getCvStudioServerConfig();
  if (!config) {
    return NextResponse.json({ error: "De demo is tijdelijk niet beschikbaar." }, { status: 503 });
  }

  let credentials: { email?: unknown; password?: unknown };
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Controleer je e-mailadres en wachtwoord." }, { status: 400 });
  }

  if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
    return NextResponse.json({ error: "Controleer je e-mailadres en wachtwoord." }, { status: 400 });
  }

  const isValid = validateDemoCredentials(
    { email: credentials.email, password: credentials.password },
    { email: config.email, password: config.password },
  );

  if (!isValid) {
    return NextResponse.json({ error: "E-mailadres of wachtwoord is niet juist." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    CV_STUDIO_SESSION_COOKIE,
    createDemoSessionToken(config.sessionSecret),
    getDemoSessionCookieOptions(process.env.NODE_ENV === "production"),
  );
  return response;
}

export async function DELETE() {
  if (!isCvStudioDemoEnabled()) return new Response(null, { status: 404 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    CV_STUDIO_SESSION_COOKIE,
    "",
    getDemoSessionCookieOptions(process.env.NODE_ENV === "production", true),
  );
  return response;
}
