"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, Star } from "lucide-react";
import { mockPlans, frequencyOptions } from "@/lib/mock-data";
import { useOnboarding } from "@/providers/onboarding-provider";

function OnboardingProgress({ step }: { step: number }) {
  return (
    <div className="mb-8 space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium text-[#3A9AFF]">Step {step} of 4</span>
        <span>{step * 25}% complete</span>
      </div>
      <div className="w-full h-2 bg-[#E2EEFF] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${step * 25}%`,
            background: "linear-gradient(90deg, #3A9AFF 0%, #1A7EF5 100%)",
            boxShadow: "0 0 8px rgba(58,154,255,0.5)",
          }}
        />
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        {["Plan", "Business Info", "Payment", "Welcome"].map((label, i) => (
          <div key={label} className="flex items-center gap-1.5 flex-1">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all ${
                i + 1 < step
                  ? "bg-[#3A9AFF] text-white"
                  : i + 1 === step
                  ? "bg-[#3A9AFF] text-white ring-4 ring-[#3A9AFF]/20"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1 < step ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i + 1 === step ? "text-gray-900 font-medium" : "text-gray-400"}`}>
              {label}
            </span>
            {i < 3 && <div className="flex-1 h-px bg-gray-100 hidden sm:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export { OnboardingProgress };

export default function PlanPage() {
  const router = useRouter();
  const { updateData } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("monthly");

  const canContinue = selectedPlan !== "";

  const handleContinue = () => {
    const plan = mockPlans.find((p) => p.id === selectedPlan);
    updateData({
      plan: plan?.name ?? "",
      planPrice: plan?.price ?? null,
      frequency: selectedFrequency,
    });
    router.push("/onboarding/business");
  };

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={1} />

      <div className="space-y-2 mb-8">
        <h1 className="font-display text-3xl font-700 text-gray-900 tracking-tight">
          Pick your plan
        </h1>
        <p className="text-gray-500">
          Choose the service level that fits your business. You can always upgrade later.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {mockPlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => !plan.contactForQuote && setSelectedPlan(plan.id)}
            className={`relative text-left rounded-2xl border-2 p-5 transition-all hover:shadow-md ${
              selectedPlan === plan.id
                ? "border-[#3A9AFF] bg-[#EEF5FF] shadow-md"
                : "border-gray-100 bg-white hover:border-gray-200"
            } ${plan.contactForQuote ? "cursor-default" : "cursor-pointer"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="flex items-center gap-1 text-white text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
                    boxShadow: "0 2px 8px rgba(58,154,255,0.4)",
                  }}
                >
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <h3 className="font-display text-lg font-600 text-gray-900">{plan.name}</h3>
                <p className="text-2xl font-display font-700 text-[#3A9AFF] mt-1">
                  {plan.perMonth}
                </p>
              </div>

              <p className="text-xs text-gray-500">{plan.ideal}</p>

              <div className="space-y-1.5 pt-1">
                {plan.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#3A9AFF] flex-shrink-0" />
                    <span className="text-xs text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              {plan.contactForQuote && (
                <span className="inline-block text-xs text-[#3A9AFF] font-medium border border-[#3A9AFF]/30 rounded-full px-2.5 py-0.5 mt-1">
                  Contact for quote
                </span>
              )}

              {selectedPlan === plan.id && (
                <div className="flex items-center gap-1.5 text-xs text-[#3A9AFF] font-medium pt-1">
                  <Check className="w-3.5 h-3.5" />
                  Selected
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Frequency Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Service frequency</h3>
        <div className="grid grid-cols-3 gap-2">
          {frequencyOptions.map((freq) => (
            <button
              key={freq.id}
              type="button"
              onClick={() => setSelectedFrequency(freq.id)}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                selectedFrequency === freq.id
                  ? "bg-[#3A9AFF] text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {freq.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
        className="btn-blue-glow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        style={canContinue ? { background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" } : { background: "#E2EEFF", color: "#93C5FD", cursor: "not-allowed" }}
      >
        {canContinue ? "Continue to Business Info" : "Select a plan to continue"}
        {canContinue && <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
