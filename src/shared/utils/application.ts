/**
 * 지원 상태에 따른 라벨 반환
 */
export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'REJECTED':
      return '거절됨';
    case 'INTERVIEW_PENDING':
      return '면접 대기';
    case 'INTERVIEW_COMPLETED':
      return '면접 완료';
    case 'HIRED':
      return '채용됨';
    default:
      return '알수없음';
  }
};

/**
 * 지원 상태에 따른 Tailwind 텍스트 색상 클래스 반환
 */
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'REJECTED':
      return 'text-error';
    case 'INTERVIEW_PENDING':
      return 'text-gray-500';
    case 'INTERVIEW_COMPLETED':
      return 'text-blue-600';
    case 'HIRED':
      return 'text-mint-400';
    default:
      return 'text-black'; // 소문자 주의
  }
};

/**
 * 경력 개월 수를 년/개월 단위로 변환한 라벨 반환
 * @param months 전체 경력 개월 수
 * @returns 경력 문자열 (예: '2년 3개월', '5개월', '없음')
 */
export const getExperienceLabel = (months: number): string => {
  if (months === 0) return '없음';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years}년 ${remainingMonths}개월`;
  }

  if (years > 0) {
    return `${years}년`;
  }

  return `${remainingMonths}개월`;
};
