'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EditPopupProps {
  message: string;
  duration?: number;
  visible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  iconSrc?: string;
}

const defaultIcons = {
  success: '/icons/check-circle.svg',
  error: '/icons/X-error-circle.svg',
  info: '/icons/info.svg',
};

// 에러 아이콘만 크게 보이는 문제로 사이즈 객체 추가
const iconSizes = {
  success: { width: 24, height: 24, lgWidth: 36, lgHeight: 36 },
  error: { width: 18, height: 18, lgWidth: 28, lgHeight: 28 },
  info: { width: 24, height: 24, lgWidth: 36, lgHeight: 36 },
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

  const size = iconSizes[type];

  return (
    <div className="BG-blueblack Text-white-gray fixed top-60 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-xl px-80 py-12 text-xs whitespace-nowrap opacity-95 shadow-lg md:px-120 md:text-md lg:px-150 lg:text-lg">
      <div
        className="relative"
        style={{
          width: size.width,
          height: size.height,
        }}
      >
        <Image
          fill
          alt={`${type} 아이콘`}
          sizes={`${size.width}px`}
          src={iconSrc ?? defaultIcons[type]}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default EditPopup;
