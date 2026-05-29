'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
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
    <div className="border rounded-xl p-4 shadow-sm">
      <div className="relative aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
        {animal.animal_image ? (
          <Image src={animal.animal_image} alt={animal.animal_kind} fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">이미지 없음</div>
        )}
      </div>
      <h3 className="font-bold text-lg">{animal.animal_kind}</h3>
      <p className="text-gray-500 text-sm mt-2">{animal.animal_description}</p>
      <span className="inline-block mt-3 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
        {TYPE_LABEL[animal.animal_type] ?? animal.animal_type}
      </span>
    </div>
  );
}

export function AnimalsContent() {
  const animalData = useAnimals();
  const visibleGroups = GROUPS.filter(({ key }) => animalData[key].length > 0);

  return (
    <>
      <SubHeader imageSrc={chinchilla} title="동물 소개" />
      <div className="flex items-start">
        <aside className="sticky top-25 h-[calc(100vh-100px)] w-60 shrink-0 p-6 overflow-y-auto">
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
        <main className="flex-1 p-12">
          {visibleGroups.map(({ key, label }) => (
            <section key={key} id={key} className="mb-16 scroll-mt-10">
              <h2 className="text-3xl font-bold mb-8 border-b pb-2">{label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
