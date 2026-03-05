"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, CreditCard, Lock, Tag, ChevronRight, Loader2 } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { frequencyOptions } from "@/lib/mock-data";
import { OnboardingProgress } from "../plan/page";

export default function PaymentPage() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const freq = frequencyOptions.find((f) => f.id === data.frequency);
  const basePrice = data.planPrice ?? 150;
  const displayPrice = data.planPrice
    ? `$${(basePrice * (freq?.multiplier ?? 1)).toFixed(0)}`
    : "Custom quote";
  const frequencyLabel = freq?.label ?? "Monthly";

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handleComplete = async () => {
    updateData({ promoCode, agreedToTerms: agreed });
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/onboarding/welcome");
  };

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={3} />

      <div className="space-y-2 mb-8">
        <h1 className="font-display text-3xl font-700 text-gray-900 tracking-tight">
          Set up payment
        </h1>
        <p className="text-gray-500">Secure payment powered by Stripe. Cancel anytime with 7 days notice.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Payment form */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stripe placeholder */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <CreditCard className="w-4 h-4 text-[#3A9AFF]" />
              Card details
            </div>

            <div className="space-y-3">
              <div className="h-11 rounded-xl border border-gray-200 bg-gray-50 flex items-center px-4">
                <span className="text-sm text-gray-400">Card number (Stripe integration)</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-11 rounded-xl border border-gray-200 bg-gray-50 flex items-center px-4">
                  <span className="text-sm text-gray-400">MM / YY</span>
                </div>
                <div className="h-11 rounded-xl border border-gray-200 bg-gray-50 flex items-center px-4">
                  <span className="text-sm text-gray-400">CVC</span>
                </div>
              </div>
              <div className="h-11 rounded-xl border border-gray-200 bg-gray-50 flex items-center px-4">
                <span className="text-sm text-gray-400">Name on card</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1">
              <Lock className="w-3 h-3" />
              Payments secured by Stripe
            </div>
          </div>

          {/* Promo code */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Tag className="w-4 h-4 text-[#3A9AFF]" />
              Promo code
            </div>
            {promoApplied ? (
              <div className="flex items-center gap-2 text-sm text-[#3A9AFF] font-medium bg-[#EEF5FF] rounded-xl px-4 py-2.5">
                ✓ WELCOME10 applied — 10% off first month
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setPromoError("");
                  }}
                  placeholder="Enter code"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all uppercase"
                />
                <button
                  type="button"
                  onClick={handlePromo}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-all"
                >
                  Apply
                </button>
              </div>
            )}
            {promoError && <p className="text-xs text-red-500 mt-1.5">{promoError}</p>}
          </div>

          {/* Terms */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    agreed ? "bg-[#3A9AFF] border-[#3A9AFF]" : "border-gray-300 group-hover:border-[#3A9AFF]/50"
                  }`}
                >
                  {agreed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                I agree to FreshFront&apos;s{" "}
                <span className="text-[#3A9AFF] font-medium underline cursor-pointer">terms of service</span>{" "}
                including the 7-day cancellation policy.
              </p>
            </label>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 sticky top-6">
            <h3 className="font-semibold text-gray-900 text-sm">Order summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{data.plan || "Service Plan"}</span>
                <span className="font-semibold text-gray-900">{displayPrice}/mo</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Frequency</span>
                <span>{frequencyLabel}</span>
              </div>
              {data.businessName && (
                <div className="flex justify-between text-gray-500">
                  <span>Business</span>
                  <span className="text-right max-w-28 truncate">{data.businessName}</span>
                </div>
              )}
              {promoApplied && (
                <div className="flex justify-between text-[#3A9AFF] font-medium">
                  <span>Promo (WELCOME10)</span>
                  <span>−10%</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
              <span>Due today</span>
              <span className="font-display text-xl text-[#3A9AFF]">{displayPrice}</span>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Billed {frequencyLabel.toLowerCase()} · Cancel anytime
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => router.push("/onboarding/business")}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handleComplete}
          disabled={!agreed || isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3A9AFF] hover:bg-[#1A7EF5] text-white font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Setting up your account...
            </>
          ) : (
            <>
              Complete Setup
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
