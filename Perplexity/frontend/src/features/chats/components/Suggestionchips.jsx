import React from 'react';

const SUGGESTIONS = [
  'Explain quantum computing simply',
  'Best MERN stack practices in 2026',
  'Compare LangChain vs LlamaIndex',
  'Latest AI research this week',
];

export default function SuggestionChips() {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-5">
      {SUGGESTIONS.map((text) => (
        <button
          key={text}
          className="text-[13px] font-body text-text-muted border border-border rounded-full px-4 py-2 hover:border-accent-dim hover:text-accent transition-colors"
        >
          {text}
        </button>
      ))}
    </div>
  );
}