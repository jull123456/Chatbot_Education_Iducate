import React from 'react';
import { MessageCircle, ThumbsUp } from 'lucide-react';

interface ForumPostProps {
  post: {
    id: string;
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    comments: number;
    timestamp: string;
    likes: number;
  };
  onClick: () => void;
}

export function ForumPost({ post, onClick }: ForumPostProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{post.content}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
            <span>{post.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}