import { Leaf } from "lucide-react";
import { OnboardingProvider } from "@/providers/onboarding-provider";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #EEF5FF 0%, #F8FBFF 50%, #E8F2FF 100%)" }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(58,154,255,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(26,126,245,0.06) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
        />

        {/* Header */}
        <header className="relative z-10 px-6 py-5 flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
            >
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-display text-sm font-600 text-gray-900 leading-none">FreshFront</span>
              <p className="text-[10px] text-[#6B8DBF] font-medium">Account Setup</p>
            </div>
          </div>
          <span className="text-xs text-[#6B8DBF] font-medium hidden sm:block">First impressions, every month.</span>
        </header>

        {/* Content */}
        <main className="relative z-10 px-4 pb-16 max-w-2xl mx-auto">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  );
}
