import React from 'react';
import { Send } from 'lucide-react';

export function ForumInput() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="max-w-3xl mx-auto flex gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}