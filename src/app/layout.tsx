"use client";

import "./globals.css";

import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

import { Providers } from "./providers";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // hydration 오류 방지: SSR 중엔 아무것도 안 보여줌
    return (
      <html lang="ko">
        <body />
      </html>
    );
  }

  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
