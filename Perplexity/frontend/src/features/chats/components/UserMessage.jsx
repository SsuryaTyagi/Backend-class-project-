import React from "react";
import RoleAvatar from "./RoleAvatar";

export default function UserMessage({ content }) {
  return (
    <div className="flex items-start gap-3">
      <RoleAvatar role="user" />
      <p className="mt-1 text-lg font-medium leading-snug text-[#F2F1EC]">{content}</p>
    </div>
  );
}
