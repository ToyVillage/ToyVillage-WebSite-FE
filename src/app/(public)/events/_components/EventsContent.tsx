'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import EventCardGrid from '@/components/domain/events/EventCardGrid';
import Pagination from '@/components/common/Pagination';
import { getEvents } from '@/lib/api/events';

export function EventsContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['events', 'list', currentPage],
    queryFn: () => getEvents(currentPage - 1),
  });

  return (
    <>
      <SubHeader imageSrc={chinchilla} title="이벤트" subtitle="Toy village's Event" />
      <main className="w-full px-20 py-12">
        <EventCardGrid items={data?.content ?? []} />
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
