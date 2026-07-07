import React from "react";
import { Plus, User, Settings, Eye } from "lucide-react";

/**
 * Left navigation: logo, new-chat action, thread history, user chip.
 * Props:
 *  - collapsed: boolean, whether the sidebar is hidden
 *  - threads: [{ id, title }]
 *  - activeId: currently selected thread id
 *  - onSelect: (id) => void
 *  - userName: string, shown at the bottom of the sidebar
 */
export default function Sidebar({ collapsed, threads, activeId, onSelect, userName = "User" }) {
  return (
    <div
      className={`${
        collapsed ? "w-0" : "w-64"
      } overflow-hidden transition-all duration-200 bg-vision-surface border-r border-vision-border flex flex-col shrink-0`}
    >
      <div className="px-4 py-5 flex items-center gap-2.5">
        <div className="w-7 h-7 border border-vision-text rounded-md flex items-center justify-center shrink-0">
          <Eye size={15} className="text-vision-text" strokeWidth={1.75} />
        </div>
        <span className="font-display font-semibold text-base text-vision-text tracking-tight whitespace-nowrap">
          VisionAI
        </span>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-vision-border text-vision-text font-body text-[13.5px] font-medium hover:border-vision-border-hover transition-colors">
          <Plus size={15} strokeWidth={2} />
          New chat
        </button>
      </div>

      <div className="px-4 pb-2 font-mono text-[10.5px] tracking-wider text-vision-text-muted uppercase">
        Recent
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {threads.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`w-full text-left px-2.5 py-2.5 mb-0.5 rounded-md font-body text-[13px] truncate transition-colors ${
              activeId === t.id
                ? "bg-vision-border text-vision-text"
                : "text-vision-text-secondary hover:bg-vision-border/50"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="p-3.5 border-t border-vision-border flex items-center gap-2.5">
        <div className="w-6.5 h-6.5 rounded-full bg-vision-border flex items-center justify-center">
          <User size={13} className="text-vision-text-secondary" />
        </div>
        <span className="font-body text-[13px] text-vision-text-secondary">{userName}</span>
        <Settings size={15} className="text-vision-text-muted ml-auto cursor-pointer" />
      </div>
    </div>
  );
}