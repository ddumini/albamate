/**
 * 모달 배경 오버레이 컴포넌트
 * 반투명 배경과 오버레이 클릭으로 닫기 기능 제공
 */
'use client';

import React from 'react';

import { Z_INDEX } from '@/shared/constants/zIndex';

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
      className={`fixed inset-0 z-[${Z_INDEX.MODAL}] flex items-center justify-center bg-black-100/50`}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
