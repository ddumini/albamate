/**
 * 상대적 시간 포맷팅 (오늘, 어제, n일 전)
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return '오늘';
  } else if (diffDays === 2) {
    return '어제';
  } else if (diffDays <= 7) {
    return `${diffDays - 1}일 전`;
  } else if (diffDays <= 30) {
    const weeks = Math.floor((diffDays - 1) / 7);
    return `${weeks}주 전`;
  } else if (diffDays <= 365) {
    const months = Math.floor((diffDays - 1) / 30);
    return `${months}개월 전`;
  } else {
    const years = Math.floor((diffDays - 1) / 365);
    return `${years}년 전`;
  }
};

/**
 * 절대적 날짜 포맷팅 (YYYY.MM.DD)
 */
export const formatAbsoluteDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
};

/**
 * 시간 포함 포맷팅 (YYYY.MM.DD HH:mm)
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const dateStr = formatAbsoluteDate(dateString);
  const timeStr = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${dateStr} ${timeStr}`;
};

/**
 * 한국어 날짜 포맷팅 (YYYY MM월 DD일)
 */
export const formatKoreanDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * 게시글 목록용 포맷팅 (상대적 시간 우선, 오래된 건 절대 날짜)
 */
export const formatPostDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 7일 이내는 상대적 시간
  if (diffDays <= 7) {
    return formatRelativeTime(dateString);
  }

  // 7일 이후는 절대 날짜
  return formatAbsoluteDate(dateString);
};

// 타입 정의
export type DateFormatType =
  | 'relative' // 상대적 시간 (오늘, 어제, n일 전)
  | 'absolute' // 절대 날짜 (2024.12.28)
  | 'korean' // 한국어 날짜 (2024년 12월 28일)
  | 'datetime' // 날짜 + 시간 (2024.12.28 14:30)
  | 'post'; // 게시글용 (혼합)

/**
 * 통합 날짜 포맷팅 함수
 *
 * @example
 * ```tsx
 * {formatDate(post.createdAt, 'post')}
 * ```
 */
export const formatDate = (
  dateString: string,
  type: DateFormatType = 'relative'
): string => {
  switch (type) {
    case 'relative':
      return formatRelativeTime(dateString);
    case 'absolute':
      return formatAbsoluteDate(dateString);
    case 'korean':
      return formatKoreanDate(dateString);
    case 'datetime':
      return formatDateTime(dateString);
    case 'post':
      return formatPostDate(dateString);
    default:
      return formatRelativeTime(dateString);
  }
};
