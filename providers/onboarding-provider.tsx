"use client";

import { createContext, useContext, useState } from "react";
import { mockQualifiedLead } from "@/lib/mock-data";

export interface OnboardingData {
  // Step 2 — Verify
  businessName: string;
  businessAddress: string;
  borough: string;
  businessType: string;
  contactName: string;
  phone: string;
  email: string;
  preferredContact: string;
  // Step 3 — Plan
  plan: string;
  planId: string;
  planPrice: number | null;
  frequency: string;
  // Step 4 — Payment
  promoCode: string;
  agreedToTerms: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    // Pre-filled from qualification
    businessName: mockQualifiedLead.businessName,
    businessAddress: mockQualifiedLead.businessAddress,
    borough: mockQualifiedLead.borough,
    businessType: mockQualifiedLead.businessType,
    contactName: mockQualifiedLead.contactName,
    phone: mockQualifiedLead.phone,
    email: mockQualifiedLead.email,
    preferredContact: mockQualifiedLead.preferredContact,
    // Plan (empty until step 3)
    plan: "",
    planId: "",
    planPrice: null,
    frequency: "monthly",
    // Payment
    promoCode: "",
    agreedToTerms: false,
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, currentStep, setStep: setCurrentStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
