// My Page
export interface DropdownValue {
  value: string;
  clickEvent: () => void;
}

export type Role = 'OWNER' | 'APPLICANT';

// Post
export interface PostCardItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    imageUrl: string | null;
  };
}

export interface PostCardProps {
  cardInfo: PostCardItem[];
}

// Comment
export interface CommentCardItem {
  post: {
    content: string;
    title: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface CommentCardProps {
  cardInfo: CommentCardItem[];
}

// Scrap
export interface ScrapCardItem {
  updatedAt: string;
  createdAt: string;
  isPublic: boolean;
  scrapCount: number;
  applyCount: number;
  imageUrls: string[];
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  title: string;
  id: number;
}

export interface ScrapCardProps {
  cardInfo: ScrapCardItem[];
}

export interface SortOption {
  value: string;
  label: string;
}

export type ContentType = 'post' | 'comment' | 'scrap';
