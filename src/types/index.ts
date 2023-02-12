interface PostCard {
  id: string;
  title: string;
  createdAt: number;
}

interface Post {
  id: string;
  author?: string;
  title: string;
  createdAt: number;
  description?: string;
}

export type { PostCard, Post };
