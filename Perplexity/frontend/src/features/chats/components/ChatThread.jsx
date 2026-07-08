import React from "react";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { MESSAGES } from "../data/dummyData";

export default function ChatThread() {
  return (
    <div className="mt-5 space-y-6 divide-y divide-[#1a1a1c]">
      {MESSAGES.map((m, i) => (
        <div key={i} className={i === 0 ? "" : "pt-6"}>
          {m.role === "user" ? (
            <UserMessage content={m.content} />
          ) : (
            <AssistantMessage content={m.content} sources={m.sources} />
          )}
        </div>
      ))}
    </div>
  );
}
