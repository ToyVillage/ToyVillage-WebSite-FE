'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import GalleryCardGrid from '@/components/domain/gallery/GalleryCardGrid';
import Pagination from '@/components/common/Pagination';
import { getGalleries } from '@/lib/api/gallery';

export function GalleryContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['gallery', currentPage],
    queryFn: () => getGalleries(currentPage - 1),
  });

  return (
    <>
      <SubHeader imageSrc={chinchilla} title="갤러리" subtitle="Gallery of Toy village" />
      <main className="w-full px-20 py-12">
        <GalleryCardGrid items={data?.content ?? []} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
