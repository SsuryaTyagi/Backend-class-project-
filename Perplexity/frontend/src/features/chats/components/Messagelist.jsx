import React, { useRef, useEffect } from "react";
import MessageBlock from "./MessageBlock";

/**
 * Scrollable conversation view. Auto-scrolls to bottom on new messages.
 * Props: messages: [{ role, content, timestamp }]
 */
export default function MessageList({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
      {messages.map((m, i) => (
        <MessageBlock key={i} {...m} />
      ))}
    </div>
  );
}