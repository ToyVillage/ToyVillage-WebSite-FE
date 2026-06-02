'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsCardGrid from '@/components/domain/news/NewsCardGrid';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import Pagination from '@/components/common/Pagination';
import { getNewsList } from '@/lib/api/news';

export function NewsContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['news', 'list', currentPage],
    queryFn: () => getNewsList(currentPage - 1, 100),
  });

  return (
    <>
      <SubHeader imageSrc={chinchilla} title="새소식" subtitle="Toy village News" />
      <main className="w-full px-20 py-12">
        <NewsCardGrid items={data?.content ?? []} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
