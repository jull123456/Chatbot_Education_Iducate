import React from 'react';
import { NewsUpdate } from '../../types/insight';
import { InsightNewsCard } from './InsightNewsCard';

const mockUpdates: NewsUpdate[] = [
  {
    id: '1',
    title: 'Peace, dignity and equality on a healthy planet',
    date: '24 Nov 2024',
    excerpt: 'Exploring the importance of sustainable development and global cooperation in creating a better future for all.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80',
    commentsCount: 156,
  },
  {
    id: '2',
    title: 'Why do we mark International Days?',
    date: '24 Oct 2024',
    excerpt: 'International days and weeks are occasions to educate the public on issues of concern, mobilize political will and resources.',
    image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&q=80',
    commentsCount: 98,
  },
  {
    id: '3',
    title: 'How it Started?',
    date: '24 Oct 2024',
    excerpt: 'In 1945, representatives of 50 countries met in San Francisco to shape the future of international cooperation.',
    image: 'https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?auto=format&fit=crop&q=80',
    commentsCount: 124,
  },
];

export function InsightDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">NEWS Updates</h1>
        <div className="h-0.5 w-24 bg-blue-600"></div>
        <p className="text-gray-700 mt-4 font-medium">— {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockUpdates.map((update) => (
          <InsightNewsCard key={update.id} news={update} />
        ))}
      </div>
    </div>
  );
}