'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import banner from '@/assets/animals/banner.png';
import SubHeader from '@/components/layout/SubHeader';
import { getAnimals, AnimalItem } from '@/lib/api/animals';

const TYPE_LABEL: Record<string, string> = {
  MAMMALS: '포유류',
  REPTILES: '파충류',
  FISH: '어류',
  BIRDS: '조류',
};

const GROUPS: { key: keyof ReturnType<typeof useAnimals>; label: string }[] = [
  { key: 'popular_animal', label: '인기 동물' },
  { key: 'mammals', label: '포유류' },
  { key: 'reptiles', label: '파충류' },
  { key: 'fish', label: '어류' },
  { key: 'birds', label: '조류' },
];

function useAnimals() {
  const { data } = useQuery({ queryKey: ['animals'], queryFn: getAnimals });
  return data ?? { popular_animal: [], mammals: [], reptiles: [], fish: [], birds: [] };
}

function AnimalCard({ animal }: { animal: AnimalItem }) {
  return (
    <div className="border rounded-xl p-3 md:p-4 shadow-sm">
      <div className="relative aspect-video bg-gray-200 rounded-lg mb-3 md:mb-4 overflow-hidden">
        {animal.animal_image ? (
          <Image src={animal.animal_image} alt={animal.animal_kind} fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">이미지 없음</div>
        )}
      </div>
      <h3 className="font-bold text-base md:text-lg">{animal.animal_kind}</h3>
      <p className="text-gray-500 text-xs md:text-sm mt-1 md:mt-2 line-clamp-3">{animal.animal_description}</p>
      <span className="inline-block mt-2 md:mt-3 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
        {TYPE_LABEL[animal.animal_type] ?? animal.animal_type}
      </span>
    </div>
  );
}

export function AnimalsContent() {
  const animalData = useAnimals();
  const visibleGroups = GROUPS.filter(({ key }) => animalData[key].length > 0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  if (visibleGroups.length === 0) {
    return (
      <>
        <SubHeader imageSrc={banner} title="동물 소개" subtitle="Toy village's Animals" />
        <div className="flex items-center justify-center py-20 text-gray-400 text-body-3">
          등록된 동물이 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <SubHeader imageSrc={banner} title="동물 소개" subtitle="Toy village's Animals" />

      {/* 모바일 드로어 오버레이 */}
      <div
        className={`fixed inset-0 z-60 bg-black/30 md:hidden transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      {/* 모바일 드로어 */}
      <div
        className={`fixed top-0 left-0 z-70 h-full w-56 bg-white shadow-xl pt-25 transition-transform duration-300 md:hidden`}
        style={{ transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div className="flex items-center justify-between px-6 mb-4">
          <span className="font-bold text-lg">카테고리</span>
          <button
            onClick={closeDrawer}
            aria-label="닫기"
            className="text-gray-400 hover:text-black text-2xl leading-none"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col px-3">
          {visibleGroups.map(({ key, label }) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={closeDrawer}
              className="rounded-md px-4 py-3 text-lg text-gray-900 hover:bg-gray-100 transition-all"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-start">
        {/* 데스크탑 사이드바 */}
        <aside className="sticky top-25 h-[calc(100vh-100px)] w-60 shrink-0 p-6 overflow-y-auto hidden md:block">
          <nav className="flex flex-col gap-2">
            {visibleGroups.map(({ key, label }) => (
              <a
                key={key}
                href={`#${key}`}
                className="items-center justify-center rounded-md px-3 py-2 text-2xl text-gray-900 hover:bg-white hover:shadow-sm transition-all"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-12">
          {/* 모바일 카테고리 버튼 */}
          <div className="mb-6 md:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-base">☰</span> 카테고리
            </button>
          </div>

          {visibleGroups.map(({ key, label }) => (
            <section key={key} id={key} className="mb-12 md:mb-16 scroll-mt-28">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 border-b pb-2">{label}</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {animalData[key].map((animal, i) => (
                  <AnimalCard key={`${animal.animal_kind}-${i}`} animal={animal} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}
