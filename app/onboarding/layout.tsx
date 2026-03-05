import { Leaf } from "lucide-react";
import { OnboardingProvider } from "@/providers/onboarding-provider";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg, #EEF5FF 0%, #F5F9FF 50%, #E8F2FF 100%)" }}
      >
        {/* Header */}
        <header className="px-6 py-5 flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
            >
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-base font-600 text-gray-900">FreshFront</span>
          </div>
          <span className="text-xs text-gray-400">First impressions, every month.</span>
        </header>

        {/* Content */}
        <main className="px-4 pb-12 max-w-3xl mx-auto">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  );
}
