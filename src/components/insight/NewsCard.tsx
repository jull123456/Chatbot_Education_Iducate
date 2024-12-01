import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { NewsItem } from '../../types/insight';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img 
        src={news.thumbnail} 
        alt={news.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80';
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {news.snippet}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <a 
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read More
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}