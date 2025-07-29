// 기본 지원서 데이터 타입
export interface ApplicationData {
  password: string;
  introduction: string;
  resumeData: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
}

// 지원서 생성 요청 타입
export interface CreateApplicationRequest {
  formId: number;
  ApplicationData: ApplicationData;
}

// 지원서 응답 타입 (생성 후 반환되는 데이터)
export interface ApplicationResponse {
  id: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  introduction: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  applicantId: number;
}

// 지원서 상태 타입
export type ApplicationStatus =
  | 'INTERVIEW_PENDING'
  | 'REJECTED'
  | 'INTERVIEW_COMPLETED'
  | 'HIRED';

// 지원서 상태 업데이트 요청 타입
export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus;
}

// 지원서 상태 업데이트 응답 타입
export interface UpdateApplicationStatusResponse {
  applicantId: number;
  updatedAt: string;
  createdAt: string;
  status: ApplicationStatus;
  introduction: string;
  resumeName: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
  id: number;
}
