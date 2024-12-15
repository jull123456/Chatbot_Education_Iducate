import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit: (e: React.FormEvent, content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function CommentInput({ 
  value: propValue, 
  onChange,
  onSubmit,
  placeholder = "Add a comment...",
  autoFocus = false
}: CommentInputProps) {
  const [localValue, setLocalValue] = useState('');
  const value = propValue ?? localValue;
  
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setLocalValue(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(e, value.trim());
      if (!onChange) {
        setLocalValue('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}