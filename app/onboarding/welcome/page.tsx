"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Leaf, ArrowRight } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding-provider";

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#3A9AFF", "#1A7EF5", "#93C5FD", "#FCD34D", "#60A5FA", "#F472B6", "#A78BFA"];
    const pieces: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 2,
      size: 6 + Math.random() * 8,
    }));
    setParticles(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const { data } = useOnboarding();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const businessName = data.businessName || "your business";
  const planName = data.plan || "Medium Business";
  const planPrice = data.planPrice ? `$${data.planPrice}` : "Custom";
  const frequency = data.frequency === "biweekly" ? "Bi-Weekly" : data.frequency === "bimonthly" ? "Bi-Monthly" : "Monthly";

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="animate-fade-up text-center max-w-lg mx-auto space-y-8 pt-4">
        <OnboardingProgress step={4} />

        {/* Success icon */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
              boxShadow: "0 12px 32px 0 rgba(58,154,255,0.45)",
            }}
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-700 text-gray-900 tracking-tight">
              Welcome to FreshFront,
              <br />
              <span className="text-[#3A9AFF]">{businessName}!</span>
            </h1>
            <p className="text-gray-500">
              Your account is all set. Here&apos;s a summary of your plan.
            </p>
          </div>
        </div>

        {/* Plan summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
            >
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{planName}</p>
              <p className="text-xs text-gray-500">FreshFront Service Plan</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Plan", value: planName },
              { label: "Frequency", value: frequency },
              { label: "Monthly", value: planPrice },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#EEF5FF] rounded-xl p-3 space-y-1">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's next */}
        <div className="bg-[#EEF5FF] rounded-2xl p-6 text-left space-y-3">
          <p className="text-xs font-semibold text-[#1A7EF5] uppercase tracking-wide">What happens next</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            A FreshFront team member will visit you{" "}
            <span className="font-semibold text-gray-900">within 24 hours</span> to introduce themselves and
            walk you through everything before your first service.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/book")}
          className="btn-blue-glow w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all"
          style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
        >
          Go to My Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

function OnboardingProgress({ step }: { step: number }) {
  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium text-[#3A9AFF]">Step {step} of 4</span>
        <span>{step * 25}% complete</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3A9AFF] rounded-full transition-all duration-500"
          style={{ width: `${step * 25}%` }}
        />
      </div>
    </div>
  );
}
