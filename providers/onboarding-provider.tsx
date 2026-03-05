"use client";

import { createContext, useContext, useState } from "react";

interface OnboardingData {
  plan: string;
  planPrice: number | null;
  frequency: string;
  businessName: string;
  businessAddress: string;
  borough: string;
  businessType: string;
  phone: string;
  preferredContact: string;
  promoCode: string;
  agreedToTerms: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  setStep: (step: number) => void;
}

const defaultData: OnboardingData = {
  plan: "",
  planPrice: null,
  frequency: "monthly",
  businessName: "",
  businessAddress: "",
  borough: "",
  businessType: "",
  phone: "",
  preferredContact: "Text",
  promoCode: "",
  agreedToTerms: false,
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const setStep = (step: number) => setCurrentStep(step);

  return (
    <OnboardingContext.Provider value={{ data, updateData, currentStep, setStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
