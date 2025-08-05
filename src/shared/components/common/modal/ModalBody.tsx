/**
 * 모달 바디 컴포넌트
 * 모달의 주요 콘텐츠를 담는 영역
 */
'use client';
import React from 'react';

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => {
  return <div className={`${className}`}>{children}</div>;
};

export default ModalBody;
