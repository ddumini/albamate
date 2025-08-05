import { User } from 'next-auth';
import { create } from 'zustand';

interface SessionState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useSessionStore = create<SessionState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));
