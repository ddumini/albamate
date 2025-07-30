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

export interface UpdateMyProfile {
  location?: string;
  phoneNumber: string;
  storePhoneNumber?: string;
  storeName?: string;
  imageUrl: string;
  nickname: string;
  name: string;
}

export interface EditPassword {
  newPassword: string;
  currentPassword: string;
}

export type ContentType = 'post' | 'comment' | 'scrap';
export type EmptyType =
  | 'post'
  | 'comment'
  | 'scrap'
  | 'albaList'
  | 'applyList'
  | 'albaTalkComment';

export interface FormData {
  nickname: string;
  storeName: string;
  storePhoneNumber: string;
  phoneNumber: string;
  location: string;
  role: 'APPLICANT' | 'OWNER';
  imageUrl: string;
  name: string;
  email: string;
  id: number;
}

export interface UpdateMyProfile {
  name: string;
  nickname: string;
  phoneNumber: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
  imageUrl: string;
}

// API Types
export interface PostApi {
  limit: number;
  orderBy: string;
  cursor?: number | null;
  enabled?: boolean;
}

export interface ScrapApi {
  limit: number;
  orderBy: string;
  cursor?: number | null;
  isPublic?: boolean | null;
  isRecruiting?: boolean | null;
  enabled?: boolean;
}

export interface CommentsApi {
  page: number;
  pageSize: number;
  enabled?: boolean;
}
