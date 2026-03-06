import { redirect } from "next/navigation";

// This step has been replaced by /onboarding/verify
export default function BusinessPage() {
  redirect("/onboarding/verify");
}
