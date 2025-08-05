/**
 * 전역 모달 상태 관리 스토어
 * Zustand를 사용하여 단일 모달의 열기/닫기 상태를 관리
 */
'use client';

import { create } from 'zustand';

import { ModalStore } from '../types/modal';

const useModalStore = create<ModalStore>(set => ({
  isOpen: false,
  content: null,

  openModal: (content: React.ReactNode) => {
    set({ isOpen: true, content });
  },

  closeModal: () => {
    set({ isOpen: false, content: null });
  },
}));

export default useModalStore;
