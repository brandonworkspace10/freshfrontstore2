"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Calendar, MessageSquare, ArrowRight, Star } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { OnboardingProgress } from "@/components/onboarding/progress";

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  dur: number;
  size: number;
  shape: string;
}

const CONFETTI_COLORS = [
  "#3A9AFF", "#1A7EF5", "#7DB5FF", "#22C55E",
  "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4",
];

function makeParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: Math.random() * 2.5,
    dur: 2.5 + Math.random() * 2,
    size: 4 + Math.random() * 6,
    shape: Math.random() > 0.5 ? "rounded-full" : "rounded-sm",
  }));
}

export default function DonePage() {
  const router = useRouter();
  const { data } = useOnboarding();
  const [particles] = useState(() => makeParticles(55));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const FREQ_LABELS: Record<string, string> = {
    monthly: "Monthly",
    biweekly: "Bi-Weekly",
    bimonthly: "Bi-Monthly",
  };

  return (
    <div className="relative">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map(p => (
          <div
            key={p.id}
            className={`absolute ${p.shape}`}
            style={{
              left: `${p.x}%`,
              top: "-10px",
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: 0,
              animation: `confetti-fall ${p.dur}s ${p.delay}s ease-in forwards`,
            }}
          />
        ))}
      </div>

      <div
        className="relative z-20 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <OnboardingProgress step={5} />

        {/* Hero */}
        <div className="text-center space-y-5 mb-8">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
                  boxShadow: "0 8px 32px rgba(58,154,255,0.4), 0 0 0 8px rgba(58,154,255,0.12)",
                }}
              >
                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              {/* Pulse rings */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "rgba(58,154,255,0.2)", animationDuration: "1.5s" }}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#22C55E] mb-2">Setup complete</p>
            <h1 className="font-display text-3xl sm:text-4xl font-700 text-gray-900 tracking-tight leading-tight mb-3">
              You&apos;re in!
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm mx-auto">
              Welcome to FreshFront, <span className="font-bold text-gray-800">{data.businessName || "your business"}</span>.
              Your storefront is now in good hands.
            </p>
          </div>
        </div>

        {/* Plan summary card */}
        <div
          className="bg-white rounded-2xl p-5 mb-5"
          style={{
            border: "1px solid #D9EAFF",
            boxShadow: "0 4px 24px rgba(58,154,255,0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF]">Your Plan</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Plan</span>
              <span className="text-sm font-bold text-gray-900">{data.plan || "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Frequency</span>
              <span className="text-sm font-semibold text-gray-800">{FREQ_LABELS[data.frequency] || data.frequency}</span>
            </div>
            {data.planPrice && (
              <div className="flex items-center justify-between pt-2 border-t border-[#E2EEFF]">
                <span className="text-sm text-gray-500">Monthly amount</span>
                <span className="text-base font-bold text-[#1A7EF5]">${data.planPrice}/mo</span>
              </div>
            )}
          </div>
        </div>

        {/* What happens next */}
        <div
          className="rounded-2xl p-5 mb-6 space-y-3"
          style={{ background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)", border: "1px solid #C5DCFF" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF] mb-1">What happens next</p>
          {[
            {
              icon: Calendar,
              text: "A FreshFront team member will be in touch within 24 hours to schedule your first visit.",
            },
            {
              icon: MessageSquare,
              text: "You'll receive appointment confirmations and updates in your Messages tab.",
            },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "white", border: "1px solid #C5DCFF" }}
              >
                <Icon className="w-3.5 h-3.5 text-[#3A9AFF]" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("freshfront_onboarded", "true");
            router.push("/dashboard/book");
          }}
          className="btn-blue-glow w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-semibold text-base transition-all mb-3"
          style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
        >
          Go to My Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs text-gray-400">
          Questions? Message us anytime from your dashboard.
        </p>
      </div>
    </div>
  );
}
