import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://fe-project-albaform.vercel.app';
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || '15-3';

const baseURL = `${API_URL}${TEAM_ID}/`;

// 개발 환경에서는 withCredentials 비활성화
const isDevelopment = process.env.NODE_ENV === 'development';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: !isDevelopment,
});

export const useAxiosWithAuth = () => {
  const { data: session } = useSession();

  const authAxios = useMemo(() => {
    return axios.create({
      baseURL,
      withCredentials: !isDevelopment,
      headers: {
        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
      },
    });
  }, [session]);

  return authAxios;
};
