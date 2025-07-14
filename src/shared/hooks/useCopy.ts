import { useState } from 'react';

/**
 * 클립보드 복사 훅
 *
 * - 텍스트를 클립보드에 복사하는 기능을 제공합니다.
 * - 복사 성공 여부를 상태로 관리합니다.
 * - 복사 성공/실패 시 사용자에게 알림을 제공합니다.
 *
 * @author sumin
 * @date 2025-07-13
 *
 * @returns {Object} 복사 함수와 복사 상태를 포함한 객체
 * @returns {function} copyToClipboard - 텍스트를 클립보드에 복사하는 비동기 함수
 * @returns {boolean} isCopied - 복사 성공 여부 상태
 *
 * @example
 * const { copyToClipboard, isCopied } = useCopy();
 * <button onClick={() => copyToClipboard('복사할 텍스트')}>복사</button>
 *
 * @param {Object} props
 * @param {string} props.text - 복사할 텍스트
 */

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      alert('주소가 클립보드에 복사되었습니다.'); // TODO: 토스트 메세지로 변경 가능
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('복사 실패:', err);
      alert('복사에 실패했습니다.');
      return false;
    }
  };

  return { copyToClipboard, isCopied };
};
