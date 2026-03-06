import { redirect } from "next/navigation";

// For testing: always show onboarding. Later switch to dynamic check (e.g. freshfront_onboarded).
export default function RootPage() {
  redirect("/onboarding/welcome");
}
