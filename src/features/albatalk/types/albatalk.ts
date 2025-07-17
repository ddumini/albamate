export interface Writer {
  id: number;
  nickname: string;
  imageUrl: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface PostsResponse {
  data: Post[];
  nextCursor: number | null;
}

export interface GetPostsParams {
  limit: number;
  cursor?: number;
  orderBy?: 'mostRecent' | 'mostCommented' | 'mostLiked';
  keyword?: string;
}
