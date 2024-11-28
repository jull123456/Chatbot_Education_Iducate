import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { NewsUpdate } from '../../types/insight';

interface NewsCardProps {
  news: NewsUpdate;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <img 
        src={news.image} 
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-blue-600 mb-3 font-medium">
          <Calendar className="w-4 h-4" />
          <span>{news.date}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{news.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2">{news.excerpt}</p>
        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
          <MessageSquare className="w-4 h-4" />
          <span>{news.commentsCount} comments</span>
        </div>
      </div>
    </div>
  );
}