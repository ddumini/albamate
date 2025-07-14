// components/Modal/context.ts
/**
 * 모달 내부 컴포넌트들이 공유하는 Context
 * 주로 닫기 함수를 제공
 */
'use client';

import { createContext } from 'react';

import { ModalContextType } from '@/shared/types/modal';

export const ModalContext = createContext<ModalContextType | null>(null);
