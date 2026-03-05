"use client";

import { useState } from "react";
import { Plus, ChevronLeft, Send, Loader2, Bot } from "lucide-react";
import { mockMessages } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Message = (typeof mockMessages)[number];

function ThreadItem({
  msg,
  isActive,
  onClick,
}: {
  msg: Message;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-4 flex items-start gap-3 border-b border-gray-50 hover:bg-gray-50/80 transition-all",
        isActive && "bg-[#EEF5FF] hover:bg-[#EEF5FF]"
      )}
    >
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#3A9AFF] flex items-center justify-center text-white text-xs font-bold">
          {msg.fromInitials}
        </div>
        {msg.isSystem && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
            <Bot className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={cn("text-sm truncate", msg.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700")}>
            {msg.from}
          </p>
          <span className="text-xs text-gray-400 flex-shrink-0">{msg.date}</span>
        </div>
        <p className={cn("text-xs mt-0.5 truncate", msg.unread ? "font-medium text-gray-800" : "text-gray-500")}>
          {msg.subject}
        </p>
        <p className="text-xs text-gray-400 truncate mt-0.5">{msg.preview}</p>
      </div>
      {msg.unread && (
        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
      )}
    </button>
  );
}

function ComposeModal({ onClose }: { onClose: () => void }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!subject || !body) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">New Message</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all text-lg leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500">To</p>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">FreshFront Team</p>
          </div>

          <div className="space-y-1.5">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all"
            />
          </div>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message..."
            rows={5}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all resize-none"
          />
        </div>

        <div className="flex gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!subject || !body || sending}
            className="btn-blue-glow flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50 disabled:!shadow-none"
            style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
          >
            {sent ? (
              "Sent ✓"
            ) : sending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            ) : (
              <><Send className="w-3.5 h-3.5" /> Send</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);

  const unreadCount = mockMessages.filter((m) => m.unread).length;

  return (
    <>
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}

      <div className="max-w-4xl mx-auto animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-700 text-gray-900">Messages</h1>
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All caught up"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCompose(true)}
            className="btn-blue-glow flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all"
            style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
          >
            <Plus className="w-4 h-4" />
            New Message
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Mobile: show list or thread */}
          <div className={cn("lg:hidden", activeMessage ? "hidden" : "block")}>
            {mockMessages.map((msg) => (
              <ThreadItem
                key={msg.id}
                msg={msg}
                isActive={false}
                onClick={() => setActiveMessage(msg)}
              />
            ))}
          </div>

          {/* Mobile thread view */}
          {activeMessage && (
            <div className="lg:hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveMessage(null)}
                  className="flex items-center gap-1 text-sm text-[#3A9AFF] font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
              <MessageThread msg={activeMessage} />
            </div>
          )}

          {/* Desktop: split layout */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:divide-x lg:divide-gray-100" style={{ minHeight: "60vh" }}>
            {/* Thread list */}
            <div className="lg:col-span-2 overflow-y-auto">
              {mockMessages.map((msg) => (
                <ThreadItem
                  key={msg.id}
                  msg={msg}
                  isActive={activeMessage?.id === msg.id}
                  onClick={() => setActiveMessage(msg)}
                />
              ))}
            </div>

            {/* Thread view */}
            <div className="lg:col-span-3">
              {activeMessage ? (
                <MessageThread msg={activeMessage} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Send className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Select a message</p>
                    <p className="text-xs text-gray-400 mt-0.5">Choose a conversation from the left</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MessageThread({ msg }: { msg: Message }) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setReplies((prev) => [...prev, reply]);
    setReply("");
    setSending(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#3A9AFF] flex items-center justify-center text-white text-xs font-bold">
              {msg.fromInitials}
            </div>
            {msg.isSystem && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{msg.subject}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {msg.from} · {msg.date}
              {msg.isSystem && (
                <span className="ml-1.5 text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full text-xs">Automated</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {msg.body}
        </div>

        {replies.map((r, i) => (
          <div key={i} className="flex justify-end">
            <div className="bg-[#3A9AFF] text-white text-sm rounded-2xl rounded-br-sm px-4 py-3 max-w-xs">
              {r}
            </div>
          </div>
        ))}
      </div>

      {/* Reply box */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleReply()}
            placeholder="Reply to FreshFront..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A9AFF]/30 focus:border-[#3A9AFF] transition-all"
          />
          <button
            type="button"
            onClick={handleReply}
            disabled={!reply.trim() || sending}
            className="btn-blue-glow w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:!shadow-none transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3A9AFF 0%, #1A7EF5 100%)" }}
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
