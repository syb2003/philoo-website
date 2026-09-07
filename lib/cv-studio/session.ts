import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CV_STUDIO_LOGIN_PATH, CV_STUDIO_SESSION_COOKIE, getCvStudioServerConfig } from "@/lib/cv-studio/config";
import { verifyDemoSessionToken } from "@/lib/cv-studio/auth-core";

export async function getDemoSession() {
  const config = getCvStudioServerConfig();
  if (!config) return null;
  const token = (await cookies()).get(CV_STUDIO_SESSION_COOKIE)?.value;
  return verifyDemoSessionToken(token, config.sessionSecret);
}

export async function requireDemoSession() {
  const session = await getDemoSession();
  if (!session) redirect(CV_STUDIO_LOGIN_PATH);
  return session;
}
