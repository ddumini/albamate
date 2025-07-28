import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';

import { useMyAlbalistApi } from '../api/api';

export const useApplicantMyAlbalistQuery = (limit: number = 10) => {
  const { data: session, status } = useSession();
  const { isApplicant } = useSessionUtils();
  const api = useMyAlbalistApi();

  return useQuery({
    queryKey: ['applicantMyAlbalist', limit],
    queryFn: () =>
      api.getApplicantMyAlbalist({ limit }).then(res => res.data.data),
    retry: 1,
    retryDelay: 1000,
    enabled:
      status === 'authenticated' && !!session?.accessToken && isApplicant,
  });
};

export const useOwnerMyAlbalistQuery = (limit: number = 10) => {
  const { data: session, status } = useSession();
  const { isOwner } = useSessionUtils();
  const api = useMyAlbalistApi();

  return useQuery({
    queryKey: ['ownerMyAlbalist', limit],
    queryFn: () => api.getOwnerMyAlbalist({ limit }).then(res => res.data.data),
    retry: 1,
    retryDelay: 1000,
    enabled: status === 'authenticated' && !!session?.accessToken && isOwner,
  });
};
