'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import NewsCardGrid from '@/components/domain/news/NewsCardGrid';
import AddButton from '@/components/domain/admin/AddButton';
import Pagination from '@/components/common/Pagination';
import { deleteNews, getNewsList } from '@/lib/api/news';

export default function AdminNewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['news', 'list', currentPage],
    queryFn: () => getNewsList(currentPage - 1, 100),
  });

  const { mutate: remove } = useMutation({
    mutationFn: (id: number) => deleteNews(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['news'] }),
  });

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="새소식" />
      <main className="w-full px-20 py-12">
        <div className="mb-5">
          <AddButton href="/admin/news/add" />
        </div>
        <NewsCardGrid isAdmin items={data?.content ?? []} onDelete={(id) => remove(id)} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
