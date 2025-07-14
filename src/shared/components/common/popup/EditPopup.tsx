'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * @typedef {Object} EditPopupProps
 * @property {string} message - 팝업에 표시될 메시지
 * @property {number} [duration=3000] - 팝업이 자동으로 사라지기까지의 시간 (ms)
 * @property {boolean} visible - 팝업이 보일지 여부
 * @property {() => void} onClose - 팝업이 닫힐 때 호출되는 콜백 함수
 * @property {'success' | 'error' | 'info'} [type='success'] - 팝업의 유형에 따라 아이콘 및 색상 스타일이 달라짐
 * @property {string} [iconSrc] - 아이콘 커스텀 경로 (기본 아이콘을 덮어쓸 수 있음)
 */

interface EditPopupProps {
  message: string;
  duration?: number;
  visible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  iconSrc?: string;
}

// 기본 아이콘 경로 설정
const defaultIcons = {
  success: '/icons/check-circle.svg',
  error: '/icons/X-error-circle.svg',
  info: '/icons/info.svg',
};

// 아이콘 크기 설정 (기기별로 다르게 적용 가능)
const iconSizes = {
  success: { width: 24, height: 24, lgWidth: 36, lgHeight: 36 },
  error: { width: 18, height: 18, lgWidth: 28, lgHeight: 28 },
  info: { width: 24, height: 24, lgWidth: 36, lgHeight: 36 },
};

/**
 * 화면 상단에 애니메이션과 함께 나타나는 상태 메시지 팝업 컴포넌트
 *
 * @component
 * @param {EditPopupProps} props
 */
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

  // visible 상태에 따라 등장 및 사라짐 애니메이션 처리
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setAnimationClass('opacity-0 -translate-y-12');

      // requestAnimationFrame을 두 번 호출해 브라우저 렌더링 타이밍 맞춤
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationClass('opacity-90 translate-y-0');
        });
      });
    } else {
      setAnimationClass('opacity-0 -translate-y-12');
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  // 자동 닫힘 처리
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
          src={iconSrc ?? defaultIcons[type]}
        />
      </div>
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default EditPopup;
