import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

const baseURL = `${API_URL}${TEAM_ID}/`;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // 재시도 무한 루프 방지
      originalRequest._retry = true;

      //  토큰 만료 시 처리
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axiosInstance.post('/auth/refresh', {
            refreshToken,
          });

          const newToken = response.data.accessToken;
          localStorage.setItem('accessToken', newToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // refresh 실패 시 로그아웃 처리 및 로그인 화면으로 보내기
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);
