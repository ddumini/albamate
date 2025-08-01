/**
 * 고유한 파일 이름을 생성하는 함수
 * @param originalFile - 원본 File 객체 (확장자를 가져오기 위해 사용)
 * @returns - 고유한 새로운 파일 이름 (확장자 포함)
 */
export const generateUniqueFileName = (originalFile: File): string => {
  const fileExtension = originalFile.name.split('.').pop();
  const uniquePart = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  return `${uniquePart}.${fileExtension}`;
};
