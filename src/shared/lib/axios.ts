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

  const authAxios = axios.create({
    baseURL,
    withCredentials: !isDevelopment,
  });

  // 요청 인터셉터
  authAxios.interceptors.request.use(
    config => {
      // 디버깅: 세션과 토큰 상태 확인
      console.log('Session:', session);
      console.log('AccessToken:', session?.accessToken);
      console.log('Request URL:', config.url);
      console.log('Full URL:', `${config.baseURL}${config.url}`);

      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
        console.log('Authorization header set:', config.headers.Authorization);
      } else {
        console.warn('No access token available');
      }

      return config;
    },
    error => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  authAxios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.error('=== API Error Details ===');
      console.error('Error Status:', error.response?.status);
      console.error('Error Message:', error.response?.data?.message);
      console.error(
        'Error Details:',
        JSON.stringify(error.response?.data?.details, null, 2)
      );
      console.error('Error Config:', {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        baseURL: error.config?.baseURL,
      });
      console.error(
        'Full Error Response:',
        JSON.stringify(error.response?.data, null, 2)
      );

      if (error.response?.status === 401) {
        console.error('인증이 필요합니다. 세션 상태:', session);
      }

      if (error.response?.status === 400) {
        console.error('=== 400 Validation Error Analysis ===');
        console.error('Validation Details:', error.response?.data?.details);
        console.error('Request URL:', error.config?.url);
        console.error('Request Headers:', error.config?.headers);

        // details 객체의 각 필드를 개별적으로 확인
        if (error.response?.data?.details) {
          Object.entries(error.response.data.details).forEach(
            ([key, value]) => {
              console.error(`Validation Error - ${key}:`, value);
            }
          );
        }
      }

      return Promise.reject(error);
    }
  );

  return authAxios;
};
