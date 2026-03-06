"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Clock, Sparkles, Users } from "lucide-react";
import { mockQualifiedLead } from "@/lib/mock-data";
import { OnboardingProgress } from "@/components/onboarding/progress";

const steps = [
  { icon: ShieldCheck, label: "Confirm your info", sub: "Pre-filled from your inquiry" },
  { icon: Sparkles, label: "Pick your plan", sub: "Monthly, bi-weekly, or bi-monthly" },
  { icon: Clock, label: "Set up payment", sub: "Secure checkout via Stripe" },
];

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={1} />

      {/* Hero */}
      <div className="text-center space-y-5 mb-8">
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF]">
            You&apos;re approved ✓
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-700 text-gray-900 tracking-tight leading-tight">
            Welcome to FreshFront,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
            >
              {mockQualifiedLead.businessName}!
            </span>
          </h1>
          <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
            Let&apos;s get you set up in about{" "}
            <span className="font-semibold text-gray-700">3 minutes</span> — then your storefront
            is in good hands every month.
          </p>
        </div>

        {/* Approved-by badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
          style={{ background: "#EEF5FF", border: "1px solid #C5DCFF", color: "#1A7EF5" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          Your spot was reserved by {mockQualifiedLead.approvedBy} on {mockQualifiedLead.qualifiedAt}
        </div>
      </div>

      {/* Steps preview */}
      <div
        className="bg-white rounded-2xl p-5 mb-6 space-y-1"
        style={{ border: "1px solid #D9EAFF", boxShadow: "0 2px 16px rgba(58,154,255,0.07)" }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What happens next</p>
        {steps.map(({ icon: Icon, label, sub }, i) => (
          <div key={label} className="flex items-center gap-3 py-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)", border: "1px solid #C5DCFF" }}
            >
              <Icon className="w-4 h-4 text-[#3A9AFF]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3A9AFF, #1A7EF5)" }}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div className="flex items-center justify-center gap-2 mb-8 text-xs text-gray-500">
        <Users className="w-3.5 h-3.5 text-[#3A9AFF]" />
        Join <span className="font-semibold text-gray-700">200+ NYC businesses</span> keeping their storefronts fresh every month
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => router.push("/onboarding/verify")}
        className="btn-blue-glow w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-semibold text-base transition-all"
        style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
      >
        Set Up My Account
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        No commitment required until step 4
      </p>
    </div>
  );
}
