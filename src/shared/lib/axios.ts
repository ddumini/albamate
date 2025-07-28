import axios from 'axios';
import { useSession } from 'next-auth/react';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://fe-project-albaform.vercel.app/';
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

  // 인증 헤더가 포함된 axios 인스턴스 생성
  const authAxios = axios.create({
    baseURL,
    withCredentials: !isDevelopment,
    headers: {
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });

  return authAxios;
};
