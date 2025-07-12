'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EditPopupProps {
  message: string;
  duration?: number;
  visible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info'; // 메시지 타입
  iconSrc?: string; // 아이콘 직접 전달 가능
}

const defaultIcons = {
  success: '/icons/check-circle.svg',
  error: '/icons/X-circle.svg',
  info: '/icons/info.svg',
};

const EditPopup = ({
  message,
  duration = 3000,
  visible,
  onClose,
  type = 'success',
  iconSrc,
}: EditPopupProps) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="BG-blueblack Text-white-gray fixed top-60 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl px-80 py-12 text-xs whitespace-nowrap opacity-95 shadow-lg md:px-120 md:text-md lg:px-150 lg:text-lg">
      <div className="relative h-24 w-24 lg:h-36 lg:w-36">
        <Image
          fill
          alt={`${type} 아이콘`}
          src={iconSrc ?? defaultIcons[type]}
        />
      </div>
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default EditPopup;
