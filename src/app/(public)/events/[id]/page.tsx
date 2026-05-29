'use client';

import { use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { getEventById } from '@/lib/api/events';

interface EventsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EventsDetailPage({ params }: EventsDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data: event } = useQuery({
    queryKey: ['events', Number(id)],
    queryFn: () => getEventById(Number(id)),
  });

  const dateRange = (() => {
    if (!event) return '';
    const s = new Date(event.event_start_date);
    const e = new Date(event.event_end_date);
    return `${s.getFullYear()} ${s.getMonth() + 1}/${s.getDate()} ~ ${e.getMonth() + 1}/${e.getDate()}`;
  })();

  return (
    <main>
      <SubHeader
        title={event?.event_name ?? ''}
        subtitle={dateRange}
        imageSrc={chinchilla}
        imageAlt={event?.event_name ?? ''}
      />
      <section className="px-20 py-20">
        {event?.event_image_url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
            <Image src={event.event_image_url} alt={event.event_name} fill className="object-cover" unoptimized />
          </div>
        )}
        <p className="text-body-2 text-black leading-relaxed">{event?.event_description}</p>
        <div className="flex justify-end mt-16">
          <button
            onClick={router.back}
            className="px-8 py-4 rounded-xl border border-gray-300 text-body-2 text-black hover:bg-gray-50 transition-colors"
          >
            뒤로가기
          </button>
        </div>
      </section>
    </main>
  );
}
