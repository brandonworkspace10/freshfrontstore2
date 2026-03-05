"use client";

import { Bell, Leaf } from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import Link from "next/link";

export function Topbar() {
  return (
    <header
      className="h-14 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20"
      style={{
        background: "rgba(248, 251, 255, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E0ECFF",
      }}
    >
      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
        >
          <Leaf className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-display text-sm font-600 text-gray-900">FreshFront</span>
      </div>

      {/* Desktop breadcrumb area — page title can be injected here */}
      <div className="hidden lg:block" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/messages"
          className="relative w-9 h-9 rounded-xl hover:bg-[#EEF5FF] flex items-center justify-center text-gray-500 hover:text-[#3A9AFF] transition-all"
          style={{ border: "1px solid transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #C5DCFF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid transparent"; }}
        >
          <Bell className="w-4.5 h-4.5" />
          {mockUser.unreadMessages > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: "#3A9AFF" }}
            />
          )}
        </Link>

        <button
          type="button"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold transition-all"
          style={{
            background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)",
            boxShadow: "0 2px 8px 0 rgba(58, 154, 255, 0.35)",
          }}
        >
          {mockUser.avatarInitials}
        </button>
      </div>
    </header>
  );
}
