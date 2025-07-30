import type { User as CustomUser } from '@/features/auth';

declare module 'next-auth' {
  interface Session {
    user: CustomUser;
    accessToken: string;
    refreshToken: string;
    error?: 'RefreshAccessTokenError';
  }

  interface User {
    id: number;
    email: string;
    name: string | null;
    role: 'APPLICANT' | 'OWNER';
    location: string | null;
    phoneNumber: string | null;
    storePhoneNumber: string | null;
    storeName: string | null;
    imageUrl: string | null;
    nickname: string | null;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string | null;
    role: 'APPLICANT' | 'OWNER';
    location: string | null;
    phoneNumber: string | null;
    storePhoneNumber: string | null;
    storeName: string | null;
    imageUrl: string | null;
    nickname: string | null;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: 'RefreshAccessTokenError';
  }
}
