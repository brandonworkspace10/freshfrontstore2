"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, X, Clock, User, CalendarDays } from "lucide-react";
import { mockCalendarEvents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type CalendarEvent = (typeof mockCalendarEvents)[number];

const STATUS = {
  confirmed: {
    dot: "bg-[#22C55E]",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cellBg: "bg-emerald-50/60",
    cellBorder: "border-emerald-100",
    badge: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    label: "Confirmed",
  },
  scheduled: {
    dot: "bg-[#F59E0B]",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    cellBg: "bg-amber-50/50",
    cellBorder: "border-amber-100",
    badge: "bg-amber-50 text-amber-600 border border-amber-200",
    label: "Scheduled",
  },
  completed: {
    dot: "bg-[#3A9AFF]",
    pill: "bg-[#EEF5FF] text-[#1A7EF5] border-[#C5DCFF]",
    cellBg: "bg-[#EEF5FF]/50",
    cellBorder: "border-[#D9EAFF]",
    badge: "bg-[#EEF5FF] text-[#1A7EF5] border border-[#93C5FD]",
    label: "Completed",
  },
} as const;

type StatusKey = keyof typeof STATUS;

function getStatusInfo(status: string) {
  return STATUS[status as StatusKey] ?? STATUS.completed;
}

function StatusBadge({ status }: { status: string }) {
  const s = getStatusInfo(status);
  return (
    <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full", s.badge)}>
      {s.label}
    </span>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatDateShort(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function CalendarPage() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; currentMonth: boolean; dateStr: string }> = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, currentMonth: false, dateStr: "" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, currentMonth: true, dateStr });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, currentMonth: false, dateStr: "" });
  }

  const eventMap = mockCalendarEvents.reduce<Record<string, CalendarEvent[]>>((acc, evt) => {
    if (!acc[evt.date]) acc[evt.date] = [];
    acc[evt.date].push(evt);
    return acc;
  }, {});

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const selectedEvents = selectedDate ? (eventMap[selectedDate] ?? []) : [];

  const upcomingEvents = mockCalendarEvents
    .filter((e) => e.status !== "completed")
    .sort((a, b) => a.date.localeCompare(b.date));

  const completedEvents = mockCalendarEvents
    .filter((e) => e.status === "completed")
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleDayClick = (dateStr: string) => {
    if (!dateStr) return;
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-700 text-gray-900">My Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">Click any day to see service details</p>
      </div>

      {/* Calendar card */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #E0ECFF", boxShadow: "0 2px 12px rgba(58,154,255,0.06)" }}
      >
        {/* Month header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-600 text-gray-900">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => { setViewDate(new Date(year, month - 1, 1)); setSelectedDate(null); }}
              className="w-8 h-8 rounded-lg hover:bg-[#EEF5FF] flex items-center justify-center text-gray-400 hover:text-[#3A9AFF] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => { setViewDate(new Date(today.getFullYear(), today.getMonth(), 1)); setSelectedDate(null); }}
              className="px-3 py-1 rounded-lg text-xs font-medium text-gray-500 hover:bg-[#EEF5FF] hover:text-[#3A9AFF] transition-all"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => { setViewDate(new Date(year, month + 1, 1)); setSelectedDate(null); }}
              className="w-8 h-8 rounded-lg hover:bg-[#EEF5FF] flex items-center justify-center text-gray-400 hover:text-[#3A9AFF] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map((d) => (
            <div key={d} className="py-2 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 divide-x divide-gray-100">
          {cells.map((cell, i) => {
            const events = cell.dateStr ? (eventMap[cell.dateStr] ?? []) : [];
            const isToday = cell.dateStr === todayStr;
            const isSelected = cell.dateStr === selectedDate;
            const hasEvents = events.length > 0;

            // Determine cell background from primary event (first one)
            const primaryStatus = events[0]?.status ?? "";
            const si = primaryStatus ? getStatusInfo(primaryStatus) : null;

            return (
              <button
                key={i}
                type="button"
                disabled={!cell.currentMonth}
                onClick={() => handleDayClick(cell.dateStr)}
                className={cn(
                  "relative text-left p-1.5 min-h-[72px] border-b border-gray-100 transition-all duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A9AFF]/50",
                  !cell.currentMonth && "bg-gray-50/50 cursor-default",
                  cell.currentMonth && !hasEvents && "hover:bg-gray-50/80",
                  cell.currentMonth && hasEvents && si && `${si.cellBg} hover:brightness-95`,
                  isSelected && "ring-2 ring-inset ring-[#3A9AFF] z-10",
                  // last column — no right border bleed
                  (i + 1) % 7 === 0 && "border-r-0"
                )}
              >
                {/* Date number */}
                <span
                  className={cn(
                    "inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-semibold mb-1",
                    isToday || isSelected
                      ? "bg-gray-900 text-white"
                      : cell.currentMonth
                      ? "text-gray-800"
                      : "text-gray-300"
                  )}
                >
                  {cell.day}
                </span>

                {/* Event pills */}
                <div className="flex flex-col gap-0.5">
                  {events.slice(0, 2).map((evt) => {
                    const s = getStatusInfo(evt.status);
                    return (
                      <span
                        key={evt.id}
                        className={cn(
                          "flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border truncate leading-tight",
                          s.pill
                        )}
                        title={evt.serviceType}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)} />
                        <span className="truncate">{evt.serviceType.split(" ")[0]}</span>
                      </span>
                    );
                  })}
                  {events.length > 2 && (
                    <span className="text-[9px] text-gray-400 font-medium px-1">
                      +{events.length - 2} more
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-3 border-t border-gray-100">
          {[
            { color: "bg-[#22C55E]", label: "Confirmed" },
            { color: "bg-[#F59E0B]", label: "Scheduled" },
            { color: "bg-[#3A9AFF]", label: "Completed" },
            { color: "bg-gray-900", label: "Today" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full flex-shrink-0", color)} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day detail panel */}
      {selectedDate && (
        <div
          className="bg-white rounded-2xl overflow-hidden animate-fade-up"
          style={{ border: "1px solid #C5DCFF", boxShadow: "0 4px 20px rgba(58,154,255,0.10)" }}
        >
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
              >
                <CalendarDays className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">{formatDate(selectedDate)}</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="px-5 py-6 text-center">
              <p className="text-sm text-gray-400">No services on this day</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {selectedEvents.map((evt) => {
                const s = getStatusInfo(evt.status);
                return (
                  <div key={evt.id} className="px-5 py-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Status bar */}
                      <div
                        className={cn("w-1 rounded-full flex-shrink-0 mt-1", s.dot)}
                        style={{ height: "36px" }}
                      />
                      <div className="min-w-0 space-y-1.5">
                        <p className="text-sm font-semibold text-gray-900">{evt.serviceType}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {evt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {evt.techName}
                          </span>
                        </div>
                        <StatusBadge status={evt.status} />
                      </div>
                    </div>

                    {evt.status !== "completed" && (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#3A9AFF] transition-colors whitespace-nowrap flex-shrink-0 mt-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reschedule
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Upcoming services */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-900">Upcoming Services</h2>
        {upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-gray-400 text-sm">No upcoming services scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((evt) => {
              const s = getStatusInfo(evt.status);
              const isHighlighted = selectedDate === evt.date;
              return (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => setSelectedDate(evt.date)}
                  className={cn(
                    "w-full text-left rounded-2xl border p-4 flex items-center justify-between gap-4",
                    "transition-[background-color,border-color,box-shadow] duration-200",
                    isHighlighted
                      ? "bg-[#EEF5FF] border-[#3A9AFF] shadow-sm"
                      : "bg-white border-gray-100 hover:border-[#C5DCFF] hover:bg-[#F8FBFF]",
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", s.dot)} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{evt.serviceType}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formatDateShort(evt.date)} · {evt.time} · {evt.techName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={evt.status} />
                    <span className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#3A9AFF] font-medium transition-colors whitespace-nowrap">
                      <RefreshCw className="w-3 h-3" />
                      Reschedule
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Service history */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-900">Service History</h2>
        {completedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-gray-400 text-sm">No completed services yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {completedEvents.map((evt) => {
              const isHighlighted = selectedDate === evt.date;
              return (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => setSelectedDate(evt.date)}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 flex items-center justify-between gap-4",
                    "transition-[background-color,border-color] duration-200",
                    isHighlighted
                      ? "bg-[#EEF5FF] border-[#3A9AFF]"
                      : "bg-white border-gray-100 hover:border-[#C5DCFF] hover:bg-[#F8FBFF] opacity-75 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3A9AFF] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{evt.serviceType}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(evt.date + "T12:00:00").toLocaleDateString("en-US", {
                          weekday: "short", month: "short", day: "numeric", year: "numeric",
                        })} · {evt.techName}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status="completed" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
