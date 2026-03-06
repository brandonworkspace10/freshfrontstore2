"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Eraser,
  Trash2,
  Droplets,
  Zap,
  Sparkles,
  Clock,
  ChevronRight,
  Upload,
  Image,
  AlertTriangle,
  Phone,
  Timer,
  Check,
  X,
  CircleCheck,
} from "lucide-react";
import { mockServices, timeSlots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  eraser: Eraser,
  trash2: Trash2,
  droplets: Droplets,
  zap: Zap,
};

type EmergencyTimeframe =
  | "within-1-hour"
  | "within-2-3-hours"
  | "within-4-6-hours"
  | "today-before-close";

const emergencyTimeframes: Array<{ id: EmergencyTimeframe; label: string; sub: string }> = [
  { id: "within-1-hour", label: "Within 1 hour", sub: "Urgent response" },
  { id: "within-2-3-hours", label: "Within 2–3 hours", sub: "High priority" },
  { id: "within-4-6-hours", label: "Within 4–6 hours", sub: "Same-day window" },
  { id: "today-before-close", label: "Today before close", sub: "End-of-day" },
];

export default function BookPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [emergencyOpen, setEmergencyOpen] = useState(false);

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
      {emergencyOpen && <EmergencyRequestModal onClose={() => setEmergencyOpen(false)} />}
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-700 text-gray-900">Book a Service</h1>
        <p className="text-sm text-gray-500 mt-1">
          Request a one-time add-on outside your monthly plan.
        </p>
      </div>

      {/* Plan context banner */}
      <div
        className="rounded-xl p-4 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)",
          border: "1px solid #C5DCFF",
        }}
      >
        <CircleCheck className="w-4.5 h-4.5 text-[#3A9AFF] flex-shrink-0" />
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Your plan covers</span>{" "}
          banner cleaning, window cleaning &amp; concrete — those happen automatically every month.{" "}
          <span className="font-medium text-gray-900">Book any extras below.</span>
        </p>
      </div>

      {/* Emergency Same Day Clean */}
      <button
        type="button"
        onClick={() => setEmergencyOpen(true)}
        className={cn(
          "w-full text-left rounded-2xl p-4 sm:p-5",
          "transition-[transform,box-shadow,background-color,border-color] duration-200 ease",
          "hover:shadow-md"
        )}
        style={{
          background: "linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 45%, #EEF5FF 100%)",
          border: "1px solid #FED7AA",
          boxShadow: "0 1px 4px rgba(245, 158, 11, 0.10)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                boxShadow: "0 6px 18px rgba(245, 158, 11, 0.25)",
              }}
            >
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">🚨 Emergency Same Day Clean</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Tell us what happened, upload a photo, and choose a timeframe. We’ll confirm within 15 minutes.
              </p>
              <p className="text-[11px] text-amber-700 mt-2 font-medium">
                Subject to availability · Confirmed via call or text
              </p>
            </div>
          </div>

          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#B45309" }}
          >
            Start
          </span>
        </div>
      </button>

      {/* Service cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Select an add-on service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockServices.map((service) => {
            const Icon = iconMap[service.icon] ?? Zap;
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
                    : service.price === "Quote-based"
                    ? "bg-amber-50 text-amber-700"
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

function EmergencyRequestModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [timeframe, setTimeframe] = useState<EmergencyTimeframe | null>(null);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const previews = useMemo(() => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })), [files]);

  useEffect(() => {
    return () => {
      for (const p of previews) URL.revokeObjectURL(p.url);
    };
  }, [previews]);

  const canNext =
    (step === 1 && description.trim().length > 0) ||
    (step === 2 && files.length > 0) ||
    (step === 3 && !!timeframe) ||
    (step === 4 && phone.trim().length > 0);

  const progress = (Math.min(step, 4) / 4) * 100;

  const resetAndClose = () => {
    onClose();
  };

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    const next = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
    setFiles(next.slice(0, 6));
  };

  const handleSubmit = async () => {
    if (!timeframe || files.length === 0 || description.trim().length === 0 || phone.trim().length === 0) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden animate-fade-up"
        style={{ boxShadow: "0 30px 90px rgba(7, 30, 61, 0.25)", border: "1px solid #E0ECFF" }}
        role="dialog"
        aria-modal="true"
        aria-label="Emergency Same Day Clean"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Emergency</p>
            <h2 className="font-display text-xl font-700 text-gray-900 mt-1 truncate">
              🚨 Emergency Same Day Clean
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Emergency requests are subject to availability. Our team will confirm via call or text within 15 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Close emergency request"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          {step <= 4 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium text-[#3A9AFF]">Step {step} of 4</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E2EEFF" }}>
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg, #3A9AFF, #1A7EF5)" }}
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF5FF] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#3A9AFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Step 1 — Describe the problem</p>
                  <p className="text-xs text-gray-500 mt-0.5">What needs immediate attention?</p>
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue (spill, graffiti, broken glass, heavy buildup, etc.)"
                rows={5}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-[border-color,box-shadow] duration-200 resize-none"
              />
              <p className="text-xs text-gray-400">Tip: Include where it is and any access instructions.</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF5FF] flex items-center justify-center flex-shrink-0">
                  <Image className="w-5 h-5 text-[#3A9AFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Step 2 — Upload a photo</p>
                  <p className="text-xs text-gray-500 mt-0.5">Show us what we’re dealing with (required).</p>
                </div>
              </div>

              <label
                className={cn(
                  "block rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer",
                  "transition-[background-color,border-color,box-shadow] duration-200",
                  files.length > 0 ? "border-[#B3D3FF] bg-[#EEF5FF]" : "border-gray-200 hover:border-[#B3D3FF] hover:bg-[#E8F2FF]"
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center" style={{ border: "1px solid #D9EAFF" }}>
                    <Upload className="w-5 h-5 text-[#3A9AFF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Upload photos</p>
                    <p className="text-xs text-gray-500 mt-0.5">PNG or JPG · Up to 6 images</p>
                  </div>
                </div>
              </label>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {previews.map((p) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p.url}
                      src={p.url}
                      alt={p.file.name}
                      className="w-full aspect-square object-cover rounded-xl"
                      style={{ border: "1px solid #D9EAFF" }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF5FF] flex items-center justify-center flex-shrink-0">
                  <Timer className="w-5 h-5 text-[#3A9AFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Step 3 — Timeframe</p>
                  <p className="text-xs text-gray-500 mt-0.5">When do you need us there?</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {emergencyTimeframes.map((t) => {
                  const active = timeframe === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTimeframe(t.id)}
                      className={cn(
                        "text-left rounded-2xl p-4 border",
                        "transition-[background-color,border-color,box-shadow] duration-200 ease",
                        active ? "bg-[#EEF5FF] border-[#3A9AFF] shadow-sm" : "bg-white border-gray-200 hover:border-[#B3D3FF] hover:bg-[#E8F2FF]"
                      )}
                    >
                      <p className="text-sm font-semibold text-gray-900">{t.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF5FF] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#3A9AFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Step 4 — Contact confirmation</p>
                  <p className="text-xs text-gray-500 mt-0.5">Best number to reach you right now?</p>
                </div>
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(212) 555-0100"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-[border-color,box-shadow] duration-200"
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5 text-center py-6">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)", boxShadow: "0 12px 32px rgba(58,154,255,0.35)" }}
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-700 text-gray-900">Emergency request received</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  We&apos;ll confirm availability via call or text within <span className="font-semibold text-gray-900">15 minutes</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="btn-blue-glow px-5 py-3 rounded-2xl text-white font-semibold text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step <= 4 && (
          <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => (step === 1 ? resetAndClose() : setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3 | 4))))}
              className="px-4 py-2.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep((s) => ((s + 1) as 2 | 3 | 4 | 5))}
                disabled={!canNext || step === 4}
                className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                style={{
                  background: canNext ? "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" : "#E2EEFF",
                  color: canNext ? "white" : "#93C5FD",
                }}
              >
                Next
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canNext || step !== 4 || submitting}
                className={cn(
                  "btn-blue-glow px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:!shadow-none"
                )}
                style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)", color: "white" }}
              >
                {submitting ? "Submitting..." : "Submit Emergency Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
