'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * ToastPopup 컴포넌트 Props 타입
 * @typedef {Object} ToastLikePopupProps
 * @property {number} applyCount - 지원자 수
 * @property {number} [duration=3000] - 자동으로 사라지는 시간 (ms)
 * @property {boolean} visible - 외부에서 팝업을 보여줄지 여부
 * @property {() => void} onClose - 팝업 닫힘 시 호출되는 콜백
 */
interface ToastLikePopupProps {
  applyCount: number;
  duration?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 지원자 수를 알려주는 토스트 팝업 컴포넌트
 *
 * - `visible`이 true일 때 애니메이션과 함께 표시됨
 * - 일정 시간이 지나면 자동으로 사라지며 `onClose` 콜백 호출
 * - `applyCount`에 따라 문구 동적으로 표시
 *
 * @component
 * @param {ToastLikePopupProps} props - 토스트 팝업 속성
 * @returns {JSX.Element | null}
 */
const ToastPopup = ({
  applyCount,
  duration = 3000,
  visible,
  onClose,
}: ToastLikePopupProps) => {
  const [mounted, setMounted] = useState(false); // 컴포넌트가 DOM에 존재하는지 여부
  const [isVisible, setIsVisible] = useState(false); // 트랜지션 상태 (등장/퇴장 여부)

  /**
   * `visible` 상태 변경 시 트랜지션 적용
   * @effect
   */
  useEffect(() => {
    if (visible) {
      setMounted(true);
      setIsVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setMounted(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  /**
   * `duration` 이후 자동으로 닫히는 타이머 처리
   * @effect
   */
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setMounted(false);
        onClose();
      }, 500);
      return () => clearTimeout(hideTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`Text-white-gray fixed top-50 left-1/2 z-51 mx-12 flex max-w-[1200px] min-w-[300px] -translate-x-1/2 items-center gap-4 rounded-xl bg-blue-300 px-40 py-12 text-xs whitespace-nowrap shadow-lg transition-all duration-500 ease-in-out md:text-md lg:text-lg ${
        isVisible ? 'translate-y-0 opacity-92' : '-translate-y-12 opacity-0'
      }`}
      style={{ width: 'calc(100vw - 3rem * 2)' }}
    >
      <div className="relative h-24 w-24 lg:h-36 lg:w-36">
        <Image fill alt="사용자 이미지" src="/icons/user.svg" />
      </div>
      <span className="flex-1">
        현재 <span className="font-semibold text-mint-400">{applyCount}명</span>
        이 지원했어요!
      </span>
      <button
        aria-label="닫기"
        className="relative h-24 w-24 cursor-pointer transition hover:brightness-75 md:h-30 md:w-30 lg:h-36 lg:w-36"
        type="button"
        onClick={onClose}
      >
        <Image fill alt="닫기 버튼" src="/icons/x-thin.svg" />
      </button>
    </div>
  );
};

export default ToastPopup;
