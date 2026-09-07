export const CV_STUDIO_LOGIN_PATH = "/cv-studio";
export const CV_STUDIO_HOME_PATH = "/cv-studio/conversies/nieuw";
export const CV_STUDIO_SESSION_COOKIE = "philoo_cv_studio_demo";

export function isCvStudioDemoEnabled() {
  return process.env.CV_STUDIO_DEMO_ENABLED === "true";
}

export function getCvStudioDemoEmail() {
  return process.env.CV_STUDIO_DEMO_EMAIL?.trim().toLowerCase() || "wouter@bluefin.nl";
}

export function getCvStudioServerConfig() {
  const password = process.env.CV_STUDIO_DEMO_PASSWORD ?? "";
  const sessionSecret = process.env.CV_STUDIO_DEMO_SESSION_SECRET ?? "";

  if (!password || sessionSecret.length < 32) return null;

  return {
    email: getCvStudioDemoEmail(),
    password,
    sessionSecret,
  };
}
