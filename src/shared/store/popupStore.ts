import { create } from 'zustand';

interface PopupState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
  showPopup: (
    message: string,
    type?: 'success' | 'error' | 'info',
    duration?: number
  ) => void;
  hidePopup: () => void;
}

export const usePopupStore = create<PopupState>(set => ({
  visible: false,
  message: '',
  type: 'success',
  duration: 3000,
  showPopup: (message, type = 'success', duration = 3000) =>
    set({ visible: true, message, type, duration }),
  hidePopup: () => set({ visible: false }),
}));
