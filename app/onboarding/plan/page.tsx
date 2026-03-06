"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Zap } from "lucide-react";
import { useState } from "react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { OnboardingProgress } from "@/components/onboarding/progress";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "small",
    tier: "Small Business",
    price: 150,
    perDay: "~$4.93",
    badge: null,
    description: "Perfect for small storefronts, salons, and single-unit retail.",
    includes: ["Banner cleaning", "Window cleaning", "Concrete & sidewalk"],
    highlight: false,
  },
  {
    id: "medium",
    tier: "Medium Business",
    price: 250,
    perDay: "~$8.22",
    badge: "Most Popular",
    description: "Ideal for restaurants, barbershops, and high-traffic businesses.",
    includes: ["Banner cleaning", "Window cleaning", "Concrete & sidewalk", "Priority scheduling", "Monthly report"],
    highlight: true,
  },
  {
    id: "large",
    tier: "Large / Restaurant",
    price: null,
    perDay: null,
    badge: "Most Comprehensive",
    description: "Custom pricing for large storefronts, restaurants, and multi-unit properties.",
    includes: ["Everything in Medium", "Extended coverage area", "Dedicated tech", "Flexible frequency", "Account manager"],
    highlight: false,
  },
];

const FREQUENCIES = [
  { id: "monthly", label: "Monthly", sub: "1× per month", saving: null },
  { id: "biweekly", label: "Bi-Weekly", sub: "2× per month", saving: "Most frequent" },
  { id: "bimonthly", label: "Bi-Monthly", sub: "Every other month", saving: "Lower cost" },
];

export default function PlanPage() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [selectedId, setSelectedId] = useState(data.planId || "medium");
  const [frequency, setFrequency] = useState(data.frequency || "monthly");

  const selectedPlan = PLANS.find(p => p.id === selectedId)!;

  const handleContinue = () => {
    updateData({
      plan: selectedPlan.tier,
      planId: selectedId,
      planPrice: selectedPlan.price,
      frequency,
    });
    router.push("/onboarding/payment");
  };

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={3} />

      <div className="mb-7">
        <h2 className="font-display text-2xl font-700 text-gray-900 mb-1.5">Choose your plan</h2>
        <p className="text-gray-500 text-sm">All plans include banner, window, and sidewalk cleaning every visit.</p>
      </div>

      {/* Plan cards */}
      <div className="space-y-3 mb-6">
        {PLANS.map((plan) => {
          const isSelected = selectedId === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedId(plan.id)}
              className={cn(
                "w-full text-left rounded-2xl p-4 transition-all duration-200 relative overflow-hidden",
                isSelected ? "ring-2 ring-[#3A9AFF]" : "hover:border-[#B3D3FF]"
              )}
              style={isSelected ? {
                background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)",
                border: "2px solid #3A9AFF",
                boxShadow: "0 4px 20px rgba(58,154,255,0.15)",
              } : {
                background: "white",
                border: "1.5px solid #D9EAFF",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                  style={plan.highlight ? {
                    background: "linear-gradient(135deg, #3A9AFF, #1A7EF5)",
                    color: "white",
                  } : {
                    background: "#F0FDF4",
                    color: "#16A34A",
                    border: "1px solid #BBF7D0",
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <div className="flex items-start gap-3 pr-24">
                {/* Radio circle */}
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={isSelected ? {
                    borderColor: "#3A9AFF",
                    background: "#3A9AFF",
                  } : {
                    borderColor: "#D9EAFF",
                    background: "white",
                  }}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-base">{plan.tier}</span>
                    {plan.price ? (
                      <span className="text-sm text-gray-500">
                        <span className="font-bold text-gray-900 text-lg">${plan.price}</span>
                        <span>/mo</span>
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-[#3A9AFF]">Contact for quote</span>
                    )}
                    {plan.perDay && (
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                        {plan.perDay}/day
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 mb-2">{plan.description}</p>

                  {/* Includes */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {plan.includes.map(item => (
                      <span key={item} className="flex items-center gap-1 text-xs text-gray-600">
                        <Check className="w-3 h-3 text-[#22C55E]" strokeWidth={3} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Frequency selector */}
      <div
        className="bg-white rounded-2xl p-4 mb-6"
        style={{ border: "1px solid #D9EAFF" }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Visit Frequency</p>
        <div className="grid grid-cols-3 gap-2">
          {FREQUENCIES.map(f => {
            const isActive = frequency === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFrequency(f.id)}
                className="py-3 px-2 rounded-xl text-center transition-all duration-200 border"
                style={isActive ? {
                  background: "#EEF5FF",
                  borderColor: "#3A9AFF",
                } : {
                  background: "#F8FBFF",
                  borderColor: "#D9EAFF",
                }}
              >
                <p className={cn("text-sm font-bold", isActive ? "text-[#1A7EF5]" : "text-gray-700")}>
                  {f.label}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">{f.sub}</p>
                {f.saving && (
                  <span className={cn(
                    "text-[9px] font-bold mt-1 inline-block px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-[#3A9AFF] text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    {f.saving}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary bar */}
      {selectedPlan.price && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5"
          style={{ background: "#EEF5FF", border: "1px solid #C5DCFF" }}
        >
          <Zap className="w-4 h-4 text-[#3A9AFF] flex-shrink-0" />
          <p className="text-sm text-gray-700 flex-1">
            <span className="font-bold text-[#1A7EF5]">{selectedPlan.tier}</span>
            {" · "}
            <span className="font-semibold">${selectedPlan.price}/mo</span>
            {" · "}
            {FREQUENCIES.find(f => f.id === frequency)?.label}
          </p>
        </div>
      )}

      {/* Nav */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/onboarding/verify")}
          className="flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-semibold text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="btn-blue-glow flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-semibold text-base transition-all"
          style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
        >
          Continue to Payment
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
