import './globals.css';

import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';

import { Providers } from '@/app/providers';

import { metadata } from './metadata';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

export { metadata }; // fast refresh 경고 무시해도 됨

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="ko">
      <head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          name="viewport"
        />
      </head>
      <body className={pretendard.className}>
        {/* 카카오 지도 API 스크립트 */}
        <script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a63d29683c22cad2759761df9248a12"
          type="text/javascript"
        />
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
