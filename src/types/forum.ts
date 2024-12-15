export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  parentId?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}