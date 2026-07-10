import React from "react";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Share2 } from "lucide-react";
import RoleAvatar from "./RoleAvatar";
import { formatTime } from "../utils/formatDate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AssistantMessage({ message }) {
  return (
    <div className="flex items-start gap-3">
      <RoleAvatar role="ai" />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] leading-relaxed text-[#d9d9d9]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </p>
        <span className="mt-1 block text-[11px] text-[#5c5c62]">
          {formatTime(message.createdAt)}
        </span>

        <div className="mt-3 flex items-center gap-1 text-[#8B8B93]">
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
