import React from "react";
import { User, Sparkles } from "lucide-react";

export default function RoleAvatar({ role }) {
  if (role === "user") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#232326] text-[#d9d9d9]">
        <User size={14} />
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A6D1F] text-black">
      <Sparkles size={14} strokeWidth={2.5} />
    </div>
  );
}
