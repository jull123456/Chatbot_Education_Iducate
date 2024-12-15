import React from 'react';
import { ArrowLeft, MessageCircle, ThumbsUp } from 'lucide-react';
import { Post } from '../../types/forum';
import { formatTimeAgo } from '../../utils/date';
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';

interface ThreadProps {
  post: Post;
  onBack: () => void;
  onAddComment: (content: string) => void;
  onAddReply: (commentId: string, content: string) => void;
  onToggleLike: () => void;
  onToggleCommentLike: (commentId: string) => void;
}

export function ForumThread({ 
  post, 
  onBack, 
  onAddComment, 
  onAddReply,
  onToggleLike,
  onToggleCommentLike 
}: ThreadProps) {
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
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button 
                onClick={onToggleLike}
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

      <CommentInput 
        onSubmit={(e, content) => {
          e.preventDefault();
          onAddComment(content);
        }}
      />

      <CommentList 
        comments={post.comments}
        onAddReply={onAddReply}
        onToggleLike={onToggleCommentLike}
      />
    </div>
  );
}