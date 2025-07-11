import "./globals.css";

import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { Providers } from "@/app/providers";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 900",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
