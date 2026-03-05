"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { boroughs, businessTypes } from "@/lib/mock-data";
import { OnboardingProgress } from "../plan/page";

const contactMethods = ["Call", "Text", "Email"];

export default function BusinessPage() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const [businessName, setBusinessName] = useState(data.businessName);
  const [businessAddress, setBusinessAddress] = useState(data.businessAddress);
  const [borough, setBorough] = useState(data.borough);
  const [businessType, setBusinessType] = useState(data.businessType);
  const [phone, setPhone] = useState(data.phone);
  const [preferredContact, setPreferredContact] = useState(data.preferredContact || "Text");

  const canContinue =
    businessName && businessAddress && borough && businessType && phone;

  const handleContinue = () => {
    updateData({ businessName, businessAddress, borough, businessType, phone, preferredContact });
    router.push("/onboarding/payment");
  };

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all";

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={2} />

      <div className="space-y-2 mb-8">
        <h1 className="font-display text-3xl font-700 text-gray-900 tracking-tight">
          Your business
        </h1>
        <p className="text-gray-500">Tell us about the location we&apos;ll be servicing.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Business name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Metro Cuts Barbershop"
            className={inputCls}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Business address</label>
          <input
            type="text"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            placeholder="Street address"
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Borough</label>
            <select
              value={borough}
              onChange={(e) => setBorough(e.target.value)}
              className={`${inputCls} appearance-none`}
            >
              <option value="">Select borough</option>
              {boroughs.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Business type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className={`${inputCls} appearance-none`}
            >
              <option value="">Select type</option>
              {businessTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Phone number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(212) 555-0100"
            className={inputCls}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Preferred contact method</label>
          <div className="flex gap-2">
            {contactMethods.map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPreferredContact(method)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  preferredContact === method
                    ? "bg-[#3A9AFF] text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => router.push("/onboarding/plan")}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3A9AFF] hover:bg-[#1A7EF5] text-white font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          Continue to Payment
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
