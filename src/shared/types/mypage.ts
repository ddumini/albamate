// My Page
export interface DropdownValue {
  value: string;
  clickEvent: () => void;
}

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

export interface CardInfo {
  cardInfo: PostCardItem[];
}

// Scrap
export interface ScrapItem {
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

export interface ScrapInfo {
  nextCursor: number;
  data: ScrapItem[];
}
