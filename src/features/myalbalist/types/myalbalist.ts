export interface ApplicantMyAlbaItem {
  updatedAt: string;
  createdAt: string;
  status: 'REJECTED' | 'INTERVIEW_PENDING' | 'INTERVIEW_COMPLETED' | 'HIRED';
  resumeName: string;
  resumeId: number;
  form: {
    owner: {
      imageUrl: string;
      storeName: string;
      id: number;
    };
    recruitmentEndDate: string;
    recruitmentStartDate: string;
    description: string;
    title: string;
    id: number;
  };
  id: number;
}

export interface OwnerMyAlbaItem {
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

export type UserRole = 'APPLICANT' | 'OWNER';

export interface User {
  role: UserRole;
}
