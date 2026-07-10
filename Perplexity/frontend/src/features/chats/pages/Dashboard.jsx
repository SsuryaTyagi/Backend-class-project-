import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileTopBar from "../components/MobileTopBar";
import HeroSearch from "../components/HeroSearch";
import AnswerView from "../components/AnswerView";
import { useChat } from "../hooks/useChat";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .thin-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
    .thin-scrollbar::-webkit-scrollbar-thumb { background: #232326; border-radius: 999px; }
  `}</style>
);

export default function PerplexityDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    initializeSocketConnection,
    fetchChats,
    handleSendMessage,
    selectChat,
    chatsLoading,
    messagesLoading,
    sendLoading,
    chats,
    error,
    currentChatId,
  } = useChat();



  const view = currentChatId ? "answer" : "home";
  const activeChat = currentChatId ? chats[currentChatId] : null;
  const messages = activeChat?.message || [];
  const title = activeChat?.title || messages[0]?.content || "New chat";

  const goHome = () => selectChat(null);

  // No chatId yet → backend creates a brand-new chat
  const startNewChat = (text) => handleSendMessage(text, null);

  // Existing chat → appends to it
  const sendFollowUp = (text) => handleSendMessage(text, currentChatId);

  return (
    <div
      className="relative flex h-screen w-screen overflow-hidden bg-[#0A0A0B] text-[#F2F1EC]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <GlobalStyles />

      {error && (
        <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4">
          <div className="pointer-events-auto rounded-lg border border-red-500/40 bg-[#1a0d0d] px-4 py-2 text-sm text-red-300 shadow-lg">
            {error}
          </div>
        </div>
      )}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        view={view}
        chats={chats}
        activeChat={currentChatId}
        goHome={goHome}
        openThread={selectChat}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar setMobileOpen={setMobileOpen} />

        {view === "home" ? (
          <HeroSearch onSend={startNewChat} loading={sendLoading} />
        ) : (
          <AnswerView
            title={title}
            messages={messages}
            goHome={goHome}
            onSend={sendFollowUp}
            loading={messagesLoading || sendLoading}
          />
        )}
      </main>
    </div>
  );
}