import React from 'react';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { Post } from '../../types/forum';
import { formatTimeAgo } from '../../utils/date';
// import { useAuthStore } from '../../store/useAuthStore';

interface ForumPostProps {
  post: Post;
  onClick: () => void;
  onToggleLike: () => void;
}

export function ForumPost({ post, onClick, onToggleLike }: ForumPostProps) {
  // const { surveyData } = useAuthStore();

  // const authorInfo = post.author.id === 'current-user' && surveyData
  //   ? `${post.author.name}, ${surveyData.major} student from ${surveyData.country}`
  //   : post.author.name;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-blue-600">
              {post.author.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div onClick={onClick} className="cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              </div>
              {/* <p className="text-sm text-gray-600 mb-1">{authorInfo}</p> */}
              <p className="text-sm text-gray-600 mb-2">{post.content}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike();
                }}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.length}</span>
              </div>
              <span>{formatTimeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}