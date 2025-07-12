'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * @typedef {Object} ToastLikePopupProps
 * @property {number} [count] - 현재 지원한 알바생 수
 * @property {number} [duration=3000] - 자동으로 닫히기까지의 시간 (ms)
 * @property {boolean} visible - 팝업 표시 여부
 * @property {() => void} onClose - 팝업 종료 시 실행되는 콜백 함수
 */
interface ToastLikePopupProps {
  count?: number;
  duration?: number;
  visible: boolean;
  onClose: () => void;
}

/**
 * 현재 이 페이지를 보고 있는 사용자 수를 나타내는 토스트 형태의 팝업 컴포넌트입니다.
 * 자동 닫힘 기능과 애니메이션 효과를 포함합니다.
 *
 * @component
 * @param {ToastLikePopupProps} props - 팝업에 전달되는 props
 */
const Popup = ({
  count = 3,
  duration = 3000,
  visible,
  onClose,
}: ToastLikePopupProps) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const [animationClass, setAnimationClass] = useState('');

  // 애니메이션 관리
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // 아래에서 위로 등장
      requestAnimationFrame(() => {
        setAnimationClass('opacity-95 translate-y-0');
      });
    } else {
      // 위로 사라짐
      setAnimationClass('opacity-0 -translate-y-12');
      const timeout = setTimeout(() => setShouldRender(false), 500); // transition 시간과 일치
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  // 자동 닫힘
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`BG-blueblack Text-white-gray fixed top-50 left-1/2 z-50 mx-12 flex max-w-[1200px] min-w-[300px] -translate-x-1/2 items-center gap-4 rounded-xl px-24 py-12 text-xs whitespace-nowrap shadow-lg transition-all duration-500 ease-in-out md:px-80 md:text-md lg:px-300 lg:text-lg ${animationClass} `}
      style={{ width: 'calc(100vw - 3rem * 2)' }}
    >
      {/* 아이콘 */}
      <div className="relative h-24 w-24 lg:h-36 lg:w-36">
        <Image fill alt="사용자 이미지" src="/icons/user.svg" />
      </div>

      {/* 메시지 */}
      <span className="flex-1">
        현재 <span className="font-semibold text-mint-400">{count}명</span>이
        지원했어요!
      </span>

      {/* 닫기 버튼 */}
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

export default Popup;
