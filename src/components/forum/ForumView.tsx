import React, { useState } from 'react';
import { ForumHeader } from './ForumHeader';
import { ForumPost } from './ForumPost';
import { ForumInput } from './ForumInput';
import { ForumThread } from './ForumThread';
import { useForum } from '../../hooks/useForum';

export function ForumView() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'trending'>('latest');
  const { posts, addPost, addComment, addReply, toggleLike, toggleCommentLike } = useForum();

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => 
      sortBy === 'trending' ? b.likes - a.likes : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  if (selectedPost) {
    const post = posts.find(p => p.id === selectedPost);
    if (post) {
      return (
        <ForumThread 
          post={post} 
          onBack={() => setSelectedPost(null)}
          onAddComment={(content) => addComment(post.id, content)}
          onAddReply={(commentId, content) => addReply(post.id, commentId, content)}
          onToggleLike={() => toggleLike(post.id)}
          onToggleCommentLike={(commentId) => toggleCommentLike(post.id, commentId)}
        />
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 pb-32">
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
            onToggleLike={() => toggleLike(post.id)}
          />
        ))}
      </div>
      <ForumInput onSubmit={addPost} />
    </div>
  );
}