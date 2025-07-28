import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { User } from '@/features/auth';
import { axiosInstance } from '@/shared/lib/axios';

export const authConfig = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        console.log('=== authorize 함수 시작 ===');
        console.log('받은 credentials:', credentials);

        const { email, password } = credentials as any;

        console.log('파싱된 데이터:', {
          email,
          password,
        });

        if (!email || !password) {
          console.log('❌ 이메일 또는 비밀번호 누락');
          return null;
        }

        console.log('🔐 로그인 플로우 시작');
        // 로그인 처리
        try {
          const res = await axiosInstance.post('/auth/sign-in', {
            email,
            password,
          });

          if (res.status !== 200) {
            console.error('Auth API error:', res.status, res.statusText);
            return null;
          }

          const data = res.data;
          console.log('로그인 성공:', data);

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            nickname: data.user.nickname,
            role: data.user.role,
            phoneNumber: data.user.phoneNumber,
            location: data.user.location,
            storeName: data.user.storeName,
            storePhoneNumber: data.user.storePhoneNumber,
            imageUrl: data.user.imageUrl,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error('로그인 중 오류 발생:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24, // 24시간
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user: User & { accessToken: string };
    }) {
      if (user) {
        token.location = user.location;
        token.phoneNumber = user.phoneNumber;
        token.storePhoneNumber = user.storePhoneNumber;
        token.storeName = user.storeName;
        token.imageUrl = user.imageUrl;
        token.nickname = user.nickname;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.id = user.id.toString();
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as number;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as 'APPLICANT' | 'OWNER';
        session.user.location = token.location as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.storePhoneNumber = token.storePhoneNumber as string;
        session.user.storeName = token.storeName as string;
        session.user.imageUrl = token.imageUrl as string | null;
        session.user.nickname = token.nickname as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);

      // 회원가입 완료 후 /albalist로 리다이렉트
      if (url.startsWith('/signin') || url.startsWith('/signup')) {
        console.log('회원가입/로그인 완료, /albalist로 리다이렉트');
        return `${baseUrl}/albalist`;
      }

      // 기본 리다이렉트 로직
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
    signUp: '/signup',
    accountInfo: '/accountInfo',
    error: '/signin', // 인증 관련 에러 발생 시 리다이렉트 될 페이지
  },
} as const;
