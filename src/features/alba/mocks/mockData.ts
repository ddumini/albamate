export interface MockAlbaItem {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  imageUrls: string[];
  location: string;
  workStartDate: string;
  workEndDate: string;
  workStartTime: string;
  workEndTime: string;
  workDays: string[];
  isNegotiableWorkDays: boolean;
  hourlyWage: number;
  isPublic: boolean;
  numberOfPositions: number;
  gender: string;
  education: string;
  age: string;
  preferred: string;
  applyCount: number;
  scrapCount: number;
  createdAt: string;
  updatedAt: string;
  storeName: string;
  storePhoneNumber: string;
  phoneNumber: string;
  isScrapped: boolean;
}

export const albaMockData: MockAlbaItem[] = [
  {
    id: 452,
    ownerId: 272,
    title: '홀서빙 알바 모집해요',
    description: '테스트 알바 모집 공고입니다.',
    recruitmentStartDate: '2025-05-22T06:02:04.727Z',
    recruitmentEndDate: '2025-05-26T06:02:04.727Z',
    imageUrls: [''],
    location: '서울시 관악구 남부순환로 168라길 17',
    workStartDate: '2025-05-29T06:02:04.727Z',
    workEndDate: '2025-12-22T06:02:04.727Z',
    workStartTime: '18:00',
    workEndTime: '23:00',
    workDays: ['토', '일'],
    isNegotiableWorkDays: true,
    hourlyWage: 13000,
    isPublic: true,
    numberOfPositions: 2,
    gender: '남자',
    education: '학력 무관',
    age: '20',
    preferred: '경력 무관',
    applyCount: 2,
    scrapCount: 1,
    createdAt: '2025-05-22T06:03:59.006Z',
    updatedAt: '2025-05-26T01:53:09.080Z',
    storeName: '사장님test',
    storePhoneNumber: '0212341234',
    phoneNumber: '01012341234',
    isScrapped: false,
  },
  {
    id: 450,
    ownerId: 272,
    title: '제목입니다',
    description: '설명입니다',
    recruitmentStartDate: '2025-05-14T04:50:34.859Z',
    recruitmentEndDate: '2025-05-12T04:50:34.859Z',
    imageUrls: [''],
    location: '서울시 관악구 남부순환로 168라길',
    workStartDate: '2025-05-18T04:50:34.859Z',
    workEndDate: '2025-05-20T04:50:34.859Z',
    workStartTime: '09:00',
    workEndTime: '18:00',
    workDays: ['월', '화', '수', '목', '금'],
    isNegotiableWorkDays: true,
    hourlyWage: 13000,
    isPublic: true,
    numberOfPositions: 3,
    gender: '',
    education: '',
    age: '20',
    preferred: '',
    applyCount: 0,
    scrapCount: 0,
    createdAt: '2025-05-12T04:52:18.906Z',
    updatedAt: '2025-05-12T04:52:18.906Z',
    storeName: '사장님test',
    storePhoneNumber: '0212341234',
    phoneNumber: '01012341234',
    isScrapped: false,
  },
];
