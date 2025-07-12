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
    <div className="BG-blueblack Text-white-gray fixed top-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl px-24 py-12 text-xs whitespace-nowrap shadow-lg md:px-40 md:text-md lg:px-80 lg:py-20 lg:text-lg">
      {/* 아이콘 */}
      <div className="relative h-24 w-24 lg:h-36 lg:w-36">
        <Image fill alt="사용자 이미지" src="/icons/user.svg" />
      </div>

      {/* 메시지 */}
      <span className="flex-1">{message}</span>

      {/* 닫기 버튼 */}
      <button
        className="relative h-24 w-24 cursor-pointer md:h-30 md:w-30"
        type="button"
        onClick={() => setVisible(false)}
      >
        <Image fill alt="닫기 버튼" src="/icons/x-thin.svg" />
      </button>
    </div>
  );
};

export default Popup;
