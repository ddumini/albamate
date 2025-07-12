'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ToastLikePopupProps {
  message: string;
}

const Popup = ({ message }: ToastLikePopupProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="BG-blueblack Text-white-gray fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl px-24 py-6 text-xs shadow-lg md:px-40 md:py-12 md:text-md">
      {/* 아이콘 */}
      <div className="relative h-24 w-24">
        <Image fill alt="사용자 이미지" src="/icons/user.svg" />
      </div>

      {/* 메시지 */}
      <span className="flex-1">{message}</span>

      {/* 닫기 버튼 */}
      <button
        aria-label="닫기"
        className="text-white-gray transition-colors hover:text-white"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  );
};

export default Popup;
