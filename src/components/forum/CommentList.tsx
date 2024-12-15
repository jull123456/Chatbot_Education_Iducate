import React, { useState } from 'react';
import { ThumbsUp, CornerDownRight } from 'lucide-react';
import { Comment } from '../../types/forum';
import { formatTimeAgo } from '../../utils/date';
import { CommentInput } from './CommentInput';

interface CommentListProps {
  comments: Comment[];
  onAddReply: (commentId: string, content: string) => void;
  onToggleLike: (commentId: string) => void;
}

export function CommentList({ comments, onAddReply, onToggleLike }: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitReply = (commentId: string, content: string) => {
    onAddReply(commentId, content);
    setReplyingTo(null);
  };

  const renderComment = (comment: Comment, level = 0) => (
    <div key={comment.id} className={`${level > 0 ? 'ml-8' : ''}`}>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-start gap-3">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-sm text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
            </div>
            <p className="text-gray-600 mb-2">{comment.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button 
                onClick={() => onToggleLike(comment.id)}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
                <span>{comment.likes}</span>
              </button>
              <button 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <CornerDownRight className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {replyingTo === comment.id && (
        <div className="ml-8 mt-2">
          <CommentInput
            value=""
            onChange={() => {}}
            onSubmit={(e, content) => {
              e.preventDefault();
              handleSubmitReply(comment.id, content);
            }}
            placeholder="Write a reply..."
            autoFocus
          />
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-2">
          {comment.replies.map(reply => renderComment(reply, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {comments.map(comment => renderComment(comment))}
    </div>
  );
}