/**
 * 모달 배경 오버레이 컴포넌트
 * 반투명 배경과 오버레이 클릭으로 닫기 기능 제공
 */
'use client';

import React from 'react';

interface ModalOverlayProps {
  children: React.ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  children,
  onClose,
  closeOnOverlayClick = true,
}) => {
  return (
    <div
      className="fixed inset-0 z-1040 flex items-center justify-center bg-black-100/50"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
