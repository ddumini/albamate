/**
 * 모달 헤더 컴포넌트
 * 제목과 닫기 버튼을 포함하며, X 버튼은 항상 우상단 고정
 */
'use client';
import Image from 'next/image';
import React from 'react';

import { useModalContext } from './hooks';

interface ModalHeaderProps {
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  children,
  showCloseButton = true,
}) => {
  const { onClose } = useModalContext();
  return (
    <div className={`relative flex justify-center ${className}`}>
      <div className="lg:2xl text-2lg font-semibold text-gray-900">
        {children}
      </div>
      {showCloseButton && (
        <button
          aria-label="모달 닫기"
          className="absolute top-0 right-0 text-gray-400 transition-colors hover:text-gray-600"
          type="button"
          onClick={onClose}
        >
          <Image alt="modal-close" height={24} src="/icons/x.svg" width={24} />
        </button>
      )}
    </div>
  );
};

export default ModalHeader;
