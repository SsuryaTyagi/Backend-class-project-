import React, { useState } from "react";
import { Send } from "lucide-react";
import ViewfinderFrame from "./ViewfinderFrame";

/**
 * The search/message input, framed by viewfinder corner brackets.
 * Props:
 *  - value, onChange: controlled input state
 *  - onSubmit: () => void, called on Enter or send-button click
 *  - compact: boolean, smaller/pinned-bottom variant used mid-conversation
 */
export default function PromptInput({ value, onChange, onSubmit, compact }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative w-full ${compact ? "" : "max-w-xl"}`}>
      <ViewfinderFrame focused={focused} />
      <div
        className={`flex items-center gap-2.5 ${
          compact ? "px-5 py-3" : "px-6 py-4.5"
        } bg-vision-surface rounded-xl border transition-colors ${
          focused ? "border-vision-border-hover" : "border-vision-border"
        }`}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && value.trim() && onSubmit()}
          placeholder="Ask VisionAI anything..."
          className={`flex-1 bg-transparent outline-none text-vision-text font-body ${
            compact ? "text-sm" : "text-[15.5px]"
          } placeholder:text-vision-text-muted`}
        />
        <button
          onClick={() => value.trim() && onSubmit()}
          className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            value.trim() ? "bg-white cursor-pointer" : "bg-vision-border cursor-default"
          }`}
        >
          <Send
            size={14}
            className={value.trim() ? "text-vision-bg" : "text-vision-text-muted"}
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}