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
  { name: '소개', href: '/about' },
  { name: '이벤트', href: '/events' },
  { name: '갤러리', href: '/gallery' },
  { name: '새소식', href: '/news' },
  { name: '동물 소개', href: '/animals' },
  { name: '제휴문의', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 w-full transition-all duration-100 ease-in-out h-[100px] flex items-center',
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent',
      )}
    >
      <div className="max-w-[1200px] mx-[86px] w-full flex items-center gap-[80px]">
        <Link
          href="/"
          className={cn(
            'shrink-0 transition-colors duration-100',
            isScrolled ? 'text-black' : 'text-white',
          )}
        >
          <Logo
            className={cn(
              'w-[237px] h-[100px] transition-colors duration-100',
              isScrolled ? 'text-black' : 'text-white',
            )}
          />
        </Link>

        <nav className="flex items-center h-[80px]">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-[20] py-[8] relative flex items-center text-body-2 transition-colors group',
                  isScrolled
                    ? isActive
                      ? 'text-black font-bold border-b-2'
                      : 'text-gray-500 hover:text-black'
                    : isActive
                      ? 'text-white font-bold border-b-2'
                      : 'text-white/70 hover:text-white',
                )}
              >
                {item.name}

                {/* {isActive && (
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[2] transition-colors",
                    isScrolled ? "bg-black" : "bg-white"
                  )} />
                )} */}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
