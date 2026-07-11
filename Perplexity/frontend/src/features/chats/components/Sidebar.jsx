import React from "react";
import { Plus, Compass, Library, Home, Settings, ChevronLeft, ChevronRight, X } from "lucide-react";
import Wordmark from "./Wordmark";
import NavItem from "./NavItem";
import { formatDay } from "../utils/formatDate";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  view,
  chats,
  activeChat,
  goHome,
  openThread,
}) {
  const threads = Object.values(chats || {}).sort(
    (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`z-30 flex shrink-0 flex-col border-r border-[#1a1a1c] bg-[#0d0d0e] transition-all duration-200
          fixed inset-y-0 left-0 md:static
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-16" : "md:w-64"} w-64`}
      >
        <div className="flex items-center justify-between px-3 py-4">
          <Wordmark collapsed={collapsed} />
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[#8B8B93] hover:text-[#D4AF37] md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-3">
          <button
            onClick={() => {
              goHome();
              setMobileOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 py-2 text-sm font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20"
          >
            <Plus size={16} />
            {!collapsed && "New Thread"}
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-3">
          <NavItem icon={Home} label="Home" collapsed={collapsed} active={view === "home"} onClick={goHome} />
          <NavItem icon={Compass} label="Discover" collapsed={collapsed} active={false} onClick={() => {}} />
          <NavItem
            icon={Library}
            label="Library"
            collapsed={collapsed}
            active={view === "answer"}
            onClick={() => {}}
          />
        </nav>

        {!collapsed && (
          <div className="mt-5 flex-1 overflow-y-auto px-3 thin-scrollbar">
            <p className="mb-2 px-1 text-[11px] uppercase tracking-wider text-[#5c5c62]">Recent</p>
            <div className="flex flex-col gap-0.5">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    openThread(t.id);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors ${
                    activeChat === t.id
                      ? "bg-[#1c1c1f] text-[#F2F1EC]"
                      : "text-[#8B8B93] hover:bg-[#141416] hover:text-[#d9d9d9]"
                  }`}
                >
                  <span className="truncate">{t.title || "New chat"}</span>
                  <span className="shrink-0 text-[10px] text-[#5c5c62]">{formatDay(t.lastUpdated)}</span>
                </button>
              ))}
              {threads.length === 0 && (
                <p className="px-2 py-1.5 text-[12px] text-[#5c5c62]">No chats yet</p>
              )}
            </div>
          </div>
        )}

        {collapsed && <div className="hidden flex-1 md:block" />}

        <div className="border-t border-[#1a1a1c] p-3">
          <NavItem icon={Settings} label="Settings" collapsed={collapsed} active={false} onClick={() => {}} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="mt-1 hidden w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-[#8B8B93] hover:bg-[#141416] hover:text-[#D4AF37] md:flex"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
}