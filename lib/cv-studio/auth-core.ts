import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const CV_STUDIO_SESSION_SUBJECT = "bluefin-demo";
export const CV_STUDIO_SESSION_TTL_SECONDS = 8 * 60 * 60;

export function getDemoSessionCookieOptions(production: boolean, expired = false) {
  return {
    httpOnly: true,
    secure: production,
    sameSite: "lax" as const,
    path: "/cv-studio",
    maxAge: expired ? 0 : CV_STUDIO_SESSION_TTL_SECONDS,
  };
}

export type CvStudioSessionPayload = {
  sub: typeof CV_STUDIO_SESSION_SUBJECT;
  exp: number;
};

function constantTimeEqual(left: string, right: string) {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function validateDemoCredentials(
  received: { email: string; password: string },
  expected: { email: string; password: string },
) {
  const emailMatches = constantTimeEqual(received.email.trim().toLowerCase(), expected.email.trim().toLowerCase());
  const passwordMatches = constantTimeEqual(received.password, expected.password);
  return emailMatches && passwordMatches;
}

export function createDemoSessionToken(secret: string, nowMs = Date.now()) {
  const payload: CvStudioSessionPayload = {
    sub: CV_STUDIO_SESSION_SUBJECT,
    exp: Math.floor(nowMs / 1000) + CV_STUDIO_SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyDemoSessionToken(token: string | undefined, secret: string, nowMs = Date.now()) {
  if (!token || !secret) return null;

  const [encodedPayload, receivedSignature, extra] = token.split(".");
  if (!encodedPayload || !receivedSignature || extra) return null;

  const expectedSignature = createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  if (!constantTimeEqual(receivedSignature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as Partial<CvStudioSessionPayload>;
    if (payload.sub !== CV_STUDIO_SESSION_SUBJECT || typeof payload.exp !== "number") return null;
    if (payload.exp <= Math.floor(nowMs / 1000)) return null;
    return payload as CvStudioSessionPayload;
  } catch {
    return null;
  }
}
