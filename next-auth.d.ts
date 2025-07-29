declare module 'next-auth' {
  interface Session {
    user: User;
    accessToken: string;
    error?: 'RefreshAccessTokenError';
  }

  interface User {
    id: number;
    email: string;
    name: string;
    role: 'APPLICANT' | 'OWNER';
    location: string;
    phoneNumber: string;
    storePhoneNumber: string;
    storeName: string;
    imageUrl: string | null;
    nickname: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    role?: 'APPLICANT' | 'OWNER';
    location?: string;
    phoneNumber?: string;
    storePhoneNumber?: string;
    storeName?: string;
    imageUrl?: string | null;
    nickname?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: 'RefreshAccessTokenError';
  }
}
