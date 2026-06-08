'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import SubHeader from '@/components/layout/SubHeader';
import chinchilla from '@/assets/animals/Chinchilla.jpeg';
import { getEventById } from '@/lib/api/events';
import { IMAGE_BASE_URL } from '@/lib/api/file';

export default function EventsDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: event } = useQuery({
    queryKey: ['events', Number(id)],
    queryFn: () => getEventById(Number(id)),
  });

  const dateRange = (() => {
    if (!event) return '';
    const s = new Date(event.eventStartDate);
    const e = new Date(event.eventEndDate);
    return `${s.getFullYear()} ${s.getMonth() + 1}/${s.getDate()} ~ ${e.getMonth() + 1}/${e.getDate()}`;
  })();

  const imageUrl = event?.fileKey ? IMAGE_BASE_URL + event.fileKey : '';

  return (
    <main>
      <SubHeader
        title={event?.eventName ?? ''}
        subtitle={dateRange}
        imageSrc={chinchilla}
        imageAlt={event?.eventName ?? ''}
      />
      <section className="px-4 py-8 md:px-20 md:py-20">
        {imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
            <Image src={imageUrl} alt={event?.eventName ?? ''} fill className="object-cover" unoptimized />
          </div>
        )}
        <p className="text-body-2 text-black leading-relaxed">{event?.eventDescription}</p>
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
