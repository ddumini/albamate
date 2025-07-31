import { type NextAuthConfig, Session, User } from 'next-auth';
import { type AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

import { axiosInstance } from '@/shared/lib/axios';

export const authConfig = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        credentials: Record<string, unknown>,
        req
      ): Promise<User | null> => {
        console.log('=== authorize 함수 시작 ===');
        console.log('받은 credentials:', credentials);

        const {
          email,
          password,
          userType: credentialsUserType,
        } = credentials as {
          email: string;
          password: string;
          userType: string | null;
        };

        console.log('파싱된 데이터:', {
          email,
          password,
          userType: credentialsUserType,
        });

        if (!email || !password) {
          console.log('❌ 이메일 또는 비밀번호 누락');
          return null;
        }

        // 사용자 타입 결정: credentials에서 전달받은 값 우선, 없으면 URL에서 확인
        let userType: string | null = credentialsUserType;

        // credentials에서 사용자 타입이 없으면 URL에서 확인
        if (!userType && req.url) {
          try {
            const url = new URL(req.url);
            userType = url.searchParams.get('type');
            console.log('req.url에서 사용자 타입 확인:', userType);
          } catch (error) {
            console.error('URL 파싱 오류:', error);
          }
        }

        // req.headers에서 referer 확인
        if (!userType && req.headers) {
          const referer = (req.headers as any).referer;
          if (referer) {
            try {
              const refererUrl = new URL(referer);
              userType = refererUrl.searchParams.get('type');
              console.log('referer에서 사용자 타입 확인:', userType);
            } catch (error) {
              console.error('Referer URL 파싱 오류:', error);
            }
          }
        }

        console.log('최종 사용자 타입:', userType);

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

          // 사용자 타입 검증
          console.log('사용자 타입 검증 시작:', {
            userType,
            userRole: data.user.role,
          });

          if (userType) {
            const expectedRole = userType === 'owner' ? 'OWNER' : 'APPLICANT';
            console.log('역할 비교:', {
              expected: expectedRole,
              actual: data.user.role,
              isMatch: data.user.role === expectedRole,
            });

            if (data.user.role !== expectedRole) {
              console.error('사용자 타입 불일치:', {
                expected: expectedRole,
                actual: data.user.role,
                userType,
              });
              throw new Error('USER_TYPE_MISMATCH');
            }

            console.log('사용자 타입 검증 성공');
          } else {
            console.log('사용자 타입이 없어 검증 건너뜀');
          }

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

          // 사용자 타입 불일치 에러 처리
          if (
            error instanceof Error &&
            error.message === 'USER_TYPE_MISMATCH'
          ) {
            throw error;
          }

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 1000, // 5분
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      // 초기 로그인 시 사용자 정보 저장
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
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 5 * 60 * 1000; // 5분 후 만료 (테스트용)

        return token;
      }

      // 토큰이 만료되었는지 확인
      const now = Date.now();
      const expiresAt = token.accessTokenExpires as number;

      console.log('=== JWT 콜백 실행 ===');
      console.log('현재 시간:', new Date(now).toLocaleString());
      console.log('토큰 만료 시간:', new Date(expiresAt).toLocaleString());
      console.log(
        '만료까지 남은 시간:',
        Math.round((expiresAt - now) / 1000 / 60),
        '분'
      );

      if (now < expiresAt) {
        console.log('✅ 토큰이 유효합니다');
        return token;
      }

      // 토큰이 만료되었으면 갱신 시도
      console.log('❌ 토큰이 만료되었습니다. 갱신을 시도합니다...');
      const refreshedToken = await refreshAccessToken(token);

      // 갱신 실패 시 에러 토큰 반환
      if (refreshedToken.error) {
        console.error('❌ 토큰 갱신 실패, 로그아웃 처리 필요');
        return refreshedToken;
      }

      console.log('✅ 토큰 갱신 성공');
      return refreshedToken;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        // 필수 필드들이 존재하는지 확인하고 안전하게 할당
        if (token.id) session.user.id = parseInt(token.id);
        if (token.email) session.user.email = token.email;
        if (token.name) session.user.name = token.name;
        if (token.role) session.user.role = token.role;
        if (token.location) session.user.location = token.location;
        if (token.phoneNumber) session.user.phoneNumber = token.phoneNumber;
        if (token.storePhoneNumber)
          session.user.storePhoneNumber = token.storePhoneNumber;
        if (token.storeName) session.user.storeName = token.storeName;
        if (token.imageUrl !== undefined)
          session.user.imageUrl = token.imageUrl;
        if (token.nickname) session.user.nickname = token.nickname;
        if (token.accessToken) session.accessToken = token.accessToken;

        // 토큰 갱신 에러가 있으면 세션에도 전달
        if (token.error) {
          session.error = token.error;
        }
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
  },
} satisfies NextAuthConfig;

/**
 * 액세스 토큰 갱신 함수
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log('토큰 갱신 요청 시작');

    const response = await axiosInstance.post('/auth/refresh', {
      refreshToken: token.refreshToken,
    });

    if (response.status !== 200) {
      throw new Error('토큰 갱신 실패');
    }

    const refreshedTokens = response.data;
    console.log('토큰 갱신 성공');

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // 새로운 refreshToken이 없으면 기존 것 유지
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1시간 후 만료
    };
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
