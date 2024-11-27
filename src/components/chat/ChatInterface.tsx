import React from 'react';
import { Send } from 'lucide-react';
import { SuggestionButton } from './SuggestionButton';

export function ChatInterface() {
  return (
    <div className="flex-1 flex flex-col bg-[#1a1f2e]">
      <div className="flex-1 flex items-center justify-center flex-col gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>
        <h1 className="text-white text-2xl font-semibold">Ask our AI anything</h1>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <p className="text-white text-sm font-medium mb-4">Suggestions on what to ask Our AI</p>
          <div className="flex gap-2 flex-wrap">
            <SuggestionButton>What can I ask you to do?</SuggestionButton>
            <SuggestionButton>Which one of my projects is performing the best?</SuggestionButton>
            <SuggestionButton>What projects should I be concerned about right now?</SuggestionButton>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Ask me anything about your projects"
            className="w-full bg-white/10 text-white placeholder-white/70 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}