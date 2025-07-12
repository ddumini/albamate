'use client';
import Image from 'next/image';
import { useState } from 'react';

interface PopupProps {
  message: string;
}

const EditPopup = ({ message }: PopupProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="BG-blueblack Text-white-gray fixed top-60 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl px-80 py-12 text-xs whitespace-nowrap opacity-95 shadow-lg md:px-120 md:text-md lg:px-150 lg:text-lg">
      {/* 아이콘 */}
      <div className="relative h-24 w-24 lg:h-36 lg:w-36">
        <Image fill alt="정보 수정 이미지" src="/icons/check-circle.svg" />
      </div>

      {/* 메시지 */}
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default EditPopup;
