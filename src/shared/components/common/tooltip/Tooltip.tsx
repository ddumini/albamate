'use client';
import { useEffect, useRef, useState } from 'react';

import TooltipContentWrapper from './TooltipContentWrapper';

interface ClickTooltipProps {
  content: React.ReactNode | ((args: { close: () => void }) => React.ReactNode);
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: ClickTooltipProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const close = () => setOpen(false);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <div className="cursor-pointer" onClick={() => setOpen(prev => !prev)}>
        {children}
      </div>

      {open && (
        <div className="absolute left-1/2 z-50 mt-8 -translate-x-1/4 whitespace-nowrap">
          {/* 꼬리 (세모) */}
          <div className="absolute -top-4.5 left-1/4 z-0 h-12 w-12 -translate-x-1/2 rotate-45 bg-blue-300" />

          {/* 툴팁 본문 */}
          {typeof content === 'function' ? (
            <TooltipContentWrapper>{content({ close })}</TooltipContentWrapper>
          ) : (
            <TooltipContentWrapper>
              <span>{content}</span>
            </TooltipContentWrapper>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
