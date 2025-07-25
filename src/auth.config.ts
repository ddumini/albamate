import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { User } from '@/features/auth';

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        // 회원가입 인증
        // 로그인 인증
        // TODO: 엔드포인트 수정 (공통 api로 변경 예정)
        const res = await fetch(
          `https://fe-project-albaform.vercel.app/15-3/auth/sign-in`,
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) return null;

        const data = await res.json();

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          accessToken: data.accessToken,
        };
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
  },
  pages: {
    signIn: '/signin',
  },
} as const;
