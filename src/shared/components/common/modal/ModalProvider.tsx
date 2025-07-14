// components/Modal/ModalProvider.tsx
/**
 * 모달 Context Provider
 * 모달 내부 컴포넌트들에게 onClose 함수를 제공
 */
'use client';
import React from 'react';

import ModalContext from './context';

const ModalProvider: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => (
  <ModalContext.Provider value={{ onClose }}>{children}</ModalContext.Provider>
);

export default ModalProvider;
