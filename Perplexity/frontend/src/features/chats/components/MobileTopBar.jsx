import React from "react";
import { ChevronRight } from "lucide-react";
import Wordmark from "./Wordmark";

export default function MobileTopBar({ setMobileOpen }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#1a1a1c] px-4 py-3 md:hidden">
      <button
        onClick={() => setMobileOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8B8B93] hover:bg-[#141416] hover:text-[#D4AF37]"
      >
        <ChevronRight size={18} />
      </button>
      <Wordmark collapsed={false} />
    </div>
  );
}
