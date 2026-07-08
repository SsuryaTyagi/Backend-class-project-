import React from "react";
import { Sparkles } from "lucide-react";

export default function Wordmark({ collapsed }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#D4AF37] to-[#8A6D1F] text-black">
        <Sparkles size={16} strokeWidth={2.5} />
      </div>
      {!collapsed && (
        <span
          className="text-2xl tracking-wide text-[#F2F1EC]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          VISION<span className="text-[#D4AF37]">AI</span>
        </span>
      )}
    </div>
  );
}
