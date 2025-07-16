import './globals.css';

import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';

import { Providers } from '@/app/providers';
import ModalManager from '@/shared/components/common/modal/ModalManager';

import { metadata } from './metadata';
import { viewport } from './viewport';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

// eslint-disable-next-line react-refresh/only-export-components
export { metadata };
export { viewport };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="ko">
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        name="viewport"
      />
      <body className={pretendard.className}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
          <ModalManager />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
