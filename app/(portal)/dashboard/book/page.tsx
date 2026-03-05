"use client";

import { useState } from "react";
import {
  Sparkles,
  Waves,
  Flag,
  Zap,
  Square,
  Clock,
  ChevronRight,
  Upload,
  TrendingUp,
  Image,
} from "lucide-react";
import { mockUser, mockServices, timeSlots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  waves: Waves,
  flag: Flag,
  zap: Zap,
  square: Square,
};

export default function BookPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = selectedService && selectedDate && selectedTime;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-up">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EEF5FF] flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-[#3A9AFF]" />
          </div>
          <h2 className="font-display text-2xl font-600 text-gray-900">Request sent!</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            We&apos;ll confirm your booking via message within a few hours.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); setSelectedService(null); setSelectedDate(""); setSelectedTime(""); setNotes(""); }}
            className="mt-2 text-sm text-[#3A9AFF] font-medium hover:underline"
          >
            Book another service
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-700 text-gray-900">Book a Service</h1>
        <p className="text-sm text-gray-500 mt-1">Request an additional service visit</p>
      </div>

      {/* Subscription banner */}
      <div
        className="rounded-xl p-4 flex items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)",
          border: "1px solid #C5DCFF",
        }}
      >
        <div className="text-sm">
          <span className="font-semibold text-gray-900">Your Plan:</span>{" "}
          <span className="text-gray-600">
            {mockUser.plan} · {mockUser.frequency} — ${mockUser.planPrice}/month
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-[#3A9AFF] hover:text-[#1A7EF5] transition-colors whitespace-nowrap"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Upgrade
        </button>
      </div>

      {/* Service cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Select a service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockServices.map((service) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            const isSelected = selectedService === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService((current) => (current === service.id ? null : service.id))}
                className={cn(
                  "group text-left rounded-xl border-2 p-4 space-y-2",
                  "transition-[background-color,border-color,box-shadow] duration-200 ease",
                  isSelected
                    ? "border-[#3A9AFF] bg-[#EEF5FF] shadow-sm"
                    : "border-gray-100 bg-white hover:border-[#B3D3FF] hover:bg-[#E8F2FF] hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ease",
                    isSelected ? "bg-[#3A9AFF]" : "bg-gray-100 group-hover:bg-[#D9EAFF]"
                  )}
                >
                  <Icon className={cn("w-4.5 h-4.5", isSelected ? "text-white" : "text-gray-500")} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{service.duration}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                <span className={cn(
                  "inline-block text-xs font-medium px-2 py-0.5 rounded-full",
                  isSelected
                    ? "bg-[#3A9AFF]/10 text-[#1A7EF5]"
                    : "bg-gray-100 text-gray-500"
                )}>
                  {service.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date + Time */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Preferred date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Preferred time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all appearance-none"
          >
            <option value="">Select a time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Special instructions</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Specific areas, access instructions, or any special requests..."
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all resize-none"
        />
      </div>

      {/* Photo upload */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Property photos (optional)</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#3A9AFF]/40 transition-all cursor-pointer group">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-[#EEF5FF] flex items-center justify-center transition-all">
              <Image className="w-5 h-5 text-gray-400 group-hover:text-[#3A9AFF]" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                <span className="text-[#3A9AFF]">Upload photos</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 10MB each</p>
            </div>
          </div>
          <input type="file" multiple accept="image/*" className="hidden" />
        </div>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        className={cn(
          "btn-blue-glow w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all",
          !canSubmit && "!shadow-none cursor-not-allowed"
        )}
        style={canSubmit
          ? { background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)", color: "white" }
          : { background: "#E9F0FF", color: "#93C5FD" }
        }
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting request...
          </>
        ) : canSubmit ? (
          <>
            Request Service
            <ChevronRight className="w-4 h-4" />
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Select a service to continue
          </>
        )}
      </button>
    </div>
  );
}
