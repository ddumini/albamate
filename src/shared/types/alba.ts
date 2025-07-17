export interface AlbaItem {
  id: number;
  title: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  imageUrls: string[];
  applyCount: number;
  scrapCount: number;
  isPublic: boolean;
  createdAt: string;
}

export type UserRole = 'APPLICANT' | 'OWNER';

export interface User {
  role: UserRole;
}
