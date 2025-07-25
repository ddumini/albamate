export interface Application {
  id: number;
  applicantId: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  status: 'INTERVIEW_PENDING' | 'REJECTED' | 'INTERVIEW_COMPLETED' | 'HIRED';
  introduction: string;
  resumeName: string;
  resumeId: number;
  createdAt: string;
  updatedAt: string;
}
