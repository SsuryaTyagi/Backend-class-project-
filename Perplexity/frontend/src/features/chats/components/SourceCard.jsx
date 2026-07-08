import React from "react";
import { Globe } from "lucide-react";

export default function SourceCard({ source }) {
  return (
    <div className="min-w-[220px] max-w-[220px] shrink-0 rounded-xl border border-[#232326] bg-[#141416] p-3 transition-colors hover:border-[#3a3a3d]">
      <div className="flex items-center gap-1.5 text-[11px] text-[#8B8B93]">
        <Globe size={11} className="text-[#D4AF37]" />
        {source.domain}
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#F2F1EC]">{source.title}</p>
      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#8B8B93]">{source.snippet}</p>
    </div>
  );
}
