import React from "react";
import { Globe } from "lucide-react";
import { SOURCES } from "../data/dummyData";

export default function SourcesPanel() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {SOURCES.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border border-[#232326] bg-[#141416] p-4 hover:border-[#3a3a3d]"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#8B8B93]">
            <Globe size={12} className="text-[#D4AF37]" />
            {s.domain}
          </div>
          <p className="mt-1.5 text-sm text-[#F2F1EC]">{s.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-[#8B8B93]">{s.snippet}</p>
        </div>
      ))}
    </div>
  );
}
