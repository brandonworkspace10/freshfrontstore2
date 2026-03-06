"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, MobileTabBar } from "@/components/portal/sidebar";
import { Topbar } from "@/components/portal/topbar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const onboarded = localStorage.getItem("freshfront_onboarded");
    if (onboarded !== "true") {
      router.replace("/onboarding/welcome");
    }
  }, [router]);

  return (
    <div className="min-h-screen" style={{ background: "#F4F8FF" }}>
      <Sidebar />
      <MobileTabBar />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
