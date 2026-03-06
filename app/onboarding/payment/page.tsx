"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, CreditCard, ShieldCheck, Tag, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { OnboardingProgress } from "@/components/onboarding/progress";

const FREQ_LABELS: Record<string, string> = {
  monthly: "Monthly",
  biweekly: "Bi-Weekly",
  bimonthly: "Bi-Monthly",
};

export default function PaymentPage() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [promoCode, setPromoCode] = useState(data.promoCode);
  const [agreed, setAgreed] = useState(data.agreedToTerms);
  const [loading, setLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  const price = data.planPrice ?? 0;
  const isLargePlan = !data.planPrice;

  const handleApplyPromo = () => {
    if (promoCode.trim()) setPromoApplied(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    updateData({ promoCode, agreedToTerms: agreed });
    await new Promise(r => setTimeout(r, 1400));
    router.push("/onboarding/done");
  };

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={4} />

      <div className="mb-7">
        <h2 className="font-display text-2xl font-700 text-gray-900 mb-1.5">Almost there</h2>
        <p className="text-gray-500 text-sm">Set up your payment method to activate your plan.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order summary */}
        <div
          className="bg-white rounded-2xl p-5"
          style={{ border: "1px solid #D9EAFF", boxShadow: "0 2px 16px rgba(58,154,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF]">Order Summary</span>
            <div className="flex-1 h-px bg-[#E2EEFF]" />
          </div>

          <div className="space-y-2.5">
            <Row label="Plan" value={data.plan || "—"} />
            <Row label="Frequency" value={FREQ_LABELS[data.frequency] || data.frequency} />
            {!isLargePlan && (
              <>
                <Row label="Monthly amount" value={`$${price}/month`} bold />
                <Row label="Per day" value={`~$${(price / 30.4).toFixed(2)}/day`} muted />
                <div className="border-t border-[#E2EEFF] pt-2.5 mt-1">
                  <Row label="Due today" value={`$${price}.00`} bold highlight />
                </div>
              </>
            )}
            {isLargePlan && (
              <div className="mt-2 p-3 rounded-xl text-sm text-[#1A7EF5] font-medium" style={{ background: "#EEF5FF", border: "1px solid #C5DCFF" }}>
                Your custom quote will be confirmed by our team within 24 hours.
              </div>
            )}
          </div>

          {promoApplied && (
            <div className="flex items-center gap-2 mt-3 p-2.5 rounded-xl text-xs font-semibold text-green-700" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Promo code applied!
            </div>
          )}
        </div>

        {/* Promo code */}
        <div
          className="bg-white rounded-2xl p-4"
          style={{ border: "1px solid #D9EAFF" }}
        >
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
            <Tag className="w-3.5 h-3.5 text-[#3A9AFF]" />
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              className="input-base flex-1"
              placeholder="Enter code (optional)"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#D9EAFF] text-[#3A9AFF] hover:bg-[#EEF5FF] transition-all"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Payment card placeholder */}
        <div
          className="bg-white rounded-2xl p-5 space-y-4"
          style={{ border: "1px solid #D9EAFF", boxShadow: "0 2px 16px rgba(58,154,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF]">Payment Method</span>
            <div className="flex-1 h-px bg-[#E2EEFF]" />
            <Lock className="w-3 h-3 text-gray-400" />
          </div>

          {/* Mock Stripe card UI */}
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Card number</label>
            <div className="input-base flex items-center gap-2" style={{ cursor: "not-allowed", opacity: 0.7 }}>
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">•••• •••• •••• ••••</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Expiry</label>
              <div className="input-base text-gray-400 text-sm" style={{ cursor: "not-allowed", opacity: 0.7 }}>MM / YY</div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">CVC</label>
              <div className="input-base text-gray-400 text-sm" style={{ cursor: "not-allowed", opacity: 0.7 }}>•••</div>
            </div>
          </div>

          <div
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
            style={{ background: "#F8FBFF", border: "1px solid #E2EEFF" }}
          >
            <ShieldCheck className="w-4 h-4 text-[#3A9AFF] flex-shrink-0" />
            <p className="text-xs text-gray-500">
              Payments are secured by <span className="font-semibold text-gray-700">Stripe</span>. FreshFront never stores your card details.
            </p>
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
            style={agreed ? {
              background: "linear-gradient(135deg, #3A9AFF, #1A7EF5)",
              borderColor: "#3A9AFF",
            } : {
              borderColor: "#D9EAFF",
              background: "white",
            }}
            onClick={() => setAgreed(!agreed)}
          >
            {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
          </div>
          <span className="text-xs text-gray-500 leading-relaxed">
            I agree to FreshFront&apos;s{" "}
            <span className="text-[#3A9AFF] underline cursor-pointer">terms of service</span>
            {" "}including the{" "}
            <span className="font-semibold text-gray-700">7-day cancellation policy</span>.
            No long-term contracts — cancel anytime with 7 days notice.
          </span>
        </label>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 py-2">
          {["No contracts", "Cancel anytime", "Secure checkout"].map(t => (
            <span key={t} className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
              <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
              {t}
            </span>
          ))}
        </div>

        {/* Nav */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => router.push("/onboarding/plan")}
            className="flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-semibold text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="submit"
            disabled={!agreed || loading}
            className="btn-blue-glow flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Setting up your account…
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Complete Setup
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
      <span
        className={`text-sm ${bold ? "font-bold" : "font-medium"} ${highlight ? "text-[#1A7EF5]" : muted ? "text-gray-400" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
