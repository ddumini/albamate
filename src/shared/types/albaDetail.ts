export interface AlbaItemDetail {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  recruitmentStartDate: string; // ISO 형식의 문자열
  recruitmentEndDate: string;
  imageUrls: string[];
  location: string;
  workStartDate: string;
  workEndDate: string;
  workStartTime: string; // "HH:mm" 형식 문자열
  workEndTime: string;
  workDays: string[]; // 예: ["월", "화"]
  isNegotiableWorkDays: boolean;
  hourlyWage: number;
  isPublic: boolean;
  numberOfPositions: number;
  gender: string;
  education: string;
  age: string;
  preferred: string;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
  scrapCount: number;
  applyCount: number;
  isScrapped: boolean;
  createdAt: string;
  updatedAt: string;
}
