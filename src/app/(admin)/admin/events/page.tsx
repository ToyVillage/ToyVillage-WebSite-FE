'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminSubHeader from '@/components/layout/AdminSubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import EventCardGrid from '@/components/domain/events/EventCardGrid';
import AddButton from '@/components/domain/admin/AddButton';
import Pagination from '@/components/common/Pagination';
import { deleteEvent, getEvents } from '@/lib/api/events';

export default function AdminEventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['events', 'list', currentPage],
    queryFn: () => getEvents(currentPage - 1),
  });

  const { mutate: remove } = useMutation({
    mutationFn: (id: number) => deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  return (
    <>
      <AdminSubHeader imageSrc={chinchilla} title="TOY VILLAGE" subtitle="이벤트" />
      <main className="w-full px-20 py-12">
        <div className="mb-5">
          <AddButton href="/admin/events/add" />
        </div>
        <EventCardGrid isAdmin items={data?.content ?? []} onDelete={(id) => remove(id)} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
