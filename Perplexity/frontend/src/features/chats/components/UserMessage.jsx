import React from "react";
import RoleAvatar from "./RoleAvatar";
import { formatTime } from "../utils/formatDate";

export default function UserMessage({ message }) {
  return (
    <div className="flex items-start gap-3">
      <RoleAvatar role="user" />
      <div className="min-w-0 flex-1">
        <p className="text-lg font-medium leading-snug text-[#F2F1EC]">{message.content}</p>
        <span className="mt-1 block text-[11px] text-[#5c5c62]">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
