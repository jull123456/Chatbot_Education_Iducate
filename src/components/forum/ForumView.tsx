import React, { useState } from 'react';
import { ForumHeader } from './ForumHeader';
import { ForumPost } from './ForumPost';
import { ForumInput } from './ForumInput';
import { ForumThread } from './ForumThread';

export function ForumView() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'trending'>('latest');

  const mockPosts = [
    {
      id: '1',
      title: 'University Information in Singapore',
      author: {
        name: 'Samuel H.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      },
      content: 'Various discuss information study seekers. View budget after dive-in (orientation). Anyone joins, let\'s share useful tips!',
      comments: 18,
      timestamp: '2h ago',
      likes: 24,
    },
    {
      id: '2',
      title: 'I need cost to Audit',
      author: {
        name: 'Angela F.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      },
      content: 'During last sem budget ok, now, uma external maybe extra. So one aged 23 audit courses.',
      comments: 5,
      timestamp: '3h ago',
      likes: 12,
    },
    {
      id: '3',
      title: 'Malaysia university registration',
      author: {
        name: 'Angela F.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      },
      content: 'Fresh sem started maybe extra. Come see last budget ok. english courses put all. hit one right.',
      comments: 0,
      timestamp: '4h ago',
      likes: 8,
    },
  ];

  const filteredPosts = mockPosts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => 
      sortBy === 'trending' ? b.likes - a.likes : 0
    );

  if (selectedPost) {
    const post = mockPosts.find(p => p.id === selectedPost);
    if (post) {
      return (
        <ForumThread 
          post={post} 
          onBack={() => setSelectedPost(null)}
        />
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 mb-16">
      <ForumHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <ForumPost 
            key={post.id} 
            post={post}
            onClick={() => setSelectedPost(post.id)}
          />
        ))}
      </div>
      <ForumInput />
    </div>
  );
}