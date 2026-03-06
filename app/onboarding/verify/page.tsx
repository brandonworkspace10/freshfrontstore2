"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, FileCheck, Pencil } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { OnboardingProgress } from "@/components/onboarding/progress";

const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"];
const BUSINESS_TYPES = ["Restaurant", "Retail Store", "Salon", "Barbershop", "Bodega", "Other"];
const CONTACT_METHODS = ["Call", "Text", "Email"];

export default function VerifyPage() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding/plan");
  };

  return (
    <div className="animate-fade-up">
      <OnboardingProgress step={2} />

      <div className="mb-7">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)", border: "1px solid #C5DCFF" }}
          >
            <FileCheck className="w-4 h-4 text-[#3A9AFF]" />
          </div>
          <h2 className="font-display text-2xl font-700 text-gray-900">Does everything look right?</h2>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed ml-10.5">
          We pulled this from your inquiry — confirm or update anything before continuing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business section */}
        <div
          className="bg-white rounded-2xl p-5 space-y-4"
          style={{ border: "1px solid #D9EAFF", boxShadow: "0 2px 16px rgba(58,154,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF]">Business</span>
            <div className="flex-1 h-px bg-[#E2EEFF]" />
          </div>

          <Field label="Business Name" note="from your inquiry">
            <input
              className="input-base"
              value={data.businessName}
              onChange={e => updateData({ businessName: e.target.value })}
              required
            />
          </Field>

          <Field label="Business Address" note="from your inquiry">
            <input
              className="input-base"
              value={data.businessAddress}
              onChange={e => updateData({ businessAddress: e.target.value })}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Borough">
              <select
                className="input-base"
                value={data.borough}
                onChange={e => updateData({ borough: e.target.value })}
              >
                {BOROUGHS.map(b => <option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Business Type">
              <select
                className="input-base"
                value={data.businessType}
                onChange={e => updateData({ businessType: e.target.value })}
              >
                {BUSINESS_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* Contact section */}
        <div
          className="bg-white rounded-2xl p-5 space-y-4"
          style={{ border: "1px solid #D9EAFF", boxShadow: "0 2px 16px rgba(58,154,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3A9AFF]">Contact</span>
            <div className="flex-1 h-px bg-[#E2EEFF]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Your Name" note="from your inquiry">
              <input
                className="input-base"
                value={data.contactName}
                onChange={e => updateData({ contactName: e.target.value })}
                required
              />
            </Field>
            <Field label="Phone" note="from your inquiry">
              <input
                className="input-base"
                type="tel"
                value={data.phone}
                onChange={e => updateData({ phone: e.target.value })}
                required
              />
            </Field>
          </div>

          <Field label="Email Address">
            <input
              className="input-base"
              type="email"
              value={data.email}
              onChange={e => updateData({ email: e.target.value })}
              required
            />
          </Field>

          <Field label="Preferred Contact Method">
            <div className="flex gap-2">
              {CONTACT_METHODS.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => updateData({ preferredContact: m })}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
                  style={data.preferredContact === m ? {
                    background: "#EEF5FF",
                    borderColor: "#3A9AFF",
                    color: "#1A7EF5",
                  } : {
                    background: "#F8FBFF",
                    borderColor: "#D9EAFF",
                    color: "#6B8DBF",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {/* Edit notice */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "#F8FBFF", border: "1px solid #E2EEFF" }}>
          <Pencil className="w-3.5 h-3.5 text-[#3A9AFF] flex-shrink-0" />
          <p className="text-xs text-gray-500">
            Any changes you make here will update your account — you can also edit this later in My Profile.
          </p>
        </div>

        {/* Nav */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => router.push("/onboarding/welcome")}
            className="flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-semibold text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="submit"
            className="btn-blue-glow flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-semibold text-base transition-all"
            style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
          >
            Looks Good — Choose Plan
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold text-gray-700">{label}</label>
        {note && (
          <span className="text-[10px] font-medium text-[#3A9AFF] bg-[#EEF5FF] px-1.5 py-0.5 rounded-md">
            {note}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
