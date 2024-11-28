import React from 'react';
import { Send } from 'lucide-react';

export function ForumInput() {
  return (
    <div className="fixed flex bottom-0 left-20 right-0 bg-white border-t p-4 z-20 shadow-md ">
      <div className="w-full max-w-3xl mx-auto flex items-center gap-4 px-4 left-100 right-0">
        {/* Input text area */}
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex-grow px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-50"
        />

        
        {/* Send button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
