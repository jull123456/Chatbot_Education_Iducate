import React from 'react';

interface ForumHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'latest' | 'trending';
  onSortChange: (sort: 'latest' | 'trending') => void;
}

export function ForumHeader({ searchTerm, onSearchChange, sortBy, onSortChange }: ForumHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">TalkPoint</h1>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Topic"
          className="w-full sm:w-96 px-4 py-2 rounded-full border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <div className="flex gap-4">
          <button 
            onClick={() => onSortChange('latest')}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              sortBy === 'latest' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Latest
          </button>
          <button 
            onClick={() => onSortChange('trending')}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              sortBy === 'trending' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Trending
          </button>
        </div>
      </div>
    </div>
  );
}