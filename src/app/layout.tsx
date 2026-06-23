import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/components/common/QueryProvider";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "토이 빌리지 (Toy Village)",
    template: "%s | 토이 빌리지",
  },
  description: "귀여운 동물들과 함께하는 특별한 경험, 토이 빌리지입니다.",
  openGraph: {
    title: "토이 빌리지 (Toy Village)",
    description: "전국의 모든 동물 친구들을 만나보세요.",
    url: "https://toy-village.com",
    siteName: "Toy Village",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "토이 빌리지",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${pretendard.variable}`}>
      <body className="antialiased min-h-screen" suppressHydrationWarning={true}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}