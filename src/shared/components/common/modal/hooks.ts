/**
 * 모달 Context를 사용하기 위한 커스텀 훅
 * 모달 외부에서 사용 시 에러를 발생시켜 안전성 보장
 */
'use client';
import { useContext } from 'react';

import { ModalContextType } from '@/shared/types/modal';

import ModalContext from './context';

const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModalContext는 Modal 컴포넌트 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
};

export default useModalContext;
