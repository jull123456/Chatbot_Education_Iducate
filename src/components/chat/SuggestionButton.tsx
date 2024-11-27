import React from 'react';

interface SuggestionButtonProps {
  children: React.ReactNode;
}

export function SuggestionButton({ children }: SuggestionButtonProps) {
  return (
    <button className="px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors text-sm">
      {children}
    </button>
  );
}