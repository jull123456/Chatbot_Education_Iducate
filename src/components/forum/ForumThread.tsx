import React from 'react';
import { ArrowLeft, MessageCircle, ThumbsUp } from 'lucide-react';

interface ThreadProps {
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
  onBack: () => void;
}

export function ForumThread({ post, onBack }: ThreadProps) {
  const mockComments = [
    {
      id: '1',
      author: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80',
      },
      content: 'This is really helpful information! Thanks for sharing.',
      timestamp: '1h ago',
      likes: 5,
    },
    {
      id: '2',
      author: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      },
      content: 'I had the same question. The orientation helped a lot.',
      timestamp: '30m ago',
      likes: 3,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 mb-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to discussions
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
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

      <div className="space-y-4">
        {mockComments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start gap-3">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-600 mb-2">{comment.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="hover:text-gray-700 flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="hover:text-gray-700">Reply</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}