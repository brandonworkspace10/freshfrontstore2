"use client";

import { useState } from "react";
import {
  Building2,
  Phone,
  CreditCard,
  TrendingUp,
  Trophy,
  Check,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function Section({ title, icon: Icon, children }: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg bg-[#EEF5FF] flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-[#3A9AFF]" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function EditableField({ label, value, type = "text" }: {
  label: string;
  value: string;
  type?: string;
}) {
  const [val, setVal] = useState(value);
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all"
      />
    </div>
  );
}

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loyaltyMonths = mockUser.loyaltyMonths;
  const loyaltyTarget = 12;
  const loyaltyProgress = (loyaltyMonths / loyaltyTarget) * 100;
  const monthsLeft = loyaltyTarget - loyaltyMonths;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-700 text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your business info and subscription</p>
      </div>

      {/* Business Info */}
      <Section title="Business Information" icon={Building2}>
        <div className="grid sm:grid-cols-2 gap-4">
          <EditableField label="Business name" value={mockUser.businessName} />
          <EditableField label="Business type" value={mockUser.businessType} />
          <div className="sm:col-span-2">
            <EditableField label="Business address" value={mockUser.businessAddress} />
          </div>
          <EditableField label="Borough" value={mockUser.borough} />
        </div>
      </Section>

      {/* Contact Details */}
      <Section title="Contact Details" icon={Phone}>
        <div className="grid sm:grid-cols-2 gap-4">
          <EditableField label="Full name" value={mockUser.name} />
          <EditableField label="Phone" value={mockUser.phone} type="tel" />
          <div className="sm:col-span-2">
            <EditableField label="Email" value={mockUser.email} type="email" />
          </div>
        </div>
      </Section>

      {/* Subscription */}
      <Section title="Subscription" icon={TrendingUp}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Plan", value: mockUser.plan },
              { label: "Frequency", value: mockUser.frequency },
              { label: "Next billing", value: mockUser.nextBillingDate },
              { label: "Monthly", value: `$${mockUser.planPrice}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3 space-y-1">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="btn-blue-glow flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all"
              style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Upgrade Plan
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all"
            >
              Change Frequency
            </button>
          </div>
        </div>
      </Section>

      {/* Payment Method */}
      <Section title="Payment Method" icon={CreditCard}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-[#1A1F71] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {mockUser.paymentMethod.type} ending in {mockUser.paymentMethod.last4}
              </p>
              <p className="text-xs text-gray-400">Default payment method</p>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-[#3A9AFF] font-medium hover:text-[#1A7EF5] transition-colors"
          >
            Update
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Section>

      {/* Loyalty */}
      <Section title="Loyalty Rewards" icon={Trophy}>
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-display font-700 text-gray-900">
                {loyaltyMonths}
                <span className="text-base text-gray-400 font-normal">/{loyaltyTarget} months</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">toward your free service month</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#3A9AFF]">{monthsLeft} months left</p>
              <p className="text-xs text-gray-400">until free service</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "#E2EEFF" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${loyaltyProgress}%`,
                  background: "linear-gradient(90deg, #3A9AFF 0%, #6AB8FF 50%, #3A9AFF 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  boxShadow: "0 0 10px rgba(58,154,255,0.5)",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>0 months</span>
              <span>🎉 12 months = 1 FREE service</span>
            </div>
          </div>

          <div className="bg-[#EEF5FF] rounded-xl p-3.5">
            <p className="text-xs text-[#1A7EF5] font-medium">
              You&apos;ve been a FreshFront customer since {mockUser.memberSince} — keep it up!
              At 12 months, your next service is completely on us.
            </p>
          </div>
        </div>
      </Section>

      {/* Save button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className={cn(
          "btn-blue-glow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all",
          saved && "!shadow-none"
        )}
        style={saved
          ? { background: "#EEF5FF", color: "#1A7EF5", border: "1px solid #93C5FD" }
          : { background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)", color: "white" }
        }
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving changes...
          </>
        ) : saved ? (
          <>
            <Check className="w-4 h-4" />
            Changes saved!
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
}
