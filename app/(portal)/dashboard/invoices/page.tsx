"use client";

import { Download, AlertCircle, DollarSign, Calendar, Layers } from "lucide-react";
import { mockInvoices, mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-[#EEF5FF] text-[#1A7EF5] border border-[#93C5FD]",
    upcoming: "bg-amber-50 text-amber-600 border border-amber-200",
    failed: "bg-red-50 text-red-500 border border-red-200",
  };
  const labels: Record<string, string> = { paid: "Paid", upcoming: "Upcoming", failed: "Failed" };
  return (
    <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap", styles[status] ?? styles.upcoming)}>
      {labels[status] ?? status}
    </span>
  );
}

export default function InvoicesPage() {
  const totalPaid = mockInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const nextDue = mockInvoices.find((i) => i.status === "upcoming");
  const totalServices = mockInvoices.filter((i) => i.status === "paid").length;
  const hasFailed = mockInvoices.some((i) => i.status === "failed");

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-700 text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">Your billing history and upcoming payments</p>
      </div>

      {/* Failed payment alert */}
      {hasFailed && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-700">Payment failed</p>
            <p className="text-xs text-red-500 mt-0.5">
              We couldn&apos;t process your October payment.{" "}
              <button type="button" className="underline font-medium">
                Update your billing info
              </button>{" "}
              to resolve this.
            </p>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Paid This Year",
            value: `$${totalPaid.toLocaleString()}`,
            icon: DollarSign,
            gradient: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
            glow: "rgba(58,154,255,0.25)",
            iconBg: "#EEF5FF",
            iconColor: "#3A9AFF",
            textColor: "#1A7EF5",
          },
          {
            label: "Next Due",
            value: nextDue ? `$${nextDue.amount}` : "—",
            sub: nextDue ? mockUser.nextBillingDate : "",
            icon: Calendar,
            gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            glow: "rgba(245,158,11,0.20)",
            iconBg: "#FEF3C7",
            iconColor: "#D97706",
            textColor: "#D97706",
          },
          {
            label: "Total Services",
            value: totalServices.toString(),
            sub: "completed",
            icon: Layers,
            gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
            glow: "rgba(99,102,241,0.20)",
            iconBg: "#EEF2FF",
            iconColor: "#6366F1",
            textColor: "#4F46E5",
          },
        ].map(({ label, value, sub, icon: Icon, iconBg, iconColor, textColor }) => (
          <div
            key={label}
            className="card-lift bg-white rounded-2xl p-4 space-y-2"
            style={{ border: "1px solid #E0ECFF", boxShadow: "0 1px 4px rgba(58,154,255,0.06)" }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: iconBg }}
            >
              <Icon className="w-4 h-4" style={{ color: iconColor }} />
            </div>
            <div>
              <p className="font-display text-xl font-700" style={{ color: textColor }}>{value}</p>
              {sub && <p className="text-xs text-gray-400">{sub}</p>}
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Invoice", "Date", "Service", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((inv, i) => (
                <tr
                  key={inv.id}
                  className={cn(
                    "border-b border-gray-50 hover:bg-gray-50/50 transition-colors",
                    i === mockInvoices.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {inv.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap text-xs">{inv.date}</td>
                  <td className="px-5 py-3.5 text-gray-700 max-w-xs">
                    <p className="truncate">{inv.service}</p>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    {inv.status === "paid" && (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#3A9AFF] font-medium transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Receipt
                      </button>
                    )}
                    {inv.status === "failed" && (
                      <button
                        type="button"
                        className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                      >
                        Fix payment →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden divide-y divide-gray-50">
          {mockInvoices.map((inv) => (
            <div key={inv.id} className="px-4 py-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{inv.service}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{inv.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-sm font-bold text-gray-900">${inv.amount}</span>
                  <StatusBadge status={inv.status} />
                </div>
              </div>
              {inv.status === "paid" && (
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#3A9AFF] font-medium"
                >
                  <Download className="w-3 h-3" />
                  Download receipt
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
