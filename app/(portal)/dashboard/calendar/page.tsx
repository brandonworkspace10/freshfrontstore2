"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { mockCalendarEvents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getStatusColor(status: string) {
  switch (status) {
    case "confirmed": return "bg-[#22C55E]";
    case "scheduled": return "bg-[#F59E0B]";
    case "completed": return "bg-[#3A9AFF]";
    default: return "bg-gray-200";
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    scheduled: "bg-amber-50 text-amber-600 border border-amber-200",
    completed: "bg-[#EEF5FF] text-[#1A7EF5] border border-[#93C5FD]",
  };
  return (
    <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full", styles[status] ?? styles.completed)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function CalendarPage() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; currentMonth: boolean; dateStr: string }> = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevDays - i;
    cells.push({ day: d, currentMonth: false, dateStr: "" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, currentMonth: true, dateStr });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, currentMonth: false, dateStr: "" });
  }

  const eventMap = mockCalendarEvents.reduce<Record<string, typeof mockCalendarEvents>>((acc, evt) => {
    if (!acc[evt.date]) acc[evt.date] = [];
    acc[evt.date].push(evt);
    return acc;
  }, {});

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const upcomingEvents = mockCalendarEvents
    .filter((e) => e.status !== "completed")
    .sort((a, b) => a.date.localeCompare(b.date));

  const completedEvents = mockCalendarEvents
    .filter((e) => e.status === "completed")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-700 text-gray-900">My Schedule</h1>
        <p className="text-sm text-gray-500 mt-1">All your upcoming and past services</p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Calendar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-600 text-gray-900">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))}
              className="px-3 py-1 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 transition-all"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-50">
          {DAYS.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-400">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const events = cell.dateStr ? (eventMap[cell.dateStr] ?? []) : [];
            const isToday = cell.dateStr === todayStr;
            return (
              <div
                key={i}
                className={cn(
                  "min-h-12 p-1.5 border-b border-r border-gray-50 last:border-r-0",
                  !cell.currentMonth && "bg-gray-50/50"
                )}
              >
                <span
                  className={cn(
                    "inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-medium",
                    isToday
                      ? "bg-gray-900 text-white font-bold"
                      : cell.currentMonth
                      ? "text-gray-700"
                      : "text-gray-300"
                  )}
                >
                  {cell.day}
                </span>
                <div className="flex flex-wrap gap-0.5 mt-0.5">
                  {events.map((evt) => (
                    <div
                      key={evt.id}
                      className={cn("w-1.5 h-1.5 rounded-full", getStatusColor(evt.status))}
                      title={evt.serviceType}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-gray-50">
          {[
            { color: "bg-[#22C55E]", label: "Confirmed" },
            { color: "bg-[#F59E0B]", label: "Scheduled" },
            { color: "bg-[#3A9AFF]", label: "Completed" },
            { color: "bg-gray-900", label: "Today" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={cn("w-2 h-2 rounded-full", color)} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-900">Upcoming Services</h2>
        {upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-gray-400 text-sm">No upcoming services scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", getStatusColor(evt.status))} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{evt.serviceType}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(evt.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {evt.time} · {evt.techName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={evt.status} />
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#3A9AFF] font-medium transition-colors whitespace-nowrap"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-900">Service History</h2>
        {completedEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-gray-400 text-sm">No completed services yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {completedEvents.map((evt) => (
              <div key={evt.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-4 opacity-75">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{evt.serviceType}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(evt.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })} · {evt.techName}
                    </p>
                  </div>
                </div>
                <StatusBadge status="completed" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
