import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useChat } from '../hooks/useChat';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import Greeting from '../components/Greeting';
import SearchBar from '../components/PromptInput';
import SuggestionChips from '../components/Suggestionchips';


export default function Dashboard() {

  const { initializeSocketConnection } = useChat();

  const { user } = useAuth();
      console.log(user);

  React.useEffect(() => {
    initializeSocketConnection();
  }, []);

  return (
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import EmptyState from "./components/EmptyState";
import MessageList from "./components/MessageList";
import PromptInput from "./components/PromptInput";
import { mockThreads } from "./data/mockData";

/**
 * VisionAI dashboard shell.
 *
 * To wire this up to real data:
 *  - Replace `mockThreads` with your getChatsController API response
 *    (e.g. via a useEffect + fetch, or a Redux Toolkit thunk).
 *  - Replace the local `messages` state + handleSubmit with your
 *    Redux chat slice: dispatch a thunk that calls chatController,
 *    then read messages from the store instead of useState.
 */
export default function VisionAIDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeThread, setActiveThread] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const hasConversation = messages.length > 0;

  const handleSubmit = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
  }
  return (
    <div className="flex h-screen w-full bg-vision-bg font-body">
      <Sidebar
        collapsed={collapsed}
        threads={mockThreads}
        activeId={activeThread}
        onSelect={setActiveThread}
        userName="Surya"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          hasConversation={hasConversation}
        />

        {!hasConversation ? (
          <EmptyState value={input} onChange={setInput} onSubmit={handleSubmit} />
        ) : (
          <>
            <MessageList messages={messages} />
            <div className="px-6 pb-6 pt-4 flex justify-center">
              <PromptInput value={input} onChange={setInput} onSubmit={handleSubmit} compact />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
  )
}
