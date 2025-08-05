/**
 * 모달 관련 타입 정의
 */
export interface ModalStore {
  isOpen: boolean;
  content: React.ReactNode | null;
  openModal: (component: React.ReactNode) => void;
  closeModal: () => void;
}

export interface ModalProps {
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  maxWidth?: string; // 필요시에만 커스텀 최대 너비
}

export interface ModalContextType {
  onClose: () => void;
}
