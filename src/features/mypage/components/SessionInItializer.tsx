'use client';

import { useEffect } from 'react';

import { useSessionStore } from '../store/SessionState';

export const SessionInitializer = ({ session }: { session: any }) => {
  const setUser = useSessionStore(state => state.setUser);

  useEffect(() => {
    setUser(session);
  }, [session]);

  return null;
};
