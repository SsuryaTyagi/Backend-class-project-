import React, { useState } from "react";
import { Search, ArrowUp, X } from "lucide-react";
import ChatThread from "./ChatThread";

export default function AnswerView({ title, messages, goHome, onSend, loading }) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || loading) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Top bar */}
      <div className="hidden items-center justify-between border-b border-[#1a1a1c] px-4 py-3 md:flex sm:px-6">
        <div className="flex min-w-0 items-center gap-2 text-sm text-[#8B8B93]">
          <button onClick={goHome} className="shrink-0 hover:text-[#D4AF37]">
            Home
          </button>
          <span className="shrink-0">/</span>
          <span className="max-w-[320px] truncate text-[#F2F1EC]">{title}</span>
        </div>
        <button onClick={goHome} className="shrink-0 text-[#8B8B93] hover:text-[#D4AF37]">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1
            className="text-2xl leading-tight text-[#F2F1EC] sm:text-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </h1>

          <ChatThread messages={messages} />

          {loading && (
            <div className="mt-6 flex items-center gap-2 text-sm text-[#8B8B93]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
              Thinking…
            </div>
          )}
        </div>
      </div>

      {/* Follow-up input — wired to handleSendMessage(message, currentChatId) */}
      <div className="border-t border-[#1a1a1c] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-[#232326] bg-[#141416] px-4 py-3 focus-within:border-[#D4AF37]/60">
          <Search size={16} className="text-[#8B8B93]" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Ask a follow-up..."
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-[#F2F1EC] placeholder:text-[#5c5c62] outline-none disabled:opacity-60"
          />
          <button
            onClick={submit}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37] text-black transition-transform hover:scale-105 disabled:opacity-50"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
