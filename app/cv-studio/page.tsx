import { LoginScreen } from "@/components/cv-studio/LoginScreen";
import { redirect } from "next/navigation";
import { CV_STUDIO_HOME_PATH, getCvStudioDemoEmail } from "@/lib/cv-studio/config";
import { getDemoSession } from "@/lib/cv-studio/session";

export default async function CvStudioLoginPage() {
  if (await getDemoSession()) redirect(CV_STUDIO_HOME_PATH);
  return <LoginScreen email={getCvStudioDemoEmail()} />;
}
