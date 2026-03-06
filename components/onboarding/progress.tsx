"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, label: "Welcome" },
  { n: 2, label: "Your Info" },
  { n: 3, label: "Plan" },
  { n: 4, label: "Payment" },
  { n: 5, label: "Done" },
];

export function OnboardingProgress({ step }: { step: number }) {
  const pct = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="mb-8 space-y-4">
      {/* Step dots */}
      <div className="flex items-center gap-0">
        {STEPS.map(({ n, label }, i) => {
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 relative">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    done
                      ? "text-white"
                      : active
                      ? "text-white ring-4 ring-[#3A9AFF]/20"
                      : "bg-gray-100 text-gray-400"
                  )}
                  style={done || active ? {
                    background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
                    boxShadow: active ? "0 0 0 4px rgba(58,154,255,0.15)" : undefined,
                  } : undefined}
                >
                  {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : n}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-semibold whitespace-nowrap hidden sm:block",
                    active ? "text-[#1A7EF5]" : done ? "text-gray-500" : "text-gray-400"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 rounded-full overflow-hidden bg-gray-100 mb-5 sm:mb-6">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{
                      width: done ? "100%" : "0%",
                      background: "linear-gradient(90deg, #3A9AFF, #1A7EF5)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span className="font-semibold text-[#3A9AFF]">Step {step} of {STEPS.length}</span>
          <span>{pct}% complete</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#E2EEFF] overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #3A9AFF, #1A7EF5)",
              boxShadow: "0 0 8px rgba(58,154,255,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
