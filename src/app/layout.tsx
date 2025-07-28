import './globals.css';

import GnbRenderer from '@common/gnb/GnbRenderer'; // dynamic 없이 일반 import
import ModalManager from '@common/modal/ModalManager';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { Providers } from '@/app/providers';

import { metadata } from './metadata';
import { viewport } from './viewport';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

// eslint-disable-next-line react-refresh/only-export-components
export { metadata, viewport };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="ko">
      <head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          name="viewport"
        />
      </head>
      <body className={`${pretendard.className} dark:bg-gray-900`}>
        <SessionProvider>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <Providers>
              <div className="mb-48">
                <GnbRenderer />
              </div>
              {children}
              <ModalManager />
            </Providers>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
