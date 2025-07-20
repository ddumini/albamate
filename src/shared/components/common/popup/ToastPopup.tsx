'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ToastLikePopupProps {
  applyCount: number;
  duration?: number;
  visible: boolean;
  onClose: () => void;
}

const ToastPopup = ({
  applyCount,
  duration = 3000,
  visible,
  onClose,
}: ToastLikePopupProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 마운트 및 트랜지션 시작
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false); // 트랜지션 시작
      const timeout = setTimeout(() => setIsMounted(false), 500); // transition 종료 후 언마운트
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  // 자동 닫힘
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!isMounted) return null;

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
