/**
 * 모달 콘텐츠 컨테이너
 */
'use client';

import React from 'react';

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`max-h-[85vh] w-fit overflow-auto rounded-3xl bg-white shadow-xl ${className}`}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default ModalContent;
