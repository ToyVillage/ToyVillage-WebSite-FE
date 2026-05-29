'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Logo } from '@/assets/Logo';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { name: '이벤트', href: '/events' },
  { name: '갤러리', href: '/gallery' },
  { name: '새소식', href: '/news' },
  { name: '동물 소개', href: '/animals' },
  { name: '제휴문의', href: '/partnership' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const config = {
    logoHref: isAdminPage ? '/admin' : '/',
    buttonText: isAdminPage ? '유저 모드' : '어드민 로그인',
    buttonHref: isAdminPage ? '/' : '/login',
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 flex h-[100px] w-full items-center transition-all duration-200',
        !isScrolled ? 'bg-transparent text-white' : 'bg-white text-black shadow-md',
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center px-6">
        <Link href={config.logoHref} className="shrink-0">
          <Logo className="h-[100px] w-[237px]" />
        </Link>

        <nav className="ml-[80px] flex h-[80px] items-center gap-2">
          {!isAdminPage && (
            <Link
              key="/"
              href="/"
              className={cn(
                'px-5 py-2 text-body-2  relative',
                pathname == ('/')
                  ? 'font-bold border-b-2 border-current'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              소개
            </Link>
          )}
          {NAV_ITEMS.map((item) => {
            const finalHref = isAdminPage ? `/admin${item.href}` : item.href;
            const isActive = pathname === finalHref || pathname.startsWith(`${finalHref}/`);

            return (
              <Link
                key={item.href}
                href={finalHref}
                className={cn(
                  'px-5 py-2 text-body-2  relative',
                  isActive ? 'font-bold border-b-2 border-current' : 'opacity-70 hover:opacity-100',
                )}
              >
                {item.name}
              </Link>
            );
          })}
          {isAdminPage && (
            <>
            <Link
              key="/popup"
              href="/admin/popup"
              className={cn(
                'px-5 py-2 text-body-2  relative',
                pathname.startsWith('/admin/popup')
                  ? 'font-bold border-b-2 border-current'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              팝업관리
            </Link>
            <Link
              key="/faq"
              href="/admin/faq"
              className={cn(
                'px-5 py-2 text-body-2  relative',
                pathname.startsWith('/admin/faq')
                  ? 'font-bold border-b-2 border-current'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              자주묻는 질문
            </Link>
            </>
          )}
        </nav>

        <Link
          href={config.buttonHref}
          className="ml-auto shrink-0 rounded-4xl bg-[#3A7A3A] px-7 py-3 text-body-2 text-white transition-colors hover:bg-[#2D6A2D]"
        >
          {config.buttonText}
        </Link>
      </div>
    </header>
  );
}
