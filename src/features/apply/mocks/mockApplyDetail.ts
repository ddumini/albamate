import { ApplyResponse } from '../types/apply';

export const mockApplyDetail: ApplyResponse = {
  id: 341,
  name: '김철이',
  phoneNumber: '01012341234',
  experienceMonths: 7,
  resumeId: 242,
  resumeName: '김철이_이력서.pdf',
  introduction:
    '안녕하세요. 김철이입니다. 스터디카페와 가까운 곳에 거주중이고, 타 스터디카페 근무 경험 있습니다.(****스터디 카페 6개월 근무) 현재 휴학 중으로 근무 빠지지 않고 할 수 있습니다. 감사합니다.!',
  status: 'INTERVIEW_PENDING',
  createdAt: '2025-07-21T14:56:15.791Z',
  updatedAt: '2025-07-21T14:56:15.791Z',
  applicantId: 446,
};

export default mockApplyDetail;
