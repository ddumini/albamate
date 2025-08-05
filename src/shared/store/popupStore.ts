import { create } from 'zustand';

/**
 * 팝업 상태 관리용 Zustand 스토어
 *
 * @typedef {'success' | 'error' | 'info'} PopupType - 팝업의 유형
 */
interface PopupState {
  /** 팝업 표시 여부 */
  visible: boolean;

  /** 팝업에 표시할 메시지 */
  message: string;

  /** 팝업 유형 (success, error, info) */
  type: 'success' | 'error' | 'info';

  /** 팝업이 자동으로 사라지는 시간 (ms) */
  duration: number;

  /**
   * 팝업을 표시하는 함수
   * @param message - 표시할 메시지
   * @param type - 팝업 유형 ('success' | 'error' | 'info'), 기본값 'success'
   * @param duration - 자동 닫힘 시간(ms), 기본값 3000
   */
  showPopup: (
    message: string,
    type?: 'success' | 'error' | 'info',
    duration?: number
  ) => void;

  /** 팝업을 숨기는 함수 */
  hidePopup: () => void;
}

/**
 * 팝업 상태를 관리하는 커스텀 Zustand 훅
 */
export const usePopupStore = create<PopupState>(set => ({
  visible: false,
  message: '',
  type: 'success',
  duration: 3000,
  showPopup: (message, type = 'success', duration = 3000) =>
    set({ visible: true, message, type, duration }),
  hidePopup: () => set({ visible: false }),
}));
