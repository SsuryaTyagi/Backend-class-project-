import React from "react";
import { Menu, X } from "lucide-react";

/**
 * Minimal top bar with sidebar toggle and conversation status.
 * Props: collapsed: boolean, onToggle: () => void, hasConversation: boolean
 */
export default function TopBar({ collapsed, onToggle, hasConversation }) {
  return (
    <div className="h-14 shrink-0 flex items-center px-5 gap-3 border-b border-vision-border">
      <button onClick={onToggle} className="bg-transparent border-none cursor-pointer p-1 flex">
        {collapsed ? (
          <Menu size={18} className="text-vision-text-secondary" />
        ) : (
          <X size={18} className="text-vision-text-secondary" />
        )}
      </button>
      <span className="font-mono text-xs text-vision-text-muted tracking-wide">
        {hasConversation ? "conversation.active" : "conversation.new"}
      </span>
    </div>
  );
}