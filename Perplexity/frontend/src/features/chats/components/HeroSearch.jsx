import React from "react";
import { Search, ArrowUp } from "lucide-react";
import { QUICK_PROMPTS } from "../data/dummyData";

export default function HeroSearch({ query, setQuery, askDummy }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
      <span
        className="text-center text-4xl text-[#F2F1EC] sm:text-5xl"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Ask <span className="text-[#D4AF37]">anything</span>
      </span>
      <p className="mt-2 text-center text-sm text-[#8B8B93]">
        Answers, grounded in sources — this is a static UI preview
      </p>

      <div className="mt-8 w-full max-w-2xl px-1">
        <div className="flex items-center gap-2 rounded-2xl border border-[#232326] bg-[#141416] px-4 py-3 focus-within:border-[#D4AF37]/60">
          <Search size={18} className="text-[#8B8B93]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askDummy(query)}
            placeholder="Ask a follow-up or start a new thread..."
            className="flex-1 bg-transparent text-sm text-[#F2F1EC] placeholder:text-[#5c5c62] outline-none"
          />
          <button
            onClick={() => askDummy(query)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37] text-black transition-transform hover:scale-105"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => askDummy(p)}
              className="rounded-full border border-[#232326] bg-[#141416] px-3 py-1.5 text-xs text-[#8B8B93] transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
