import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async credentials => {
        const { email, password } = credentials;

        if (!email || !password) return null;

        // 회원가입 인증

        // 로그인 인증
        // TODO: 엔드포인트 수정
        const res = await fetch(
          `https://fe-project-albaform.vercel.app/15-3/auth/sign-in`,
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
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
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24시간
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
