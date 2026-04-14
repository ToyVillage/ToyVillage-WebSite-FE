import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/widgets/header/Header";
import "./globals.css";
import Footer from "@/widgets/footer/Footer";

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${pretendard.variable}`}>
      <body 
        className="font-body text-black antialiased min-h-screen flex flex-col" 
        suppressHydrationWarning={true}
      >
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}