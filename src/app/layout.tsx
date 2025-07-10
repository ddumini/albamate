import "./globals.css";

import localFont from "next/font/local";

import { Providers } from "./providers";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 900",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html suppressHydrationWarning lang="ko">
      <body className={pretendard.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
