import React from 'react';
import { Message } from '../../types/chat';
import { UserCircle, Bot } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-4 ${
            message.role === 'assistant' ? 'bg-gray-50' : ''
          } p-4 rounded-lg`}
        >
          {message.role === 'user' ? (
            <UserCircle className="w-8 h-8 text-gray-600" />
          ) : (
            <Bot className="w-8 h-8 text-purple-600" />
          )}
          <div className="flex-1">
            <div className="font-medium mb-1">
              {message.role === 'user' ? 'You' : 'Assistant'}
            </div>
            <div className="text-gray-700 leading-relaxed">{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}