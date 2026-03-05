"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  CalendarDays,
  FileText,
  User,
  MessageSquare,
  Settings,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { mockUser, mockNextService } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/book", icon: BookOpen, label: "Book" },
  { href: "/dashboard/calendar", icon: CalendarDays, label: "Calendar" },
  { href: "/dashboard/invoices", icon: FileText, label: "Invoices" },
  { href: "/dashboard/profile", icon: User, label: "My Profile" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages", badge: mockUser.unreadMessages },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-30 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F5F9FF 0%, #FAFCFF 60%, #F0F6FF 100%)",
        borderRight: "1px solid #E0ECFF",
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid #E0ECFF" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
              boxShadow: "0 4px 12px 0 rgba(58, 154, 255, 0.35)",
            }}
          >
            <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display text-base font-600 text-gray-900 leading-none">FreshFront</p>
            <p className="text-[11px] text-[#6B8DBF] mt-0.5 font-medium tracking-wide">Customer HQ</p>
          </div>
        </div>
      </div>

      {/* Next Service Widget */}
      <div className="px-4 py-4">
        <div
          className="rounded-xl p-3.5 space-y-2"
          style={{
            background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)",
            border: "1px solid #C5DCFF",
          }}
        >
          <p className="text-[10px] font-bold text-[#1A7EF5] uppercase tracking-widest">Next Service</p>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-gray-900">{mockNextService.date}</p>
            <p className="text-xs text-[#5A80B5]">{mockNextService.time}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                mockNextService.status === "confirmed" ? "bg-[#3A9AFF]" : "bg-blue-400"
              )}
            />
            <p className="text-xs text-[#5A80B5] truncate">
              {mockNextService.serviceType} · {mockNextService.techName}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "text-[#1A7EF5]"
                  : "text-gray-500 hover:text-gray-800"
              )}
              style={isActive ? {
                background: "linear-gradient(135deg, #EEF5FF 0%, #E2EEFF 100%)",
                border: "1px solid #C5DCFF",
                boxShadow: "0 1px 4px 0 rgba(58, 154, 255, 0.10)",
              } : undefined}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ background: "linear-gradient(180deg, #3A9AFF, #1A7EF5)" }}
                />
              )}
              <Icon
                className={cn(
                  "w-4.5 h-4.5 flex-shrink-0 transition-colors",
                  isActive ? "text-[#3A9AFF]" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span
                  className="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #3A9AFF, #1A7EF5)" }}
                >
                  {badge}
                </span>
              ) : isActive ? (
                <ChevronRight className="w-3.5 h-3.5 text-[#3A9AFF] opacity-60" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        className="px-4 py-4 space-y-3"
        style={{ borderTop: "1px solid #E0ECFF" }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{mockUser.businessName}</p>
            <p className="text-xs text-[#6B8DBF] truncate">
              {mockUser.plan} · {mockUser.frequency}
            </p>
          </div>
          <Link
            href="/dashboard/profile"
            className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-[#6B8DBF] hover:text-[#3A9AFF] transition-all flex-shrink-0"
            style={{ border: "1px solid transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #C5DCFF"; }}
            onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid transparent"; }}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

/* Mobile bottom tab bar */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 safe-area-bottom"
      style={{
        background: "rgba(248, 251, 255, 0.96)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #E0ECFF",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-0",
                isActive ? "text-[#3A9AFF]" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {badge ? (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center leading-none"
                    style={{ background: "linear-gradient(135deg, #3A9AFF, #1A7EF5)" }}
                  >
                    {badge}
                  </span>
                ) : null}
              </div>
              <span className={cn("text-xs font-medium", isActive ? "text-[#3A9AFF]" : "text-gray-400")}>
                {label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#3A9AFF] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
