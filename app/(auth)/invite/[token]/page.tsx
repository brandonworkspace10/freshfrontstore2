"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Loader2, CheckCircle, XCircle } from "lucide-react";

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

export default function InvitePage({ params }: InvitePageProps) {
  const { token } = use(params);
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "valid" | "expired" | "used">("loading");

  useEffect(() => {
    const validate = async () => {
      await new Promise((r) => setTimeout(r, 1200));
      if (token === "expired") {
        setStatus("expired");
      } else if (token === "used") {
        setStatus("used");
      } else {
        setStatus("valid");
      }
    };
    validate();
  }, [token]);

  const handleAccept = () => {
    router.push("/onboarding/welcome");
  };

  if (status === "loading") {
    return (
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#3A9AFF] flex items-center justify-center shadow-lg shadow-green-200">
            <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-2xl font-700 text-gray-900">FreshFront</h1>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#3A9AFF]" />
          <p className="text-sm text-gray-500">Validating your invite link...</p>
        </div>
      </div>
    );
  }

  if (status === "expired" || status === "used") {
    return (
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#3A9AFF] flex items-center justify-center shadow-lg shadow-green-200">
            <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-2xl font-700 text-gray-900">FreshFront</h1>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
          <XCircle className="w-10 h-10 text-red-400 mx-auto" />
          <div className="space-y-1">
            <h2 className="font-display text-xl font-600 text-gray-900">
              {status === "expired" ? "Invite link expired" : "Invite already used"}
            </h2>
            <p className="text-sm text-gray-500">
              {status === "expired"
                ? "This invite link has expired after 48 hours. Please contact FreshFront for a new link."
                : "This invite link has already been used. Try signing in instead."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-2.5 rounded-xl bg-[#3A9AFF] hover:bg-[#1A7EF5] text-white font-medium text-sm transition-all"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[#3A9AFF] flex items-center justify-center shadow-lg shadow-green-200">
          <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-700 text-gray-900">FreshFront</h1>
          <p className="text-sm text-gray-500 mt-0.5">Customer HQ</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="flex flex-col items-center gap-3">
          <CheckCircle className="w-10 h-10 text-[#3A9AFF]" />
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-600 text-gray-900">
              You&apos;re invited!
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              The FreshFront team has approved your account.
              Let&apos;s get you set up in just a few minutes.
            </p>
          </div>
        </div>

        <div className="bg-[#EEF5FF] rounded-xl p-4 space-y-2 text-left">
          <p className="text-xs font-semibold text-[#1A7EF5] uppercase tracking-wide">What to expect</p>
          {["Choose your service plan", "Enter your business info", "Set up payment", "You're live!"].map((step, i) => (
            <div key={step} className="flex items-center gap-2.5 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-[#3A9AFF] text-white text-xs flex items-center justify-center font-semibold flex-shrink-0">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="w-full py-3 rounded-xl bg-[#3A9AFF] hover:bg-[#1A7EF5] text-white font-semibold text-sm transition-all shadow-sm"
        >
          Get Started →
        </button>

        <p className="text-xs text-gray-400">This invite link expires in 48 hours</p>
      </div>
    </div>
  );
}
