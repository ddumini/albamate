'use client';
import Image from 'next/image';
import { useEffect } from 'react';

interface ToastLikePopupProps {
  count?: number;
  duration?: number;
  visible: boolean;
  onClose: () => void;
}

const Popup = ({
  count = 3,
  duration = 3000,
  visible,
  onClose,
}: ToastLikePopupProps) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className="BG-blueblack Text-white-gray fixed top-50 left-1/2 z-50 mx-12 flex max-w-[1200px] -translate-x-1/2 items-center gap-4 rounded-xl px-24 py-12 text-xs whitespace-nowrap opacity-95 shadow-lg md:px-80 md:text-md lg:px-[300px] lg:text-lg"
      style={{ width: 'calc(100vw - 3rem * 2)' }} // 3rem = 12 (mx-12)
    >
      {/* 아이콘 */}
      <div className="relative h-24 w-24 lg:h-36 lg:w-36">
        <Image fill alt="사용자 이미지" src="/icons/user.svg" />
      </div>

      {/* 메시지 */}
      <span className="flex-1">
        현재 <span className="font-semibold text-mint-400">{count}명</span>이 이
        알바폼을 보는 중이에요!
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
