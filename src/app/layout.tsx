import './globals.css';

import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';

import { Providers } from '@/app/providers';

import { metadata } from './metadata'; // ✅ 이렇게 불러오기

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
      <body className={pretendard.className}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
