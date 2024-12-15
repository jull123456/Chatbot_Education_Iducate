import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ForumInputProps {
  onSubmit: (title: string, content: string) => void;
}

export function ForumInput({ onSubmit }: ForumInputProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-[16rem] right-0 bg-white border-t p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
        {isExpanded && (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        )}
        <div className="flex gap-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            onFocus={() => setIsExpanded(true)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}