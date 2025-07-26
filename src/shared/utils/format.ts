import { differenceInCalendarDays, format } from 'date-fns';

/**
 * 마감일 기준 D-Day 텍스트 반환
 * @param endDate ISO 형식의 마감일 (예: 2025-07-30)
 * @returns 예: "D-3", "모집 마감"
 */
export const getDDayString = (endDate: string): string => {
  const today = new Date();
  const end = new Date(endDate);
  const daysLeft = differenceInCalendarDays(end, today);

  return daysLeft >= 0 ? `D-${daysLeft}` : '모집 마감';
};

/**
 * 날짜를 YYYY.MM.DD. 형식으로 포맷 (긴 형식)
 * @param isoString ISO 형식의 날짜 문자열
 * @returns 예: "2025.07.24."
 */
export const formatDateLong = (isoString: string): string => {
  const [year, month, day] = isoString.slice(0, 10).split('-');
  return `${year}.${month}.${day}.`;
};

/**
 * 날짜를 YY.MM.DD. 형식으로 포맷 (짧은 형식)
 * @param isoString ISO 형식의 날짜 문자열
 * @returns 예: "25.07.24."
 */
export const formatDateShort = (isoString: string): string => {
  const [year, month, day] = isoString.slice(0, 10).split('-');
  return `${year?.slice(2)}.${month}.${day}.`;
};

/**
 * 날짜시간을 YYYY.MM.DD HH:mm 형식으로 포맷
 * @param isoString ISO 형식의 날짜시간 문자열
 * @returns 예: "2025.07.24 14:30"
 */
export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return '-';
  }
  return format(date, 'yyyy.MM.dd HH:mm');
};

/**
 * 전화번호를 하이픈(-)으로 구분된 형식으로 변환
 * @param phone 원본 전화번호 문자열
 * @param isOwnerPhone 사장님 번호 여부 (true면 3-4-4, false면 2-4-4)
 * @returns 하이픈(-) 구분된 전화번호
 */
export const formatPhoneNumber = (
  phone: string,
  isOwnerPhone = false
): string => {
  const digits = phone.replace(/\D/g, '');

  if (isOwnerPhone) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }
};
