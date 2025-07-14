/**
 * 모달 푸터 컴포넌트
 * 버튼들을 배치하며 가로/세로 배치 옵션 제공
 */
'use client';
import React from 'react';

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
  direction = 'horizontal',
}) => {
  const directionClasses = {
    horizontal: 'flex-row gap-8', // 가로
    vertical: 'flex-col gap-2', // 세로
  };
  return (
    <div
      className={`flex items-center justify-end ${directionClasses[direction]} ${className}`}
    >
      {children}
    </div>
  );
};

export default ModalFooter;
