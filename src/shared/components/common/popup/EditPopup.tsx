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
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setAnimationClass('opacity-0 -translate-y-12');

      // ✅ 두 프레임 기다리기
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationClass('opacity-95 translate-y-0');
        });
      });
    } else {
      setAnimationClass('opacity-0 -translate-y-12');
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setAnimationClass('opacity-0 -translate-y-12');
      const hideTimer = setTimeout(() => {
        setShouldRender(false);
        onClose();
      }, 500);
      return () => clearTimeout(hideTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!shouldRender) return null;

  const size = iconSizes[type];

  return (
    <div
      className={`BG-blueblack Text-white-gray fixed top-60 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-xl px-80 py-12 text-xs whitespace-nowrap shadow-lg transition-all duration-500 ease-in-out md:px-120 md:text-md lg:px-150 lg:text-lg ${animationClass}`}
    >
      <div
        className="relative"
        style={{ width: size.width, height: size.height }}
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
