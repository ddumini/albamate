'use client';
import { useEffect, useRef, useState } from 'react';

interface ClickTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode; // 아이콘 등 트리거
}

const ClickTooltip = ({ content, children }: ClickTooltipProps) => {
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

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <div className="cursor-pointer" onClick={() => setOpen(prev => !prev)}>
        {children}
      </div>

      {open && (
        <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded bg-black px-3 py-2 text-sm whitespace-nowrap text-white shadow">
          {content}
        </div>
      )}
    </div>
  );
};

export default ClickTooltip;
