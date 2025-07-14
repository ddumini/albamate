/**
 * 전역 모달 매니저
 * Portal을 사용하여 body에 직접 렌더링하고 ESC 키, body 스크롤 방지 등의 기능 제공
 */
'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import useModalStore from '@/shared/store/useModalStore';
import { ModalProps } from '@/shared/types/modal';

import ModalContent from './ModalContent';
import ModalOverlay from './ModalOverlay';
import ModalProvider from './ModalProvider';

const ModalManager: React.FC<ModalProps> = ({
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
}) => {
  const { isOpen, content, closeModal } = useModalStore();

  // ESC 키로 닫기
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, closeModal]);

  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !content || typeof window === 'undefined') return null;

  return createPortal(
    <ModalProvider onClose={closeModal}>
      <ModalOverlay
        closeOnOverlayClick={closeOnOverlayClick}
        onClose={closeModal}
      >
        <ModalContent className={className}>{content}</ModalContent>
      </ModalOverlay>
    </ModalProvider>,
    document.body
  );
};

export default ModalManager;
