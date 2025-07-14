/**
 * 합성 컴포넌트 패턴으로 구성된 메인 Modal 객체
 * 모든 모달 관련 컴포넌트들을 하나의 네임스페이스로 제공
 */
'use client';

import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import ModalHeader from './ModalHeader';
import { ModalManager } from './ModalManager';

const Modal = {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Manager: ModalManager,
} as const;

export default Modal;
