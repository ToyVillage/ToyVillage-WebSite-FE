  'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import GalleryCardGrid from '@/components/domain/gallery/GalleryCardGrid';
import AddButton from '@/components/domain/admin/AddButton';
import Pagination from '@/components/common/Pagination';
import { getGalleries } from '@/lib/api/gallery';

export default function AdminGalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['gallery', currentPage],
    queryFn: () => getGalleries(currentPage - 1),
  });

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="갤러리" />
      <main className="w-full px-20 py-12">
        <div className="mb-5">
          <AddButton href="/admin/gallery/add" />
        </div>
        <GalleryCardGrid isAdmin items={data?.content ?? []} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
