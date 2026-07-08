import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MobileTopBar from "./components/MobileTopBar";
import HeroSearch from "./components/HeroSearch";
import AnswerView from "./components/AnswerView";

/* Global font import + scrollbar utilities used across sub-components */
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
  const [view, setView] = useState("home"); // "home" | "answer"
  const [query, setQuery] = useState("");
  const [activeThread, setActiveThread] = useState(null);
  const [tab, setTab] = useState("answer"); // "answer" | "sources"
  const [mobileOpen, setMobileOpen] = useState(false);

  const goHome = () => {
    setView("home");
    setQuery("");
    setActiveThread(null);
    setTab("answer");
  };

  const askDummy = (text) => {
    if (!text.trim()) return;
    setQuery(text);
    setActiveThread(null);
    setTab("answer");
    setView("answer");
  };

  const openThread = (t) => {
    setActiveThread(t);
    setQuery(t.title);
    setTab("answer");
    setView("answer");
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden bg-[#0A0A0B] text-[#F2F1EC]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <GlobalStyles />

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        view={view}
        activeThread={activeThread}
        goHome={goHome}
        openThread={openThread}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar setMobileOpen={setMobileOpen} />

        {view === "home" ? (
          <HeroSearch query={query} setQuery={setQuery} askDummy={askDummy} />
        ) : (
          <AnswerView query={query} tab={tab} setTab={setTab} goHome={goHome} />
        )}
      </main>
    </div>
  );
}