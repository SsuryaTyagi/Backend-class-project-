import React from "react";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { formatDay } from "../utils/formatDate";

/* Renders one chat's messages as role-based bubbles.
   `messages` is an array of real Mongoose message docs:
   { _id, chat, content, role, createdAt, updatedAt, __v } */
export default function ChatThread({ messages }) {
  if (!messages || messages.length === 0) {
    return (
      <p className="mt-8 text-center text-sm text-[#5c5c62]">
        No messages in this chat yet.
      </p>
    );
  }

  return (
    <div className="mt-5 space-y-6 divide-y divide-[#1a1a1c]">
      <div className="flex justify-center pb-2">
        <span className="rounded-full bg-[#141416] px-3 py-1 text-[11px] text-[#5c5c62]">
          {formatDay(messages[0].createdAt)}
        </span>
      </div>
      {messages.map((m, i) => (
        <div key={m._id} className={i === 0 ? "" : "pt-6"}>
          {m.role === "user" ? <UserMessage message={m} /> : <AssistantMessage message={m} />}
        </div>
      ))}
    </div>
  );
}
