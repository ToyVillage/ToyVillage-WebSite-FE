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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const linkClass = (active: boolean) =>
    cn('px-5 py-2 text-body-2 relative', active ? 'font-bold border-b-2 border-current' : 'opacity-70 hover:opacity-100');

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 z-50 flex h-25 w-full items-center transition-all duration-200',
          !isScrolled && !mobileOpen ? 'bg-transparent text-white' : 'bg-white text-black shadow-md',
        )}
      >
        <div className="mx-auto flex w-full max-w-350 items-center justify-between px-6">
          <Link href={config.logoHref} className="shrink-0">
            <Logo className="w-35 h-auto md:w-59.25" />
          </Link>

          {/* 데스크탑 nav */}
          <nav className="ml-20 hidden md:flex h-20 items-center gap-2">
            {!isAdminPage && (
              <Link href="/" className={linkClass(pathname === '/')}>
                소개
              </Link>
            )}
            {NAV_ITEMS.map((item) => {
              const finalHref = isAdminPage ? `/admin${item.href}` : item.href;
              const isActive = pathname === finalHref || pathname.startsWith(`${finalHref}/`);
              return (
                <Link key={item.href} href={finalHref} className={linkClass(isActive)}>
                  {item.name}
                </Link>
              );
            })}
            {isAdminPage && (
              <>
                <Link href="/admin/popup" className={linkClass(pathname.startsWith('/admin/popup'))}>
                  팝업관리
                </Link>
                <Link href="/admin/faq" className={linkClass(pathname.startsWith('/admin/faq'))}>
                  자주묻는 질문
                </Link>
              </>
            )}
          </nav>

          {/* 햄버거 버튼 (모바일 전용) */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            <span
              className={cn(
                'block w-6 h-0.5 bg-current transition-all duration-300 origin-center',
                mobileOpen && 'rotate-45 translate-y-2',
              )}
            />
            <span
              className={cn(
                'block w-6 h-0.5 bg-current transition-all duration-300',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block w-6 h-0.5 bg-current transition-all duration-300 origin-center',
                mobileOpen && '-rotate-45 -translate-y-2',
              )}
            />
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white md:hidden transition-opacity duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <nav className="flex flex-col pt-25 px-8">
          {!isAdminPage && (
            <Link href="/" onClick={closeMobile} className="py-4 text-xl border-b border-gray-100 font-medium text-black">
              소개
            </Link>
          )}
          {NAV_ITEMS.map((item) => {
            const finalHref = isAdminPage ? `/admin${item.href}` : item.href;
            return (
              <Link
                key={item.href}
                href={finalHref}
                onClick={closeMobile}
                className="py-4 text-xl border-b border-gray-100 font-medium text-black"
              >
                {item.name}
              </Link>
            );
          })}
          {isAdminPage && (
            <>
              <Link href="/admin/popup" onClick={closeMobile} className="py-4 text-xl border-b border-gray-100 font-medium text-black">
                팝업관리
              </Link>
              <Link href="/admin/faq" onClick={closeMobile} className="py-4 text-xl border-b border-gray-100 font-medium text-black">
                자주묻는 질문
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
