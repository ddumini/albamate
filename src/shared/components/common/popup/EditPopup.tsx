'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { usePopupStore } from '@/shared/store/popupStore';

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

const EditPopup = () => {
  const { visible, message, type, duration, hidePopup } = usePopupStore();
  const [isRender, setIsRender] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  // 클라이언트에서 마운트된 후에 상태를 사용하도록 처리
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // hydration mismatch 방지를 위한 조건
  useEffect(() => {
    if (!hasMounted) return;

    if (visible) {
      setIsRender(true);
      setAnimationClass('opacity-0 -translate-y-12');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationClass('opacity-90 translate-y-0');
        });
      });
    } else {
      setAnimationClass('opacity-0 -translate-y-12');
      const timeout = setTimeout(() => setIsRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [visible, hasMounted]);

  // 자동 닫힘 처리
  useEffect(() => {
    if (!visible || !hasMounted) return;

    const timer = setTimeout(() => {
      setAnimationClass('opacity-0 -translate-y-12');
      const hideTimer = setTimeout(() => {
        setIsRender(false);
        hidePopup();
      }, 500);
      return () => clearTimeout(hideTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, hidePopup, hasMounted]);

  if (!hasMounted || !isRender) return null;

  const size = iconSizes[type];

  return (
    <div
      className={`Text-white-gray fixed top-60 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-xl bg-blue-300 px-80 py-12 text-xs whitespace-nowrap shadow-lg transition-all duration-500 ease-in-out md:px-120 md:text-md lg:px-150 lg:text-lg ${animationClass}`}
    >
      <div
        className="relative"
        style={{ width: size.width, height: size.height }}
      >
        <Image
          fill
          alt={`${type} 아이콘`}
          sizes={`${size.width}px`}
          src={defaultIcons[type]}
        />
      </div>
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default EditPopup;
