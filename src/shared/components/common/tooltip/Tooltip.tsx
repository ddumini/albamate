'use client';
import { useState } from 'react';

import TooltipContentWrapper from './TooltipContentWrapper';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>

      {open && (
        <div className="absolute left-1/2 z-50 mt-8 -translate-x-1/4 whitespace-nowrap">
          {/* 꼬리 (세모) */}
          <div className="absolute -top-4.5 left-1/4 z-0 h-12 w-12 -translate-x-1/2 rotate-45 bg-blue-300" />

          {/* 툴팁 본문 */}
          <TooltipContentWrapper>
            <span>{content}</span>
          </TooltipContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
