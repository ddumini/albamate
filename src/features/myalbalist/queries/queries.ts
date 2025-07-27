import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { useMyAlbalistApi } from '../api/api';

export const useApplicantMyAlbalistQuery = (limit: number = 10) => {
  const { data: session, status } = useSession();
  const api = useMyAlbalistApi();

  return useQuery({
    queryKey: ['applicantMyAlbalist', limit],
    queryFn: () => api.getApplicantMyAlbalist({ limit }).then(res => res.data),
    retry: 1,
    retryDelay: 1000,
    enabled: status === 'authenticated' && !!session?.accessToken,
  });
};

export const useOwnerMyAlbalistQuery = (limit: number = 10) => {
  const { data: session, status } = useSession();
  const api = useMyAlbalistApi();

  return useQuery({
    queryKey: ['ownerMyAlbalist', limit],
    queryFn: () => api.getOwnerMyAlbalist({ limit }).then(res => res.data),
    retry: 1,
    retryDelay: 1000,
    enabled: status === 'authenticated' && !!session?.accessToken,
  });
};
