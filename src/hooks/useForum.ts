import { useState } from 'react';
import { Post, Comment } from '../types/forum';

const initialPosts: Post[] = [
  {
    id: '1',
    title: 'University Information in Singapore',
    author: {
      id: '1',
      name: 'Samuel H.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    },
    content: 'Various discuss information study seekers. View budget after dive-in (orientation). Anyone joins, let\'s share useful tips!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    isLiked: false,
    comments: [],
  },
  {
    id: '2',
    title: 'I need cost to Audit',
    author: {
      id: '2',
      name: 'Angela F.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    },
    content: 'During last sem budget ok, now, uma external maybe extra. So one aged 23 audit courses.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    isLiked: false,
    comments: [],
  },
];

export function useForum() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (title: string, content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      author: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: [],
    };

    setPosts(currentPosts => [newPost, ...currentPosts]);
  };

  const addComment = (postId: string, content: string) => {
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                author: {
                  id: 'current-user',
                  name: 'You',
                  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
                },
                content,
                timestamp: new Date().toISOString(),
                likes: 0,
                isLiked: false,
                replies: [],
              },
            ],
          };
        }
        return post;
      })
    );
  };

  const addReply = (postId: string, commentId: string, content: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: Date.now().toString(),
                      author: {
                        id: 'current-user',
                        name: 'You',
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
                      },
                      content,
                      timestamp: new Date().toISOString(),
                      likes: 0,
                      isLiked: false,
                      replies: [],
                      parentId: commentId,
                    },
                  ],
                };
              }
              return comment;
            }),
          };
        }
        return post;
      })
    );
  };

  const toggleLike = (postId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const toggleCommentLike = (postId: string, commentId: string) => {
    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  isLiked: !comment.isLiked,
                  likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                };
              }
              return comment;
            }),
          };
        }
        return post;
      })
    );
  };

  return {
    posts,
    addPost,
    addComment,
    addReply,
    toggleLike,
    toggleCommentLike,
  };
}