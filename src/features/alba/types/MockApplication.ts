export interface Application {
  id: number;
  applicantId: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  status: 'PENDING' | 'REJECTED' | 'ACCEPTED';
  introduction: string;
  resumeName: string;
  resumeId: number;
  createdAt: string;
  updatedAt: string;
}
