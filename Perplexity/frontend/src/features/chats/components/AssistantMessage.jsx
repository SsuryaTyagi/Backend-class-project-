import React from "react";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Share2 } from "lucide-react";
import RoleAvatar from "./RoleAvatar";
import SourceCard from "./SourceCard";

export default function AssistantMessage({ content, sources }) {
  return (
    <div className="flex items-start gap-3">
      <RoleAvatar role="ai" />
      <div className="min-w-0 flex-1">
        {sources && sources.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {sources.map((s) => (
              <SourceCard key={s.id} source={s} />
            ))}
          </div>
        )}

        <p className="mt-3 text-[15px] leading-relaxed text-[#d9d9d9]">{content}</p>

        <div className="mt-4 flex items-center gap-1 text-[#8B8B93]">
          <button className="rounded-lg p-2 hover:bg-[#141416] hover:text-[#D4AF37]">
            <Copy size={15} />
          </button>
          <button className="rounded-lg p-2 hover:bg-[#141416] hover:text-[#D4AF37]">
            <ThumbsUp size={15} />
          </button>
          <button className="rounded-lg p-2 hover:bg-[#141416] hover:text-[#D4AF37]">
            <ThumbsDown size={15} />
          </button>
          <button className="rounded-lg p-2 hover:bg-[#141416] hover:text-[#D4AF37]">
            <RotateCcw size={15} />
          </button>
          <button className="rounded-lg p-2 hover:bg-[#141416] hover:text-[#D4AF37]">
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
