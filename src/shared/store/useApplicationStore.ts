import { create } from 'zustand';

export interface GuestApplicationData {
  id: number;
  name: string;
  phoneNumber: string;
  experienceMonths: number;
  resumeId: number;
  resumeName: string;
  introduction: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicantId: number;
}

interface ApplicationStore {
  guestApplication: GuestApplicationData | null;
  isGuestMode: boolean;
  setGuestApplication: (data: GuestApplicationData) => void;
  clearGuestApplication: () => void;
  setGuestMode: (mode: boolean) => void;
}

const useApplicationStore = create<ApplicationStore>(set => ({
  guestApplication: null,
  isGuestMode: false,
  setGuestApplication: data =>
    set({
      guestApplication: data,
      isGuestMode: true,
    }),
  clearGuestApplication: () =>
    set({
      guestApplication: null,
      isGuestMode: false,
    }),
  setGuestMode: mode => set({ isGuestMode: mode }),
}));

export default useApplicationStore;
